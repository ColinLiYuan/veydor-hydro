/**
 * sitemap XML 生成工具:urlset(单文件)与 sitemapindex(索引)。
 * 站点 sitemap 按内容类型拆分为 4 个文件 + 1 个索引,便于 GSC 分类查看收录:
 *   /sitemap.xml            索引
 *   /sitemap-pages.xml      静态页
 *   /sitemap-products.xml   产品
 *   /sitemap-categories.xml 分类
 *   /sitemap-blog.xml       博客
 */
export function xmlEscape(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number | string;
}

export function urlsetXml(entries: SitemapUrl[]): string {
  const body = entries
    .map((e) => {
      let s = `  <url>\n    <loc>${xmlEscape(e.loc)}</loc>`;
      if (e.lastmod) s += `\n    <lastmod>${e.lastmod}</lastmod>`;
      if (e.changefreq) s += `\n    <changefreq>${e.changefreq}</changefreq>`;
      if (e.priority != null) s += `\n    <priority>${e.priority}</priority>`;
      return `${s}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function sitemapIndexXml(
  entries: { loc: string; lastmod?: string }[],
): string {
  const body = entries
    .map((e) => {
      let s = `  <sitemap>\n    <loc>${xmlEscape(e.loc)}</loc>`;
      if (e.lastmod) s += `\n    <lastmod>${e.lastmod}</lastmod>`;
      return `${s}\n  </sitemap>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

/** XML 响应(动态路由用,配合 connection() 按请求渲染) */
export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
