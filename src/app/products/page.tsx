import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryTree, getProducts } from "@/lib/api";
import { ProductBrowser } from "@/components/ProductBrowser";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const page1 = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  return {
    title: "Hydraulic Components Catalog",
    description:
      "Browse VEYDOR hydraulic valves, pumps and motors — solenoid directional valves (DSG & 4WE series), modular and relief valves, piston/vane/gear pumps. Factory-direct pricing, 100% pressure-tested, export packing.",
    // 分页页 canonical 指向自身,第 1 页指向无参数 URL
    alternates: {
      canonical: page1 > 1 ? `/products?page=${page1}` : "/products",
    },
  };
}

// 本页读取 searchParams(分页/排序),属于运行时数据:Cache Components 模式下
// 允许该路由按请求渲染(blocking)。数据本身仍由 'use cache' 缓存 24 小时。
export const instant = false;

const PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  // Next 15+ 的 searchParams 是 Promise,需 await
  const { page: pageParam, sort: sortParam } = await searchParams;
  // URL 中的 page 是 1 基(对用户/SEO 友好),API 是 0 基
  const page1 = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const apiPage = page1 - 1;
  const sort = sortParam === "name" ? "name" : "newest";

  const [data, tree] = await Promise.all([
    sort === "name"
      ? getProducts(apiPage, PAGE_SIZE, "title", "asc")
      : getProducts(apiPage, PAGE_SIZE),
    getCategoryTree(),
  ]);

  // 越界分页(如 ?page=99)直接 404,避免空结果页被收录
  if (page1 > data.totalPages) notFound();

  return (
    <ProductBrowser
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Products" },
      ]}
      title="All Hydraulic Components"
      description="Every unit is precision machined and individually pressure-tested before shipment. Request a quote for factory-direct pricing and lead time."
      tree={tree}
      activePath={null}
      data={data}
      sort={{
        sort,
        sortHref: (s) =>
          `/products${s === "name" ? "?sort=name" : ""}${page1 > 1 ? (s === "name" ? "&" : "?") + `page=${page1}` : ""}`,
      }}
      makeHref={(p0) =>
        `/products?page=${p0 + 1}${sort === "name" ? "&sort=name" : ""}`
      }
      categoryHref={(path) =>
        path ? `/products/category/${path.join("/")}` : "/products"
      }
      totalCount={data.totalElements}
    />
  );
}
