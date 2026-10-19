import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Supabase as the signed-in person (their session cookie), so database rules apply to them. */
export async function serverClient() {
  const cookieStore = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // read-only in Server Components; sessions are refreshed by the browser client and server actions
        }
      },
    },
  });
}

/** The signed-in editor's email, or null if nobody (or someone who isn't an editor) is signed in. */
export async function currentEditor() {
  const supabase = await serverClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user?.email) return null;
  const { data: ok } = await supabase.rpc("is_editor");
  return ok ? data.user.email : null;
}
