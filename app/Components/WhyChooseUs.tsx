import React from 'react';
import { Briefcase, Clock, GraduationCap, Globe, Handshake, Banknote, ArrowRight, Download, Sparkles } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import PopupTrigger from './PopupTrigger';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Career Acceleration",
      text: "Average salary hike of 45% within 12 months of graduation across all specialisations.",
      icon: Briefcase,
      tag: "+45% ROI",
    },
    {
      id: 2,
      title: "Flexible Learning",
      text: "Weekend and evening batches designed for working professionals. Study on your own schedule.",
      icon: Clock,
      tag: "Weekend batches",
      featured: true,
    },
    {
      id: 3,
      title: "UGC-Recognised Degree",
      text: "Same recognition as a regular MBA degree. Valid for govt jobs, promotions, and abroad.",
      icon: GraduationCap,
      tag: "Govt jobs ✓",
    },
    {
      id: 4,
      title: "Industry-Led Curriculum",
      text: "Updated every semester with inputs from 200+ industry partners and hiring companies.",
      icon: Globe,
      tag: "200+ partners",
    },
    {
      id: 5,
      title: "Placement Support",
      text: "Dedicated placement cell, resume building, mock interviews, and direct job referrals.",
      icon: Handshake,
      tag: "500+ partners",
    },
    {
      id: 6,
      title: "Cost Effective",
      text: "₹80K to ₹2.5L for a complete MBA — 70% cheaper than offline programs with equal ROI.",
      icon: Banknote,
      tag: "70% cheaper",
    },
  ];

  return (
    <section className="relative w-full py-14 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Square-tile backdrop */}
      <div aria-hidden className="square-grid absolute inset-0 opacity-70 pointer-events-none" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(224,36,74,0.10), transparent 65%)" }}
      />

      <div className="relative max-w-7xl mx-auto space-y-10 md:space-y-12">

        <SectionHeading
          eyebrow="Why Choose Us"
          title="What Makes an Online MBA Worth It?"
          description="Real benefits backed by real outcomes — not just promises."
        />

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            const card = (
              <div className="flex h-full flex-col">
                {/* Most Popular ribbon — sits above the card */}
                {item.featured ? (
                  <span className="relative z-10 mx-auto -mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#C81E3D] to-[#ff5a3c] px-5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(224,36,74,0.55)]">
                    <Sparkles size={10} />
                    Most Popular
                  </span>
                ) : (
                  <span aria-hidden className="-mb-3 h-[26px]" />
                )}
                <div
                  key={item.id}
                  className={`card-shine group relative flex h-full flex-col rounded-[22px] p-6 sm:p-7 pt-7 transition-all duration-300 ${
                    item.featured
                      ? "bg-[#16141b] border border-[#e0244a]/50 shadow-[0_25px_60px_rgba(224,36,74,0.15)] -translate-y-1"
                      : "bg-[#10131a]/90 border border-white/5 hover:-translate-y-2 hover:border-[#e0244a]/40 hover:shadow-[0_25px_60px_rgba(224,36,74,0.12)]"
                  }`}
                >
                {/* Tag chip */}
                <span className="absolute top-5 right-5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-[#a8b3c5]">
                  {item.tag}
                </span>
                {/* Icon chip */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] text-white shadow-[0_8px_20px_rgba(224,36,74,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <IconComponent size={21} strokeWidth={2} />
                </div>

                <h3 className="mt-5 text-[#f5f7fa] font-extrabold text-lg tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[#8b96a8] text-sm leading-relaxed font-medium">
                  {item.text}
                </p>
                </div>
              </div>
            );

            return (
              <ScrollReveal key={item.id} delay={idx * 80} direction="up" className="h-full">
                {card}
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center pt-2">
          <PopupTrigger className="group inline-flex h-14 items-center gap-2 px-8 md:px-10 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]">
            Discover if Online MBA is Right for You
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </PopupTrigger>
        </div>

      {/* Floating WhatsApp + PDF stack — snug bottom-left */}
      <div className="side-fab fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-50 flex flex-col items-center gap-2">
        <WhatsAppButton wrapperClassName="flex flex-col items-center group" />

        <div className="relative group cursor-pointer flex flex-col items-center">
          {/* Ripple rings */}
          <span className="absolute inset-0 rounded-full border-2 border-[#e0244a]/40 scale-110 animate-ping opacity-60"></span>

          <PopupTrigger className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#14161d] border border-[#e0244a]/30 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_30px_rgba(224,36,74,0.3)] transition-all group-hover:scale-110 active:scale-95 relative z-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#e0244a] to-[#ff8a3d] mb-0.5">
              <Download size={15} className="text-white group-hover:translate-y-0.5 transition-transform" />
            </div>
            <span className="text-[9px] font-black text-[#ff5c7a] uppercase tracking-wider -mt-1 z-20">
              PDF
            </span>
          </PopupTrigger>
        </div>
      </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
