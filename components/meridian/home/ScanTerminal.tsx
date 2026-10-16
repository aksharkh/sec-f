"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Line = { p: string; t: string; tone?: "warn" | "ok" | "dim" };

// Illustrative output only: a sample API test against a placeholder domain.
// Lines stay under ~42 characters so the output fits a phone without scrolling.
const LINES: Line[] = [
  { p: "$", t: "sk-test --scope api.example.com" },
  { p: "›", t: "endpoints enumerated ...... 142", tone: "dim" },
  { p: "›", t: "auth & sessions ............ ok", tone: "ok" },
  { p: "›", t: "rate limiting .............. ok", tone: "ok" },
  { p: "!", t: "IDOR  GET /v2/invoices/{id} HIGH", tone: "warn" },
  { p: "›", t: "validated by hand · evidence saved", tone: "dim" },
  { p: "›", t: "fix → ticket SEC-214 · retest booked" },
  { p: "›", t: "mapped to audit controls:" },
  { p: " ", t: "SOC 2 CC7.1 · ISO A.8.8 · PCI 11.4" },
];

/**
 * A small fake scan: endpoints, a finding, then remediation. Lines appear one
 * by one the first time the terminal scrolls into view.
 */
export function ScanTerminal({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- show everything at once
      setShown(LINES.length);
      return;
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timer = setInterval(() => {
          setShown((n) => {
            if (n + 1 >= LINES.length) clearInterval(timer);
            return Math.min(n + 1, LINES.length);
          });
        }, 520);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustrative security test output: endpoints enumerated, one high-severity finding, remediation ticket raised and mapped to audit controls"
      className={`overflow-hidden rounded-[6px] border border-line-dark bg-ink text-ivory ${className ?? ""}`}
    >
      <div className="flex items-center justify-between border-b border-line-dark px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-ivory/15" />
          <span className="size-2 rounded-full bg-ivory/15" />
          <span className="size-2 rounded-full bg-ivory/15" />
        </span>
        <span className="eyebrow text-[0.6rem] text-ivory/45">Illustrative output</span>
      </div>
      <div className="mono overflow-x-auto px-4 py-4 text-[0.72rem] leading-6 md:text-[0.78rem]" aria-hidden>
        {LINES.map((l, i) => (
          <p
            key={i}
            className={`whitespace-pre transition-[opacity,transform] duration-500 ease-out-expo ${i < shown ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0"} ${
              l.tone === "warn" ? "text-brand-3" : l.tone === "dim" ? "text-ivory/50" : l.tone === "ok" ? "text-ivory/70" : "text-ivory"
            }`}
          >
            <span className="mr-3 text-ivory/30">{l.p}</span>
            {l.t}
          </p>
        ))}
        <p className={`h-6 ${shown >= LINES.length ? "" : "hidden"}`}>
          <span className="mr-3 text-ivory/30">$</span>
          <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-ivory/60" />
        </p>
      </div>
    </div>
  );
}
