"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, Home, Info, Mail, BookOpen, GraduationCap, ChevronDown } from 'lucide-react';
import { useModal } from '../Context/ModalContext';
import { siteIdentity } from '../config/site';
import { DynamicIcon } from '../config/icons';
import { collegesData } from '../config/colleges';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTopDropdownOpen, setIsTopDropdownOpen] = useState(false);
  const [isOnlineDropdownOpen, setIsOnlineDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const { openModal } = useModal();

  // Top universities (IIMs, ISB, XLRI, etc.)
  const topUniversities = collegesData.filter(college => 
    college.slug.includes('iim') || 
    college.slug.includes('isb') || 
    college.slug.includes('xlri') ||
    college.slug.includes('goa-institute') ||
    college.slug.includes('iiitb')
  ).slice(0, 6);

  const onlineColleges = collegesData.slice(0, 10);

  const navLinks = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'Online Programmes', href: '/colleges', icon: 'bookOpen', hasDropdown: true, dropdownKey: 'online' }, 
    { name: 'About', href: '/about', icon: 'info' },
    { name: 'Top Programmes', href: '/colleges', icon: 'graduationCap', hasDropdown: true, dropdownKey: 'top' },
    { name: 'Contact', href: '/contact', icon: 'mail' },
  ];

  return (
    <nav className="w-full text-black bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="hidden sm:flex bg-linear-to-r from-[#1A1A1B] to-[#2D2D2D] text-white px-6 py-2.5 justify-between text-[12px] font-medium tracking-wide">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
            <DynamicIcon name="phone" size={12} className="text-[#F97316]" />
            {siteIdentity.contact.phone[0]}
          </span>
          <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
            <DynamicIcon name="mail" size={12} className="text-[#F97316]" />
            {siteIdentity.contact.email}
          </span>
        </div>
        <div className="hidden lg:block opacity-70">
          <span>{siteIdentity.contact.address}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-20">

          {/* 1. Left: Logo Section */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-14 h-14 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Image
                  src='/favicon.png'
                  alt={siteIdentity.name}
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-base md:text-lg text-[#1A1A1B] tracking-tight group-hover:text-[#1E40AF] transition-colors">{siteIdentity.name}</span>
                <span className="text-[8px] text-[#F97316] font-bold tracking-[0.15em] uppercase italic group-hover:text-[#1E40AF] transition-colors">{siteIdentity.tagline}</span>
              </div>
            </Link>
          </div>

            <div className="hidden lg:flex justify-center items-center">
            <div className="flex gap-3  text-[14px] font-bold text-gray-700 uppercase tracking-wide">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.hasDropdown) {
                      if (link.dropdownKey === 'top') setIsTopDropdownOpen(true);
                      if (link.dropdownKey === 'online') setIsOnlineDropdownOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.hasDropdown) {
                      if (link.dropdownKey === 'top') setIsTopDropdownOpen(false);
                      if (link.dropdownKey === 'online') setIsOnlineDropdownOpen(false);
                    }
                  }}
                >
                  <Link
                    href={link.href}
                    className="hover:bg-[#1E40AF] hover:text-white transition-all whitespace-nowrap duration-300 relative group py-2 px-4 rounded-lg flex items-center gap-2"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={14} />}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.hasDropdown && (
                    <>
                      {link.dropdownKey === 'top' && isTopDropdownOpen && (
                        <div className="absolute top-full left-0 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 py-4 z-50">
                          <div className="grid grid-cols-2 gap-2 px-4">
                            {topUniversities.map((college) => (
                              <Link
                                key={college.slug}
                                href={`/colleges/${college.slug}`}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F9F9] transition-colors group/item"
                              >
                                <img
                                  src={college.media?.cover || '/colleges/default-cover.jpg'}
                                  alt={college.name}
                                  className="w-10 h-10 object-cover rounded-lg group-hover/item:scale-110 transition-transform"
                                />
                                <span className="text-xs font-semibold text-gray-700 group-hover/item:text-[#1E40AF] transition-colors line-clamp-2">
                                  {college.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      {link.dropdownKey === 'online' && isOnlineDropdownOpen && (
                        <div className="absolute top-full left-0 w-125 mt-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                          <div className="grid grid-cols-2 gap-2 px-4">
                            {onlineColleges.map((college) => (
                              <Link
                                key={college.slug}
                                href={`/colleges/${college.slug}`}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F9F9] transition-colors group/item"
                              >
                                <img
                                  src={college.media?.cover || '/colleges/default-cover.jpg'}
                                  alt={college.name}
                                  className="w-10 h-10 object-cover rounded-lg group-hover/item:scale-110 transition-transform"
                                />
                                <span className="text-xs font-semibold text-gray-700 group-hover/item:text-[#1E40AF] transition-colors line-clamp-2">
                                  {college.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Right: CTA Button & Mobile Toggle */}
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={openModal}
              className="hidden sm:flex bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] hover:from-[#F97316] hover:to-[#EA580C] text-white px-6 py-2.5 rounded items-center gap-2 text-[13px] font-bold transition-all duration-300 shadow-lg shadow-[#1E40AF]/20 hover:shadow-xl hover:shadow-[#F97316]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              <DynamicIcon name="phone" size={14} /> Get Guidance
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-800 p-2 hover:bg-[#F8F9F9] hover:text-[#1E40AF] rounded-lg transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 bg-white border-t border-gray-100 shadow-2xl h-screen overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-6 space-y-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.dropdownKey ? null : link.dropdownKey)}
                      className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-gray-50 to-white text-gray-800 font-bold text-lg rounded-2xl hover:from-[#1E40AF]/5 hover:to-[#1E40AF]/10 hover:text-[#1E40AF] transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-[#1E40AF]/20"
                    >
                      <div className="flex items-center gap-4">
                        <DynamicIcon name={link.icon as any} size={22} className="text-gray-400" />
                        {link.name}
                      </div>
                      <ChevronDown size={16} className={`transition-transform ${mobileDropdownOpen === link.dropdownKey ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileDropdownOpen === link.dropdownKey && (
                      <div className="mt-2 ml-4 space-y-2">
                        {link.dropdownKey === 'top' && topUniversities.map((college) => (
                          <Link
                            key={college.slug}
                            href={`/colleges/${college.slug}`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileDropdownOpen(null);
                            }}
                            className="block p-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-[#1E40AF]/10 hover:text-[#1E40AF] transition-colors"
                          >
                            {college.name}
                          </Link>
                        ))}
                        {link.dropdownKey === 'online' && onlineColleges.map((college) => (
                          <Link
                            key={college.slug}
                            href={`/colleges/${college.slug}`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileDropdownOpen(null);
                            }}
                            className="block p-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-[#1E40AF]/10 hover:text-[#1E40AF] transition-colors"
                          >
                            {college.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white text-gray-800 font-bold text-lg rounded-2xl hover:from-[#1E40AF]/5 hover:to-[#1E40AF]/10 hover:text-[#1E40AF] transition-all duration-300 hover:shadow-lg hover:-translate-x-1 border border-gray-100 hover:border-[#1E40AF]/20"
                  >
                    <div className="flex items-center gap-4">
                      <DynamicIcon name={link.icon as any} size={22} className="text-gray-400 group-hover:text-[#1E40AF] transition-colors" />
                      {link.name}
                    </div>
                    <DynamicIcon name="x" size={16} className="opacity-0 group-hover:opacity-100" />
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-6">
              <button
                onClick={() => {
                  openModal();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] hover:from-[#F97316] hover:to-[#EA580C] text-white w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-[#1E40AF]/20 hover:shadow-xl hover:shadow-[#F97316]/30 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              >
                <DynamicIcon name="phone" size={22} /> Get Admission Support
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;