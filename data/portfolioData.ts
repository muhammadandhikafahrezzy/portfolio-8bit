// Faithful Retro 8-Bit Data Analyst Portfolio Data for Muhammad Andhika Fahrezzy
// Fully synchronized with CV_Muhammad_Andhika_Fahrezzy.pdf

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
    dialogue: "SIAPA SAYA? SEORANG DATA ANALYST LULUSAN S1 SISTEM INFORMASI UNESA (IPK 3.74/4.00) DENGAN PENGALAMAN DATA WAREHOUSE DI KOPKAR AHM, DATA ENTRY & TAX ANALYST DI CV SOLUSI MAXEL, SERTA RISET MACHINE LEARNING FORECASTING (XGBOOST/LIGHTGBM) & STREAMLIT!",
    dialogue_en: "WHO AM I? A DATA ANALYST GRADUATE IN INFORMATION SYSTEMS FROM UNESA (3.74/4.00 GPA) EXPERIENCED IN OPERATIONAL DATA WAREHOUSING AT KOPKAR AHM, TAX DATA ANALYTICS AT CV SOLUSI MAXEL, AND MACHINE LEARNING FORECASTING (XGBOOST/LIGHTGBM) & STREAMLIT!",
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
    bio: "Lulusan S1 Sistem Informasi Universitas Negeri Surabaya (IPK 3.74/4.00) yang memiliki dedikasi tinggi dalam mengungkap pola data dan menerjemahkannya menjadi keputusan bisnis strategis. Berpengalaman mengelola data operasional bisnis, melakukan rekonsiliasi data perpajakan & inventory, serta membangun model prediktif machine learning end-to-end (data cleaning, EDA, feature engineering, time-series forecasting XGBoost vs LightGBM, dan deployment dashboard Streamlit/Tableau). Siap memberikan dampak nyata dan wawasan analitik yang terukur sebagai Data Analyst.",
    bio_en: "Bachelor of Information Systems graduate (GPA: 3.74/4.00) passionate about uncovering data patterns and translating them into strategic business decisions. Experienced in managing operational business data, tax & inventory reconciliation, and building end-to-end predictive machine learning models spanning data cleaning, EDA, feature engineering, time-series forecasting (XGBoost vs. LightGBM), and deploying interactive Streamlit and Tableau dashboards. Ready to leverage strong analytical skills to drive impactful insights as a Data Analyst.",
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
          { name: "Odoo ERP (Data & System Spec)", level: 88 },
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
          { name: "Time-Series Forecasting & Cross-Validation", level: 90 },
          { name: "Business KPI & Operational Reporting", level: 92 },
          { name: "Customer Segmentation & Sales Routing", level: 88 },
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
          { name: "Git / GitHub", level: 86 },
          { name: "Next.js & Tailwind CSS", level: 85 },
        ],
      },
    ] as SkillCategory[],
  },

  // Projects faithfully extracted with authentic links & bilingual descriptions
  projects: [
    {
      id: "skripsi-demand-forecasting",
      title: "Peramalan Permintaan Produk Koperasi XYZ — Proyek Skripsi",
      title_en: "Product Demand Forecasting for Cooperative XYZ — Thesis Project",
      category: "Data Analysis",
      subtitle: "Time-Series Forecasting Gradient Boosting (XGBoost & LightGBM) + Dashboard Streamlit",
      subtitle_en: "Time-Series Gradient Boosting (XGBoost vs LightGBM) with Streamlit Interactive App",
      description: "Menganalisis data transaksi harian penjualan toko pada 4 kategori produk untuk mengatasi overstock & understock. Merekayasa 37 fitur time-series, membangun model XGBoost vs LightGBM via Grid Search CV (MAPE 9.72%), dan membangun dashboard Streamlit untuk rekomendasi restock otomatis.",
      description_en: "Analyzed daily sales data across 4 product categories to resolve inventory planning inaccuracies. Engineered 37 time-series features (lags, rolling stats) and built gradient boosting models (XGBoost vs. LightGBM) via Grid Search CV, achieving 9.72% MAPE, and deployed an interactive Streamlit dashboard for actionable restocking.",
      longDescription: [
        "Menganalisis data transaksi harian penjualan toko internal pada 4 kategori produk utama untuk mengatasi ketidakakuratan perencanaan stok yang menyebabkan overstock dan understock.",
        "Mengembangkan 37 fitur time-series (lag features, rolling statistics, atribut kalender & hari libur nasional) dan menerapkan Time-Based Holdout Validation (60:20:20) untuk mencegah data leakage.",
        "Membangun dan mengoptimasi model gradient boosting (XGBoost vs LightGBM) melalui Grid Search Cross-Validation, menghasilkan model terbaik dengan performa tinggi (RMSE 24.53 unit dan MAPE 9.72%).",
        "Mengintegrasikan model ke dalam dashboard interaktif berbasis Streamlit untuk menerjemahkan hasil prediksi menjadi rekomendasi pengadaan stok yang actionable, menggunakan Python, Pandas, XGBoost, dan LightGBM.",
      ],
      longDescription_en: [
        "Analyzed daily sales data across 4 product categories to resolve inventory planning inaccuracies causing overstocking and understocking.",
        "Engineered 37 time-series features (lags, rolling statistics, calendar seasonality, holidays) and built gradient boosting models (XGBoost vs. LightGBM) via Grid Search CV, achieving a MAPE of 9.72%.",
        "Deployed an interactive Streamlit web dashboard to automate actionable restocking recommendations and inventory safety stock planning.",
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
      demoUrl: "https://myskripsi-forecasting-xgboost-js49c69vrp9wtuu6xappgl.streamlit.app/",
      demoLabel: "BUKA LIVE STREAMLIT APP 🚀",
      demoLabel_en: "LAUNCH LIVE STREAMLIT APP 🚀",
      githubUrl: "https://github.com/muhammadandhikafahrezzy/myskripsi-forecasting-xgboost",
    },
    {
      id: "dagangan-bitlabs-analytics",
      title: "Dagangan Rural Distribution Strategy (Top 10 Best Project Bitlabs)",
      title_en: "Dagangan Rural Distribution Strategy (Top 10 Best Project Bitlabs)",
      category: "Business Intelligence",
      subtitle: "Analisis Log Transaksi Pedesaan, Segmentasi Pelanggan & Pemodelan Rute Sales",
      subtitle_en: "Rural FMCG Transaction Logs, Customer Segmentation & Sales Routing Strategy",
      description: "Menganalisis data log transaksi granular dan perilaku pelanggan di area pedesaan untuk mengatasi rendahnya adopsi digital. Mengembangkan profil segmentasi pelanggan dan pemodelan rute sales menggunakan Python, SQL, dan Tableau.",
      description_en: "Analyzed granular transaction logs and customer behavior in rural areas to address low digital adoption rates and reliance on field agents. Developed customer segmentation profiles and salesperson routing models using Python, SQL, and Tableau to design a cost-effective distribution strategy.",
      longDescription: [
        "Menganalisis data transaksi dan perilaku pelanggan aplikasi Dagangan di area pedesaan untuk mengatasi rendahnya adopsi digital dan tingginya ketergantungan pada tenaga penjual.",
        "Mengembangkan segmentasi pelanggan, analisis frekuensi kunjungan, dan pemodelan rute sales untuk merancang strategi distribusi yang lebih efisien dan hemat biaya.",
        "Menghasilkan rekomendasi optimalisasi rute kunjungan dan jadwal sales melalui eksplorasi data historis dan evaluasi dampak kunjungan terhadap transaksi, menggunakan Python, SQL, dan Tableau/Google Data Studio.",
      ],
      longDescription_en: [
        "Analyzed granular transaction logs and customer behavior in rural areas to address low digital adoption rates and reliance on field agents.",
        "Developed customer segmentation profiles and salesperson routing models using Python, SQL, and Tableau to design a cost-effective distribution strategy.",
        "Delivered actionable sales route and schedule optimization recommendations through historical EDA and transactional lift evaluation.",
      ],
      role: "Data Analyst Participant",
      role_en: "Lead Data Analyst Participant",
      tools: ["Python", "SQL (MySQL)", "Tableau", "Looker Studio", "Customer Segmentation", "Salesperson Routing"],
      highlights: [
        "Penghargaan Top 10 Best Project Capstone Bitlabs",
        "Segmentasi Pelanggan & Analisis Frekuensi Kunjungan Sales",
        "Optimalisasi Jadwal & Rute Distribusi FMCG Pedesaan",
      ],
      highlights_en: [
        "Awarded Top 10 Best Project in Bitlabs Capstone Showcase",
        "Customer Cohort Segmentation & Sales Visit Impact Analytics",
        "Cost-Effective Rural Sales Route & Schedule Optimization",
      ],
      icon: "database",
      demoUrl: "https://muhammadandhikafahrezzy.github.io/Dagangan_kelompok-6/",
      demoLabel: "BUKA LIVE SHOWCASE WEB 📊",
      demoLabel_en: "LAUNCH LIVE WEB SHOWCASE 📊",
      githubUrl: "https://github.com/muhammadandhikafahrezzy/Dagangan_kelompok-6",
    },
    {
      id: "odoo-erp-bgl-ban",
      title: "Odoo ERP Web — BGL Ban Team Project",
      title_en: "Odoo ERP Web — BGL Ban Team Project",
      category: "Data Analysis",
      subtitle: "Pemetaan Alur Kerja Data & Perancangan Spesifikasi Fungsional ERP",
      subtitle_en: "Cross-Functional Data Workflow Mapping & ERP Functional Specifications",
      description: "Berkolaborasi lintas fungsi untuk memetakan alur kerja data (data workflows) dan menyusun spesifikasi fungsional untuk implementasi Odoo ERP pada proses bisnis penjualan & inventory ban.",
      description_en: "Collaborated cross-functionally to map data workflows and draft functional specifications for Odoo ERP implementation supporting tire sales, warehouse management, and billing.",
      longDescription: [
        "Berkolaborasi lintas fungsi bersama tim pengembang dan manajerial untuk memetakan alur kerja data (data workflows) perusahaan.",
        "Menyusun dokumen spesifikasi fungsional (functional specifications) sistem ERP modul Sales, Inventory, dan Invoicing berbasis Odoo.",
        "Merancang standardisasi struktur basis data transaksi dan alur validasi persediaan barang.",
      ],
      longDescription_en: [
        "Collaborated cross-functionally with development and business teams to map end-to-end data workflows.",
        "Drafted comprehensive functional specification documents for Odoo ERP modules spanning Sales, Inventory, and Invoicing.",
        "Designed standardized transactional data schemas and warehouse inventory reconciliation pipelines.",
      ],
      role: "Data & System Analyst",
      role_en: "Data & System Analyst",
      tools: ["Odoo ERP", "Workflow Mapping", "Functional Specification", "Database Design", "Business Process Modeling"],
      highlights: [
        "Pemetaan Alur Kerja Data Lintas Fungsi (Data Workflow Mapping)",
        "Spesifikasi Fungsional Sistem Odoo ERP",
        "Standardisasi Alur Transaksi & Persediaan",
      ],
      highlights_en: [
        "Cross-Functional Data Workflow Architecture & Mapping",
        "Functional Specification Delivery for Odoo ERP Implementation",
        "Transactional Data Schema & Inventory Audit Standardization",
      ],
      icon: "code",
      githubUrl: "https://github.com/muhammadandhikafahrezzy",
      demoLabel: "LIHAT REPOSITORI GITHUB",
      demoLabel_en: "VIEW GITHUB REPOSITORY",
    },
    {
      id: "ahm-data-analytics",
      title: "Kopkar PT Astra Honda Motor — IT Support & Data Warehouse",
      title_en: "Kopkar PT Astra Honda Motor — IT Support & Business Data Warehouse",
      category: "Data Analysis",
      subtitle: "Analisis Perkembangan Koperasi, Rekonsiliasi Stok & Monitoring Persediaan",
      subtitle_en: "Cooperative Performance Analytics, Stock Reconciliation & Inventory Accuracy",
      description: "Menganalisis tren kinerja koperasi (2023–2024), mengelola basis data transaksional (pinjaman, PO, inventory, penjualan), dan melakukan rekonsiliasi stok fisik dengan sistem untuk meningkatkan akurasi data persediaan.",
      description_en: "Analyzed cooperative performance trends (2023–2024), extracting actionable insights for management through data visualizations and reports. Managed transactional databases (loans, POs, inventory, sales) and conducted physical-to-system stock reconciliations, improving data accuracy.",
      longDescription: [
        "Menganalisis tren perkembangan kinerja koperasi periode 2023–2024, mengidentifikasi pola bisnis penting, serta menyajikan laporan operasional & visualisasi data bagi jajaran manajemen.",
        "Mengelola basis data operasional transaksi (pinjaman anggota, purchase order, inventaris gudang, penjualan toko).",
        "Melakukan rekonsiliasi stok fisik barang dengan catatan sistem secara berkala untuk meningkatkan akurasi data persediaan.",
        "Mendukung alur kerja procurement end-to-end dengan menyinkronkan kebutuhan stok toko dengan sistem pengadaan backend.",
      ],
      longDescription_en: [
        "Analyzed cooperative performance trends (2023–2024), extracting actionable insights for management through data visualizations and operational reports.",
        "Managed transactional databases (loans, POs, inventory, sales) and conducted physical-to-system stock reconciliations, significantly improving inventory data accuracy.",
        "Supported end-to-end procurement workflows, synchronizing store needs with backend replenishment systems.",
      ],
      role: "IT Support & Business Data Warehouse Intern",
      role_en: "IT Support & Business Data Warehouse Intern",
      tools: ["MySQL", "Data Cleaning", "Physical-to-System Reconciliation", "Spreadsheet", "Inventory Analytics", "Data Visualization"],
      highlights: [
        "Analisis Kinerja Perkembangan Koperasi (2023–2024)",
        "Rekonsiliasi Stok Fisik vs Sistem & Peningkatan Akurasi Data",
        "Dukungan Alur Kerja Procurement & Sinkronisasi Persediaan",
      ],
      highlights_en: [
        "2023–2024 Multi-Year Performance Trend Analysis & Executive Reports",
        "Physical-to-System Stock Reconciliation & Data Accuracy Improvements",
        "End-to-End Procurement Workflow Support & Inventory Synchronization",
      ],
      icon: "database",
      certificateUrl: "/Sertifikat magang kopkar.jpg",
      demoLabel: "LIHAT SERTIFIKAT MAGANG KOPKAR AHM",
      demoLabel_en: "VIEW AHM INTERNSHIP CREDENTIAL",
    },
    {
      id: "teknopolis-project-management",
      title: "UI/UX & Web Interface Design (Teknopolis Platform)",
      title_en: "UI/UX & Web Interface Design (Teknopolis Platform)",
      category: "UI/UX & Web",
      subtitle: "Perancangan UI/UX Platform Perizinan Berbasis Regulasi OSS di Figma",
      subtitle_en: "Information Architecture & Dual-Platform Design for Online Single Submission (OSS)",
      description: "Merancang user flow, wireframe, dan prototipe high-fidelity di Figma untuk platform perizinan pendidikan berbasis regulasi Online Single Submission (OSS).",
      description_en: "Designed user flows, wireframes, and high-fidelity interactive prototypes in Figma for the Teknopolis educational licensing platform based on OSS regulatory frameworks.",
      longDescription: [
        "Merancang user flow, wireframe, dan prototipe high-fidelity di Figma untuk platform perizinan pendidikan berbasis regulasi OSS.",
        "Menganalisis regulasi perizinan pendidikan dan alur Online Single Submission (OSS) menjadi arsitektur informasi yang efisien dan minim friksi.",
        "Berkolaborasi langsung dengan tim developer untuk memastikan kesesuaian implementasi antarmuka dan stabilitas prototipe.",
      ],
      longDescription_en: [
        "Designed user flows, wireframes, and high-fidelity prototypes in Figma for the Teknopolis educational licensing platform.",
        "Decoded complex regulatory compliance guidelines into streamlined, intuitive information architectures.",
        "Collaborated closely with development teams to ensure seamless UI/UX component handoffs.",
      ],
      role: "UI/UX Designer",
      role_en: "UI/UX Designer",
      tools: ["Figma", "User Flow", "Wireframing", "High-Fidelity Prototyping", "Design System"],
      highlights: [
        "Desain Dual Platform (Web & Mobile Prototype Figma)",
        "Pemodelan Alur Regulasi Online Single Submission (OSS)",
        "Wireframing hingga High-Fidelity Design System",
      ],
      highlights_en: [
        "Dual-Platform Web & Mobile Interactive Prototypes in Figma",
        "Simplified Regulatory Compliance Workflow Modeling",
        "End-to-End User Flow, Wireframing & High-Fidelity Design System",
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
      title: "Unesa Health Care — UI/UX Portal Layanan Kesehatan",
      title_en: "Unesa Health Care — UI/UX Healthcare Services Portal",
      category: "UI/UX & Web",
      subtitle: "Desain Antarmuka Layanan Kesehatan Kampus Berbasis Prinsip HCI & Figma",
      subtitle_en: "User-Centered Campus Healthcare Platform Built on HCI Principles & Figma",
      description: "Mendesain user flow, wireframe, dan prototipe interaktif di Figma untuk portal layanan kesehatan mahasiswa Universitas Negeri Surabaya.",
      description_en: "Designed user flows, wireframes, and high-fidelity prototypes in Figma for the Unesa Health Care campus medical portal grounded in Human-Computer Interaction (HCI) research.",
      longDescription: [
        "Mendesain user flow, wireframe, dan prototipe interaktif di Figma untuk portal layanan kesehatan mahasiswa.",
        "Menerapkan prinsip Human-Computer Interaction (HCI) untuk merancang antarmuka website yang intuitif dan mudah diakses oleh mahasiswa serta staf kampus.",
        "Melakukan usability testing untuk mengoptimalkan alur navigasi reservasi konsultasi medis.",
      ],
      longDescription_en: [
        "Designed user flows, wireframes, and high-fidelity prototypes in Figma for the Unesa Health Care portal.",
        "Applied Human-Computer Interaction (HCI) methodologies to engineer frictionless medical appointment navigation.",
        "Conducted visual hierarchy, color psychology, and accessibility studies.",
      ],
      role: "UI/UX Designer",
      role_en: "UI/UX Designer",
      tools: ["Figma", "Human-Computer Interaction (HCI)", "User Flow", "Wireframing", "Usability Testing"],
      highlights: [
        "Penerapan Teori Interaksi Manusia & Komputer (HCI)",
        "Prototipe Interaktif Figma & Alur Reservasi Konsultasi",
        "Pengujian Usabilitas Navigasi Pengguna",
      ],
      highlights_en: [
        "Applied Human-Computer Interaction (HCI) Research & User Testing",
        "Interactive Figma Healthcare Booking & Consultation Prototype",
        "Usability-Tested Navigation Architecture",
      ],
      icon: "monitor",
      demoUrl: "https://ali21069.wixsite.com/kel-4/services-4",
      demoLabel: "KUNJUNGI WEB LIVE (UNESA HEALTH CARE)",
      demoLabel_en: "EXPLORE LIVE SITE (UNESA HEALTH CARE)",
    },
    {
      id: "kanaya-digital-assets",
      title: "PT Kanaya Multi Karya — Desain Grafis & Aset Web Branding",
      title_en: "PT Kanaya Multi Karya — Digital Posters & Web Branding",
      category: "UI/UX & Web",
      subtitle: "Desain 40+ Poster Digital Promosi Web Sesuai Standar Perusahaan",
      subtitle_en: "Design of 40+ Digital Web Posters Aligned with Industry Trends",
      description: "Merancang lebih dari 40 desain poster digital untuk kebutuhan website branding perusahaan rental kendaraan, menyelaraskan konsep visual dengan tren industri dan standar perusahaan.",
      description_en: "Designed over 40 digital posters for company website branding, aligning visual concepts with industry trends and corporate standards.",
      longDescription: [
        "Merancang lebih dari 40 desain poster digital untuk kebutuhan website branding perusahaan.",
        "Menyelaraskan konsep visual dengan tren industri mobilitas dan pedoman standar perusahaan.",
        "Mengoptimalkan format grafis untuk performa visual yang tajam di berbagai resolusi layar web.",
      ],
      longDescription_en: [
        "Designed over 40 digital posters for company website branding, aligning visual concepts with industry trends and corporate standards.",
        "Honed mastery in color theory, brand typography, and visual layout directly aligned with conversion targets.",
        "Optimized raster and vector web assets for lightning-fast load times across viewports.",
      ],
      role: "Graphic Design Intern",
      role_en: "Graphic Design Intern",
      tools: ["Figma", "Adobe Photoshop", "Canva", "Visual Trend Research", "Typography & Color Theory"],
      highlights: [
        "40+ Desain Poster Digital untuk Branding Website",
        "Penyelarasan Konsep Visual dengan Standar Industri",
        "Optimalisasi Grafis untuk Performa Web Responsif",
      ],
      highlights_en: [
        "40+ Digital Poster Designs for Corporate Website Branding",
        "Visual Concept Alignment with Industry Standards & Guidelines",
        "High-Performance Graphics Optimized for Web Viewports",
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
      role: "Magang Desain Grafis (Graphic Design Intern)",
      role_en: "Graphic Design Intern",
      period: "Maret 2020 - Juli 2020",
      period_en: "March 2020 - July 2020",
      yearRange: "2020",
      badge: "STAGE 01: CREATIVE & BRANDING",
      badge_en: "STAGE 01: CREATIVE & BRANDING",
      points: [
        "Merancang lebih dari 40 desain poster digital untuk kebutuhan website branding perusahaan, menyelaraskan konsep visual dengan tren industri dan standar perusahaan.",
        "Mengembangkan keahlian pemilihan warna, tipografi, layout, dan elemen grafis yang selaras dengan tujuan bisnis perusahaan.",
        "Mengoptimalkan aset visual digital agar tajam, responsif, dan terintegrasi mulus ke platform web perusahaan.",
      ],
      points_en: [
        "Designed over 40 digital posters for company website branding, aligning visual concepts with industry trends and corporate standards.",
        "Honed expertise in color theory, brand typography, and visual layouts aligned with business conversion targets.",
        "Optimized digital assets for crisp, responsive rendering and seamless integration into company web channels.",
      ],
    },
    {
      id: "solusi-maxel",
      company: "CV Solusi Maxel Consultama",
      location: "Jakarta, Indonesia",
      role: "Magang Data Entry & Tax Data Analyst",
      role_en: "Data Entry & Tax Data Analyst Intern",
      period: "Desember 2023 - Maret 2024",
      period_en: "December 2023 - March 2024",
      yearRange: "2023 - 2024",
      badge: "STAGE 02: TAX & DATA INTEGRITY",
      badge_en: "STAGE 02: TAX & DATA INTEGRITY",
      points: [
        "Menginput dan mengelola catatan transaksi perpajakan dalam volume besar ke dalam database internal dengan presisi tinggi serta menjaga integritas data yang ketat.",
        "Menganalisis dan merekonsiliasi dataset keuangan menggunakan formula Excel lanjutan (VLOOKUP, Pivot Tables) untuk memverifikasi kepatuhan pajak dan mendeteksi anomali perhitungan.",
        "Memastikan kelengkapan dan validitas dokumen transaksi keuangan perpajakan klien sebelum dilaporkan secara resmi.",
      ],
      points_en: [
        "Inputted and managed large volumes of tax transaction records into internal databases with high precision, maintaining strict data integrity.",
        "Analyzed and reconciled financial datasets using advanced Excel (VLOOKUP, Pivot Tables) to verify tax compliance and detect calculation anomalies.",
        "Ensured complete documentation audit trails and validity checks for financial tax filings.",
      ],
    },
    {
      id: "ahm",
      company: "Kopkar PT Astra Honda Motor",
      location: "Jakarta Utara, DKI Jakarta, Indonesia",
      role: "Magang IT Support & Business Data Warehouse",
      role_en: "IT Support & Business Data Warehouse Intern",
      period: "Maret 2024 - Oktober 2024",
      period_en: "March 2024 - October 2024",
      yearRange: "2024",
      badge: "STAGE 03: DATA WAREHOUSE & LOGISTICS",
      badge_en: "STAGE 03: DATA WAREHOUSE & LOGISTICS",
      certificateFile: "/Sertifikat magang kopkar.jpg",
      certificateType: "image",
      points: [
        "Menganalisis tren kinerja koperasi periode 2023–2024, mengidentifikasi wawasan actionable bagi manajemen melalui visualisasi data dan laporan operasional.",
        "Mengelola basis data transaksi (pinjaman anggota, purchase order, inventaris stok gudang, dan penjualan toko) serta melakukan rekonsiliasi stok fisik ke sistem untuk meningkatkan akurasi data persediaan.",
        "Mendukung alur kerja procurement end-to-end dengan menyinkronkan kebutuhan stok toko ritel dengan sistem pengadaan backend.",
      ],
      points_en: [
        "Analyzed cooperative performance trends (2023–2024), extracting actionable insights for management through data visualizations and operational reports.",
        "Managed transactional databases (loans, POs, inventory, sales) and conducted physical-to-system stock reconciliations, significantly improving inventory data accuracy.",
        "Supported end-to-end procurement workflows, synchronizing store needs with backend replenishment systems.",
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
      badge: "STAGE 04: HIGHER EDUCATION (IPK 3.74)",
      badge_en: "STAGE 04: HIGHER EDUCATION (3.74 GPA)",
      certificateFile: "/SPK-kuliah-unesa.pdf",
      certificateType: "pdf",
      points: [
        "Menyelesaikan studi S1 Sistem Informasi dengan predikat kelulusan sangat memuaskan (IPK: 3.74 / 4.00) pada Juli 2026.",
        "Mata Kuliah Relevan: Basis Data (Database Systems), Probabilitas & Statistika, Data Mining, Enterprise Resource Planning (ERP), dan Perancangan Strategi Sistem Informasi.",
        "Menyelesaikan Tugas Akhir / Skripsi: 'Peramalan Permintaan Produk Koperasi XYZ Menggunakan Gradient Boosting Time-Series (XGBoost & LightGBM) dan Integrasi Dashboard Streamlit' dengan capaian akurasi MAPE 9.72% & RMSE 24.53.",
      ],
      points_en: [
        "Completed Bachelor of Information Systems with High Distinction (3.74 / 4.00 GPA) in July 2026.",
        "Relevant Coursework: Database Systems, Probability & Statistics, Data Mining, Enterprise Resource Planning (ERP), and Information Systems Strategy.",
        "Completed Bachelor Thesis: 'Product Demand Forecasting for Cooperative XYZ using Time-Series Gradient Boosting (XGBoost & LightGBM) with Streamlit Dashboard Deployment' achieving 9.72% MAPE & 24.53 RMSE.",
      ],
    },
  ] as Experience[],

  certificates: [
    {
      id: "bitlabs-data",
      title: "Data Analytics for Business (Studi Independen Kampus Merdeka Batch 7)",
      title_en: "Data Analytics for Business (Certified Independent Study Batch 7)",
      issuer: "Bitlabs Academy & Kemendikbudristek",
      issuer_en: "Bitlabs Academy & Ministry of Education",
      date: "31 Desember 2024",
      date_en: "December 31, 2024",
      credentialId: "DAB24/IDR/XII-10565128/0924302338",
      description: "Sertifikasi kelulusan resmi program intensif Data Analytics for Business dengan perolehan nilai 87.98 (Grade A). Mencakup penguasaan SQL database querying, Python for data analytics, visualisasi data Tableau & Looker Studio, serta business problem solving.",
      description_en: "Official certificate of completion for the intensive Data Analytics for Business program with an overall score of 87.98 (Grade A). Covering advanced SQL database querying, Python EDA, interactive Tableau & Looker dashboards, and data-driven business problem solving.",
      fileUrl: "/sertifikat-bitlabs-kampus-merdeka.pdf",
      fileType: "pdf",
    },
    {
      id: "bitlabs-transkrip",
      title: "Transkrip Nilai Resmi: Data Analytics for Business (20 SKS)",
      title_en: "Official Grade Transcript: Data Analytics for Business (20 Credits)",
      issuer: "Bitlabs Academy & Kampus Merdeka Batch 7",
      issuer_en: "Bitlabs Academy x Kampus Merdeka Batch 7",
      date: "31 Desember 2024",
      date_en: "December 31, 2024",
      credentialId: "Student ID: 1858024 | Kelas CS02",
      description: "Transkrip akademik resmi konversi 20 SKS mencakup modul: Data Analytic Fundamentals (88), Python for Data Analytics (99), Business Process & Innovation (90), Transforming Data into Actionable Insights (88), Professional Skills (90), Midterm (90), dan Capstone Project (85.85).",
      description_en: "Official 20-credit academic transcript covering: Data Analytic Fundamentals (88), Python for Data Analytics (99), Business Process & Innovation (90), Transforming Data into Actionable Insights (88), Professional Skills (90), Midterm (90), and Capstone Project (85.85).",
      fileUrl: "/transkrip-nilai-bitlabs.pdf",
      fileType: "pdf",
    },
    {
      id: "bitlabs-dagangan-cert",
      title: "Group Project Certificate: Dagangan Case Study (Top 10 Best Project)",
      title_en: "Group Project Certificate: Dagangan Case Study (Top 10 Best Project)",
      issuer: "Bitlabs Academy & Dagangan",
      issuer_en: "Bitlabs Academy & Dagangan",
      date: "31 Desember 2024",
      date_en: "December 31, 2024",
      credentialId: "PBL-DAB24/IDR/XII/02338",
      description: "Sertifikat penghargaan atas penyelesaian proyek capstone Dagangan dengan skor 85.85/100, mencakup analisis log transaksi pedesaan, segmentasi pelanggan, dan optimasi rute sales distribusi FMCG.",
      description_en: "Award credential for the successful delivery of the Dagangan capstone project with a score of 85.85/100, focusing on rural transactional log analytics, customer cohort segmentation, and salesperson distribution route optimization.",
      fileUrl: "/sertifikat-nilai-dagangan.pdf",
      fileType: "pdf",
    },
    {
      id: "dqlab-data-analyst",
      title: "DQ Learning Class: Data Analyst Project - Business Decision Research",
      title_en: "DQ Learning Class: Data Analyst Project - Business Decision Research",
      issuer: "DQLab",
      issuer_en: "DQLab",
      date: "September 2026",
      date_en: "September 2026",
      credentialId: "#DQLABDVIZ2NEJLPB",
      description: "Sertifikasi penyelesaian proyek analitik data bisnis riil di DQLab mencakup data preparation, exploratory data analysis (EDA), data visualization, dan perumusan rekomendasi keputusan bisnis strategis.",
      description_en: "Official completion credential for real-world business data analytics project on DQLab, covering data preparation, exploratory data analysis (EDA), data visualization, and formulating data-backed business decisions.",
      fileUrl: "/certificate-DQLABDVIZ2NEJLPB.pdf",
      fileType: "pdf",
    },
    {
      id: "karirnex-excel",
      title: "Intensive Bootcamp 2 Weeks: Microsoft Excel ('Jago Excel Dalam 2 Minggu')",
      title_en: "Intensive Bootcamp 2 Weeks: Microsoft Excel ('Mastering Excel in 2 Weeks')",
      issuer: "Karirnex by PT Ebiz Karisma Internasional",
      issuer_en: "Karirnex by PT Ebiz Karisma Internasional",
      date: "23 Oktober 2025",
      date_en: "October 23, 2025",
      credentialId: "3371/B-1/KBT.EXCEL.1/KRX/X/2025",
      description: "Sertifikasi kompetensi tingkat Intermediate dalam penguasaan formula lanjutan Excel (VLOOKUP/XLOOKUP, IF nested), Pivot Tables, Data Validation, pengelolaan charts, dan pengantar Macro VBA.",
      description_en: "Intermediate level competency certification in advanced Microsoft Excel formulas (VLOOKUP/XLOOKUP, nested IF), Pivot Tables, Data Validation, dynamic charting, and introductory VBA Macros.",
      fileUrl: "/sertifikat-karirnex-bootcamp-excel.pdf",
      fileType: "pdf",
    },
    {
      id: "myskill-looker",
      title: "Short Class: Looker Data Studio (Data Analysis Masterclass)",
      title_en: "Short Class: Looker Data Studio (Data Analysis Masterclass)",
      issuer: "MySkill.id (PT Linimuda Inspirasi Negeri)",
      issuer_en: "MySkill.id (PT Linimuda Inspirasi Negeri)",
      date: "12 Desember 2023",
      date_en: "December 12, 2023",
      credentialId: "111580/DTA/LM/12/2023",
      description: "Sertifikat penyelesaian pelatihan analisis data menggunakan Google Looker Studio untuk merancang dashboard pemantauan KPI bisnis secara interaktif dan real-time.",
      description_en: "Certificate of completion in business data visualization using Google Looker Studio to architect real-time interactive KPI monitoring dashboards.",
      fileUrl: "/sertifikat-myskill-looker-studio.pdf",
      fileType: "pdf",
    },
    {
      id: "revou-mini-course",
      title: "1-Week Certified Online Course: Intro to Data Analytics & Digital Growth",
      title_en: "1-Week Certified Online Course: Intro to Data Analytics & Digital Growth",
      issuer: "RevoU (PT Revolusi Cita Edukasi)",
      issuer_en: "RevoU (PT Revolusi Cita Edukasi)",
      date: "31 Oktober 2025",
      date_en: "October 31, 2025",
      credentialId: "DMMC-27102025-01-1-00335",
      description: "Sertifikasi kelulusan kursus online bersertifikat RevoU mengenai dasar analisis data, metrik performa digital, dan interpretasi insight bisnis.",
      description_en: "Certificate of completion for RevoU's certified online program on data analytics fundamentals, digital performance metrics, and actionable business insights interpretation.",
      fileUrl: "/sertifikat-revou-mini-course.pdf",
      fileType: "pdf",
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
      id: "unesa-spk",
      title: "Surat Penetapan Kelulusan (S.Kom) - UNESA",
      title_en: "Graduation Decree & Bachelor Degree (S.Kom) — UNESA",
      issuer: "Fakultas Teknik, Universitas Negeri Surabaya",
      issuer_en: "Faculty of Engineering, State University of Surabaya",
      date: "20 Juli 2026",
      date_en: "July 20, 2026",
      credentialId: "No: B/103693/UN38.5/PP.12.16/2026",
      description: "Surat Penetapan Kelulusan resmi (No: B/103693/UN38.5/PP.12.16/2026) yang menetapkan kelulusan S1 Sistem Informasi dengan gelar Sarjana Komputer (S.Kom., IPK 3.74).",
      description_en: "Official Graduation Decree confirming the completion of the Bachelor of Information Systems curriculum with the degree of Bachelor of Computer Science (S.Kom., 3.74 GPA).",
      fileUrl: "/SPK-kuliah-unesa.pdf",
      fileType: "pdf",
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
    cvFilename: "CV_Muhammad_Andhika_Fahrezzy.pdf",
  },
};
