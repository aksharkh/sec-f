import { gsap } from "@/lib/gsap";

/** Seconds until the knot is fully tied (useful for syncing loaders). */
export const KNOT_DURATION = 3.3;

/**
 * "Tying the knot": the hexagon traces itself, the navy fills in, then every
 * strand drifts in from outside the badge while drawing along its own
 * centerline (back strands first, the loose ends last). The knot cinches
 * tight and a sheen runs across the metal.
 *
 * Works on an <SecureKnotsLogo animated /> element. Returns a pausable
 * GSAP timeline that ends on the exact static logo.
 */
export function knotTimeline(svg: SVGSVGElement, { delay = 0 }: { delay?: number } = {}) {
  const all = <T extends Element>(s: string) => Array.from(svg.querySelectorAll<T>(s));
  const frame = svg.querySelector("[data-knot-frame]");
  const line = svg.querySelector("[data-knot-frame-line]");
  const knot = svg.querySelector("[data-knot-strands]");
  const shine = svg.querySelector("[data-knot-shine]");
  const pieces = all<SVGGElement>("[data-knot-piece]");
  const [, , vw] = (svg.getAttribute("viewBox") ?? "0 0 375 439").split(" ").map(Number);

  const tl = gsap.timeline({
    delay,
    onComplete: () => {
      svg.removeAttribute("data-knot-intro");
      gsap.set(all("[data-knot-draw]"), { clearProps: "strokeDasharray,strokeDashoffset" });
    },
  });

  if (line) {
    tl.fromTo(line, { opacity: 1, strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", autoRound: false }, 0);
    tl.to(line, { opacity: 0, duration: 0.6, ease: "power1.out" }, 1.3);
  }
  if (frame) {
    tl.fromTo(frame, { opacity: 0, scale: 0.94, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 1.1, ease: "expo.out" }, 0.55);
  }

  pieces.forEach((el, i) => {
    const layer = Number(el.dataset.layer ?? 0);
    const [ox, oy] = (el.dataset.out ?? "0,0").split(",").map(Number);
    const dir = Number(el.dataset.dir ?? 1);
    const at = 0.7 + layer * 0.26 + (i % 4) * 0.05;
    const spin = (i % 2 ? 1 : -1) * (8 + (i % 3) * 3);
    tl.fromTo(
      el,
      { x: ox * 46, y: oy * 46, rotation: spin, opacity: 0, transformOrigin: "50% 50%" },
      { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.15, ease: "expo.out" },
      at,
    );
    const path = el.querySelector("[data-knot-draw]");
    if (path) {
      tl.fromTo(path, { strokeDasharray: "1 1", strokeDashoffset: 1.02 * dir }, { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut", autoRound: false }, at);
    }
  });

  if (knot) {
    tl.to(knot, { scale: 0.972, transformOrigin: "50% 50%", duration: 0.18, ease: "power2.in" }, 2.3);
    tl.to(knot, { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.45)" }, 2.48);
  }
  if (shine) {
    tl.fromTo(shine, { attr: { x: -vw * 0.7 }, opacity: 1 }, { attr: { x: vw * 1.1 }, duration: 0.95, ease: "power2.inOut" }, 2.35);
    tl.set(shine, { opacity: 0 });
  }
  return tl;
}

/** Show the finished logo immediately (reduced motion, or a skipped intro). */
export function showKnot(svg: SVGSVGElement) {
  svg.removeAttribute("data-knot-intro");
}
