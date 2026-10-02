"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { usePopupForm } from "../context/PopupFormContext";
import { siteConfig } from "../data/site";

const ACTIONS = [
  {
    key: "callback",
    label: "Request a callback",
    sublabel: "We call in 15 min",
    icon: Icons.PhoneCall,
    href: null as string | null,
  },
  {
    key: "brochure",
    label: "Download brochure",
    sublabel: "PDF, 20+ pages",
    icon: Icons.FileDown,
    href: "/universities",
  },
  {
    key: "apply",
    label: "Find my program",
    sublabel: "Get matched in minutes",
    icon: Icons.Zap,
    href: "/find-my-program",
  },
];

const ExpressBar: React.FC = () => {
  const { open } = usePopupForm();
  const [expanded, setExpanded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dismiss automatically after a while so it never becomes a permanent obstruction.
  useEffect(() => {
    const timer = setTimeout(() => setCollapsed(true), 45000);
    return () => clearTimeout(timer);
  }, []);

  if (collapsed) return null;

  return (
    <>
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className={`fixed bottom-5 right-4 sm:right-6 z-40 inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#C81E3D] text-white font-extrabold text-sm shadow-2xl shadow-rose-300 transition-all hover:bg-[#B01A33] active:scale-95 sm:opacity-0 sm:pointer-events-none transition-opacity ${
            visible ? "sm:opacity-100 sm:pointer-events-auto" : ""
          }`}
        >
          <Icons.Zap size={16} />
          <span className="hidden sm:inline">Get help in 1 click</span>
          <span className="sm:hidden">1-Click Apply</span>
        </button>
      )}

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="One-click application express bar"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setExpanded(false)}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#C81E3D] to-[#E8577F] px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-white/80 text-[11px] font-extrabold uppercase tracking-[0.15em]">
                  Application Express
                </p>
                <h2 className="text-white text-lg font-black mt-1 tracking-tight">
                  Get the shortlist on WhatsApp
                </h2>
                <p className="text-rose-100 text-xs font-medium mt-1.5 leading-relaxed">
                  Pick what you need. We never ask for a payment to share details.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Close express bar"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors flex-shrink-0"
              >
                <Icons.X size={16} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-3">
              {ACTIONS.map((action) => (
                <button
                  key={action.key}
                  type="button"
                  onClick={() => {
                    if (action.key === "callback") {
                      setExpanded(false);
                      open();
                      return;
                    }
                    if (action.href) {
                      window.location.href = action.href;
                    }
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-[#C81E3D] hover:bg-[#FFF1F2] transition-all text-left group"
                >
                  <span className="w-11 h-11 rounded-xl bg-[#FFF1F2] group-hover:bg-[#C81E3D] flex items-center justify-center flex-shrink-0 transition-colors">
                    <action.icon size={19} className="text-[#C81E3D] group-hover:text-white transition-colors" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-extrabold text-[#1E293B]">{action.label}</span>
                    <span className="block text-[11px] text-slate-400 font-bold mt-0.5">
                      {action.sublabel}
                    </span>
                  </span>
                  <Icons.ChevronRight
                    size={16}
                    className="text-slate-300 group-hover:text-[#C81E3D] flex-shrink-0 transition-colors"
                  />
                </button>
              ))}

              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 text-xs font-bold text-slate-500 hover:text-[#C81E3D] transition-colors"
                >
                  <Icons.Phone size={13} className="text-[#C81E3D]" />
                  Or call {siteConfig.phoneDisplay} · Mon–Sat, 9am–8pm
                </a>
                <Link
                  href="/roi-calculator"
                  className="flex items-center gap-3 text-xs font-bold text-slate-500 hover:text-[#C81E3D] transition-colors"
                >
                  <Icons.Calculator size={13} className="text-[#C81E3D]" />
                  Not sure yet? Run the ROI calculator first
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpressBar;
