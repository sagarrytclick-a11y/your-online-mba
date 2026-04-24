import React from 'react'
import HeroSection from '../Components/HeroSection';
import CourseSectionNew from '../Components/CourseSectionNew';
import DreamCollegeCTA from '../Components/DreamCollegeCTA';
import TestimonialsSection from '../Components/Testimonials';
import WhyChooseUs from '../Components/WhyChooseUs';
import FAQSection from '../Components/FAQSection';
import FeaturedColleges from '../Components/FeaturedColleges';
import BrandPartner from '../Components/BrandPartner';
import InfiniteScrollPrograms from '../Components/InfiniteScrollPrograms';
import DownloadBrochureButton from '../Components/DownloadBrochureButton';



const page = () => {
  return (
    <div>
      <HeroSection/>
      <CourseSectionNew/>
      <FeaturedColleges/>
      <BrandPartner/>
      <DreamCollegeCTA/>
      <TestimonialsSection/>
      <WhyChooseUs/>
      <FAQSection/>
      <InfiniteScrollPrograms/>
      <DownloadBrochureButton/>
    </div>
  )
}

export default page;