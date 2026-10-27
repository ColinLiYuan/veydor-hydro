import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  ChevronRight,
  Mail,
  MessageCircle,
  Package,
  Scale,
  Tag,
} from "lucide-react";
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  imageUrl,
  parseCategories,
} from "@/lib/api";
import type { Product } from "@/lib/types";
import { categoryLabel, site, whatsappLink } from "@/site.config";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ProductCard } from "@/components/ProductCard";
import { QuoteModal } from "@/components/QuoteModal";

/**
 * Next 16.4.x 的已知 bug:revalidatePath 后重新生成页面时,把 generateStaticParams
 * 里的已知 slug 误当"未知参数"处理,导致 500(PR #91316 相关)。
 * instant = false 让本路由按请求渲染(blocking):数据仍由 'use cache' 缓存 24 小时,
 * /api/revalidate 清数据缓存后即拉新数据,彻底绕开该 bug。
 * 待上游修复后可删掉本行恢复预渲染。
 */
export const instant = false;

/** 构建时预渲染现有产品;新 slug 按需渲染后缓存(Next 16 默认行为) */
export async function generateStaticParams() {
  const products = await getAllProducts();
  // Next 16 不允许 generateStaticParams 返回空数组,空数据时给占位
  if (products.length === 0) return [{ slug: "__empty__" }];
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  // 在 generateMetadata 里提前 404:blocking 路由(instant=false)下若等到
  // 页面渲染再 notFound(),响应流已发出,状态码只能给 200(软 404)
  if (!product) notFound();
  return {
    title: product.title,
    description:
      product.shortDescription ||
      `${product.title} — factory-direct hydraulic valve from ${site.name}. 100% pressure-tested, export packing, quotation within 24 hours.`,
    openGraph: {
      title: product.title,
      description: product.shortDescription ?? undefined,
      images: imageUrl(product.image) ? [imageUrl(product.image)!] : undefined,
      type: "website",
    },
  };
}

/** 兼容渲染规格表:后端 specifications 结构未定,做防御处理 */
function SpecTable({ specifications }: { specifications: unknown[] }) {
  const rows = specifications
    .map((s) => {
      if (typeof s === "string") return { name: s, value: "—" };
      if (s && typeof s === "object") {
        const obj = s as Record<string, unknown>;
        const name = obj.name ?? obj.key ?? obj.specName;
        const value = obj.value ?? obj.specValue ?? obj.description;
        if (name != null) return { name: String(name), value: value != null ? String(value) : "—" };
      }
      return null;
    })
    .filter((r): r is { name: string; value: string } => r !== null);

  if (rows.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-sm border border-steel/10">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? "bg-mist" : "bg-white"}>
              <th className="w-1/3 border-r border-steel/10 px-4 py-3 text-left font-semibold text-navy-900">
                {r.name}
              </th>
              <td className="px-4 py-3 text-steel">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KeyFacts({ product }: { product: Product }) {
  const facts: { label: string; value: string; icon: ReactNode }[] = [];
  facts.push({
    label: "MOQ",
    value: String(product.minOrder),
    icon: <Package className="h-4 w-4" />,
  });
  if (product.brand)
    facts.push({ label: "Brand", value: product.brand, icon: <Tag className="h-4 w-4" /> });
  if (product.material)
    facts.push({
      label: "Material",
      value: product.material,
      icon: <BadgeCheck className="h-4 w-4" />,
    });
  if (product.netWeight != null)
    facts.push({
      label: "Net Weight",
      value: `${product.netWeight} kg`,
      icon: <Scale className="h-4 w-4" />,
    });
  return (
    <dl className="grid grid-cols-2 gap-3">
      {facts.map((f) => (
        <div
          key={f.label}
          className="flex items-center gap-2.5 rounded-sm bg-mist px-3.5 py-3"
        >
          <span className="text-accent">{f.icon}</span>
          <span>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-steel">
              {f.label}
            </dt>
            <dd className="text-sm font-semibold text-navy-900">{f.value}</dd>
          </span>
        </div>
      ))}
    </dl>
  );
}

const DEFAULT_DESCRIPTION = (title: string) =>
  `${title} is precision machined from certified materials and individually pressure-tested on calibrated test benches before shipment. Standard export packing with anti-rust treatment and full documentation. Contact us for the complete datasheet, outline drawings and a quotation within 24 hours.`;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // 完整分类路径,如 ["valve","solenoid"];没有分类则为空数组
  const catPath = (parseCategories(product.categories)[0] ?? "")
    .split("/")
    .filter(Boolean);
  const leaf = catPath[catPath.length - 1] ?? "";
  const skus = product.productSkus.map((s) => s.sku).filter(Boolean);
  const features = product.features
    ?.split(/\r?\n|;/)
    .map((f) => f.trim())
    .filter(Boolean);

  // 相关产品:同末级分类(后端按末级段前缀匹配),排除自身
  let related: Product[] = [];
  if (catPath.length > 0) {
    try {
      const rel = await getProductsByCategory(catPath, 0, 8);
      related = rel.content
        .filter((p) => p.slug !== product.slug)
        .slice(0, 4);
    } catch {
      related = [];
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description:
      product.shortDescription ||
      `${product.title} by ${site.name} — precision machined and 100% pressure-tested hydraulic valve.`,
    sku: skus[0] ?? undefined,
    brand: {
      "@type": "Brand",
      name: product.brand ?? site.name,
    },
    category: leaf ? categoryLabel(leaf) : undefined,
    image: imageUrl(product.image) ?? undefined,
    ...(product.currentPrice > 0
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: product.currentPrice,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${site.url}/products`,
      },
      ...catPath.map((seg, i) => ({
        "@type": "ListItem",
        position: 3 + i,
        name: categoryLabel(seg),
        item: `${site.url}/products/category/${catPath
          .slice(0, i + 1)
          .join("/")}`,
      })),
      {
        "@type": "ListItem",
        position: 3 + catPath.length,
        name: product.title,
      },
    ],
  };

  const img = imageUrl(product.image);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbJsonLd]),
        }}
      />

      {/* 面包屑 */}
      <div className="border-b border-steel/10">
        <div className="container-site py-4">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-steel">
            <Link href="/" className="hover:text-navy-700">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-navy-700">Products</Link>
            {catPath.map((seg, i) => (
              <span key={`${seg}-${i}`} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                <Link
                  href={`/products/category/${catPath.slice(0, i + 1).join("/")}`}
                  className="hover:text-navy-700"
                >
                  {categoryLabel(seg)}
                </Link>
              </span>
            ))}
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-navy-900">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* 主区 */}
      <div className="container-site py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* 图库 */}
          <div>
            <div className="overflow-hidden rounded-sm border border-steel/10 bg-mist">
              {img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img}
                  alt={product.alt || product.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <PlaceholderImage label={product.title} className="aspect-[4/3] w-full" />
              )}
            </div>
            {product.galleries.length > 0 ? (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {product.galleries
                  .filter(
                    (g): g is Record<string, unknown> =>
                      !!g && typeof g === "object",
                  )
                  .sort(
                    (a, b) =>
                      Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0),
                  )
                  .slice(0, 8)
                  .map((g, i) => {
                    const url = imageUrl(
                      String(g.imageUrl ?? g.image ?? g.url ?? "") || null,
                    );
                    if (!url) return null;
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={url}
                        src={url}
                        alt={
                          g.alt
                            ? String(g.alt)
                            : `${product.title} view ${i + 1}`
                        }
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-sm border border-steel/10 object-cover"
                      />
                    );
                  })}
              </div>
            ) : null}
          </div>

          {/* 信息区 */}
          <div>
            {leaf ? (
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {categoryLabel(leaf)}
              </span>
            ) : null}
            <h1 className="text-balance mt-2 text-3xl font-bold tracking-tight text-navy-900">
              {product.title}
            </h1>

            {skus.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {skus.slice(0, 6).map((sku) => (
                  <span
                    key={sku}
                    className="rounded-sm border border-steel/20 bg-mist px-2 py-1 font-mono text-xs text-navy-800"
                  >
                    {sku}
                  </span>
                ))}
                {skus.length > 6 ? (
                  <span className="px-1 py-1 text-xs text-steel">
                    +{skus.length - 6} more
                  </span>
                ) : null}
              </div>
            ) : null}

            <p className="mt-5 text-sm leading-relaxed text-steel">
              {product.shortDescription || DEFAULT_DESCRIPTION(product.title)}
            </p>

            <div className="mt-6">
              <KeyFacts product={product} />
            </div>

            <div className="mt-6 rounded-sm border border-accent/30 bg-accent-light p-4">
              <p className="text-sm leading-relaxed text-navy-900">
                <span className="font-semibold">Factory-direct pricing.</span>{" "}
                Send us your model, quantity and destination — receive a
                quotation with lead time within 24 hours.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <QuoteModal productTitle={product.title} skus={skus} />
              <a
                href={whatsappLink(`Hello, I am interested in ${product.title}${skus[0] ? ` (${skus[0]})` : ""}. Please send me a quotation.`)}
                target="_blank"
                rel="noopener"
                className="btn inline-flex items-center gap-2 rounded-sm border border-trust/40 text-trust hover:bg-trust/5"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`Inquiry: ${product.title}`)}`}
                className="btn-outline-navy"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-steel">
              {["100% pressure-tested", "Export packing", "OEM / ODM welcome"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4 text-trust" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* 描述 / 特性 / 规格 */}
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="text-xl font-bold tracking-tight text-navy-900">
              Product Description
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-steel">
              {product.description || DEFAULT_DESCRIPTION(product.title)}
            </p>
            {features && features.length > 0 ? (
              <>
                <h2 className="mt-8 text-xl font-bold tracking-tight text-navy-900">
                  Key Features
                </h2>
                <ul className="mt-3 space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-steel">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>
          <aside>
            <h2 className="text-xl font-bold tracking-tight text-navy-900">
              Specifications
            </h2>
            <div className="mt-3">
              <SpecTable specifications={product.specifications} />
            </div>
          </aside>
        </div>

        {/* SKU 表 */}
        {product.productSkus.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-xl font-bold tracking-tight text-navy-900">
              Available Models
            </h2>
            <div className="mt-3 overflow-x-auto rounded-sm border border-steel/10">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="bg-navy-900 text-left text-xs uppercase tracking-wider text-white">
                    <th className="px-4 py-3 font-semibold">Model (SKU)</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                    <th className="px-4 py-3 font-semibold">Weight w/ Box</th>
                    <th className="px-4 py-3 font-semibold">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {product.productSkus.map((s, i) => (
                    <tr key={s.id} className={i % 2 ? "bg-mist" : "bg-white"}>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-navy-900">
                        {s.sku}
                      </td>
                      <td className="px-4 py-3 text-steel">
                        {s.notes || "—"}
                      </td>
                      <td className="px-4 py-3 text-steel">
                        {s.weightWithBox != null ? `${s.weightWithBox} kg` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-trust">
                          <span className="h-1.5 w-1.5 rounded-full bg-trust" />
                          In production
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-steel">
              Exact stock and lead time per model — confirm with our sales team.
            </p>
          </section>
        ) : null}

        {/* 相关产品 */}
        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-xl font-bold tracking-tight text-navy-900">
              Related Products
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
