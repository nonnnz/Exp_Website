import type { Metadata } from "next";
import { Anton, Pacifico } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NavbarWrapper } from "@/components/NavbarWrapper";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-cursive" });

export const metadata: Metadata = {
  title: "Our Portfolio",
  description: "Showcasing our work and achievements — Beyond Limits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${anton.variable} ${pacifico.variable} antialiased bg-[#010828] text-[#EFF4FF]`}>
        <NavbarWrapper />
        <main>{children}</main>
      </body>
    </html>
  );
}
