"use client";
import React, { useCallback, useEffect } from "react";
import {
  X,
  ChevronDown,
  Check,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Clock3,
  CheckCheck,
  Search,
  Building2,
} from "lucide-react";
import { usePopupForm } from "../context/PopupFormContext";
import { SPECIALIZATION_OPTIONS, SERVICE_OPTIONS } from "../lib/validation";
import { useCounsellingForm } from "../lib/use-counselling-form";

const inputClass =
  "w-full h-12 px-4 border border-white/10 rounded-xl text-sm text-[#f1f5f9] placeholder-[#6b7688] bg-[#0b0d12] outline-none focus:border-[#e0244a] focus:ring-1 focus:ring-[#e0244a]/30 focus:bg-[#10131a] transition-all font-medium";

const selectClass =
  "w-full h-12 px-4 pr-10 border border-white/10 rounded-xl text-sm text-[#a8b3c5] bg-[#0b0d12] appearance-none outline-none focus:border-[#e0244a] focus:ring-1 focus:ring-[#e0244a]/30 transition-all font-medium";

const submitClass =
  "w-full h-14 bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white text-base sm:text-lg font-extrabold rounded-xl shadow-[0_14px_38px_rgba(224,36,74,0.45)] hover:brightness-110 hover:shadow-[0_14px_44px_rgba(224,36,74,0.6)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70";

/** Success state shared by both popup variants. */
function SuccessPanel({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="relative py-10 text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#C81E3D] to-[#ff5a3c] flex items-center justify-center shadow-[0_12px_35px_rgba(224,36,74,0.45)] animate-modal-in">
        <CheckCheck size={30} className="text-white" />
      </div>
      <h3 className="text-[#f5f7fa] font-extrabold text-2xl tracking-tight">{title}</h3>
      <p className="text-[#8b96a8] text-sm font-medium max-w-[300px] mx-auto">{message}</p>
      <button
        onClick={onClose}
        className="mt-2 px-8 h-12 bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] hover:brightness-110 text-white font-extrabold rounded-full transition-all text-sm shadow-[0_10px_30px_rgba(224,36,74,0.4)]"
      >
        Done
      </button>
    </div>
  );
}

/** Free MBA counselling form (learners). */
function LearnerPopupBody({ onClose }: { onClose: () => void }) {
  const {
    form,
    loading,
    submitted,
    error,
    fieldErrors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useCounsellingForm({ onSuccess: onClose, resetDelayMs: 5000 });

  if (submitted) {
    return (
      <SuccessPanel
        title="You're on the list!"
        message="Our expert will reach out within ~15 minutes (Mon–Sat, 9am–8pm)."
        onClose={onClose}
      />
    );
  }

  return (
    <div className="relative">
      {/* Eyebrow + heading */}
      <span className="inline-flex max-w-[calc(100%-2.25rem)] items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-3 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.14em] sm:tracking-[0.2em] leading-tight text-[#ff5c7a]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
        Free · 15-Min Strategy Call
      </span>
      <h3
        id="popup-form-title"
        className="mt-3 text-[#f5f7fa] text-2xl sm:text-[28px] font-extrabold tracking-tight leading-[1.15]"
      >
        Get your Online MBA<br />plan,{" "}
        <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">
          today.
        </span>
      </h3>
      <p className="mt-1.5 text-[#8b96a8] text-xs sm:text-sm font-medium">
        Tell us who you are — we&apos;ll show what&apos;s working for students like you.
      </p>

      <form className="mt-5 space-y-3" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="website"
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              name="name" autoFocus
              value={form.name} onChange={handleChange} onBlur={handleBlur}
              type="text" autoComplete="name" maxLength={60} placeholder="Full name *"
              className={inputClass}
            />
            {fieldErrors.name && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.name}</p>}
          </div>
          <div>
            <input
              name="phone"
              value={form.phone} onChange={handleChange} onBlur={handleBlur}
              type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="Mobile number *"
              className={inputClass}
            />
            {fieldErrors.phone && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.phone}</p>}
          </div>
        </div>
        <div>
          <input
            name="email"
            value={form.email} onChange={handleChange} onBlur={handleBlur}
            type="email" autoComplete="email" maxLength={100} placeholder="Work / personal email *"
            className={inputClass}
          />
          {fieldErrors.email && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.email}</p>}
        </div>
        <div className="relative">
          <select
            name="specialization"
            value={form.specialization} onChange={handleChange} onBlur={handleBlur}
            className={selectClass}
          >
            <option value="" disabled>I&apos;m interested in *</option>
            {SPECIALIZATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#7c8798]">
            <ChevronDown size={16} />
          </div>
          {fieldErrors.specialization && (
            <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.specialization}</p>
          )}
        </div>
        <div>
          <input
            name="city"
            value={form.city} onChange={handleChange} onBlur={handleBlur}
            type="text" autoComplete="address-level2" maxLength={50} placeholder="City *"
            className={inputClass}
          />
          {fieldErrors.city && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.city}</p>}
        </div>
        {error && <p className="text-[#ff5c7a] text-xs font-semibold text-center">{error}</p>}

        <button type="submit" disabled={loading} className={submitClass}>
          {loading ? <Loader2 size={19} className="animate-spin" /> : <ArrowRight size={19} />}
          {loading ? "Sending..." : "Get My Free MBA Plan"}
        </button>

        {/* Trust ticks */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-1 text-[10px] sm:text-[11px] font-bold text-[#7c8798]">
          <span className="inline-flex items-center gap-1.5"><Clock3 size={11} className="text-[#e0244a]" /> Reply within 15 min</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={11} className="text-[#e0244a]" /> No spam, ever</span>
          <span className="inline-flex items-center gap-1.5"><Check size={11} className="text-[#e0244a]" /> UGC-DEB only</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-[#6b7688] text-center leading-relaxed">
          By submitting, you agree to be contacted by Your Online MBA by call, WhatsApp, SMS or email about your enquiry.
        </p>
      </form>
    </div>
  );
}

/** EdTech growth-audit form (brands). */
function ServicePopupBody({ onClose }: { onClose: () => void }) {
  const {
    form,
    loading,
    submitted,
    error,
    fieldErrors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useCounsellingForm({
    enquiryType: "service",
    defaultService: "Lead Generation & Sales Solutions",
    onSuccess: onClose,
    resetDelayMs: 6000,
  });

  if (submitted) {
    return (
      <SuccessPanel
        title="Audit request received!"
        message="Our growth team reviews your funnel and replies with a specific point of view within one business day."
        onClose={onClose}
      />
    );
  }

  return (
    <div className="relative">
      {/* Eyebrow + heading */}
      <span className="inline-flex max-w-[calc(100%-2.25rem)] items-center gap-2 rounded-full border border-[#e0244a]/30 bg-[#e0244a]/10 px-3 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.14em] sm:tracking-[0.2em] leading-tight text-[#ff5c7a]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />
        Free · EdTech Growth Audit
      </span>
      <h3
        id="popup-form-title"
        className="mt-3 text-[#f5f7fa] text-2xl sm:text-[28px] font-extrabold tracking-tight leading-[1.15]"
      >
        Get your growth<br />audit,{" "}
        <span className="bg-gradient-to-r from-[#ff4d6d] via-[#e0244a] to-[#ff8a3d] bg-clip-text text-transparent">
          free.
        </span>
      </h3>
      <p className="mt-1.5 text-[#8b96a8] text-xs sm:text-sm font-medium">
        Tell us about your funnel — we reply within one business day with a specific point of view, not a generic deck.
      </p>

      <form className="mt-5 space-y-3" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="website"
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              name="name" autoFocus
              value={form.name} onChange={handleChange} onBlur={handleBlur}
              type="text" autoComplete="name" maxLength={60} placeholder="Full name *"
              className={inputClass}
            />
            {fieldErrors.name && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.name}</p>}
          </div>
          <div>
            <input
              name="phone"
              value={form.phone} onChange={handleChange} onBlur={handleBlur}
              type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="Phone *"
              className={inputClass}
            />
            {fieldErrors.phone && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.phone}</p>}
          </div>
        </div>
        <div>
          <input
            name="email"
            value={form.email} onChange={handleChange} onBlur={handleBlur}
            type="email" autoComplete="email" maxLength={100} placeholder="Work email *"
            className={inputClass}
          />
          {fieldErrors.email && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.email}</p>}
        </div>
        <div className="relative">
          <select
            name="service"
            value={form.service} onChange={handleChange} onBlur={handleBlur}
            className={selectClass}
          >
            <option value="" disabled>Which service do you need? *</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#7c8798]">
            <ChevronDown size={16} />
          </div>
          {fieldErrors.service && (
            <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.service}</p>
          )}
        </div>
        <div>
          <input
            name="city"
            value={form.city} onChange={handleChange} onBlur={handleBlur}
            type="text" autoComplete="address-level2" maxLength={50} placeholder="City *"
            className={inputClass}
          />
          {fieldErrors.city && <p className="text-[#ff5c7a] text-xs font-semibold mt-1">{fieldErrors.city}</p>}
        </div>
        {error && <p className="text-[#ff5c7a] text-xs font-semibold text-center">{error}</p>}

        <button type="submit" disabled={loading} className={submitClass}>
          {loading ? <Loader2 size={19} className="animate-spin" /> : <Search size={19} />}
          {loading ? "Sending..." : "Get My Growth Audit"}
        </button>

        {/* Trust ticks */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-1 text-[10px] sm:text-[11px] font-bold text-[#7c8798]">
          <span className="inline-flex items-center gap-1.5"><Building2 size={11} className="text-[#e0244a]" /> B2B only</span>
          <span className="inline-flex items-center gap-1.5"><Clock3 size={11} className="text-[#e0244a]" /> Reply in 1 business day</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={11} className="text-[#e0244a]" /> No spam, ever</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-[#6b7688] text-center leading-relaxed">
          By submitting, you agree to be contacted by Your Online MBA about your growth enquiry.
        </p>
      </form>
    </div>
  );
}

const PopupForm = () => {
  const { isOpen, close, variant } = usePopupForm();

  const handleClose = useCallback(() => close(), [close]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  // Stop the page behind the modal from scrolling (esp. on phones)
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-3 sm:px-6 py-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-form-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-overlay-in" onClick={handleClose} />

      {/* Gradient border wrapper */}
      <div className="animate-modal-in relative w-full max-w-md max-h-[92dvh] overflow-y-auto overscroll-contain rounded-[28px] p-[1.5px] bg-gradient-to-br from-[#e0244a]/70 via-white/10 to-transparent shadow-[0_40px_90px_rgba(0,0,0,0.65),0_0_80px_rgba(224,36,74,0.15)]">
        <div className="relative rounded-[26.5px] bg-[#10131a]/97 backdrop-blur-xl p-5 sm:p-7 overflow-hidden">
          {/* Ambient corner glow inside panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(224,36,74,0.28), transparent 65%)" }}
          />

          <button
            onClick={handleClose}
            aria-label="Close form"
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:rotate-90 transition-all duration-300"
          >
            <X size={16} className="text-[#c4cbd8]" />
          </button>

          {variant === "service" ? (
            <ServicePopupBody onClose={handleClose} />
          ) : (
            <LearnerPopupBody onClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
