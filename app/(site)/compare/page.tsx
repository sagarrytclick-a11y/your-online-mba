"use client";
import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { useCompare } from "../../context/CompareContext";
import ScrollReveal from "../../Components/ScrollReveal";
import PopupTrigger from "../../Components/PopupTrigger";

const comparisonRows = [
  { key: "Rating", render: (c: { rating: number }) => (
    <div className="flex items-center justify-center gap-1">
      <Icons.Star size={16} className="fill-yellow-400 text-yellow-400" />
      <span className="font-extrabold text-lg text-black">{c.rating}/5</span>
    </div>
  )},
  { key: "Fees", render: (c: { fees: string }) => (
    <span className="font-extrabold text-lg text-[#F1F5F9]">{c.fees}</span>
  )},
  { key: "Location", render: (c: { location: string }) => (
    <span className="text-sm font-bold text-[#a8b3c5]">{c.location}</span>
  )},
  { key: "Established", render: (c: { estd: string }) => (
    <span className="text-sm font-bold text-[#a8b3c5]">{c.estd.replace("Estd ", "")}</span>
  )},
  { key: "Courses", render: (c: { coursesCount: string }) => (
    <span className="text-sm font-bold text-[#a8b3c5]">{c.coursesCount}</span>
  )},
  { key: "Reviews", render: (c: { totalReviews: string }) => (
    <span className="text-sm font-bold text-[#a8b3c5]">{c.totalReviews}</span>
  )},
  { key: "Entrance", render: (c: { entranceExam: string }) => (
    <span className="text-sm font-bold text-[#a8b3c5]">{c.entranceExam}</span>
  )},
  { key: "Rating Distribution", render: (c: { ratingDistribution: Record<string, number> }) => (
    <div className="space-y-1 w-full max-w-[140px] mx-auto">
      {[
        { label: "5★", val: c.ratingDistribution.fiveStar },
        { label: "4★", val: c.ratingDistribution.fourStar },
        { label: "3★", val: c.ratingDistribution.threeStar },
        { label: "2★", val: c.ratingDistribution.twoStar },
        { label: "1★", val: c.ratingDistribution.oneStar },
      ].map((row) => (
        <div key={row.label} className="flex items-center gap-1.5 text-[10px] font-bold text-[#8b96a8]">
          <span className="w-5 text-right">{row.label}</span>
          <div className="h-1.5 flex-1 bg-[#1b1e27] rounded-full overflow-hidden">
            <div className="h-full bg-blue-400/100 rounded-full" style={{ width: `${row.val}%` }} />
          </div>
          <span className="w-6 text-right">{row.val}%</span>
        </div>
      ))}
    </div>
  )},
];

export default function ComparePage() {
  const { compareColleges, clear } = useCompare();

  return (
    <div className="min-h-screen bg-[#10131A] pb-24">
      <section className="bg-[#14161d] border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C81E3D] uppercase tracking-wider">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-[#7c8798]">/</span>
            <span className="text-[#8b96a8]">Compare Universities</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-black text-[#F1F5F9] tracking-tight">
                Compare Universities
              </h1>
              <p className="text-[#8b96a8] text-sm font-medium">
                Side-by-side comparison of fees, ratings, and key details.
              </p>
            </div>
            {compareColleges.length > 0 && (
              <button
                onClick={clear}
                className="inline-flex items-center gap-2 h-10 px-5 border border-white/10 rounded-full text-sm font-bold text-[#8b96a8] hover:text-[#C81E3D] hover:border-[#C81E3D] transition-all"
              >
                <Icons.Trash2 size={14} />
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      {compareColleges.length === 0 ? (
        <section className="max-w-xl mx-auto px-4 mt-20 text-center">
          <div className="bg-[#14161d] rounded-3xl border border-white/10 p-12 shadow-sm space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2B141A] flex items-center justify-center">
              <Icons.BarChart3 size={32} className="text-[#C81E3D]" />
            </div>
            <h2 className="text-xl font-extrabold text-[#F1F5F9]">No Universities Selected</h2>
            <p className="text-[#8b96a8] text-sm font-medium">
              Browse universities and click the <Icons.BarChart3 size={14} className="inline text-[#C81E3D]" /> icon to add them for comparison.
            </p>
            <Link
              href="/universities"
              className="inline-flex items-center gap-2 h-12 px-7 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-sm shadow-lg transition-all"
            >
              <Icons.Search size={16} />
              Browse Universities
            </Link>
          </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <ScrollReveal>
            <p className="swipe-hint mb-2 items-center gap-1.5 text-[11px] font-bold text-[#7c8798]">
              <span className="text-[#e0244a]">↔</span> Swipe sideways to compare every university
            </p>
            <div className="overflow-x-auto custom-scroll pb-4">
              <table className="w-full min-w-[600px] border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-[#10131a] z-10 min-w-[160px] p-4 border border-white/10 rounded-tl-2xl text-left text-xs font-bold uppercase tracking-wider text-[#8b96a8]">
                      Details
                    </th>
                    {compareColleges.map((col) => (
                      <th key={col.id} className="min-w-[220px] p-4 border border-white/10 text-center bg-[#14161d] first:border-l-0 last:rounded-tr-2xl">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#1b1e27] ring-2 ring-white/10">
                            <img loading="lazy" decoding="async" src={col.image} alt={col.name} className="w-full h-full object-cover" />
                          </div>
                          <Link href={`/universities/${col.id}`} className="font-extrabold text-sm text-[#F1F5F9] hover:text-[#C81E3D] transition-colors leading-tight">
                            {col.name}
                          </Link>
                          <Link
                            href={`/universities/${col.id}`}
                            className="text-[10px] font-bold text-[#C81E3D] hover:underline uppercase tracking-wider"
                          >
                            View Details
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.key}>
                      <td className="sticky left-0 bg-[#10131a] z-10 p-4 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#8b96a8]">
                        {row.key}
                      </td>
                      {compareColleges.map((col) => (
                        <td key={col.id} className="p-4 border border-white/10 text-center bg-[#14161d]">
                          {row.render(col as never)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="sticky left-0 bg-[#10131a] z-10 p-4 border border-white/10 rounded-bl-2xl text-xs font-bold uppercase tracking-wider text-[#8b96a8]">
                      Action
                    </td>
                    {compareColleges.map((col) => (
                      <td key={col.id} className="p-4 border border-white/10 text-center bg-[#14161d] last:rounded-br-2xl">
                        <PopupTrigger className="h-10 px-5 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-xs shadow-md transition-all active:scale-[0.98]">
                          Get Counselling
                        </PopupTrigger>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {compareColleges.length < 4 && (
            <div className="mt-8 text-center">
              <Link
                href="/universities"
                className="inline-flex items-center gap-2 h-12 px-7 border-2 border-dashed border-white/15 text-[#8b96a8] hover:border-[#C81E3D] hover:text-[#C81E3D] font-extrabold rounded-full text-sm transition-all"
              >
                <Icons.Plus size={16} />
                Add {4 - compareColleges.length} More {4 - compareColleges.length === 1 ? "University" : "Universities"}
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
