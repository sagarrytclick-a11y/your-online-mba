"use client";
import React from "react";
import { Check } from "lucide-react";
import { useProgramShortlist } from "../context/ProgramShortlistContext";

interface ShortlistButtonProps {
  collegeId: string;
  variant?: "compact" | "full";
  className?: string;
  label?: string;
}

const ShortlistButton: React.FC<ShortlistButtonProps> = ({
  collegeId,
  variant = "compact",
  className = "",
  label = "Add to compare",
}) => {
  const { includes, toggle, isFull } = useProgramShortlist();
  const active = includes(collegeId);
  const blocked = !active && isFull;

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(collegeId);
        }}
        disabled={blocked}
        title={blocked ? "You can compare up to 3 programmes. Remove one first." : active ? "Remove from comparison" : "Add to comparison"}
        aria-pressed={active}
        className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[11px] font-extrabold transition-all ${
          active
            ? "bg-[#C81E3D] text-white shadow-sm"
            : blocked
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-white/90 text-[#C81E3D] border border-rose-200 hover:bg-white"
        } ${className}`}
      >
        <Check size={12} className={active ? "" : "opacity-0"} />
        {active ? "Added" : "Compare"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggle(collegeId);
      }}
      disabled={blocked}
      aria-pressed={active}
      className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-sm font-extrabold transition-all ${
        active
          ? "bg-[#C81E3D] text-white shadow-md"
          : blocked
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "border-2 border-[#C81E3D] text-[#C81E3D] hover:bg-[#FFF1F2]"
      } ${className}`}
    >
      <Check size={15} />
      {active ? "Added to comparison" : label}
    </button>
  );
};

export default ShortlistButton;
