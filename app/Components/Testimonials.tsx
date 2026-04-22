"use client";
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, GraduationCap } from 'lucide-react';

// Separate student arrays for each scrolling column
const column1Students = [
  { name: "Vikram Singh", image: "https://i.pinimg.com/1200x/5c/1b/44/5c1b44e5838ab2a670cbb96276f0819c.jpg" },
  { name: "Priya Gupta", image: "https://i.pinimg.com/736x/0b/7c/f4/0b7cf4a74a7d6966ea0c274b46887421.jpg" },
  { name: "Aarav Sharma", image: "https://i.pinimg.com/1200x/d0/96/30/d09630a68ff721c6fff999f138d33d33.jpg" },
  { name: "Simran Kaur", image: "https://i.pinimg.com/1200x/3a/0c/d8/3a0cd8a35bb1c1d8390cd35987cd4a9e.jpg" },
  { name: "Rahul Verma", image: "https://i.pinimg.com/736x/a5/7a/6b/a57a6b8f03de1cf90b6d698884c9dd51.jpg" },
  { name: "Ananya Iyer", image: "https://i.pinimg.com/736x/28/06/61/2806611f0d5d28ede2130650f6f96d71.jpg" },
];

const column2Students = [
  { name: "Arjun Reddy", image: "https://i.pinimg.com/736x/92/12/46/9212466a7a662172657b69e063012c23.jpg" },
  { name: "Sneha Patil", image: "https://i.pinimg.com/736x/83/53/f2/8353f2f5f27e5a1d22d24ee91f778f82.jpg" },
  { name: "Karthik Rajan", image: "https://i.pinimg.com/736x/27/90/03/27900371354079f41e16751f2a320fdb.jpg" },
  { name: "Meera Joshi", image: "https://i.pinimg.com/736x/7b/3d/3d/7b3d3d07a771dc258efd76367ecb7208.jpg" },
  { name: "Aditya Kumar", image: "https://i.pinimg.com/736x/6e/7d/9d/6e7d9d8a15b47ace4a5e0abc7a10434c.jpg" },
  { name: "Divya Nair", image: "https://i.pinimg.com/736x/5a/1e/da/5a1edaf7efafcdc507ea58a1f29627b2.jpg" },
];

const column3Students = [
  { name: "Rohit Sharma", image: "https://i.pinimg.com/736x/a9/d3/c0/a9d3c0d5e6afc1dfdfa99290b6321a03.jpg" },
  { name: "Ishita Singh", image: "https://i.pinimg.com/736x/72/6f/0e/726f0eafd4441e68e1acf8ca057ef0ba.jpg" },
  { name: "Vikram Patel", image: "https://i.pinimg.com/736x/69/b9/59/69b959e631b115d12e660aa5ce03ad6a.jpg" },
  { name: "Sanya Kapoor", image: "https://i.pinimg.com/736x/c7/92/50/c792508a49ea3144b1ce9d60d7af2bf0.jpg" },
  { name: "Arjun Mehta", image: "https://i.pinimg.com/1200x/cb/a3/4b/cba34bcf9c6e99e58aacb17f5ad2e85c.jpg" },
  { name: "Pooja Sharma", image: "https://i.pinimg.com/1200x/30/1a/76/301a76f730c30af2663ae16c6b327145.jpg" },
];

const column4Students = [
  { name: "Nikhil Kumar", image: "https://i.pinimg.com/736x/0b/f5/bc/0bf5bc5769f9dc063b401f4363cf9ef6.jpg" },
  { name: "Riya Das", image: "https://i.pinimg.com/736x/80/47/b3/8047b3f0d8b806aa726de8581d7a11b1.jpg" },
  { name: "Saurav Jain", image: "https://i.pinimg.com/736x/12/96/0a/12960a766e3975d0e281632b9abdd1d0.jpg" },
  { name: "Anjali Roy", image: "https://i.pinimg.com/736x/9d/1a/6f/9d1a6fe123f799d85cb50ef981b7547d.jpg" },
  { name: "Deepak Yadav", image: "https://i.pinimg.com/1200x/78/31/2f/78312f3987a7091d4ef0a4539ce38ec8.jpg" },
  { name: "Kavita Singh", image: "https://i.pinimg.com/736x/1b/04/b0/1b04b0475fdfcd4eb52b8ac7b1823480.jpg" },
];

// Student data for header section and testimonials - using column data
const allStudents = [...column1Students, ...column2Students, ...column3Students, ...column4Students];

const students = allStudents.slice(0, 8).map((student, index) => ({
  id: index + 1,
  name: student.name,
  image: student.image,
  college: ["IIM Bangalore", "ISB Hyderabad", "XLRI Jamshedpur", "NMIMS Mumbai", "Symbiosis Pune", "IIM Calcutta", "IIM Ahmedabad", "FMS Delhi"][index]
}));

const testimonials = allStudents.slice(0, 8).map((student, index) => ({
  id: index + 1,
  name: student.name,
  image: student.image,
  college: ["IIM Bangalore", "ISB Hyderabad", "XLRI Jamshedpur", "NMIMS Mumbai", "Symbiosis Pune", "IIM Calcutta", "IIM Ahmedabad", "FMS Delhi"][index],
  text: [
    '"Immediate response after lead submission, detailed counseling, and clear college options. The process was smooth!"',
    '"Amazing guidance and trusted support from start to finish. They made college admission easy and helped me achieve goals."',
    '"The team provided excellent personalized guidance. They connected quickly and helped me secure my dream college!"',
    '"Outstanding service! Detailed college data and quick support after lead submission made the process stress-free."',
    '"I was confused about my career path, but their counselors provided the clarity I needed to choose the right university."',
    '"The best platform for admission help. The documentation support and visa guidance were top-notch and professional."',
    '"Reliable and transparent. They don\'t just give info; they stay with you until the admission is confirmed. Five stars!"',
    '"Very helpful for engineering aspirants. They helped me compare colleges based on placement records and ROI accurately."'
  ][index]
}));

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' }, 
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-[#F8F9F9] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-4 py-2 rounded-lg mb-6 border border-[#F97316]">
              <GraduationCap size={18} className="text-[#1E40AF]" />
              <span className="text-sm font-bold tracking-wide text-[#1E40AF]">TRUSTED BY STUDENTS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-[#1A1A1B]">
              10.6k+ <br/>
              <span className="text-[#F97316]">Students Made A Choice</span>
            </h2>
            <p className="text-xl max-w-lg mb-10 text-[#2C3E50]">
              That opened the right doors. Unlock your potential and find the perfect college path with expert guidance.
            </p>

            <div className="flex items-center gap-4 p-5 rounded-3xl inline-flex border border-[#1E40AF]/10 bg-white">
                <div className="flex -space-x-4">
                  {students.slice(0, 4).map(student => (
                    <img key={student.id} src={student.image} className="w-12 h-12 rounded-full border-4 border-white" alt={student.name} />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-bold text-[#1A1A1B] text-lg">4.8</span>
                    <Star size={16} className="fill-[#F97316] text-[#F97316]" />
                  </div>
                  <p className="text-sm text-[#2C3E50]">Trusted by 5,200+ Reviews</p>
                </div>
            </div>
          </div>

          {/* 4-Column Scrolling Grid */}
          <div className="relative h-125 hidden lg:flex gap-4 overflow-hidden justify-center items-center">
             {/* Column 1 - Scroll Up */}
             <div className="flex flex-col gap-4 animate-vertical-scroll w-35">
                {[...column1Students, ...column1Students].map((student, i) => (
                  <div key={`col1-${i}`} className="w-full h-40 p-4 rounded-2xl border border-gray-200 shrink-0 flex flex-col items-center justify-center bg-white shadow-sm">
                    <img src={student.image} alt={student.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                    <p className="text-xs font-semibold text-center text-[#1A1A1B]">{student.name}</p>
                  </div>
                ))}
             </div>

             {/* Column 2 - Scroll Down */}
             <div className="flex flex-col gap-4 animate-vertical-scroll-reverse w-35 mt-20">
                {[...column2Students, ...column2Students].map((student, i) => (
                  <div key={`col2-${i}`} className="w-full h-40 p-4 rounded-2xl border border-gray-200 shrink-0 flex flex-col items-center justify-center bg-white shadow-sm">
                    <img src={student.image} alt={student.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                    <p className="text-xs font-semibold text-center text-[#1A1A1B]">{student.name}</p>
                  </div>
                ))}
             </div>

             {/* Column 3 - Scroll Up */}
             <div className="flex flex-col gap-4 animate-vertical-scroll w-35">
                {[...column3Students, ...column3Students].map((student, i) => (
                  <div key={`col3-${i}`} className="w-full h-40 p-4 rounded-2xl border border-gray-200 shrink-0 flex flex-col items-center justify-center bg-white shadow-sm">
                    <img src={student.image} alt={student.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                    <p className="text-xs font-semibold text-center text-[#1A1A1B]">{student.name}</p>
                  </div>
                ))}
             </div>

             {/* Column 4 - Scroll Down */}
             <div className="flex flex-col gap-4 animate-vertical-scroll-reverse w-35 mt-20">
                {[...column4Students, ...column4Students].map((student, i) => (
                  <div key={`col4-${i}`} className="w-full h-40 p-4 rounded-2xl border border-gray-200 shrink-0 flex flex-col items-center justify-center bg-white shadow-sm">
                    <img src={student.image} alt={student.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                    <p className="text-xs font-semibold text-center text-[#1A1A1B]">{student.name}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Main Horizontal Carousel */}
        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] px-4">
                  <div
                    className="rounded-3xl p-8 h-full flex flex-col hover:border-[#1E40AF]/50 transition-all duration-300 bg-white border border-gray-200"
                  >
                    <p className="text-lg leading-relaxed mb-8 flex-grow font-light text-[#2C3E50]">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#F97316]" />
                      <div>
                        <h4 className="font-bold text-[#1A1A1B]">{testimonial.name}</h4>
                        <p className="text-xs text-gray-500">{testimonial.college}</p>
                        <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#F97316] text-[#F97316]" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: index === selectedIndex ? '40px' : '8px',
                backgroundColor: index === selectedIndex ? '#F97316' : '#CBD5E1'
              }}
            />
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes vertical-scroll-reverse {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 30s linear infinite;
        }
        .animate-vertical-scroll-reverse {
          animation: vertical-scroll-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;