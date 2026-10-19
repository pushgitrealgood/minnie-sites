import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { currentEditor, serverClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/posts";
import { PostEditor } from "./PostEditor";

export const metadata: Metadata = { title: "Edit post", robots: { index: false, follow: false } };

export default function Page({ params }: PageProps<"/edit/posts/[id]">) {
  return (
    <main className="min-h-dvh bg-neutral-50 font-[Arial,sans-serif] text-neutral-900">
      <Suspense fallback={<p className="p-10 text-neutral-500">Loading…</p>}>
        <Load params={params} />
      </Suspense>
    </main>
  );
}

async function Load({ params }: { params: PageProps<"/edit/posts/[id]">["params"] }) {
  const { id } = await params;
  if (!(await currentEditor())) redirect("/edit");
  const supabase = await serverClient();
  const { data } = await supabase.from("posts").select("id, site, slug, title, excerpt, cover, cover_alt, body, published_at, updated_at").eq("id", id).maybeSingle();
  if (!data) redirect("/edit");
  return <PostEditor post={data as Post} />;
}
