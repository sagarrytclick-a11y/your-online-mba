"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Scale, X, Trash2 } from "lucide-react";
import { useProgramShortlist } from "../context/ProgramShortlistContext";
import { collegeReviews } from "../data/colleges";

const ShortlistBar: React.FC = () => {
  const { ids, count, remove, clear, hydrated } = useProgramShortlist();
  const [dismissed] = useState(false);

  const visible = hydrated && count > 0 && !dismissed;

  // Let the floating chat/WhatsApp buttons know a bar is occupying the bottom edge.
  useEffect(() => {
    if (!visible) return;
    document.body.dataset.shortlist = "1";
    return () => {
      delete document.body.dataset.shortlist;
    };
  }, [visible]);

  // `hydrated` gates the localStorage read, so skip the first paint entirely to
  // avoid a flash of the bar for visitors with an empty shortlist.
  if (!visible) return null;

  const selected = ids
    .map((id) => collegeReviews.find((c) => c.id === id))
    .filter((c): c is (typeof collegeReviews)[number] => c !== undefined);

  return (
    <div className="shortlist-bar fixed bottom-0 left-0 right-0 z-40 bg-[#14161d] border-t-2 border-[#C81E3D] shadow-[0_-8px_30px_rgba(15,23,42,0.12)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <span className="w-9 h-9 rounded-xl bg-[#2B141A] flex items-center justify-center">
            <Scale size={16} className="text-[#C81E3D]" />
          </span>
          <div className="hidden sm:block">
            <p className="text-xs font-extrabold text-[#F1F5F9] leading-tight">
              {count} programme{count === 1 ? "" : "s"} shortlisted
            </p>
            <p className="text-[10px] text-[#7c8798] font-bold">Compare up to 3</p>
          </div>
        </div>

        {/* Selected chips — desktop only; on phones they would cover the actions */}
        <div className="hidden sm:flex flex-1 items-center gap-2 overflow-x-auto custom-scroll">
          {selected.map((college) => (
            <span
              key={college.id}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#10131a] border border-white/10 text-[11px] font-extrabold text-[#a8b3c5] flex-shrink-0"
            >
              {college.name}
              <button
                type="button"
                onClick={() => remove(college.id)}
                aria-label={`Remove ${college.name} from shortlist`}
                className="text-[#7c8798] hover:text-[#C81E3D] transition-colors"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex flex-1 sm:flex-none items-center justify-end gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={clear}
            aria-label="Clear shortlist"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#7c8798] hover:text-[#C81E3D] hover:border-[#C81E3D] transition-all"
          >
            <Trash2 size={14} />
          </button>
          <Link
            href="/compare-programs"
            className="inline-flex items-center gap-2 h-11 px-4 sm:px-5 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-xs shadow-md transition-all whitespace-nowrap"
          >
            <Scale size={13} />
            <span className="hidden sm:inline">Compare now</span>
            <span className="sm:hidden">Compare ({count})</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShortlistBar;
