"use client";

import React from "react";
import { useModal } from "../Context/ModalContext";

const DownloadBrochureButton = () => {
  const { openModal } = useModal();

  return (
    <button
      onClick={openModal}
      className="fixed right-0 top-1/2 -translate-y-1/2 text-white py-4 px-3.5 rounded-l-2xl shadow-2xl z-50 transition-all duration-300 flex flex-col items-center gap-1"
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        background: 'linear-gradient(180deg, #2563EB, #4F46E5)',
      }}
      aria-label="Download Brochure"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(37,99,235,0.4)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '';
      }}
    >
      <span
        className="text-[10px] font-black tracking-[0.3em] uppercase"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Download Brochure
      </span>
    </button>
  );
};

export default DownloadBrochureButton;
