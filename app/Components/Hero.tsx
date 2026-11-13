"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  GraduationCap,
  Briefcase,
  Star,
  Landmark,
  Loader2,
  ArrowRight,
  Building2,
  Megaphone,
  Code2,
} from "lucide-react";
import { SPECIALIZATION_OPTIONS } from "../lib/validation";
import { useCounsellingForm } from "../lib/use-counselling-form";
import ServiceLeadForm from "./ServiceLeadForm";
import SwingTag from "./SwingTag";
import PopupTrigger from "./PopupTrigger";

type Audience = "learners" | "brands";

const STATS: Record<Audience, { big: string; small: string }[]> = {
  learners: [
    { big: "5 Lakh+", small: "Students Guided" },
    { big: "1000+", small: "Top Universities" },
    { big: "40%+", small: "Avg Salary Hike" },
  ],
  brands: [
    { big: "100+", small: "Programs Marketed" },
    { big: "60%", small: "Fewer Dead Dials" },
    { big: "500+", small: "Hiring Partners" },
  ],
};

const BULLETS: Record<Audience, string[]> = {
  learners: [
    "Affordable MBA with Easy EMI Options",
    "UGC & AICTE Approved Universities Only",
    "Placement Support with 500+ Hiring Partners",
  ],
  brands: [
    "Cost-per-qualified-lead, not vanity reach",
    "CRM-ready leads with SLA-backed counselling playbooks",
    "AI-qualified enquiries — 60% fewer dead dials for your desk",
  ],
};

/**
 * Hero — one section, two businesses: learners + EdTech growth.
 * A toggle switches headline, CTAs, stats, bullets and the right-hand lead form.
 */
const HeroSection = () => {
  const [audience, setAudience] = useState<Audience>("learners");
  const {
    form,
    loading,
    submitted,
    error,
    fieldErrors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useCounsellingForm();

  const isBrands = audience === "brands";

  return (
    <section className="relative w-full overflow-hidden bg-[#080a10] text-[#f1f5f9]">
      {/* Hanging swinging "GET A QUOTE · ENQUIRY NOW" tag */}
      <SwingTag />
      {/* Ambient background: glows + dot grid + constellation */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 550px at 85% -5%, rgba(224,36,74,0.32), transparent 62%), radial-gradient(650px 500px at -15% 35%, rgba(76,29,149,0.42), transparent 58%), radial-gradient(700px 500px at 55% 115%, rgba(224,36,74,0.14), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <svg className="absolute -left-10 top-16 h-72 w-72 text-[#e0244a]/25" viewBox="0 0 200 200" fill="none">
          <path d="M20 150 L70 100 L110 130 L160 60 L195 80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="20" cy="150" r="3" fill="currentColor" />
          <circle cx="70" cy="100" r="2.5" fill="currentColor" />
          <circle cx="110" cy="130" r="2" fill="currentColor" />
          <circle cx="160" cy="60" r="3" fill="currentColor" />
          <circle cx="195" cy="80" r="1.5" fill="currentColor" />
        </svg>
        <svg className="absolute right-[8%] bottom-40 h-56 w-56 text-[#ff8a3d]/20" viewBox="0 0 200 200" fill="none">
          <path d="M10 170 L55 120 L95 150 L135 70 L190 95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
          <circle cx="55" cy="120" r="2.5" fill="currentColor" />
          <circle cx="135" cy="70" r="3" fill="currentColor" />
          <circle cx="190" cy="95" r="2" fill="currentColor" />
        </svg>
        {[
          { top: "12%", left: "46%" }, { top: "22%", left: "72%" }, { top: "9%", left: "88%" },
          { top: "34%", left: "30%" }, { top: "48%", left: "58%" }, { top: "16%", left: "20%" },
          { top: "58%", left: "82%" }, { top: "40%", left: "92%" },
        ].map((pos, i) => (
          <span key={i} className="absolute h-1 w-1 rounded-full bg-white/35 animate-pulse-dot" style={{ ...pos, animationDelay: `${i * 0.3}s` }} />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 md:gap-12 items-center px-4 sm:px-6 md:px-8 pt-8 pb-8 lg:pt-12 lg:pb-14">

        {/* LEFT CONTENT - 7 Columns */}
        <div className="lg:col-span-7 space-y-6 md:space-y-7">

          {/* Audience toggle — own row */}
          <div className="inline-flex w-full sm:w-auto items-center justify-between sm:justify-start gap-1 rounded-2xl border border-white/10 bg-[#10131a]/90 backdrop-blur p-1 sm:p-1.5 shadow-lg">
            <button
              type="button"
              onClick={() => setAudience("learners")}
              aria-pressed={!isBrands}
              className={`flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-5 py-2 sm:py-2.5 text-[11px] leading-tight sm:text-sm font-extrabold transition-all duration-300 ${
                !isBrands
                  ? "bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white shadow-[0_8px_22px_rgba(224,36,74,0.4)]"
                  : "text-[#a8b3c5] hover:text-white"
              }`}
            >
              <GraduationCap size={15} className="flex-shrink-0" />
              For Learners
            </button>
            <button
              type="button"
              onClick={() => setAudience("brands")}
              aria-pressed={isBrands}
              className={`flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-5 py-2 sm:py-2.5 text-[11px] leading-tight sm:text-sm font-extrabold transition-all duration-300 ${
                isBrands
                  ? "bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white shadow-[0_8px_22px_rgba(224,36,74,0.4)]"
                  : "text-[#a8b3c5] hover:text-white"
              }`}
            >
              <Building2 size={15} className="flex-shrink-0" />
              For EdTech Brands
            </button>
          </div>

          {/* Eyebrow pill — moved below the toggle */}
          <p className="flex w-fit items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-4 py-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-[#ff5c7a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
            {isBrands ? "EdTech Growth & Delivery Partner · India" : "Online MBA & EdTech Advisory"}
          </p>

          {/* Headline */}
          {!isBrands ? (
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-extrabold leading-[1.06] tracking-tight text-[#f5f7fa]">
              Launch Your{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">
                  Online MBA
                </span>
                <svg className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-4 sm:h-5" viewBox="0 0 360 18" fill="none" aria-hidden preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="swash" x1="0" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ff4d6d" />
                      <stop offset="0.5" stopColor="#e0244a" />
                      <stop offset="1" stopColor="#ff8a3d" />
                    </linearGradient>
                  </defs>
                  {/* Brush stroke */}
                  <path d="M4 12.5 C70 5.5, 140 5, 205 8.5 C270 12, 315 7, 356 9" stroke="url(#swash)" strokeWidth="6" strokeLinecap="round" />
                  {/* Gloss highlight */}
                  <path d="M12 9.5 C78 4, 145 3.5, 210 7" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              Career From Anywhere
            </h1>
          ) : (
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-extrabold leading-[1.06] tracking-tight text-[#f5f7fa]">
              Admissions at scale —{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">
                  EdTech consulting &amp; delivery
                </span>
                <svg className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-4 sm:h-5" viewBox="0 0 360 18" fill="none" aria-hidden preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="swashB" x1="0" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ff4d6d" />
                      <stop offset="0.5" stopColor="#e0244a" />
                      <stop offset="1" stopColor="#ff8a3d" />
                    </linearGradient>
                  </defs>
                  <path d="M4 12.5 C70 5.5, 140 5, 205 8.5 C270 12, 315 7, 356 9" stroke="url(#swashB)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M12 9.5 C78 4, 145 3.5, 210 7" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          )}

          {/* Subcopy */}
          <p className="text-[#a8b3c5] text-base sm:text-lg font-medium leading-relaxed max-w-xl">
            {!isBrands
              ? "Compare UGC-DEB approved online MBAs across 100+ universities — fees, ROI, EMI and placement — with free expert counselling, from your first click to your offer letter."
              : "Performance marketing, CRM-ready lead generation, web & software development and BPO calling — measured in cost-per-admission, not vanity reach."}
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4">
            {!isBrands ? (
              <>
                <PopupTrigger className="group inline-flex items-center gap-2 h-13 sm:h-14 px-7 sm:px-8 py-4 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white font-extrabold text-sm sm:text-base shadow-[0_15px_40px_rgba(224,36,74,0.4)] hover:shadow-[0_15px_45px_rgba(224,36,74,0.55)] hover:brightness-110 transition-all active:scale-[0.98]">
                  Get My MBA Plan
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </PopupTrigger>
                <Link
                  href="/universities"
                  className="inline-flex items-center gap-2 h-13 sm:h-14 px-7 sm:px-8 py-4 rounded-full border border-white/15 text-[#f1f5f9] font-bold text-sm sm:text-base hover:border-[#e0244a]/60 hover:text-white transition-all"
                >
                  Explore Universities
                </Link>
              </>
            ) : (
              <>
                <PopupTrigger
                  variant="service"
                  className="group inline-flex items-center gap-2 h-13 sm:h-14 px-7 sm:px-8 py-4 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white font-extrabold text-sm sm:text-base shadow-[0_15px_40px_rgba(224,36,74,0.4)] hover:shadow-[0_15px_45px_rgba(224,36,74,0.55)] hover:brightness-110 transition-all active:scale-[0.98]"
                >
                  Get My Growth Audit
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </PopupTrigger>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 h-13 sm:h-14 px-7 sm:px-8 py-4 rounded-full border border-white/15 text-[#f1f5f9] font-bold text-sm sm:text-base hover:border-[#e0244a]/60 hover:text-white transition-all"
                >
                  Explore Services
                </Link>
              </>
            )}
          </div>

          {/* Stats row with dividers */}
          <div className="flex items-center flex-wrap pt-1">
            {STATS[audience].map((s, i) => (
              <div
                key={i}
                className={`${i > 0 ? "border-l border-white/10 pl-5 sm:pl-7 ml-5 sm:ml-7" : ""} py-1`}
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-[#f5f7fa] whitespace-nowrap">{s.big}</p>
                <p className="text-[9px] sm:text-[10px] text-[#7c8798] font-bold uppercase tracking-[0.15em] mt-1 whitespace-nowrap">{s.small}</p>
              </div>
            ))}
          </div>

          {/* Bullet Points */}
          <div className="space-y-2.5 pt-1 hidden sm:block">
            {BULLETS[audience].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#e0244a] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(224,36,74,0.6)]">
                  <Check size={11} className="text-white stroke-[4]" />
                </div>
                <span className="text-sm font-semibold text-[#c4cbd8]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM - 5 Columns (glass panel; switches by audience) */}
        <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:ml-auto">
          <div
            id="lead-form"
            className="relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-[#e0244a]/60 via-white/10 to-transparent shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(224,36,74,0.12)]"
          >
            <div className="rounded-[26.5px] bg-[#10131a]/95 backdrop-blur-xl p-5 sm:p-7">
              {!isBrands ? (
                <>
                  {/* Learner panel — same course counselling form */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                    <div>
                      <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#7c8798]">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
                        Counsellors online
                      </p>
                      <h2 className="text-[#f5f7fa] text-xl sm:text-2xl font-extrabold tracking-tight mt-1.5">
                        Free Expert Counselling
                      </h2>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C81E3D] to-[#ff5a3c] flex items-center justify-center shadow-[0_8px_20px_rgba(224,36,74,0.4)] flex-shrink-0">
                      <GraduationCap size={22} className="text-white" />
                    </div>
                  </div>

                  {submitted ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-14 h-14 bg-[#2B141A] rounded-full flex items-center justify-center mx-auto">
                        <Check size={28} className="text-[#e0244a] stroke-[3]" />
                      </div>
                      <h4 className="text-[#f1f5f9] font-bold text-lg">Request Submitted!</h4>
                      <p className="text-[#8b96a8] text-sm font-medium">Our expert will reach out to you shortly.</p>
                    </div>
                  ) : (
                    <>
                      <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
                        <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" onChange={handleChange} value={form.website} />
                        <div>
                          <input
                            name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
                            type="text" autoComplete="name" maxLength={60} placeholder="Name *"
                            className="w-full h-12 px-4 border border-white/10 rounded-xl text-sm text-[#f1f5f9] placeholder-[#6b7688] bg-[#0b0d12] outline-none focus:border-[#e0244a] focus:ring-1 focus:ring-[#e0244a]/30 transition-all font-medium"
                          />
                          {fieldErrors.name && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.name}</p>}
                        </div>
                        <div>
                          <input
                            name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur}
                            type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="Phone * (10 digits)"
                            className="w-full h-12 px-4 border border-white/10 rounded-xl text-sm text-[#f1f5f9] placeholder-[#6b7688] bg-[#0b0d12] outline-none focus:border-[#e0244a] focus:ring-1 focus:ring-[#e0244a]/30 transition-all font-medium"
                          />
                          {fieldErrors.phone && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.phone}</p>}
                        </div>
                        <div>
                          <input
                            name="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                            type="email" autoComplete="email" maxLength={100} placeholder="Email *"
                            className="w-full h-12 px-4 border border-white/10 rounded-xl text-sm text-[#f1f5f9] placeholder-[#6b7688] bg-[#0b0d12] outline-none focus:border-[#e0244a] focus:ring-1 focus:ring-[#e0244a]/30 transition-all font-medium"
                          />
                          {fieldErrors.email && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.email}</p>}
                        </div>
                        <div className="relative">
                          <select
                            name="specialization" value={form.specialization} onChange={handleChange} onBlur={handleBlur}
                            className="w-full h-12 px-4 pr-10 border border-white/10 rounded-xl text-sm text-[#a8b3c5] bg-[#0b0d12] appearance-none outline-none focus:border-[#e0244a] transition-all font-medium"
                          >
                            <option value="" disabled>Preferred Specialization *</option>
                            {SPECIALIZATION_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#7c8798]">
                            <ChevronDown size={16} />
                          </div>
                          {fieldErrors.specialization && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.specialization}</p>}
                        </div>
                        <div>
                          <input
                            name="city" value={form.city} onChange={handleChange} onBlur={handleBlur}
                            type="text" autoComplete="address-level2" maxLength={50} placeholder="City *"
                            className="w-full h-12 px-4 border border-white/10 rounded-xl text-sm text-[#f1f5f9] placeholder-[#6b7688] bg-[#0b0d12] outline-none focus:border-[#e0244a] focus:ring-1 focus:ring-[#e0244a]/30 transition-all font-medium"
                          />
                          {fieldErrors.city && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.city}</p>}
                        </div>
                        {error && <p className="text-[#ff5c7a] text-xs font-semibold text-center">{error}</p>}
                        <button
                          type="submit" disabled={loading}
                          className="w-full h-13 sm:h-14 py-4 bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white font-extrabold rounded-xl shadow-[0_12px_35px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98] mt-1 text-base tracking-wide flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {loading && <Loader2 size={18} className="animate-spin" />}
                          {loading ? "Sending..." : "Get My MBA Plan"}
                        </button>
                      </form>
                      <p className="text-[10px] text-[#6b7688] text-center mt-4 leading-relaxed">
                        Talk to an expert &amp; find the best UGC, DEB, NAAC, A++ approved MBA under ₹2L.<br />Reply within ~15 minutes, Mon–Sat 9am–8pm.
                      </p>
                    </>
                  )}
                </>
              ) : (
                /* EdTech panel — service growth-audit lead form */
                <ServiceLeadForm
                  defaultService="Lead Generation & Sales Solutions"
                  heading="Get a Free Growth Audit"
                  subheading="Tell us about your funnel — we reply within one business day with a specific point of view, not a generic deck."
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TRUST BAR */}
      <div className="relative border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:flex-wrap justify-between items-center gap-4 md:gap-8 px-4 sm:px-6 py-4 md:py-5">
          {[
            { icon: GraduationCap, label: <>UGC Approved<br />Universities</> },
            { icon: Briefcase, label: <>500+<br />Hiring Partners</> },
            { icon: Megaphone, label: <>100+<br />Programs Marketed</> },
            { icon: Code2, label: <>Web, CRM &amp;<br />Software</> },
            { icon: Landmark, label: <>EMI<br />Available</> },
            { icon: Star, label: <>4.7/5<br />Student Rating</> },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#e0244a]/10 border border-[#e0244a]/20 flex items-center justify-center flex-shrink-0">
                <item.icon className="text-[#e0244a] w-4 h-4" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#a8b3c5] uppercase leading-tight tracking-[0.12em]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
