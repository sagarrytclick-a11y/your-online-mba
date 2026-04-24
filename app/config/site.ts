import { themeColors } from './theme';

export const siteIdentity = {
  name: "YourOnlineMBA",
  tagline: "Get Your College",
  description: "Comprehensive education services and college guidance for international students",
  logo: "/logo.png",
  interestImage: "https://i.pinimg.com/736x/b7/87/75/b78775a5be660f4401ab0cc18fba2f89.jpg",
  colors: themeColors,
  contact: {
    phone: ["+91-9839865347", "+91-9569985339"],
    email: "Abhishek@vidyavriddhi.com",
    address: "S0-1, Geniefolks Building (2nd Floor), Block A, Plot No. A-28, Sector 4, Noida, Uttar Pradesh - 201301"
  },
  social: {
    whatsapp: "https://wa.me/919839865347",
    instagram: "https://www.instagram.com/vidyavriddhi?igsh=N3NoeGRlOG4ycTB6",
    linkedin: "https://www.linkedin.com/company/vidya-vriddhi/posts/?feedView=all",
    youtube: "https://youtube.com/@vidyavriddhi-u6y?si=D6bIbwNliMCbOGtW"
  },
  seo: {
    title: "Your Online MBA - Get Your College",
    description: "Comprehensive education services and college guidance for international students. Expert counseling, university admissions, and career guidance."
  }
};

export type SiteIdentity = typeof siteIdentity;