import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { site, whatsappLink } from "@/site.config";
import type { CategoryNode } from "@/lib/api";

// 版权年份在模块加载时定死(每次构建刷新),Cache Components 不允许渲染期间调 new Date()
const YEAR = new Date().getFullYear();

/** 页脚:品牌、产品分类、公司、联系方式 */
export function Footer({ categories }: { categories: CategoryNode[] }) {
  return (
    <footer className="bg-navy-950 text-sm text-white/70">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* 品牌 */}
        <div>
          <div className="text-lg font-bold tracking-tight text-white">
            {site.name.split(" ")[0]}
            <span className="text-accent"> Hydraulics</span>
          </div>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
            {site.slogan}
          </p>
          <p className="mt-4 leading-relaxed">
            Manufacturer &amp; exporter of reliable hydraulic valves, pumps
            and motors. Every unit pressure-tested before shipment.
          </p>
          <ul className="mt-4 space-y-2">
            {site.certifications.slice(0, 3).map((c) => (
              <li key={c} className="flex items-center gap-2 text-xs">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-trust" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* 产品分类 */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Products
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/products" className="hover:text-accent">
                All Products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.segment} className="space-y-2.5">
                <Link
                  href={`/products/category/${c.path.join("/")}`}
                  className="font-medium text-white/90 hover:text-accent"
                >
                  {c.label}
                </Link>
                {c.children.length > 0 ? (
                  <ul className="ml-3 space-y-2">
                    {c.children.slice(0, 5).map((child) => (
                      <li key={child.segment}>
                        <Link
                          href={`/products/category/${child.path.join("/")}`}
                          className="hover:text-accent"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        {/* 公司 */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/about" className="hover:text-accent">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/quality" className="hover:text-accent">
                Quality Control
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-accent">
                Product Catalog
              </Link>
            </li>
          </ul>
        </div>

        {/* 联系方式 */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-2.5 hover:text-accent"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-start gap-2.5 hover:text-accent"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                {site.phone}
              </a>
            </li>
            <li>
              <Link
                href={whatsappLink()}
                target="_blank"
                rel="noopener"
                className="flex items-start gap-2.5 hover:text-accent"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
                WhatsApp: {site.phone}
              </Link>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {site.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/40 sm:flex-row">
          <span>
            © {YEAR} {site.legalName} All rights reserved.
          </span>
          <span>{site.slogan}</span>
        </div>
      </div>
    </footer>
  );
}
