"use client";

import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { SPECIALIZATION_OPTIONS } from '../../lib/validation';
import { siteConfig } from '../../data/site';
import { useCounsellingForm } from '../../lib/use-counselling-form';

/**
 * Contact Us — rebuilt in the About-page design language:
 * ambient hero canvas (glows + square grid), breadcrumb, gradient wordmark
 * headings, gradient-ring glass panels, pillar cards, staggered spacing.
 */
export default function ContactUs() {
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

  const inputClass = (field: string) =>
    `w-full h-12 px-4 border ${fieldErrors[field] ? 'border-[#e0244a]' : 'border-white/10'} rounded-xl text-sm text-[#f1f5f9] placeholder-[#6b7688] bg-[#0b0d12] outline-none focus:border-[#e0244a] focus:bg-[#10131a] focus:ring-1 focus:ring-[#e0244a]/30 transition-all font-medium`;

  return (
    <div className="w-full bg-[#080a10] font-sans text-[#f1f5f9]">

      {/* SECTION 1: HERO + FORM */}
      <section className="relative overflow-hidden border-b border-white/5 py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        {/* Ambient backdrop */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 500px at 88% -10%, rgba(224,36,74,0.26), transparent 60%), radial-gradient(650px 450px at -12% 45%, rgba(76,29,149,0.3), transparent 58%)",
          }}
        />
        <div aria-hidden className="square-grid absolute inset-0 opacity-80" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT — copy */}
          <div className="lg:col-span-6">
            <nav className="flex items-center gap-2 text-xs font-bold text-[#7c8798] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#e0244a] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#c4cbd8]">Contact</span>
            </nav>

            <p className="inline-flex items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-[#ff5c7a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
              Free · 15-Min Call
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.06] tracking-tight">
              Talk to an expert.<br />
              <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">
                Decide with clarity.
              </span>
            </h1>
            <p className="mt-5 text-[#a8b3c5] text-base sm:text-lg font-medium leading-relaxed max-w-xl">
              One honest conversation about your goals, budget and timeline — and a shortlist of
              UGC-DEB approved programs that actually fit you. No pressure, no template pitch.
            </p>

            {/* Checklist */}
            <div className="mt-7 space-y-3.5">
              {[
                "1-on-1 guidance from senior MBA counsellors",
                "Personalised roadmap based on your goals & budget",
                "University & program shortlisting support",
                "Career clarity within a single session",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#e0244a]/15 border border-[#e0244a]/30">
                    <Icons.Check size={13} className="text-[#ff5c7a] stroke-[3]" />
                  </span>
                  <span className="text-[#c4cbd8] font-semibold text-sm md:text-[15px]">{text}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md border-t border-white/5 pt-7">
              {[
                { value: "5L+", label: "Learners Guided" },
                { value: "50+", label: "Expert Counsellors" },
                { value: "95%", label: "Decision Clarity" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#ff4d6d] to-[#ff8a3d] bg-clip-text text-transparent">
                    {s.value}
                  </p>
                  <p className="text-[9px] md:text-[10px] uppercase font-bold text-[#7c8798] tracking-[0.18em] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#a8b3c5]">
              <Icons.Zap size={12} className="text-amber-400" />
              100% Free · Expert-backed advice
            </p>
          </div>

          {/* RIGHT — form in About-style glass panel */}
          <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
            <div className="gradient-ring rounded-[28px] p-[1.5px] shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_60px_rgba(224,36,74,0.12)]">
              <div className="relative rounded-[26.5px] bg-[#10131a]/95 backdrop-blur-xl p-6 sm:p-8 overflow-hidden">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(224,36,74,0.25), transparent 65%)" }}
                />

                {submitted ? (
                  <div className="relative py-14 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#C81E3D] to-[#ff5a3c] flex items-center justify-center shadow-[0_12px_35px_rgba(224,36,74,0.45)]">
                      <Icons.CheckCheck size={30} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#f5f7fa] tracking-tight">You&apos;re on the list!</h3>
                    <p className="text-[#8b96a8] font-medium max-w-sm mx-auto text-sm">
                      Our expert advisor will call you within ~15 minutes (Mon–Sat, 9am–8pm).
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                      <div>
                        <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#7c8798]">
                          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-dot" />
                          Counsellors online
                        </p>
                        <h2 className="mt-1.5 text-[#f5f7fa] text-xl sm:text-2xl font-extrabold tracking-tight">
                          Get Free Counselling
                        </h2>
                      </div>
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C81E3D] to-[#ff5a3c] shadow-[0_8px_20px_rgba(224,36,74,0.4)]">
                        <Icons.GraduationCap size={22} className="text-white" />
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" onChange={handleChange} value={form.website} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <input
                            name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
                            type="text" autoComplete="name" maxLength={60} placeholder="Full name *"
                            className={inputClass("name")}
                          />
                          {fieldErrors.name && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.name}</p>}
                        </div>
                        <div>
                          <input
                            name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur}
                            type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="Mobile number *"
                            className={inputClass("phone")}
                          />
                          {fieldErrors.phone && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <input
                          name="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                          type="email" autoComplete="email" maxLength={100} placeholder="Email *"
                          className={inputClass("email")}
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
                          <Icons.ChevronDown size={16} />
                        </div>
                        {fieldErrors.specialization && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.specialization}</p>}
                      </div>

                      <div>
                        <input
                          name="city" value={form.city} onChange={handleChange} onBlur={handleBlur}
                          type="text" autoComplete="address-level2" maxLength={50} placeholder="City *"
                          className={inputClass("city")}
                        />
                        {fieldErrors.city && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.city}</p>}
                      </div>

                      {error && <p className="text-[#ff5c7a] text-xs font-semibold text-center">{error}</p>}

                      <button
                        type="submit" disabled={loading}
                        className="w-full h-13 sm:h-14 py-4 bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white text-base font-extrabold rounded-xl shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {loading ? <Icons.Loader2 size={18} className="animate-spin" /> : <Icons.ArrowRight size={18} />}
                        {loading ? "Sending..." : "Get My Free Counselling"}
                      </button>
                      <p className="text-[10px] text-[#6b7688] text-center leading-relaxed pt-1">
                        Reply within ~15 minutes · No spam, ever · Mon–Sat 9am–8pm
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: WHY EXPERT GUIDANCE */}
      <section className="relative overflow-hidden py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div aria-hidden className="pinstripe absolute inset-0 opacity-70 pointer-events-none" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(224,36,74,0.10), transparent 65%)" }}
        />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT — copy + 2x2 pillars */}
          <div className="lg:col-span-7">
            <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.22em]">Why Expert Guidance</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.12]">
              Make the Right Career Move<br />
              <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">
                with Guidance, Not Guesswork
              </span>
            </h2>
            <p className="mt-4 text-[#a8b3c5] text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
              Choosing the wrong course or college can cost you years. Our role is simple — help you
              make informed, confident decisions backed by experience, not sales targets.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Icons.Map, title: "Personalised Career Mapping", text: "We evaluate your background, goals and constraints — then suggest realistic, high-impact paths, not generic options." },
                { icon: Icons.ShieldCheck, title: "Honest, Unbiased Advice", text: "No pressure, no pushing. We tell you what works, what doesn't, and what fits you best — even if it means losing a commission." },
                { icon: Icons.Compass, title: "Clarity Before Commitment", text: "Understand outcomes, timelines, costs and career scope before you invest your time or money." },
                { icon: Icons.HeartHandshake, title: "Support Beyond the Call", text: "Our guidance doesn't end in one conversation — we help you think through your next steps, admission by admission." },
              ].map((item) => (
                <div key={item.title} className="group rounded-2xl border border-white/5 bg-[#14161d] p-5 transition-all duration-300 hover:border-[#e0244a]/35 hover:-translate-y-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] text-white shadow-[0_6px_16px_rgba(224,36,74,0.35)] transition-transform duration-300 group-hover:scale-110">
                    <item.icon size={18} />
                  </span>
                  <h3 className="mt-4 font-extrabold text-sm sm:text-base text-[#f5f7fa]">{item.title}</h3>
                  <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-[#8b96a8] font-medium">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Ideal if */}
            <div className="mt-8 rounded-2xl border border-white/5 bg-[#10131a]/70 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c4cbd8]">This counselling is ideal if you are:</p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-xs sm:text-[13px] font-medium text-[#a8b3c5]">
                {[
                  "Confused between career or study options",
                  "Unsure whether to study in India or abroad",
                  "Worried about ROI & placement scope",
                  "Looking for clarity before a big decision",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Icons.Check size={14} className="mt-0.5 shrink-0 text-[#e0244a]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — Counsellor promise panel */}
          <div className="lg:col-span-5">
            <div className="gradient-ring rounded-[28px] p-[1.5px] shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
              <div className="rounded-[26.5px] bg-[#10131a] p-6 sm:p-8">
                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#ff5c7a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
                  The Counsellor Promise
                </p>
                <div className="mt-6 divide-y divide-white/5">
                  {[
                    { icon: Icons.Clock3, title: "~15 min response", text: "During working hours (Mon–Sat, 9am–8pm), a counsellor — not a bot — calls you back." },
                    { icon: Icons.ShieldCheck, title: "No mis-selling, ever", text: "We recommend fit over payout. If a program doesn't suit you, we'll tell you plainly." },
                    { icon: Icons.BadgeCheck, title: "UGC-DEB first, always", text: "We only ever shortlist programs with verified UGC-DEB / AICTE / NAAC recognition." },
                  ].map((row) => (
                    <div key={row.title} className="flex items-start gap-4 py-5">
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#2B141A] text-[#e0244a]">
                        <row.icon size={20} />
                      </span>
                      <span>
                        <span className="block text-sm sm:text-base font-extrabold text-[#f5f7fa]">{row.title}</span>
                        <span className="mt-1 block text-xs sm:text-[13px] leading-relaxed text-[#8b96a8] font-medium">{row.text}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 rounded-2xl border border-[#e0244a]/15 bg-[#2B141A]/40 p-5">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Icons.Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                    <span className="ml-2 text-xs font-black text-[#f5f7fa]">4.7 / 5</span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-[#c4cbd8]">
                    &ldquo;I was drowning in brochures — one call and I walked away with a shortlist, an EMI plan and a scholarship.&rdquo;
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#7c8798]">From 145K+ verified reviews</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: OFFICE MAP */}
      <section className="relative w-full h-[430px] border-b border-white/5">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.name + ", " + siteConfig.city)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-90 contrast-125"
          title="Office location map"
        />
        <div className="absolute top-4 left-4 z-10 hidden sm:block">
          <div className="gradient-ring rounded-2xl p-[1.5px] max-w-xs">
            <div className="rounded-[14.5px] bg-[#10131a]/95 backdrop-blur px-4 py-3">
              <div className="flex items-center gap-2">
                <Icons.MapPin className="text-[#e0244a] w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-extrabold text-[#f5f7fa]">{siteConfig.name}</p>
                  <p className="text-[10px] text-[#8b96a8] font-semibold mt-0.5 leading-snug">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTACT CARDS */}
      <section className="bg-[#080a10] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#e0244a] text-[11px] font-black uppercase tracking-[0.22em]">Direct Lines</p>
          <h3 className="mt-3 text-center text-3xl sm:text-4xl font-extrabold text-[#f5f7fa] tracking-tight">
            Prefer a human? <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">Reach us directly.</span>
          </h3>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Icons.Phone,
                label: "Call Us",
                value: siteConfig.phoneDisplay,
                href: `tel:${siteConfig.phone}`,
                hint: "Tap to call our advisors",
              },
              {
                icon: Icons.MessageCircle,
                label: "WhatsApp",
                value: "Chat instantly",
                href: `https://wa.me/${siteConfig.phone.replace(/\D/g, '')}`,
                hint: "Fastest response, Mon–Sat",
              },
              {
                icon: Icons.Mail,
                label: "Email Us",
                value: siteConfig.email,
                href: `mailto:${siteConfig.email}`,
                hint: "We reply within 24 hours",
              },
            ].map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.label === "WhatsApp" ? "_blank" : undefined}
                rel={card.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                className="group rounded-3xl border border-white/5 bg-[#14161d] p-8 text-center flex flex-col items-center transition-all duration-300 hover:border-[#e0244a]/40 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(224,36,74,0.12)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] text-white shadow-[0_10px_25px_rgba(224,36,74,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <card.icon size={22} />
                </span>
                <h4 className="mt-5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-[#8b96a8]">{card.label}</h4>
                <span className="mt-2 text-lg sm:text-xl font-extrabold text-[#f5f7fa] leading-snug group-hover:text-white break-all">
                  {card.value}
                </span>
                <p className="mt-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#6b7688]">{card.hint}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
