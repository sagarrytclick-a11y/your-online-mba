"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { siteIdentity } from '../config/site';
import { themeColors } from '../config/theme';
import { collegesData } from '../config/colleges';
import { useModal } from '../Context/ModalContext';

const Footer: React.FC = () => {
  const { openModal } = useModal();
  // Select top colleges for footer
  const topColleges = collegesData.slice(0, 5);
  const onlineColleges = collegesData.slice(0, 10);

  return (
    <footer className="bg-[#1A1A1B] text-white pt-16 pb-8 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image 
                src={siteIdentity.logo} 
                alt={siteIdentity.name} 
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tight">{siteIdentity.name}</span>
              <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">{siteIdentity.tagline}</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            {siteIdentity.description}
          </p>
          <button
            onClick={openModal}
            className="bg-linear-to-r from-[#1E40AF] to-[#1E3A8A] hover:from-[#F97316] hover:to-[#EA580C] text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Guidance
          </button>
        </div>

        {/* Column 2: Top Online Programs with Images */}
        <div>
          <h3 className="font-bold text-lg mb-6 tracking-wide uppercase">Top Online Programms</h3>
          <div className="space-y-3">
            {topColleges.map((college) => (
              <Link 
                key={college.slug}
                href={`/colleges/${college.slug}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all group"
              >
               
                <span className="text-gray-300 text-sm group-hover:text-[#F97316] transition-colors">
                  {college.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Online Programmes */}
        <div>
          <h3 className="font-bold text-lg mb-6 tracking-wide uppercase">Online Programmes</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            {onlineColleges.map((college) => (
              <li key={college.slug}>
                <Link href={`/colleges/${college.slug}`} className="text-gray-300 hover:text-[#F97316] transition-colors">
                  {college.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h3 className="font-bold text-lg mb-6 tracking-wide uppercase">Contact Us</h3>
          <div className="space-y-4 text-sm text-gray-300">
            {/* Dynamic Address from Config */}
            <div className="flex gap-3">
              <MapPin size={18} className="text-[#F97316] shrink-0 mt-1" />
              <p>{siteIdentity.contact.address}</p>
            </div>

            {/* Hardcoded Phone Numbers */}
            <div className="flex gap-3">
              <Phone size={18} className="text-[#F97316] shrink-0 mt-1" />
              <p>6239311536</p>
            </div>

            {/* Dynamic Email */}
            <div className="flex gap-3">
              <Mail size={18} className="text-[#F97316] shrink-0 mt-1" />
              <p>{siteIdentity.contact.email}</p>
            </div>

            {/* Social Media Links */}
            <div className="pt-4">
              <h4 className="font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href={siteIdentity.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={siteIdentity.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={siteIdentity.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={siteIdentity.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Privacy Links */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1E40AF]/30">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/terms" className="text-gray-400 hover:text-[#F97316] transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-[#F97316] transition-colors">Privacy Policy</Link>
          <Link href="/about" className="text-gray-400 hover:text-[#F97316] transition-colors">About Us</Link>
          <Link href="/contact" className="text-gray-400 hover:text-[#F97316] transition-colors">Contact Us</Link>
        </div>
      </div>

      {/* WhatsApp & Call Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Call Button */}
        <a
          href="tel:+916239311536"
          className="bg-[#1E40AF] p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
        >
          <Phone size={28} className="text-white" />
        </a>
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/6239311536`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25d366] p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 pt-8 border-t border-[#1E40AF]/30">
        <div className="text-center text-xs text-gray-400 leading-relaxed max-w-4xl mx-auto">
          <p className="mb-2">
            <strong className="text-gray-300">Disclaimer:</strong> The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 pt-8 border-t border-[#1E40AF]/30 text-center text-sm text-gray-400">
        <p>© 2026 All Rights Reserved — {siteIdentity.name}</p>
      </div>
    </footer>
  );
};

export default Footer;