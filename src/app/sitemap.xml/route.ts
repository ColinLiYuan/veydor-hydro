import { connection } from "next/server";
import { sitemapIndexXml, xmlResponse } from "@/lib/sitemapXml";
import { site } from "@/site.config";

// 内容最后实质更新日(域名迁移上线日),模块级常量避免渲染期 new Date()
const STATIC_LAST_MOD = "2026-11-13T00:00:00.000Z";

/**
 * /sitemap.xml —— sitemap 索引,列出按内容类型拆分的 4 个子 sitemap。
 * GSC 提交本索引即可自动发现子文件,并可分类查看各类型收录情况。
 */
export async function GET() {
  await connection();
  const xml = sitemapIndexXml([
    { loc: `${site.url}/sitemap-pages.xml`, lastmod: STATIC_LAST_MOD },
    { loc: `${site.url}/sitemap-products.xml`, lastmod: STATIC_LAST_MOD },
    { loc: `${site.url}/sitemap-categories.xml`, lastmod: STATIC_LAST_MOD },
    { loc: `${site.url}/sitemap-blog.xml`, lastmod: STATIC_LAST_MOD },
  ]);
  return xmlResponse(xml);
}
