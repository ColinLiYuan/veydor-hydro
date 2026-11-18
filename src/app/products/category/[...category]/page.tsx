import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  findCategoryNode,
  getCategoryTree,
  getProductsByCategory,
} from "@/lib/api";
import { categoryDescription, categoryLabel, site } from "@/site.config";
import { ProductBrowser } from "@/components/ProductBrowser";
import { og } from "@/lib/seo";

const PAGE_SIZE = 12;

// 本页读取 searchParams(分页),属于运行时数据:Cache Components 模式下
// 允许该路由按请求渲染(blocking)。数据本身仍由 'use cache' 缓存 24 小时,
// 新分类按需渲染,无需重新构建。
export const instant = false;

/**
 * 两级分类页:catch-all 路由,如
 *   /products/category/valve          一级分类(前缀匹配全部子分类产品)
 *   /products/category/valve/solenoid 二级分类
 * 后端查询取末级段(见 lib/api.ts),URL 保留完整层级。
 */
export async function generateStaticParams() {
  const tree = await getCategoryTree();
  const paths: { category: string[] }[] = [];
  const walk = (nodes: typeof tree) => {
    for (const node of nodes) {
      paths.push({ category: node.path });
      walk(node.children);
    }
  };
  walk(tree);
  // Next 16 不允许 generateStaticParams 返回空数组,空数据时给占位
  if (paths.length === 0) return [{ category: ["__empty__"] }];
  return paths;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string[] }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { category: path } = await params;
  const { page: pageParam } = await searchParams;
  const page1 = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const leaf = path[path.length - 1] ?? "";
  const node = findCategoryNode(await getCategoryTree(), path);
  // 提前 404:blocking 路由下页面渲染阶段再 notFound() 会变成 200 软 404
  if (!node) notFound();
  const base = `/products/category/${path.join("/")}`;
  const canonical = page1 > 1 ? `${base}?page=${page1}` : base;
  const description = `${node.label} — ${categoryDescription(leaf)} Factory-direct pricing from VEYDOR Hydraulics, 100% pressure-tested.`;
  return {
    title: node.label,
    description,
    // 分页页 canonical 指向自身,第 1 页指向无参数 URL
    alternates: { canonical },
    openGraph: og(canonical, {
      title: `${node.label} | VEYDOR Hydraulics`,
      description,
    }),
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string[] }>;
  searchParams: Promise<{ page?: string }>;
}) {
  // Next 15+ 的 params/searchParams 是 Promise,需 await
  const { category: path } = await params;
  const { page: pageParam } = await searchParams;
  const page1 = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const apiPage = page1 - 1;

  const [data, tree] = await Promise.all([
    getProductsByCategory(path, apiPage, PAGE_SIZE),
    getCategoryTree(),
  ]);

  // 分类树是唯一权威:树里没有该路径 → 404(空分类正常渲染空态)
  const node = findCategoryNode(tree, path);
  if (!node) {
    notFound();
  }

  // 越界分页(如 ?page=99)直接 404,避免空结果页被收录
  if (page1 > data.totalPages) notFound();

  const leaf = path[path.length - 1] ?? "";

  // 分类页结构化数据:CollectionPage + BreadcrumbList + ItemList(仅第 1 页)
  const base = `/products/category/${path.join("/")}`;
  const jsonLd =
    page1 === 1
      ? [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: node.label,
            url: `${site.url}${base}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: `${site.url}/products`,
              },
              ...path.map((seg, i) => ({
                "@type": "ListItem",
                position: 3 + i,
                name:
                  findCategoryNode(tree, path.slice(0, i + 1))?.label ??
                  categoryLabel(seg),
                item: `${site.url}/products/category/${path
                  .slice(0, i + 1)
                  .join("/")}`,
              })),
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: data.content.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}/products/${p.slug}`,
            })),
          },
        ]
      : undefined;

  return (
    <ProductBrowser
      jsonLd={jsonLd}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        ...path.map((seg, i) => ({
          label:
            findCategoryNode(tree, path.slice(0, i + 1))?.label ??
            categoryLabel(seg),
          ...(i < path.length - 1
            ? { href: `/products/category/${path.slice(0, i + 1).join("/")}` }
            : {}),
        })),
      ]}
      title={node.label}
      description={`${categoryDescription(leaf)} All series are individually pressure-tested and packed for export.`}
      tree={tree}
      activePath={path}
      data={data}
      // 分类接口不支持 sortBy,排序仅列表页可用
      makeHref={(p0) => `/products/category/${path.join("/")}?page=${p0 + 1}`}
      categoryHref={(p) => (p ? `/products/category/${p.join("/")}` : "/products")}
      totalCount={data.totalElements}
    />
  );
}
