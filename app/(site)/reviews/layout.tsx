import type { Metadata } from "next";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Online MBA University Reviews & Student Ratings 2026",
  description:
    "Read honest Online MBA university reviews, ratings, fees, and student feedback. Compare LPU, Amity, NMIMS, Manipal and more before you enrol.",
  path: "/reviews",
  keywords: ["online MBA reviews", "MBA university ratings", "student reviews online MBA"],
});

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
