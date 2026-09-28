import React from "react";
import * as Icons from "lucide-react";

interface RatingStarsProps {
  value: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: string;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  value,
  size = 14,
  showValue = true,
  reviewCount,
  className = "",
}) => {
  const clamped = Math.min(5, Math.max(0, value));
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.min(1, Math.max(0, clamped - i));
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Icons.Star size={size} className="absolute inset-0 text-slate-200 fill-slate-200" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Icons.Star
                  size={size}
                  className="text-yellow-400 fill-yellow-400"
                  style={{ maxWidth: "none" }}
                />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-extrabold text-[#1E293B]">{value.toFixed(1)}</span>
      )}
      {reviewCount && (
        <span className="text-[11px] font-semibold text-slate-400">({reviewCount})</span>
      )}
      <span className="sr-only">
        Rated {value.toFixed(1)} out of 5{reviewCount ? ` from ${reviewCount} reviews` : ""}
      </span>
    </div>
  );
};

export default RatingStars;
