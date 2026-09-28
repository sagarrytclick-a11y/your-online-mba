import React, { useState } from "react";
import * as Icons from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  theme?: "light" | "dark";
  defaultOpenIndex?: number | null;
  allowMultiple?: boolean;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  theme = "light",
  defaultOpenIndex = null,
  allowMultiple = false,
  className = "",
}) => {
  const [open, setOpen] = useState<number[]>(
    defaultOpenIndex === null ? [] : [defaultOpenIndex]
  );

  const toggle = (index: number) => {
    setOpen((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      return allowMultiple ? [...prev, index] : [index];
    });
  };

  const isDark = theme === "dark";

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        return (
          <div
            key={item.question}
            className={`rounded-2xl border transition-colors ${
              isDark
                ? isOpen
                  ? "bg-white/10 border-white/20"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
                : isOpen
                  ? "bg-[#FFF1F2] border-rose-100"
                  : "bg-white border-gray-100 hover:border-rose-200"
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
              >
                <span
                  className={`text-sm sm:text-base font-extrabold leading-snug ${
                    isDark ? "text-white" : "text-[#1E293B]"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isOpen
                      ? "bg-[#C81E3D] text-white"
                      : isDark
                        ? "bg-white/10 text-rose-100"
                        : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icons.ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </button>
            </h3>
            {isOpen && (
              <div className="px-5 sm:px-6 pb-5">
                <p
                  className={`text-sm font-medium leading-relaxed ${
                    isDark ? "text-rose-100/85" : "text-slate-500"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
