"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

type Item = { id: string; label: string; dark: boolean };

/**
 * Side progress rail for long, story-led pages. Every section in <main> with a
 * `data-rail` label becomes a stop on a thin vertical thread at the right edge.
 * The thread fills as you read; the current chapter's name runs vertically
 * above it; hovering reveals every stop, and clicking jumps to it.
 * Below lg the rail becomes a small chapter pill at the bottom of the screen
 * that opens a list of every chapter.
 */
export function ProgressRail() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);
  const [sheet, setSheet] = useState(false);
  const fill = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("main [data-rail]"));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the page's chapters once mounted
    setItems(els.map((el) => ({ id: el.id, label: el.dataset.rail ?? "", dark: el.dataset.theme === "dark" })));

    // Section starts (where each chapter's top crosses 55% of the screen); pins are accounted for.
    const stops = els.map((el) => ScrollTrigger.create({ trigger: el, start: "top 55%" }));
    let idle: ReturnType<typeof setTimeout> | undefined;
    const progress = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (fill.current) fill.current.style.transform = `scaleY(${self.progress})`;
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
        // Current chapter = the last one whose top has passed, so fast jumps can't skip it.
        const y = self.scroll();
        let i = 0;
        stops.forEach((st, k) => {
          if (y >= st.start) i = k;
        });
        setActive(i);
        // Phone pill: out of the way while reading downward, back on scroll-up or a pause.
        const past = y > window.innerHeight * 0.8;
        setShown(past && self.direction < 0);
        clearTimeout(idle);
        if (past) idle = setTimeout(() => setShown(true), 900);
        else setShown(false);
      },
    });
    return () => {
      clearTimeout(idle);
      stops.forEach((st) => st.kill());
      progress.kill();
    };
  }, []);

  if (!items.length) return null;
  const current = items[active];
  const dark = current?.dark;

  const go = (id: string) => {
    const el = document.getElementById(id);
    setSheet(false);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: "smooth" });
  };
  const nn = (i: number) => String(i).padStart(2, "0"); // 0-based so chapters match the section numbers (01 Problem ... 11 Insights)

  return (
    <>
    {/* Phones and tablets: chapter pill + list */}
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setSheet(true)}
        aria-label={`Chapter ${active + 1} of ${items.length}: ${current?.label}. Show all chapters`}
        className={`fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 overflow-hidden rounded-full border py-2 pl-3 pr-4 text-[0.78rem] shadow-[0_10px_30px_-12px_rgb(15_23_41/0.45)] backdrop-blur transition-[opacity,transform,background-color,color,border-color] duration-500 ${
          shown && !sheet ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        } ${dark ? "border-ivory/15 bg-ink-2/90 text-ivory" : "border-line bg-ivory/90 text-ink"}`}
      >
        <span className={`serif text-base italic leading-none ${dark ? "text-brand-3" : "text-brand"}`}>{nn(active)}</span>
        <span className="opacity-40">/ {nn(items.length - 1)}</span>
        <span className="font-medium">{current?.label}</span>
        <svg viewBox="0 0 12 12" className="size-3 opacity-60" fill="none" aria-hidden>
          <path d="M3 7.5 6 4.5 9 7.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span aria-hidden className={`absolute inset-x-0 bottom-0 h-[2px] ${dark ? "bg-ivory/10" : "bg-ink/10"}`}>
          <span ref={bar} className={`block h-full origin-left scale-x-0 ${dark ? "bg-brand-3" : "bg-brand"}`} />
        </span>
      </button>

      <div className={`fixed inset-0 z-[65] ${sheet ? "visible" : "invisible"}`} style={{ transition: sheet ? "visibility 0s" : "visibility 0s linear .5s" }} aria-hidden={!sheet}>
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close chapters"
          onClick={() => setSheet(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-500 ${sheet ? "opacity-100" : "opacity-0"}`}
        />
        <div
          role="dialog"
          aria-label="Chapters"
          data-lenis-prevent
          className={`absolute inset-x-0 bottom-0 max-h-[78svh] overflow-y-auto rounded-t-[14px] bg-ivory px-[var(--gutter)] pb-8 pt-5 transition-transform duration-500 ease-out-expo ${sheet ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" aria-hidden />
          <div className="flex items-baseline justify-between">
            <p className="eyebrow text-muted">Chapters</p>
            <button type="button" tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)} className="text-sm text-ink/70">
              Close
            </button>
          </div>
          <ol className="mt-3 grid grid-cols-2 gap-x-6 border-t border-line">
            {items.map((it, i) => (
              <li key={it.id} className="border-b border-line">
                <button
                  type="button"
                  tabIndex={sheet ? 0 : -1}
                  onClick={() => go(it.id)}
                  className={`flex w-full items-baseline gap-3 py-3 text-left text-[0.95rem] ${i === active ? "text-brand" : "text-ink/80"}`}
                >
                  <span className="serif text-sm italic text-brand">{nn(i)}</span>
                  {it.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>

    <nav
      aria-label="Page chapters"
      className={`group/rail fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 transition-colors duration-500 lg:flex xl:right-5 ${
        dark ? "text-ivory" : "text-ink"
      }`}
    >
      <span className="eyebrow rotate-180 whitespace-nowrap text-[0.6rem] [writing-mode:vertical-rl]" aria-live="polite">
        <span className={dark ? "text-brand-3" : "text-brand"}>{nn(active)}</span>
        <span className="mx-2 opacity-40">/</span>
        {current?.label}
      </span>

      <ol className="relative flex flex-col items-center gap-[18px] py-1">
        <span aria-hidden className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 ${dark ? "bg-ivory/20" : "bg-ink/15"}`} />
        <span
          ref={fill}
          aria-hidden
          className={`absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 scale-y-0 ${dark ? "bg-brand-3" : "bg-brand"}`}
        />
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.id} className="relative flex">
              <button
                type="button"
                onClick={() => go(it.id)}
                aria-label={`Go to ${it.label}`}
                aria-current={on ? "step" : undefined}
                className="group/stop relative grid size-3 place-items-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ease-out-expo ${
                    on
                      ? `size-2.5 ${dark ? "bg-brand-3" : "bg-brand"}`
                      : `size-1.5 ${i < active ? (dark ? "bg-brand-3" : "bg-brand") : dark ? "bg-ivory/40" : "bg-ink/30"} group-hover/stop:size-2.5`
                  }`}
                />
                <span
                  className={`eyebrow pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.6rem] opacity-0 transition-opacity duration-300 group-hover/rail:opacity-100 ${
                    dark ? "bg-ink-2 text-ivory" : "bg-ivory text-ink shadow-[0_4px_16px_-8px_rgb(15_23_41/0.4)]"
                  } ${on ? (dark ? "!text-brand-3" : "!text-brand") : ""}`}
                >
                  {it.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
    </>
  );
}
