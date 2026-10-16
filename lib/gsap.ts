"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1.2 });
}

export { gsap, ScrollTrigger, SplitText };

/**
 * Lenis needs GSAP's lag smoothing off, so a long main-thread stall makes
 * every running animation jump ahead. While the knot plays over a page that
 * is still starting up (loader, page transitions), turn smoothing on so the
 * knot pauses through a stall instead of skipping, then turn it off again.
 */
export function smoothStalls(on: boolean) {
  gsap.ticker.lagSmoothing(on ? 250 : 0, 33);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * "Ready" fires when the page is visible: after the preloader on first load,
 * and again after each page-transition curtain lifts.
 */
export const READY_EVENT = "sk:ready";

type W = { __skReady?: boolean };

export function onSiteReady(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if ((window as unknown as W).__skReady) {
    cb();
    return () => {};
  }
  window.addEventListener(READY_EVENT, cb, { once: true });
  return () => window.removeEventListener(READY_EVENT, cb);
}

export function markSiteReady() {
  (window as unknown as W).__skReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

export function markSiteBusy() {
  (window as unknown as W).__skReady = false;
}

/* ───────── Global UI events (usable from server components via href="#book") ───────── */
export const BOOK_EVENT = "sk:book";
export const SEARCH_EVENT = "sk:search";
export const TOAST_EVENT = "sk:toast";

export function openBooking(detail?: { framework?: string; frameworks?: string[]; message?: string }) {
  window.dispatchEvent(new CustomEvent(BOOK_EVENT, { detail }));
}
export function openSearch() {
  window.dispatchEvent(new Event(SEARCH_EVENT));
}
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}
