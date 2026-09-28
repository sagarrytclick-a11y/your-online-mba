export interface SalaryBenchmark {
  slug: string;
  title: string;
  entryLpa: number;
  midLpa: number;
  seniorLpa: number;
  /** Average annual increment on joining after an MBA, as a percentage. */
  mbaUpliftPercent: number;
  /** Share of graduates who report a promotion or a significant role change. */
  promotionRate: number;
  demandIndex: number;
  topRoles: string[];
}

export const salaryBenchmarks: SalaryBenchmark[] = [
  {
    slug: "finance-management",
    title: "Finance & Investment",
    entryLpa: 8.5,
    midLpa: 18,
    seniorLpa: 38,
    mbaUpliftPercent: 52,
    promotionRate: 46,
    demandIndex: 92,
    topRoles: ["Financial Analyst", "Investment Banker", "FP&A Manager", "Treasury Analyst", "Risk Manager"],
  },
  {
    slug: "it-management",
    title: "IT & Technology Management",
    entryLpa: 9.5,
    midLpa: 21,
    seniorLpa: 45,
    mbaUpliftPercent: 55,
    promotionRate: 49,
    demandIndex: 94,
    topRoles: ["Product Manager", "Engineering Manager", "IT Program Manager", "Solutions Architect", "Delivery Lead"],
  },
  {
    slug: "business-analytics",
    title: "Business Analytics & Data",
    entryLpa: 9,
    midLpa: 19,
    seniorLpa: 40,
    mbaUpliftPercent: 54,
    promotionRate: 51,
    demandIndex: 95,
    topRoles: ["Business Analyst", "Data Analyst", "Analytics Manager", "Product Analyst", "Decision Scientist"],
  },
  {
    slug: "data-science",
    title: "Data Science & AI",
    entryLpa: 11,
    midLpa: 24,
    seniorLpa: 52,
    mbaUpliftPercent: 60,
    promotionRate: 54,
    demandIndex: 96,
    topRoles: ["Data Scientist", "ML Engineer", "AI Product Manager", "Analytics Lead", "Research Scientist"],
  },
  {
    slug: "ai-and-machine-learning",
    title: "AI & Machine Learning",
    entryLpa: 12.5,
    midLpa: 27,
    seniorLpa: 58,
    mbaUpliftPercent: 63,
    promotionRate: 56,
    demandIndex: 97,
    topRoles: ["AI Engineer", "Machine Learning Lead", "AI Product Owner", "Research Engineer", "Head of AI"],
  },
  {
    slug: "marketing-and-sales",
    title: "Marketing, Sales & Growth",
    entryLpa: 7,
    midLpa: 15,
    seniorLpa: 32,
    mbaUpliftPercent: 44,
    promotionRate: 43,
    demandIndex: 88,
    topRoles: ["Brand Manager", "Growth Lead", "Sales Director", "Product Marketer", "Demand Gen Manager"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & SEO",
    entryLpa: 6.5,
    midLpa: 13.5,
    seniorLpa: 28,
    mbaUpliftPercent: 41,
    promotionRate: 41,
    demandIndex: 84,
    topRoles: ["SEO Manager", "Performance Marketer", "Digital Strategist", "Content Lead", "Growth Analyst"],
  },
  {
    slug: "operations-management",
    title: "Operations & Supply Chain",
    entryLpa: 7.5,
    midLpa: 16,
    seniorLpa: 34,
    mbaUpliftPercent: 45,
    promotionRate: 44,
    demandIndex: 87,
    topRoles: ["Operations Manager", "Supply Chain Lead", "Plant Manager", "Procurement Head", "Program Manager"],
  },
  {
    slug: "hr-management",
    title: "Human Resource Management",
    entryLpa: 6.5,
    midLpa: 13,
    seniorLpa: 26,
    mbaUpliftPercent: 38,
    promotionRate: 40,
    demandIndex: 79,
    topRoles: ["HR Business Partner", "Talent Acquisition Lead", "L&D Manager", "Compensation Analyst", "HR Director"],
  },
  {
    slug: "project-management",
    title: "Project & Programme Management",
    entryLpa: 8,
    midLpa: 17,
    seniorLpa: 35,
    mbaUpliftPercent: 47,
    promotionRate: 48,
    demandIndex: 90,
    topRoles: ["Program Manager", "PMO Lead", "Scrum Master", "Project Director", "Portfolio Manager"],
  },
  {
    slug: "healthcare-management",
    title: "Healthcare Management",
    entryLpa: 6.5,
    midLpa: 14,
    seniorLpa: 27,
    mbaUpliftPercent: 36,
    promotionRate: 38,
    demandIndex: 76,
    topRoles: ["Hospital Operations Manager", "Healthcare Consultant", "Quality Manager", "Pharma Sales Lead", "Health Informatics Analyst"],
  },
  {
    slug: "international-business-management",
    title: "International Business",
    entryLpa: 8,
    midLpa: 17,
    seniorLpa: 36,
    mbaUpliftPercent: 49,
    promotionRate: 45,
    demandIndex: 82,
    topRoles: ["Export Manager", "Global Sourcing Lead", "Trade Analyst", "Regional Manager", "Key Account Manager"],
  },
  {
    slug: "general-mba",
    title: "General Management",
    entryLpa: 8,
    midLpa: 17,
    seniorLpa: 36,
    mbaUpliftPercent: 48,
    promotionRate: 46,
    demandIndex: 89,
    topRoles: ["Business Development Manager", "Strategy Analyst", "General Manager", "Management Consultant", "Category Manager"],
  },
];

export const defaultBenchmark: SalaryBenchmark = {
  slug: "general-mba",
  title: "General Management",
  entryLpa: 8,
  midLpa: 17,
  seniorLpa: 36,
  mbaUpliftPercent: 48,
  promotionRate: 46,
  demandIndex: 89,
  topRoles: [
    "Business Development Manager",
    "Strategy Analyst",
    "General Manager",
    "Management Consultant",
    "Category Manager",
  ],
};

export function getBenchmarkBySlug(slug: string | undefined): SalaryBenchmark {
  if (!slug) return defaultBenchmark;
  return salaryBenchmarks.find((b) => b.slug === slug) ?? defaultBenchmark;
}

export interface RoiInputs {
  currentAnnualSalary: number;
  programFee: number;
  monthlyEmi: number;
  domainSlug?: string;
  /** Years taken to complete the programme. */
  studyYears?: number;
  /** Additional monthly cost of studying alongside a job. */
  monthlyOpportunityCost?: number;
  /** Percentage of the fee covered by scholarship or financial aid. */
  aidPercent?: number;
}

export interface RoiYearPoint {
  year: number;
  postMbaSalary: number;
  baselineSalary: number;
  cumulativeGain: number;
  cumulativeCost: number;
  netBenefit: number;
  roiPercent: number;
}

export interface RoiResult {
  benchmark: SalaryBenchmark;
  grossFee: number;
  aidAmount: number;
  netFee: number;
  monthlyEmi: number;
  emiMonths: number;
  emiInterestRate: number;
  studyYears: number;
  projectedSalary: number;
  baselineSalary: number;
  annualGain: number;
  monthlyGain: number;
  timeToBreakevenMonths: number;
  roiPercentAtCompletion: number;
  fiveYearNetGain: number;
  tenYearNetGain: number;
  opportunityCost: number;
  years: RoiYearPoint[];
}

export function calculateRoi(inputs: RoiInputs): RoiResult {
  const {
    currentAnnualSalary,
    programFee,
    monthlyEmi,
    domainSlug,
    studyYears = 2,
    monthlyOpportunityCost = 0,
    aidPercent = 0,
  } = inputs;

  const benchmark = getBenchmarkBySlug(domainSlug);
  const safeSalary = Math.max(0, currentAnnualSalary || 0);
  const safeFee = Math.max(0, programFee || 0);
  const safeEmi = Math.max(0, monthlyEmi || 0);
  const safeAid = Math.min(100, Math.max(0, aidPercent || 0));

  const aidAmount = Math.round((safeFee * safeAid) / 100);
  const netFee = Math.max(0, safeFee - aidAmount);

  // Projected salary: apply the specialisation uplift, tempered by how far the
  // learner's current salary sits below the domain's entry band. A learner
  // already at or above entry band gets a smaller relative jump.
  const entryGap = safeSalary > 0 ? safeSalary / benchmark.entryLpa : 1;
  const gapDampener = entryGap >= 1 ? 1 / Math.min(entryGap, 2.2) : 1 + (1 - entryGap) * 0.18;
  const effectiveUplift = (benchmark.mbaUpliftPercent / 100) * gapDampener;
  const projectedSalary = Math.round(safeSalary * (1 + effectiveUplift));

  const baselineSalary = safeSalary;
  const annualGain = projectedSalary - baselineSalary;
  const monthlyGain = Math.round(annualGain / 12);

  // Opportunity cost: forgone bonuses and increments while studying, approximated
  // as 12% of the current salary per year of study, plus any declared monthly cost.
  const opportunityCost =
    Math.round((baselineSalary * 0.12 * studyYears) || 0) + (monthlyOpportunityCost * 12 * studyYears || 0);

  const totalOutlay = netFee + opportunityCost;

  const yearlyPoints: RoiYearPoint[] = [];
  for (let year = 1; year <= 10; year += 1) {
    // A 9% annual raise applied to the post-MBA salary, from year two onwards.
    const raise = year === 1 ? 0 : 0.09;
    const postMbaSalary = Math.round(projectedSalary * Math.pow(1 + raise, year - 1));
    const baseline = Math.round(baselineSalary * Math.pow(1 + 0.07, year - 1));

    let cumulativeGain = 0;
    let cumulativeCost = totalOutlay;
    for (let y = 1; y <= year; y += 1) {
      const r = y === 1 ? 0 : 0.09;
      const p = Math.round(projectedSalary * Math.pow(1 + r, y - 1));
      const b = Math.round(baselineSalary * Math.pow(1 + 0.07, y - 1));
      cumulativeGain += p - b;
    }
    // The fee and opportunity cost are incurred up front while studying.
    if (year <= studyYears) cumulativeCost = totalOutlay;

    const netBenefit = cumulativeGain - cumulativeCost;
    const roiPercent = totalOutlay > 0 ? (netBenefit / totalOutlay) * 100 : 0;

    yearlyPoints.push({
      year,
      postMbaSalary,
      baselineSalary: baseline,
      cumulativeGain,
      cumulativeCost,
      netBenefit,
      roiPercent: Math.round(roiPercent),
    });
  }

  let timeToBreakevenMonths = -1;
  if (monthlyGain > 0 && totalOutlay > 0) {
    timeToBreakevenMonths = Math.ceil(totalOutlay / monthlyGain);
  } else if (totalOutlay === 0) {
    timeToBreakevenMonths = 0;
  }

  const completionPoint = yearlyPoints[Math.min(studyYears, 10) - 1];

  return {
    benchmark,
    grossFee: safeFee,
    aidAmount,
    netFee,
    monthlyEmi: safeEmi,
    emiMonths: safeEmi > 0 ? Math.ceil(netFee / safeEmi) : 0,
    emiInterestRate: 0,
    studyYears,
    projectedSalary,
    baselineSalary,
    annualGain,
    monthlyGain,
    timeToBreakevenMonths,
    roiPercentAtCompletion: completionPoint?.roiPercent ?? 0,
    fiveYearNetGain: yearlyPoints[4]?.netBenefit ?? 0,
    tenYearNetGain: yearlyPoints[9]?.netBenefit ?? 0,
    opportunityCost,
    years: yearlyPoints,
  };
}

export function formatLpa(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value >= 100) return `₹${(value / 100).toFixed(1)} Cr`;
  if (value >= 10) return `₹${value.toFixed(1)} L`;
  return `₹${Math.round(value)} L`;
}

export function formatInr(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (abs >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  if (abs >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${Math.round(value)}`;
}

export function formatBreakeven(months: number): string {
  if (months < 0) return "Not reached within 5 years";
  if (months === 0) return "Immediately";
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0 ? `${years} year${years === 1 ? "" : "s"}` : `${years}y ${rem}m`;
}
