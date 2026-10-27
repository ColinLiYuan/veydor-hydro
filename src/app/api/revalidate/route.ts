import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * 按需刷新全站缓存 —— 后台商品/分类数据变更后,访问:
 *   /api/revalidate?secret=<REVALIDATE_SECRET>
 * 下一次页面请求即拉取最新数据,无需重新部署或等待缓存到期。
 * 生产环境请在 Vercel 环境变量里设置自己的 REVALIDATE_SECRET。
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = process.env.REVALIDATE_SECRET ?? "veydor-refresh";
  if (searchParams.get("secret") !== secret) {
    return NextResponse.json(
      { ok: false, message: "Invalid secret" },
      { status: 401 },
    );
  }
  // 路由缓存(页面 HTML)与数据缓存('use cache')都要清
  revalidatePath("/", "layout");
  revalidateTag("site-data", "max");
  return NextResponse.json({ ok: true, revalidated: true });
}
