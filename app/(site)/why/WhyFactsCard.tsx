"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";

const FACTS = [
  {
    stat: "MBA",
    text: "is the most sought-after online degree among Indian learners — every year, by a wide margin.",
    source: "UGC · AISHE data",
  },
  {
    stat: "+45%",
    text: "average salary hike reported by graduates of UGC-DEB approved online MBA programs within 12 months.",
    source: "Placement reports, 2024–26",
  },
  {
    stat: "4×",
    text: "growth in online-degree enrolments in India between 2019 and 2024 — the fastest in higher education.",
    source: "UGC-DEB enrolment trends",
  },
  {
    stat: "₹2L",
    text: "is what a full online MBA costs — versus ₹20L+ for a comparable residential MBA.",
    source: "Fee data, 1000+ programs",
  },
];

export default function WhyFactsCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % FACTS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const fact = FACTS[index];

  return (
    <div
      className="gradient-ring rounded-[28px] p-[1.5px] shadow-[0_35px_80px_rgba(0,0,0,0.55)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[26.5px] bg-[#10131a]/95 backdrop-blur-xl p-6 sm:p-8 min-h-[320px] flex flex-col">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(224,36,74,0.28), transparent 65%)" }}
        />

        {/* Header row */}
        <div className="relative flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#e0244a]">
            India Education · Did You Know?
          </p>
          <span className="text-[10px] font-bold tabular-nums text-[#7c8798]">
            {String(index + 1).padStart(2, "0")}/{String(FACTS.length).padStart(2, "0")}
          </span>
        </div>

        {/* Stat */}
        <div className="relative mt-6 flex items-end justify-between gap-4">
          <p className="text-7xl sm:text-8xl font-black tracking-tighter leading-none text-[#f5f7fa]">
            {fact.stat}
          </p>
          <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] shadow-[0_10px_28px_rgba(224,36,74,0.4)]">
            <GraduationCap size={28} className="text-white" />
          </span>
        </div>
        <p className="relative mt-5 text-sm sm:text-base font-medium leading-relaxed text-[#c4cbd8]">
          {fact.text}
        </p>
        <p className="relative mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b7688]">
          Source · {fact.source}
        </p>

        {/* Controls */}
        <div className="relative mt-auto flex items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-1.5">
            {FACTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Fact ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#e0244a]" : "w-2 bg-white/15 hover:bg-white/25"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIndex((index - 1 + FACTS.length) % FACTS.length)}
              aria-label="Previous fact"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-[#8b96a8] transition-all hover:border-[#e0244a]/40 hover:text-[#ff5c7a]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setIndex((index + 1) % FACTS.length)}
              aria-label="Next fact"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-[#8b96a8] transition-all hover:border-[#e0244a]/40 hover:text-[#ff5c7a]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
