import type { Metadata } from "next";
import { contact } from "@/lib/content";
import { HeroFade } from "@/components/page/HeroFade";
import { Accordion } from "@/components/page/Accordion";
import { SectionHead } from "@/components/page/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { ContactForm } from "@/components/contact/ContactForm";
import { LiveClock } from "@/components/layout/LiveClock";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to a SecureKnots practitioner about SOC 2, ISO 27001, FedRAMP, CMMC, PCI DSS and more. Offices in Wilmington, DE and Bengaluru.",
};

const faqs = [
  { q: "How quickly will you respond?", a: "Within one business day, from a practitioner, not a sales development rep." },
  { q: "What happens on the first call?", a: "We learn what you sell, who you sell to and your deadlines, then outline the frameworks, sequence and rough timeline. You leave with a plan whether or not you work with us." },
  { q: "Do you work with early-stage startups?", a: "Yes. We right-size scope so a seed-stage team can get audit-ready for a first SOC 2 without a full-time security hire." },
  { q: "Are you an auditor?", a: "We prepare you for audits and coordinate with independent auditors and certification bodies, keeping advisory and attestation properly separate." },
];

export default function ContactPage() {
  return (
    <>
      <section data-theme="dark" className="relative overflow-hidden bg-ink pb-14 pt-28 text-ivory md:pb-32 md:pt-36">
        <Glyph seed="contact" className="pointer-events-none absolute -left-40 bottom-0 w-[30rem] text-brand-3/25 md:w-[50rem]" strands={11} strokeWidth={0.5} />
        <div className="container-x relative grid gap-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
          <div className="lg:col-span-5">
            <HeroFade as="p" className="eyebrow text-accent">
              Contact
            </HeroFade>
            <h1 className="display mt-5 text-[clamp(2.6rem,7.5vw,8rem)] md:mt-8">
              <Reveal as="span" trigger="load" className="block">
                Let&apos;s tie it <span className="em text-accent">together.</span>
              </Reveal>
            </h1>
          </div>
          <HeroFade className="rounded-[1.5rem] border border-ivory/10 bg-ink-2/80 p-5 backdrop-blur md:rounded-[2rem] md:p-10 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1" delay={0.6}>
            <ContactForm />
          </HeroFade>
          <div className="lg:col-span-5 lg:row-start-2">
            <HeroFade className="space-y-6">
              <a href={`mailto:${contact.email}`} className="link-sweep block text-xl tracking-[-0.02em] md:text-2xl">
                {contact.email}
              </a>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {contact.offices.map((o) => (
                  <div key={o.city} className="border-t border-ivory/15 pt-5">
                    <p className="flex items-center justify-between">
                      <span className="text-lg md:text-xl">{o.city}</span>
                      <LiveClock tz={o.tz} />
                    </p>
                    <p className="mt-2 text-sm text-ivory/55">{o.address}</p>
                    <a href={`tel:${(o.tz.startsWith("America") ? contact.phoneUS : contact.phoneIN).replace(/[^+\d]/g, "")}`} className="link-sweep mt-2 inline-block text-sm text-ivory/80">
                      {o.tz.startsWith("America") ? contact.phoneUS : contact.phoneIN}
                    </a>
                  </div>
                ))}
              </div>
            </HeroFade>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24 lg:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Before you reach out" title={<>Good <span className="em text-brand">questions.</span></>} />
          <div className="mt-6 md:ml-[25%] md:mt-14">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
