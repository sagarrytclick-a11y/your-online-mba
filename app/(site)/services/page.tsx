import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Building2, CheckCircle2 } from "lucide-react";
import { learnerServices, edtechServices } from "@/app/data/services";
import { buildMetadata, breadcrumbJsonLd } from "@/app/lib/seo";
import { siteConfig } from "@/app/data/site";
import { SITE_URL } from "@/app/lib/seo";
import JsonLd from "@/app/Components/JsonLd";
import ServiceIcon from "@/app/Components/ServiceIcon";
import ServiceLeadForm from "@/app/Components/ServiceLeadForm";

export const metadata: Metadata = buildMetadata({
  title: "Services — Online MBA Counselling & EdTech Growth Partner",
  description:
    "Two divisions, one partner: free online MBA counselling & career support for learners, and consulting, performance marketing, lead generation, web/CRM development, BPO partnerships & AI lead qualification for EdTech brands and universities.",
  path: "/services",
  keywords: [
    "online MBA counselling service",
    "online MBA admission assistance",
    "edtech consulting company India",
    "education performance marketing agency",
    "online MBA lead generation",
    "edtech website development",
    "edtech BPO partnership",
    "AI lead qualification",
  ],
});

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Your Online MBA — Services",
  itemListElement: [...learnerServices, ...edtechServices].map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `${SITE_URL}/services/${s.slug}`,
  })),
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.city,
    addressRegion: siteConfig.state,
    postalCode: "201301",
    addressCountry: "IN",
  },
  areaServed: "IN",
  priceRange: "Free consultation",
};

export default function ServicesPage() {
  return (
    <div className="w-full bg-[#0b0d12] text-[#f1f5f9]">
      <JsonLd data={itemListSchema} />
      <JsonLd data={professionalServiceSchema} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(900px 400px at 80% -10%, rgba(200,30,61,0.22), transparent 60%), radial-gradient(700px 400px at -10% 30%, rgba(200,30,61,0.12), transparent 55%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 text-center">
          <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.22em] mb-4">
            Our Services
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight max-w-4xl mx-auto">
            One partner.{" "}
            <span className="text-[#e0244a]">Two divisions.</span>
          </h1>
          <p className="mt-6 text-[#a8b3c5] text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Free guidance for learners choosing the right online degree — and a
            full-stack growth partner for EdTech brands, universities and BPO
            call centers serious about admissions.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-[#c4cbd8]">
            {["Free consultation", "Response within 1 business day", "No obligation"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <CheckCircle2 size={14} className="text-[#e0244a]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Learner division */}
      <section id="learners" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#C81E3D] flex items-center justify-center">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e0244a]">Division 01 · For Learners</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Online Courses &amp; Degree Services</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {learnerServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-3xl border border-white/5 bg-[#14161d] p-6 sm:p-7 hover:border-[#e0244a]/40 transition-all flex flex-col"
            >
              <ServiceIcon slug={s.slug} size={26} className="text-[#e0244a] mb-4" />
              <h3 className="text-lg sm:text-xl font-extrabold leading-snug group-hover:text-white">{s.title}</h3>
              <p className="text-[#8b96a8] text-sm font-medium mt-2 leading-relaxed">{s.tagline}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[#e0244a] text-sm font-bold">
                View service <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-[#e0244a]/20 bg-[#2B141A]/40 px-5 py-4 text-sm text-[#c4cbd8] font-medium flex flex-wrap items-center justify-between gap-3">
          <span>Looking to compare actual programs instead? Browse 200+ UGC-approved online courses.</span>
          <Link href="/programs" className="inline-flex items-center gap-2 text-[#e0244a] font-bold hover:text-white transition-colors">
            Explore online degrees <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* EdTech division */}
      <section id="edtech-brands" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#22252f] border border-white/10 flex items-center justify-center">
            <Building2 size={22} className="text-[#f1f5f9]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b96a8]">Division 02 · For EdTech Brands &amp; Universities</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Growth &amp; Delivery Services</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {edtechServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-3xl border border-white/5 bg-[#14161d] p-6 hover:border-[#e0244a]/40 transition-all flex flex-col"
            >
              <ServiceIcon slug={s.slug} size={24} className="text-[#e0244a] mb-4" />
              <h3 className="text-base sm:text-lg font-extrabold leading-snug group-hover:text-white">{s.shortTitle}</h3>
              <p className="text-[#8b96a8] text-xs sm:text-sm font-medium mt-2 leading-relaxed">{s.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[#e0244a] text-xs sm:text-sm font-bold">
                View service <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Lead form */}
      <section id="enquire" className="border-t border-white/5 bg-[#10131a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.2em] mb-3">Let&apos;s Talk</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1]">
              Tell us where you&apos;re stuck.<br />
              <span className="text-[#e0244a]">We&apos;ll tell you what we&apos;d do.</span>
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-[#a8b3c5] font-medium">
              {[
                "A specific take on your funnel, site or calling setup",
                "Cost-per-admission benchmarks from 100+ campaigns",
                "No template pitch — a diagnosis, not a deck",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#e0244a] mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ServiceLeadForm />
        </div>
      </section>
    </div>
  );
}
