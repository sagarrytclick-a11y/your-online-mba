export interface CounsellingSlot {
  id: string;
  /** ISO date, yyyy-mm-dd */
  date: string;
  /** Display date, e.g. "Mon, 14 Sep" */
  dateLabel: string;
  dayName: string;
  time: string;
  /** 24h time used for the WhatsApp deep link. */
  isoStart: string;
  mode: "Video call" | "Phone call" | "WhatsApp";
  seatsLeft: number;
  counsellor: string;
}

const TIME_SLOTS: { time: string; hour: number; minute: number }[] = [
  { time: "10:00 AM", hour: 10, minute: 0 },
  { time: "11:30 AM", hour: 11, minute: 30 },
  { time: "1:00 PM", hour: 13, minute: 0 },
  { time: "2:30 PM", hour: 14, minute: 30 },
  { time: "4:00 PM", hour: 16, minute: 0 },
  { time: "5:30 PM", hour: 17, minute: 30 },
  { time: "7:00 PM", hour: 19, minute: 0 },
  { time: "8:30 PM", hour: 20, minute: 30 },
];

const COUNSELLORS = [
  "Amit Verma",
  "Sneha Joshi",
  "Rahul Saxena",
  "Farah Khan",
  "Vikram Menon",
];

/** Deterministic pseudo-random in [0, 1) so server and client render identically. */
function hashUnit(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function generateSlots(startDate: Date, days = 7): CounsellingSlot[] {
  const slots: CounsellingSlot[] = [];

  for (let d = 0; d < days; d += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + d);
    const isWeekend = date.getDay() === 0;
    const iso = toIsoDate(date);
    const dayName = date.toLocaleDateString("en-IN", { weekday: "short" });
    const dateLabel = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

    TIME_SLOTS.forEach((slot, index) => {
      // Weekends offer fewer slots, matching how the counselling team works.
      if (isWeekend && index % 2 === 1) return;

      const seed = `${iso}-${slot.time}`;
      const unit = hashUnit(seed);
      // Sundays are closed, and a few slots across the week are already booked.
      if (date.getDay() === 0) return;
      if (unit > 0.82) return;

      const seatsLeft = unit > 0.7 ? 1 : 3;
      const mode: CounsellingSlot["mode"] = isWeekend
        ? "Phone call"
        : index % 3 === 2
          ? "WhatsApp"
          : "Video call";

      slots.push({
        id: seed,
        date: iso,
        dateLabel,
        dayName,
        time: slot.time,
        isoStart: `${iso}T${String(slot.hour).padStart(2, "0")}:${String(slot.minute).padStart(2, "0")}:00`,
        mode,
        seatsLeft,
        counsellor: COUNSELLORS[Math.floor(hashUnit(`${seed}-c`) * COUNSELLORS.length)],
      });
    });
  }

  return slots;
}

export function groupSlotsByDate(slots: CounsellingSlot[]): { date: string; label: string; slots: CounsellingSlot[] }[] {
  const map = new Map<string, { date: string; label: string; slots: CounsellingSlot[] }>();
  for (const slot of slots) {
    const existing = map.get(slot.date);
    if (existing) {
      existing.slots.push(slot);
    } else {
      map.set(slot.date, { date: slot.date, label: slot.dateLabel, slots: [slot] });
    }
  }
  return Array.from(map.values());
}

export function buildWhatsAppBookingLink(
  phoneE164: string,
  slot: CounsellingSlot,
  name?: string
): string {
  const message = [
    `Hi${name ? ` ${name}` : ""}, I have booked a counselling slot on ${siteDateLabel(slot.isoStart)} at ${slot.time} (${slot.mode}) via Your Online MBA.`,
  ].join("");
  return `https://wa.me/${phoneE164}?text=${encodeURIComponent(message)}`;
}

function siteDateLabel(isoStart: string): string {
  const d = new Date(isoStart);
  if (Number.isNaN(d.getTime())) return isoStart;
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}
