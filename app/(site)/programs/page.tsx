import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import SectionHeading from "../../Components/SectionHeading";
import ScrollReveal from "../../Components/ScrollReveal";
import JsonLd from "../../Components/JsonLd";
import PopupTrigger from "../../Components/PopupTrigger";
import { programs } from "../../data/programs";
import { collegeReviews } from "../../data/colleges";
import { getUniversityDetailsOrDefaults } from "../../data/university-details";
import { buildMetadata, breadcrumbJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All Online MBA Programmes in India - Duration, Fee & Level",
  description:
    "Every online postgraduate and MBA programme we track, with duration, level, format and the universities that offer it. Compare fees, accreditation and ROI side by side.",
  path: "/programs",
  keywords: [
    "online MBA programmes",
    "online postgraduate programmes",
    "online MBA India",
    "distance learning programmes",
  ],
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Programs", path: "/programs" },
]);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Online MBA and Postgraduate Programmes",
  numberOfItems: programs.length,
  itemListElement: programs.map((p, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Course",
      name: p.title,
      description: p.description.slice(0, 180),
      timeRequired: p.duration,
    },
  })),
};

export default function ProgramsPage() {
  const cheapest = collegeReviews
    .map((c) => ({ college: c, details: getUniversityDetailsOrDefaults(c.id) }))
    .sort((a, b) => a.details.totalFee - b.details.totalFee)[0];

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
            <span className="text-slate-500">Programs</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight leading-tight">
              Every programme we track
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              {programs.length} online postgraduate and MBA programmes, each with its duration, level
              and format. Open one to see the universities that offer it and what the fee actually works
              out to.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/find-my-program"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C81E3D] text-white text-[11px] font-extrabold hover:bg-[#B01A33] transition-colors"
              >
                <Icons.Search size={12} />
                Not sure? Use the finder
              </Link>
              <Link
                href="/compare-programs"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-rose-100 text-[11px] font-extrabold text-[#C81E3D] hover:border-[#C81E3D] transition-colors"
              >
                <Icons.Scale size={12} />
                Compare programmes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <ScrollReveal key={p.slug} delay={(i % 6) * 70} direction="up">
              <article className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col space-y-4 hover:border-[#C81E3D]/30 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3">
                  <span className="w-11 h-11 rounded-xl bg-[#FFF1F2] flex items-center justify-center flex-shrink-0">
                    <Icons.GraduationCap size={19} className="text-[#C81E3D]" />
                  </span>
                  <span className="text-[9px] font-black text-slate-400 bg-[#F8FAFC] border border-gray-100 rounded-full px-2.5 py-1">
                    {p.subPrograms.length} variants
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-[#1E293B] leading-snug">
                    <Link href={`/programs/${p.slug}`} className="hover:text-[#C81E3D] transition-colors">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="text-[11px] text-slate-400 font-bold mt-1">{p.level}</p>
                </div>

                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 flex-grow">
                  {p.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#FAFBFD] rounded-xl p-3">
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                      Duration
                    </p>
                    <p className="text-xs font-extrabold text-[#1E293B] mt-0.5">{p.duration}</p>
                  </div>
                  <div className="bg-[#FAFBFD] rounded-xl p-3">
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                      Format
                    </p>
                    <p className="text-xs font-extrabold text-[#1E293B] mt-0.5 line-clamp-2">
                      {p.format}
                    </p>
                  </div>
                </div>

                <ul className="space-y-1.5">
                  {p.subPrograms.slice(0, 3).map((sub) => (
                    <li
                      key={sub.title}
                      className="text-[11px] font-semibold text-slate-500 flex items-start gap-1.5"
                    >
                      <Icons.Dot size={12} className="text-[#C81E3D] flex-shrink-0 mt-1" />
                      <span className="line-clamp-1">{sub.title}</span>
                    </li>
                  ))}
                  {p.subPrograms.length > 3 && (
                    <li className="text-[11px] font-bold text-slate-400 pl-4">
                      +{p.subPrograms.length - 3} more
                    </li>
                  )}
                </ul>

                <Link
                  href={`/programs/${p.slug}`}
                  className="mt-1 h-11 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-xs transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2"
                >
                  View programme
                  <Icons.ArrowRight size={14} />
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Cheapest route in"
            title="Fee is not the only thing to compare"
            description="Two programmes with identical fees can have completely different accreditation, placement support and return on investment. Start from the number, then check the rest."
          />
          <div className="mt-8 bg-white rounded-3xl border border-gray-100 p-7 sm:p-8 shadow-sm space-y-5">
            {cheapest && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Lowest total fee we track
                  </p>
                  <p className="text-lg font-black text-[#1E293B] mt-1">{cheapest.college.name}</p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    ₹{(cheapest.details.totalFee / 100000).toFixed(2)}L total ·{" "}
                    {cheapest.details.approvals.join(", ")}
                  </p>
                </div>
                <Link
                  href={`/universities/${cheapest.college.id}`}
                  className="h-11 px-6 bg-[#C81E3D] text-white font-extrabold rounded-full text-xs transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 flex-shrink-0"
                >
                  View university
                  <Icons.ArrowRight size={14} />
                </Link>
              </div>
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Icons.BadgeCheck,
                  title: "Check the approval",
                  body: "UGC-DEB for a degree, and the exact mode of exam. WES matters only if you intend to go abroad.",
                },
                {
                  icon: Icons.IndianRupee,
                  title: "Price the whole term",
                  body: "Total fee, not EMI. Add the cost of a re-attempt if a term is failed.",
                },
                {
                  icon: Icons.TrendingUp,
                  title: "Model the return",
                  body: "Run the calculator at your real salary. If break-even is beyond five years, pick cheaper.",
                },
              ].map((tip) => (
                <li key={tip.title} className="space-y-2">
                  <span className="w-10 h-10 rounded-xl bg-[#FFF1F2] flex items-center justify-center">
                    <tip.icon size={17} className="text-[#C81E3D]" />
                  </span>
                  <p className="text-sm font-extrabold text-[#1E293B]">{tip.title}</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{tip.body}</p>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <PopupTrigger className="h-12 px-7 bg-[#C81E3D] text-white font-extrabold rounded-full text-sm transition-all active:scale-[0.98] inline-flex items-center gap-2">
                <Icons.Phone size={16} />
                Get help choosing
              </PopupTrigger>
              <Link
                href="/universities"
                className="h-12 px-7 border-2 border-slate-200 text-slate-500 font-extrabold rounded-full text-sm transition-all hover:border-slate-300 inline-flex items-center gap-2"
              >
                <Icons.Building2 size={16} />
                Browse universities
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
