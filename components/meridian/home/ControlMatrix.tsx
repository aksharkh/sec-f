"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const COLS = ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "ISO 42001"];
/** Short column labels for phones, where five columns share ~150px. */
const COLS_SHORT = ["SOC 2", "27001", "HIPAA", "PCI", "42001"];
const ROWS: { id: string; name: string; owner: string; map: number[] }[] = [
  { id: "AC-01", name: "Quarterly access reviews", owner: "IT", map: [1, 1, 1, 1, 0] },
  { id: "AC-04", name: "MFA on privileged access", owner: "Security", map: [1, 1, 1, 1, 1] },
  { id: "CM-02", name: "Peer-reviewed production changes", owner: "Engineering", map: [1, 1, 0, 1, 1] },
  { id: "RA-01", name: "Annual risk assessment", owner: "GRC", map: [1, 1, 1, 1, 1] },
  { id: "IR-03", name: "Incident response tabletop", owner: "Security", map: [1, 1, 1, 1, 0] },
  { id: "VM-02", name: "Vendor security reviews", owner: "Procurement", map: [1, 1, 1, 1, 1] },
  { id: "LG-05", name: "Centralized log retention", owner: "Platform", map: [1, 1, 1, 1, 0] },
  { id: "AI-02", name: "AI system impact assessment", owner: "Product", map: [0, 0, 0, 0, 1] },
];
/** Size of the sample program the excerpt above is drawn from. */
const TOTAL = 118;

/*
 * Phones: a 7-column grid, two lines per control.
 *   line 1  ID | control name · owner (spans the rest)
 *   line 2     | 5 framework ticks             | status
 * md and up: one line per control with every column side by side.
 */
const grid =
  "grid grid-cols-[2.6rem_repeat(5,minmax(0,1fr))_4.4rem] items-center gap-x-1.5 gap-y-1 md:grid-cols-[4.6rem_1.6fr_0.8fr_repeat(5,3.6rem)_6.8rem] md:gap-x-3 md:gap-y-0";
// Literal class names so Tailwind generates them.
const TICK_COL = ["col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6"];
const MD_AUTO = "md:col-start-auto md:row-start-auto";

/**
 * Pinned "expanding window" (from prototype #1): a small framed preview grows
 * to fill the screen as you scroll, then each control's ticks land, its status
 * flips to Passing and the score climbs, all tied to scroll position.
 * Phones get the same pinned sequence when the matrix fits the screen; on
 * shorter phones it plays once in place.
 */
export function ControlMatrix() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const q = gsap.utils.selector(el);
    const count = q(".cm-count")[0] as HTMLElement;
    const inner = q(".cm-inner")[0] as HTMLElement;
    const score = { v: 0 };
    const write = () => (count.textContent = String(Math.round(score.v)));

    const rowsIn = (tl: gsap.core.Timeline, at: number, gap: number) => {
      q(".cm-row").forEach((row, i) => {
        const t = at + i * gap;
        tl.fromTo(row.querySelectorAll(".cm-tick"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: gap * 0.9, stagger: gap * 0.12, ease: "back.out(2.6)" }, t);
        tl.fromTo(row.querySelector(".cm-status"), { "--on": 0 }, { "--on": 1, duration: gap * 0.8, ease: "power2.out" }, t + gap * 0.5);
        tl.fromTo(row, { "--lit": 0 }, { "--lit": 1, duration: gap * 0.6, ease: "power2.out" }, t + gap * 0.5);
      });
      const end = at + ROWS.length * gap;
      tl.fromTo(score, { v: 0 }, { v: TOTAL, duration: end - at, ease: "none", onUpdate: write }, at);
      tl.fromTo(q(".cm-bar"), { scaleX: 0 }, { scaleX: 1, duration: end - at, ease: "none" }, at);
    };

    const pinned = (inset: string, zoom: number, length: string) => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: length, pin: true, scrub: 0.8 },
      });
      tl.fromTo(q(".cm-frame"), { clipPath: inset }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }, 0)
        .fromTo(inner, { scale: zoom }, { scale: 1, duration: 1 }, 0)
        .fromTo(q(".cm-head"), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -50, duration: 0.5 }, 0);
      rowsIn(tl, 1.05, 0.2);
      tl.to({}, { duration: 0.25 }); // brief hold on the finished matrix before unpinning
    };

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => pinned("inset(27% 25% 19% 25% round 10px)", 1.32, "+=260%"));
    mm.add("(max-width: 767px)", () => {
      // Pin only when the whole matrix fits the phone's screen.
      if (inner.offsetHeight + 40 <= window.innerHeight) {
        el.dataset.pin = "1";
        pinned("inset(31% 5% 13% 5% round 10px)", 1.14, "+=220%");
        return () => delete el.dataset.pin;
      }
      const tl = gsap.timeline({ scrollTrigger: { trigger: q(".cm-frame")[0], start: "top 70%", once: true } });
      rowsIn(tl, 0, 0.22);
    });
    write();
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-label="How we work: unified control matrix"
      className="group/cm relative overflow-hidden bg-ivory data-[pin=1]:h-[100svh] md:h-[100svh]"
    >
      {/* Title over the small window; fades as the window opens */}
      <div className="cm-head container-x pointer-events-none pb-8 pt-16 text-center group-data-[pin=1]/cm:absolute group-data-[pin=1]/cm:inset-x-0 group-data-[pin=1]/cm:top-0 group-data-[pin=1]/cm:z-10 group-data-[pin=1]/cm:pb-0 group-data-[pin=1]/cm:pt-[13svh] md:absolute md:inset-x-0 md:top-0 md:z-10 md:pb-0 md:pt-[9.5vh]">
        <p className="eyebrow flex items-center justify-center gap-3 text-muted">
          <span className="size-1.5 rounded-full bg-brand" />
          How we work
        </p>
        <h2 className="wide mx-auto mt-4 max-w-4xl text-[clamp(2.2rem,5vw,5rem)] leading-[0.98] md:mt-5">
          Every control. <span className="em text-brand">One matrix.</span>
        </h2>
      </div>

      <div data-theme="dark" className="cm-frame relative h-full w-full overflow-hidden bg-ink text-ivory">
        <div className="cm-inner flex w-full flex-col px-[var(--gutter)] pb-5 pt-6 group-data-[pin=1]/cm:h-full group-data-[pin=1]/cm:justify-center group-data-[pin=1]/cm:pt-16 md:h-full md:justify-center md:pb-[4vh] md:pt-[11vh]">
          <div className="flex items-end justify-between gap-4 md:flex-wrap md:gap-6">
            <div className="min-w-0">
              <p className="eyebrow text-[0.6rem] text-ivory/50 md:text-[0.7rem]">Unified control matrix · sample program</p>
              <p className="serif mt-2 text-[clamp(1.35rem,2.8vw,2.6rem)] leading-[1.02]">
                Tested once. <span className="em text-brand-3">Mapped to five.</span>
              </p>
            </div>
            <div className="w-[7.4rem] shrink-0 md:w-auto md:min-w-60">
              <div className="flex flex-col items-end gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <span className="eyebrow text-[0.56rem] text-ivory/50 md:text-[0.7rem]">Controls passing</span>
                <span className="num text-[1.6rem] md:text-[2rem]">
                  <span className="cm-count">{TOTAL}</span>
                  <span className="text-ivory/40">/{TOTAL}</span>
                </span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-ivory/10">
                <div className="cm-bar h-full origin-left rounded-full bg-brand-3" />
              </div>
            </div>
          </div>

          <div role="table" aria-label="Sample unified control matrix" className="mt-4 min-h-0 overflow-hidden rounded-[6px] border border-line-dark bg-ink-2 md:mt-[3vh]">
            <div role="row" className={`${grid} border-b border-line-dark px-3 py-2 text-ivory/45 md:px-6 md:py-3`}>
              <span role="columnheader" className={`eyebrow col-start-1 row-start-1 text-[0.56rem] md:text-[0.7rem] ${MD_AUTO}`}>ID</span>
              <span role="columnheader" className={`eyebrow col-span-6 col-start-2 row-start-1 text-[0.56rem] md:col-span-1 md:text-[0.7rem] ${MD_AUTO}`}>
                Control<span className="md:hidden"> · Owner</span>
              </span>
              <span role="columnheader" className="eyebrow hidden md:block">Owner</span>
              {COLS.map((c, k) => (
                <span role="columnheader" key={c} className={`eyebrow row-start-2 whitespace-nowrap text-center text-[0.5rem] tracking-[0.02em] md:text-[0.58rem] md:tracking-[0.14em] ${TICK_COL[k]} ${MD_AUTO}`}>
                  <span className="md:hidden">{COLS_SHORT[k]}</span>
                  <span className="hidden md:inline">{c}</span>
                </span>
              ))}
              <span role="columnheader" className={`eyebrow col-start-7 row-start-2 text-right text-[0.56rem] md:text-[0.7rem] ${MD_AUTO}`}>Status</span>
            </div>
            {ROWS.map((r) => (
              <div
                role="row"
                key={r.id}
                className={`cm-row ${grid} border-b border-ivory/5 px-3 py-1.5 last:border-b-0 md:px-6 md:py-[clamp(0.55rem,1.25vh,0.9rem)] [--lit:1]`}
                style={{ backgroundColor: "rgb(159 181 255 / calc(var(--lit) * 0.04))" }}
              >
                <span role="cell" className={`mono col-start-1 row-start-1 text-[0.68rem] text-ivory/50 md:text-xs ${MD_AUTO}`}>{r.id}</span>
                <span role="cell" className={`col-span-6 col-start-2 row-start-1 text-[0.86rem] leading-snug md:col-span-1 md:truncate md:text-[0.92rem] ${MD_AUTO}`}>
                  {r.name}
                  <span className="text-ivory/45 md:hidden"> · {r.owner}</span>
                </span>
                <span role="cell" className="hidden text-sm text-ivory/50 md:block">{r.owner}</span>
                {r.map.map((m, k) => (
                  <span role="cell" key={k} className={`row-start-2 flex justify-center ${TICK_COL[k]} ${MD_AUTO}`} aria-label={`${COLS[k]}: ${m ? "mapped" : "not in scope"}`}>
                    {m ? (
                      <span className="cm-tick grid size-5 place-items-center rounded-full bg-brand-3/20 text-brand-3 md:size-6">
                        <svg viewBox="0 0 10 10" className="size-2 md:size-2.5" aria-hidden>
                          <path d="M2 5.2 4.2 7.4 8 2.8" stroke="currentColor" strokeWidth="1.6" fill="none" />
                        </svg>
                      </span>
                    ) : (
                      <span className="h-px w-3 bg-ivory/15" />
                    )}
                  </span>
                ))}
                <span role="cell" className={`col-start-7 row-start-2 flex justify-end ${MD_AUTO}`}>
                  <span className="cm-status relative overflow-hidden rounded-full border border-ivory/15 px-2 py-0.5 text-[0.66rem] md:px-3 md:py-1 md:text-xs [--on:1]">
                    <span className="block whitespace-nowrap text-ivory/55" style={{ opacity: "calc(1 - var(--on))" }}>
                      In review
                    </span>
                    <span className="absolute inset-0 grid place-items-center bg-brand-3 font-medium text-ink" style={{ opacity: "var(--on)" }}>
                      Passing
                    </span>
                  </span>
                </span>
              </div>
            ))}
          </div>

          <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 text-[0.72rem] leading-snug text-ivory/55 md:mt-4 md:text-sm">
            <span>
              <span className="serif mr-2 text-base italic text-ivory">Fig. 3</span>
              Every control has one owner, one test and one status, mapped to every framework it satisfies.
            </span>
            <span>
              Sample program: {ROWS.length} of {TOTAL} controls shown.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
