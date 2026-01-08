import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SideBar from "../../components/SideBar/SideBar";

const myFont = localFont({
  src: "./Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Portfolio - Joaquin Stechina",
  description: "Portfolio de Joaquin Stechina",
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
      </body>
    </html>
  );
}
