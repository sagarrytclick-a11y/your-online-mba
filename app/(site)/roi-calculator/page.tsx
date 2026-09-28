import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import ROICalculator from "../../Components/ROICalculator";
import JsonLd from "../../Components/JsonLd";
import SectionHeading from "../../Components/SectionHeading";
import ScrollReveal from "../../Components/ScrollReveal";
import { getBenchmarkBySlug } from "../../lib/roi";
import { buildMetadata, breadcrumbJsonLd } from "../../lib/seo";
import { collegeReviews } from "../../data/colleges";
import { getUniversityDetailsOrDefaults } from "../../data/university-details";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = buildMetadata({
  title: "Online MBA ROI Calculator - Fee vs Salary Payoff",
  description:
    "Work out what an online MBA actually returns. Enter your current salary and university fee to see the projected package, monthly gain, break-even point and 5-year net benefit, plus EMI plans.",
  path: "/roi-calculator",
  keywords: [
    "online MBA ROI",
    "MBA return on investment",
    "online MBA cost benefit",
    "MBA salary projection India",
    "online MBA EMI calculator",
  ],
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "ROI Calculator", path: "/roi-calculator" },
]);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is the ROI on an online MBA calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator compares the salary you would earn after the programme against what you would have earned by staying on the same track without it. The difference in yearly pay, minus the programme fee and an estimate of the income you forgo while studying, gives the net benefit. Break-even is the month when that cumulative net benefit turns positive.",
      },
    },
    {
      "@type": "Question",
      name: "What salary uplift should I expect from an online MBA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Published placement data suggests an uplift of roughly 40 to 60 percent for most specialisations, with data and AI tracks at the higher end and HR and healthcare at the lower end. The calculator tempers this when you are already earning at or above the entry band for your chosen field.",
      },
    },
    {
      "@type": "Question",
      name: "Should I include the EMI interest in the ROI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only if the plan carries interest. Several universities offer zero-interest EMI on education loans, in which case the full fee is the only cost. Where interest applies, use the EMI comparison table on this page to see the total interest before deciding.",
      },
    },
    {
      "@type": "Question",
      name: "Is the salary projection guaranteed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The figures are modelled from published placement bands and a standard annual raise assumption. Individual outcomes vary with industry, location, prior experience and the effort invested during the programme.",
      },
    },
  ],
};

export default async function ROICalculatorPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const universityParam = Array.isArray(params.university) ? params.university[0] : params.university;
  const domainParam = Array.isArray(params.domain) ? params.domain[0] : params.domain;

  const validUniversity = collegeReviews.some((c) => c.id === universityParam)
    ? universityParam
    : undefined;
  const benchmark = getBenchmarkBySlug(domainParam);

  const howItWorks = [
    {
      icon: "Wallet",
      title: "Total cost, not monthly EMI",
      body: "A ₹8,000 EMI feels cheap. Over 24 months it is ₹1.92 lakh, and the calculator treats it that way, adding an estimate of the increments and bonus you pause while studying.",
    },
    {
      icon: "TrendingUp",
      title: "Uplift dampened by where you start",
      body: "A 50% jump from ₹4 LPA is not the same as 50% from ₹25 LPA. The projection scales down when your current salary already sits at or above the entry band for the field.",
    },
    {
      icon: "Timer",
      title: "Break-even, not hype",
      body: "If the calculator says the programme takes more than five years to pay back, that is a signal to pick a cheaper university rather than force a premium one.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <section className="bg-white border-b border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C81E3D] uppercase tracking-wider"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">ROI Calculator</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight leading-tight">
              Online MBA ROI calculator
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Most programme pages quote an average package. This one shows what an MBA is worth to
              you specifically: the fee you pay, the salary you give up while studying, the package you
              land on, and the month the whole thing starts paying for itself.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                `Projecting into ${benchmark.title}`,
                "10-year projection",
                "EMI plans included",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF1F2] border border-rose-100 text-[11px] font-extrabold text-[#C81E3D]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ROICalculator
          lockedCollegeId={validUniversity}
          defaultDomain={domainParam && benchmark.slug === domainParam ? domainParam : undefined}
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How the maths works"
            title="Why our numbers look lower than the brochure"
            description="Every ROI model has assumptions. These are ours, and they are deliberately conservative."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {howItWorks.map((item) => {
              const Icon =
                item.icon === "Wallet"
                  ? Icons.Wallet
                  : item.icon === "TrendingUp"
                    ? Icons.TrendingUp
                    : Icons.Timer;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm space-y-3"
                >
                  <span className="w-11 h-11 rounded-xl bg-[#FFF1F2] flex items-center justify-center">
                    <Icon size={19} className="text-[#C81E3D]" />
                  </span>
                  <h3 className="text-base font-extrabold text-[#1E293B]">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
              Quick fee reference
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Total programme fee and starting EMI for every university we track, sorted cheapest
              first. Run the full projection on any of them above.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left">
                <thead>
                  <tr className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-gray-100">
                    <th className="pb-3">University</th>
                    <th className="pb-3 text-right">Total fee</th>
                    <th className="pb-3 text-right">EMI from</th>
                    <th className="pb-3 text-right">Avg package</th>
                    <th className="pb-3 text-right" />
                  </tr>
                </thead>
                <tbody>
                  {collegeReviews
                    .map((c) => ({ c, d: getUniversityDetailsOrDefaults(c.id) }))
                    .sort((a, b) => a.d.totalFee - b.d.totalFee)
                    .map(({ c, d }) => (
                      <tr key={c.id} className="border-b border-gray-100 last:border-0 text-xs font-bold">
                        <td className="py-3">
                          <Link
                            href={`/universities/${c.id}`}
                            className="text-[#1E293B] font-extrabold hover:text-[#C81E3D] transition-colors"
                          >
                            {c.name}
                          </Link>
                        </td>
                        <td className="py-3 text-right text-[#1E293B]">
                          ₹{(d.totalFee / 100000).toFixed(2)}L
                        </td>
                        <td className="py-3 text-right text-slate-500">
                          ₹{d.emiMonthly.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 text-right text-slate-500">₹{d.avgPackageLpa}L</td>
                        <td className="py-3 text-right">
                          <Link
                            href={`/roi-calculator?university=${c.id}`}
                            className="text-[#C81E3D] font-extrabold hover:underline"
                          >
                            Calculate
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight text-center">
            ROI questions, answered
          </h2>
          <div className="mt-6 space-y-3">
            {faqSchema.mainEntity.map((item) => (
              <details
                key={item.name}
                className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-sm font-extrabold text-[#1E293B] leading-snug">{item.name}</h3>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-open:bg-[#C81E3D] group-open:text-white transition-colors">
                    <Icons.ChevronDown size={15} className="transition-transform group-open:rotate-180" />
                  </span>
                </summary>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mt-3">
                  {item.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
