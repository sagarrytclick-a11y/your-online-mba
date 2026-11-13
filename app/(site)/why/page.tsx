import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  BadgeCheck,
  Gauge,
} from "lucide-react";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/app/lib/seo";
import { siteConfig } from "@/app/data/site";
import JsonLd from "@/app/Components/JsonLd";
import PopupTrigger from "@/app/Components/PopupTrigger";
import WhyFactsCard from "./WhyFactsCard";

export const metadata: Metadata = buildMetadata({
  title: "Why Your Online MBA — Accountable, Not Just Advisory",
  description:
    "Why 5 Lakh+ learners chose Your Online MBA: honest university shortlists, UGC-DEB verified programs, done-for-you admissions, scholarships and EMI negotiation — plus EdTech growth services for brands. Not advice you act on alone — outcomes we're accountable for.",
  path: "/why",
  keywords: [
    "why Your Online MBA",
    "best online MBA advisor India",
    "online MBA consultants India",
    "trusted online degree advisory",
    "unbiased online MBA counselling",
    "edtech growth partner India",
  ],
});

const whyPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Why Your Online MBA",
  url: `${SITE_URL}/why`,
  description:
    "Your Online MBA is India's independent online-MBA advisory — accountable for learner outcomes, built for honest shortlists and done-for-you admissions.",
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: SITE_URL,
    parentOrganization: {
      "@type": "Organization",
      name: "JP Technologies",
      url: "https://jptechnologies.co",
    },
  },
};

const numberedReasons = [
  {
    n: "01",
    title: "Advice grounded in your actual goals",
    text: "Every shortlist starts with your budget, experience, city and career target — not with a university's payout chart. If a loud, well-marketed program is wrong for you, we say so.",
  },
  {
    n: "02",
    title: "Counselling and execution under one roof",
    text: "The team that plans your shortlist also runs it — scholarship negotiation, EMI structuring, document collection, form filling and admission tracking — not a handoff to a caller you never met.",
  },
  {
    n: "03",
    title: "UGC-DEB verified, compliance-aware",
    text: "We only ever shortlist programs with verified UGC-DEB / AICTE / NAAC entitlement — so the degree works for government jobs, promotions and higher education, not just your signature.",
  },
  {
    n: "04",
    title: "Measured in outcomes, not activity",
    text: "We track admissions into the right program, fees you actually pay, placement support you receive and salary you actually earn — not enquiry counts that make us look busy.",
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "No mis-selling, ever",
    text: "We recommend fit over payout. Walk away with clarity even if it costs us the commission.",
  },
  {
    icon: BadgeCheck,
    title: "Verified programs only",
    text: "UGC-DEB / AICTE / NAAC entitlement checked for every degree we put in front of you.",
  },
  {
    icon: Gauge,
    title: "Outcomes over vanity",
    text: "Salary hikes, placements and ROI — the numbers that decide your MBA, not brochure claims.",
  },
];

const related = [
  { label: "Online MBA counselling", desc: "Free 1-on-1 guidance, shortlist to admission.", href: "/services/online-mba-counselling" },
  { label: "Career & placement assistance", desc: "Resume, interviews and 500+ hiring partners.", href: "/services/career-placement-assistance" },
  { label: "Find My Program", desc: "5-step quiz — get a personalised shortlist in minutes.", href: "/find-my-program" },
  { label: "Compare programs", desc: "Fees, EMI, NIRF, placement — side by side.", href: "/compare-programs" },
  { label: "ROI calculator", desc: "Five-year payoff at your salary.", href: "/roi-calculator" },
  { label: "Scholarships & EMI", desc: "Eligibility checker for merit and corporate waivers.", href: "/scholarships" },
];

export default function WhyPage() {
  return (
    <div className="w-full bg-[#080a10] text-[#f1f5f9]">
      <JsonLd data={whyPageSchema} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why Your Online MBA", path: "/why" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 88% -10%, rgba(224,36,74,0.28), transparent 60%), radial-gradient(700px 480px at -12% 45%, rgba(76,29,149,0.32), transparent 58%)",
          }}
        />
        <div aria-hidden className="square-grid absolute inset-0 opacity-80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <nav className="flex items-center gap-2 text-xs font-bold text-[#7c8798] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#e0244a] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#c4cbd8]">Why Your Online MBA</span>
            </nav>

            <p className="inline-flex items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-[#ff5c7a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
              Independent · Learner-First
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight max-w-3xl">
              Not just advice —<br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">
                  accountable for your outcome
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 320 14" fill="none" aria-hidden>
                  <path d="M4 10 C60 3, 120 3, 165 8 C220 13, 270 5, 316 8" stroke="url(#swashWhy)" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
                  <defs>
                    <linearGradient id="swashWhy" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#e0244a" />
                      <stop offset="1" stopColor="#ff8a3d" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-[#a8b3c5] text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
              We compare 1000+ online degree programs on fees, ROI and placement data — then stay
              with you till the offer letter. And for EdTech brands, the same accountability runs
              through our growth services — every recommendation measured in admissions, not activity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PopupTrigger className="group inline-flex h-14 items-center gap-2 px-8 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-sm sm:text-base font-extrabold text-white shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]">
                Book a Free Counselling
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </PopupTrigger>
              <Link
                href="/services"
                className="inline-flex h-14 items-center px-8 rounded-full border border-white/15 text-sm sm:text-base font-bold text-[#f1f5f9] hover:border-[#e0244a]/50 hover:text-white transition-all"
              >
                See Our Services
              </Link>
            </div>
          </div>

          {/* Rotating fact card */}
          <div className="lg:col-span-5">
            <WhyFactsCard />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-5 md:grid-cols-2">
        {/* Mission — gradient-edged like the reference */}
        <div className="rounded-3xl p-[1.5px] bg-gradient-to-br from-[#ff8a3d] via-[#e0244a] to-[#C81E3D]/40 shadow-[0_25px_60px_rgba(224,36,74,0.15)]">
          <div className="h-full rounded-[22.5px] bg-[#14161d] p-7 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#ff5c7a]">
              Our Mission
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]">
              Give every learner one honest shortlist — and every EdTech brand one accountable partner.
            </h2>
            <p className="mt-4 text-[#a8b3c5] text-sm sm:text-base font-medium leading-relaxed">
              Most education businesses grow by patching vendors together — a consultant for strategy,
              an agency for ads, a dev shop for the site, a caller for outreach — each optimising a
              slice, none accountable for the enrolled student at the end. On the learner side, the
              same gap exists: brochures instead of advice. Our mission is to replace both with one team.
            </p>
            <p className="mt-4 text-[#a8b3c5] text-sm sm:text-base font-medium leading-relaxed">
              As the education advisory behind 5 Lakh+ learners and the growth partner behind online-degree
              brands, every engagement we run — counselling, marketing, technology or calling — is judged
              against the same number: <span className="text-[#ff5c7a] font-bold">admissions, and the outcomes after them.</span>
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="rounded-3xl border border-white/5 bg-[#10131a] p-7 sm:p-10 flex flex-col">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#c4cbd8] w-fit">
            Our Vision
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]">
            To become India&apos;s most trusted online-degree advisory — and the growth partner behind its education brands.
          </h2>
          <p className="mt-4 text-[#a8b3c5] text-sm sm:text-base font-medium leading-relaxed">
            We want to be the first call a learner makes when an MBA is on their mind — and the first
            name an EdTech founder thinks of when admissions need to scale with integrity.
          </p>
          <p className="mt-4 text-[#a8b3c5] text-sm sm:text-base font-medium leading-relaxed">
            That means earning trust the slow way: transparent fees, verified entitlement, honest
            outcomes reporting — metrics that matter to your career, never vanity metrics that flatter our deck.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest text-[#7c8798]">
            <span className="rounded-full border border-white/5 bg-[#14161d] px-3 py-1.5">Independent</span>
            <span className="rounded-full border border-white/5 bg-[#14161d] px-3 py-1.5">Learner-first</span>
            <span className="rounded-full border border-white/5 bg-[#14161d] px-3 py-1.5">Outcome-obsessed</span>
          </div>
        </div>
      </section>

      {/* Why learners choose us — numbered 2x2 */}
      <section className="relative overflow-hidden border-t border-white/5 py-14 px-4 sm:px-6 lg:px-8">
        <div aria-hidden className="square-grid absolute inset-0 opacity-60" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.22em]">Why Learners Choose Us</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl">
            Why 5 Lakh+ learners start their MBA journey with us
          </h2>
          <p className="mt-3 text-[#8b96a8] text-sm sm:text-base font-medium max-w-2xl">
            Advice only matters if it ships. Here&apos;s what it looks like in practice.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {numberedReasons.map((r) => (
              <div
                key={r.n}
                className="group rounded-3xl border border-white/5 bg-[#14161d] p-6 sm:p-7 transition-all duration-300 hover:border-[#e0244a]/40 hover:-translate-y-1"
              >
                <span className="text-xs font-black text-[#ff5c7a] tracking-[0.25em]">{r.n}</span>
                <h3 className="mt-3 text-lg sm:text-xl font-extrabold leading-snug">{r.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8b96a8] font-medium">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars + stats strip */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/5 bg-[#14161d] p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] text-white shadow-[0_6px_16px_rgba(224,36,74,0.35)]">
                  <p.icon size={20} />
                </span>
                <p className="mt-4 text-sm font-extrabold text-[#f5f7fa] leading-snug">{p.title}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#8b96a8] font-medium">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-5">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#8b96a8]">The Scoreboard</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[
                { value: "5L+", label: "Learners guided" },
                { value: "1000+", label: "Programs compared" },
                { value: "22+", label: "Top universities" },
                { value: "40%+", label: "Avg salary hike" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[#e0244a]/15 bg-[#2B141A]/30 p-5">
                  <p className="text-2xl sm:text-3xl font-black text-[#f5f7fa]">{s.value}</p>
                  <p className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b96a8]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related guides and services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Where to go next</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group rounded-2xl border border-white/5 bg-[#14161d] p-5 transition-all duration-300 hover:border-[#e0244a]/40 hover:-translate-y-1"
            >
              <p className="text-sm font-extrabold text-[#f5f7fa] group-hover:text-white">{r.label}</p>
              <p className="mt-1.5 text-[11px] leading-snug text-[#8b96a8] font-medium">{r.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#e0244a]">
                Open <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] p-8 sm:p-12 text-center shadow-[0_30px_80px_rgba(224,36,74,0.35)]">
          <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/15 blur-3xl" />
          <h2 className="relative text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight max-w-2xl mx-auto">
            Ready to bet on the right seat, not the loudest brochure?
          </h2>
          <p className="relative mt-3 text-white/85 text-sm sm:text-base font-medium max-w-xl mx-auto">
            One honest call with a counsellor — your shortlist, scholarships and EMI plan included. Free.
          </p>
          <PopupTrigger className="relative mt-6 inline-flex h-14 items-center gap-2 px-8 rounded-full bg-white text-[#C81E3D] text-sm sm:text-base font-extrabold hover:bg-rose-50 transition-all active:scale-[0.98] shadow-lg">
            Book a Free Counselling
            <ArrowRight size={18} />
          </PopupTrigger>
        </div>
      </section>
    </div>
  );
}
