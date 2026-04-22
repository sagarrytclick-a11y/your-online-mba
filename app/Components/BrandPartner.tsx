"use client";

import React from "react";
import { ShieldCheck, Building2, Globe } from "lucide-react";

const companies = [
  {
    name: "Google",
    logo: "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg",
  },
  {
    name: "Flipkart",
    logo: "https://i.pinimg.com/736x/7c/1d/17/7c1d1781450402e49010726af8ba56fa.jpg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Zomato",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Tata",
    logo: "https://i.pinimg.com/1200x/b9/fb/17/b9fb1764dcfec3676f1b564c1d434242.jpg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Reliance",
    logo: "https://i.pinimg.com/1200x/de/64/63/de646309009817507baf01587f107106.jpg",
  },
];

const duplicatedCompanies = [...companies, ...companies];

export default function BrandPartner() {
  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Globe className="w-3 h-3 text-[#1E40AF]" />
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1E40AF]">
            Global Recognition
          </p>
        </div>

        <h2 className="font-black text-[#1A1A1B] text-3xl md:text-4xl leading-tight">
          Our Alumni At Work
        </h2>
      </div>

      {/* Slider */}
      <div className="relative flex w-full">
        <div className="flex animate-marquee whitespace-nowrap gap-12 py-6 items-center">
          {duplicatedCompanies.map((company, idx) => (
            <div
              key={`${company.name}-${idx}`}
              className="flex flex-col items-center gap-4 min-w-[140px] sm:min-w-[180px] group"
            >
              <div className="relative">
                {/* Logo Container - Uses Surface Color */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gray-50 rounded-2xl flex items-center justify-center p-5 border border-gray-200 shadow-md">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain brightness-100"
                  />
                </div>

              </div>

              {/* Text - Uses Primary Text Color */}
              <div className="text-center">
                <p className="text-sm sm:text-base font-semibold text-[#1A1A1B] leading-tight">
                  {company.name}
                </p>

              
              </div>
            </div>
          ))}
        </div>

        {/* Soft gradients for Light Theme */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}