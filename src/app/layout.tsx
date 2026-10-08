import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import "./globals.css";

const font = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="light">
      <body className={`${font.className} min-h-screen flex flex-col`}>
        <Navbar />
        <Ticker />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}