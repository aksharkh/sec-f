"use client";

import Link from "next/link";
import { useState } from "react";
import { services, serviceDetails } from "@/lib/content";
import { Glyph } from "@/components/ui/Glyph";
import { Arrow } from "@/components/ui/Button";

/** Large accordion-style rows; hovering (or focusing) a row expands it. */
export function ServiceRows() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-ivory pb-16 md:pb-24 lg:pb-28">
      <div className="container-x">
        <ul className="border-t border-line">
          {services.map((s, i) => {
            const on = active === i;
            const d = serviceDetails[s.id];
            return (
              <li key={s.id} className="border-b border-line" onMouseEnter={() => setActive(i)}>
                <Link
                  href={`/services/${s.id}`}
                  data-label={s.title}
                  data-cursor="Explore"
                  onFocus={() => setActive(i)}
                  className="group relative block overflow-hidden"
                >
                  <div className={`absolute inset-0 hidden origin-bottom bg-brand transition-transform duration-700 ease-out-expo md:block ${on ? "scale-y-100" : "scale-y-0"}`} />
                  <div className={`relative grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-x-3 gap-y-1.5 px-1 py-5 transition-colors duration-500 md:grid-cols-12 md:items-center md:gap-6 md:px-6 md:py-8 ${on ? "md:text-ivory" : ""}`}>
                    <span className={`eyebrow text-muted md:col-span-1 ${on ? "md:text-accent" : ""}`}>0{i + 1}</span>
                    <span className="display text-[clamp(1.85rem,5.5vw,5.5rem)] md:col-span-7">{s.title}</span>
                    <span className={`eyebrow col-start-2 row-start-2 text-[0.62rem] text-muted md:col-span-3 md:col-start-auto md:row-start-auto md:text-[0.7rem] ${on ? "md:text-ivory/60" : ""}`}>{s.kicker}</span>
                    <span className="col-start-3 row-start-1 flex justify-end self-center md:col-span-1 md:col-start-auto md:row-start-auto">
                      <span className={`grid size-9 place-items-center rounded-full border border-ink/15 transition-all duration-500 md:size-12 ${on ? "md:rotate-45 md:border-accent md:bg-accent md:text-ink" : ""}`}>
                        <Arrow className="size-3 md:size-3.5" />
                      </span>
                    </span>
                    {/* Phones: what the hover panel shows on desktop */}
                    <span className="col-span-2 col-start-2 mt-2 md:hidden">
                      <span className="block text-[0.95rem] leading-snug text-ink/70">{d.tagline}</span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {d.includes.slice(0, 4).map((x) => (
                          <span key={x.t} className="rounded-full border border-ink/12 px-2.5 py-1 text-[0.72rem] text-ink/70">
                            {x.t}
                          </span>
                        ))}
                      </span>
                    </span>
                  </div>
                  <div className={`relative hidden transition-[grid-template-rows] duration-700 ease-out-expo md:grid ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="grid gap-8 px-2 pb-10 text-ivory md:grid-cols-12 md:px-6">
                        <p className="text-2xl leading-snug tracking-[-0.02em] md:col-span-6 md:col-start-2">{d.tagline}</p>
                        <ul className="flex flex-wrap content-start gap-2 md:col-span-4">
                          {d.includes.slice(0, 4).map((x) => (
                            <li key={x.t} className="rounded-full border border-ivory/20 px-3.5 py-1.5 text-sm text-ivory/80">
                              {x.t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <Glyph
                    seed={s.id}
                    className={`pointer-events-none absolute -right-20 top-1/2 hidden w-96 -translate-y-1/2 text-accent/25 transition-all duration-1000 ease-out-expo lg:block ${on ? "rotate-0 opacity-100" : "rotate-45 opacity-0"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
