import Link from "next/link";
import type { Article } from "@/lib/insights";
import { ReededGlassStatic } from "@/components/ui/ReededGlass";

export function formatDate(d: string) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/** Stable 0..1 value per slug, so each cover gets its own light position. */
export function coverHue(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
}

export function ArticleCard({ a, large }: { a: Article; large?: boolean }) {
  return (
    <Link href={`/insights/${a.slug}`} data-cursor="Read" data-label={a.tag} className={`group ${large ? "block lg:grid lg:grid-cols-12 lg:items-end lg:gap-10" : "grid grid-cols-[6.5rem_1fr] items-start gap-4 md:block"}`}>
      <div data-fx className={`relative overflow-hidden bg-ink ${large ? "aspect-[16/10] rounded-[1.25rem] md:rounded-[1.75rem] lg:col-span-7" : "aspect-square rounded-[0.9rem] md:aspect-[4/5] md:rounded-[1.75rem]"}`}>
        <ReededGlassStatic
          className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
          stripes={large ? 26 : 16}
          hue={coverHue(a.slug)}
          tone={a.tone === "accent" || a.tone === "paper" ? "light" : "dark"}
        />
      </div>
      <div className={large ? "mt-5 md:mt-8 lg:col-span-5 lg:mt-0" : "md:mt-6"}>
        <p className="text-[0.78rem] text-muted md:text-sm">
          {a.tag} <span aria-hidden>·</span> {formatDate(a.date)}
        </p>
        <h3 className={`mt-1.5 leading-[1.12] tracking-[-0.03em] md:mt-3 ${large ? "text-[clamp(1.7rem,3.4vw,3.4rem)]" : "text-[1.1rem] md:text-2xl"}`}>
          <span className="link-sweep">{a.title}</span>
        </h3>
        {large && <p className="mt-3 max-w-lg text-base leading-relaxed text-muted md:mt-5 md:text-lg">{a.excerpt}</p>}
      </div>
    </Link>
  );
}
