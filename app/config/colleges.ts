// Centralized college data
export interface College {
  college_id: string;
  slug: string;
  name: string;
  short_name: string;
  type: string;
  location: {
    city: string;
    state: string;
    street_address: string;
    pincode: string;
    google_map_link: string;
  };
  approved_by: string[];
  exams_accepted: string[];
  courses_offered: string[];
  highlights: string[];
  status: string;
  media?: {
    cover: string;
  };
  content?: {
    overview: string;
    admission: string;
  };
  fees?: {
    mba_fee: string;
    hostel_fee: string;
    total_fee: string;
  };
  placements?: {
    average_package: string;
    highest_package: string;
    top_recruiters: string[];
    placement_rate: string;
  };
  ranking?: {
    nirf_rank?: string;
    other_rankings: string[];
  };
  facilities?: string[];
  campus_size?: string;
  established_year?: string;
  student_intake?: string;
  faculty_count?: string;
  accreditation?: string[];
  meta?: {
    seo_title: string;
    last_updated: string;
  };
}

export const collegesData: College[] = [
 
  {
    "college_id": "alliance-university",
    "slug": "alliance-university",
    "name": "Alliance University",
    "short_name": "Alliance",
    "type": "Private University",
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "street_address": "Chikkahagade Cross, Chandapura - Anekal Main Road",
      "pincode": "562106",
      "google_map_link": "https://maps.app.goo.gl/alliance-anekal"
    },
    "approved_by": ["UGC", "IACBE (USA)"],
    "exams_accepted": ["AMAT", "CAT", "NMAT", "XAT", "MAT"],
    "courses_offered": ["MBA", "MBA (Digital Transformation)", "MBA (Business Analytics)", "MBA (Finance)", "MBA (Marketing)", "MBA (HR)", "Ph.D."],
    "highlights": ["60+ Acre Lush Green Campus", "International Faculty Exchange", "Modern Infrastructure", "100% Placement Assistance", "Industry-Aligned Curriculum", "Global Partnerships"],
    "status": "active",
    "media": {
      "cover": "/colleges/Alliance_University_Bangalore.jpg"
    },
    "content": {
      "overview": "Alliance University is a premier private university located in Bangalore, Karnataka, offering world-class management education. Established in 2010, the university is known for its 60+ acre lush green campus, state-of-the-art infrastructure, and international faculty exchange programs. The university focuses on providing industry-aligned curriculum with strong emphasis on practical learning and global exposure. Alliance School of Business is ranked among the top B-schools in South India.",
      "admission": "Admission to Alliance University MBA program is through AMAT (Alliance Management Aptitude Test) or valid scores from CAT, NMAT, XAT, or MAT. The selection process includes Group Discussion and Personal Interview. Candidates with work experience are preferred. The university also considers academic performance in graduation (minimum 50% aggregate). Application can be done online through the university portal."
    },
    "fees": {
      "mba_fee": "₹12-15 Lakhs",
      "hostel_fee": "₹1.5-2 Lakhs per year",
      "total_fee": "₹15-18 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹7.5 LPA",
      "highest_package": "₹22 LPA",
      "top_recruiters": ["Deloitte", "Accenture", "Amazon", "Infosys", "Wipro", "TCS", "HCL", "KPMG"],
      "placement_rate": "92%"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top 10 Private Universities in Karnataka", "AAA Rating by Careers360"]
    },
    "facilities": ["Smart Classrooms", "Digital Library", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "60+ Acres",
    "established_year": "2010",
    "student_intake": "300+ per batch",
    "faculty_count": "100+",
    "accreditation": ["UGC", "AICTE", "IACBE (USA)", "NBA"]
  },
  {
    "college_id": "cornell-university",
    "slug": "cornell-university",
    "name": "Cornell University",
    "short_name": "Cornell",
    "type": "Private University",
    "location": {
      "city": "Ithaca",
      "state": "New York",
      "street_address": "Ithaca, NY 14853",
      "pincode": "14853",
      "google_map_link": "https://maps.app.goo.gl/cornell"
    },
    "approved_by": ["AACSB", "EQUIS"],
    "exams_accepted": ["GMAT", "GRE"],
    "courses_offered": ["MBA", "Executive MBA", "Ph.D."],
    "highlights": ["Ivy League", "Global Network", "Research Excellence"],
    "status": "active",
    "media": {
      "cover": "/colleges/Cornell_University.jpg"
    },
    "content": {
      "overview": "Cornell University is an Ivy League institution located in Ithaca, New York, known for its world-class MBA program at the Johnson Graduate School of Management. Established in 1865, Cornell is consistently ranked among the top business schools globally. The university offers a rigorous curriculum with emphasis on leadership, innovation, and practical learning. Cornell's MBA program provides excellent global exposure through international immersions and a strong alumni network across industries.",
      "admission": "Admission to Cornell MBA is through GMAT or GRE scores. Candidates must have a bachelor's degree with strong academic record. The selection process includes Personal Interview and evaluation of professional experience. The university values diversity, leadership potential, and academic excellence. Final selection is based on test scores, interview performance, work experience, and overall profile fit."
    },
    "fees": {
      "mba_fee": "$70,000+ per year",
      "hostel_fee": "$15,000+ per year",
      "total_fee": "$150,000+ (2 years)"
    },
    "placements": {
      "average_package": "$140,000",
      "highest_package": "$200,000+",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Google", "Microsoft", "Deloitte"],
      "placement_rate": "95%+"
    },
    "ranking": {
      "nirf_rank": "N/A (International)",
      "other_rankings": ["Top 10 MBA Programs in US", "Ivy League", "AACSB Accredited"]
    },
    "facilities": ["Smart Classrooms", "Business Library", "Trading Floor", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "745 Acres",
    "established_year": "1865",
    "student_intake": "280+ per batch",
    "faculty_count": "100+",
    "accreditation": ["AACSB", "EQUIS", "Middle States"]
  },
  {
    "college_id": "duke-university",
    "slug": "duke-university",
    "name": "Duke University",
    "short_name": "Duke",
    "type": "Private University",
    "location": {
      "city": "Durham",
      "state": "North Carolina",
      "street_address": "Durham, NC 27708",
      "pincode": "27708",
      "google_map_link": "https://maps.app.goo.gl/duke"
    },
    "approved_by": ["AACSB", "EQUIS"],
    "exams_accepted": ["GMAT", "GRE"],
    "courses_offered": ["MBA", "Executive MBA", "Ph.D."],
    "highlights": ["Top 10 MBA", "Strong Alumni", "Leadership Focus"],
    "status": "active",
    "media": {
      "cover": "/colleges/Duke_University.jpg"
    },
    "content": {
      "overview": "Duke University's Fuqua School of Business is a top-tier business school located in Durham, North Carolina. Known for its leadership-focused curriculum and strong alumni network, Duke consistently ranks among the top 10 MBA programs in the US. The school emphasizes teamwork, ethical leadership, and global business perspectives. Duke's MBA program offers excellent career opportunities and international exposure through global immersions.",
      "admission": "Admission to Duke MBA is through GMAT or GRE scores. Candidates must have a bachelor's degree with strong academic record. The selection process includes Personal Interview and evaluation of professional experience. The university values leadership potential, teamwork skills, and academic excellence. Final selection is based on test scores, interview performance, work experience, and overall profile fit."
    },
    "fees": {
      "mba_fee": "$75,000+ per year",
      "hostel_fee": "$15,000+ per year",
      "total_fee": "$160,000+ (2 years)"
    },
    "placements": {
      "average_package": "$145,000",
      "highest_package": "$220,000+",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Google", "Microsoft", "Deloitte"],
      "placement_rate": "96%+"
    },
    "ranking": {
      "nirf_rank": "N/A (International)",
      "other_rankings": ["Top 10 MBA Programs in US", "AACSB Accredited", "Strong Leadership Focus"]
    },
    "facilities": ["Smart Classrooms", "Business Library", "Trading Floor", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "8,600 Acres",
    "established_year": "1838",
    "student_intake": "340+ per batch",
    "faculty_count": "120+",
    "accreditation": ["AACSB", "EQUIS", "Southern Association"]
  },
  {
    "college_id": "edgewood-university",
    "slug": "edgewood-university",
    "name": "Edgewood University",
    "short_name": "Edgewood",
    "type": "Private University",
    "location": {
      "city": "Madison",
      "state": "Wisconsin",
      "street_address": "Madison, WI 53711",
      "pincode": "53711",
      "google_map_link": "https://maps.app.goo.gl/edgewood"
    },
    "approved_by": ["HLC"],
    "exams_accepted": ["GMAT", "GRE"],
    "courses_offered": ["MBA", "Education", "Nursing"],
    "highlights": ["Affordable Education", "Small Class Sizes", "Career Support"],
    "status": "active",
    "media": {
      "cover": "/colleges/Edgewood_University.jpg"
    },
    "content": {
      "overview": "Edgewood University is a private institution located in Madison, Wisconsin, known for its affordable education and small class sizes. The university offers personalized attention to students with a focus on career support and practical learning. Edgewood provides a supportive learning environment with strong faculty-student interaction. The MBA program emphasizes ethical leadership and business fundamentals.",
      "admission": "Admission to Edgewood MBA is through GMAT or GRE scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Personal Interview. The university values academic potential and career aspirations. Final selection is based on test scores, interview performance, and academic background."
    },
    "fees": {
      "mba_fee": "$30,000+ per year",
      "hostel_fee": "$8,000+ per year",
      "total_fee": "$70,000+ (2 years)"
    },
    "placements": {
      "average_package": "$65,000",
      "highest_package": "$90,000+",
      "top_recruiters": ["Local Companies", "Healthcare Organizations", "Education Sector", "Tech Startups"],
      "placement_rate": "85%+"
    },
    "ranking": {
      "nirf_rank": "N/A (International)",
      "other_rankings": ["Regional Recognition", "HLC Accredited"]
    },
    "facilities": ["Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus"],
    "campus_size": "50 Acres",
    "established_year": "1927",
    "student_intake": "100+ per batch",
    "faculty_count": "40+",
    "accreditation": ["HLC", "Wisconsin Educational Approval Board"]
  },
  {
    "college_id": "ggu",
    "slug": "ggu",
    "name": "Guru Ghasidas Vishwavidyalaya",
    "short_name": "GGU",
    "type": "Central University",
    "location": {
      "city": "Bilaspur",
      "state": "Chhattisgarh",
      "street_address": "Koni, Bilaspur",
      "pincode": "495009",
      "google_map_link": "https://maps.app.goo.gl/ggu"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "CMAT", "MAT"],
    "courses_offered": ["MBA", "MCA", "B.Tech"],
    "highlights": ["Central University", "Low Fees", "Research Focus"],
    "status": "active",
    "media": {
      "cover": "/colleges/GGU_Thumbnail.jpg"
    },
    "content": {
      "overview": "Guru Ghasidas Vishwavidyalaya is a central university located in Bilaspur, Chhattisgarh. Established in 1983, it is known for its affordable education and strong research focus. The university offers quality management education with emphasis on practical learning and industry exposure. GGU provides excellent infrastructure and a supportive learning environment for students from diverse backgrounds.",
      "admission": "Admission to GGU MBA is through CAT, CMAT, or MAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university gives preference to candidates from Chhattisgarh and surrounding regions. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹50,000-80,000",
      "hostel_fee": "₹20,000-30,000 per year",
      "total_fee": "₹1-1.5 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["Local Companies", "PSUs", "IT Companies", "Manufacturing Firms"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Central Universities", "UGC Recognized"]
    },
    "facilities": ["Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs"],
    "campus_size": "300+ Acres",
    "established_year": "1983",
    "student_intake": "120+ per batch",
    "faculty_count": "50+",
    "accreditation": ["UGC", "AICTE", "NAAC B"]
  },
  {
    "college_id": "goa-institute-of-management",
    "slug": "goa-institute-of-management",
    "name": "Goa Institute of Management",
    "short_name": "GIM",
    "type": "Private",
    "location": {
      "city": "Goa",
      "state": "Goa",
      "street_address": "Rua de Santa Rita, Ribandar",
      "pincode": "403006",
      "google_map_link": "https://maps.app.goo.gl/gim"
    },
    "approved_by": ["AICTE", "NBA", "NAAC (A++)"],
    "exams_accepted": ["CAT", "XAT", "GMAT", "CMAT"],
    "courses_offered": ["PGDM", "PGDM (Healthcare)", "PGDM (BFSI)"],
    "highlights": ["Beautiful Campus", "Industry Integration", "High Placements"],
    "status": "active",
    "media": {
      "cover": "/colleges/Goa_Institute_of_Management.jpg"
    },
    "content": {
      "overview": "Goa Institute of Management (GIM) is a premier business school located in the scenic state of Goa. Established in 1993, GIM is known for its beautiful campus, strong industry integration, and excellent placement record. The institute offers specialized PGDM programs with emphasis on practical learning and global exposure. GIM's curriculum is designed to meet industry requirements and provides students with excellent career opportunities.",
      "admission": "Admission to GIM PGDM is through CAT, XAT, GMAT, or CMAT scores. The selection process includes Group Discussion and Personal Interview. Academic performance in graduation (minimum 50% aggregate) is important. Work experience is preferred but not mandatory. Final selection is based on composite score of entrance exam, GD/PI, and academic performance. The institute gives weightage to diversity and extracurricular achievements."
    },
    "fees": {
      "mba_fee": "₹18-20 Lakhs",
      "hostel_fee": "₹1.5-2 Lakhs per year",
      "total_fee": "₹21-24 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹11 LPA",
      "highest_package": "₹30 LPA",
      "top_recruiters": ["Deloitte", "Accenture", "Amazon", "Infosys", "Wipro", "TCS", "HCL", "KPMG", "EY"],
      "placement_rate": "95%+"
    },
    "ranking": {
      "nirf_rank": "51-75",
      "other_rankings": ["Top 30 Private B-Schools", "NBA Accredited", "NAAC A++"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Auditorium"],
    "campus_size": "50 Acres",
    "established_year": "1993",
    "student_intake": "240+ per batch",
    "faculty_count": "60+",
    "accreditation": ["UGC", "AICTE", "NBA", "NAAC A++"]
  },
  {
    "college_id": "iiitb",
    "slug": "iiitb",
    "name": "International Institute of Information Technology Bangalore",
    "short_name": "IIITB",
    "type": "Deemed University",
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "street_address": "26/C, Electronics City, Hosur Road",
      "pincode": "560100",
      "google_map_link": "https://maps.app.goo.gl/iiitb"
    },
    "approved_by": ["AICTE", "UGC"],
    "exams_accepted": ["CAT", "GATE", "GMAT"],
    "courses_offered": ["MBA (Digital Business)", "M.Tech", "Ph.D."],
    "highlights": ["Tech Focus", "Industry Partners", "Research Excellence"],
    "status": "active",
    "media": {
      "cover": "/colleges/IIITB_Bangalore.jpg"
    },
    "content": {
      "overview": "International Institute of Information Technology Bangalore (IIITB) is a premier deemed university specializing in technology and management education. Established in 1999, IIITB is known for its tech-focused MBA program in Digital Business, strong industry partnerships, and research excellence. The institute offers a unique blend of technology and management education with emphasis on innovation and practical learning. Located in Electronics City, Bangalore, it provides excellent industry exposure.",
      "admission": "Admission to IIITB MBA is through CAT, GATE, or GMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute gives preference to candidates with technical background and work experience. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹14-16 Lakhs",
      "hostel_fee": "₹1-1.5 Lakhs per year",
      "total_fee": "₹16-18 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹12 LPA",
      "highest_package": "₹35 LPA",
      "top_recruiters": ["Amazon", "Microsoft", "Google", "Deloitte", "Accenture", "Infosys", "Wipro", "TCS", "Product Companies"],
      "placement_rate": "95%+"
    },
    "ranking": {
      "nirf_rank": "101-150",
      "other_rankings": ["Top Tech MBA Programs", "AICTE Approved", "UGC Recognized"]
    },
    "facilities": ["Smart Classrooms", "Digital Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "30 Acres",
    "established_year": "1999",
    "student_intake": "60+ per batch",
    "faculty_count": "50+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "iim",
    "slug": "iim",
    "name": "Indian Institute of Management",
    "short_name": "IIM",
    "type": "Government",
    "location": {
      "city": "Multiple",
      "state": "India",
      "street_address": "Various Locations",
      "pincode": "000000",
      "google_map_link": "https://maps.app.goo.gl/iim"
    },
    "approved_by": ["AICTE", "UGC", "NBA"],
    "exams_accepted": ["CAT"],
    "courses_offered": ["MBA", "PGP", "Executive MBA"],
    "highlights": ["Top B-Schools", "Excellent Placements", "Global Recognition"],
    "status": "active",
    "media": {
      "cover": "/colleges/IIM.jpg"
    },
    "content": {
      "overview": "Indian Institutes of Management (IIMs) are premier business schools in India, known for their academic excellence and world-class management education. Established by the Government of India, IIMs are consistently ranked among the top business schools globally. They offer rigorous MBA programs with emphasis on leadership, innovation, and practical learning. IIMs have strong industry connections and excellent placement records.",
      "admission": "Admission to IIMs is exclusively through CAT exam. Candidates must have a bachelor's degree with minimum 50% aggregate (45% for SC/ST/PwD). The selection process includes Written Ability Test (WAT) and Personal Interview. Work experience is preferred but not mandatory. Final selection is based on CAT score, WAT/PI performance, academic profile, and diversity factor."
    },
    "fees": {
      "mba_fee": "₹20-25 Lakhs",
      "hostel_fee": "₹1.5-2 Lakhs per year",
      "total_fee": "₹24-30 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹25 LPA",
      "highest_package": "₹60+ LPA",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Flipkart", "Reliance", "Tata Group"],
      "placement_rate": "100%"
    },
    "ranking": {
      "nirf_rank": "Top 10",
      "other_rankings": ["Top B-Schools in India", "AACSB Accredited", "Global Recognition"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center", "Auditorium"],
    "campus_size": "Varies by Campus",
    "established_year": "1961",
    "student_intake": "Varies by Campus",
    "faculty_count": "Varies by Campus",
    "accreditation": ["UGC", "AICTE", "NBA", "AACSB", "NAAC A++"]
  },
  {
    "college_id": "iim-india",
    "slug": "iim-india",
    "name": "IIM India",
    "short_name": "IIM India",
    "type": "Government",
    "location": {
      "city": "Multiple",
      "state": "India",
      "street_address": "Various Locations",
      "pincode": "000000",
      "google_map_link": "https://maps.app.goo.gl/iim-india"
    },
    "approved_by": ["AICTE", "UGC"],
    "exams_accepted": ["CAT"],
    "courses_offered": ["MBA", "PGP", "Fellow Program"],
    "highlights": ["Premier Institutes", "World-Class Faculty", "Strong Alumni"],
    "status": "active",
    "media": {
      "cover": "/colleges/IIM_India.jpg"
    },
    "content": {
      "overview": "IIM India represents the collective network of Indian Institutes of Management across the country. These premier institutes are known for world-class faculty, strong alumni networks, and excellent placement records. IIMs offer rigorous management education with emphasis on leadership, innovation, and practical learning. The network includes both old and new IIMs, each with unique strengths and specializations.",
      "admission": "Admission to IIMs is exclusively through CAT exam. Candidates must have a bachelor's degree with minimum 50% aggregate (45% for SC/ST/PwD). The selection process includes Written Ability Test (WAT) and Personal Interview. Work experience is preferred but not mandatory. Final selection is based on CAT score, WAT/PI performance, academic profile, and diversity factor."
    },
    "fees": {
      "mba_fee": "₹15-25 Lakhs",
      "hostel_fee": "₹1-2 Lakhs per year",
      "total_fee": "₹18-30 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹20-25 LPA",
      "highest_package": "₹50+ LPA",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Flipkart", "Reliance", "Tata Group"],
      "placement_rate": "98%+"
    },
    "ranking": {
      "nirf_rank": "Top 50",
      "other_rankings": ["Top B-Schools in India", "AACSB Accredited", "Government of India"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center", "Auditorium"],
    "campus_size": "Varies by Campus",
    "established_year": "1961",
    "student_intake": "Varies by Campus",
    "faculty_count": "Varies by Campus",
    "accreditation": ["UGC", "AICTE", "NBA", "AACSB", "NAAC A++"]
  },
  {
    "college_id": "iim-indore",
    "slug": "iim-indore",
    "name": "Indian Institute of Management Indore",
    "short_name": "IIM Indore",
    "type": "Government",
    "location": {
      "city": "Indore",
      "state": "Madhya Pradesh",
      "street_address": "Pigdamber, Rau",
      "pincode": "453556",
      "google_map_link": "https://maps.app.goo.gl/iim-indore"
    },
    "approved_by": ["AICTE", "UGC", "NBA"],
    "exams_accepted": ["CAT"],
    "courses_offered": ["PGP (MBA)", "Executive MBA", "Fellow Program (Ph.D.)", "PGP-SM (Sports Management)", "PGP-HRM"],
    "highlights": ["Top 10 IIM in India", "100+ Acre Green Campus", "Research Excellence", "Industry Integration", "Strong Alumni Network", "International Collaborations"],
    "status": "active",
    "media": {
      "cover": "/colleges/IIM_Indore.jpg"
    },
    "content": {
      "overview": "IIM Indore is one of the premier Indian Institutes of Management, established in 1996. Located on a sprawling 100+ acre green campus in Indore, it is consistently ranked among the top 10 IIMs in India. The institute is known for its academic excellence, research focus, and strong industry connections. IIM Indore offers a comprehensive management education with emphasis on ethics, sustainability, and innovation. The campus features state-of-the-art facilities and a vibrant student life.",
      "admission": "Admission to IIM Indore PGP program is exclusively through CAT exam. Candidates must have a bachelor's degree with minimum 50% aggregate (45% for SC/ST/PwD). The selection process includes Written Ability Test (WAT) and Personal Interview. Work experience is preferred but not mandatory. Final selection is based on CAT score, WAT/PI performance, academic profile, and diversity factor. Shortlisted candidates are called for the selection process at IIM Indore campus."
    },
    "fees": {
      "mba_fee": "₹18 Lakhs",
      "hostel_fee": "₹1.5-2 Lakhs per year",
      "total_fee": "₹21-23 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹24 LPA",
      "highest_package": "₹55 LPA",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Flipkart", "Reliance", "Tata Group"],
      "placement_rate": "100%"
    },
    "ranking": {
      "nirf_rank": "8",
      "other_rankings": ["Top 10 IIMs", "AACSB Accredited", "5-Star Rating by QS"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Swimming Pool", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center", "Medical Center", "Auditorium"],
    "campus_size": "100+ Acres",
    "established_year": "1996",
    "student_intake": "480+ per batch",
    "faculty_count": "80+",
    "accreditation": ["UGC", "AICTE", "NBA", "AACSB", "NAAC A++"]
  },
  {
    "college_id": "iim-kozhikode",
    "slug": "iim-kozhikode",
    "name": "Indian Institute of Management Kozhikode",
    "short_name": "IIM Kozhikode",
    "type": "Government",
    "location": {
      "city": "Kozhikode",
      "state": "Kerala",
      "street_address": "IIMK Campus PO, Kozhikode",
      "pincode": "673570",
      "google_map_link": "https://maps.app.goo.gl/iim-kozhikode"
    },
    "approved_by": ["AICTE", "UGC", "NBA"],
    "exams_accepted": ["CAT"],
    "courses_offered": ["PGP (MBA)", "Executive MBA", "Fellow Program (Ph.D.)", "PGP-Liberal Studies", "PGP-Finance"],
    "highlights": ["Scenic Hill Campus", "Diverse Culture", "High ROI", "Strong Alumni Network", "International Exchange Programs", "Research Excellence"],
    "status": "active",
    "media": {
      "cover": "/colleges/IIM_Kozhikode.jpg"
    },
    "content": {
      "overview": "IIM Kozhikode is one of the premier Indian Institutes of Management, established in 1997. Located on a scenic hill campus in Kerala, it is known for its diverse culture, academic excellence, and strong industry connections. The institute is consistently ranked among the top IIMs in India. IIM Kozhikode offers a unique blend of management education with emphasis on liberal studies, international exchange, and research. The campus provides an ideal learning environment with state-of-the-art facilities.",
      "admission": "Admission to IIM Kozhikode PGP program is exclusively through CAT exam. Candidates must have a bachelor's degree with minimum 50% aggregate (45% for SC/ST/PwD). The selection process includes Written Ability Test (WAT) and Personal Interview. Work experience is preferred but not mandatory. Final selection is based on CAT score, WAT/PI performance, academic profile, and diversity factor. The institute gives weightage to gender and academic diversity."
    },
    "fees": {
      "mba_fee": "₹20 Lakhs",
      "hostel_fee": "₹1.5-2 Lakhs per year",
      "total_fee": "₹23-25 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹26 LPA",
      "highest_package": "₹60 LPA",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Flipkart", "Reliance", "Tata Group", "Microsoft"],
      "placement_rate": "100%"
    },
    "ranking": {
      "nirf_rank": "6",
      "other_rankings": ["Top 10 IIMs", "AACSB Accredited", "5-Star Rating by QS"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Swimming Pool", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center", "Medical Center", "Auditorium", "Recreation Center"],
    "campus_size": "100+ Acres",
    "established_year": "1997",
    "student_intake": "480+ per batch",
    "faculty_count": "80+",
    "accreditation": ["UGC", "AICTE", "NBA", "AACSB", "NAAC A++"]
  },
  {
    "college_id": "iim-raipur",
    "slug": "iim-raipur",
    "name": "Indian Institute of Management Raipur",
    "short_name": "IIM Raipur",
    "type": "Government",
    "location": {
      "city": "Raipur",
      "state": "Chhattisgarh",
      "street_address": "Atal Nagar",
      "pincode": "492015",
      "google_map_link": "https://maps.app.goo.gl/iim-raipur"
    },
    "approved_by": ["AICTE", "UGC"],
    "exams_accepted": ["CAT"],
    "courses_offered": ["PGP (MBA)", "Executive MBA", "Fellow Program (Ph.D.)", "PGP-SM (Sports Management)"],
    "highlights": ["New Generation IIM", "Modern Infrastructure", "Strong Industry Connect", "Research Focus", "Affordable Fees", "Growing Alumni Network"],
    "status": "active",
    "media": {
      "cover": "/colleges/IIM_raipur.jpg"
    },
    "content": {
      "overview": "IIM Raipur is one of the new generation IIMs established in 2010. Located in Atal Nagar, the capital city of Chhattisgarh, it offers modern infrastructure and excellent industry connections. Despite being relatively new, IIM Raipur has quickly established itself as a premier management institute with strong academic rigor and research focus. The institute is known for its affordable fees and excellent ROI. The campus features state-of-the-art facilities with a focus on technology and innovation.",
      "admission": "Admission to IIM Raipur PGP program is exclusively through CAT exam. Candidates must have a bachelor's degree with minimum 50% aggregate (45% for SC/ST/PwD). The selection process includes Written Ability Test (WAT) and Personal Interview. Work experience is preferred but not mandatory. Final selection is based on CAT score, WAT/PI performance, academic profile, and diversity factor. As a new IIM, it provides excellent opportunities for students seeking quality education at affordable fees."
    },
    "fees": {
      "mba_fee": "₹14 Lakhs",
      "hostel_fee": "₹1-1.5 Lakhs per year",
      "total_fee": "₹16-17 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹18 LPA",
      "highest_package": "₹40 LPA",
      "top_recruiters": ["Amazon", "Flipkart", "Reliance", "Tata Group", "Infosys", "Wipro", "HCL", "Mahindra"],
      "placement_rate": "100%"
    },
    "ranking": {
      "nirf_rank": "25",
      "other_rankings": ["Top New IIMs", "NBA Accredited", "Emerging B-School Award"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center", "Medical Center", "Auditorium"],
    "campus_size": "200+ Acres",
    "established_year": "2010",
    "student_intake": "250+ per batch",
    "faculty_count": "50+",
    "accreditation": ["UGC", "AICTE", "NBA", "NAAC A"]
  },
  {
    "college_id": "iit-gandhinagar",
    "slug": "iit-gandhinagar",
    "name": "Indian Institute of Technology Gandhinagar",
    "short_name": "IIT Gandhinagar",
    "type": "Government",
    "location": {
      "city": "Gandhinagar",
      "state": "Gujarat",
      "street_address": "Palaj, Gandhinagar",
      "pincode": "382355",
      "google_map_link": "https://maps.app.goo.gl/iit-gandhinagar"
    },
    "approved_by": ["AICTE", "UGC"],
    "exams_accepted": ["CAT", "GATE"],
    "courses_offered": ["MBA", "M.Tech", "Ph.D."],
    "highlights": ["IIT Brand", "Tech Focus", "Research Excellence"],
    "status": "active",
    "media": {
      "cover": "/colleges/IIT_Gandhinagar.jpg"
    },
    "content": {
      "overview": "IIT Gandhinagar is a premier institute established in 2008, known for its tech-focused MBA program and research excellence. Located in Gandhinagar, Gujarat, it offers a unique blend of technology and management education. The institute emphasizes innovation, practical learning, and industry collaboration. IIT Gandhinagar provides excellent infrastructure and a vibrant campus life with strong focus on interdisciplinary research.",
      "admission": "Admission to IIT Gandhinagar MBA is through CAT or GATE scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute gives preference to candidates with technical background and work experience. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹8-10 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹10-12 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹10 LPA",
      "highest_package": "₹25 LPA",
      "top_recruiters": ["Amazon", "Microsoft", "Google", "Deloitte", "Accenture", "Infosys", "Wipro", "TCS"],
      "placement_rate": "90%+"
    },
    "ranking": {
      "nirf_rank": "101-150",
      "other_rankings": ["Top IITs", "AICTE Approved", "UGC Recognized"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "400+ Acres",
    "established_year": "2008",
    "student_intake": "60+ per batch",
    "faculty_count": "80+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "iit-jodhpur",
    "slug": "iit-jodhpur",
    "name": "Indian Institute of Technology Jodhpur",
    "short_name": "IIT Jodhpur",
    "type": "Government",
    "location": {
      "city": "Jodhpur",
      "state": "Rajasthan",
      "street_address": "NH-65, Karwar",
      "pincode": "342037",
      "google_map_link": "https://maps.app.goo.gl/iit-jodhpur"
    },
    "approved_by": ["AICTE", "UGC"],
    "exams_accepted": ["CAT", "GATE"],
    "courses_offered": ["MBA", "M.Tech", "Ph.D."],
    "highlights": ["IIT Brand", "Innovation Focus", "Modern Campus"],
    "status": "active",
    "media": {
      "cover": "/colleges/IIT_Jodhpur.jpg"
    },
    "content": {
      "overview": "IIT Jodhpur is a premier institute established in 2008, known for its innovation-focused MBA program and modern campus. Located in Jodhpur, Rajasthan, it offers a unique blend of technology and management education. The institute emphasizes innovation, practical learning, and industry collaboration. IIT Jodhpur provides excellent infrastructure and a vibrant campus life with strong focus on interdisciplinary research.",
      "admission": "Admission to IIT Jodhpur MBA is through CAT or GATE scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute gives preference to candidates with technical background and work experience. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹8-10 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹10-12 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹10 LPA",
      "highest_package": "₹25 LPA",
      "top_recruiters": ["Amazon", "Microsoft", "Google", "Deloitte", "Accenture", "Infosys", "Wipro", "TCS"],
      "placement_rate": "90%+"
    },
    "ranking": {
      "nirf_rank": "101-150",
      "other_rankings": ["Top IITs", "AICTE Approved", "UGC Recognized"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "300+ Acres",
    "established_year": "2008",
    "student_intake": "60+ per batch",
    "faculty_count": "80+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "iit-roorkee",
    "slug": "iit-roorkee",
    "name": "Indian Institute of Technology Roorkee",
    "short_name": "IIT Roorkee",
    "type": "Government",
    "location": {
      "city": "Roorkee",
      "state": "Uttarakhand",
      "street_address": "Roorkee",
      "pincode": "247667",
      "google_map_link": "https://maps.app.goo.gl/iit-roorkee"
    },
    "approved_by": ["AICTE", "UGC"],
    "exams_accepted": ["CAT", "GATE"],
    "courses_offered": ["MBA", "M.Tech", "Ph.D."],
    "highlights": ["Legacy Institute", "Strong Alumni", "Research Excellence"],
    "status": "active",
    "media": {
      "cover": "/colleges/IIT_Roorkee.jpg"
    },
    "content": {
      "overview": "IIT Roorkee is a legacy institute established in 1847, known for its strong alumni network and research excellence. Located in Roorkee, Uttarakhand, it offers a unique blend of technology and management education. The institute emphasizes innovation, practical learning, and industry collaboration. IIT Roorkee provides excellent infrastructure and a vibrant campus life with strong focus on interdisciplinary research.",
      "admission": "Admission to IIT Roorkee MBA is through CAT or GATE scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute gives preference to candidates with technical background and work experience. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹8-10 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹10-12 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹12 LPA",
      "highest_package": "₹30 LPA",
      "top_recruiters": ["Amazon", "Microsoft", "Google", "Deloitte", "Accenture", "Infosys", "Wipro", "TCS"],
      "placement_rate": "92%+"
    },
    "ranking": {
      "nirf_rank": "51-100",
      "other_rankings": ["Top IITs", "AICTE Approved", "UGC Recognized"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "365 Acres",
    "established_year": "1847",
    "student_intake": "80+ per batch",
    "faculty_count": "100+",
    "accreditation": ["UGC", "AICTE", "NAAC A++"]
  },
  {
    "college_id": "imt",
    "slug": "imt",
    "name": "Institute of Management Technology",
    "short_name": "IMT",
    "type": "Private",
    "location": {
      "city": "Ghaziabad",
      "state": "Uttar Pradesh",
      "street_address": "Raj Nagar",
      "pincode": "201001",
      "google_map_link": "https://maps.app.goo.gl/imt"
    },
    "approved_by": ["AICTE", "NBA", "AACSB"],
    "exams_accepted": ["CAT", "XAT", "GMAT", "CMAT"],
    "courses_offered": ["PGDM", "PGDM (Finance)", "PGDM (Marketing)", "PGDM (HR)", "PGDM (IB)", "PGDM (Business Analytics)", "Fellow Program"],
    "highlights": ["Premier B-School", "AACSB Accredited", "Industry Integration", "Strong Placements", "Legacy Institute", "Global Alumni Network"],
    "status": "active",
    "media": {
      "cover": "/colleges/IMT.jpg"
    },
    "content": {
      "overview": "Institute of Management Technology (IMT) Ghaziabad is one of India's premier business schools, established in 1980. Located in the National Capital Region, it is known for its academic excellence, industry integration, and strong placement record. IMT is AACSB accredited and consistently ranked among the top private B-schools in India. The institute offers a comprehensive management education with emphasis on practical learning and global exposure. The campus features state-of-the-art facilities and a vibrant student life.",
      "admission": "Admission to IMT PGDM is through CAT, XAT, GMAT, or CMAT scores. The selection process includes Group Discussion and Personal Interview. Academic performance in graduation (minimum 50% aggregate) is important. Work experience is preferred but not mandatory. Final selection is based on composite score of entrance exam, GD/PI, and academic performance. The institute gives weightage to diversity and extracurricular achievements."
    },
    "fees": {
      "mba_fee": "₹20-22 Lakhs",
      "hostel_fee": "₹1.5-2 Lakhs per year",
      "total_fee": "₹23-25 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹16 LPA",
      "highest_package": "₹38 LPA",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Flipkart", "Reliance", "Tata Group", "Deloitte"],
      "placement_rate": "96%"
    },
    "ranking": {
      "nirf_rank": "31",
      "other_rankings": ["Top 10 Private B-Schools", "AACSB Accredited", "AAA Rating by Careers360"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center", "Medical Center", "Auditorium"],
    "campus_size": "14 Acres",
    "established_year": "1980",
    "student_intake": "480+ per batch",
    "faculty_count": "100+",
    "accreditation": ["UGC", "AICTE", "NBA", "AACSB", "NAAC A"]
  },
  {
    "college_id": "liba",
    "slug": "liba",
    "name": "Loyola Institute of Business Administration",
    "short_name": "LIBA",
    "type": "Private",
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "street_address": "Loyola College, Nungambakkam",
      "pincode": "600034",
      "google_map_link": "https://maps.app.goo.gl/liba"
    },
    "approved_by": ["AICTE", "NBA", "NAAC (A++)"],
    "exams_accepted": ["CAT", "XAT", "MAT", "CMAT"],
    "courses_offered": ["PGDM", "Ph.D."],
    "highlights": ["Jesuit Values", "Ethical Leadership", "Strong Alumni"],
    "status": "active",
    "media": {
      "cover": "/colleges/LIBA_Chennai.jpg"
    },
    "content": {
      "overview": "Loyola Institute of Business Administration (LIBA) is a premier business school in Chennai, known for its Jesuit values and emphasis on ethical leadership. Established in 1979, LIBA is part of Loyola College and offers quality management education with strong industry connections. The institute focuses on holistic development and ethical business practices. LIBA has a strong alumni network and excellent placement record.",
      "admission": "Admission to LIBA PGDM is through CAT, XAT, MAT, or CMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute values academic excellence, ethical leadership, and social responsibility. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹12-15 Lakhs",
      "hostel_fee": "₹1-1.5 Lakhs per year",
      "total_fee": "₹14-17 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹8 LPA",
      "highest_package": "₹20 LPA",
      "top_recruiters": ["Deloitte", "Accenture", "Amazon", "Infosys", "Wipro", "TCS", "HCL", "KPMG"],
      "placement_rate": "90%+"
    },
    "ranking": {
      "nirf_rank": "76-100",
      "other_rankings": ["Top 50 Private B-Schools", "NBA Accredited", "NAAC A++"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Auditorium"],
    "campus_size": "20 Acres",
    "established_year": "1979",
    "student_intake": "180+ per batch",
    "faculty_count": "50+",
    "accreditation": ["UGC", "AICTE", "NBA", "NAAC A++"]
  },
  {
    "college_id": "mica",
    "slug": "mica",
    "name": "MICA - School of Ideas",
    "short_name": "MICA",
    "type": "Private",
    "location": {
      "city": "Ahmedabad",
      "state": "Gujarat",
      "street_address": "Shela",
      "pincode": "382106",
      "google_map_link": "https://maps.app.goo.gl/mica"
    },
    "approved_by": ["AICTE", "NBA"],
    "exams_accepted": ["CAT", "XAT", "GMAT", "MICAT"],
    "courses_offered": ["PGDM (Communications)", "PGDM (Marketing)", "PGDM (Digital Marketing)", "Fellow Program", "Certificate Programs"],
    "highlights": ["Strategic Marketing Focus", "Creative Excellence", "Industry Leaders", "Unique Curriculum", "Strong Placements", "Brand Building"],
    "status": "active",
    "media": {
      "cover": "/colleges/MICA_Ahmedabad.jpg"
    },
    "content": {
      "overview": "MICA (formerly Mudra Institute of Communications) is India's premier institute for strategic marketing and communications, established in 1991. Located in Ahmedabad, Gujarat, it is known for its unique curriculum that combines marketing, creativity, and communications. MICA is consistently ranked as the top institute for marketing and communications in India. The institute has a strong alumni network in the advertising, media, and marketing industries. The campus provides a creative and innovative learning environment.",
      "admission": "Admission to MICA PGDM is through CAT, XAT, or GMAT scores followed by MICAT (MICA Admission Test). Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Exercise and Personal Interview. MICA looks for candidates with creative aptitude, strong communication skills, and passion for marketing. Final selection is based on composite score of entrance exam, MICAT, GE/PI, and academic performance."
    },
    "fees": {
      "mba_fee": "₹22-25 Lakhs",
      "hostel_fee": "₹1.5-2 Lakhs per year",
      "total_fee": "₹25-28 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹12 LPA",
      "highest_package": "₹35 LPA",
      "top_recruiters": ["P&G", "HUL", "ITC", "Google", "Facebook", "Amazon", "Ogilvy", "McCann", "DDB"],
      "placement_rate": "95%"
    },
    "ranking": {
      "nirf_rank": "51-75",
      "other_rankings": ["Top Marketing & Communications School", "AAA Rating by Careers360", "Industry Recognized"]
    },
    "facilities": ["Creative Studios", "Digital Marketing Lab", "Media Lab", "Library", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Auditorium", "Design Studio"],
    "campus_size": "20 Acres",
    "established_year": "1991",
    "student_intake": "180+ per batch",
    "faculty_count": "40+",
    "accreditation": ["UGC", "AICTE", "NBA", "NAAC A"]
  },
  {
    "college_id": "madras-social-work",
    "slug": "madras-social-work",
    "name": "Madras School of Social Work",
    "short_name": "MSSW",
    "type": "Private",
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "street_address": "Chennai",
      "pincode": "600021",
      "google_map_link": "https://maps.app.goo.gl/mssw"
    },
    "approved_by": ["AICTE", "NAAC"],
    "exams_accepted": ["CAT", "MAT", "CMAT"],
    "courses_offered": ["MBA", "M.S.W", "M.Com"],
    "highlights": ["Social Impact", "Affordable Fees", "Good Placements"],
    "status": "active",
    "media": {
      "cover": "/colleges/Madras_Social_Work_University.jpg"
    },
    "content": {
      "overview": "Madras School of Social Work (MSSW) is a premier institution in Chennai known for its social impact focus and affordable education. Established in 1952, MSSW offers quality management education with emphasis on social responsibility and ethical business practices. The institute has strong industry connections and good placement record. MSSW provides a supportive learning environment with focus on holistic development.",
      "admission": "Admission to MSSW MBA is through CAT, MAT, or CMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute values social impact, academic excellence, and ethical leadership. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹2-3 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹3-4 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["NGOs", "Social Organizations", "IT Companies", "Manufacturing Firms"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Social Work Schools", "AICTE Approved", "NAAC A"]
    },
    "facilities": ["Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus"],
    "campus_size": "5 Acres",
    "established_year": "1952",
    "student_intake": "60+ per batch",
    "faculty_count": "30+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "manipal-university",
    "slug": "manipal-university",
    "name": "Manipal University",
    "short_name": "Manipal",
    "type": "Private University",
    "location": {
      "city": "Manipal",
      "state": "Karnataka",
      "street_address": "Manipal",
      "pincode": "576104",
      "google_map_link": "https://maps.app.goo.gl/manipal"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "XAT", "GMAT", "NMAT", "MAT"],
    "courses_offered": ["MBA", "MBA (Finance)", "MBA (Marketing)", "MBA (HR)", "MBA (International Business)", "B.Tech", "M.Tech", "Ph.D."],
    "highlights": ["World-Class Campus", "Global Partnerships", "Research Focus", "Multi-Disciplinary", "Strong Industry Connect", "Excellent Placements"],
    "status": "active",
    "media": {
      "cover": "/colleges/Manipal_University.jpg"
    },
    "content": {
      "overview": "Manipal University is a premier private university established in 1993, known for its world-class campus and global partnerships. Located in the educational hub of Manipal, Karnataka, it offers excellent infrastructure and a vibrant student life. The university has partnerships with 50+ international universities and strong industry connections. Manipal's MBA program is highly regarded for its practical approach and global exposure. The campus features state-of-the-art facilities and a diverse student community.",
      "admission": "Admission to Manipal University MBA is through CAT, XAT, GMAT, NMAT, or MAT scores. The selection process includes Group Discussion and Personal Interview. Academic performance in graduation (minimum 50% aggregate) is important. The university also considers work experience and extracurricular achievements. Final selection is based on composite score of entrance exam, GD/PI, and academic performance. Application can be done online through the Manipal admission portal."
    },
    "fees": {
      "mba_fee": "₹16-20 Lakhs",
      "hostel_fee": "₹1.5-2.5 Lakhs per year",
      "total_fee": "₹19-24 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹9 LPA",
      "highest_package": "₹35 LPA",
      "top_recruiters": ["Amazon", "Microsoft", "Deloitte", "Accenture", "Infosys", "Wipro", "TCS", "HCL", "KPMG", "EY"],
      "placement_rate": "93%"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top 20 Private Universities in India", "AAA Rating by Careers360", "QS 4-Star Rating"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Swimming Pool", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center", "Medical Center", "Auditorium", "Shopping Complex"],
    "campus_size": "300+ Acres",
    "established_year": "1993",
    "student_intake": "400+ per batch",
    "faculty_count": "200+",
    "accreditation": ["UGC", "AICTE", "NAAC A+", "NBA", "WASC (USA)"]
  },
  {
    "college_id": "nmims",
    "slug": "nmims",
    "name": "Narsee Monjee Institute of Management Studies",
    "short_name": "NMIMS",
    "type": "Deemed University",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "V. L. Mehta Road, Vile Parle (West)",
      "pincode": "400056",
      "google_map_link": "https://maps.app.goo.gl/nmims"
    },
    "approved_by": ["UGC", "AACSB"],
    "exams_accepted": ["NMAT", "CAT", "GMAT"],
    "courses_offered": ["MBA", "MBA (HR)", "MBA (Finance)", "MBA (Marketing)", "MBA (Operations)", "MBA (Business Analytics)", "Ph.D."],
    "highlights": ["Top 10 B-School in India", "Prime Mumbai Location", "AACSB Accredited", "Strong Finance Placements", "Industry Integration", "Global Alumni Network"],
    "status": "active",
    "media": {
      "cover": "/colleges/NMIMS.jpg"
    },
    "content": {
      "overview": "NMIMS Mumbai is one of India's premier business schools, consistently ranked among the top 10 B-schools in the country. Located in the heart of Mumbai, it offers excellent placement opportunities and industry exposure. The institute is AACSB accredited and known for its strong finance program. NMIMS has a legacy of producing business leaders who have made significant contributions to the corporate world. The campus features state-of-the-art facilities and a vibrant student life.",
      "admission": "Admission to NMIMS MBA is primarily through NMAT by GMAC exam. Candidates with valid CAT or GMAT scores may also be considered. The selection process includes Case Discussion and Personal Interview. Academic performance in graduation (minimum 50% aggregate) is also considered. Work experience is preferred but not mandatory. Final selection is based on composite score of entrance exam, CD/PI, and academic performance."
    },
    "fees": {
      "mba_fee": "₹24 Lakhs",
      "hostel_fee": "₹2-3 Lakhs per year",
      "total_fee": "₹28-30 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹23 LPA",
      "highest_package": "₹45 LPA",
      "top_recruiters": ["Goldman Sachs", "Morgan Stanley", "McKinsey", "BCG", "Bain", "Amazon", "Flipkart", "Reliance"],
      "placement_rate": "98%"
    },
    "ranking": {
      "nirf_rank": "21",
      "other_rankings": ["Top 10 Private B-Schools", "AACSB Accredited", "4-Star Rating by QS"]
    },
    "facilities": ["Smart Classrooms", "Financial Lab", "Bloomberg Terminal", "Library", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Auditorium"],
    "campus_size": "8 Acres",
    "established_year": "1981",
    "student_intake": "600+ per batch",
    "faculty_count": "150+",
    "accreditation": ["UGC", "AICTE", "AACSB", "NBA", "NAAC A+"]
  },
  {
    "college_id": "op-jindal",
    "slug": "op-jindal",
    "name": "O.P. Jindal Global University",
    "short_name": "Jindal Global",
    "type": "Private University",
    "location": {
      "city": "Sonipat",
      "state": "Haryana",
      "street_address": "NCR Rajiv Gandhi Education City",
      "pincode": "131013",
      "google_map_link": "https://maps.app.goo.gl/jindal"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "XAT", "GMAT", "NMAT"],
    "courses_offered": ["MBA", "B.A.", "LL.B"],
    "highlights": ["Liberal Arts", "Global Faculty", "Interdisciplinary"],
    "status": "active",
    "media": {
      "cover": "/colleges/OP_Jindal_Global_University.jpg"
    },
    "content": {
      "overview": "O.P. Jindal Global University is a premier private university established in 2009, known for its liberal arts focus and global faculty. Located in Sonipat, Haryana, it offers interdisciplinary education with strong emphasis on research and innovation. The university has international partnerships and excellent infrastructure. Jindal Global's MBA program focuses on leadership, entrepreneurship, and global business perspectives.",
      "admission": "Admission to Jindal Global MBA is through CAT, XAT, GMAT, or NMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university values academic excellence, global perspective, and interdisciplinary learning. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹15-18 Lakhs",
      "hostel_fee": "₹1.5-2 Lakhs per year",
      "total_fee": "₹18-22 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹9 LPA",
      "highest_package": "₹25 LPA",
      "top_recruiters": ["Consulting Firms", "Law Firms", "IT Companies", "Financial Institutions"],
      "placement_rate": "90%+"
    },
    "ranking": {
      "nirf_rank": "101-150",
      "other_rankings": ["Top Private Universities", "UGC Recognized", "NAAC A"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Moot Court"],
    "campus_size": "80 Acres",
    "established_year": "2009",
    "student_intake": "200+ per batch",
    "faculty_count": "150+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "ouu",
    "slug": "ouu",
    "name": "Odisha University of Agriculture and Technology",
    "short_name": "OUAT",
    "type": "State University",
    "location": {
      "city": "Bhubaneswar",
      "state": "Odisha",
      "street_address": "Bhubaneswar",
      "pincode": "751003",
      "google_map_link": "https://maps.app.goo.gl/ouat"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "MAT"],
    "courses_offered": ["MBA (Agri Business)", "B.Tech", "Ph.D."],
    "highlights": ["Agriculture Focus", "Research Excellence", "Government"],
    "status": "active",
    "media": {
      "cover": "/colleges/OUU.jpg"
    },
    "content": {
      "overview": "Odisha University of Agriculture and Technology (OUAT) is a premier state university established in 1962, known for its agriculture focus and research excellence. Located in Bhubaneswar, Odisha, it offers specialized MBA in Agri Business along with technical and research programs. The university has strong industry connections in the agriculture sector. OUAT provides excellent infrastructure and research facilities for agricultural studies.",
      "admission": "Admission to OUAT MBA is through CAT or MAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university gives preference to candidates with agriculture background. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹1-2 Lakhs",
      "hostel_fee": "₹30,000-50,000 per year",
      "total_fee": "₹1.5-3 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["Agri Companies", "Food Processing", "Banking Sector", "Government Agencies"],
      "placement_rate": "75%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Agriculture Universities", "UGC Recognized", "ICAR Accredited"]
    },
    "facilities": ["Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Farms", "Laboratories"],
    "campus_size": "400+ Acres",
    "established_year": "1962",
    "student_intake": "60+ per batch",
    "faculty_count": "40+",
    "accreditation": ["UGC", "AICTE", "ICAR", "NAAC A"]
  },
  {
    "college_id": "psb",
    "slug": "psb",
    "name": "Punjab School of Business",
    "short_name": "PSB",
    "type": "Private",
    "location": {
      "city": "Mohali",
      "state": "Punjab",
      "street_address": "Mohali",
      "pincode": "140301",
      "google_map_link": "https://maps.app.goo.gl/psb"
    },
    "approved_by": ["AICTE", "UGC"],
    "exams_accepted": ["CAT", "MAT", "CMAT"],
    "courses_offered": ["MBA", "BBA"],
    "highlights": ["Industry Focus", "Practical Learning", "Good Placements"],
    "status": "active",
    "media": {
      "cover": "/colleges/PSB.jpg"
    },
    "content": {
      "overview": "Punjab School of Business (PSB) is a private business school located in Mohali, Punjab. Known for its industry focus and practical learning approach, PSB offers quality management education with strong industry connections. The institute emphasizes practical skills and hands-on learning. PSB has good placement record and provides excellent career opportunities for students.",
      "admission": "Admission to PSB MBA is through CAT, MAT, or CMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute values practical skills and industry exposure. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹3-5 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹4-6 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["Local Companies", "IT Firms", "Manufacturing", "Service Sector"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Emerging B-Schools", "AICTE Approved", "UGC Recognized"]
    },
    "facilities": ["Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus"],
    "campus_size": "10 Acres",
    "established_year": "2007",
    "student_intake": "60+ per batch",
    "faculty_count": "30+",
    "accreditation": ["UGC", "AICTE", "NAAC B"]
  },
  {
    "college_id": "parul-university",
    "slug": "parul-university",
    "name": "Parul University",
    "short_name": "Parul",
    "type": "Private University",
    "location": {
      "city": "Vadodara",
      "state": "Gujarat",
      "street_address": "Limbda, Waghodia",
      "pincode": "391760",
      "google_map_link": "https://maps.app.goo.gl/parul"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "MAT", "CMAT"],
    "courses_offered": ["MBA", "B.Tech", "Pharmacy"],
    "highlights": ["Modern Campus", "International Students", "Research Focus"],
    "status": "active",
    "media": {
      "cover": "/colleges/Parul.jpg"
    },
    "content": {
      "overview": "Parul University is a leading private university established in 2015, known for its modern campus and international student community. Located in Vadodara, Gujarat, it offers quality education across multiple disciplines. The university has strong research focus and international collaborations. Parul provides excellent infrastructure and a vibrant campus life with diverse student population.",
      "admission": "Admission to Parul University MBA is through CAT, MAT, or CMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university values academic excellence and international exposure. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹3-5 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹4-6 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["IT Companies", "Manufacturing", "Service Sector", "Startups"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Private Universities in Gujarat", "UGC Recognized", "NAAC A"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs"],
    "campus_size": "150+ Acres",
    "established_year": "2015",
    "student_intake": "200+ per batch",
    "faculty_count": "100+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "rushford",
    "slug": "rushford",
    "name": "Rushford Business School",
    "short_name": "Rushford",
    "type": "Private",
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "street_address": "Bangalore",
      "pincode": "560001",
      "google_map_link": "https://maps.app.goo.gl/rushford"
    },
    "approved_by": ["AICTE"],
    "exams_accepted": ["CAT", "MAT", "GMAT"],
    "courses_offered": ["MBA", "PGDM"],
    "highlights": ["Affordable", "Flexible Learning", "Industry Connect"],
    "status": "active",
    "media": {
      "cover": "/colleges/Rushford_Business_School.jpg"
    },
    "content": {
      "overview": "Rushford Business School is a private business school located in Bangalore, known for its affordable education and flexible learning options. The institute offers quality management education with strong industry connections. Rushford emphasizes practical learning and career support. The school provides good infrastructure and a supportive learning environment for students.",
      "admission": "Admission to Rushford MBA is through CAT, MAT, or GMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute values academic potential and career aspirations. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹2-4 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹3-5 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹3-4 LPA",
      "highest_package": "₹6-8 LPA",
      "top_recruiters": ["Local Companies", "IT Firms", "Startups", "Service Sector"],
      "placement_rate": "75%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Emerging B-Schools", "AICTE Approved"]
    },
    "facilities": ["Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus"],
    "campus_size": "5 Acres",
    "established_year": "2010",
    "student_intake": "60+ per batch",
    "faculty_count": "20+",
    "accreditation": ["UGC", "AICTE"]
  },
  {
    "college_id": "somaiya",
    "slug": "somaiya",
    "name": "K J Somaiya Institute of Management",
    "short_name": "Somaiya",
    "type": "Private",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "Vidyanagar, Vidyavihar (East)",
      "pincode": "400077",
      "google_map_link": "https://maps.app.goo.gl/somaiya"
    },
    "approved_by": ["AICTE", "UGC"],
    "exams_accepted": ["CAT", "XAT", "NMAT", "GMAT"],
    "courses_offered": ["MBA", "MBA (Sports)", "MBA (Healthcare)"],
    "highlights": ["Green Campus", "Diverse Programs", "Industry Engagement"],
    "status": "active",
    "media": {
      "cover": "/colleges/SOMAIYA.jpg"
    },
    "content": {
      "overview": "K J Somaiya Institute of Management is a premier business school in Mumbai, known for its green campus and diverse programs. Established in 1981, the institute offers quality management education with strong industry engagement. Somaiya emphasizes ethical values, practical learning, and holistic development. The institute has strong alumni network and excellent placement record.",
      "admission": "Admission to Somaiya MBA is through CAT, XAT, NMAT, or GMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute values academic excellence, ethical leadership, and diversity. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹12-15 Lakhs",
      "hostel_fee": "₹1-1.5 Lakhs per year",
      "total_fee": "₹14-17 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹8 LPA",
      "highest_package": "₹20 LPA",
      "top_recruiters": ["Deloitte", "Accenture", "Amazon", "Infosys", "Wipro", "TCS", "HCL", "KPMG"],
      "placement_rate": "90%+"
    },
    "ranking": {
      "nirf_rank": "76-100",
      "other_rankings": ["Top 50 Private B-Schools", "AICTE Approved", "NAAC A"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Auditorium"],
    "campus_size": "35 Acres",
    "established_year": "1981",
    "student_intake": "180+ per batch",
    "faculty_count": "60+",
    "accreditation": ["UGC", "AICTE", "NBA", "NAAC A"]
  },
  {
    "college_id": "srm-university",
    "slug": "srm-university",
    "name": "SRM University",
    "short_name": "SRM",
    "type": "Private University",
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "street_address": "Kattankulathur",
      "pincode": "603203",
      "google_map_link": "https://maps.app.goo.gl/srm"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "MAT", "SRMJE", "XAT", "NMAT"],
    "courses_offered": ["MBA", "MBA (Finance)", "MBA (Marketing)", "MBA (HR)", "MBA (Systems)", "B.Tech", "M.Tech", "Ph.D."],
    "highlights": ["World-Class Infrastructure", "Research Focus", "Global Partnerships", "Industry Integration", "Strong Placements", "Multi-Campus"],
    "status": "active",
    "media": {
      "cover": "/colleges/SRM_University.jpg"
    },
    "content": {
      "overview": "SRM University is a leading private university in India, established in 2002. Located in Chennai, Tamil Nadu, it is known for its world-class infrastructure, research focus, and global partnerships. The university has multiple campuses across India and international collaborations with 50+ universities worldwide. SRM's MBA program is highly regarded for its industry integration and practical approach. The campus features state-of-the-art facilities including advanced research labs and modern classrooms.",
      "admission": "Admission to SRM University MBA is through SRMJE (SRM Joint Entrance Exam) or valid scores from CAT, MAT, XAT, or NMAT. The selection process includes Group Discussion and Personal Interview. Academic performance in graduation (minimum 50% aggregate) is important. The university also considers work experience and extracurricular achievements. Final selection is based on composite score of entrance exam, GD/PI, and academic performance. Application can be done online through the SRM admission portal."
    },
    "fees": {
      "mba_fee": "₹10-14 Lakhs",
      "hostel_fee": "₹1-1.5 Lakhs per year",
      "total_fee": "₹12-16 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹7.5 LPA",
      "highest_package": "₹28 LPA",
      "top_recruiters": ["Amazon", "Microsoft", "Deloitte", "Accenture", "Infosys", "Wipro", "TCS", "HCL", "Cognizant"],
      "placement_rate": "92%"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top 20 Private Universities in India", "AAA Rating by Careers360", "QS 4-Star Rating"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Swimming Pool", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center", "Medical Center", "Auditorium", "ATM"],
    "campus_size": "250+ Acres",
    "established_year": "2002",
    "student_intake": "350+ per batch",
    "faculty_count": "180+",
    "accreditation": ["UGC", "AICTE", "NAAC A+", "NBA", "ABET (USA)"]
  },
  {
    "college_id": "ssbm-pune",
    "slug": "ssbm-pune",
    "name": "Symbiosis School of Banking and Finance",
    "short_name": "SSBM Pune",
    "type": "Private",
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "street_address": "Symbiosis Knowledge Village, Gram Lavale",
      "pincode": "412115",
      "google_map_link": "https://maps.app.goo.gl/ssbm"
    },
    "approved_by": ["AICTE", "UGC"],
    "exams_accepted": ["SNAP"],
    "courses_offered": ["MBA (Banking & Finance)", "MBA (Financial Services)", "MBA (FinTech)", "Executive MBA", "Ph.D."],
    "highlights": ["Specialized Banking Focus", "Industry Integration", "Strong Placements", "Symbiosis Brand", "Global Curriculum", "Expert Faculty"],
    "status": "active",
    "media": {
      "cover": "/colleges/SSBM_Pune.jpg"
    },
    "content": {
      "overview": "Symbiosis School of Banking and Finance (SSBM) is a premier institute under Symbiosis International University, established in 2010. Located in the scenic Symbiosis Knowledge Village in Pune, it is India's first dedicated school for banking and finance education. The institute is known for its specialized curriculum, industry integration, and excellent placement record in the banking and financial services sector. SSBM offers a unique blend of academic rigor and practical exposure with strong industry connections.",
      "admission": "Admission to SSBM Pune MBA is exclusively through SNAP exam conducted by Symbiosis International University. Candidates must have a bachelor's degree with minimum 50% aggregate (45% for SC/ST). The selection process includes Group Exercise, Personal Interview, and Writing Ability Test. Work experience is preferred but not mandatory. Final selection is based on SNAP score, GEPIWAT performance, and academic profile. Shortlisted candidates are called for the selection process at SSBM campus."
    },
    "fees": {
      "mba_fee": "₹16-18 Lakhs",
      "hostel_fee": "₹1.5-2 Lakhs per year",
      "total_fee": "₹19-22 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹10 LPA",
      "highest_package": "₹25 LPA",
      "top_recruiters": ["HDFC Bank", "ICICI Bank", "Kotak Mahindra", "Axis Bank", "Yes Bank", "Federal Bank", "Deloitte", "KPMG", "EY"],
      "placement_rate": "95%"
    },
    "ranking": {
      "nirf_rank": "51-75",
      "other_rankings": ["Top 5 Banking & Finance Schools", "Symbiosis Brand", "NBA Accredited"]
    },
    "facilities": ["Smart Classrooms", "Financial Lab", "Bloomberg Terminal", "Library", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Auditorium"],
    "campus_size": "300+ Acres (Symbiosis Campus)",
    "established_year": "2010",
    "student_intake": "120+ per batch",
    "faculty_count": "30+",
    "accreditation": ["UGC", "AICTE", "NBA", "NAAC A"]
  },
  {
    "college_id": "svu",
    "slug": "svu",
    "name": "Sri Venkateswara University",
    "short_name": "SVU",
    "type": "State University",
    "location": {
      "city": "Tirupati",
      "state": "Andhra Pradesh",
      "street_address": "Tirupati",
      "pincode": "517502",
      "google_map_link": "https://maps.app.goo.gl/svu"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "APICET"],
    "courses_offered": ["MBA", "M.Tech", "Ph.D."],
    "highlights": ["State University", "Research Focus", "Affordable Fees"],
    "status": "active",
    "media": {
      "cover": "/colleges/SVU.jpg"
    },
    "content": {
      "overview": "Sri Venkateswara University is a premier state university established in 1954, located in Tirupati, Andhra Pradesh. Known for its research focus and affordable education, SVU offers quality management education with strong academic rigor. The university has excellent infrastructure and research facilities. SVU provides good placement opportunities and has strong industry connections in the region.",
      "admission": "Admission to SVU MBA is through CAT or APICET scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university gives preference to candidates from Andhra Pradesh. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹50,000-80,000",
      "hostel_fee": "₹20,000-30,000 per year",
      "total_fee": "₹1-1.5 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["Local Companies", "PSUs", "IT Companies", "Manufacturing Firms"],
      "placement_rate": "75%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top State Universities", "UGC Recognized", "NAAC A"]
    },
    "facilities": ["Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs"],
    "campus_size": "300+ Acres",
    "established_year": "1954",
    "student_intake": "120+ per batch",
    "faculty_count": "50+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "university-maryland",
    "slug": "university-maryland",
    "name": "University of Maryland",
    "short_name": "Maryland",
    "type": "Public University",
    "location": {
      "city": "College Park",
      "state": "Maryland",
      "street_address": "College Park, MD 20742",
      "pincode": "20742",
      "google_map_link": "https://maps.app.goo.gl/maryland"
    },
    "approved_by": ["AACSB", "Middle States"],
    "exams_accepted": ["GMAT", "GRE"],
    "courses_offered": ["MBA", "Ph.D.", "Executive MBA"],
    "highlights": ["Public Ivy", "Research Excellence", "Strong Alumni"],
    "status": "active",
    "media": {
      "cover": "/colleges/University_of_Maryland.jpg"
    },
    "content": {
      "overview": "University of Maryland is a premier public university known as a 'Public Ivy' for its research excellence and strong alumni network. Located in College Park, Maryland, it offers world-class MBA programs with emphasis on innovation and practical learning. The university has strong industry connections and excellent placement record. Maryland's Smith School of Business is consistently ranked among the top business schools in the US.",
      "admission": "Admission to Maryland MBA is through GMAT or GRE scores. Candidates must have a bachelor's degree with strong academic record. The selection process includes Personal Interview and evaluation of professional experience. The university values diversity, leadership potential, and academic excellence. Final selection is based on test scores, interview performance, work experience, and overall profile fit."
    },
    "fees": {
      "mba_fee": "$60,000+ per year",
      "hostel_fee": "$12,000+ per year",
      "total_fee": "$130,000+ (2 years)"
    },
    "placements": {
      "average_package": "$120,000",
      "highest_package": "$180,000+",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Google", "Microsoft", "Deloitte"],
      "placement_rate": "95%+"
    },
    "ranking": {
      "nirf_rank": "N/A (International)",
      "other_rankings": ["Top 25 MBA Programs in US", "AACSB Accredited", "Public Ivy"]
    },
    "facilities": ["Smart Classrooms", "Business Library", "Trading Floor", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "1,250 Acres",
    "established_year": "1856",
    "student_intake": "250+ per batch",
    "faculty_count": "100+",
    "accreditation": ["AACSB", "Middle States", "AACSB"]
  },
  {
    "college_id": "vgu",
    "slug": "vgu",
    "name": "Vivekananda Global University",
    "short_name": "VGU",
    "type": "Private University",
    "location": {
      "city": "Jaipur",
      "state": "Rajasthan",
      "street_address": "Jaipur",
      "pincode": "302025",
      "google_map_link": "https://maps.app.goo.gl/vgu"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "MAT", "CMAT"],
    "courses_offered": ["MBA", "B.Tech", "Ph.D."],
    "highlights": ["Modern Campus", "Research Focus", "Industry Connect"],
    "status": "active",
    "media": {
      "cover": "/colleges/VGU.jpg"
    },
    "content": {
      "overview": "Vivekananda Global University is a leading private university established in 2012, known for its modern campus and research focus. Located in Jaipur, Rajasthan, it offers quality education across multiple disciplines. The university has strong industry connections and international collaborations. VGU provides excellent infrastructure and a vibrant campus life with emphasis on innovation and practical learning.",
      "admission": "Admission to VGU MBA is through CAT, MAT, or CMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university values academic excellence and practical skills. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹3-5 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹4-6 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["IT Companies", "Manufacturing", "Service Sector", "Startups"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Private Universities in Rajasthan", "UGC Recognized", "NAAC A"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs"],
    "campus_size": "100+ Acres",
    "established_year": "2012",
    "student_intake": "150+ per batch",
    "faculty_count": "80+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "zelle-education",
    "slug": "zelle-education",
    "name": "Zelle Education",
    "short_name": "Zelle",
    "type": "Private",
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "street_address": "Bangalore",
      "pincode": "560001",
      "google_map_link": "https://maps.app.goo.gl/zelle"
    },
    "approved_by": ["AICTE"],
    "exams_accepted": ["CAT", "MAT", "GMAT"],
    "courses_offered": ["MBA", "PGDM"],
    "highlights": ["Affordable", "Flexible Learning", "Career Support"],
    "status": "active",
    "media": {
      "cover": "/colleges/Zelle_Education.jpg"
    },
    "content": {
      "overview": "Zelle Education is a private business school located in Bangalore, known for its affordable education and flexible learning options. The institute offers quality management education with strong career support. Zelle emphasizes practical learning and industry connections. The school provides good infrastructure and a supportive learning environment for students seeking affordable MBA education.",
      "admission": "Admission to Zelle Education MBA is through CAT, MAT, or GMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The institute values academic potential and career aspirations. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹2-4 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹3-5 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹3-4 LPA",
      "highest_package": "₹6-8 LPA",
      "top_recruiters": ["Local Companies", "IT Firms", "Startups", "Service Sector"],
      "placement_rate": "75%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Emerging B-Schools", "AICTE Approved"]
    },
    "facilities": ["Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus"],
    "campus_size": "5 Acres",
    "established_year": "2015",
    "student_intake": "60+ per batch",
    "faculty_count": "20+",
    "accreditation": ["UGC", "AICTE"]
  },
  {
    "college_id": "amity",
    "slug": "amity",
    "name": "Amity University",
    "short_name": "Amity",
    "type": "Private University",
    "location": {
      "city": "Noida",
      "state": "Uttar Pradesh",
      "street_address": "Sector 125, Noida",
      "pincode": "201313",
      "google_map_link": "https://maps.app.goo.gl/amity"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "MAT", "CMAT", "XAT", "GMAT"],
    "courses_offered": ["MBA", "MBA (Marketing)", "MBA (Finance)", "MBA (HR)", "MBA (International Business)", "B.Tech", "BBA", "Ph.D."],
    "highlights": ["World-Class Campus", "Global Network", "Research Focus", "100+ International Partners", "Industry-Aligned Curriculum", "Strong Placements"],
    "status": "active",
    "media": {
      "cover": "/colleges/amity.jpg"
    },
    "content": {
      "overview": "Amity University is a leading private university in India with a reputation for academic excellence and global exposure. Established in 2005, Amity has grown to become one of the largest private universities with multiple campuses across India and abroad. The university is known for its world-class infrastructure, international partnerships with 100+ universities, and strong industry connections. Amity Business School is ranked among the top private B-schools in India.",
      "admission": "Admission to Amity MBA is through CAT, MAT, CMAT, XAT, or GMAT scores. The selection process includes Group Discussion and Personal Interview. Academic performance in graduation (minimum 50% aggregate) is important. The university also considers work experience and extracurricular achievements. Final selection is based on composite score of entrance exam, GD/PI, and academic performance. Application can be done online through the Amity admission portal."
    },
    "fees": {
      "mba_fee": "₹14-18 Lakhs",
      "hostel_fee": "₹1.5-2.5 Lakhs per year",
      "total_fee": "₹17-22 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹8 LPA",
      "highest_package": "₹30 LPA",
      "top_recruiters": ["Amazon", "Microsoft", "Google", "Deloitte", "Accenture", "Infosys", "TCS", "HCL", "KPMG"],
      "placement_rate": "95%"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top 10 Private Universities in India", "AAA Rating by Careers360", "QS 5-Star Rating"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Swimming Pool", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center", "Medical Center"],
    "campus_size": "100+ Acres",
    "established_year": "2005",
    "student_intake": "500+ per batch",
    "faculty_count": "250+",
    "accreditation": ["UGC", "AICTE", "NAAC A+", "NBA", "WASC (USA)"]
  },
  {
    "college_id": "birchwood",
    "slug": "birchwood",
    "name": "Birchwood University",
    "short_name": "Birchwood",
    "type": "Private",
    "location": {
      "city": "Online",
      "state": "Global",
      "street_address": "Online",
      "pincode": "000000",
      "google_map_link": "https://maps.app.goo.gl/birchwood"
    },
    "approved_by": ["DEAC"],
    "exams_accepted": ["GMAT", "GRE"],
    "courses_offered": ["MBA", "BBA", "Ph.D."],
    "highlights": ["Online Learning", "Flexible Schedule", "Affordable"],
    "status": "active",
    "media": {
      "cover": "/colleges/birchwood.jpg"
    },
    "content": {
      "overview": "Birchwood University is an online institution known for its flexible learning options and affordable education. The university offers quality management education through online platforms, making it accessible to working professionals and students worldwide. Birchwood emphasizes practical learning and career advancement. The institution provides excellent support services and a global learning community.",
      "admission": "Admission to Birchwood University MBA is through GMAT or GRE scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Personal Interview and evaluation of professional experience. The university values academic potential and career goals. Final selection is based on test scores, interview performance, and academic record."
    },
    "fees": {
      "mba_fee": "$15,000-20,000",
      "hostel_fee": "N/A (Online)",
      "total_fee": "$30,000-40,000 (2 years)"
    },
    "placements": {
      "average_package": "$60,000",
      "highest_package": "$90,000+",
      "top_recruiters": ["Global Companies", "Tech Firms", "Consulting", "Finance"],
      "placement_rate": "85%+"
    },
    "ranking": {
      "nirf_rank": "N/A (International)",
      "other_rankings": ["DEAC Accredited", "Online Learning Excellence"]
    },
    "facilities": ["Online Learning Platform", "Digital Library", "Virtual Classrooms", "Career Services", "Student Support"],
    "campus_size": "N/A (Online)",
    "established_year": "2010",
    "student_intake": "500+ per batch",
    "faculty_count": "50+",
    "accreditation": ["DEAC", "CHEA"]
  },
  {
    "college_id": "christ",
    "slug": "christ",
    "name": "Christ University",
    "short_name": "Christ",
    "type": "Deemed University",
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "street_address": "Hosur Road, Bangalore",
      "pincode": "560029",
      "google_map_link": "https://maps.app.goo.gl/christ"
    },
    "approved_by": ["UGC", "NAAC (A+)"],
    "exams_accepted": ["CAT", "XAT", "MAT", "CMAT", "CUET"],
    "courses_offered": ["MBA", "MBA (Finance)", "MBA (Marketing)", "MBA (HR)", "MBA (Business Analytics)", "BBA", "Ph.D.", "M.Phil"],
    "highlights": ["NAAC A+ Accredited", "Strict Discipline", "Holistic Development", "Strong Alumni Network", "Beautiful Urban Campus", "Industry Partnerships"],
    "status": "active",
    "media": {
      "cover": "/colleges/christ.jpg"
    },
    "content": {
      "overview": "Christ University is a premier deemed university in Bangalore, known for its academic excellence, discipline, and holistic development approach. Established in 1969, it has grown to become one of the most sought-after institutions for management education in South India. The university is NAAC A+ accredited and offers a beautiful urban campus with world-class facilities. Christ University emphasizes ethical values, leadership development, and social responsibility alongside academic rigor.",
      "admission": "Admission to Christ University MBA is through CAT, XAT, MAT, CMAT, or CUET scores. The selection process includes Group Discussion, Presentation, Micro Presentation, and Personal Interview. Academic performance in graduation (minimum 50% aggregate) is crucial. The university also considers extracurricular achievements and social service experience. Final selection is based on composite score of entrance exam, GD/PI, and academic performance."
    },
    "fees": {
      "mba_fee": "₹8-10 Lakhs",
      "hostel_fee": "₹1-1.5 Lakhs per year",
      "total_fee": "₹10-12 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹6.5 LPA",
      "highest_package": "₹18 LPA",
      "top_recruiters": ["Deloitte", "Accenture", "Amazon", "Infosys", "Wipro", "TCS", "HCL", "KPMG", "EY"],
      "placement_rate": "90%"
    },
    "ranking": {
      "nirf_rank": "101-150",
      "other_rankings": ["Top 5 Private Universities in South India", "NAAC A+ Grade", "AAA Rating by Careers360"]
    },
    "facilities": ["Smart Classrooms", "Central Library", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Auditorium", "Medical Center"],
    "campus_size": "25 Acres",
    "established_year": "1969",
    "student_intake": "400+ per batch",
    "faculty_count": "200+",
    "accreditation": ["UGC", "AICTE", "NAAC A+", "NBA"]
  },
  {
    "college_id": "dypatil",
    "slug": "dypatil",
    "name": "D Y Patil University",
    "short_name": "DY Patil",
    "type": "Private University",
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "street_address": "Sant Tukaram Nagar, Pimpri",
      "pincode": "411018",
      "google_map_link": "https://maps.app.goo.gl/dypatil"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "MAT", "CMAT"],
    "courses_offered": ["MBA", "B.Tech", "Medicine"],
    "highlights": ["Modern Campus", "Research Focus", "Good Placements"],
    "status": "active",
    "media": {
      "cover": "/colleges/dypatil.jpg"
    },
    "content": {
      "overview": "D Y Patil University is a leading private university in Pune, known for its modern campus and research focus. Established in 2002, the university offers quality education across multiple disciplines including management, engineering, and medicine. DY Patil has strong industry connections and excellent placement record. The university provides world-class infrastructure and a vibrant campus life with emphasis on innovation and practical learning.",
      "admission": "Admission to DY Patil University MBA is through CAT, MAT, or CMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university values academic excellence and practical skills. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹8-12 Lakhs",
      "hostel_fee": "₹1-1.5 Lakhs per year",
      "total_fee": "₹10-14 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹6 LPA",
      "highest_package": "₹15 LPA",
      "top_recruiters": ["IT Companies", "Manufacturing", "Service Sector", "Healthcare"],
      "placement_rate": "85%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Private Universities in Maharashtra", "UGC Recognized", "NAAC A"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Hospital"],
    "campus_size": "50+ Acres",
    "established_year": "2002",
    "student_intake": "200+ per batch",
    "faculty_count": "100+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "florida",
    "slug": "florida",
    "name": "Florida University",
    "short_name": "Florida",
    "type": "Public University",
    "location": {
      "city": "Florida",
      "state": "USA",
      "street_address": "Florida",
      "pincode": "00000",
      "google_map_link": "https://maps.app.goo.gl/florida"
    },
    "approved_by": ["SACS"],
    "exams_accepted": ["GMAT", "GRE"],
    "courses_offered": ["MBA", "Ph.D.", "Executive MBA"],
    "highlights": ["Public University", "Research Excellence", "Strong Programs"],
    "status": "active",
    "media": {
      "cover": "/colleges/florida.jpg"
    },
    "content": {
      "overview": "Florida University is a premier public university known for its research excellence and strong academic programs. The university offers world-class MBA programs with emphasis on innovation and practical learning. Florida has strong industry connections and excellent placement record. The university provides excellent infrastructure and a vibrant campus life with emphasis on research and global exposure.",
      "admission": "Admission to Florida University MBA is through GMAT or GRE scores. Candidates must have a bachelor's degree with strong academic record. The selection process includes Personal Interview and evaluation of professional experience. The university values diversity, leadership potential, and academic excellence. Final selection is based on test scores, interview performance, work experience, and overall profile fit."
    },
    "fees": {
      "mba_fee": "$50,000+ per year",
      "hostel_fee": "$10,000+ per year",
      "total_fee": "$110,000+ (2 years)"
    },
    "placements": {
      "average_package": "$100,000",
      "highest_package": "$150,000+",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Google", "Microsoft", "Deloitte"],
      "placement_rate": "95%+"
    },
    "ranking": {
      "nirf_rank": "N/A (International)",
      "other_rankings": ["Top 50 MBA Programs in US", "SACS Accredited", "Public Research University"]
    },
    "facilities": ["Smart Classrooms", "Business Library", "Trading Floor", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "2,000+ Acres",
    "established_year": "1853",
    "student_intake": "300+ per batch",
    "faculty_count": "150+",
    "accreditation": ["SACS", "AACSB"]
  },
  {
    "college_id": "harappa",
    "slug": "harappa",
    "name": "Harappa Education",
    "short_name": "Harappa",
    "type": "EdTech",
    "location": {
      "city": "Online",
      "state": "Global",
      "street_address": "Online",
      "pincode": "000000",
      "google_map_link": "https://maps.app.goo.gl/harappa"
    },
    "approved_by": ["Industry Recognized"],
    "exams_accepted": ["Direct Admission"],
    "courses_offered": ["Online Courses", "Certifications", "Leadership Programs"],
    "highlights": ["Online Learning", "Industry-Relevant", "Flexible"],
    "status": "active",
    "media": {
      "cover": "/colleges/harappa.jpg"
    },
    "content": {
      "overview": "Harappa Education is an EdTech platform known for its online learning and industry-relevant curriculum. The platform offers quality management education through flexible online programs, making it accessible to working professionals. Harappa emphasizes practical skills and career advancement. The institution provides excellent support services and a global learning community.",
      "admission": "Admission to Harappa Education is through direct admission. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Personal Interview and evaluation of professional experience. The platform values academic potential and career goals. Final selection is based on interview performance and academic record."
    },
    "fees": {
      "mba_fee": "₹2-4 Lakhs",
      "hostel_fee": "N/A (Online)",
      "total_fee": "₹3-5 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["Tech Companies", "Startups", "Consulting", "Service Sector"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "N/A (EdTech)",
      "other_rankings": ["Leading EdTech Platform", "Industry-Aligned Curriculum"]
    },
    "facilities": ["Online Learning Platform", "Digital Library", "Virtual Classrooms", "Career Services", "Student Support"],
    "campus_size": "N/A (Online)",
    "established_year": "2018",
    "student_intake": "1000+ per batch",
    "faculty_count": "100+",
    "accreditation": ["Industry Recognized"]
  },
  {
    "college_id": "kalinga-university",
    "slug": "kalinga-university",
    "name": "Kalinga University",
    "short_name": "Kalinga",
    "type": "Private University",
    "location": {
      "city": "Raipur",
      "state": "Chhattisgarh",
      "street_address": "Naya Raipur",
      "pincode": "492015",
      "google_map_link": "https://maps.app.goo.gl/kalinga"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "MAT", "CMAT"],
    "courses_offered": ["MBA", "B.Tech", "Ph.D."],
    "highlights": ["Modern Campus", "Research Focus", "Affordable"],
    "status": "active",
    "media": {
      "cover": "/colleges/kalinga_university.jpg"
    },
    "content": {
      "overview": "Kalinga University is a leading private university in Raipur, Chhattisgarh, known for its modern campus and research focus. Established in 2013, the university offers quality education across multiple disciplines. Kalinga has strong industry connections and affordable education. The university provides excellent infrastructure and a vibrant campus life with emphasis on innovation and practical learning.",
      "admission": "Admission to Kalinga University MBA is through CAT, MAT, or CMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university values academic excellence and practical skills. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹3-5 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹4-6 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["IT Companies", "Manufacturing", "Service Sector", "Startups"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Private Universities in Chhattisgarh", "UGC Recognized", "NAAC A"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs"],
    "campus_size": "100+ Acres",
    "established_year": "2013",
    "student_intake": "150+ per batch",
    "faculty_count": "80+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "lpu-online",
    "slug": "lpu-online",
    "name": "Lovely Professional University Online",
    "short_name": "LPU Online",
    "type": "Private University",
    "location": {
      "city": "Online",
      "state": "Punjab",
      "street_address": "Online",
      "pincode": "000000",
      "google_map_link": "https://maps.app.goo.gl/lpu"
    },
    "approved_by": ["UGC", "AICTE", "DEAC"],
    "exams_accepted": ["CAT", "MAT", "LPUNEST", "XAT", "NMAT"],
    "courses_offered": ["Online MBA", "Online MBA (Finance)", "Online MBA (Marketing)", "Online MBA (HR)", "Online BBA", "Online B.Tech", "Online M.Tech"],
    "highlights": ["Online Learning", "Flexible Schedule", "Affordable", "DEAC Accredited", "Industry Recognized", "24/7 Support"],
    "status": "active",
    "media": {
      "cover": "/colleges/lpu_online.jpg"
    },
    "content": {
      "overview": "LPU Online is the distance learning division of Lovely Professional University, one of India's largest private universities. Established to provide quality education through online mode, LPU Online offers flexible and affordable MBA programs for working professionals and students. The platform is DEAC accredited and recognized globally. LPU Online provides comprehensive learning materials, live sessions, and industry-aligned curriculum. The university has partnerships with 50+ international universities for exchange programs.",
      "admission": "Admission to LPU Online MBA is through LPUNEST (LPU National Entrance and Scholarship Test) or valid scores from CAT, MAT, XAT, or NMAT. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection is based on entrance exam score and academic performance. Work experience is preferred but not mandatory. Application can be done online through the LPU admission portal. The university offers scholarships based on LPUNEST scores."
    },
    "fees": {
      "mba_fee": "₹2-4 Lakhs",
      "hostel_fee": "N/A (Online)",
      "total_fee": "₹2-4 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹5-8 LPA",
      "highest_package": "₹20 LPA",
      "top_recruiters": ["Amazon", "Flipkart", "Reliance", "Tata Group", "Infosys", "Wipro", "HCL", "Mahindra"],
      "placement_rate": "85%"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top 10 Online MBA Programs", "DEAC Accredited", "AAA Rating by Careers360"]
    },
    "facilities": ["Online Learning Platform", "Live Sessions", "Digital Library", "24/7 Student Support", "Industry Webinars", "Career Counseling", "Alumni Network"],
    "campus_size": "N/A (Online)",
    "established_year": "2005",
    "student_intake": "5000+ per batch",
    "faculty_count": "200+",
    "accreditation": ["UGC", "AICTE", "DEAC (USA)", "NAAC A+", "NBA"]
  },
  {
    "college_id": "msu",
    "slug": "msu",
    "name": "Maharaja Sayajirao University",
    "short_name": "MSU",
    "type": "State University",
    "location": {
      "city": "Vadodara",
      "state": "Gujarat",
      "street_address": "Vadodara",
      "pincode": "390002",
      "google_map_link": "https://maps.app.goo.gl/msu"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "CMAT", "GUJCET"],
    "courses_offered": ["MBA", "M.Tech", "Ph.D."],
    "highlights": ["State University", "Research Focus", "Heritage"],
    "status": "active",
    "media": {
      "cover": "/colleges/msu.jpg"
    },
    "content": {
      "overview": "Maharaja Sayajirao University (MSU) is a premier state university established in 1949, located in Vadodara, Gujarat. Known for its heritage and research focus, MSU offers quality management education with strong academic rigor. The university has excellent infrastructure and research facilities. MSU provides good placement opportunities and has strong industry connections in the region.",
      "admission": "Admission to MSU MBA is through CAT, CMAT, or GUJCET scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university gives preference to candidates from Gujarat. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹50,000-80,000",
      "hostel_fee": "₹20,000-30,000 per year",
      "total_fee": "₹1-1.5 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["Local Companies", "PSUs", "IT Companies", "Manufacturing Firms"],
      "placement_rate": "75%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top State Universities", "UGC Recognized", "NAAC A"]
    },
    "facilities": ["Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs"],
    "campus_size": "300+ Acres",
    "established_year": "1949",
    "student_intake": "120+ per batch",
    "faculty_count": "50+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "queen-margaret",
    "slug": "queen-margaret",
    "name": "Queen Margaret University",
    "short_name": "QMU",
    "type": "Public University",
    "location": {
      "city": "Edinburgh",
      "state": "Scotland",
      "street_address": "Edinburgh",
      "pincode": "EH12 8TS",
      "google_map_link": "https://maps.app.goo.gl/qmu"
    },
    "approved_by": ["QAA"],
    "exams_accepted": ["GMAT", "GRE"],
    "courses_offered": ["MBA", "M.Sc.", "Ph.D."],
    "highlights": ["UK University", "Research Focus", "Career Support"],
    "status": "active",
    "media": {
      "cover": "/colleges/queenmargaret.jpg"
    },
    "content": {
      "overview": "Queen Margaret University is a public university located in Edinburgh, Scotland. Known for its research focus and career support, QMU offers quality management education with emphasis on practical learning. The university has strong industry connections and excellent placement record. QMU provides excellent infrastructure and a vibrant campus life with emphasis on innovation and global exposure.",
      "admission": "Admission to QMU MBA is through GMAT or GRE scores. Candidates must have a bachelor's degree with strong academic record. The selection process includes Personal Interview and evaluation of professional experience. The university values diversity, leadership potential, and academic excellence. Final selection is based on test scores, interview performance, work experience, and overall profile fit."
    },
    "fees": {
      "mba_fee": "£15,000-20,000 per year",
      "hostel_fee": "£8,000-12,000 per year",
      "total_fee": "£30,000-40,000 (2 years)"
    },
    "placements": {
      "average_package": "£35,000",
      "highest_package": "£50,000+",
      "top_recruiters": ["UK Companies", "International Firms", "Consulting", "Finance"],
      "placement_rate": "90%+"
    },
    "ranking": {
      "nirf_rank": "N/A (International)",
      "other_rankings": ["Top UK Universities", "QAA Accredited", "Research Excellence"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs"],
    "campus_size": "20 Acres",
    "established_year": "1875",
    "student_intake": "100+ per batch",
    "faculty_count": "50+",
    "accreditation": ["QAA", "Scottish Funding Council"]
  },
  {
    "college_id": "sanskriti",
    "slug": "sanskriti",
    "name": "Sanskriti University",
    "short_name": "Sanskriti",
    "type": "Private University",
    "location": {
      "city": "Khajuraho",
      "state": "Madhya Pradesh",
      "street_address": "Khajuraho",
      "pincode": "471606",
      "google_map_link": "https://maps.app.goo.gl/sanskriti"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "MAT", "CMAT"],
    "courses_offered": ["MBA", "B.Tech", "Ph.D."],
    "highlights": ["Cultural Heritage", "Modern Campus", "Research Focus"],
    "status": "active",
    "media": {
      "cover": "/colleges/sanskriti.jpg"
    },
    "content": {
      "overview": "Sanskriti University is a private university located in Khajuraho, Madhya Pradesh, known for its cultural heritage and modern campus. Established in 2010, the university offers quality education across multiple disciplines. Sanskriti has strong research focus and industry connections. The university provides excellent infrastructure and a vibrant campus life with emphasis on innovation and practical learning.",
      "admission": "Admission to Sanskriti University MBA is through CAT, MAT, or CMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university values academic excellence and practical skills. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹3-5 Lakhs",
      "hostel_fee": "₹50,000-80,000 per year",
      "total_fee": "₹4-6 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["IT Companies", "Manufacturing", "Service Sector", "Startups"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Private Universities in MP", "UGC Recognized", "NAAC A"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs"],
    "campus_size": "50+ Acres",
    "established_year": "2010",
    "student_intake": "150+ per batch",
    "faculty_count": "80+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "shoolini",
    "slug": "shoolini",
    "name": "Shoolini University",
    "short_name": "Shoolini",
    "type": "Private University",
    "location": {
      "city": "Solan",
      "state": "Himachal Pradesh",
      "street_address": "Solan",
      "pincode": "173229",
      "google_map_link": "https://maps.app.goo.gl/shoolini"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["CAT", "MAT", "CMAT"],
    "courses_offered": ["MBA", "B.Tech", "Ph.D."],
    "highlights": ["Hill Station Campus", "Research Focus", "Innovation"],
    "status": "active",
    "media": {
      "cover": "/colleges/shoolini.jpg"
    },
    "content": {
      "overview": "Shoolini University is a leading private university located in Solan, Himachal Pradesh, known for its hill station campus and research focus. Established in 2009, the university offers quality education with emphasis on innovation and practical learning. Shoolini has strong industry connections and excellent placement record. The university provides world-class infrastructure and a vibrant campus life.",
      "admission": "Admission to Shoolini University MBA is through CAT, MAT, or CMAT scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Group Discussion and Personal Interview. The university values academic excellence and innovation. Final selection is based on entrance exam scores, GD/PI performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹6-8 Lakhs",
      "hostel_fee": "₹80,000-1.2 Lakhs per year",
      "total_fee": "₹8-10 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹5 LPA",
      "highest_package": "₹12 LPA",
      "top_recruiters": ["IT Companies", "Manufacturing", "Service Sector", "Startups"],
      "placement_rate": "85%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Private Universities in HP", "UGC Recognized", "NAAC A"]
    },
    "facilities": ["Smart Classrooms", "Library", "Computer Labs", "Sports Complex", "Gym", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs"],
    "campus_size": "50+ Acres",
    "established_year": "2009",
    "student_intake": "150+ per batch",
    "faculty_count": "80+",
    "accreditation": ["UGC", "AICTE", "NAAC A"]
  },
  {
    "college_id": "smu",
    "slug": "smu",
    "name": "Sikkim Manipal University",
    "short_name": "SMU",
    "type": "Private University",
    "location": {
      "city": "Gangtok",
      "state": "Sikkim",
      "street_address": "Gangtok",
      "pincode": "737102",
      "google_map_link": "https://maps.app.goo.gl/smu"
    },
    "approved_by": ["UGC", "AICTE", "DEAC"],
    "exams_accepted": ["CAT", "MAT", "SMUET"],
    "courses_offered": ["Online MBA", "Online BBA", "Distance MBA"],
    "highlights": ["Distance Learning", "Affordable", "Industry Recognized"],
    "status": "active",
    "media": {
      "cover": "/colleges/smu.jpg"
    },
    "content": {
      "overview": "Sikkim Manipal University is a leading private university known for its distance learning and affordable education. Located in Gangtok, Sikkim, SMU offers quality management education through online and distance learning modes. The university has strong industry recognition and excellent support services. SMU provides flexible learning options for working professionals.",
      "admission": "Admission to SMU MBA is through CAT, MAT, or SMUET scores. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Personal Interview and evaluation of professional experience. The university values academic potential and career goals. Final selection is based on test scores, interview performance, and academic record."
    },
    "fees": {
      "mba_fee": "₹2-4 Lakhs",
      "hostel_fee": "N/A (Distance Learning)",
      "total_fee": "₹3-5 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["IT Companies", "Manufacturing", "Service Sector", "Startups"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "151-200",
      "other_rankings": ["Top Distance Learning Universities", "UGC Recognized", "DEAC Accredited"]
    },
    "facilities": ["Online Learning Platform", "Digital Library", "Virtual Classrooms", "Career Services", "Student Support"],
    "campus_size": "50+ Acres",
    "established_year": "1995",
    "student_intake": "1000+ per batch",
    "faculty_count": "100+",
    "accreditation": ["UGC", "AICTE", "DEAC", "NAAC A"]
  },
  {
    "college_id": "university-applied",
    "slug": "university-applied",
    "name": "University Applied",
    "short_name": "University Applied",
    "type": "EdTech",
    "location": {
      "city": "Online",
      "state": "Global",
      "street_address": "Online",
      "pincode": "000000",
      "google_map_link": "https://maps.app.goo.gl/university-applied"
    },
    "approved_by": ["Industry Recognized"],
    "exams_accepted": ["Direct Admission"],
    "courses_offered": ["Online Programs", "Certifications", "Skill Development"],
    "highlights": ["Online Learning", "Industry-Relevant", "Career Support"],
    "status": "active",
    "media": {
      "cover": "/colleges/universityApplied.jpg"
    },
    "content": {
      "overview": "University Applied is an EdTech platform known for its online learning and industry-relevant curriculum. The platform offers quality management education through flexible online programs, making it accessible to working professionals. University Applied emphasizes practical skills and career advancement. The institution provides excellent support services and a global learning community.",
      "admission": "Admission to University Applied is through direct admission. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Personal Interview and evaluation of professional experience. The platform values academic potential and career goals. Final selection is based on interview performance and academic record."
    },
    "fees": {
      "mba_fee": "₹2-4 Lakhs",
      "hostel_fee": "N/A (Online)",
      "total_fee": "₹3-5 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹4-5 LPA",
      "highest_package": "₹8-10 LPA",
      "top_recruiters": ["Tech Companies", "Startups", "Consulting", "Service Sector"],
      "placement_rate": "80%+"
    },
    "ranking": {
      "nirf_rank": "N/A (EdTech)",
      "other_rankings": ["Leading EdTech Platform", "Industry-Aligned Curriculum"]
    },
    "facilities": ["Online Learning Platform", "Digital Library", "Virtual Classrooms", "Career Services", "Student Support"],
    "campus_size": "N/A (Online)",
    "established_year": "2015",
    "student_intake": "500+ per batch",
    "faculty_count": "50+",
    "accreditation": ["Industry Recognized"]
  },
  {
    "college_id": "upgrad",
    "slug": "upgrad",
    "name": "Upgrad",
    "short_name": "Upgrad",
    "type": "EdTech",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "Mumbai",
      "pincode": "400001",
      "google_map_link": "https://maps.app.goo.gl/upgrad"
    },
    "approved_by": ["Industry Recognized"],
    "exams_accepted": ["Direct Admission"],
    "courses_offered": ["Online Programs", "Certifications", "Skill Development"],
    "highlights": ["Industry-Relevant", "Expert Faculty", "Career Support"],
    "status": "active",
    "media": {
      "cover": "/colleges/upgrad.jpg"
    },
    "content": {
      "overview": "Upgrad is a leading EdTech platform known for its industry-relevant curriculum and expert faculty. Based in Mumbai, Upgrad offers quality management education through flexible online programs. The platform emphasizes practical skills and career advancement with strong industry connections. Upgrad provides excellent support services and a global learning community.",
      "admission": "Admission to Upgrad is through direct admission. Candidates must have a bachelor's degree with minimum 50% aggregate. The selection process includes Personal Interview and evaluation of professional experience. The platform values academic potential and career goals. Final selection is based on interview performance and academic record."
    },
    "fees": {
      "mba_fee": "₹2-4 Lakhs",
      "hostel_fee": "N/A (Online)",
      "total_fee": "₹3-5 Lakhs (2 years)"
    },
    "placements": {
      "average_package": "₹5-7 LPA",
      "highest_package": "₹12-15 LPA",
      "top_recruiters": ["Tech Companies", "Startups", "Consulting", "Service Sector"],
      "placement_rate": "85%+"
    },
    "ranking": {
      "nirf_rank": "N/A (EdTech)",
      "other_rankings": ["Leading EdTech Platform", "Industry-Aligned Curriculum"]
    },
    "facilities": ["Online Learning Platform", "Digital Library", "Virtual Classrooms", "Career Services", "Student Support"],
    "campus_size": "N/A (Online)",
    "established_year": "2015",
    "student_intake": "1000+ per batch",
    "faculty_count": "100+",
    "accreditation": ["Industry Recognized"]
  },
  {
    "college_id": "wharton",
    "slug": "wharton",
    "name": "Wharton School",
    "short_name": "Wharton",
    "type": "Private University",
    "location": {
      "city": "Philadelphia",
      "state": "Pennsylvania",
      "street_address": "Philadelphia, PA 19104",
      "pincode": "19104",
      "google_map_link": "https://maps.app.goo.gl/wharton"
    },
    "approved_by": ["AACSB", "Middle States"],
    "exams_accepted": ["GMAT", "GRE"],
    "courses_offered": ["MBA", "Executive MBA", "Ph.D."],
    "highlights": ["Top B-School", "Global Network", "Research Excellence"],
    "status": "active",
    "media": {
      "cover": "/colleges/wharton.jpg"
    },
    "content": {
      "overview": "Wharton School is the world's premier business school, consistently ranked #1 globally. Located at the University of Pennsylvania in Philadelphia, Wharton offers world-class MBA programs with emphasis on leadership, innovation, and global business perspectives. The school has unparalleled industry connections, a powerful alumni network, and excellent placement record. Wharton's research excellence and thought leadership are recognized worldwide.",
      "admission": "Admission to Wharton MBA is through GMAT or GRE scores. Candidates must have a bachelor's degree with exceptional academic record. The selection process is highly competitive and includes Personal Interview, evaluation of professional experience, essays, and recommendations. The school values leadership potential, academic excellence, and diversity. Final selection is based on comprehensive evaluation of test scores, interview performance, work experience, essays, and overall profile fit."
    },
    "fees": {
      "mba_fee": "$80,000+ per year",
      "hostel_fee": "$15,000+ per year",
      "total_fee": "$180,000+ (2 years)"
    },
    "placements": {
      "average_package": "$175,000",
      "highest_package": "$250,000+",
      "top_recruiters": ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Morgan Stanley", "Amazon", "Google", "Microsoft", "Private Equity Firms"],
      "placement_rate": "98%+"
    },
    "ranking": {
      "nirf_rank": "N/A (International)",
      "other_rankings": ["#1 MBA Program Globally", "AACSB Accredited", "Ivy League"]
    },
    "facilities": ["Smart Classrooms", "Business Library", "Trading Floor", "Sports Complex", "Gymnasium", "Hostel", "Cafeteria", "Wi-Fi Campus", "Research Labs", "Incubation Center"],
    "campus_size": "300 Acres",
    "established_year": "1881",
    "student_intake": "850+ per batch",
    "faculty_count": "250+",
    "accreditation": ["AACSB", "Middle States", "AACSB"]
  }
];

// Helper function to get college by slug
export const getCollegeBySlug = (slug: string): College | undefined => {
  return collegesData.find(college => college.slug === slug);
};

// Helper function to get featured colleges
export const getFeaturedColleges = (limit: number = 4): College[] => {
  return collegesData.slice(0, limit);
};

// Helper function to get course names for college
export const getCourseNames = (courseIds: string[]): string[] => {
  return courseIds.map(id => {
    // Simple mapping for now - in real app, this would use getCourseById
    const courseMap: { [key: string]: string } = {
      'mba': 'MBA',
      'bba': 'BBA', 
      'executive-mba': 'Executive MBA',
      'pgdm': 'PGDM',
      'bcom': 'B.Com',
      'mca': 'MCA'
    };
    return courseMap[id] || id;
  });
};

// Helper function to get unique cities
export const getUniqueCities = (): string[] => {
  const cities = collegesData.map(college => college.location.city);
  return Array.from(new Set(cities)).sort();
};

// Helper function to get colleges by city
export const getCollegesByCity = (city: string): College[] => {
  return collegesData.filter(college =>
    college.location.city.toLowerCase() === city.toLowerCase()
  );
};

// Helper function to get unique states
export const getUniqueStates = (): string[] => {
  const states = collegesData.map(college => college.location.state);
  return Array.from(new Set(states)).sort();
};

// Helper function to get unique types
export const getUniqueTypes = (): string[] => {
  const types = collegesData.map(college => college.type);
  return Array.from(new Set(types)).sort();
};
