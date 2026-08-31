import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Muhammad Andhika Fahrezzy | Data Analyst Portfolio (Retro 8-Bit)",
  description: "Portofolio Data Analyst & Business Intelligence Muhammad Andhika Fahrezzy - SQL, Python, Tableau, Excel & Data Warehouse.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased selection:bg-yellow-400 selection:text-black">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
