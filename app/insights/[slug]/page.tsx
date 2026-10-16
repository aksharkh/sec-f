import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/insights";
import { HeroFade } from "@/components/page/HeroFade";
import { StickyToc } from "@/components/page/StickyToc";
import { Reveal, FadeUp } from "@/components/ui/Reveal";
import { Glyph, toneClasses } from "@/components/ui/Glyph";
import { ArticleCard, formatDate } from "@/components/insights/ArticleCard";
import { Newsletter } from "@/components/insights/InsightsBrowser";
import { ShareBar } from "@/components/insights/ShareBar";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt, openGraph: { type: "article", publishedTime: a.date } };
}

const id = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const t = toneClasses[a.tone];
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    datePublished: a.date,
    author: { "@type": "Organization", name: "SecureKnots" },
    publisher: { "@type": "Organization", name: "SecureKnots" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-ivory pb-8 pt-28 md:pb-14 md:pt-36">
        <div className="container-x">
          <HeroFade as="nav" aria-label="Breadcrumb" className="eyebrow flex gap-2 text-muted">
            <Link href="/insights" className="link-sweep">
              Insights
            </Link>
            <span>/</span>
            <span className="text-ink">{a.tag}</span>
          </HeroFade>
          <h1 className="display mt-6 max-w-6xl text-[clamp(2.1rem,6vw,6.5rem)] md:mt-10">
            <Reveal as="span" trigger="load" className="block">
              {a.title}
            </Reveal>
          </h1>
          <HeroFade className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line pt-4 text-sm text-muted md:mt-10 md:gap-x-8 md:gap-y-3 md:pt-6 md:text-base">
            <span>{a.author}</span>
            <span>{formatDate(a.date)}</span>
            <span>{a.read} read</span>
          </HeroFade>
        </div>
      </section>

      <HeroFade className="container-x bg-ivory" delay={0.6}>
        <div className={`relative h-[24vh] overflow-hidden rounded-[1.25rem] md:h-[46vh] md:rounded-[2rem] ${t.bg}`}>
          <Glyph seed={a.slug} className={`absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 animate-[drift_80s_linear_infinite] ${t.art} opacity-70`} strands={13} strokeWidth={0.35} />
        </div>
      </HeroFade>

      <section className="bg-ivory py-10 md:py-28">
        <div className="container-x grid gap-10 md:gap-14 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <StickyToc items={a.sections.map((s) => ({ id: id(s.h), label: s.h }))} title="Contents" />
          </aside>
          <article className="lg:col-span-7">
            {/* Phones: the sidebar contents list sits above the text */}
            <nav aria-label="Contents" className="mb-8 rounded-[1.1rem] border border-line p-4 lg:hidden">
              <p className="eyebrow text-muted">Contents</p>
              <ol className="mt-2.5 space-y-1.5">
                {a.sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#${id(s.h)}`} className="flex gap-3 text-[0.92rem] leading-snug text-ink/75">
                      <span className="eyebrow pt-0.5 text-[0.58rem] text-brand">{String(i + 1).padStart(2, "0")}</span>
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <p className="text-[clamp(1.25rem,2.2vw,1.9rem)] leading-[1.35] tracking-[-0.02em]">{a.excerpt}</p>
            {a.sections.map((s) => (
              <section key={s.h} id={id(s.h)} className="mt-11 scroll-mt-28 md:mt-16">
                <FadeUp as="h2" className="text-[clamp(1.55rem,2.8vw,2.6rem)] leading-tight tracking-[-0.03em]">
                  {s.h}
                </FadeUp>
                {s.p.map((p) => (
                  <p key={p} className="mt-4 text-[1.05rem] leading-[1.7] text-ink/80 md:mt-6 md:text-lg md:leading-[1.75]">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <div className="mt-12 rounded-[1.25rem] bg-paper p-5 md:mt-16 md:rounded-[1.75rem] md:p-8">
              <p className="eyebrow text-muted">Need help with this?</p>
              <p className="mt-3 text-xl tracking-[-0.02em] md:text-2xl">Talk it through with a practitioner, 30 minutes, no pitch.</p>
              <a href="#book" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-ivory">
                Book a call →
              </a>
            </div>
          </article>
          <aside className="lg:col-span-2">
            <ShareBar title={a.title} />
          </aside>
        </div>
      </section>

      <section data-theme="dark" className="bg-brand py-12 text-ivory md:py-20">
        <div className="container-x grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-center">
          <p className="display text-[clamp(1.9rem,3.6vw,3.6rem)] lg:col-span-6">
            Get the next one <span className="em text-accent">in your inbox.</span>
          </p>
          <div className="lg:col-span-6">
            <Newsletter />
          </div>
        </div>
      </section>

      <section className="bg-ivory py-12 md:py-20 lg:py-24">
        <div className="container-x">
          <p className="eyebrow text-muted">Keep reading</p>
          <div className="mt-5 grid gap-x-6 gap-y-5 md:mt-10 md:grid-cols-3 md:gap-y-14">
            {related.map((r) => (
              <ArticleCard key={r.slug} a={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
