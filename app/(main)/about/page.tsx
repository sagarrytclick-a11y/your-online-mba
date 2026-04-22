"use client";
import React from 'react';
import {
  CheckCircle,
  Star,
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
  Target,
  ShieldCheck,
  Globe,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  LucideIcon,
  Award,
  TrendingUp,
  Heart,
  Zap
} from 'lucide-react';
import { siteIdentity } from '../../config/site';
import { themeColors, colorCombos, themeClasses } from '../../config/theme';
import {
  companyData,
  teamMembers,
  coreValues,
  achievements,
  contactMethods
} from '../../config/data';
import { useModal } from '@/app/Context/ModalContext';

// --- Types & Interfaces ---

interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
}

interface Badge {
  icon: string;
  text: string;
}

interface Achievement {
  icon: string;
  number: string;
  label: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  expertise: string;
}

interface ContactMethod {
  type: 'email' | 'phone' | 'address' | string;
  title: string;
  subtitle: string;
  value: string;
}

// --- Components ---

const IconRenderer: React.FC<IconRendererProps> = ({ name, size = 24, className = "" }) => {
  const icons: Record<string, LucideIcon> = {
    bookOpen: BookOpen,
    users: Users,
    trophy: Trophy,
    target: Target,
    shield: ShieldCheck,
    globe: Globe,
    mail: Mail,
    phone: Phone,
    mapPin: MapPin,
    graduation: GraduationCap,
    star: Star,
    check: CheckCircle,
    award: Award,
    trending: TrendingUp,
    heart: Heart,
    zap: Zap
  };

  const IconComponent = icons[name] || GraduationCap;
  return <IconComponent size={size} className={className} />;
};

const Page: React.FC = () => {

  const { openModal } = useModal();

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Hero Section - New Design */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-4 py-2 rounded-full text-sm font-bold border border-[#F97316]">
                <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
                ABOUT US
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A1A1B] leading-tight">
                Shaping Futures,<br />
                <span className="text-[#1E40AF]">Building Dreams</span>
              </h1>
              <p className="text-xl text-[#2C3E50] leading-relaxed max-w-lg">
                {companyData.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                {(companyData.hero.badges as Badge[]).map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 bg-[#1E40AF]/5 px-4 py-2 rounded-lg border border-[#1E40AF]/20">
                    <IconRenderer name={badge.icon} size={16} className="text-[#F97316]" />
                    <span className="text-sm font-semibold text-[#1A1A1B]">{badge.text}</span>
                  </div>
                ))}
              </div>
              <div onClick={openModal} className="inline-flex items-center gap-2 bg-[#1E40AF] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1E3A8A] transition-colors cursor-pointer">
                Get Started
                <ArrowRight size={20} />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F97316]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1E40AF]/20 rounded-full blur-3xl" />
              <img
                src="/hero/about-image.png"
                alt="About Us"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1E40AF] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(achievements as Achievement[]).map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{achievement.number}</div>
                <div className="text-white/80 text-sm font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - New Card Design */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-4xl font-extrabold text-[#1A1A1B] mb-4">
                  {companyData.story.title}
                </h2>
                {(companyData.story.description as string[]).map((paragraph, index) => (
                  <p key={index} className="text-[#2C3E50] text-lg leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-[#F97316]/10 rounded-xl flex items-center justify-center mb-4">
                    <GraduationCap size={24} className="text-[#F97316]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#1E40AF] mb-1">{companyData.founded}</div>
                  <div className="text-sm text-[#2C3E50] font-medium">Founded</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-[#1E40AF]/10 rounded-xl flex items-center justify-center mb-4">
                    <Users size={24} className="text-[#1E40AF]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#1E40AF] mb-1">{companyData.studentsHelped}</div>
                  <div className="text-sm text-[#2C3E50] font-medium">Students Helped</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] rounded-3xl p-8 text-white">
              <div className="text-6xl font-extrabold mb-2">{companyData.yearsExperience}+</div>
              <div className="text-xl font-semibold mb-4">Years of Excellence</div>
              <p className="text-white/80 leading-relaxed">
                Trusted by thousands of students across India to guide their educational journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - New Horizontal Card Design */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#1A1A1B] mb-4">
              What Drives <span className="text-[#1E40AF]">Us</span>
            </h2>
            <p className="text-[#2C3E50] text-lg max-w-2xl mx-auto">
              Our core values define who we are and how we help students achieve their dreams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(coreValues as Value[]).map((value, index) => (
              <div key={index} className="bg-[#F8F9F9] p-8 rounded-2xl border border-gray-200 hover:border-[#1E40AF]/30 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#1E40AF] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <IconRenderer name={value.icon} size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">{value.title}</h3>
                    <p className="text-[#2C3E50] leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      {/* CTA Section - New Design */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let our expert counselors help you find the perfect college and course for your career goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div onClick={openModal} className="bg-white text-[#1E40AF] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors cursor-pointer inline-flex items-center gap-2">
                  <Phone size={20} />
                  Talk to Counselor
                </div>
                <div onClick={openModal} className="bg-[#1E40AF] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1E3A8A] transition-colors cursor-pointer inline-flex items-center gap-2 border border-white/30">
                  <Mail size={20} />
                  Send Message
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Minimal Design */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {(contactMethods as ContactMethod[]).map((contact, index) => (
              <div key={index} className="p-8 rounded-2xl border border-gray-200 hover:border-[#1E40AF]/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-[#F8F9F9] rounded-xl flex items-center justify-center mb-4">
                  <IconRenderer
                    name={contact.type === 'email' ? 'mail' : contact.type === 'phone' ? 'phone' : 'mapPin'}
                    size={24}
                    className="text-[#1E40AF]"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1B] mb-2">{contact.title}</h3>
                <p className="text-[#2C3E50] text-sm mb-3">{contact.subtitle}</p>
                <p className="text-[#1E40AF] font-semibold">{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;