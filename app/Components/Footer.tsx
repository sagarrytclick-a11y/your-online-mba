"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { siteIdentity } from '../config/site';
import { collegesData } from '../config/colleges';
import { useModal } from '../Context/ModalContext';

const Footer: React.FC = () => {
  const { openModal } = useModal();

  const topColleges = collegesData.slice(0, 5);
  const onlineColleges = collegesData.slice(0, 10);

  return (
    <footer className="bg-[#0B1220] text-white pt-16 pb-8 px-6 md:px-12 relative overflow-hidden">
      
      {/* Subtle Glow Background */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#1E40AF]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F97316]/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Column 1 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image 
                src={siteIdentity.logo} 
                alt={siteIdentity.name} 
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{siteIdentity.name}</h3>
              <p className="text-xs text-gray-400">{siteIdentity.tagline}</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            {siteIdentity.description}
          </p>

          <button
            onClick={openModal}
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Get Free Counselling
          </button>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold text-lg mb-6">Top Universities</h3>
          <div className="space-y-3">
            {topColleges.map((college) => (
              <Link 
                key={college.slug}
                href={`/colleges/${college.slug}`}
                className="block text-gray-400 hover:text-[#F97316] transition"
              >
                {college.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold text-lg mb-6">Online Programs</h3>
          <div className="space-y-3">
            {onlineColleges.map((college) => (
              <Link 
                key={college.slug}
                href={`/colleges/${college.slug}`}
                className="block text-gray-400 hover:text-[#F97316] transition"
              >
                {college.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold text-lg mb-6">Contact</h3>

          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex gap-3">
              <MapPin size={18} className="text-[#F97316]" />
              <p>{siteIdentity.contact.address}</p>
            </div>

            <div className="flex gap-3">
              <Phone size={18} className="text-[#F97316]" />
              <p>6239311536</p>
            </div>

            <div className="flex gap-3">
              <Mail size={18} className="text-[#F97316]" />
              <p>{siteIdentity.contact.email}</p>
            </div>

            {/* Social */}
            <div className="flex gap-3 pt-3">
              <Link target="_blank" href={siteIdentity.social.whatsapp} className="p-2 rounded-lg text-white bg-[#25D366] transition">
                <MessageCircle size={18} />
              </Link>
              <Link target="_blank" href={siteIdentity.social.instagram} className="p-2 rounded-lg text-white bg-pink-500 transition">
                <Instagram size={18} />
              </Link>
              <Link target="_blank" href={siteIdentity.social.linkedin} className="p-2 rounded-lg text-white bg-blue-500 transition">
                <Linkedin size={18} />
              </Link>
              <Link target="_blank" href={siteIdentity.social.youtube} className="p-2 rounded-lg text-white bg-red-500 transition">
                <Youtube size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
        <Link href="/terms" className="hover:text-white">Terms</Link>
        <Link href="/privacy" className="hover:text-white">Privacy</Link>
        <Link href="/about" className="hover:text-white">About</Link>
        <Link href="/contact" className="hover:text-white">Contact</Link>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a href="tel:+916239311536" className="bg-[#1E40AF] p-3 rounded-full shadow-lg hover:scale-110 transition">
          <Phone size={24} />
        </a>

        <a href={`https://wa.me/6239311536`} target="_blank" className="bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-110 transition">
          <MessageCircle size={24} />
        </a>
      </div>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-4 text-xs text-gray-400 leading-relaxed">
          <p className="font-semibold text-gray-300 mb-2">Disclaimer:</p>
          <p>
            The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk. We are not affiliated with any university or educational institution mentioned on this platform. Please verify all information directly with the respective institutions before making any decisions.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 mt-6 pt-6 border-t border-white/10">
        © 2026 {siteIdentity.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;