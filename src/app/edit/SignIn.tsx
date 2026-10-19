"use client";

import { useActionState, useState } from "react";
import { sendLink, setPassword, signInPassword } from "./actions";

const INPUT = "w-full rounded border border-neutral-300 px-3 py-2";
const BTN = "w-full rounded bg-neutral-900 px-3 py-2 text-white hover:bg-neutral-700 disabled:opacity-60";

/** Email + password, with an emailed sign-in link for the first time or a forgotten password. */
export function SignIn({ next = "/edit" }: { next?: string }) {
  const [mode, setMode] = useState<"password" | "link">("password");
  const [pwState, pwAction, pwPending] = useActionState(signInPassword, {} as { error?: string });
  const [linkState, linkAction, linkPending] = useActionState(sendLink, {} as { sent?: boolean; error?: string });

  if (mode === "link")
    return linkState.sent ? (
      <p className="rounded bg-green-50 px-3 py-3 text-sm text-green-800">Check your email for the sign-in link. It may take a minute to arrive. Once you&apos;re in, you can set a password.</p>
    ) : (
      <form action={linkAction} className="space-y-3">
        <input type="hidden" name="next" value={next} />
        <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={INPUT} />
        {linkState.error && <p className="text-sm text-red-700">{linkState.error}</p>}
        <button disabled={linkPending} className={BTN}>
          {linkPending ? "Sending…" : "Email me a sign-in link"}
        </button>
        <button type="button" onClick={() => setMode("password")} className="w-full text-sm text-neutral-600 underline">
          Sign in with a password instead
        </button>
      </form>
    );

  return (
    <form action={pwAction} className="space-y-3">
      <input type="hidden" name="next" value={next} />
      <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={INPUT} />
      <input name="password" type="password" required autoComplete="current-password" placeholder="Password" className={INPUT} />
      {pwState.error && <p className="text-sm text-red-700">{pwState.error}</p>}
      <button disabled={pwPending} className={BTN}>
        {pwPending ? "Signing in…" : "Sign in"}
      </button>
      <button type="button" onClick={() => setMode("link")} className="w-full text-sm text-neutral-600 underline">
        First time, or forgotten your password? Email me a sign-in link
      </button>
    </form>
  );
}

/** For a signed-in editor: set a password (or change it). */
export function SetPassword() {
  const [state, action, pending] = useActionState(setPassword, {} as { ok?: boolean; error?: string });
  return (
    <details className="rounded-lg border border-neutral-200 bg-white p-4 text-sm" open={false}>
      <summary className="font-semibold">Set or change your password</summary>
      {state.ok ? (
        <p className="mt-3 text-green-800">Password saved. Next time, sign in with your email and this password.</p>
      ) : (
        <form action={action} className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input name="password" type="password" required minLength={10} autoComplete="new-password" placeholder="New password (10+ characters)" className={INPUT} />
          <input name="confirm" type="password" required minLength={10} autoComplete="new-password" placeholder="Type it again" className={INPUT} />
          <button disabled={pending} className="rounded bg-neutral-900 px-4 py-2 text-white disabled:opacity-60">
            {pending ? "Saving…" : "Save password"}
          </button>
          {state.error && <p className="text-red-700 sm:col-span-3">{state.error}</p>}
        </form>
      )}
    </details>
  );
}
