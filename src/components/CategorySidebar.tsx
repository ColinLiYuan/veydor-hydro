import Link from "next/link";
import { Layers } from "lucide-react";
import type { CategoryNode } from "@/lib/api";

/**
 * 两级分类侧栏:父级 + 二级子分类平铺展示(无折叠箭头),
 * 子分类永远可见,仅用轻微缩进区分层级。
 * activePath 为 null 表示"全部产品";路径匹配用段级相等。
 */
export function CategorySidebar({
  tree,
  activePath,
  totalCount,
  makeHref,
}: {
  tree: CategoryNode[];
  activePath: string[] | null;
  totalCount?: number;
  makeHref: (path: string[] | null) => string;
}) {
  const isActive = (path: string[]) =>
    activePath !== null &&
    activePath.length === path.length &&
    activePath.every((seg, i) => seg === path[i]);

  return (
    <aside className="rounded-sm border border-steel/10 bg-white p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-900">
        <Layers className="h-4 w-4 text-accent" />
        Categories
      </h2>
      <ul className="mt-4 space-y-1">
        <li>
          <Link
            href={makeHref(null)}
            className={`flex items-center justify-between rounded-sm px-3 py-2 text-sm transition-colors ${
              activePath === null
                ? "bg-navy-900 font-semibold text-white"
                : "text-navy-900 hover:bg-mist"
            }`}
          >
            All Products
            {typeof totalCount === "number" ? (
              <span className="text-xs opacity-60">{totalCount}</span>
            ) : null}
          </Link>
        </li>
        {tree.map((node) => (
          <li key={node.segment}>
            <Link
              href={makeHref(node.path)}
              className={`flex items-center justify-between rounded-sm px-3 py-2 text-sm font-semibold transition-colors ${
                isActive(node.path)
                  ? "bg-navy-900 text-white"
                  : activePath !== null &&
                      activePath[0] === node.path[0] &&
                      activePath.length > 1
                    ? "text-accent hover:bg-mist"
                    : "text-navy-900 hover:bg-mist"
              }`}
            >
              {node.label}
              <span className="text-xs font-normal opacity-60">{node.count}</span>
            </Link>
            {node.children.length > 0 ? (
              <ul className="mt-0.5 space-y-0.5">
                {node.children.map((child) => (
                  <li key={child.segment}>
                    <Link
                      href={makeHref(child.path)}
                      className={`flex items-center justify-between gap-2 rounded-sm px-3 py-2 pl-6 text-sm transition-colors ${
                        isActive(child.path)
                          ? "bg-navy-900 font-semibold text-white"
                          : "text-steel hover:bg-mist hover:text-navy-900"
                      }`}
                    >
                      <span>{child.label}</span>
                      <span className="text-xs opacity-60">{child.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}
