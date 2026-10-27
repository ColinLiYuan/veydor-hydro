import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * 分页(服务端组件)。
 * 后端分页是 0 基,这里内部用 0 基,展示为 1 基。
 */
export function Pagination({
  page,
  totalPages,
  makeHref,
}: {
  /** 0 基当前页 */
  page: number;
  totalPages: number;
  /** 生成某一页(0 基)的链接 */
  makeHref: (page0: number) => string;
}) {
  if (totalPages <= 1) return null;

  const windowStart = Math.max(0, Math.min(page - 2, totalPages - 5));
  const pages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => windowStart + i,
  );

  const btnClass =
    "flex h-9 min-w-9 items-center justify-center rounded-sm border px-2 text-sm font-medium transition-colors";

  return (
    <nav aria-label="Pagination" className="mt-10 flex justify-center">
      <ul className="flex items-center gap-1.5">
        <li>
          {page > 0 ? (
            <Link
              href={makeHref(page - 1)}
              className={`${btnClass} border-steel/20 text-navy-900 hover:border-navy-700 hover:bg-navy-50`}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span
              className={`${btnClass} cursor-not-allowed border-steel/10 text-steel-light`}
              aria-hidden="true"
            >
              <ChevronLeft className="h-4 w-4" />
            </span>
          )}
        </li>
        {pages.map((p) => (
          <li key={p}>
            {p === page ? (
              <span
                className={`${btnClass} border-accent bg-accent text-white`}
                aria-current="page"
              >
                {p + 1}
              </span>
            ) : (
              <Link
                href={makeHref(p)}
                className={`${btnClass} border-steel/20 text-navy-900 hover:border-navy-700 hover:bg-navy-50`}
              >
                {p + 1}
              </Link>
            )}
          </li>
        ))}
        <li>
          {page < totalPages - 1 ? (
            <Link
              href={makeHref(page + 1)}
              className={`${btnClass} border-steel/20 text-navy-900 hover:border-navy-700 hover:bg-navy-50`}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span
              className={`${btnClass} cursor-not-allowed border-steel/10 text-steel-light`}
              aria-hidden="true"
            >
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
