import type { Metadata } from "next";
import { articles, articleTags } from "@/lib/insights";
import { PageHero } from "@/components/page/PageHero";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { InsightsBrowser, Newsletter } from "@/components/insights/InsightsBrowser";
import { FadeUp } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical guidance on SOC 2, ISO 27001, CMMC, ISO 42001, PCI DSS, DORA and privacy law from SecureKnots practitioners.",
};

export default function InsightsPage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Latest <span className="em text-brand">thinking.</span>
          </>
        }
        intro="Practical guidance from the people doing the work."
        art="insights"
      />
      <section className="bg-ivory pb-10 md:pb-20">
        <FadeUp className="container-x">
          <ArticleCard a={featured} large />
        </FadeUp>
      </section>
      <section className="bg-ivory pb-16 md:pb-24 lg:pb-28">
        <div className="container-x">
          <InsightsBrowser items={rest} tags={articleTags} />
        </div>
      </section>
      <section data-theme="dark" className="relative overflow-hidden bg-brand py-14 text-ivory md:py-20 lg:py-24">
        <Glyph seed="newsletter" className="pointer-events-none absolute -right-20 -top-20 w-[22rem] text-accent/25 md:-right-32 md:-top-32 md:w-[40rem]" strands={11} />
        <div className="container-x relative grid gap-6 md:gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">The Knot, monthly</p>
            <p className="display mt-4 text-[clamp(2.2rem,5.5vw,5.5rem)] md:mt-6">
              Regulatory change, <span className="em">untangled.</span>
            </p>
            <p className="mt-4 max-w-lg text-base text-ivory/65 md:mt-6 md:text-lg">One email a month. What changed, who it affects, and what to do about it.</p>
          </div>
          <div className="lg:col-span-5">
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  );
}
