import Link from "next/link";
import * as Icons from "lucide-react";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you were looking for does not exist. Browse universities, programmes or use the finder instead.",
  path: "/404",
  noIndex: true,
});

const suggestions = [
  { href: "/find-my-program", label: "Find my programme", icon: Icons.Search },
  { href: "/universities", label: "Browse universities", icon: Icons.Building2 },
  { href: "/compare-programs", label: "Compare programmes", icon: Icons.Scale },
  { href: "/roi-calculator", label: "Run the ROI maths", icon: Icons.Calculator },
  { href: "/scholarships", label: "Check scholarships", icon: Icons.IndianRupee },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-24">
      <div className="max-w-xl text-center space-y-8">
        <div>
          <p className="text-6xl sm:text-8xl font-black text-[#C81E3D]/15 tracking-tight">404</p>
          <h1 className="text-2xl sm:text-4xl font-black text-[#1E293B] tracking-tight -mt-4">
            This page does not exist
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-3">
            The link may be old, or the programme may have been renamed. These are the pages people
            usually want instead.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {suggestions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:border-[#C81E3D]/30 hover:shadow-sm transition-all"
            >
              <span className="w-9 h-9 rounded-lg bg-[#FFF1F2] flex items-center justify-center flex-shrink-0">
                <item.icon size={16} className="text-[#C81E3D]" />
              </span>
              <span className="text-sm font-extrabold text-[#1E293B]">{item.label}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 h-12 px-8 bg-[#C81E3D] text-white font-extrabold rounded-full text-sm shadow-md transition-all active:scale-[0.98]"
        >
          <Icons.Home size={16} />
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
