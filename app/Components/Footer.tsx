import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { siteConfig } from '../data/site';
import PopupTrigger from './PopupTrigger';

const socialIcons: Record<string, React.ReactNode> = {
  FaLinkedin: <FaLinkedin size={18} />,
  FaFacebook: <FaFacebook size={18} />,
  FaInstagram: <FaInstagram size={18} />,
  FaYoutube: <FaYoutube size={18} />,
};

const footerColumns = [
  {
    title: "Explore",
    links: [
      { href: "/why", label: "Why Your Online MBA" },
      { href: "/about", label: "About Us" },
      { href: "/find-my-program", label: "Find My Program" },
      { href: "/universities", label: "All Universities" },
      { href: "/programs", label: "All Programs" },
      { href: "/specialisations", label: "Specializations" },
      { href: "/reviews", label: "Student Reviews" },
    ],
  },
  {
    title: "Compare & Decide",
    links: [
      { href: "/compare-programs", label: "Compare Programs" },
      { href: "/compare", label: "Compare Universities" },
      { href: "/roi-calculator", label: "ROI Calculator" },
      { href: "/scholarships", label: "Scholarships & EMI" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/online-mba-counselling", label: "MBA Counselling" },
      { href: "/services/career-placement-assistance", label: "Career & Placement" },
      { href: "/services/edtech-consulting", label: "EdTech Consulting" },
      { href: "/services/performance-marketing", label: "Performance Marketing" },
      { href: "/services/lead-generation", label: "Lead Generation" },
      { href: "/services", label: "All Services →" },
    ],
  },
  {
    title: "Learners",
    links: [
      { href: "/alumni", label: "Alumni Stories" },
      { href: "/community", label: "Q&A Community" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#14161d] text-[#c4cbd8]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1.35fr]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center" aria-label="Your Online MBA — Home">
              <span className="rounded-2xl bg-white p-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.03]">
                <Image
                  src="/logo.png"
                  alt="Your Online MBA — Online MBA School"
                  width={581}
                  height={430}
                  className="h-16 w-auto"
                />
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-[#a8b3c5]">
              {siteConfig.description}
            </p>

            <PopupTrigger
              className="inline-flex items-center justify-center rounded-xl bg-[#C81E3D] px-5 py-3 text-base font-bold text-white shadow-[0_12px_25px_rgba(200,30,61,0.22)] transition hover:bg-[#b21934]"
            >
              Book a Free Counseling
            </PopupTrigger>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-lg font-extrabold text-[#f1f5f9]">{column.title}</h3>
              <ul className="space-y-2.5 text-sm text-[#a8b3c5]">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-[#C81E3D]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-[#f1f5f9]">Contact Info</h3>

            <div className="space-y-3 text-sm text-[#a8b3c5]">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#2B141A] text-[#C81E3D]">
                  <MapPin size={16} className="stroke-[2.5]" />
                </span>
                <span className="leading-6">{siteConfig.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2B141A] text-[#C81E3D]">
                  <Phone size={16} className="stroke-[2.5]" />
                </span>
                <a href={`tel:${siteConfig.phone}`} className="transition hover:text-[#C81E3D]">
                  {siteConfig.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2B141A] text-[#C81E3D]">
                  <Mail size={16} className="stroke-[2.5]" />
                </span>
                <a href={`mailto:${siteConfig.email}`} className="break-all transition hover:text-[#C81E3D]">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#10131a] text-[#c4cbd8] transition hover:border-[#C81E3D] hover:bg-[#C81E3D] hover:text-white"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* JP Technologies parent-company strip */}
        <a
          href="https://jptechnologies.co"
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-6 flex flex-col gap-4 rounded-2xl border border-[#e0244a]/15 bg-gradient-to-r from-[#2B141A]/60 via-[#14161d] to-[#14161d] px-5 py-4 transition-all hover:border-[#e0244a]/35 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex items-center gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#10131a] text-sm font-black text-[#e0244a]">
              JP
            </span>
            <span>
              <span className="block text-sm font-extrabold text-[#f1f5f9]">
                JP Technologies Company
              </span>
              <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#8b96a8]">
                Custom web &amp; software development — the engineering behind this platform.
              </span>
            </span>
          </span>
          <span className="inline-flex flex-shrink-0 items-center gap-1.5 text-xs font-extrabold text-[#e0244a] transition-colors group-hover:text-white">
            Visit jptechnologies.co
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </a>

        <div className="mt-6 flex flex-col gap-5 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#8b96a8]">
            <Link href="/privacy-policy" className="hover:text-[#C81E3D]">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#C81E3D]">Terms &amp; Conditions</Link>
            <Link href="/disclaimer" className="hover:text-[#C81E3D]">Disclaimer</Link>
          </div>

          <p className="text-sm text-[#8b96a8]">&copy; {siteConfig.year} {siteConfig.name}. All Rights Reserved.</p>
        </div>

        <div className="mt-4 border-t border-white/10 pt-5 text-center text-sm text-[#8b96a8]">
          <p>{siteConfig.legal.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
