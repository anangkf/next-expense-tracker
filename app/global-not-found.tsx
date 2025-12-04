// Import global styles and fonts
import NotFound from "@/components/layout/not-found";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex items-center justify-center h-screen w-screen">
        <NotFound />
      </body>
    </html>
  );
}
