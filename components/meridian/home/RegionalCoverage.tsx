"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { contact, frameworkGroups, regions, type Region } from "@/lib/content";
import { officeTime, useNow } from "@/lib/time";
import { Head } from "./Head";

const all = frameworkGroups.flatMap((g) => g.items);
const bySlug = (slug: string) => all.find((f) => f.slug === slug);

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * Regional coverage: one tab per market, each listing its frameworks, beside
 * live clocks for the two delivery hubs (follow-the-sun delivery).
 */
export function RegionalCoverage() {
  const [active, setActive] = useState<Region>("US");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const now = useNow();

  const region = regions.find((r) => r.id === active)!;
  const local = all.filter((f) => f.region === active);
  const pairs = region.pairs.map(bySlug).filter((f) => !!f);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = regions.findIndex((r) => r.id === active);
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? regions.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const j = (next + regions.length) % regions.length;
    setActive(regions[j].id);
    tabs.current[j]?.focus();
  };

  return (
    <section id="coverage" data-rail="Regions" className="bg-ivory py-16 md:py-24 lg:py-28">
      <div className="container-x">
        <Head
          n="06"
          label="Coverage"
          title={
            <>
              Where you sell. <span className="em text-brand">What you must prove.</span>
            </>
          }
          aside="Pick a market to see the frameworks and standards we prepare you for there."
        />

        <div className="mt-10 grid gap-10 md:mt-14 md:gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <div role="tablist" aria-label="Regions" onKeyDown={onKey} className="flex flex-wrap gap-2">
              {regions.map((r, i) => {
                const on = r.id === active;
                const n = all.filter((f) => f.region === r.id).length;
                return (
                  <button
                    key={r.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${r.id}`}
                    aria-selected={on}
                    aria-controls={`${uid}-panel`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(r.id)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.82rem] transition-colors duration-300 md:px-4 md:py-2 md:text-sm ${
                      on ? "border-ink bg-ink text-ivory" : "border-ink/15 text-ink/70 hover:border-ink/50 hover:text-ink"
                    }`}
                  >
                    {r.id === "Global" ? "International" : r.id}
                    <span className={`mono text-[0.7rem] ${on ? "text-ivory/60" : "text-muted"}`}>{n}</span>
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${active}`} key={active} className="mt-7 animate-[fadeUp_0.6s_var(--ease-out)] md:mt-10">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-3 md:pb-4">
                <p className="serif text-[clamp(1.8rem,3.4vw,3rem)] leading-none">{region.label}</p>
                <p className="text-sm text-muted">
                  {local.length} {local.length === 1 ? "framework" : "frameworks"}
                </p>
              </div>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink/70 md:mt-5 md:text-base">{region.blurb}</p>

              <ul className="mt-5 grid grid-cols-2 gap-1.5 md:mt-8 md:gap-2 xl:grid-cols-3">
                {local.map((f) => (
                  <li key={f.slug}>
                    <Link href={`/frameworks/${f.slug}`} data-label={f.name} className="group flex h-full items-center justify-between gap-2 rounded-[6px] border border-line bg-paper/60 px-3 py-2.5 transition-colors duration-300 hover:border-brand/40 hover:bg-paper md:gap-4 md:px-4 md:py-3.5">
                      <span>
                        <span className="block text-[0.92rem] transition-colors group-hover:text-brand md:text-[1rem]">{f.name}</span>
                        {f.full && <span className="block text-[0.74rem] leading-snug text-muted md:text-sm">{f.full}</span>}
                      </span>
                      <Arrow className="hidden size-3 shrink-0 text-ink/30 transition-all duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:text-brand md:block" />
                    </Link>
                  </li>
                ))}
              </ul>

              {pairs.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-8">
                  <span className="eyebrow mr-2 w-full text-muted md:w-auto">Often paired with</span>
                  {pairs.map((f) => (
                    <Link key={f.slug} href={`/frameworks/${f.slug}`} className="rounded-full border border-line px-3 py-1 text-sm text-ink/75 transition-colors hover:border-ink hover:bg-ink hover:text-ivory">
                      {f.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Follow-the-sun delivery */}
          <aside className="lg:col-span-4">
            <p className="eyebrow text-muted">Follow-the-sun delivery</p>
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
              {contact.offices.map((o) => {
                const t = now ? officeTime(now, o.tz) : null;
                return (
                  <div key={o.city} className="rounded-[6px] border border-line bg-paper p-4 md:p-6">
                    <div className="flex flex-col-reverse gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
                      <div>
                        <p className="serif text-[1.35rem] leading-none md:text-[1.7rem]">{o.city}</p>
                        <p className="mt-1 text-sm text-muted">{o.region}</p>
                      </div>
                      <span className={`eyebrow flex items-center gap-2 text-[0.6rem] ${t?.working ? "text-brand" : "text-muted"}`}>
                        <span className={`size-1.5 rounded-full ${t?.working ? "bg-brand" : "bg-ink/25"}`} />
                        {t ? (t.working ? "Working hours" : "After hours") : "Local time"}
                      </span>
                    </div>
                    <p className="num mt-5 text-[2rem] md:mt-8 md:text-[clamp(2.6rem,4vw,3.4rem)]" suppressHydrationWarning>
                      {t ? t.time : "--:--"}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Two delivery hubs on opposite sides of the world, so work on your program hands over at the end of the day instead of stopping.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
