"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { frameworkGroups, frameworkCount, services, process as steps, stats, contact, roleLine } from "@/lib/content";
import { stories } from "@/lib/stories";
import { articles } from "@/lib/insights";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Reveal, FadeUp } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { ReededGlassStatic } from "@/components/ui/ReededGlass";
import { ScrubText } from "@/components/page/ScrubText";
import { coverHue, formatDate } from "@/components/insights/ArticleCard";
import { SampleTag } from "@/components/stories/SampleTag";
import { TyingKnot } from "@/components/brand/TyingKnot";
import { Head } from "./Head";
import { ScanTerminal } from "./ScanTerminal";

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/* ───────── Framework band (dark, continues the figures band) ───────── */
export function FrameworkBand() {
  const names = frameworkGroups.flatMap((g) => g.items.map((f) => f.name));
  const row = [...names, ...names];
  return (
    <section data-theme="dark" className="border-t border-line-dark bg-ink py-6 text-ivory md:py-7" aria-label="Frameworks we deliver">
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track" style={{ ["--marquee-duration" as string]: "110s" }}>
          {row.map((n, i) => (
            <span key={i} className="serif flex items-center whitespace-nowrap text-[1.35rem] text-ivory/55 md:text-[1.7rem]">
              {n}
              <span className="mx-6 size-1 rounded-full bg-brand-3/60 md:mx-8" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Figures, directly under the hero ───────── */
export function Facts() {
  return (
    <section aria-label="SecureKnots at a glance" data-theme="dark" className="bg-ink text-ivory">
      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-3 py-7 pr-4 md:gap-4 md:py-12 md:pr-8 ${i % 2 ? "border-l border-line-dark pl-4 md:pl-8" : ""} ${i > 1 ? "border-t border-line-dark lg:border-t-0" : ""} lg:border-l lg:pl-8 ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""}`}
            >
              <dd className="num text-[clamp(3rem,6vw,6rem)] text-ivory">
                {s.value}
                <span className="text-brand-3">{s.suffix}</span>
              </dd>
              <dt className="max-w-[16rem] text-[0.85rem] leading-snug text-ivory/60 md:text-[0.95rem]">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ───────── 01 The problem ───────── */
const PROGRAMS = ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "ISO 42001"];

export function Perspective() {
  return (
    <section id="problem" data-rail="Problem" className="bg-ivory py-16 md:py-24 lg:py-28">
      <div className="container-x">
        <div className="grid gap-5 border-t border-line pt-5 md:gap-8 md:pt-6 lg:grid-cols-12">
          <p className="eyebrow flex gap-4 text-muted lg:col-span-3">
            <span className="text-brand">01</span>
            The problem
          </p>
          <div className="lg:col-span-9">
            <ScrubText
              className="serif text-[clamp(1.7rem,3.6vw,3.6rem)] leading-[1.14]"
              text="Every new customer asks for another certificate, another questionnaire, another audit. Most teams end up running five programs that test the same controls five different ways. We tie them into one."
            />
            {/* Five programs in, one out */}
            <div className="mt-8 grid gap-3 rounded-[6px] border border-line bg-paper/70 p-4 md:mt-12 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-6 md:p-6">
              <ul className="flex flex-wrap gap-1.5 md:gap-2">
                {PROGRAMS.map((p) => (
                  <li key={p} className="rounded-full border border-ink/12 bg-ivory px-3 py-1.5 text-[0.8rem] text-ink/60 md:text-sm">
                    {p} program
                  </li>
                ))}
              </ul>
              <span className="hidden text-ink/30 md:block">
                <Arrow className="size-5" />
              </span>
              <p className="flex items-center gap-3">
                <span className="num text-[2.4rem] text-brand md:text-[3rem]">1</span>
                <span className="text-sm leading-snug text-ink/70">
                  control set,
                  <br />
                  tested once
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── 02 Services ───────── */
// Two lead services across the top, three below. Tones alternate so the grid reads as a set.
const SERVICE_TONE = [
  "bg-brand text-ivory",
  "bg-ink text-ivory",
  "bg-paper text-ink",
  "bg-paper text-ink",
  "bg-paper text-ink",
];

export function Capabilities() {
  return (
    <section id="services" data-rail="Services" className="bg-ivory pb-16 md:pb-24 lg:pb-28">
      <div className="container-x">
        <Head
          n="02"
          label="We tie it"
          title={
            <>
              Five services. <span className="em text-brand">One program.</span>
            </>
          }
          aside="Advisory, audit readiness, auditor coordination, security testing and continuous compliance, run by practitioners who have sat on the auditor's side of the table."
        />

        <p className="eyebrow mt-6 text-muted md:hidden">Swipe through all five</p>
        <ul className="mt-3 gap-2.5 md:mt-14 md:grid-cols-2 md:gap-3 lg:grid-cols-6 -mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {services.map((s, i) => {
            const dark = i < 2;
            return (
              <li key={s.id} className={`w-[84vw] shrink-0 snap-start md:w-auto ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                <Link
                  href={`/services/${s.id}`}
                  data-label={s.title}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[6px] p-5 transition-transform duration-700 ease-out-expo hover:-translate-y-1 md:p-8 ${SERVICE_TONE[i]} ${i < 2 ? "md:min-h-[24rem]" : "md:min-h-[22rem]"}`}
                >
                  <Glyph
                    seed={s.id}
                    strands={9}
                    className={`pointer-events-none absolute -right-16 -top-16 w-64 transition-transform duration-[1.6s] ease-out-expo group-hover:rotate-12 md:-right-20 md:-top-20 md:w-80 ${dark ? "text-brand-3/30" : "text-brand/12"}`}
                  />
                  <div className="relative flex items-center justify-between gap-4">
                    <span className={`eyebrow ${dark ? "text-ivory/60" : "text-muted"}`}>
                      <span className={dark ? "text-brand-3" : "text-brand"}>0{i + 1}</span>
                      <span className="mx-2">·</span>
                      {s.kicker}
                    </span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-500 md:size-11 ${
                        dark ? "border-ivory/25 group-hover:bg-ivory group-hover:text-ink" : "border-ink/15 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory"
                      }`}
                    >
                      <Arrow className="size-3.5" />
                    </span>
                  </div>
                  <div className="relative mt-10 md:mt-auto md:pt-16">
                    <h3 className="serif text-[clamp(1.9rem,3vw,3rem)] leading-none">{s.title}</h3>
                    <p className={`mt-3 max-w-md text-[0.92rem] leading-relaxed md:mt-4 md:text-[0.98rem] ${dark ? "text-ivory/70" : "text-ink/65"}`}>{s.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {s.deliverables.map((d) => (
                        <li key={d} className={`rounded-full border px-2.5 py-1 text-[0.74rem] md:text-[0.8rem] ${dark ? "border-ivory/20 text-ivory/75" : "border-ink/12 bg-ivory/70 text-ink/70"}`}>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Security testing, made visible */}
        <div className="mt-12 grid gap-8 md:mt-16 md:gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow text-muted">Inside a security test</p>
            <p className="serif mt-4 text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.02] md:mt-5">
              Findings you can see. <span className="em text-brand">Fixes you can prove.</span>
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-ink/65 md:mt-6">
              Each engagement maps the attack surface, validates findings by hand, and ties every fix to the controls your auditors will test.
            </p>
            <Link href="/services/testing" className="link-u mt-5 inline-flex text-sm md:mt-8">
              About security testing
            </Link>
          </div>
          <figure className="min-w-0 lg:col-span-7">
            <ScanTerminal />
            <figcaption className="mt-3 text-sm text-muted">
              <span className="serif mr-2 text-base italic text-ink">Fig. 2</span>
              An API test, from endpoints to a finding to its remediation.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ───────── 03 Process (dark) ───────── */
export function Approach() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".ap-fill", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".ap-row", start: "top 80%", end: "bottom 55%", scrub: true } });
      gsap.fromTo(".ap-vfill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".ap-row", start: "top 75%", end: "bottom 60%", scrub: true } });
      gsap.from(".ap-step", { autoAlpha: 0, y: 30, duration: 1.2, stagger: 0.12, scrollTrigger: { trigger: ".ap-row", start: "top 78%", once: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="process" data-rail="Process" data-theme="dark" className="bg-ink py-16 text-ivory md:py-24 lg:py-28">
      <div className="container-x">
        <Head
          dark
          n="03"
          label="Approach"
          title={
            <>
              From tangle <span className="em text-brand-3">to tied.</span>
            </>
          }
          aside="A typical SOC 2 or ISO 27001 program, from first call to auditor fieldwork, in around fourteen weeks."
        />

        <div className="ap-row relative mt-10 md:mt-16">
          {/* the thread: horizontal on wide screens, vertical below lg */}
          <div className="absolute inset-x-0 top-0 hidden h-px bg-line-dark lg:block">
            <div className="ap-fill h-px w-full origin-left bg-brand-3" />
          </div>
          <div className="absolute bottom-2 left-[4px] top-2 w-px bg-line-dark lg:hidden">
            <div className="ap-vfill h-full w-px origin-top bg-brand-3" />
          </div>
          <ol className="grid gap-8 pl-8 md:gap-12 lg:grid-cols-5 lg:gap-8 lg:pl-0">
            {steps.map((p) => (
              <li key={p.n} className="ap-step relative lg:pt-10">
                <span className="absolute -left-8 top-1 size-[9px] rounded-full border border-brand-3 bg-ink lg:-top-[5px] lg:left-0" />
                <p className="eyebrow text-ivory/50">{p.time}</p>
                <h3 className="serif mt-3 text-[1.9rem] leading-none md:mt-5 md:text-[2.3rem]">
                  <span className="mr-2 text-[1.1rem] italic text-brand-3 md:text-[1.3rem]">{p.n}</span>
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ivory/60 md:mt-5 md:text-[0.95rem]">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}

/* ───────── 04 Why SecureKnots ───────── */
const PILLARS = [
  { t: "Unified", d: "One control set, mapped to every framework you need. Evidence collected once, reused everywhere.", k: "1 control set" },
  { t: "Practitioner-led", d: "Consultants drawn from established cybersecurity and compliance firms, people who have sat on both sides of the audit table.", k: "Both sides of the table" },
  { t: "Engineer-friendly", d: "We work in your cloud, your ticketing and your repos, alongside your team, not in a separate spreadsheet universe.", k: "Jira · GitHub · AWS" },
  { t: "Right-sized", d: "Programs that fit a seed-stage startup as well as a regulated enterprise, scoped to what your buyers actually ask for.", k: "Seed to enterprise" },
];

export function WhyUs() {
  return (
    <section id="why" data-rail="Why us" className="bg-paper py-16 md:py-24 lg:py-28">
      <div className="container-x">
        <Head
          n="04"
          label="Why SecureKnots"
          title={
            <>
              Less audit theater. <span className="em text-brand">More actual security.</span>
            </>
          }
          aside={roleLine}
        />
        <div className="mt-8 grid grid-cols-2 gap-2 md:mt-14 md:gap-3 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <FadeUp
              key={p.t}
              y={20}
              delay={i * 0.06}
              className="group relative flex flex-col overflow-hidden rounded-[6px] border border-ink/10 bg-ivory p-4 md:min-h-[20rem] md:p-7"
            >
              <Glyph seed={p.t} strands={7} className="pointer-events-none absolute -bottom-16 -right-16 w-44 text-brand/10 transition-transform duration-[1.6s] ease-out-expo group-hover:rotate-45 md:w-56" />
              <span className="serif relative text-lg italic text-brand md:text-xl">0{i + 1}</span>
              <h3 className="serif relative mt-6 text-[clamp(1.35rem,2.4vw,2.3rem)] leading-none md:mt-14">{p.t}</h3>
              <p className="relative mb-4 mt-2 text-[0.8rem] leading-snug text-ink/65 md:mb-6 md:mt-4 md:text-[0.95rem] md:leading-relaxed">{p.d}</p>
              <p className="eyebrow relative mt-auto border-t border-line pt-3 text-[0.55rem] text-brand md:pt-4 md:text-[0.65rem]">{p.k}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 05 Framework directory ───────── */
export function FrameworkDirectory() {
  return (
    <section id="frameworks" data-rail="Frameworks" className="bg-ivory py-16 md:py-24 lg:py-28">
      <div className="container-x">
        <Head
          n="05"
          label="Frameworks"
          title={
            <>
              {frameworkCount} frameworks. <span className="em text-brand">One partner.</span>
            </>
          }
          aside="Security attestations, government authorizations, privacy law, financial regulation, management systems and records standards, prepared from a single control set."
        />
        <p className="eyebrow mt-6 text-muted md:hidden">Swipe through all six families</p>
        <div className="mt-3 gap-2.5 md:mt-14 md:grid-cols-2 md:gap-3 lg:grid-cols-3 -mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {frameworkGroups.map((g, gi) => (
            <FadeUp key={g.id} y={24} delay={(gi % 3) * 0.06} className="flex w-[84vw] shrink-0 snap-start flex-col rounded-[6px] border border-line bg-paper/60 p-4 md:w-auto md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-brand">Family 0{gi + 1}</p>
                  <p className="serif mt-2 text-[1.6rem] leading-none md:text-[1.9rem]">{g.name}</p>
                </div>
                <span className="num grid size-11 shrink-0 place-items-center rounded-full bg-ivory text-[1.15rem] text-ink md:size-12 md:text-[1.3rem]">{g.items.length}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{g.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                {g.items.map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/frameworks/${f.slug}`}
                      data-label={f.name}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-ivory px-3 py-1.5 text-[0.84rem] text-ink/80 transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-ivory"
                    >
                      {f.name}
                      <Arrow className="size-2.5 opacity-40 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>
        <div className="mt-8 flex justify-start md:mt-12">
          <Button href="/frameworks" variant="outline">
            Explore the framework index
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ───────── 10 Client stories ───────── */
export function Voices() {
  const [a, ...rest] = stories;
  return (
    <section id="stories" data-rail="Stories" className="bg-ivory py-16 md:py-24 lg:py-28">
      <div className="container-x">
        <Head
          n="10"
          label="Client stories"
          title={
            <>
              Proof, <span className="em text-brand">not promises.</span>
            </>
          }
        />

        {/* Featured story */}
        <FadeUp className="relative mt-8 grid gap-7 overflow-hidden rounded-[6px] bg-brand p-5 text-ivory md:mt-14 md:gap-10 md:p-10 lg:grid-cols-12 lg:p-12">
          <Glyph seed={a.slug} strands={11} strokeWidth={0.5} className="pointer-events-none absolute -right-24 -top-24 w-[28rem] text-brand-3/25" />
          <div className="relative lg:col-span-4">
            <SampleTag dark />
            <p className="mt-4 text-lg font-medium">{a.company}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ivory/60">
              <Pin className="size-3" />
              {a.hq} · {a.industry}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-ivory/20 pt-5 lg:mt-10 lg:gap-5">
              {a.metrics.slice(0, 3).map((m) => (
                <div key={m.l}>
                  <p className="num whitespace-nowrap text-[1.9rem] text-ivory lg:text-[2.2rem] xl:text-[2.5rem]">{m.v}</p>
                  <p className="mt-2 text-[0.76rem] leading-snug text-ivory/60 lg:text-[0.82rem]">{m.l}</p>
                </div>
              ))}
            </div>
          </div>
          <figure className="relative flex flex-col justify-between lg:col-span-8">
            <blockquote className="serif text-[clamp(1.55rem,3vw,3.1rem)] leading-[1.16]">
              <span className="text-brand-3">&ldquo;</span>
              {a.quote.text}
              <span className="text-brand-3">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/20 pt-5 md:mt-10 md:gap-6">
              <span className="text-sm text-ivory/65">
                <span className="text-ivory">{a.quote.name}</span>, {a.quote.role}
              </span>
              <Link href={`/customers/${a.slug}`} data-label={a.company} className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm text-ink transition-colors hover:bg-brand-3">
                Read the full story <Arrow className="size-3" />
              </Link>
            </figcaption>
          </figure>
        </FadeUp>

        <div className="mt-2.5 gap-2.5 md:mt-3 md:grid-cols-3 md:gap-3 -mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {rest.slice(0, 3).map((s) => (
            <Link
              key={s.slug}
              href={`/customers/${s.slug}`}
              data-label={s.company}
              className="group flex w-[80vw] shrink-0 snap-start flex-col rounded-[6px] border border-line bg-paper/60 p-5 transition-colors duration-500 hover:border-ink/25 hover:bg-paper md:w-auto md:p-7"
            >
              <div className="flex items-start justify-between gap-4 text-sm">
                <span>
                  <span className="block font-medium">{s.company}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-muted">
                    <Pin className="size-3" />
                    {s.hq}
                  </span>
                </span>
                <span className="text-right text-muted">{s.industry}</span>
              </div>
              <p className="num mt-6 text-[2.6rem] text-brand md:mt-10 md:text-[3.2rem]">{s.metrics[0].v}</p>
              <p className="mt-2 text-sm text-muted">{s.metrics[0].l}</p>
              <p className="mt-4 text-[1rem] leading-snug md:mt-6 md:text-[1.05rem]">{s.headline}</p>
              <span className="mt-auto flex items-center justify-between gap-2 pt-5 text-sm text-ink/70 group-hover:text-brand md:pt-8">
                <span className="flex items-center gap-2">
                  Read story <Arrow className="size-3 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
                <SampleTag />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <path d="M6 11s3.5-3.4 3.5-6.2A3.5 3.5 0 0 0 2.5 4.8C2.5 7.6 6 11 6 11Z" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="6" cy="4.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

/* ───────── 11 Insights ───────── */
export function Journal() {
  return (
    <section id="insights" data-rail="Insights" className="bg-ivory pb-16 md:pb-24 lg:pb-28">
      <div className="container-x">
        <Head
          n="11"
          label="Insights"
          title={
            <>
              Latest <span className="em text-brand">thinking.</span>
            </>
          }
        />
        <div className="mt-8 grid gap-2.5 md:mt-14 md:grid-cols-3 md:gap-3">
          {articles.slice(0, 3).map((a, i) => (
            <FadeUp key={a.slug} y={24} delay={i * 0.08}>
              <Link
                href={`/insights/${a.slug}`}
                data-label={a.tag}
                className="group grid h-full grid-cols-[6.5rem_1fr] gap-4 rounded-[6px] border border-line bg-paper/60 p-3 transition-colors duration-500 hover:border-ink/25 md:flex md:flex-col md:gap-0 md:p-4"
              >
                <div className="relative aspect-square overflow-hidden rounded-[4px] bg-ink md:aspect-[16/9]">
                  <ReededGlassStatic
                    className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
                    stripes={18}
                    hue={coverHue(a.slug)}
                    tone={a.tone === "accent" || a.tone === "paper" ? "light" : "dark"}
                  />
                </div>
                <div className="flex flex-1 flex-col md:px-2 md:pb-2 md:pt-5">
                  <p className="flex justify-between gap-3 text-[0.78rem] text-muted md:text-sm">
                    <span className="text-brand">{a.tag}</span>
                    <span>{formatDate(a.date)}</span>
                  </p>
                  <h3 className="serif mt-1.5 text-[1.15rem] leading-[1.12] transition-colors duration-300 group-hover:text-brand md:mt-4 md:text-[clamp(1.4rem,2vw,1.9rem)]">{a.title}</h3>
                  <p className="mt-3 hidden text-[0.95rem] leading-relaxed text-muted md:line-clamp-2">{a.excerpt}</p>
                  <p className="mt-2 flex items-center gap-2 text-[0.8rem] md:mt-auto md:pt-6 md:text-sm">
                    {a.read} read <Arrow className="size-3 transition-transform duration-500 group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
        <div className="mt-8 md:mt-12">
          <Link href="/insights" className="link-u text-sm">
            View all insights
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────── End of the thread ───────── */
export function ClosingCTA() {
  return (
    <section id="end" data-rail="Tie yours" className="relative overflow-hidden bg-paper py-16 md:py-28 lg:py-32">
      <div className="container-x relative text-center">
        <TyingKnot className="mx-auto mb-8 block h-20 md:mb-10 md:h-28" />
        <p className="eyebrow flex items-center justify-center gap-3 text-muted">
          <span className="size-1.5 rounded-full bg-brand" />
          End of the thread
        </p>
        <h2 className="wide mx-auto mt-6 max-w-5xl text-[clamp(3rem,8vw,8.6rem)] leading-[0.95] md:mt-8">
          <Reveal as="span" className="block">
            Now tie <span className="em text-brand">yours.</span>
          </Reveal>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink/65 md:mt-8 md:text-lg">
          A 30-minute call with a senior practitioner. You leave with a plan either way.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-5 md:mt-10 md:gap-6">
          <Button href="#book">Book a consultation</Button>
          <a href={`mailto:${contact.email}`} className="link-u text-sm">
            {contact.email}
          </a>
        </div>
        <p className="mx-auto mt-10 max-w-xl border-t border-line pt-5 text-sm leading-relaxed text-muted md:mt-16 md:pt-6">{roleLine}</p>
      </div>
    </section>
  );
}
