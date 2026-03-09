import React from "react";
import { motion } from "motion/react";

interface HeroSectionProps {
    displayName: string;
    displayTitle: string;
    displayLocation: string;
    personalInfo: any;
    userImage: string | null;
    handleExportHTML: () => Promise<void>;
}

export function HeroSection({
    displayName,
    displayTitle,
    displayLocation,
    personalInfo,
    userImage,
    handleExportHTML
}: HeroSectionProps) {
    return (
        <section id="hero" className="min-h-screen md:min-h-[90vh] flex flex-col justify-center px-6 sm:px-8 md:px-20 relative border-b border-[var(--border)] overflow-hidden pt-20 md:pt-0">
            <div className="relative md:absolute md:top-10 md:left-10 flex flex-col md:flex-row md:items-center gap-6 z-[100] mb-12 md:mb-0">
                <div className="text-[0.85rem] font-mono tracking-[0.5em] opacity-40 uppercase">
                    {displayName} // {personalInfo?.email}
                </div>
                <button
                    data-export-button
                    onClick={handleExportHTML}
                    className="group flex items-center justify-center md:justify-start w-full md:w-auto gap-4 px-4 py-3 md:py-2 border border-white/5 bg-white/[0.02] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-500 font-mono text-[0.8rem] tracking-[0.3em] uppercase"
                >
                    <div className="w-1.5 h-1.5 bg-[var(--accent)] group-hover:bg-white rotate-45 transition-colors" />
                    [ EXPORT_UPLINK ]
                </button>
            </div>

            <div className="relative z-10 w-full flex flex-col-reverse lg:flex-row lg:items-center gap-12 lg:gap-32">
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="overflow-hidden"
                        data-anim="text-slide"
                    >
                        <motion.h1
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(3.5rem,12vw,12rem)] font-bold leading-[0.8] tracking-tighter uppercase"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            {displayName.split(" ")[0]}
                        </motion.h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="overflow-hidden"
                        data-anim="text-slide"
                        data-delay="0.1"
                    >
                        <motion.h1
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-[clamp(3rem,12vw,12rem)] font-bold leading-[0.8] tracking-tighter text-[var(--accent)] mt-2 md:mt-[-0.5vw] md:ml-[3vw] uppercase"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            {displayName.split(" ").slice(1).join(" ") || "ENGINEER"}
                        </motion.h1>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-10 max-w-[500px] font-mono text-[0.9rem] md:text-[1rem] text-white/40 leading-relaxed uppercase tracking-widest"
                    >
                        {displayTitle}. <br /> BASED IN {displayLocation}. <br /> READY_FOR_DEPLOYMENT.
                    </motion.div>
                </div>

                {userImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="relative w-[85vw] max-w-[320px] h-[400px] sm:max-w-[380px] h-[500px] lg:max-w-[450px] lg:h-[600px] shrink-0 border border-white/5 opacity-80 hover:opacity-100 transition-opacity self-center lg:self-auto"
                    >
                        <img
                            src={userImage}
                            alt={displayName}
                            className="w-full h-full object-cover grayscale contrast-125 brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 border-[10px] md:border-[20px] border-[#080808] pointer-events-none" />
                        <motion.div
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[1px] bg-[var(--accent)]/30 z-20 pointer-events-none shadow-[0_0_10px_rgba(255,60,0,0.5)]"
                        />
                        <div className="absolute -bottom-4 md:-bottom-4 -left-4 font-mono text-[0.7rem] bg-[var(--accent)] text-white px-4 py-1.5 uppercase tracking-widest z-30">
                            UNIT_PORTRAIT_01
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
