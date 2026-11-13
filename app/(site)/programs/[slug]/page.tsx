import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  CheckCircle2,
  Clock,
  Monitor,
  Briefcase,
  GraduationCap,
  Users2,
  Layers,
  ArrowRight,
  ChevronRight,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { programs } from '../../../data/programs';
import { notFound } from 'next/navigation';
import PopupTrigger from '../../../Components/PopupTrigger';
import JsonLd from '../../../Components/JsonLd';
import { SITE_URL, breadcrumbJsonLd, buildMetadata } from '@/app/lib/seo';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programs.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const prog = programs.find(p => p.slug === slug);
  if (!prog) return { title: "Program Not Found" };
  return buildMetadata({
    title: `${prog.title} - Online MBA Program Details, Duration & Career Scope`,
    description: `Explore ${prog.title} online MBA program: ${prog.duration}, ${prog.format}. ${prog.description.slice(0, 140)}. Get free counselling.`,
    path: `/programs/${slug}`,
  });
}

const trustItems = [
  "UGC-Entitled Online Degrees",
  "Valid as Regular Campus Programs",
  "Industry-Recognized Certifications",
  "Guided by Education Experts",
];

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const activeProgram = programs.find(p => p.slug === slug);

  if (!activeProgram) {
    notFound();
  }

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Clock, label: "Duration", value: activeProgram.duration },
    { icon: Monitor, label: "Format", value: activeProgram.format },
    { icon: Layers, label: "Level", value: activeProgram.level },
  ];

  return (
    <div className="min-h-screen bg-[#080a10] font-sans text-[#f1f5f9]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
          { name: activeProgram.title, path: `/programs/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: activeProgram.title,
          description: activeProgram.description,
          provider: {
            "@type": "Organization",
            name: "Your Online MBA",
            url: SITE_URL,
          },
          url: `${SITE_URL}/programs/${slug}`,
        }}
      />

      {/* ===== 1. HERO ===== */}
      <section className="relative w-full overflow-hidden border-b border-white/5 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Ambient backdrop */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 88% -10%, rgba(224,36,74,0.28), transparent 60%), radial-gradient(700px 500px at -10% 45%, rgba(76,29,149,0.3), transparent 58%)",
          }}
        />
        <div aria-hidden className="square-grid absolute inset-0 opacity-80" />
        <svg className="absolute -right-10 bottom-10 h-56 w-56 text-[#e0244a]/20" viewBox="0 0 200 200" fill="none" aria-hidden>
          <path d="M15 170 L60 120 L100 150 L145 70 L195 95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
          <circle cx="60" cy="120" r="2.5" fill="currentColor" />
          <circle cx="145" cy="70" r="3" fill="currentColor" />
        </svg>

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-bold text-[#7c8798] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#e0244a] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/programs" className="hover:text-[#e0244a] transition-colors">Programs</Link>
            <span>/</span>
            <span className="text-[#c4cbd8]">{activeProgram.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* LEFT — headline + CTAs */}
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-4 py-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-[#ff5c7a]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
                PG Programme · UGC-DEB
              </p>
              <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight text-[#f5f7fa]">
                {activeProgram.title}
              </h1>
              <p className="mt-5 text-[#a8b3c5] text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                {activeProgram.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PopupTrigger className="group inline-flex h-14 items-center gap-2 px-8 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-sm sm:text-base font-extrabold text-white shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]">
                  Talk to an Expert
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </PopupTrigger>
                <Link
                  href="#universities"
                  className="inline-flex h-14 items-center px-8 rounded-full border border-white/15 text-sm sm:text-base font-bold text-[#f1f5f9] hover:border-[#e0244a]/50 hover:text-white transition-all"
                >
                  View Universities
                </Link>
              </div>
            </div>

            {/* RIGHT — program snapshot panel */}
            <div className="lg:col-span-5">
              <div className="gradient-ring rounded-[28px] p-[1.5px] shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
                <div className="rounded-[26.5px] bg-[#10131a]/95 backdrop-blur-xl p-6 sm:p-7">
                  <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#8b96a8]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e0244a]">
                      <Sparkles size={12} className="text-white" />
                    </span>
                    Program Snapshot
                  </p>
                  <div className="mt-5 divide-y divide-white/5">
                    {facts.map((f) => (
                      <div key={f.label} className="flex items-center gap-4 py-3.5">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2B141A] text-[#e0244a]">
                          <f.icon size={18} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#7c8798]">{f.label}</span>
                          <span className="mt-0.5 block text-xs sm:text-sm font-bold text-[#f5f7fa] leading-snug">{f.value}</span>
                        </span>
                      </div>
                    ))}
                    <div className="flex items-start gap-4 py-3.5">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2B141A] text-[#e0244a]">
                        <Briefcase size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#7c8798]">Career Outcomes</span>
                        <span className="mt-1.5 flex flex-wrap gap-1.5">
                          {activeProgram.careerOutcomes.map((role) => (
                            <span key={role} className="rounded-full border border-[#e0244a]/25 bg-[#e0244a]/10 px-2.5 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#ff8aa0]">
                              {role}
                            </span>
                          ))}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-[10px] sm:text-[11px] font-bold text-[#a8b3c5] border-t border-white/5 pt-6">
            {trustItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#e0244a]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. PROGRAM PILLS NAV ===== */}
      <section id="explore" className="w-full py-12 bg-[#0b0d12] border-b border-white/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div>
            <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.22em]">Explore Programmes</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#f5f7fa] tracking-tight">
              Compare, then <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">commit</span>
            </h2>
            <p className="mt-1.5 text-[#8b96a8] text-xs sm:text-sm font-medium">Select a category to see best-matched programs</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
            {programs.map((p) => {
              const isActive = p.slug === activeProgram.slug;
              return (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-4 py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white shadow-[0_6px_18px_rgba(224,36,74,0.4)]"
                      : "bg-[#14161d] text-[#c4cbd8] border border-white/10 hover:border-[#e0244a]/40 hover:text-[#ff5c7a]"
                  }`}
                >
                  {p.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. PROGRAM FOCUS + HIGHLIGHTS ===== */}
      <section className="w-full py-14 md:py-18 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.22em]">This Program</p>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#f5f7fa] leading-[1.15]">
                {activeProgram.title}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeProgram.highlights.map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-[10px] sm:text-[11px] font-bold border border-[#e0244a]/25 bg-[#e0244a]/10 text-[#ff8aa0]">
                  {tag}
                </span>
              ))}
            </div>
            <PopupTrigger className="inline-flex h-14 items-center gap-2 px-8 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white text-sm font-extrabold shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]">
              Check Eligibility for {activeProgram.title}
              <ArrowRight size={16} />
            </PopupTrigger>
          </div>

          {/* Career outcomes panel */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/5 bg-[#14161d] p-6 sm:p-7">
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#8b96a8]">
                <Users2 size={14} className="text-[#e0244a]" />
                Where Alumni Work
              </p>
              <ul className="mt-4 space-y-3">
                {activeProgram.careerOutcomes.map((role) => (
                  <li key={role} className="flex items-center gap-3 text-sm font-semibold text-[#c4cbd8]">
                    <ChevronRight size={16} className="text-[#e0244a] flex-shrink-0" />
                    {role}
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-white/5 pt-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7c8798]">Hiring Partners</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-[#a8b3c5] leading-relaxed">
                  Amazon · Deloitte · TCS · Accenture · Flipkart · HDFC Bank · KPMG · PwC and 400+ more across consulting, analytics, BFSI &amp; e-commerce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. UNIVERSITIES OFFERING IT ===== */}
      <section id="universities" className="w-full pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.22em]">Universities</p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f5f7fa]">
                Where you can do this
              </h2>
            </div>
            <Link href="/universities" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e0244a] hover:text-white transition-colors">
              Compare all universities
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {activeProgram.subPrograms.map((sub) => {
              const words = sub.university.split(" ");
              return (
                <div
                  key={sub.title}
                  className="group rounded-[22px] overflow-hidden border border-white/5 bg-[#14161d] flex flex-col transition-all duration-300 hover:border-[#e0244a]/40 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(224,36,74,0.15)]"
                >
                  {/* Image header */}
                  <div className="relative h-40 w-full bg-[#10131a] overflow-hidden">
                    <img
                      src={sub.imageUrl}
                      alt={sub.title}
                      loading="lazy"
                      decoding="async"
                      className="object-cover w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14161d] via-[#14161d]/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#e0244a]/40 bg-[#10131a]/90 backdrop-blur text-[11px] font-black uppercase tracking-wider text-[#ff5c7a]">
                      {words.map((w) => w[0]).slice(0, 3).join("")}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow gap-3">
                    <h3 className="text-[#f5f7fa] font-extrabold text-base leading-snug line-clamp-2 min-h-[42px]">
                      {sub.title}
                    </h3>
                    <div className="space-y-1.5 text-[11px] sm:text-xs text-[#8b96a8] font-semibold">
                      <p className="flex items-center gap-2">
                        <GraduationCap size={13} className="text-[#e0244a] flex-shrink-0" />
                        {sub.university}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={13} className="text-[#e0244a] flex-shrink-0" />
                        {sub.duration}
                      </p>
                    </div>
                    <PopupTrigger className="mt-auto w-full h-11 bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] hover:brightness-110 text-white font-extrabold rounded-xl text-xs tracking-wide transition-all active:scale-[0.98] shadow-[0_8px_22px_rgba(224,36,74,0.35)]">
                      View Program
                    </PopupTrigger>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 5. ADVISOR CALLOUT ===== */}
      <section className="relative border-t border-white/5 bg-[#080a10] py-16 px-4 sm:px-6 lg:px-8">
        <div aria-hidden className="square-grid absolute inset-0 opacity-50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#ff5c7a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
            Not Sure Yet?
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f5f7fa]">
            Which program fits <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">your goals?</span>
          </h2>
          <p className="mt-3 text-[#8b96a8] text-sm sm:text-base font-medium max-w-md mx-auto">
            A 15-minute call with a counsellor — personalised to your experience, budget and career target. Free.
          </p>
          <PopupTrigger className="mt-6 inline-flex h-14 items-center gap-2 px-8 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white text-sm font-extrabold shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]">
            Get Personalized Recommendation
            <ArrowRight size={17} />
          </PopupTrigger>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7688]">100% free · No obligation</p>
        </div>
      </section>

    </div>
  );
}
