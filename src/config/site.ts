export interface PlanItem {
  id: string;
  name: string;
  duration: string;
  price: string; // e.g. "₹1,999" or empty "" / "[PRICE]" to trigger "Get a quote"
  period: string;
  popular?: boolean;
  features: string[];
}

export interface SeatItem {
  id: string; // e.g. "A1"
  number: number;
  status: "available" | "occupied";
  category?: "Standard Desk" | "Window View" | "Corner Focus";
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const siteConfig = {
  name: "Dream Catcher Study Lounge",
  tagline: "Dream Big. Stay Focused.",
  subTagline: "Turn Your Dreams Into Reality.",
  alternateTaglines: [
    "Study. Focus. Achieve.",
    "Your space to focus, learn and achieve.",
  ],
  description:
    "A premium, silent, air-conditioned study space in East Fort, Thrissur, Kerala for CA, CMA, ACCA, MBBS/NEET PG, PSC, and UPSC aspirants.",
  shortDescription:
    "A calm, quiet, air-conditioned haven designed specifically for serious aspirants seeking absolute silence and relentless focus.",
  
  // Client edit notice: Update these details as needed
  contact: {
    phonePrimary: "9947087014",
    phoneSecondary: "7306004752",
    phoneDisplayPrimary: "+91 99470 87014",
    phoneDisplaySecondary: "+91 73060 04752",
    whatsappNumber: "919947087014",
    whatsappUrl: "https://wa.me/919947087014",
    instagramHandle: "dreamcatcher_studylounge",
    instagramUrl: "https://www.instagram.com/dreamcatcher_studylounge",
    email: "enquiry@dreamcatcherstudylounge.com",
    address: "[ADDRESS: Near East Fort Junction, East Fort, Thrissur, Kerala - 680005]",
    landmark: "[LANDMARK: Walking distance from East Fort junction, close to major coaching centers]",
    mapsUrl: "https://maps.app.goo.gl/y315DfDwiqAWNNQq9",
    openingHoursText: "[TIMINGS: Open Daily 6:00 AM – 11:30 PM (24/7 access option for registered members)]",
  },

  // Trust Strip Highlights
  trustHighlights: [
    { title: "Fully Air-Conditioned", sub: "Climate controlled focus" },
    { title: "High-Speed Wi-Fi", sub: "Uninterrupted lectures" },
    { title: "Pin-Drop Silence", sub: "Distraction-free environment" },
    { title: "24/7 CCTV Safety", sub: "Safe for late study hours" },
  ],

  // 12 Facilities
  facilities: [
    {
      id: "wifi",
      title: "High-Speed Wi-Fi",
      description: "Dedicated fiber network optimized for live lectures, video streams, and research without buffer lag.",
      iconName: "Wifi",
    },
    {
      id: "ac",
      title: "Fully Air-Conditioned",
      description: "Constant, whisper-quiet climate control keeping you fresh and alert across long study marathons.",
      iconName: "Wind",
    },
    {
      id: "cubicles",
      title: "Individual Numbered Cubicles",
      description: "Private wooden acoustic partitioned desks (A1–A20) designed to keep your line of sight private.",
      iconName: "LayoutGrid",
    },
    {
      id: "silent",
      title: "Silent Environment",
      description: "Strict zero-talking and phone-silence protocol maintained to ensure uninterrupted mental flow.",
      iconName: "VolumeX",
    },
    {
      id: "charging",
      title: "Charging Point at Every Seat",
      description: "Dedicated high-amp power sockets at every desk for laptops, tablets, phones, and desk lamps.",
      iconName: "Zap",
    },
    {
      id: "ergonomic",
      title: "Ergonomic Seating",
      description: "High-grade contoured mesh chairs with lumbar support to protect your posture during 10+ hour shifts.",
      iconName: "Armchair",
    },
    {
      id: "library",
      title: "Library Corner",
      description: "Curated reference materials, syllabus breakdowns, and peaceful quiet browsing shelving.",
      iconName: "BookOpen",
    },
    {
      id: "refreshments",
      title: "Tea & Snacks",
      description: "Dedicated pantry area with hot tea, coffee, and light wholesome snacks to recharge your mind.",
      iconName: "Coffee",
    },
    {
      id: "cctv",
      title: "CCTV Safety",
      description: "Full indoor and entry perimeter HD surveillance providing peaceful reassurance day and night.",
      iconName: "ShieldCheck",
    },
    {
      id: "hours",
      title: "Flexible Hours",
      description: "Convenient schedules customized to early morning revision or intensive late-night prep routines.",
      iconName: "Clock",
    },
    {
      id: "water",
      title: "Drinking Water Facility",
      description: "Multi-stage purified hot, warm, and chilled RO drinking water available throughout the day.",
      iconName: "Droplet",
    },
    {
      id: "hostel",
      title: "Hostel Support",
      description: "Verified nearby hostel and PG accommodation tie-ups for outstation students in Thrissur.",
      iconName: "Home",
    },
  ] as FacilityItem[],

  // Target aspirants
  targetAudience: [
    {
      exam: "Chartered Accountancy (CA)",
      desc: "Foundation, Inter & Final students preparing for extensive revision batches.",
      badge: "CA Inter / Final",
    },
    {
      exam: "CMA & ACCA",
      desc: "Global finance and management accounting candidates tackling heavy case study modules.",
      badge: "Professional Finance",
    },
    {
      exam: "MBBS / MD / NEET PG",
      desc: "Doctors and medical graduates needing deep, undisturbed hours for recall & question banks.",
      badge: "Medical Post-Grad",
    },
    {
      exam: "UPSC Civil Services",
      desc: "IAS / IPS / IFS aspirants covering vast syllabi, answer-writing, and daily newspapers.",
      badge: "Civil Services",
    },
    {
      exam: "Kerala PSC (KAS & Degree)",
      desc: "Candidates targeting Secretariat Assistant, KAS, and departmental competitive exams.",
      badge: "State Services",
    },
    {
      exam: "Judiciary & Law (CLAT PG / Judicial)",
      desc: "Dedicated law graduates conducting exhaustive case law readings and statutory analysis.",
      badge: "Legal Aspirants",
    },
  ],

  // Plans config
  // Leave price as "" or "[PRICE]" to trigger dynamic "Get a Quote" mode.
  plans: [
    {
      id: "daily",
      name: "Daily Access Pass",
      duration: "1 Day",
      price: "", // Set e.g. "₹120" or leave empty to show "Get a quote"
      period: "per day",
      features: [
        "Full day AC study access",
        "High-speed fiber Wi-Fi",
        "Individual cubicle with charging",
        "Purified drinking water",
        "Access to pantry & snacks",
      ],
    },
    {
      id: "monthly",
      name: "Monthly Resident Member",
      duration: "30 Days",
      price: "", // Set e.g. "₹2,200" or leave empty to show "Get a quote"
      period: "per month",
      popular: true,
      features: [
        "Dedicated reserved cubicle (choose seat)",
        "Overnight book storage locker privilege",
        "High-speed fiber Wi-Fi unlimited",
        "Complimentary tea & coffee",
        "Priority access during peak exam months",
        "24/7 CCTV safe environment",
      ],
    },
    {
      id: "quarterly",
      name: "Intensive Exam Quarter",
      duration: "90 Days",
      price: "", // Set e.g. "₹5,900" or leave empty to show "Get a quote"
      period: "per 3 months",
      features: [
        "Locked-in seat reservation for entire exam cycle",
        "Guaranteed desk allocation & personal shelf",
        "Hostel assistance priority if needed",
        "Maximum savings for long-term focus",
        "Complimentary beverage allowances",
        "Zero registration fee",
      ],
    },
  ] as PlanItem[],

  // Seat Availability Grid (A1 to A20)
  // Edit here: "available" or "occupied"
  seats: [
    { id: "A1", number: 1, status: "occupied", category: "Standard Desk" },
    { id: "A2", number: 2, status: "occupied", category: "Standard Desk" },
    { id: "A3", number: 3, status: "available", category: "Standard Desk" },
    { id: "A4", number: 4, status: "available", category: "Standard Desk" },
    { id: "A5", number: 5, status: "available", category: "Standard Desk" },
    { id: "A6", number: 6, status: "occupied", category: "Corner Focus" },
    { id: "A7", number: 7, status: "available", category: "Standard Desk" },
    { id: "A8", number: 8, status: "available", category: "Standard Desk" },
    { id: "A9", number: 9, status: "occupied", category: "Standard Desk" },
    { id: "A10", number: 10, status: "available", category: "Standard Desk" },
    { id: "A11", number: 11, status: "available", category: "Corner Focus" },
    { id: "A12", number: 12, status: "occupied", category: "Standard Desk" },
    { id: "A13", number: 13, status: "available", category: "Standard Desk" },
    { id: "A14", number: 14, status: "available", category: "Standard Desk" },
    { id: "A15", number: 15, status: "occupied", category: "Standard Desk" },
    { id: "A16", number: 16, status: "available", category: "Window View" },
    { id: "A17", number: 17, status: "available", category: "Standard Desk" },
    { id: "A18", number: 18, status: "occupied", category: "Standard Desk" },
    { id: "A19", number: 19, status: "available", category: "Window View" },
    { id: "A20", number: 20, status: "available", category: "Corner Focus" },
  ] as SeatItem[],

  // Gallery items using the authentic uploaded photos
  gallery: [
    {
      id: "real-cubicles",
      src: "/images/interior-real.png",
      alt: "Dream Catcher Study Lounge cubicles A1 to A20 with ergonomic chairs and AC",
      caption: "Spacious individual cubicles with ergonomic seating and warm natural lighting",
    },
    {
      id: "feature-wall",
      src: "/images/interior-feature-wall.png",
      alt: "Dream Big Stay Focused signature green wall and cubicles",
      caption: "The signature green inspiration wall: 'Dream Big. Stay Focused.'",
    },
    {
      id: "warm-cubicles",
      src: "/images/interior-cubicles-warm.png",
      alt: "Cubicles with warm integrated desk lighting and wooden partitions",
      caption: "Warm ambiance and acoustic wooden dividers designed for deep concentration",
    },
    {
      id: "amenities-board",
      src: "/images/flyer-features.png",
      alt: "Full list of verified amenities at Dream Catcher Study Lounge",
      caption: "Comprehensive study facilities tailored for rigorous professional exams",
    },
  ],

  // Hostel & Accommodation
  hostelInfo: {
    title: "Safe Student Hostel & Accommodation Assistance",
    description:
      "Relocating to Thrissur for your coaching or exam semester? We partner with verified, safe, and hygienic men's and women's hostels within walking distance of Dream Catcher Study Lounge.",
    points: [
      "Walking distance from East Fort study lounge",
      "Separate accommodation options for male and female aspirants",
      "Nutritious Kerala home-cooked food options available",
      "High security and quiet residential locality",
    ],
  },

  // Frequently Asked Questions
  faqs: [
    {
      question: "What are the daily operating hours of Dream Catcher Study Lounge?",
      answer:
        "We are open seven days a week, from early morning 6:00 AM until 11:30 PM. 24-hour round-the-clock access options are available for registered monthly aspirants upon request.",
    },
    {
      question: "Can I try the study lounge for a trial day before taking a monthly plan?",
      answer:
        "Yes, we welcome aspirants to experience the silence and comfort with our Daily Pass. Once you experience the focus environment, you can seamlessly upgrade to a monthly reserved seat.",
    },
    {
      question: "Do I get a permanent dedicated seat or do I have to search for one every day?",
      answer:
        "Monthly and quarterly members receive a dedicated numbered desk (e.g., A1, A4, A16) reserved strictly for them. You can leave your study materials in your desk cubicle without worry.",
    },
    {
      question: "Is there a hostel or PG facility nearby for outstation students?",
      answer:
        "Yes. We offer curated hostel and PG tie-ups nearby in East Fort, Thrissur for both male and female students with clean rooms and food facilities.",
    },
    {
      question: "What is the policy regarding mobile phones and group discussions?",
      answer:
        "To protect every aspirant's focus, the study lounge operates under a strict pin-drop silence policy. All mobile devices must remain on silent mode. Calls and casual discussions are restricted to the exterior entrance zone.",
    },
  ] as FAQItem[],
};
