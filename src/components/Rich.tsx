import { Fragment, type ReactNode } from "react";

/**
 * Renders the simple text format Minnie edits in: blank lines separate paragraphs, lines starting "- " are bullets,
 * "## " a sub-heading, "> " a quote, and **double stars** make text bold. Anything else is plain text, so a typo can
 * never break the page.
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
        if (lines.length === 1 && lines[0].startsWith("## ")) return <h3 key={i}>{inline(lines[0].slice(3))}</h3>;
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
  return s.split(/(\*\*[^*]+\*\*)/g).map((part, i) => (part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part));
}
