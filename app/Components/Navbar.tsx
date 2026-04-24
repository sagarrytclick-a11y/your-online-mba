"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
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
    <nav
      className="w-full sticky top-0 z-50"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Top contact bar ── */}
      <div
        className="hidden sm:flex px-6 py-2.5 justify-between text-[11px] font-semibold tracking-wide"
        style={{ background: '#0F172A', color: 'rgba(255,255,255,0.9)' }}
      >
        <div className="flex gap-6">
          <span
            className="flex items-center gap-1.5 cursor-pointer transition-colors text-white duration-200"
            style={{ color: 'rgba(255,255,255,0.9)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
          >
            <DynamicIcon name="phone" size={11} style={{ color: '#3B82F6' }} />
            {siteIdentity.contact.phone[0]}
          </span>
          <span
            className="flex items-center gap-1.5 cursor-pointer transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.9)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
          >
            <DynamicIcon name="mail" size={11} style={{ color: '#3B82F6' }} />
            {siteIdentity.contact.email}
          </span>
        </div>
        <span className="hidden lg:block" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {siteIdentity.contact.address}
        </span>
      </div>

      {/* ── Main bar ── */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: '0 1px 6px rgba(15,23,42,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-18" style={{ height: 72 }}>

            {/* ── Logo ── */}
            <div className="flex justify-start">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/favicon.png"
                    alt={siteIdentity.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span
                    className="font-extrabold text-base md:text-lg tracking-tight transition-colors duration-200"
                    style={{ fontFamily: "'Syne', sans-serif", color: '#0F172A' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#2563EB')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#0F172A')}
                  >
                    {siteIdentity.name}
                  </span>
                  <span
                    className="text-[9px] font-bold tracking-[0.18em] uppercase italic"
                    style={{ color: '#2563EB' }}
                  >
                    {siteIdentity.tagline}
                  </span>
                </div>
              </Link>
            </div>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex justify-center items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.dropdownKey === 'top') setIsTopDropdownOpen(true);
                    if (link.dropdownKey === 'online') setIsOnlineDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (link.dropdownKey === 'top') setIsTopDropdownOpen(false);
                    if (link.dropdownKey === 'online') setIsOnlineDropdownOpen(false);
                  }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 whitespace-nowrap"
                    style={{ color: '#475569' }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = '#EFF6FF';
                      el.style.color = '#1D4ED8';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'transparent';
                      el.style.color = '#475569';
                    }}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={13} />}
                  </Link>

                  {/* Dropdown */}
                  {link.hasDropdown && (
                    <>
                      {link.dropdownKey === 'top' && isTopDropdownOpen && (
                        <div
                          className="absolute top-full left-0 w-96 py-3 rounded-2xl z-50"
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 16px 48px rgba(15,23,42,0.12)',
                          }}
                        >
                          <p
                            className="px-4 pb-2 text-[10px] font-bold uppercase tracking-widest"
                            style={{ color: '#94A3B8' }}
                          >
                            Top Universities
                          </p>
                          <div className="grid grid-cols-2 gap-1 px-3">
                            {topUniversities.map((college) => (
                              <Link
                                key={college.slug}
                                href={`/colleges/${college.slug}`}
                                className="flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-200"
                                style={{ color: '#475569' }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = '#F8FAFC';
                                  (e.currentTarget as HTMLElement).style.color = '#1D4ED8';
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                                  (e.currentTarget as HTMLElement).style.color = '#475569';
                                }}
                              >
                                <img
                                  src={college.media?.cover || '/colleges/default-cover.jpg'}
                                  alt={college.name}
                                  className="w-9 h-9 object-cover rounded-lg shrink-0"
                                  style={{ border: '1px solid #E2E8F0' }}
                                />
                                <span className="text-xs font-semibold leading-tight line-clamp-2">
                                  {college.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {link.dropdownKey === 'online' && isOnlineDropdownOpen && (
                        <div
                          className="absolute top-full left-0 py-3 rounded-2xl z-50"
                          style={{
                            width: 480,
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 16px 48px rgba(15,23,42,0.12)',
                          }}
                        >
                          <p
                            className="px-4 pb-2 text-[10px] font-bold uppercase tracking-widest"
                            style={{ color: '#94A3B8' }}
                          >
                            Online Programmes
                          </p>
                          <div className="grid grid-cols-2 gap-1 px-3">
                            {onlineColleges.map((college) => (
                              <Link
                                key={college.slug}
                                href={`/colleges/${college.slug}`}
                                className="flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-200"
                                style={{ color: '#475569' }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = '#F8FAFC';
                                  (e.currentTarget as HTMLElement).style.color = '#1D4ED8';
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                                  (e.currentTarget as HTMLElement).style.color = '#475569';
                                }}
                              >
                                <img
                                  src={college.media?.cover || '/colleges/default-cover.jpg'}
                                  alt={college.name}
                                  className="w-9 h-9 object-cover rounded-lg shrink-0"
                                  style={{ border: '1px solid #E2E8F0' }}
                                />
                                <span className="text-xs font-semibold leading-tight line-clamp-2">
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

            {/* ── Right: CTA + Mobile toggle ── */}
            <div className="flex justify-end items-center gap-3">
              <button
                onClick={openModal}
                className="hidden sm:flex items-center gap-2 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.25)',
                  fontFamily: "'Syne', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(37,99,235,0.40)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(37,99,235,0.25)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                <DynamicIcon name="phone" size={13} />
                Get Guidance
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl transition-all duration-200"
                style={{ color: '#475569' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#F1F5F9';
                  (e.currentTarget as HTMLButtonElement).style.color = '#1D4ED8';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = '#475569';
                }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 h-screen overflow-y-auto z-40"
          style={{
            background: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            boxShadow: '0 16px 48px rgba(15,23,42,0.10)',
          }}
        >
          <div className="p-5 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setMobileDropdownOpen(
                          mobileDropdownOpen === link.dropdownKey ? null : link.dropdownKey
                        )
                      }
                      className="flex items-center justify-between w-full p-4 rounded-2xl font-semibold text-base transition-all duration-200"
                      style={{
                        background: mobileDropdownOpen === link.dropdownKey ? '#EFF6FF' : '#FFFFFF',
                        border: `1px solid ${mobileDropdownOpen === link.dropdownKey ? '#BFDBFE' : '#E2E8F0'}`,
                        color: mobileDropdownOpen === link.dropdownKey ? '#1D4ED8' : '#334155',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <DynamicIcon name={link.icon as any} size={18} style={{ color: '#94A3B8' }} />
                        {link.name}
                      </div>
                      <ChevronDown
                        size={15}
                        style={{
                          color: '#94A3B8',
                          transform: mobileDropdownOpen === link.dropdownKey ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </button>

                    {mobileDropdownOpen === link.dropdownKey && (
                      <div className="mt-2 ml-3 space-y-1.5">
                        {(link.dropdownKey === 'top' ? topUniversities : onlineColleges).map((college) => (
                          <Link
                            key={college.slug}
                            href={`/colleges/${college.slug}`}
                            onClick={() => { setIsMobileMenuOpen(false); setMobileDropdownOpen(null); }}
                            className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-200"
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              color: '#475569',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = '#BFDBFE';
                              (e.currentTarget as HTMLElement).style.color = '#1D4ED8';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0';
                              (e.currentTarget as HTMLElement).style.color = '#475569';
                            }}
                          >
                            <img
                              src={college.media?.cover || '/colleges/default-cover.jpg'}
                              alt={college.name}
                              className="w-8 h-8 object-cover rounded-lg shrink-0"
                            />
                            <span className="line-clamp-1">{college.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-4 rounded-2xl font-semibold text-base transition-all duration-200"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      color: '#334155',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#EFF6FF';
                      (e.currentTarget as HTMLElement).style.borderColor = '#BFDBFE';
                      (e.currentTarget as HTMLElement).style.color = '#1D4ED8';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
                      (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0';
                      (e.currentTarget as HTMLElement).style.color = '#334155';
                    }}
                  >
                    <DynamicIcon name={link.icon as any} size={18} style={{ color: '#94A3B8' }} />
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4">
              <button
                onClick={() => { openModal(); setIsMobileMenuOpen(false); }}
                className="w-full py-4 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                  boxShadow: '0 6px 24px rgba(37,99,235,0.30)',
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                <DynamicIcon name="phone" size={18} />
                Get Admission Support
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;