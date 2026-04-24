"use client";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight,
  Building2, Users, GraduationCap, Award, Headphones,
  Instagram, Linkedin, Youtube
} from 'lucide-react';
import { siteIdentity } from '../../config/site';
import DreamCollegeCTA from '../../Components/DreamCollegeCTA';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">

      {/* HERO */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#1E293B]" />

        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3B82F6]/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F97316]/20 blur-[120px]" />

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full text-sm font-semibold border border-white/10">
            <Phone size={18} />
            CONTACT US
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Start Your <span className="text-[#3B82F6]">Career Journey</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Confused about college or career? Our experts will guide you step-by-step.
          </p>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Expert Guidance", desc: "Personal mentorship from experts" },
              { icon: Building2, title: "500+ Colleges", desc: "Top universities access" },
              { icon: Users, title: "10,000+ Students", desc: "Trusted by thousands" },
              { icon: Award, title: "98% Success", desc: "Proven results" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:border-[#3B82F6] transition-all">
                <item.icon className="mb-4 text-[#3B82F6]" size={28} />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Phone */}
          <div className="glass-card">
            <Phone size={26} />
            <h3>Call Us</h3>
            <p>{siteIdentity.contact.phone[0]}</p>
          </div>

          {/* Email */}
          <div className="glass-card">
            <Mail size={26} />
            <h3>Email</h3>
            <p>{siteIdentity.contact.email}</p>
          </div>

          {/* Address */}
          <div className="glass-card">
            <MapPin size={26} />
            <h3>Office</h3>
            <p className="text-sm">{siteIdentity.contact.address}</p>
          </div>

          {/* WhatsApp */}
          <a href={siteIdentity.social.whatsapp} target="_blank" className="glass-card hover:border-green-400">
            <MessageCircle size={26} />
            <h3>WhatsApp</h3>
            <p>Chat instantly</p>
          </a>
        </div>
      </section>

      {/* OFFICE HOURS */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">

          <div>
            <h2 className="text-3xl font-bold mb-6">Office Hours</h2>
            <div className="space-y-4">
              <div className="glass-row">
                <Clock />
                <div>
                  <p className="font-semibold">Mon - Sat</p>
                  <p className="text-gray-400">9 AM - 7 PM</p>
                </div>
              </div>

              <div className="glass-row">
                <Clock />
                <div>
                  <p className="font-semibold">Sunday</p>
                  <p className="text-gray-400">Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* URGENT HELP */}
          <div className="bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-2xl p-8">
            <Headphones size={30} className="mb-4" />
            <h3 className="text-2xl font-bold mb-3">Need Help Fast?</h3>
            <p className="text-white/80 mb-6">Talk directly with our support team.</p>

            <a
              href={`tel:${siteIdentity.contact.phone[0]}`}
              className="bg-white text-black px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2"
            >
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <DreamCollegeCTA />

      {/* SOCIAL */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Follow Us</h2>

        <div className="flex justify-center gap-4">
          {[ 
            { icon: MessageCircle, link: siteIdentity.social.whatsapp, color: "bg-green-500" },
            { icon: Instagram, link: siteIdentity.social.instagram, color: "bg-pink-500" },
            { icon: Linkedin, link: siteIdentity.social.linkedin, color: "bg-blue-600" },
            { icon: Youtube, link: siteIdentity.social.youtube, color: "bg-red-500" },
          ].map((item, i) => (
            <a key={i} href={item.link} target="_blank"
              className={`w-12 h-12 flex items-center justify-center rounded-full ${item.color} hover:scale-110 transition`}>
              <item.icon size={22} />
            </a>
          ))}
        </div>
      </section>

      {/* STYLES */}
      <style jsx>{`
        .glass-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 24px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          transition: 0.3s;
        }
        .glass-card:hover {
          border-color: #3B82F6;
          transform: translateY(-4px);
        }
        .glass-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.05);
          padding: 14px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}