import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { SITE_URL, defaultDescription } from "@/app/lib/seo";
import { siteConfig } from "@/app/data/site";
import "./globals.css";

// Self-hosted at build time — removes the render-blocking third-party font CSS
// request and the FOUT it caused.
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Online MBA India 2026 & EdTech Growth Services | Your Online MBA",
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
    "online MBA admission assistance",
    "edtech consulting company India",
    "education performance marketing agency",
    "online MBA lead generation",
    "edtech website development",
    "online degree counselling",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Online MBA India 2026 & EdTech Growth Services | Your Online MBA",
    description:
      "Compare UGC-approved online MBA universities with free counselling — plus consulting, performance marketing, lead generation & web development for EdTech brands.",
    url: SITE_URL,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online MBA India 2026 & EdTech Growth Services",
    description:
      "Compare UGC-approved online MBA universities with free counselling — plus EdTech growth services.",
    images: ["/opengraph-image"],
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
    languages: { "en-IN": SITE_URL, "x-default": SITE_URL },
  },
  category: "education",
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Noida",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden app-shell">{children}</body>
    </html>
  );
}
