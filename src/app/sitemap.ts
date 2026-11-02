import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { getAllProducts, getCategoryTree } from "@/lib/api";
import { BLOG_POSTS } from "@/data/blogPosts";
import { site } from "@/site.config";

// 构建时间作为 lastModified 兜底(Cache Components 不允许渲染期间调 new Date())
const BUILD_TIME = new Date();

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
    { url: base, lastModified: BUILD_TIME, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, lastModified: BUILD_TIME, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/blog`, lastModified: BUILD_TIME, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/quality`, lastModified: BUILD_TIME, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: BUILD_TIME, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: BUILD_TIME, changeFrequency: "yearly", priority: 0.6 },
  ];

  try {
    const [products, categories] = await Promise.all([
      getAllProducts(),
      getCategoryTree(),
    ]);

    // 两级分类:父级 + 子级全部入图
    const categoryEntries: MetadataRoute.Sitemap = [];
    const walk = (nodes: typeof categories) => {
      for (const node of nodes) {
        categoryEntries.push({
          url: `${base}/products/category/${node.path.join("/")}`,
          lastModified: BUILD_TIME,
          changeFrequency: "weekly",
          priority: node.children.length > 0 ? 0.8 : 0.7,
        });
        walk(node.children);
      }
    };
    walk(categories);

    const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : BUILD_TIME,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    return [...staticEntries, ...BLOG_ENTRIES, ...categoryEntries, ...productEntries];
  } catch {
    // API 不可用时至少保证静态页可索引
    return staticEntries;
  }
}
