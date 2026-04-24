"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import coursesData from '../config/coursesData.json';
import { ChevronRight, ArrowRight } from 'lucide-react';

const CourseSectionNew: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('pg-courses');

  const getBadgeStyle = (color: string): React.CSSProperties => {
    const map: { [key: string]: { bg: string; text: string } } = {
      blue:   { bg: '#EFF6FF', text: '#1D4ED8' },
      green:  { bg: '#F0FDF4', text: '#15803D' },
      orange: { bg: '#FFF7ED', text: '#C2410C' },
      purple: { bg: '#FAF5FF', text: '#7E22CE' },
      red:    { bg: '#FFF1F2', text: '#BE123C' },
      gray:   { bg: '#F8FAFC', text: '#475569' },
    };
    const t = map[color] || map.gray;
    return { background: t.bg, color: t.text };
  };

  const selectedCourses = coursesData.courses.filter(
    (c) => c.categoryId === selectedCategory
  );

  return (
    <section
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: '#F8FAFC', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.45,
        }}
      />

      {/* Soft glow top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-8%', left: '-4%',
          width: 500, height: 500, borderRadius: '50%',
          background: '#DBEAFE', opacity: 0.6, filter: 'blur(100px)',
        }}
      />
      {/* Soft glow bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', right: '-4%',
          width: 400, height: 400, borderRadius: '50%',
          background: '#EDE9FE', opacity: 0.5, filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: '#2563EB', fontFamily: "'DM Sans', sans-serif" }}
            >
              Explore Programs
            </p>
            <h2
              className="leading-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                letterSpacing: '-1px',
                color: '#0F172A',
              }}
            >
              Find Your{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 60%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Perfect Course
              </span>
            </h2>
          </div>
          <p
            className="text-sm max-w-xs text-right leading-relaxed hidden md:block"
            style={{ color: '#94A3B8', fontFamily: "'DM Sans', sans-serif" }}
          >
            Browse curated programs across disciplines — tailored for ambitious learners.
          </p>
        </div>

        {/* ── Body grid ── */}
        <div className="grid lg:grid-cols-[220px_1fr] gap-6 items-start">

          {/* ── LEFT: Category sidebar ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)',
            }}
          >
            <div className="p-3 space-y-1 max-h-[520px] overflow-y-auto custom-scroll">
              {coursesData.categories.map((category) => {
                const active = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left"
                    style={{
                      background: active ? '#EFF6FF' : 'transparent',
                      border: active ? '1px solid #BFDBFE' : '1px solid transparent',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: active ? '#DBEAFE' : '#F1F5F9' }}
                    >
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={18}
                        height={18}
                        className={active ? '' : 'opacity-50'}
                      />
                    </div>
                    <span
                      className="text-sm font-semibold flex-1 leading-tight"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: active ? '#1D4ED8' : '#64748B',
                      }}
                    >
                      {category.name}
                    </span>
                    {active && (
                      <ChevronRight size={14} className="shrink-0" style={{ color: '#3B82F6' }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Course cards ── */}
          <div className="max-h-[520px] overflow-y-auto custom-scroll pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {selectedCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => router.push(`/colleges?course=${course.id}`)}
                  className="group relative rounded-2xl p-4 cursor-pointer transition-all duration-300"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(15,23,42,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = '#BFDBFE';
                    el.style.boxShadow = '0 8px 30px rgba(37,99,235,0.10)';
                    el.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = '#E2E8F0';
                    el.style.boxShadow = '0 1px 3px rgba(15,23,42,0.05)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Icon + Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: '#F1F5F9' }}
                    >
                      <Image
                        src={course.icon}
                        alt={course.title}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    {course.badge && (
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={getBadgeStyle(course.badgeColor)}
                      >
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-4 leading-snug"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#0F172A',
                    }}
                  >
                    {course.title}
                  </h3>

                  {/* CTA */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid #F1F5F9' }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{ color: '#2563EB', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      View Details
                    </span>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:!bg-[#2563EB]"
                      style={{ background: '#EFF6FF' }}
                    >
                      <ArrowRight size={13} className="group-hover:!text-white" style={{ color: '#3B82F6', transition: 'color 0.2s' }} />
                    </div>
                  </div>
                </div>
              ))}

              {selectedCourses.length === 0 && (
                <div
                  className="col-span-3 py-16 text-center"
                  style={{ color: '#CBD5E1', fontFamily: "'DM Sans', sans-serif" }}
                >
                  No courses found in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `}</style>
    </section>
  );
};

export default CourseSectionNew;