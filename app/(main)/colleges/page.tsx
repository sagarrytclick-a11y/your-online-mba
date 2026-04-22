"use client";
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { collegesData } from '../../config/colleges';
import { ChevronDown } from 'lucide-react';
import coursesData from '../../config/coursesData.json';

const CollegesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAll, setShowAll] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Map course ID to course name
  const courseIdToNameMap: { [key: string]: string } = {
    'online-mba': 'Online MBA',
    '1-year-mba': '1 Year MBA Online',
    'distance-mba': 'Distance MBA',
    'online-executive-mba': 'Online Executive MBA',
    'online-mca': 'Online MCA',
    'online-msc': 'Online M.Sc',
    'ms-degree-online': 'MS Degree Online',
    'online-ma': 'Online MA',
    'online-mcom': 'Online M.Com',
    'ai-ml-course': 'AI & Machine Learning',
    'generative-ai': 'Generative AI',
    'agentic-ai': 'Agentic AI',
    'data-science-ai': 'Data Science with AI',
    'prompt-engineering': 'Prompt Engineering',
    'llm-development': 'LLM Development',
    'exec-mba': 'Executive MBA',
    'leadership-program': 'Leadership Program',
    'management-cert': 'Management Certificate',
    'phd-management': 'Ph.D. in Management',
    'phd-computer-science': 'Ph.D. Computer Science',
    'phd-education': 'Ph.D. in Education',
    'online-bba': 'Online BBA',
    'online-bca': 'Online BCA',
    'online-bcom': 'Online B.Com',
    'online-ba': 'Online BA',
    'online-btech': 'Online B.Tech',
    'online-mtech': 'Online M.Tech',
    'online-civil': 'Online Civil Engineering',
  };

  // Handle course query parameter
  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam && courseIdToNameMap[courseParam]) {
      setSelectedCourse(courseIdToNameMap[courseParam]);
    }
  }, [searchParams]);

  // Get all unique courses
  const allCourses = useMemo(() => {
    const courses = new Set<string>();
    collegesData.forEach(college => {
      college.courses_offered.forEach(course => {
        courses.add(course);
      });
    });
    return Array.from(courses).sort();
  }, []);

  // Filter colleges by selected course
  const filteredColleges = useMemo(() => {
    if (selectedCourse === 'all') {
      return collegesData;
    }
    return collegesData.filter(college =>
      college.courses_offered.includes(selectedCourse)
    );
  }, [selectedCourse]);

  const displayedColleges = showAll ? filteredColleges : filteredColleges.slice(0, 18);

  const handleCollegeClick = (slug: string) => {
    router.push(`/colleges/${slug}`);
  };

  return (
    <section className="py-12 px-4 bg-[#F8F9F9] min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 font-medium">500+ Online Universities</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#12141D]">
                <span className="text-[#1E40AF]">UGC-approved universities</span>, verified by us and reviewed by learners, on 30+ factors
            </h2>
        </div>

        {/* Main Content Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full bg-[#1E40AF] text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <ChevronDown size={20} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Sidebar - Filter Section */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block lg:col-span-1 relative max-w-xs`}>
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-6 max-h-[calc(100vh-8rem)] flex flex-col shadow-lg">
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-4">Filter by Course</h3>
              
              <div className="space-y-2 overflow-y-auto flex-1 max-h-[calc(100vh-14rem)] pr-2">
                <button
                  onClick={() => setSelectedCourse('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    selectedCourse === 'all'
                      ? 'bg-[#1E40AF] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Courses
                </button>
                {allCourses.map((course) => (
                  <button
                    key={course}
                    onClick={() => setSelectedCourse(course)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      selectedCourse === course
                        ? 'bg-[#1E40AF] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {course}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  <span className="font-bold text-[#1E40AF]">{filteredColleges.length}</span> universities
                  {selectedCourse !== 'all' && <span> for <span className="font-bold text-[#1E40AF]">{selectedCourse}</span></span>}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content - Colleges Grid */}
          <div className="lg:col-span-3">
            
            {/* College Information */}
            <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-3">About Our Universities</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Explore our comprehensive list of UGC-approved universities offering online and distance learning programs. These institutions are verified on 30+ factors including accreditation, faculty quality, placement records, infrastructure, and student support services. Find the perfect university that matches your career goals and learning preferences.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-[#F8F9F9] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E40AF]">500+</p>
                  <p className="text-sm text-gray-600">Universities</p>
                </div>
                <div className="text-center p-4 bg-[#F8F9F9] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E40AF]">1000+</p>
                  <p className="text-sm text-gray-600">Courses</p>
                </div>
                <div className="text-center p-4 bg-[#F8F9F9] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E40AF]">50+</p>
                  <p className="text-sm text-gray-600">Specializations</p>
                </div>
                <div className="text-center p-4 bg-[#F8F9F9] rounded-lg">
                  <p className="text-2xl font-bold text-[#1E40AF]">100%</p>
                  <p className="text-sm text-gray-600">UGC Approved</p>
                </div>
              </div>
            </div>

            {/* Colleges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
              {displayedColleges.map((college) => (
                <div
                  key={college.college_id}
                  onClick={() => handleCollegeClick(college.slug)}
                  className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group flex items-center gap-3 min-h-30"
                >
                  {/* College Logo - Left side with white background */}
                  <div className="relative w-24 h-24 shrink-0 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-2">
                    <Image
                      src={college.media?.cover || '/placeholder.png'}
                      alt={college.short_name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Course Count */}
                    <p className="text-[11px] font-bold text-gray-900 uppercase mb-1">
                      {college.courses_offered.length} Courses
                    </p>

                    {/* College Name */}
                    <h3 className="text-[13px] font-medium text-gray-600 leading-tight">
                      {college.short_name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* View More/Less Button */}
            {filteredColleges.length > 18 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-[#1E40AF] text-white px-6 py-3 rounded-md text-sm font-bold inline-flex items-center gap-2 transition-all active:scale-95"
                >
                  {showAll ? 'View Less' : 'View More Universities'}
                  <ChevronDown size={16} className={`transition-transform ${showAll ? 'rotate-180' : ''}`} />
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