// Faithful Retro 8-Bit Data Analyst Portfolio Data for Muhammad Andhika Fahrezzy
// Fully synchronized with CV_Muhammad_Andhika_Fahrezzy_Data_Analyst.docx

export interface Project {
  id: string;
  title: string;
  title_en?: string;
  category: "Data Analysis" | "Business Intelligence" | "UI/UX & Web" | "All";
  subtitle: string;
  subtitle_en?: string;
  description: string;
  description_en?: string;
  longDescription?: string[];
  longDescription_en?: string[];
  role: string;
  role_en?: string;
  tools: string[];
  highlights: string[];
  highlights_en?: string[];
  icon: "database" | "chart" | "code" | "monitor" | "gamepad";
  demoUrl?: string;
  demoLabel?: string;
  demoLabel_en?: string;
  githubUrl?: string;
  certificateUrl?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  secondaryLabel_en?: string;
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
    dialogue: "SIAPA SAYA? SEORANG DATA ANALYST LULUSAN S1 SISTEM INFORMASI UNESA (IPK 3.74/4.00) DENGAN PENGALAMAN MENGELOLA DATA OPERASIONAL BISNIS, MEMBANGUN MODEL TIME-SERIES MACHINE LEARNING (XGBOOST & LIGHTGBM), QUERY SQL/PYTHON, SERTA DASHBOARD INTERAKTIF STREAMLIT/TABLEAU!",
    dialogue_en: "WHO AM I? A DATA ANALYST GRADUATE IN INFORMATION SYSTEMS FROM UNESA (3.74/4.00 GPA) EXPERIENCED IN MANAGING BUSINESS OPERATIONAL DATA, TIME-SERIES MACHINE LEARNING (XGBOOST/LIGHTGBM), SQL/PYTHON, AND STREAMLIT/TABLEAU INTERACTIVE DASHBOARDS!",
    name: "Muhammad Andhika Fahrezzy",
    title: "Data Analyst (S1 Sistem Informasi UNESA)",
    title_en: "Data Analyst (B.CS in Information Systems)",
    degree: "S1 Sistem Informasi — Universitas Negeri Surabaya",
    degree_en: "Bachelor of Information Systems — State University of Surabaya",
    graduation: "Periode: Agustus 2021 - Juli 2026",
    graduation_en: "Period: August 2021 - July 2026",
    gpa: "IPK 3.74 / 4.00",
    gpa_en: "3.74 / 4.00 GPA",
    location: "Depok, Jawa Barat / Surabaya, Indonesia",
    bio: "Mahasiswa/Lulusan S1 Sistem Informasi UNESA (IPK 3.74/4.00) dengan pengalaman langsung mengelola data operasional bisnis dan membangun model prediktif berbasis machine learning. Terbiasa melakukan data cleaning, exploratory data analysis (EDA), feature engineering, serta visualisasi data menggunakan Python, SQL, dan Tableau/Looker Studio untuk menghasilkan insight yang mendukung pengambilan keputusan bisnis. Memiliki rekam jejak menyelesaikan proyek data end-to-end, mulai dari analisis transaksi hingga pemodelan time-series forecasting (XGBoost & LightGBM) dan deployment dashboard interaktif berbasis Streamlit.",
    bio_en: "Information Systems graduate from UNESA (3.74/4.00 GPA) with hands-on experience in managing business operational data and developing machine learning predictive models. Proficient in data cleaning, exploratory data analysis (EDA), feature engineering, and interactive visualization using Python, SQL, Tableau, and Looker Studio. Proven track record in shipping end-to-end data products, from transactional analytics to time-series forecasting (XGBoost/LightGBM) deployed on interactive Streamlit dashboards.",
    stats: {
      level: 23,
      classType: "Data Analyst & BI Specialist",
      hp: "100/100",
      mp: "100/100",
      exp: "3.74 / 4.00 (Lulus Jul 2026)",
      exp_en: "3.74 / 4.00 GPA (Graduated Jul 2026)",
      specialMove: "Time-Series ML Forecasting & Interactive Streamlit/Tableau Magic",
    },
    skillCategories: [
      {
        title: "Bahasa & Database",
        title_en: "Languages & Databases",
        icon: "📊",
        skills: [
          { name: "SQL (MySQL)", level: 92 },
          { name: "Python (Pandas, NumPy)", level: 90 },
          { name: "Google BigQuery", level: 85 },
          { name: "Odoo ERP (Data & Inventory)", level: 88 },
          { name: "Data Cleaning & Preprocessing", level: 95 },
          { name: "Exploratory Data Analysis (EDA)", level: 92 },
          { name: "Feature Engineering", level: 90 },
        ],
      },
      {
        title: "Visualisasi & Machine Learning",
        title_en: "Visualization & Machine Learning",
        icon: "📈",
        skills: [
          { name: "Tableau & Looker Studio", level: 90 },
          { name: "Streamlit Dashboard Deployment", level: 92 },
          { name: "Machine Learning (XGBoost, LightGBM)", level: 90 },
          { name: "Time-Series Forecasting & CV", level: 90 },
          { name: "Business KPI & Operational Reporting", level: 92 },
          { name: "Customer Segmentation & Route Analytics", level: 88 },
        ],
      },
      {
        title: "Tools Pendukung & UI/UX (Nilai Tambah)",
        title_en: "Supporting Tools & UI/UX (Plus Skills)",
        icon: "💻",
        skills: [
          { name: "Microsoft Office (Advanced Excel)", level: 94 },
          { name: "Figma (Wireframing & UI/UX)", level: 92 },
          { name: "Human-Computer Interaction (HCI)", level: 90 },
          { name: "Canva & Adobe Photoshop", level: 88 },
          { name: "Git & GitHub", level: 86 },
          { name: "Next.js & Tailwind CSS", level: 85 },
        ],
      },
    ] as SkillCategory[],
  },

  // Projects faithfully extracted with authentic links & bilingual descriptions
  projects: [
    {
      id: "skripsi-demand-forecasting",
      title: "Peramalan Permintaan Produk Koperasi — Proyek Skripsi",
      title_en: "Retail Demand Forecasting & Stock Planning — Bachelor Thesis",
      category: "Data Analysis",
      subtitle: "Time-Series Forecasting Gradient Boosting (XGBoost & LightGBM) + Dashboard Streamlit",
      subtitle_en: "Time-Series Gradient Boosting (XGBoost vs LightGBM) with Streamlit Interactive App",
      description: "Analisis data transaksi harian penjualan toko pada 4 kategori produk utama, perancangan 37 fitur time-series, evaluasi model XGBoost vs LightGBM, serta integrasi dashboard Streamlit untuk rekomendasi pengadaan stok otomatis.",
      description_en: "End-to-end retail forecasting on daily store transactions across 4 core categories, engineering 37 time-series features, benchmarking XGBoost vs LightGBM with Grid Search CV, and deploying an actionable Streamlit decision app.",
      longDescription: [
        "Menganalisis data transaksi harian penjualan toko internal pada 4 kategori produk utama untuk mengatasi ketidakakuratan perencanaan stok yang menyebabkan overstock dan understock.",
        "Mengembangkan 37 fitur time-series (lag features, rolling statistics, atribut kalender & hari libur nasional) dan menerapkan Time-Based Holdout Validation (60:20:20) untuk mencegah data leakage.",
        "Membangun dan mengoptimasi model gradient boosting (XGBoost vs LightGBM) melalui Grid Search Cross-Validation, menghasilkan model terbaik dengan performa tinggi (RMSE 24.53 unit dan MAPE 9.72%).",
        "Mengintegrasikan model ke dalam dashboard interaktif berbasis Streamlit untuk menerjemahkan hasil prediksi menjadi rekomendasi pengadaan stok yang actionable, menggunakan Python, Pandas, XGBoost, dan LightGBM.",
      ],
      longDescription_en: [
        "Analyzed daily transactional sales data across 4 primary store categories to solve inventory planning mismatches causing understock and overstock.",
        "Engineered 37 specialized time-series features (multi-step lag metrics, rolling window statistics, calendar seasonality, and national holidays) with Time-Based Holdout Validation (60:20:20) to eliminate data leakage.",
        "Trained and tuned gradient boosting models (XGBoost vs. LightGBM) via Grid Search Cross-Validation, achieving best predictive accuracy with RMSE of 24.53 units and MAPE of 9.72%.",
        "Deployed an interactive Streamlit web dashboard translating ML forecasts into actionable procurement and safety-stock replenishment recommendations.",
      ],
      role: "Data Analyst & ML Researcher",
      role_en: "Lead Data Analyst & ML Researcher",
      tools: ["Python", "Pandas", "XGBoost", "LightGBM", "Streamlit", "Time-Series Forecasting", "Grid Search CV", "Feature Engineering"],
      highlights: [
        "37 Fitur Time-Series & Validasi Holdout (60:20:20)",
        "Model Terbaik: RMSE 24.53 unit & MAPE 9.72%",
        "Deployment Dashboard Interaktif Berbasis Streamlit",
      ],
      highlights_en: [
        "37 Engineered Time-Series Features & Leak-Free Holdout Validation",
        "Top Model Benchmarks: 24.53 RMSE & 9.72% MAPE",
        "Production-Ready Interactive Streamlit Dashboard Deployment",
      ],
      icon: "chart",
      githubUrl: "https://github.com/muhammadandhikafahrezzy",
      demoLabel: "LIHAT KODE DI GITHUB",
      demoLabel_en: "VIEW CODE ON GITHUB",
    },
    {
      id: "dagangan-bitlabs-analytics",
      title: "Dagangan — Optimalisasi Rute Sales & Segmentasi Pelanggan",
      title_en: "Dagangan — Rural E-Commerce Sales Route Optimization & Customer Analytics",
      category: "Business Intelligence",
      subtitle: "Studi Kasus Analisis Data Transaksi & Rute Distribusi FMCG Pedesaan (Bitlabs)",
      subtitle_en: "Rural FMCG Transaction Analysis, Customer Segmentation & Sales Routing (Bitlabs)",
      description: "Analisis data transaksi dan perilaku pelanggan aplikasi Dagangan di area pedesaan untuk merancang segmentasi pelanggan, evaluasi frekuensi kunjungan sales, dan strategi distribusi yang hemat biaya.",
      description_en: "Comprehensive rural retail analytics examining user behaviors on the Dagangan platform to engineer customer cohorts, evaluate sales rep visit impact on transactional lift, and optimize distribution logistics.",
      longDescription: [
        "Menganalisis data transaksi dan perilaku pelanggan aplikasi Dagangan di area pedesaan untuk mengatasi rendahnya adopsi digital dan tingginya ketergantungan pada tenaga penjual.",
        "Mengembangkan segmentasi pelanggan, analisis frekuensi kunjungan, dan pemodelan rute sales untuk merancang strategi distribusi yang lebih efisien dan hemat biaya.",
        "Menghasilkan rekomendasi optimalisasi rute kunjungan dan jadwal sales melalui eksplorasi data historis dan evaluasi dampak kunjungan terhadap transaksi, menggunakan Python, SQL, dan Tableau/Google Data Studio.",
      ],
      longDescription_en: [
        "Analyzed transactional datasets and customer purchasing patterns on the Dagangan app in rural areas to address digital adoption friction and salesperson dependency.",
        "Engineered customer segmentation matrices, visit frequency benchmarks, and sales route modeling to formulate cost-effective distribution strategies.",
        "Delivered data-driven recommendations optimizing sales schedules and visit routes through historical EDA and transactional lift evaluation using Python, SQL, Tableau, and Google Data Studio.",
      ],
      role: "Data Analyst Participant",
      role_en: "Lead Data Analyst Participant",
      tools: ["Python", "SQL (MySQL)", "Tableau", "Looker Studio", "Customer Segmentation", "Route Optimization"],
      highlights: [
        "Segmentasi Pelanggan & Analisis Frekuensi Kunjungan",
        "Optimalisasi Jadwal & Rute Sales Distribusi FMCG",
        "Visualisasi Dashboard Interaktif Tableau & Data Studio",
      ],
      highlights_en: [
        "Granular Customer Cohorts & Sales Visit Impact Modeling",
        "Cost-Effective Sales Route Scheduling & Logistics Optimization",
        "Interactive Executive Tableau & Google Data Studio Dashboards",
      ],
      icon: "database",
      githubUrl: "https://github.com/muhammadandhikafahrezzy",
      demoLabel: "LIHAT REPOSITORI GITHUB",
      demoLabel_en: "VIEW GITHUB REPOSITORY",
    },
    {
      id: "ahm-data-analytics",
      title: "Kopkar AHM — Data Warehouse & Analisis Perkembangan Koperasi",
      title_en: "AHM Employees Cooperative — Data Warehouse & Growth Analytics",
      category: "Data Analysis",
      subtitle: "Pengelolaan Data Operasional, Rekonsiliasi Stok & Monitoring Persediaan",
      subtitle_en: "Operational Data Pipelines, Warehouse Inventory Accuracy & Member Loans Analysis",
      description: "Pengolahan dan analisis basis data operasional bulanan pinjaman anggota, purchase order, dan stok persediaan di Kopkar PT Astra Honda Motor.",
      description_en: "End-to-end processing and analytics of monthly cooperative operations, including member loan portfolios, purchase orders, and warehouse inventory at PT Astra Honda Motor's Employee Cooperative.",
      longDescription: [
        "Mengelola data operasional dan transaksi bisnis (pinjaman anggota, purchase order, inventory, penjualan) sebagai dasar monitoring dan pelaporan rutin.",
        "Melakukan data validation dan inventory monitoring melalui rekonsiliasi stok fisik dengan catatan sistem untuk meningkatkan akurasi data persediaan.",
        "Menganalisis perkembangan koperasi periode 2023–2024, mengidentifikasi tren dan insight, serta menyajikan hasil analisis dalam bentuk data visualization dan laporan operasional.",
        "Mendukung proses procurement dan inventory management dari identifikasi kebutuhan toko hingga sinkronisasi transaksi dengan data persediaan.",
        "Melakukan pengujian usability dan kualitas data aplikasi toko online Toko AHM versi 2 dan 3.",
      ],
      longDescription_en: [
        "Managed operational and business transactional datasets (member loans, purchase orders, inventory, POS retail sales) as the foundation for executive monitoring and routine reporting.",
        "Executed rigorous data validation and warehouse monitoring through physical vs. system stock reconciliations, maximizing inventory record accuracy.",
        "Analyzed multi-year cooperative growth trajectories (2023–2024), extracting strategic insights and presenting analytical decks with data visualizations to executive boards.",
        "Supported procurement pipelines and inventory management from retail needs forecasting to live transaction-inventory synchronization.",
        "Conducted comprehensive usability and transactional data QA audits on Toko AHM online storefronts (v2 & v3).",
      ],
      role: "Magang IT Support & Data Warehouse Bisnis",
      role_en: "Data Warehouse & IT Analytics Intern",
      tools: ["MySQL", "Data Cleaning", "Data Validation", "Spreadsheet", "Inventory Analytics", "Data Visualization"],
      highlights: [
        "Analisis Perkembangan Koperasi Periode 2023-2024",
        "Rekonsiliasi Stok Fisik vs Sistem & Validasi Data",
        "Dukungan Procurement & Sinkronisasi Transaksi Persediaan",
      ],
      highlights_en: [
        "2023-2024 Multi-Year Growth Trend Analysis & Executive Reporting",
        "Physical-to-System Stock Reconciliation & Data Integrity Audits",
        "Procurement Workflow Support & Live Inventory Synchronization",
      ],
      icon: "database",
      certificateUrl: "/Sertifikat magang kopkar.jpg",
      demoLabel: "LIHAT SERTIFIKAT MAGANG KOPKAR AHM",
      demoLabel_en: "VIEW AHM INTERNSHIP CREDENTIAL",
    },
    {
      id: "kanaya-digital-assets",
      title: "PT Kanaya Multi Karya — Desain Grafis & Aset Digital Web",
      title_en: "PT Kanaya Multi Karya — Digital Marketing Assets & Visual Branding",
      category: "UI/UX & Web",
      subtitle: "Desain Aset Visual Promosi Web Berdasarkan Riset Tren",
      subtitle_en: "Targeted Promotional Media & Web Assets for Fleet Mobility Company",
      description: "Menghasilkan 40+ materi desain poster untuk kebutuhan website perusahaan rental kendaraan berdasarkan riset tren visual dan kebutuhan komunikasi perusahaan.",
      description_en: "Production of 40+ targeted digital marketing assets, visual promotional banners, and responsive web graphics engineered through visual trend research and brand guidelines.",
      longDescription: [
        "Menghasilkan 40+ materi desain poster untuk kebutuhan website berdasarkan riset tren visual dan kebutuhan komunikasi perusahaan.",
        "Mengembangkan keahlian dalam pemilihan warna, font, layout, dan elemen desain yang selaras dengan tujuan bisnis perusahaan rental kendaraan.",
        "Mengoptimalkan aset grafis agar tampil tajam, cepat dimuat, dan responsif di berbagai perangkat dan browser web.",
        "Berkolaborasi dengan tim pengembang untuk integrasi aset ke platform digital.",
      ],
      longDescription_en: [
        "Produced 40+ targeted promotional poster designs for web platforms guided by visual trend analysis and corporate communication goals.",
        "Honed mastery in color theory, brand typography, and visual layout directly aligned with mobility rental conversion targets.",
        "Optimized raster and vector web assets for lightning-fast load times across mobile and desktop viewports.",
        "Collaborated with digital engineering teams to integrate branded assets into commercial digital channels.",
      ],
      role: "Magang Desain Grafis",
      role_en: "Graphic & Digital Asset Design Intern",
      tools: ["Figma", "Adobe Photoshop", "Canva", "Visual Trend Research", "Typography & Color Harmony"],
      highlights: [
        "40+ Materi Desain Poster Promosi Web",
        "Riset Tren Visual & Komunikasi Perusahaan",
        "Optimalisasi Aset Web Lintas Perangkat",
      ],
      highlights_en: [
        "40+ High-Converting Promotional Web & Social Assets",
        "Audience Trend Research & Corporate Communication Strategy",
        "Cross-Device Asset Optimization for High Performance",
      ],
      icon: "monitor",
      demoUrl: "https://drive.google.com/drive/folders/1VyyeR9vSLB50BospMxy3uw1pZWYV_Vef?usp=sharing",
      demoLabel: "LIHAT HASIL KARYA (GOOGLE DRIVE FOLDER)",
      demoLabel_en: "VIEW ASSET SHOWCASE (GOOGLE DRIVE)",
    },
    {
      id: "teknopolis-project-management",
      title: "Teknopolis — Desain UI/UX Platform Perizinan Pendidikan OSS",
      title_en: "Teknopolis — OSS Educational Licensing Architecture & UI/UX",
      category: "UI/UX & Web",
      subtitle: "Perancangan UI/UX Platform Perizinan Berbasis Regulasi Online Single Submission (OSS)",
      subtitle_en: "Information Architecture & Dual-Platform Design for Online Single Submission (OSS)",
      description: "Merancang UI/UX platform perizinan pendidikan berbasis regulasi OSS — user flow, wireframe, hingga high-fidelity interface menggunakan Figma.",
      description_en: "Designed the end-to-end UI/UX architecture for an OSS-based educational licensing platform — user flows, wireframes, and high-fidelity prototypes in Figma.",
      longDescription: [
        "Merancang UI/UX platform perizinan pendidikan berbasis regulasi OSS — user flow, wireframe, hingga high-fidelity interface menggunakan Figma.",
        "Menganalisis regulasi perizinan pendidikan dan alur Online Single Submission (OSS) menjadi arsitektur informasi yang efisien dan minim friksi.",
        "Berkolaborasi langsung dengan tim developer untuk memastikan kesesuaian implementasi desain teknis dan stabilitas prototipe.",
        "Menyusun dokumentasi proyek, aset visual, dan memandu tahapan proyek dari analisis awal hingga rilis publik.",
      ],
      longDescription_en: [
        "Designed UI/UX for an educational licensing platform based on Online Single Submission (OSS) regulatory frameworks — user flows, wireframes, and high-fidelity Figma prototypes.",
        "Decoded complex regulatory guidelines into clean, low-friction information architectures tailored for institutional licensing applicants.",
        "Collaborated closely with software developers to ensure pixel-perfect front-end implementation and state management alignment.",
        "Authored project milestones, sprint retrospectives, and visual design systems from requirements gathering to final public demo.",
      ],
      role: "UI/UX Designer",
      role_en: "UI/UX Designer & Information Architect",
      tools: ["Figma", "Information Architecture", "User Flow", "Wireframing", "Design System"],
      highlights: [
        "Desain Dual Platform (Web & Mobile Prototype Figma)",
        "Pemodelan Alur Data Regulasi OSS",
        "Wireframing hingga High-Fidelity Interface",
      ],
      highlights_en: [
        "Dual-Platform Web & Mobile Interactive Prototypes in Figma",
        "Simplified Regulatory Compliance Workflow Modeling",
        "End-to-End User Flow, Wireframe & High-Fidelity Design System",
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
      title: "Unesa Health Care — Kontributor UI/UX & Web Layanan Kesehatan",
      title_en: "Unesa Health Care — Human-Computer Interaction (HCI) Medical Portal",
      category: "UI/UX & Web",
      subtitle: "Desain & Implementasi UI/UX Platform Layanan Kesehatan Mahasiswa Berbasis Wix & Figma",
      subtitle_en: "User-Centered Campus Healthcare Platform Built on HCI Principles & Wix",
      description: "Mendesain dan mengimplementasikan UI/UX platform layanan kesehatan mahasiswa berbasis Wix dan Figma dengan penerapan prinsip Human-Computer Interaction (HCI).",
      description_en: "Designed and implemented the UI/UX for a student healthcare services portal using Wix and Figma, grounded in Human-Computer Interaction (HCI) research.",
      longDescription: [
        "Mendesain dan mengimplementasikan UI/UX platform layanan kesehatan mahasiswa berbasis Wix dan Figma.",
        "Menerapkan prinsip Human-Computer Interaction (HCI) untuk merancang antarmuka website dan mobile yang menarik, intuitif, dan mudah digunakan oleh mahasiswa dan staf kampus.",
        "Mengeksplorasi hierarki visual, psikologi warna, tipografi, dan komposisi objek untuk menciptakan pengalaman pengguna yang nyaman.",
        "Melakukan usability testing untuk mengidentifikasi potensi kendala navigasi pengguna.",
      ],
      longDescription_en: [
        "Designed and implemented the UI/UX for a comprehensive student campus healthcare portal leveraging Wix and interactive Figma prototypes.",
        "Applied Human-Computer Interaction (HCI) methodologies to design accessible, frictionless navigation flows for students and faculty.",
        "Conducted visual hierarchy, color psychology, and typography studies to create reassuring patient consultation booking flows.",
        "Executed structured usability tests to isolate navigation bottlenecks and streamline appointment scheduling.",
      ],
      role: "Kontributor UI/UX & Web",
      role_en: "HCI & UI/UX Product Designer Contributor",
      tools: ["Figma", "Wix.com", "Human-Computer Interaction (HCI)", "UI/UX Design", "Usability Testing"],
      highlights: [
        "Penerapan Teori Interaksi Manusia & Komputer (HCI)",
        "Desain Web & Mobile Responsif",
        "Implementasi Langsung di Platform Wix.com",
      ],
      highlights_en: [
        "Applied Human-Computer Interaction (HCI) Research & User Testing",
        "Fully Responsive Web & Mobile Layout Architecture",
        "Live Production Deployment on Wix Platform",
      ],
      icon: "monitor",
      demoUrl: "https://ali21069.wixsite.com/kel-4/services-4",
      demoLabel: "KUNJUNGI WEB LIVE (UNESA HEALTH CARE)",
      demoLabel_en: "EXPLORE LIVE SITE (UNESA HEALTH CARE)",
    },
  ] as Project[],

  // Ordered Chronologically from OLDEST (2020) to NEWEST (2026)
  experiences: [
    {
      id: "kanaya",
      company: "PT Kanaya Multi Karya",
      location: "Bekasi, Jawa Barat, Indonesia",
      role: "Magang Desain Grafis",
      role_en: "Graphic Design Intern",
      period: "Maret 2020 - Juli 2020",
      period_en: "March 2020 - July 2020",
      yearRange: "2020",
      badge: "STAGE 01: CREATIVE & ASSETS",
      badge_en: "STAGE 01: CREATIVE & ASSETS",
      points: [
        "Menghasilkan 40+ desain poster untuk kebutuhan website berdasarkan riset tren visual dan kebutuhan komunikasi perusahaan.",
        "Mengembangkan keahlian pemilihan warna, tipografi, layout, dan elemen grafis yang selaras dengan tujuan bisnis perusahaan.",
        "Mengoptimalkan aset visual digital agar tajam, responsif, dan terintegrasi mulus ke platform web perusahaan.",
      ],
      points_en: [
        "Produced 40+ promotional poster designs for company website based on visual trend research and corporate communication needs.",
        "Honed expertise in color theory, brand typography, and visual layouts aligned with business conversion targets.",
        "Optimized digital assets for crisp, responsive rendering and seamless integration into company web channels.",
      ],
    },
    {
      id: "ahm",
      company: "Kopkar PT Astra Honda Motor",
      location: "Jakarta Utara, DKI Jakarta, Indonesia",
      role: "Magang IT Support & Data Warehouse Bisnis",
      role_en: "IT Support & Business Data Warehouse Intern",
      period: "Maret 2024 - Oktober 2024",
      period_en: "March 2024 - October 2024",
      yearRange: "2024",
      badge: "STAGE 02: DATA WAREHOUSE & QA",
      badge_en: "STAGE 02: DATA WAREHOUSE & QA",
      certificateFile: "/Sertifikat magang kopkar.jpg",
      certificateType: "image",
      points: [
        "Mengelola data operasional dan transaksi bisnis (pinjaman anggota, purchase order, inventory, penjualan) sebagai dasar monitoring dan pelaporan rutin.",
        "Melakukan data validation dan inventory monitoring melalui rekonsiliasi stok fisik dengan catatan sistem untuk meningkatkan akurasi data persediaan.",
        "Menganalisis perkembangan koperasi periode 2023–2024, mengidentifikasi tren dan insight, serta menyajikan hasil analisis dalam bentuk data visualization dan laporan operasional.",
        "Mendukung proses procurement dan inventory management dari identifikasi kebutuhan toko hingga sinkronisasi transaksi dengan data persediaan.",
        "Melakukan pengujian usability dan kualitas data aplikasi toko online Toko AHM versi 2 dan 3.",
      ],
      points_en: [
        "Managed operational and business transactional datasets (member loans, purchase orders, inventory, POS retail sales) as the baseline for routine monitoring and reporting.",
        "Executed data validation and warehouse monitoring through physical vs. system stock reconciliations, maximizing inventory record accuracy.",
        "Analyzed multi-year cooperative growth trajectories (2023–2024), extracting strategic insights and presenting analytical decks with data visualizations to executive boards.",
        "Supported procurement pipelines and inventory management from retail needs forecasting to live transaction-inventory synchronization.",
        "Conducted comprehensive usability and transactional data QA audits on Toko AHM online storefronts (v2 & v3).",
      ],
    },
    {
      id: "unesa",
      company: "Universitas Negeri Surabaya (UNESA)",
      location: "Surabaya, Jawa Timur, Indonesia",
      role: "S1 Sistem Informasi (IPK: 3.74 / 4.00)",
      role_en: "Bachelor of Information Systems (3.74 / 4.00 GPA)",
      period: "Agustus 2021 - Juli 2026",
      period_en: "August 2021 - July 2026",
      yearRange: "2021 - 2026",
      badge: "STAGE 03: HIGHER EDUCATION (IPK 3.74)",
      badge_en: "STAGE 03: HIGHER EDUCATION (3.74 GPA)",
      certificateFile: "/Surat Penetapan Kelulusan UNESA.jpg",
      certificateType: "image",
      points: [
        "Menyelesaikan studi S1 Sistem Informasi dengan predikat kelulusan sangat memuaskan (IPK: 3.74 / 4.00) pada Juli 2026.",
        "Mata Kuliah Relevan: Basis Data, Probabilitas & Statistika, Data Mining, ERP, dan Perancangan Strategi Sistem Informasi.",
        "Menyelesaikan Tugas Akhir/Skripsi: 'Peramalan Permintaan Produk Koperasi Menggunakan Machine Learning Time-Series (XGBoost & LightGBM) dan Integrasi Dashboard Streamlit' dengan RMSE 24.53 unit & MAPE 9.72%.",
      ],
      points_en: [
        "Completed Bachelor of Information Systems with High Distinction (3.74 / 4.00 GPA) in July 2026.",
        "Relevant Coursework: Advanced Database Systems, Probability & Statistics, Data Mining, Enterprise Resource Planning (ERP), and Information Systems Strategic Planning.",
        "Completed Bachelor Thesis: 'Retail Demand Forecasting using Time-Series Machine Learning (XGBoost & LightGBM) with Streamlit Dashboard Deployment' achieving 24.53 RMSE & 9.72% MAPE.",
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
      description: "Surat Penetapan Kelulusan resmi (No: B/103693/UN38.5/PP.12.16/2026) yang menetapkan kelulusan S1 Sistem Informasi dengan gelar Sarjana Komputer (S.Kom., IPK 3.74).",
      description_en: "Official Graduation Decree confirming the completion of the Bachelor of Information Systems curriculum with the degree of Bachelor of Computer Science (S.Kom., 3.74 GPA).",
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
    cvFilename: "CV_Muhammad_Andhika_Fahrezzy_Data_Analyst.docx",
  },
};
