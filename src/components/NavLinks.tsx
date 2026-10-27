"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./navItems";

/** 导航链接(客户端组件,用于高亮当前页;须在 <Suspense> 内使用) */
export function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  return (
    <>
      {NAV_LINKS.map(({ href, label }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={(e) => {
              // 移动端菜单用 <details> 实现,点击后收起
              e.currentTarget.closest("details")?.removeAttribute("open");
            }}
            className={`${className} text-sm font-medium transition-colors ${
              active
                ? "text-accent"
                : "text-navy-900 hover:text-accent"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
