import React from 'react';
import { CheckCircle } from 'lucide-react';
import { whyChooseUsFeatures, benefits, stats } from '../config/data';
import { DynamicIcon } from '../config/icons';

const WhyChooseUs = () => {
  return (
    <section className="relative bg-[#F8FAFC] py-24 px-6 overflow-hidden hidden md:block">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-100 opacity-40 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-100 opacity-40 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* 🔥 HEADER */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#2563EB'
            }}
          >
            <DynamicIcon name="award" size={16} />
            <span className="text-xs font-bold tracking-widest">
              WHY CHOOSE US
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "'Syne', sans-serif", color: '#0F172A' }}
          >
            The Smartest Way to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Get MBA Admission
            </span>
          </h2>

          <p
            className="text-gray-500 mt-6 text-base md:text-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            We combine expert guidance with real data to help you choose the right college and secure admission without confusion.
          </p>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                border: '1px solid #E2E8F0',
                boxShadow: '0 8px 30px rgba(15,23,42,0.06)'
              }}
            >
              <div className="text-3xl font-black text-[#2563EB] mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 FEATURES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {whyChooseUsFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 40px rgba(15,23,42,0.08)'
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                  color: '#fff'
                }}
              >
                <DynamicIcon name={feature.icon as any} size={24} />
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Syne', sans-serif", color: '#0F172A' }}
              >
                {feature.title}
              </h3>

              {/* Desc */}
              <p
                className="text-gray-500 mb-6 text-sm leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {feature.description}
              </p>

              {/* Points */}
              <div className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-blue-500" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 BENEFITS CTA BLOCK */}
        <div
          className="rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
            boxShadow: '0 30px 80px rgba(37,99,235,0.35)'
          }}
        >
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>
              <h3
                className="text-3xl md:text-4xl font-black mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Everything You Need for MBA Admission
              </h3>

              <p className="text-white/80 mb-8">
                Get complete support — from shortlisting colleges to final admission confirmation.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-white mt-1" size={16} />
                    <span className="text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT STATS */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <DynamicIcon name="target" size={20} />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{stat.number}</div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;