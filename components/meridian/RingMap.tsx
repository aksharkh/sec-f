"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { frameworkGroups, frameworkCount } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";

const C = 300;
const RINGS = frameworkGroups.map((g, i) => ({
  ...g,
  r: 96 + i * 36,
  dur: 80 + i * 20,
  reverse: i % 2 === 1,
  phase: i * 0.7,
}));
// Where each ring sits while the programs are still separate.
const DRIFT = [
  [-24, 14],
  [28, -18],
  [-16, -28],
  [22, 24],
  [-30, 4],
  [12, 30],
];

/**
 * The control map: one ring per framework family, one point per framework.
 * Rings start scattered (separate programs) and settle around a single core
 * once in view. Hover or focus a family to pick out its ring.
 */
export function RingMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [tied, setTied] = useState(false);
  const [hi, setHi] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no animation, show the settled map
      setTied(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setTied(true);
        io.disconnect();
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section data-theme="dark" className="bg-ink py-16 text-ivory md:py-24 lg:py-28">
      <div className="container-x">
        <div className="grid gap-4 border-t border-line-dark pt-5 md:gap-8 md:pt-6 lg:grid-cols-12">
          <p className="eyebrow text-ivory/55 lg:col-span-3">The landscape</p>
          <div className="lg:col-span-9">
            <Reveal as="h2" className="wide max-w-4xl text-[clamp(2.15rem,5vw,5rem)] leading-[0.98]">
              Six families. <span className="em text-brand-3">One core.</span>
            </Reveal>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory/65 md:mt-6 md:text-lg">
              Run separately, every program orbits its own center and tests the same controls again. Tied together, they share one control set.
            </p>
          </div>
        </div>

        <div ref={ref} className="mt-6 grid items-center gap-5 md:mt-12 md:gap-12 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <svg viewBox="0 0 600 600" className="mx-auto w-full max-w-[19rem] overflow-visible md:max-w-[34rem]" role="img" aria-label={`${frameworkGroups.length} framework families as rings around one control set`}>
              <g stroke="rgb(255 255 255 / 0.07)">
                <line x1="0" y1={C} x2="600" y2={C} />
                <line x1={C} y1="0" x2={C} y2="600" />
              </g>
              {RINGS.map((ring, i) => {
                const on = hi === i;
                const dim = hi !== null && !on;
                const [dx, dy] = DRIFT[i % DRIFT.length];
                return (
                  <g
                    key={ring.id}
                    style={{
                      transform: tied ? "translate(0px, 0px)" : `translate(${dx}px, ${dy}px)`,
                      transition: "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity .5s",
                      opacity: dim ? 0.25 : 1,
                    }}
                  >
                    <g
                      style={{
                        transformBox: "view-box",
                        transformOrigin: `${C}px ${C}px`,
                        animation: `drift ${ring.dur}s linear infinite`,
                        animationDirection: ring.reverse ? "reverse" : "normal",
                      }}
                    >
                      <circle
                        cx={C}
                        cy={C}
                        r={ring.r}
                        fill="none"
                        stroke={on ? "var(--brand-3)" : "rgb(255 255 255 / 0.3)"}
                        strokeWidth={on ? 1.8 : 1}
                        strokeDasharray={tied ? "none" : "2 7"}
                        style={{ transition: "stroke .4s" }}
                      />
                      {ring.items.map((f, k) => {
                        const a = (k / ring.items.length) * Math.PI * 2 + ring.phase;
                        return (
                          <circle
                            key={f.slug}
                            cx={(C + ring.r * Math.cos(a)).toFixed(1)}
                            cy={(C + ring.r * Math.sin(a)).toFixed(1)}
                            r={on ? 6 : 3.6}
                            fill={on ? "var(--brand-3)" : "#fff"}
                            style={{ transition: "r .4s, fill .4s" }}
                          >
                            <title>{f.name}</title>
                          </circle>
                        );
                      })}
                    </g>
                  </g>
                );
              })}
              <circle cx={C} cy={C} r="62" fill="var(--brand)" style={{ opacity: tied ? 1 : 0.35, transition: "opacity 1.4s" }} />
              <circle cx={C} cy={C} r="70" fill="none" stroke="rgb(255 255 255 / 0.3)" />
              <text x={C} y={C - 4} textAnchor="middle" fill="#fff" style={{ font: "400 34px var(--font-instrument), serif" }}>
                1
              </text>
              <text x={C} y={C + 18} textAnchor="middle" fill="rgb(255 255 255 / 0.8)" style={{ font: "500 9px var(--font-geist), sans-serif", letterSpacing: "0.14em" }}>
                CONTROL SET
              </text>
            </svg>
            <figcaption className="mt-3 text-center text-[0.8rem] text-ivory/55 md:mt-6 md:text-sm">
              <span className="serif mr-2 text-base italic text-ivory">Fig. 1</span>
              Each ring is a framework family. Each point is one of {frameworkCount} frameworks.
              <span className="mt-1 block md:hidden">Tap a family to find its ring.</span>
            </figcaption>
          </figure>

          {/* Phones: no hover, so families are tap targets that light their ring */}
          <div className="md:hidden">
            <ol className="grid grid-cols-2 gap-1.5">
              {RINGS.map((ring, i) => (
                <li key={ring.id}>
                  <button
                    type="button"
                    aria-pressed={hi === i}
                    onClick={() => setHi(hi === i ? null : i)}
                    className={`flex h-full w-full flex-col rounded-[6px] border p-3 text-left transition-colors ${hi === i ? "border-brand-3 bg-brand-3/10" : "border-line-dark"}`}
                  >
                    <span className="flex items-baseline justify-between">
                      <span className={`serif text-xs italic ${hi === i ? "text-brand-3" : "text-ivory/40"}`}>0{i + 1}</span>
                      <span className="serif text-sm italic text-ivory/50">{ring.items.length}</span>
                    </span>
                    <span className="mt-1.5 text-[0.88rem] leading-tight">{ring.name}</span>
                    <span className="mt-1 text-[0.72rem] leading-snug text-ivory/50">{ring.blurb}</span>
                  </button>
                </li>
              ))}
            </ol>
            <Link href="/frameworks" className="mt-4 inline-flex items-center gap-2 text-sm text-ivory/80 underline underline-offset-4">
              Browse all {frameworkCount} frameworks
            </Link>
          </div>

          <ol className="hidden border-t border-line-dark md:block lg:col-span-5" onMouseLeave={() => setHi(null)}>
            {RINGS.map((ring, i) => (
              <li key={ring.id}>
                <Link
                  href="/frameworks"
                  onMouseEnter={() => setHi(i)}
                  onFocus={() => setHi(i)}
                  onBlur={() => setHi(null)}
                  className={`group grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-b border-line-dark py-4 transition-colors ${hi === i ? "text-ivory" : "text-ivory/75"}`}
                >
                  <span className={`serif text-sm italic ${hi === i ? "text-brand-3" : "text-ivory/40"}`}>0{i + 1}</span>
                  <span>
                    <span className="block text-[1.05rem]">{ring.name}</span>
                    <span className="mt-1 block text-sm text-ivory/50">{ring.blurb}</span>
                  </span>
                  <span className="serif text-lg italic text-ivory/50">{ring.items.length}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
