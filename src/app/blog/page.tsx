import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS, formatPostDate } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Hydraulic Engineering Blog — VEYDOR Hydraulics",
  alternates: { canonical: "/blog" },
  description:
    "Buyer's guides and engineering notes on hydraulic valves and pumps: interchange cross-references, valve selection, quality control and sourcing from China.",
};

/** 最新的排前面 */
const POSTS = [...BLOG_POSTS].reverse();

export default function BlogPage() {
  return (
    <div>
      {/* 页头 */}
      <section className="bg-navy-900 bg-grid">
        <div className="container-site py-16 text-center sm:py-20">
          <p className="section-eyebrow">Blog</p>
          <h1 className="text-balance mx-auto mt-2 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineering Notes for Hydraulic Buyers
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            Interchange guides, valve selection and quality-control checklists —
            written by our engineering team for the people who buy, spec and
            maintain hydraulic components.
          </p>
        </div>
      </section>

      {/* 文章列表 */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col rounded-sm border border-steel/10 bg-white p-6 transition hover:border-accent/40 hover:shadow-sm"
              >
                <div className="flex items-center gap-3 text-xs text-steel">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readMinutes} min read
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold leading-snug tracking-tight text-navy-900 group-hover:text-navy-700">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">
                  {post.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-steel/20 bg-mist px-2 py-0.5 text-[11px] font-medium text-steel"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="container-site flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Reading is free — the quotation is too.
            </h2>
            <p className="mt-2 text-sm text-white/85">
              Send us your model codes and quantity, get a quote within 24 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-50"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
