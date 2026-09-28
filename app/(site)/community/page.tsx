import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import CommunityBoard from "../../Components/CommunityBoard";
import SectionHeading from "../../Components/SectionHeading";
import ScrollReveal from "../../Components/ScrollReveal";
import JsonLd from "../../Components/JsonLd";
import { communityQuestions, topicLabels } from "../../data/community";
import { buildMetadata, breadcrumbJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Online MBA Community - Answers From Counsellors & Alumni",
  description:
    "Searchable Q&A on online MBA admissions, fees, EMI, exams, LMS and placements, answered by verified alumni, counsellors and academic experts. Filter by topic and upvote what helped.",
  path: "/community",
  keywords: [
    "online MBA questions",
    "MBA admission help",
    "online MBA student community",
    "online MBA exam queries",
  ],
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Community", path: "/community" },
]);

const qaSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: communityQuestions.slice(0, 12).map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answers[0]?.answer ?? "Answered by our counsellor team.",
    },
  })),
};

export default function CommunityPage() {
  const totalAnswers = communityQuestions.reduce((sum, q) => sum + q.answers.length, 0);
  const totalViews = communityQuestions.reduce((sum, q) => sum + q.views, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={qaSchema} />

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
            <span className="text-slate-500">Community</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight leading-tight">
              Ask. Get an answer. Move on.
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              {communityQuestions.length} questions covering {Object.keys(topicLabels).length} topics,
              answered by people who do this for a living. Filter by topic, mark what helped, and stop
              reading brochures that answer nothing.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                `${communityQuestions.length} questions`,
                `${totalAnswers} answers`,
                `${totalViews.toLocaleString("en-IN")} views`,
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

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <CommunityBoard />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Community rules"
            title="Why answers here stay useful"
            description="Most education forums fill up with affiliate spam. These four rules are what keeps this one readable."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {[
              {
                icon: Icons.BadgeCheck,
                title: "Every answer carries a credential",
                body: "Answers are attributed to a counsellor, a verified alumni or a faculty-level expert. Nobody answers as &ldquo;anonymous&rdquo;, because anonymous advice is how people end up enrolling in the wrong programme.",
              },
              {
                icon: Icons.HandCoins,
                title: "No university is promoted",
                body: "If a university cannot be recommended on its merits in this section, it is not recommended at all. Rankings and fee data are published with the source visible so you can verify them.",
              },
              {
                icon: Icons.ThumbsUp,
                title: "Helpful votes decide what stays visible",
                body: "Answers that helped get ranked. Answers that turned out to be wrong get flagged and removed. Nothing is promoted by paid placement.",
              },
              {
                icon: Icons.RotateCcw,
                title: "University policies change, so answers carry dates",
                body: "Every question shows when it was asked, and every policy claim should be re-checked with the university before you pay. Fee structures in this sector move every intake.",
              },
            ].map((rule) => (
              <div
                key={rule.title}
                className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm space-y-3"
              >
                <span className="w-11 h-11 rounded-xl bg-[#FFF1F2] flex items-center justify-center">
                  <rule.icon size={19} className="text-[#C81E3D]" />
                </span>
                <h3 className="text-base font-extrabold text-[#1E293B]">{rule.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{rule.body}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
