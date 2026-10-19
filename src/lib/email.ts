import "server-only";
import type { Site } from "@/lib/sites";

/**
 * Sends email through Resend (https://resend.com) from each site's own domain, once RESEND_API_KEY is set and the
 * domains are verified there. Without a key it does nothing and returns false: submissions are still saved and shown
 * on the /edit inbox, so nothing is lost while email is being set up.
 */
const FROM: Record<Site, string> = {
  wedding: process.env.MAIL_FROM_WEDDING ?? "Thoroughly Modern Minnie <hello@thoroughlymodernminnie.co.uk>",
  rcc: process.env.MAIL_FROM_RCC ?? "RCC Workshops <bookings@schoolresilienceworkshop.com>",
};

export async function sendMail(site: Site, msg: { to: string; subject: string; html: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM[site], to: [msg.to], subject: msg.subject, html: msg.html, ...(msg.replyTo ? { reply_to: msg.replyTo } : {}) }),
  });
  return res.ok;
}

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}
