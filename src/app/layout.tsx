import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UTKARSH 1.0 | State-Level BCA Hackathon | PESIAMS Shivamogga",
  description: "The debut edition of UTKARSH 1.0, a premier state-level college hackathon, organized by the Department of Computer Applications (BCA) at PES Institute of Advanced Management Studies (PESIAMS), Shivamogga. Join us to build, innovate, and win.",
  keywords: [
    "UTKARSH 1.0",
    "PESIAMS",
    "PES Shimoga",
    "BCA Hackathon",
    "State-Level Hackathon",
    "College Hackathon",
    "Karnataka Coding Competition",
    "PES Institute of Advanced Management Studies",
    "Department of Computer Applications",
    "Software Innovation",
    "Shivamogga Coding Arena"
  ],
  openGraph: {
    title: "UTKARSH 1.0 | State-Level BCA Hackathon | PESIAMS Shivamogga",
    description: "The debut edition of UTKARSH 1.0, Karnataka's premier state-level college hackathon organized by the PESIAMS Department of Computer Applications (BCA).",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-accent-violet selection:text-white">
        {children}
      </body>
    </html>
  );
}
