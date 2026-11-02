import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/site.config";
import { getCategoryTree } from "@/lib/api";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.slogan}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "hydraulic valves",
    "solenoid directional valve",
    "modular relief valve",
    "hydraulic valve manufacturer",
    "hydraulic valve exporter",
    "DSG valve",
    "4WE valve",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.slogan}`,
    description: site.description,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  "@id": `${site.url}/#organization`,
  slogan: site.slogan,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.foundedYear),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    telephone: site.phone,
    availableLanguage: "English",
  },
  address: { "@type": "PostalAddress", streetAddress: site.address },
  description: site.description,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // 分类树供页脚/侧栏使用;API 不可用时降级为空数组,不影响页面渲染
  let categories: Awaited<ReturnType<typeof getCategoryTree>> = [];
  try {
    categories = await getCategoryTree();
  } catch {
    categories = [];
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-white text-ink antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer categories={categories} />
      </body>
    </html>
  );
}
