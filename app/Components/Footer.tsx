import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { siteConfig } from '../data/site';

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
    title: "Learners",
    links: [
      { href: "/alumni", label: "Alumni Stories" },
      { href: "/community", label: "Q&A Community" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 pb-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.35fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/logo.png"
                  alt="Your Online MBA"
                  width={70}
                  height={70}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-sm"
                />
              </Link>
              <div>
                <p className="text-[22px] font-black leading-none tracking-tight text-slate-900">
                  {siteConfig.name}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-600">
              {siteConfig.description}
            </p>

            <Link
              href="/book-counseling"
              className="inline-flex items-center justify-center rounded-xl bg-[#C81E3D] px-5 py-3 text-base font-bold text-white shadow-[0_12px_25px_rgba(200,30,61,0.22)] transition hover:bg-[#b21934]"
            >
              Book a Free Counseling
            </Link>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900">{column.title}</h3>
              <ul className="space-y-2.5 text-sm text-slate-600">
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
            <h3 className="text-lg font-extrabold text-slate-900">Contact Info</h3>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF1F2] text-[#C81E3D]">
                  <MapPin size={16} className="stroke-[2.5]" />
                </span>
                <span className="leading-6">{siteConfig.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF1F2] text-[#C81E3D]">
                  <Phone size={16} className="stroke-[2.5]" />
                </span>
                <a href={`tel:${siteConfig.phone}`} className="transition hover:text-[#C81E3D]">
                  {siteConfig.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF1F2] text-[#C81E3D]">
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-[#C81E3D] hover:bg-[#C81E3D] hover:text-white"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <Link href="/privacy-policy" className="hover:text-[#C81E3D]">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#C81E3D]">Terms &amp; Conditions</Link>
            <Link href="/disclaimer" className="hover:text-[#C81E3D]">Disclaimer</Link>
          </div>

          <p className="text-sm text-slate-500">&copy; {siteConfig.year} {siteConfig.name}. All Rights Reserved.</p>
        </div>

        <div className="mt-4 border-t border-slate-200 pt-5 text-center text-sm text-slate-500">
          <p>{siteConfig.legal.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
