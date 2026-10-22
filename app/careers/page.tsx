import type { Metadata } from "next";
import { roles, contact } from "@/lib/content";
import { PageHero } from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/Blocks";
import { FadeUp } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { Arrow, Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join SecureKnots, practitioner-led compliance and security consulting across the US and India.",
};

const perks = [
  { t: "Real problems", d: "Work across SaaS, defense, fintech and AI, often in the same quarter." },
  { t: "Certifications funded", d: "Exam fees, training and study time for the credentials that matter." },
  { t: "Remote-first", d: "Hubs in Wilmington, London and Bengaluru; work where you do your best thinking." },
  { t: "Small teams, senior people", d: "No pyramid. You work directly with clients from week one." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Do the work <span className="em text-brand">you&apos;re proud of.</span>
          </>
        }
        intro="We're a team of former auditors, CISOs, testers and privacy lawyers who'd rather fix things than produce binders."
        actions={<Button href="#roles">See open roles</Button>}
        art="careers"
      />

      <section className="bg-ivory pb-16 md:pb-24 lg:pb-28">
        <div className="container-x grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
          {perks.map((p, i) => (
            <FadeUp key={p.t} delay={i * 0.06} className="group relative overflow-hidden rounded-[1.25rem] bg-paper p-4 md:min-h-72 md:rounded-[1.75rem] md:p-7">
              <Glyph seed={p.t} className="pointer-events-none absolute -bottom-10 -right-10 w-36 md:-bottom-12 md:-right-12 md:w-56 text-brand/10 transition-transform duration-[1.4s] ease-out-expo group-hover:rotate-45" />
              <p className="eyebrow text-brand-3">0{i + 1}</p>
              <p className="relative mt-6 text-[1.05rem] leading-tight tracking-[-0.02em] md:mt-12 md:text-2xl">{p.t}</p>
              <p className="relative mt-1.5 text-[0.8rem] leading-snug text-muted md:mt-3 md:text-base">{p.d}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section id="roles" data-theme="dark" className="scroll-mt-10 bg-ink py-16 text-ivory md:py-24 lg:py-28">
        <div className="container-x">
          <SectionHead dark eyebrow="Open roles" title={<>{roles.length} ways <span className="em text-accent">in.</span></>} />
          <ul className="mt-8 border-t border-ivory/15 md:mt-14">
            {roles.map((r) => (
              <li key={r.title}>
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}
                  data-cursor="Apply"
                  className="group grid grid-cols-2 gap-x-3 gap-y-1.5 border-b border-ivory/15 py-5 transition-colors duration-500 hover:bg-ivory/[0.03] md:grid-cols-12 md:items-center md:gap-3 md:py-8"
                >
                  <span className="col-span-2 text-[clamp(1.35rem,3vw,2.8rem)] leading-tight tracking-[-0.03em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:col-span-6">{r.title}</span>
                  <span className="eyebrow text-ivory/50 md:col-span-2">{r.team}</span>
                  <span className="text-right text-sm text-ivory/60 md:col-span-2 md:text-left md:text-base">{r.location}</span>
                  <span className="col-span-2 flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                    <span className="eyebrow text-accent">{r.type}</span>
                    <span className="grid size-9 place-items-center rounded-full border border-ivory/15 transition-all md:size-11 duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                      <Arrow className="size-3" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base text-ivory/60 md:mt-12 md:text-lg">
            Don&apos;t see your role?{" "}
            <a href={`mailto:${contact.email}?subject=General%20application`} className="text-ivory underline underline-offset-4">
              Tell us what you&apos;d build here.
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
