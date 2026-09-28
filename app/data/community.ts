export type CommunityTopic =
  | "admissions"
  | "fees"
  | "exam"
  | "lms"
  | "placement"
  | "roi"
  | "comparisons";

export type AnswererRole = "Education Counsellor" | "Verified Alumni" | "Academic Expert";

export interface CommunityAnswer {
  id: string;
  author: string;
  role: AnswererRole;
  collegeId?: string;
  credentials: string;
  answer: string;
  helpfulCount: number;
  verified: boolean;
}

export interface CommunityQuestion {
  id: string;
  slug: string;
  question: string;
  topic: CommunityTopic;
  askedBy: string;
  askedAt: string;
  upvotes: number;
  views: number;
  tags: string[];
  collegeIds: string[];
  specialisationSlugs: string[];
  answers: CommunityAnswer[];
  relatedFaqs: string[];
}

export const topicLabels: Record<CommunityTopic, string> = {
  admissions: "Admissions & Eligibility",
  fees: "Fees, EMI & Scholarships",
  exam: "Exams & Evaluation",
  lms: "LMS & Classes",
  placement: "Placement & Career",
  roi: "ROI & Career Payoff",
  comparisons: "Comparisons",
};

export const topicIcons: Record<CommunityTopic, string> = {
  admissions: "GraduationCap",
  fees: "Wallet",
  exam: "ClipboardCheck",
  lms: "MonitorPlay",
  placement: "Briefcase",
  roi: "TrendingUp",
  comparisons: "Scale",
};

export const communityQuestions: CommunityQuestion[] = [
  {
    id: "q-1",
    slug: "online-mba-and-government-jobs-ugc-entitlement",
    question:
      "Is an online MBA degree accepted for government jobs and further education?",
    topic: "comparisons",
    askedBy: "Rahul S.",
    askedAt: "2026-08-14",
    upvotes: 214,
    views: 18940,
    tags: ["UGC", "Government Jobs", "Degree Validity"],
    collegeIds: ["lpu-online", "amity-online", "manipal-online"],
    specialisationSlugs: ["general-mba"],
    relatedFaqs: ["ugc-deb", "no-entrance-exam", "degree-recognition"],
    answers: [
      {
        id: "a-1-1",
        author: "Sanjay Kulkarni",
        role: "Education Counsellor",
        credentials: "12 years in online higher education counselling",
        answer:
          "Yes, provided the degree is UGC-DEB entitled. That is the single check that matters. The degree has to appear in the UGC's list of entitled programmes, and the university must be a UGC-entitled institution for the specific programme you enrolled in, not the university as a whole. Ask the university for the UGC letter number and verify it yourself on the UGC site before you pay the first instalment.",
        helpfulCount: 312,
        verified: true,
      },
      {
        id: "a-1-2",
        author: "Nikhil R.",
        role: "Verified Alumni",
        collegeId: "lpu-online",
        credentials: "LPU Online MBA, 2024 graduate, now in a PSU",
        answer:
          "I applied for a state government role with my online MBA and the application was accepted without any query. But the eligibility for a specific PSU depends on the notification, not on UGC. Read the notification's eligibility clause carefully rather than assuming.",
        helpfulCount: 188,
        verified: true,
      },
    ],
  },
  {
    id: "q-2",
    slug: "cheapest-ugc-entitled-online-mba-under-rs-1-lakh",
    question: "Which UGC-entitled online MBA costs the least in India right now?",
    topic: "fees",
    askedBy: "Pooja M.",
    askedAt: "2026-08-22",
    upvotes: 331,
    views: 27450,
    tags: ["Budget", "Low Fee", "Affordable MBA"],
    collegeIds: ["annamalai-university", "bharathidasan-university", "symbiosis-scdl", "ignou"],
    specialisationSlugs: ["general-mba"],
    relatedFaqs: ["cheap-online-mba", "emi-options", "hidden-costs"],
    answers: [
      {
        id: "a-2-1",
        author: "Sanjay Kulkarni",
        role: "Education Counsellor",
        credentials: "12 years in online higher education counselling",
        answer:
          "On raw fee alone, Annamalai University and Bharathidasan University sit at the bottom, in the ₹32,000 to ₹40,000 range, and IGNOU is around ₹66,000. All three are UGC-DEB entitled. The trade-off is that they are largely self-paced with no live cohort, weak placement support and older LMS interfaces. If your constraint is a hard budget ceiling, they are legitimate choices. If you also need placement support, Symbiosis SCDL at roughly ₹74,000 is the better floor.",
        helpfulCount: 428,
        verified: true,
      },
      {
        id: "a-2-2",
        author: "Dr. Latha Subramanian",
        role: "Academic Expert",
        credentials: "Former faculty, School of Management Studies",
        answer:
          "A caution on the very cheapest options: confirm whether the programme is AICTE-approved as well as UGC-DEB entitled. For private and government jobs the UGC entitlement is what counts, but for a career in management education, an AICTE approval adds a layer of formal recognition worth checking.",
        helpfulCount: 156,
        verified: true,
      },
    ],
  },
  {
    id: "q-3",
    slug: "online-mba-while-working-full-time-realistic",
    question: "Is it actually possible to complete an online MBA while working full time?",
    topic: "lms",
    askedBy: "Aditya V.",
    askedAt: "2026-09-02",
    upvotes: 276,
    views: 22100,
    tags: ["Work-Life Balance", "Time Management", "Working Professionals"],
    collegeIds: [],
    specialisationSlugs: [],
    relatedFaqs: ["study-hours", "live-class-schedule", "assignment-load"],
    answers: [
      {
        id: "a-3-1",
        author: "Meera Raghavan",
        role: "Verified Alumni",
        collegeId: "iim-kozhikode",
        credentials: "IIM Kozhikode Executive MBA, 2024",
        answer:
          "It is possible but not easy, and the people who struggle are the ones who pick the cheapest programme and expect it to be effortless. Budget eight to ten hours a week, protect two of them on a fixed weekend slot, and front-load the assignment deadlines into a shared calendar with your manager's expectations made explicit. I am not exaggerating when I say tell your manager before you enrol, not after.",
        helpfulCount: 267,
        verified: true,
      },
      {
        id: "a-3-2",
        author: "Sunil Patil",
        role: "Verified Alumni",
        collegeId: "symbiosis-scdl",
        credentials: "Symbiosis SCDL MBA, 2023",
        answer:
          "A BPO job is harder than a standard desk job, not easier. I did mine in the two hours I had after a night shift. The self-paced programmes are more forgiving of a broken schedule than the ones with mandatory live classes, which is the opposite of what most people expect.",
        helpfulCount: 194,
        verified: true,
      },
    ],
  },
  {
    id: "q-4",
    slug: "no-entrance-exam-online-mba-universities",
    question: "Which online MBA universities have no entrance exam at all?",
    topic: "admissions",
    askedBy: "Sneha T.",
    askedAt: "2026-08-05",
    upvotes: 189,
    views: 16870,
    tags: ["Entrance Exam", "Admission", "CAT", "Merit Based"],
    collegeIds: [
      "lpu-online",
      "amity-online",
      "dy-patil-online",
      "manipal-online",
      "shoolini-online",
      "parul-online",
      "srm-online",
      "chandigarh-university",
      "ignou",
      "sikkim-manipal",
    ],
    specialisationSlugs: [],
    relatedFaqs: ["no-entrance-exam", "admission-process", "documents-required"],
    answers: [
      {
        id: "a-4-1",
        author: "Sanjay Kulkarni",
        role: "Education Counsellor",
        credentials: "12 years in online higher education counselling",
        answer:
          "The majority of private online universities run merit-based or profile-based admission with no entrance test. LPU, Amity, Manipal, DY Patil, Chandigarh, SRM, Shoolini, Parul, Sikkim Manipal and IGNOU all admit without an entrance exam. The exceptions are the IIM executive programmes, which run a profile evaluation, and NMIMS, Christ and Amrita, which run a profile evaluation round even where they describe it as merit-based.",
        helpfulCount: 341,
        verified: true,
      },
    ],
  },
  {
    id: "q-5",
    slug: "online-mba-placement-support-genuine-or-marketing",
    question: "Is the placement support these universities advertise actually real?",
    topic: "placement",
    askedBy: "Vivek R.",
    askedAt: "2026-08-19",
    upvotes: 402,
    views: 34120,
    tags: ["Placements", "Marketing Claims", "Honest Review"],
    collegeIds: ["nmims-online", "amity-online", "manipal-online", "chandigarh-university"],
    specialisationSlugs: [],
    relatedFaqs: ["placement-support", "average-package", "what-placement-means"],
    answers: [
      {
        id: "a-5-1",
        author: "Sanjay Kulkarni",
        role: "Education Counsellor",
        credentials: "12 years in online higher education counselling",
        answer:
          "Placement support is real but it is not a job guarantee, and any university advertising a guaranteed package is overstating it. What a good placement cell actually delivers is resume review, mock interviews with faculty who know your target industry, referrals through an alumni network, and hiring drives. The difference between a strong cell and a weak one is the referral network, not the number of webinars. Ask how many alumni have transitioned in the last year, and ask for two names you can call.",
        helpfulCount: 512,
        verified: true,
      },
      {
        id: "a-5-2",
        author: "Arjun Reddy",
        role: "Verified Alumni",
        collegeId: "imt-ghaziabad",
        credentials: "IMT Ghaziabad CDL, 2022",
        answer:
          "The average package numbers in brochures are almost always pulled from the top decile of the batch. My package was near the median, not the headline. Judge a programme on its median and its referral count, not the highest number it has ever printed.",
        helpfulCount: 388,
        verified: true,
      },
    ],
  },
  {
    id: "q-6",
    slug: "best-online-mba-for-product-manager-career",
    question: "Which specialisation should a software developer pick to move into product management?",
    topic: "roi",
    askedBy: "Karthik N.",
    askedAt: "2026-09-08",
    upvotes: 158,
    views: 12400,
    tags: ["Product Management", "Career Switch", "IT"],
    collegeIds: ["manipal-online", "iim-indore", "jain-university"],
    specialisationSlugs: ["it-management", "business-analytics", "general-mba"],
    relatedFaqs: ["career-switch", "product-management", "specialisation-choice"],
    answers: [
      {
        id: "a-6-1",
        author: "Ananya Iyer",
        role: "Verified Alumni",
        collegeId: "manipal-online",
        credentials: "Manipal Online MBA, Senior PM at Flipkart",
        answer:
          "IT management if your strongest suit is delivery and stakeholder management, business analytics if you are strongest with data and want an analytics-to-PM bridge, and general management if you are two or more years into your career and want the broadest possible base. I did IT management and the roadmap-pricing piece of the syllabus did most of the work for me.",
        helpfulCount: 231,
        verified: true,
      },
    ],
  },
  {
    id: "q-7",
    slug: "online-mba-emi-interest-rate-or-zero-interest",
    question: "Are those zero-interest EMI offers on online MBA real, or is there a catch?",
    topic: "fees",
    askedBy: "Faisal A.",
    askedAt: "2026-07-30",
    upvotes: 367,
    views: 29800,
    tags: ["EMI", "Financing", "Bank Loan", "Hidden Fees"],
    collegeIds: ["lpu-online", "amity-online", "manipal-online", "chandigarh-university"],
    specialisationSlugs: [],
    relatedFaqs: ["emi-options", "hidden-costs", "bank-partners"],
    answers: [
      {
        id: "a-7-1",
        author: "Sanjay Kulkarni",
        role: "Education Counsellor",
        credentials: "12 years in online higher education counselling",
        answer:
          "Zero-interest EMI is genuinely offered by several universities because they absorb the cost, usually by partnering with a bank. The catch is usually not interest, it is the term length and the processing fee. Zero-interest plans are often capped at 24 months, so your monthly outflow is higher than a 36-month bank loan with interest. Compare total payable, not the monthly figure.",
        helpfulCount: 476,
        verified: true,
      },
    ],
  },
  {
    id: "q-8",
    slug: "online-mba-exam-mode-proctored-or-centre",
    question: "Are online MBA exams fully proctored, or do I have to travel to a centre?",
    topic: "exam",
    askedBy: "Deepak R.",
    askedAt: "2026-08-27",
    upvotes: 142,
    views: 10980,
    tags: ["Exams", "Proctoring", "Online Exam"],
    collegeIds: ["ignou", "annamalai-university", "iim-indore", "nmims-online"],
    specialisationSlugs: [],
    relatedFaqs: ["exam-mode", "exam-schedule", "proctoring-rules"],
    answers: [
      {
        id: "a-8-1",
        author: "Dr. Latha Subramanian",
        role: "Academic Expert",
        credentials: "Former faculty, School of Management Studies",
        answer:
          "Both exist and the distinction matters if you are based outside a metro. Most private universities now run proctored online exams through a third-party service with a webcam and an ID check. Open and distance universities like IGNOU and Annamalai typically still run in-centre exams at designated regional centres. The IIM executive programmes require campus attendance and a viva. Check this before you enrol, not after, because it changes your travel cost and your calendar.",
        helpfulCount: 203,
        verified: true,
      },
    ],
  },
  {
    id: "q-9",
    slug: "online-mba-worth-it-after-35",
    question: "Is an online MBA still worth it if you are 35 or older?",
    topic: "roi",
    askedBy: "Manish G.",
    askedAt: "2026-09-05",
    upvotes: 288,
    views: 21300,
    tags: ["Age", "Mid-Career", "ROI"],
    collegeIds: ["iim-kozhikode", "iim-indore", "amity-online"],
    specialisationSlugs: ["general-mba", "project-management"],
    relatedFaqs: ["age-limit", "mid-career-mba", "roi-calculator"],
    answers: [
      {
        id: "a-9-1",
        author: "Sanjay Kulkarni",
        role: "Education Counsellor",
        credentials: "12 years in online higher education counselling",
        answer:
          "Age is not the variable that decides this, the size of the salary step is. The maths works when you move from a role with a capped ceiling to a role with an open one. Use the ROI calculator on this site with your real current salary, and if the break-even lands inside three years the programme pays for itself. If it lands beyond five, pick a cheaper option instead of forcing a premium one.",
        helpfulCount: 359,
        verified: true,
      },
    ],
  },
  {
    id: "q-10",
    slug: "lpu-vs-amity-online-mba-which-to-choose",
    question: "LPU Online or Amity Online — which one should I pick?",
    topic: "comparisons",
    askedBy: "Nikhil P.",
    askedAt: "2026-08-11",
    upvotes: 447,
    views: 38750,
    tags: ["LPU", "Amity", "Head to Head", "Comparison"],
    collegeIds: ["lpu-online", "amity-online"],
    specialisationSlugs: ["general-mba", "marketing-and-sales"],
    relatedFaqs: ["lpu-review", "amity-review", "comparison-matrix"],
    answers: [
      {
        id: "a-10-1",
        author: "Sanjay Kulkarni",
        role: "Education Counsellor",
        credentials: "12 years in online higher education counselling",
        answer:
          "Amity costs more and gives you a longer programme with more specialisation options and a wider alumni base. LPU costs less, has a stronger NIRF position and a larger learner volume, which means a more active peer network. If fee is the binding constraint, LPU. If specialisation choice and alumni reach in metros matter more, Amity. Both are UGC-DEB entitled with zero-interest EMI, so neither choice carries a validity risk.",
        helpfulCount: 533,
        verified: true,
      },
      {
        id: "a-10-2",
        author: "Priya Nair",
        role: "Verified Alumni",
        collegeId: "amity-online",
        credentials: "Amity Online MBA, 2023, Brand Manager at Unilever",
        answer:
          "An alumni view. The LMS matters more than the brochure. Amity's platform was better organised for someone studying after a full workday, and the recorded session library was larger. I had a classmate on LPU in the same cohort doing the same specialisation and her experience with the mobile app was worse. Test the platform yourself before you commit.",
        helpfulCount: 287,
        verified: true,
      },
    ],
  },
  {
    id: "q-11",
    slug: "online-mba-projects-and-assignment-load",
    question: "How heavy is the project and assignment load in an online MBA?",
    topic: "lms",
    askedBy: "Sarita J.",
    askedAt: "2026-08-16",
    upvotes: 121,
    views: 9800,
    tags: ["Assignments", "Projects", "Workload"],
    collegeIds: ["iim-indore", "nmims-online", "amity-online"],
    specialisationSlugs: [],
    relatedFaqs: ["assignment-load", "project-work", "study-hours"],
    answers: [
      {
        id: "a-11-1",
        author: "Meera Raghavan",
        role: "Verified Alumni",
        collegeId: "iim-kozhikode",
        credentials: "IIM Kozhikode Executive MBA, 2024",
        answer:
          "Heavier than most people expect, and the load is concentrated in three bursts rather than spread evenly. My rough ratio was one live case assignment per eight to nine hours of study, plus a capstone. The elite programmes are heavier per hour of content. The self-paced open university programmes are lighter per hour but the exam schedule is less forgiving of a missed deadline.",
        helpfulCount: 148,
        verified: true,
      },
    ],
  },
  {
    id: "q-12",
    slug: "online-mba-refund-policy-if-you-drop-out",
    question: "What happens to the fee if I have to drop out mid-programme?",
    topic: "fees",
    askedBy: "Harsh P.",
    askedAt: "2026-08-25",
    upvotes: 196,
    views: 14300,
    tags: ["Refund", "Dropout", "Policy"],
    collegeIds: ["lpu-online", "amity-online", "nmims-online", "chandigarh-university"],
    specialisationSlugs: [],
    relatedFaqs: ["refund-policy", "dropout", "hidden-costs"],
    answers: [
      {
        id: "a-12-1",
        author: "Sanjay Kulkarni",
        role: "Education Counsellor",
        credentials: "12 years in online higher education counselling",
        answer:
          "Every university in this category offers a full or near-full refund within seven days of enrolment, and most apply a processing deduction thereafter. Past that window, refunds become partial and depend on how many semesters you have completed. Read the refund clause before you pay, not after. If a university will not tell you the refund schedule on paper, treat that as the answer.",
        helpfulCount: 297,
        verified: true,
      },
    ],
  },
];

export function getQuestionBySlug(slug: string): CommunityQuestion | undefined {
  return communityQuestions.find((q) => q.slug === slug);
}

export function getAllAnswerCount(): number {
  return communityQuestions.reduce((sum, q) => sum + q.answers.length, 0);
}
