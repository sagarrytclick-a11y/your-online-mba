import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Target,
  Rocket,
  GraduationCap,
  Building2,
  Code2,
  ArrowRight,
  ArrowUpRight,
  Users,
  MousePointerClick,
  Landmark,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/app/lib/seo";
import { siteConfig } from "@/app/data/site";
import JsonLd from "@/app/Components/JsonLd";
import PopupTrigger from "@/app/Components/PopupTrigger";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Your Online MBA & JP Technologies",
  description:
    "The story behind Your Online MBA: India's independent online-MBA advisor, built by JP Technologies — a web & software development company. UGC-DEB first advice, transparent fees and outcomes-focused counselling for 5 Lakh+ learners.",
  path: "/about",
  keywords: [
    "about Your Online MBA",
    "JP Technologies",
    "online MBA advisors India",
    "online degree admission consultants",
    "edtech advisory company India",
    "web software development company JP Technologies",
  ],
});

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Your Online MBA",
  url: `${SITE_URL}/about`,
  description:
    "Your Online MBA is India's independent online-MBA advisory, built by JP Technologies — a web & software development company.",
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

const pillars = [
  {
    icon: ShieldCheck,
    title: "No mis-selling, ever",
    text: "We recommend fit, not payout. If a program doesn't work for you, we say so — even if it costs us the commission.",
  },
  {
    icon: Landmark,
    title: "Fee & rank transparency",
    text: "Total fees, EMI math, NIRF rank, ROI — everything on the table before you sign anything. No fine print.",
  },
  {
    icon: Target,
    title: "Outcomes over brochures",
    text: "We measure ourselves on admissions into the right program and salaries after — not on form-fills.",
  },
];

const divisions = [
  {
    icon: GraduationCap,
    title: "For Learners",
    text: "Free, unbiased online MBA counselling across 100+ UGC-DEB approved universities — shortlist, scholarships, EMI and paperwork, end to end.",
    cta: "Explore learner services",
    href: "/services#learners",
    external: false,
  },
  {
    icon: Building2,
    title: "For EdTech Brands & Universities",
    text: "Consulting, performance marketing, lead generation, web & CRM development and BPO partnerships — accountable to cost-per-admission.",
    cta: "Explore growth services",
    href: "/services#edtech-brands",
    external: false,
  },
  {
    icon: Code2,
    title: "Web & Software — JP Technologies",
    text: "Custom websites, admissions portals, CRMs, LMS and payment integrations — the same engineering discipline that runs this platform.",
    cta: "Visit jptechnologies.co",
    href: "https://jptechnologies.co",
    external: true,
  },
];

const values = [
  { icon: MousePointerClick, label: "UGC-DEB approved programs only" },
  { icon: Users, label: "5 Lakh+ learners guided across India" },
  { icon: HeartHandshake, label: "Independent advisory — never a university" },
  { icon: Rocket, label: "Outcomes tracked, not just applications" },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-[#080a10] text-[#f1f5f9]">
      <JsonLd data={aboutPageSchema} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 500px at 85% -10%, rgba(224,36,74,0.25), transparent 60%), radial-gradient(700px 500px at -10% 40%, rgba(76,29,149,0.3), transparent 60%)",
          }}
        />
        <div aria-hidden className="square-grid absolute inset-0 opacity-80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
          <nav className="flex items-center gap-2 text-xs font-bold text-[#7c8798] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#e0244a] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#c4cbd8]">About</span>
          </nav>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-[#ff5c7a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
            Our Context
          </p>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight max-w-4xl">
            The advisors behind
            <br />
            India&apos;s <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">online MBA</span> wave.
          </h1>
          <p className="mt-6 text-[#a8b3c5] text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            Your Online MBA is an independent advisory — not a university, not a lead broker.
            We compare UGC-DEB approved programs on fees, ROI, rankings and placement, so you
            choose once and choose right. We&apos;re built by{" "}
            <a href="https://jptechnologies.co" target="_blank" rel="noopener noreferrer" className="text-[#e0244a] font-bold hover:text-white transition-colors">
              JP Technologies
            </a>
            , a web &amp; software development company.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs sm:text-sm font-extrabold text-[#c4cbd8]">
            {["5 Lakh+ learners guided", "1000+ programs compared", "22 top universities ranked"].map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                {t}
              </span>
            ))}
          </div>
          </div>

          {/* RIGHT — Counselling desk "cockpit" visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Floating chip — top right */}
              <div className="absolute -top-4 right-2 sm:-right-3 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#14161d]/95 backdrop-blur px-3.5 py-2 shadow-xl animate-bob">
                <GraduationCap size={16} className="text-[#e0244a]" />
                <span className="text-[11px] font-extrabold text-[#f1f5f9] leading-tight">5 Lakh+<br /><span className="text-[8px] font-bold uppercase tracking-wider text-[#8b96a8]">Learners guided</span></span>
              </div>
              {/* Floating chip — bottom left */}
              <div className="absolute -bottom-4 left-2 sm:-left-3 z-20 flex items-center gap-2 rounded-2xl border border-emerald-400/25 bg-[#101a14]/95 backdrop-blur px-3.5 py-2 shadow-xl">
                <TrendingUp size={16} className="text-emerald-400" />
                <span className="text-[11px] font-extrabold text-emerald-400 leading-tight">+40%<br /><span className="text-[8px] font-bold uppercase tracking-wider text-[#8b96a8]">Avg salary hike</span></span>
              </div>

              {/* Panel */}
              <div className="gradient-ring rounded-[28px] p-[1.5px] shadow-[0_35px_80px_rgba(0,0,0,0.55)]">
                <div className="rounded-[26.5px] bg-[#10131a]/95 backdrop-blur-xl p-5 sm:p-6">
                  {/* Window chrome */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#e0244a]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>
                    <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.22em] text-[#7c8798]">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse-dot" />
                      Live Counselling Desk
                    </p>
                  </div>

                  {/* Bar chart */}
                  <div className="mt-4">
                    <div className="flex items-baseline justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7c8798]">Admissions · 2026</p>
                      <p className="text-[11px] font-extrabold text-[#ff5c7a]">↑ 3.2× growth</p>
                    </div>
                    <svg viewBox="0 0 280 110" className="mt-2 w-full" role="img" aria-label="Admissions growth bar chart">
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0">
                          <stop offset="0" stopColor="#C81E3D" />
                          <stop offset="1" stopColor="#ff8a3d" />
                        </linearGradient>
                      </defs>
                      {[18, 26, 34, 44, 55, 68, 88].map((h, i) => (
                        <rect key={i} x={12 + i * 38} y={100 - h} width="22" height={h} rx="5" fill="url(#barGrad)" opacity={0.55 + i * 0.075} />
                      ))}
                      <line x1="8" y1="100" x2="272" y2="100" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    </svg>
                    <div className="flex justify-between px-2 text-[9px] font-bold text-[#6b7688]">
                      {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => <span key={m}>{m}</span>)}
                    </div>
                  </div>

                  {/* Ring + quick stats */}
                  <div className="mt-4 flex items-center gap-5 rounded-2xl border border-white/5 bg-[#0b0d12]/60 p-4">
                    <svg viewBox="0 0 72 72" className="h-20 w-20 flex-shrink-0" role="img" aria-label="85 percent placement rate">
                      <defs>
                        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#e0244a" />
                          <stop offset="1" stopColor="#ff8a3d" />
                        </linearGradient>
                      </defs>
                      <circle cx="36" cy="36" r="29" stroke="rgba(255,255,255,0.08)" strokeWidth="9" fill="none" />
                      <circle cx="36" cy="36" r="29" stroke="url(#ringGrad)" strokeWidth="9" fill="none"
                        strokeLinecap="round" strokeDasharray="182.2" strokeDashoffset="27.3"
                        transform="rotate(-90 36 36)" />
                      <text x="36" y="34" textAnchor="middle" fontSize="15" fontWeight="800" fill="#f5f7fa">85%</text>
                      <text x="36" y="47" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#8b96a8">PLACED</text>
                    </svg>
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7c8798]">Placement Rate</p>
                      <p className="mt-1 text-sm font-extrabold text-[#f5f7fa] leading-snug">500+ hiring partners,<br />one offer at a time.</p>
                      <div className="mt-2 flex -space-x-2">
                        {["A", "R", "S", "K", "P"].map((n, i) => (
                          <span key={i} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#10131a] bg-gradient-to-br from-[#2B141A] to-[#3a1b22] text-[8px] font-black text-[#ff5c7a]">
                            {n}
                          </span>
                        ))}
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#10131a] bg-[#e0244a] text-[8px] font-black text-white">+5L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.22em]">Why We Exist</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">
          Online MBA information is everywhere.{" "}
          <span className="text-[#e0244a]">Honest advice isn&apos;t.</span>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group rounded-3xl border border-white/5 bg-[#14161d] p-6 hover:border-[#e0244a]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] text-white shadow-[0_8px_20px_rgba(224,36,74,0.35)] transition-transform duration-300 group-hover:scale-110">
                <p.icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-extrabold">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#8b96a8] font-medium">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we do — three divisions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.22em]">What We Do</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Three crafts, <span className="text-[#e0244a]">one standard.</span>
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {divisions.map((d) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2B141A] text-[#e0244a] border border-[#e0244a]/20 transition-transform duration-300 group-hover:scale-110">
                  <d.icon size={22} />
                </span>
                <h3 className="mt-5 text-xl font-extrabold">{d.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8b96a8] font-medium">{d.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#e0244a]">
                  {d.cta}
                  {d.external ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
                </span>
              </>
            );
            return d.external ? (
              <a
                key={d.title}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-white/5 bg-[#14161d] p-6 hover:border-[#e0244a]/40 hover:-translate-y-1 transition-all duration-300"
              >
                {inner}
              </a>
            ) : (
              <Link
                key={d.title}
                href={d.href}
                className="group rounded-3xl border border-white/5 bg-[#14161d] p-6 hover:border-[#e0244a]/40 hover:-translate-y-1 transition-all duration-300"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* JP Technologies spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="gradient-ring rounded-[28px] p-[1.5px] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <div className="relative overflow-hidden rounded-[26.5px] bg-[#10131a] p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(224,36,74,0.22), transparent 65%)" }}
            />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#8b96a8]">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-[#e0244a] text-[10px] font-black text-white">JP</span>
                  JP Technologies · Parent Company
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-[1.12] tracking-tight">
                  Software first.<br />
                  Concrete results <span className="text-[#e0244a]">second.</span>
                </h2>
                <p className="mt-4 text-[#a8b3c5] text-sm sm:text-base font-medium leading-relaxed">
                  Every tool on this site — the program finder, ROI calculator, rankings engine and
                  counselling desk — is designed and engineered by JP Technologies, our parent
                  software company. We help EdTech brands, universities and businesses ship
                  admissions portals, CRMs, LMS integrations and custom products that convert.
                </p>
                <a
                  href="https://jptechnologies.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-sm font-extrabold text-white shadow-[0_12px_35px_rgba(224,36,74,0.4)] hover:brightness-110 transition-all"
                >
                  Explore JP Technologies
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  "Admissions & enrolment portals",
                  "Education CRM & call-centre dashboards",
                  "LMS and payment gateway integrations",
                  "Programmatic SEO & marketing sites",
                  "Custom web & mobile software",
                  "Dedicated engineering partnership",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-2xl border border-white/5 bg-[#14161d] p-4 text-xs sm:text-sm font-semibold text-[#c4cbd8] leading-snug"
                  >
                    <Code2 size={15} className="mt-0.5 shrink-0 text-[#e0244a]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <div key={v.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2B141A] text-[#e0244a]">
                <v.icon size={18} />
              </span>
              <p className="text-[11px] sm:text-xs font-bold text-[#a8b3c5] leading-snug">{v.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto">
          Talk to the humans behind the numbers.
        </h2>
        <p className="mt-4 text-[#8b96a8] font-medium max-w-xl mx-auto">
          One honest conversation about your goals — that&apos;s all it takes to start.
        </p>
        <PopupTrigger className="mt-8 inline-flex h-14 items-center px-8 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-base font-extrabold text-white shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all">
          Book a Free Counselling
        </PopupTrigger>
      </section>
    </div>
  );
}
