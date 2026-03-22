import React from "react";
import { motion } from "motion/react";

interface ExperienceSectionProps {
    experience: any[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
    if (!experience || experience.length === 0) return null;

    return (
        <section id="experience" className="py-20 md:py-32 px-6 sm:px-8 md:px-20 border-b border-[var(--border)] overflow-hidden relative">
            <motion.div
                whileInView={{ x: [100, 0], opacity: [0, 0.03] }}
                className="absolute -right-20 top-20 text-[25vw] md:text-[35vw] font-bold text-white leading-none -z-10 select-none"
                style={{ fontFamily: "var(--font-main, 'Bebas Neue', sans-serif)" }}
            >
                EXP
            </motion.div>
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.8, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-[0.85rem] font-mono text-[var(--accent)] tracking-[0.6em] block mb-12 md:mb-16 uppercase"
            >02 // FIELD_LOGS</motion.span>
            <div className="flex flex-col gap-16 md:gap-24">
                {experience.map((exp: any, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.01, x: 10 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative p-8 -mx-8 hover:bg-white/[0.03] rounded-lg transition-colors border border-transparent hover:border-white/5"
                    >
                        {/* Scanning line effect on hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                        />
                        {/* Accent bar that grows in on scroll */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.12 + 0.3, ease: "easeOut" }}
                            className="absolute -left-8 md:-left-20 top-8 h-[1px] w-16 bg-[var(--accent)]/40 origin-left"
                        />
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-10">
                            <div>
                                <div className="overflow-hidden">
                                    <motion.h3
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-2 leading-none"
                                        style={{ fontFamily: "var(--font-main, 'Syne', sans-serif)" }}
                                    >{exp.company}</motion.h3>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.12 + 0.25 }}
                                    className="text-[var(--accent)] font-mono text-[0.9rem] tracking-[0.3em] uppercase"
                                >{exp.title} // {exp.location}</motion.div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.3 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.12 + 0.35 }}
                                className="font-mono text-[0.85rem] uppercase tracking-[0.2em]"
                            >{exp.startDate} — {exp.endDate || "PRESENT"}</motion.div>
                        </div>

                        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
                            <div className="hidden lg:block text-[10vw] font-bold text-white/[0.02] -mt-16" style={{ fontFamily: "var(--font-main, 'Bebas Neue', sans-serif)" }}>0{i + 1}</div>
                            <div className="flex flex-col gap-6">
                                <ul className="flex flex-col gap-5 border-l border-white/5 pl-10">
                                    {exp.responsibilities?.map((res: string, ri: number) => (
                                        <motion.li
                                            key={ri}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.45, delay: i * 0.12 + ri * 0.07 + 0.4 }}
                                            className="font-mono text-[1rem] text-white/40 leading-relaxed uppercase flex gap-5"
                                        >
                                            <span className="text-[var(--accent)] shrink-0 opacity-50">/</span> {res}
                                        </motion.li>
                                    ))}
                                </ul>
                                {(exp.achievements?.length ?? 0) > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.12 + 0.7 }}
                                        className="mt-6 flex flex-col gap-3 pl-10"
                                    >
                                        <span className="text-[0.85rem] font-mono text-green-500/40 uppercase mb-2">ACHIEVEMENT_UNLOCKED</span>
                                        {exp.achievements?.map((ach: string, ai: number) => (
                                            <p key={ai} className="font-mono text-[0.9rem] text-white/60 lowercase italic opacity-80">"{ach}"</p>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
