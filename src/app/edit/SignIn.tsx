"use client";

import { useActionState } from "react";
import { sendLink } from "./actions";

export function SignIn({ next = "/edit" }: { next?: string }) {
  const [state, action, pending] = useActionState(sendLink, {} as { sent?: boolean; error?: string });
  if (state.sent) return <p className="rounded bg-green-50 px-3 py-3 text-sm text-green-800">Check your email for the sign-in link. It may take a minute to arrive.</p>;
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="next" value={next} />
      <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="w-full rounded border border-neutral-300 px-3 py-2" />
      {state.error && <p className="text-sm text-red-700">{state.error}</p>}
      <button disabled={pending} className="w-full rounded bg-neutral-900 px-3 py-2 text-white hover:bg-neutral-700 disabled:opacity-60">
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
