import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { currentEditor, serverClient } from "@/lib/supabase/server";
import { SITE_INFO, siteForHost } from "@/lib/sites";
import { signOut } from "./actions";
import { SignIn } from "./SignIn";
import { Inbox, type Submission } from "./Inbox";

export const metadata: Metadata = { title: "Edit your websites", robots: { index: false, follow: false } };

/** Minnie's page: sign in, jump into editing either site, and see enquiries and booking requests. */
export default function EditPage({ searchParams }: PageProps<"/edit">) {
  return (
    <main className="min-h-dvh bg-neutral-50 font-[Arial,sans-serif] text-neutral-900">
      <Suspense fallback={<p className="p-10 text-neutral-500">Loading…</p>}>
        <EditHome searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function EditHome({ searchParams }: { searchParams: PageProps<"/edit">["searchParams"] }) {
  const { error } = await searchParams;
  const editor = await currentEditor();
  if (!editor)
    return (
      <div className="mx-auto max-w-sm px-4 pt-[15vh]">
        <h1 className="mb-1 text-xl font-semibold">Edit your websites</h1>
        <p className="mb-5 text-sm text-neutral-600">Enter your email and we’ll send you a link to sign in.</p>
        {error === "link" && <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">That link has expired. Please ask for a new one.</p>}
        <SignIn />
      </div>
    );

  const here = siteForHost((await headers()).get("host"));
  const supabase = await serverClient();
  const { data } = await supabase.from("submissions").select("id, site, kind, name, email, data, status, notes, created_at").order("created_at", { ascending: false }).limit(200);
  const subs = (data ?? []) as Submission[];

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10">
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold">Your websites</h1>
        <form action={signOut} className="ml-auto text-sm text-neutral-500">
          {editor} · <button className="underline">Sign out</button>
        </form>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {(["wedding", "rcc"] as const).map((s) => {
          // on a preview address (Netlify, localhost) both sites live here under /wedding and /rcc
          const local = here === s || !here;
          const href = here === s ? "/" : !here ? `/${s}` : `${SITE_INFO[s].url}/edit`;
          return (
            <a key={s} href={href} className="rounded-lg border border-neutral-200 bg-white p-5 hover:border-neutral-400">
              <h2 className="font-semibold">{SITE_INFO[s].name}</h2>
              <p className="mt-1 text-sm text-neutral-600">
                {local ? "Open the site to edit it: click any outlined text or picture." : "Sign in on this site's own address to edit it."}
              </p>
              <span className="mt-3 inline-block text-sm text-blue-700">{local ? "Edit this site →" : `${SITE_INFO[s].url.replace("https://", "")} →`}</span>
            </a>
          );
        })}
      </section>

      <section>
        <h2 className="mb-3 font-semibold">Enquiries &amp; bookings</h2>
        <Inbox items={subs} />
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white p-5 text-sm text-neutral-700">
        <h2 className="mb-2 font-semibold">How editing works</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Open a page while signed in: everything you can change is outlined in blue.</li>
          <li>Click short text to type over it. Longer text opens in a box: leave a blank line between paragraphs, start a line with “- ” for a bullet point, or wrap words in **double stars** for bold.</li>
          <li>Click a picture to replace it. Lists like testimonials and FAQs have an “Edit list” button.</li>
          <li>Press Save in the bar at the bottom. Changes are live straight away.</li>
        </ul>
      </section>
    </div>
  );
}
