export interface Project {
  id: string;
  title: string;
  category: "UI/UX" | "Data & Web" | "Graphic Art";
  subtitle: string;
  description: string;
  longDescription: string[];
  role: string;
  period: string;
  tools: string[];
  highlights: string[];
  icon: "monitor" | "gamepad" | "brush" | "database";
  demoUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  badge: string;
  points: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  pdfFile?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; iconText?: string }[];
}

export const PORTFOLIO_DATA = {
  hero: {
    greeting: "SELAMAT DATANG DI PETUALANGAN",
    title: "PORTOFOLIO SAYA!",
    subtitle: "MENJELAJAHI KARYA DAN KREATIFITAS DALAM DUNIA 8-BIT",
    cta: "MULAI PETUALANGAN",
    characterName: "MUHAMMAD ANDHIKA FAHREZZY",
    role: "UI/UX Designer & Data Analyst",
  },
  about: {
    dialogue: "SIAPA SAYA? SEORANG UI/UX DESIGNER & DATA ANALYST DENGAN MINAT TINGGI PADA ESTETIKA RETRO, PENGALAMAN PENGGUNA YANG INTUITIF, DAN ANALISIS DATA PRESISI.",
    name: "Muhammad Andhika Fahrezzy",
    title: "UI/UX Designer & Data Analyst",
    degree: "S1 Sistem Informasi — Universitas Negeri Surabaya",
    gpa: "IPK 3.69 / 4.00",
    location: "Depok / Surabaya, Indonesia",
    bio: "Mahasiswa S1 Sistem Informasi dengan pengalaman praktis dalam perancangan UI/UX berbasis pengguna, operasional data bisnis, pengujian usability aplikasi, dan pengembangan desain grafis. Senang memadukan estetika visual dengan logika data untuk menciptakan produk digital yang berdampak nyata.",
    stats: {
      level: 23,
      classType: "Information Systems Adventurer",
      hp: "100/100",
      mp: "100/100",
      exp: "3.69 / 4.00",
      specialMove: "Pixel-Perfect Prototyping & Query Magic",
    },
    skillCategories: [
      {
        title: "UI/UX & Desain",
        icon: "🎨",
        skills: [
          { name: "Figma", level: 95 },
          { name: "UI/UX Research", level: 90 },
          { name: "Wireframing & Prototyping", level: 92 },
          { name: "Design System", level: 88 },
          { name: "Adobe Photoshop", level: 85 },
          { name: "Canva", level: 90 },
        ],
      },
      {
        title: "Data & Analitik",
        icon: "📊",
        skills: [
          { name: "Python (Data Analysis)", level: 85 },
          { name: "MySQL / SQL", level: 88 },
          { name: "BigQuery", level: 80 },
          { name: "Tableau & Looker", level: 85 },
          { name: "Data Cleaning", level: 90 },
          { name: "Operasional Reporting", level: 92 },
        ],
      },
      {
        title: "Web & Frontend",
        icon: "💻",
        skills: [
          { name: "Next.js & React", level: 85 },
          { name: "Tailwind CSS", level: 90 },
          { name: "HTML5 / CSS3 / JS", level: 92 },
          { name: "PHP & Wix", level: 80 },
          { name: "Git & GitHub", level: 85 },
          { name: "QA & Usability Test", level: 88 },
        ],
      },
    ] as SkillCategory[],
  },
  projects: [
    {
      id: "teknopolis",
      title: "Teknopolis Licensing Platform",
      category: "UI/UX",
      subtitle: "UI/UX Design Sistem Perizinan Pendidikan OSS",
      description: "Merancang antarmuka web dan mobile untuk konsep layanan perizinan pendidikan yang selaras dengan alur regulasi Online Single Submission (OSS).",
      longDescription: [
        "Merancang antarmuka web dan mobile untuk konsep layanan perizinan pendidikan yang selaras dengan alur regulasi OSS, menggunakan Figma, Canva, dan Adobe Photoshop.",
        "Menghasilkan dua arah desain antarmuka dan tata letak secara kolaboratif untuk perjalanan perizinan yang berorientasi pemangku kepentingan.",
        "Mengembangkan komponen design system konsisten yang mempermudah navigasi pengajuan berkas dan monitoring status izin secara real-time.",
      ],
      role: "UI/UX Designer",
      period: "Agu 2023 - Sekarang",
      tools: ["Figma", "Canva", "Adobe Photoshop", "Design System", "User Flow"],
      highlights: [
        "Arsitektur Informasi Alur Perizinan OSS",
        "Dual Direction UI Prototype (Desktop & Mobile)",
        "Pengujian Usability Alur Pengajuan",
      ],
      icon: "monitor",
    },
    {
      id: "toko-ahm",
      title: "Toko AHM & Data Warehouse",
      category: "Data & Web",
      subtitle: "Data Warehouse & QA Testing Toko Online Kopkar AHM",
      description: "Pengujian aplikasi toko online Toko AHM versi 2 & 3, pemeliharaan basis data operasional bulanan, dan visualisasi kinerja koperasi.",
      longDescription: [
        "Menyusun dan memelihara catatan operasional bulanan mencakup pinjaman anggota, pesanan pembelian, stok persediaan, dan penjualan toko.",
        "Melakukan pengecekan stok gudang, kontrol kondisi barang, dan input data pengeluaran barang guna menjaga akurasi persediaan.",
        "Menganalisis data perkembangan koperasi tahun 2023-2024 dan menyampaikan temuan melalui visualisasi data serta laporan rutin.",
        "Menguji aplikasi toko online Toko AHM versi 2 dan 3, mendokumentasikan observasi antarmuka, akses fitur, dan stabilitas halaman.",
      ],
      role: "IT Support & Data Warehouse Intern",
      period: "Mar 2024 - Okt 2024",
      tools: ["MySQL", "Data Visualization", "QA Testing", "Excel", "Inventory Control"],
      highlights: [
        "Testing Aplikasi Toko AHM v2 & v3",
        "Dashboard Visualisasi Data Koperasi 2023-2024",
        "Sinkronisasi Stok Gudang & Purchase Order",
      ],
      icon: "database",
    },
    {
      id: "unesa-healthcare",
      title: "Unesa Health Care Platform",
      category: "UI/UX",
      subtitle: "Web Layanan Kesehatan Sivitas Akademika",
      description: "Platform digital layanan kesehatan mahasiswa UNESA untuk kemudahan konsultasi kesehatan, jadwal dokter kampus, dan informasi medis.",
      longDescription: [
        "Merancang antarmuka dan pengalaman pengguna untuk platform web layanan kesehatan mahasiswa menggunakan Figma dan Wix.",
        "Melakukan riset kebutuhan antarmuka mahasiswa dan staf kampus dalam mengakses rekam informasi kesehatan dan jadwal janji temu.",
        "Mengoptimalkan tata letak mobile-responsive agar mudah diakses di smartphone pengguna.",
      ],
      role: "UI/UX & Web Contributor",
      period: "Feb 2023 - Jun 2023",
      tools: ["Figma", "Wix", "UI/UX Research", "Wireframing"],
      highlights: [
        "Sistem Reservasi & Jadwal Klinik Kampus",
        "Desain Antarmuka Ramah Mahasiswa",
        "Prototip Interaktif Berkecepatan Tinggi",
      ],
      icon: "gamepad",
    },
    {
      id: "kanaya-design",
      title: "40+ Promotional Web Art Assets",
      category: "Graphic Art",
      subtitle: "Digital Graphic Assets & Web Integration",
      description: "Pembuatan 40+ materi desain poster web promosi dengan konsistensi brand identity, berkolaborasi dengan developer untuk integrasi aset.",
      longDescription: [
        "Membuat 40+ desain poster web dengan berbagai tema dan arah warna sesuai pedoman desain perusahaan PT Kanaya Multi Karya.",
        "Meriset tren desain dan preferensi target audiens digital, lalu berkolaborasi dengan web developer untuk mengintegrasikan aset ke dalam website.",
        "Menghasilkan aset grafis beresolusi optimal dengan format web-friendly.",
      ],
      role: "Graphic Design Intern",
      period: "Mar 2020 - Jul 2020",
      tools: ["Adobe Photoshop", "Canva", "Brand Identity", "Asset Optimization"],
      highlights: [
        "40+ Web Poster & Banner Designs",
        "Kolaborasi Langsung dengan Tim Web Dev",
        "Penerapan Brand Guidelines Perusahaan",
      ],
      icon: "brush",
    },
  ] as Project[],
  experiences: [
    {
      id: "ahm",
      company: "Kopkar PT Astra Honda Motor",
      location: "Jakarta Utara, Indonesia",
      role: "Magang IT Support & Data Warehouse Bisnis",
      period: "Mar 2024 - Okt 2024",
      badge: "MAGANG INDUSTRI",
      points: [
        "Menyusun & memelihara data operasional bulanan pinjaman anggota, PO, stok persediaan, dan penjualan.",
        "Melakukan pengecekan stok gudang dan input data pengeluaran guna menjaga akurasi persediaan.",
        "Menganalisis data perkembangan koperasi 2023-2024 dan menyampaikan temuan via visualisasi data.",
        "Menguji aplikasi toko online Toko AHM versi 2 dan 3 untuk usability antarmuka dan kestabilan performa.",
        "Mendukung alur administrasi pinjaman melalui aplikasi koperasi internal.",
      ],
    },
    {
      id: "kanaya",
      company: "PT Kanaya Multi Karya",
      location: "Bekasi, Indonesia",
      role: "Magang Desain Grafis",
      period: "Mar 2020 - Jul 2020",
      badge: "CREATIVE & ASSETS",
      points: [
        "Membuat 40+ desain poster web dengan berbagai tema sesuai pedoman desain perusahaan.",
        "Meriset tren desain terkini dan preferensi audiens untuk meningkatkan daya tarik promosi digital.",
        "Berkolaborasi dengan tim developer untuk memastikan kesiapan aset visual di website perusahaan.",
      ],
    },
    {
      id: "unesa",
      company: "Universitas Negeri Surabaya (UNESA)",
      location: "Surabaya, Indonesia",
      role: "S1 Sistem Informasi (IPK: 3.69 / 4.00)",
      period: "Agu 2021 - Sekarang",
      badge: "PENDIDIKAN TINGGI",
      points: [
        "Mata kuliah relevan: Basis Data, Probabilitas & Statistika, Data Mining, ERP, Perancangan Strategi SI, IMK.",
        "Aktif berkolaborasi dalam berbagai proyek perancangan antarmuka perangkat lunak dan manajemen sistem data.",
      ],
    },
  ] as Experience[],
  certificates: [
    {
      id: "bitlabs-data",
      title: "Data Analytic for Business",
      issuer: "Bitlabs Academy",
      date: "Desember 2024",
      description: "Pelatihan komprehensif pengolahan data bisnis, SQL querying, visualisasi data analitik, dan strategi pengambilan keputusan berbasis data.",
      pdfFile: "/Nilai -km-1858024-MUHAMMAD ANDHIKA FAHREZZY-1735216618-1-2-2.pdf",
    },
    {
      id: "kampus-merdeka",
      title: "Certificate of Completion - Kampus Merdeka",
      issuer: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
      date: "2024",
      description: "Sertifikat resmi kelulusan program pembelajaran dan magang kompetensi industri dengan capaian nilai sangat memuaskan.",
      pdfFile: "/certificate-km-1858024-MUHAMMAD ANDHIKA FAHREZZY-1735216618-1-2-1.pdf",
    },
  ] as Certificate[],
  contact: {
    headline: "HUBUNGI SAYA UNTUK KOLABORASI!",
    subheadline: "Apakah Anda memiliki proyek seru, tawaran pekerjaan, atau ingin berdiskusi seputar UI/UX dan Data Analytics? Kotak surat petualangan saya selalu terbuka!",
    email: "muhammadandhikafahrezzy@gmail.com",
    phone: "+62 851-5686-8434",
    whatsappUrl: "https://wa.me/6285156868434?text=Halo%20Andhika,%20saya%20tertarik%20dengan%20portofolio%20Anda!",
    linkedin: "linkedin.com/in/andhikafahrezzy",
    linkedinUrl: "https://linkedin.com/in/andhikafahrezzy",
    githubUrl: "https://github.com",
    cvFilename: "CV_Muhammad_Andhika_Fahrezzy_ID.docx",
  },
};
