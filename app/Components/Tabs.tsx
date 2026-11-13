import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  children: (activeId: string) => React.ReactNode;
  defaultTab?: string;
  className?: string;
  variant?: "pill" | "underline";
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  children,
  defaultTab,
  className = "",
  variant = "pill",
}) => {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div className={className}>
      <div
        role="tablist"
        className={
          variant === "pill"
            ? "flex flex-wrap gap-2 p-1.5 bg-[#1b1e27] rounded-2xl w-fit max-w-full"
            : "flex flex-wrap gap-6 border-b border-white/10"
        }
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={
                variant === "pill"
                  ? `inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                      isActive
                        ? "bg-[#14161d] text-[#C81E3D] shadow-sm"
                        : "text-[#8b96a8] hover:text-[#F1F5F9]"
                    }`
                  : `relative pb-3 text-xs sm:text-sm font-extrabold transition-colors ${
                      isActive
                        ? "text-[#C81E3D] after:absolute after:left-0 after:right-0 after:-bottom-px after:h-0.5 after:bg-[#C81E3D] after:rounded-full"
                        : "text-[#7c8798] hover:text-[#F1F5F9]"
                    }`
              }
            >
              {tab.label}
              {typeof tab.count === "number" && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    variant === "pill"
                      ? isActive
                        ? "bg-[#2B141A] text-[#C81E3D]"
                        : "bg-[#22252f] text-[#8b96a8]"
                      : isActive
                        ? "bg-[#2B141A] text-[#C81E3D]"
                        : "bg-[#1b1e27] text-[#7c8798]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-8">
        {children(active)}
      </div>
    </div>
  );
};

export default Tabs;
