"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { collegeReviews } from "../data/colleges";
import { getUniversityDetailsOrDefaults } from "../data/university-details";
import PopupTrigger from "./PopupTrigger";
import Pagination from "./Pagination";
import ShortlistButton from "./ShortlistButton";
import RatingStars from "./RatingStars";
import { calculateRoi } from "../lib/roi";

const ITEMS_PER_PAGE = 9;

type SortKey = "relevance" | "fee-low" | "fee-high" | "rating" | "placement" | "roi-high" | "popular";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Best match" },
  { key: "rating", label: "Top rated" },
  { key: "fee-low", label: "Fee: low to high" },
  { key: "fee-high", label: "Fee: high to low" },
  { key: "roi-high", label: "Best ROI" },
  { key: "placement", label: "Placement rate" },
  { key: "popular", label: "Most learners" },
];

interface BadgeRule {
  label: string;
  icon: string;
  tone: "rose" | "emerald" | "violet" | "amber";
  test: (d: ReturnType<typeof getUniversityDetailsOrDefaults>, c: (typeof collegeReviews)[number]) => boolean;
}

const badgeRules: BadgeRule[] = [
  {
    label: "Top ROI",
    icon: "TrendingUp",
    tone: "rose",
    test: (d, c) => c.rating >= 4.2 && d.placementRate >= 90 && d.totalFee <= 200000,
  },
  {
    label: "100% Online Placement Support",
    icon: "BadgeCheck",
    tone: "emerald",
    test: (d) => d.placementRate >= 90 && d.hiringPartners >= 800,
  },
  {
    label: "0% Interest EMI",
    icon: "CreditCard",
    tone: "violet",
    test: (d) => d.emiInterestRate === 0,
  },
  {
    label: "Budget Friendly",
    icon: "Wallet",
    tone: "amber",
    test: (d) => d.totalFee <= 100000,
  },
  {
    label: "NIRF Ranked",
    icon: "Trophy",
    tone: "violet",
    test: (d) => d.nirfRank !== null,
  },
  {
    label: "Self-Paced",
    icon: "Clock",
    tone: "emerald",
    test: (d) => d.liveClassesPerWeek === 0,
  },
];

const toneClasses: Record<BadgeRule["tone"], string> = {
  rose: "bg-[#FFF1F2] border-rose-100 text-[#C81E3D]",
  emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
  violet: "bg-violet-50 border-violet-100 text-violet-700",
  amber: "bg-amber-50 border-amber-100 text-amber-700",
};

const badgeIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  TrendingUp: Icons.TrendingUp,
  BadgeCheck: Icons.BadgeCheck,
  CreditCard: Icons.CreditCard,
  Wallet: Icons.Wallet,
  Trophy: Icons.Trophy,
  Clock: Icons.Clock,
};

const feeBuckets = [
  { id: "any", label: "Any fee", min: 0, max: Infinity },
  { id: "u75", label: "Under ₹75K", min: 0, max: 75000 },
  { id: "75-150", label: "₹75K – ₹1.5L", min: 75000, max: 150000 },
  { id: "150-200", label: "₹1.5L – ₹2L", min: 150000, max: 200000 },
  { id: "200+", label: "Above ₹2L", min: 200000, max: Infinity },
];

const accreditationOptions = ["UGC-DEB", "NAAC A++", "NAAC A+", "NIRF"];

const examModeOptions = ["Online Proctored", "In-Centre", "Hybrid Option", "On-Campus Viva"];

const UniversityDirectory: React.FC = () => {
  const [query, setQuery] = useState("");
  const [feeBucket, setFeeBucket] = useState("any");
  const [accreditations, setAccreditations] = useState<string[]>([]);
  const [examModes, setExamModes] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [page, setPage] = useState(1);

  const enriched = useMemo(
    () =>
      collegeReviews.map((college) => {
        const details = getUniversityDetailsOrDefaults(college.id);
        // A mid-career reference point so the ROI sort has a stable, honest baseline.
        const roi = calculateRoi({
          currentAnnualSalary: 900000,
          programFee: details.totalFee,
          monthlyEmi: details.emiMonthly,
          studyYears: details.emiTenureMonths >= 24 ? 2 : 1,
        });
        return { college, details, roi };
      }),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bucket = feeBuckets.find((b) => b.id === feeBucket) ?? feeBuckets[0];

    let list = enriched.filter(({ college, details }) => {
      if (q) {
        const haystack = `${college.name} ${college.location} ${college.description} ${details.approvals.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (details.totalFee < bucket.min || details.totalFee > bucket.max) return false;
      if (accreditations.length > 0 && !accreditations.some((a) => (details.approvals as string[]).includes(a))) return false;
      if (examModes.length > 0 && !examModes.some((m) => (details.examModes as string[]).includes(m))) return false;
      if (college.rating < minRating) return false;
      return true;
    });

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
      case "roi-high":
        list.sort((a, b) => b.roi.fiveYearNetGain - a.roi.fiveYearNetGain);
        break;
      case "popular":
        list.sort((a, b) => b.details.learnerCount - a.details.learnerCount);
        break;
      default:
        list.sort((a, b) => b.college.rating * 10 + b.details.placementRate / 10 - (a.college.rating * 10 + a.details.placementRate / 10));
    }
    return list;
  }, [enriched, query, feeBucket, accreditations, examModes, minRating, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(start, start + ITEMS_PER_PAGE);

  const activeFilterCount =
    (query ? 1 : 0) +
    (feeBucket !== "any" ? 1 : 0) +
    accreditations.length +
    examModes.length +
    (minRating > 0 ? 1 : 0);

  const resetAll = () => {
    setQuery("");
    setFeeBucket("any");
    setAccreditations([]);
    setExamModes([]);
    setMinRating(0);
    setSort("relevance");
    setPage(1);
  };

  const toggle = (
    value: string,
    current: string[],
    setter: (v: string[]) => void
  ) => {
    setter(current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
    setPage(1);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        <aside className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:sticky lg:top-28 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-[#1E293B] flex items-center gap-2">
              <Icons.SlidersHorizontal size={16} className="text-[#C81E3D]" />
              Filters
            </h2>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetAll}
                className="text-[11px] font-extrabold text-[#C81E3D] hover:underline"
              >
                Clear ({activeFilterCount})
              </button>
            )}
          </div>

          <div>
            <label htmlFor="college-search" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Search
            </label>
            <div className="relative">
              <Icons.Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
              <input
                id="college-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="University or city"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm font-semibold text-[#1E293B] placeholder:text-slate-300 focus:border-[#C81E3D] focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Total fee
            </p>
            <div className="flex flex-wrap gap-2">
              {feeBuckets.map((bucket) => (
                <button
                  key={bucket.id}
                  type="button"
                  onClick={() => {
                    setFeeBucket(bucket.id);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold transition-all ${
                    feeBucket === bucket.id
                      ? "bg-[#C81E3D] text-white"
                      : "bg-slate-50 border border-gray-100 text-slate-500 hover:border-rose-200 hover:text-[#C81E3D]"
                  }`}
                >
                  {bucket.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Accreditation
            </p>
            <div className="space-y-2">
              {accreditationOptions.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2.5 text-xs font-bold text-slate-600 cursor-pointer hover:text-[#C81E3D] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={accreditations.includes(opt)}
                    onChange={() => toggle(opt, accreditations, setAccreditations)}
                    className="w-4 h-4 accent-[#C81E3D]"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Exam mode
            </p>
            <div className="space-y-2">
              {examModeOptions.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2.5 text-xs font-bold text-slate-600 cursor-pointer hover:text-[#C81E3D] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={examModes.includes(opt)}
                    onChange={() => toggle(opt, examModes, setExamModes)}
                    className="w-4 h-4 accent-[#C81E3D]"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Minimum rating
            </p>
            <div className="flex flex-wrap gap-2">
              {[0, 4, 4.2, 4.5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setMinRating(r);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold transition-all ${
                    minRating === r
                      ? "bg-[#C81E3D] text-white"
                      : "bg-slate-50 border border-gray-100 text-slate-500 hover:border-rose-200 hover:text-[#C81E3D]"
                  }`}
                >
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-500 font-semibold">
              Showing{" "}
              <span className="font-extrabold text-[#1E293B]">
                {filtered.length === 0 ? 0 : start + 1}–{Math.min(start + ITEMS_PER_PAGE, filtered.length)}
              </span>{" "}
              of <span className="font-extrabold text-[#1E293B]">{filtered.length}</span> universities
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Sort</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortKey);
                  setPage(1);
                }}
                aria-label="Sort universities"
                className="h-10 px-4 rounded-xl border border-gray-200 bg-white text-xs font-extrabold text-[#1E293B] focus:border-[#C81E3D] focus:ring-2 focus:ring-rose-100 outline-none transition-all cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4">
              <span className="w-14 h-14 mx-auto rounded-2xl bg-[#FFF1F2] flex items-center justify-center">
                <Icons.SearchX size={24} className="text-[#C81E3D]" />
              </span>
              <h3 className="text-lg font-extrabold text-[#1E293B]">No universities match those filters</h3>
              <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
                Try widening the fee range or removing an accreditation filter.
              </p>
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-2 h-11 px-6 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-sm transition-all"
              >
                <Icons.RotateCcw size={15} />
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {visible.map(({ college, details, roi }) => {
                const badges = badgeRules.filter((rule) => rule.test(details, college));
                return (
                  <Link
                    key={college.id}
                    href={`/universities/${college.id}`}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                  >
                    <div className="relative h-36 overflow-hidden bg-slate-100">
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="inline-flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1 text-[11px] font-extrabold text-black">
                          <Icons.Star size={11} className="fill-yellow-400 text-yellow-400" />
                          {college.rating}
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <ShortlistButton collegeId={college.id} />
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-sm font-extrabold text-[#1E293B] group-hover:text-[#C81E3D] transition-colors leading-tight">
                        {college.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-bold mt-1 flex items-center gap-1">
                        <Icons.MapPin size={10} className="text-[#C81E3D]" />
                        {college.location}
                      </p>

                      {badges.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {badges.slice(0, 2).map((badge) => {
                            const BadgeIcon = badgeIcons[badge.icon] ?? Icons.Sparkles;
                            return (
                              <span
                                key={badge.label}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black ${toneClasses[badge.tone]}`}
                              >
                                <BadgeIcon size={9} />
                                {badge.label}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Fee</p>
                          <p className="text-xs font-black text-[#1E293B] mt-0.5">
                            ₹{(details.totalFee / 100000).toFixed(2)}L
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Package</p>
                          <p className="text-xs font-black text-[#1E293B] mt-0.5">
                            ₹{details.avgPackageLpa}L
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">5Y gain</p>
                          <p className="text-xs font-black text-[#1E293B] mt-0.5">
                            {roi.fiveYearNetGain >= 0 ? "+" : ""}
                            {Math.round(roi.fiveYearNetGain / 100000)}L
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 mt-3 flex-1">
                        {college.description}
                      </p>

                      <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
                        <RatingStars value={college.rating} size={12} showValue={false} reviewCount={college.totalReviews} />
                        <span className="text-[11px] font-extrabold text-[#C81E3D] group-hover:underline">
                          View details
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {filtered.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          )}
        </div>
      </div>

      <div className="bg-[#C81E3D] rounded-3xl p-10 md:p-14 text-white space-y-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
          Not sure which university to choose?
        </h2>
        <p className="text-rose-100 text-sm sm:text-base font-medium max-w-xl mx-auto">
          Get free expert counselling to find the best university matched to your goals and budget.
        </p>
        <PopupTrigger className="inline-flex items-center gap-2 h-12 px-8 bg-white text-[#C81E3D] font-extrabold rounded-full shadow-lg hover:bg-gray-100 transition-all text-sm">
          <Icons.Phone size={16} />
          Talk to an Expert
        </PopupTrigger>
      </div>
    </div>
  );
};

export default UniversityDirectory;
