import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories, getStory } from "@/lib/stories";
import { frameworks } from "@/lib/frameworks";
import { HeroFade } from "@/components/page/HeroFade";
import { Chip } from "@/components/page/Blocks";
import { Reveal, FadeUp } from "@/components/ui/Reveal";
import { Glyph, toneClasses } from "@/components/ui/Glyph";
import { Button, Arrow } from "@/components/ui/Button";
import { StoryCard } from "@/components/stories/StoryCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SampleTag } from "@/components/stories/SampleTag";

const CHAPTERS = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "The challenge" },
  { id: "approach", label: "The approach" },
  { id: "voice", label: "In their words" },
  { id: "results", label: "The results" },
];

function Chapter({ i, className }: { i: number; className?: string }) {
  return (
    <p id={CHAPTERS[i].id} className={`eyebrow flex scroll-mt-28 gap-4 text-muted ${className ?? ""}`}>
      <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
      {CHAPTERS[i].label}
    </p>
  );
}

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/customers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) return {};
  return { title: `${s.company}, customer story`, description: s.summary };
}

export default async function StoryPage({ params }: PageProps<"/customers/[slug]">) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();
  const t = toneClasses[s.tone];
  const idx = stories.indexOf(s);
  const next = stories[(idx + 1) % stories.length];
  const more = stories.filter((x) => x.slug !== s.slug).slice(0, 2);
  const fwSlug = (name: string) => frameworks.find((f) => f.name === name)?.slug;
  const light = s.tone === "accent" || s.tone === "paper";

  const facts = [
    { k: "Industry", v: s.industry },
    { k: "Company size", v: s.size },
    { k: "Headquarters", v: s.hq },
    { k: "Time to audit-ready", v: `${s.weeks} weeks` },
  ];

  return (
    <>
      {/* Hero */}
      <section id="overview" data-theme={light ? undefined : "dark"} className={`relative overflow-hidden pb-10 pt-28 md:pb-16 md:pt-36 ${t.bg} ${t.fg}`}>
        <HeroFade className="pointer-events-none absolute -right-[15%] -top-[10%] w-[75vw] max-w-[60rem] md:-right-[5%] md:w-[50vw]" delay={0.2}>
          <Glyph seed={s.slug} className={`w-full animate-[drift_60s_linear_infinite] ${t.art} opacity-60`} strands={13} strokeWidth={0.45} />
        </HeroFade>
        <div className="container-x relative">
          <HeroFade as="nav" aria-label="Breadcrumb" className={`eyebrow flex gap-2 ${t.sub}`}>
            <Link href="/customers" className="link-sweep">
              Customer stories
            </Link>
            <span>/</span>
            <span>{s.company}</span>
          </HeroFade>
          <HeroFade className="mt-7 flex flex-wrap items-center gap-3 md:mt-12 md:gap-4">
            <span className={`grid size-12 place-items-center rounded-2xl border text-lg font-semibold md:size-14 ${light ? "border-ink/20" : "border-ivory/25"}`}>{s.mark}</span>
            <span>
              <span className="block text-xl font-medium tracking-[-0.02em] md:text-2xl">{s.company}</span>
              <span className={`block text-sm ${t.sub}`}>
                {s.hq} · {s.industry}
              </span>
            </span>
            <SampleTag dark={!light} className="md:ml-2" />
          </HeroFade>
          <HeroFade className={`eyebrow mt-7 flex gap-4 md:mt-10 ${t.sub}`}>
            <span>01</span>
            Overview
          </HeroFade>
          <h1 className="display mt-5 max-w-6xl text-[clamp(2.2rem,6.4vw,7rem)] md:mt-10">
            <Reveal as="span" trigger="load" delay={0.1} className="block">
              {s.headline}
            </Reveal>
          </h1>
          <HeroFade className={`mt-5 max-w-2xl text-base leading-relaxed md:mt-10 md:text-xl ${t.sub}`}>{s.summary}</HeroFade>
        </div>

        {/* Metrics */}
        <div className="container-x relative mt-10 md:mt-12">
          <div className={`grid grid-cols-3 border-t ${light ? "border-ink/15" : "border-ivory/20"}`}>
            {s.metrics.map((m, i) => (
              <FadeUp key={m.l} delay={i * 0.08} className={`pr-2 pt-5 md:pr-8 md:pt-8 ${i ? `border-l pl-3 md:pl-8 ${light ? "border-ink/15" : "border-ivory/20"}` : ""}`}>
                <p className="num whitespace-nowrap text-[clamp(1.7rem,6vw,6rem)]">{m.v}</p>
                <p className={`mt-1.5 text-[0.75rem] leading-snug md:mt-2 md:text-base ${t.sub}`}>{m.l}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-ivory py-12 md:py-20 lg:py-24">
        <div className="container-x grid gap-12 md:gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="rounded-[1.25rem] border border-line p-5 md:rounded-[1.75rem] md:p-7 lg:sticky lg:top-28">
              <nav aria-label="On this page" className="mb-5 border-b border-line pb-5 md:mb-7 md:pb-6">
                <p className="eyebrow text-muted">On this page</p>
                <ol className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[0.88rem] md:block md:space-y-1.5 md:text-[0.95rem]">
                  {CHAPTERS.map((c, i) => (
                    <li key={c.id}>
                      <a href={`#${c.id}`} className="group flex gap-3 text-ink/70 transition-colors hover:text-brand">
                        <span className="serif italic text-brand">{String(i + 1).padStart(2, "0")}</span>
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-4 md:block md:space-y-5">
                {facts.map((f) => (
                  <div key={f.k}>
                    <dt className="eyebrow text-[0.6rem] text-muted md:text-[0.7rem]">{f.k}</dt>
                    <dd className="mt-1 text-[0.95rem] leading-snug md:text-lg">{f.v}</dd>
                  </div>
                ))}
                <div className="col-span-2">
                  <dt className="eyebrow text-[0.6rem] text-muted md:text-[0.7rem]">Frameworks</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {s.frameworks.map((f) => {
                      const slugFw = fwSlug(f);
                      return slugFw ? (
                        <Link key={f} href={`/frameworks/${slugFw}`} data-label={f}>
                          <Chip className="transition-colors hover:border-ink hover:bg-ink hover:text-ivory">{f}</Chip>
                        </Link>
                      ) : (
                        <Chip key={f}>{f}</Chip>
                      );
                    })}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="eyebrow text-[0.6rem] text-muted md:text-[0.7rem]">Services</dt>
                  <dd className="mt-1 text-[0.95rem] leading-snug md:text-lg">{s.services.join(", ")}</dd>
                </div>
              </dl>
              <div className="mt-5 border-t border-line pt-5 md:mt-8 md:pt-6">
                <Button href="#book" magnetic={false} className="w-full justify-between">
                  Get similar results
                </Button>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-8 xl:col-span-8 xl:col-start-5">
            <Chapter i={1} />
            <div className="mt-4 space-y-4 text-[clamp(1.2rem,2.2vw,2rem)] leading-[1.32] tracking-[-0.02em] md:mt-6 md:space-y-6">
              {s.challenge.map((p) => (
                <FadeUp as="p" key={p}>
                  {p}
                </FadeUp>
              ))}
            </div>

            <Chapter i={2} className="mt-14 md:mt-14" />
            <ol className="relative mt-5 space-y-1 before:absolute before:bottom-6 before:left-[1.1rem] before:top-6 before:w-px before:bg-line md:mt-10 md:space-y-3 md:before:left-[1.35rem]">
              {s.approach.map((a, i) => (
                <FadeUp as="li" key={a.t} delay={i * 0.05} className="relative flex gap-4 rounded-[1.5rem] p-1.5 md:gap-6 md:p-2 md:pr-6">
                  <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-brand text-sm text-ivory md:size-11">{i + 1}</span>
                  <span className="pt-1.5 md:pt-2">
                    <span className="block text-lg leading-tight tracking-[-0.02em] md:text-2xl">{a.t}</span>
                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-muted md:mt-2 md:text-lg">{a.d}</span>
                  </span>
                </FadeUp>
              ))}
            </ol>

            <Chapter i={3} className="mt-14 md:mt-14" />
            <FadeUp as="figure" className="relative mt-5 overflow-hidden rounded-[1.5rem] bg-brand p-6 text-ivory md:mt-8 md:rounded-[2rem] md:p-14">
              <Glyph seed={`${s.slug}-q`} className="pointer-events-none absolute -bottom-24 -right-24 w-96 text-accent/30" strands={9} />
              <span aria-hidden className="em block text-[4.5rem] leading-[0.5] text-accent md:text-[7rem]">&ldquo;</span>
              <blockquote className="em relative mt-4 text-[clamp(1.5rem,3.4vw,3.2rem)] leading-[1.12] md:mt-6">{s.quote.text}</blockquote>
              <figcaption className="relative mt-6 text-sm text-ivory/70 md:mt-10 md:text-base">
                <span className="block text-ivory">{s.quote.name}</span>
                {s.quote.role}
              </figcaption>
            </FadeUp>

            <Chapter i={4} className="mt-14 md:mt-14" />
            <ul className="mt-5 border-t border-line md:mt-8">
              {s.results.map((r) => (
                <FadeUp as="li" key={r} className="flex items-start gap-3 border-b border-line py-4 text-[1.05rem] leading-snug tracking-[-0.01em] md:gap-5 md:py-6 md:text-xl">
                  <span className="mt-0.5 grid size-6 shrink-0 md:mt-1 md:size-7 place-items-center rounded-full bg-accent text-sm text-ink">✓</span>
                  {r}
                </FadeUp>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Next story */}
      <Link
        href={`/customers/${next.slug}`}
        data-label={next.company}
        data-cursor="Next story"
        data-theme="dark"
        className="group relative block overflow-hidden bg-ink text-ivory"
      >
        <Glyph seed={next.slug} className="pointer-events-none absolute -right-[10%] top-1/2 w-[50vw] -translate-y-1/2 text-brand-3/40 transition-transform duration-[1.6s] ease-out-expo group-hover:rotate-12 group-hover:scale-110" strands={9} />
        <div className="container-x relative py-14 md:py-28">
          <p className="eyebrow text-accent">Next story</p>
          <p className="display mt-4 text-[clamp(2.4rem,9vw,9rem)] md:mt-6 transition-transform duration-700 ease-out-expo group-hover:translate-x-6">{next.company}</p>
          <p className="mt-4 flex max-w-2xl items-center gap-4 text-base text-ivory/60 md:mt-6 md:text-xl">
            {next.headline}
            <Arrow className="size-4 shrink-0" />
          </p>
        </div>
      </Link>

      <section className="bg-ivory py-14 md:py-20 lg:py-24">
        <div className="container-x">
          <p className="eyebrow text-muted">More stories</p>
          <div className="-mx-[var(--gutter)] mt-5 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] md:mx-0 md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {more.map((m) => (
              <StoryCard key={m.slug} story={m} className="w-[84vw] shrink-0 snap-start md:w-auto" />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA eyebrow="Your story next" />
    </>
  );
}
