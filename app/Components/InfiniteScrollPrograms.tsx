"use client";
import React from 'react';
import coursesData from '../config/coursesData.json';

const InfiniteScrollPrograms = () => {
  const courses = coursesData.courses;
  
  // Duplicate the courses array for seamless infinite scroll
  const scrollContent = [...courses, ...courses, ...courses];

  return (
    <section className="bg-linear-to-r fixed bottom-0 z-50 from-[#1E40AF] to-[#1E3A8A] py-3 overflow-hidden">
      <div className="relative">
        {/* Scroll container */}
        <div className="flex animate-scroll">
          {scrollContent.map((course, index) => (
            <div
              key={`${course.id}-${index}`}
              className="shrink-0 px-4 py-0.5 mx-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            >
              <span className="text-white font-semibold text-xs whitespace-nowrap">
                {course.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-scroll {
          animation: scroll 70s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default InfiniteScrollPrograms;
