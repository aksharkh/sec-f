"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, onSiteReady, prefersReducedMotion } from "@/lib/gsap";
import { knotTimeline, showKnot } from "@/lib/brand/knotTimeline";
import { SecureKnotsLogo } from "./SecureKnotsLogo";

// One loose thread each side, with a little slack so it reads as thread, not a rule.
const LEFT = "M0 24 C 180 24, 260 10, 420 18 S 640 34, 720 24";
const RIGHT = "M0 24 C 80 14, 300 36, 460 26 S 620 12, 720 24";

/**
 * A thread that draws in from the left, ties the SecureKnots knot at the
 * center, and runs on to the right edge. Light on purpose: strokes only.
 *
 * trigger="scroll" (section divider): the thread follows the scroll and the
 * knot ties as it passes the middle of the screen.
 * trigger="ready" (under a page title): plays once the page is revealed,
 * so every page change ends with the knot being tied.
 */
export function ThreadKnot({ dark, trigger = "scroll", className }: { dark?: boolean; trigger?: "scroll" | "ready"; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const svg = el?.querySelector<SVGSVGElement>(".tk-knot svg");
    if (!el || !svg) return;
    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll(".tk-thread"), { strokeDashoffset: 0 });
      showKnot(svg);
      return;
    }
    let knot: ReturnType<typeof knotTimeline> | null = null;
    let stopReady = () => {};
    const ctx = gsap.context(() => {
      const [l, r] = el.querySelectorAll<SVGPathElement>(".tk-thread");
      if (trigger === "scroll") {
        gsap.fromTo(l, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", autoRound: false, scrollTrigger: { trigger: el, start: "top 92%", end: "top 62%", scrub: 0.6 } });
        gsap.fromTo(r, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", autoRound: false, scrollTrigger: { trigger: el, start: "top 64%", end: "top 34%", scrub: 0.6 } });
        ScrollTrigger.create({
          trigger: el,
          start: "top 66%",
          once: true,
          onEnter: () => {
            knot = knotTimeline(svg).timeScale(1.5);
          },
        });
      } else {
        gsap.set([l, r], { strokeDashoffset: 1 });
        stopReady = onSiteReady(() => {
          gsap.to(l, { strokeDashoffset: 0, duration: 0.9, delay: 0.35, ease: "power2.inOut", autoRound: false });
          gsap.delayedCall(0.75, () => {
            knot = knotTimeline(svg).timeScale(1.7);
          });
          gsap.to(r, { strokeDashoffset: 0, duration: 1.1, delay: 2, ease: "power2.inOut", autoRound: false });
        });
      }
    }, el);
    return () => {
      stopReady();
      knot?.kill();
      ctx.revert();
    };
  }, [trigger]);

  const stroke = dark ? "stroke-brand-3/70" : "stroke-brand/55";
  return (
    <div ref={root} aria-hidden className={className}>
      <div className="flex items-center">
        <svg viewBox="0 0 720 48" preserveAspectRatio="none" className="h-8 min-w-0 flex-1 overflow-visible md:h-12" fill="none">
          <path className={`tk-thread ${stroke}`} d={LEFT} strokeWidth={1.4} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} />
        </svg>
        <span className={`tk-knot mx-3 block shrink-0 md:mx-5 ${dark ? "text-brand-3" : "text-brand"}`}>
          <SecureKnotsLogo variant="knot" animated className="h-9 w-auto md:h-12" />
        </span>
        <svg viewBox="0 0 720 48" preserveAspectRatio="none" className="h-8 min-w-0 flex-1 overflow-visible md:h-12" fill="none">
          <path className={`tk-thread ${stroke}`} d={RIGHT} strokeWidth={1.4} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} />
        </svg>
      </div>
    </div>
  );
}
