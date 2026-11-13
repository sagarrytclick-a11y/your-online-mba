"use client";

import React, { useState } from 'react';
import { Plus, PhoneCall, ArrowRight, Sparkles, CalendarClock } from 'lucide-react';
import PopupTrigger from './PopupTrigger';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What exactly does an online MBA program offer?",
    answer: "An online MBA offers the same curriculum as a full-time program, including leadership training, networking opportunities, and specialized tracks, but with the flexibility to learn from anywhere."
  },
  {
    question: "What is the typical duration to complete an online MBA?",
    answer: "Most programs range from 12 to 24 months, depending on whether you choose an accelerated track or a part-time pace."
  },
  {
    question: "Which are the leading Indian colleges providing online MBA courses?",
    answer: "Options include LPU Online, Amity University Online, Manipal University Jaipur, and NMIMS Global Access. Program formats and recognition vary, so verify UGC-DEB entitlement for the exact degree and admission session."
  },
  {
    question: "What qualifications do you need to join an online MBA program?",
    answer: "Generally, you need a Bachelor's degree from a recognized university. Some top-tier programs also require 2-3 years of work experience."
  },
  {
    question: "Is the value of an online MBA comparable to a traditional MBA?",
    answer: "Yes, as long as the program is UGC-DEB approved, it holds the same legal value for government and private sector jobs."
  }
];

/** Suggested questions surfaced in the support card */
const SUGGESTIONS = [
  "Is online MBA valid for govt jobs?",
  "Which specialization pays best?",
  "Can I do an MBA while working full-time?",
];

const openAiChat = () => window.dispatchEvent(new CustomEvent("open-ai-chat"));

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full py-14 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Square-tile backdrop */}
      <div aria-hidden className="square-grid absolute inset-0 opacity-70 pointer-events-none" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(224,36,74,0.10), transparent 65%)" }}
      />

      <div className="relative max-w-7xl mx-auto grid gap-10 lg:grid-cols-12 lg:gap-14">

        {/* LEFT — heading + accordion */}
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-4 py-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-[#ff5c7a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
            FAQ
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-[#f5f7fa]">
            Online MBA questions,<br />
            <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">
              answered.
            </span>
          </h2>
          <p className="mt-3 text-[#8b96a8] text-sm sm:text-base font-medium max-w-md">
            Everything you need to confidently take your next career step.
          </p>

          <div className="mt-8 border-t border-white/5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border-b border-white/5 transition-colors ${
                    isOpen ? "border-l-2 border-l-[#e0244a] pl-5 -ml-5" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={`font-bold text-sm md:text-base leading-snug transition-all duration-300 ${
                        isOpen ? "text-[#f5f7fa] translate-x-0.5" : "text-[#c4cbd8] group-hover:text-white"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 bg-gradient-to-br from-[#e0244a] to-[#ff5a3c] text-white shadow-[0_4px_12px_rgba(224,36,74,0.4)]"
                          : "border border-white/15 text-[#e0244a] group-hover:border-[#e0244a]/50 group-hover:scale-110"
                      }`}
                    >
                      <Plus size={15} strokeWidth={2.5} />
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="pb-6 text-[#a8b3c5] text-sm leading-7 font-medium max-w-2xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — sticky support card */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 gradient-ring rounded-[26px] p-[1.5px] shadow-[0_25px_60px_rgba(224,36,74,0.12)]">
            <div className="relative overflow-hidden rounded-[24.5px] bg-[#10131a] p-6 sm:p-7">
              {/* Ambient corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(224,36,74,0.25), transparent 65%)" }}
              />

              <p className="relative flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-dot" />
                Experts Online
              </p>
              <h3 className="relative mt-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f5f7fa]">
                Still have a question?
              </h3>
              <p className="relative mt-2 text-xs sm:text-sm text-[#8b96a8] font-medium leading-relaxed">
                Ask it out loud — our AI advisor calls you in ~30 seconds and can bring a
                Your Online MBA counsellor onto the same call.
              </p>

              {/* Suggested questions */}
              <div className="relative mt-5 flex flex-wrap gap-2">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={openAiChat}
                    className="rounded-full border border-white/10 bg-[#14161d] px-3.5 py-2 text-[11px] font-semibold text-[#a8b3c5] transition-all hover:border-[#e0244a]/40 hover:text-[#ff5c7a]"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* CTAs */}
              <button
                onClick={openAiChat}
                className="group relative mt-6 flex h-13 sm:h-14 w-full items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-sm sm:text-base font-extrabold text-white shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]"
              >
                <PhoneCall size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                Get a Free Call Now
              </button>
              <PopupTrigger className="relative mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 text-xs sm:text-sm font-bold text-[#f1f5f9] transition-all hover:border-[#e0244a]/50 hover:text-white">
                <CalendarClock size={15} className="text-[#e0244a]" />
                Book a Free Counselling
                <ArrowRight size={14} />
              </PopupTrigger>

              <p className="relative mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-[#6b7688]">
                <span>9 am – 9 pm IST</span>
                <span className="h-1 w-1 rounded-full bg-[#3a1b22]" />
                <span>Hindi · English</span>
                <span className="h-1 w-1 rounded-full bg-[#3a1b22]" />
                <span className="inline-flex items-center gap-1"><Sparkles size={10} className="text-[#e0244a]" /> AI + human</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
