import type { Metadata } from "next";
import { site } from "@/site.config";

/**
 * 统一 OpenGraph 块生成。
 * 修复审计发现的 og:url 全站缺失(显式拼 canonical URL)与
 * og:title 回落到 layout 首页标题的问题(每页显式传自己的标题)。
 */
export function og(
  route: string,
  opts: {
    title: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
  },
): NonNullable<Metadata["openGraph"]> {
  return {
    title: opts.title,
    description: opts.description,
    url: `${site.url}${route}`,
    siteName: site.name,
    locale: "en_US",
    type: opts.type ?? "website",
    images: opts.image ? [opts.image] : undefined,
  };
}
