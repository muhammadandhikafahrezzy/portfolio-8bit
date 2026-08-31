export interface Project {
  id: string;
  title: string;
  category: "Data Analysis" | "Business Intelligence" | "UI/UX & Web";
  subtitle: string;
  description: string;
  longDescription: string[];
  role: string;
  period: string;
  tools: string[];
  highlights: string[];
  icon: "database" | "chart" | "monitor" | "gamepad";
  demoUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  yearRange: string;
  badge: string;
  points: string[];
  certificateFile?: string;
  certificateType?: "image" | "pdf";
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  fileUrl?: string;
  fileType?: "image" | "pdf";
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; iconText?: string }[];
}

export const PORTFOLIO_DATA = {
  hero: {
    greeting: "SELAMAT DATANG DI PETUALANGAN",
    title: "DATA ANALYST PORTOFOLIO",
    subtitle: "MENGUBAH DATA MENTAH MENJADI INSIGHT BISNIS & KEPUTUSAN STRATEGIS DALAM DUNIA 8-BIT",
    cta: "JELAJAHI INSIGHT DATA",
    characterName: "MUHAMMAD ANDHIKA FAHREZZY",
    role: "Data Analyst & Business Intelligence",
  },
  about: {
    dialogue: "SIAPA SAYA? SEORANG DATA ANALYST LULUSAN S1 SISTEM INFORMASI UNESA (JULI 2026, IPK 3.69) YANG BERFOKUS PADA PENGOLAHAN DATA BISNIS, QUERY SQL, ANALISIS PYTHON, DAN DASHBOARD VISUALISASI TABLEAU/LOOKER STUDIO!",
    name: "Muhammad Andhika Fahrezzy",
    title: "Data Analyst (Lulusan S1 SI UNESA)",
    degree: "S1 Sistem Informasi — Universitas Negeri Surabaya",
    graduation: "Lulus / Selesai: Juli 2026",
    gpa: "IPK 3.69 / 4.00",
    location: "Depok / Surabaya, Indonesia",
    bio: "Lulusan S1 Sistem Informasi Universitas Negeri Surabaya (Juli 2026, IPK 3.69) dengan fokus keahlian kuat dalam Analisis Data Bisnis, Data Cleaning & Preprocessing, SQL Database Querying, Pemodelan Data, dan Visualisasi Interaktif. Berpengalaman langsung mengelola operasional data warehouse di Kopkar PT Astra Honda Motor, menganalisis perkembangan koperasi, serta bersertifikasi resmi Data Analyst for Business dari Bitlabs Academy.",
    stats: {
      level: 23,
      classType: "Data Analyst & BI Specialist",
      hp: "100/100",
      mp: "100/100",
      exp: "3.69 / 4.00 (Lulus Jul 2026)",
      specialMove: "SQL Optimization & Interactive Dashboard Magic",
    },
    skillCategories: [
      {
        title: "Data & Analitik Inti",
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
        icon: "💻",
        skills: [
          { name: "Figma (Dashboard Mockups)", level: 90 },
          { name: "Next.js & Tailwind CSS", level: 85 },
          { name: "Usability Testing", level: 88 },
          { name: "User-Centered Design", level: 90 },
          { name: "Git / GitHub", level: 85 },
          { name: "Stakeholder Presentation", level: 90 },
        ],
      },
    ] as SkillCategory[],
  },
  projects: [
    {
      id: "ahm-data-analytics",
      title: "Kopkar AHM Data Warehouse & Cooperative Analytics",
      category: "Data Analysis",
      subtitle: "Analisis Data Operasional, Stok Gudang & Perkembangan Koperasi",
      description: "Pengolahan dan analisis basis data operasional bulanan pinjaman anggota, purchase order, dan stok persediaan di Kopkar PT Astra Honda Motor.",
      longDescription: [
        "Menyusun dan memelihara catatan basis data operasional bulanan mencakup pinjaman anggota, pesanan pembelian, stok persediaan, dan penjualan toko.",
        "Melakukan data cleaning, kontrol kondisi persediaan, dan analisis akurasi catatan barang gudang untuk meminimalkan selisih stok.",
        "Menganalisis data perkembangan koperasi tahun 2023-2024 serta menyajikan temuan strategis kepada jajaran pengurus dan karyawan melalui visualisasi data & reporting berkala.",
        "Melakukan pengujian usability dan kualitas data aplikasi toko online Toko AHM versi 2 dan 3.",
      ],
      role: "Data Warehouse & IT Support Intern",
      period: "Mar 2024 - Okt 2024",
      tools: ["MySQL", "Data Cleaning", "Data Visualization", "Spreadsheet", "Inventory Analytics"],
      highlights: [
        "Analisis Perkembangan Koperasi Periode 2023-2024",
        "Peningkatan Akurasi Stok Persediaan Gudang",
        "Dashboard Laporan Operasional Bulanan",
      ],
      icon: "database",
    },
    {
      id: "bitlabs-business-analytics",
      title: "Business Performance & Sales Intelligence Dashboard",
      category: "Business Intelligence",
      subtitle: "Analisis Kinerja Bisnis, Segmentasi & Metrik Penjualan",
      description: "Proyek analisis data bisnis komprehensif menggunakan SQL dan Tableau untuk mengidentifikasi tren penjualan, perilaku pelanggan, dan peluang efisiensi biaya.",
      longDescription: [
        "Mengekstrak dan mentransformasi data mentah transaksi bisnis menggunakan query SQL (Aggregations, Window Functions, JOINs).",
        "Melakukan Exploratory Data Analysis (EDA) untuk menemukan pola retensi pelanggan, produk terlaris, dan distribusi pendapatan wilayah.",
        "Membangun dashboard interaktif Tableau & Looker Studio dengan metrik KPI dinamis untuk mempermudah pengambilan keputusan manajerial.",
        "Menyusun rekomendasi bisnis berbasis data (data-driven strategy) bagi stakeholder.",
      ],
      role: "Data Analyst Participant",
      period: "Des 2024",
      tools: ["SQL", "Tableau", "Python", "EDA", "Business Intelligence", "Looker Studio"],
      highlights: [
        "Interactive Executive Tableau Dashboard",
        "Customer & Revenue Trend Analysis via SQL",
        "Actionable Business Insights & Strategy",
      ],
      icon: "chart",
    },
    {
      id: "teknopolis-data-ux",
      title: "Teknopolis - Data Flow & UI/UX Perizinan OSS",
      category: "UI/UX & Web",
      subtitle: "Arsitektur Informasi & Desain Sistem Perizinan Pendidikan",
      description: "Merancang pemodelan alur data dan antarmuka konsep layanan perizinan pendidikan yang selaras dengan regulasi Online Single Submission (OSS).",
      longDescription: [
        "Menganalisis alur data pengajuan perizinan dan regulasi OSS untuk merancang arsitektur informasi yang efisien.",
        "Merancang antarmuka web dan mobile dengan fokus kemudahan monitoring status berkas perizinan secara real-time.",
        "Mengembangkan design system konsisten yang meminimalkan beban kognitif pengguna dan mempercepat waktu pengisian formulir.",
      ],
      role: "UI/UX & Information Architect",
      period: "Agu 2023 - Sekarang",
      tools: ["Figma", "Information Architecture", "Canva", "User Flow", "Design System"],
      highlights: [
        "Pemodelan Alur Data Regulasi OSS",
        "Dual Direction Interactive UI Prototype",
        "Peningkatan Efisiensi Alur Pengajuan Izin",
      ],
      icon: "monitor",
    },
  ] as Project[],

  // Ordered Chronologically from OLDEST (2020) to NEWEST (2026)
  experiences: [
    {
      id: "kanaya",
      company: "PT Kanaya Multi Karya",
      location: "Bekasi, Jawa Barat, Indonesia",
      role: "Magang Desain Grafis & Aset Digital",
      period: "Mar 2020 - Jul 2020",
      yearRange: "2020",
      badge: "STAGE 01: CREATIVE & ASSETS",
      points: [
        "Membuat 40+ materi desain poster web promosi dengan riset tren preferensi target audiens.",
        "Berkolaborasi dengan tim developer untuk memastikan integritas dan kesesuaian aset visual digital.",
        "Mengembangkan pemahaman awal integrasi aset visual ke dalam platform digital bisnis.",
      ],
    },
    {
      id: "ahm",
      company: "Kopkar PT Astra Honda Motor",
      location: "Jakarta Utara, DKI Jakarta, Indonesia",
      role: "Magang Data Warehouse Bisnis & IT Support",
      period: "Mar 2024 - Okt 2024",
      yearRange: "2024",
      badge: "STAGE 02: DATA WAREHOUSE & QA",
      certificateFile: "/Sertifikat magang kopkar.jpg",
      certificateType: "image",
      points: [
        "Menyusun & memelihara basis data operasional bulanan pinjaman anggota, PO, stok persediaan, dan penjualan.",
        "Melakukan pengecekan stok gudang, data reconciliation, dan kontrol data pengeluaran barang.",
        "Menganalisis tren perkembangan data koperasi 2023-2024 dan menyampaikan visualisasi laporan kepada stakeholder.",
        "Menguji aplikasi e-commerce Toko AHM versi 2 dan 3 untuk akurasi data transaksi dan stabilitas fitur antarmuka.",
      ],
    },
    {
      id: "unesa",
      company: "Universitas Negeri Surabaya (UNESA)",
      location: "Surabaya, Jawa Timur, Indonesia",
      role: "S1 Sistem Informasi (Selesai / Lulus: Juli 2026)",
      period: "Agu 2021 - Jul 2026",
      yearRange: "2021 - 2026",
      badge: "STAGE 03: HIGHER EDUCATION (IPK 3.69)",
      certificateFile: "/Surat Penetapan Kelulusan UNESA.jpg",
      certificateType: "image",
      points: [
        "Menyelesaikan studi S1 Sistem Informasi dengan predikat sangat memuaskan (IPK: 3.69 / 4.00) pada Juli 2026.",
        "Fokus keilmuan mendalam: Basis Data Lanjut, Probabilitas & Statistika, Data Mining, ERP, dan Analisis Strategi Sistem Informasi.",
        "Menghasilkan berbagai riset dan proyek implementasi sistem informasi data analitik terintegrasi.",
      ],
    },
  ] as Experience[],

  certificates: [
    {
      id: "ahm-cert",
      title: "Sertifikat Magang Kopkar PT Astra Honda Motor",
      issuer: "Koperasi Karyawan PT Astra Honda Motor",
      date: "Oktober 2024",
      description: "Sertifikat resmi penghargaan atas dedikasi dan kinerja memuaskan dalam pengelolaan IT Support, Data Warehouse Bisnis, dan pengujian aplikasi Toko AHM.",
      fileUrl: "/Sertifikat magang kopkar.jpg",
      fileType: "image",
    },
    {
      id: "bitlabs-data",
      title: "Data Analytic for Business Certification",
      issuer: "Bitlabs Academy",
      date: "Desember 2024",
      description: "Sertifikasi resmi penguasaan analisis data bisnis, SQL database querying, visualisasi data Tableau, dan pemecahan masalah data-driven di industri.",
      fileUrl: "/Nilai -km-1858024-MUHAMMAD ANDHIKA FAHREZZY-1735216618-1-2-2.pdf",
      fileType: "pdf",
    },
    {
      id: "kampus-merdeka",
      title: "Certificate of Completion - Kampus Merdeka",
      issuer: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
      date: "2024",
      description: "Sertifikat kelulusan program studi independen / magang kompetensi industri dengan capaian nilai akademik sangat memuaskan.",
      fileUrl: "/certificate-km-1858024-MUHAMMAD ANDHIKA FAHREZZY-1735216618-1-2-1.pdf",
      fileType: "pdf",
    },
    {
      id: "unesa-spk",
      title: "Surat Penetapan Kelulusan (S.Kom) - UNESA",
      issuer: "Fakultas Teknik, Universitas Negeri Surabaya",
      date: "20 Juli 2026",
      description: "Surat Penetapan Kelulusan resmi (No: B/103693/UN38.5/PP.12.16/2026) yang menetapkan kelulusan S1 Sistem Informasi dengan gelar Sarjana Komputer (S.Kom.).",
      fileUrl: "/Surat Penetapan Kelulusan UNESA.jpg",
      fileType: "image",
    },
  ] as Certificate[],

  contact: {
    headline: "HUBUNGI SAYA UNTUK PELUANG DATA ANALYST!",
    subheadline: "Saya terbuka untuk peluang kerja Full-Time, Kontrak, maupun Proyek Data Analyst / Business Intelligence Specialist.",
    email: "muhammadandhikafahrezzy@gmail.com",
    phone: "+62 851-5686-8434",
    whatsappUrl: "https://wa.me/6285156868434?text=Halo%20Andhika,%20saya%20tertarik%20dengan%20profil%20Data%20Analyst%20Anda!",
    linkedin: "linkedin.com/in/andhikafahrezzy",
    linkedinUrl: "https://www.linkedin.com/in/andhikafahrezzy/",
    githubUrl: "https://github.com",
    cvFilename: "CV_Muhammad_Andhika_Fahrezzy_ID.docx",
  },
};
