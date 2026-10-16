"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { knotTimeline, showKnot } from "@/lib/brand/knotTimeline";
import { SecureKnotsLogo } from "./SecureKnotsLogo";

/** The badge ties itself when it scrolls into view; clicking it ties it again. */
export function TyingKnot({ className }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const tl = useRef<ReturnType<typeof knotTimeline> | null>(null);

  const svg = () => ref.current?.querySelector("svg") ?? null;

  const play = () => {
    const el = svg();
    if (!el) return;
    tl.current?.kill();
    el.setAttribute("data-knot-intro", "");
    tl.current = knotTimeline(el);
  };

  useEffect(() => {
    const el = svg();
    if (!el) return;
    if (prefersReducedMotion()) {
      showKnot(el);
      return;
    }
    const st = ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: play });
    return () => {
      st.kill();
      tl.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- play once on first view
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => !prefersReducedMotion() && play()}
      aria-label="SecureKnots logo. Tie the knot again"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <SecureKnotsLogo animated className="h-full w-auto" />
    </button>
  );
}
