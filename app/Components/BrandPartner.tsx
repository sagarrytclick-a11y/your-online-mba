import React from "react";
import { Globe } from "lucide-react";

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
    <section className="relative w-full py-20 bg-[#F8FAFC] overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-100 opacity-40 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-100 opacity-40 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 mb-14 text-center">
        
        {/* Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Globe className="w-3 h-3 text-blue-600" />
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-600"
             style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Global Recognition
          </p>
        </div>

        {/* Heading */}
        <h2
          className="font-black text-3xl md:text-4xl leading-tight"
          style={{ fontFamily: "'Syne', sans-serif", color: '#0F172A' }}
        >
          Our Alumni Work At{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Top Global Companies
          </span>
        </h2>
      </div>

      {/* 🔥 Slider */}
      <div className="relative flex w-full">
        <div className="flex animate-marquee whitespace-nowrap gap-14 py-6 items-center">
          {duplicatedCompanies.map((company, idx) => (
            <div
              key={`${company.name}-${idx}`}
              className="group flex flex-col items-center gap-4 min-w-[150px]"
            >
              {/* Card */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/80 backdrop-blur-lg rounded-2xl flex items-center justify-center p-5 border border-gray-200 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <p
                className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {company.name}
              </p>
            </div>
          ))}
        </div>

        {/* Gradient fades */}
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />
      </div>

      {/* Animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}