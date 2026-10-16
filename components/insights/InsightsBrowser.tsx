"use client";

import { useState } from "react";
import type { Article } from "@/lib/insights";
import { ArticleCard } from "./ArticleCard";
import { toast } from "@/lib/gsap";

export function InsightsBrowser({ items, tags }: { items: Article[]; tags: string[] }) {
  const [tag, setTag] = useState("All");
  const list = items.filter((a) => tag === "All" || a.tag === tag);
  return (
    <>
      <div className="-mx-[var(--gutter)] flex gap-1.5 overflow-x-auto border-y border-line px-[var(--gutter)] py-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:py-5 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter by topic">
        {["All", ...tags].map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.82rem] transition-colors duration-300 md:px-4 md:text-sm ${tag === t ? "bg-ink text-ivory" : "bg-ink/[0.04] hover:bg-ink/5 md:bg-transparent"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-x-6 gap-y-5 md:mt-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
        {list.map((a, i) => (
          <div key={a.slug} className="animate-[fadeUp_0.7s_var(--ease-out)_both]" style={{ animationDelay: `${i * 60}ms` }}>
            <ArticleCard a={a} />
          </div>
        ))}
      </div>
    </>
  );
}

export function Newsletter({ dark = true, id = "nl-email" }: { dark?: boolean; id?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Please enter a valid email address.");
    // TODO: connect to newsletter provider.
    setDone(true);
    toast("You're subscribed. First issue lands next month.");
  };
  return (
    <form onSubmit={submit} className={`flex flex-col gap-3 sm:flex-row ${dark ? "text-ivory" : ""}`}>
      <label className="sr-only" htmlFor={id}>
        Work email
      </label>
      <input
        id={id}
        type="email"
        value={email}
        disabled={done}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={done ? "Subscribed ✓" : "Work email"}
        className={`h-12 flex-1 rounded-full border bg-transparent px-5 outline-none md:h-14 md:px-6 ${dark ? "border-ivory/20 placeholder:text-ivory/40 focus:border-accent" : "border-ink/20 focus:border-brand"}`}
      />
      <button type="submit" disabled={done} className="h-12 rounded-full bg-accent px-7 font-medium text-ink disabled:opacity-50 md:h-14">
        Subscribe
      </button>
    </form>
  );
}
