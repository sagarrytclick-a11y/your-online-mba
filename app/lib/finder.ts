import { collegeReviews, type CollegeReview } from "../data/colleges";
import { getUniversityDetailsOrDefaults, universityDetails } from "../data/university-details";
import {
  getBudgetBand,
  getExperienceBand,
  goalSpecialisationMap,
  type ApprovalOption,
} from "../data/finder";
import { specialisations } from "../data/specialisations";

export type FinderStepId = "budget" | "domain" | "experience" | "approval" | "goal";

export interface FinderCriteria {
  budget?: string;
  domain?: string;
  experience?: string;
  approvals?: string[];
  goal?: string;
}

export interface FinderMatch {
  college: CollegeReview;
  details: (typeof universityDetails)[string];
  score: number;
  reasons: string[];
  inBudget: boolean;
}

export const finderStepOrder: FinderStepId[] = [
  "budget",
  "domain",
  "experience",
  "approval",
  "goal",
];

export const finderStepMeta: Record<FinderStepId, { label: string; question: string; helper: string }> = {
  budget: {
    label: "Budget",
    question: "What is your total budget for the programme?",
    helper: "Include the full programme fee, not the monthly EMI.",
  },
  domain: {
    label: "Specialisation",
    question: "Which specialisation are you aiming for?",
    helper: "Pick the closest match — you can switch later in the programme.",
  },
  experience: {
    label: "Experience",
    question: "How much work experience do you have?",
    helper: "Most executive tracks prefer 2+ years. Fresher tracks are also available.",
  },
  approval: {
    label: "Must-haves",
    question: "Which of these matter most to you?",
    helper: "Select as many as you like. Each one adds weight to your matches.",
  },
  goal: {
    label: "Goal",
    question: "What is the single biggest reason you are doing an MBA?",
    helper: "This shapes which specialisation and which university fits you best.",
  },
};

function scoreApprovalFit(
  college: CollegeReview,
  details: ReturnType<typeof getUniversityDetailsOrDefaults>,
  wanted: string[]
): { points: number; reasons: string[] } {
  const reasons: string[] = [];
  let points = 0;
  if (wanted.length === 0) return { points: 0, reasons };

  const map: Record<string, (d: ReturnType<typeof getUniversityDetailsOrDefaults>) => boolean> = {
    "ugc-deb": (d) => d.approvals.includes("UGC-DEB"),
    "naac-a-plus": (d) => d.naacGrade === "A++" || d.naacGrade === "A+",
    nirf: (d) => d.nirfRank !== null,
    // A written test, interview or profile evaluation round is still an entrance.
    "no-entrance": () => !/written test|interview|profile evaluation/i.test(college.entranceExam),
    emi: (d) => d.emiInterestRate === 0,
    placement: (d) => d.placementRate >= 88,
  };

  for (const id of wanted) {
    const check = map[id];
    if (!check) continue;
    if (check(details)) {
      points += 3;
      if (id === "ugc-deb") reasons.push("UGC-DEB approved");
      if (id === "naac-a-plus") reasons.push(`NAAC ${details.naacGrade}`);
      if (id === "nirf" && details.nirfRank) reasons.push(`NIRF rank #${details.nirfRank}`);
      if (id === "emi") reasons.push("0% interest EMI available");
      if (id === "placement") reasons.push(`${details.placementRate}% placement rate`);
    }
  }
  return { points, reasons };
}

function scoreDomainFit(
  college: CollegeReview,
  domain: string | undefined
): { points: number; reasons: string[] } {
  if (!domain) return { points: 0, reasons: [] };
  const reasons: string[] = [];
  let points = 0;

  // A university name that literally carries the specialisation is a strong signal
  // (e.g. a dedicated "Finance" or "Analytics" programme listing).
  const domainWord = domain
    .split("-")
    .map((w) => w.replace(/(management|science|studies|and|general)/g, "").trim())
    .filter(Boolean)[0];
  const haystack = `${college.name} ${college.description}`.toLowerCase();
  if (domainWord && haystack.includes(domainWord.toLowerCase())) {
    points += 3;
    reasons.push(`Offers ${domainWord} specialisation`);
  }

  // Established distance-learning and open universities carry broad MBA coverage.
  if (college.coursesCount.includes("200+") || college.coursesCount.includes("90+")) {
    points += 1;
    reasons.push("Broad programme catalogue");
  }
  return { points, reasons };
}

function scoreExperienceFit(
  details: ReturnType<typeof getUniversityDetailsOrDefaults>,
  experience: string | undefined
): { points: number; reasons: string[] } {
  const band = getExperienceBand(experience);
  if (!band) return { points: 0, reasons: [] };

  // Elite institutes are experience-gated; open universities accept freshers.
  const isElite = details.nirfCategory === "MBA";
  const isOpen = details.classSize === 0 || details.liveClassesPerWeek === 0;
  const isPremium = details.totalFee >= 175000 && !isElite;

  if (isOpen) return { points: 2, reasons: ["Open admission, no experience barrier"] };
  if (band.id === "fresher" && isElite) return { points: -2, reasons: [] };
  if (band.id === "fresher" && isPremium) return { points: -1, reasons: [] };
  if (band.id === "7-plus" && details.liveClassesPerWeek === 0)
    return { points: -1, reasons: ["Self-paced, no live cohort support"] };
  if (band.maxYears <= 3 && details.placementRate >= 90)
    return { points: 2, reasons: ["Strong early-career placement record"] };
  return { points: 1, reasons: [] };
}

function scoreGoalFit(
  college: CollegeReview,
  goal: string | undefined
): { points: number; reasons: string[] } {
  if (!goal) return { points: 0, reasons: [] };
  const reasons: string[] = [];
  let points = 0;
  const weights = goalSpecialisationMap[goal];
  if (!weights) return { points: 0, reasons };

  // The highest-weighted specialisation for this goal anchors the match, weighted
  // by the university's own 5-star review share as a breadth proxy.
  const best = Object.entries(weights).sort((a, b) => b[1] - a[1])[0];
  if (!best) return { points: 0, reasons };

  const spec = specialisations.find((s) => s.slug === best[0]);
  if (spec) {
    const fiveStarShare = college.ratingDistribution.fiveStar;
    points += best[1] * (1 + fiveStarShare / 100);
    reasons.push(`Strong ${spec.title.toLowerCase()} outcomes`);
  }
  return { points: Math.round(points), reasons };
}

export function matchUniversities(criteria: FinderCriteria): FinderMatch[] {
  const budget = getBudgetBand(criteria.budget);
  const wanted = criteria.approvals ?? [];

  const matches: FinderMatch[] = collegeReviews.map((college) => {
    const details = getUniversityDetailsOrDefaults(college.id);
    const reasons: string[] = [];
    let score = 0;

    const approval = scoreApprovalFit(college, details, wanted);
    score += approval.points;
    reasons.push(...approval.reasons);

    const domain = scoreDomainFit(college, criteria.domain);
    score += domain.points;
    reasons.push(...domain.reasons);

    const experience = scoreExperienceFit(details, criteria.experience);
    score += experience.points;
    reasons.push(...experience.reasons);

    const goal = scoreGoalFit(college, criteria.goal);
    score += goal.points;
    reasons.push(...goal.reasons);

    // University reputation is a baseline, since a high rating is a real signal.
    score += Math.round((college.rating - 3.5) * 8);

    const inBudget = budget ? details.totalFee >= budget.minFee && details.totalFee <= budget.maxFee : true;
    if (budget && inBudget) score += 6;
    if (budget && !inBudget) score -= 4;

    return {
      college,
      details,
      score,
      reasons: Array.from(new Set(reasons)).slice(0, 4),
      inBudget,
    };
  });

  return matches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.college.rating - a.college.rating;
  });
}

export function finderUrl(criteria: FinderCriteria): string {
  const params = new URLSearchParams();
  if (criteria.budget) params.set("budget", criteria.budget);
  if (criteria.domain) params.set("domain", criteria.domain);
  if (criteria.experience) params.set("experience", criteria.experience);
  if (criteria.goal) params.set("goal", criteria.goal);
  if (criteria.approvals?.length) params.set("approvals", criteria.approvals.join(","));
  const qs = params.toString();
  return qs ? `/find-my-program?${qs}` : "/find-my-program";
}

export function criteriaFromSearchParams(params: Record<string, string | string[] | undefined>): FinderCriteria {
  const first = (value: string | string[] | undefined): string | undefined =>
    Array.isArray(value) ? value[0] : value;

  const approvalsRaw = first(params.approvals);

  return {
    budget: first(params.budget),
    domain: first(params.domain),
    experience: first(params.experience),
    goal: first(params.goal),
    approvals: approvalsRaw ? approvalsRaw.split(",").filter(Boolean) : undefined,
  };
}

export function approvalLabel(options: ApprovalOption[], id: string): string {
  return options.find((o) => o.id === id)?.label ?? id;
}
