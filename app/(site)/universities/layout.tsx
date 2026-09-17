import type { Metadata } from "next";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Top Universities for Online MBA in India 2026",
  description:
    "Explore detailed reviews, ratings, fees, EMI options, and course offerings from India's top UGC-approved Online MBA universities including LPU, Amity, NMIMS, Manipal & more.",
  path: "/universities",
  keywords: [
    "online MBA universities India",
    "best online MBA colleges",
    "UGC approved online MBA",
    "online MBA fees comparison",
  ],
});

export default function UniversitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
