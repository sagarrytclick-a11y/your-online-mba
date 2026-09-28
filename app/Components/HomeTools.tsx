import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const tools = [
  {
    href: "/find-my-program",
    icon: Icons.Search,
    title: "Find my programme",
    body: "Answer five questions about budget, field, experience and goal. Get a ranked shortlist with reasons for each pick.",
    cta: "Start the finder",
    accent: "bg-[#C81E3D] text-white",
  },
  {
    href: "/compare-programs",
    icon: Icons.Scale,
    title: "Compare programmes",
    body: "Put up to three universities side by side on fee, accreditation, NIRF rank, placement and estimated ROI.",
    cta: "Open the matrix",
    accent: "bg-white text-[#C81E3D] border-2 border-rose-100",
  },
  {
    href: "/roi-calculator",
    icon: Icons.Calculator,
    title: "Run the ROI maths",
    body: "See the projected package, monthly gain, break-even month and ten-year net benefit at your actual salary.",
    cta: "Calculate ROI",
    accent: "bg-white text-[#C81E3D] border-2 border-rose-100",
  },
  {
    href: "/scholarships",
    icon: Icons.IndianRupee,
    title: "Check scholarships",
    body: "Merit, budget, defence and women-in-leadership schemes, plus zero-interest EMI against bank loans.",
    cta: "Check eligibility",
    accent: "bg-white text-[#C81E3D] border-2 border-rose-100",
  },
  {
    href: "/alumni",
    icon: Icons.GraduationCap,
    title: "Read alumni stories",
    body: "Named graduates with the role they left, the role they took and what they earn now.",
    cta: "See the stories",
    accent: "bg-white text-[#C81E3D] border-2 border-rose-100",
  },
  {
    href: "/community",
    icon: Icons.MessageSquare,
    title: "Ask the community",
    body: "Searchable questions on admissions, fees, exams and placements, answered by counsellors and alumni.",
    cta: "Browse answers",
    accent: "bg-white text-[#C81E3D] border-2 border-rose-100",
  },
];

const HomeTools = () => {
  return (
    <section className="w-full bg-[#F8FAFC] py-10 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Tools"
            title="Decide with data, not brochures"
            description="Six tools that do the arithmetic nobody publishes: what it costs, what it returns, and whether you qualify."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.href} delay={(i % 3) * 90} direction="up">
              <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col space-y-4 hover:shadow-md hover:border-[#C81E3D]/25 transition-all">
                <span className="w-12 h-12 rounded-xl bg-[#FFF1F2] flex items-center justify-center">
                  <tool.icon size={21} className="text-[#C81E3D]" />
                </span>
                <h3 className="text-lg font-extrabold text-[#1E293B] tracking-tight">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed flex-grow">
                  {tool.body}
                </p>
                <Link
                  href={tool.href}
                  className={`${tool.accent} h-11 px-6 rounded-full text-xs font-extrabold transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2`}
                >
                  {tool.cta}
                  <Icons.ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTools;
