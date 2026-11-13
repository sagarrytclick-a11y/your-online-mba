import React from 'react';
import { Landmark, Megaphone, BarChart3, Users, Link2, Monitor, Settings, Globe, ArrowRight, TrendingUp, IndianRupee, BadgeCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import PopupTrigger from './PopupTrigger';

const CareerOptionsSection = () => {

  const stats = [
    { value: "40%+", label: "Avg. Salary Hike", icon: TrendingUp },
    { value: "₹18 LPA", label: "Highest Package", icon: IndianRupee },
    { value: "85%+", label: "Placement Rate", icon: BadgeCheck }
  ];

  const careers = [
    { title: "Finance Manager", icon: Landmark, growth: "+ 35% growth", salary: "₹8-22 LPA", highlighted: false },
    { title: "Marketing Head", icon: Megaphone, growth: "+ 30% growth", salary: "₹6-18 LPA", highlighted: false },
    { title: "Business Analyst", icon: BarChart3, growth: "+ 35% growth", salary: "₹9-22 LPA", highlighted: false },
    { title: "HR Manager", icon: Users, growth: "+ 20% growth", salary: "₹6-15 LPA", highlighted: false },
    { title: "Supply Chain Manager", icon: Link2, growth: "+ 28% growth", salary: "₹8-16 LPA", highlighted: false },
    { title: "Data Analytics Manager", icon: Monitor, growth: "+ 40% growth", salary: "₹10-25 LPA", highlighted: false },
    { title: "Operations Director", icon: Settings, growth: "+ 22% growth", salary: "₹8-20 LPA", highlighted: false },
    { title: "International Trade Manager", icon: Globe, growth: "+ 18% growth", salary: "₹8-18 LPA", highlighted: true }
  ];

  return (
    <section className="relative w-full py-14 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Square-tile backdrop */}
      <div aria-hidden className="pinstripe absolute inset-0 opacity-70 pointer-events-none" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,138,61,0.08), transparent 65%)" }}
      />

      <div className="relative max-w-7xl mx-auto space-y-10 md:space-y-12">

        <SectionHeading
          eyebrow="After MBA"
          title="Career Options After Online MBA"
          description="Where our graduates are working today."
        />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 90} direction="up">
              <div className="group relative overflow-hidden rounded-2xl border border-[#e0244a]/20 bg-gradient-to-br from-[#e0244a]/15 via-[#14161d] to-[#14161d] p-5 text-center transition-all duration-300 hover:border-[#e0244a]/40 hover:-translate-y-1">
                <span className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0244a]/15 text-[#ff5c7a] transition-transform duration-300 group-hover:scale-110">
                  <stat.icon size={18} />
                </span>
                <p className="text-2xl sm:text-3xl font-black tracking-tight text-[#f5f7fa]">{stat.value}</p>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b96a8] mt-1">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {careers.map((career, idx) => {
            const IconComponent = career.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 60} direction="up" className="h-full">
                <div className="flex h-full flex-col">
                  {/* Ribbon slot — above the card */}
                  {career.highlighted ? (
                    <span className="relative z-10 mx-auto -mb-2.5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#C81E3D] to-[#ff5a3c] px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(224,36,74,0.55)]">
                      Fastest Growing
                    </span>
                  ) : (
                    <span aria-hidden className="-mb-2.5 block h-[24px]" />
                  )}
                  <div
                    className={`card-shine group relative h-full rounded-[22px] p-6 transition-all duration-300 hover:-translate-y-2 ${
                      career.highlighted
                        ? "bg-[#16141b] border border-[#e0244a]/55 shadow-[0_20px_50px_rgba(224,36,74,0.18)]"
                        : "bg-[#10131a]/90 border border-white/5 hover:border-[#e0244a]/40 hover:shadow-[0_20px_50px_rgba(224,36,74,0.12)]"
                    }`}
                  >
                  {/* Icon + Title Row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] text-white shadow-[0_6px_16px_rgba(224,36,74,0.35)] flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <IconComponent size={18} />
                    </div>
                    <h4 className="text-[#f5f7fa] font-extrabold text-sm leading-tight">{career.title}</h4>
                  </div>

                  {/* Divider */}
                  <div className="h-[2px] w-10 bg-gradient-to-r from-[#e0244a] to-transparent rounded-full mb-3"></div>

                  {/* Growth */}
                  <p className="text-[11px] text-emerald-400 font-bold mb-1">{career.growth}</p>

                  {/* Salary */}
                  <p className="text-[#ff5c7a] font-extrabold text-base">{career.salary}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-[#7c8798] font-medium">
          Salaries based on LPA. Data sourced from 2025 placement reports.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <PopupTrigger className="group inline-flex h-14 px-8 items-center gap-2 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]">
            Unlock Your Dream Career Plan
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </PopupTrigger>
        </div>

      </div>
    </section>
  );
};

export default CareerOptionsSection;
