import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import ApplicationTracker from "../../../Components/ApplicationTracker";
import JsonLd from "../../../Components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "../../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Online MBA Application Tracker - Shortlist to Enrolment",
  description:
    "Track every online MBA application in one place: stage, next action, deadline, notes and document checklist. Stored in your browser, no account required.",
  path: "/student/dashboard",
  noIndex: true,
});

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Application Tracker", path: "/student/dashboard" },
]);

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <JsonLd data={breadcrumbSchema} />

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
            <span className="text-slate-500">Application Tracker</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight leading-tight">
              Your application tracker
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Most applicants juggle four applications across three spreadsheets and a WhatsApp group.
              This holds all of it: stage, next action, deadline, notes and the document checklist.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["No account needed", "Stored in your browser", "Import your shortlist"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF1F2] border border-rose-100 text-[11px] font-extrabold text-[#C81E3D]"
                >
                  <Icons.Check size={12} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ApplicationTracker />
      </section>
    </div>
  );
}
