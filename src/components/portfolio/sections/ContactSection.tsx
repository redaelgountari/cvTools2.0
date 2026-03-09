import React from "react";
import { motion } from "motion/react";

interface ContactSectionProps {
    personalInfo: any;
    onlinePresence: Record<string, string>;
    displayName: string;
}

export function ContactSection({ personalInfo, onlinePresence, displayName }: ContactSectionProps) {
    return (
        <section id="contact" className="min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center px-6 sm:px-8 md:px-20 py-24 md:py-32 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center text-[20vw] md:text-[30vw] font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                END_LOG
            </div>

            <motion.span
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                whileInView={{ opacity: 0.6, letterSpacing: "1em" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-[0.85rem] font-mono text-[var(--accent)] mb-12 uppercase relative z-10 block"
            >UPLINK_ESTABLISHED</motion.span>

            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-[clamp(2.5rem,10vw,10rem)] font-bold leading-[0.8] text-white mb-16 md:mb-20 tracking-tighter uppercase relative z-10"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
                <div className="overflow-hidden">
                    <motion.div
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    >READY FOR</motion.div>
                </div>
                <div className="overflow-hidden">
                    <motion.div
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                        className="text-transparent"
                        style={{ WebkitTextStroke: '2px white' }}
                    >CO-OPERATION</motion.div>
                </div>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05, borderColor: '#ff3c00', color: '#ff3c00' }}
                className="px-12 py-5 border border-white/10 font-mono text-[1rem] uppercase tracking-[0.5em] transition-all bg-black/40 backdrop-blur-sm relative z-10 cursor-none"
                onClick={() => personalInfo?.email && (window.location.href = `mailto:${personalInfo.email}`)}
            >
                [ SEND_ENCRYPTED_MESSAGE ]
            </motion.button>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 font-mono text-[0.8rem] md:text-[0.85rem] opacity-30 mt-16 md:mt-24 uppercase tracking-[0.1em] relative z-10">
                {personalInfo?.email && <a href={`mailto:${personalInfo.email}`} className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1">EMAIL</a>}
                {personalInfo?.phone && <a href={`tel:${personalInfo.phone}`} className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1">PHONE</a>}
                {personalInfo?.linkedin && <a href={personalInfo.linkedin} target="_blank" className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1">LINKEDIN</a>}
                {personalInfo?.github && <a href={personalInfo.github} target="_blank" className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1">GITHUB</a>}
                {personalInfo?.website && <a href={personalInfo.website} target="_blank" className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1">WEBSITE</a>}
                {personalInfo?.portfolio && <a href={personalInfo.portfolio} target="_blank" className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1">PORTFOLIO</a>}
                {onlinePresence?.twitter && <a href={onlinePresence.twitter} target="_blank" className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1">TWITTER</a>}
                {onlinePresence?.stackOverflow && <a href={onlinePresence.stackOverflow} target="_blank" className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1">STACK_OVERFLOW</a>}
                {onlinePresence?.medium && <a href={onlinePresence.medium} target="_blank" className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1">MEDIUM</a>}
            </div>

            <div className="font-mono text-[0.75rem] opacity-10 tracking-[0.4em] mt-32 uppercase relative z-10">
                © {new Date().getFullYear()} {displayName}_ SYS_VER_5.0 // MISSION_SUCCESS
            </div>
        </section>
    );
}
