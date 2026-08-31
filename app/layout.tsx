import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Andhika Fahrezzy | Retro 8-Bit Portfolio",
  description: "Portofolio Petualangan Retro 8-Bit Muhammad Andhika Fahrezzy - UI/UX Designer & Data Analyst.",
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
        {children}
      </body>
    </html>
  );
}
