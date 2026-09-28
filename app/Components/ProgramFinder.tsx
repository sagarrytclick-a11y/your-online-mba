"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import {
  approvalOptions,
  budgetBands,
  experienceBands,
  goalOptions,
  type ApprovalOption,
  type BudgetBand,
  type ExperienceBand,
  type GoalOption,
} from "../data/finder";
import { specialisations } from "../data/specialisations";
import { finderStepMeta, finderStepOrder, finderUrl, type FinderCriteria, type FinderStepId } from "../lib/finder";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TrendingUp: Icons.TrendingUp,
  Repeat: Icons.RefreshCw,
  Users: Icons.Users,
  Rocket: Icons.Rocket,
  Globe: Icons.Globe,
  ShieldCheck: Icons.ShieldCheck,
  Award: Icons.Award,
  Trophy: Icons.Trophy,
  Zap: Icons.Zap,
  CreditCard: Icons.CreditCard,
  Briefcase: Icons.Briefcase,
};

function StepIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Cmp = iconMap[name] ?? Icons.Check;
  return <Cmp size={size} />;
}

interface ProgramFinderProps {
  /** Compact layout for embedding in a homepage section. */
  compact?: boolean;
  initialCriteria?: FinderCriteria;
  autoStart?: boolean;
  className?: string;
}

const ProgramFinder: React.FC<ProgramFinderProps> = ({
  compact = false,
  initialCriteria,
  autoStart = false,
  className = "",
}) => {
  const router = useRouter();
  const [started, setStarted] = useState(autoStart);
  const [stepIndex, setStepIndex] = useState(0);
  const [criteria, setCriteria] = useState<FinderCriteria>(initialCriteria ?? {});

  const step: FinderStepId = finderStepOrder[stepIndex];
  const meta = finderStepMeta[step];
  const progress = ((stepIndex + 1) / finderStepOrder.length) * 100;

  const resultsHref = useMemo(() => finderUrl(criteria), [criteria]);

  const selectBudget = (band: BudgetBand) => {
    setCriteria((p) => ({ ...p, budget: band.id }));
  };

  const selectDomain = (slug: string) => {
    setCriteria((p) => ({ ...p, domain: slug }));
  };

  const selectExperience = (band: ExperienceBand) => {
    setCriteria((p) => ({ ...p, experience: band.id }));
  };

  const toggleApproval = (option: ApprovalOption) => {
    setCriteria((p) => {
      const current = p.approvals ?? [];
      return {
        ...p,
        approvals: current.includes(option.id)
          ? current.filter((a) => a !== option.id)
          : [...current, option.id],
      };
    });
  };

  const selectGoal = (goal: GoalOption) => {
    setCriteria((p) => ({ ...p, goal: goal.id }));
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case "budget":
        return Boolean(criteria.budget);
      case "domain":
        return Boolean(criteria.domain);
      case "experience":
        return Boolean(criteria.experience);
      case "approval":
        return true;
      case "goal":
        return Boolean(criteria.goal);
      default:
        return true;
    }
  };

  const goNext = () => {
    if (stepIndex === finderStepOrder.length - 1) {
      router.push(resultsHref);
      return;
    }
    setStepIndex((i) => Math.min(finderStepOrder.length - 1, i + 1));
  };

  const goBack = () => {
    if (stepIndex === 0) {
      setStarted(false);
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const restart = () => {
    setCriteria({});
    setStepIndex(0);
  };

  if (!started) {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-sm ${className}`}
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FFF1F2] blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-rose-50 blur-3xl" aria-hidden="true" />
        <div className="relative space-y-6 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F2] text-[#C81E3D] border border-rose-100 text-[11px] font-extrabold uppercase tracking-[0.15em]">
            <Icons.Wand2 size={12} />
            Guided Finder
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E293B] tracking-tight leading-tight">
            Find the online MBA that actually fits you
          </h3>
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            Answer five quick questions about your budget, specialisation and career goal. We score
            every UGC-approved programme against your answers and show you the top matches, ranked
            with reasons.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              { label: "22 universities scored", icon: Icons.Building2 },
              { label: "5 questions, ~60 seconds", icon: Icons.Clock },
              { label: "No sign-up required", icon: Icons.CheckCircle2 },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-50 border border-gray-100 text-[11px] sm:text-xs font-bold text-slate-600"
              >
                <item.icon size={13} className="text-[#C81E3D]" />
                {item.label}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="inline-flex items-center gap-2 h-12 px-8 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-sm shadow-lg shadow-rose-200 transition-all active:scale-[0.98]"
          >
            <Icons.Play size={16} />
            Start the finder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden ${className}`}
    >
      <div className="h-1.5 w-full bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-[#C81E3D] to-[#E8577F] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`px-6 sm:px-10 ${compact ? "py-8" : "py-10 sm:py-12"}`}>
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#C81E3D]">
            Step {stepIndex + 1} of {finderStepOrder.length} · {meta.label}
          </span>
          <button
            type="button"
            onClick={restart}
            className="text-[11px] font-bold text-slate-400 hover:text-[#C81E3D] transition-colors"
          >
            Reset
          </button>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight mt-2">
          {meta.question}
        </h3>
        <p className="text-sm text-slate-500 font-medium mt-2 mb-8">{meta.helper}</p>

        {step === "budget" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {budgetBands.map((band) => {
              const isActive = criteria.budget === band.id;
              return (
                <button
                  key={band.id}
                  type="button"
                  onClick={() => selectBudget(band)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${
                    isActive
                      ? "border-[#C81E3D] bg-[#FFF1F2] shadow-sm"
                      : "border-gray-100 hover:border-rose-200 hover:bg-rose-50/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`text-sm font-extrabold ${isActive ? "text-[#C81E3D]" : "text-[#1E293B]"}`}
                    >
                      {band.label}
                    </span>
                    {isActive && <Icons.CheckCircle2 size={18} className="text-[#C81E3D] shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                    {band.description}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {step === "domain" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {specialisations.map((spec) => {
              const isActive = criteria.domain === spec.slug;
              return (
                <button
                  key={spec.slug}
                  type="button"
                  onClick={() => selectDomain(spec.slug)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all ${
                    isActive
                      ? "border-[#C81E3D] bg-[#FFF1F2] shadow-sm"
                      : "border-gray-100 hover:border-rose-200 hover:bg-rose-50/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-xs sm:text-sm font-extrabold leading-snug ${isActive ? "text-[#C81E3D]" : "text-[#1E293B]"}`}
                    >
                      {spec.title}
                    </span>
                    {isActive && <Icons.CheckCircle2 size={16} className="text-[#C81E3D] shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold mt-1.5">{spec.salaryRange}</p>
                </button>
              );
            })}
          </div>
        )}

        {step === "experience" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {experienceBands.map((band) => {
              const isActive = criteria.experience === band.id;
              return (
                <button
                  key={band.id}
                  type="button"
                  onClick={() => selectExperience(band)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${
                    isActive
                      ? "border-[#C81E3D] bg-[#FFF1F2] shadow-sm"
                      : "border-gray-100 hover:border-rose-200 hover:bg-rose-50/30"
                  }`}
                >
                  <span
                    className={`block text-base font-black ${isActive ? "text-[#C81E3D]" : "text-[#1E293B]"}`}
                  >
                    {band.label}
                  </span>
                  <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                    {band.description}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {step === "approval" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {approvalOptions.map((option) => {
              const isActive = (criteria.approvals ?? []).includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleApproval(option)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${
                    isActive
                      ? "border-[#C81E3D] bg-[#FFF1F2] shadow-sm"
                      : "border-gray-100 hover:border-rose-200 hover:bg-rose-50/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? "bg-[#C81E3D] text-white" : "bg-[#FFF1F2] text-[#C81E3D]"
                      }`}
                    >
                      <StepIcon name={option.icon} size={17} />
                    </span>
                    <div className="min-w-0">
                      <span
                        className={`block text-sm font-extrabold ${isActive ? "text-[#C81E3D]" : "text-[#1E293B]"}`}
                      >
                        {option.label}
                      </span>
                      <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {step === "goal" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {goalOptions.map((goal) => {
              const isActive = criteria.goal === goal.id;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => selectGoal(goal)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${
                    isActive
                      ? "border-[#C81E3D] bg-[#FFF1F2] shadow-sm"
                      : "border-gray-100 hover:border-rose-200 hover:bg-rose-50/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? "bg-[#C81E3D] text-white" : "bg-[#FFF1F2] text-[#C81E3D]"
                      }`}
                    >
                      <StepIcon name={goal.icon} size={17} />
                    </span>
                    <div className="min-w-0">
                      <span
                        className={`block text-sm font-extrabold ${isActive ? "text-[#C81E3D]" : "text-[#1E293B]"}`}
                      >
                        {goal.label}
                      </span>
                      <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                        {goal.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 mt-10 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-gray-200 text-slate-500 hover:text-[#C81E3D] hover:border-[#C81E3D] text-sm font-extrabold transition-all"
          >
            <Icons.ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-3">
            {step === "approval" && (
              <button
                type="button"
                onClick={goNext}
                className="h-12 px-5 rounded-full text-sm font-bold text-slate-400 hover:text-[#1E293B] transition-colors"
              >
                Skip
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance()}
              className="inline-flex items-center gap-2 h-12 px-7 bg-[#C81E3D] hover:bg-[#B01A33] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold rounded-full text-sm shadow-lg shadow-rose-100 transition-all active:scale-[0.98]"
            >
              {stepIndex === finderStepOrder.length - 1 ? "See my matches" : "Continue"}
              <Icons.ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramFinder;
