import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { frameworks, getFramework } from "@/lib/frameworks";
import { process } from "@/lib/content";
import { stories } from "@/lib/stories";
import { PageHero } from "@/components/page/PageHero";
import { StickyToc } from "@/components/page/StickyToc";
import { Accordion } from "@/components/page/Accordion";
import { Chip } from "@/components/page/Blocks";
import { Reveal, FadeUp } from "@/components/ui/Reveal";
import { Button, Arrow } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { StoryCard } from "@/components/stories/StoryCard";
import { FinalCTA } from "@/components/home/FinalCTA";

export function generateStaticParams() {
  return frameworks.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/frameworks/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = getFramework(slug);
  if (!f) return {};
  return { title: `${f.name} compliance`, description: f.summary };
}

const toc = [
  { id: "overview", label: "Overview" },
  { id: "requirements", label: "Requirements" },
  { id: "approach", label: "Our approach" },
  { id: "related", label: "Related frameworks" },
  { id: "faq", label: "FAQ" },
];

export default async function FrameworkPage({ params }: PageProps<"/frameworks/[slug]">) {
  const { slug } = await params;
  const f = getFramework(slug);
  if (!f) notFound();

  const related = f.related.map(getFramework).filter(Boolean) as NonNullable<ReturnType<typeof getFramework>>[];
  const story = stories.find((s) => s.frameworks.includes(f.name)) ?? stories.find((s) => s.frameworks.some((x) => related.some((r) => r.name === x)));
  const idx = frameworks.findIndex((x) => x.slug === f.slug);
  const next = frameworks[(idx + 1) % frameworks.length];

  const facts = [
    { k: "Issued by", v: f.issuer },
    { k: "Typical timeline", v: f.timeline },
    { k: "Assessed by", v: f.assessment },
    { k: "Validity", v: f.validity },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Frameworks", href: "/frameworks" }, { label: f.name }]}
        eyebrow={`${f.group} · ${f.full}`}
        title={f.name}
        intro={f.summary}
        actions={
          <>
            <Button href="#book" book={f.name}>
              Book a {f.name} assessment
            </Button>
          </>
        }
        art={f.slug}
      />

      {/* Key facts */}
      <section data-theme="dark" className="bg-brand text-ivory">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4">
          {facts.map((x, i) => (
            <FadeUp key={x.k} delay={i * 0.06} className={`border-ivory/15 py-5 pr-4 md:py-10 md:pr-6 ${i % 2 ? "pl-4 md:pl-6" : ""} ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""}`}>
              <p className="eyebrow text-accent">{x.k}</p>
              <p className="mt-2 text-base leading-snug tracking-[-0.02em] md:mt-3 md:text-2xl">{x.v}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="bg-ivory">
        {/* Phones: the sidebar contents become a sticky row of section links */}
        <nav aria-label="On this page" className="sticky top-[var(--nav-offset,76px)] z-20 border-b border-line bg-ivory/90 backdrop-blur-xl transition-[top] duration-500 lg:hidden">
          <ol className="container-x flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {toc.map((t, i) => (
              <li key={t.id} className="shrink-0">
                <a href={`#${t.id}`} className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-3 py-1.5 text-[0.8rem] text-ink/75">
                  <span className="eyebrow text-[0.55rem] text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="container-x grid gap-16 py-12 md:py-20 lg:py-24 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <StickyToc items={toc} />
          </aside>

          <div className="min-w-0 space-y-16 md:space-y-24 lg:col-span-9">
            {/* Overview */}
            <section id="overview" className="scroll-mt-32 lg:scroll-mt-28">
              <p className="eyebrow text-muted">Overview</p>
              <Reveal as="h2" className="display mt-4 text-[clamp(2rem,4.6vw,4.6rem)] md:mt-6">
                Who needs <span className="em text-brand">{f.name}?</span>
              </Reveal>
              <ul className="mt-6 grid gap-2 md:mt-12 md:grid-cols-3 md:gap-3">
                {f.who.map((w, i) => (
                  <FadeUp as="li" key={w} delay={i * 0.08} className="flex items-baseline gap-3 rounded-[1.1rem] bg-paper p-4 md:min-h-44 md:flex-col md:items-stretch md:justify-between md:gap-0 md:rounded-[1.5rem] md:p-6">
                    <span className="eyebrow text-brand-3">0{i + 1}</span>
                    <span className="text-base leading-snug tracking-[-0.01em] md:text-lg">{w}</span>
                  </FadeUp>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section id="requirements" className="scroll-mt-32 lg:scroll-mt-28">
              <p className="eyebrow text-muted">Requirements</p>
              <Reveal as="h2" className="display mt-4 text-[clamp(2rem,4.6vw,4.6rem)] md:mt-6">
                What the auditor <span className="em text-brand">looks for.</span>
              </Reveal>
              <ol className="mt-6 border-t border-line md:mt-12">
                {f.requirements.map((r, i) => (
                  <FadeUp as="li" key={r.t} className="group grid grid-cols-[2.4rem_1fr] gap-x-2 gap-y-1 border-b border-line py-5 md:grid-cols-12 md:items-baseline md:gap-4 md:py-8">
                    <span className="em row-span-2 text-3xl text-brand/30 transition-colors duration-500 group-hover:text-brand md:col-span-2 md:row-span-1 md:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg leading-tight tracking-[-0.02em] md:col-span-4 md:text-2xl">{r.t}</span>
                    <span className="text-[0.95rem] leading-relaxed text-muted md:col-span-6 md:text-lg">{r.d}</span>
                  </FadeUp>
                ))}
              </ol>
            </section>

            {/* Approach */}
            <section id="approach" className="scroll-mt-32 lg:scroll-mt-28">
              <p className="eyebrow text-muted">Our approach</p>
              <Reveal as="h2" className="display mt-4 text-[clamp(2rem,4.6vw,4.6rem)] md:mt-6">
                From scoping to <span className="em text-brand">auditor sign-off.</span>
              </Reveal>
              <div className="-mx-[var(--gutter)] mt-6 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 xl:grid-cols-5 [&::-webkit-scrollbar]:hidden">
                {process.map((p, i) => (
                  <FadeUp key={p.n} delay={i * 0.06} className="relative w-[72vw] shrink-0 snap-start overflow-hidden rounded-[1.25rem] bg-ink p-5 text-ivory sm:w-auto sm:rounded-[1.5rem] sm:p-6">
                    <p className="eyebrow text-accent">{p.time}</p>
                    <p className="em mt-5 text-4xl text-ivory/20 sm:mt-8 sm:text-5xl">{p.n}</p>
                    <p className="mt-2 text-2xl tracking-[-0.02em]">{p.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ivory/55">{p.body}</p>
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* Related */}
            <section id="related" className="scroll-mt-32 lg:scroll-mt-28">
              <p className="eyebrow text-muted">Related frameworks</p>
              <Reveal as="h2" className="display mt-4 text-[clamp(2rem,4.6vw,4.6rem)] md:mt-6">
                Tie it together <span className="em text-brand">with…</span>
              </Reveal>
              <p className="mt-4 max-w-2xl text-base text-muted md:mt-6 md:text-lg">
                {f.name} shares a large share of its controls with these frameworks. Add them to the same program and most of the evidence is already done.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2 sm:gap-3 md:mt-10">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/frameworks/${r.slug}`}
                    data-label={r.name}
                    className="group flex items-center justify-between gap-4 rounded-[1.1rem] border border-line p-4 transition-colors md:gap-6 md:rounded-[1.5rem] md:p-6 duration-500 hover:border-ink hover:bg-ink hover:text-ivory"
                  >
                    <span>
                      <span className="block text-xl tracking-[-0.02em] md:text-2xl">{r.name}</span>
                      <span className="mt-1 block text-sm text-muted group-hover:text-ivory/55">{r.full}</span>
                    </span>
                    <Arrow className="size-4 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                  </Link>
                ))}
              </div>
            </section>

            {story && (
              <section>
                <p className="eyebrow text-muted">Customer story</p>
                <div className="mt-5 md:mt-8">
                  <StoryCard story={story} size="lg" />
                </div>
              </section>
            )}

            {/* FAQ */}
            <section id="faq" className="scroll-mt-32 lg:scroll-mt-28">
              <p className="eyebrow text-muted">FAQ</p>
              <Reveal as="h2" className="display mt-4 text-[clamp(2rem,4.6vw,4.6rem)] md:mt-6">
                Questions, <span className="em text-brand">answered.</span>
              </Reveal>
              <div className="mt-6 md:mt-12">
                <Accordion items={f.faq} />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Next framework */}
      <Link href={`/frameworks/${next.slug}`} data-label={next.name} data-cursor="Next" className="group relative block overflow-hidden bg-ink text-ivory" data-theme="dark">
        <Glyph seed={next.slug} className="pointer-events-none absolute -right-[10%] top-1/2 w-[50vw] -translate-y-1/2 text-brand-3/40 transition-transform duration-[1.6s] ease-out-expo group-hover:rotate-12 group-hover:scale-110" strands={9} />
        <div className="container-x relative flex flex-wrap items-end justify-between gap-4 py-14 md:gap-6 md:py-28">
          <div>
            <p className="eyebrow text-accent">Next framework</p>
            <p className="display mt-4 text-[clamp(2.6rem,10vw,10rem)] md:mt-6 transition-transform duration-700 ease-out-expo group-hover:translate-x-6">{next.name}</p>
          </div>
          <span className="flex flex-wrap gap-2">
            <Chip dark>{next.group}</Chip>
            <Chip dark>{next.issuer}</Chip>
          </span>
        </div>
      </Link>

      <FinalCTA eyebrow={`Start your ${f.name} program`} />
    </>
  );
}
