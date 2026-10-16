"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { process } from "@/lib/content";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function Process({ eyebrow = "" }: { eyebrow?: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [swipe, setSwipe] = useState(0);

  useLayoutEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const distance = () => tr.scrollWidth - window.innerWidth;
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(".proc-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".proc-panel").forEach((p) => {
        gsap.from(p.querySelectorAll(".proc-anim"), {
          y: 60,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 85%" },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} data-theme="dark" className="relative overflow-hidden bg-brand text-ivory md:h-screen">
      <div className="flex h-full flex-col py-16 md:py-0">
        <div className="container-x flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-6 md:pt-32">
          <div>
            <p className="eyebrow text-ivory/50">{eyebrow}</p>
            <h2 className="display mt-4 text-[clamp(2.3rem,6vw,6rem)] md:mt-6">
              From tangle <span className="em text-accent">to tied</span>
            </h2>
          </div>
          <p className="max-w-xs text-ivory/55 md:text-right">
            A typical SOC 2 or ISO 27001 timeline.<span className="md:hidden"> Swipe through the five stages.</span>
          </p>
        </div>

        {/* Desktop: scrubbed by the pin. Phones: follows the swipe. */}
        <div className="container-x mt-6 md:mt-10">
          <div className="h-px w-full bg-ivory/15">
            <div className="proc-bar hidden h-px origin-left scale-x-0 bg-accent md:block" />
            <div className="h-px origin-left bg-accent transition-transform duration-300 md:hidden" style={{ transform: `scaleX(${Math.max(0.2, swipe)})` }} />
          </div>
        </div>

        <div
          ref={track}
          data-lenis-prevent-wheel
          onScroll={(e) => {
            const t = e.currentTarget;
            setSwipe(t.scrollLeft / Math.max(1, t.scrollWidth - t.clientWidth));
          }}
          className="mt-5 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] md:mt-auto md:snap-none md:gap-6 md:overflow-visible md:pb-20 md:pr-[20vw] [&::-webkit-scrollbar]:hidden"
        >
          {process.map((p) => (
            <article
              key={p.n}
              className="proc-panel relative flex w-[78vw] shrink-0 snap-start flex-col justify-between rounded-[1.25rem] border border-ivory/12 bg-ivory/[0.03] p-5 md:h-[52vh] md:w-[38vw] md:rounded-[2rem] md:p-10 lg:w-[30vw]"
            >
              <div className="proc-anim flex items-center justify-between">
                <span className="eyebrow text-accent">{p.time}</span>
                
              </div>
              <div className="mt-8 md:mt-0">
                <p className="proc-anim em text-[clamp(3.6rem,9vw,9rem)] leading-[0.8] text-ivory/15">{p.n}</p>
                <h3 className="proc-anim mt-3 text-3xl tracking-[-0.03em] md:mt-4 md:text-5xl">{p.title}</h3>
                <p className="proc-anim mt-3 max-w-sm text-[0.92rem] leading-relaxed text-ivory/65 md:mt-4 md:text-base">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
