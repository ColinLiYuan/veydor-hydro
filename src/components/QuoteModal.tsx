"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { InquiryForm } from "./InquiryForm";

/** 询盘弹窗:按钮触发,内嵌询盘表单。Esc / 点击遮罩关闭。 */
export function QuoteModal({
  productTitle,
  skus,
  label = "Request a Quote",
  className = "btn-accent",
}: {
  productTitle: string;
  skus: string[];
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Request a quote"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy-900">
                Request a Quote
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-sm text-steel hover:bg-mist hover:text-navy-900"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <InquiryForm productTitle={productTitle} skus={skus} compact />
          </div>
        </div>
      ) : null}
    </>
  );
}
