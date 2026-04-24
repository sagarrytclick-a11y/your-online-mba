"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  ChevronRight,
  MapPin,
  Award,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp,
  DollarSign,
  Building,
  GraduationCap,
  ExternalLink,
  Star,
  Calendar,
  UserCheck,
  Briefcase,
  Users
} from "lucide-react";
import { useParams } from "next/navigation";
import { useModal } from '../../../Context/ModalContext';
import { getCollegeBySlug, College } from '../../../config/colleges';
import FAQSection from "@/app/Components/FAQSection";

export default function CollegeDynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    // Use dummy data instead of API call
    const fetchCollege = () => {
      try {
        const found = getCollegeBySlug(slug || '');
        setCollege(found || null);
      } catch (err) {
        console.error("Failed to fetch college", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [slug]);

  /* 🔒 LOADING / ERROR STATES */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E40AF] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">College Not Found</h1>
          <p className="text-gray-600 mb-4">The college you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Hero Section with Background */}
      <div className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#1A1A1B] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-8">
            <Home size={14} />
            <span>Home</span>
            <ChevronRight size={12} />
            <span>Colleges</span>
            <ChevronRight size={12} />
            <span className="text-white">{college.name}</span>
          </nav>

          {/* College Header */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-[#F97316] text-white rounded-full text-sm font-bold">
                  {college.type}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold">
                  {college.location.city}, {college.location.state}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                  {college.status}
                </span>
                {college.approved_by.map((approval, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-bold">
                    {approval}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                {college.name}
              </h1>

              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {college.content?.overview || 'A premier management institution offering world-class education and excellent career opportunities.'}
              </p>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="text-[#F97316]" />
                Quick Info
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#F97316]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Location</p>
                    <p className="font-semibold">{college.location.city}, {college.location.state}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Award className="text-[#F97316]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Type</p>
                    <p className="font-semibold">{college.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="text-[#F97316]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Ranking</p>
                    <p className="font-semibold">{college.ranking?.nirf_rank ? `NIRF #${college.ranking.nirf_rank}` : 'Top Ranked'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="text-[#F97316]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Established</p>
                    <p className="font-semibold">{college.established_year || 'N/A'}</p>
                  </div>
                </div>

              </div>

              <button 
                onClick={openModal}
                className="w-full mt-6 px-6 py-3 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#EA580C] transition-colors flex items-center justify-center gap-2"
              >
                <Target size={18} />
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <BookOpen className="text-[#1E40AF]" size={28} />
                About College
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {college.content?.overview || 'A premier management institution offering world-class education and excellent career opportunities.'}
                </p>
              </div>
            </section>

            {/* Courses Offered */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <BookOpen className="text-[#1E40AF]" size={28} />
                Courses Offered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {college.courses_offered.map((course, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-[#F8F9F9] rounded-lg border border-[#F97316]/20">
                    <CheckCircle className="text-[#1E40AF]" size={20} />
                    <span className="font-semibold text-[#1A1A1B]">{course.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Admission Process */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <Target className="text-[#1E40AF]" size={28} />
                Admission Process
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {college.content?.admission || 'Admission based on entrance exam scores and personal interview.'}
                </p>
              </div>

              <div className="mt-6 p-4 bg-[#F8F9F9] rounded-lg border border-[#1E40AF]/20">
                <h3 className="font-bold text-[#1A1A1B] mb-3">Accepted Entrance Exams:</h3>
                <div className="flex flex-wrap gap-2">
                  {college.exams_accepted.map((exam, index) => (
                    <span key={index} className="px-4 py-2 bg-[#1E40AF] text-white rounded-full text-sm font-bold">
                      {exam.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Fees Structure */}
            {college.fees && (
              <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                  <DollarSign className="text-[#1E40AF]" size={28} />
                  Fee Structure
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#F8F9F9] to-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">MBA Fee</p>
                    <p className="text-xl font-bold text-[#1E40AF]">{college.fees.mba_fee}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#F8F9F9] to-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Hostel Fee</p>
                    <p className="text-xl font-bold text-[#1E40AF]">{college.fees.hostel_fee}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#F8F9F9] to-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Total Fee</p>
                    <p className="text-xl font-bold text-[#1E40AF]">{college.fees.total_fee}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Placements */}
            {college.placements && (
              <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                  <Briefcase className="text-[#1E40AF]" size={28} />
                  Placements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Average Package</p>
                    <p className="text-xl font-bold text-green-700">{college.placements.average_package}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Highest Package</p>
                    <p className="text-xl font-bold text-blue-700">{college.placements.highest_package}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Placement Rate</p>
                    <p className="text-xl font-bold text-purple-700">{college.placements.placement_rate}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A1B] mb-3">Top Recruiters:</h3>
                  <div className="flex flex-wrap gap-2">
                    {college.placements.top_recruiters.map((recruiter, index) => (
                      <span key={index} className="px-4 py-2 bg-[#1E40AF]/10 text-[#1E40AF] rounded-lg text-sm font-semibold">
                        {recruiter}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Rankings */}
            {college.ranking && (
              <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                  <Star className="text-[#1E40AF]" size={28} />
                  Rankings & Accreditations
                </h2>
                <div className="space-y-4">
                  {college.ranking.nirf_rank && (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#F8F9F9] to-white rounded-lg border border-gray-200">
                      <Award className="text-[#F97316]" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">NIRF Ranking</p>
                        <p className="text-lg font-bold text-[#1A1A1B]">#{college.ranking.nirf_rank}</p>
                      </div>
                    </div>
                  )}
                  {college.ranking.other_rankings && college.ranking.other_rankings.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {college.ranking.other_rankings.map((rank, index) => (
                        <span key={index} className="px-4 py-2 bg-[#F97316]/10 text-[#F97316] rounded-lg text-sm font-semibold">
                          {rank}
                        </span>
                      ))}
                    </div>
                  )}
                  {college.accreditation && college.accreditation.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-bold text-[#1A1A1B] mb-3">Accreditations:</h3>
                      <div className="flex flex-wrap gap-2">
                        {college.accreditation.map((acc, index) => (
                          <span key={index} className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Facilities */}
            {college.facilities && college.facilities.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                  <Building className="text-[#1E40AF]" size={28} />
                  Campus Facilities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {college.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-[#F8F9F9] rounded-lg border border-gray-200">
                      <CheckCircle className="text-[#1E40AF]" size={18} />
                      <span className="text-sm font-medium text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Campus Info */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <Building className="text-[#1E40AF]" size={28} />
                Campus Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-[#F8F9F9] rounded-lg border border-gray-200">
                  <MapPin className="text-[#1E40AF]" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Campus Size</p>
                    <p className="font-semibold text-[#1A1A1B]">{college.campus_size || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F8F9F9] rounded-lg border border-gray-200">
                  <Calendar className="text-[#1E40AF]" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Established Year</p>
                    <p className="font-semibold text-[#1A1A1B]">{college.established_year || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F8F9F9] rounded-lg border border-gray-200">
                  <UserCheck className="text-[#1E40AF]" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Student Intake</p>
                    <p className="font-semibold text-[#1A1A1B]">{college.student_intake || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F8F9F9] rounded-lg border border-gray-200">
                  <GraduationCap className="text-[#1E40AF]" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Faculty Count</p>
                    <p className="font-semibold text-[#1A1A1B]">{college.faculty_count || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Highlights */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <TrendingUp className="text-[#1E40AF]" size={28} />
                Key Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {college.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#F8F9F9] to-white rounded-lg border border-gray-200">
                    <CheckCircle className="text-[#4A90E2] mt-0.5" size={20} />
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target size={24} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={openModal}
                  className="w-full bg-white text-[#1E40AF] px-4 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Apply Now
                </button>

              </div>
            </div>

            {/* Location Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-6">
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
                <MapPin className="text-[#1E40AF]" size={20} />
                Location
              </h3>
              <div className="space-y-3">
                <p className="text-gray-700 text-sm">{college.location.street_address}</p>
                <p className="text-gray-700 text-sm">{college.location.city}, {college.location.state} - {college.location.pincode}</p>
                {college.location.google_map_link && (
                  <a
                    href={college.location.google_map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4A90E2] hover:text-[#357ABD] font-medium text-sm transition-colors"
                  >
                    <ExternalLink size={14} />
                    View on Google Maps
                  </a>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-6">
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
                <Users className="text-[#1E40AF]" size={20} />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Courses</span>
                  <span className="font-bold text-[#1A1A1B]">{college.courses_offered.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Exams Accepted</span>
                  <span className="font-bold text-[#1A1A1B]">{college.exams_accepted.length}</span>
                </div>
                {college.student_intake && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Student Intake</span>
                    <span className="font-bold text-[#1A1A1B]">{college.student_intake}</span>
                  </div>
                )}
                {college.faculty_count && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Faculty Count</span>
                    <span className="font-bold text-[#1A1A1B]">{college.faculty_count}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Approvals */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-6">
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-4 flex items-center gap-2">
                <Award className="text-[#1E40AF]" size={20} />
                Approved By
              </h3>
              <div className="flex flex-wrap gap-2">
                {college.approved_by.map((approval, index) => (
                  <span key={index} className="px-3 py-1 bg-[#1E40AF]/10 text-[#1E40AF] rounded-lg text-sm font-semibold">
                    {approval}
                  </span>
                ))}
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-6">
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our admission counselors are here to help you with the application process.
              </p>
              <button
                onClick={openModal}
                className="w-full bg-[#1E40AF] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#1E3A8A] transition-colors"
              >
                Get Counselor Support
              </button>
            </div>
          </div>
        </div>
      </div>

      <FAQSection/>
    </div>
  );
}
