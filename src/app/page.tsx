import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Cog,
  Factory,
  FlaskConical,
  Gauge,
  Layers,
  Magnet,
  PackageCheck,
  Pickaxe,
  Settings2,
  Ship,
  SlidersHorizontal,
  Tractor,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { site, categoryDescription } from "@/site.config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
import { categoryLeaves, getAllProducts, getCategoryTree } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { PlaceholderImage } from "@/components/PlaceholderImage";

// 产品变化频率低,数据缓存 24 小时(见 lib/api.ts 的 cacheLife),后台改数据用 /api/revalidate 手动刷新

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  solenoid: Magnet,
  modular: Layers,
  relief: Gauge,
  valve: SlidersHorizontal,
};

const QC_ICONS: LucideIcon[] = [Factory, ClipboardCheck, FlaskConical, PackageCheck];

const APP_ICONS: LucideIcon[] = [
  Building2,
  Cog,
  Tractor,
  Pickaxe,
  Ship,
  Warehouse,
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategoryTree(),
  ]);
  const featured = products.slice(0, 8);
  // 首页分类卡片展示末级分类,眉标注明所属一级分类
  const leafCategories = categoryLeaves(categories);
  // 节点路径 -> 展示名(卡片名与眉标统一用后端 nameEn)
  const labelByPath = new Map<string, string>();
  const collectLabels = (nodes: typeof categories) => {
    for (const n of nodes) {
      labelByPath.set(n.path.join("/"), n.label);
      collectLabels(n.children);
    }
  };
  collectLabels(categories);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* ===== Hero ===== */}
      <section className="bg-navy-900 bg-grid">
        <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="section-eyebrow !text-accent">
              Hydraulic Components Manufacturer &amp; Exporter
            </p>
            <h1 className="text-balance mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Reliable Hydraulic Components for{" "}
              <span className="text-accent">Demanding Applications</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              From raw material to finished valve, every unit follows a
              documented quality process — precision machined, individually
              pressure-tested, and packed for export. Trusted by OEMs and
              distributors in 30+ countries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-accent">
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/quality" className="btn-outline-light">
                Our Quality System
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-sm border border-white/10 bg-white shadow-2xl">
              <PlaceholderImage label="VEYDOR VALVE SERIES" className="aspect-[4/3] w-full" />
            </div>
            {/* 浮动规格标签 */}
            <span className="absolute -left-4 top-8 rounded-sm bg-accent px-3 py-1.5 font-mono text-xs font-bold text-white shadow-lg">
              100% TESTED
            </span>
            <span className="absolute -right-3 bottom-10 rounded-sm bg-white px-3 py-1.5 font-mono text-xs font-bold text-navy-900 shadow-lg">
              ISO 9001:2015
            </span>
          </div>
        </div>
      </section>

      {/* ===== 精选产品 ===== */}
      {/* 紧跟 Hero:B2B 采购商首屏下滑即见产品,信任数字条移到其后作为背书 */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow">Featured Products</p>
              <h2 className="section-title">Latest Series</h2>
            </div>
            <Link
              href="/products"
              className="btn-outline-navy"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 信任数字 ===== */}
      <section className="border-b border-steel/10 bg-white">
        <div className="container-site grid grid-cols-2 divide-steel/10 py-10 md:grid-cols-4 md:divide-x">
          {site.stats.map((s) => (
            <div key={s.label} className="px-6 py-2 text-center">
              <div className="text-3xl font-bold tracking-tight text-navy-900">
                {s.value}
                <span className="text-accent">{s.suffix}</span>
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-steel">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 产品分类 ===== */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-site">
          <p className="section-eyebrow">Product Range</p>
          <h2 className="section-title">Hydraulic Components by Category</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leafCategories.map((c) => {
              const Icon = CATEGORY_ICONS[c.segment] ?? Settings2;
              const parent =
                c.path.length > 1
                  ? labelByPath.get(c.path.slice(0, -1).join("/")) ?? null
                  : null;
              return (
                <Link
                  key={c.path.join("/")}
                  href={`/products/category/${c.path.join("/")}`}
                  className="group flex items-start gap-4 rounded-sm border border-steel/10 bg-white p-6 transition hover:border-navy-700/40 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    {parent ? (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-steel-light">
                        {parent}
                      </span>
                    ) : null}
                    <span className="flex items-center gap-2 text-base font-semibold text-navy-900">
                      {c.label}
                      <ArrowRight className="h-4 w-4 text-accent opacity-0 transition group-hover:opacity-100" />
                    </span>
                    <span className="mt-1 block text-sm text-steel">
                      {categoryDescription(c.segment)}
                    </span>
                    {c.count > 0 ? (
                      <span className="mt-2 inline-block text-xs font-semibold text-accent">
                        {c.count} {c.count === 1 ? "series" : "series"}
                      </span>
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 质量控制流程 ===== */}
      <section className="bg-navy-900 bg-grid py-16 sm:py-20">
        <div className="container-site">
          <p className="section-eyebrow">Quality You Can Verify</p>
          <h2 className="section-title !text-white">
            From Raw Material to Shipment
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
            Quality is not inspected in — it is built in at every step. Here is
            how every VEYDOR valve is made.
          </p>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {site.qcSteps.map((step, i) => {
              const Icon = QC_ICONS[i % QC_ICONS.length];
              return (
                <li
                  key={step.title}
                  className="rounded-sm border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-white/40">
                      STEP 0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            {site.certifications.map((c) => (
              <span
                key={c}
                className="flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/80"
              >
                <BadgeCheck className="h-4 w-4 text-trust" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 应用场景 ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <p className="section-eyebrow">Applications</p>
          <h2 className="section-title">Where VEYDOR Valves Work</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.applications.map((app, i) => {
              const Icon = APP_ICONS[i % APP_ICONS.length];
              return (
                <div
                  key={app.title}
                  className="flex items-start gap-4 rounded-sm border border-steel/10 bg-mist p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-white text-navy-700 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <h3 className="text-sm font-semibold text-navy-900">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-xs text-steel">{app.text}</p>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-accent">
        <div className="container-site flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Have a requirement? Send us your specs.
            </h2>
            <p className="mt-2 text-sm text-white/85">
              Detailed quotations with drawings, test reports and lead time —
              usually within 24 hours.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-50"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-sm border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
