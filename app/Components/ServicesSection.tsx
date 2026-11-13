import Link from "next/link";
import { ArrowRight, GraduationCap, Building2 } from "lucide-react";
import { learnerServices, edtechServices } from "../data/services";
import ServiceIcon from "./ServiceIcon";

/**
 * "Two divisions, one partner" — learners (online degrees) and
 * EdTech brands (growth & delivery services).
 */
export default function ServicesSection() {
  return (
    <section className="relative w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-12">
          <div>
            <p className="text-[#e0244a] text-[11px] font-black uppercase tracking-[0.2em] mb-3">
              What We Do
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f1f5f9] leading-[1.08] tracking-tight">
              One partner.<br />
              <span className="text-[#e0244a]">Two divisions.</span>
            </h2>
          </div>
          <p className="text-[#8b96a8] text-sm sm:text-base font-medium max-w-md leading-relaxed">
            Half learner-first online degree advisory, half EdTech growth engine — same honest,
            numbers-first team behind both.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Learner division */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-[#2B141A]/60 to-[#14161d] border border-[#e0244a]/25 p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#C81E3D] flex items-center justify-center shadow-[0_8px_20px_rgba(200,30,61,0.4)]">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#e0244a]">Division 01</p>
                <h3 className="text-xl font-extrabold text-[#f1f5f9]">For Learners</h3>
              </div>
            </div>
            <p className="text-[#a8b3c5] text-sm font-medium leading-relaxed mb-6">
              Free expert guidance for anyone comparing online MBAs, BBAs and distance degrees — from counselling to admission to your first role.
            </p>
            <div className="space-y-3">
              {learnerServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-[#10131a]/60 p-4 hover:border-[#e0244a]/40 hover:bg-[#14161d] transition-all"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#e0244a] to-[#ff8a3d] shadow-[0_6px_16px_rgba(224,36,74,0.35)] shrink-0 mt-0.5">
                    <ServiceIcon slug={s.slug} size={17} className="text-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[#f1f5f9] font-bold text-sm group-hover:text-white leading-snug">{s.shortTitle}</span>
                    <span className="block text-[#7c8798] text-xs font-medium mt-1 leading-snug">{s.tagline}</span>
                  </span>
                  <ArrowRight size={16} className="text-[#6b7688] group-hover:text-[#e0244a] group-hover:translate-x-1 transition-all ml-auto shrink-0 self-center" />
                </Link>
              ))}
            </div>
            <Link href="/programs" className="mt-6 inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl border border-[#e0244a]/40 text-[#e0244a] font-bold text-sm hover:bg-[#C81E3D] hover:text-white hover:border-[#C81E3D] transition-all">
              Browse Online Courses &amp; Degrees
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* EdTech division */}
          <div className="lg:col-span-8 rounded-3xl bg-[#14161d] border border-white/5 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#22252f] border border-white/10 flex items-center justify-center">
                <Building2 size={22} className="text-[#f1f5f9]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8b96a8]">Division 02</p>
                <h3 className="text-xl font-extrabold text-[#f1f5f9]">For EdTech Brands, Universities &amp; BPOs</h3>
              </div>
            </div>
            <p className="text-[#a8b3c5] text-sm font-medium leading-relaxed mb-5">
              The growth engine behind education brands — strategy, performance marketing, lead generation, web &amp; CRM development and BPO calling, accountable to cost-per-admission.
            </p>
            {/* Lead-generation spotlight */}
            <Link
              href="/services/lead-generation"
              className="group flex flex-col gap-3 rounded-2xl border border-[#e0244a]/35 bg-gradient-to-r from-[#e0244a]/15 via-[#14161d] to-[#14161d] p-4 sm:p-5 mb-4 transition-all hover:border-[#e0244a]/60 hover:shadow-[0_15px_40px_rgba(224,36,74,0.2)]"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#C81E3D] to-[#ff5a3c] px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
                Most Asked For
              </span>
              <span className="flex items-center justify-between gap-3">
                <span>
                  <span className="block text-base sm:text-lg font-extrabold text-[#f5f7fa] leading-snug">Lead Generation &amp; Sales Solutions</span>
                  <span className="mt-1 block text-[11px] sm:text-xs font-medium text-[#a8b3c5]">CRM-ready, counsellor-qualified leads — you pay for admissions, not junk enquiries.</span>
                </span>
                <ArrowRight size={22} className="flex-shrink-0 text-[#e0244a] transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {edtechServices.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-2xl border border-white/5 bg-[#10131a]/70 p-5 hover:border-[#e0244a]/35 hover:bg-[#16181f] transition-all flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] shadow-[0_8px_20px_rgba(224,36,74,0.35)]">
                      <ServiceIcon slug={s.slug} size={20} className="text-white" />
                    </span>
                    <span className="text-[10px] font-black text-[#e0244a]/80 tracking-widest">0{i + 1}</span>
                  </div>
                  <span className="mt-4 text-[#f1f5f9] font-extrabold text-sm leading-snug">{s.shortTitle}</span>
                  <span className="text-[#7c8798] text-[11px] font-medium mt-1.5 leading-snug">{s.tagline}</span>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[#e0244a] text-xs font-bold">
                    Learn more <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/services" className="mt-6 inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#C81E3D] hover:bg-[#B01A33] text-white font-bold text-sm transition-all shadow-[0_10px_25px_rgba(200,30,61,0.3)]">
              Explore All Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
