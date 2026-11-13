import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
  titleClassName?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
  className = "",
  titleClassName = "",
}) => {
  const isCenter = align === "center";
  const isOnColor = theme === "dark";
  return (
    <div
      className={`${isCenter ? "mx-auto text-center" : "text-left"} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] ${
            isOnColor
              ? "bg-white/10 text-rose-100 border border-white/20"
              : "bg-[#e0244a]/10 text-[#ff5c7a] border border-[#e0244a]/30"
          }`}
        >
          {!isOnColor && <span className="w-1.5 h-1.5 rounded-full bg-[#e0244a] animate-pulse-dot" />}
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08] ${
          isOnColor ? "text-white" : "text-[#f5f7fa]"
        } ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm sm:text-base font-medium leading-relaxed max-w-2xl ${
            isCenter ? "mx-auto" : ""
          } ${isOnColor ? "text-rose-100/90" : "text-[#8b96a8]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
