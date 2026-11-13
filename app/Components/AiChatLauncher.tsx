"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import CourseMateChat from "./CourseMateChat";
import ChatBotMark from "./ChatBotMark";

/**
 * Fixed bottom-right AI advisor launcher (reference: gradifysolutions.com).
 * - Pulsing gradient FAB with online dot + unread badge
 * - Vertical edge tab on desktop ("Ask our AI MBA Advisor")
 * - Opens the CourseMate AI slide-over; listens for window "open-ai-chat" events
 */
export default function AiChatLauncher() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setSeen(true);
    };
    window.addEventListener("open-ai-chat", handler);
    return () => window.removeEventListener("open-ai-chat", handler);
  }, []);

  const toggle = () => {
    setOpen((v) => !v);
    setSeen(true);
  };

  return (
    <>
      {/* Desktop edge tab — vertical margin top & bottom, flush right */}
      <button
        type="button"
        onClick={toggle}
        aria-label="Talk to our AI MBA Advisor"
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col items-center justify-center gap-2 rounded-l-2xl border-y border-l border-[#ff5c7a]/40 bg-gradient-to-b from-[#e0244a] to-[#C81E3D] px-2 py-4 text-white shadow-[-8px_0_30px_rgba(224,36,74,0.35)] transition-all duration-300 hover:px-3"
      >
        <ChatBotMark size={14} />
        <span style={{ writingMode: "vertical-rl" }} className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/95 whitespace-nowrap">
          Talk to our AI Advisor
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
      </button>

      {/* Bottom-right FAB — snug to the corner */}
      <div className="fixed bottom-3 right-3 sm:right-4 z-40 flex flex-col items-end gap-2">
        {/* Tooltip pill (hidden once opened) */}
        {!open && !seen && (
          <div className="pointer-events-none flex items-center gap-2 rounded-2xl rounded-br-md border border-white/10 bg-[#14161d]/95 backdrop-blur px-3.5 py-2 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
            <p className="text-[11px] font-bold text-[#f1f5f9]">
              Ask AI Advisor · <span className="text-[#e0244a]">30s reply</span>
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Close AI MBA Advisor chat" : "Open AI MBA Advisor chat"}
          aria-expanded={open}
          className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#C81E3D] text-white shadow-[0_15px_40px_rgba(224,36,74,0.45)] ring-1 ring-white/20 transition-transform duration-300 hover:scale-110 active:scale-95 ${
            open ? "" : "animate-fab-ping"
          }`}
        >
          {/* Unread badge */}
          {!seen && (
            <span className="absolute -top-1 -right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0b0d12] bg-[#e0244a] text-[10px] font-black text-white">
              1
            </span>
          )}
          {/* Online dot */}
          <span className="absolute bottom-0.5 left-0.5 z-10 h-4 w-4 rounded-full border-2 border-[#0b0d12] bg-green-400/100" />
          <span className="animate-bob flex">
            {open ? <X size={24} strokeWidth={2.5} /> : <ChatBotMark size={30} />}
          </span>
        </button>
      </div>

      <CourseMateChat isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
