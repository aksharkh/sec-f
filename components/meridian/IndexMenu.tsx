"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { contact, frameworkGroups, frameworkCount, services } from "@/lib/content";
import { openSearch } from "@/lib/gsap";

const pages = [
  { label: "Home", href: "/" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Customers", href: "/customers" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const popular = frameworkGroups.flatMap((g) => g.items.slice(0, 2));

/**
 * Slide-out index: every page, every service and the most-asked-for
 * frameworks in one panel. Used on all screen sizes (it is the mobile menu too).
 */
export function IndexMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeBtn.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  const tab = open ? 0 : -1;
  const isOn = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "visible" : "invisible"}`}
      style={{ transition: open ? "visibility 0s" : "visibility 0s linear .7s" }}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close index"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
        data-lenis-prevent
        className={`absolute inset-y-0 right-0 flex w-full max-w-[64rem] flex-col overflow-y-auto bg-ivory transition-transform duration-700 ease-in-out-quart ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-line px-[var(--gutter)]">
          <div className="flex items-center gap-4">
            <p className="eyebrow text-muted">Index</p>
            <button
              type="button"
              tabIndex={tab}
              onClick={() => {
                onClose();
                setTimeout(openSearch, 300);
              }}
              className="flex h-9 items-center gap-2 rounded-full border border-line px-3 text-sm text-ink/75 transition-colors hover:border-ink"
            >
              <svg viewBox="0 0 20 20" className="size-3.5" fill="none" aria-hidden>
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Search
            </button>
          </div>
          <button
            ref={closeBtn}
            type="button"
            tabIndex={tab}
            onClick={onClose}
            className="flex h-10 items-center gap-3 rounded-full border border-line pl-4 pr-3 text-sm transition-colors hover:border-ink"
          >
            Close
            <span className="relative block size-3" aria-hidden>
              <span className="absolute left-0 top-1/2 h-px w-3 rotate-45 bg-ink" />
              <span className="absolute left-0 top-1/2 h-px w-3 -rotate-45 bg-ink" />
            </span>
          </button>
        </div>

        <div className="grid flex-1 lg:grid-cols-12">
          <nav aria-label="Pages" className="px-[var(--gutter)] py-8 lg:col-span-6 lg:border-r lg:border-line lg:py-10">
            <p className="eyebrow mb-4 text-muted">Pages</p>
            <ul className="border-t border-line">
              {pages.map((p, i) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    tabIndex={tab}
                    onClick={onClose}
                    className="group flex items-baseline justify-between border-b border-line py-3"
                    style={{
                      transition: "transform .7s var(--ease-out), opacity .7s var(--ease-out)",
                      transitionDelay: open ? `${0.12 + i * 0.03}s` : "0s",
                      transform: open ? "none" : "translateX(24px)",
                      opacity: open ? 1 : 0,
                    }}
                  >
                    <span className={`serif text-[clamp(1.9rem,3.2vw,2.6rem)] leading-none transition-colors group-hover:text-brand ${isOn(p.href) ? "text-brand" : ""}`}>{p.label}</span>
                    <span className="serif text-sm italic text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-10 border-t border-line px-[var(--gutter)] py-8 lg:col-span-6 lg:border-t-0 lg:py-10">
            <div>
              <p className="eyebrow mb-4 text-muted">Services</p>
              <ul className="border-t border-line">
                {services.map((s, i) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.id}`} tabIndex={tab} onClick={onClose} className="group flex items-center justify-between gap-4 border-b border-line py-3">
                      <span>
                        <span className="serif mr-3 text-sm italic text-brand">0{i + 1}</span>
                        <span className="transition-colors group-hover:text-brand">{s.title}</span>
                      </span>
                      <span className="text-sm text-muted">{s.kicker}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-4 flex items-baseline justify-between">
                <p className="eyebrow text-muted">Popular frameworks</p>
                <Link href="/frameworks" tabIndex={tab} onClick={onClose} className="link-u text-sm">
                  All {frameworkCount}
                </Link>
              </div>
              <ul className="flex flex-wrap gap-2">
                {popular.map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/frameworks/${f.slug}`}
                      tabIndex={tab}
                      onClick={onClose}
                      className="block rounded-full border border-line px-3 py-1.5 text-sm text-ink/75 transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                    >
                      {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto rounded-[6px] bg-paper p-6">
              <a href={`mailto:${contact.email}`} tabIndex={tab} className="serif link-sweep text-[1.6rem] leading-none">
                {contact.email}
              </a>
              <p className="mono mt-3 text-xs text-muted">
                US {contact.phoneUS} · IN {contact.phoneIN}
              </p>
              <Link
                href="#book"
                tabIndex={tab}
                onClick={onClose}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-ivory transition-colors hover:bg-brand"
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
