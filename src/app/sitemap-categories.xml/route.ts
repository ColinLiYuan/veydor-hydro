import { connection } from "next/server";
import {
  getAllProducts,
  getCategoryTree,
  parseCategories,
  resolveTreePath,
} from "@/lib/api";
import { urlsetXml, xmlResponse } from "@/lib/sitemapXml";
import { site } from "@/site.config";

const STATIC_LAST_MOD = "2026-11-13T00:00:00.000Z";

/**
 * /sitemap-categories.xml —— 两级分类页(urlset)。
 * 分类 lastmod = 该分类(含子分类)下产品的最新 updatedAt。
 */
export async function GET() {
  await connection();
  const base = site.url;
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategoryTree(),
  ]);

  // 分类 lastmod:该分类(含子分类)下产品的最新 updatedAt
  const updatedByCat = new Map<string, string>();
  for (const p of products) {
    if (!p.updatedAt) continue;
    const catPath = resolveTreePath(
      categories,
      parseCategories(p.categories)[0] ?? "",
    );
    if (!catPath) continue;
    const iso = new Date(p.updatedAt).toISOString();
    for (let i = 1; i <= catPath.length; i++) {
      const key = catPath.slice(0, i).join("/");
      const cur = updatedByCat.get(key);
      if (!cur || iso > cur) updatedByCat.set(key, iso);
    }
  }

  const entries: { loc: string; lastmod: string; changefreq: string; priority: number }[] = [];
  const walk = (nodes: typeof categories) => {
    for (const node of nodes) {
      entries.push({
        loc: `${base}/products/category/${node.path.join("/")}`,
        lastmod: updatedByCat.get(node.path.join("/")) ?? STATIC_LAST_MOD,
        changefreq: "weekly",
        priority: node.children.length > 0 ? 0.8 : 0.7,
      });
      walk(node.children);
    }
  };
  walk(categories);

  return xmlResponse(urlsetXml(entries));
}
