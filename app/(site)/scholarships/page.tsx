import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import ScholarshipChecker from "../../Components/ScholarshipChecker";
import SectionHeading from "../../Components/SectionHeading";
import ScrollReveal from "../../Components/ScrollReveal";
import JsonLd from "../../Components/JsonLd";
import { scholarships, categoryLabels } from "../../data/scholarships";
import { buildMetadata, breadcrumbJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Online MBA Scholarships 2026 - Eligibility Checker & EMI Options",
  description:
    "Merit, defence, women-in-leadership and budget scholarships for online MBA, plus an instant eligibility checker and side-by-side zero-interest EMI versus bank loan comparison.",
  path: "/scholarships",
  keywords: [
    "online MBA scholarships",
    "MBA scholarship India",
    "education loan EMI",
    "online MBA fee waiver",
    "zero interest EMI MBA",
  ],
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Scholarships", path: "/scholarships" },
]);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Online MBA Scholarships and Financial Aid",
  numberOfItems: scholarships.length,
  itemListElement: scholarships.slice(0, 20).map((s, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Offer",
      name: s.name,
      description: s.eligibility,
      category: categoryLabels[s.category],
    },
  })),
};

export default function ScholarshipsPage() {
  const fullWaiver = scholarships.filter((s) => s.waiverPercent === 100).length;
  const totalSeats = scholarships.reduce((sum, s) => sum + s.seats, 0);

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
            <span className="text-slate-500">Scholarships</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight leading-tight">
              Scholarships &amp; financial aid
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              {scholarships.length} schemes covering merit, budget, defence and women-in-leadership
              categories, plus a live eligibility checker. Set your percentage and income and see what
              you actually qualify for.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                `${scholarships.length} active schemes`,
                `${totalSeats.toLocaleString("en-IN")} seats across providers`,
                fullWaiver > 0 ? `${fullWaiver} full-fee waivers` : "Partial waivers available",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF1F2] border border-rose-100 text-[11px] font-extrabold text-[#C81E3D]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ScholarshipChecker />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Read this first"
            title="Five things about MBA scholarships nobody tells you"
            description="The rules are more specific than the brochures, and understanding them before you apply is worth lakhs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {[
              {
                n: "01",
                title: "You rarely get to stack two scholarships",
                body: "Most universities treat a merit scholarship and an institutional scholarship as mutually exclusive. The eligibility checker shows the top two by value, but assume you can only claim one. Stacking assumptions are the most common reason fee estimates come in too low.",
              },
              {
                n: "02",
                title: "The deadline is not the university deadline",
                body: "Merit scholarships usually close before the admission deadline, sometimes by four to six weeks, because the selection committee needs time. The 'rolling' schemes genuinely do take applications throughout the year, but the seats run out.",
              },
              {
                n: "03",
                title: "Percentage cuts are decided on your graduation aggregate",
                body: "Sixty percent is the common floor. Seventy-five percent and above is where the larger slabs start. If your marksheet has a re-evaluation option, getting it re-evaluated before you apply can be worth more than the scholarship itself.",
              },
              {
                n: "04",
                title: "Zero-interest EMI is not free money",
                body: "It is free of interest, not free of cost. The term is usually capped at 24 months, so your monthly outflow is higher than a 36-month bank loan. Compare total payable across tenures, and read what happens to the fee if you miss an instalment.",
              },
              {
                n: "05",
                title: "Keep the offer letter, not the brochure",
                body: "The waiver that counts is the one printed on your admission offer. A scholarship announced at a webinar can be withdrawn if intake numbers fall short. Get the number in writing before you pay the first instalment.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm space-y-3"
              >
                <span className="text-2xl font-black text-[#C81E3D]/20">{item.n}</span>
                <h3 className="text-base font-extrabold text-[#1E293B]">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm space-y-5">
            <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
              Scholarship documents, in one place
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Keep these scanned and ready. Most applications need at least four of them, and a missing
              income proof is the single most common reason a merit claim gets rejected.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Graduation marksheet and consolidated transcript",
                "10th and 12th standard certificates",
                "Government photo ID and passport photographs",
                "Family income proof, or BPL certificate",
                "Category certificate, if a reserved-category scheme applies",
                "Defence or paramilitary service certificate",
                "Work experience letter from employer",
                "Entrance exam scorecard, where applicable",
              ].map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-2.5 text-sm text-slate-600 font-semibold"
                >
                  <Icons.CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
