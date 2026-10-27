import Link from "next/link";
import { ChevronRight, SearchX } from "lucide-react";
import type { Paged, Product } from "@/lib/types";
import type { CategoryNode } from "@/lib/api";
import { ProductCard } from "./ProductCard";
import { CategorySidebar } from "./CategorySidebar";
import { Pagination } from "./Pagination";

export interface SortState {
  /** newest = 后端默认(id 倒序); name = title 升序 */
  sort: "newest" | "name";
  /** 生成带 sort 的列表链接 */
  sortHref: (sort: "newest" | "name") => string;
}

/**
 * 产品浏览页骨架(列表页 + 分类页共用)。
 * 全服务端渲染,零客户端 JS:排序用链接切换,分页用链接。
 */
export function ProductBrowser({
  breadcrumb,
  title,
  description,
  tree,
  activePath,
  data,
  sort,
  makeHref,
  categoryHref,
  totalCount,
}: {
  breadcrumb: { label: string; href?: string }[];
  title: string;
  description: string;
  tree: CategoryNode[];
  /** 当前分类完整路径,null 表示全部产品 */
  activePath: string[] | null;
  data: Paged<Product>;
  sort?: SortState;
  /** 生成某一页(0 基)的链接 */
  makeHref: (page0: number) => string;
  categoryHref: (path: string[] | null) => string;
  totalCount?: number;
}) {
  const empty = data.content.length === 0;

  return (
    <div className="bg-mist">
      {/* 页头 */}
      <div className="border-b border-steel/10 bg-white">
        <div className="container-site py-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-steel">
            {breadcrumb.map((item, i) => (
              <span key={item.label} className="flex items-center gap-1.5">
                {i > 0 ? <ChevronRight className="h-3 w-3" /> : null}
                {item.href ? (
                  <Link href={item.href} className="hover:text-navy-700">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-navy-900">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-steel">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {!empty ? (
                <span className="text-xs font-medium text-steel">
                  {data.totalElements} {data.totalElements === 1 ? "product" : "products"}
                </span>
              ) : null}
              {sort ? (
                <div className="flex rounded-sm border border-steel/20 text-xs font-medium">
                  {(["newest", "name"] as const).map((s) => (
                    <Link
                      key={s}
                      href={sort.sortHref(s)}
                      className={`px-3 py-2 transition-colors first:rounded-l-sm last:rounded-r-sm ${
                        sort.sort === s
                          ? "bg-navy-900 text-white"
                          : "bg-white text-navy-900 hover:bg-navy-50"
                      }`}
                    >
                      {s === "newest" ? "Newest" : "Name A–Z"}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <CategorySidebar
            tree={tree}
            activePath={activePath}
            totalCount={totalCount}
            makeHref={categoryHref}
          />
          <div>
            {empty ? (
              <div className="flex flex-col items-center gap-3 rounded-sm border border-steel/10 bg-white py-20 text-center">
                <SearchX className="h-10 w-10 text-steel-light" />
                <h2 className="text-lg font-semibold text-navy-900">
                  No products found
                </h2>
                <p className="max-w-sm text-sm text-steel">
                  This category is being updated. Send us your requirements —
                  we can usually source or customize it for you.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <Link href="/products" className="btn-accent">
                    View All Products
                  </Link>
                  <Link href="/contact" className="btn-outline-navy">
                    Request a Quote
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {data.content.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
                <Pagination
                  page={data.number}
                  totalPages={data.totalPages}
                  makeHref={makeHref}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
