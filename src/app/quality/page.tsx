import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Factory,
  FlaskConical,
  Gauge,
  Microscope,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Quality Control & Certifications",
  description:
    "How VEYDOR guarantees hydraulic valve quality: 100% pressure testing, ISO 9001:2015 quality system, material traceability and export-grade packing.",
};

const QC_ICONS = [Factory, ClipboardCheck, FlaskConical, PackageCheck];

const TESTING = [
  {
    icon: Gauge,
    title: "100% Pressure Testing",
    text: "Every single valve is pressure-tested on calibrated benches — no batch sampling.",
  },
  {
    icon: Ruler,
    title: "Dimensional Inspection",
    text: "Critical bores and spools are checked against drawings with micron-level instruments.",
  },
  {
    icon: Microscope,
    title: "Material Verification",
    text: "Incoming steel is verified against mill certificates; material test reports available on request.",
  },
  {
    icon: Timer,
    title: "Function & Endurance Test",
    text: "Solenoids are cycled and response-tested to confirm switching performance and leak-free sealing.",
  },
  {
    icon: PackageCheck,
    title: "Pre-Shipment Inspection",
    text: "A final AQL inspection covers marking, packing and documentation before release.",
  },
  {
    icon: ClipboardCheck,
    title: "Batch Traceability",
    text: "Every production batch is recorded — from raw material lot to final inspection report.",
  },
];

const FAQS = [
  {
    q: "Do you really test every valve before shipping?",
    a: "Yes. Unlike batch sampling, every VEYDOR valve passes an individual pressure and function test on calibrated benches before it is packed. Inspection records are kept per batch and available on request.",
  },
  {
    q: "What certifications do you hold?",
    a: "Our quality system follows ISO 9001:2015. Material test reports (MTR) are provided with shipments, and CE documentation is available for applicable models. We can support customer-specific audits and documentation packages.",
  },
  {
    q: "What is the MOQ and typical lead time?",
    a: "MOQ is model-dependent (usually from 1–10 pieces for stock series, mixed models welcome). Typical lead time is 7–15 days after order confirmation, depending on the series and quantity.",
  },
  {
    q: "Do you offer OEM / ODM service?",
    a: "Yes. We produce under your brand — private labeling, custom color/cartons and customer part numbers. Send us your drawings or specifications and we will quote tooling and unit cost.",
  },
  {
    q: "What warranty do you provide?",
    a: "12 months from shipment against manufacturing defects. Warranty claims are handled with replacement parts or units after failure analysis.",
  },
  {
    q: "How are valves packed for export?",
    a: "Anti-rust treatment, plastic sealing, then export cartons or wooden cases. Multi-model mixed containers are supported, with full packing lists and shipping marks.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function QualityPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 页头 */}
      <section className="bg-navy-900 bg-grid">
        <div className="container-site py-16 text-center sm:py-20">
          <p className="section-eyebrow">Quality Control</p>
          <h1 className="text-balance mx-auto mt-2 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A Quality System You Can Audit — Not Just a Promise
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            Hydraulic valves fail silently and fail expensively. That is why we
            test every unit, trace every batch and document every shipment.
          </p>
        </div>
      </section>

      {/* 流程时间线 */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <p className="section-eyebrow">Process</p>
          <h2 className="section-title">From Raw Material to Shipment</h2>
          <ol className="relative mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* 连接线 */}
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-steel/20 lg:block" />
            {site.qcSteps.map((step, i) => {
              const Icon = QC_ICONS[i % QC_ICONS.length];
              return (
                <li key={step.title} className="relative">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-white ring-4 ring-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-3 block font-mono text-xs font-bold text-accent">
                    STEP 0{i + 1}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 检测能力 */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-site">
          <p className="section-eyebrow">Testing Capabilities</p>
          <h2 className="section-title">What We Measure Before You Receive It</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTING.map((t) => (
              <div
                key={t.title}
                className="rounded-sm border border-steel/10 bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent text-white">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-900">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 认证 */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <p className="section-eyebrow">Certifications & Warranty</p>
          <h2 className="section-title">Documented, Not Just Claimed</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {site.certifications.map((c) => (
              <div
                key={c}
                className="flex flex-col items-center gap-3 rounded-sm border border-steel/10 bg-mist p-6 text-center"
              >
                <ShieldCheck className="h-8 w-8 text-trust" />
                <span className="text-sm font-semibold leading-snug text-navy-900">
                  {c}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-steel">
            Inspection reports, material certificates and test data are shipped
            with every order. On-site audits and third-party inspections (SGS,
            BV, TÜV) are welcome.
          </p>
        </div>
      </section>

      {/* FAQ(GEO:AIGC 可引用的问题式内容) */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <p className="section-eyebrow">FAQ</p>
          <h2 className="section-title">Quality Questions, Answered</h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border border-steel/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="border-t border-steel/10 px-5 py-4 text-sm leading-relaxed text-steel">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="container-site flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ask for our quality documents with your quote.
            </h2>
            <p className="mt-2 text-sm text-white/85">
              Inspection reports, MTR and CE documents — included on request.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-50"
          >
            <BadgeCheck className="h-4 w-4" />
            Request Documents
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
