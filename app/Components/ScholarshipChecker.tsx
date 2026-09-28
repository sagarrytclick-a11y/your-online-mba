"use client";
import React, { useState, useMemo } from "react";
import * as Icons from "lucide-react";
import {
  scholarships,
  emiPartners,
  calculateEmiPlans,
  categoryLabels,
  type Scholarship,
  type ScholarshipCategory,
} from "../data/scholarships";
import { collegeReviews } from "../data/colleges";
import { getUniversityDetailsOrDefaults } from "../data/university-details";
import PopupTrigger from "./PopupTrigger";
import { formatInr } from "../lib/roi";

interface CheckerState {
  collegeId: string;
  percentage: number;
  category: ScholarshipCategory | "any";
  isFemale: boolean;
  isDefence: boolean;
  familyIncome: number;
}

const defaultState: CheckerState = {
  collegeId: "any",
  percentage: 70,
  category: "any",
  isFemale: false,
  isDefence: false,
  familyIncome: 0,
};

interface EligibilityResult {
  scholarship: Scholarship;
  eligible: boolean;
  reasons: string[];
  blocker: string | null;
  savings: number;
}

function evaluate(
  scholarship: Scholarship,
  state: CheckerState,
  fee: number
): EligibilityResult {
  const reasons: string[] = [];
  let blocker: string | null = null;

  if (scholarship.requiresFemaleProof && !state.isFemale) {
    blocker = "Restricted to female candidates";
  } else if (scholarship.requiresDefenseProof && !state.isDefence) {
    blocker = "Restricted to defence and paramilitary personnel";
  } else if (scholarship.maxFamilyIncome !== undefined && state.familyIncome > scholarship.maxFamilyIncome) {
    blocker = `Requires family income below ${formatInr(scholarship.maxFamilyIncome)}`;
  } else if (scholarship.minPercentage !== undefined && state.percentage < scholarship.minPercentage) {
    blocker = `Requires ${scholarship.minPercentage}% or above in graduation`;
  } else {
    if (scholarship.minPercentage !== undefined) {
      reasons.push(`${state.percentage}% clears the ${scholarship.minPercentage}% threshold`);
    }
    if (scholarship.requiresFemaleProof) reasons.push("Gender criterion met");
    if (scholarship.requiresDefenseProof) reasons.push("Service criterion met");
    if (scholarship.maxFamilyIncome !== undefined) {
      reasons.push(`Income of ${formatInr(state.familyIncome)} is within the ${formatInr(scholarship.maxFamilyIncome)} cap`);
    }
    reasons.push(`${scholarship.deadline}`);
  }

  const savings = scholarship.waiverPercent
    ? Math.round((fee * scholarship.waiverPercent) / 100)
    : Math.min(scholarship.flatAmount, fee);

  return { scholarship, eligible: blocker === null, reasons, blocker, savings };
}

const ScholarshipChecker: React.FC = () => {
  const [state, setState] = useState<CheckerState>(defaultState);
  const [categoryFilter, setCategoryFilter] = useState<ScholarshipCategory | "all">("all");

  const fee = useMemo(() => {
    if (state.collegeId === "any") {
      // Median programme fee keeps the estimate honest when no university is picked.
      const fees = collegeReviews.map((c) => getUniversityDetailsOrDefaults(c.id).totalFee).sort((a, b) => a - b);
      return fees[Math.floor(fees.length / 2)];
    }
    return getUniversityDetailsOrDefaults(state.collegeId).totalFee;
  }, [state.collegeId]);

  const results = useMemo(
    () =>
      scholarships
        .map((s) => evaluate(s, state, fee))
        .sort((a, b) => Number(b.eligible) - Number(a.eligible) || b.savings - a.savings),
    [state, fee]
  );

  const visible = useMemo(
    () => (categoryFilter === "all" ? results : results.filter((r) => r.scholarship.category === categoryFilter)),
    [results, categoryFilter]
  );

  const eligible = results.filter((r) => r.eligible);
  const bestSaving = eligible[0]?.savings ?? 0;
  const potentialSaving = eligible.slice(0, 2).reduce((sum, r) => sum + r.savings, 0);

  const update = <K extends keyof CheckerState>(key: K, value: CheckerState[K]) =>
    setState((p) => ({ ...p, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-sm lg:sticky lg:top-28 space-y-6">
          <h3 className="text-sm font-extrabold text-[#1E293B] flex items-center gap-2">
            <Icons.Sparkles size={16} className="text-[#C81E3D]" />
            Check your eligibility
          </h3>

          <div>
            <label htmlFor="sch-college" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              University
            </label>
            <select
              id="sch-college"
              value={state.collegeId}
              onChange={(e) => update("collegeId", e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-bold text-[#1E293B] focus:border-[#C81E3D] focus:ring-2 focus:ring-rose-100 outline-none transition-all cursor-pointer"
            >
              <option value="any">Any university (median fee)</option>
              {collegeReviews.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="sch-percent" className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Graduation %
              </label>
              <span className="text-xs font-black text-[#C81E3D]">{state.percentage}%</span>
            </div>
            <input
              id="sch-percent"
              type="range"
              min={45}
              max={95}
              step={1}
              value={state.percentage}
              onChange={(e) => update("percentage", Number(e.target.value))}
              className="w-full accent-[#C81E3D]"
            />
          </div>

          <div>
            <label htmlFor="sch-income" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Annual family income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 pointer-events-none">
                ₹
              </span>
              <input
                id="sch-income"
                type="number"
                min={0}
                step={100000}
                value={state.familyIncome}
                onChange={(e) => update("familyIncome", Number(e.target.value) || 0)}
                placeholder="e.g. 600000"
                className="w-full h-12 pl-8 pr-4 rounded-xl border border-gray-200 text-sm font-extrabold text-[#1E293B] focus:border-[#C81E3D] focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={state.isFemale}
                onChange={(e) => update("isFemale", e.target.checked)}
                className="w-4 h-4 accent-[#C81E3D]"
              />
              I am a female candidate
            </label>
            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={state.isDefence}
                onChange={(e) => update("isDefence", e.target.checked)}
                className="w-4 h-4 accent-[#C81E3D]"
              />
              Defence / paramilitary / police
            </label>
          </div>

          <div className="pt-5 border-t border-gray-100 space-y-2.5">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Your estimate
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Programme fee</span>
              <span className="text-xs font-black text-[#1E293B]">{formatInr(fee)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Eligible schemes</span>
              <span className="text-xs font-black text-[#1E293B]">{eligible.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Best single waiver</span>
              <span className="text-xs font-black text-emerald-600">{formatInr(bestSaving)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Stacking top two</span>
              <span className="text-xs font-black text-emerald-600">{formatInr(potentialSaving)}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed pt-1">
              Waivers are indicative. Most universities allow only one merit or institutional
              scholarship per admission, so treat the stacked figure as an upper bound.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["all", "merit", "budget", "women", "defence", "institution"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full text-[11px] font-extrabold transition-all ${
                  categoryFilter === cat
                    ? "bg-[#C81E3D] text-white"
                    : "bg-white border border-gray-100 text-slate-500 hover:border-rose-200 hover:text-[#C81E3D]"
                }`}
              >
                {cat === "all" ? `All (${results.length})` : `${categoryLabels[cat]} (${results.filter((r) => r.scholarship.category === cat).length})`}
              </button>
            ))}
          </div>

          {visible.map(({ scholarship, eligible, reasons, blocker, savings }) => (
            <div
              key={scholarship.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-colors ${
                eligible ? "border-emerald-100" : "border-gray-100 opacity-80"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#1E293B]">
                      {scholarship.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                        eligible
                          ? "bg-emerald-50 border border-emerald-100 text-emerald-700"
                          : "bg-slate-100 border border-gray-100 text-slate-500"
                      }`}
                    >
                      {eligible ? "ELIGIBLE" : "NOT ELIGIBLE"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold mt-1">
                    {scholarship.provider} · {categoryLabels[scholarship.category]}
                  </p>
                </div>
                <div className="flex-shrink-0 text-left sm:text-right">
                  <p className="text-lg font-black text-[#1E293B]">
                    {scholarship.waiverPercent
                      ? `${scholarship.waiverPercent}% off`
                      : `${formatInr(scholarship.flatAmount)} off`}
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600">
                    You save {formatInr(savings)}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-500 font-medium leading-relaxed mt-3">
                {scholarship.eligibility}
              </p>

              {blocker ? (
                <p className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-gray-100 rounded-lg px-3 py-2 mt-3">
                  <Icons.XCircle size={12} className="inline mr-1.5 -mt-0.5 text-slate-400" />
                  {blocker}
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {reasons.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700"
                    >
                      <Icons.Check size={10} />
                      {r}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 pt-4 border-t border-gray-100 text-[10px] font-bold text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Icons.CalendarDays size={11} className="text-[#C81E3D]" />
                  Deadline: {scholarship.deadline}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icons.Users size={11} className="text-[#C81E3D]" />
                  {scholarship.seats} seats
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icons.FileText size={11} className="text-[#C81E3D]" />
                  {scholarship.documents.length} documents
                </span>
                {scholarship.renewable && (
                  <span className="inline-flex items-center gap-1">
                    <Icons.RefreshCw size={11} className="text-[#C81E3D]" />
                    Renewable
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-extrabold text-[#1E293B]">EMI options on {formatInr(fee)}</h3>
        <p className="text-sm text-slate-500 font-medium mt-2">
          Zero-interest university EMI versus a bank loan. Compare total payable, not the monthly
          figure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="rounded-2xl bg-gradient-to-br from-[#C81E3D] to-[#E8577F] p-5 text-white">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/80">
              University zero-interest
            </p>
            <p className="text-2xl font-black mt-1.5">
              ₹{Math.round(fee / 24).toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] font-bold text-rose-100 mt-1">per month for 24 months</p>
            <p className="text-[11px] font-bold text-rose-100 mt-3">
              Total payable {formatInr(fee)} · Interest ₹0
            </p>
          </div>
          {calculateEmiPlans(fee, emiPartners).slice(0, 5).map((plan) => (
            <div key={plan.bank} className="rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-extrabold text-[#1E293B]">{plan.bank}</p>
                <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                  {emiPartners.find((p) => p.bank === plan.bank)?.requiresCreditScore}
                </span>
              </div>
              <p className="text-lg font-black text-[#1E293B] mt-2">
                ₹{plan.monthlyEmi.toLocaleString("en-IN")}
              </p>
              <p className="text-[10px] font-bold text-slate-400">
                {plan.tenureMonths} months · {emiPartners.find((p) => p.bank === plan.bank)?.interestRate}%
              </p>
              <p className="text-[11px] font-bold text-amber-700 mt-2">
                Interest {formatInr(plan.interestPaid)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#C81E3D] rounded-3xl p-8 sm:p-10 text-white space-y-5 text-center">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight">
          Not sure which scholarship to apply for?
        </h3>
        <p className="text-rose-100 text-sm font-medium max-w-md mx-auto">
          Share your profile with a counsellor and we will tell you which schemes you actually qualify
          for, and which one to drop because it stacks badly.
        </p>
        <PopupTrigger className="inline-flex items-center gap-2 h-12 px-8 bg-white text-[#C81E3D] font-extrabold rounded-full shadow-lg hover:bg-gray-100 transition-all text-sm">
          <Icons.Phone size={16} />
          Check my eligibility
        </PopupTrigger>
      </div>
    </div>
  );
};

export default ScholarshipChecker;
