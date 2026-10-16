"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { stories } from "@/lib/stories";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { StoryCard } from "@/components/stories/StoryCard";

/** Draggable horizontal rail of customer stories. */
export function StoriesRail({ eyebrow = "Customer stories" }: { eyebrow?: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const on = () => setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
    el.addEventListener("scroll", on, { passive: true });

    // Mouse drag to scroll
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;
    const pd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
    };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const pu = () => {
      if (!down) return;
      down = false;
      el.style.scrollSnapType = "";
    };
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("scroll", on);
      el.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
      el.removeEventListener("click", click, true);
    };
  }, []);

  const step = (d: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: d * ((card?.offsetWidth ?? 400) + 20), behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-ivory py-16 md:py-24 lg:py-28">
      <div className="container-x">
        <div className="grid gap-4 md:grid-cols-12 md:gap-10">
          <p className="eyebrow text-muted md:col-span-3">{eyebrow}</p>
          <div className="md:col-span-9">
            <Reveal as="h2" className="display text-[clamp(2.3rem,6.5vw,7rem)]">
              Proof, <span className="em text-brand">not promises.</span>
            </Reveal>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 md:mt-10 md:gap-6">
              <p className="max-w-md text-base text-muted md:text-lg">
                How teams across healthcare, fintech, defense and AI tied their frameworks into one program.
              </p>
              <div className="flex items-center gap-3">
                <RailBtn onClick={() => step(-1)} label="Previous stories" flip />
                <RailBtn onClick={() => step(1)} label="Next stories" />
                <Link href="/customers" className="group ml-3 inline-flex items-center gap-2 font-medium">
                  <span className="link-sweep">All stories</span>
                  <Arrow className="size-3 transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={rail}
        data-lenis-prevent-wheel
        className="mt-8 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] pb-4 md:gap-5 [scrollbar-width:none] md:mt-12 [&::-webkit-scrollbar]:hidden"
        data-cursor="Drag"
      >
        {stories.map((s) => (
          <div key={s.slug} data-card className="w-[86vw] shrink-0 snap-start sm:w-[26rem] lg:w-[30rem]">
            <StoryCard story={s} className="h-full" />
          </div>
        ))}
        <div className="w-[var(--gutter)] shrink-0" />
      </div>

      <div className="container-x mt-5 md:mt-8">
        <div className="h-px w-full bg-ink/10">
          <div className="h-px origin-left bg-ink transition-transform duration-300" style={{ transform: `scaleX(${Math.max(0.12, progress)})` }} />
        </div>
      </div>
    </section>
  );
}

function RailBtn({ onClick, label, flip }: { onClick: () => void; label: string; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-ink/15 transition-colors duration-500 hover:bg-ink hover:text-ivory md:size-12"
    >
      <svg viewBox="0 0 16 16" className={`size-4 ${flip ? "rotate-180" : ""}`} fill="none">
        <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
