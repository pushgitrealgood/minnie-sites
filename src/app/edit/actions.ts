"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { currentEditor, serverClient } from "@/lib/supabase/server";
import { contentTag, getContent } from "@/lib/content/get";
import { weddingDefaults } from "@/lib/content/wedding";
import { rccDefaults } from "@/lib/content/rcc";
import { isSite, type Site } from "@/lib/sites";

const DEFAULTS: Record<Site, Record<string, unknown>> = { wedding: weddingDefaults, rcc: rccDefaults };

/** Email a sign-in link. Only editors can then do anything, but anyone may ask (so nobody learns who's an editor). */
export async function sendLink(_prev: { sent?: boolean; error?: string }, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Please enter your email address." };
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
  const next = String(formData.get("next") ?? "/edit");
  const supabase = await serverClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true, emailRedirectTo: `${origin}/edit/callback?next=${encodeURIComponent(next.startsWith("/") ? next : "/edit")}` },
  });
  if (error) return { error: "Couldn't send the link just now. Please try again in a minute." };
  return { sent: true };
}

/** Sign in with email and password; anyone may try, but only editors can then do anything. */
export async function signInPassword(_prev: { error?: string }, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/edit");
  if (!email || !password) return { error: "Please enter your email and password." };
  const supabase = await serverClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "That email and password don't match. First time, or forgotten it? Use “Email me a sign-in link” below, then set a password." };
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/edit");
}

/** Set or change the signed-in editor's password (after signing in by email link, for instance). */
export async function setPassword(_prev: { ok?: boolean; error?: string }, formData: FormData) {
  if (!(await currentEditor())) return { error: "Please sign in again." };
  const password = String(formData.get("password") ?? "");
  if (password.length < 10) return { error: "Please use at least 10 characters." };
  if (password !== String(formData.get("confirm") ?? "")) return { error: "The two passwords don't match." };
  const supabase = await serverClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message.includes("different") ? "That's already your password." : "Couldn't save the password. Please try again." };
  return { ok: true };
}

export async function signOut() {
  const supabase = await serverClient();
  await supabase.auth.signOut();
  redirect("/edit");
}

/** Everything editable on a site, as currently shown (defaults + saved edits), for the edit boxes. */
export async function rawContent(site: string) {
  if (!isSite(site) || !(await currentEditor())) return null;
  return (await getContent(site)) as Record<string, unknown>;
}

/**
 * Save edits: { key: value } for one site. Only keys the site knows about, with the same kind of value as the
 * default (text stays text, lists stay lists). Clears the site's cache so the change shows straight away.
 */
export async function saveContent(site: string, changes: Record<string, unknown>) {
  const editor = await currentEditor();
  if (!editor) return { error: "Please sign in again." };
  if (!isSite(site)) return { error: "Unknown site." };
  const defaults = DEFAULTS[site];
  const rows = [];
  for (const [key, value] of Object.entries(changes)) {
    if (!(key in defaults)) continue;
    const want = Array.isArray(defaults[key]) ? "array" : typeof defaults[key];
    const got = Array.isArray(value) ? "array" : typeof value;
    if (want !== got) continue;
    if (typeof value === "string" && value.length > 20000) return { error: "That text is too long." };
    rows.push({ site, key, value, updated_by: editor, updated_at: new Date().toISOString() });
  }
  if (!rows.length) return { ok: true };
  const supabase = await serverClient();
  const { error } = await supabase.from("content").upsert(rows);
  if (error) return { error: "Couldn't save. Please try again." };
  updateTag(contentTag(site));
  return { ok: true };
}

/** Put a key back to how it was originally (removes the saved edit). */
export async function resetContent(site: string, key: string) {
  if (!(await currentEditor()) || !isSite(site)) return { error: "Please sign in again." };
  const supabase = await serverClient();
  await supabase.from("content").delete().eq("site", site).eq("key", key);
  updateTag(contentTag(site));
  return { ok: true };
}

const STATUSES = ["new", "replied", "booked", "done", "archived"];

export async function updateSubmission(id: string, status: string, notes: string) {
  if (!(await currentEditor()) || !STATUSES.includes(status)) return { error: "Please sign in again." };
  const supabase = await serverClient();
  const { error } = await supabase.from("submissions").update({ status, notes: notes.slice(0, 5000) }).eq("id", id);
  return error ? { error: "Couldn't save." } : { ok: true };
}
