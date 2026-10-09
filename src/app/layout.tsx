
import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

// Bengali font
const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর | নিত্যপ্রয়োজনীয় পণ্যের বাজারদর",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজার তুলনা এবং মূল্য পরিবর্তনের তথ্য দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${notoSerifBengali.className} min-h-screen bg-[#F0F5F0] antialiased`}
      >
        {/* Navbar with category links and price ticker */}
        <Navbar />

        {/* Page content */}
        {children}

        {/* React Toastify notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
