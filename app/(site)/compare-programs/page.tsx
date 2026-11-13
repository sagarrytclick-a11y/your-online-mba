import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import ComparePrograms from "../../Components/ComparePrograms";
import JsonLd from "../../Components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Compare Online MBA Programmes - Fees, NIRF, ROI Side by Side",
  description:
    "Compare up to three online MBA programmes side by side across total fees, EMI, UGC and NAAC accreditation, exam mode, NIRF rank, average package, salary uplift and placement rate.",
  path: "/compare-programs",
  keywords: [
    "compare online MBA",
    "online MBA comparison",
    "online MBA fees comparison",
    "MBA ROI comparison",
  ],
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Compare Programs", path: "/compare-programs" },
]);

export default function CompareProgramsPage() {
  return (
    <div className="min-h-screen bg-[#10131A] pb-24">
      <JsonLd data={breadcrumbSchema} />

      <section className="bg-[#14161d] border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C81E3D] uppercase tracking-wider"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-[#7c8798]">/</span>
            <span className="text-[#8b96a8]">Compare Programs</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F1F5F9] tracking-tight leading-tight">
                Compare online MBA programmes
              </h1>
              <p className="text-[#8b96a8] text-sm sm:text-base font-medium leading-relaxed">
                Line up to three programmes across nineteen criteria, from total fee and EMI through
                to NIRF rank, average package and salary uplift. The strongest value in every row is
                marked, so the trade-off is visible rather than implied.
              </p>
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 self-start h-11 px-5 border-2 border-white/10 rounded-full text-[#a8b3c5] text-sm font-extrabold hover:border-[#C81E3D] hover:text-[#C81E3D] transition-all"
            >
              <BarChart3 size={15} />
              College-level review comparison
            </Link>
          </div>
        </div>
      </section>

      <ComparePrograms />
    </div>
  );
}
