"use client";

import { useCallback, useRef, useState } from "react";
import { controlDomains } from "@/lib/content";
import { CoverageMatrix, matrixStats } from "@/components/signal/home/CoverageMatrix";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Frameworks page: every framework (column) against every control domain
 * (row). Hovering a cell names the pair and how many frameworks share it.
 */
export function CoverageGrid() {
  const collapse = useRef(0);
  const [tip, setTip] = useState<string | null>(null);
  const onHover = useCallback((l: string | null) => setTip(l), []);

  return (
    <section id="coverage-matrix" className="bg-paper py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 border-t border-line pt-6 lg:grid-cols-12">
          <p className="eyebrow text-muted lg:col-span-3">Coverage matrix</p>
          <div className="lg:col-span-9">
            <Reveal as="h2" className="wide max-w-4xl text-[clamp(2.4rem,5vw,5rem)] leading-[0.98]">
              {matrixStats.frameworks} frameworks. <span className="em text-brand">{matrixStats.domains} control domains.</span>
            </Reveal>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              Each column is a framework, each row a control domain. The lit cells overlap heavily, which is why we test a control once and map it everywhere.
            </p>
          </div>
        </div>

        <figure className="mt-14 md:mt-12">
          <div className="rounded-[6px] border border-line bg-ivory p-3 md:p-6">
            <div style={{ aspectRatio: `${matrixStats.frameworks} / ${matrixStats.domains}` }}>
              <CoverageMatrix collapse={collapse} onHover={onHover} className="block size-full cursor-crosshair" />
            </div>
          </div>
          <figcaption className="mt-4 flex flex-col gap-3 text-sm text-muted md:flex-row md:items-baseline md:justify-between">
            <span className="min-h-[1.5em] text-ink" aria-live="polite">
              {tip ?? (
                <>
                  <span className="serif mr-2 text-base italic">Fig. 1</span>
                  <span className="text-muted">Hover a cell to see the overlap.</span>
                </>
              )}
            </span>
            <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-2">
                <span className="size-2.5 bg-ink/60" /> In scope
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1 bg-muted-dark" /> Not in scope
              </span>
              <span>Illustrative mapping across {controlDomains.length} domains</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
