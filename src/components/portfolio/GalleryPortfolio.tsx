"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState, useRef, useContext } from "react";
import { ReadContext } from "@/app/GenComponents/ReadContext";
import { Lightbox, LightboxDataType } from "./Lightbox";
import { useExportHTML } from "@/hooks/useExportHTML";
import { Counter } from "./Counter";

export default function GalleryPortfolio() {
    const { AnlysedCV, isLoading } = useContext(ReadContext);
    const [activeSection, setActiveSection] = useState("hero");
    const [lightboxData, setLightboxData] = useState<LightboxDataType>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const displayName = AnlysedCV?.personalInfo?.fullName || "Name Unknown";
    const { handleExportHTML, isExporting } = useExportHTML(displayName);

    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-serif italic text-2xl opacity-20 bg-[var(--bg)] text-[var(--fg)]">
                GALLERY_LOADING...
            </div>
        );
    }

    const {
        personalInfo,
        professionalSummary,
        jobSearchTitle,
        experience = [],
        education = [],
        skills,
        tools = [],
        projects = [],
        certifications = [],
        publications = [],
        awards = [],
        volunteerExperience = [],
        onlinePresence = {} as any,
        image = []
    } = AnlysedCV;

    const userImage = image?.[0] || null;
    const displayTitle = jobSearchTitle || personalInfo?.title || experience?.[0]?.title || "Creative";
    const displayLocation = personalInfo?.location || personalInfo?.city || "Worldwide";

    const navItems = [
        { id: "hero", label: "Intro" },
        { id: "about", label: "Vision" },
        { id: "projects", label: "Work" },
        { id: "experience", label: "Journey" },
        { id: "skills", label: "Capabilities" },
        { id: "contact", label: "Uplink" }
    ].filter(item => {
        if (item.id === "projects") return projects.length > 0;
        if (item.id === "experience") return experience.length > 0;
        if (item.id === "skills") return (skills?.technical?.length || 0) > 0 || tools.length > 0;
        return true;
    });

    return (
        <div ref={containerRef} className="bg-[var(--bg)] text-[var(--fg)] font-['DM_Sans',sans-serif] selection:bg-[var(--accent)] selection:text-white transition-colors duration-500 overflow-x-hidden">

            {/* Export Overlay */}
            {isExporting && (
                <div data-export-exclude className="fixed inset-0 z-[1000] bg-[var(--bg)] flex items-center justify-center">
                    <div className="font-['Playfair_Display',serif] italic text-4xl animate-pulse">Designing Static Archive...</div>
                </div>
            )}

            {/* Vertical Progress */}
            <motion.div
                data-export-exclude
                className="fixed right-0 top-0 bottom-0 w-1 bg-[var(--accent)] z-[500] origin-top"
                style={{ scaleY }}
            />

            {/* Minimal Menu Overlay Indicator */}
            <div className="fixed top-12 right-12 z-[450] flex flex-col items-end gap-2" data-export-exclude>
                <div className="text-[0.6rem] uppercase tracking-[0.3em] font-bold opacity-30">{activeSection}</div>
            </div>

            {/* --- HERO SECTION --- */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
                {/* Immersive Background User Image */}
                {userImage && (
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.15 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <img src={userImage} alt="" className="w-full h-full object-cover filter grayscale" />
                    </motion.div>
                )}

                <div className="relative z-10 max-w-7xl w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center text-center"
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.5em] mb-12 opacity-40 border-b border-[var(--border)] pb-4">Archetype . Portfolio</span>
                        <h1 className="text-[clamp(4rem,12vw,12rem)] font-['Playfair_Display',serif] italic font-black leading-[0.85] tracking-tighter mb-12">
                            {displayName.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h1>
                        <p className="text-xl md:text-3xl font-light italic opacity-60 max-w-2xl mx-auto leading-relaxed">
                            {displayTitle} <span className="text-[var(--accent)]">—</span> {displayLocation}
                        </p>

                        <div className="mt-20">
                            <button
                                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-16 h-16 rounded-full border border-[var(--border)] flex items-center justify-center group hover:border-[var(--accent)] transition-all duration-700"
                            >
                                <svg className="w-6 h-6 transform group-hover:translate-y-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Export Button (Visual Template Style) */}
                <button
                    onClick={handleExportHTML}
                    className="absolute bottom-12 left-12 h-12 px-8 border border-[var(--border)] rounded-full text-[0.6rem] font-bold tracking-[0.3em] uppercase hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all z-20"
                >
                    Extract Archive
                </button>
            </section>

            {/* --- VISION / ABOUT --- */}
            <section id="about" className="py-48 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                className="text-5xl md:text-8xl font-['Playfair_Display',serif] font-bold leading-none mb-12"
                            >
                                The <br /><span className="italic text-[var(--accent)]">Vision.</span>
                            </motion.h2>
                            <div className="flex gap-20">
                                <div data-counter-value={experience.length > 5 ? experience.length : 5}>
                                    <div className="text-4xl font-bold mb-2"><Counter value={experience.length > 5 ? experience.length : 5} /></div>
                                    <div className="text-[0.6rem] font-bold uppercase tracking-widest opacity-30">Years Flow</div>
                                </div>
                                <div data-counter-value={projects.length}>
                                    <div className="text-4xl font-bold mb-2"><Counter value={projects.length} /></div>
                                    <div className="text-[0.6rem] font-bold uppercase tracking-widest opacity-30">Artifacts</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <p className="text-2xl md:text-4xl leading-relaxed italic text-[var(--fg)]/70">
                                {professionalSummary}
                            </p>
                            <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-[var(--accent)] opacity-20 hidden md:block" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- WORK / PROJECTS GRID --- */}
            {projects.length > 0 && (
                <section id="projects" className="py-24 md:py-48 bg-[var(--fg)] text-[var(--bg)]">
                    <div className="max-w-[1800px] mx-auto px-6">
                        <div className="mb-32 flex flex-col md:flex-row items-end justify-between gap-12 border-b border-[var(--bg)]/10 pb-20">
                            <h2 className="text-6xl md:text-[8rem] font-['Playfair_Display',serif] font-black tracking-tighter leading-none m-0">
                                Selected <br /><span className="italic opacity-30">Artifacts</span>
                            </h2>
                            <div className="max-w-xs text-sm font-light opacity-60 leading-relaxed uppercase tracking-[0.1em]">
                                A curated selection of technical accomplishments and design feats.
                            </div>
                        </div>

                        <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
                            {projects.map((proj: any, i: number) => {
                                const isWide = i % 3 === 0;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className={isWide ? "md:col-span-8" : "md:col-span-4"}
                                        onClick={() => proj.images?.length > 0 && setLightboxData({ images: proj.images, index: 0 })}
                                    >
                                        <div className="group cursor-pointer">
                                            <div className="relative overflow-hidden aspect-[4/5] md:aspect-video mb-8">
                                                {proj.images?.[0] ? (
                                                    <img
                                                        src={proj.images[0]}
                                                        alt={proj.title}
                                                        className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-[var(--bg)] opacity-5 flex items-center justify-center uppercase tracking-widest font-bold">Concept_Image</div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.5em] text-white bg-[var(--accent)] px-6 py-2">View Detail</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="text-[0.65rem] font-bold uppercase tracking-widest mb-2 opacity-30">Project_0{i + 1}</div>
                                                    <h3 className="text-3xl font-bold font-['Playfair_Display',serif] italic mb-4">{proj.title}</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(proj.technologiesUsed || proj.technologies || []).map((t: string) => (
                                                            <span key={t} className="text-[0.6rem] font-bold uppercase tracking-widest opacity-40">{t}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <svg className="w-8 h-8 opacity-10 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* --- JOURNEY / EXPERIENCE --- */}
            {experience.length > 0 && (
                <section id="experience" className="py-48 px-6 bg-[var(--bg)]">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-32">
                            <h2 className="text-sm font-bold uppercase tracking-[0.5em] opacity-40 mb-4 text-[var(--accent)]">Professional Path</h2>
                            <div className="text-5xl md:text-7xl font-['Playfair_Display',serif] font-bold">Work History</div>
                        </div>

                        <div className="space-y-32">
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="group grid lg:grid-cols-[1fr_2fr] gap-12">
                                    <div className="text-2xl font-serif italic opacity-30">
                                        {exp.startDate} — {exp.endDate || "Present"}
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-bold mb-4">{exp.title}</h3>
                                        <div className="text-xl opacity-60 italic mb-8 border-l border-[var(--accent)] pl-6">{exp.company} // {exp.location}</div>
                                        <p className="text-lg font-light leading-relaxed opacity-50 max-w-2xl">
                                            {exp.responsibilities?.[0]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- CAPABILITIES / SKILLS --- */}
            {((skills?.technical?.length || 0) > 0 || tools.length > 0) && (
                <section id="skills" className="py-48 px-6 bg-[var(--border)]/5">
                    <div className="max-w-7xl mx-auto flex flex-col items-center">
                        <div className="mb-32 text-center max-w-2xl">
                            <h2 className="text-6xl font-['Playfair_Display',serif] font-bold mb-12">Expertise.</h2>
                            <p className="text-lg opacity-40 italic">A synthesis of technical precision and creative execution across multiple disciplines.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-px bg-[var(--border)] w-full max-w-5xl">
                            {skills?.technical?.length > 0 && (
                                <div className="bg-[var(--bg)] p-16">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.5em] mb-12 text-[var(--accent)]">Core Tech</h3>
                                    <div className="flex flex-col gap-6">
                                        {skills.technical.map((s: string) => (
                                            <div key={s} className="text-2xl font-['Playfair_Display',serif] italic opacity-60 hover:opacity-100 hover:translate-x-2 transition-all cursor-default">{s}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {tools.length > 0 && (
                                <div className="bg-[var(--bg)] p-16">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.5em] mb-12 text-[var(--accent)]">Studio / Stack</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {tools.map((t: string) => (
                                            <span key={t} className="px-5 py-2 border border-[var(--border)] text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* --- UPLINK / CONTACT --- */}
            <section id="contact" className="py-64 px-6 text-center bg-[var(--fg)] text-[var(--bg)]">
                <div className="max-w-7xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-[0.8em] opacity-30 mb-20 block">Connection Established</span>
                    <h2 className="text-5xl md:text-[10rem] font-['Playfair_Display',serif] leading-none tracking-tighter mb-24 uppercase">
                        Let's <br /><span className="italic opacity-20">Collaborate.</span>
                    </h2>

                    <div className="flex flex-col items-center gap-12">
                        <button
                            onClick={() => personalInfo?.email && (window.location.href = `mailto:${personalInfo.email}`)}
                            className="text-2xl md:text-5xl font-['Playfair_Display',serif] italic border-b-2 border-[var(--bg)]/10 hover:border-[var(--accent)] transition-all pb-4"
                        >
                            {personalInfo?.email}
                        </button>

                        <div className="flex gap-12 text-[0.6rem] font-bold uppercase tracking-[0.4em] opacity-40">
                            {personalInfo?.linkedin && <a href={personalInfo.linkedin} target="_blank" className="hover:text-[var(--accent)] transition-all">Linkedin</a>}
                            {personalInfo?.github && <a href={personalInfo.github} target="_blank" className="hover:text-[var(--accent)] transition-all">Github</a>}
                        </div>
                    </div>

                    <div className="mt-64 opacity-20 text-[0.5rem] tracking-[0.5em] uppercase">
                        Produced by {displayName} // Site Archive v1.0 // Site Ref: {Math.random().toString(36).substring(7).toUpperCase()}
                    </div>
                </div>
            </section>

            <Lightbox lightboxData={lightboxData} setLightboxData={setLightboxData} />

            {/* Sticky Template Indicator for Nav */}
            <nav className="fixed left-12 bottom-0 top-0 w-px bg-[var(--border)] z-[200] hidden xl:block" data-export-exclude>
                <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-12 -left-3">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                            className={`w-6 h-6 border rotate-45 flex items-center justify-center transition-all ${activeSection === item.id ? 'bg-[var(--accent)] border-[var(--accent)]' : 'bg-[var(--bg)] border-[var(--border)] hover:border-[var(--fg)]'}`}
                        >
                            <span className="text-[0.4rem] -rotate-45 font-bold uppercase tracking-tighter">
                                {item.label.substring(0, 3)}
                            </span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}
