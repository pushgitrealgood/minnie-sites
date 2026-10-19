import Image from "next/image";
import type { ElementType, ReactNode } from "react";
import { Rich } from "./Rich";

/**
 * Markers for what Minnie can edit. Each carries its content key (data-k); edit mode (EditMode.tsx) finds them on the
 * page once she's signed in. For visitors they're ordinary elements.
 */

/** A short piece of text, edited in place. */
export function E({ k, as: Tag = "span", className, children }: { k: string; as?: ElementType; className?: string; children: ReactNode }) {
  return (
    <Tag data-k={k} data-k-kind="text" className={className}>
      {children}
    </Tag>
  );
}

/** A link whose words and address can both be changed (edited in a small box). */
export function ELink({ k, urlKey, href, className, children }: { k: string; urlKey: string; href: string; className?: string; children: ReactNode }) {
  return (
    <a data-k={k} data-k-kind="link" data-k-url={urlKey} href={href} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  );
}

/** Longer text in the simple format (paragraphs, bullets…), edited in a box. */
export function ERich({ k, text, className }: { k: string; text: string; className?: string }) {
  return (
    <div data-k={k} data-k-kind="rich">
      <Rich text={text} className={className} />
    </div>
  );
}

/** A picture, swapped by clicking it in edit mode. */
export function EImg({
  k,
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
}: {
  k: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      data-k={k}
      data-k-kind="image"
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      priority={priority}
    />
  );
}
