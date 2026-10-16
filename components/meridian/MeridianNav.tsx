"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { frameworkGroups, frameworkCount, navLinks, services } from "@/lib/content";
import { ScrollTrigger, gsap, onSiteReady, openSearch, prefersReducedMotion } from "@/lib/gsap";
import { SecureKnotsLogo } from "@/components/brand/SecureKnotsLogo";
import { IndexMenu } from "./IndexMenu";

type Menu = "frameworks" | "services" | null;

export function Wordmark({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <SecureKnotsLogo className="h-9 w-auto" onDark={onDark} />
      <span className="serif text-[1.45rem] leading-none tracking-[-0.01em]">
        Secure<span className="italic">Knots</span>
      </span>
    </span>
  );
}

export function MeridianNav() {
  const pathname = usePathname();
  const bar = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState<Menu>(null);
  const [mobile, setMobile] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset menus on navigation
    setMenu(null);
    setMobile(false);
  }, [pathname]);

  // Scroll state via ScrollTrigger (no raw scroll listeners).
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setScrolled(self.scroll() > 24);
        setHidden(self.direction === 1 && self.scroll() > 320);
      },
    });
    return () => st.kill();
  }, [pathname]);

  useEffect(() => {
    const el = bar.current;
    if (!el || prefersReducedMotion()) return;
    gsap.set(el, { yPercent: -100 });
    return onSiteReady(() => gsap.to(el, { yPercent: 0, duration: 1, delay: 0.2, ease: "expo.out", clearProps: "transform,translate,rotate,scale" }));
  }, []);

  // Sticky bars further down the page sit under the header while it shows,
  // and slide up to the top when it hides.
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-offset", hidden && !menu && !mobile ? "0px" : "76px");
  }, [hidden, menu, mobile]);

  const touched = useRef(false);
  useEffect(() => {
    if (!touched.current && !mobile) return;
    touched.current = true;
    if (mobile) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [mobile]);

  const closeIndex = useCallback(() => setMobile(false), []);

  const open = (m: Menu) => {
    clearTimeout(timer.current);
    setMenu(m);
  };
  const close = () => {
    timer.current = setTimeout(() => setMenu(null), 140);
  };

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  // Full-width bar at the top of the page; a floating pill once you scroll.
  const pill = scrolled && !mobile;

  return (
    <>
      <header
        ref={bar}
        onMouseLeave={close}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[translate,transform,background-color,border-color,padding] duration-500 ease-out-expo ${
          hidden && !menu && !mobile ? "-translate-y-full" : ""
        } ${pill ? "border-transparent bg-transparent px-2 pt-2 md:px-4 md:pt-3" : `bg-ivory ${menu ? "border-line" : "border-transparent"}`}`}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-6 border transition-[max-width,height,padding,border-radius,background-color,box-shadow,border-color] duration-500 ease-out-expo ${
            pill
              ? "h-14 max-w-[1180px] rounded-full border-line bg-ivory/85 pl-4 pr-2 shadow-[0_18px_50px_-24px_rgb(15_23_41/0.45)] backdrop-blur-xl md:h-[60px] md:pl-6"
              : "h-[76px] max-w-[1680px] rounded-none border-transparent px-[var(--gutter)]"
          }`}
        >
          <Link href="/" aria-label="SecureKnots home" className="relative z-10">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => (l.menu ? open(l.menu) : close())}
                onFocus={() => l.menu && open(l.menu)}
                className={`group relative py-2 text-[0.9rem] transition-colors duration-300 ${
                  active(l.href) || menu === l.menu ? "text-ink" : "text-ink/60 hover:text-ink"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-px origin-left bg-brand transition-transform duration-500 ease-out-expo ${
                    active(l.href) || menu === l.menu ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search (Ctrl K)"
              className="hidden size-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-paper hover:text-ink sm:grid"
            >
              <svg viewBox="0 0 20 20" className="size-4" fill="none">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
            <Link
              href="#book"
              className="flex h-9 items-center whitespace-nowrap rounded-full bg-ink px-4 text-[0.8rem] font-medium text-ivory transition-colors duration-500 hover:bg-brand md:h-10 md:px-5 md:text-[0.85rem]"
            >
              <span className="md:hidden">Book a call</span>
              <span className="hidden md:inline">Book a consultation</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobile((v) => !v)}
              aria-label={mobile ? "Close index" : "Open index"}
              aria-expanded={mobile}
              aria-haspopup="dialog"
              className="relative z-10 flex h-10 items-center gap-3 rounded-full border border-line px-3 text-[0.85rem] transition-colors hover:border-ink lg:pl-4"
            >
              <span className="hidden lg:inline">Index</span>
              <span className="relative block h-2 w-4">
                <span className={`absolute left-0 h-px w-4 bg-ink transition-all duration-500 ${mobile ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-4 bg-ink transition-all duration-500 ${mobile ? "top-1 -rotate-45" : "top-2"}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mega panels */}
        <div
          onMouseEnter={() => clearTimeout(timer.current)}
          className={`hidden overflow-hidden transition-[max-height,opacity] duration-700 ease-out-expo lg:block ${
            pill ? "mx-auto mt-2 max-w-[1180px] rounded-[1.25rem] border bg-ivory shadow-[0_30px_70px_-30px_rgb(15_23_41/0.45)]" : "border-t"
          } ${menu ? "max-h-[520px] border-line opacity-100" : "max-h-0 border-transparent opacity-0"}`}
        >
          <div className="container-x py-10">
            {menu === "frameworks" && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3">
                  <p className="num text-[4rem] text-ink">{frameworkCount}</p>
                  <p className="mt-2 max-w-[16rem] text-sm text-muted">Frameworks delivered as one program. Tested once, mapped everywhere.</p>
                  <Link href="/frameworks" className="link-u mt-8 inline-flex text-sm text-ink">
                    View the full index
                  </Link>
                </div>
                <div className="col-span-9 grid grid-cols-6 gap-5">
                  {frameworkGroups.map((g) => (
                    <div key={g.id}>
                      <p className="eyebrow border-b border-line pb-3 text-muted">{g.name}</p>
                      <ul className="mt-3 space-y-2">
                        {g.items.map((f) => (
                          <li key={f.slug}>
                            <Link href={`/frameworks/${f.slug}`} className="text-[0.88rem] text-ink/70 transition-colors hover:text-brand">
                              {f.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {menu === "services" && (
              <ul className="grid grid-cols-5 border-l border-line">
                {services.map((s, i) => (
                  <li key={s.id} className="border-r border-line">
                    <Link href={`/services/${s.id}`} className="group block px-6 py-2">
                      <span className="serif text-lg italic text-brand">0{i + 1}</span>
                      <span className="serif mt-6 block text-[1.6rem] leading-tight text-ink transition-colors group-hover:text-brand">{s.title}</span>
                      <span className="mt-2 line-clamp-3 block text-sm text-muted">{s.body}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Slide-out index (also the mobile menu) */}
      <IndexMenu open={mobile} onClose={closeIndex} />
    </>
  );
}
