"use client";

import Link from "next/link";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { contact, frameworkCount, frameworkGroups, services } from "@/lib/content";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { officeTime, useNow } from "@/lib/time";
import { Glyph } from "@/components/ui/Glyph";
import { Button } from "@/components/ui/Button";
import { Newsletter } from "@/components/insights/InsightsBrowser";
import { Wordmark } from "./MeridianNav";

const company = [
  { label: "About", href: "/about" },
  { label: "Customers", href: "/customers" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * The footer starts as a dark card floating on the page and grows to fill
 * the screen edge to edge as you scroll to the end. Inside: boxes for the
 * next step, the newsletter, links and both offices (a soft light follows the
 * pointer across them), then the wordmark in polished chrome, which rises
 * into place as the card fills and catches the light under the pointer.
 */
export function MeridianFooter() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLParagraphElement>(null);
  const now = useNow();
  const popular = frameworkGroups.flatMap((g) => g.items.slice(0, 2));

  useEffect(() => {
    const el = root.current;
    const c = card.current;
    const w = word.current;
    if (!el || !c || !w || prefersReducedMotion()) return;
    // Read the footer's position on every scroll instead of caching trigger
    // points: it stays mounted across pages while the content above changes.
    const apply = () => {
      const r = el.getBoundingClientRect();
      const p = clamp01((window.innerHeight - r.top) / r.height);
      const k = 1 - p * p * (3 - 2 * p); // 1 → 0, eased at both ends
      const side = (window.innerWidth < 768 ? 3 : 2.5) * k;
      c.style.clipPath = `inset(${(4 * k).toFixed(3)}% ${side.toFixed(3)}% ${(2.5 * k).toFixed(3)}% ${side.toFixed(3)}% round ${(40 * k).toFixed(1)}px)`;
      const q = clamp01((p - 0.5) / 0.5);
      w.style.transform = `translate3d(0, ${((1 - q * (2 - q)) * 42).toFixed(2)}%, 0)`;
    };
    apply();
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: apply, onRefresh: apply });
    window.addEventListener("resize", apply);
    return () => {
      st.kill();
      window.removeEventListener("resize", apply);
    };
  }, []);

  // Soft light under the pointer, on whichever box it is over.
  const spot = (e: ReactPointerEvent<HTMLElement>) => {
    const box = (e.target as HTMLElement).closest<HTMLElement>("[data-box]");
    if (!box) return;
    const r = box.getBoundingClientRect();
    box.style.setProperty("--x", `${Math.round(e.clientX - r.left)}px`);
    box.style.setProperty("--y", `${Math.round(e.clientY - r.top)}px`);
  };

  // Chrome highlight and blades follow the pointer across the wordmark.
  const shine = (e: ReactPointerEvent<HTMLElement>) => {
    const el = word.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x.toFixed(1)}%`);
    el.style.setProperty("--my", `${y.toFixed(1)}%`);
    el.style.setProperty("--bx", `${((x - 50) * 0.8).toFixed(1)}px`);
  };

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const box = "ft-box relative overflow-hidden rounded-[18px] border border-line-dark bg-ink-2/80 p-5 md:p-7";

  return (
    <footer ref={root} className="relative bg-ivory">
      <div ref={card} data-theme="dark" className="relative overflow-hidden bg-ink text-ivory [clip-path:inset(4%_2.5%_2.5%_2.5%_round_40px)] motion-reduce:[clip-path:none]">
        <Glyph seed="secureknots-footer" strands={13} strokeWidth={0.4} className="pointer-events-none absolute -right-[12%] -top-[18%] w-[70vw] max-w-[60rem] text-brand-3/[0.08]" />

        <div className="container-x relative">
          {/* Top row */}
          <div className="flex items-center justify-between gap-4 pt-16 md:pt-24">
            <Link href="/" aria-label="SecureKnots home">
              <Wordmark onDark />
            </Link>
            <p className="hidden max-w-sm text-center text-sm text-ivory/55 lg:block">Practitioner-led compliance for companies that sell to demanding buyers.</p>
            <button
              type="button"
              onClick={toTop}
              className="group flex h-10 items-center gap-2 rounded-full border border-line-dark px-4 text-sm text-ivory/75 transition-colors hover:border-ivory/50 hover:text-ivory"
            >
              Back to top
              <Arrow className="size-3 -rotate-90 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Boxes */}
          <div onPointerMove={spot} className="mt-8 grid grid-cols-2 gap-2 md:mt-12 md:gap-3 lg:grid-cols-12">
            {/* Next step */}
            <div data-box className="ft-box relative col-span-2 overflow-hidden rounded-[18px] bg-brand p-6 md:p-10 lg:col-span-7">
              <Glyph seed="tie-yours" strands={11} strokeWidth={0.5} className="pointer-events-none absolute -bottom-28 -right-24 w-[26rem] text-brand-3/30" />
              <p className="eyebrow relative text-ivory/60">Start here</p>
              <p className="serif relative mt-4 max-w-xl text-[clamp(2.1rem,3.8vw,3.8rem)] leading-[1.02]">
                Many frameworks. <span className="em text-brand-3">One conversation.</span>
              </p>
              <p className="relative mt-4 max-w-md text-[0.95rem] leading-relaxed text-ivory/75 md:text-base">
                A 30-minute call with a senior practitioner. You leave with a plan either way.
              </p>
              <div className="relative mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-10">
                <Button href="#book" variant="accent">
                  Book a consultation
                </Button>
                <a href={`mailto:${contact.email}`} className="link-sweep text-sm text-ivory/85">
                  {contact.email}
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div data-box className={`${box} col-span-2 flex flex-col lg:col-span-5`}>
              <p className="eyebrow text-brand-3">The Knot, monthly</p>
              <p className="serif mt-4 text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.05]">
                Regulatory change, <span className="em">untangled.</span>
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/60">One email a month: what changed, who it affects, and what to do about it.</p>
              <div className="mt-6 md:mt-auto md:pt-8">
                <Newsletter id="footer-email" />
              </div>
            </div>

            {/* Frameworks */}
            <div data-box className={`${box} col-span-2 flex flex-col lg:col-span-5`}>
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow text-ivory/55">Frameworks</p>
                <Link href="/frameworks" className="group flex items-center gap-1.5 text-sm text-ivory/75 hover:text-ivory">
                  All {frameworkCount}
                  <Arrow className="size-3 transition-transform duration-500 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <ul className="mt-5 flex flex-wrap gap-1.5 md:mb-6">
                {popular.map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/frameworks/${f.slug}`}
                      className="inline-flex rounded-full border border-line-dark px-3 py-1.5 text-[0.82rem] text-ivory/75 transition-colors duration-300 hover:border-brand-3 hover:bg-brand-3 hover:text-ink"
                    >
                      {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-line-dark pt-4 text-sm text-ivory/55 md:mt-auto">
                <span>
                  <span className="num mr-1.5 text-lg text-ivory">{frameworkGroups.length}</span>families
                </span>
                <span>
                  <span className="num mr-1.5 text-lg text-ivory">{frameworkCount}</span>frameworks
                </span>
                <span>
                  <span className="num mr-1.5 text-lg text-ivory">1</span>control set
                </span>
              </p>
            </div>

            {/* Services */}
            <div data-box className={`${box} col-span-1 lg:col-span-4`}>
              <p className="eyebrow text-ivory/55">Services</p>
              <ul className="mt-4 space-y-1 md:mt-5">
                {services.map((s, i) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.id}`} className="group flex items-baseline gap-2.5 py-1 text-[0.88rem] text-ivory/75 transition-colors hover:text-ivory md:text-[0.95rem]">
                      <span className="serif hidden text-sm italic text-brand-3 sm:inline">0{i + 1}</span>
                      <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div data-box className={`${box} col-span-1 lg:col-span-3`}>
              <p className="eyebrow text-ivory/55">Company</p>
              <ul className="mt-4 space-y-1 md:mt-5">
                {company.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="group flex items-center gap-2 py-1 text-[0.88rem] text-ivory/75 transition-colors hover:text-ivory md:text-[0.95rem]">
                      <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">{c.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Offices */}
            {contact.offices.map((o) => {
              const t = now ? officeTime(now, o.tz) : null;
              const phone = o.tz.startsWith("America") ? contact.phoneUS : contact.phoneIN;
              return (
                <div key={o.city} data-box className={`${box} col-span-1 flex flex-col gap-4 md:flex-row md:items-end md:justify-between lg:col-span-6`}>
                  <div>
                    <span className={`eyebrow flex items-center gap-2 text-[0.58rem] md:text-[0.65rem] ${t?.working ? "text-brand-3" : "text-ivory/45"}`}>
                      <span className={`size-1.5 rounded-full ${t?.working ? "animate-pulse bg-brand-3" : "bg-ivory/30"}`} />
                      {t ? (t.working ? "Working hours" : "After hours") : "Local time"}
                    </span>
                    <p className="serif mt-3 text-[1.5rem] leading-none md:text-[2rem]">{o.city}</p>
                    <p className="mt-1.5 text-[0.78rem] leading-snug text-ivory/55 md:text-sm">{o.address}</p>
                    <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="mt-1 inline-block text-[0.78rem] text-ivory/70 hover:text-ivory md:text-sm">
                      {phone}
                    </a>
                  </div>
                  <p className="num text-[1.9rem] md:text-[3rem]" suppressHydrationWarning>
                    {t ? t.time : "--:--"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* The wordmark, in chrome */}
        <div className="relative mt-10 overflow-hidden md:mt-16" aria-hidden>
          <p
            ref={word}
            onPointerMove={shine}
            onPointerEnter={(e) => e.currentTarget.setAttribute("data-hot", "")}
            onPointerLeave={(e) => e.currentTarget.removeAttribute("data-hot")}
            className="chrome-word serif mx-auto w-fit select-none whitespace-nowrap px-[2vw] py-[0.06em] text-[17.5vw] leading-[0.9] 2xl:text-[17rem]"
          >
            Secure<span className="italic">Knots</span>
          </p>
        </div>

        {/* Legal */}
        <div className="container-x relative flex flex-col gap-3 border-t border-line-dark py-6 text-sm text-ivory/55 md:flex-row md:items-center md:justify-between md:pb-8">
          <p>© {new Date().getFullYear()} SecureKnots. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-ivory">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ivory">
              Terms
            </Link>
            <a href={`tel:${contact.phoneUS.replace(/[^+\d]/g, "")}`} className="hover:text-ivory">
              {contact.phoneUS}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
