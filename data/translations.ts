import { Language } from "@/context/LanguageContext";

export interface TranslationDict {
  nav: {
    home: string;
    about: string;
    projects: string;
    experience: string;
    certificates: string;
    minigame: string;
    contact: string;
    coinTooltip: string;
  };
  hero: {
    windowTitle: string;
    greeting: string;
    title: string;
    subtitle: string;
    characterRole: string;
    characterLevel: string;
    hpLabel: string;
    mpLabel: string;
    expLabel: string;
    btnProjects: string;
    btnContact: string;
    btnCv: string;
    btnGame: string;
  };
  summary: {
    title: string;
    subtitle: string;
    badge: string;
    body: string;
    statsProjects: string;
    statsProjectsSub: string;
    statsGpa: string;
    statsGpaSub: string;
    statsTools: string;
    statsToolsSub: string;
    btnExplore: string;
    btnContact: string;
  };
  portals: {
    heading: string;
    subheading: string;
    enterStage: string;
    stages: {
      about: { stage: string; title: string; desc: string };
      projects: { stage: string; title: string; desc: string };
      experience: { stage: string; title: string; desc: string };
      certificates: { stage: string; title: string; desc: string };
      minigame: { stage: string; title: string; desc: string };
      contact: { stage: string; title: string; desc: string };
    };
  };
  about: {
    windowTitle: string;
    characterSheet: string;
    title: string;
    role: string;
    level: string;
    classType: string;
    guild: string;
    alignment: string;
    mainStoryTitle: string;
    story1: string;
    story2: string;
    story3: string;
    skillsTitle: string;
    toolsTitle: string;
    careerPhilosophyTitle: string;
    careerPhilosophy: string;
    btnNext: string;
  };
  experience: {
    windowTitle: string;
    headerTitle: string;
    headerSubtitle: string;
    badgeActive: string;
    stageLabel: string;
    keyAchievements: string;
    techStack: string;
    btnNext: string;
  };
  projects: {
    windowTitle: string;
    headerTitle: string;
    headerSubtitle: string;
    allTab: string;
    featuredLabel: string;
    deliverablesLabel: string;
    toolsLabel: string;
    btnDetails: string;
    modalDeliverablesTitle: string;
    modalImpactTitle: string;
    modalToolsTitle: string;
    modalClose: string;
    modalDemoBtn: string;
    modalGithubBtn: string;
    btnNext: string;
  };
  certificates: {
    windowTitle: string;
    headerTitle: string;
    headerSubtitle: string;
    issuerLabel: string;
    dateLabel: string;
    viewBtn: string;
    btnNext: string;
  };
  minigame: {
    windowTitle: string;
    score: string;
    highScore: string;
    lives: string;
    dataBits: string;
    powerCrystal: string;
    powerActive: string;
    ready: string;
    gameTitle: string;
    gameDesc: string;
    btnStart: string;
    gameOver: string;
    finalScore: string;
    btnRetry: string;
    victory: string;
    victoryDesc: string;
    btnPlayAgain: string;
    controlsHint: string;
    rulesTitle: string;
    rulesCrystal: string;
    rulesChase: string;
    rulesTunnel: string;
    btnBack: string;
    btnNext: string;
  };
  contact: {
    windowTitle: string;
    headline: string;
    subheadline: string;
    directChannelsTitle: string;
    formTitle: string;
    whatsappLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    emailLabel: string;
    cvBtn: string;
    copyBtn: string;
    copiedBtn: string;
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formSubject: string;
    formSubjectPlaceholder: string;
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmit: string;
    formSubmitting: string;
    successTitle: string;
    successDesc: string;
    btnNewMessage: string;
    btnBackGame: string;
    btnHome: string;
  };
  footer: {
    statusTitle: string;
    characterName: string;
    level: string;
    readyBadge: string;
    dialogue: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  id: {
    nav: {
      home: "HOME",
      about: "TENTANG",
      projects: "PROYEK",
      experience: "PENGALAMAN",
      certificates: "SERTIFIKAT",
      minigame: "MINIGAME 🕹️",
      contact: "KONTAK",
      coinTooltip: "Klik koin untuk menambah skor!",
    },
    hero: {
      windowTitle: "STAGE_01: DATA ANALYST_PORTFOLIO",
      greeting: "DATA • ANALYSIS • INSIGHT",
      title: "DATA ANALYST\nPORTFOLIO",
      subtitle: "Finding patterns. Answering questions. Making data useful.",
      characterRole: "DATA ANALYST & BUSINESS INTELLIGENCE",
      characterLevel: "LEVEL 23 • FRESH GRADUATE S.KOM",
      hpLabel: "DATA HP",
      mpLabel: "INSIGHT MP",
      expLabel: "MANUAL EXP",
      btnProjects: "JELAJAHI PROYEK",
      btnContact: "HUBUNGI REKRUTMEN",
      btnCv: "UNDUH CV RESMI",
      btnGame: "MAINKAN DATA DUNGEON",
    },
    summary: {
      title: "RINGKASAN EKSEKUTIF",
      subtitle: "TRANSFORMASI DATA MENTAH MENJADI KEPUTUSAN BISNIS STRATEGIS",
      badge: "DATA KNIGHT STATUS: READY TO HIRE",
      body: "Lulusan S1 Sistem Informasi Universitas Negeri Surabaya (IPK 3.51) dengan sertifikasi resmi Data Analytics for Business dari Bitlabs & Kampus Merdeka. Memiliki keahlian teruji dalam membersihkan data besar (SQL & Python), analisis tren bisnis, serta visualisasi dashboard eksekutif interaktif (Tableau & Looker Studio) untuk memandu keputusan manajerial yang terukur dan berdampak nyata.",
      statsProjects: "5+ Proyek Unggulan",
      statsProjectsSub: "Data & UI/UX Design",
      statsGpa: "3.51 / 4.00",
      statsGpaSub: "IPK S.Kom UNESA",
      statsTools: "SQL • Tableau • Python",
      statsToolsSub: "Keahlian Analitik",
      btnExplore: "MULAI PETUALANGAN STAGE 01",
      btnContact: "KOTAK SURAT & KONTAK",
    },
    portals: {
      heading: "PILIH TAHAPAN PETUALANGAN (WORLD SELECT)",
      subheading: "Jelajahi setiap stage portofolio Andhika dari profil kemampuan hingga ruang piala:",
      enterStage: "MASUK STAGE ▶",
      stages: {
        about: {
          stage: "STAGE 01",
          title: "PROFIL & STATUS",
          desc: "Karakter, statistik kemampuan analitik, dan latar belakang pendidikan S.Kom.",
        },
        projects: {
          stage: "STAGE 02",
          title: "GALERI PROYEK",
          desc: "Dashboard Tableau, analisis SQL, dan desain sistem antarmuka berbasis data.",
        },
        experience: {
          stage: "STAGE 03",
          title: "TIMELINE KARIR",
          desc: "Perjalanan magang desain, proyek kampus, hingga sertifikasi analitik bisnis.",
        },
        certificates: {
          stage: "STAGE 04",
          title: "RUANG TROFI",
          desc: "Sertifikat resmi Bitlabs Data Analytics for Business & Kampus Merdeka.",
        },
        minigame: {
          stage: "BONUS STAGE",
          title: "DATA KNIGHT VS ULER 🗡️🐍",
          desc: "Bantu ksatria Andhika mengumpulkan data bits di labirin dan taklukkan 4 Uler Bug!",
        },
        contact: {
          stage: "STAGE 05",
          title: "KOTAK SURAT",
          desc: "Kirim pesan langsung ke inbox Gmail atau terhubung lewat WhatsApp & LinkedIn.",
        },
      },
    },
    about: {
      windowTitle: "STAGE_01: CHARACTER_STATUS_SHEET.EXE",
      characterSheet: "LEMBAR STATUS KARAKTER",
      title: "PROFIL DATA ANALYST",
      role: "Peran: Data Analyst & BI Specialist",
      level: "Level: Lv.23 Fresh Graduate S.Kom",
      classType: "Kelas: Data Knight / Strategic Problem Solver",
      guild: "Almamater: Universitas Negeri Surabaya",
      alignment: "Fokus: SQL, Python, Tableau, Business Intelligence",
      mainStoryTitle: "KISAH PERJALANAN DATA KNIGHT",
      story1: "Sebagai lulusan S1 Sistem Informasi Universitas Negeri Surabaya (IPK 3.51), saya terbiasa melihat dunia melalui kacamata data. Setiap angka, baris transaksi, dan pola perilaku pelanggan menyimpan cerita yang dapat menentukan keberhasilan strategi bisnis.",
      story2: "Melalui program intensif Bitlabs Data Analytics for Business (Studi Independen Kampus Merdeka), saya mengasah keahlian dalam membersihkan data kotor, menjalankan query SQL kompleks, melakukan Exploratory Data Analysis (EDA) dengan Python, serta merancang dashboard interaktif eksekutif menggunakan Tableau dan Looker Studio.",
      story3: "Kombinasi latar belakang teknologi informasi, pemahaman bisnis, dan empati UI/UX memungkinkan saya tidak hanya menemukan wawasan analitik yang akurat, tetapi juga mengomunikasikannya secara jelas, intuitif, dan siap dieksekusi oleh tim manajemen.",
      skillsTitle: "POHON KEMAMPUAN (SKILL TREE)",
      toolsTitle: "SENJATA & PERANGKAT ANALITIK",
      careerPhilosophyTitle: "FILOSOFI KERJA",
      careerPhilosophy: "Data bukan sekadar kumpulan angka, melainkan kompas penunjuk arah yang membedakan antara spekulasi dan keputusan bisnis yang terukur.",
      btnNext: "LANJUT KE PROYEK ANALITIK",
    },
    experience: {
      windowTitle: "STAGE_03: CAREER_TIMELINE_QUESTS.EXE",
      headerTitle: "PERJALANAN & PENGALAMAN KARIR",
      headerSubtitle: "Tahapan evolusi profesional dari desain antarmuka hingga spesialisasi analisis data bisnis:",
      badgeActive: "SELESAI DENGAN BAIK",
      stageLabel: "STAGE",
      keyAchievements: "FOKUS & CAPAIAN UTAMA:",
      techStack: "PERANGKAT / TOOLS:",
      btnNext: "LANJUT KE RUANG TROFI SERTIFIKAT",
    },
    projects: {
      windowTitle: "STAGE_02: PROJECT_PORTFOLIO_VAULT.EXE",
      headerTitle: "GALERI PROYEK & KARYA",
      headerSubtitle: "Portofolio proyek analitik data, visualisasi dashboard bisnis, dan perancangan sistem informasi:",
      allTab: "SEMUA PROYEK",
      featuredLabel: "PROYEK UNGGULAN",
      deliverablesLabel: "DELIVERABLES / CAPAIAN UTAMA:",
      toolsLabel: "TECH STACK:",
      btnDetails: "DETAIL PROYEK ▶",
      modalDeliverablesTitle: "DELIVERABLES & CAPAIAN PROYEK:",
      modalImpactTitle: "DAMPAK & STRATEGI BISNIS:",
      modalToolsTitle: "TEKNOLOGI & TOOLS YANG DIGUNAKAN:",
      modalClose: "TUTUP WINDOW [✕]",
      modalDemoBtn: "BUKA DEMO / PROTOTIPE FIGMA",
      modalGithubBtn: "LIHAT REPOSITORI GITHUB",
      btnNext: "LANJUT KE TIMELINE PENGALAMAN",
    },
    certificates: {
      windowTitle: "STAGE_04: TROPHY_ROOM_AND_CREDENTIALS.EXE",
      headerTitle: "RUANG TROFI & SERTIFIKAT",
      headerSubtitle: "Kredensial resmi kelulusan, sertifikasi data analitik bisnis, dan pencapaian akademik:",
      issuerLabel: "PENERBIT:",
      dateLabel: "TANGGAL:",
      viewBtn: "LIHAT DOKUMEN RESMI ▶",
      btnNext: "MAINKAN DATA KNIGHT VS ULER 🗡️🐍",
    },
    minigame: {
      windowTitle: "BONUS STAGE: DATA_DUNGEON_KNIGHT_VS_ULER.EXE",
      score: "1UP SKOR",
      highScore: "HIGH SCORE",
      lives: "NYAWA",
      dataBits: "DATA BITS",
      powerCrystal: "POWER CRYSTAL",
      powerActive: "KEBAL",
      ready: "READY",
      gameTitle: "DATA DUNGEON LABYRINTH 🗡️🐍",
      gameDesc: "4 Uler Bug aktif memburu posisi Anda! Ambil Power Crystal untuk menjadi kebal & menebas uler!",
      btnStart: "START GAME [SPACE]",
      gameOver: "GAME OVER",
      finalScore: "SKOR AKHIR:",
      btnRetry: "MAIN LAGI [TRY AGAIN]",
      victory: "DUNGEON CONQUERED! 🎉",
      victoryDesc: "Luar biasa! Anda berhasil menaklukkan Data Dungeon tersulit!",
      btnPlayAgain: "MAINKAN LAGI",
      controlsHint: "KONTROL D-PAD (TOUCH / ARROW KEYS / WASD / SWIPE)",
      rulesTitle: "PANDUAN TAKTIK DATA DUNGEON:",
      rulesCrystal: "Power Insight Crystal (Berlian Biru): Memberikan status KEBAL TOTAL (~8 Detik). Sentuh uler mana pun untuk menebas dan mendapatkan bonus combo +200, +400, +800, +1600 Poin!",
      rulesChase: "Pengejaran Aktif Uler: Uler aktif bergerak memburu posisi ksatria Anda dan saling menghindari tabrakan sesama uler.",
      rulesTunnel: "Tunnel Warp: Manfaatkan lorong kiri/kanan untuk teleportasi instan menghindari kepungan uler.",
      btnBack: "◀ KEMBALI KE SERTIFIKAT",
      btnNext: "LANJUT KE KOTAK SURAT",
    },
    contact: {
      windowTitle: "STAGE_05: COMMAND_CENTER_AND_MAILBOX.EXE",
      headline: "HUBUNGI SAYA UNTUK PELUANG DATA ANALYST!",
      subheadline: "Saya terbuka untuk peluang kerja Full-Time, Kontrak, maupun Proyek Data Analyst / Business Intelligence Specialist.",
      directChannelsTitle: "SALURAN KOMUNIKASI LANGSUNG",
      formTitle: "TERMINAL_PESAN.BAT — INBOX_DIRECT",
      whatsappLabel: "WHATSAPP RESMI",
      linkedinLabel: "LINKEDIN PROFILE",
      githubLabel: "GITHUB PROFILE",
      emailLabel: "EMAIL RESMI",
      cvBtn: "UNDUH CV RESMI (.DOCX)",
      copyBtn: "SALIN",
      copiedBtn: "TERSALIN",
      formName: "NAMA LENGKAP / HR RECRUITER:",
      formNamePlaceholder: "e.g. John Doe / HR PT Tech",
      formEmail: "EMAIL PERUSAHAAN / BALASAN:",
      formEmailPlaceholder: "e.g. recruiter@company.com",
      formSubject: "SUBJEK / PERUSAHAAN:",
      formSubjectPlaceholder: "e.g. Peluang Data Analyst di PT XYZ",
      formMessage: "PESAN / DETAIL PELUANG:",
      formMessagePlaceholder: "Tuliskan pesan, tawaran proyek, atau peluang karir Anda di sini...",
      formSubmit: "TRANSMIT_MESSAGE.EXE [KIRIM KE INBOX]",
      formSubmitting: "MENGIRIM KE INBOX GMAIL...",
      successTitle: "PESAN BERHASIL MASUK KE INBOX GMAIL!",
      successDesc: "Terima kasih telah menghubungi. Notifikasi pesan Anda telah berhasil dikirimkan langsung ke kotak masuk email Andhika. Saya akan segera membalas email Anda dalam waktu 1x24 jam!",
      btnNewMessage: "KIRIM PESAN BARU",
      btnBackGame: "◀ KEMBALI KE MINIGAME",
      btnHome: "KEMBALI KE HOME STAGE",
    },
    footer: {
      statusTitle: "STATUS KSATRIA",
      characterName: "ANDHIKA FAHREZZY",
      level: "LVL 23 S.KOM",
      readyBadge: "STATUS: SIAP KERJA",
      dialogue: "Siap mengubah jutaan baris data mentah menjadi keputusan bisnis yang tajam!",
      copyright: "© 2026 Muhammad Andhika Fahrezzy. Built with Next.js, Tailwind CSS & 8-Bit Passion.",
    },
  },

  en: {
    nav: {
      home: "HOME",
      about: "ABOUT",
      projects: "PROJECTS",
      experience: "EXPERIENCE",
      certificates: "CERTIFICATES",
      minigame: "MINIGAME 🕹️",
      contact: "CONTACT",
      coinTooltip: "Click coins to boost your score!",
    },
    hero: {
      windowTitle: "STAGE_01: DATA ANALYST_PORTFOLIO",
      greeting: "DATA • ANALYSIS • INSIGHT",
      title: "DATA ANALYST\nPORTFOLIO",
      subtitle: "Finding patterns. Answering questions. Making data useful.",
      characterRole: "DATA ANALYST & BUSINESS INTELLIGENCE",
      characterLevel: "LEVEL 23 • FRESH GRADUATE B.CS",
      hpLabel: "DATA HP",
      mpLabel: "INSIGHT MP",
      expLabel: "MANUAL EXP",
      btnProjects: "EXPLORE PROJECTS",
      btnContact: "LET'S TALK WORK",
      btnCv: "DOWNLOAD CV (.DOCX)",
      btnGame: "PLAY DATA DUNGEON",
    },
    summary: {
      title: "EXECUTIVE SUMMARY",
      subtitle: "TURNING RAW DATASETS INTO SHARP BUSINESS MOVES",
      badge: "DATA KNIGHT STATUS: READY TO HIRE",
      body: "Information Systems graduate from State University of Surabaya (3.51 GPA) certified in Data Analytics for Business via Bitlabs & Kampus Merdeka. Proven track record in wrangling messy datasets (SQL & Python), decoding sales and user retention trends, and engineering clean, interactive executive dashboards (Tableau & Looker Studio) that empower teams to make confident, data-backed decisions.",
      statsProjects: "5+ Featured Works",
      statsProjectsSub: "Data & UI/UX Design",
      statsGpa: "3.51 / 4.00",
      statsGpaSub: "B.CS Degree GPA",
      statsTools: "SQL • Tableau • Python",
      statsToolsSub: "Core Analytics Stack",
      btnExplore: "START STAGE 01 QUEST",
      btnContact: "MAILBOX & CONTACT",
    },
    portals: {
      heading: "CHOOSE YOUR QUEST (WORLD SELECT)",
      subheading: "Dive into each stage of my portfolio, from my technical skill tree to real-world business case studies:",
      enterStage: "ENTER STAGE ▶",
      stages: {
        about: {
          stage: "STAGE 01",
          title: "CHARACTER STATUS",
          desc: "Character build, analytics skill breakdown, and academic foundation in Information Systems.",
        },
        projects: {
          stage: "STAGE 02",
          title: "PROJECT VAULT",
          desc: "Tableau business dashboards, deep SQL query pipelines, and data-driven product designs.",
        },
        experience: {
          stage: "STAGE 03",
          title: "CAREER TIMELINE",
          desc: "My evolution from UI/UX design intern to certified business data analyst.",
        },
        certificates: {
          stage: "STAGE 04",
          title: "TROPHY ROOM",
          desc: "Verified credentials from Bitlabs Data Analytics for Business & university graduation honours.",
        },
        minigame: {
          stage: "BONUS STAGE",
          title: "DATA KNIGHT VS ULER 🗡️🐍",
          desc: "Help Data Knight Andhika sweep the labyrinth for data bits and outmaneuver 4 Bug Snakes!",
        },
        contact: {
          stage: "STAGE 05",
          title: "MAILBOX HUB",
          desc: "Transmit a direct note to my Gmail inbox or connect instantly via WhatsApp & LinkedIn.",
        },
      },
    },
    about: {
      windowTitle: "STAGE_01: CHARACTER_STATUS_SHEET.EXE",
      characterSheet: "CHARACTER STATUS SHEET",
      title: "DATA ANALYST PROFILE",
      role: "Role: Data Analyst & BI Specialist",
      level: "Level: Lv.23 Fresh Graduate B.CS",
      classType: "Class: Data Knight / Strategic Problem Solver",
      guild: "Guild: State University of Surabaya (UNESA)",
      alignment: "Focus: SQL, Python, Tableau, Business Intelligence",
      mainStoryTitle: "THE DATA KNIGHT ORIGIN STORY",
      story1: "Graduating with a Bachelor's degree in Information Systems (3.51 GPA), I naturally look at challenges through the lens of data. Behind every raw transaction, user log, or traffic spike lies a clear narrative waiting to unlock revenue and operational wins.",
      story2: "Through the intensive Bitlabs Data Analytics for Business program (Kampus Merdeka certified), I leveled up hands-on skills in data cleaning, complex SQL queries (Window Functions, Aggregations, Multi-Table Joins), Python EDA, and architecting intuitive dashboards in Tableau and Looker Studio.",
      story3: "Blending my technical IT foundation with business acumen and UI/UX user empathy, I don't just generate reports—I deliver digestible, visually compelling data stories that executives and product teams can immediately act on.",
      skillsTitle: "ANALYTICS SKILL TREE",
      toolsTitle: "WEAPONS & ANALYTICS TOOLBOX",
      careerPhilosophyTitle: "WORK PHILOSOPHY",
      careerPhilosophy: "Data isn't just numbers in a spreadsheet—it's the compass that separates blind guesswork from decisive, profitable business strategy.",
      btnNext: "EXPLORE ANALYTICS PROJECTS",
    },
    experience: {
      windowTitle: "STAGE_03: CAREER_TIMELINE_QUESTS.EXE",
      headerTitle: "CAREER TIMELINE & QUESTS",
      headerSubtitle: "A hands-on journey from visual product design to certified business intelligence and data analytics:",
      badgeActive: "MISSION COMPLETED",
      stageLabel: "STAGE",
      keyAchievements: "CORE DELIVERABLES & IMPACT:",
      techStack: "TOOLKIT / TECH STACK:",
      btnNext: "ENTER THE TROPHY ROOM",
    },
    projects: {
      windowTitle: "STAGE_02: PROJECT_PORTFOLIO_VAULT.EXE",
      headerTitle: "PROJECT VAULT & CASE STUDIES",
      headerSubtitle: "Explore real-world data analytics pipelines, interactive business dashboards, and digital product designs:",
      allTab: "ALL PROJECTS",
      featuredLabel: "FEATURED PROJECT",
      deliverablesLabel: "CORE DELIVERABLES & FINDINGS:",
      toolsLabel: "TECH STACK:",
      btnDetails: "PROJECT DETAILS ▶",
      modalDeliverablesTitle: "KEY DELIVERABLES & FINDINGS:",
      modalImpactTitle: "BUSINESS IMPACT & STRATEGY:",
      modalToolsTitle: "TECHNOLOGIES & TOOLS USED:",
      modalClose: "CLOSE WINDOW [✕]",
      modalDemoBtn: "OPEN LIVE FIGMA PROTOTYPE",
      modalGithubBtn: "VIEW GITHUB REPOSITORY",
      btnNext: "GO TO CAREER TIMELINE",
    },
    certificates: {
      windowTitle: "STAGE_04: TROPHY_ROOM_AND_CREDENTIALS.EXE",
      headerTitle: "TROPHY ROOM & CREDENTIALS",
      headerSubtitle: "Official certifications, business analytics credentials, and university graduation honors:",
      issuerLabel: "ISSUER:",
      dateLabel: "DATE:",
      viewBtn: "VIEW CREDENTIAL ▶",
      btnNext: "PLAY DATA KNIGHT VS ULER 🗡️🐍",
    },
    minigame: {
      windowTitle: "BONUS STAGE: DATA_DUNGEON_KNIGHT_VS_ULER.EXE",
      score: "1UP SCORE",
      highScore: "HIGH SCORE",
      lives: "LIVES",
      dataBits: "DATA BITS",
      powerCrystal: "POWER CRYSTAL",
      powerActive: "INVINCIBLE",
      ready: "READY",
      gameTitle: "DATA DUNGEON LABYRINTH 🗡️🐍",
      gameDesc: "4 Bug Snakes are actively tracking your position! Grab Power Crystals to gain invulnerability and slash them down!",
      btnStart: "START GAME [SPACE]",
      gameOver: "GAME OVER",
      finalScore: "FINAL SCORE:",
      btnRetry: "TRY AGAIN",
      victory: "DUNGEON CONQUERED! 🎉",
      victoryDesc: "Outstanding! You cleared the entire Data Dungeon of bug snakes!",
      btnPlayAgain: "PLAY AGAIN",
      controlsHint: "D-PAD CONTROLS (TOUCH / ARROW KEYS / WASD / SWIPE)",
      rulesTitle: "DATA DUNGEON TACTICAL BRIEFING:",
      rulesCrystal: "Power Insight Crystal (Blue Diamond): Grants total INVINCIBILITY (~8 Seconds). Touch any snake to slash it for combo bonuses: +200, +400, +800, +1600 Points!",
      rulesChase: "Active Snake Hunting: All 4 snakes calculate dynamic pathfinding towards your position while avoiding stacking on each other.",
      rulesTunnel: "Tunnel Warp: Use the left and right warp gates to teleport instantly and escape snake pinches.",
      btnBack: "◀ BACK TO CERTIFICATES",
      btnNext: "PROCEED TO MAILBOX",
    },
    contact: {
      windowTitle: "STAGE_05: COMMAND_CENTER_AND_MAILBOX.EXE",
      headline: "LET'S TALK DATA & BUILD SOMETHING GREAT!",
      subheadline: "I'm actively open for Full-Time Data Analyst roles, contract analytics consulting, and Business Intelligence opportunities.",
      directChannelsTitle: "DIRECT COMMUNICATION CHANNELS",
      formTitle: "TERMINAL_PESAN.BAT — INBOX_DIRECT",
      whatsappLabel: "OFFICIAL WHATSAPP",
      linkedinLabel: "LINKEDIN PROFILE",
      githubLabel: "GITHUB PROFILE",
      emailLabel: "OFFICIAL EMAIL",
      cvBtn: "DOWNLOAD RESUME (.DOCX)",
      copyBtn: "COPY",
      copiedBtn: "COPIED",
      formName: "YOUR FULL NAME / HR RECRUITER:",
      formNamePlaceholder: "e.g. Alex Morgan / Talent Acquisition Lead",
      formEmail: "WORK EMAIL / REPLY ADDRESS:",
      formEmailPlaceholder: "e.g. recruiter@company.com",
      formSubject: "SUBJECT / COMPANY:",
      formSubjectPlaceholder: "e.g. Data Analyst Opportunity @ TechCorp",
      formMessage: "MESSAGE / ROLE DETAILS:",
      formMessagePlaceholder: "Share project scope, full-time openings, or collaboration ideas here...",
      formSubmit: "TRANSMIT_MESSAGE.EXE [SEND TO INBOX]",
      formSubmitting: "SENDING TO GMAIL INBOX...",
      successTitle: "MESSAGE DELIVERED TO GMAIL INBOX!",
      successDesc: "Thanks for reaching out! Your note was securely forwarded straight to Andhika's Gmail inbox. I'll get back to you within 24 hours!",
      btnNewMessage: "SEND ANOTHER NOTE",
      btnBackGame: "◀ BACK TO MINIGAME",
      btnHome: "RETURN TO HOME STAGE",
    },
    footer: {
      statusTitle: "KNIGHT STATUS",
      characterName: "ANDHIKA FAHREZZY",
      level: "LVL 23 B.CS",
      readyBadge: "STATUS: READY TO HIRE",
      dialogue: "Ready to turn millions of raw data points into clear, profitable business wins!",
      copyright: "© 2026 Muhammad Andhika Fahrezzy. Built with Next.js, Tailwind CSS & 8-Bit Passion.",
    },
  },
};
