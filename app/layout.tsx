import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SITE_URL, defaultDescription } from "@/app/lib/seo";
import { siteConfig } from "@/app/data/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Online MBA - Top UGC-Approved Universities & Programs 2026",
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  keywords: [
    "Online MBA",
    "MBA distance learning",
    "online MBA India",
    "UGC approved MBA",
    "LPU online MBA",
    "Amity online MBA",
    "NMIMS online MBA",
    "Manipal online MBA",
    "Chandigarh University online MBA",
    "online MBA fees",
    "top MBA universities India",
    "online MBA counselling",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Online MBA - Top UGC-Approved Universities & Programs 2026",
    description:
      "Compare India's top Online MBA universities. UGC-approved programs with flexible EMI. Get free expert counselling today.",
    url: SITE_URL,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online MBA - Top UGC-Approved Universities & Programs 2026",
    description:
      "Compare India's top Online MBA universities. UGC-approved programs with flexible EMI.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "en-IN": SITE_URL },
  },
  category: "education",
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Noida",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#C81E3D" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
