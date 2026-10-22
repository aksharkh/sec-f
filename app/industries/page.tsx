import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/lib/content";
import { frameworks } from "@/lib/frameworks";
import { SHOW_STORIES, stories } from "@/lib/stories";
import { PageHero } from "@/components/page/PageHero";
import { Glyph } from "@/components/ui/Glyph";
import { Arrow, Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { StackPanels } from "@/components/industries/StackPanels";

export const metadata: Metadata = {
  title: "Industries",
  description: "Compliance programs for SaaS, fintech, healthcare, government contractors, AI companies and enterprise.",
};

const tones = [
  "bg-brand text-ivory",
  "bg-ink text-ivory",
  "bg-paper text-ink",
  "bg-brand-2 text-ivory",
  "bg-accent text-ink",
  "bg-bone text-ink",
];

const storyFor: Record<string, string> = {
  "SaaS & Cloud": "SaaS & Cloud",
  "Fintech & Payments": "Fintech",
  "Healthcare & Life Sciences": "Healthcare",
  "Government & Defense": "Government & Defense",
  "AI & Data Platforms": "AI & Data",
  "Enterprise & BFSI": "Financial Services",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Your buyers. <span className="em text-brand">Your rules.</span>
          </>
        }
        intro="Every industry has its own mix of frameworks, regulators and buyer expectations. We start from yours."
        actions={<Button href="#book">Talk to a specialist</Button>}
        art="industries"
      />

      <StackPanels>
        {industries.map((ind, i) => {
          const light = tones[i].includes("text-ink");
          const story = SHOW_STORIES ? stories.find((s) => s.industry === storyFor[ind.name]) : undefined;
          return (
            <article
              key={ind.name}
              id={ind.name.toLowerCase().replace(/[^a-z]+/g, "-")}
              data-theme={light ? undefined : "dark"}
              className={`stack-panel relative flex min-h-[100svh] flex-col overflow-hidden rounded-t-[2.5rem] ${tones[i]}`}
            >
              <Glyph
                seed={ind.name}
                className={`pointer-events-none absolute -right-[15%] top-[10%] w-[80vw] max-w-[56rem] md:w-[50vw] ${light ? "text-brand/15" : "text-accent/25"}`}
                strands={11}
                strokeWidth={0.5}
              />
              <div className="container-x relative flex flex-1 flex-col pb-8 pt-24 md:pb-14 md:pt-28">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">
                    {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                  </span>
                  <span className={`eyebrow ${light ? "text-ink/50" : "text-ivory/50"}`}>Industry</span>
                </div>
                <h2 className="display mt-auto max-w-5xl pt-10 text-[clamp(2.5rem,9vw,9.5rem)] md:pt-20">{ind.name}</h2>
                <div className={`mt-6 grid gap-5 border-t pt-5 md:mt-12 md:grid-cols-12 md:gap-10 md:pt-8 ${light ? "border-ink/15" : "border-ivory/20"}`}>
                  <p className="text-lg leading-snug tracking-[-0.02em] md:col-span-5 md:text-2xl">{ind.note}</p>
                  <div className="md:col-span-4">
                    <p className={`eyebrow ${light ? "text-ink/50" : "text-ivory/50"}`}>Typical frameworks</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5 md:mt-4 md:gap-2">
                      {ind.frameworks.map((f) => {
                        const fw = frameworks.find((x) => x.name === f);
                        const cls = `rounded-full border px-3 py-1.5 text-[0.82rem] transition-colors md:px-4 md:py-2 md:text-sm ${light ? "border-ink/20 hover:bg-ink hover:text-ivory" : "border-ivory/25 hover:bg-ivory hover:text-ink"}`;
                        return fw ? (
                          <Link key={f} href={`/frameworks/${fw.slug}`} data-label={f} className={cls}>
                            {f}
                          </Link>
                        ) : (
                          <span key={f} className={cls}>
                            {f}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  {story && (
                    <Link href={`/customers/${story.slug}`} data-label={story.company} className={`group grid grid-cols-[auto_1fr] items-center gap-x-4 border-t pt-4 md:col-span-3 md:block md:border-t-0 md:pt-0 ${light ? "border-ink/15" : "border-ivory/20"}`}>
                      <p className={`eyebrow col-span-2 mb-2 md:mb-0 ${light ? "text-ink/50" : "text-ivory/50"}`}>Customer story</p>
                      <p className="row-span-2 text-3xl tracking-[-0.03em] md:mt-4 md:text-4xl">{story.metrics[0].v}</p>
                      <p className={`text-sm leading-snug md:mt-1 ${light ? "text-ink/60" : "text-ivory/60"}`}>{story.metrics[0].l}</p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium md:mt-4">
                        <span className="link-sweep">Read {story.company}</span>
                        <Arrow className="size-3 transition-transform duration-500 group-hover:rotate-45" />
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </StackPanels>

      <section className="bg-ivory py-14 md:py-20 lg:py-24">
        <FadeUp className="container-x text-center">
          <p className="eyebrow text-muted">Not listed?</p>
          <p className="display mx-auto mt-4 max-w-4xl text-[clamp(2rem,5vw,5rem)] md:mt-6">
            If you sell to demanding buyers, <span className="em text-brand">we&apos;ve likely seen it.</span>
          </p>
        </FadeUp>
      </section>
      <FinalCTA eyebrow="Start here" />
    </>
  );
}
