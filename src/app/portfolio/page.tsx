"use client";

import { useState } from "react";
import MagazinePortfolio from "@/components/portfolio/MagazinePortfolio";
import CleanPortfolio from "@/components/portfolio/CleanPortfolio";
import GalleryPortfolio from "@/components/portfolio/GalleryPortfolio";
import CustomCursor from "@/components/portfolio/CustomCursor";
import ReadContextProvider from "@/app/GenComponents/ReadContextProvider";
import { ThemeSetup } from "@/components/portfolio/ThemeSetup";
import { CustomizationProvider } from "@/components/portfolio/CustomizationContext";
import { PortfolioCustomizer } from "@/components/portfolio/PortfolioCustomizer";

export default function PortfolioPage() {
  const [activeTemplate, setActiveTemplate] = useState<"editorial" | "clean" | "gallery">("editorial");

  return (
    <ReadContextProvider>
      <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--accent)] selection:text-white transition-colors duration-700">
        <ThemeSetup />

        <CustomCursor />

        {/* Top Border Line */}
        <div className="fixed top-0 left-0 w-full h-[1px] bg-[var(--border)] z-[100]" />

        {/* Floating Theme Toggle Button */}
        <button
          id="theme-toggle"
          className="fixed bottom-6 right-6 xl:bottom-12 xl:right-12 z-[300] w-12 h-12 flex items-center justify-center bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500 rounded-full group shadow-lg"
          aria-label="Toggle Theme"
        >
          <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
            <svg id="icon-sun" className="absolute w-5 h-5 text-white group-hover:text-[var(--accent)] transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg id="icon-moon" className="absolute w-5 h-5 text-current group-hover:text-[var(--accent)] transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
        </button>

        {/* Template Selector */}
        <div className="fixed bottom-6 left-6 xl:bottom-12 xl:left-12 z-[300] flex bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--border)] p-1.5 rounded-full shadow-lg">
          {[
            { id: "editorial", label: "Editorial" },
            { id: "clean", label: "Clean" },
            { id: "gallery", label: "Gallery" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id as any)}
              className={`px-4 py-1.5 rounded-full text-[0.8rem] font-mono tracking-widest transition-all duration-500 ${activeTemplate === t.id ? 'bg-[var(--accent)] text-white shadow-sm' : 'hover:bg-white/[0.05] text-[var(--fg)] opacity-50 hover:opacity-100'}`}
            >
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>

        {activeTemplate === "editorial" && (
          <CustomizationProvider
            disableThemeMode={true}
            initialLightVars={{
              '--bg': '#f4f2ee',
              '--fg': '#1a1a1a',
              '--accent': '#d93800',
              '--border': 'rgba(26,26,26,0.15)'
            }}
          >
            <MagazinePortfolio />
            <PortfolioCustomizer />
          </CustomizationProvider>
        )}
        {activeTemplate === "clean" && <CleanPortfolio />}
        {activeTemplate === "gallery" && <GalleryPortfolio />}
      </main>
    </ReadContextProvider>
  );
}
