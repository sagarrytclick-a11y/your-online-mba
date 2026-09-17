import type { Metadata } from "next";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Online MBA Specialisations - HR, Finance, Marketing & More",
  description:
    "Choose the right Online MBA specialisation: HR, Finance, Marketing, Business Analytics, Operations, Digital Marketing & more. Compare fees, salary scope & top universities.",
  path: "/specialisations",
  keywords: [
    "online MBA specialisations",
    "MBA HR online",
    "MBA finance online",
    "MBA marketing online",
    "MBA business analytics",
  ],
});

export default function SpecialisationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
