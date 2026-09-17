import type { Metadata } from "next";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Compare Online MBA Universities Side by Side",
  description:
    "Compare Online MBA universities on fees, ratings, accreditation, EMI options, and placements. Build a shortlist and choose the best fit for your career.",
  path: "/compare",
  keywords: ["compare online MBA", "MBA university comparison", "online MBA fees compare"],
});

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
