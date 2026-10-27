"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitInquiry } from "@/lib/client-api";
import { site, whatsappLink } from "@/site.config";
import Link from "next/link";

/**
 * 询盘表单(客户端)。
 * 提交由浏览器直连后端 /api/v1/inquiries,不经过 Vercel。
 * 必填:姓名、邮箱。productTitle 提供时留言框预填产品上下文。
 */
export function InquiryForm({
  productTitle,
  skus,
  compact = false,
}: {
  productTitle?: string;
  skus?: string[];
  compact?: boolean;
}) {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    companyName: "",
    country: "",
    message: productTitle
      ? `Hello, I am interested in ${productTitle}${
          skus && skus.length > 0 ? ` (${skus.slice(0, 3).join(" / ")}${skus.length > 3 ? "…" : ""})` : ""
        }.\nPlease send me a quotation. Quantity: `
      : "",
  });
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [inquiryNumber, setInquiryNumber] = useState("");
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.customerName.trim() || !form.customerEmail.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setState("submitting");
    setError("");
    try {
      const result = await submitInquiry({
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim(),
        customerPhone: form.customerPhone.trim() || undefined,
        companyName: form.companyName.trim() || undefined,
        country: form.country.trim() || undefined,
        message: form.message.trim() || undefined,
      });
      setInquiryNumber(result.inquiryNumber);
      setState("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again or contact us directly.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-sm border border-trust/30 bg-trust/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-trust" />
        <h3 className="text-lg font-bold text-navy-900">Inquiry Received</h3>
        <p className="text-sm text-steel">
          Thank you! Your inquiry number is{" "}
          <span className="font-mono font-semibold text-navy-900">
            {inquiryNumber}
          </span>
          .<br />
          Our team will reply within 24 hours.
        </p>
        <Link href={whatsappLink()} target="_blank" rel="noopener" className="btn-accent">
          Chat on WhatsApp Now
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {productTitle ? (
        <p className="rounded-sm bg-mist px-3 py-2 text-xs leading-relaxed text-steel">
          <span className="font-semibold text-navy-900">Inquiring about:</span>{" "}
          {productTitle}
          {skus && skus.length > 0 ? (
            <>
              <br />
              <span className="font-mono">{skus.slice(0, 3).join(" · ")}</span>
            </>
          ) : null}
        </p>
      ) : null}

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor="inquiry-name" className="mb-1.5 block text-xs font-semibold text-navy-900">
            Name <span className="text-accent">*</span>
          </label>
          <input id="inquiry-name" className="input" required placeholder="Your name" value={form.customerName} onChange={set("customerName")} />
        </div>
        <div>
          <label htmlFor="inquiry-email" className="mb-1.5 block text-xs font-semibold text-navy-900">
            Email <span className="text-accent">*</span>
          </label>
          <input id="inquiry-email" type="email" className="input" required placeholder="you@company.com" value={form.customerEmail} onChange={set("customerEmail")} />
        </div>
        <div>
          <label htmlFor="inquiry-phone" className="mb-1.5 block text-xs font-semibold text-navy-900">
            Phone / WhatsApp
          </label>
          <input id="inquiry-phone" className="input" placeholder="+1 555 000 0000" value={form.customerPhone} onChange={set("customerPhone")} />
        </div>
        <div>
          <label htmlFor="inquiry-country" className="mb-1.5 block text-xs font-semibold text-navy-900">
            Country
          </label>
          <input id="inquiry-country" className="input" placeholder="e.g. Germany" value={form.country} onChange={set("country")} />
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="inquiry-company" className="mb-1.5 block text-xs font-semibold text-navy-900">
            Company
          </label>
          <input id="inquiry-company" className="input" placeholder="Company name" value={form.companyName} onChange={set("companyName")} />
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="inquiry-message" className="mb-1.5 block text-xs font-semibold text-navy-900">
            Message
          </label>
          <textarea id="inquiry-message" rows={4} className="input resize-y" placeholder="Model, quantity, specifications, destination port…" value={form.message} onChange={set("message")} />
        </div>
      </div>

      {error ? (
        <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={state === "submitting"} className="btn-accent w-full disabled:cursor-not-allowed disabled:opacity-60">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send Inquiry"
        )}
      </button>
      <p className="text-center text-xs text-steel">
        Prefer email?{" "}
        <a href={`mailto:${site.email}`} className="font-semibold text-navy-700 underline">
          {site.email}
        </a>
      </p>
    </form>
  );
}
