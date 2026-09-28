import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import BookingWidget from "../../Components/BookingWidget";
import SectionHeading from "../../Components/SectionHeading";
import ScrollReveal from "../../Components/ScrollReveal";
import JsonLd from "../../Components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Book a Free Online MBA Counselling Call - 20 Minutes, No Cost",
  description:
    "Pick a real slot with an online MBA counsellor. 20 minutes on video, phone or WhatsApp, no obligation to enrol. Compare fees, eligibility, ROI and scholarships with someone who knows the intakes.",
  path: "/book-counseling",
  keywords: [
    "online MBA counselling",
    "MBA admission help",
    "book MBA counsellor",
    "online MBA advisor call",
  ],
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Book Counselling", path: "/book-counseling" },
]);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the counselling call really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Counsellors are paid a fixed salary, not a commission per enrolment, so there is no financial reason to push you towards a particular university. If they do not think any programme suits you, they will say so.",
      },
    },
    {
      "@type": "Question",
      name: "What should I have ready for the call?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your graduation percentage, your current or most recent salary, work experience in years, the budget you have in mind and the career you are aiming at. That is enough for a counsellor to narrow a hundred programmes down to three realistic ones.",
      },
    },
    {
      "@type": "Question",
      name: "Will you try to sell me a premium programme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The first thing a counsellor does is establish your budget, and cheap programmes that meet your goal are always preferred over expensive ones. Bring your budget, it changes the conversation completely.",
      },
    },
    {
      "@type": "Question",
      name: "Can I reschedule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Up to four hours before the slot, at no cost. Slots that go unclaimed are released back to the pool, so please give notice if you cannot make it.",
      },
    },
  ],
};

const agenda = [
  {
    icon: Icons.Search,
    title: "Where you actually stand",
    body: "Graduation percentage, any backlogs, work experience and whether your category or defence status changes what you qualify for. This takes five minutes and shapes everything after it.",
  },
  {
    icon: Icons.Scale,
    title: "What the degree actually gets you",
    body: "Target roles for your specialisation, the honest salary range in your city, and whether an online MBA is the cheapest route there or whether a certificate or a PGDM suits better.",
  },
  {
    icon: Icons.Wallet,
    title: "The real cost",
    body: "Total fee, zero-interest EMI against a bank loan, scholarship eligibility, and the number of months until the programme pays for itself at your current salary.",
  },
  {
    icon: Icons.FileCheck2,
    title: "Your next three actions",
    body: "You leave with a shortlist, a document checklist and a deadline calendar. Not a brochure.",
  },
];

export default function BookCounselingPage() {
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
            <span className="text-slate-500">Book Counselling</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight leading-tight">
              Twenty minutes, then you know
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Book a slot with a counsellor who will tell you what the degree is worth in your
              specific situation, which programmes qualify for your budget, and which ones to ignore.
              No cost, no obligation, and no brochure.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Free 20-minute call", "Video, phone or WhatsApp", "No enrolment obligation"].map(
                (item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF1F2] border border-rose-100 text-[11px] font-extrabold text-[#C81E3D]"
                  >
                    <Icons.Check size={12} />
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
          <div>
            <SectionHeading
              eyebrow="The agenda"
              title="What the 20 minutes actually cover"
              description="A structured call, not a sales pitch. Here is the order it happens in."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {agenda.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80} direction="up">
                  <div className="h-full bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
                    <span className="w-11 h-11 rounded-xl bg-[#FFF1F2] flex items-center justify-center">
                      <item.icon size={19} className="text-[#C81E3D]" />
                    </span>
                    <h3 className="text-base font-extrabold text-[#1E293B]">{item.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
                <h3 className="text-base font-extrabold text-[#1E293B]">Bring these four things</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {[
                    "Graduation percentage and any backlogs",
                    "Current or last drawn salary",
                    "Years of work experience",
                    "Your budget for the total fee",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-600 font-semibold"
                    >
                      <Icons.CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:sticky lg:top-28">
            <BookingWidget />
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight text-center">
            Counselling questions
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
