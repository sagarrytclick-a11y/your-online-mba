"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Scale, X, Trash2 } from "lucide-react";
import { useProgramShortlist } from "../context/ProgramShortlistContext";
import { collegeReviews } from "../data/colleges";

const ShortlistBar: React.FC = () => {
  const { ids, count, remove, clear, hydrated } = useProgramShortlist();
  const [dismissed] = useState(false);

  // `hydrated` gates the localStorage read, so skip the first paint entirely to
  // avoid a flash of the bar for visitors with an empty shortlist.
  if (!hydrated || count === 0 || dismissed) return null;

  const selected = ids
    .map((id) => collegeReviews.find((c) => c.id === id))
    .filter((c): c is (typeof collegeReviews)[number] => c !== undefined);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[#C81E3D] shadow-[0_-8px_30px_rgba(15,23,42,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="w-9 h-9 rounded-xl bg-[#FFF1F2] flex items-center justify-center">
            <Scale size={16} className="text-[#C81E3D]" />
          </span>
          <div className="hidden sm:block">
            <p className="text-xs font-extrabold text-[#1E293B] leading-tight">
              {count} programme{count === 1 ? "" : "s"} shortlisted
            </p>
            <p className="text-[10px] text-slate-400 font-bold">Compare up to 3</p>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-2 overflow-x-auto">
          {selected.map((college) => (
            <span
              key={college.id}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-slate-50 border border-gray-100 text-[11px] font-extrabold text-slate-600 flex-shrink-0"
            >
              {college.name}
              <button
                type="button"
                onClick={() => remove(college.id)}
                aria-label={`Remove ${college.name} from shortlist`}
                className="text-slate-400 hover:text-[#C81E3D] transition-colors"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={clear}
            aria-label="Clear shortlist"
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-slate-400 hover:text-[#C81E3D] hover:border-[#C81E3D] transition-all"
          >
            <Trash2 size={13} />
          </button>
          <Link
            href="/compare-programs"
            className="inline-flex items-center gap-2 h-10 px-5 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-extrabold rounded-full text-xs shadow-md transition-all whitespace-nowrap"
          >
            <Scale size={13} />
            <span className="hidden sm:inline">Compare now</span>
            <span className="sm:hidden">Compare</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShortlistBar;
