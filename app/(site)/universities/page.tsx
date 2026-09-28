import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import UniversityDirectory from "../../Components/UniversityDirectory";
import JsonLd from "../../Components/JsonLd";
import { collegeReviews } from "../../data/colleges";
import { getUniversityDetailsOrDefaults } from "../../data/university-details";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "../../lib/seo";
import { formatInr } from "../../lib/roi";

export const metadata: Metadata = buildMetadata({
  title: "All Online MBA Universities in India 2026 - Fees, NIRF & Reviews",
  description:
    "Browse and filter India's top UGC-approved online MBA universities by fee, accreditation, exam mode and rating. Compare average package, salary uplift and 5-year ROI for 22 universities.",
  path: "/universities",
  keywords: [
    "online MBA universities India",
    "list of online MBA colleges",
    "best online MBA universities 2026",
    "UGC approved online universities",
    "online MBA fees comparison",
  ],
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Universities", path: "/universities" },
]);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Online MBA Universities in India",
  numberOfItems: collegeReviews.length,
  itemListElement: collegeReviews.map((college, index) => {
    const details = getUniversityDetailsOrDefaults(college.id);
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CollegeOrUniversity",
        name: college.name,
        url: `${SITE_URL}/universities/${college.id}`,
        description: `${college.description.slice(0, 180)} UGC-DEB approved, ${details.naacGrade}, ${details.naacGrade === "N/A" ? "" : "accredited "}fee from ${formatInr(details.totalFee)}.`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: college.rating,
          bestRating: 5,
          worstRating: 1,
        },
      },
    };
  }),
};

export default function UniversitiesPage() {
  const feeValues = collegeReviews.map((c) => getUniversityDetailsOrDefaults(c.id).totalFee);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />

      <section className="bg-white border-b border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C81E3D] uppercase tracking-wider"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">Universities</span>
          </nav>

          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight">
              Top Universities for Online MBA
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium max-w-2xl mx-auto">
              {collegeReviews.length} UGC-approved institutions, filtered by the things that actually
              decide the outcome: total fee, accreditation, exam mode, live class load and placement rate.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {[
                `₹${Math.min(...feeValues).toLocaleString("en-IN")} starting fee`,
                `${collegeReviews.filter((c) => c.rating >= 4.2).length} rated 4.2+`,
                "EMI & scholarship support",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF1F2] border border-rose-100 text-[11px] font-extrabold text-[#C81E3D]"
                >
                  <Check size={11} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <UniversityDirectory />
      </section>
    </div>
  );
}
