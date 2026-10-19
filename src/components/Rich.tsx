import { Fragment, type ReactNode } from "react";

/**
 * Renders the simple text format Minnie edits in: blank lines separate paragraphs, lines starting "- " are bullets ("1. " numbered),
 * "## " a sub-heading, "> " a quote, a line "![caption](picture address)" a picture, and **double stars** make text
 * bold, [words](address) a link. Anything else is plain text, so a typo can never break the page.
 */
export function Rich({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className={`rich ${className}`}>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => l.startsWith("- ")))
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        if (lines.every((l) => /^\d+[.)] /.test(l)))
          return (
            <ol key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\d+[.)] /, ""))}</li>
              ))}
            </ol>
          );
        if (lines.length === 1 && lines[0].startsWith("## ")) return <h3 key={i}>{inline(lines[0].slice(3))}</h3>;
        const img = lines.length === 1 && lines[0].match(/^!\[([^\]]*)\]\((\S+)\)$/);
        if (img && safeUrl(img[2]))
          return (
            <figure key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element -- pasted addresses can be anywhere, so no next/image */}
              <img src={img[2]} alt={img[1]} loading="lazy" />
              {img[1] && <figcaption>{img[1]}</figcaption>}
            </figure>
          );
        if (lines.every((l) => l.startsWith("> "))) return <blockquote key={i}>{inline(lines.map((l) => l.slice(2)).join(" "))}</blockquote>;
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {inline(l)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function inline(s: string): ReactNode[] {
  return s.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link && safeUrl(link[2])) {
      const external = /^https?:/i.test(link[2]);
      return (
        <a key={i} href={link[2]} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

/** Web, email and phone links, and addresses on this site ("/enquire"); nothing that could run code. */
function safeUrl(u: string) {
  return /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i.test(u);
}
