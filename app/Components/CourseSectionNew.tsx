"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import coursesData from '../config/coursesData.json';
import { ChevronRight, ArrowRight } from 'lucide-react';

const CourseSectionNew: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('pg-courses');

  const getBadgeColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      orange: 'bg-orange-100 text-orange-700',
      purple: 'bg-purple-100 text-purple-700',
      red: 'bg-red-100 text-red-700',
      gray: 'bg-gray-100 text-gray-700',
    };
    return colors[color] || colors.gray;
  };

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Left Side: Categories */}
          <div className="lg:col-span-1 h-85 overflow-y-auto">
            <div className="space-y-2">
              {coursesData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${selectedCategory === category.id
                    ? 'bg-[#1E40AF] text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={24}
                    height={24}
                    className={selectedCategory === category.id ? 'brightness-0 invert' : ''}
                  />
                  <span className="font-medium text-sm">{category.name}</span>
                  {selectedCategory === category.id && <ChevronRight size={16} className="ml-auto" />}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Course Cards */}
          <div className="lg:col-span-3 h-100 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
              {coursesData.courses
                .filter((course) => course.categoryId === selectedCategory)
                .map((course) => (
                  <div
                    key={course.id}
                    onClick={() => router.push(`/colleges?course=${course.id}`)}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    {/* Course Icon */}
                    <div className="flex items-start justify-between mb-3">
                      <Image
                        src={course.icon}
                        alt={course.title}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                      {course.badge && (
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${getBadgeColor(course.badgeColor)}`}>
                          {course.badge}
                        </span>
                      )}
                    </div>

                    {/* Course Title */}
                    <h3 className="text-lg font-bold text-[#1A1A1B] mb-3 group-hover:text-[#1E40AF] transition-colors">
                      {course.title}
                    </h3>

                    {/* View Details Button */}
                    <button className="w-full flex items-center justify-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1E40AF] hover:text-white transition-all">
                      View Details
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSectionNew;
