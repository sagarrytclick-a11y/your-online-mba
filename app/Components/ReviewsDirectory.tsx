"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import { collegeReviews } from "../data/colleges";
import { getUniversityDetailsOrDefaults } from "../data/university-details";
import PopupTrigger from "./PopupTrigger";
import WhatsAppButton from "./WhatsAppButton";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

interface ReviewsDirectoryProps {
  initialSearch: string;
}

const ReviewsDirectory: React.FC<ReviewsDirectoryProps> = ({ initialSearch }) => {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(1);

  // Keep the URL shareable so a filtered review list can be sent to someone else.
  useEffect(() => {
    if (search === initialSearch) return;
    const url = search ? `/reviews?search=${encodeURIComponent(search)}` : "/reviews";
    router.replace(url, { scroll: false });
  }, [search, initialSearch, router]);

  const filteredColleges = collegeReviews.filter((col) => {
    const q = search.trim().toLowerCase();
    if (q === "") return true;
    const details = getUniversityDetailsOrDefaults(col.id);
    return (
      col.name.toLowerCase().includes(q) ||
      col.location.toLowerCase().includes(q) ||
      col.description.toLowerCase().includes(q) ||
      col.entranceExam.toLowerCase().includes(q) ||
      details.approvals.some((a) => a.toLowerCase().includes(q)) ||
      details.nirfCategory.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredColleges.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const visible = filteredColleges.slice(start, start + ITEMS_PER_PAGE);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#10131A] pb-24 font-sans text-[#f1f5f9]">
      {/* 1. HEADER SECTION */}
      <section className="bg-[#14161d] border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C81E3D] uppercase tracking-wider"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-[#7c8798]">/</span>
            <span className="text-[#8b96a8]">Reviews</span>
          </nav>

          {/* Main Title & Subtitle */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-black text-[#F1F5F9] leading-tight tracking-tight">
              Explore Learner&apos;s Reviews Before You Decide
            </h1>
            <p className="text-[#8b96a8] text-sm sm:text-base md:text-lg font-semibold max-w-2xl mx-auto">
              Compare student experiences, ratings, and outcomes across top universities
            </p>
          </div>

          {/* Stat Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
            <div className="bg-[#14161d] border border-white/10 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2 group hover:border-[#C81E3D]/20 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
                <Icons.GraduationCap size={22} className="stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-[#F1F5F9]">200+ Universities</span>
            </div>

            <div className="bg-[#14161d] border border-white/10 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2 group hover:border-[#C81E3D]/20 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
                <Icons.BookOpen size={20} className="stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-[#F1F5F9]">1,000+ Courses</span>
            </div>

            <div className="bg-[#14161d] border border-white/10 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2 group hover:border-[#C81E3D]/20 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
                <Icons.FileText size={20} className="stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-[#F1F5F9]">4,45,000+ Reviews</span>
            </div>
          </div>

          {/* Search Input Box */}
          <div className="max-w-3xl mx-auto pt-4">
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7c8798]">
                <Icons.Search size={20} />
              </div>
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by university, city, exam or accreditation"
                aria-label="Search university reviews"
                className="w-full h-14 pl-14 pr-6 border border-white/10 bg-[#14161d] rounded-full text-base font-medium text-[#f1f5f9] placeholder-[#6b7688] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  aria-label="Clear search"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#7c8798] hover:text-[#C81E3D] transition-colors"
                >
                  <Icons.X size={18} />
                </button>
              )}
            </div>
          </div>

          {search && (
            <p className="max-w-3xl mx-auto text-xs font-bold text-[#7c8798] text-center">
              {filteredColleges.length} result{filteredColleges.length === 1 ? "" : "s"} for
              &ldquo;{search}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* 2. MAIN COLLEGE REVIEWS LIST */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        {filteredColleges.length === 0 ? (
          <div className="text-center py-20 bg-[#14161d] border border-white/10 rounded-3xl shadow-sm">
            <Icons.AlertCircle className="mx-auto text-[#7c8798] w-12 h-12 mb-3" />
            <h2 className="text-xl font-bold text-[#c4cbd8]">No Universities Found</h2>
            <p className="text-[#8b96a8] text-sm mt-1">Try adjusting your search keywords</p>
            <button
              type="button"
              onClick={() => handleSearch("")}
              className="mt-4 h-10 px-5 bg-[#C81E3D] text-white font-extrabold rounded-full text-xs"
            >
              Clear search
            </button>
          </div>
        ) : (
          visible.map((col) => {
            const details = getUniversityDetailsOrDefaults(col.id);
            return (
              <div
                key={col.id}
                className="bg-[#14161d] border border-white/10 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-white/10">
                  {/* Image panel */}
                  <div className="md:col-span-7 relative min-h-48 sm:min-h-64 md:min-h-72 bg-[#1b1e27]">
                    <img
                      src={col.image}
                      alt={col.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 block h-full w-full object-cover"
                    />
                  </div>

                  {/* Rating breakdown panel */}
                  <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-center space-y-5">
                    <div className="text-center space-y-1.5">
                      <span className="text-3xl sm:text-5xl font-extrabold text-blue-400 tracking-tight block">
                        {col.rating}
                      </span>
                      <div className="flex items-center justify-center gap-0.5 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const isFilled = i < Math.floor(col.rating);
                          return (
                            <Icons.Star
                              key={i}
                              size={16}
                              className={isFilled ? "fill-yellow-400" : "text-gray-300"}
                            />
                          );
                        })}
                        <span className="text-[#7c8798] font-bold text-xs ml-2 uppercase tracking-wider">
                          {col.totalReviews} Reviews
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 max-w-xs mx-auto w-full">
                      {[
                        { label: "5★", val: col.ratingDistribution.fiveStar },
                        { label: "4★", val: col.ratingDistribution.fourStar },
                        { label: "3★", val: col.ratingDistribution.threeStar },
                        { label: "2★", val: col.ratingDistribution.twoStar },
                        { label: "1★", val: col.ratingDistribution.oneStar },
                      ].map((row, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs font-bold text-[#c4cbd8]">
                          <span className="w-6 text-right whitespace-nowrap">{row.label}</span>
                          <div className="h-2 flex-grow bg-[#1b1e27] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-400/100 rounded-full"
                              style={{ width: `${row.val}%` }}
                            />
                          </div>
                          <span className="w-8 text-right text-[#7c8798]">{row.val}%</span>
                        </div>
                      ))}
                    </div>

                    {/* Micro-ratings */}
                    <div className="space-y-1.5 max-w-xs mx-auto w-full pt-1 border-t border-white/10">
                      {[
                        { label: "Curriculum", value: details.microRatings.curriculum },
                        { label: "LMS flexibility", value: details.microRatings.lmsFlexibility },
                        { label: "Placement help", value: details.microRatings.placementAssistance },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center gap-3 text-[11px] font-bold text-[#a8b3c5]"
                        >
                          <span className="w-24 text-left whitespace-nowrap">{row.label}</span>
                          <div className="h-1.5 flex-grow bg-[#1b1e27] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#C81E3D] rounded-full"
                              style={{ width: `${(row.value / 5) * 100}%` }}
                            />
                          </div>
                          <span className="w-6 text-right text-[#7c8798]">
                            {row.value.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 pt-2 text-center">
                      <Link
                        href={`/universities/${col.id}`}
                        className="w-full h-12 bg-blue-400/100 hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-md transition-all active:scale-[0.98] text-sm tracking-wide inline-flex items-center justify-center"
                      >
                        View Detailed Reviews
                      </Link>
                      <PopupTrigger className="w-full h-11 border-2 border-blue-500 text-blue-400 hover:bg-blue-400/10 font-extrabold rounded-xl transition-all text-xs">
                        Talk to a counsellor
                      </PopupTrigger>
                      <p className="text-[10px] text-[#7c8798] font-bold uppercase tracking-wider leading-relaxed">
                        Reviews from verified students to help you choose the{" "}
                        <br className="hidden sm:inline" /> right university
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lower Section of Card */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-2xl font-black text-[#F1F5F9] leading-none">
                      <Link href={`/universities/${col.id}`} className="hover:text-[#C81E3D] transition-colors">
                        {col.name}
                      </Link>
                    </h2>
                    <span className="text-xs font-extrabold text-[#F1F5F9] bg-[#10131A] border border-white/10 rounded-full px-3 py-1.5">
                      ₹{(details.totalFee / 100000).toFixed(2)}L
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10131a] border border-white/10 text-xs font-extrabold text-[#a8b3c5] shadow-sm">
                      <Icons.MapPin size={13} className="text-[#C81E3D]" />
                      <span>{col.location}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10/50 border border-emerald-400/25/50 text-xs font-extrabold text-[#a8b3c5] shadow-sm">
                      <Icons.GraduationCap size={14} className="text-emerald-400" />
                      <span>{col.coursesCount}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10/50 border border-amber-400/20/50 text-xs font-extrabold text-[#a8b3c5] shadow-sm">
                      <Icons.FileText size={13} className="text-amber-400" />
                      <span>{col.entranceExam}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50/50 border border-purple-100/50 text-xs font-extrabold text-[#a8b3c5] shadow-sm">
                      <Icons.Calendar size={13} className="text-purple-600" />
                      <span>{col.estd}</span>
                    </div>

                    {details.nirfRank !== null && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2B141A] border border-[#e0244a]/20 text-xs font-extrabold text-[#a8b3c5] shadow-sm">
                        <Icons.Award size={13} className="text-[#C81E3D]" />
                        <span>NIRF #{details.nirfRank}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[#8b96a8] text-sm leading-relaxed font-semibold">
                    {col.description}
                  </p>
                </div>
              </div>
            );
          })
        )}

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filteredColleges.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </section>

      <WhatsAppButton />

      <div className="side-fab fixed bottom-6 left-6 z-50">
        <div className="relative group cursor-pointer flex flex-col items-center">
          <span className="absolute inset-0 rounded-full border-2 border-[#E11D48]/30 scale-110 animate-ping opacity-75"></span>
          <PopupTrigger className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#14161d] border border-[#e0244a]/20 rounded-full shadow-xl hover:shadow-2xl transition-all group-hover:scale-105 active:scale-95 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E11D48]/10 to-[#C81E3D]/10 flex items-center justify-center mb-0.5">
              <Icons.Download size={18} className="text-[#C81E3D] group-hover:translate-y-0.5 transition-transform" />
            </div>
            <span className="text-[9px] font-black text-[#C81E3D] uppercase tracking-wider -mt-1 z-20">
              PDF
            </span>
          </PopupTrigger>
        </div>
      </div>
    </div>
  );
};

export default ReviewsDirectory;
