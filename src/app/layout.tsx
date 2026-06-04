import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import RevealInit from "@/components/RevealInit";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zoe Ferguson — Front-End Developer & Designer",
  description:
    "I'm Zoe — a front-end developer who designs. I build fast, accessible web experiences in React, TypeScript and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hankenGrotesk.variable}`}
    >
      <body suppressHydrationWarning>
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
