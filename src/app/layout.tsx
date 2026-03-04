import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReadContextProvider from "./GenComponents/ReadContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Tools — AI-Powered Resume & Cover Letter Generator",
  description: "Upload your CV, generate tailored resumes and cover letters with AI, and export in multiple formats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReadContextProvider>
          {children}
        </ReadContextProvider>
      </body>
    </html>
  );
}
