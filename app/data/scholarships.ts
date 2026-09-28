export type ScholarshipCategory = "merit" | "defence" | "women" | "budget" | "institution";

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  category: ScholarshipCategory;
  /** Percentage of the programme fee waived. */
  waiverPercent: number;
  /** Flat amount waived, used when waiverPercent is 0. */
  flatAmount: number;
  eligibility: string;
  documents: string[];
  deadline: string;
  applyMode: "University Portal" | "Scholarship Cell" | "On Admission" | "Bank Desk";
  seats: number;
  renewable: boolean;
  minPercentage?: number;
  requiresDefenseProof?: boolean;
  requiresFemaleProof?: boolean;
  maxFamilyIncome?: number;
}

export const scholarships: Scholarship[] = [
  {
    id: "early-bird",
    name: "Early Bird Fee Concession",
    provider: "Partner Universities",
    category: "budget",
    waiverPercent: 15,
    flatAmount: 0,
    eligibility: "Enrol before the last date of the early admission window for the intake.",
    documents: ["Admission confirmation", "Fee payment receipt"],
    deadline: "31 August",
    applyMode: "On Admission",
    seats: 500,
    renewable: false,
  },
  {
    id: "merit-mba",
    name: "Merit Scholarship for MBA",
    provider: "All Partner Universities",
    category: "merit",
    waiverPercent: 50,
    flatAmount: 0,
    eligibility: "Graduation score of 60% or above. 75% and above unlocks the highest slab.",
    documents: ["Graduation marksheet", "Consolidated academic record"],
    deadline: "Rolling, quarterly",
    applyMode: "Scholarship Cell",
    seats: 300,
    renewable: true,
    minPercentage: 60,
  },
  {
    id: "lpu-merit-50",
    name: "50% Tuition Waiver for Toppers",
    provider: "LPU Online",
    category: "institution",
    waiverPercent: 50,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 75% or above from a recognised university.",
    documents: ["Graduation marksheet", "10th & 12th certificates"],
    deadline: "Rolling, monthly intakes",
    applyMode: "University Portal",
    seats: 120,
    renewable: true,
    minPercentage: 75,
  },
  {
    id: "manipal-scholar-60",
    name: "Manipal Online Scholar Award",
    provider: "Manipal University Online",
    category: "institution",
    waiverPercent: 40,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 70% or above, plus a written statement of purpose.",
    documents: ["Graduation marksheet", "Statement of purpose", "ID proof"],
    deadline: "Rolling, quarterly",
    applyMode: "University Portal",
    seats: 150,
    renewable: true,
    minPercentage: 70,
  },
  {
    id: "cu-merit-55",
    name: "Chandigarh University Excellence Award",
    provider: "Chandigarh University Online",
    category: "institution",
    waiverPercent: 35,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 70% or above with a minimum one-year work experience.",
    documents: ["Graduation marksheet", "Work experience letter", "ID proof"],
    deadline: "Rolling, monthly intakes",
    applyMode: "University Portal",
    seats: 200,
    renewable: true,
    minPercentage: 70,
  },
  {
    id: "nmims-nirf-scholar",
    name: "NMIMS Distinction Scholarship",
    provider: "NMIMS Global Access",
    category: "institution",
    waiverPercent: 30,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 75% or above, assessed through the profile evaluation round.",
    documents: ["Graduation marksheet", "Profile evaluation form", "ID proof"],
    deadline: "Rolling, quarterly",
    applyMode: "Scholarship Cell",
    seats: 80,
    renewable: true,
    minPercentage: 75,
  },
  {
    id: "iim-abhyas-scholar",
    name: "IIM Abhyas Financial Aid",
    provider: "IIM Indore / IIM Kozhikode",
    category: "merit",
    waiverPercent: 0,
    flatAmount: 400000,
    eligibility: "Family income below ₹8 LPA, confirmed against income proof or a valid BPL certificate.",
    documents: ["Income proof", "BPL certificate if applicable", "Graduation marksheet", "Bank statement"],
    deadline: "Within 30 days of the offer letter",
    applyMode: "Scholarship Cell",
    seats: 60,
    renewable: true,
    maxFamilyIncome: 800000,
  },
  {
    id: "iim-kz-aid-30",
    name: "IIM Kozhikode Tuition Concession",
    provider: "IIM Kozhikode",
    category: "merit",
    waiverPercent: 30,
    flatAmount: 0,
    eligibility: "Merit list position in the top 15% of the incoming batch.",
    documents: ["Merit list", "Graduation marksheet", "ID proof"],
    deadline: "With the admission confirmation",
    applyMode: "Scholarship Cell",
    seats: 45,
    renewable: true,
  },
  {
    id: "army-defence",
    name: "Defence Personnel Concession",
    provider: "Partner Universities",
    category: "defence",
    waiverPercent: 25,
    flatAmount: 0,
    eligibility: "Serving or retired personnel of the Indian Armed Forces, CAPF, Police or Paramilitary services.",
    documents: ["Service/retirement certificate", "Identity card", "Last salary slip"],
    deadline: "Rolling",
    applyMode: "Scholarship Cell",
    seats: 100,
    renewable: true,
    requiresDefenseProof: true,
  },
  {
    id: "women-empowerment",
    name: "Women in Leadership Scholarship",
    provider: "Partner Universities",
    category: "women",
    waiverPercent: 20,
    flatAmount: 0,
    eligibility: "Female candidates across all specialisations, on a merit-cum-means basis.",
    documents: ["ID proof", "Graduation marksheet", "Statement of purpose"],
    deadline: "Rolling, quarterly",
    applyMode: "Scholarship Cell",
    seats: 250,
    renewable: true,
    requiresFemaleProof: true,
  },
  {
    id: "sibling-discount",
    name: "Sibling & Alumni Referral Discount",
    provider: "Amity Online",
    category: "budget",
    waiverPercent: 10,
    flatAmount: 0,
    eligibility: "Immediate sibling or an alumnus of the same programme enrolling in the same intake.",
    documents: ["Alumni ID or sibling's degree certificate", "ID proof"],
    deadline: "Rolling",
    applyMode: "On Admission",
    seats: 400,
    renewable: false,
  },
  {
    id: "parul-budget-35",
    name: "Parul Affordability Scholarship",
    provider: "Parul University Online",
    category: "budget",
    waiverPercent: 35,
    flatAmount: 0,
    eligibility: "Family income below ₹6 LPA, with a 36-month zero-cost EMI option on the balance.",
    documents: ["Income proof", "Graduation marksheet", "Bank statement"],
    deadline: "Rolling, monthly intakes",
    applyMode: "Bank Desk",
    seats: 350,
    renewable: true,
    maxFamilyIncome: 600000,
  },
  {
    id: "shoolini-aid-25",
    name: "Shoolini Merit Aid",
    provider: "Shoolini University Online",
    category: "merit",
    waiverPercent: 25,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 65% or above.",
    documents: ["Graduation marksheet", "ID proof"],
    deadline: "Rolling, quarterly",
    applyMode: "University Portal",
    seats: 180,
    renewable: true,
    minPercentage: 65,
  },
  {
    id: "jain-value-40",
    name: "Jain Value Scholarship",
    provider: "Jain University Online",
    category: "budget",
    waiverPercent: 20,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 60% or above with family income below ₹8 LPA.",
    documents: ["Graduation marksheet", "Income proof", "ID proof"],
    deadline: "Rolling, quarterly",
    applyMode: "Scholarship Cell",
    seats: 140,
    renewable: true,
    minPercentage: 60,
    maxFamilyIncome: 800000,
  },
  {
    id: "smu-value-45",
    name: "Sikkim Manipal Value Scholarship",
    provider: "Sikkim Manipal University",
    category: "budget",
    waiverPercent: 30,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 60% or above, with a 24-month interest-free EMI on the remainder.",
    documents: ["Graduation marksheet", "ID proof"],
    deadline: "Rolling",
    applyMode: "Bank Desk",
    seats: 220,
    renewable: true,
    minPercentage: 60,
  },
  {
    id: "dyp-scholar-40",
    name: "DY Patil Scholarship Test",
    provider: "DY Patil University Online",
    category: "merit",
    waiverPercent: 40,
    flatAmount: 0,
    eligibility: "Clears the university scholarship test with a score of 70% or above.",
    documents: ["Scholarship test result", "Graduation marksheet", "ID proof"],
    deadline: "Within 15 days of the test",
    applyMode: "Scholarship Cell",
    seats: 90,
    renewable: true,
    minPercentage: 60,
  },
  {
    id: "amrita-aid-35",
    name: "Amrita Vidya Support",
    provider: "Amrita AHEAD",
    category: "merit",
    waiverPercent: 35,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 70% or above, needs-assessed on a first-come basis.",
    documents: ["Graduation marksheet", "Income proof", "ID proof"],
    deadline: "Rolling, quarterly",
    applyMode: "Scholarship Cell",
    seats: 110,
    renewable: true,
    minPercentage: 70,
  },
  {
    id: "upes-industry-30",
    name: "UPES Industry Scholarship",
    provider: "UPES Online",
    category: "institution",
    waiverPercent: 30,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 65% or above in Oil & Gas, Digital Business or Supply Chain.",
    documents: ["Graduation marksheet", "Statement of purpose", "ID proof"],
    deadline: "Rolling, quarterly",
    applyMode: "University Portal",
    seats: 70,
    renewable: true,
    minPercentage: 65,
  },
  {
    id: "jgu-global-35",
    name: "JGU Global Pathways Grant",
    provider: "OP Jindal Global University",
    category: "institution",
    waiverPercent: 35,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 75% or above with international career intent.",
    documents: ["Graduation marksheet", "Statement of purpose", "Passport copy"],
    deadline: "Rolling, quarterly",
    applyMode: "Scholarship Cell",
    seats: 60,
    renewable: true,
    minPercentage: 75,
  },
  {
    id: "christ-legacy-30",
    name: "Christ Legacy Grant",
    provider: "Christ University Online",
    category: "institution",
    waiverPercent: 30,
    flatAmount: 0,
    eligibility: "Graduation aggregate of 70% or above, assessed through the profile evaluation round.",
    documents: ["Graduation marksheet", "Profile evaluation form"],
    deadline: "Rolling, quarterly",
    applyMode: "Scholarship Cell",
    seats: 65,
    renewable: true,
    minPercentage: 70,
  },
  {
    id: "imt-cdl-alumni-20",
    name: "IMT CDL Alumni Grant",
    provider: "IMT Ghaziabad",
    category: "budget",
    waiverPercent: 20,
    flatAmount: 0,
    eligibility: "Alumni of any IMT CDL programme enrolling for a second qualification.",
    documents: ["IMT CDL alumni ID", "Previous degree certificate"],
    deadline: "Rolling",
    applyMode: "On Admission",
    seats: 130,
    renewable: false,
  },
  {
    id: "ignou-free-100",
    name: "IGNOU Full Concession",
    provider: "IGNOU",
    category: "budget",
    waiverPercent: 100,
    flatAmount: 0,
    eligibility: "Fee exemption for women, PwD candidates, ex-servicemen and candidates from BPL families.",
    documents: ["Category certificate", "BPL certificate", "Disability certificate if applicable"],
    deadline: "As per IGNOU re-registration calendar",
    applyMode: "University Portal",
    seats: 1000,
    renewable: true,
    requiresFemaleProof: true,
  },
  {
    id: "annamalai-free-100",
    name: "Annamalai Full Waiver",
    provider: "Annamalai University",
    category: "budget",
    waiverPercent: 100,
    flatAmount: 0,
    eligibility: "Government of India fee concession for SC, ST and PwD candidates.",
    documents: ["Caste certificate", "Disability certificate if applicable"],
    deadline: "As per university prospectus",
    applyMode: "University Portal",
    seats: 800,
    renewable: true,
  },
  {
    id: "bharathidasan-free-100",
    name: "Bharathidasan Concession",
    provider: "Bharathidasan University",
    category: "budget",
    waiverPercent: 100,
    flatAmount: 0,
    eligibility: "Government of India fee concession for SC and ST candidates.",
    documents: ["Caste certificate", "Graduation marksheet"],
    deadline: "As per university prospectus",
    applyMode: "University Portal",
    seats: 600,
    renewable: true,
  },
  {
    id: "scdl-budget-50",
    name: "Budget Half-Fee Concession",
    provider: "Symbiosis SCDL / Open Universities",
    category: "budget",
    waiverPercent: 50,
    flatAmount: 0,
    eligibility: "Open admission candidates with a family income below ₹5 LPA.",
    documents: ["Income proof", "Graduation marksheet", "ID proof"],
    deadline: "Rolling",
    applyMode: "University Portal",
    seats: 450,
    renewable: true,
    maxFamilyIncome: 500000,
  },
];

export interface EmiPartner {
  id: string;
  bank: string;
  interestRate: number;
  maxTenureMonths: number;
  processingFee: number;
  requiresCreditScore: string;
  bestFor: string;
}

export const emiPartners: EmiPartner[] = [
  {
    id: "hdfc",
    bank: "HDFC Bank",
    interestRate: 8.5,
    maxTenureMonths: 36,
    processingFee: 3500,
    requiresCreditScore: "720+",
    bestFor: "Lowest interest on long tenures",
  },
  {
    id: "icici",
    bank: "ICICI Bank",
    interestRate: 8.75,
    maxTenureMonths: 36,
    processingFee: 3500,
    requiresCreditScore: "720+",
    bestFor: "Instant approval for salaried applicants",
  },
  {
    id: "axis",
    bank: "Axis Bank",
    interestRate: 9.25,
    maxTenureMonths: 24,
    processingFee: 3000,
    requiresCreditScore: "700+",
    bestFor: "Fast disbursal without branch visit",
  },
  {
    id: "bajaj",
    bank: "Bajaj Finserv",
    interestRate: 10.5,
    maxTenureMonths: 36,
    processingFee: 2999,
    requiresCreditScore: "680+",
    bestFor: "Approval for self-employed applicants",
  },
  {
    id: "kotak",
    bank: "Kotak Mahindra Bank",
    interestRate: 9.5,
    maxTenureMonths: 24,
    processingFee: 3000,
    requiresCreditScore: "710+",
    bestFor: "Flexible repayment holiday",
  },
  {
    id: "sbi",
    bank: "State Bank of India",
    interestRate: 8.9,
    maxTenureMonths: 36,
    processingFee: 2000,
    requiresCreditScore: "700+",
    bestFor: "Lowest processing fee overall",
  },
];

export interface EmiPlan {
  bank: string;
  tenureMonths: number;
  monthlyEmi: number;
  totalPayable: number;
  interestPaid: number;
}

export function calculateEmiPlans(
  principal: number,
  options: { interestRate: number; maxTenureMonths: number; bank: string }[]
): EmiPlan[] {
  const amount = Math.max(0, principal);
  return options
    .map((option) => {
      const r = option.interestRate / 12 / 100;
      const n = option.maxTenureMonths;
      if (n <= 0) return null;
      const monthly =
        r === 0
          ? amount / n
          : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      return {
        bank: option.bank,
        tenureMonths: n,
        monthlyEmi: Math.round(monthly),
        totalPayable: Math.round(total),
        interestPaid: Math.round(total - amount),
      };
    })
    .filter((p): p is EmiPlan => p !== null)
    .sort((a, b) => a.monthlyEmi - b.monthlyEmi);
}

export function getScholarshipById(id: string): Scholarship | undefined {
  return scholarships.find((s) => s.id === id);
}

export const categoryLabels: Record<ScholarshipCategory, string> = {
  merit: "Merit",
  defence: "Defence",
  women: "Women in Leadership",
  budget: "Budget & Aid",
  institution: "University Specific",
};
