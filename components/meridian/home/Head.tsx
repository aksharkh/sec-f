import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Section header shared by the homepage: index number, label, serif title. */
export function Head({ n, label, title, aside, dark }: { n: string; label: string; title: ReactNode; aside?: ReactNode; dark?: boolean }) {
  return (
    <div className={`grid gap-5 border-t pt-5 md:gap-8 md:pt-6 lg:grid-cols-12 ${dark ? "border-line-dark" : "border-line"}`}>
      <p className={`eyebrow flex gap-4 lg:col-span-3 ${dark ? "text-ivory/55" : "text-muted"}`}>
        <span className={dark ? "text-brand-3" : "text-brand"}>{n}</span>
        {label}
      </p>
      <div className="lg:col-span-9">
        <Reveal as="h2" className="wide max-w-4xl text-[clamp(2.2rem,5vw,5.2rem)] leading-[0.98]">
          {title}
        </Reveal>
        {aside && <div className={`mt-4 max-w-xl text-base leading-relaxed md:mt-6 md:text-lg ${dark ? "text-ivory/65" : "text-ink/65"}`}>{aside}</div>}
      </div>
    </div>
  );
}

/** Numbered eyebrow for shared sections that render their own heading layout. */
export function Numbered({ n, label, dark }: { n: string; label: string; dark?: boolean }) {
  return (
    <span className="flex gap-4">
      <span className={dark ? "text-brand-3" : "text-brand"}>{n}</span>
      {label}
    </span>
  );
}
