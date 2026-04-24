"use client";
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { collegesData } from '../../config/colleges';
import { ChevronDown } from 'lucide-react';

const CollegesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showAll, setShowAll] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const courseIdToNameMap: { [key: string]: string } = {
    'online-mba': 'Online MBA',
    'online-bba': 'Online BBA',
    'online-bca': 'Online BCA',
    'online-mca': 'Online MCA',
  };

  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam && courseIdToNameMap[courseParam]) {
      setSelectedCourse(courseIdToNameMap[courseParam]);
    }
  }, [searchParams]);

  const allCourses = useMemo(() => {
    const courses = new Set<string>();
    collegesData.forEach(c => c.courses_offered.forEach(course => courses.add(course)));
    return Array.from(courses).sort();
  }, []);

  const filteredColleges = useMemo(() => {
    if (selectedCourse === 'all') return collegesData;
    return collegesData.filter(c => c.courses_offered.includes(selectedCourse));
  }, [selectedCourse]);

  const displayedColleges = showAll ? filteredColleges : filteredColleges.slice(0, 18);

  return (
    <section className="py-16 px-4 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm text-gray-500 mb-2">500+ Online Universities</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
            <span className="text-[#1E40AF]">UGC-approved universities</span> verified on 30+ factors
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">

          {/* FILTER */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              
              <h3 className="font-bold text-lg mb-4 text-[#0F172A]">Filter</h3>

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCourse('all')}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                    selectedCourse === 'all'
                      ? 'bg-[#1E40AF] text-white'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  All Courses
                </button>

                {allCourses.map(course => (
                  <button
                    key={course}
                    onClick={() => setSelectedCourse(course)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                      selectedCourse === course
                        ? 'bg-[#1E40AF] text-white'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {course}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t text-sm text-gray-500">
                <span className="font-bold text-[#1E40AF]">{filteredColleges.length}</span> results
              </div>
            </div>
          </div>

          {/* MAIN */}
          <div className="lg:col-span-3">

            {/* INFO CARD */}
            <div className="bg-white rounded-2xl p-6 mb-10 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-[#0F172A]">About Universities</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore verified universities offering online programs with strong placement,
                accreditation, and student support.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { label: "Universities", value: "500+" },
                  { label: "Courses", value: "1000+" },
                  { label: "Specializations", value: "50+" },
                  { label: "UGC Approved", value: "100%" }
                ].map((item, i) => (
                  <div key={i} className="bg-[#F1F5F9] rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-[#1E40AF]">{item.value}</p>
                    <p className="text-xs text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

              {displayedColleges.map(college => (
                <div
                  key={college.college_id}
                  onClick={() => router.push(`/colleges/${college.slug}`)}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    
                    {/* Logo */}
                    <div className="w-16 h-16 relative bg-white border rounded-xl p-2">
                      <Image
                        src={college.media?.cover || '/placeholder.png'}
                        alt={college.short_name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div>
                      <p className="text-xs font-bold text-[#1E40AF] mb-1">
                        {college.courses_offered.length} Courses
                      </p>

                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#1E40AF] transition">
                        {college.short_name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* LOAD MORE */}
            {filteredColleges.length > 18 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
                >
                  {showAll ? 'View Less' : 'View More'}
                  <ChevronDown className={`${showAll ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

const CollegesPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CollegesPage />
    </Suspense>
  );
};

export default CollegesPageWrapper;