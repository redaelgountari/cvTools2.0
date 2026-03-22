import React from "react";
import { motion } from "motion/react";

interface EducationSectionProps {
    education: any[];
}

export function EducationSection({ education }: EducationSectionProps) {
    if (!education || education.length === 0) return null;

    return (
        <section id="education" className="py-20 md:py-32 px-6 sm:px-8 md:px-20 border-b border-[var(--border)] bg-white/[0.01]">
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.8, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[0.85rem] font-mono text-[var(--accent)] tracking-[0.6em] block mb-16 uppercase"
            >03 // ACADEMIC_OVERLAY</motion.span>
            <div className="grid md:grid-cols-2 gap-20">
                {education.map((edu: any, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" }}
                        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-5 group"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.15 + 0.4 }}
                            className="flex justify-between items-center group-hover:opacity-100 transition-opacity"
                        >
                            <span className="font-mono text-[0.85rem] tracking-widest uppercase">{edu.graduationYear} // {edu.location}</span>
                            <span className="text-[0.85rem] font-mono text-[var(--accent)]">DEGR_VAL_0{i + 1}</span>
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-none" style={{ fontFamily: "var(--font-main, 'Syne', sans-serif)" }}>{edu.degree}</h3>
                        <p className="font-mono text-[0.9rem] md:text-[1rem] uppercase tracking-widest text-white/60">{edu.institution}</p>
                        {edu.relevantCourses?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
                                className="mt-6 flex flex-wrap gap-3 opacity-40 group-hover:opacity-80 transition-opacity"
                            >
                                {edu.relevantCourses.map((c: string, ci: number) => (
                                    <motion.span
                                        key={ci}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.15 + ci * 0.05 + 0.6 }}
                                        className="text-[0.85rem] font-mono border border-white/10 px-3 py-1 uppercase"
                                    >{c}</motion.span>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
