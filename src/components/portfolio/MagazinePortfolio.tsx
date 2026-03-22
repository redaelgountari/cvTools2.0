"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState, useRef, useContext } from "react";
import { ReadContext } from "@/app/GenComponents/ReadContext";
import { Lightbox, LightboxDataType } from "./Lightbox";
import { useExportHTML } from "@/hooks/useExportHTML";
import { useCustomization } from "./CustomizationContext";

// Sections
import { HeroSection } from "./sections/HeroSection";
import { ProfileSection } from "./sections/ProfileSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ExtraSection } from "./sections/ExtraSection";
import { ContactSection } from "./sections/ContactSection";

const sections = [
    { id: "hero", label: "00 MISSION" },
    { id: "about", label: "01 PROFILE" },
    { id: "experience", label: "02 LOGS" },
    { id: "education", label: "03 ACADEMY" },
    { id: "skills", label: "04 INTEL" },
    { id: "projects", label: "05 OPS" },
    { id: "extra", label: "06 DATA" },
    { id: "contact", label: "07 UPLINK" }
];

export default function MagazinePortfolio() {
    const { AnlysedCV, isLoading } = useContext(ReadContext);
    const [activeSection, setActiveSection] = useState("hero");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lightboxData, setLightboxData] = useState<LightboxDataType>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const displayName = AnlysedCV?.personalInfo?.fullName || "RECRUIT_NAME";
    const { handleExportHTML, isExporting } = useExportHTML(displayName);

    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const { visibility, themeVars } = useCustomization() || { visibility: {}, themeVars: {} };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll("section").forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-mono text-[0.8rem] uppercase tracking-[0.5em] opacity-50 bg-[#080808] text-white">
                SYNCHRONIZING_DATA_STREAM...
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

    const displayTitle = jobSearchTitle || personalInfo?.title || experience?.[0]?.title || "OPERATIVE";
    const displayLocation = personalInfo?.location || personalInfo?.city || "ZONE_STAGED";

    const calculateYears = () => {
        if (experience.length === 0) return 0;
        return experience.length > 1 ? experience.length : 1;
    };

    const yearsExp = calculateYears();
    const missionsCount = projects.length || experience.length;



    return (
        <div 
            ref={containerRef} 
            className="relative selection:bg-[#ff3c00] selection:text-white"
            style={{
                fontFamily: (themeVars as any)['--font-main'],
                '--radius': (themeVars as any)['--radius'],
                '--border-width': (themeVars as any)['--border-width']
            } as any}
        >

            {isExporting && (
                <div data-export-exclude className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center font-mono">
                    <motion.div
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[var(--accent)] text-xl tracking-[0.5em]"
                    >
                        GENERATING_STATIC_UPLINK...
                    </motion.div>
                    <div className="mt-4 text-white/40 text-[0.8rem] uppercase tracking-widest text-center">
                        ENCRYPTING_ASSETS // PACKING_STYLE_MANIFEST
                    </div>
                </div>
            )}

            {/* --- DATA STREAM PROGRESS --- */}
            <motion.div
                data-export-exclude
                className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] z-[200] origin-left"
                style={{ scaleX }}
            />
            <div data-export-exclude className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] font-mono text-[0.7rem] uppercase tracking-[1em] opacity-30 hidden md:block select-none pointer-events-none">
                UPLINK_STATUS: STABLE // SYNCING_DATA_STREAM
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="fixed top-6 right-6 z-[300] xl:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 bg-[#080808] border border-white/10 hover:border-[var(--accent)] transition-colors"
            >
                <div id="mobile-menu-line-1" className={`w-5 h-px bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <div id="mobile-menu-line-2" className={`w-5 h-px bg-[var(--accent)] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <div id="mobile-menu-line-3" className={`w-5 h-px bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>

            {/* MOBILE NAVIGATION POPUP */}
            <div
                id="mobile-menu-popup"
                className={`fixed top-24 right-6 z-[250] xl:hidden flex flex-col items-end gap-5 p-6 bg-[#080808]/95 border border-white/10 backdrop-blur-md shadow-2xl origin-top-right transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
            >
                {sections.map((s, i) => (
                    <button
                        key={s.id}
                        data-section={s.id}
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`group flex items-center gap-4 text-right transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                        style={{ transitionDelay: isMobileMenuOpen ? `${i * 0.05}s` : '0s' }}
                    >
                        <span className={`font-mono text-[0.85rem] tracking-[0.3em] uppercase transition-colors ${activeSection === s.id ? 'text-[var(--accent)]' : 'text-white/40 group-hover:text-white'}`}>
                            {s.label}
                        </span>
                        <div className={`w-1.5 h-1.5 rotate-45 transition-colors ${activeSection === s.id ? 'bg-[var(--accent)]' : 'bg-white/10 group-hover:bg-white'}`} />
                    </button>
                ))}
            </div>

            {/* SECTION NAV - REFINED SCALE (DESKTOP) */}
            <div id="desktop-sec-nav" className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col items-end gap-5 text-[0.7rem] font-mono tracking-widest">
                {sections.filter(s => (visibility as any)[s.id] !== false).map(s => (
                    <button
                        key={s.id}
                        data-section={s.id}
                        onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                        className="group flex items-center gap-3 transition-all duration-500"
                        style={{ writingMode: 'vertical-rl' }}
                    >
                        <span className={`rotate-180 transition-all duration-500 ${activeSection === s.id ? 'opacity-100 text-[var(--accent)] font-bold mb-2' : 'opacity-20 hover:opacity-100'}`}>
                            {s.label}
                        </span>
                        <div className={`w-[1px] bg-[#ff3c00] transition-all duration-700 ${activeSection === s.id ? 'h-8' : 'h-0 group-hover:h-2 opacity-30 shadow-[0_0_10px_var(--accent)]'}`} />
                    </button>
                ))}
            </div>

            {visibility.hero !== false && (
                <HeroSection
                    displayName={displayName}
                    displayTitle={displayTitle}
                    displayLocation={displayLocation}
                    personalInfo={personalInfo}
                    userImage={userImage}
                    handleExportHTML={handleExportHTML}
                />
            )}

            {visibility.about !== false && (
                <ProfileSection
                    professionalSummary={professionalSummary}
                    yearsExp={yearsExp}
                    missionsCount={missionsCount}
                    personalInfo={personalInfo}
                    displayLocation={displayLocation}
                />
            )}

            {visibility.experience !== false && (
                <ExperienceSection experience={experience} />
            )}

            {visibility.education !== false && (
                <EducationSection education={education} />
            )}

            {visibility.skills !== false && (
                <SkillsSection skills={skills} tools={tools} />
            )}

            {visibility.projects !== false && (
                <ProjectsSection projects={projects} setLightboxData={setLightboxData} />
            )}

            {visibility.additional !== false && (
                <ExtraSection
                    certifications={certifications}
                    publications={publications}
                    awards={awards}
                    volunteerExperience={volunteerExperience}
                    hobbies={hobbies}
                />
            )}

            {visibility.contact !== false && (
                <ContactSection
                    personalInfo={personalInfo}
                    onlinePresence={onlinePresence}
                    displayName={displayName}
                />
            )}

            <Lightbox lightboxData={lightboxData} setLightboxData={setLightboxData} />

            {/* Loading Overlay */}
            {isExporting && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[1000] bg-[#080808] flex flex-col items-center justify-center gap-8"
                >
                    <div className="relative w-48 h-1 bg-white/5 overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-[#ff3c00]"
                        />
                    </div>
                    <div className="font-mono text-[0.9rem] tracking-[0.5em] text-[#ff3c00] animate-pulse uppercase">
                        GENERATING_STATIC_UPLINK...
                    </div>
                </motion.div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}} />
        </div>
    );
}
