# 📂 Panduan Manajemen Proyek Portofolio — Muhammad Andhika Fahrezzy

Struktur folder ini dirancang khusus untuk mengorganisir seluruh portofolio dan hasil karya Anda agar rapi, berstandar industri, dan mudah diintegrasikan ke dalam website portofolio Next.js.

---

## 📁 Struktur Kategori Proyek (3 Pilar Utama):

```text
c:\Portofolio\Proyek\
│
├── 📁 1_Data_Analysis/                # Proyek SQL, Python (Pandas/NumPy), EDA, Data Cleaning & Data Warehouse
│   ├── 📁 Kopkar_AHM_Data_Warehouse/  # Case study operasional data warehouse Kopkar Astra Honda Motor
│   └── 📁 TEMPLATE_PROJECT_DATA_ANALYSIS/ # Folder cetak biru untuk proyek baru
│
├── 📁 2_Business_Intelligence/        # Dashboard Tableau, Looker Studio, Power BI, KPI & Metrik Bisnis
│   ├── 📁 Bitlabs_Executive_Sales_Dashboard/ # Case study dashboard eksekutif Bitlabs Academy
│   └── 📁 TEMPLATE_PROJECT_BI/        # Folder cetak biru untuk dashboard baru
│
└── 📁 3_UI_UX_dan_Web/                # Desain UI/UX Figma, Arsitektur Alur Data, Wireframe & Web App
    ├── 📁 Teknopolis_OSS_Licensing/   # Case study desain sistem perizinan pendidikan OSS
    ├── 📁 Unesa_Health_Care_Platform/ # Case study web layanan kesehatan kampus
    └── 📁 TEMPLATE_PROJECT_UI_UX_WEB/ # Folder cetak biru untuk proyek desain baru
```

---

## 🚀 Cara Menambahkan Proyek Baru:

1. **Pilih Kategori:** Tentukan apakah proyek Anda masuk ke `1_Data_Analysis`, `2_Business_Intelligence`, atau `3_UI_UX_dan_Web`.
2. **Duplikat Folder Template:**
   - Copy folder `TEMPLATE_PROJECT_...` di dalam kategori tersebut.
   - Ganti nama folder menjadi nama proyek Anda (contoh: `Analisis_Saham_IHSG_Python` atau `Retail_Churn_Prediction_SQL`).
3. **Isi Berkas Proyek:**
   - Masukkan dataset mentah/bersih ke folder `datasets/`.
   - Simpan query SQL Anda di folder `sql_queries/` (`.sql`).
   - Simpan notebook Python di folder `notebooks/` (`.ipynb` / `.py`).
   - Simpan file dashboard di folder `dashboards/` (`.twbx` / link Looker Studio).
   - Masukkan tangkapan layar / mockup dashboard ke folder `reports/` atau `screenshots/`.
4. **Tulis Ringkasan Proyek:** Buka dan isi file `README.md` pada folder proyek tersebut (sudah ada format template siap isi: Problem Statement, Metodologi, Insight Utama, dan Rekomendasi Bisnis).
5. **Sinkronkan ke Website Portofolio:** Masukkan data ringkas proyek ke file `c:\Portofolio\data\portfolioData.ts` agar otomatis tampil di halaman `/projects` website Anda!
