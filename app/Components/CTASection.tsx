"use client";
import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Clock3, Check, Star } from 'lucide-react';
import { usePopupForm } from '../context/PopupFormContext';

const CTASection = () => {
  const { open } = usePopupForm();
  return (
    <section className="relative px-4 sm:px-6 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        {/* Gradient ring wrapper */}
        <div className="gradient-ring rounded-[2rem] sm:rounded-[2.5rem] p-[1.5px] shadow-[0_30px_80px_rgba(224,36,74,0.22)]">
          <div className="relative overflow-hidden rounded-[1.9rem] sm:rounded-[2.4rem] bg-[#080a10]">
            {/* Ambient backdrop */}
            <div aria-hidden className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(800px 450px at 90% -10%, rgba(224,36,74,0.32), transparent 60%), radial-gradient(650px 450px at -10% 110%, rgba(76,29,149,0.35), transparent 60%)",
                }}
              />
              <div className="square-grid absolute inset-0 opacity-70" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center px-6 sm:px-10 py-10 sm:py-14">
              {/* LEFT — copy + CTAs */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-4 py-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-[#ff5c7a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
                  Get Started — Free
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight text-[#f5f7fa]">
                  Your Online MBA starts with{" "}
                  <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">
                    one honest call.
                  </span>
                </h2>
                <p className="mt-4 max-w-lg mx-auto lg:mx-0 text-[#a8b3c5] text-sm sm:text-base font-medium leading-relaxed">
                  Compare top universities, fees, ROI and specialisations — with free expert
                  guidance that is unbiased, UGC-first and obsessed with your outcome.
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[10px] sm:text-[11px] font-bold text-[#8b96a8]">
                  <span className="inline-flex items-center gap-1.5"><Clock3 size={12} className="text-[#e0244a]" /> Reply in ~15 min</span>
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} className="text-[#e0244a]" /> No spam, ever</span>
                  <span className="inline-flex items-center gap-1.5"><Check size={12} className="text-[#e0244a]" /> UGC-DEB first</span>
                </div>

                {/* Buttons */}
                <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={open}
                    className="group flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white font-extrabold text-sm sm:text-base shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]"
                  >
                    <Phone size={18} fill="currentColor" />
                    Talk to an Expert
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={open}
                    className="flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-white/15 text-[#f1f5f9] font-bold text-sm sm:text-base hover:border-[#e0244a]/50 hover:text-white transition-all active:scale-[0.98]"
                  >
                    Get Free Guidance
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* RIGHT — proof panel */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl border border-white/5 bg-[#10131a]/80 backdrop-blur p-6 sm:p-7 max-w-md mx-auto lg:mx-0 lg:ml-auto w-full">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(224,36,74,0.28), transparent 65%)" }}
                  />
                  <p className="relative flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#8b96a8]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
                    Why 5 Lakh+ chose us
                  </p>
                  <div className="relative mt-5 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2.5">
                        {["A", "R", "S", "K", "P"].map((n, i) => (
                          <span key={i} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#10131a] bg-gradient-to-br from-[#2B141A] to-[#3a1b22] text-[10px] font-black text-[#ff5c7a]">
                            {n}
                          </span>
                        ))}
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#10131a] bg-[#e0244a] text-[10px] font-black text-white">5L+</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}
                        </div>
                        <p className="mt-0.5 text-[11px] font-extrabold text-[#f1f5f9]">4.7/5 · 145K+ verified reviews</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "22+", label: "Top universities" },
                        { value: "1000+", label: "Programs compared" },
                        { value: "40%+", label: "Avg salary hike" },
                        { value: "500+", label: "Hiring partners" },
                      ].map((s) => (
                        <div key={s.label} className="rounded-2xl border border-white/5 bg-[#0b0d12]/70 p-3.5">
                          <p className="text-xl sm:text-2xl font-black text-[#f5f7fa]">{s.value}</p>
                          <p className="mt-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b96a8]">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
