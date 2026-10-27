import Link from "next/link";
import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { site, whatsappLink } from "@/site.config";

/** 顶部信任条:联系方式 + 质量承诺 */
export function TopBar() {
  return (
    <div className="bg-navy-950 text-xs text-white/80">
      <div className="container-site flex h-9 items-center justify-between gap-4">
        <div className="flex items-center gap-5 overflow-hidden">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-1.5 hover:text-white"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{site.email}</span>
          </a>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-1.5 hover:text-white sm:flex"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {site.phone}
          </a>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <span className="hidden items-center gap-1.5 md:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-trust" />
            ISO 9001 Certified · 100% Factory Tested
          </span>
          <Link
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}
