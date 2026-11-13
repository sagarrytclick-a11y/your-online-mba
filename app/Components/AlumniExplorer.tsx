"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { alumniSpotlights, type AlumniSpotlight } from "../data/alumni";
import { collegeReviews } from "../data/colleges";

const AlumniExplorer: React.FC = () => {
  const [company, setCompany] = useState("all");
  const [collegeId, setCollegeId] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const companies = useMemo(
    () => Array.from(new Set(alumniSpotlights.map((a) => a.company))).sort(),
    []
  );
  const collegesWithAlumni = useMemo(
    () =>
      Array.from(new Set(alumniSpotlights.map((a) => a.collegeId))).map((id) => ({
        id,
        name: collegeReviews.find((c) => c.id === id)?.name ?? id,
      })),
    []
  );

  const results = useMemo(
    () =>
      alumniSpotlights.filter(
        (a) =>
          (company === "all" || a.company === company) &&
          (collegeId === "all" || a.collegeId === collegeId)
      ),
    [company, collegeId]
  );

  const avgUplift = useMemo(() => {
    if (results.length === 0) return 0;
    const total = results.reduce(
      (sum, a) => sum + ((a.currentLpa - a.priorLpa) / a.priorLpa) * 100,
      0
    );
    return Math.round(total / results.length);
  }, [results]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { number: alumniSpotlights.length.toString(), label: "Verified Alumni" },
          { number: `${avgUplift}%`, label: "Avg Salary Uplift" },
          { number: String(collegesWithAlumni.length), label: "Universities" },
          {
            number: `₹${Math.max(...alumniSpotlights.map((a) => a.currentLpa)).toFixed(0)}L`,
            label: "Highest Package",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#14161d] rounded-2xl border border-white/10 p-5 shadow-sm text-center"
          >
            <p className="text-xl sm:text-2xl font-black text-[#C81E3D]">{stat.number}</p>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#7c8798] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#14161d] rounded-2xl border border-white/10 p-5 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="alumni-company"
            className="block text-[10px] font-extrabold uppercase tracking-wider text-[#7c8798] mb-2"
          >
            Company
          </label>
          <select
            id="alumni-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-white/10 text-sm font-bold text-[#F1F5F9] focus:border-[#C81E3D] focus:ring-2 focus:ring-[#e0244a]/25 outline-none cursor-pointer"
          >
            <option value="all">All companies</option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label
            htmlFor="alumni-college"
            className="block text-[10px] font-extrabold uppercase tracking-wider text-[#7c8798] mb-2"
          >
            University
          </label>
          <select
            id="alumni-college"
            value={collegeId}
            onChange={(e) => setCollegeId(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-white/10 text-sm font-bold text-[#F1F5F9] focus:border-[#C81E3D] focus:ring-2 focus:ring-[#e0244a]/25 outline-none cursor-pointer"
          >
            <option value="all">All universities</option>
            {collegesWithAlumni.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <p className="text-xs font-bold text-[#7c8798] pb-3">
            Showing {results.length} of {alumniSpotlights.length}
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="bg-[#14161d] rounded-2xl border border-white/10 p-12 text-center">
          <Icons.SearchX size={28} className="text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-extrabold text-[#F1F5F9]">No alumni match that filter yet</p>
          <p className="text-xs text-[#8b96a8] font-medium mt-1">
            Try widening the company or university filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {results.map((a) => (
            <AlumniCard
              key={a.id}
              alumni={a}
              expanded={expanded === a.id}
              onToggle={() => setExpanded(expanded === a.id ? null : a.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AlumniCard: React.FC<{
  alumni: AlumniSpotlight;
  expanded: boolean;
  onToggle: () => void;
}> = ({ alumni: a, expanded, onToggle }) => {
  const uplift = Math.round(((a.currentLpa - a.priorLpa) / a.priorLpa) * 100);

  return (
    <article className="bg-[#14161d] rounded-2xl border border-white/10 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={a.image}
              alt={a.name}
              width={56}
              height={56}
              unoptimized
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-extrabold text-[#F1F5F9] flex items-center gap-1.5">
              {a.name}
              {a.verified && (
                <span className="inline-flex items-center gap-1 text-[9px] font-black text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-1.5 py-0.5 rounded-full">
                  <Icons.BadgeCheck size={10} /> VERIFIED
                </span>
              )}
            </h3>
            <p className="text-xs text-[#8b96a8] font-bold mt-0.5">
              {a.role} · {a.company}
            </p>
            <p className="text-[10px] text-[#7c8798] font-semibold">
              {a.priorRole} → {a.role} ({a.graduationYear})
            </p>
          </div>
          {a.hasVideo && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 text-[9px] font-black text-[#C81E3D] bg-[#2B141A] border border-[#e0244a]/20 px-2 py-1 rounded-full">
              <Icons.PlayCircle size={11} />
              {a.videoLength}
            </span>
          )}
        </div>

        <p className="text-sm text-[#a8b3c5] font-medium leading-relaxed">{a.story}</p>

        {expanded && (
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#10131a] rounded-xl p-3">
                <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#7c8798]">
                  Prior industry
                </p>
                <p className="text-xs font-extrabold text-[#F1F5F9] mt-0.5">{a.priorIndustry}</p>
              </div>
              <div className="bg-[#10131a] rounded-xl p-3">
                <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#7c8798]">
                  Work experience
                </p>
                <p className="text-xs font-extrabold text-[#F1F5F9] mt-0.5">{a.workExperience}</p>
              </div>
            </div>
            <p className="text-sm text-[#a8b3c5] font-semibold italic border-l-2 border-[#C81E3D]/40 pl-3">
              &ldquo;{a.quote}&rdquo;
            </p>
            <p className="text-[10px] text-[#7c8798] font-semibold">
              {a.collegeName} · Online MBA
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#7c8798]">Before</p>
            <p className="text-sm font-black text-[#8b96a8]">₹{a.priorLpa}L</p>
          </div>
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#7c8798]">Now</p>
            <p className="text-sm font-black text-[#F1F5F9]">₹{a.currentLpa}L</p>
          </div>
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#7c8798]">Uplift</p>
            <p className="text-sm font-black text-emerald-400">+{uplift}%</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="text-[11px] font-extrabold text-[#C81E3D] hover:underline inline-flex items-center gap-1"
        >
          {expanded ? "Show less" : "Read full story"}
          <Icons.ChevronDown
            size={13}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
        <Link
          href={`/universities/${a.collegeId}`}
          className="text-[11px] font-extrabold text-[#7c8798] hover:text-[#a8b3c5] transition-colors"
        >
          {a.collegeName}
        </Link>
      </div>
    </article>
  );
};

export default AlumniExplorer;
