import React from "react";
import { motion } from "motion/react";

interface SkillsSectionProps {
    skills: any;
    tools: string[];
}

export function SkillsSection({ skills, tools }: SkillsSectionProps) {
    if (!((skills?.technical?.length || 0) > 0 || tools?.length > 0 || (skills?.languages?.length || 0) > 0 || (skills?.soft?.length || 0) > 0)) {
        return null;
    }

    return (
        <section id="skills" className="py-20 md:py-32 px-6 sm:px-8 md:px-20 border-b border-[var(--border)] relative overflow-hidden bg-black/40">
            <motion.div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(var(--accent) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.8, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[0.85rem] font-mono text-[var(--accent)] tracking-[0.6em] block mb-16 uppercase relative z-10"
            >04 // INTEL_MATRIX</motion.span>

            <div className="grid md:grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05] relative z-10">
                {[
                    { cat: "TECHNICAL", s: skills?.technical || [] },
                    { cat: "TOOLS", s: tools || [] },
                    { cat: "LANGUAGES", s: skills?.languages || [] },
                    { cat: "SOFT_INTEL", s: skills?.soft || [] }
                ].filter(c => c.s.length > 0).map((col, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="bg-[#080808] p-12 group relative overflow-hidden"
                    >
                        {/* Background Number */}
                        <div className="absolute top-6 right-6 md:top-10 md:right-10 text-[12vw] md:text-[10vw] font-bold text-white/[0.02] leading-none pointer-events-none" style={{ fontFamily: "var(--font-main, 'Bebas Neue', sans-serif)" }}>
                            0{i + 1}
                        </div>

                        <motion.div
                            className="absolute left-0 top-0 w-1 h-full bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/100 transition-all duration-500"
                        />

                        <div className="flex items-center gap-4 mb-10 overflow-hidden">
                            <div className="w-1.5 h-1.5 bg-[var(--accent)] rotate-45 shrink-0" />
                            <motion.span
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                                className="text-[0.85rem] font-mono text-[var(--accent)] tracking-[0.5em] uppercase"
                            >
                                {col.cat}
                            </motion.span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {col.s.map((s: string, si: number) => (
                                <motion.div
                                    key={s}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 + si * 0.05 + 0.3 }}
                                    className="px-4 py-2 bg-white/[0.03] border border-white/5 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all cursor-none group/item"
                                >
                                    <span className="font-mono text-[0.95rem] text-white/40 group-hover/item:text-white transition-colors uppercase tracking-widest">{s}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Animated scan line per card on hover */}
                        <motion.div
                            className="absolute left-0 right-0 h-[1px] bg-[var(--accent)]/20 opacity-0 group-hover:opacity-100 pointer-events-none"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
