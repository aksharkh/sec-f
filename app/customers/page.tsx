import type { Metadata } from "next";
import { Fragment } from "react";
import { stories, storyIndustries, storyFrameworks } from "@/lib/stories";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/Blocks";
import { StoryCard } from "@/components/stories/StoryCard";
import { StoriesGrid } from "@/components/stories/StoriesGrid";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { KnotMark } from "@/components/ui/Logo";
import { FadeUp } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Customer stories",
  description: "How healthcare, fintech, defense, AI and SaaS teams tied SOC 2, ISO 27001, CMMC, PCI DSS and more into one program.",
};

export default function CustomersPage() {
  const featured = stories.find((s) => s.featured) ?? stories[0];
  const avgWeeks = Math.round(stories.reduce((n, s) => n + s.weeks, 0) / stories.length);
  const fwCount = new Set(stories.flatMap((s) => s.frameworks)).size;

  return (
    <>
      <PageHero
        eyebrow="Customer stories"
        title={
          <>
            Tied tight. <span className="em text-brand">Proven in audit.</span>
          </>
        }
        aside={
          <div className="grid grid-cols-3 gap-3 border-t border-line pt-5 md:gap-4 md:pt-6 lg:border-0 lg:pt-0">
            {[
              { v: `${avgWeeks} wks`, l: "Average time to audit-ready" },
              { v: String(fwCount), l: "Frameworks across stories" },
              { v: String(storyIndustries.length), l: "Industries represented" },
            ].map((x) => (
              <div key={x.l}>
                <p className="num text-2xl md:text-4xl">{x.v}</p>
                <p className="mt-1 text-[0.75rem] leading-snug text-muted md:text-sm">{x.l}</p>
              </div>
            ))}
          </div>
        }
        art="customers"
        size="lg"
      />

      {/* Featured */}
      <section className="bg-ivory pb-12 md:pb-20">
        <div className="container-x grid gap-3 md:gap-5 lg:grid-cols-12">
          <FadeUp className="lg:col-span-8">
            <StoryCard story={featured} size="lg" className="h-full" />
          </FadeUp>
          <FadeUp delay={0.1} className="flex flex-col justify-between rounded-[1.5rem] bg-paper p-5 md:rounded-[2rem] md:p-10 lg:col-span-4">
            <p className="eyebrow text-muted">Featured story</p>
            <blockquote className="em mt-5 text-[clamp(1.5rem,2.6vw,2.6rem)] leading-[1.12] text-brand md:mt-10">&ldquo;{featured.quote.text}&rdquo;</blockquote>
            <p className="mt-5 text-sm md:mt-8">
              <span className="block font-medium">{featured.quote.name}</span>
              <span className="text-muted">{featured.quote.role}</span>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Logo wall */}
      <section aria-label="Companies" className="border-y border-line bg-ivory py-6 md:py-10">
        <VelocityMarquee speed={45}>
          {stories.map((s) => (
            <Fragment key={s.slug}>
              <span className="mx-6 flex items-center gap-3 whitespace-nowrap text-2xl font-semibold tracking-[-0.04em] text-ink/70 md:mx-10 md:text-4xl">
                <span className="grid size-10 place-items-center rounded-xl border border-ink/20 text-sm">{s.mark}</span>
                {s.company}
              </span>
              <KnotMark className="size-6 shrink-0 text-ink/15" strokeWidth={4} />
            </Fragment>
          ))}
        </VelocityMarquee>
      </section>

      {/* Grid */}
      <section className="bg-ivory py-14 md:py-20 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="All stories" title={<>Find teams <span className="em text-brand">like yours.</span></>} />
          <div className="mt-7 md:mt-14">
            <StoriesGrid items={stories} industries={storyIndustries} frameworks={storyFrameworks} />
          </div>
        </div>
      </section>

      <Testimonials eyebrow="In their words" items={stories.map((s) => ({ quote: s.quote.text, name: s.quote.name, org: s.company }))} />
      <FinalCTA eyebrow="Your story next" />
    </>
  );
}
