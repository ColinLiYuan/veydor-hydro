import { connection } from "next/server";
import { BLOG_POSTS } from "@/data/blogPosts";
import { urlsetXml, xmlResponse } from "@/lib/sitemapXml";
import { site } from "@/site.config";

/** /sitemap-blog.xml —— 博客文章(urlset),日期取文章发布日期 */
export async function GET() {
  await connection();
  const base = site.url;
  const xml = urlsetXml(
    BLOG_POSTS.map((p) => ({
      loc: `${base}/blog/${p.slug}`,
      lastmod: `${p.date}T00:00:00.000Z`,
      changefreq: "monthly",
      priority: 0.6,
    })),
  );
  return xmlResponse(xml);
}
