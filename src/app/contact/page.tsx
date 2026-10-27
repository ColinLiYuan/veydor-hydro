import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/site.config";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact Us — Get a Quote in 24 Hours",
  description:
    "Contact VEYDOR Hydraulics for hydraulic valve quotations, samples and technical support. Email, WhatsApp or send the inquiry form — reply within 24 hours.",
};

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Quotations & technical support",
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    note: "Mon–Sat, 9:00–18:00 (GMT+8)",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phone,
    href: whatsappLink(),
    note: "Fastest reply for urgent inquiries",
  },
  {
    icon: MapPin,
    label: "Address",
    value: site.address,
    note: "Factory visits welcome",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* 页头 */}
      <section className="bg-navy-900 bg-grid">
        <div className="container-site py-16 text-center sm:py-20">
          <p className="section-eyebrow">Contact</p>
          <h1 className="text-balance mx-auto mt-2 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Send Us Your Specs — Get a Quote Within 24 Hours
          </h1>
          <p className="mx-auto mt-4 flex max-w-md items-center justify-center gap-2 text-sm text-white/60">
            <Clock className="h-4 w-4 shrink-0" />
            Average first response time: under 24 hours
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* 联系方式 */}
          <div>
            <p className="section-eyebrow">Reach Us Directly</p>
            <h2 className="section-title">Choose the Channel You Prefer</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CHANNELS.map((c) => (
                <div
                  key={c.label}
                  className="rounded-sm border border-steel/10 bg-mist p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy-900 text-white">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-navy-900">
                    {c.label}
                  </h3>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener"
                      className="mt-1 block break-all text-sm font-medium text-accent hover:underline"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-steel">{c.value}</p>
                  )}
                  <p className="mt-2 text-xs text-steel">{c.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-sm border border-accent/30 bg-accent-light p-5">
              <h3 className="text-sm font-semibold text-navy-900">
                For distributors &amp; OEM programs
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-steel">
                Mention your annual volume and target models — we prepare a
                program proposal with tiered pricing, lead times and
                documentation support.
              </p>
            </div>
          </div>

          {/* 表单 */}
          <div className="rounded-sm border border-steel/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-navy-900">
              Send an Inquiry
            </h2>
            <p className="mt-1 text-sm text-steel">
              Fields marked <span className="text-accent">*</span> are required.
            </p>
            <div className="mt-6">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
