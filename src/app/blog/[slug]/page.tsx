import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Clock, Tag } from "lucide-react";
import {
  BLOG_POSTS,
  formatPostDate,
  getBlogPost,
} from "@/data/blogPosts";
import { site } from "@/site.config";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    inLanguage: "en",
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${site.url}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbJsonLd]),
        }}
      />

      {/* 面包屑 */}
      <div className="border-b border-steel/10">
        <div className="container-site py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-steel"
          >
            <Link href="/" className="hover:text-navy-700">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-navy-700">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="max-w-[40ch] truncate font-medium text-navy-900">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* 正文 */}
      <div className="bg-white pb-16 sm:pb-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <header className="pt-12 sm:pt-16">
              <p className="section-eyebrow">Blog</p>
              <h1 className="text-balance mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-steel">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readMinutes} min read
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  {post.tags.join(" · ")}
                </span>
              </div>
            </header>

            <div className="article-body mt-4 border-t border-steel/10 pt-8 sm:pt-10">
              {post.body}
            </div>

            <footer className="mt-12 rounded-sm border border-accent/30 bg-accent-light p-6">
              <p className="text-sm leading-relaxed text-navy-900">
                <span className="font-semibold">
                  Need the valves behind this article?
                </span>{" "}
                Send us your model codes and quantity —{" "}
                <Link
                  href="/contact"
                  className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                >
                  get a quotation within 24 hours
                </Link>
                .
              </p>
            </footer>
          </div>

          {/* 其他文章 */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-navy-900">
                More from the Blog
              </h2>
              <Link
                href="/blog"
                className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                All posts
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {others.map((p) => (
                <article
                  key={p.slug}
                  className="group relative flex flex-col rounded-sm border border-steel/10 bg-mist p-5 transition hover:border-accent/40"
                >
                  <time
                    dateTime={p.date}
                    className="text-xs text-steel"
                  >
                    {formatPostDate(p.date)}
                  </time>
                  <h3 className="mt-2 text-sm font-semibold leading-snug text-navy-900 group-hover:text-navy-700">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <span className="mt-3 flex items-center gap-1 text-xs font-medium text-accent">
                    Read article
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
