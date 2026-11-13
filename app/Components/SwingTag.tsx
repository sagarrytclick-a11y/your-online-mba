"use client";

import React from "react";
import { usePopupForm } from "../context/PopupFormContext";

/**
 * Hanging "GET A QUOTE · ENQUIRY NOW" tag — swings like a shop sign.
 * Anchored to the top edge of the hero via a dotted line.
 */
export default function SwingTag() {
  const { open } = usePopupForm();

  return (
    <button
      onClick={() => open()}
      aria-label="Get a quote — open enquiry form"
      className="group absolute right-2 sm:right-6 lg:right-[4%] top-0 z-20 hidden sm:flex flex-col items-center outline-none"
    >
      {/* Dotted string from hero top edge */}
      <div className="h-8 lg:h-10 w-0 border-l-2 border-dotted border-[#e0244a]/80" />
      {/* Mounting pin */}
      <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#ff5a3c] to-[#C81E3D] border border-white/30 shadow-[0_0_8px_rgba(224,36,74,0.7)] -mt-0.5" />
      {/* The swinging sign */}
      <span
        className="swing-tag relative mt-0 flex flex-col items-center rounded-xl border border-white/25 bg-gradient-to-br from-[#ff8a3d] via-[#ff5a3c] to-[#e0244a] px-3.5 sm:px-4 py-2 shadow-[0_14px_30px_rgba(224,36,74,0.45)] transition-shadow group-hover:shadow-[0_14px_36px_rgba(224,36,74,0.6)]"
      >
        {/* Corner sparkles */}
        <svg aria-hidden className="absolute top-1 left-1 h-2.5 w-2.5 text-white/80" viewBox="0 0 12 12" fill="none"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <svg aria-hidden className="absolute top-1 right-1 h-2.5 w-2.5 text-white/80" viewBox="0 0 12 12" fill="none"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <svg aria-hidden className="absolute bottom-1 left-1 h-1.5 w-1.5 text-white/60" viewBox="0 0 12 12" fill="none"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <svg aria-hidden className="absolute bottom-1 right-1 h-1.5 w-1.5 text-white/60" viewBox="0 0 12 12" fill="none"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>

        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-white/85">
          Get a Quote
        </span>
        <span className="mt-0.5 text-sm sm:text-base font-black uppercase tracking-[0.12em] text-white leading-none">
          Enquiry
        </span>
        <span className="text-sm sm:text-base font-black uppercase tracking-[0.12em] text-white leading-none">
          Now
        </span>
      </span>
    </button>
  );
}
