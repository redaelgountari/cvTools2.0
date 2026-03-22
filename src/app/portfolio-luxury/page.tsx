"use client";

import React, { useEffect, useState, useRef, useContext } from 'react';
import { ReadContext } from "@/app/GenComponents/ReadContext";
import ReadContextProvider from "@/app/GenComponents/ReadContextProvider";
import { Download, ExternalLink, Mail, Github, Linkedin, MapPin, Calendar, Globe, Award, Database, Layout, Code2, Sparkles, ChevronRight, ArrowDownRight, ArrowUpRight, Plus, Minus, DownloadCloud, FileDown, Sun, Moon } from 'lucide-react';
import { Lightbox, LightboxDataType } from '@/components/portfolio/Lightbox';
import { useExportHTML } from '@/hooks/useExportHTML';
import { ThemeSetup } from '@/components/portfolio/ThemeSetup';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomizationProvider, useCustomization } from '@/components/portfolio/CustomizationContext';
import { PortfolioCustomizer } from '@/components/portfolio/PortfolioCustomizer';
import { VisualEditor } from '@/components/portfolio/VisualEditor';

const ObsidianNoirPortfolio = () => {
    const { AnlysedCV, isLoading: loading } = useContext(ReadContext);
    const customizer = useCustomization();
    const { isDarkMode, dynamicStyles, visibility, contentOverrides, elementStyles } = customizer || { isDarkMode: true, dynamicStyles: '', visibility: {} as any, contentOverrides: {} as any, elementStyles: {} as any };
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [lightboxData, setLightboxData] = useState<LightboxDataType>(null);
    const { handleExportHTML, isExporting } = useExportHTML(AnlysedCV?.personalInfo?.fullName || "Portfolio");
    const [isUnveiled, setIsUnveiled] = useState(false);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => setIsUnveiled(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}`);

            const sections = ['hero', 'about', 'experience', 'expertise', 'projects', 'education', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 200 && rect.bottom >= 200;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            requestAnimationFrame(() => {
                const parallaxBgText = document.getElementById('parallax-bg-text');
                const heroComposition = document.getElementById('hero-composition');
                const cursorDot = document.getElementById('cursor-dot');

                if (parallaxBgText) {
                    parallaxBgText.style.transform = `translate(${mouseX / 100}px, ${mouseY / 100}px)`;
                }
                if (heroComposition) {
                    heroComposition.style.transform = `translate(${(mouseX - window.innerWidth / 2) / 60}px, ${(mouseY - window.innerHeight / 2) / 60}px)`;
                }
                if (cursorDot) {
                    cursorDot.style.left = `${mouseX}px`;
                    cursorDot.style.top = `${mouseY}px`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        // Intersection Observer for scroll reveals
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.05 });

        // Observe elements
        const elements = document.querySelectorAll('.reveal, .stagger-reveal, .project-card');
        elements.forEach(el => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
        };
    }, [loading, AnlysedCV]);

    if (loading) return (
        <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center z-[100]">
            <div className="flex flex-col items-center gap-6">
                <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white animate-loading-bar"></div>
                </div>
                <span className="font-mono text-[0.6rem] tracking-[0.5em] text-white/40 uppercase">Initialising Experience</span>
            </div>
        </div>
    );

    // Default data for when AnlysedCV is empty or still loading
    const userData = {
        personalInfo: {
            fullName: "ALEX NOVA",
            firstName: "ALEX",
            title: "DIGITAL ARCHITECT",
            location: "Global",
            email: "hello@nova.design",
            linkedin: "#" // Placeholder for LinkedIn
        },
        professionalSummary: "Designing digital experiences that harmonize architectural precision with raw creative expression through code and visual storytelling.",
        jobSearchTitle: "DIGITAL ARCHITECT",
        experience: [
            { title: "Lead Developer", company: "Noir Studio", startDate: "2024", location: "Global", responsibilities: ["Building high-performance design systems."] },
            { title: "Creative Architect", company: "Obsidian Digital", startDate: "2023", location: "Remote", responsibilities: ["Leading the visual direction of premium digital products."] },
            { title: "Senior Frontend Engineer", company: "PixelForge", startDate: "2022", location: "New York", responsibilities: ["Developed scalable UI components."] },
            { title: "UI/UX Designer", company: "Aether Labs", startDate: "2021", location: "London", responsibilities: ["Crafted intuitive user experiences."] }
        ],
        education: [
            { degree: "M.Sc. Computer Science", institution: "Tech University", year: "2020" },
            { degree: "B.A. Digital Arts", institution: "Art Institute", year: "2018" }
        ],
        skills: {
            technical: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "Git", "GraphQL", "Docker"],
            soft: ["Creative", "Strategic", "Precise", "Problem-Solving", "Leadership"],
            languages: [{ name: "English", level: "Native" }, { name: "French", level: "Professional" }]
        },
        tools: ["Figma", "VS Code", "Vercel", "Cloudinary", "Postman", "Jira", "Slack"],
        image: []
    };

    const {
        personalInfo = userData.personalInfo,
        professionalSummary = userData.professionalSummary,
        jobSearchTitle = userData.jobSearchTitle,
        experience = userData.experience,
        education = userData.education,
        skills = userData.skills,
        tools = userData.tools,
        image = userData.image,
        projects = []
    } = AnlysedCV || {};

    // Fallbacks
    const userImage = image?.[0] || null;
    const displayName = personalInfo?.fullName || userData.personalInfo.fullName;
    const displayTitle = jobSearchTitle || personalInfo?.title || (experience?.[0] as any)?.title || userData.jobSearchTitle;
    const displaySummary = professionalSummary || userData.professionalSummary;

    // Default categories if empty
    const techItems = skills?.technical?.length > 0 ? skills.technical : userData.skills.technical;
    const toolItems = tools?.length > 0 ? tools : userData.tools;
    const langItems = skills?.languages?.length > 0 ? skills.languages.map((l: any) => typeof l === 'string' ? l : `${l.name} // ${l.level}`) : userData.skills.languages.map((l: any) => `${l.name} // ${l.level}`);

    const displayExperience = experience?.length > 0 ? experience : userData.experience;
    const displayEducation = education?.length > 0 ? education : userData.education;
    const displayProjects = (projects && projects.length > 0) ? projects : (experience?.length > 0 ? experience : userData.experience);

    const toggleTheme = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        customizer?.setThemeMode(next as 'light' | 'dark');
        localStorage.setItem('theme', next);
    };

    const scrollTo = (id: string, e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const Divider = () => (
        <div className="w-full flex items-center justify-center py-20 opacity-60">
            <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent to-[#C9A84C]"></div>
            <div className="w-2 h-2 rotate-45 border border-[#C9A84C] mx-4"></div>
            <div className="w-1/3 h-[1px] bg-gradient-to-l from-transparent to-[#C9A84C]"></div>
        </div>
    );

    return (
        <div className="bg-[#050505] text-white selection:bg-[#C9A84C] selection:text-black">
            <div className="noise-bg"></div>
            <div className="canvas-texture"></div>
            <ThemeSetup />
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@100;200;300;400;500;600&family=Space+Mono&display=swap');

                :root {
                    --obsidian: #050505;
                    --graphite: #111111;
                    --canvas: #0D0D0D;
                    --snow: #F5F5F7;
                    --accent: #C9A84C;
                    --border: rgba(201, 168, 76, 0.15);
                }

                .noise-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    pointer-events: none;
                    z-index: 50;
                    opacity: 0.03;
                    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                }

                .canvas-texture {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 10;
                    opacity: 0.05;
                    background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png');
                }

                body {
                    background-color: var(--obsidian);
                    font-family: 'Inter', sans-serif;
                    overflow-x: hidden;
                    color: var(--snow);
                }

                .font-cg { font-family: 'Cormorant Garamond', serif; }
                .font-mono { font-family: 'Space Mono', monospace; }

                /* Animations */
                @keyframes loading-bar {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-loading-bar { animation: loading-bar 1.5s infinite linear; }

                .reveal {
                    opacity: 0;
                    transform: translateY(60px);
                    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                /* Manifesto Parallax */
                .manifesto-bg-text {
                    transform: translateY(calc(var(--scroll-y, 0) * -0.2px));
                    transition: transform 0.1s linear;
                }

                /* Staggered Reveal */
                .stagger-reveal > * {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .stagger-reveal.visible > * {
                    opacity: 1;
                    transform: translateY(0);
                }
                .stagger-reveal.visible > *:nth-child(1) { transition-delay: 0.1s; }
                .stagger-reveal.visible > *:nth-child(2) { transition-delay: 0.2s; }
                .stagger-reveal.visible > *:nth-child(3) { transition-delay: 0.3s; }
                .stagger-reveal.visible > *:nth-child(4) { transition-delay: 0.4s; }

                /* Project Mask Image Reveal */
                .project-mask {
                    clip-path: inset(100% 0 0 0);
                    transition: clip-path 1.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .project-card.visible .project-mask {
                    clip-path: inset(0 0 0 0);
                }

                /* Magnetic Button */
                .magnetic-wrap {
                    transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
                }

                /* Layout Classes */
                .container { max-width: 1400px; }
                .ease-expo { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
                .reveal.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .marquee { animation: marquee 40s linear infinite; }

                /* Cursor */
                [id^="cursor-ring"] {
                    width: 40px;
                    height: 40px;
                    border: 1px solid var(--accent);
                    border-radius: 50%;
                    position: fixed;
                    pointer-events: none;
                    z-index: 1000;
                    transition: transform 0.15s ease-out, opacity 0.3s ease;
                    transform: translate(-50%, -50%);
                }

                /* Blueprint Styling & WOW Effects */
                .blueprint-line {
                    position: absolute;
                    background: var(--border);
                    transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
                    transform-origin: center;
                }
                .reveal:not(.visible) .blueprint-line.horiz { transform: scaleX(0); }
                .reveal:not(.visible) .blueprint-line.vert { transform: scaleY(0); }
                
                .blueprint-label {
                    position: absolute;
                    font-family: 'Space Mono', monospace;
                    font-size: 0.55rem;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.3);
                    letter-spacing: 0.2em;
                    transition: opacity 0.8s ease 0.5s;
                }
                .reveal:not(.visible) .blueprint-label { opacity: 0; }

                /* Scanline Effect */
                .scanline-container {
                    position: relative;
                    overflow: hidden;
                }
                .scanline-container::after {
                    content: "";
                    position: absolute;
                    top: -100%;
                    left: 0;
                    width: 100%;
                    height: 10px;
                    background: linear-gradient(to bottom, transparent, var(--accent), transparent);
                    opacity: 0.15;
                    animation: scanning 4s linear infinite;
                    pointer-events: none;
                }
                @keyframes scanning {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }

                /* Creative Scrolling Effects */
                .perspective-section {
                    perspective: 1000px;
                }
                
                .scroll-skew {
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .reveal:not(.visible) {
                    opacity: 0;
                    transform: translateY(100px) rotateX(10deg);
                }
                
                .reveal.visible {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg);
                }

                .mask-image {
                    clip-path: inset(100% 0 0 0);
                    transition: clip-path 1.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .reveal.visible .mask-image {
                    clip-path: inset(0 0 0 0);
                }
                
                .text-reveal-wipe {
                    position: relative;
                    color: rgba(255,255,255,0.1);
                    background: linear-gradient(to right, #fff 50%, rgba(255,255,255,0.1) 50%);
                    background-size: 200% 100%;
                    background-position: 100% 0;
                    -webkit-background-clip: text;
                    transition: background-position 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .visible .text-reveal-wipe {
                    background-position: 0% 0;
                }

                .text-mix {
                    mix-blend-mode: difference;
                }
            `}} />

            <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />

            {/* HEADER - MINIMALIST */}
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-8 py-6 flex items-center justify-between ${isScrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 py-4' : ''}`}>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[0.6rem] font-mono group hover:border-white transition-all cursor-none">
                        <span className="group-hover:translate-y-[-2px] transition-transform">N</span>
                    </div>
                    <span className="font-mono text-[0.6rem] tracking-[0.4em] uppercase opacity-40">{displayName}</span>
                </div>

                <nav className="flex items-center gap-12">
                    {[
                        { label: 'OPENING NIGHT', id: 'hero' },
                        { label: 'ABOUT', id: 'about' },
                        { label: 'ARTIST RESIDENCIES', id: 'experience' },
                        { label: 'MEDIUM & TECHNIQUE', id: 'expertise' },
                        { label: 'SELECTED WORKS', id: 'projects' },
                        { label: 'FORMATION', id: 'education' },
                        { label: 'PRIVATE VIEWING', id: 'contact' }
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => scrollTo(item.id, e)}
                            className={`font-mono text-[0.55rem] tracking-[0.3em] transition-colors cursor-none ${activeSection === item.id ? 'text-[#C9A84C] opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </header>

            <main className="w-full">

                {visibility.hero !== false && (
                    <motion.section
                        id="hero"
                        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
                        initial={{ backgroundColor: '#000' }}
                        animate={{ backgroundColor: isUnveiled ? 'var(--obsidian)' : '#000' }}
                        transition={{ duration: 1.5 }}
                    >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[120%] border-r border-white/5 rotate-12"></div>
                            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[120%] border-l border-white/5 -rotate-12"></div>
                        </div>

                        <div className="container relative z-10 mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] items-center gap-20">

                            <div className="flex flex-col items-start text-left order-2 lg:order-1">
                                <VisualEditor id="hero-tag-editor" contentPath="hero.tag">
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: isUnveiled ? 1 : 0, x: isUnveiled ? 0 : -50 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="font-mono text-[0.65rem] tracking-[0.8em] text-[#C9A84C] mb-6 border-l-2 border-[#C9A84C] pl-4"
                                    >
                                        ED_2026 // VOL_01
                                    </motion.div>
                                </VisualEditor>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isUnveiled ? 1 : 0 }}
                                    transition={{ duration: 1.5, delay: 0.8 }}
                                    className="relative"
                                >
                                    <VisualEditor id="hero-firstname-editor" contentPath="hero.firstName">
                                        <h1 className="font-cg text-[12vw] lg:text-[10vw] leading-[0.8] font-black italic tracking-tighter uppercase mix-blend-difference z-20 relative">
                                            {personalInfo?.firstName || userData.personalInfo.firstName}
                                        </h1>
                                    </VisualEditor>
                                    <h1 className="font-cg text-[12vw] lg:text-[10vw] leading-[0.8] font-light uppercase absolute top-[0.5rem] left-[0.5rem] text-white/5 -z-10">
                                        {personalInfo?.firstName || userData.personalInfo.firstName}
                                    </h1>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: isUnveiled ? 1 : 0, y: isUnveiled ? 0 : 30 }}
                                    transition={{ duration: 1, delay: 1.2 }}
                                    className="mt-12 max-w-md"
                                >
                                    <VisualEditor id="hero-summary-editor" contentPath="hero.summary">
                                        <p className="font-inter text-[1.2rem] font-light leading-relaxed text-white/40 mb-10 italic">
                                            &ldquo;{displaySummary}&rdquo;
                                        </p>
                                    </VisualEditor>

                                    <div className="flex items-center gap-12 border-t border-white/10 pt-10">
                                        <div className="space-y-1">
                                            <VisualEditor id="curator-label-editor" contentPath="labels.curator">
                                                <div className="font-mono text-[0.5rem] opacity-30 uppercase tracking-[0.3em]">Curator</div>
                                            </VisualEditor>
                                            <VisualEditor id="hero-fullname-editor" contentPath="hero.fullName">
                                                <div className="font-mono text-[0.6rem] uppercase tracking-widest">{displayName}</div>
                                            </VisualEditor>
                                        </div>
                                        <div className="space-y-1">
                                            <VisualEditor id="status-label-editor" contentPath="labels.status">
                                                <div className="font-mono text-[0.5rem] opacity-30 uppercase tracking-[0.3em]">Status</div>
                                            </VisualEditor>
                                            <VisualEditor id="status-value-editor" contentPath="labels.live_exhibit">
                                                <div className="font-mono text-[0.6rem] text-[#C9A84C] uppercase tracking-widest flex items-center gap-2">
                                                    <span className="w-1 h-1 bg-[#C9A84C] rounded-full animate-ping"></span>
                                                    LIVE_EXHIBIT
                                                </div>
                                            </VisualEditor>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="relative order-1 lg:order-2 flex justify-end">
                                <div className="relative w-[300px] lg:w-[400px] aspect-[3/4] perspective-[2000px]">
                                    <motion.div
                                        initial={{ scale: 1.2, opacity: 0, rotateY: -20 }}
                                        animate={{
                                            scale: isUnveiled ? 1 : 1.2,
                                            opacity: isUnveiled ? 1 : 0,
                                            rotateY: isUnveiled ? 0 : -20
                                        }}
                                        transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-0 z-10 shadow-[50px_50px_100px_rgba(0,0,0,0.8)] border-[1.5rem] border-white/5 p-4"
                                    >
                                        <div className="relative w-full h-full overflow-hidden bg-neutral-900 border border-[#C9A84C]/30 grayscale contrast-125">
                                            <VisualEditor id="hero-photo-editor" contentPath="hero.photo" type="image">
                                                {userImage ? (
                                                    <img src={userImage} alt={displayName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center font-cg text-4xl opacity-10 uppercase">Portrait</div>
                                                )}
                                            </VisualEditor>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                        </div>

                                        <VisualEditor id="hero-piece-editor" contentPath="hero.piece_tag">
                                            <div className="absolute top-[-1rem] right-[-1rem] bg-[#C9A84C] text-black font-mono text-[0.5rem] px-3 py-1 uppercase tracking-widest font-bold rotate-12 shadow-lg">
                                                Piece_00
                                            </div>
                                        </VisualEditor>
                                    </motion.div>

                                    <AnimatePresence>
                                        {!isUnveiled && (
                                            <div className="absolute inset-[-20px] z-20 flex">
                                                {[0, 1, 2, 3].map((i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ y: 0 }}
                                                        exit={{ y: '120%', opacity: 0, rotateZ: i % 2 === 0 ? 5 : -5 }}
                                                        transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                                        className="flex-1 bg-[#111] shadow-[10px_0_30px_rgba(0,0,0,1)] border-r border-white/5 h-full"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* THE MANIFESTO - ABOUT */}
                {visibility.about !== false && (
                    <section id="about" className="relative py-40 bg-white text-black overflow-hidden flex items-center">
                        <div className="absolute inset-0 pointer-events-none">
                            <VisualEditor id="about-watermark-editor" contentPath="about.watermark">
                                <div className="absolute top-[-10%] left-[-5%] font-cg text-[40rem] font-black text-black/[0.02] uppercase select-none leading-none rotate-12">MANIFESTO</div>
                            </VisualEditor>
                        </div>

                        <div className="container mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-32">
                            <div className="reveal">
                                <div className="sticky top-40 space-y-10">
                                    <VisualEditor id="about-subtitle-editor" contentPath="labels.philosophy">
                                        <span className="font-mono text-[0.65rem] tracking-[1em] text-black/40 uppercase block">/ Philosophy</span>
                                    </VisualEditor>
                                    <VisualEditor id="about-title-editor" contentPath="about.title">
                                        <h2 className="font-cg text-[6rem] leading-[0.8] font-black italic tracking-tighter">
                                            Architecting <br /> Sensations.
                                        </h2>
                                    </VisualEditor>
                                    <div className="w-20 h-[2px] bg-[#C9A84C]"></div>
                                    <VisualEditor id="about-curated-editor" contentPath="labels.curated_by">
                                        <div className="font-mono text-[0.55rem] text-black/40 uppercase tracking-[0.3em]">Curated by Noir Studio</div>
                                    </VisualEditor>
                                </div>
                            </div>

                            <div className="space-y-24">
                                <VisualEditor id="about-summary-editor" contentPath="about.summary">
                                    <motion.p
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2 }}
                                        className="font-cg text-[3.5rem] md:text-[4.5rem] leading-[1] font-light text-black/90 max-w-4xl tracking-tight"
                                    >
                                        {displaySummary}
                                    </motion.p>
                                </VisualEditor>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pt-20 border-t border-black/10">
                                    {[
                                        { label: "EXPERIENCE", val: experience?.length || userData.experience.length, unit: "RESIDENCIES" },
                                        { label: "SKILLSETS", val: skills?.technical?.length || userData.skills.technical.length, unit: "MEDIUMS" },
                                        { label: "TOOLS", val: tools?.length || userData.tools.length, unit: "INSTRUMENTS" },
                                        { label: "FORMATION", val: education?.length || userData.education.length, unit: "ACCOLADES" }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex flex-col group">
                                            <div className="flex items-end gap-2 mb-4">
                                                <span className="font-mono text-[0.7rem] font-bold text-[#C9A84C]">0{i + 1}</span>
                                                <VisualEditor id={`stat-label-${i}`} contentPath={`stats[${i}].label`}>
                                                    <span className="font-mono text-[0.5rem] tracking-[0.4em] text-black/30 uppercase">{stat.label}</span>
                                                </VisualEditor>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <VisualEditor id={`stat-val-${i}`} contentPath={`stats[${i}].val`}>
                                                    <span className="font-cg text-[5rem] font-black leading-none group-hover:text-[#C9A84C] transition-colors">{stat.val}</span>
                                                </VisualEditor>
                                                <VisualEditor id={`stat-unit-${i}`} contentPath={`stats[${i}].unit`}>
                                                    <span className="font-mono text-[0.55rem] text-black/40 uppercase tracking-widest">{stat.unit}</span>
                                                </VisualEditor>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <Divider />
                {/* SECTION 02: FIELD_LOGS - EXPERIENCE */}
                {visibility.experience !== false && (
                    <section id="experience" className="py-40 bg-[#050505] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[50%] h-full border-l border-white/5 pointer-events-none"></div>
                        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-white/5 pointer-events-none"></div>

                        <div className="container mx-auto px-8 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-20 lg:gap-0">
                                <div className="reveal">
                                    <div className="sticky top-40">
                                        <VisualEditor id="exp-archive-label" contentPath="labels.archive_01">
                                            <span className="font-mono text-[0.6rem] tracking-[0.8em] text-[#C9A84C] uppercase block mb-6">Archive_01</span>
                                        </VisualEditor>
                                        <h2 className="font-cg text-[7rem] leading-[0.8] font-black uppercase italic tracking-tighter">
                                            Professional <br /> Residencies.
                                        </h2>
                                        <VisualEditor id="exp-chronological-log" contentPath="labels.chronological_log">
                                            <div className="mt-10 font-mono text-[0.55rem] text-white/20 uppercase tracking-[0.3em]">Chronological Log // 2018-2026</div>
                                        </VisualEditor>
                                    </div>
                                </div>

                                <div className="lg:pl-20 border-l border-[#C9A84C]/20 space-y-40">
                                    {displayExperience.map((exp: any, i: number) => (
                                        <div key={i} className="reveal relative group">
                                            <div className="absolute -left-[2.1rem] top-0 w-4 h-4 rounded-full bg-[#050505] border border-[#C9A84C] group-hover:bg-[#C9A84C] transition-colors z-20"></div>
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                                                <div className="space-y-4">
                                                    <VisualEditor id={`exp-date-${i}`} contentPath={`experience[${i}].date`}>
                                                        <div className="font-mono text-[0.6rem] text-[#C9A84C] tracking-[0.3em] uppercase">[{exp.startDate} — {exp.endDate || "PRESENT"}]</div>
                                                    </VisualEditor>
                                                    <VisualEditor id={`exp-company-${i}`} contentPath={`experience[${i}].company`}>
                                                        <h3 className="font-cg text-6xl md:text-8xl font-black italic uppercase leading-none text-white/90 group-hover:text-white transition-colors">
                                                            {exp.company}
                                                        </h3>
                                                    </VisualEditor>
                                                    <VisualEditor id={`exp-title-${i}`} contentPath={`experience[${i}].title`}>
                                                        <div className="font-mono text-[0.8rem] tracking-[0.2em] text-white/40 uppercase">{exp.title}</div>
                                                    </VisualEditor>
                                                </div>
                                                <div className="md:text-right font-mono text-[0.5rem] text-white/20 uppercase tracking-widest">{exp.location}</div>
                                            </div>
                                            <div className="mt-12 max-w-2xl border-t border-white/5 pt-8">
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                                    {(exp.responsibilities || []).map((res: string, idx: number) => (
                                                        <VisualEditor key={idx} id={`exp-resp-${i}-${idx}`} contentPath={`experience[${i}].responsibilities[${idx}]`}>
                                                            <li className="font-inter text-[0.9rem] font-light text-white/30 hover:text-white transition-colors leading-relaxed">
                                                                <span className="text-[#C9A84C] mr-2">/</span> {res}
                                                            </li>
                                                        </VisualEditor>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <Divider />
                {/* SECTION 03: MEDIUM & TECHNIQUE */}
                {visibility.skills !== false && (
                    <section id="expertise" className="relative py-40 bg-[#050505] overflow-hidden">
                        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                            <div className="w-[80vw] h-[80vw] rounded-full border border-white/5"></div>
                            <div className="absolute w-[60vw] h-[60vw] rounded-full border border-white/5"></div>
                        </div>

                        <div className="container mx-auto px-8 relative z-10 text-center">
                            <div className="reveal mb-32">
                                <VisualEditor id="skills-proficiency-label" contentPath="labels.technical_proficiency">
                                    <span className="font-mono text-[0.6rem] tracking-[1rem] text-[#C9A84C] uppercase block mb-8">Technical Proficiency</span>
                                </VisualEditor>
                                <VisualEditor id="skills-main-title" contentPath="skills.main_title_watermark">
                                    <h2 className="font-cg text-[10vw] leading-none font-black italic tracking-tighter uppercase text-white/10">Medium & Technique</h2>
                                </VisualEditor>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-8">
                                {[
                                    { title: "Technical Core", items: techItems, id: "01" },
                                    { title: "Creative Instruments", items: toolItems, id: "02" },
                                    { title: "Native Fluency", items: langItems, id: "03" }
                                ].map((cat, i) => (
                                    <div key={i} className="p-16 border border-white/10 bg-[#080808] hover:bg-[#0A0A0A] transition-all duration-1000 group relative overflow-hidden">
                                        <div className="absolute top-8 left-8 font-mono text-[0.6rem] text-[#C9A84C] tracking-[0.2em]">{cat.id}</div>
                                        <div className="absolute -bottom-10 -right-10 font-cg text-[15rem] font-bold text-white/[0.02] uppercase leading-none select-none">{cat.title.split(' ')[0]}</div>

                                        <VisualEditor id={`skills-cat-title-${i}`} contentPath={`skills.category_title_${i}`}>
                                            <h3 className="font-mono text-[0.6rem] tracking-[0.4em] uppercase text-white/40 mb-16 relative">/ {cat.title}</h3>
                                        </VisualEditor>
                                        <div className="space-y-6 relative">
                                            {cat.items.map((item: string, j: number) => (
                                                <VisualEditor key={j} id={`skill-${i}-${j}`} contentPath={`skills_category_${i}[${j}]`}>
                                                    <motion.div
                                                        whileHover={{ x: 10, color: '#C9A84C' }}
                                                        className="font-cg text-4xl text-white/60 font-light hover:italic transition-all cursor-none"
                                                    >
                                                        {item}
                                                    </motion.div>
                                                </VisualEditor>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <Divider />
                {/* SECTION 04: SELECTED WORKS */}
                {visibility.projects !== false && (
                    <section id="projects" className="relative py-40 bg-[#050505] overflow-hidden">
                        <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5"></div>

                        <div className="container mx-auto px-8 relative z-10">
                            <div className="mb-40 reveal flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                                <div className="space-y-6">
                                    <VisualEditor id="projects-inventory-label" contentPath="labels.inventory_02">
                                        <span className="font-mono text-[0.6rem] tracking-[1rem] text-[#C9A84C] uppercase block">Inventory_02</span>
                                    </VisualEditor>
                                    <h2 className="font-cg text-[10vw] leading-[0.8] font-black uppercase italic tracking-tighter">Selected <br /> Works.</h2>
                                </div>
                                <div className="max-w-md pb-4">
                                    <VisualEditor id="projects-quote-editor" contentPath="projects.quote">
                                        <p className="font-inter text-[1rem] font-light text-white/30 leading-relaxed italic">
                                            &ldquo;A collection of digital artifacts curated for their structural integrity and aesthetic resonance.&rdquo;
                                        </p>
                                    </VisualEditor>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-60 md:gap-x-12">
                                {displayProjects.map((p: any, i: number) => {
                                    const images = p.images || p.image || [];
                                    const isWide = i % 3 === 0;
                                    const spanClass = isWide ? "md:col-span-12" : (i % 3 === 1 ? "md:col-span-7" : "md:col-span-5");
                                    const heightClass = isWide ? "aspect-[21/9]" : "aspect-[4/5]";

                                    return (
                                        <div key={i} className={`reveal group flex flex-col ${spanClass} ${i % 2 !== 0 && !isWide ? 'md:mt-40' : ''}`}>
                                            <div
                                                className={`relative w-full ${heightClass} overflow-hidden bg-neutral-900 border border-white/5 cursor-none group/img`}
                                                onClick={() => images.length > 0 && setLightboxData({ images, index: 0 })}
                                            >
                                                <img
                                                    src={images[0] || 'https://images.unsplash.com/photo-1510148199876-8a857ee41c12'}
                                                    alt={p.title}
                                                    className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-expo"
                                                />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700"></div>

                                                <div className="absolute top-10 left-10 flex items-center gap-4">
                                                    <div className="w-8 h-[1px] bg-[#C9A84C]"></div>
                                                    <span className="font-mono text-[0.6rem] text-[#C9A84C] tracking-[0.4em] uppercase">No. {String(i + 1).padStart(2, '0')}</span>
                                                </div>

                                                <VisualEditor id="projects-deep-dive-button" contentPath="buttons.deep_dive">
                                                    <div className="absolute bottom-10 right-10 p-6 bg-black/60 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700">
                                                        <span className="font-mono text-[0.5rem] tracking-[0.5em] text-white uppercase">Deep_Dive.exe</span>
                                                    </div>
                                                </VisualEditor>
                                            </div>

                                            <div className="mt-12 space-y-6">
                                                <VisualEditor id={`project-title-${i}`} contentPath={`projects[${i}].title`}>
                                                    <h3 className="font-cg text-5xl font-black italic uppercase tracking-tighter group-hover:text-[#C9A84C] transition-colors">{p.title}</h3>
                                                </VisualEditor>
                                                <div className="flex flex-wrap gap-4 font-mono text-[0.6rem] text-white/30 uppercase tracking-widest border-b border-white/5 pb-6">
                                                    <VisualEditor id={`project-year-${i}`} contentPath={`projects[${i}].year`}>
                                                        <span>2026</span>
                                                    </VisualEditor>
                                                    <span className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest">//</span>
                                                    <VisualEditor id={`project-tech-${i}`} contentPath={`projects[${i}].technologies`}>
                                                        <span>{(p.technologiesUsed || p.technologies || []).slice(0, 3).join(' • ')}</span>
                                                    </VisualEditor>
                                                </div>
                                                <VisualEditor id={`project-desc-${i}`} contentPath={`projects[${i}].description`}>
                                                    <p className="font-inter text-[1.1rem] font-light text-white/40 leading-relaxed max-w-xl italic">
                                                        {p.description || p.responsibilities?.[0]}
                                                    </p>
                                                </VisualEditor>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* SECTION 05: FORMATION */}
                {visibility.education !== false && (
                    <section id="education" className="relative py-60 bg-[#050505] overflow-hidden">
                        <div className="container mx-auto px-8 max-w-5xl">
                            <div className="reveal text-center mb-40">
                                <VisualEditor id="edu-credentials-label" contentPath="labels.credentials">
                                    <span className="font-mono text-[0.6rem] tracking-[1rem] text-[#C9A84C] uppercase block mb-8">Credentials</span>
                                </VisualEditor>
                                <h2 className="font-cg text-[10vw] leading-none font-black uppercase italic tracking-tighter">Formation.</h2>
                            </div>

                            <div className="space-y-1">
                                {displayEducation.map((edu: any, i: number) => (
                                    <div key={i} className="reveal group border-t border-white/10 py-16 flex flex-col md:flex-row md:items-center justify-between gap-10 hover:bg-white/[0.02] transition-colors px-10">
                                        <div className="space-y-4">
                                            <VisualEditor id={`edu-year-${i}`} contentPath={`education[${i}].year`}>
                                                <div className="font-mono text-[0.6rem] text-[#C9A84C] tracking-[0.3em] uppercase">[{edu.year || "VERIFIED"}]</div>
                                            </VisualEditor>
                                            <VisualEditor id={`edu-degree-${i}`} contentPath={`education[${i}].degree`}>
                                                <h3 className="font-cg text-5xl font-black italic uppercase leading-none">{edu.degree}</h3>
                                            </VisualEditor>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-2 text-white/30">
                                            <VisualEditor id={`edu-inst-${i}`} contentPath={`education[${i}].institution`}>
                                                <span className="font-mono text-[0.7rem] tracking-widest uppercase">{edu.institution}</span>
                                            </VisualEditor>
                                            <VisualEditor id={`edu-auth-code-${i}`} contentPath={`education[${i}].auth_code`}>
                                                <span className="font-mono text-[0.5rem] opacity-50 uppercase tracking-[0.2em]">Authenticity_Code: EDU_{i + 1}XLR</span>
                                            </VisualEditor>
                                        </div>
                                    </div>
                                ))}
                                <div className="border-t border-white/10"></div>
                            </div>
                        </div>
                    </section>
                )}

                {/* SECTION 06: PRIVATE VIEWING - CONTACT */}
                {visibility.contact !== false && (
                    <section id="contact" className="relative min-h-screen bg-white text-black py-40 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cg text-[60vw] font-black text-black/[0.02] uppercase leading-none italic pointer-events-none">NOIR</div>
                        </div>

                        <div className="container mx-auto px-8 relative z-10 text-center max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5 }}
                                className="space-y-16"
                            >
                                <VisualEditor id="contact-inquiry-label" contentPath="labels.inquiry">
                                    <span className="font-mono text-[0.7rem] tracking-[1rem] text-[#C9A84C] uppercase block">Inquiry</span>
                                </VisualEditor>
                                <VisualEditor id="contact-main-title" contentPath="contact.main_title">
                                    <h2 className="font-cg text-[10vw] md:text-[8vw] leading-[0.85] font-black italic tracking-tighter uppercase mb-20 text-reveal-wipe">
                                        Secure Your <br /> Private Viewing.
                                    </h2>
                                </VisualEditor>

                                <div className="flex flex-col gap-12 items-center">
                                    <a href={`mailto:${personalInfo?.email}`} className="group relative px-12 py-8 bg-black text-white hover:bg-[#C9A84C] hover:text-black transition-all duration-700 w-full md:w-auto">
                                        <div className="absolute top-2 left-2 w-1 h-1 bg-current opacity-20"></div>
                                        <div className="absolute bottom-2 right-2 w-1 h-1 bg-current opacity-20"></div>
                                        <span className="font-mono text-[0.8rem] tracking-[0.5em] uppercase font-bold break-all">
                                            {personalInfo?.email || "LINK_MISSING"}
                                        </span>
                                    </a>

                                    <div className="flex gap-16 pt-10">
                                        <VisualEditor id="contact-linkedin-label" contentPath="labels.linkedin_link">
                                            <a href={personalInfo?.linkedin} target="_blank" className="font-mono text-[0.6rem] tracking-[0.3em] uppercase border-b border-black/10 hover:border-black transition-all pb-2 opacity-40 hover:opacity-100">LinkedIn // Profile</a>
                                        </VisualEditor>
                                        <span className="font-mono text-[0.6rem] text-black/20">/</span>
                                        <VisualEditor id="contact-download-label" contentPath="labels.download_pdf">
                                            <a href="#" className="font-mono text-[0.6rem] tracking-[0.3em] uppercase border-b border-black/10 hover:border-black transition-all pb-2 opacity-40 hover:opacity-100 italic font-bold">Download_Folio.pdf</a>
                                        </VisualEditor>
                                    </div>
                                </div>

                                <div className="pt-40 flex flex-col items-center gap-6">
                                    <div className="w-[1px] h-24 bg-black/10"></div>
                                    <VisualEditor id="footer-curated-by" contentPath="footer.curated_by">
                                        <div className="font-mono text-[0.55rem] tracking-[0.6em] uppercase text-black/40">
                                            Exhibition curated by {displayName} &mdash; &copy; 2026 &mdash; All works reserved
                                        </div>
                                    </VisualEditor>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

            </main>

            <div id="cursor-dot" className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[1000] mix-blend-difference" style={{ left: '-100px', top: '-100px', transform: 'translate(-50%, -50%)' }}></div>

            <Lightbox lightboxData={lightboxData} setLightboxData={setLightboxData} />

            {/* Premium Export Button */}
            <div className={`fixed bottom-10 right-10 z-[500] flex flex-col gap-4 transition-all duration-700 ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} data-export-exclude>
                {/* Theme Toggle */}
                <button
                    id="theme-toggle"
                    onClick={() => customizer?.setThemeMode(customizer.isDarkMode ? 'light' : 'dark')}
                    className="flex items-center justify-center w-14 h-14 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 backdrop-blur-xl transition-all duration-500 rounded-full shadow-2xl group pointer-events-auto"
                >
                    <Sun id="icon-sun" className={`w-5 h-5 absolute transition-all duration-700 ${!isDarkMode ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} />
                    <Moon id="icon-moon" className={`w-5 h-5 absolute transition-all duration-700 ${!isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                </button>

                {/* Export Button */}
                <button
                    onClick={handleExportHTML}
                    disabled={isExporting}
                    data-export-button
                    className="group relative flex items-center gap-4 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 px-8 py-4 backdrop-blur-xl transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-expo" />
                    <span className="relative z-10 font-mono text-[0.6rem] tracking-[0.4em] uppercase font-bold">
                        <VisualEditor id="btn-export-text" contentPath="buttons.export_html">
                            <span>{isExporting ? 'Generating_Archive...' : 'Export_HTML'}</span>
                        </VisualEditor>
                    </span>
                    <div className="relative z-10 w-8 h-[1px] bg-current transition-all group-hover:w-12" />
                    <FileDown className="relative z-10 w-4 h-4" />
                </button>
            </div>

        </div >
    );
};

const Page = () => {
    return (
        <ReadContextProvider>
            <CustomizationProvider
                initialDarkVars={{
                    '--obsidian': '#050505',
                    '--snow': '#F5F5F7',
                    '--accent': '#C9A84C',
                    '--border': 'rgba(201, 168, 76, 0.15)',
                    '--bg': '#050505',
                    '--text': '#F5F5F7',
                    '--primary': '#FFFFFF'
                }}
                initialLightVars={{
                    '--obsidian': '#F5F5F7',
                    '--snow': '#050505',
                    '--accent': '#C9A84C',
                    '--border': 'rgba(201, 168, 76, 0.15)',
                    '--bg': '#FFFFFF',
                    '--text': '#050505',
                    '--primary': '#000000'
                }}
            >
                <ObsidianNoirPortfolio />
                <PortfolioCustomizer />
            </CustomizationProvider>
        </ReadContextProvider>
    );
};

export default Page;
