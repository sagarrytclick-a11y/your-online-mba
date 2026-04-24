"use client";

import Image from "next/image";

const BentoDesign = () => {
  return (
    <div className="relative w-full max-w-[480px] mx-auto h-[480px] group">
      
      {/* 1. Doctor Image - Circle with Hover Effect */}
      <div className="absolute top-0 left-0 w-[210px] h-[210px] rounded-full overflow-hidden border-4 border-[#1E212B] shadow-xl transition-all duration-500 hover:scale-105 z-20">
        <Image
          src="https://i.pinimg.com/736x/82/48/b7/8248b74f7d5ac340fdb200ce349c20de.jpg"
          alt="doctor"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Verified Badge refined */}
        <div className="absolute top-4 right-4 w-9 h-9 bg-[#00D4FF] rounded-full flex items-center justify-center shadow-lg border-2 border-[#12141D]">
          <span className="text-[#12141D] text-sm font-bold">✔</span>
        </div>
      </div>

      {/* 2. Patient/Student Image - Tall Pill Shape */}
      <div className="absolute top-0 right-0 w-[230px] h-[320px] rounded-[115px] overflow-hidden bg-[#1E212B] border border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <Image
          src="https://i.pinimg.com/736x/f2/11/69/f211696c39a77239d4620239e88ae506.jpg"
          alt="student"
          fill
          className="object-cover opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* 3. Featured Treatments - Rectangular Card */}
      <div className="absolute bottom-0 left-0 w-[250px] h-[240px] rounded-[48px] bg-[#1E212B] p-6 flex flex-col justify-between border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-[#4A90E2]/20">
        <div>
          <p className="text-[#94A3B8] text-sm uppercase tracking-widest font-medium">
            Featured
          </p>
          <h3 className="text-2xl font-bold text-[#F8FAFC] mt-1">
            Treatments <span className="text-[#4A90E2]">.</span>
          </h3>
        </div>

        {/* Illustration with Floating Animation */}
        <div className="relative w-full h-[110px] animate-pulse-slow">
          <Image
            src="https://i.pinimg.com/736x/19/6d/1f/196d1f311cbd9251dbec8f6de8247e7d.jpg"
            alt="tooth"
            fill
            className="object-contain filter brightness-110"
          />
        </div>
      </div>

      {/* 4. Experience Badge - Bottom Right Circle */}
      <div className="absolute bottom-4 right-0 w-[180px] h-[180px] rounded-full bg-[#4A90E2] flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(74,144,226,0.3)] border-4 border-[#12141D] z-30 transition-transform duration-500 hover:rotate-6">
        <h2 className="text-5xl font-black text-[#12141D] tracking-tighter">12+</h2>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#12141D]/80 leading-none mt-1">
          Years of<br/>Expertise
        </p>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-[#4A90E2]/10 to-transparent blur-3xl rounded-full" />
    </div>
  );
};

export default BentoDesign;