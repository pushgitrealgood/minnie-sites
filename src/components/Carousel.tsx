"use client";

import { useState, type ReactNode } from "react";

/** One slide at a time with arrows and dots (testimonials). All slides are in the page for search engines. */
export function Carousel({ slides, label }: { slides: ReactNode[]; label: string }) {
  const [i, setI] = useState(0);
  const n = slides.length;
  if (!n) return null;
  const at = Math.min(i, n - 1);
  const go = (d: number) => setI((at + d + n) % n);
  const arrow = "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-rose hover:bg-blush/40";
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="flex items-center gap-2 md:gap-6">
        {n > 1 && (
          <button type="button" onClick={() => go(-1)} className={arrow} aria-label="Previous">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
          </button>
        )}
        <div className="min-w-0 flex-1">
          {slides.map((s, j) => (
            <div key={j} hidden={j !== at} aria-roledescription="slide" aria-label={`${j + 1} of ${n}`}>
              {s}
            </div>
          ))}
        </div>
        {n > 1 && (
          <button type="button" onClick={() => go(1)} className={arrow} aria-label="Next">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
      {n > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {slides.map((_, j) => (
            <button key={j} type="button" onClick={() => setI(j)} className={`h-2.5 w-2.5 rounded-full ${j === at ? "bg-rose" : "bg-rose/30"}`} aria-label={`Show ${j + 1}`} aria-current={j === at} />
          ))}
        </div>
      )}
    </div>
  );
}
