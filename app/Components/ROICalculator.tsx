"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { collegeReviews } from "../data/colleges";
import { getUniversityDetailsOrDefaults } from "../data/university-details";
import { salaryBenchmarks } from "../lib/roi";
import { calculateRoi, formatBreakeven, formatInr, formatLpa } from "../lib/roi";
import PopupTrigger from "./PopupTrigger";

interface ROICalculatorProps {
  /** Lock the university selector and preset the fee. */
  lockedCollegeId?: string;
  defaultDomain?: string;
  /** Compact single-university widget for detail pages. */
  variant?: "full" | "widget";
  className?: string;
}

const SALARY_STEPS = [300000, 500000, 700000, 900000, 1200000, 1500000, 2000000, 3000000];

const ROICalculator: React.FC<ROICalculatorProps> = ({
  lockedCollegeId,
  defaultDomain,
  variant = "full",
  className = "",
}) => {
  const [collegeId, setCollegeId] = useState(lockedCollegeId ?? "lpu-online");
  const [domain, setDomain] = useState(defaultDomain ?? "general-mba");
  const [syncedDomain, setSyncedDomain] = useState(defaultDomain);
  const [salary, setSalary] = useState(900000);
  const [customSalary, setCustomSalary] = useState("");
  const [aidPercent, setAidPercent] = useState(0);

  // Adjust state during render when the page hands down a different domain.
  if (defaultDomain !== syncedDomain) {
    setSyncedDomain(defaultDomain);
    if (defaultDomain) setDomain(defaultDomain);
  }

  const details = useMemo(() => getUniversityDetailsOrDefaults(collegeId), [collegeId]);

  const effectiveSalary = customSalary ? Number(customSalary) || 0 : salary;

  const result = useMemo(
    () =>
      calculateRoi({
        currentAnnualSalary: effectiveSalary,
        programFee: details.totalFee,
        monthlyEmi: details.emiMonthly,
        domainSlug: domain,
        studyYears: details.emiTenureMonths >= 24 ? 2 : 1,
        aidPercent,
      }),
    [effectiveSalary, details, domain, aidPercent]
  );

  const maxNet = Math.max(...result.years.map((y) => Math.abs(y.netBenefit)), 1);
  const isWidget = variant === "widget";

  if (isWidget) {
    return (
      <div className={`bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
        <div className="bg-gradient-to-r from-[#C81E3D] to-[#E8577F] px-6 sm:px-8 py-6">
          <p className="text-white/80 text-[11px] font-extrabold uppercase tracking-[0.15em]">
            ROI Estimator
          </p>
          <h3 className="text-white text-xl font-black mt-1.5 tracking-tight">
            What would this degree do to your salary?
          </h3>
          <p className="text-rose-100 text-xs font-medium mt-2 leading-relaxed">
            Slide to your current package. We project the post-MBA range using {details.hiringPartners.toLocaleString("en-IN")}+
            {" "}hiring partner placement data.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-7">
          <div>
            <div className="flex items-end justify-between gap-3 mb-3">
              <label htmlFor={`salary-slider-${collegeId}`} className="text-xs font-extrabold text-[#1E293B]">
                Your current annual salary
              </label>
              <span className="text-base font-black text-[#C81E3D]">{formatLpa(effectiveSalary / 100000)}</span>
            </div>
            <input
              id={`salary-slider-${collegeId}`}
              type="range"
              min={0}
              max={SALARY_STEPS.length - 1}
              step={1}
              value={Math.max(0, SALARY_STEPS.findIndex((s) => s >= effectiveSalary))}
              onChange={(e) => {
                setCustomSalary("");
                setSalary(SALARY_STEPS[Number(e.target.value)]);
              }}
              className="w-full accent-[#C81E3D]"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1.5">
              <span>{formatLpa(SALARY_STEPS[0] / 100000)}</span>
              <span>{formatLpa(SALARY_STEPS[SALARY_STEPS.length - 1] / 100000)}</span>
            </div>
          </div>

          <div>
            <label htmlFor={`domain-select-${collegeId}`} className="block text-xs font-extrabold text-[#1E293B] mb-2.5">
              Target domain
            </label>
            <select
              id={`domain-select-${collegeId}`}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-bold text-[#1E293B] focus:border-[#C81E3D] focus:ring-2 focus:ring-rose-100 outline-none transition-all cursor-pointer"
            >
              {salaryBenchmarks.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.title} · {formatLpa(b.entryLpa)}–{formatLpa(b.seniorLpa)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#FFF1F2] rounded-2xl p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#C81E3D]">
                Projected package
              </p>
              <p className="text-xl font-black text-[#1E293B] mt-1.5">
                {formatLpa(result.projectedSalary / 100000)}
              </p>
              <p className="text-[10px] font-bold text-slate-500 mt-1">
                +{result.benchmark.mbaUpliftPercent}% typical uplift
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                Break-even
              </p>
              <p className="text-xl font-black text-[#1E293B] mt-1.5">
                {formatBreakeven(result.timeToBreakevenMonths)}
              </p>
              <p className="text-[10px] font-bold text-slate-500 mt-1">from month of joining</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
            Projections use published placement bands and a 9% annual raise assumption. They are an
            estimate, not a guarantee of salary.
          </p>

          <Link
            href={`/roi-calculator?university=${collegeId}&domain=${domain}`}
            className="inline-flex items-center justify-center gap-2 w-full h-12 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-sm shadow-lg transition-all"
          >
            <Icons.Calculator size={16} />
            Open full ROI breakdown
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-sm lg:sticky lg:top-28 space-y-6">
          <h3 className="text-sm font-extrabold text-[#1E293B] flex items-center gap-2">
            <Icons.SlidersHorizontal size={16} className="text-[#C81E3D]" />
            Your inputs
          </h3>

          <div>
            <label htmlFor="roi-college" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              University
            </label>
            <select
              id="roi-college"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              disabled={Boolean(lockedCollegeId)}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-bold text-[#1E293B] focus:border-[#C81E3D] focus:ring-2 focus:ring-rose-100 outline-none transition-all cursor-pointer disabled:bg-slate-50 disabled:text-slate-400"
            >
              {collegeReviews.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · ₹{formatInr(getUniversityDetailsOrDefaults(c.id).totalFee)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="roi-salary" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Current annual salary
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 pointer-events-none">
                ₹
              </span>
              <input
                id="roi-salary"
                type="number"
                min={0}
                step={50000}
                value={customSalary || salary}
                onChange={(e) => setCustomSalary(e.target.value)}
                className="w-full h-12 pl-8 pr-4 rounded-xl border border-gray-200 text-sm font-extrabold text-[#1E293B] focus:border-[#C81E3D] focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              />
            </div>
            <input
              type="range"
              min={0}
              max={SALARY_STEPS.length - 1}
              step={1}
              value={Math.max(0, SALARY_STEPS.findIndex((s) => s >= effectiveSalary))}
              onChange={(e) => {
                setCustomSalary("");
                setSalary(SALARY_STEPS[Number(e.target.value)]);
              }}
              aria-label="Current annual salary slider"
              className="w-full accent-[#C81E3D] mt-3"
            />
          </div>

          <div>
            <label htmlFor="roi-domain" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Target domain
            </label>
            <select
              id="roi-domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-bold text-[#1E293B] focus:border-[#C81E3D] focus:ring-2 focus:ring-rose-100 outline-none transition-all cursor-pointer"
            >
              {salaryBenchmarks.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="roi-aid" className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Scholarship / aid
              </label>
              <span className="text-xs font-black text-[#C81E3D]">{aidPercent}%</span>
            </div>
            <input
              id="roi-aid"
              type="range"
              min={0}
              max={75}
              step={5}
              value={aidPercent}
              onChange={(e) => setAidPercent(Number(e.target.value))}
              className="w-full accent-[#C81E3D]"
            />
            <p className="text-[10px] text-slate-400 font-semibold mt-1.5">
              {aidPercent > 0
                ? `Fee reduced by ${formatInr(result.aidAmount)} to ${formatInr(result.netFee)}`
                : "Check your eligibility on the scholarships page"}
            </p>
          </div>

          <div className="pt-5 border-t border-gray-100 space-y-2.5">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Programme cost
            </p>
            {[
              { label: "Total fee", value: formatInr(result.grossFee) },
              {
                label: result.aidAmount > 0 ? "Fee after aid" : "Monthly EMI",
                value: result.aidAmount > 0 ? formatInr(result.netFee) : `₹${result.emiMonths}/mo`,
              },
              { label: "EMI interest", value: details.emiInterestRate === 0 ? "0%" : `${details.emiInterestRate}%` },
              { label: "Study period", value: `${result.studyYears} years` },
              { label: "Opportunity cost", value: formatInr(result.opportunityCost) },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-500">{row.label}</span>
                <span className="text-xs font-black text-[#1E293B]">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Projected package",
                value: formatLpa(result.projectedSalary / 100000),
                sub: `+${result.benchmark.mbaUpliftPercent}% uplift`,
                icon: Icons.TrendingUp,
                tone: "bg-[#FFF1F2] text-[#C81E3D]",
              },
              {
                label: "Monthly gain",
                value: formatInr(result.monthlyGain),
                sub: "after joining",
                icon: Icons.Wallet,
                tone: "bg-emerald-50 text-emerald-700",
              },
              {
                label: "Break-even",
                value: formatBreakeven(result.timeToBreakevenMonths),
                sub: "from start",
                icon: Icons.Timer,
                tone: "bg-violet-50 text-violet-700",
              },
              {
                label: "5-year net gain",
                value: formatInr(result.fiveYearNetGain),
                sub: `${result.roiPercentAtCompletion}% ROI at exit`,
                icon: Icons.PiggyBank,
                tone: "bg-amber-50 text-amber-700",
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.tone}`}>
                  <stat.icon size={17} />
                </span>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-3">
                  {stat.label}
                </p>
                <p className="text-lg font-black text-[#1E293B] mt-1 leading-tight">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h3 className="text-sm font-extrabold text-[#1E293B]">Cumulative net benefit by year</h3>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#C81E3D]" />
                  Post-MBA net
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-slate-200" />
                  Outlay (fee + opportunity)
                </span>
              </div>
            </div>

            <div className="flex items-end gap-1.5 sm:gap-3 h-56">
              {result.years.map((y) => {
                const barHeight = (Math.abs(y.netBenefit) / maxNet) * 100;
                const isNegative = y.netBenefit < 0;
                return (
                  <div key={y.year} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                    <span className="text-[9px] font-black text-[#1E293B] whitespace-nowrap">
                      {Math.abs(Math.round(y.netBenefit / 1000))}K
                    </span>
                    <div className="w-full h-full flex items-end">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          isNegative ? "bg-slate-200" : "bg-gradient-to-t from-[#C81E3D] to-[#E8577F]"
                        }`}
                        style={{ height: `${Math.max(3, barHeight)}%` }}
                        title={`Year ${y.year}: net ${formatInr(y.netBenefit)}`}
                      />
                    </div>
                    <span className="text-[9px] font-extrabold text-slate-400">Y{y.year}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 overflow-x-auto">
              <table className="w-full min-w-[540px] text-left">
                <thead>
                  <tr className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <th className="pb-3">Year</th>
                    <th className="pb-3 text-right">Post-MBA</th>
                    <th className="pb-3 text-right">Without MBA</th>
                    <th className="pb-3 text-right">Cumulative gain</th>
                    <th className="pb-3 text-right">Net benefit</th>
                    <th className="pb-3 text-right">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {result.years.map((y) => (
                    <tr key={y.year} className="border-t border-gray-100 text-xs font-bold">
                      <td className="py-2.5 text-[#1E293B]">Year {y.year}</td>
                      <td className="py-2.5 text-right text-[#1E293B]">{formatLpa(y.postMbaSalary / 100000)}</td>
                      <td className="py-2.5 text-right text-slate-400">{formatLpa(y.baselineSalary / 100000)}</td>
                      <td className="py-2.5 text-right text-slate-500">{formatInr(y.cumulativeGain)}</td>
                      <td
                        className={`py-2.5 text-right ${y.netBenefit < 0 ? "text-amber-600" : "text-emerald-600"}`}
                      >
                        {y.netBenefit < 0 ? "" : "+"}
                        {formatInr(y.netBenefit)}
                      </td>
                      <td className="py-2.5 text-right text-[#C81E3D]">{y.roiPercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h3 className="text-sm font-extrabold text-[#1E293B] mb-5">What this implies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                  Likely roles in {result.benchmark.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.benchmark.topRoles.map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-1 rounded-full bg-slate-50 border border-gray-100 text-[11px] font-bold text-slate-600"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                  Salary bands
                </p>
                {[
                  { label: "Entry", value: result.benchmark.entryLpa },
                  { label: "Mid-career", value: result.benchmark.midLpa },
                  { label: "Senior", value: result.benchmark.seniorLpa },
                ].map((band) => (
                  <div key={band.label} className="flex items-center justify-between py-1.5">
                    <span className="text-xs font-semibold text-slate-500">{band.label}</span>
                    <span className="text-xs font-black text-[#1E293B]">{formatLpa(band.value)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-[11px] font-bold text-amber-800 leading-relaxed">
                <Icons.Info size={12} className="inline mr-1.5 -mt-0.5" />
                These figures are modelled from published placement bands, not individual outcomes. A
                real result depends on your industry, location and the effort you put in during the
                programme.
              </p>
            </div>
          </div>

          <div className="bg-[#C81E3D] rounded-3xl p-8 sm:p-10 text-white space-y-5 text-center">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Want a counsellor to sanity-check these numbers?
            </h3>
            <p className="text-rose-100 text-sm font-medium max-w-md mx-auto">
              Share your real profile and we will run the same projection against your specific
              industry and city, then flag anything that looks off.
            </p>
            <PopupTrigger className="inline-flex items-center gap-2 h-12 px-8 bg-white text-[#C81E3D] font-extrabold rounded-full shadow-lg hover:bg-gray-100 transition-all text-sm">
              <Icons.Phone size={16} />
              Talk to an expert
            </PopupTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
