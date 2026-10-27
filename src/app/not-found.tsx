import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 未知产品/分类 URL 在 blocking 路由下首次访问可能是 200 软 404(流式外壳已发出,
// 状态码改不了),显式 noindex 确保搜索引擎不收录;第二次访问起即为真 404(已缓存)
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="bg-mist">
      <div className="container-site flex flex-col items-center gap-4 py-28 text-center">
        <p className="font-mono text-5xl font-bold text-navy-900">404</p>
        <h1 className="text-2xl font-bold tracking-tight text-navy-900">
          Page not found
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-steel">
          The page you are looking for doesn&apos;t exist or has been moved.
          Browse the product catalog or contact us — we&apos;ll point you to
          the right valve.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/" className="btn-outline-navy">
            Back to Home
          </Link>
          <Link href="/products" className="btn-accent">
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
