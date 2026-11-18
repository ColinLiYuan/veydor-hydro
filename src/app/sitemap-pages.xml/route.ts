import { connection } from "next/server";
import { urlsetXml, xmlResponse } from "@/lib/sitemapXml";
import { site } from "@/site.config";

// 静态页内容最后实质更新日(域名迁移上线日),不再用构建时间:
// 构建时间会让每次部署都"全量更新",lastmod 失真
const STATIC_LAST_MOD = "2026-11-13T00:00:00.000Z";

/** /sitemap-pages.xml —— 静态页(urlset) */
export async function GET() {
  await connection();
  const base = site.url;
  const xml = urlsetXml([
    { loc: base, lastmod: STATIC_LAST_MOD, changefreq: "weekly", priority: 1 },
    { loc: `${base}/products`, lastmod: STATIC_LAST_MOD, changefreq: "daily", priority: 0.9 },
    { loc: `${base}/blog`, lastmod: STATIC_LAST_MOD, changefreq: "weekly", priority: 0.7 },
    { loc: `${base}/quality`, lastmod: STATIC_LAST_MOD, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/about`, lastmod: STATIC_LAST_MOD, changefreq: "monthly", priority: 0.6 },
    { loc: `${base}/contact`, lastmod: STATIC_LAST_MOD, changefreq: "yearly", priority: 0.6 },
  ]);
  return xmlResponse(xml);
}
