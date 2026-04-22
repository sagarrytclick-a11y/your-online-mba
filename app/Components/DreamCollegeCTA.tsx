"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../Context/ModalContext';

const DreamCollegeCTA: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section className="bg-[#F8F9F9] py-20 px-6">
      <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl relative bg-[#1E40AF] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Left: Text Content */}
        <div className="flex-1 text-white z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            Have questions about our college or courses?
          </h2>
        </div>

        {/* Right: Button */}
        <div className="flex-shrink-0 z-10">
          <button 
            onClick={openModal}
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center gap-3 border-2 border-white/20 hover:border-white/40"
          >
            Ready to answers!
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default DreamCollegeCTA;