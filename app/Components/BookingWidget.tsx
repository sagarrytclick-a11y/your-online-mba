"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import {
  generateSlots,
  groupSlotsByDate,
  buildWhatsAppBookingLink,
  type CounsellingSlot,
} from "../lib/slots";
import PopupTrigger from "./PopupTrigger";

const COUNSELLOR_WHATSAPP = "919999999999";

const modes: Array<CounsellingSlot["mode"] | "All modes"> = [
  "All modes",
  "Video call",
  "Phone call",
  "WhatsApp",
];

const BookingWidget: React.FC = () => {
  const [mode, setMode] = useState<CounsellingSlot["mode"] | "All modes">("All modes");
  const [dayOffset, setDayOffset] = useState(0);
  const [selected, setSelected] = useState<CounsellingSlot | null>(null);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Slots are derived from a fixed anchor so server and client markup agree; the
  // user can page forward through the next 14 days.
  const anchor = useMemo(() => new Date("2026-01-05T00:00:00"), []);
  const allSlots = useMemo(() => {
    const base = new Date(anchor);
    base.setDate(base.getDate() + dayOffset);
    return generateSlots(base, 2);
  }, [anchor, dayOffset]);

  const days = useMemo(() => groupSlotsByDate(allSlots), [allSlots]);

  const filteredDays = useMemo(
    () =>
      days
        .map((d) => ({
          ...d,
          slots: d.slots.filter((s) => mode === "All modes" || s.mode === mode),
        }))
        .filter((d) => d.slots.length > 0),
    [days, mode]
  );

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed && selected) {
    const wa = buildWhatsAppBookingLink(COUNSELLOR_WHATSAPP, selected, name || undefined);
    return (
      <div className="bg-[#14161d] rounded-3xl border border-white/10 p-8 sm:p-10 shadow-sm text-center space-y-5">
        <span className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center mx-auto">
          <Icons.CalendarCheck size={28} className="text-emerald-400" />
        </span>
        <div>
          <h3 className="text-xl font-black text-[#F1F5F9]">Slot confirmed</h3>
          <p className="text-sm text-[#8b96a8] font-medium mt-2 max-w-md mx-auto">
            {selected.dayName}, {selected.dateLabel} at {selected.time} with {selected.counsellor}
            {" "}over {selected.mode.toLowerCase()}. You will get a joining link on WhatsApp.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-7 bg-[#25D366] text-white font-extrabold rounded-full text-sm inline-flex items-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            <Icons.MessageCircle size={16} />
            Add to WhatsApp calendar
          </a>
          <button
            type="button"
            onClick={() => {
              setConfirmed(false);
              setSelected(null);
            }}
            className="h-12 px-7 border-2 border-white/10 text-[#8b96a8] font-extrabold rounded-full text-sm transition-all hover:border-white/15"
          >
            Book another slot
          </button>
        </div>
        <p className="text-[11px] text-[#7c8798] font-semibold pt-2">
          Please save the date. Counsellors reschedule free of charge up to 4 hours before the slot.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-[#14161d] rounded-3xl border border-white/10 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-[#F1F5F9] flex items-center gap-2">
              <Icons.CalendarDays size={17} className="text-[#C81E3D]" />
              Pick a slot
            </h3>
            <p className="text-xs text-[#8b96a8] font-medium mt-1">
              20-minute call, no cost, no obligation to enrol.
            </p>
          </div>
          <div className="flex gap-1.5">
            {modes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-all ${
                  mode === m ? "bg-slate-800 text-white" : "bg-[#10131A] text-[#8b96a8] hover:text-[#f1f5f9]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setDayOffset((d) => Math.max(0, d - 2))}
            disabled={dayOffset === 0}
            aria-label="Previous days"
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-[#8b96a8] hover:border-[#C81E3D] hover:text-[#C81E3D] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icons.ChevronLeft size={16} />
          </button>
          <p className="text-xs font-extrabold text-[#7c8798] uppercase tracking-wider">
            {dayOffset === 0 ? "Next available" : `+${dayOffset} days`}
          </p>
          <button
            type="button"
            onClick={() => setDayOffset((d) => Math.min(12, d + 2))}
            disabled={dayOffset >= 12}
            aria-label="Later days"
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-[#8b96a8] hover:border-[#C81E3D] hover:text-[#C81E3D] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icons.ChevronRight size={16} />
          </button>
        </div>

        {filteredDays.length === 0 ? (
          <p className="text-sm text-[#8b96a8] font-semibold text-center py-8">
            No {mode.toLowerCase()} slots on these days. Try another mode or the next date.
          </p>
        ) : (
          <div className="space-y-5">
            {filteredDays.map((day) => (
              <div key={day.date} className="space-y-2.5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#7c8798]">
                  {day.slots[0].dayName}, {day.label}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {day.slots.map((slot) => {
                    const isSelected = selected?.id === slot.id;
                    const full = slot.seatsLeft === 0;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={full}
                        onClick={() => setSelected(slot)}
                        className={`rounded-xl border px-3 py-3 text-left transition-all ${
                          isSelected
                            ? "border-[#C81E3D] bg-[#2B141A] ring-2 ring-[#e0244a]/25"
                            : "border-white/10 hover:border-[#C81E3D] hover:bg-[#2B141A]"
                        } ${full ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        <span className="block text-xs font-black text-[#F1F5F9]">{slot.time}</span>
                        <span className="block text-[9px] font-bold text-[#7c8798] mt-0.5">
                          {slot.mode}
                        </span>
                        <span
                          className={`block text-[9px] font-extrabold mt-1 ${
                            slot.seatsLeft === 1 ? "text-amber-400" : "text-emerald-400"
                          }`}
                        >
                          {full ? "Full" : `${slot.seatsLeft} left`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="bg-[#14161d] rounded-3xl border-2 border-[#C81E3D]/30 p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#F1F5F9]">Confirm your slot</h3>
              <p className="text-xs text-[#8b96a8] font-semibold mt-1">
                {selected.dayName}, {selected.dateLabel} · {selected.time} · {selected.counsellor}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Clear selection"
              className="w-8 h-8 rounded-full bg-[#1b1e27] flex items-center justify-center text-[#8b96a8] hover:bg-[#22252f] transition-colors"
            >
              <Icons.X size={14} />
            </button>
          </div>

          <div>
            <label
              htmlFor="booking-name"
              className="block text-[10px] font-extrabold uppercase tracking-wider text-[#7c8798] mb-2"
            >
              Your name (optional)
            </label>
            <input
              id="booking-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="So the counsellor knows who to expect"
              className="w-full h-12 px-4 rounded-xl border border-white/10 text-sm font-bold text-[#F1F5F9] placeholder:text-[#7c8798] focus:border-[#C81E3D] focus:ring-2 focus:ring-[#e0244a]/25 outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="w-full h-13 py-4 bg-[#C81E3D] text-white font-extrabold rounded-xl text-sm shadow-md transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2"
          >
            <Icons.Check size={16} />
            Confirm this slot
          </button>
          <p className="text-[10px] text-[#7c8798] font-semibold text-center">
            Prefer to talk now?{" "}
            <Link href="/contact-us" className="text-[#C81E3D] font-extrabold hover:underline">
              Send a WhatsApp message instead
            </Link>
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <PopupTrigger className="flex-1 h-12 border-2 border-[#C81E3D] text-[#C81E3D] font-extrabold rounded-full text-sm transition-all hover:bg-[#C81E3D] hover:text-white inline-flex items-center justify-center gap-2">
          <Icons.Phone size={16} />
          Request a callback
        </PopupTrigger>
        <Link
          href="/student/dashboard"
          className="flex-1 h-12 border-2 border-white/10 text-[#8b96a8] font-extrabold rounded-full text-sm transition-all hover:border-white/15 inline-flex items-center justify-center gap-2"
        >
          <Icons.FolderOpen size={16} />
          Track my application
        </Link>
      </div>
    </div>
  );
};

export default BookingWidget;
