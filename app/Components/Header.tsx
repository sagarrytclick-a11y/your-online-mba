"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import { programs } from '../data/programs';
import { collegeReviews } from '../data/colleges';
import { learnerServices, edtechServices } from '../data/services';
import PopupTrigger from './PopupTrigger';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredMenu(null), 150);
  };

  // Mobile menu: lock the page behind it, close on Escape, and close when
  // rotating/resizing to the desktop layout.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setIsOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);


  return (
    <header className="w-full bg-[#14161d] border-b border-white/10 sticky top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-[#C81E3D] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LEFT: Logos */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            <Link href="/" className="flex items-center flex-shrink-0" aria-label="Your Online MBA — Home">
              <span className="rounded-2xl bg-white p-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.03]">
                <Image
                  src="/logo.png"
                  alt="Your Online MBA — Online MBA School"
                  width={581}
                  height={430}
                  priority
                  className="h-12 sm:h-14 w-auto"
                />
              </span>
            </Link>
          </div>

          {/* CENTER: Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-6">
            {/* Home */}
            <Link href="/" className="text-[#F1F5F9] text-sm font-bold hover:text-[#C81E3D] transition-colors">
              Home
            </Link>

            {/* Programs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("programs")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 text-[#F1F5F9] text-sm font-bold hover:text-[#C81E3D] transition-colors">
                <span>Programs</span>
                <ChevronDown size={18} className="text-[#7c8798] transition-transform duration-200" />
              </button>
              {hoveredMenu === "programs" && (
                <div className="absolute top-full left-0 mt-3 w-[320px] bg-[#14161d] rounded-2xl shadow-xl border border-white/10 p-4 z-50">
                  <div className="grid grid-cols-1 gap-1">
                    <Link
                      href="/programs"
                      className="block px-4 py-2.5 rounded-lg text-[#C81E3D] font-extrabold text-sm hover:bg-[#2B141A] transition-all border-b border-white/10 mb-1"
                    >
                      All Programmes
                    </Link>
                    {programs.map((program) => (
                      <Link
                        key={program.id}
                        href={`/programs/${program.slug}`}
                        className="block px-4 py-2.5 rounded-lg text-[#F1F5F9] font-bold text-sm hover:bg-[#2B141A] hover:text-[#C81E3D] transition-all"
                      >
                        {program.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 text-[#F1F5F9] text-sm font-bold hover:text-[#C81E3D] transition-colors">
                <span>Services</span>
                <ChevronDown size={16} className="text-[#7c8798] transition-transform duration-200" />
              </button>
              {hoveredMenu === "services" && (
                <div className="absolute top-full left-0 mt-3 w-[640px] bg-[#14161d] rounded-2xl shadow-2xl border border-white/10 p-5 grid grid-cols-2 gap-5 z-50">
                  <div>
                    <Link
                      href="/services#learners"
                      className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#e0244a] mb-2 px-2 hover:text-white transition-colors"
                    >
                      For Learners
                    </Link>
                    <div className="grid grid-cols-1 gap-1">
                      {learnerServices.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="block px-3 py-2 rounded-lg text-[#F1F5F9] font-bold text-[13px] hover:bg-[#2B141A] hover:text-[#e0244a] transition-all leading-snug"
                        >
                          {s.shortTitle}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Link
                      href="/services#edtech-brands"
                      className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#e0244a] mb-2 px-2 hover:text-white transition-colors"
                    >
                      For EdTech Brands
                    </Link>
                    <div className="grid grid-cols-1 gap-1">
                      {edtechServices.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="block px-3 py-2 rounded-lg text-[#F1F5F9] font-bold text-[13px] hover:bg-[#2B141A] hover:text-[#e0244a] transition-all leading-snug"
                        >
                          {s.shortTitle}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/services"
                    className="col-span-2 text-center text-xs font-extrabold text-[#e0244a] hover:text-white border-t border-white/10 pt-3 transition-colors"
                  >
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

            {/* Universities Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("universities")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center space-x-1 text-[#F1F5F9] text-sm font-bold">
                <Link href="/universities" className="hover:text-[#C81E3D] transition-colors">Universities</Link>
                <ChevronDown size={18} className="text-[#7c8798] transition-transform duration-200" aria-hidden="true" />
              </div>

              {hoveredMenu === "universities" && (
                <div className="absolute top-full left-0 mt-3 w-[320px] bg-[#14161d] rounded-2xl shadow-xl border border-white/10 p-4 z-50 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 gap-1">
                    <Link
                      href="/universities"
                      className="block px-4 py-2.5 rounded-lg text-[#C81E3D] font-extrabold text-sm hover:bg-[#2B141A] transition-all border-b border-white/10 mb-1"
                    >
                      View All Universities
                    </Link>
                    {collegeReviews.map((col) => (
                      <Link
                        key={col.id}
                        href={`/universities/${col.id}`}
                        className="block px-4 py-2.5 rounded-lg text-[#F1F5F9] font-bold text-sm hover:bg-[#2B141A] hover:text-[#C81E3D] transition-all"
                      >
                        {col.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About */}
            <Link href="/about" className="text-[#F1F5F9] text-sm font-bold hover:text-[#C81E3D] transition-colors">
              About
            </Link>
            {/* Contact Us */}
            <Link href="/contact-us" className="text-[#F1F5F9] text-sm font-bold hover:text-[#C81E3D] transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* RIGHT: AI advisor pill + Book CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
              className="hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 hover:border-[#e0244a]/50 transition-all"
              aria-label="Open AI MBA Advisor"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
              <span className="text-[#f1f5f9] text-xs font-bold">AI Advisor · online</span>
            </button>
            <PopupTrigger className="hidden lg:inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white text-sm font-extrabold whitespace-nowrap shadow-[0_10px_30px_rgba(224,36,74,0.4)] hover:brightness-110 transition-all active:scale-[0.97]">
              Book a Free Counselling
            </PopupTrigger>

          {/* MOBILE: Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-[#f1f5f9] p-2.5 -mr-1 hover:bg-[#1b1e27] rounded-lg transition-colors"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <nav id="mobile-menu" className="lg:hidden bg-[#14161d] border-t border-white/10 absolute top-full w-full left-0 shadow-xl px-4 sm:px-6 py-6 space-y-4 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain" aria-label="Mobile navigation">
          {/* Programs Accordion */}
          <div>
            <button
              onClick={() => setMobileDropdown(mobileDropdown === "programs" ? null : "programs")}
              aria-expanded={mobileDropdown === "programs"}
              className="flex items-center justify-between w-full min-h-11 text-[#C81E3D] text-[11px] font-bold tracking-widest uppercase"
            >
              <span>Programs</span>
              <ChevronDown size={16} className={`text-[#C81E3D] transition-transform duration-200 ${mobileDropdown === "programs" ? "rotate-180" : ""}`} />
            </button>
            {mobileDropdown === "programs" && (
              <div className="grid grid-cols-1 gap-1 pt-2 pb-1">
                <Link
                  href="/programs"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-extrabold text-[#C81E3D] py-3 px-2 rounded-lg hover:bg-[#2B141A] transition-all border-b border-white/10 mb-1"
                >
                  All Programmes
                </Link>
                {programs.map((program) => (
                  <Link
                    key={program.id}
                    href={`/programs/${program.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-bold text-[#f1f5f9] hover:text-[#C81E3D] py-3 px-2 rounded-lg hover:bg-[#2B141A] transition-all"
                  >
                    {program.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="h-[1px] bg-[#1b1e27]" />
          
          {/* Services Accordion */}
          <div>
            <button
              onClick={() => setMobileDropdown(mobileDropdown === "services" ? null : "services")}
              aria-expanded={mobileDropdown === "services"}
              className="flex items-center justify-between w-full min-h-11 text-[#e0244a] text-[11px] font-bold tracking-widest uppercase mb-1"
            >
              <span>Services</span>
              <ChevronDown size={16} className={`text-[#e0244a] transition-transform duration-200 ${mobileDropdown === "services" ? "rotate-180" : ""}`} />
            </button>
            {mobileDropdown === "services" && (
              <div className="pt-2 pb-1 space-y-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8b96a8] px-2 mb-1">For Learners</p>
                  <div className="grid grid-cols-1 gap-1">
                    {learnerServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm font-bold text-[#f1f5f9] hover:text-[#e0244a] py-3 px-2 rounded-lg hover:bg-[#2B141A] transition-all"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8b96a8] px-2 mb-1">For EdTech Brands</p>
                  <div className="grid grid-cols-1 gap-1">
                    {edtechServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm font-bold text-[#f1f5f9] hover:text-[#e0244a] py-3 px-2 rounded-lg hover:bg-[#2B141A] transition-all"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-extrabold text-[#e0244a] px-2 py-3"
                >
                  View all services →
                </Link>
              </div>
            )}
          </div>
          <div className="h-[1px] bg-white/10" />

          {/* Universities Accordion */}
          <div>
            <button
              onClick={() => setMobileDropdown(mobileDropdown === "universities" ? null : "universities")}
              aria-expanded={mobileDropdown === "universities"}
              className="flex items-center justify-between w-full min-h-11 text-[#C81E3D] text-[11px] font-bold tracking-widest uppercase mb-1"
            >
              <span>Universities</span>
              <ChevronDown size={16} className={`text-[#C81E3D] transition-transform duration-200 ${mobileDropdown === "universities" ? "rotate-180" : ""}`} />
            </button>
            {mobileDropdown === "universities" && (
              <div className="grid grid-cols-1 gap-1 pt-2 pb-1">
                <Link
                  href="/universities"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-extrabold text-[#C81E3D] py-3 px-2 rounded-lg hover:bg-[#2B141A] transition-all border-b border-white/10 mb-1"
                >
                  View All Universities
                </Link>
                {collegeReviews.map((col) => (
                  <Link
                    key={col.id}
                    href={`/universities/${col.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-bold text-[#f1f5f9] hover:text-[#C81E3D] py-3 px-2 rounded-lg hover:bg-[#2B141A] transition-all"
                  >
                    {col.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="h-[1px] bg-[#1b1e27]" />

          <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-bold text-[#f1f5f9]">Home</Link>
          <div className="h-[1px] bg-white/10" />
          <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-bold text-[#f1f5f9]">About</Link>
          <div className="h-[1px] bg-white/10" />
          <Link href="/contact-us" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-bold text-[#f1f5f9]">Contact Us</Link>
          <div className="h-[1px] bg-white/10" />
          <div className="pt-2 space-y-3" onClick={() => setIsOpen(false)}>
            <PopupTrigger className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white text-base font-extrabold shadow-[0_10px_30px_rgba(224,36,74,0.4)]">
              Book a Free Counselling
            </PopupTrigger>
            <button
              onClick={() => { window.dispatchEvent(new CustomEvent("open-ai-chat")); setIsOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-white/15 text-[#f1f5f9] text-sm font-bold hover:border-[#e0244a]/50 transition-colors"
            >
              <Sparkles size={16} className="text-[#e0244a]" />
              <span>Ask AI Advisor · online</span>
            </button>
          </div>
        </nav>
      )}

      {/* Gradient hairline under the header */}
      <div aria-hidden className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#e0244a]/80 to-transparent" />
    </header>
  );
};

export default Header;
