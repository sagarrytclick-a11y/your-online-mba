"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, LogOut, Check } from "lucide-react";

const IDLE_LIMIT_MS = 30 * 60 * 1000; // auto logout after 30 minutes of inactivity
const WARN_AFTER_MS = 25 * 60 * 1000; // warn 5 minutes before logout

/**
 * Admin session guard — watches user activity (mouse, keyboard, scroll, touch).
 * If idle for 25 minutes a warning banner appears with a "Stay logged in" button;
 * after 30 minutes of inactivity the session is cleared and the user is sent to
 * /admin/login?expired=1. The JWT also has a hard 2-hour absolute expiry server-side.
 */
export default function AdminSessionGuard() {
  const router = useRouter();
  const [warned, setWarned] = useState(false);
  const lastActivity = useRef<number>(0);
  const idleTimer = useRef<number | null>(null);
  const warnTimer = useRef<number | null>(null);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      /* ignore — redirect anyway */
    }
    router.push("/admin/login?expired=1");
    router.refresh();
  }, [router]);

  const resetTimers = useCallback(() => {
    lastActivity.current = Date.now();
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    if (warnTimer.current) window.clearTimeout(warnTimer.current);
    warnTimer.current = window.setTimeout(() => setWarned(true), WARN_AFTER_MS);
    idleTimer.current = window.setTimeout(() => void logout(), IDLE_LIMIT_MS);
  }, [logout]);

  const handleStay = useCallback(() => {
    setWarned(false);
    resetTimers();
  }, [resetTimers]);

  useEffect(() => {
    // Arm the idle timers from a frame callback — avoids cascading renders
    const frame = requestAnimationFrame(() => {
      resetTimers();
      setWarned(false);
    });

    const onActivity = () => {
      // Throttle — only reset if it's been at least 2s since last activity check
      if (Date.now() - lastActivity.current > 2000) {
        resetTimers();
      }
    };
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click", "focus"];

    const throttled = throttle(onActivity, 1000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") resetTimers();
    };
    events.forEach((event) => window.addEventListener(event, throttled, { passive: true }));
    window.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      events.forEach((event) => window.removeEventListener(event, throttled));
      window.removeEventListener("visibilitychange", onVisibility);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      if (warnTimer.current) window.clearTimeout(warnTimer.current);
    };
  }, [resetTimers]);

  if (!warned) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
      <div
        role="alert"
        className="flex items-center gap-3 rounded-2xl border border-amber-400/30 bg-[#1b1e27]/95 p-4 shadow-2xl backdrop-blur"
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
          <AlertTriangle size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-wider text-amber-400">Inactivity warning</p>
          <p className="mt-0.5 text-xs font-medium text-[#c4cbd8]">
            Session expires in <span className="font-extrabold text-white">5 minutes</span>
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={handleStay}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#C81E3D] to-[#ff5a3c] px-3 text-[11px] font-extrabold text-white"
          >
            <Check size={13} /> Stay
          </button>
          <button
            onClick={() => void logout()}
            aria-label="Log out now"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#a8b3c5] hover:text-white"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function throttle<T extends (...args: never[]) => void>(fn: T, wait: number) {
  let last = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}
