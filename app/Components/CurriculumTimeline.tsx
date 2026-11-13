import React from 'react';
import { BookOpen, Crosshair, Star, Rocket, Trophy, ArrowRight, type LucideIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';
import PopupTrigger from './PopupTrigger';

interface TimelineItem {
  title: string;
  description: string;
  icon: LucideIcon;
  step: string;
}

const curriculumData: TimelineItem[] = [
  { step: "01", title: "Foundation & Setup", description: "Master core business fundamentals including accounting, economics, and organizational behavior.", icon: BookOpen },
  { step: "02", title: "Core Curriculum", description: "Deep dive into Marketing, Finance, Operations, and Strategic Management.", icon: Crosshair },
  { step: "03", title: "Specialization Track", description: "Modules tailored to your chosen path — HR, IT, Analytics, or International Business.", icon: Star },
  { step: "04", title: "Industry Capstone", description: "Live projects with real datasets from hiring partners and industry mentors.", icon: Rocket },
  { step: "05", title: "Placement Ready", description: "Executive resume building, mock interviews, and direct job referrals.", icon: Trophy },
];

const CurriculumTimeline = () => {
  return (
    <section className="relative w-full py-14 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Square-tile backdrop */}
      <div aria-hidden className="square-grid absolute inset-0 opacity-60 pointer-events-none" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(224,36,74,0.09), transparent 65%)" }}
      />

      <div className="relative max-w-5xl mx-auto space-y-10 md:space-y-12">

        <SectionHeading
          eyebrow="Curriculum"
          title="Skills You'll Master"
          description="Industry-validated curriculum designed for the modern manager."
        />

        <div className="relative">
          {/* Animated center line */}
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-[#e0244a]/60 to-transparent" />

          <div className="space-y-6 sm:space-y-8">
            {curriculumData.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;
              return (
                <ScrollReveal
                  key={index}
                  delay={index * 120}
                  direction={isEven ? "right" : "left"}
                >
                  <div className={`relative flex items-center w-full ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'} pl-14 sm:pl-0`}>
                    {/* Node on the line */}
                    <span className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#e0244a] bg-[#10131a] text-[10px] font-black text-[#ff5c7a] shadow-[0_0_0_5px_rgba(224,36,74,0.12)]">
                      {item.step}
                    </span>

                    <div className="w-full sm:w-[45%]">
                      <div
                        className={`card-shine group rounded-[22px] border border-white/5 bg-[#10131a]/90 p-5 sm:p-6 transition-all duration-300 hover:border-[#e0244a]/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(224,36,74,0.12)] ${
                          isEven ? 'text-left' : 'sm:text-right text-left'
                        }`}
                      >
                        <div className={`flex items-center gap-3 ${isEven ? '' : 'sm:flex-row-reverse'}`}>
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] text-white shadow-[0_8px_18px_rgba(224,36,74,0.35)] transition-transform duration-300 group-hover:scale-110">
                            <Icon size={20} />
                          </span>
                          <h3 className="text-[#f5f7fa] font-extrabold text-base sm:text-lg leading-tight">{item.title}</h3>
                        </div>
                        <p className={`text-[#8b96a8] text-xs sm:text-sm mt-3 font-medium leading-relaxed ${isEven ? 'text-left' : 'sm:text-right text-left'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:block sm:w-[45%]" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <PopupTrigger className="group inline-flex h-14 px-8 items-center gap-2 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 transition-all active:scale-[0.98]">
            Get the Complete Syllabus Guide
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </PopupTrigger>
        </div>

      </div>
    </section>
  );
};

export default CurriculumTimeline;
