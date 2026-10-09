import type { Metadata } from "next";
import Hero from "../Components/Hero";
import StatsBand from "../Components/StatsBand";
import WhyChooseUs from "../Components/WhyChooseUs";
import HomeTools from "../Components/HomeTools";
import SpecialisationsSection from "../Components/SpecialisationsSection";
import ComparisonSection from "../Components/ComparisonSection";
import RankingsTable from "../Components/RankingsTable";
import UniversitiesSection from "../Components/UniversitiesSection";
import CareerOptionsSection from "../Components/CareerOptionsSection";
import HiringSection from "../Components/HiringSection";
import CurriculumTimeline from "../Components/CurriculumTimeline";
import SuccessStories from "../Components/SuccessStories";
import FAQSection from "../Components/FAQSection";
import CTASection from "../Components/CTASection";
import JsonLd from "../Components/JsonLd";
import { siteConfig } from "../data/site";
import { SITE_URL, buildMetadata } from "../lib/seo";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "S0-2, Geniefolks Building (2nd Floor), Block A, Plot No. A-28, Sector 4",
    addressLocality: siteConfig.city,
    addressRegion: siteConfig.state,
    postalCode: "201301",
    addressCountry: "IN",
  },
  sameAs: siteConfig.socials.map((s) => s.url),
  areaServed: "IN",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: SITE_URL,
  publisher: { "@type": "Organization", name: siteConfig.name },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/reviews?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What exactly does an online MBA program offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An online MBA offers the same curriculum as a full-time program, including leadership training, networking opportunities, and specialized tracks, but with the flexibility to learn from anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "What is the typical duration to complete an online MBA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most programs range from 12 to 24 months, depending on whether you choose an accelerated track or a part-time pace.",
      },
    },
    {
      "@type": "Question",
      name: "Which are the leading Indian colleges providing online MBA courses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Options include LPU Online, Amity University Online, Manipal University Jaipur, and NMIMS Global Access. Program formats and recognition vary, so verify UGC-DEB entitlement for the exact degree and admission session.",
      },
    },
    {
      "@type": "Question",
      name: "What qualifications do you need to join an online MBA program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally, you need a Bachelor's degree from a recognized university. Some top-tier programs also require 2-3 years of work experience.",
      },
    },
    {
      "@type": "Question",
      name: "Is the value of an online MBA comparable to a traditional MBA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, as long as the program is UGC-DEB approved, it holds the same legal value for government and private sector jobs.",
      },
    },
  ],
};

export const metadata: Metadata = buildMetadata({
  title: "Online MBA - Top UGC-Approved Universities in India 2026",
  description:
    "Compare India's best Online MBA programs from LPU, Amity, NMIMS, Manipal, Chandigarh University & more. UGC-approved, EMI options, placement support. Get free counselling.",
  path: "/",
  keywords: [
    "online MBA in India",
    "UGC-DEB approved online MBA",
    "online MBA universities",
    "online MBA fees",
    "compare online MBA programs",
    "online MBA admission 2026",
  ],
});

const page = () => {
  return (
    <div className="flex flex-col items-center bg-white justify-center w-full">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />
      <Hero />
      <StatsBand />
      <HomeTools />
      <WhyChooseUs />
      <SpecialisationsSection />
      <ComparisonSection />
      <RankingsTable />
      <UniversitiesSection />
      <CareerOptionsSection />
      <HiringSection />
      <CurriculumTimeline />
      <SuccessStories />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default page;