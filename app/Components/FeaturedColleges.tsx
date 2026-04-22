"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getFeaturedColleges } from '../config/colleges';
import { ArrowRight, ChevronDown } from 'lucide-react';

const FeaturedColleges: React.FC = () => {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  // Saare colleges dikhao - 47 total colleges hai
  const allColleges = getFeaturedColleges(47);
  const displayedColleges = showAll ? allColleges : allColleges.slice(0, 18);

  const handleCollegeClick = (slug: string) => {
    router.push(`/colleges/${slug}`);
  };

  return (
    <section className="py-12 px-4 bg-[#F8FAFC]"> {/* Background light rakha hai contrast ke liye */}
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header - Image style text */}
        <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 font-medium">100+ Online Universities</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#12141D]">
                <span className="text-[#1E40AF]">UGC-approved universities</span>, verified by us and reviewed by learners, on 30+ factors
            </h2>
        </div>

        {/* Colleges Grid - Spacing tight rakhi hai */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {displayedColleges.map((college) => (
            <div
              key={college.college_id}
              onClick={() => handleCollegeClick(college.slug)}
              className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-between min-h-[160px]"
            >
              {/* College Logo */}
              <div className="relative w-full h-16 mb-3">
                <Image
                  src={college.media?.cover || '/placeholder.png'}
                  alt={college.short_name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-center mt-auto">
                {/* Course Count - Small and Muted */}
                <p className="text-[11px] font-bold text-gray-900 uppercase mb-1">
                  {college.courses_offered.length} Courses
                </p>

                {/* College Name - Clean typography */}
                <h3 className="text-[13px] font-medium text-gray-600 leading-tight">
                  {college.short_name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View More/Less Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[#1E40AF] text-white px-6 py-3 rounded-md text-sm font-bold inline-flex items-center gap-2 transition-all active:scale-95"
          >
            {showAll ? 'View Less' : 'View More Universities'}
            <ChevronDown size={16} className={`transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedColleges;
