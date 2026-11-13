"use client";

import React from "react";
import { Check, ChevronDown, Loader2, PhoneCall } from "lucide-react";
import { SERVICE_OPTIONS } from "../lib/validation";
import { useCounsellingForm } from "../lib/use-counselling-form";

/**
 * Lead form for service enquiries (agencies / EdTech brands / universities).
 * Posts to /api/send-counselling with enquiryType="service" so leads land in
 * the same admin panel & inbox as course leads, under "Service Leads".
 */
export default function ServiceLeadForm({
  defaultService = "",
  heading = "Get a Free Strategy Callback",
  subheading = "Tell us what you need — we respond within one business day.",
}: {
  defaultService?: string;
  heading?: string;
  subheading?: string;
}) {
  const {
    form,
    loading,
    submitted,
    error,
    fieldErrors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useCounsellingForm({ enquiryType: "service", defaultService });

  return (
    <div className="bg-[#14161d] border border-[#C81E3D]/40 rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <h3 className="text-[#f1f5f9] text-lg sm:text-xl font-extrabold tracking-tight">
        {heading}
      </h3>
      <p className="text-[#8b96a8] text-xs sm:text-sm font-medium mt-1.5 mb-5">
        {subheading}
      </p>

      {submitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-14 h-14 bg-[#2B141A] rounded-full flex items-center justify-center mx-auto">
            <Check size={28} className="text-[#e0244a] stroke-[3]" />
          </div>
          <h4 className="text-[#f1f5f9] font-bold text-lg">Request received!</h4>
          <p className="text-[#8b96a8] text-sm font-medium">
            Our team will reach out within one business day.
          </p>
        </div>
      ) : (
        <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
          <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" onChange={handleChange} value={form.website} />
          <div>
            <input
              name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
              type="text" autoComplete="name" maxLength={60} placeholder="Full name *"
              className="w-full h-12 px-4 border border-white/10 rounded-[10px] bg-[#10131a] text-sm text-[#f1f5f9] placeholder-[#6b7688] outline-none focus:border-[#C81E3D] focus:ring-1 focus:ring-[#C81E3D]/30 transition-all font-medium"
            />
            {fieldErrors.name && <p className="text-[#e0244a] text-xs font-semibold mt-1">{fieldErrors.name}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <input
                name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur}
                type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="Phone *"
                className="w-full h-12 px-4 border border-white/10 rounded-[10px] bg-[#10131a] text-sm text-[#f1f5f9] placeholder-[#6b7688] outline-none focus:border-[#C81E3D] focus:ring-1 focus:ring-[#C81E3D]/30 transition-all font-medium"
              />
              {fieldErrors.phone && <p className="text-[#e0244a] text-xs font-semibold mt-1">{fieldErrors.phone}</p>}
            </div>
            <div>
              <input
                name="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                type="email" autoComplete="email" maxLength={100} placeholder="Work email *"
                className="w-full h-12 px-4 border border-white/10 rounded-[10px] bg-[#10131a] text-sm text-[#f1f5f9] placeholder-[#6b7688] outline-none focus:border-[#C81E3D] focus:ring-1 focus:ring-[#C81E3D]/30 transition-all font-medium"
              />
              {fieldErrors.email && <p className="text-[#e0244a] text-xs font-semibold mt-1">{fieldErrors.email}</p>}
            </div>
          </div>
          <div className="relative">
            <select
              name="service" value={form.service} onChange={handleChange} onBlur={handleBlur}
              className="w-full h-12 px-4 pr-10 border border-white/10 rounded-[10px] bg-[#10131a] appearance-none outline-none focus:border-[#C81E3D] transition-all font-medium text-sm text-[#f1f5f9]"
            >
              <option value="" disabled>Which service do you need? *</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#7c8798]">
              <ChevronDown size={16} />
            </div>
            {fieldErrors.service && <p className="text-[#e0244a] text-xs font-semibold mt-1">{fieldErrors.service}</p>}
          </div>
          <div>
            <input
              name="city" value={form.city} onChange={handleChange} onBlur={handleBlur}
              type="text" autoComplete="address-level2" maxLength={50} placeholder="City *"
              className="w-full h-12 px-4 border border-white/10 rounded-[10px] bg-[#10131a] text-sm text-[#f1f5f9] placeholder-[#6b7688] outline-none focus:border-[#C81E3D] focus:ring-1 focus:ring-[#C81E3D]/30 transition-all font-medium"
            />
            {fieldErrors.city && <p className="text-[#e0244a] text-xs font-semibold mt-1">{fieldErrors.city}</p>}
          </div>
          {error && <p className="text-[#e0244a] text-xs font-semibold text-center">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="w-full h-13 sm:h-14 py-4 bg-[#C81E3D] hover:bg-[#B01A33] text-white font-bold rounded-[12px] transition-all active:scale-[0.98] text-base tracking-wide flex items-center justify-center gap-2 disabled:opacity-70 shadow-[0_12px_30px_rgba(200,30,61,0.35)]"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <PhoneCall size={18} />}
            {loading ? "Sending..." : "Request My Callback"}
          </button>
          <p className="text-[10px] text-[#6b7688] text-center leading-relaxed pt-1">
            No obligation. We&apos;ll only use your details to schedule the callback.
          </p>
        </form>
      )}
    </div>
  );
}
