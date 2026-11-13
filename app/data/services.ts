/**
 * Services offered by Your Online MBA — two divisions:
 *  - "learners":       services for students & working professionals
 *  - "edtech-brands":  B2B growth & delivery services for EdTech companies,
 *                      universities and BPO partners
 * Content is written in-house; structure inspired by leading EdTech growth
 * partners, not copied from any source.
 */

export type ServiceCategory = "learners" | "edtech-brands";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  step: string;
  detail: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  highlights: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: "online-mba-counselling",
    title: "Online MBA Counselling & Admission Assistance",
    shortTitle: "MBA Counselling",
    category: "learners",
    tagline: "From shortlist to admission — free, unbiased, human guidance.",
    description:
      "Free 1-on-1 counselling for anyone comparing online MBA, online BBA, MCA and distance-learning programmes. We match your budget, work experience, city and career goal to UGC-DEB approved universities, negotiate scholarships and EMIs, and run the entire admission paperwork for you — at no cost to you.",
    highlights: [
      "Unbiased shortlist across 100+ UGC-DEB & AICTE approved universities",
      "Fee, ROI and salary-hike comparison before you commit",
      "Scholarship, early-bird and corporate discount negotiation",
      "Document collection, form filling and admission tracking",
      "EMI structuring with 0-cost and no-cost options",
      "Dedicated counsellor on WhatsApp until enrolment day",
    ],
    process: [
      { step: "Understand", detail: "15-minute call to map your budget, timeline and career target." },
      { step: "Shortlist", detail: "We compare fees, accreditation, rankings and placement data for you." },
      { step: "Apply", detail: "We handle forms, documents, scholarship requests and follow-ups." },
      { step: "Enrol", detail: "Admission confirmation, fee-receipt guidance and on-boarding support." },
    ],
    faqs: [
      { question: "Is the counselling really free?", answer: "Yes. Universities compensate us on admission, so our advisory is completely free for students — and always unbiased, because we recommend fit, not the highest payout." },
      { question: "Which universities can I apply to?", answer: "Any UGC-DEB approved university we partner with — including Amity, LPU, NMIMS Global, Manipal, Chandigarh University, Symbiosis and 20+ others. We also guide you to non-partner universities if that's the right fit." },
      { question: "How fast is the admission process?", answer: "Most online MBA admissions close within 7–15 days of document submission. Your counsellor tracks every step and chases the university on your behalf." },
    ],
    keywords: ["online MBA counselling", "online MBA admission assistance", "distance MBA admission", "free MBA career counselling India"],
  },
  {
    slug: "career-placement-assistance",
    title: "Career & Placement Assistance",
    shortTitle: "Career & Placement",
    category: "learners",
    tagline: "Turn your degree into a salary hike — resume to offer letter.",
    description:
      "A degree alone doesn't raise your salary — positioning does. Our career desk rebuilds your resume and LinkedIn, prepares you for interviews with mock rounds, and connects you to 500+ hiring partners across consulting, analytics, BFSI and e-commerce.",
    highlights: [
      "ATS-friendly resume and LinkedIn profile rewrite",
      "1-on-1 mock interviews with industry panellists",
      "Career-gap and switch roadmaps (tech ↔ non-tech)",
      "Placement referrals into 500+ hiring partners",
      "Salary-negotiation and offer-evaluation support",
      "Post-admission career mentoring for 12 months",
    ],
    process: [
      { step: "Profile audit", detail: "We benchmark your resume and LinkedIn against target roles." },
      { step: "Rebuild", detail: "Resume, LinkedIn and portfolio rebuilt around measurable outcomes." },
      { step: "Practise", detail: "Mock interviews, case prep and behavioural grilling until you're ready." },
      { step: "Place", detail: "Referrals to 500+ hiring partners and offer-negotiation support." },
    ],
    faqs: [
      { question: "Is placement assistance only for online MBA students?", answer: "It's built for online MBA and online-degree learners but open to any working professional preparing for a role switch in management tracks." },
      { question: "What salary hike can I expect?", answer: "Students who combine a UGC-approved online MBA with our career programme typically report 40–80% hikes or role upgrades within 6–18 months of graduation." },
    ],
    keywords: ["MBA placement assistance", "online MBA career support", "resume for MBA fresher", "MBA job referral India"],
  },
  {
    slug: "edtech-consulting",
    title: "EdTech Consulting",
    shortTitle: "EdTech Consulting",
    category: "edtech-brands",
    tagline: "Admissions funnel audits and growth roadmaps, education-first.",
    description:
      "Strategy built for how education actually sells — long decision cycles, trust-driven conversations and compliance-aware messaging. We audit your admissions funnel end-to-end, fix program-market fit, structure university and channel-partner onboarding, and hand you a sequenced 90-day growth roadmap.",
    highlights: [
      "End-to-end admissions funnel audit (traffic → enrolment)",
      "Program-market fit and pricing-positioning diagnostics",
      "University, LMS and channel-partner onboarding playbooks",
      "Cohort economics: CAC, payback period and LTV modelling",
      "Compliance-aware messaging (UGC-DEB, AICTE, NAAC aligned)",
      "Quarterly growth roadmaps with your team, not just slides",
    ],
    process: [
      { step: "Audit", detail: "We tear down your funnel, site, creatives and calling data in week one." },
      { step: "Diagnose", detail: "We pinpoint the 3–5 highest-leverage leaks costing you admissions." },
      { step: "Roadmap", detail: "A sequenced 90-day plan across marketing, tech and calling." },
      { step: "Review", detail: "Bi-weekly reviews against enrolment targets, not vanity metrics." },
    ],
    faqs: [
      { question: "Do you work with universities or EdTech startups?", answer: "Both — universities launching online vertical, EdTech platforms scaling admissions, and channel partner networks building distribution." },
      { question: "How is this different from a generic consulting firm?", answer: "We've sat inside admissions desks and media dashboards for online degrees. Every recommendation is built for education's long, multi-touch buying journey — not generic B2B funnels." },
    ],
    keywords: ["edtech consulting India", "online degree growth consultant", "admissions funnel audit", "university partnership consulting"],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing for Education",
    shortTitle: "Performance Marketing",
    category: "edtech-brands",
    tagline: "Campaigns optimised for cost-per-qualified-lead, not reach.",
    description:
      "Google, Meta, YouTube and programmatic campaigns engineered for education's long buying cycles — from first click to counsellor-qualified lead. Every rupee is tracked against cost-per-qualified-lead and cost-per-admission, not impressions.",
    highlights: [
      "Google Search, Meta, YouTube and programmatic under one roof",
      "Cost-per-qualified-lead (CPQL) as the north-star metric",
      "Landing page + creative testing loops every two weeks",
      "Audience building for working professionals & career switchers",
      "CRM-integrated offline conversion tracking",
      "Weekly reporting against cost-per-admission",
    ],
    process: [
      { step: "Baseline", detail: "We benchmark your current CPL, CPQL and cost-per-admission." },
      { step: "Launch", detail: "Campaign structures, creatives and landing pages go live in 10 days." },
      { step: "Optimise", detail: "Weekly creative/audience iterations driven by qualification data." },
      { step: "Scale", detail: "Budget moves to what converts — paused what doesn't, aggressively." },
    ],
    faqs: [
      { question: "What budgets do you manage?", answer: "From ₹1.5L/month for single-program launches to ₹50L+/month multi-university portfolios. We'll tell you honestly if your budget can't support statistically valid testing." },
      { question: "Do you share ad account access?", answer: "Yes — we run everything inside your ad accounts with full transparency. You keep all data, audiences and pixels if you leave." },
    ],
    keywords: ["education performance marketing", "online MBA lead generation agency", "CPQL for education", "Google ads for universities India"],
  },
  {
    slug: "lead-generation",
    title: "Lead Generation & Sales Solutions",
    shortTitle: "Lead Generation",
    category: "edtech-brands",
    tagline: "Multi-channel lead gen that hands your desk sales-ready conversations.",
    description:
      "We fill your counselling desk with high-intent enquiries — search, social, SEO content, affiliates and referral engines — cleaned, de-duplicated and delivered CRM-ready with lead scoring, so your team dials conversations, not spreadsheets.",
    highlights: [
      "Multi-channel engine: search, social, SEO, affiliates, referrals",
      "Lead scoring by intent, program fit and contactability",
      "CRM-ready delivery (Salesforce, Zoho, LeadSquared, custom)",
      "Counselling-desk playbooks: SLAs, scripts and objection handling",
      "Duplicate and invalid lead filtering before handoff",
      "Cost-per-admission reporting across channels",
    ],
    process: [
      { step: "Map", detail: "We profile your ideal admit and reverse-engineer where they come from." },
      { step: "Build", detail: "Channels, creatives, landing pages and CRM pipelines go live." },
      { step: "Qualify", detail: "Every lead is scored and filtered before it reaches your desk." },
      { step: "Handoff", detail: "CRM-ready leads + desk playbooks + weekly pipeline reviews." },
    ],
    faqs: [
      { question: "Can you generate leads for a brand-new program?", answer: "Yes — we've launched greenfield programs from zero using SEO-led content, affiliate walls and performance bursts, then stabilised with always-on search." },
      { question: "How do you prevent junk leads?", answer: "Structured qualification forms, OTP verification, duplicate/invalid filtering and AI scoring ensure only contactable, in-intent leads reach your counsellors." },
    ],
    keywords: ["online MBA leads", "education lead generation agency", "qualified MBA leads India", "admission lead generation"],
  },
  {
    slug: "website-crm-development",
    title: "Software & Website Development",
    shortTitle: "Web & Software",
    category: "edtech-brands",
    tagline: "Websites and CRMs built to convert visits into admissions.",
    description:
      "SEO-friendly, conversion-focused websites, admissions portals and internal tools for education businesses — engineered to load fast, rank well and turn traffic into form-fills. From marketing sites to full CRM and counsellor-desk dashboards.",
    highlights: [
      "Conversion-first EdTech websites (Next.js, Core Web Vitals 90+)",
      "Admission portals: enquiry → application → fee payment",
      "Custom CRM & counsellor-desk dashboards with call tracking",
      "LMS and payment-gateway integrations",
      "Technical SEO: schema, sitemaps, programmatic pages at scale",
      "Ongoing maintenance, analytics and CRO experiments",
    ],
    process: [
      { step: "Discover", detail: "We map journeys — student, counsellor, admin — before a pixel is drawn." },
      { step: "Design", detail: "Wireframes and UI reviewed against your conversion data." },
      { step: "Build", detail: "Shipped in sprints — SEO, speed and tracking baked in from day one." },
      { step: "Grow", detail: "Post-launch CRO cycles: every release is measured against admissions." },
    ],
    faqs: [
      { question: "Can you rebuild just our website, not the CRM?", answer: "Absolutely — from standalone marketing sites to full portal + CRM builds, we scope only what moves your admissions needle." },
      { question: "Do you handle content and SEO too?", answer: "Yes. We ship with technical SEO (schema, internal linking, sitemaps) and can run ongoing content programs for programmatic scale." },
    ],
    keywords: ["edtech website development", "admissions portal development", "education CRM development", "online MBA website design"],
  },
  {
    slug: "bpo-channel-partnership",
    title: "BPO Projects & Channel Partnerships",
    shortTitle: "BPO Partnership",
    category: "edtech-brands",
    tagline: "Live outbound EdTech calling projects for qualified BPO partners.",
    description:
      "For BPO partners with 5+ trained seats: genuine outbound calling projects for online degrees — warm lead pipeline, call scripts, qualification workflows, payouts per converted admission and no earning cap. We handle training and QA; you run the desk.",
    highlights: [
      "5+ seats minimum with prior calling experience",
      "Warm, pre-qualified education lead pipeline supplied daily",
      "Full training: scripts, objection handling, compliance",
      "Payout per qualified admission — no earning cap",
      "Dedicated QA, call monitoring and feedback loops",
      "Transparent weekly settlements and pipeline reviews",
    ],
    process: [
      { step: "Apply", detail: "Share your seat count, experience and infrastructure — we verify fit." },
      { step: "Onboard", detail: "Training, scripts, CRM access and calling setup in week one." },
      { step: "Dial", detail: "Warm leads flow daily; QA and coaching from week one." },
      { step: "Scale", detail: "Grow seats as conversions prove out — no cap on earnings." },
    ],
    faqs: [
      { question: "What are the requirements to become a partner?", answer: "A registered BPO or calling team with 5+ experienced seats, basic telephony/CRM setup and willingness to follow compliance — we audit and train the rest." },
      { question: "How and when are payouts made?", answer: "Weekly settlements against verified qualified admissions — transparent sheets, no clawbacks for quality leads, no cap on what your desk can earn." },
    ],
    keywords: ["edtech BPO partnership", "online MBA calling project", "education telecalling payout", "channel partner program education"],
  },
  {
    slug: "ai-lead-qualification",
    title: "AI-Powered Lead Qualification",
    shortTitle: "AI Lead Qualification",
    category: "edtech-brands",
    tagline: "Every enquiry scored before a human dials — cut wasted calls by 60%.",
    description:
      "Most leads are invalid, duplicated or wrong-fit — calling them all burns your desk. Our AI qualification layer validates contactability, scores intent and program-fit, flags duplicates and routes only sales-ready enquiries to your counsellors, with reasons attached.",
    highlights: [
      "Instant validation: number reachability, WhatsApp activity, duplicates",
      "Intent scoring across 20+ education-specific signals",
      "Auto-disqualification with reasons — no black box",
      "CRM and dialer integration with real-time routing",
      "Feedback loop: converts outcomes back into the model weekly",
      "Counsellor hours reclaimed: typically 60% fewer dead dials",
    ],
    process: [
      { step: "Connect", detail: "We plug into your CRM, forms and dialer in under two weeks." },
      { step: "Score", detail: "Every lead gets a 0–100 intent score with human-readable reasons." },
      { step: "Route", detail: "Sales-ready leads route instantly; weak ones enter nurture." },
      { step: "Learn", detail: "Outcomes retrain the model weekly — precision compounds." },
    ],
    faqs: [
      { question: "Will this replace my counsellors?", answer: "No — it replaces dead dials. Your counsellors talk to fewer, better-fit leads and close more per hour." },
      { question: "How fast do we see results?", answer: "Validation benefits start day one; scoring precision materially improves within the first 2–3 weeks of outcome feedback." },
    ],
    keywords: ["AI lead qualification education", "lead scoring for admissions", "invalid lead filtering", "edtech AI telecalling"],
  },
];

export const learnerServices = services.filter((s) => s.category === "learners");
export const edtechServices = services.filter((s) => s.category === "edtech-brands");

/** Titles used in the service-lead form dropdown */
export const serviceTitles = [...services.map((s) => s.title), "Not sure yet — need guidance"] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
