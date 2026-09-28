import React from "react";
import * as Icons from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { collegeReviews } from "../data/colleges";
import { getUniversityDetailsOrDefaults } from "../data/university-details";
import { scholarships } from "../data/scholarships";
import { communityQuestions, getAllAnswerCount } from "../data/community";

const StatsBand = () => {
  const totalLearners = collegeReviews.reduce(
    (sum, c) => sum + getUniversityDetailsOrDefaults(c.id).learnerCount,
    0
  );
  const totalAlumni = collegeReviews.reduce(
    (sum, c) => sum + getUniversityDetailsOrDefaults(c.id).alumniCount,
    0
  );
  const totalReviews = collegeReviews.reduce(
    (sum, c) => sum + (parseInt(c.totalReviews.replace(/\D/g, ""), 10) || 0),
    0
  );
  const totalSeats = scholarships.reduce((sum, s) => sum + s.seats, 0);

  const stats = [
    { value: `${collegeReviews.length}+`, label: "Universities compared", icon: Icons.Building2 },
    { value: `${(totalLearners / 100000).toFixed(1)}L+`, label: "Learners enrolled", icon: Icons.Users },
    { value: `${(totalAlumni / 1000).toFixed(0)}K+`, label: "Alumni in the network", icon: Icons.Briefcase },
    { value: `${(totalReviews / 1000).toFixed(0)}K+`, label: "Verified reviews", icon: Icons.Star },
    { value: `${(totalSeats / 1000).toFixed(1)}K`, label: "Scholarship seats", icon: Icons.GraduationCap },
    { value: `${getAllAnswerCount()}+`, label: `${communityQuestions.length} Q&A answered`, icon: Icons.MessageSquare },
  ];

  return (
    <section className="w-full bg-white border-y border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <span className="w-11 h-11 rounded-xl bg-[#FFF1F2] flex items-center justify-center mx-auto">
                  <stat.icon size={18} className="text-[#C81E3D]" />
                </span>
                <p className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StatsBand;
