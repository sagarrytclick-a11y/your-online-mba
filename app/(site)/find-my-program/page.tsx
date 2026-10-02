import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import ProgramFinder from "../../Components/ProgramFinder";
import FinderResults from "../../Components/FinderResults";
import ScrollReveal from "../../Components/ScrollReveal";
import JsonLd from "../../Components/JsonLd";
import PopupTrigger from "../../Components/PopupTrigger";
import { approvalOptions, budgetBands, experienceBands, goalOptions } from "../../data/finder";
import { getSpecialisationBySlug } from "../../data/specialisations";
import { criteriaFromSearchParams, matchUniversities, type FinderCriteria } from "../../lib/finder";
import { buildMetadata, breadcrumbJsonLd } from "../../lib/seo";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = buildMetadata({
  title: "Find My Online MBA - Matched Universities in 60 Seconds",
  description:
    "Answer five questions about your budget, specialisation and career goal and get a ranked shortlist of UGC-approved online MBA universities with fees, ROI and match reasons.",
  path: "/find-my-program",
  keywords: [
    "find online MBA",
    "online MBA matcher",
    "which online MBA is best for me",
    "online MBA quiz India",
  ],
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Find My Program", path: "/find-my-program" },
]);

const CRITERIA_KEYS = ["budget", "domain", "experience", "approvals", "goal"] as const;

function hasAnyCriteria(criteria: FinderCriteria): boolean {
  return CRITERIA_KEYS.some((key) => {
    const value = criteria[key];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });
}

export default async function FindMyProgramPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const criteria = criteriaFromSearchParams(params);
  const isResult = hasAnyCriteria(criteria);

  const budget = budgetBands.find((b) => b.id === criteria.budget);
  const experience = experienceBands.find((b) => b.id === criteria.experience);
  const goal = goalOptions.find((g) => g.id === criteria.goal);
  const spec = criteria.domain ? getSpecialisationBySlug(criteria.domain) : undefined;
  const approvals = approvalOptions.filter((a) => (criteria.approvals ?? []).includes(a.id));

  const matches = isResult ? matchUniversities(criteria).slice(0, 12) : [];
  const inBudgetCount = matches.filter((m) => m.inBudget).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <JsonLd data={breadcrumbSchema} />

      <section className="bg-white border-b border-gray-100 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C81E3D] uppercase tracking-wider"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">Find My Program</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight leading-tight">
              {isResult ? "Your matched online MBA programmes" : "Find my online MBA programme"}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              {isResult
                ? `${matches.length} universities scored against your answers${
                    inBudgetCount > 0
                      ? `, ${inBudgetCount} of them inside your budget band`
                      : ""
                  }. Sorted by overall match.`
                : "Tell us your budget, specialisation and career goal. We score every UGC-approved programme we track and return a ranked shortlist with the reasons behind each match."}
            </p>
          </div>

          {isResult && (
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                budget && { label: `Budget: ${budget.label}`, icon: Icons.Wallet, clear: "budget" },
                spec && { label: `Specialisation: ${spec.title}`, icon: Icons.GraduationCap, clear: "domain" },
                experience && {
                  label: `Experience: ${experience.label}`,
                  icon: Icons.Briefcase,
                  clear: "experience",
                },
                goal && { label: `Goal: ${goal.label}`, icon: Icons.Target, clear: "goal" },
                ...approvals.map((a) => ({
                  label: a.label,
                  icon: Icons.ShieldCheck,
                  clear: `approvals-${a.id}`,
                })),
              ]
                .filter(Boolean)
                .map((chip) => {
                  const c = chip as { label: string; icon: React.ComponentType<{ size?: number }>; clear: string };
                  const next = new URLSearchParams();
                  for (const [key, value] of Object.entries(params)) {
                    const v = Array.isArray(value) ? value[0] : value;
                    if (!v) continue;
                    if (key === c.clear) continue;
                    if (key === "approvals" && c.clear.startsWith("approvals-")) {
                      const remaining = v
                        .split(",")
                        .filter((id) => id !== c.clear.replace("approvals-", ""));
                      if (remaining.length === 0) continue;
                      next.set(key, remaining.join(","));
                      continue;
                    }
                    next.set(key, v);
                  }
                  const href = next.toString() ? `/find-my-program?${next.toString()}` : "/find-my-program";
                  return (
                    <Link
                      key={c.label}
                      href={href}
                      className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#FFF1F2] border border-rose-100 text-[11px] font-extrabold text-[#C81E3D] hover:bg-rose-50 transition-colors"
                    >
                      <c.icon size={13} />
                      {c.label}
                      <Icons.X size={12} />
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ProgramFinder
          autoStart={isResult}
          initialCriteria={criteria}
          className={isResult ? "hidden" : ""}
        />

        {isResult ? (
          <FinderResults matches={matches} criteria={criteria} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                icon: Icons.Target,
                title: "Scored, not listed",
                body: "Every programme gets a weighted score against your five answers, so the ranking reflects your constraints rather than who paid for placement.",
              },
              {
                icon: Icons.Radar,
                title: "Reasoned matches",
                body: "Each match explains why it scored where it did, including when a programme falls outside your budget band.",
              },
              {
                icon: Icons.Scale,
                title: "Compare the finalists",
                body: "Shortlist up to three and open the side-by-side matrix covering fees, accreditation, exam mode, NIRF and projected ROI.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm space-y-3"
              >
                <span className="w-11 h-11 rounded-xl bg-[#FFF1F2] flex items-center justify-center">
                  <item.icon size={19} className="text-[#C81E3D]" />
                </span>
                <h3 className="text-base font-extrabold text-[#1E293B]">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {isResult && matches.length > 0 && (
        <ScrollReveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-[#C81E3D] rounded-3xl p-10 md:p-14 text-white space-y-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Want a second opinion before you decide?
            </h2>
            <p className="text-rose-100 text-sm sm:text-base font-medium max-w-xl mx-auto">
              A counsellor can check your shortlist against your actual work profile and tell you which
              one to pick. It takes ten minutes and costs nothing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <PopupTrigger className="inline-flex items-center gap-2 h-12 px-8 bg-white text-[#C81E3D] font-extrabold rounded-full shadow-lg hover:bg-gray-100 transition-all text-sm">
                <Icons.Phone size={16} />
                Talk to a counsellor
              </PopupTrigger>
            </div>
          </div>
        </ScrollReveal>
      )}

      {isResult && matches.length === 0 && <noscript>Enable JavaScript to see your matches.</noscript>}
    </div>
  );
}
