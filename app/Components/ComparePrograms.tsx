"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { useProgramShortlist } from "../context/ProgramShortlistContext";
import { collegeReviews } from "../data/colleges";
import { getUniversityDetailsOrDefaults } from "../data/university-details";
import ScrollReveal from "./ScrollReveal";
import ShortlistButton from "./ShortlistButton";
import RatingStars from "./RatingStars";
import ProgramFinder from "./ProgramFinder";

const ComparePrograms: React.FC = () => {
  const { ids, remove, clear } = useProgramShortlist();

  const selected = useMemo(
    () =>
      ids
        .map((id) => collegeReviews.find((c) => c.id === id))
        .filter((c): c is (typeof collegeReviews)[number] => c !== undefined)
        .map((college) => ({ college, details: getUniversityDetailsOrDefaults(college.id) })),
    [ids]
  );

  if (selected.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 mt-16 space-y-6">
        <div className="bg-white rounded-3xl border border-gray-100 p-10 sm:p-14 text-center shadow-sm space-y-5">
          <span className="w-16 h-16 mx-auto rounded-2xl bg-[#FFF1F2] flex items-center justify-center">
            <Icons.Scale size={30} className="text-[#C81E3D]" />
          </span>
          <h2 className="text-2xl font-black text-[#1E293B] tracking-tight">
            Nothing to compare yet
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
            Add up to three programmes and this page lines them up side by side across fees,
            accreditation, exam mode, NIRF ranking, placement rate and projected return.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/find-my-program"
              className="inline-flex items-center gap-2 h-12 px-7 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-sm shadow-lg transition-all"
            >
              <Icons.Radar size={16} />
              Find my programme
            </Link>
            <Link
              href="/universities"
              className="inline-flex items-center gap-2 h-12 px-7 border-2 border-gray-200 text-slate-600 font-extrabold rounded-full text-sm hover:border-[#C81E3D] hover:text-[#C81E3D] transition-all"
            >
              <Icons.Search size={16} />
              Browse all universities
            </Link>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-center text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">
            Or let the finder shortlist for you
          </p>
          <ProgramFinder compact />
        </div>
      </div>
    );
  }

  const feeValues = selected.map((s) => s.details.totalFee);
  const emiValues = selected.map((s) => s.details.emiMonthly);
  const pkgValues = selected.map((s) => s.details.avgPackageLpa);
  const placementValues = selected.map((s) => s.details.placementRate);
  const upliftValues = selected.map((s) => s.details.salaryUpliftPercent);
  const learnerValues = selected.map((s) => s.details.learnerCount);
  const liveValues = selected.map((s) => s.details.liveClassesPerWeek);
  const classValues = selected.map((s) => s.details.classSize || Number.MAX_SAFE_INTEGER);

  /** `lowerIsBetter` is false for package, placement and class-size style rows. */
  const isRowBest = (values: number[], index: number, lowerIsBetter: boolean): boolean => {
    const valid = values.filter((v) => Number.isFinite(v) && v !== Number.MAX_SAFE_INTEGER);
    if (valid.length === 0) return false;
    const target = lowerIsBetter ? Math.min(...valid) : Math.max(...valid);
    return values[index] === target;
  };

  const cell = (
    values: number[],
    index: number,
    lowerIsBetter: boolean,
    render: React.ReactNode
  ) => ({ render, isBest: isRowBest(values, index, lowerIsBetter) });

  const rows: { label: string; get: (i: number) => { render: React.ReactNode; isBest: boolean } }[] = [
    {
      label: "Total fee",
      get: (i) => cell(feeValues, i, true, `₹${(feeValues[i] / 100000).toFixed(2)} L`),
    },
    {
      label: "Monthly EMI",
      get: (i) => cell(emiValues, i, true, `₹${emiValues[i].toLocaleString("en-IN")}`),
    },
    {
      label: "EMI interest",
      get: (i) => ({
        render: selected[i].details.emiInterestRate === 0 ? "0% — interest free" : `${selected[i].details.emiInterestRate}%`,
        isBest: selected[i].details.emiInterestRate === 0,
      }),
    },
    { label: "EMI tenure", get: (i) => ({ render: `${selected[i].details.emiTenureMonths} months`, isBest: false }) },
    {
      label: "Approvals",
      get: (i) => ({
        render: (
          <div className="flex flex-wrap gap-1 justify-center">
            {selected[i].details.approvals.map((a) => (
              <span
                key={a}
                className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-[9px] font-extrabold text-emerald-700"
              >
                {a}
              </span>
            ))}
          </div>
        ),
        isBest: selected[i].details.approvals.includes("UGC-DEB"),
      }),
    },
    { label: "NAAC grade", get: (i) => ({ render: selected[i].details.naacGrade, isBest: selected[i].details.naacGrade === "A++" }) },
    {
      label: "NIRF rank",
      get: (i) => {
        const rank = selected[i].details.nirfRank;
        const ranks = selected.filter((s) => s.details.nirfRank !== null).map((s) => s.details.nirfRank as number);
        return {
          render: rank ? `#${rank} (${selected[i].details.nirfCategory})` : "Not ranked",
          isBest: rank !== null && rank === Math.min(...ranks),
        };
      },
    },
    {
      label: "Exam modes",
      get: (i) => ({
        render: <span className="text-[11px]">{selected[i].details.examModes.join(" · ")}</span>,
        isBest: selected[i].details.examModes.includes("Online Proctored"),
      }),
    },
    {
      label: "Live classes / week",
      get: (i) =>
        cell(liveValues, i, false, liveValues[i] === 0 ? "Self-paced" : `${liveValues[i]} sessions`),
    },
    { label: "Duration", get: (i) => ({ render: selected[i].college.coursesCount, isBest: false }) },
    {
      label: "Class size",
      get: (i) =>
        cell(
          classValues,
          i,
          true,
          classValues[i] === Number.MAX_SAFE_INTEGER ? "Open cohort" : `${classValues[i]} students`
        ),
    },
    {
      label: "Average package",
      get: (i) => cell(pkgValues, i, false, `₹${pkgValues[i]} LPA`),
    },
    {
      label: "Salary uplift",
      get: (i) => cell(upliftValues, i, false, `+${upliftValues[i]}%`),
    },
    {
      label: "Placement rate",
      get: (i) => cell(placementValues, i, false, `${placementValues[i]}%`),
    },
    {
      label: "Hiring partners",
      get: (i) =>
        cell(
          selected.map((s) => s.details.hiringPartners),
          i,
          false,
          selected[i].details.hiringPartners.toLocaleString("en-IN")
        ),
    },
    {
      label: "Learner count",
      get: (i) => cell(learnerValues, i, false, learnerValues[i].toLocaleString("en-IN")),
    },
    {
      label: "Alumni network",
      get: (i) =>
        cell(
          selected.map((s) => s.details.alumniCount),
          i,
          false,
          `${(selected[i].details.alumniCount / 1000).toFixed(0)}K+`
        ),
    },
    { label: "Established", get: (i) => ({ render: String(selected[i].details.established), isBest: false }) },
    { label: "Location", get: (i) => ({ render: selected[i].college.location, isBest: false }) },
    {
      label: "Student rating",
      get: (i) => ({
        render: (
          <div className="flex justify-center">
            <RatingStars value={selected[i].college.rating} size={12} reviewCount={selected[i].college.totalReviews} />
          </div>
        ),
        isBest: selected[i].college.rating === Math.max(...selected.map((s) => s.college.rating)),
      }),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-sm text-slate-500 font-medium">
          <span className="font-extrabold text-[#1E293B]">{selected.length}</span> of 3 programmes
          selected. Best value in each row is highlighted in rose.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-2 h-10 px-5 border border-gray-200 rounded-full text-sm font-bold text-slate-500 hover:text-[#C81E3D] hover:border-[#C81E3D] transition-all"
          >
            <Icons.Trash2 size={14} />
            Clear all
          </button>
          {selected.length < 3 && (
            <Link
              href="/find-my-program"
              className="inline-flex items-center gap-2 h-10 px-5 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-sm shadow-md transition-all"
            >
              <Icons.Plus size={14} />
              Add more
            </Link>
          )}
        </div>
      </div>

      <ScrollReveal>
        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[720px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 bg-[#FAFBFD] z-10 min-w-[170px] p-4 border border-gray-200 rounded-tl-2xl text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Criteria
                </th>
                {selected.map(({ college, details }, i) => (
                  <th
                    key={college.id}
                    className={`min-w-[220px] p-4 border border-gray-200 text-center bg-white ${
                      i === selected.length - 1 ? "last:rounded-tr-2xl" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 ring-2 ring-gray-100">
                          <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(college.id)}
                          aria-label={`Remove ${college.name} from comparison`}
                          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#C81E3D] text-white flex items-center justify-center shadow-md hover:bg-[#B01A33] transition-colors"
                        >
                          <Icons.X size={12} />
                        </button>
                      </div>
                      <Link
                        href={`/universities/${college.id}`}
                        className="font-extrabold text-sm text-[#1E293B] hover:text-[#C81E3D] transition-colors leading-tight"
                      >
                        {college.name}
                      </Link>
                      <span className="text-[10px] font-bold text-slate-400">
                        ₹{(details.totalFee / 100000).toFixed(2)} L · {details.naacGrade}
                      </span>
                      <Link
                        href={`/roi-calculator?university=${college.id}`}
                        className="text-[10px] font-extrabold text-[#C81E3D] hover:underline uppercase tracking-wider"
                      >
                        Run ROI
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.label}>
                  <td
                    className={`sticky left-0 bg-[#FAFBFD] z-10 p-4 border border-gray-200 text-[11px] font-black uppercase tracking-wider text-slate-400 ${
                      rowIndex === rows.length - 1 ? "rounded-bl-2xl" : ""
                    }`}
                  >
                    {row.label}
                  </td>
                  {selected.map(({ college }, i) => {
                    const { render, isBest } = row.get(i);
                    return (
                      <td
                        key={college.id}
                        className="p-4 border border-gray-200 text-center bg-white align-middle"
                      >
                        <span
                          className={`text-xs font-extrabold inline-block ${
                            isBest ? "text-[#C81E3D]" : "text-slate-600"
                          }`}
                        >
                          {render}
                        </span>
                        {isBest && (
                          <span className="block mt-1">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FFF1F2] text-[9px] font-black text-[#C81E3D]">
                              <Icons.Sparkles size={9} />
                              BEST
                            </span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="sticky left-0 bg-[#FAFBFD] z-10 p-4 border border-gray-200 text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Action
                </td>
                {selected.map(({ college }, i) => (
                  <td
                    key={college.id}
                    className={`p-4 border border-gray-200 text-center bg-white ${
                      i === selected.length - 1 ? "last:rounded-br-2xl" : ""
                    }`}
                  >
                    <Link
                      href={`/universities/${college.id}`}
                      className="inline-flex items-center gap-1.5 h-10 px-5 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-xs shadow-md transition-all"
                    >
                      Apply now
                      <Icons.ArrowRight size={13} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {selected.map(({ college, details }) => (
          <div key={college.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm font-extrabold text-[#1E293B]">{college.name}</p>
            <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed line-clamp-3">
              {college.description}
            </p>
            <div className="mt-4">
              <ShortlistButton collegeId={college.id} variant="full" className="w-full" />
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-3 text-center">
              {details.examPrepSupport}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePrograms;
