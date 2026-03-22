"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState, useRef, useContext } from "react";
import { ReadContext } from "@/app/GenComponents/ReadContext";
import { Lightbox, LightboxDataType } from "./Lightbox";
import { useExportHTML } from "@/hooks/useExportHTML";
import { Counter } from "./Counter";

export default function CleanPortfolio() {
    const { AnlysedCV, isLoading } = useContext(ReadContext);
    const [activeSection, setActiveSection] = useState("hero");
    const [lightboxData, setLightboxData] = useState<LightboxDataType>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const displayName = AnlysedCV?.personalInfo?.fullName || "Name Unknown";
    const { handleExportHTML, isExporting } = useExportHTML(displayName);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
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
        }, { threshold: 0.2 });

        document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-sans text-sm tracking-widest opacity-30 bg-[var(--bg)] text-[var(--fg)]">
                CLEAN_LOADING...
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
        hobbies = [],
        onlinePresence = {} as any,
        image = []
    } = AnlysedCV;

    const userImage = image?.[0] || null;
    const displayTitle = jobSearchTitle || personalInfo?.title || experience?.[0]?.title || "Professional";
    const displayLocation = personalInfo?.location || personalInfo?.city || "Remote";

    const navItems = [
        { id: "hero", label: "Intro" },
        { id: "about", label: "Profile" },
        { id: "experience", label: "Work" },
        { id: "education", label: "Education" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
        { id: "contact", label: "Contact" }
    ].filter(item => {
        if (item.id === "experience") return experience.length > 0;
        if (item.id === "education") return education.length > 0;
        if (item.id === "skills") return (skills?.technical?.length || 0) > 0 || tools.length > 0;
        if (item.id === "projects") return projects.length > 0;
        return true;
    });

    return (
        <div ref={containerRef} className="bg-[var(--bg)] text-[var(--fg)] font-['Inter',sans-serif] selection:bg-[var(--accent)] selection:text-white transition-colors duration-500">
            {/* Export Overlay */}
            {isExporting && (
                <div data-export-exclude className="fixed inset-0 z-[1000] bg-[var(--bg)]/95 backdrop-blur-md flex flex-col items-center justify-center">
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[var(--accent)] font-medium tracking-tight text-2xl"
                    >
                        Preparing Export...
                    </motion.div>
                </div>
            )}

            {/* Scroll Progress */}
            <motion.div
                data-export-exclude
                className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] z-[500] origin-left"
                style={{ scaleX }}
            />

            {/* Sticky Header */}
            <header className="fixed top-0 left-0 w-full z-[400] bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)] hidden md:block" data-export-exclude>
                <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
                    <div className="text-xl font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-tight">
                        {displayName}
                    </div>
                    <nav className="flex gap-8">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                                className={`text-[0.8rem] font-medium tracking-wide transition-all ${activeSection === item.id ? 'text-[var(--accent)]' : 'opacity-40 hover:opacity-100'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {/* --- HERO SECTION --- */}
            <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                <div className="max-w-4xl w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {userImage && (
                            <div className="mb-12 flex justify-center">
                                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border-4 border-[var(--border)]">
                                    <img src={userImage} alt={displayName} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                        <h1 className="text-[clamp(3rem,8vw,8rem)] font-['Plus_Jakarta_Sans',sans-serif] font-extrabold leading-[1] tracking-tight mb-8">
                            {displayName}
                        </h1>
                        <p className="text-xl md:text-2xl opacity-40 font-light max-w-2xl mx-auto leading-relaxed">
                            {displayTitle} based in <span className="text-[var(--fg)] opacity-100 font-medium">{displayLocation}</span>.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={handleExportHTML}
                                className="px-10 py-4 bg-[var(--fg)] text-[var(--bg)] rounded-full text-sm font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-300 shadow-xl"
                            >
                                DOWNLOAD PORTFOLIO
                            </button>
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-4 border border-[var(--border)] rounded-full text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
                            >
                                GET IN TOUCH
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- PROFILE / ABOUT --- */}
            <section id="about" className="py-24 md:py-48 px-6 bg-[var(--border)]/10">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-20">
                    <div>
                        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-8">About Me</h2>
                        <div className="flex flex-col gap-10">
                            <div>
                                <div className="text-5xl font-['Plus_Jakarta_Sans',sans-serif] font-bold mb-2" data-counter-value={experience.length > 1 ? experience.length : 1}>
                                    <Counter value={experience.length > 1 ? experience.length : 1} />+
                                </div>
                                <div className="text-xs uppercase tracking-widest opacity-40">Years Excellence</div>
                            </div>
                            <div>
                                <div className="text-5xl font-['Plus_Jakarta_Sans',sans-serif] font-bold mb-2" data-counter-value={projects.length}>
                                    <Counter value={projects.length} />
                                </div>
                                <div className="text-xs uppercase tracking-widest opacity-40">Active Projects</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl md:text-3xl leading-relaxed font-light text-[var(--fg)]/80">
                            {professionalSummary}
                        </p>
                    </div>
                </div>
            </section>

            {/* --- EXPERIENCE --- */}
            {experience.length > 0 && (
                <section id="experience" className="py-24 md:py-48 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-24 flex items-end justify-between border-b border-[var(--border)] pb-12">
                            <h2 className="text-4xl md:text-6xl font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-tight">Professional Journey</h2>
                            <span className="text-xs font-mono opacity-30">CURATED_WORK_HISTORY</span>
                        </div>

                        <div className="flex flex-col">
                            {experience.map((exp: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="py-16 grid lg:grid-cols-[1fr_3fr] gap-12 border-b border-[var(--border)] last:border-0 group"
                                >
                                    <div className="opacity-40 text-sm font-medium pt-2">
                                        {exp.startDate} — {exp.endDate || "Present"}
                                    </div>
                                    <div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                            <div>
                                                <h3 className="text-3xl font-bold group-hover:text-[var(--accent)] transition-colors">{exp.title}</h3>
                                                <div className="text-lg opacity-60 mt-1">{exp.company} // {exp.location}</div>
                                            </div>
                                        </div>
                                        <ul className="space-y-4 max-w-3xl">
                                            {exp.responsibilities?.map((res: string, ri: number) => (
                                                <li key={ri} className="flex gap-4 text-lg leading-relaxed opacity-60">
                                                    <span className="text-[var(--accent)] mt-1.5">•</span>
                                                    {res}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- PROJECTS --- */}
            {projects.length > 0 && (
                <section id="projects" className="py-24 md:py-48 px-6 bg-[var(--fg)] text-[var(--bg)]">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[var(--bg)]/10 pb-12">
                            <h2 className="text-4xl md:text-6xl font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-tight text-[var(--bg)]">Selected Craft</h2>
                            <p className="max-w-md opacity-60 text-lg">A showcase of passion projects and professional engineering feats.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-px bg-[var(--bg)]/5">
                            {projects.map((proj: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    onClick={() => proj.images?.length > 0 && setLightboxData({ images: proj.images, index: 0 })}
                                    className="bg-[var(--fg)] p-12 md:p-20 group cursor-pointer hover:bg-[var(--accent)] hover:text-white transition-all duration-700"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="mb-12">
                                            <div className="text-xs font-bold uppercase tracking-widest mb-6 opacity-40">0{i + 1} // Vision</div>
                                            <h3 className="text-4xl font-bold mb-6 tracking-tight">{proj.title}</h3>
                                            <p className="text-lg opacity-70 leading-relaxed mb-8">{proj.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(proj.technologiesUsed || proj.technologies || []).map((t: string) => (
                                                    <span key={t} className="text-[0.65rem] px-3 py-1 border border-current/20 rounded-full font-semibold">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-auto relative overflow-hidden aspect-video border border-black/5 group-hover:border-white/20">
                                            {proj.images?.[0] ? (
                                                <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                                            ) : (
                                                <div className="w-full h-full bg-black/5 flex items-center justify-center text-xs opacity-20">NO_PREVIEW</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- SKILLS --- */}
            {((skills?.technical?.length || 0) > 0 || tools.length > 0) && (
                <section id="skills" className="py-24 md:py-48 px-6">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-16 text-center">Core Competencies</h2>

                        <div className="grid sm:grid-cols-2 gap-20 md:gap-32">
                            {skills?.technical?.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold mb-10 pb-4 border-b border-[var(--border)]">Technical</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {skills.technical.map((s: string) => (
                                            <span key={s} className="text-lg opacity-60 hover:opacity-100 hover:text-[var(--accent)] cursor-default transition-all">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {tools.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold mb-10 pb-4 border-b border-[var(--border)]">Stack & Tools</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {tools.map((t: string) => (
                                            <span key={t} className="text-lg opacity-60 hover:opacity-100 hover:text-[var(--accent)] cursor-default transition-all">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* --- EDUCATION & EXTRA --- */}
            {(education.length > 0 || certifications.length > 0) && (
                <section id="education" className="py-24 md:py-48 px-6 bg-[var(--border)]/5">
                    <div className="max-width-7xl mx-auto max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-24">
                            {education.length > 0 && (
                                <div>
                                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 mb-12">Academic Foundations</h2>
                                    <div className="space-y-16">
                                        {education.map((edu: any, i: number) => (
                                            <div key={i} className="group">
                                                <div className="text-[var(--accent)] text-sm mb-4 font-bold">{edu.graduationYear}</div>
                                                <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                                                <div className="text-lg opacity-60">{edu.institution}</div>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {edu.relevantCourses?.map((c: string, ci: number) => (
                                                        <span key={ci} className="text-[0.6rem] px-2 py-1 bg-[var(--bg)] border border-[var(--border)] opacity-60 group-hover:opacity-100 transition-opacity uppercase">{c}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {certifications.length > 0 && (
                                <div>
                                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 mb-12">Certifications</h2>
                                    <div className="grid sm:grid-cols-2 gap-10">
                                        {certifications.map((cert: any, i: number) => (
                                            <div key={i}>
                                                <h4 className="text-lg font-bold mb-2">{cert.name}</h4>
                                                <div className="text-sm opacity-50">{cert.issuer} // {cert.year}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* --- CONTACT --- */}
            <section id="contact" className="py-48 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-8xl font-['Plus_Jakarta_Sans',sans-serif] font-extrabold tracking-tighter mb-12 leading-tight">
                            Available for <br /> new challenges.
                        </h2>
                        <button
                            onClick={() => personalInfo?.email && (window.location.href = `mailto:${personalInfo.email}`)}
                            className="text-2xl md:text-4xl font-light hover:text-[var(--accent)] transition-all flex items-center justify-center gap-6 mx-auto group"
                        >
                            {personalInfo?.email}
                            <div className="w-12 h-px bg-[var(--fg)] group-hover:bg-[var(--accent)] transition-all" />
                        </button>

                        <div className="mt-20 flex flex-wrap justify-center gap-10 text-xs font-bold tracking-[0.2em] opacity-40 uppercase">
                            {personalInfo?.linkedin && <a href={personalInfo.linkedin} target="_blank" className="hover:text-[var(--accent)] transition-colors">LinkedIn</a>}
                            {personalInfo?.github && <a href={personalInfo.github} target="_blank" className="hover:text-[var(--accent)] transition-colors">GitHub</a>}
                            {onlinePresence?.twitter && <a href={onlinePresence.twitter} target="_blank" className="hover:text-[var(--accent)] transition-colors">Twitter</a>}
                        </div>

                        <div className="mt-48 pt-12 border-t border-[var(--border)] text-[0.6rem] opacity-20 tracking-widest uppercase">
                            © {new Date().getFullYear()} {displayName} — Design Minimal v1.0
                        </div>
                    </motion.div>
                </div>
            </section>

            <Lightbox lightboxData={lightboxData} setLightboxData={setLightboxData} />
        </div>
    );
}
