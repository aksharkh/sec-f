"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, markSiteBusy, markSiteReady, prefersReducedMotion, smoothStalls } from "@/lib/gsap";
import { SecureKnotsLogo } from "@/components/brand/SecureKnotsLogo";
import { knotTimeline } from "@/lib/brand/knotTimeline";

/** The loader ties the knot in 3.3s; between pages it ties at this speed. */
const KNOT_SPEED = 2.4;

/**
 * Curtain page transitions. Internal link clicks are intercepted: the curtain
 * rises to cover the screen while the SecureKnots knot ties itself (the same
 * motion as the first-visit loader, faster), the route changes, and once the
 * knot is tied the curtain continues up and away to reveal the new page,
 * whose hero animations wait for the "ready" signal.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pending = useRef(false);
  const lastPath = useRef<string | null>(null);
  const knot = useRef<ReturnType<typeof knotTimeline> | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page / hash links
      e.preventDefault();

      if (prefersReducedMotion() || pending.current) {
        router.push(url.pathname + url.search + url.hash);
        return;
      }
      pending.current = true;
      markSiteBusy();
      smoothStalls(true);
      window.__lenis?.stop();
      const el = curtain.current!;
      if (label.current) label.current.textContent = a.dataset.label || prettify(url.pathname);
      gsap.set(el, { visibility: "visible", yPercent: 100 });
      gsap.set(".pt-inner", { yPercent: 30, autoAlpha: 0 });
      const logo = el.querySelector<SVGSVGElement>(".pt-logo");
      knot.current?.kill();
      if (logo) logo.setAttribute("data-knot-intro", "");
      gsap
        .timeline()
        .to(el, { yPercent: 0, duration: 0.7, ease: "expo.inOut" })
        .to(".pt-inner", { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "expo.out" }, "-=0.3")
        .add(() => {
          if (logo) knot.current = knotTimeline(logo).timeScale(KNOT_SPEED);
        }, 0.35)
        .add(() => router.push(url.pathname + url.search + url.hash));
    };
    // Capture phase: runs before next/link's handler, which then sees
    // defaultPrevented and leaves navigation to us.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // New route rendered → reset scroll, refresh triggers, lift the curtain.
  useEffect(() => {
    // Only react to real route changes (effects may run twice in development).
    if (lastPath.current === null || lastPath.current === pathname) {
      lastPath.current = pathname;
      return;
    }
    lastPath.current = pathname;
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const el = curtain.current!;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (!pending.current) {
        markSiteReady();
        return;
      }
      const lift = () =>
        gsap
        .timeline({
          onComplete: () => {
            gsap.set(el, { visibility: "hidden" });
            pending.current = false;
            smoothStalls(false);
          },
        })
        .to(".pt-inner", { yPercent: -30, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0.1)
        .to(el, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 0.2)
        .add(() => {
          window.__lenis?.start();
          markSiteReady();
        }, 0.55);
      // Lift only once the knot is tied (it usually is by the time the page renders).
      const k = knot.current;
      if (k && k.isActive()) k.then(() => lift());
      else lift();
    });
  }, [pathname]);

  return (
    <div
      ref={curtain}
      aria-hidden
      className="invisible fixed inset-0 z-[95] flex items-center justify-center overflow-hidden rounded-none bg-paper text-ink"
    >
      <div className="pt-inner flex flex-col items-center gap-5">
        <SecureKnotsLogo animated className="pt-logo h-20 w-auto md:h-24" />
        <span ref={label} className="serif text-[clamp(2.6rem,6vw,5.4rem)] leading-none" />
      </div>
    </div>
  );
}

function prettify(path: string) {
  const seg = path.split("/").filter(Boolean);
  if (!seg.length) return "Home";
  const last = seg[seg.length - 1].replace(/-/g, " ");
  return last.length <= 4 ? last.toUpperCase() : last.replace(/\b\w/g, (c) => c.toUpperCase());
}
