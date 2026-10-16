"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { controlDomains, overlapFrameworks } from "@/lib/content";
import { gsap, openBooking } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";

const DEFAULT = ["SOC 2", "ISO 27001", "HIPAA"];

export function OverlapMap({ eyebrow = "Assess once" }: { eyebrow?: ReactNode }) {
  const [selected, setSelected] = useState<string[]>(DEFAULT);

  const { separate, unified, saved, coverage } = useMemo(() => {
    const picks = overlapFrameworks.filter((f) => selected.includes(f.name));
    const coverage = new Map<string, string[]>();
    let separate = 0;
    for (const f of picks) {
      for (const d of f.domains) {
        coverage.set(d, [...(coverage.get(d) ?? []), f.name]);
        separate += controlDomains.find((c) => c.id === d)!.weight;
      }
    }
    const unified = [...coverage.keys()].reduce((n, d) => n + controlDomains.find((c) => c.id === d)!.weight, 0);
    const saved = separate ? Math.round((1 - unified / separate) * 100) : 0;
    return { separate, unified, saved, coverage };
  }, [selected]);

  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));

  return (
    <section id="assess-once" data-rail="Overlap" data-theme="dark" className="relative overflow-hidden bg-ink py-16 text-ivory md:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] -top-[30%] size-[80vw] rounded-full bg-[radial-gradient(circle,rgb(91_140_255/0.3),transparent_60%)]"
      />
      <div className="container-x relative">
        <div className="grid gap-5 md:grid-cols-12 md:gap-10">
          <div className="eyebrow text-ivory/45 md:col-span-3">{eyebrow}</div>
          <div className="md:col-span-9">
            <Reveal as="h2" className="display text-[clamp(2.3rem,7vw,7.5rem)]">
              Test a control once. <span className="em text-accent">Map it everywhere.</span>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:mt-14 md:gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          {/* Controls */}
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-ivory/65 md:text-lg">
              Pick the frameworks on your roadmap. Watch how much of the work is shared, that&apos;s the
              work we do once, not five times.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 md:mt-10" role="group" aria-label="Choose frameworks">
              {overlapFrameworks.map((f) => {
                const on = selected.includes(f.name);
                return (
                  <button
                    key={f.name}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(f.name)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[0.82rem] transition-all duration-500 ease-out-expo md:px-4 md:py-2.5 md:text-sm ${
                      on
                        ? "border-accent bg-accent text-ink"
                        : "border-ivory/15 text-ivory/70 hover:border-ivory/40 hover:text-ivory"
                    }`}
                  >
                    <span
                      className={`grid size-4 place-items-center rounded-full border transition-colors ${
                        on ? "border-ink bg-ink text-accent" : "border-ivory/30"
                      }`}
                    >
                      {on && (
                        <svg viewBox="0 0 10 10" className="size-2">
                          <path d="M2 5.2 4.2 7.4 8 2.8" stroke="currentColor" strokeWidth="1.6" fill="none" />
                        </svg>
                      )}
                    </span>
                    {f.name}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Domain grid: straight after the toggles on phones, so each tap shows its effect */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="grid grid-cols-4 gap-1.5 md:gap-2">
              {controlDomains.map((d) => {
                const hits = coverage.get(d.id) ?? [];
                const c = hits.length;
                return (
                  <div
                    key={d.id}
                    className={`relative flex min-h-[4.9rem] flex-col justify-between overflow-hidden rounded-[6px] border p-2 transition-all duration-700 ease-out-expo md:aspect-[4/3] md:min-h-0 md:rounded-2xl md:p-4 ${
                      c === 0
                        ? "border-ivory/8 bg-transparent text-ivory/30"
                        : c === 1
                          ? "border-ivory/10 bg-ink-3 text-ivory"
                          : "border-brand-3/60 bg-brand text-ivory"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 md:gap-2">
                      <span className="eyebrow text-[0.5rem] tracking-[0.06em] opacity-60 md:text-[0.62rem] md:tracking-[0.14em]">{String(d.weight).padStart(2, "0")} ctrl</span>
                      {c > 1 && (
                        <span className="eyebrow rounded-full bg-accent px-1 py-px text-[0.5rem] tracking-normal text-ink md:px-2 md:py-0.5 md:text-[0.6rem]">×{c}</span>
                      )}
                    </div>
                    <div>
                      <p className="mt-1 text-[0.68rem] leading-[1.15] md:mt-0 md:text-[0.95rem] md:leading-tight md:tracking-[-0.01em]">{d.name}</p>
                      <div className="mt-1.5 flex gap-0.5 md:mt-2.5 md:gap-1">
                        {selected.map((s) => (
                          <span
                            key={s}
                            title={s}
                            className={`h-[3px] flex-1 rounded-full transition-colors duration-500 md:h-1 ${
                              hits.includes(s) ? "bg-accent" : "bg-ivory/10"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="eyebrow mt-4 text-[0.6rem] leading-relaxed text-ivory/35 md:mt-5 md:text-[0.7rem]">
              Illustrative control-domain mapping. Actual overlap depends on scope and system boundary.
            </p>
          </div>

          {/* Totals */}
          <div className="lg:col-span-5 lg:row-start-2 lg:self-start">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line-dark bg-line-dark">
              <Stat label="Controls tested separately" value={separate} muted />
              <Stat label="Tested once with SecureKnots" value={unified} />
              <div className="col-span-2 flex items-end justify-between gap-6 bg-ink-2 p-5 md:p-7">
                <div>
                  <p className="eyebrow text-ivory/45">Duplicate effort removed</p>
                  <p className="mt-2 text-sm text-ivory/45">
                    {selected.length < 2 ? "Select two or more frameworks" : `Across ${selected.length} frameworks`}
                  </p>
                </div>
                <p className="num text-[clamp(3.2rem,7vw,6rem)] text-accent">
                  <Count value={saved} />
                  <span className="text-[0.5em]">%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Crosswalk CTA */}
        <div className="mt-8 flex flex-col gap-5 rounded-[6px] border border-line-dark bg-ink-2 p-5 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-6 md:p-8">
          <p className="max-w-2xl text-[0.98rem] leading-snug text-ivory/75 md:text-[1.05rem]">
            {selected.length ? (
              <>
                Want the exact control-by-control crosswalk for <span className="text-ivory">{listOf(selected)}</span>?
              </>
            ) : (
              "Pick your frameworks above, then get the exact control-by-control crosswalk."
            )}
          </p>
          <button
            type="button"
            disabled={!selected.length}
            onClick={() => openBooking({ frameworks: selected, message: `Crosswalk request: ${selected.join(" × ")}` })}
            className="group inline-flex h-12 shrink-0 items-center gap-3 self-start rounded-full bg-accent pl-6 pr-5 text-[0.92rem] font-medium text-ink transition-colors duration-500 hover:bg-glow disabled:cursor-not-allowed disabled:opacity-40 md:self-auto"
          >
            Get my crosswalk
            <svg viewBox="0 0 16 16" fill="none" className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
              <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function listOf(items: string[]) {
  if (items.length < 3) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function Stat({ label, value, muted }: { label: string; value: number; muted?: boolean }) {
  return (
    <div className="bg-ink-2 p-5 md:p-7">
      <p className="eyebrow text-[0.6rem] text-ivory/45 md:text-[0.7rem]">{label}</p>
      <p className={`num mt-3 text-4xl md:mt-4 md:text-5xl ${muted ? "text-ivory/40 line-through decoration-1" : "text-ivory"}`}>
        <Count value={value} />
      </p>
    </div>
  );
}

function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(value);
  useEffect(() => {
    const obj = { v: current.current };
    const t = gsap.to(obj, {
      v: value,
      duration: 0.9,
      ease: "power3.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = String(Math.round(obj.v));
      },
    });
    current.current = value;
    return () => {
      t.kill();
    };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}
