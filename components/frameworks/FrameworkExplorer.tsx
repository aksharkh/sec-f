"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { isCore, type Framework } from "@/lib/frameworks";
import { frameworkGroups } from "@/lib/content";
import { Glyph } from "@/components/ui/Glyph";
import { Arrow } from "@/components/ui/Button";

export function FrameworkExplorer({ items }: { items: Framework[] }) {
  const [group, setGroup] = useState("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const hits = items.filter(
      (f) =>
        (group === "all" || f.groupId === group) &&
        (!term || f.name.toLowerCase().includes(term) || f.full.toLowerCase().includes(term) || f.issuer.toLowerCase().includes(term)),
    );
    // Core frameworks lead the list (stable sort keeps the rest in order).
    return [...hits].sort((a, b) => Number(isCore(b.slug)) - Number(isCore(a.slug)));
  }, [items, group, q]);

  const tabs = [{ id: "all", name: "All", n: items.length }, ...frameworkGroups.map((g) => ({ id: g.id, name: g.name, n: g.items.length }))];

  return (
    <section className="bg-ivory pb-16 md:pb-24 lg:pb-28">
      <div className="container-x">
        <div className="sticky top-[calc(var(--nav-offset,76px)+6px)] z-30 -mx-2 transition-[top] duration-500 flex flex-col gap-2 rounded-[1.75rem] border border-line bg-ivory/85 p-1.5 backdrop-blur-xl md:top-[calc(var(--nav-offset,76px)+20px)] md:gap-3 md:p-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-1 overflow-x-auto [scrollbar-width:none]" role="tablist" aria-label="Framework categories">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={group === t.id}
                onClick={() => setGroup(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[0.82rem] transition-colors duration-300 md:px-4 md:py-2.5 md:text-sm ${
                  group === t.id ? "bg-ink text-ivory" : "hover:bg-ink/5"
                }`}
              >
                {t.name}
                <span className={`eyebrow text-[0.6rem] ${group === t.id ? "text-accent" : "text-muted"}`}>{t.n}</span>
              </button>
            ))}
          </div>
          <label className="relative flex items-center">
            <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-4 size-4 text-muted" fill="none">
              <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search frameworks"
              aria-label="Search frameworks"
              className="h-10 w-full rounded-full bg-ink/5 pl-11 pr-4 text-sm outline-none focus:bg-ink/10 md:h-11 lg:w-72"
            />
          </label>
        </div>

        <p className="eyebrow mt-6 text-muted md:mt-10" aria-live="polite">
          {list.length} {list.length === 1 ? "framework" : "frameworks"}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 md:mt-6 md:gap-3 lg:grid-cols-3">
          {list.map((f, i) => (
            <Link
              key={f.slug}
              href={`/frameworks/${f.slug}`}
              data-cursor="Explore"
              data-fx
              data-label={f.name}
              style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
              className="group relative flex animate-[fadeUp_0.7s_var(--ease-out)_backwards] flex-col justify-between gap-5 overflow-hidden rounded-[1.75rem] border border-line bg-paper/60 p-4 transition-colors md:min-h-72 md:gap-0 md:p-7 duration-700 ease-out-expo hover:border-brand hover:bg-brand hover:text-ivory"
            >
              <Glyph
                seed={f.slug}
                className="pointer-events-none absolute -bottom-1/3 -right-1/4 w-[85%] text-accent opacity-0 transition-all duration-1000 ease-out-expo group-hover:rotate-12 group-hover:opacity-50"
                strands={7}
              />
              <div className="relative flex items-start justify-between gap-2 md:gap-4">
                <span className="eyebrow text-[0.56rem] leading-snug text-muted transition-colors group-hover:text-accent md:text-[0.7rem]">
                  {isCore(f.slug) && <span className="mb-1.5 inline-flex rounded-full bg-brand px-2 py-0.5 text-ivory md:mr-2 md:mb-0">Core</span>}
                  <span className="block md:inline">{f.group}</span>
                </span>
                <span className="grid size-7 shrink-0 place-items-center md:size-10 rounded-full border border-current/15 transition-transform duration-700 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  <Arrow className="size-3" />
                </span>
              </div>
              <div className="relative">
                <p className="display text-[1.45rem] md:text-[clamp(2.2rem,3.4vw,3.2rem)]">{f.name}</p>
                <p className="mt-1.5 line-clamp-2 text-[0.74rem] leading-snug text-muted md:mt-2 md:line-clamp-1 md:text-sm transition-colors group-hover:text-ivory/60">{f.full}</p>
                <div className="mt-3 flex flex-col gap-0.5 border-t border-current/10 pt-2.5 text-[0.72rem] leading-snug md:mt-5 md:flex-row md:gap-4 md:pt-4 md:text-sm">
                  <span className="text-muted transition-colors group-hover:text-ivory/60">{f.timeline}</span>
                  <span className="text-muted md:ml-auto transition-colors group-hover:text-ivory/60">{f.issuer}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {list.length === 0 && (
          <div className="mt-6 rounded-[1.75rem] border border-dashed border-ink/20 p-14 text-center">
            <p className="text-2xl tracking-[-0.02em]">No framework matches “{q}”.</p>
            <p className="mt-2 text-muted">
              We work with many more standards than we list.{" "}
              <a href="#book" className="underline underline-offset-2">
                Ask us
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
