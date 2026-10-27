import type { Inquiry, InquiryPayload } from "./types";

/**
 * 客户端安全的后端连接信息 —— 被浏览器端组件(InquiryForm)使用,
 * 此文件不得引入仅服务端的 API(如 next/cache 的 cacheLife/cacheTag)。
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://47.82.116.234:1100";
export const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID ?? "veydor-hydro";

/**
 * 提交询盘 —— 浏览器端直连后端(不经 Vercel,零服务端计算)。
 * 必填:customerName、customerEmail;可选:companyName、country、customerPhone、message。
 */
export async function submitInquiry(
  payload: InquiryPayload,
): Promise<Inquiry> {
  const res = await fetch(`${API_BASE}/api/v1/inquiries`, {
    method: "POST",
    headers: { "X-Site-Id": SITE_ID, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = (await res.json()) as { code: number; message: string; data: Inquiry };
  if (!res.ok || body.code !== 200) {
    throw new Error(body.message || `Inquiry submission failed (${res.status})`);
  }
  return body.data;
}
