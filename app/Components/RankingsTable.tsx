"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { collegeReviews } from "../data/colleges";
import { getUniversityDetailsOrDefaults } from "../data/university-details";
import { calculateRoi } from "../lib/roi";

type SortKey = "nirf" | "fee-low" | "fee-high" | "roi" | "rating";

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "nirf", label: "NIRF rank" },
  { id: "fee-low", label: "Fee: low to high" },
  { id: "fee-high", label: "Fee: high to low" },
  { id: "roi", label: "Best 5-year ROI" },
  { id: "rating", label: "Learner rating" },
];

const RankingsTable = () => {
  const [sort, setSort] = useState<SortKey>("nirf");

  const rows = useMemo(() => {
    const base = collegeReviews.map((c) => {
      const details = getUniversityDetailsOrDefaults(c.id);
      const roi = calculateRoi({
        currentAnnualSalary: 600000,
        programFee: details.totalFee,
        monthlyEmi: details.emiMonthly,
        domainSlug: "finance-management",
        studyYears: 2,
        aidPercent: 0,
      });
      return { college: c, details, roi };
    });

    const sorted = [...base];
    sorted.sort((a, b) => {
      if (sort === "fee-low") return a.details.totalFee - b.details.totalFee;
      if (sort === "fee-high") return b.details.totalFee - a.details.totalFee;
      if (sort === "roi") return b.roi.fiveYearNetGain - a.roi.fiveYearNetGain;
      if (sort === "rating") return b.college.rating - a.college.rating;
      return (a.details.nirfRank ?? 999) - (b.details.nirfRank ?? 999);
    });

    return sorted.slice(0, 8);
  }, [sort]);

  return (
    <section className="w-full bg-white py-10 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Rankings"
              title="The honest leaderboard"
              description="Sort by what actually matters to you. The ROI column models a ₹6L starting salary with no aid, so it is comparable across the table."
            />
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSort(option.id)}
                  className={`px-4 py-2 rounded-full text-[11px] font-extrabold transition-all ${
                    sort === option.id
                      ? "bg-[#C81E3D] text-white"
                      : "bg-[#F8FAFC] border border-gray-100 text-slate-500 hover:border-rose-200 hover:text-[#C81E3D]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full min-w-[820px] text-left">
            <thead className="bg-[#FAFBFD]">
              <tr className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-4">University</th>
                <th className="px-5 py-4">Accreditation</th>
                <th className="px-5 py-4 text-right">Total fee</th>
                <th className="px-5 py-4 text-right">EMI from</th>
                <th className="px-5 py-4 text-right">Avg package</th>
                <th className="px-5 py-4 text-right">5-yr net gain</th>
                <th className="px-5 py-4 text-right">Rating</th>
                <th className="px-5 py-4 text-right" />
              </tr>
            </thead>
            <tbody>
              {rows.map(({ college, details, roi }) => (
                <tr
                  key={college.id}
                  className="border-t border-gray-100 text-xs font-bold hover:bg-[#FAFBFD] transition-colors"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/universities/${college.id}`}
                      className="text-[#1E293B] font-extrabold hover:text-[#C81E3D] transition-colors"
                    >
                      {college.name}
                    </Link>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      {college.location}
                      {details.nirfRank !== null && ` · NIRF #${details.nirfRank}`}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {details.approvals.slice(0, 2).map((a) => (
                        <span
                          key={a}
                          className="px-2 py-0.5 rounded-full bg-[#FFF1F2] border border-rose-100 text-[9px] font-black text-[#C81E3D]"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-[#1E293B] font-extrabold">
                    ₹{(details.totalFee / 100000).toFixed(2)}L
                  </td>
                  <td className="px-5 py-4 text-right text-slate-500">
                    ₹{details.emiMonthly.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-4 text-right text-slate-500">
                    ₹{details.avgPackageLpa}L
                  </td>
                  <td
                    className={`px-5 py-4 text-right font-black ${
                      roi.fiveYearNetGain > 0 ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {roi.fiveYearNetGain > 0 ? "+" : "-"}₹
                    {(Math.abs(roi.fiveYearNetGain) / 100000).toFixed(1)}L
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[#1E293B] font-extrabold">
                      <Icons.Star size={11} className="fill-yellow-400 text-yellow-400" />
                      {college.rating}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/roi-calculator?university=${college.id}`}
                      className="text-[#C81E3D] font-extrabold hover:underline whitespace-nowrap"
                    >
                      Check ROI
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-400 font-semibold leading-relaxed max-w-3xl">
          The 5-year net gain subtracts the total programme fee and an estimate of the salary you
          forgo while studying, then adds the cumulative salary difference over five years. It is a
          projection, not a promise. Run it at your own salary before deciding.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/universities"
            className="h-12 px-7 bg-[#C81E3D] text-white font-extrabold rounded-full text-sm transition-all active:scale-[0.98] inline-flex items-center gap-2"
          >
            <Icons.Building2 size={16} />
            See all {collegeReviews.length} universities
          </Link>
          <Link
            href="/compare-programs"
            className="h-12 px-7 border-2 border-slate-200 text-slate-500 font-extrabold rounded-full text-sm transition-all hover:border-slate-300 inline-flex items-center gap-2"
          >
            <Icons.Scale size={16} />
            Compare up to three
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RankingsTable;
