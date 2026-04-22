"use client";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Building2, Users, GraduationCap, Award, Headphones, Instagram, Linkedin, Youtube } from 'lucide-react';
import { siteIdentity } from '../../config/site';
import DreamCollegeCTA from '../../Components/DreamCollegeCTA';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-linear-to-br from-[#1E40AF] to-[#1E3A8A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316] rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-sm font-bold border border-white/30 text-white">
              <Phone size={20} />
              CONTACT US
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Let's Start Your <span className="text-[#F97316]">MBA Journey</span>
            </h1>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-white/90">
              Have questions about MBA admissions? Need guidance for your career path? 
              Our expert team is here to help you achieve your dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1B] mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide comprehensive guidance to help you achieve your academic and career goals</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#1E40AF]/10 flex items-center justify-center text-[#1E40AF] mb-4">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-2">Expert Guidance</h3>
              <p className="text-sm text-gray-600">Get personalized advice from industry experts with years of experience</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-4">
                <Building2 size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-2">500+ Colleges</h3>
              <p className="text-sm text-gray-600">Access to top universities and colleges across India</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#1E40AF]/10 flex items-center justify-center text-[#1E40AF] mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-2">10,000+ Students</h3>
              <p className="text-sm text-gray-600">Join thousands of successful students who found their dream college</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-4">
                <Award size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-2">98% Success Rate</h3>
              <p className="text-sm text-gray-600">Our proven track record speaks for itself</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1B] mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Reach out to us through any of these channels</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="bg-linear-to-br from-[#1E40AF] to-[#1E3A8A] rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <Phone size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">Call Us</h3>
              <p className="text-white/90 font-semibold mb-1">{siteIdentity.contact.phone[0]}</p>
              <p className="text-sm text-white/70">{siteIdentity.contact.phone[1]}</p>
              <p className="text-xs text-white/60 mt-3">Mon-Sat: 9:00 AM - 7:00 PM</p>
            </div>

            {/* Email Card */}
            <div className="bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <Mail size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">Email Us</h3>
              <p className="text-white/90 font-semibold break-all">{siteIdentity.contact.email}</p>
              <p className="text-xs text-white/60 mt-3">We respond within 24 hours</p>
            </div>

            {/* Address Card */}
            <div className="bg-linear-to-br from-[#1E40AF] to-[#1E3A8A] rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">Visit Us</h3>
              <p className="text-sm text-white/90 leading-relaxed">{siteIdentity.contact.address}</p>
            </div>

            {/* WhatsApp Card */}
            <a href={siteIdentity.social.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-linear-to-br from-[#25d366] to-[#128C7E] rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <MessageCircle size={28} />
                </div>
                <h3 className="text-lg font-bold mb-2">WhatsApp</h3>
                <p className="text-white/90 font-semibold">Chat with us instantly</p>
              </div>
              <ArrowRight size={20} className="self-end mt-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Office Hours Section */}
      <section className="py-20 px-6 bg-[#F8F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1B] mb-6">Office Hours</h2>
              <p className="text-gray-600 mb-8">Our team is available during these hours to assist you with your queries</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md">
                  <Clock className="text-[#1E40AF]" size={24} />
                  <div>
                    <h4 className="font-bold text-[#1A1A1B]">Monday - Saturday</h4>
                    <p className="text-gray-600">9:00 AM - 7:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md">
                  <Clock className="text-[#F97316]" size={24} />
                  <div>
                    <h4 className="font-bold text-[#1A1A1B]">Sunday</h4>
                    <p className="text-gray-600">Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-[#1E40AF] to-[#1E3A8A] rounded-3xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <Headphones size={32} />
                <h3 className="text-2xl font-bold">Need Urgent Help?</h3>
              </div>
              <p className="text-white/90 mb-6">Our support team is available 24/7 for emergency queries. Reach out to us anytime.</p>
              <a href={`tel:${siteIdentity.contact.phone[0].replace(/\s/g, '')}`} className="inline-flex items-center gap-2 bg-white text-[#1E40AF] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                <Phone size={20} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <DreamCollegeCTA />

      {/* Social Media Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1B] mb-4">Connect with Us</h2>
          <p className="text-gray-600 mb-8">Follow us on social media for latest updates and insights</p>

          <div className="flex justify-center gap-4">
            <a href={siteIdentity.social.whatsapp} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <MessageCircle size={28} />
            </a>
            <a href={siteIdentity.social.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <Instagram size={28} />
            </a>
            <a href={siteIdentity.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <Linkedin size={28} />
            </a>
            <a href={siteIdentity.social.youtube} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <Youtube size={28} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )

}