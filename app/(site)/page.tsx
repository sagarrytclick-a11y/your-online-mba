import type { Metadata } from "next";
import Hero from "../Components/Hero";
import StatsBand from "../Components/StatsBand";
import ServicesSection from "../Components/ServicesSection";
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
import { services } from "../data/services";
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

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Your Online MBA Services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `${SITE_URL}/services/${s.slug}`,
  })),
};

export const metadata: Metadata = buildMetadata({
  title: "Online MBA India 2026 + EdTech Growth Services | Your Online MBA",
  description:
    "India's trusted online MBA advisor & EdTech growth partner: compare UGC-approved Online MBA programs (LPU, Amity, NMIMS, Manipal) with free counselling, plus consulting, marketing, lead generation & web development services for EdTech brands.",
  path: "/",
  keywords: [
    "online MBA in India",
    "UGC-DEB approved online MBA",
    "online MBA universities",
    "online MBA fees",
    "compare online MBA programs",
    "online MBA admission 2026",
    "online MBA counselling",
    "online MBA admission assistance",
    "edtech consulting company India",
    "education performance marketing agency",
    "online MBA lead generation",
    "edtech website development",
  ],
});

const page = () => {
  return (
    <div className="relative flex flex-col items-center bg-[#080a10] justify-center w-full overflow-hidden">
      {/* Ambient backdrop: brand glows + dot grid (hero canvas continues) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-[-10%] h-[38rem] w-[38rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(224,36,74,0.10), transparent 65%)" }} />
        <div className="absolute top-[28%] right-[-12%] h-[42rem] w-[42rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(76,29,149,0.22), transparent 65%)" }} />
        <div className="absolute top-[55%] left-[-12%] h-[40rem] w-[40rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(224,36,74,0.07), transparent 65%)" }} />
        <div className="absolute bottom-[-6%] right-[20%] h-[30rem] w-[30rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,138,61,0.06), transparent 65%)" }} />
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="square-grid absolute inset-0 opacity-80" />
      </div>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={servicesSchema} />
      <Hero />
      <StatsBand />
      <ServicesSection />
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