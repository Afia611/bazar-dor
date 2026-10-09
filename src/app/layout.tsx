
import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর | নিত্যপ্রয়োজনীয় পণ্যের বাজারদর",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর জানুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn"
    data-theme="light">
      <body
        className={`${notoSerifBengali.className} min-h-screen flex flex-col antialiased`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer>
          {/* Footer component will be added later */}
        </footer>
      </body>
    </html>
  );
}
