export interface AlumniSpotlight {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  collegeId: string;
  collegeName: string;
  specialisationSlug: string;
  priorRole: string;
  priorIndustry: string;
  currentLpa: number;
  priorLpa: number;
  graduationYear: number;
  workExperience: string;
  headline: string;
  story: string;
  quote: string;
  videoLength: string;
  linkedIn: string;
  hasVideo: boolean;
  verified: boolean;
}

export const alumniSpotlights: AlumniSpotlight[] = [
  {
    id: "software-developer-to-product-manager",
    name: "Ananya Iyer",
    role: "Senior Product Manager",
    company: "Flipkart",
    image: "https://i.pinimg.com/736x/82/21/b5/8221b53df22f2f65534e5f4d1a1d11c2.jpg",
    collegeId: "manipal-online",
    collegeName: "Manipal University Online",
    specialisationSlug: "it-management",
    priorRole: "Software Developer",
    priorIndustry: "IT Services",
    currentLpa: 28,
    priorLpa: 12.5,
    graduationYear: 2023,
    workExperience: "4 years before enrolling",
    headline: "Software Developer → Senior Product Manager",
    story:
      "Ananya spent four years writing backend services before she realised she cared far more about the product decisions than the code. She picked an online MBA with an IT management specialisation specifically because it let her keep working full time while studying. The strategy and finance modules gave her the vocabulary to argue for a product roadmap, and a live case project with a Flipkart product head turned into a referral. She moved across in eleven months.",
    quote:
      "I did not need another coding course. I needed to learn how to argue for a roadmap, price a feature and convince a finance team. The MBA gave me exactly that vocabulary.",
    videoLength: "2:14",
    linkedIn: "https://i.pinimg.com/736x/82/21/b5/8221b53df22f2f65534e5f4d1a1d11c2.jpg",
    hasVideo: true,
    verified: true,
  },
  {
    id: "engineer-to-finance-lead",
    name: "Rohit Deshmukh",
    role: "FP&A Lead",
    company: "Amazon",
    image: "https://i.pinimg.com/736x/6a/fd/3a/6afd3a2e08a54a7c9fa355f59a1ee9de.jpg",
    collegeId: "lpu-online",
    collegeName: "LPU Online",
    specialisationSlug: "finance-management",
    priorRole: "Mechanical Engineer",
    priorIndustry: "Manufacturing",
    currentLpa: 22,
    priorLpa: 8,
    graduationYear: 2022,
    workExperience: "6 years before enrolling",
    headline: "Mechanical Engineer → FP&A Lead at Amazon",
    story:
      "Rohit had a strong technical background and no idea how to talk about money. He chose LPU Online because the zero-interest EMI made the fee survivable on an engineer's salary and the finance track mapped directly onto his goal of a commercial role. A capstone on cost-to-serve analysis in a manufacturing business is now a slide in his internal portfolio review.",
    quote:
      "The zero-interest EMI was the difference between enrolling this year and enrolling never. By the second semester I was already interviewing for finance roles.",
    videoLength: "1:48",
    linkedIn: "https://www.linkedin.com/",
    hasVideo: true,
    verified: true,
  },
  {
    id: "sales-to-brand-manager",
    name: "Priya Nair",
    role: "Brand Manager",
    company: "Unilever",
    image: "https://i.pinimg.com/736x/4f/d7/bc/4fd7bca8d5a045a46346fc3ece550cff.jpg",
    collegeId: "amity-online",
    collegeName: "Amity University Online",
    specialisationSlug: "marketing-and-sales",
    priorRole: "Field Sales Executive",
    priorIndustry: "FMCG",
    currentLpa: 19.5,
    priorLpa: 7.5,
    graduationYear: 2023,
    workExperience: "5 years before enrolling",
    headline: "Field Sales Executive → Brand Manager",
    story:
      "Priya had closed targets for four years running and was stuck in a district role that offered no brand exposure. The marketing and sales specialisation at Amity let her keep her job and study at night, and the live campaign module gave her a real brand brief she could present at work. She moved into brand management eighteen months after graduating.",
    quote:
      "I had been selling for years without understanding why the brand work mattered. The programme finally connected the two halves of my job.",
    videoLength: "2:02",
    linkedIn: "https://www.linkedin.com/",
    hasVideo: false,
    verified: true,
  },
  {
    id: "teacher-to-operations-director",
    name: "Vikram Shetty",
    role: "Regional Operations Director",
    company: "Zomato",
    image: "https://i.pinimg.com/1200x/1e/56/fe/1e56fea4bf56d16b2b116f047c3d90ed.jpg",
    collegeId: "chandigarh-university",
    collegeName: "Chandigarh University Online",
    specialisationSlug: "operations-management",
    priorRole: "Secondary School Teacher",
    priorIndustry: "Education",
    currentLpa: 17,
    priorLpa: 5.5,
    graduationYear: 2022,
    workExperience: "3 years before enrolling",
    headline: "Teacher → Regional Operations Director",
    story:
      "Vikram's career change was the least conventional on this list. He picked Chandigarh University for the weekend live-class format, which was the only one he could fit around a school timetable. The operations specialisation covered supply chain and lean process work, and the placement cell ran mock interviews for him for four months before he started applying.",
    quote:
      "Nobody asked me why a teacher was applying for an operations role. They asked me what I had actually delivered. That was a much better question.",
    videoLength: "1:35",
    linkedIn: "https://www.linkedin.com/",
    hasVideo: true,
    verified: true,
  },
  {
    id: "nurse-to-healthcare-consultant",
    name: "Sneha Kulkarni",
    role: "Healthcare Consultant",
    company: "Apollo Hospitals",
    image: "https://i.pinimg.com/736x/31/d9/24/31d924ac17e532ffa414ec42bb13e8bb.jpg",
    collegeId: "nmims-online",
    collegeName: "NMIMS Global Access",
    specialisationSlug: "healthcare-management",
    priorRole: "Staff Nurse",
    priorIndustry: "Hospitality",
    currentLpa: 14,
    priorLpa: 6,
    graduationYear: 2023,
    workExperience: "7 years before enrolling",
    headline: "Staff Nurse → Healthcare Consultant",
    story:
      "Sneha ran a ward for seven years and had opinions on every inefficiency the hospital ignored. NMIMS' case-method curriculum gave her the financial and operations language to make those opinions land. Her capstone on patient flow reduction in an emergency department became her interview piece.",
    quote:
      "Seven years on a ward taught me what was broken. The MBA taught me how to write the proposal that gets it fixed.",
    videoLength: "1:52",
    linkedIn: "https://www.linkedin.com/",
    hasVideo: false,
    verified: true,
  },
  {
    id: "fresher-to-business-analyst",
    name: "Karan Malhotra",
    role: "Business Analyst",
    company: "Deloitte",
    image: "https://i.pinimg.com/736x/37/71/4f/37714fc967378d97d443f87a0c372d39.jpg",
    collegeId: "jain-university",
    collegeName: "Jain University Online",
    specialisationSlug: "business-analytics",
    priorRole: "Graduate Trainee",
    priorIndustry: "Consulting",
    currentLpa: 11,
    priorLpa: 4.8,
    graduationYear: 2024,
    workExperience: "Fresher at enrolment",
    headline: "Fresher → Business Analyst at Deloitte",
    story:
      "Karan had no work experience when he enrolled, which rules out most executive programmes. Jain's merit-based admission and analytics specialisation took him in, and the business analytics module with live SQL projects is what his interview loop actually tested. He joined Deloitte four months after graduating.",
    quote:
      "I was worried a fresher would be taken seriously. The merit route meant I never had to argue about work experience, only about what I could build.",
    videoLength: "1:41",
    linkedIn: "https://www.linkedin.com/",
    hasVideo: true,
    verified: true,
  },
  {
    id: "developer-to-ai-engineer",
    name: "Meera Raghavan",
    role: "Machine Learning Engineer",
    company: "Fractal Analytics",
    image: "https://i.pinimg.com/736x/72/87/39/728739dc716f5d184b5e60f80f1db9b5.jpg",
    collegeId: "iim-kozhikode",
    collegeName: "IIM Kozhikode (Executive)",
    specialisationSlug: "ai-and-machine-learning",
    priorRole: "Software Developer",
    priorIndustry: "IT Services",
    currentLpa: 34,
    priorLpa: 14,
    graduationYear: 2024,
    workExperience: "8 years before enrolling",
    headline: "Software Developer → ML Engineer, 2.4x salary",
    story:
      "Meera's jump came from combining an engineering base with a management credential. IIM Kozhikode's profile evaluation process and the campus residency were the turning point — the residency is where she met her current hiring manager. She calls the two-year investment the easiest financial decision she has made.",
    quote:
      "The campus residency was the single most valuable four days of the programme. That is where the job actually happened.",
    videoLength: "2:26",
    linkedIn: "https://www.linkedin.com/",
    hasVideo: true,
    verified: true,
  },
  {
    id: "bpo-to-hr-business-partner",
    name: "Sunil Patil",
    role: "HR Business Partner",
    company: "Infosys",
    image: "https://i.pravatar.cc/150?img=13",
    collegeId: "symbiosis-scdl",
    collegeName: "Symbiosis SCDL",
    specialisationSlug: "hr-management",
    priorRole: "Customer Support Associate",
    priorIndustry: "BPO",
    currentLpa: 9.5,
    priorLpa: 3.9,
    graduationYear: 2023,
    workExperience: "5 years before enrolling",
    headline: "BPO Associate → HR Business Partner",
    story:
      "Sunil picked Symbiosis because the total fee was the only one he could manage on a BPO salary. The HR specialisation moved him from handling escalations to handling workforce planning, and the alumni network on the closed forum referred him directly to an Infosys recruitment drive.",
    quote:
      "I could not afford a ₹2 lakh programme. Symbiosis cost less than one month of my old rent, and it changed my career.",
    videoLength: "1:44",
    linkedIn: "https://www.linkedin.com/",
    hasVideo: false,
    verified: true,
  },
  {
    id: "engineer-to-project-director",
    name: "Arjun Reddy",
    role: "Program Manager",
    company: "Larsen & Toubro",
    image: "https://i.pinimg.com/736x/a5/fd/b5/a5fdb5717ab7c630fbaa8e0518fa75ac.jpg",
    collegeId: "imt-ghaziabad",
    collegeName: "IMT Ghaziabad (CDL)",
    specialisationSlug: "project-management",
    priorRole: "Site Engineer",
    priorIndustry: "Infrastructure",
    currentLpa: 21,
    priorLpa: 10,
    graduationYear: 2022,
    workExperience: "7 years before enrolling",
    headline: "Site Engineer → Program Manager",
    story:
      "Arjun had managed a ₹40 crore site but had no exposure to portfolio-level planning. IMT Ghaziabad's project management module and its reputation with infrastructure employers did the rest — he received two internal referral requests from alumni within a week of finishing.",
    quote:
      "The alumni network is not a LinkedIn group. Alumni actually send you referrals for roles you never applied to.",
    videoLength: "1:58",
    linkedIn: "https://www.linkedin.com/",
    hasVideo: true,
    verified: true,
  },
  {
    id: "export-executive-to-global-manager",
    name: "Ayesha Khan",
    role: "Regional Export Manager",
    company: "Tata Motors",
    image: "https://i.pinimg.com/736x/f6/ca/4b/f6ca4bc56f7d5855c03ca97fcf963590.jpg",
    collegeId: "upes-online",
    collegeName: "UPES Online",
    specialisationSlug: "international-business-management",
    priorRole: "Export Documentation Executive",
    priorIndustry: "Logistics",
    currentLpa: 15.5,
    priorLpa: 7,
    graduationYear: 2023,
    workExperience: "4 years before enrolling",
    headline: "Export Executive → Regional Export Manager",
    story:
      "Ayesha had been processing export documents for years without owning a market. UPES' international business specialisation, with its cross-border trade modules, gave her the commercial picture. She now owns two markets in the Middle East.",
    quote:
      "I knew every document in an export file and nothing about the market it belonged to. That gap closed in one programme.",
    videoLength: "1:39",
    linkedIn: "https://www.linkedin.com/",
    hasVideo: false,
    verified: true,
  },
];

export function getAlumniByCollege(collegeId: string): AlumniSpotlight[] {
  return alumniSpotlights.filter((a) => a.collegeId === collegeId);
}

export function getAlumniBySpecialisation(slug: string): AlumniSpotlight[] {
  return alumniSpotlights.filter((a) => a.specialisationSlug === slug);
}
