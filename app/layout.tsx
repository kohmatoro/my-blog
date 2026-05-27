import React from "react";
import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Matoro blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}