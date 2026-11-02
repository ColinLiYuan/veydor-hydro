import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cog,
  Globe2,
  Handshake,
  Microscope,
  PackageCheck,
  Wrench,
} from "lucide-react";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "About Us",
  alternates: { canonical: "/about" },
  description:
    "VEYDOR Hydraulics is a manufacturer and exporter of hydraulic valves with 10+ years of experience, serving OEMs and distributors in 30+ countries.",
};

const CAPABILITIES = [
  {
    icon: Wrench,
    title: "R&D & Engineering",
    text: "In-house design of valve series, reverse engineering of legacy models, and custom development from customer drawings.",
  },
  {
    icon: Cog,
    title: "Precision Machining",
    text: "CNC machining centers and honing for valve bodies and spools, holding tolerances that ensure leak-free performance.",
  },
  {
    icon: Microscope,
    title: "Testing & Inspection",
    text: "Dedicated test benches for pressure, function and endurance — every single unit is tested before packing.",
  },
  {
    icon: PackageCheck,
    title: "Export & Documentation",
    text: "Anti-rust treatment, export-grade packing, full shipping documents, and mixed-model containers for distributors.",
  },
  {
    icon: Handshake,
    title: "OEM / ODM",
    text: "Private labeling, customer part numbers and customized packaging — we build the product you sell.",
  },
  {
    icon: Globe2,
    title: "Global Service",
    text: "Sales engineers respond within 24 hours with technical support, drawings and warranty service.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* 页头 */}
      <section className="bg-navy-900 bg-grid">
        <div className="container-site py-16 text-center sm:py-20">
          <p className="section-eyebrow">About Us</p>
          <h1 className="text-balance mx-auto mt-2 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A Hydraulics Manufacturer Built on Precision and Accountability
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            Founded in {site.foundedYear}, {site.legalName} designs and
            manufactures hydraulic valves for OEMs, distributors and
            wholesalers worldwide.
          </p>
        </div>
      </section>

      {/* 简介 */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow">Who We Are</p>
            <h2 className="section-title">Engineering Reliability Into Every Valve</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-steel">
              <p>
                We focus on one thing: hydraulic valves that keep working —
                shift after shift, cycle after cycle. Our solenoid directional
                valves, modular and relief valves are used in construction
                machinery, machine tools, agricultural equipment and industrial
                power units around the world.
              </p>
              <p>
                What sets us apart is process discipline. Raw material enters
                with certificates, machining is controlled to drawing, and{" "}
                <span className="font-semibold text-navy-900">
                  every finished valve is individually pressure-tested
                </span>{" "}
                before it earns the VEYDOR mark.
              </p>
              <p>
                From a single sample order to full container programs, we work
                the way distributors and OEMs need: fast quotations, honest
                lead times and documentation you can hand to your customer.
              </p>
            </div>
            <Link href="/products" className="btn-accent mt-7">
              Browse Our Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {site.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-sm border border-steel/10 bg-mist p-6 text-center"
              >
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
        </div>
      </section>

      {/* 能力 */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-site">
          <p className="section-eyebrow">Capabilities</p>
          <h2 className="section-title">What We Do In-House</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="rounded-sm border border-steel/10 bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy-900 text-white">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="container-site flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Let&apos;s build your next hydraulic program.
            </h2>
            <p className="mt-2 text-sm text-white/85">
              Samples, technical support and quotations — within 24 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-50"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
