import type { Metadata } from "next";
import ReviewsDirectory from "../../Components/ReviewsDirectory";
import { buildMetadata } from "../../lib/seo";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = buildMetadata({
  title: "Online MBA Reviews - Verified Student Ratings by University",
  description:
    "Read verified student reviews of online MBA universities in India. Filter by name, city, entrance exam or accreditation, and compare ratings, fees and outcomes.",
  path: "/reviews",
  keywords: [
    "online MBA reviews",
    "university reviews India",
    "online MBA rating",
    "verified student reviews",
  ],
});

export default async function ReviewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const raw = Array.isArray(params.search) ? params.search[0] : params.search;

  return <ReviewsDirectory initialSearch={(raw ?? "").slice(0, 80)} />;
}
