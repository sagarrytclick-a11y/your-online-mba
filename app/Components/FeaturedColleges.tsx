"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getFeaturedColleges } from '../config/colleges';
import { ChevronDown } from 'lucide-react';

const FeaturedColleges: React.FC = () => {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  const allColleges = getFeaturedColleges(47);
  const displayedColleges = showAll ? allColleges : allColleges.slice(0, 18);

  const handleCollegeClick = (slug: string) => {
    router.push(`/colleges/${slug}`);
  };

  return (
    <section className="relative py-20 px-6 bg-[#F8FAFC] overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-100 opacity-40 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-100 opacity-40 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* 🔥 HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-600 mb-3"
             style={{ fontFamily: "'DM Sans', sans-serif" }}>
            100+ Universities
          </p>

          <h2
            className="text-3xl md:text-4xl font-black leading-tight"
            style={{ fontFamily: "'Syne', sans-serif", color: '#0F172A' }}
          >
            Explore{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              UGC-Approved Universities
            </span>
          </h2>

          <p
            className="text-gray-500 mt-4 text-sm md:text-base"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Carefully verified and reviewed across 30+ parameters to help you choose the right MBA path.
          </p>
        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-14">
          {displayedColleges.map((college) => (
            <div
              key={college.college_id}
              onClick={() => handleCollegeClick(college.slug)}
              className="group relative bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Logo */}
              <div className="relative w-full h-14 mb-4">
                <Image
                  src={college.media?.cover || '/placeholder.png'}
                  alt={college.short_name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <p className="text-[10px] font-bold tracking-wider uppercase text-blue-600 mb-1">
                  {college.courses_offered.length} Courses
                </p>

                <h3
                  className="text-[13px] font-medium text-gray-700 leading-tight group-hover:text-gray-900"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {college.short_name}
                </h3>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(99,102,241,0.06))'
                }}
              />
            </div>
          ))}
        </div>

        {/* 🔥 CTA BUTTON */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
              boxShadow: '0 6px 30px rgba(37,99,235,0.3)',
              fontFamily: "'Syne', sans-serif"
            }}
          >
            {showAll ? 'Show Less' : 'View All Universities'}

            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedColleges;