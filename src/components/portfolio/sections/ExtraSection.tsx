import React from "react";
import { motion } from "motion/react";

interface ExtraSectionProps {
    certifications: any[];
    publications: any[];
    awards: any[];
    volunteerExperience: any[];
    hobbies: string[];
}

export function ExtraSection({
    certifications,
    publications,
    awards,
    volunteerExperience,
    hobbies
}: ExtraSectionProps) {
    if (!(certifications.length > 0 || publications.length > 0 || awards.length > 0 || volunteerExperience.length > 0 || hobbies.length > 0)) {
        return null;
    }

    return (
        <section id="extra" className="py-20 md:py-32 px-6 sm:px-8 md:px-20 border-b border-[var(--border)] bg-black/20">
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.8, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[0.85rem] font-mono text-[var(--accent)] tracking-[0.6em] block mb-16 uppercase"
            >06 // SUPPLEMENTAL_INTEL</motion.span>
            <div className="flex flex-col gap-16 md:gap-24">

                {/* CERTIFICATIONS */}
                {certifications.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[0.85rem] font-mono text-white/20 tracking-[0.4em] block mb-10 uppercase">CERTIFICATIONS</span>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {certifications.map((c: any, i: number) => (
                                <div key={i} className="border-l border-white/5 pl-8 py-2">
                                    <h4 className="text-2xl font-bold uppercase tracking-tight leading-tight" style={{ fontFamily: "var(--font-main, 'Syne', sans-serif)" }}>{c.name}</h4>
                                    <p className="font-mono text-[0.85rem] text-white/30 uppercase mt-4">{c.issuer} // {c.year}</p>
                                    {c.expiryDate && <p className="font-mono text-[0.75rem] text-white/20 uppercase mt-1">EXPIRES: {c.expiryDate}</p>}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* PUBLICATIONS */}
                {publications.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[0.85rem] font-mono text-white/20 tracking-[0.4em] block mb-10 uppercase">PUBLICATIONS</span>
                        <div className="flex flex-col gap-10">
                            {publications.map((pub: any, i: number) => (
                                <div key={i} className="border-l-2 border-[var(--accent)]/20 pl-8 py-2 group hover:border-[var(--accent)] transition-colors">
                                    <div className="flex items-baseline justify-between gap-6 flex-wrap">
                                        <h4 className="text-xl font-bold uppercase tracking-tight leading-tight" style={{ fontFamily: "var(--font-main, 'Syne', sans-serif)" }}>{pub.title}</h4>
                                        <span className="font-mono text-[0.8rem] text-[var(--accent)] uppercase shrink-0">{pub.year || pub.date}</span>
                                    </div>
                                    <p className="font-mono text-[0.85rem] text-white/30 uppercase mt-2">{pub.publicationType}{pub.publisher ? ` // ${pub.publisher}` : ''}</p>
                                    {pub.description && <p className="font-mono text-[0.8rem] text-white/40 mt-3 leading-relaxed">{pub.description}</p>}
                                    {pub.link && (
                                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 font-mono text-[0.8rem] text-[var(--accent)]/50 hover:text-[var(--accent)] uppercase tracking-widest transition-colors">
                                            [ ACCESS_DOCUMENT ]
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* AWARDS + VOLUNTEER */}
                {(awards.length > 0 || volunteerExperience.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="grid md:grid-cols-2 gap-16"
                    >
                        {awards.length > 0 && (
                            <div>
                                <span className="text-[0.85rem] font-mono text-white/20 tracking-[0.4em] block mb-8 uppercase">AWARDS</span>
                                {awards.map((a: any, i: number) => (
                                    <div key={i} className="mb-8 border-l border-white/5 pl-6">
                                        <div className="text-[0.9rem] font-bold text-white uppercase">{a.name || a.title}</div>
                                        <div className="font-mono text-[0.8rem] text-[var(--accent)] uppercase mt-1">{a.year || a.date}</div>
                                        {a.issuer && <div className="font-mono text-[0.8rem] text-white/30 uppercase mt-1">{a.issuer}</div>}
                                        {a.description && <div className="font-mono text-[0.8rem] text-white/40 mt-2 leading-relaxed">{a.description}</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                        {volunteerExperience.length > 0 && (
                            <div>
                                <span className="text-[0.85rem] font-mono text-white/20 tracking-[0.4em] block mb-8 uppercase">VOLUNTEER</span>
                                {volunteerExperience.map((v: any, i: number) => (
                                    <div key={i} className="mb-8 border-l border-white/5 pl-6">
                                        <div className="text-[0.9rem] font-bold text-white uppercase">{v.role}</div>
                                        <div className="font-mono text-[0.85rem] text-white/30 uppercase mt-1">{v.organization}</div>
                                        <div className="font-mono text-[0.75rem] text-[var(--accent)]/50 uppercase mt-1">{v.startDate} — {v.endDate}</div>
                                        {v.description && <div className="font-mono text-[0.8rem] text-white/40 mt-2 leading-relaxed">{v.description}</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* HOBBIES */}
                {hobbies.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[0.85rem] font-mono text-white/20 tracking-[0.4em] block mb-10 uppercase">HOBBIES</span>
                        <div className="flex flex-wrap gap-4 font-mono text-[0.95rem] text-white/40 uppercase tracking-widest">
                            {hobbies.map((h: string) => (
                                <span key={h} className="border border-white/5 px-4 py-2 hover:border-[var(--accent)]/30 hover:text-white/70 transition-all before:content-['>'] before:mr-2 before:text-[var(--accent)]">{h}</span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
