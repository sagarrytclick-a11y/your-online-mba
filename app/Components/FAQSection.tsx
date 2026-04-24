"use client";
import React, { useState, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { faqData, contactMethods } from '../config/data';
import { DynamicIcon } from '../config/icons';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(faqData.map(f => f.category)));
    return ["All", ...unique];
  }, []);

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;

      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const leftCol = filteredFAQs.filter((_, i) => i % 2 === 0);
  const rightCol = filteredFAQs.filter((_, i) => i % 2 !== 0);

  const FAQItem = ({ faq }: { faq: typeof faqData[0] }) => {
    const isOpen = activeIndex === faq.id;

    return (
      <div
        className="bg-white/80 backdrop-blur-lg rounded-2xl mb-4 overflow-hidden transition-all duration-300 hover:shadow-xl"
        style={{
          border: '1px solid #E2E8F0',
          boxShadow: '0 8px 30px rgba(15,23,42,0.06)'
        }}
      >
        <button
          onClick={() => setActiveIndex(isOpen ? null : faq.id)}
          className="w-full flex items-center justify-between p-5 text-left"
        >
          <span
            className="font-semibold text-sm md:text-base pr-4"
            style={{
              color: isOpen ? '#2563EB' : '#0F172A',
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            {faq.question}
          </span>

          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            style={{ color: '#94A3B8' }}
          />
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className="px-5 pb-5 text-sm text-gray-500 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {faq.answer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative bg-[#F8FAFC] py-24 px-6 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-100 opacity-40 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-100 opacity-40 blur-[100px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
              style={{
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#2563EB'
              }}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              <span className="text-xs font-bold tracking-widest">FAQ</span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ fontFamily: "'Syne', sans-serif", color: '#0F172A' }}
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Questions
              </span>
            </h2>

            <p className="text-gray-500 mt-2">
              Find quick answers to common admission queries.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/80 backdrop-blur-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-3 overflow-x-auto pb-6 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIndex(null);
              }}
              className="px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all"
              style={{
                background:
                  selectedCategory === cat
                    ? 'linear-gradient(135deg, #2563EB, #4F46E5)'
                    : '#FFFFFF',
                color: selectedCategory === cat ? '#fff' : '#64748B',
                border: '1px solid #E2E8F0'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ GRID */}
        {filteredFAQs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {leftCol.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </div>
            <div>
              {rightCol.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500">No results found</p>
          </div>
        )}

        {/* CONTACT */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 pt-10 border-t border-gray-200">
          {contactMethods.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition"
            >
              <DynamicIcon name={contact.type as any} size={20} />
              <span className="font-medium">{contact.value}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;