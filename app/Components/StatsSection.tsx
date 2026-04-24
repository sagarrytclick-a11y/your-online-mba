"use client";
import React from 'react';
import { GraduationCap, Users, TrendingUp, HeadphonesIcon } from 'lucide-react';

const stats = [
  {
    icon: GraduationCap,
    value: "500+",
    label: "Colleges",
    description: "Top MBA colleges across India",
    accent: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Students",
    description: "Successfully guided to their dream MBA",
    accent: '#7C3AED',
    bg: '#FAF5FF',
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    description: "High admission success rate",
    accent: '#15803D',
    bg: '#F0FDF4',
  },
  {
    icon: HeadphonesIcon,
    value: "24/7",
    label: "Support",
    description: "Round-the-clock assistance",
    accent: '#C2410C',
    bg: '#FFF7ED',
  },
];

const StatsSection: React.FC = () => {
  return (
    <section
      className="py-14 px-6"
      style={{ background: '#FFFFFF', fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-start p-6 rounded-2xl transition-all duration-300 group cursor-default"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(15,23,42,0.05)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = stat.accent + '40';
                  el.style.boxShadow = `0 8px 30px ${stat.accent}18`;
                  el.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = '#E2E8F0';
                  el.style.boxShadow = '0 1px 3px rgba(15,23,42,0.05)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${stat.accent}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: stat.bg }}
                >
                  <Icon size={22} style={{ color: stat.accent }} />
                </div>

                {/* Value */}
                <p
                  className="text-4xl font-black leading-none mb-1 tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif", color: '#0F172A' }}
                >
                  {stat.value}
                </p>

                {/* Label */}
                <p
                  className="text-sm font-bold mb-2 uppercase tracking-widest"
                  style={{ color: stat.accent, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {stat.label}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#94A3B8', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;