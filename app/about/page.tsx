import type { Metadata } from "next";
import { values, team, credentials, contact } from "@/lib/content";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/Blocks";
import { ScrubText } from "@/components/page/ScrubText";
import { FadeUp } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { KnotMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/home/FinalCTA";
import { LiveClock } from "@/components/layout/LiveClock";
import { OutlineBand } from "@/components/ui/OutlineBand";
import { RingMap } from "@/components/meridian/RingMap";

export const metadata: Metadata = {
  title: "About",
  description: "SecureKnots is a practitioner-led compliance firm helping companies unify security, privacy and AI frameworks into one program.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SecureKnots"
        title={
          <>
            We tie <span className="em text-brand">loose ends.</span>
          </>
        }
        intro="SecureKnots was founded on a simple frustration: companies were running five compliance programs to prove the same controls five times. We built a practice to fix that."
        art="about"
      />

      <section data-theme="dark" className="bg-brand py-16 text-ivory md:py-28 lg:py-32">
        <div className="container-x grid gap-5 md:grid-cols-12 md:gap-12">
          <p className="eyebrow text-ivory/50 md:col-span-3">Our belief</p>
          <div className="md:col-span-9">
            <ScrubText
              className="text-[clamp(1.55rem,4.2vw,4.1rem)] font-medium leading-[1.1] tracking-[-0.035em]"
              text="Compliance should be a byproduct of running a secure company, not a separate job. When controls are designed once, owned clearly and evidenced automatically, every certificate you need becomes a formality."
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory py-16 md:py-24 lg:py-28">
        <div className="container-x">
          <SectionHead eyebrow="How we work" title={<>Four things we <span className="em text-brand">won&apos;t compromise.</span></>} />
          <div className="mt-8 grid grid-cols-2 gap-2 md:mt-14 md:gap-4">
            {values.map((v, i) => (
              <FadeUp key={v.t} delay={(i % 2) * 0.08} className="group relative overflow-hidden rounded-[1.25rem] bg-paper p-4 md:min-h-80 md:rounded-[2rem] md:p-10">
                <Glyph seed={v.t} className="pointer-events-none absolute -bottom-10 -right-10 w-40 text-brand/10 md:-bottom-20 md:-right-20 md:w-80 transition-transform duration-[1.6s] ease-out-expo group-hover:rotate-45" strands={9} />
                <p className="em text-4xl text-brand/25 md:text-7xl">0{i + 1}</p>
                <p className="relative mt-4 text-[1.05rem] leading-tight tracking-[-0.02em] md:mt-10 md:text-3xl md:tracking-[-0.03em]">{v.t}</p>
                <p className="relative mt-2 max-w-md text-[0.8rem] leading-snug text-muted md:mt-4 md:text-lg md:leading-relaxed">{v.d}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <RingMap />

      {/* Team */}
      <section className="bg-ivory py-16 md:py-24 lg:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Leadership"
            title={<>Practitioners who&apos;ve <span className="em text-brand">sat on both sides.</span></>}
            intro="Former auditors, CISOs, penetration testers and privacy counsel, across the US and India."
          />
          <div className="mt-8 grid grid-cols-2 gap-x-2 gap-y-5 md:mt-14 md:gap-4 lg:grid-cols-3">
            {team.map((m, i) => (
              <FadeUp key={m.name} delay={(i % 3) * 0.08} className="group">
                <div className="relative aspect-square overflow-hidden rounded-[1.1rem] bg-brand md:aspect-[4/5] md:rounded-[1.75rem]">
                  <Glyph seed={m.name} className="absolute inset-0 m-auto w-[120%] -translate-x-[8%] text-accent/40 transition-transform duration-[1.6s] ease-out-expo group-hover:scale-110 group-hover:rotate-12" strands={9} />
                  <span className="eyebrow absolute left-3 top-3 text-[0.55rem] text-ivory/60 md:left-5 md:top-5 md:text-[0.7rem]">Photo coming soon</span>
                </div>
                <p className="mt-2.5 text-[0.95rem] leading-tight tracking-[-0.02em] md:mt-5 md:text-xl">{m.name}</p>
                <p className="mt-0.5 text-[0.8rem] text-muted md:mt-0 md:text-base">{m.focus}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section aria-label="Team credentials" className="border-y border-line bg-ivory py-6 md:py-10">
        <VelocityMarquee speed={50}>
          {credentials.map((c) => (
            <span key={c} className="mx-5 flex items-center gap-5 whitespace-nowrap text-3xl tracking-[-0.04em] md:mx-8 md:gap-8 md:text-6xl">
              {c}
              <KnotMark className="size-8 text-brand/30" strokeWidth={3} />
            </span>
          ))}
        </VelocityMarquee>
      </section>

      {/* Offices */}
      <section data-theme="dark" className="bg-ink py-16 text-ivory md:py-24 lg:py-28">
        <div className="container-x">
          <SectionHead dark eyebrow="Offices" title={<>Three hubs. <span className="em text-accent">One team.</span></>} />
          <div className="mt-8 grid gap-2 md:mt-14 md:grid-cols-3 md:gap-3">
            {contact.offices.map((o) => (
              <FadeUp key={o.city} className="relative flex flex-col overflow-hidden rounded-[1.25rem] border border-ivory/10 p-5 md:rounded-[2rem] md:p-8">
                <Glyph seed={o.city} className="pointer-events-none absolute -right-10 -top-10 w-44 text-brand-3/30 md:-right-16 md:-top-16 md:w-80" />
                <p className="eyebrow text-ivory/50">{o.region}</p>
                <p className="display mt-4 text-[clamp(2.2rem,3.8vw,4rem)] md:mt-8">{o.city}</p>
                <p className="mt-2 text-sm text-ivory/50">{o.entity}</p>
                <div className="mt-4 flex items-end justify-between gap-4 border-t border-ivory/10 pt-4 md:mt-auto md:pt-6">
                  <p className="text-sm leading-snug text-ivory/60 md:max-w-[16rem]">{o.address}</p>
                  <span className="shrink-0 text-lg md:text-xl">
                    <LiveClock tz={o.tz} />
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="mt-8 flex justify-center md:mt-16">
            <Button href="/careers" variant="accent">
              Join the team
            </Button>
          </div>
        </div>
      </section>

      <OutlineBand rows={[["Practitioners", "Not paper-pushers", "Practitioners", "Not paper-pushers"], ["Plain language", "Outcomes", "One program", "Plain language", "Outcomes"]]} />
      <FinalCTA eyebrow="Work with us" />
    </>
  );
}
