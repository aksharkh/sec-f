"use client";

import { useEffect, useRef } from "react";
import { gsap, onSiteReady, prefersReducedMotion } from "@/lib/gsap";
import { frameworkCount } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Threads, ThreadsVertical } from "./Threads";

const READINESS = [
  { name: "SOC 2 Type II", pct: 96 },
  { name: "ISO 27001", pct: 91 },
  { name: "HIPAA", pct: 87 },
  { name: "PCI DSS", pct: 82 },
];

const EVIDENCE = ["Access review signed off", "Encryption standard approved"];

/**
 * Editorial hero: a serif statement over a quiet figure in which every
 * framework is a thread tied into one strand. The strand runs into a small,
 * clearly labelled readiness card: one sample program, not a product.
 */
export function MeridianHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set(".mh-fade", { autoAlpha: 0, y: 14 });
      gsap.set(".mh-card", { autoAlpha: 0, y: 18 });
      gsap.set(".mh-bar", { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(".mh-feed", { autoAlpha: 0, x: 10 });
      onSiteReady(() => {
        gsap.to(".mh-fade", { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08, delay: 0.55 });
        // The card arrives once the threads have been tied (see Threads timeline).
        gsap
          .timeline({ delay: 3 })
          .to(".mh-card", { autoAlpha: 1, y: 0, duration: 1 })
          .to(".mh-bar", { scaleX: 1, duration: 1.2, stagger: 0.08 }, 0.2)
          .to(".mh-feed", { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.15 }, 0.6);
      });
      gsap.to(".mh-copy", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="start" data-rail="Start" className="relative overflow-hidden bg-ivory pb-8 pt-24 md:pb-12 md:pt-28">
      <div className="mh-copy container-x">
        <div className="mh-fade flex flex-col gap-2 border-b border-line pb-4 md:flex-row md:items-center md:justify-between md:gap-6 md:pb-5">
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="size-1.5 rounded-full bg-brand" />
            Compliance advisory &amp; audit readiness
          </p>
          <p className="text-[0.8rem] text-muted md:text-sm">
            {frameworkCount} frameworks · Practitioner-led · US &amp; India
          </p>
        </div>

        <div className="mt-7 grid gap-6 md:mt-10 md:gap-10 lg:grid-cols-12 lg:items-end">
          <h1 className="wide text-[clamp(3.2rem,7.8vw,8.8rem)] leading-[0.92] lg:col-span-8">
            <Reveal as="span" trigger="load" delay={0.25} className="block">
              Many frameworks.
            </Reveal>
            <Reveal as="span" trigger="load" delay={0.4} className="block">
              One <span className="em text-brand">secure knot.</span>
            </Reveal>
          </h1>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="mh-fade max-w-md text-[1.02rem] leading-relaxed text-ink/70 md:text-lg">
              We get you audit-ready for SOC 2, ISO 27001, FedRAMP, CMMC and {frameworkCount - 4} more frameworks as one program, then coordinate the independent auditors who issue your reports.
            </p>
            <div className="mh-fade mt-6 flex flex-wrap gap-3 md:mt-8">
              <Button href="#book">Book a consultation</Button>
              <Button href="#readiness" variant="outline">
                60-second readiness check
              </Button>
            </div>
          </div>
        </div>
      </div>

      <figure className="container-x mt-8 md:mt-10">
        <div className="overflow-hidden rounded-[6px] border border-line bg-paper/70">
          <div className="relative px-3 pt-4 md:px-6 md:pt-6">
            <Threads className="hidden h-auto w-full md:block" />
            <ThreadsVertical className="block w-full md:hidden" />
            <div className="pb-4 md:pb-6 lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-6 lg:flex lg:items-center lg:pb-0">
              <ReadinessCard />
            </div>
          </div>
          <figcaption className="flex flex-col gap-1 border-t border-line px-4 py-3 text-sm text-muted md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-4">
          <span>
            <span className="serif mr-2 text-base italic text-ink">Fig. 1</span>
            Each thread is a framework a buyer may ask you to prove.
          </span>
          <span className="hidden md:inline">Hover a thread to trace it</span>
          <span className="md:hidden">Tap a thread or name to trace it.</span>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden>
      <path d="M2 5.2 4.2 7.4 8 2.8" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

/** Small illustrative dashboard: readiness bars plus an "evidence once" feed. */
function ReadinessCard() {
  return (
    <aside
      aria-label="Illustrative readiness snapshot for a sample program"
      className="mh-card relative mx-auto mt-0 w-full max-w-sm rounded-[6px] border border-line bg-ivory/95 p-4 shadow-[0_24px_60px_-30px_rgb(15_23_41/0.35)] backdrop-blur md:mt-6 lg:pointer-events-auto lg:mt-0 lg:w-[18rem]"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">Readiness snapshot</p>
        <span className="eyebrow rounded-full border border-line px-2 py-0.5 text-[0.6rem] text-muted">Illustrative</span>
      </div>
      <ul className="mt-3 space-y-2">
        {READINESS.map((f) => (
          <li key={f.name}>
            <div className="flex items-baseline justify-between text-[0.82rem]">
              <span>{f.name}</span>
              <span className="mono text-xs text-muted">{f.pct}%</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-paper">
              <div className="mh-bar h-full rounded-full bg-brand" style={{ width: `${f.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="eyebrow mt-4 border-t border-line pt-3 text-[0.6rem] text-muted">Evidence, collected once</p>
      <ul className="mt-2 space-y-1.5">
        {EVIDENCE.map((e) => (
          <li key={e} className="mh-feed flex items-center gap-3 rounded-[4px] bg-paper px-3 py-1.5">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-ivory">
              <Check className="size-2.5" />
            </span>
            <span className="min-w-0 text-[0.78rem] leading-tight">
              <span className="block truncate">{e}</span>
              <span className="block text-muted">Mapped to 4 frameworks</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.68rem] leading-snug text-muted">Sample program for illustration, not a product.</p>
    </aside>
  );
}
