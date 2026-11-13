"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

/**
 * Infinite scrolling announcement marquee (top strip above the header).
 * Pauses on hover · dismissible (persisted in localStorage).
 */

const ITEMS: { text: string; href?: string }[] = [
  { text: "EdTech brands: get a free growth audit", href: "/services/lead-generation" },
  { text: "100% free online MBA counselling" },
  { text: "UGC-DEB approved programmes only" },
  { text: "5 Lakh+ learners guided across India" },
  { text: "Qualified leads, not junk enquiries", href: "/services/lead-generation" },
  { text: "Reply in ~15 minutes · Mon–Sat 9am–8pm" },
  { text: "22+ top universities · ₹2L se shuru MBAs" },
];

export default function PromoBar() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        if (localStorage.getItem("yomb-promo-bar") !== "dismissed") {
          setHidden(false);
        }
      } catch {
        setHidden(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      localStorage.setItem("yomb-promo-bar", "dismissed");
    } catch {
      /* ignore */
    }
  };

  const track = (
    <div className="flex w-max shrink-0 items-center">
      {ITEMS.map((item, i) =>
        item.href ? (
          <Link
            key={i}
            href={item.href}
            className="group/item mx-6 flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-[#ff8a3d]">◆</span>
            <span className="text-[#c4cbd8] group-hover/item:text-white transition-colors">
              {item.text}
            </span>
            <ArrowRight size={10} className="text-[#ff5c7a]" />
          </Link>
        ) : (
          <span key={i} className="mx-6 flex items-center gap-2 whitespace-nowrap">
            <span className="text-[#ff8a3d]">◆</span>
            <span className="text-[#c4cbd8]">{item.text}</span>
          </span>
        )
      )}
    </div>
  );

  return (
    <div className="relative z-[60] w-full border-b border-[#e0244a]/20 bg-gradient-to-r from-[#1a0b10] via-[#2b141a] to-[#1a0b10]">
      <div className="relative flex items-center">
        {/* Marquee viewport */}
        <div className="marquee relative h-8 sm:h-9 flex-1 overflow-hidden">
          <div className="animate-marquee absolute inset-y-0 flex w-max items-center text-[10px] sm:text-[11px] font-bold">
            {track}
            {/* Duplicate for seamless loop */}
            <div aria-hidden="true" className="flex w-max shrink-0 items-center">
              {ITEMS.map((item, i) =>
                item.href ? (
                  <Link
                    key={i}
                    href={item.href}
                    tabIndex={-1}
                    className="group/item mx-6 flex items-center gap-2 whitespace-nowrap"
                  >
                    <span className="text-[#ff8a3d]">◆</span>
                    <span className="text-[#c4cbd8] group-hover/item:text-white transition-colors">
                      {item.text}
                    </span>
                    <ArrowRight size={10} className="text-[#ff5c7a]" />
                  </Link>
                ) : (
                  <span key={i} className="mx-6 flex items-center gap-2 whitespace-nowrap">
                    <span className="text-[#ff8a3d]">◆</span>
                    <span className="text-[#c4cbd8]">{item.text}</span>
                  </span>
                )
              )}
            </div>
          </div>
          {/* Edge fade gradients */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#1a0b10] to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#1a0b10] to-transparent" />
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center text-[#7c8798] hover:text-white transition-colors"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
