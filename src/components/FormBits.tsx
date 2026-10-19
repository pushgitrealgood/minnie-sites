"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Hidden spam traps shared by both forms: a field people never see, and when the page was opened. */
export function SpamTraps() {
  const opened = useRef(0);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    opened.current = Date.now();
    if (input.current) input.current.value = String(opened.current);
  }, []);
  return (
    <>
      <input ref={input} type="hidden" name="t" defaultValue="" />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

export function Field({
  name,
  label,
  type = "text",
  required,
  rows,
  defaultValue,
  className = "",
  inputClass,
  hint,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  rows?: number;
  defaultValue?: string;
  className?: string;
  inputClass: string;
  hint?: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block font-medium">
        {label}
        {required && <span aria-hidden> *</span>}
      </span>
      {rows ? (
        <textarea name={name} rows={rows} required={required} defaultValue={defaultValue} className={inputClass} />
      ) : (
        <input name={name} type={type} required={required} defaultValue={defaultValue} className={inputClass} autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : undefined} />
      )}
      {hint && <span className="mt-1 block text-sm opacity-70">{hint}</span>}
    </label>
  );
}
