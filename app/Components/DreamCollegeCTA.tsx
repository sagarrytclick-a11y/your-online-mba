"use client";
import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { useModal } from '../Context/ModalContext';

const DreamCollegeCTA: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section className="relative bg-[#F8FAFC] py-24 px-6 overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-200 opacity-40 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-200 opacity-40 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        
        <div
          className="relative rounded-[2.5rem] overflow-hidden p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
            boxShadow: '0 30px 80px rgba(37,99,235,0.35)'
          }}
        >

          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          {/* 🔥 LEFT CONTENT */}
          <div className="flex-1 text-white z-10">
            
            <p className="text-xs uppercase tracking-widest mb-3 opacity-80"
               style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Free MBA Counselling
            </p>

            <h2
              className="text-3xl md:text-4xl font-black leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Confused About Your{' '}
              <span className="text-white/80">
                MBA Admission?
              </span>
              <br />
              Talk to an Expert Today.
            </h2>

            <p className="mt-4 text-white/80 text-sm md:text-base max-w-lg"
               style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Get personalized college recommendations, admission guidance, and interview preparation — all at zero cost.
            </p>
          </div>

          {/* 🔥 RIGHT CTA */}
          <div className="flex-shrink-0 z-10">
            <button
              onClick={openModal}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.25)',
                fontFamily: "'Syne', sans-serif"
              }}
            >
              <PhoneCall size={18} />
              Talk to MBA Expert

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamCollegeCTA;