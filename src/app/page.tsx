import Link from "next/link";

/** Only seen on hosts that aren't one of the sites (plain localhost): links to the local previews of both. */
export default function Index() {
  return (
    <main className="mx-auto max-w-md p-10 font-sans">
      <h1 className="mb-4 text-xl font-semibold">Minnie&apos;s sites</h1>
      <ul className="space-y-2 underline">
        <li>
          <a href="http://wedding.localhost:3000">Thoroughly Modern Minnie (wedding celebrant)</a>
        </li>
        <li>
          <a href="http://rcc.localhost:3000">RCC Workshops</a>
        </li>
        <li>
          <Link href="/edit">Edit / enquiries</Link>
        </li>
      </ul>
    </main>
  );
}
