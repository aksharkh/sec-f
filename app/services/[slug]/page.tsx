import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceDetails, frameworkCount } from "@/lib/content";
import { getFramework } from "@/lib/frameworks";
import { stories } from "@/lib/stories";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/Blocks";
import { FadeUp } from "@/components/ui/Reveal";
import { Button, Arrow } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { StoryCard } from "@/components/stories/StoryCard";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ScanTerminal } from "@/components/meridian/home/ScanTerminal";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.id === slug);
  if (!s) return {};
  return { title: s.title, description: serviceDetails[s.id].tagline };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.id === slug);
  if (!s) notFound();
  const d = serviceDetails[s.id];
  const idx = services.indexOf(s);
  const next = services[(idx + 1) % services.length];
  const related = stories.filter((st) => st.services.includes(s.title)).slice(0, 2);
  const fws = d.frameworks.map(getFramework).filter(Boolean) as NonNullable<ReturnType<typeof getFramework>>[];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.title }]}
        eyebrow={`(0${idx + 1}) ${s.kicker}`}
        title={s.title}
        intro={
          <>
            <span className="block text-xl leading-snug tracking-[-0.02em] text-ink md:text-2xl">{d.tagline}</span>
            <span className="mt-4 block">{s.body}</span>
          </>
        }
        actions={<Button href="#book">Talk to a practitioner</Button>}
        art={s.id}
      />

      {/* Outcomes */}
      <section data-theme="dark" className="bg-brand text-ivory">
        <div className="container-x grid grid-cols-3">
          {d.outcomes.map((o, i) => (
            <FadeUp key={o.l} delay={i * 0.08} className={`py-7 md:py-16 ${i ? "border-l border-ivory/15 pl-3 md:pl-10" : "pr-3"}`}>
              <p className="num text-[clamp(1.9rem,6vw,5.6rem)]">{o.v}</p>
              <p className="mt-1.5 text-[0.75rem] leading-snug text-ivory/60 md:mt-2 md:text-base">{o.l}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {s.id === "testing" && (
        <section className="bg-ivory pt-16 md:pt-24 lg:pt-28">
          <div className="container-x grid gap-6 md:gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="eyebrow text-muted">Inside a test</p>
              <p className="serif mt-4 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.02] md:mt-5">
                From endpoints <span className="em text-brand">to evidence.</span>
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-ink/65 md:mt-6">
                Every finding is validated by hand, ticketed for remediation, retested, and mapped to the audit controls it affects.
              </p>
            </div>
            <figure className="min-w-0 lg:col-span-7">
              <ScanTerminal />
            </figure>
          </div>
        </section>
      )}

      {/* Includes */}
      <section className="bg-ivory py-16 md:py-24 lg:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="What's included"
            title={
              <>
                Everything you need. <span className="em text-brand">Nothing you don&apos;t.</span>
              </>
            }
          />
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line md:mt-14 md:rounded-[2rem] lg:grid-cols-3">
            {d.includes.map((x, i) => (
              <FadeUp key={x.t} delay={(i % 3) * 0.08} className="group relative overflow-hidden bg-ivory p-4 transition-colors duration-700 hover:bg-ink hover:text-ivory md:min-h-64 md:p-8">
                <Glyph seed={x.t} className="pointer-events-none absolute -bottom-16 -right-16 w-56 text-brand-3 opacity-0 transition-opacity duration-700 group-hover:opacity-40" />
                <p className="eyebrow text-muted group-hover:text-accent">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-5 text-[1.02rem] leading-tight tracking-[-0.02em] md:mt-16 md:text-2xl">{x.t}</p>
                <p className="mt-1.5 text-[0.8rem] leading-snug text-muted group-hover:text-ivory/60 md:mt-3 md:text-base md:leading-relaxed">{x.d}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="bg-paper py-14 md:py-20 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Frameworks covered" title={<>Built for <span className="em text-brand">your roadmap.</span></>} />
          <div className="mt-7 flex flex-wrap gap-2 md:mt-14 md:gap-3">
            {fws.map((f) => (
              <Link
                key={f.slug}
                href={`/frameworks/${f.slug}`}
                data-label={f.name}
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ivory py-1.5 pl-4 pr-1.5 text-[0.95rem] transition-colors duration-500 hover:bg-ink hover:text-ivory md:gap-3 md:py-3 md:pl-6 md:pr-3 md:text-lg"
              >
                {f.name}
                <span className="grid size-7 place-items-center rounded-full bg-ink/5 transition-transform md:size-9 duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-ink">
                  <Arrow className="size-3" />
                </span>
              </Link>
            ))}
            <Link href="/frameworks" className="inline-flex items-center rounded-full px-3 py-1.5 text-[0.95rem] text-muted underline underline-offset-4 md:px-6 md:py-3 md:text-lg md:no-underline md:hover:underline">
              + {frameworkCount - fws.length} more
            </Link>
          </div>
        </div>
      </section>

      <Process eyebrow="How we deliver" />

      {related.length > 0 && (
        <section className="bg-ivory py-16 md:py-24 lg:py-28">
          <div className="container-x">
            <SectionHead eyebrow="Customer stories" title={<>{s.title}, <span className="em text-brand">in practice.</span></>} />
            <div className="-mx-[var(--gutter)] mt-8 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] md:mx-0 md:mt-16 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
              {related.map((st) => (
                <StoryCard key={st.slug} story={st} className={related.length > 1 ? "w-[84vw] shrink-0 snap-start md:w-auto" : "w-full"} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Link href={`/services/${next.id}`} data-label={next.title} data-cursor="Next" data-theme="dark" className="group relative block overflow-hidden bg-ink text-ivory">
        <div className="container-x relative py-14 md:py-28">
          <p className="eyebrow text-accent">Next service</p>
          <p className="display mt-4 text-[clamp(2.4rem,9vw,9rem)] md:mt-6 transition-transform duration-700 ease-out-expo group-hover:translate-x-6">{next.title}</p>
        </div>
      </Link>

      <FinalCTA eyebrow="Start here" />
    </>
  );
}
