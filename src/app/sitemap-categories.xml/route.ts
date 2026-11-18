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

  // 分类 lastmod:该分类(含子分类)下产品的最新 updatedAt。
  // 产品的 categories 数组可能含多个分类(父级 + 子级 + 别名类如 "yuken"),
  // 每个解析成功的路径(及其所有前缀)都记录,避免漏掉任一归属分类
  const updatedByCat = new Map<string, string>();
  for (const p of products) {
    if (!p.updatedAt) continue;
    const iso = new Date(p.updatedAt).toISOString();
    for (const cat of parseCategories(p.categories)) {
      const resolved = resolveTreePath(categories, cat);
      if (!resolved) continue;
      for (let i = 1; i <= resolved.length; i++) {
        const key = resolved.slice(0, i).join("/");
        const cur = updatedByCat.get(key);
        if (!cur || iso > cur) updatedByCat.set(key, iso);
      }
    }
  }

  // 只收录"自己或子孙分类有产品"的节点:真空分类(如 pumps/gear、motors、
  // accessories)页面保留可访问,但不提交给 Google,避免软 404 信号
  const entries: { loc: string; lastmod: string; changefreq: string; priority: number }[] = [];
  const walk = (nodes: typeof categories) => {
    for (const node of nodes) {
      const key = node.path.join("/");
      let hasProducts = updatedByCat.has(key);
      if (!hasProducts) {
        for (const child of node.children) {
          if (updatedByCat.has(child.path.join("/"))) {
            hasProducts = true;
            break;
          }
        }
      }
      if (hasProducts) {
        entries.push({
          loc: `${base}/products/category/${key}`,
          lastmod: updatedByCat.get(key) ?? STATIC_LAST_MOD,
          changefreq: "weekly",
          priority: node.children.length > 0 ? 0.8 : 0.7,
        });
      }
      walk(node.children);
    }
  };
  walk(categories);

  return xmlResponse(urlsetXml(entries));
}
