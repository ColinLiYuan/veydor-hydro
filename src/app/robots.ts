import type { MetadataRoute } from "next";
import { site } from "@/site.config";

/**
 * robots —— 除常规搜索引擎外,显式放行 AI 爬虫(GEO:
 * GPTBot / ClaudeBot / PerplexityBot / Google-Extended 等),
 * 让内容可被 AI 搜索引用。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "CCBot",
          "cohere-ai",
          "Bytespider",
        ],
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
