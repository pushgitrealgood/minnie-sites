import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { serverClient } from "@/lib/supabase/server";

/** Where the emailed sign-in link lands: starts the session, then goes back to the page she came from. */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  // the domain she signed in on (nextUrl.origin can lose it behind proxies and in local previews)
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;
  const origin = `${request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "")}://${host}`;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/edit";
  const supabase = await serverClient();
  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : tokenHash && type
      ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
      : { error: new Error("missing code") };
  if (error) {
    console.error("sign-in link failed:", error.message);
    return NextResponse.redirect(`${origin}/edit?error=link`);
  }
  return NextResponse.redirect(`${origin}${next.startsWith("/") && !next.startsWith("//") ? next : "/edit"}`);
}
