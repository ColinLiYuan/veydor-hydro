import Link from "next/link";
import { Suspense } from "react";
import { Menu } from "lucide-react";
import { site } from "@/site.config";
import { NavLinks } from "./NavLinks";
import { NAV_LINKS } from "./navItems";

/** 无高亮的静态导航:NavLinks 的 Suspense 兜底,预渲染时输出(链接齐全,SEO 无损失) */
function StaticNavLinks({ className = "" }: { className?: string }) {
  return (
    <>
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`${className} text-sm font-medium text-navy-900 transition-colors hover:text-accent`}
        >
          {label}
        </Link>
      ))}
    </>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      {/* 品牌图形:六边形 + V */}
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M20 2 36 11v18L20 38 4 29V11z"
          fill="#0E2A47"
          stroke="#174B7E"
          strokeWidth="1.5"
        />
        <path
          d="M12 14l8 12 8-12"
          fill="none"
          stroke="#E87400"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="leading-tight">
        <span className="block text-lg font-bold tracking-tight text-navy-900">
          {site.name.split(" ")[0]}
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-steel">
          Hydraulics
        </span>
      </span>
    </Link>
  );
}

/** 站点导航(移动端用 <details> 实现零 JS 下拉) */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-steel/10 bg-white/95 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {/* usePathname 属运行时数据:必须在 Suspense 内,否则预渲染/缓存刷新会被阻断 */}
          <Suspense fallback={<StaticNavLinks />}>
            <NavLinks />
          </Suspense>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-accent hidden sm:inline-flex">
            Get a Quote
          </Link>
          {/* 移动端菜单 */}
          <details className="group relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-sm border border-steel/20 text-navy-900 [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 top-12 w-56 rounded-sm border border-steel/10 bg-white p-4 shadow-lg">
              <nav className="flex flex-col gap-3">
                <Suspense fallback={<StaticNavLinks className="px-1 py-1" />}>
                  <NavLinks className="px-1 py-1" />
                </Suspense>
                <Link href="/contact" className="btn-accent">
                  Get a Quote
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
