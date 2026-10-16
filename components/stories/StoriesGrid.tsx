"use client";

import { useMemo, useState } from "react";
import type { Story } from "@/lib/stories";
import { StoryCard } from "./StoryCard";

export function StoriesGrid({ items, industries, frameworks }: { items: Story[]; industries: string[]; frameworks: string[] }) {
  const [industry, setIndustry] = useState("All");
  const [framework, setFramework] = useState("All");

  const list = useMemo(
    () => items.filter((s) => (industry === "All" || s.industry === industry) && (framework === "All" || s.frameworks.includes(framework))),
    [items, industry, framework],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 border-y border-line py-4 md:gap-4 md:py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-[var(--gutter)] flex gap-1.5 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter by industry">
          {["All", ...industries].map((i) => (
            <button
              key={i}
              type="button"
              aria-pressed={industry === i}
              onClick={() => setIndustry(i)}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.82rem] transition-colors duration-300 md:px-4 md:text-sm ${industry === i ? "bg-ink text-ivory" : "bg-ink/[0.04] hover:bg-ink/5 md:bg-transparent"}`}
            >
              {i}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm">
          <span className="eyebrow text-muted">Framework</span>
          <select
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            className="h-10 min-w-0 flex-1 rounded-full border border-ink/15 bg-transparent px-4 outline-none focus:border-brand md:flex-none"
          >
            {["All", ...frameworks].map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="eyebrow mt-5 text-muted md:mt-8" aria-live="polite">
        Showing {list.length} of {items.length} stories
      </p>

      <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {list.map((s, i) => (
          <div key={s.slug} className="animate-[fadeUp_0.7s_var(--ease-out)_both]" style={{ animationDelay: `${i * 60}ms` }}>
            <StoryCard story={s} className="h-full" />
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <div className="mt-6 rounded-[2rem] border border-dashed border-ink/20 p-8 text-center md:p-16">
          <p className="text-2xl tracking-[-0.02em]">No stories match those filters yet.</p>
          <button type="button" onClick={() => (setIndustry("All"), setFramework("All"))} className="mt-4 underline underline-offset-4">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
