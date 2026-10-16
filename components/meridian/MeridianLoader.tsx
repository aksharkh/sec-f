"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, markSiteReady, prefersReducedMotion, smoothStalls } from "@/lib/gsap";
import { SecureKnotsLogo } from "@/components/brand/SecureKnotsLogo";
import { KNOT_DURATION, knotTimeline, showKnot } from "@/lib/brand/knotTimeline";

const SEEN_KEY = "sk-preloaded";
/** Later loads in the same browser session (refreshes) tie the knot faster. */
const REPEAT_SPEED = 1.7;

/**
 * Meridian loader: the SecureKnots badge ties itself (threads drift in and
 * knot together), the serif wordmark settles beneath it while a hairline
 * fills, then the whole sheet lifts away like a page being turned.
 * Plays on every full page load; refreshes within a session play it faster.
 * The wordmark starts hidden in the server HTML so the name never shows
 * on its own before the knot has started.
 */
export function MeridianLoader() {
  const root = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      smoothStalls(false);
      window.__lenis?.start();
      markSiteReady();
      setDone(true);
    };
    const logo = el.querySelector<SVGSVGElement>(".ml-logo")!;
    if (prefersReducedMotion()) {
      showKnot(logo);
      gsap.set(el.querySelector(".ml-word"), { autoAlpha: 1 });
      gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.3, onComplete: finish });
      return;
    }

    window.__lenis?.stop();
    window.scrollTo(0, 0);
    const q = gsap.utils.selector(el);
    const p = { v: 0 };

    smoothStalls(true);
    const tl = gsap.timeline({ paused: true });
    tl.add(knotTimeline(logo), 0.1)
      .fromTo(q(".ml-word"), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out" }, 1.6)
      .from(q(".ml-meta"), { autoAlpha: 0, y: 8, duration: 0.8, stagger: 0.08, ease: "expo.out" }, 0.4)
      .to(
        p,
        {
          v: 100,
          duration: KNOT_DURATION,
          ease: "power2.inOut",
          onUpdate: () => {
            (q(".ml-bar")[0] as HTMLElement).style.transform = `scaleX(${p.v / 100})`;
            if (pct.current) pct.current.textContent = String(Math.round(p.v)).padStart(2, "0");
          },
        },
        0.1,
      )
      .to(q(".ml-center, .ml-meta"), { autoAlpha: 0, y: -16, duration: 0.5, stagger: 0.03, ease: "power2.in" }, "+=0.2")
      .to(el, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.15")
      .add(finish, "-=0.45");
    if (seen) tl.timeScale(REPEAT_SPEED);
    // Start once the rest of the page has finished mounting (two frames), so
    // the opening of the knot isn't spent behind that start-up work.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => tl.play());
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      tl.kill();
      smoothStalls(false);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[90] bg-ivory text-ink" aria-hidden>
      <div className="container-x flex h-full flex-col">
        <div className="flex justify-between pt-8">
          <span className="ml-meta eyebrow text-muted">SecureKnots</span>
          <span className="ml-meta eyebrow text-muted">Compliance advisory</span>
        </div>

        <div className="ml-center flex flex-1 flex-col items-center justify-center gap-7">
          <SecureKnotsLogo animated className="ml-logo h-32 w-auto md:h-40" />
          <span className="block overflow-hidden pb-2">
            <span className="ml-word serif invisible block text-[clamp(2.4rem,5vw,4rem)] leading-none">
              Secure<span className="italic">Knots</span>
            </span>
          </span>
        </div>

        <div className="pb-8">
          <div className="flex items-end justify-between pb-4">
            <span className="ml-meta text-sm text-muted">Assess once. Comply to many.</span>
            <span className="ml-meta mono text-sm tabular-nums text-muted">
              <span ref={pct}>00</span>
            </span>
          </div>
          <div className="ml-meta h-px w-full bg-line">
            <div className="ml-bar h-px w-full origin-left scale-x-0 bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}
