import React from "react";
import { motion } from "motion/react";
import { Counter } from "../Counter";

interface ProfileSectionProps {
    professionalSummary: string;
    yearsExp: number;
    missionsCount: number;
    personalInfo: any;
    displayLocation: string;
}

export function ProfileSection({
    professionalSummary,
    yearsExp,
    missionsCount,
    personalInfo,
    displayLocation
}: ProfileSectionProps) {
    return (
        <section id="about" className="py-20 md:py-32 px-6 sm:px-8 md:px-20 border-b border-[var(--border)] relative bg-white/[0.01] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 0.03, x: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[30vw] md:text-[40vw] font-bold text-white leading-none -z-10 select-none"
                style={{ fontFamily: "var(--font-main, 'Bebas Neue', sans-serif)" }}
            >
                BIO
            </motion.div>

            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.8, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-[0.85rem] font-mono text-[var(--accent)] tracking-[0.6em] block mb-16 uppercase"
            >01 // PROFILE_CORE</motion.span>
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-20 items-start">
                <div className="lg:col-span-2">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] mb-8 md:mb-12 uppercase tracking-tighter"
                            style={{ fontFamily: "var(--font-main, 'Syne', sans-serif)", fontWeight: 800 }}
                        >
                            "Missions <br className="hidden md:block" /> with intent"
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="font-mono text-[0.95rem] md:text-[1.1rem] text-white/40 leading-loose uppercase tracking-wide max-w-3xl"
                    >
                        {professionalSummary || "No data synchronized."}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col gap-8 md:gap-12 border-t lg:border-t-0 lg:border-l border-white/5 pt-10 lg:pt-0 lg:pl-12"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex justify-between items-center"
                    >
                        <span className="text-[0.8rem] font-mono opacity-30 uppercase">FIELD_YEARS</span>
                        <span className="text-4xl md:text-5xl font-bold text-[var(--accent)]" style={{ fontFamily: "var(--font-main, 'Bebas Neue', sans-serif)" }}><Counter value={yearsExp} />+</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex justify-between items-center"
                    >
                        <span className="text-[0.8rem] font-mono opacity-30 uppercase">LOG_ENTRIES</span>
                        <span className="text-4xl md:text-5xl font-bold text-[var(--accent)]" style={{ fontFamily: "var(--font-main, 'Bebas Neue', sans-serif)" }}><Counter value={missionsCount} />+</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="pt-10 border-t border-white/5 flex flex-col gap-6 font-mono text-[0.9rem] opacity-50 uppercase tracking-widest"
                    >
                        <div className="flex justify-between"><span>CELL:</span> <span className="text-white">{personalInfo?.phone}</span></div>
                        <div className="flex justify-between"><span>ZONE:</span> <span className="text-white">{displayLocation}</span></div>
                        <div className="flex justify-between items-center"><span className="shrink-0 mr-4">UPLINK:</span> <span className="text-white text-right overflow-hidden text-ellipsis whitespace-nowrap">{personalInfo?.email}</span></div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
