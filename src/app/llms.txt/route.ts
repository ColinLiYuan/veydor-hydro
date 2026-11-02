import { connection } from "next/server";
import { getAllProducts, getCategoryTree } from "@/lib/api";
import { BLOG_POSTS } from "@/data/blogPosts";
import { site } from "@/site.config";

/**
 * /llms.txt —— 面向 AI 爬虫的站点说明(GEO)。
 * 动态生成:分类树与产品列表来自后台,新增分类/产品后自动同步,
 * 不再像之前的静态 public/llms.txt 那样出现失效链接(后台 slug 改为复数后曾全部 404)。
 * connection() 防止本路由在构建时被烘焙成静态文件。
 */
export async function GET() {
  await connection();
  const [tree, products] = await Promise.all([
    getCategoryTree(),
    getAllProducts(),
  ]);

  const url = site.url.replace(/\/$/, "");
  const lines: string[] = [];

  lines.push("# VEYDOR Hydraulics");
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push("Key facts:");
  lines.push(`- Brand: ${site.name} (${site.legalName})`);
  lines.push(
    "- Product range: hydraulic valves (solenoid directional, modular, relief, manual), hydraulic pumps (piston, vane, gear), hydraulic motors",
  );
  lines.push(
    "- Quality: 100% pressure testing per unit, material traceability, batch inspection records, 12-month warranty",
  );
  lines.push(
    "- Service: quotations within 24 hours, export packing, mixed-model containers, OEM/ODM private labeling",
  );
  lines.push(`- Contact: email ${site.email}, phone/WhatsApp ${site.phone}`);
  lines.push("");
  lines.push("## Products");
  lines.push("");
  lines.push(
    `- [All Hydraulic Components](${url}/products): full catalog with categories, models (SKUs) and MOQ`,
  );
  lines.push(
    "- Category hierarchy (two levels, from the wholesale backend category tree):",
  );
  for (const node of tree) {
    lines.push(
      `  - [${node.label}](${url}/products/category/${node.path.join("/")}) — parent level${node.count ? `, ${node.count} products` : ""}`,
    );
    for (const child of node.children) {
      lines.push(
        `    - [${child.label}](${url}/products/category/${child.path.join("/")})${child.count ? ` (${child.count} products)` : ""}`,
      );
    }
  }
  lines.push("- Product catalog:");
  for (const p of products) {
    lines.push(`  - [${p.title}](${url}/products/${p.slug})`);
  }
  lines.push("");
  lines.push("## Blog");
  lines.push("");
  lines.push(
    `- [Engineering Blog](${url}/blog): buyer's guides and engineering notes`,
  );
  for (const post of BLOG_POSTS) {
    lines.push(`  - [${post.title}](${url}/blog/${post.slug}): ${post.description}`);
  }
  lines.push("");
  lines.push("## Company");
  lines.push("");
  lines.push(
    `- [Quality Control](${url}/quality): QC process, testing capabilities, certifications, FAQ`,
  );
  lines.push(
    `- [About Us](${url}/about): company profile and capabilities`,
  );
  lines.push(
    `- [Contact](${url}/contact): inquiry form, email, phone, WhatsApp`,
  );
  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push(
    "- Product and category data is served from the VEYDOR wholesale backend and rendered server-side (SEO-friendly HTML).",
  );
  lines.push(
    "- Pricing is factory-direct and quoted per inquiry (B2B wholesale); MOQ per model, lead time 7–15 days typical.",
  );

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
