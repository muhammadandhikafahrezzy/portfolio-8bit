export interface Project {
  id: string;
  title: string;
  title_en?: string;
  category: "Data Analysis" | "Business Intelligence" | "UI/UX & Web";
  subtitle: string;
  subtitle_en?: string;
  description: string;
  description_en?: string;
  longDescription: string[];
  longDescription_en?: string[];
  role: string;
  role_en?: string;
  tools: string[];
  highlights: string[];
  highlights_en?: string[];
  icon: "database" | "chart" | "monitor" | "gamepad";
  demoUrl?: string;
  demoLabel?: string;
  demoLabel_en?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  secondaryLabel_en?: string;
  githubUrl?: string;
  certificateUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  role_en?: string;
  period: string;
  period_en?: string;
  yearRange: string;
  badge: string;
  badge_en?: string;
  points: string[];
  points_en?: string[];
  certificateFile?: string;
  certificateType?: "image" | "pdf";
}

export interface Certificate {
  id: string;
  title: string;
  title_en?: string;
  issuer: string;
  issuer_en?: string;
  date: string;
  date_en?: string;
  credentialId?: string;
  credentialUrl?: string;
  description: string;
  description_en?: string;
  fileUrl?: string;
  fileType?: "image" | "pdf";
}

export interface SkillCategory {
  title: string;
  title_en?: string;
  icon: string;
  skills: { name: string; level: number; iconText?: string }[];
}

export const PORTFOLIO_DATA = {
  hero: {
    greeting: "DATA • ANALYSIS • INSIGHT",
    title: "DATA ANALYST\nPORTFOLIO",
    subtitle: "Finding patterns. Answering questions. Making data useful.",
    cta: "JELAJAHI INSIGHT DATA",
    cta_en: "EXPLORE DATA INSIGHTS",
    characterName: "MUHAMMAD ANDHIKA FAHREZZY",
    role: "Data Analyst & Business Intelligence",
  },
  about: {
    dialogue: "SIAPA SAYA? SEORANG DATA ANALYST LULUSAN S1 SISTEM INFORMASI UNESA (JULI 2026, IPK 3.69) YANG BERFOKUS PADA PENGOLAHAN DATA BISNIS, QUERY SQL, ANALISIS PYTHON, DAN DASHBOARD VISUALISASI TABLEAU/LOOKER STUDIO!",
    dialogue_en: "WHO AM I? A DATA ANALYST GRADUATE FROM UNESA INFORMATION SYSTEMS (JULY 2026, 3.69 GPA) SPECIALIZING IN BUSINESS DATA WRANGLING, SQL QUERIES, PYTHON ANALYTICS, AND INTERACTIVE TABLEAU/LOOKER STUDIO DASHBOARDS!",
    name: "Muhammad Andhika Fahrezzy",
    title: "Data Analyst (Lulusan S1 SI UNESA)",
    title_en: "Data Analyst (B.CS in Information Systems)",
    degree: "S1 Sistem Informasi — Universitas Negeri Surabaya",
    degree_en: "Bachelor of Information Systems — State University of Surabaya",
    graduation: "Lulus / Selesai: Juli 2026",
    graduation_en: "Graduated: July 2026",
    gpa: "IPK 3.69 / 4.00",
    gpa_en: "3.69 / 4.00 GPA",
    location: "Depok / Surabaya, Indonesia",
    bio: "Lulusan S1 Sistem Informasi Universitas Negeri Surabaya (Juli 2026, IPK 3.69) dengan fokus keahlian kuat dalam Analisis Data Bisnis, Data Cleaning & Preprocessing, SQL Database Querying, Pemodelan Data, dan Visualisasi Interaktif Tableau. Berpengalaman langsung mengelola operasional data warehouse di Kopkar PT Astra Honda Motor, menganalisis perkembangan koperasi, serta bersertifikasi resmi Data Analyst for Business dari Bitlabs Academy.",
    bio_en: "Information Systems graduate from State University of Surabaya (July 2026, 3.69 GPA) with strong technical focus in Business Data Analytics, Data Cleaning & Preprocessing, SQL Querying, Data Modeling, and Interactive Tableau Dashboards. Experienced in operational data warehousing at Kopkar PT Astra Honda Motor and certified in Data Analytics for Business via Bitlabs Academy.",
    stats: {
      level: 23,
      classType: "Data Analyst & BI Specialist",
      hp: "100/100",
      mp: "100/100",
      exp: "3.69 / 4.00 (Lulus Jul 2026)",
      exp_en: "3.69 / 4.00 GPA (Graduated Jul 2026)",
      specialMove: "SQL Optimization & Interactive Dashboard Magic",
    },
    skillCategories: [
      {
        title: "Data & Analitik Inti",
        title_en: "Core Data & Analytics",
        icon: "📊",
        skills: [
          { name: "SQL (MySQL / PostgreSQL)", level: 92 },
          { name: "Python (Pandas, NumPy)", level: 88 },
          { name: "Google BigQuery", level: 82 },
          { name: "Data Cleaning & Preprocessing", level: 95 },
          { name: "Exploratory Data Analysis (EDA)", level: 90 },
          { name: "Advanced Excel (Pivot, VLOOKUP)", level: 94 },
        ],
      },
      {
        title: "Visualisasi & Business Intelligence",
        title_en: "Visualization & BI",
        icon: "📈",
        skills: [
          { name: "Tableau Dashboard", level: 88 },
          { name: "Looker Studio", level: 90 },
          { name: "Business KPI & Metrics", level: 88 },
          { name: "Operational Reporting", level: 92 },
          { name: "Data Storytelling", level: 86 },
          { name: "Inventory & Sales Analytics", level: 90 },
        ],
      },
      {
        title: "Desain UI/UX & Web (Nilai Tambah)",
        title_en: "UI/UX & Web Design (Plus Skill)",
        icon: "💻",
        skills: [
          { name: "Figma (Web & Mobile Prototyping)", level: 92 },
          { name: "Human-Computer Interaction (HCI)", level: 90 },
          { name: "Next.js & Tailwind CSS", level: 85 },
          { name: "Usability Testing & User Flow", level: 88 },
          { name: "Git / GitHub", level: 85 },
          { name: "Wix.com & Web Layout", level: 88 },
        ],
      },
    ] as SkillCategory[],
  },

  // Projects faithfully extracted with authentic links & bilingual descriptions
  projects: [
    {
      id: "ahm-data-analytics",
      title: "Kopkar AHM Data Warehouse & Cooperative Analytics",
      title_en: "AHM Employees Cooperative — Data Warehouse & Growth Analytics",
      category: "Data Analysis",
      subtitle: "Analisis Data Operasional, Stok Gudang & Perkembangan Koperasi",
      subtitle_en: "Operational Data Pipelines, Warehouse Inventory Accuracy & Member Loans Analysis",
      description: "Pengolahan dan analisis basis data operasional bulanan pinjaman anggota, purchase order, dan stok persediaan di Kopkar PT Astra Honda Motor.",
      description_en: "End-to-end processing and analytics of monthly cooperative operations, including member loan portfolios, purchase orders, and warehouse inventory at PT Astra Honda Motor's Employee Cooperative.",
      longDescription: [
        "Menyusun dan memelihara catatan basis data operasional bulanan mencakup pinjaman anggota, pesanan pembelian, stok persediaan, dan penjualan toko.",
        "Melakukan data cleaning, kontrol kondisi persediaan, dan analisis akurasi catatan barang gudang untuk meminimalkan selisih stok.",
        "Menganalisis data perkembangan koperasi tahun 2023-2024 serta menyajikan temuan strategis kepada jajaran pengurus dan karyawan melalui visualisasi data & reporting berkala.",
        "Melakukan pengujian usability dan kualitas data aplikasi toko online Toko AHM versi 2 dan 3.",
      ],
      longDescription_en: [
        "Architected and maintained monthly operational databases tracking member micro-loans, purchase orders, warehouse inventory, and retail sales transactions.",
        "Conducted thorough data cleaning and reconciliation audits on warehouse stock, dramatically reducing physical vs. digital inventory discrepancies.",
        "Analyzed 2023-2024 cooperative financial growth metrics and delivered executive reporting decks with data visualizations to senior board members.",
        "Executed data QA and usability audits on the Toko AHM e-commerce app (v2 & v3), ensuring transaction accuracy and checkout reliability.",
      ],
      role: "Data Warehouse & IT Support Intern",
      role_en: "Data Warehouse & IT Analytics Intern",
      tools: ["MySQL", "Data Cleaning", "Data Visualization", "Spreadsheet", "Inventory Analytics"],
      highlights: [
        "Analisis Perkembangan Koperasi Periode 2023-2024",
        "Peningkatan Akurasi Stok Persediaan Gudang",
        "Dashboard Laporan Operasional Bulanan",
      ],
      highlights_en: [
        "2023-2024 Cooperative Growth Trend Decomposition",
        "Warehouse Inventory Data Accuracy & Stock Reconciliation",
        "Automated Monthly Operations & Loan Health Reports",
      ],
      icon: "database",
      certificateUrl: "/Sertifikat magang kopkar.jpg",
      demoLabel: "LIHAT SERTIFIKAT MAGANG KOPKAR AHM",
      demoLabel_en: "VIEW AHM INTERNSHIP CREDENTIAL",
    },
    {
      id: "bitlabs-business-analytics",
      title: "Business Performance & Sales Intelligence Dashboard",
      title_en: "Executive Sales Intelligence & Customer Behavior Dashboard",
      category: "Business Intelligence",
      subtitle: "Analisis Kinerja Bisnis, Segmentasi & Metrik Penjualan Eksekutif",
      subtitle_en: "Multi-Dimensional Revenue Analysis, Customer Cohorts & KPI Monitoring",
      description: "Proyek analisis data bisnis komprehensif menggunakan SQL dan Tableau untuk mengidentifikasi tren penjualan, perilaku pelanggan, dan peluang efisiensi biaya.",
      description_en: "A comprehensive business intelligence capstone leveraging advanced SQL and interactive Tableau dashboards to uncover revenue drivers, customer retention trends, and margin optimization opportunities.",
      longDescription: [
        "Mengekstrak dan mentransformasi data mentah transaksi bisnis menggunakan query SQL (Aggregations, Window Functions, JOINs).",
        "Melakukan Exploratory Data Analysis (EDA) untuk menemukan pola retensi pelanggan, produk terlaris, dan distribusi pendapatan wilayah.",
        "Membangun dashboard interaktif Tableau & Looker Studio dengan metrik KPI dinamis untuk mempermudah pengambilan keputusan manajerial.",
        "Menyusun rekomendasi bisnis berbasis data (data-driven strategy) bagi stakeholder.",
      ],
      longDescription_en: [
        "Extracted, filtered, and transformed massive transaction tables using advanced SQL techniques (Window Functions, CTEs, Multi-Table JOINs).",
        "Conducted in-depth Exploratory Data Analysis (EDA) to map customer retention cohorts, identify top revenue-generating SKUs, and pinpoint regional performance gaps.",
        "Built interactive Tableau & Looker Studio executive dashboards featuring dynamic parameter filters and drill-down KPI hierarchies.",
        "Synthesized raw analytical findings into concise, actionable business recommendations for executive leadership.",
      ],
      role: "Data Analyst Participant",
      role_en: "Lead Data Analyst Participant",
      tools: ["SQL", "Tableau", "Python", "EDA", "Business Intelligence", "Looker Studio"],
      highlights: [
        "Interactive Executive Tableau Dashboard",
        "Customer & Revenue Trend Analysis via SQL",
        "Actionable Business Insights & Strategy",
      ],
      highlights_en: [
        "Interactive Executive Tableau Dashboard with Dynamic Filters",
        "Cohort & Revenue Trend Analytics Engineered with SQL",
        "Data-Backed Recommendations for Revenue Growth & Cost Efficiency",
      ],
      icon: "chart",
      githubUrl: "https://github.com/muhammadandhikafahrezzy",
      demoLabel: "LIHAT REPOSITORI GITHUB",
      demoLabel_en: "VIEW GITHUB REPOSITORY",
    },
    {
      id: "moora-vendor-picker",
      title: "MooraVendorPicker — Decision Support System (DSS) UI/UX Design",
      title_en: "MooraVendorPicker — Multi-Criteria Decision Support System (DSS)",
      category: "UI/UX & Web",
      subtitle: "Desain Antarmuka Web & Mobile Sistem Pengambilan Keputusan MOORA",
      subtitle_en: "Web & Mobile Interface Design for Multi-Objective Optimization by Ratio Analysis",
      description: "Perancangan desain antarmuka web dan mobile menggunakan Figma untuk sistem pendukung keputusan (DSS) berbasis metode multiobjektif MOORA.",
      description_en: "Complete UI/UX product design for a Decision Support System leveraging the mathematical MOORA method to score and rank optimal vendors automatically.",
      longDescription: [
        "Merancang antarmuka website dan mobile app yang interaktif dan responsif menggunakan Figma untuk sistem Decision Support System (DSS).",
        "Mengimplementasikan hierarki visual yang jelas untuk menampilkan tahapan perhitungan metode MOORA (Multi-Objective Optimization by Ratio Analysis) secara intuitif.",
        "Membuat alur pengguna (user flow) dan wireframe interaktif yang mempermudah pimpinan/stakeholder memasukkan kriteria dan melihat perankingan otomatis.",
        "Menerapkan prinsip desain UI/UX modern dengan layout rapi dan navigasi yang mudah dipahami.",
      ],
      longDescription_en: [
        "Designed responsive web and mobile app interfaces in Figma for an analytical Decision Support System (DSS).",
        "Structured intuitive visual hierarchies that demystify complex mathematical normalization and weighting matrices under the MOORA method.",
        "Engineered smooth user flows and interactive prototypes enabling business leaders to customize decision criteria and inspect automated rankings in seconds.",
        "Applied modern, clean UI design principles with accessibility and high usability standards.",
      ],
      role: "UI/UX Designer (Figma Prototyping)",
      role_en: "Product & UI/UX Designer",
      tools: ["Figma", "UI/UX Design", "Decision Support System (DSS)", "MOORA Method", "Prototyping"],
      highlights: [
        "Desain Antarmuka Web & Mobile Figma Interaktif",
        "Visualisasi Alur Multi-Objective MOORA",
        "Prototipe User-Friendly untuk Stakeholder",
      ],
      highlights_en: [
        "Interactive Dual-Platform (Web & Mobile) Figma Prototypes",
        "Clear Mathematical Workflow Visualization for Decision Makers",
        "User-Tested Interface with Seamless Data Input & Automated Output",
      ],
      icon: "monitor",
      demoUrl: "https://www.figma.com/file/nkdWNCdooHmHJ8fCMHCRKU/Figma-basics?type=design&node-id=514%3A14&mode=design&t=pBYvN6fXUB2bwhlW-1",
      demoLabel: "BUKA PROTOTIPE FIGMA (MOORAVENDORPICKER)",
      demoLabel_en: "OPEN FIGMA PROTOTYPE (MOORAVENDORPICKER)",
    },
    {
      id: "teknopolis-project-management",
      title: "Teknopolis — Sistem Perizinan Pendidikan OSS & Manajemen Proyek",
      title_en: "Teknopolis — OSS Educational Licensing Architecture & Project Leadership",
      category: "UI/UX & Web",
      subtitle: "Arsitektur Informasi & Desain Sistem Perizinan Terintegrasi OSS",
      subtitle_en: "Information Architecture & Dual-Platform Design for Online Single Submission (OSS)",
      description: "Proyek manajemen sistem informasi semester 5. Merancang arsitektur informasi, alur data regulasi OSS, serta desain prototipe Web dan Mobile menggunakan Figma dari tahap analisis hingga peluncuran publik.",
      description_en: "End-to-end information architecture and product design for an Online Single Submission (OSS) educational licensing system, managing project workflows from research to interactive release.",
      longDescription: [
        "Memimpin perancangan antarmuka (Designer) untuk website dan aplikasi mobile menggunakan Figma dalam konteks mata kuliah Manajemen Proyek Sistem Informasi.",
        "Menganalisis regulasi perizinan pendidikan dan alur Online Single Submission (OSS) menjadi arsitektur informasi yang efisien dan minim friksi.",
        "Berkolaborasi langsung dengan tim developer untuk memastikan kesesuaian implementasi desain teknis dan stabilitas prototipe.",
        "Menyusun dokumentasi proyek, aset visual, dan memandu tahapan proyek dari analisis awal hingga rilis publik.",
      ],
      longDescription_en: [
        "Led product design efforts for web and mobile interfaces using Figma as part of an intensive Information Systems Project Management practicum.",
        "Decoded complex regulatory frameworks into clean, low-friction information architectures tailored for institutional licensing applicants.",
        "Collaborated closely with software developers to ensure pixel-perfect front-end implementation and state management alignment.",
        "Authored project milestones, sprint retrospectives, and visual design systems from requirements gathering to final public demo.",
      ],
      role: "UI/UX Designer & Information Architect",
      role_en: "Lead UI/UX Designer & Information Architect",
      tools: ["Figma", "Information Architecture", "Project Management", "User Flow", "Design System"],
      highlights: [
        "Desain Dual Platform (Web & Mobile Prototype Figma)",
        "Pemodelan Alur Data Regulasi OSS",
        "Pengalaman Manajemen Proyek End-to-End",
      ],
      highlights_en: [
        "Dual-Platform Web & Mobile Interactive Prototypes in Figma",
        "Simplified Regulatory Compliance Workflow Modeling",
        "Agile Project Management Delivery from Discovery to Deployment",
      ],
      icon: "monitor",
      demoUrl: "https://www.figma.com/file/6PGk66ynXSnRIuKOshbm4U/Website-Teknopolis?type=design&node-id=0%3A1&mode=design&t=0iEJy4VYoYCGc8Xq-1",
      demoLabel: "BUKA FIGMA: TEKNOPOLIS WEB",
      demoLabel_en: "OPEN FIGMA: TEKNOPOLIS WEB",
      secondaryUrl: "https://www.figma.com/file/6PGk66ynXSnRIuKOshbm4U/Website-Teknopolis?type=design&node-id=4-1187&mode=design&t=gpu4hMIsvOZNRuZr-0",
      secondaryLabel: "BUKA FIGMA: TEKNOPOLIS MOBILE",
      secondaryLabel_en: "OPEN FIGMA: TEKNOPOLIS MOBILE",
    },
    {
      id: "unesa-health-care",
      title: "Unesa Health Care — Platform Interaksi Manusia & Komputer (HCI)",
      title_en: "Unesa Health Care — Human-Computer Interaction (HCI) Medical Portal",
      category: "UI/UX & Web",
      subtitle: "Desain Antarmuka Layanan Kesehatan Kampus Interaktif & User-Centered",
      subtitle_en: "User-Centered Campus Healthcare Platform Built on HCI Principles",
      description: "Perancangan antarmuka website dan aplikasi mobile layanan kesehatan terpadu berbasis prinsip Human-Computer Interaction (HCI) menggunakan Figma dan Wix.com.",
      description_en: "Integrated campus healthcare web and mobile interface crafted through rigorous Human-Computer Interaction (HCI) research, color psychology, and live interactive deployment.",
      longDescription: [
        "Menerapkan prinsip Human-Computer Interaction (HCI) untuk merancang antarmuka website dan mobile yang menarik, intuitif, dan mudah digunakan oleh mahasiswa dan staf kampus.",
        "Mengeksplorasi hierarki visual, psikologi warna, tipografi, dan komposisi objek untuk menciptakan pengalaman pengguna yang nyaman.",
        "Membangun prototipe interaktif di Figma serta implementasi web menggunakan platform Wix.com.",
        "Melakukan usability testing untuk mengidentifikasi potensi kendala navigasi pengguna.",
      ],
      longDescription_en: [
        "Applied human-computer interaction (HCI) methodologies to design accessible, frictionless healthcare portals for university students and faculty.",
        "Conducted color psychology, typography scale, and layout composition studies to create reassuring and clear patient navigation flows.",
        "Developed interactive Figma prototypes alongside a live web implementation on Wix.com.",
        "Conducted structured usability tests to isolate navigation bottlenecks and streamline appointment booking times.",
      ],
      role: "HCI & UI/UX Designer",
      role_en: "HCI & UI/UX Product Designer",
      tools: ["Figma", "Wix.com", "Human-Computer Interaction (HCI)", "UI/UX Design", "Usability Testing"],
      highlights: [
        "Penerapan Teori Interaksi Manusia & Komputer (HCI)",
        "Desain Web & Mobile Responsif",
        "Prototipe Interaktif Figma & Wix.com",
      ],
      highlights_en: [
        "Applied Human-Computer Interaction (HCI) Research & User Testing",
        "Fully Responsive Web & Mobile Layout Architecture",
        "Live Production Deployment with Live Booking Workflows",
      ],
      icon: "monitor",
      demoUrl: "https://ali21069.wixsite.com/kel-4/services-4",
      demoLabel: "KUNJUNGI WEB LIVE (UNESA HEALTH CARE)",
      demoLabel_en: "EXPLORE LIVE SITE (UNESA HEALTH CARE)",
    },
    {
      id: "kanaya-digital-assets",
      title: "PT Kanaya Multi Karya — Digital Assets & Web Design",
      title_en: "PT Kanaya Multi Karya — Digital Marketing Assets & Visual Branding",
      category: "UI/UX & Web",
      subtitle: "Desain Aset Digital Promosi Web Perusahaan Rental Kendaraan",
      subtitle_en: "Targeted Promotional Media & Web Assets for Fleet Mobility Company",
      description: "Pembuatan 40+ materi desain poster promosi web dengan riset tren audiens, pemilihan palet warna, tipografi, dan optimalisasi tata letak web responsif.",
      description_en: "Production of 40+ targeted digital marketing assets, visual promotional banners, and responsive web graphics engineered through audience trend research and brand guidelines.",
      longDescription: [
        "Merancang 40+ materi desain visual dan poster web promosi untuk PT Kanaya Multi Karya (perusahaan rental kendaraan).",
        "Mengembangkan keahlian dalam pemilihan warna, font, layout, dan elemen desain yang selaras dengan tujuan bisnis perusahaan.",
        "Mengoptimalkan aset grafis agar tampil tajam, cepat dimuat, dan responsif di berbagai perangkat dan browser web.",
        "Berkolaborasi dengan tim pengembang untuk integrasi aset ke platform digital.",
      ],
      longDescription_en: [
        "Crafted 40+ promotional graphics and digital web campaign assets for vehicle rental firm PT Kanaya Multi Karya.",
        "Honed mastery in color theory, brand typography, and visual hierarchy directly aligned with commercial conversion goals.",
        "Optimized raster and vector web assets for lightning-fast load times across mobile and desktop viewports.",
        "Collaborated with digital marketing teams to integrate branded assets into marketing funnels.",
      ],
      role: "Graphic & Web Asset Designer Intern",
      role_en: "Graphic & Digital Asset Design Intern",
      tools: ["Figma", "Adobe Illustrator", "Canva", "Layout Optimization", "Typography & Color Harmony"],
      highlights: [
        "40+ Materi Desain Poster Promosi Web",
        "Optimalisasi Aset Web Lintas Perangkat",
        "Peningkatan Daya Tarik Visual Brand",
      ],
      highlights_en: [
        "40+ High-Converting Promotional Web & Social Assets",
        "Cross-Device Asset Optimization for High Performance",
        "Measurable Lift in Brand Engagement and Visual Consistency",
      ],
      icon: "monitor",
      demoUrl: "https://drive.google.com/drive/folders/1VyyeR9vSLB50BospMxy3uw1pZWYV_Vef?usp=sharing",
      demoLabel: "LIHAT HASIL KARYA (GOOGLE DRIVE FOLDER)",
      demoLabel_en: "VIEW ASSET SHOWCASE (GOOGLE DRIVE)",
    },
  ] as Project[],

  // Ordered Chronologically from OLDEST (2020) to NEWEST (2026)
  experiences: [
    {
      id: "kanaya",
      company: "PT Kanaya Multi Karya",
      location: "Bekasi, Jawa Barat, Indonesia",
      role: "Magang Desain Grafis & Aset Digital",
      role_en: "Graphic & Digital Asset Design Intern",
      period: "Mar 2020 - Jul 2020",
      period_en: "Mar 2020 - Jul 2020",
      yearRange: "2020",
      badge: "STAGE 01: CREATIVE & ASSETS",
      badge_en: "STAGE 01: CREATIVE & ASSETS",
      points: [
        "Membuat 40+ materi desain poster web promosi dengan riset tren preferensi target audiens.",
        "Berkolaborasi dengan tim developer untuk memastikan integritas dan kesesuaian aset visual digital.",
        "Mengembangkan pemahaman awal integrasi aset visual ke dalam platform digital bisnis.",
      ],
      points_en: [
        "Produced 40+ promotional digital graphics and web banners guided by target audience research.",
        "Coordinated with development teams to ensure pixel-perfect asset delivery and web integration.",
        "Built early expertise in how visual storytelling drives user interest in commercial web platforms.",
      ],
    },
    {
      id: "ahm",
      company: "Kopkar PT Astra Honda Motor",
      location: "Jakarta Utara, DKI Jakarta, Indonesia",
      role: "Magang Data Warehouse Bisnis & IT Support",
      role_en: "Data Warehouse Operations & IT Support Intern",
      period: "Mar 2024 - Okt 2024",
      period_en: "Mar 2024 - Oct 2024",
      yearRange: "2024",
      badge: "STAGE 02: DATA WAREHOUSE & QA",
      badge_en: "STAGE 02: DATA WAREHOUSE & QA",
      certificateFile: "/Sertifikat magang kopkar.jpg",
      certificateType: "image",
      points: [
        "Menyusun & memelihara basis data operasional bulanan pinjaman anggota, PO, stok persediaan, dan penjualan.",
        "Melakukan pengecekan stok gudang, data reconciliation, dan kontrol data pengeluaran barang.",
        "Menganalisis tren perkembangan data koperasi 2023-2024 dan menyampaikan visualisasi laporan kepada stakeholder.",
        "Menguji aplikasi e-commerce Toko AHM versi 2 dan 3 untuk akurasi data transaksi dan stabilitas fitur antarmuka.",
      ],
      points_en: [
        "Curated and maintained monthly operational databases covering member micro-loans, purchase orders, warehouse inventory, and POS sales.",
        "Conducted warehouse inventory reconciliation audits and discrepancy checks to safeguard data integrity.",
        "Analyzed multi-year (2023-2024) cooperative growth trends and delivered visual reports to executive board members.",
        "Performed data validation and usability testing on Toko AHM online storefronts (v2 & v3) prior to live releases.",
      ],
    },
    {
      id: "unesa",
      company: "Universitas Negeri Surabaya (UNESA)",
      location: "Surabaya, Jawa Timur, Indonesia",
      role: "S1 Sistem Informasi (Selesai / Lulus: Juli 2026)",
      role_en: "Bachelor of Information Systems (Graduated: July 2026)",
      period: "Agu 2021 - Jul 2026",
      period_en: "Aug 2021 - Jul 2026",
      yearRange: "2021 - 2026",
      badge: "STAGE 03: HIGHER EDUCATION (IPK 3.69)",
      badge_en: "STAGE 03: HIGHER EDUCATION (3.69 GPA)",
      certificateFile: "/Surat Penetapan Kelulusan UNESA.jpg",
      certificateType: "image",
      points: [
        "Menyelesaikan studi S1 Sistem Informasi dengan predikat sangat memuaskan (IPK: 3.69 / 4.00) pada Juli 2026.",
        "Fokus keilmuan mendalam: Basis Data Lanjut, Probabilitas & Statistika, Data Mining, Decision Support System (DSS), ERP, dan Analisis Strategi Sistem Informasi.",
        "Menghasilkan berbagai riset dan proyek implementasi sistem informasi data analitik terintegrasi.",
      ],
      points_en: [
        "Completed Bachelor of Information Systems with High Distinction (3.69 / 4.00 GPA) in July 2026.",
        "Deep coursework specialization: Advanced Database Systems, Probability & Statistics, Data Mining, Decision Support Systems (DSS), ERP, and Strategic Analytics.",
        "Authored multiple applied research projects and data-driven system implementations throughout undergraduate study.",
      ],
    },
  ] as Experience[],

  certificates: [
    {
      id: "ahm-cert",
      title: "Sertifikat Magang Kopkar PT Astra Honda Motor",
      title_en: "Internship Certificate — Kopkar PT Astra Honda Motor",
      issuer: "Koperasi Karyawan PT Astra Honda Motor",
      issuer_en: "PT Astra Honda Motor Employees Cooperative",
      date: "Oktober 2024",
      date_en: "October 2024",
      description: "Sertifikat resmi penghargaan atas dedikasi dan kinerja memuaskan dalam pengelolaan IT Support, Data Warehouse Bisnis, dan pengujian aplikasi Toko AHM.",
      description_en: "Official credential awarded for outstanding dedication and high performance in Business Data Warehousing, IT Support operations, and Toko AHM application data QA.",
      fileUrl: "/Sertifikat magang kopkar.jpg",
      fileType: "image",
    },
    {
      id: "bitlabs-data",
      title: "Data Analytic for Business Certification",
      title_en: "Data Analytics for Business Certification",
      issuer: "Bitlabs Academy",
      issuer_en: "Bitlabs Academy",
      date: "Desember 2024",
      date_en: "December 2024",
      description: "Sertifikasi resmi penguasaan analisis data bisnis, SQL database querying, visualisasi data Tableau, dan pemecahan masalah data-driven di industri.",
      description_en: "Official professional certification in business data analysis, advanced SQL querying, interactive Tableau dashboards, and data-driven problem solving.",
      fileUrl: "/Nilai -km-1858024-MUHAMMAD ANDHIKA FAHREZZY-1735216618-1-2-2.pdf",
      fileType: "pdf",
    },
    {
      id: "kampus-merdeka",
      title: "Certificate of Completion - Kampus Merdeka",
      title_en: "Certified Independent Study — Kampus Merdeka",
      issuer: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
      issuer_en: "Ministry of Education, Culture, Research, and Technology",
      date: "2024",
      date_en: "2024",
      description: "Sertifikat kelulusan program studi independen / magang kompetensi industri dengan capaian nilai akademik sangat memuaskan.",
      description_en: "National government credential validating the successful completion of the intensive industry competency program with superior academic ratings.",
      fileUrl: "/certificate-km-1858024-MUHAMMAD ANDHIKA FAHREZZY-1735216618-1-2-1.pdf",
      fileType: "pdf",
    },
    {
      id: "unesa-spk",
      title: "Surat Penetapan Kelulusan (S.Kom) - UNESA",
      title_en: "Graduation Decree & Bachelor Degree (S.Kom) — UNESA",
      issuer: "Fakultas Teknik, Universitas Negeri Surabaya",
      issuer_en: "Faculty of Engineering, State University of Surabaya",
      date: "20 Juli 2026",
      date_en: "July 20, 2026",
      description: "Surat Penetapan Kelulusan resmi (No: B/103693/UN38.5/PP.12.16/2026) yang menetapkan kelulusan S1 Sistem Informasi dengan gelar Sarjana Komputer (S.Kom.).",
      description_en: "Official Graduation Decree confirming the completion of the Bachelor of Information Systems curriculum with the degree of Bachelor of Computer Science (S.Kom.).",
      fileUrl: "/Surat Penetapan Kelulusan UNESA.jpg",
      fileType: "image",
    },
    {
      id: "aws-cloud-essentials",
      title: "AWS Knowledge: Cloud Essentials Training Badge",
      title_en: "AWS Knowledge: Cloud Essentials — Training Badge",
      issuer: "Amazon Web Services (AWS) Training and Certification",
      issuer_en: "Amazon Web Services (AWS) Training & Certification",
      date: "Agustus 2024",
      date_en: "August 2024",
      credentialUrl: "https://www.credly.com/badges/6eb6c94e-6452-4da3-9e58-264ee5ce6c20/linked_in_profile",
      description: "Sertifikasi resmi kompetensi dasar cloud computing dari Amazon Web Services (AWS) mencakup AWS Compute, Storage (S3), Database (RDS/DynamoDB), Networking (VPC), Security (IAM), Architecture, dan Cost Optimization.",
      description_en: "Official training credential from Amazon Web Services (AWS) validating foundational knowledge of AWS Cloud architecture, compute engines, storage, managed databases, networking, security, and pricing models.",
      fileUrl: "/aws-cloud-essentials-badge.png",
      fileType: "image",
    },
  ] as Certificate[],

  contact: {
    headline: "HUBUNGI SAYA UNTUK PELUANG DATA ANALYST!",
    headline_en: "LET'S CONNECT & BUILD SOMETHING GREAT WITH DATA!",
    subheadline: "Saya terbuka untuk peluang kerja Full-Time, Kontrak, maupun Proyek Data Analyst / Business Intelligence Specialist.",
    subheadline_en: "I'm actively open for Full-Time Data Analyst roles, contract analytics consulting, and Business Intelligence opportunities.",
    email: "muhammadandhikafahrezzy@gmail.com",
    phone: "+62 851-5686-8434",
    whatsappUrl: "https://wa.me/6285156868434?text=Halo%20Andhika,%20saya%20tertarik%20dengan%20profil%20Data%20Analyst%20Anda!",
    linkedin: "linkedin.com/in/andhikafahrezzy",
    linkedinUrl: "https://www.linkedin.com/in/andhikafahrezzy/",
    github: "github.com/muhammadandhikafahrezzy",
    githubUrl: "https://github.com/muhammadandhikafahrezzy",
    cvFilename: "CV_Muhammad_Andhika_Fahrezzy_ID.docx",
  },
};
