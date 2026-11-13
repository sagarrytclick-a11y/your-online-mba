import React from 'react';
import Link from 'next/link';
import { Users, Globe, TrendingUp, Heart, LineChart, Settings, Laptop, BarChart3, Cpu, Building, ClipboardList, Megaphone, HelpCircle, ChevronRight, ArrowRight, type LucideIcon } from 'lucide-react';
import { specialisations } from '../data/specialisations';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

/** Static map keeps lucide tree-shakeable (no dynamic icon lookup) */
const ICONS: Record<string, LucideIcon> = {
  Users, Globe, TrendingUp, Heart, LineChart, Settings, Laptop,
  BarChart3, Cpu, Building, ClipboardList, Megaphone,
};

const themeStyles = {
  rose: {
    bg: 'bg-[#2B141A]',
    icon: 'text-[#ff5c7a]',
    salary: 'text-[#ff5c7a]'
  },
  emerald: {
    bg: 'bg-[#10b9811f]',
    icon: 'text-[#34D399]',
    salary: 'text-[#34D399]'
  },
  violet: {
    bg: 'bg-[#8b5cf61f]',
    icon: 'text-[#A78BFA]',
    salary: 'text-[#A78BFA]'
  },
  blue: {
    bg: 'bg-[#3b82f61f]',
    icon: 'text-[#60A5FA]',
    salary: 'text-[#60A5FA]'
  },
  amber: {
    bg: 'bg-[#f973161f]',
    icon: 'text-[#FB923C]',
    salary: 'text-[#FB923C]'
  },
  teal: {
    bg: 'bg-[#14b8a61f]',
    icon: 'text-[#2DD4BF]',
    salary: 'text-[#2DD4BF]'
  }
};

const SpecialisationsSection = () => {
  return (
    <section className="relative w-full py-14 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Square-tile backdrop */}
      <div aria-hidden className="square-grid absolute inset-0 opacity-70 pointer-events-none" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(76,29,149,0.18), transparent 65%)" }}
      />

      <div className="relative max-w-7xl mx-auto space-y-10 md:space-y-12">

        <SectionHeading
          eyebrow="Specialisations"
          title="Popular Online MBA Specialisations"
          description="Choose from 12+ specialisations aligned to today's job market."
        />

        {/* Specialisations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {specialisations.map((spec, idx) => {
            const IconComponent = ICONS[spec.iconName] ?? HelpCircle;
            const theme = themeStyles[spec.colorTheme] || themeStyles.rose;
            const isHighlighted = spec.slug === "operations-management";

            return (
              <ScrollReveal key={spec.slug} delay={idx * 60} direction="up" className="h-full">
                {/* Ribbon slot — above the card */}
                {isHighlighted ? (
                  <span className="relative z-10 mx-auto -mb-2.5 flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-[#C81E3D] to-[#ff5a3c] px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white shadow-[0_8px_20px_rgba(224,36,74,0.55)]">
                    Bestseller
                  </span>
                ) : (
                  <span aria-hidden className="-mb-2.5 block h-[26px]" />
                )}
                <Link
                  href={`/specialisations/${spec.slug}`}
                  className={`card-shine group relative flex flex-col justify-between h-full p-6 rounded-[22px] transition-all duration-300 hover:-translate-y-2 ${
                    isHighlighted
                      ? "bg-[#16141b] border border-[#e0244a]/55 shadow-[0_20px_50px_rgba(224,36,74,0.18)]"
                      : "bg-[#10131a]/90 border border-white/5 hover:border-[#e0244a]/40 hover:shadow-[0_20px_50px_rgba(224,36,74,0.12)]"
                  }`}
                >
                  <div>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${theme.bg} border border-white/5 mb-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                      <IconComponent className={`${theme.icon} w-5 h-5`} />
                    </div>

                    <h3 className="text-[#f5f7fa] font-bold text-sm sm:text-base mb-1 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                      {spec.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <span className={`text-[11px] font-black tracking-wide ${theme.salary}`}>
                      {spec.salaryRange}
                    </span>

                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#e0244a] group-hover:bg-[#e0244a]">
                      <ChevronRight
                        size={13}
                        className="text-[#a8b3c5] transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center pt-2">
          <Link
            href="/specialisations"
            className="group inline-flex h-14 px-8 items-center gap-2 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]"
          >
            <span>View All Specialisations</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

    </section>
  );
};

export default SpecialisationsSection;
