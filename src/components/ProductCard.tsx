import Link from "next/link";
import { ArrowRight, Boxes, Package } from "lucide-react";
import type { Product } from "@/lib/types";
import { categoryLeaf, imageUrl, parseCategories } from "@/lib/api";
import { categoryLabel } from "@/site.config";
import { PlaceholderImage } from "./PlaceholderImage";

/** 产品卡片(列表/首页共用)。图片用原生 <img>,不经过 next/image。 */
export function ProductCard({ product }: { product: Product }) {
  const img = imageUrl(product.image);
  const leaf = categoryLeaf(parseCategories(product.categories)[0] ?? "");
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-steel/10 bg-white transition hover:border-navy-700/40 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden border-b border-steel/10">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={product.alt || product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderImage
            label={product.title}
            className="aspect-[4/3] w-full"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {leaf ? (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
            {categoryLabel(leaf)}
          </span>
        ) : null}
        <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-navy-900 group-hover:text-navy-700">
          {product.title}
        </h3>
        <div className="mt-3 flex items-center gap-4 text-xs text-steel">
          <span className="flex items-center gap-1">
            <Boxes className="h-3.5 w-3.5" />
            {product.productSkus.length}{" "}
            {product.productSkus.length === 1 ? "model" : "models"}
          </span>
          {product.minOrder > 0 ? (
            <span className="flex items-center gap-1">
              <Package className="h-3.5 w-3.5" />
              MOQ {product.minOrder}
            </span>
          ) : null}
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 group-hover:text-accent">
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
