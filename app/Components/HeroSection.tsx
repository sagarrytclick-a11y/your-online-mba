"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const courses = ["Online MBA", "PGDM", "B.Tech", "Online MCA"];

  return (
    <section className="relative min-h-screen w-full bg-[#F8FAFC] overflow-hidden flex flex-col items-center justify-center px-4 py-16">
      
      {/* --- Floating Student Portraits (Pinterest) --- */}
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-[10%] left-[5%] hidden lg:block"
      >
        <div className="w-64 h-80 rounded-[80px] overflow-hidden border-[6px] border-white shadow-2xl relative">
          <Image 
            src="https://i.pinimg.com/736x/2f/71/67/2f7167a02e279ee0f80a6900a398f8ff.jpg" 
            alt="MBA Student" 
            fill 
            className="object-cover" 
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute top-[15%] right-[5%] hidden lg:block"
      >
        <div className="w-56 h-56 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative">
          <Image 
            src="https://i.pinimg.com/736x/f2/11/69/f211696c39a77239d4620239e88ae506.jpg" 
            alt="Executive Program" 
            fill 
            className="object-cover" 
          />
        </div>
      </motion.div>

      {/* --- Main Content Section --- */}
      <div className="relative z-10 max-w-5xl text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#2563EB] font-bold mb-4 tracking-[0.2em] uppercase text-sm"
        >
          Elevate Your Career
        </motion.p>
        
        <h1 className="text-3xl md:text-5xl font-[900] text-[#0F172A] leading-[1.1] mb-8 tracking-tight">
          India&apos;s Top Rated <br />
          <span className="text-[#2563EB]">Online Degree Programs</span>
        </h1>
        
        <p className="text-[#475569] text-sm md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
          Unlock global opportunities with UGC-entitled Online MBA, PGDM, and Executive 
          certificates from India&apos;s premier universities. Study at your own pace.
        </p>

        {/* --- Course Cards Grid (Replacing the Form) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {courses.map((course, index) => (
            <Link key={index} href="/colleges">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-[32px] shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-full flex items-center justify-center text-[#2563EB] font-bold group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  {index + 1}
                </div>
                <span className="font-bold text-[#0F172A] text-sm md:text-base">{course}</span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* --- Action Buttons --- */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <Link href="/colleges" className="px-10 py-5 bg-[#0F172A] text-white rounded-full font-bold text-lg hover:bg-[#1E293B] transition-all shadow-xl active:scale-95">
            Explore All Programs
          </Link>
          <div className="flex items-center gap-3">
             <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" width={40} height={40} />
                  </div>
                ))}
             </div>
             <p className="text-sm text-[#475569] font-medium">
               <span className="text-[#0F172A] font-bold">15k+</span> Students Enrolled
             </p>
          </div>
        </div>
      </div>

      {/* --- Secondary Floating Elements --- */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-[10%] left-[10%] hidden lg:block"
      >
        <div className="bg-white p-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-gray-50">
           <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-xl">
             ✔
           </div>
           <div>
             <p className="text-xs text-gray-400 font-medium tracking-tight leading-none">UGC Entitled</p>
             <p className="text-sm font-bold text-[#0F172A]">Approved Programs</p>
           </div>
        </div>
      </motion.div>

      {/* Subtle Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00D4FF]/10 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

export default Hero;