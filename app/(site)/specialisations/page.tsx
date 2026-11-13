"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { specialisations } from '../../data/specialisations';
import Pagination from '../../Components/Pagination';

const ITEMS_PER_PAGE = 8;

export default function SpecialisationsPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(specialisations.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visible = specialisations.slice(start, start + ITEMS_PER_PAGE);

  const themeStyles = {
    rose: { bg: 'bg-[#2B141A]', text: 'text-[#C81E3D]' },
    emerald: { bg: 'bg-[#10b9811f]', text: 'text-[#34D399]' },
    violet: { bg: 'bg-[#8b5cf61f]', text: 'text-[#A78BFA]' },
    blue: { bg: 'bg-[#3b82f61f]', text: 'text-[#60A5FA]' },
    amber: { bg: 'bg-[#f973161f]', text: 'text-[#FB923C]' },
    teal: { bg: 'bg-[#14b8a61f]', text: 'text-[#2DD4BF]' }
  };

  return (
    <div className="min-h-screen bg-[#10131A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F1F5F9] tracking-tight">
            Explore Our Top Specializations
          </h1>
          <p className="text-[#a8b3c5] font-medium text-lg max-w-2xl mx-auto">
            Choose from industry relevant MBA specializations designed to accelerate your career growth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((spec) => {
            const Icon = Icons[spec.iconName as keyof typeof Icons] as React.ElementType;
            const theme = themeStyles[spec.colorTheme] || themeStyles.rose;
            
            return (
              <Link 
                key={spec.slug} 
                href={`/specialisations/${spec.slug}`}
                className="group bg-[#14161d] p-6 rounded-2xl shadow-sm border border-white/10 flex items-center justify-between hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h2 className="text-[#F1F5F9] font-bold text-base group-hover:text-[#C81E3D] transition-colors truncate">
                      {spec.title}
                    </h2>
                    <p className="text-[#8b96a8] text-xs font-semibold mt-0.5">
                      Avg Salary: {spec.salaryRange}
                    </p>
                  </div>
                </div>
                <Icons.ChevronRight size={20} className="text-[#7c8798] group-hover:text-[#C81E3D] transition-colors" />
              </Link>
            );
          })}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={specialisations.length} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </div>
  );
}
