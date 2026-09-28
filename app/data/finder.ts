export interface BudgetBand {
  id: string;
  label: string;
  description: string;
  minFee: number;
  maxFee: number;
}

export interface ExperienceBand {
  id: string;
  label: string;
  description: string;
  minYears: number;
  maxYears: number;
}

export interface GoalOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface ApprovalOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const budgetBands: BudgetBand[] = [
  {
    id: "under-75k",
    label: "Under ₹75,000",
    description: "Budget-first. Open universities and government institutes.",
    minFee: 0,
    maxFee: 75000,
  },
  {
    id: "75k-1.5l",
    label: "₹75,000 – ₹1.5 Lakh",
    description: "The sweet spot. Most UGC-entitled online MBAs sit here.",
    minFee: 75000,
    maxFee: 150000,
  },
  {
    id: "1.5l-2l",
    label: "₹1.5 – 2 Lakh",
    description: "Premium private universities with strong placement cells.",
    minFee: 150000,
    maxFee: 200000,
  },
  {
    id: "2l-5l",
    label: "₹2 – 5 Lakh",
    description: "Executive tracks with live faculty and campus residencies.",
    minFee: 200000,
    maxFee: 500000,
  },
  {
    id: "above-5l",
    label: "Above ₹5 Lakh",
    description: "Top-tier IIM and global dual-degree programmes.",
    minFee: 500000,
    maxFee: 10000000,
  },
];

export const experienceBands: ExperienceBand[] = [
  {
    id: "fresher",
    label: "Fresher",
    description: "Under 1 year, or straight after graduation.",
    minYears: 0,
    maxYears: 1,
  },
  {
    id: "1-3",
    label: "1 – 3 years",
    description: "Early career, ready to move up faster.",
    minYears: 1,
    maxYears: 3,
  },
  {
    id: "3-7",
    label: "3 – 7 years",
    description: "Mid-career, typically chasing a managerial track.",
    minYears: 3,
    maxYears: 7,
  },
  {
    id: "7-plus",
    label: "7+ years",
    description: "Senior leadership or an entrepreneurship pivot.",
    minYears: 7,
    maxYears: 40,
  },
];

export const goalOptions: GoalOption[] = [
  {
    id: "higher-salary",
    label: "Get a higher salary",
    description: "A measurable pay jump within 12 months of graduating.",
    icon: "TrendingUp",
  },
  {
    id: "switch-industry",
    label: "Switch industry or function",
    description: "Move from engineering into management, or B2C into B2B.",
    icon: "Repeat",
  },
  {
    id: "leadership",
    label: "Move into leadership",
    description: "Get on the path to a manager or director role.",
    icon: "Users",
  },
  {
    id: "startup",
    label: "Start or scale a business",
    description: "Fundraising, finance, operations and go-to-market skills.",
    icon: "Rocket",
  },
  {
    id: "global-role",
    label: "Work in a global role",
    description: "Cross-border exposure and multinational team skills.",
    icon: "Globe",
  },
  {
    id: "credentials",
    label: "Get a recognised credential",
    description: "A UGC-entitled degree for govt jobs or further study.",
    icon: "ShieldCheck",
  },
];

export const approvalOptions: ApprovalOption[] = [
  {
    id: "ugc-deb",
    label: "UGC-DEB approved",
    description: "Mandatory for government jobs and higher education admissions.",
    icon: "ShieldCheck",
  },
  {
    id: "naac-a-plus",
    label: "NAAC A+ or above",
    description: "Stronger academic pedigree and wider recruiter acceptance.",
    icon: "Award",
  },
  {
    id: "nirf",
    label: "NIRF ranked",
    description: "Proof of national-level research and teaching quality.",
    icon: "Trophy",
  },
  {
    id: "no-entrance",
    label: "No entrance exam",
    description: "Merit or profile-based admission, enrol and start quickly.",
    icon: "Zap",
  },
  {
    id: "emi",
    label: "0% interest EMI",
    description: "Spread the fee with no interest cost over 24-36 months.",
    icon: "CreditCard",
  },
  {
    id: "placement",
    label: "Strong placement cell",
    description: "Dedicated hiring drives, resume support and mock interviews.",
    icon: "Briefcase",
  },
];

/** Maps a goal to the specialisation slugs it favours, with a weight. */
export const goalSpecialisationMap: Record<string, Record<string, number>> = {
  "higher-salary": {
    "ai-and-machine-learning": 3,
    "data-science": 3,
    "business-analytics": 3,
    "it-management": 2,
    "finance-management": 2,
    "project-management": 2,
    "marketing-and-sales": 1,
  },
  "switch-industry": {
    "general-mba": 3,
    "it-management": 3,
    "operations-management": 2,
    "business-analytics": 2,
    "international-business-management": 2,
  },
  leadership: {
    "general-mba": 3,
    "operations-management": 3,
    "hr-management": 2,
    "project-management": 2,
    "finance-management": 2,
  },
  startup: {
    "finance-management": 3,
    "general-mba": 3,
    "marketing-and-sales": 3,
    "operations-management": 2,
    "international-business-management": 1,
  },
  "global-role": {
    "international-business-management": 3,
    "general-mba": 2,
    "finance-management": 2,
    "marketing-and-sales": 1,
  },
  credentials: {
    "general-mba": 2,
    "finance-management": 2,
    "it-management": 1,
    "hr-management": 1,
  },
};

export function getBudgetBand(id: string | undefined): BudgetBand | undefined {
  return budgetBands.find((b) => b.id === id);
}

export function getExperienceBand(id: string | undefined): ExperienceBand | undefined {
  return experienceBands.find((b) => b.id === id);
}
