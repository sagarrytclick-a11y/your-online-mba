"use client";
import React, { useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { useProgramShortlist } from "../context/ProgramShortlistContext";
import ShortlistButton from "./ShortlistButton";
import RatingStars from "./RatingStars";
import ScrollReveal from "./ScrollReveal";
import type { FinderCriteria, FinderMatch } from "../lib/finder";

interface FinderResultsProps {
  matches: FinderMatch[];
  criteria: FinderCriteria;
}

type SortKey = "match" | "fee-low" | "fee-high" | "rating" | "placement" | "roi";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "match", label: "Best match" },
  { key: "fee-low", label: "Fee: low to high" },
  { key: "fee-high", label: "Fee: high to low" },
  { key: "rating", label: "Highest rated" },
  { key: "placement", label: "Placement rate" },
  { key: "roi", label: "Avg package" },
];

const roiLabel = (match: FinderMatch): string => `${match.details.avgPackageLpa} L`;

const FinderResults: React.FC<FinderResultsProps> = ({ matches, criteria }) => {
  const { count, isFull } = useProgramShortlist();
  const [sort, setSort] = useState<SortKey>("match");
  const [onlyInBudget, setOnlyInBudget] = useState(false);

  const visible = React.useMemo(() => {
    let list = onlyInBudget ? matches.filter((m) => m.inBudget) : matches;
    list = [...list];
    switch (sort) {
      case "fee-low":
        list.sort((a, b) => a.details.totalFee - b.details.totalFee);
        break;
      case "fee-high":
        list.sort((a, b) => b.details.totalFee - a.details.totalFee);
        break;
      case "rating":
        list.sort((a, b) => b.college.rating - a.college.rating);
        break;
      case "placement":
        list.sort((a, b) => b.details.placementRate - a.details.placementRate);
        break;
      case "roi":
        list.sort((a, b) => b.details.avgPackageLpa - a.details.avgPackageLpa);
        break;
      default:
        list.sort((a, b) => b.score - a.score);
    }
    return list;
  }, [matches, sort, onlyInBudget]);

  return (
    <div className="mt-10 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Sort by
          </span>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setSort(opt.key)}
                className={`px-3.5 py-2 rounded-full text-[11px] sm:text-xs font-extrabold transition-all ${
                  sort === opt.key
                    ? "bg-[#C81E3D] text-white"
                    : "bg-slate-50 text-slate-500 border border-gray-100 hover:border-rose-200 hover:text-[#C81E3D]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-500 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyInBudget}
              onChange={(e) => setOnlyInBudget(e.target.checked)}
              className="w-4 h-4 accent-[#C81E3D]"
            />
            In budget only
          </label>
          {count > 0 && (
            <Link
              href="/compare-programs"
              className="inline-flex items-center gap-2 h-10 px-5 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-xs shadow-md transition-all"
            >
              <Icons.Scale size={14} />
              Compare {count} selected
            </Link>
          )}
        </div>
      </div>

      {isFull && count >= 3 && (
        <p className="text-xs font-semibold text-slate-500 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <Icons.Info size={13} className="inline mr-1.5 -mt-0.5 text-amber-600" />
          Shortlist is full at 3 programmes. Remove one to add another.
        </p>
      )}

      {visible.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4">
          <span className="w-14 h-14 mx-auto rounded-2xl bg-[#FFF1F2] flex items-center justify-center">
            <Icons.SearchX size={24} className="text-[#C81E3D]" />
          </span>
          <h3 className="text-lg font-extrabold text-[#1E293B]">No matches in that filter</h3>
          <p className="text-sm text-slate-500 font-medium">
            Try widening your budget band or turning off the in-budget filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((match, index) => (
            <ScrollReveal key={match.college.id} delay={Math.min(index, 5) * 60}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-100 flex gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={match.college.image}
                        alt={match.college.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-extrabold text-[#1E293B] leading-tight">
                            <Link
                              href={`/universities/${match.college.id}`}
                              className="hover:text-[#C81E3D] transition-colors"
                            >
                              {match.college.name}
                            </Link>
                          </h3>
                          <p className="text-[11px] text-slate-400 font-bold mt-1">
                            {match.college.location}
                          </p>
                        </div>
                        <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] text-[#C81E3D] text-[10px] font-black">
                          <Icons.Radar size={11} />
                          {match.score}
                        </span>
                      </div>
                      <div className="mt-3">
                        <RatingStars value={match.college.rating} reviewCount={match.college.totalReviews} />
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {match.details.approvals.slice(0, 3).map((a) => (
                          <span
                            key={a}
                            className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-extrabold text-emerald-700"
                          >
                            {a}
                          </span>
                        ))}
                        {match.details.nirfRank && (
                          <span className="px-2 py-0.5 rounded-full bg-violet-50 border border-violet-100 text-[10px] font-extrabold text-violet-700">
                            NIRF #{match.details.nirfRank}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-5 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Total fee
                        </p>
                        <p className="text-sm font-black text-[#1E293B] mt-1">
                          ₹{(match.details.totalFee / 100000).toFixed(2)} L
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                          EMI ₹{match.details.emiMonthly.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Avg package
                        </p>
                        <p className="text-sm font-black text-[#1E293B] mt-1">
                          {roiLabel(match)}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                          +{match.details.salaryUpliftPercent}% uplift
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Placement
                        </p>
                        <p className="text-sm font-black text-[#1E293B] mt-1">
                          {match.details.placementRate}%
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                          {match.details.hiringPartners.toLocaleString("en-IN")} partners
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Duration
                        </p>
                        <p className="text-sm font-black text-[#1E293B] mt-1">
                          {match.details.emiTenureMonths >= 24 ? "2 yrs" : `${Math.round(match.details.emiTenureMonths / 12)} yr`}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                          {match.details.liveClassesPerWeek === 0
                            ? "Self-paced"
                            : `${match.details.liveClassesPerWeek}/wk live`}
                        </p>
                      </div>
                    </div>

                    {match.reasons.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {match.reasons.map((reason) => (
                          <span
                            key={reason}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-gray-100 text-[10px] font-bold text-slate-600"
                          >
                            <Icons.Check size={10} className="text-emerald-600" />
                            {reason}
                          </span>
                        ))}
                      </div>
                    )}

                    {!match.inBudget && (
                      <p className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">
                        <Icons.AlertTriangle size={12} className="inline mr-1.5 -mt-0.5" />
                        Outside your selected budget band. Worth a look if the ROI justifies it.
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2.5">
                      <ShortlistButton collegeId={match.college.id} variant="full" />
                      <Link
                        href={`/universities/${match.college.id}`}
                        className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-gray-200 text-slate-600 text-sm font-extrabold hover:border-[#C81E3D] hover:text-[#C81E3D] transition-all"
                      >
                        View details
                        <Icons.ArrowRight size={14} />
                      </Link>
                      <Link
                        href={`/roi-calculator?university=${match.college.id}${
                          criteria.domain ? `&domain=${criteria.domain}` : ""
                        }`}
                        className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full text-slate-500 text-sm font-extrabold hover:text-[#C81E3D] transition-colors"
                      >
                        <Icons.Calculator size={14} />
                        ROI
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinderResults;
