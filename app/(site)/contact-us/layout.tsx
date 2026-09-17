import type { Metadata } from "next";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us - Free Online MBA Counselling",
  description:
    "Talk to our Online MBA counsellors for free. Get personalised university shortlisting, fee guidance, EMI options, and admission support across India.",
  path: "/contact-us",
  keywords: ["online MBA counselling", "MBA admission help", "free MBA counselling India"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
