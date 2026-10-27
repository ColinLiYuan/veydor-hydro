import type { MetadataRoute } from "next";
import { getAllProducts, getCategoryTree } from "@/lib/api";
import { site } from "@/site.config";

// 构建时间作为 lastModified 兜底(Cache Components 不允许渲染期间调 new Date())
const BUILD_TIME = new Date();

/** 动态 sitemap:静态页 + 全部分类 + 全部产品 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: BUILD_TIME, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, lastModified: BUILD_TIME, changeFrequency: "daily", priority: 0.9 },
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

    return [...staticEntries, ...categoryEntries, ...productEntries];
  } catch {
    // API 不可用时至少保证静态页可索引
    return staticEntries;
  }
}
