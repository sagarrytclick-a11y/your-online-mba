"use client";
import Link from "next/link";
import * as Icons from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep the digest in the console so a failing route can be traced in production.
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-24">
      <div className="max-w-lg text-center space-y-6">
        <span className="w-16 h-16 rounded-full bg-[#FFF1F2] flex items-center justify-center mx-auto">
          <Icons.TriangleAlert size={28} className="text-[#C81E3D]" />
        </span>
        <div>
          <h1 className="text-2xl font-black text-[#1E293B] tracking-tight">
            Something went wrong on our side
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-2">
            This is not your fault. Try again, and if it keeps happening our counsellors can look at
            the page for you.
          </p>
          {error.digest && (
            <p className="text-[10px] text-slate-400 font-semibold mt-2">Ref: {error.digest}</p>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="h-12 px-7 bg-[#C81E3D] text-white font-extrabold rounded-full text-sm shadow-md transition-all active:scale-[0.98] inline-flex items-center gap-2"
          >
            <Icons.RotateCcw size={16} />
            Try again
          </button>
          <Link
            href="/"
            className="h-12 px-7 border-2 border-slate-200 text-slate-500 font-extrabold rounded-full text-sm transition-all hover:border-slate-300 inline-flex items-center gap-2"
          >
            <Icons.Home size={16} />
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
