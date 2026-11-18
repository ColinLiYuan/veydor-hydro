import { connection } from "next/server";
import { getAllProducts } from "@/lib/api";
import { urlsetXml, xmlResponse } from "@/lib/sitemapXml";
import { site } from "@/site.config";

const STATIC_LAST_MOD = "2026-11-13T00:00:00.000Z";

/**
 * /sitemap-products.xml —— 全部产品(urlset)。
 * 数据走 'use cache' 24h 缓存;后台增删产品后 /api/revalidate 刷新即同步。
 */
export async function GET() {
  await connection();
  const base = site.url;
  const products = await getAllProducts();
  const xml = urlsetXml(
    products.map((p) => ({
      loc: `${base}/products/${p.slug}`,
      lastmod: p.updatedAt
        ? new Date(p.updatedAt).toISOString()
        : STATIC_LAST_MOD,
      changefreq: "monthly",
      priority: 0.8,
    })),
  );
  return xmlResponse(xml);
}
