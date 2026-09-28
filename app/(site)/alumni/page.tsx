import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import AlumniExplorer from "../../Components/AlumniExplorer";
import SectionHeading from "../../Components/SectionHeading";
import ScrollReveal from "../../Components/ScrollReveal";
import JsonLd from "../../Components/JsonLd";
import PopupTrigger from "../../Components/PopupTrigger";
import { alumniSpotlights } from "../../data/alumni";
import { buildMetadata, breadcrumbJsonLd } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Online MBA Alumni Success Stories - Real Career Transitions",
  description:
    "Software developers to product managers, engineers to consultants, graduates to founders. Read verified online MBA alumni stories with before-and-after salaries, roles and industries.",
  path: "/alumni",
  keywords: [
    "online MBA alumni",
    "MBA success stories",
    "online MBA career switch",
    "MBA ROI real examples",
  ],
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Alumni", path: "/alumni" },
]);

const peopleSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Online MBA Alumni Success Stories",
  numberOfItems: alumniSpotlights.length,
  itemListElement: alumniSpotlights.slice(0, 20).map((a, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Person",
      name: a.name,
      jobTitle: a.role,
      worksFor: { "@type": "Organization", name: a.company },
      description: a.headline,
    },
  })),
};

export default function AlumniPage() {
  const careerSwitches = new Set(
    alumniSpotlights.map((a) => `${a.priorIndustry}->${a.role.split(" ")[0]}`)
  ).size;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={peopleSchema} />

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
            <span className="text-slate-500">Alumni</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight leading-tight">
              Alumni who changed careers
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Every story here states the prior role, the prior salary and the current one. No
              anonymous testimonials, no &ldquo;successful&rdquo; with no numbers attached.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                `${alumniSpotlights.length} verified alumni`,
                `${careerSwitches} distinct career switches`,
                "Salary before and after",
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
        <AlumniExplorer />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Pattern, not anecdote"
            title="What the alumni data actually shows"
            description="Read enough of these and the same four things keep coming up."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {[
              {
                icon: Icons.Shuffle,
                title: "The switch works best with a prior technical role",
                body: "Developers, engineers and analysts cross into product, consulting and analytics faster than people coming from non-analytical functions, because the hard part was never the syllabus, it was building the business vocabulary.",
              },
              {
                icon: Icons.MapPin,
                title: "Location is not destiny",
                body: "Learners in tier-2 and tier-3 cities land roles in metro companies. What limits them is not the city on their profile but whether the specialisation they chose matches the industry they want to move into.",
              },
              {
                icon: Icons.Rocket,
                title: "The first six months decide the outcome",
                body: "Everyone who reports a large uplift did something with the programme beyond submitting assignments. Live sessions, peer projects and the alumni network are optional in theory and decisive in practice.",
              },
              {
                icon: Icons.IndianRupee,
                title: "A bigger prior salary means a smaller percentage jump",
                body: "Someone going from ₹3L to ₹6L is up 100%. Someone going from ₹22L to ₹28L is up 27% and probably took home more money in absolute terms. Judge the offer on absolute numbers, not on the percentage.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm space-y-3"
              >
                <span className="w-11 h-11 rounded-xl bg-[#FFF1F2] flex items-center justify-center">
                  <item.icon size={19} className="text-[#C81E3D]" />
                </span>
                <h3 className="text-base font-extrabold text-[#1E293B]">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <ScrollReveal>
          <div className="bg-[#C81E3D] rounded-3xl p-8 sm:p-10 text-white space-y-5">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Want to be the next story on this page?
            </h2>
            <p className="text-rose-100 text-sm font-medium max-w-md mx-auto">
              Talk to a counsellor about which specialisation fits the career you are aiming at, not the
              one that sounds broadest on paper.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <PopupTrigger className="h-12 px-7 bg-white text-[#C81E3D] font-extrabold rounded-full text-sm shadow-lg transition-all active:scale-[0.98] inline-flex items-center gap-2">
                <Icons.Phone size={16} />
                Speak to a counsellor
              </PopupTrigger>
              <Link
                href="/find-my-program"
                className="h-12 px-7 border-2 border-white/70 text-white font-extrabold rounded-full text-sm transition-all inline-flex items-center gap-2"
              >
                <Icons.Search size={16} />
                Find my programme
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
