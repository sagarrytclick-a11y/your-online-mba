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
  return (
    <div
      className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left"} ${className}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-[0.15em] ${
            theme === "dark"
              ? "bg-white/10 text-rose-100 border border-white/15"
              : "bg-[#FFF1F2] text-[#C81E3D] border border-rose-100"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.15] ${
          theme === "dark" ? "text-white" : "text-[#1E293B]"
        } ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm sm:text-base font-medium leading-relaxed ${
            theme === "dark" ? "text-rose-100/90" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
