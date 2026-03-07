import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SideBar from "../../components/SideBar/SideBar";

const myFont = localFont({
  src: "./Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio - Joaquin Stechina",
  description: "Full-Stack Developer — React, Next.js, Java, Spring Boot",
  openGraph: {
    title: "Joaquin Stechina — Portfolio",
    description: "Full-Stack Developer — React, Next.js, Java, Spring Boot",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} antialiased`}>
        <SideBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
