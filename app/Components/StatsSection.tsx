"use client";
import React from 'react';
import { GraduationCap, Users, TrendingUp, HeadphonesIcon } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: GraduationCap,
      value: "500+",
      label: "Colleges",
      description: "Top MBA colleges across India"
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Students",
      description: "Successfully guided to their dream MBA"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      description: "High admission success rate"
    },
    {
      icon: HeadphonesIcon,
      value: "24/7",
      label: "Support",
      description: "Round-the-clock assistance"
    }
  ];

  return (
    <section className="bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-linear-to-br   transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E40AF]/10 mb-4">
                  <Icon size={32} className="text-[#1E40AF]" />
                </div>
                <h3 className="text-4xl font-extrabold text-[#1A1A1B] mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-bold text-[#1E40AF] mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-600">
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
