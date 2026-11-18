import type { MetadataRoute } from "next";
import { connection } from "next/server";
import {
  getAllProducts,
  getCategoryTree,
  parseCategories,
  resolveTreePath,
} from "@/lib/api";
import { BLOG_POSTS } from "@/data/blogPosts";
import { site } from "@/site.config";

// 静态页内容最后实质更新日(域名迁移上线日)。不再用构建时间:
// 构建时间会让每次部署都"全量更新"静态页,lastmod 失真
const STATIC_LAST_MOD = new Date("2026-11-13T00:00:00Z");

// 博客条目:模块级预计算(渲染期间调 new Date() 会触发 Cache Components 限制)
const BLOG_ENTRIES: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
  url: `${site.url}/blog/${p.slug}`,
  lastModified: new Date(`${p.date}T00:00:00Z`),
  changeFrequency: "monthly",
  priority: 0.6,
}));

/**
 * sitemap:静态页 + 全部分类 + 全部产品。
 * connection() 使本路由按请求动态渲染(数据仍走 'use cache' 24h 缓存),
 * 避免后台增删/改名分类产品后 sitemap 停留在构建时状态(旧 slug 死链)。
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const base = site.url;

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: STATIC_LAST_MOD, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, lastModified: STATIC_LAST_MOD, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/blog`, lastModified: STATIC_LAST_MOD, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/quality`, lastModified: STATIC_LAST_MOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: STATIC_LAST_MOD, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: STATIC_LAST_MOD, changeFrequency: "yearly", priority: 0.6 },
  ];

  try {
    const [products, categories] = await Promise.all([
      getAllProducts(),
      getCategoryTree(),
    ]);

    // 分类 lastmod = 该分类(含子分类)下产品的最新 updatedAt
    const updatedByCat = new Map<string, Date>();
    for (const p of products) {
      if (!p.updatedAt) continue;
      const catPath = resolveTreePath(
        categories,
        parseCategories(p.categories)[0] ?? "",
      );
      if (!catPath) continue;
      const d = new Date(p.updatedAt);
      for (let i = 1; i <= catPath.length; i++) {
        const key = catPath.slice(0, i).join("/");
        const cur = updatedByCat.get(key);
        if (!cur || d > cur) updatedByCat.set(key, d);
      }
    }

    // 两级分类:父级 + 子级全部入图
    const categoryEntries: MetadataRoute.Sitemap = [];
    const walk = (nodes: typeof categories) => {
      for (const node of nodes) {
        categoryEntries.push({
          url: `${base}/products/category/${node.path.join("/")}`,
          lastModified: updatedByCat.get(node.path.join("/")) ?? STATIC_LAST_MOD,
          changeFrequency: "weekly",
          priority: node.children.length > 0 ? 0.8 : 0.7,
        });
        walk(node.children);
      }
    };
    walk(categories);

    const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    return [...staticEntries, ...BLOG_ENTRIES, ...categoryEntries, ...productEntries];
  } catch {
    // API 不可用时至少保证静态页可索引
    return staticEntries;
  }
}
