"use client";

import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { ReadContext } from "@/app/GenComponents/ReadContext";
import ReadContextProvider from "@/app/GenComponents/ReadContextProvider";
import {
    Briefcase, GraduationCap, Laptop, User, Globe, ArrowRight,
    Fingerprint, FileText, ShieldAlert, Crosshair, AlertTriangle, Camera, X,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { useExportHTML } from '@/hooks/useExportHTML';
import { ThemeSetup } from '@/components/portfolio/ThemeSetup';
import { CustomizationProvider, useCustomization, SectionId } from '@/components/portfolio/CustomizationContext';
import { PortfolioCustomizer } from '@/components/portfolio/PortfolioCustomizer';
import { VisualEditor } from '@/components/portfolio/VisualEditor';

// --- TYPEWRITER TEXT HOOK ---
function useTypewriter(text: string, speed: number = 50) {
    const [display, setDisplay] = useState('');
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplay(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);
    return display;
}

// --- COUNTER HOOK ---
function useCounter(target: number, active: boolean, duration = 1200) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [active, target, duration]);
    return count;
}

const BentoPortfolio = () => {
    const { AnlysedCV, isLoading: loading } = useContext(ReadContext);
    const [examineData, setExamineData] = useState<{
        images: string[],
        index: number,
        title: string,
        description: string,
        tech?: string[]
    } | null>(null);
    const [statsVisible, setStatsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const { handleExportHTML, isExporting } = useExportHTML(AnlysedCV?.personalInfo?.fullName || "Portfolio");

    // Fallback Data
    const userData = {
        personalInfo: { fullName: "ALEX NOVA", email: "hello@nova.design", location: "Remote", title: "DIGITAL ARCHITECT", linkedin: "#", github: "#" },
        professionalSummary: "Designing digital experiences that harmonize precision with raw creative expression through code and visual storytelling.",
        experience: [
            { title: "Lead Designer & Developer", company: "Noir Studio", startDate: "2022", endDate: null, responsibilities: ["Building high-performance design systems."] },
            { title: "Senior Frontend Dev", company: "Apex Labs", startDate: "2020", endDate: "2022", responsibilities: ["Architected scalable component libraries."] },
        ],
        education: [{ degree: "M.Sc. Computer Science", institution: "Tech University", graduationYear: "2020" }],
        skills: { technical: ["React", "Next.js", "TypeScript", "Node.js", "Figma", "Three.js", "CSS", "GraphQL", "Python", "Docker", "AWS", "SQL"], soft: ["Leadership", "Creative", "Problem Solving", "Communication"], languages: [{ name: "English", level: "Native" }, { name: "French", level: "Fluent" }] },
        projects: [
            { title: "Aurora Design System", description: "A comprehensive, scalable design system built for enterprise.", technologies: ["React", "TypeScript", "Storybook"] },
            { title: "Quantum Dashboard", description: "Real-time data visualization platform with ML insights.", technologies: ["Next.js", "D3.js", "Python"] },
            { title: "Cipher Protocol", description: "End-to-end encrypted messaging app for the privacy-first era.", technologies: ["React Native", "Node.js", "PGP"] },
            { title: "Nebula CMS", description: "A headless CMS with live drag-and-drop editing interface.", technologies: ["Vue.js", "GraphQL", "PostgreSQL"] },
            { title: "Vertex Engine", description: "Lightweight 3D rendering engine for web-based games.", technologies: ["Three.js", "GLSL", "WebGL"] },
            { title: "Meridian App", description: "Habit tracking and focus app with ambient AI coaching.", technologies: ["SwiftUI", "CoreML", "Firebase"] },
        ],
        tools: ["Figma", "VS Code", "Vercel", "GitHub", "Notion", "Arc Browser"],
        image: []
    };

    const data = AnlysedCV || userData;
    const personalInfo = data.personalInfo || userData.personalInfo;
    const projects = (data.projects || userData.projects || []).slice(0, 6);
    const experience = (data.experience || userData.experience || []).slice(0, 4);
    const skills = data.skills || userData.skills;
    const technicalSkills = (skills?.technical || []);
    const marqueeSkills = [...technicalSkills, ...technicalSkills]; // Doubled for seamless loop
    const { themeVars, visibility, order, contentOverrides } = useCustomization() || { themeVars: {} as Record<string, string>, visibility: {} as Record<string, boolean>, order: [] as SectionId[], contentOverrides: {} as Record<string, string> };

    const expCount = useCounter(experience.length + 3, statsVisible);
    const projCount = useCounter(projects.length, statsVisible);
    const techCount = useCounter(technicalSkills.length, statsVisible);

    const nameToType = (contentOverrides?.['hero.name']) || (personalInfo.fullName?.toUpperCase() || "WANTED PERSON");
    const titleToType = (contentOverrides?.['hero.title']) || (personalInfo.title?.toUpperCase() || "GUNSLINGER");

    const typedName = useTypewriter(nameToType, 80);
    const typedTitle = useTypewriter(titleToType, 50);

    const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const fileNumber = `WF-${Math.floor(Math.random() * 90000) + 10000}-${currentDate.slice(2, 6)}`;

    const [activeSection, setActiveSection] = useState('personnel-file');

    useEffect(() => {
        if (loading) return;

        // Apply saved theme from localStorage
        const savedTheme = localStorage.getItem('theme-west') || 'paper';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, [loading]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['personnel-file', 'mission-files', 'trail-record'];
            let current = '';
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) {
                        current = section;
                    }
                }
            }
            if (current && current !== activeSection) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);



    useEffect(() => {
        if (loading) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    // Force a consistent stagger regardless of screen position if seen together
                    const delay = parseInt(el.getAttribute('data-index') || '0') * 100;
                    el.style.transitionDelay = `${delay}ms`;
                    el.classList.add('fade-in-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const animTypes = ['anim-gunshot', 'anim-unroll', 'anim-stamp', 'anim-dust'];
        document.querySelectorAll('.fade-in').forEach((el, i) => {
            el.setAttribute('data-index', i.toString());
            const animClass = animTypes[i % animTypes.length];
            el.classList.add(animClass);
            observer.observe(el);
        });

        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) setStatsVisible(true);
        }, { threshold: 0.5 });

        if (statsRef.current) statsObserver.observe(statsRef.current);

        return () => {
            observer.disconnect();
            statsObserver.disconnect();
        };
    }, [loading, order, visibility]);

    if (loading) return (
        <div style={{ position: 'fixed', inset: 0, background: '#e6d3a8', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, flexDirection: 'column', gap: '1rem' }}>
            <div className="mono" style={{ color: '#8b3a2b', letterSpacing: '0.2em', fontSize: '1rem' }}>UNROLLING POSTER...</div>
            <div style={{ width: 200, height: 2, background: '#c9ad7d', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#8b3a2b', width: '50%', animation: 'scan 1s linear infinite' }} />
            </div>
            <style>{`@keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }`}</style>
        </div>
    );

    return (
        <div
            ref={containerRef}
            id="dossier-folio"
            style={{
                minHeight: '100vh',
                background: 'var(--bg)',
                color: 'var(--fg)',
                fontFamily: themeVars['--font-main'] || "'Special Elite', 'Courier New', monospace",
                overflowX: 'hidden',
                padding: '2vw',
                '--radius': themeVars['--radius'] || '0px',
                '--border-width': themeVars['--border-width'] || '2px',
                fontSize: themeVars['--font-size-base'] || '1rem',
                letterSpacing: themeVars['--letter-spacing'] || '0px'
            } as any}
        >
            {/* NO THEME TOGGLE - FORCED DARK/DOSSIER LOOK */}
            <ThemeSetup />

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Rye&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                :root {
                    /* Paper Mode (Default) */
                    --bg: #e6d3a8; 
                    --fg: #3b2b1a; 
                    --fg-muted: #6b5035;
                    --accent-red: #8b3a2b;
                    --card-bg: #d9c49a; 
                    --card-border: #8b5a2b;
                    --stamp-red: rgba(139, 58, 43, 0.7);
                    --hero-noise: 0.2;
                    --paper-bg: #e1cda0;
                    --paper-fg: #2c1a0c;
                    --redacted-bg: #3b2b1a;
                    --marquee-bg: #d4b886;
                    --marquee-item-bg: #c9ad7d;
                    --marquee-border: #8b5a2b;
                    --timeline-line: #5c3e21;
                    --resp-bg: #ecd9b3;
                    --resp-border: #8b5a2b;
                    --card-shadow: rgba(0,0,0,0.2);
                }

                [data-theme='saloon'] {
                    --bg: #0a0806; 
                    --fg: #d4af37; /* Gold */
                    --fg-muted: #a67c00;
                    --accent-red: #c06014; /* Bourbon orange */
                    --card-bg: #1c150d; 
                    --card-border: #4d3319;
                    --stamp-red: rgba(192, 96, 20, 0.6);
                    --hero-noise: 0.25;
                    --paper-bg: #2a1f13;
                    --paper-fg: #d4af37;
                    --redacted-bg: #000;
                    --marquee-bg: #0f0b08;
                    --marquee-item-bg: #1c150d;
                    --marquee-border: #4d3319;
                    --timeline-line: #6b4e31;
                    --resp-bg: #151009;
                    --resp-border: #4d3319;
                    --card-shadow: rgba(0,0,0,0.6);
                }

                [data-theme='outlaw'] {
                    --bg: #050505; 
                    --fg: #e2d1a0; /* Faded yellow */
                    --fg-muted: #8c8c88;
                    --accent-red: #8b0000; /* Blood red */
                    --card-bg: #121212; 
                    --card-border: #2a2a2a;
                    --stamp-red: rgba(139, 0, 0, 0.7);
                    --hero-noise: 0.3;
                    --paper-bg: #1a1a1a;
                    --paper-fg: #e2d1a0;
                    --redacted-bg: #000;
                    --marquee-bg: #000;
                    --marquee-item-bg: #111;
                    --marquee-border: #222;
                    --timeline-line: #333;
                    --resp-bg: #0a0a0c;
                    --resp-border: #444;
                    --card-shadow: rgba(0,0,0,0.8);
                }

                body {
                    background-color: var(--bg);
                    font-family: 'Courier Prime', 'Courier New', monospace;
                    margin: 0;
                    position: relative;
                }
                body::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    z-index: -1;
                    pointer-events: none;
                    background-image: 
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"),
                        radial-gradient(circle at 10% 20%, rgba(100,50,0,0.1) 0%, transparent 20%), 
                        radial-gradient(circle at 90% 80%, rgba(100,50,0,0.15) 0%, transparent 25%), 
                        radial-gradient(circle at 50% 50%, var(--card-bg) 0%, var(--bg) 100%);
                    will-change: transform;
                    transform: translateZ(0); /* Hardware acceleration */
                }

                /* TYPOGRAPHY */
                h1, h2, h3, .title-font {
                    font-family: var(--font-main, 'Rye', serif);
                    letter-spacing: 0.05em;
                }
                .mono { 
                    font-family: var(--font-main, 'Courier Prime', 'Courier New', monospace); 
                    word-break: break-word; 
                    overflow-wrap: break-word; 
                }
                .typewriter { 
                    font-family: var(--font-main, 'Special Elite', cursive); 
                    word-break: break-word; 
                    overflow-wrap: break-word; 
                }

                /* SCROLL BAR */
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: var(--bg); border-left: 1px solid var(--card-border); }
                ::-webkit-scrollbar-thumb { background: var(--accent-red); }

                /* GRID */
                .dossier-grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    gap: 1.5vw;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                /* DOSSIER CARD BASE */
                .dossier-card {
                    background: var(--card-bg);
                    border: var(--border-width, 2px) solid var(--card-border);
                    box-shadow: 2px 2px 8px var(--card-shadow), inset 0 0 20px rgba(100,60,20,0.1);
                    padding: 2.5rem;
                    position: relative;
                    /* clipped corners */
                    clip-path: polygon(
                        1% 0%, 99% 1%, 100% 98%, 98% 100%, 1% 99%, 0% 1%
                    );
                }

                /* BORDERS FOR CLIPPED PATH */
                .dossier-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border: var(--border-width, 2px) dashed var(--card-border);
                    clip-path: polygon(
                        1% 0%, 99% 1%, 100% 98%, 98% 100%, 1% 99%, 0% 1%
                    );
                    pointer-events: none;
                }

                /* COWBOY SCROLL ANIMATIONS */
                .fade-in {
                    opacity: 0;
                    will-change: opacity, transform, filter;
                    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                /* 1. Quick draw (Gunshot) */
                .fade-in.anim-gunshot {
                    transform: translateY(30px) scale(0.95);
                }
                /* 2. Poster unrolling */
                .fade-in.anim-unroll {
                    transform: translateY(-40px) scaleY(0.8);
                    transform-origin: top;
                    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                /* 3. Heavy stamp hitting desk */
                .fade-in.anim-stamp {
                    transform: scale(1.2) translateY(20px);
                    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                /* 4. Desert dust wind */
                .fade-in.anim-dust {
                    transform: translateX(40px);
                    filter: blur(5px);
                    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.8s ease;
                }

                .fade-in.fade-in-visible {
                    opacity: 1;
                    transform: scale(1) translate(0, 0) rotate(0);
                    filter: blur(0);
                }

                /* SPECIAL TIMELINE ANIMATOR (Bullet Sequence) */
                @keyframes drawTimeline {
                    0% { max-height: 0; opacity: 0; }
                    100% { max-height: 100%; opacity: 1; }
                }
                @keyframes bulletImpact {
                    0% { transform: scale(0) rotate(-45deg); opacity: 0; box-shadow: 0 0 0 0px var(--accent-red); background: #ff5500; border-color: #ffaa00; }
                    40% { transform: scale(2) rotate(15deg); opacity: 1; box-shadow: 0 0 20px 5px #ffaa00; background: #ffaa00; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; box-shadow: 0 0 0 0px transparent; background: var(--bg); border-color: var(--accent-red); }
                }
                .timeline-draw-line {
                    max-height: 0;
                }
                .fade-in-visible .timeline-draw-line {
                    animation: drawTimeline 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    animation-delay: 0.2s; /* start slightly after card fades in */
                }
                .timeline-item-group {
                    opacity: 0;
                    transform: translateX(30px);
                    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .fade-in-visible .timeline-item-group {
                    opacity: 1;
                    transform: translateX(0);
                }
                .bullet-notch {
                    opacity: 0;
                }
                .fade-in-visible .bullet-notch {
                    animation: bulletImpact 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                .fade-in-visible .timeline-content-box {
                    transition: background-color 0.3s;
                }

                /* WATERMARKS */
                .watermark {
                    position: absolute;
                    font-family: var(--font-main, 'Rye', serif);
                    font-size: 8rem;
                    color: rgba(60,40,20,0.05);
                    transform: rotate(-15deg);
                    pointer-events: none;
                    z-index: 0;
                    user-select: none;
                    white-space: nowrap;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%) rotate(-15deg);
                }
                .watermark-red {
                    color: rgba(139, 58, 43, 0.1);
                }

                /* RED STAMP / WAX SEAL */
                .stamp {
                    font-family: var(--font-main, 'Rye', serif);
                    color: var(--stamp-red);
                    border: var(--border-width, 4px) solid var(--stamp-red);
                    padding: 0.2rem 1rem;
                    transform: rotate(-15deg);
                    display: inline-block;
                    font-size: 1.5rem;
                    letter-spacing: 0.1em;
                    border-radius: var(--radius, 4px);
                }

                /* MARQUEE */
                /* MARQUEE */
                .marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marquee 30s linear infinite;
                }
                .project-stack-container {
                    position: relative;
                    height: 240px;
                    margin: 0;
                    background: #2a1a0c;
                    border-bottom: 2px solid var(--card-border);
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                }
                .project-stacked-img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 0.4s ease;
                    filter: sepia(40%) contrast(1.1);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                }
                .project-stacked-img:nth-child(2) { transform: translate(6px, 6px); opacity: 0.6; }
                .project-stacked-img:nth-child(3) { transform: translate(12px, 12px); opacity: 0.3; }

                .folder-card:hover .project-stacked-img {
                    filter: sepia(0%) contrast(1);
                }
                .folder-card:hover .project-stacked-img:nth-child(1) {
                    transform: scale(1.05);
                    z-index: 30;
                }
                .stack-indicator {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: var(--accent-red);
                    color: #fff;
                    font-size: 0.5rem;
                    padding: 2px 6px;
                    z-index: 40;
                    font-family: 'Courier Prime', monospace;
                    box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
                    pointer-events: none;
                }
                .project-indicator-list {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    z-index: 50;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .project-mini-dot {
                    width: 32px;
                    height: 32px;
                    border: var(--border-width, 1px) solid #fff;
                    background: rgba(0,0,0,0.5);
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    transform: translateX(-40px);
                    opacity: 0;
                }
                .project-mini-dot img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
                .folder-card:hover .project-mini-dot { transform: translateX(0); opacity: 1; }
                .project-mini-dot:hover { transform: scale(1.1) translateX(5px) !important; border-color: var(--accent-red); }
                .project-mini-dot:hover img { opacity: 1; }

                .evidence-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: var(--accent-red);
                    color: #fff;
                    font-size: 0.6rem;
                    padding: 2px 8px;
                    z-index: 10;
                    font-family: var(--font-main, 'Courier Prime', monospace);
                    box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
                    font-weight: bold;
                }

                .proof-dots {
                    position: absolute;
                    bottom: 15px;
                    left: 15px;
                    display: flex;
                    gap: 6px;
                    z-index: 10;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .folder-card:hover .proof-dots { opacity: 1; }
                .proof-dot {
                    width: 32px;
                    height: 32px;
                    border: var(--border-width, 1px) solid #fff;
                    background: #000;
                    overflow: hidden;
                    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
                    border-radius: var(--radius, 0px);
                }
                .proof-dot img { width: 100%; height: 100%; object-fit: cover; }

                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }

                /* DOSSIER FOLDER PROJECT */
                .folder-card {
                    position: relative;
                    background: var(--card-bg);
                    border: var(--border-width, 1px) solid var(--card-border);
                    box-shadow: 5px 5px 15px rgba(0,0,0,0.1), inset 0 0 40px rgba(100,60,20,0.05);
                    margin-top: 25px;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    width: 100%;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    overflow: visible;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                .folder-card:hover { 
                    transform: scale(1.02) translateY(-10px);
                    z-index: 50;
                }
                .paper-clip {
                    position: absolute;
                    top: -15px;
                    left: 20%;
                    width: 40px;
                    height: 80px;
                    border: var(--border-width, 3px) solid #999;
                    border-radius: 20px;
                    z-index: 100;
                    pointer-events: none;
                    background: transparent;
                    opacity: 0.8;
                    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                }
                .paper-clip::after {
                    content: '';
                    position: absolute;
                    inset: 10px 5px;
                    border: var(--border-width, 2px) solid #888;
                    border-radius: 15px;
                }
                .staple {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    width: 30px;
                    height: 10px;
                    background: #888;
                    border-radius: 2px;
                    opacity: 0.6;
                    box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                    z-index: 100;
                    transform: rotate(-15deg);
                }
                .folder-hover-stamp {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    border: var(--border-width, 3px) solid var(--accent-red);
                    color: var(--accent-red);
                    font-family: var(--font-main, 'Rye', serif);
                    font-size: 1.2rem;
                    padding: 0.2rem 1rem;
                    opacity: 0;
                    pointer-events: none;
                    transform: rotate(-10deg) scale(1.5);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    z-index: 50;
                }
                .folder-card:hover .folder-hover-stamp {
                    opacity: 0.3;
                    transform: rotate(-10deg) scale(1);
                }
                


                .folder-tab {
                    position: absolute;
                    top: -26px;
                    left: 10px;
                    background: var(--card-bg);
                    border: var(--border-width, 2px) solid var(--card-border);
                    border-bottom: none;
                    padding: 4px 16px;
                    font-family: var(--font-main, 'Courier Prime', monospace);
                    font-size: 0.75rem;
                    color: var(--fg-muted);
                    min-width: 120px;
                    transform: rotate(-2deg);
                }
                .folder-card::before {
                    content: '';
                    position: absolute;
                    top: -1px; left: 118px; right: -1px;
                    height: 1px;
                    background: var(--card-border);
                }

                /* PHOTO TREATMENT */
                .intel-photo {
                    filter: sepia(80%) contrast(120%) brightness(0.9) saturate(1.5);
                    border: var(--border-width, 3px) double var(--card-border);
                    padding: 4px;
                    background: var(--bg);
                }

                /* LABEL */
                .clamp-1 {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .field-label {
                    font-size: 0.75rem;
                    color: var(--fg-muted);
                    text-transform: uppercase;
                    margin-bottom: 0.2rem;
                    display: block;
                    letter-spacing: 0.05em;
                }
                .field-value {
                    font-size: 1rem;
                    color: var(--fg);
                    font-weight: bold;
                    border-bottom: var(--border-width, 1px) dotted var(--card-border);
                    padding-bottom: 4px;
                    margin-bottom: 1rem;
                }

                /* REDACTED STRIP */
                .redacted {
                    background: var(--redacted-bg);
                    color: transparent;
                    user-select: none;
                    display: inline-block;
                }
                .redacted::selection { background: transparent; }

                /* BUTTON */
                .btn-classified {
                    background: transparent;
                    border: var(--border-width, 1px) solid var(--accent-red);
                    color: var(--accent-red);
                    font-family: var(--font-main, 'Courier Prime', monospace);
                    text-transform: uppercase;
                    padding: 0.8rem 1.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-weight: bold;
                }
                .btn-classified:hover {
                    background: var(--accent-red);
                    color: #fff;
                }

                /* RESPONSIVE LAYOUT CLASSES */
                .hero-content {
                    display: flex; gap: 3rem; flex-wrap: wrap; z-index: 1; position: relative;
                }
                .hero-stats-grid {
                    display: grid; grid-template-columns: minmax(200px, max-content) 1fr; gap: 0.8rem 1.5rem; align-items: end; border-bottom: 2px solid var(--paper-fg); padding-bottom: 1.5rem; margin-bottom: 1.5rem;
                }
                .hero-buttons {
                    margin-top: auto; padding-top: 2rem; display: flex; gap: 1rem;
                }
                .bounty-details {
                    display: flex; justify-content: space-around; align-items: center; padding: 2.5rem; 
                    background: var(--paper-bg);
                    border: 1px solid var(--card-border);
                    box-shadow: inset 0 0 40px rgba(0,0,0,0.05);
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
                }
                .bounty-divider {
                    display: flex; align-items: center; gap: 0.5rem; color: var(--accent-red); opacity: 0.4;
                    font-size: 0.8rem;
                }
                .bounty-divider::before { content: '★'; }
                .bounty-divider::after { content: '★'; }
                .bounty-hr { width: 40px; height: 1px; background: var(--accent-red); }

                .stat-num {
                    font-family: 'Rye', serif;
                    font-size: 3.5rem;
                    color: var(--fg);
                    line-height: 1;
                    margin: 0.5rem 0;
                    display: block;
                }
                .stat-label {
                    font-family: 'Courier Prime', monospace;
                    font-size: 0.7rem;
                    letter-spacing: 0.2em;
                    color: var(--fg-muted);
                    text-transform: uppercase;
                }

                .intel-card {
                    padding: 3rem !important;
                    background: var(--paper-bg);
                    border: var(--border-width, 2px) dashed var(--card-border) !important;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
                }
                .case-files-grid {
                    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2vw; align-items: stretch;
                }
                .trail-record-grid {
                    display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.5vw; margin-top: 3rem;
                }
                .trail-col-7 { grid-column: span 7; }
                .trail-col-5 { grid-column: span 5; }
                .intel-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5vw; align-items: start;
                }

                @media (max-width: 1024px) {
                    .dossier-grid { display: flex; flex-direction: column; }
                    .case-files-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                    .trail-record-grid { display: flex; flex-direction: column; gap: 2rem; }
                }
                
                @media (max-width: 768px) {
                    .hero-content { flex-direction: column; gap: 2rem; align-items: center; text-align: center; }
                    .hero-stats-grid { grid-template-columns: 1fr; gap: 0.5rem; align-items: center; text-align: center; padding-bottom: 1rem; border-bottom: none; }
                    .hero-stats-grid > span.typewriter { margin-bottom: -0.2rem; margin-top: 0.8rem; }
                    .hero-buttons { flex-direction: column; gap: 1rem; margin-top: 1rem; width: 100%; }
                    .hero-buttons button { width: 100%; }
                    
                    .bounty-details { flex-direction: column; gap: 2rem; padding: 2.5rem 1.5rem; }
                    .bounty-divider { width: 80px; height: 1px; }
                    
                    .case-files-grid { grid-template-columns: 1fr; gap: 2rem; }
                    
                    .dossier-card { padding: 1.5rem; }
                    
                    .watermark { font-size: 5rem !important; }
                    h2.title-font { font-size: 1.8rem !important; }
                }

                @media (max-width: 480px) {
                    .intel-grid { grid-template-columns: 1fr; }
                    .marquee-track span { padding: 0 1rem !important; font-size: 0.75rem !important; }
                }
                /* --- EVIDENCE EXAMINATION LIGHTBOX --- */
                .examine-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.9);
                    backdrop-filter: blur(8px);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.4s ease;
                }
                .examine-overlay.active {
                    opacity: 1;
                    pointer-events: auto;
                }
                .examine-content {
                    background: var(--bg);
                    width: 100%;
                    max-width: 1100px;
                    max-height: 90vh;
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    border: 10px solid var(--card-border);
                    box-shadow: 0 0 50px rgba(0,0,0,0.5);
                    position: relative;
                    overflow: hidden;
                }
                .examine-content.no-images {
                    grid-template-columns: 1fr;
                }
                .examine-photos {
                    background: #111;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    border-right: 2px solid var(--card-border);
                }
                .examine-report {
                    padding: 3rem;
                    background: var(--paper-bg);
                    color: var(--paper-fg);
                    overflow-y: auto;
                    position: relative;
                }
                .close-examine {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: var(--accent-red);
                    color: #fff;
                    border: none;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                    box-shadow: 3px 3px 0 var(--paper-fg);
                }
                .nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0,0,0,0.5);
                    color: #fff;
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .nav-btn:hover { background: var(--accent-red); }
                .nav-prev { left: 1rem; }
                .nav-next { right: 1rem; }

                .read-more-btn {
                    background: transparent;
                    border: 1px dashed var(--accent-red);
                    color: var(--accent-red);
                    font-size: 0.7rem;
                    padding: 4px 8px;
                    margin-top: 0.5rem;
                    cursor: pointer;
                    font-family: var(--font-main, 'Special Elite', cursive);
                    display: inline-block;
                }

                /* WESTERN HANGING SIGN NAVIGATION */
                .western-nav-container {
                    position: fixed;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    pointer-events: none;
                }
                .nav-rope {
                    position: absolute;
                    top: -50vh;
                    bottom: -50vh;
                    width: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #5d4037;
                    border: 1px solid #3e2723;
                    border-style: none solid;
                    z-index: -1;
                    box-shadow: 2px 0 10px rgba(0,0,0,0.5);
                }
                .nav-rope::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: repeating-linear-gradient(
                        45deg,
                        rgba(0,0,0,0.2),
                        rgba(0,0,0,0.2) 2px,
                        transparent 2px,
                        transparent 4px
                    );
                }
                .wooden-sign {
                    pointer-events: auto;
                    background-color: #6d4c41;
                    background-image: 
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.5' numOctaves='2'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wood)' opacity='0.3'/%3E%3C/svg%3E"),
                        linear-gradient(90deg, #5d4037 0%, #6d4c41 50%, #5d4037 100%);
                    color: #e0d5c1;
                    padding: 0.8rem 1.8rem;
                    font-family: var(--font-main, 'Rye', serif);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    cursor: pointer;
                    border: 2px solid #3e2723;
                    border-radius: 2px;
                    box-shadow: 0 5px 0 #2e1e1a, 0 10px 20px rgba(0,0,0,0.4);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    position: relative;
                    transform-origin: top center;
                    min-width: 150px;
                    justify-content: center;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
                }
                /* The Hanging Nail */
                .wooden-sign::after {
                    content: '';
                    position: absolute;
                    top: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 5px;
                    height: 5px;
                    background: #212121;
                    border-radius: 50%;
                    box-shadow: inset -1px -1px 1px rgba(255,255,255,0.2);
                    z-index: 2;
                }
                .wooden-sign:hover {
                    animation: signSwing 2.5s ease-in-out infinite;
                    color: #fff;
                    background-color: #6d4c41;
                }
                .wooden-sign.active {
                    background: var(--accent-red);
                    border-color: #5d1a10;
                    color: #fff;
                    box-shadow: 0 4px 0 #3d120a, 0 8px 20px rgba(139, 58, 43, 0.5);
                }
                .sheriff-star {
                    color: #ffd700;
                    filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));
                }
                .wooden-sign .sheriff-star {
                    display: none;
                }
                .wooden-sign.active .sheriff-star {
                    display: block;
                }

                @keyframes signSwing {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(3deg); }
                    50% { transform: rotate(0deg); }
                    75% { transform: rotate(-3deg); }
                    100% { transform: rotate(0deg); }
                }

                @media (max-width: 1024px) {
                    .western-nav-container { display: none; }
                }

                @media (max-width: 850px) {
                    .examine-content { grid-template-columns: 1fr; overflow-y: auto; }
                    .examine-photos { height: 300px; }
                }
            `}} />

            {/* FIXED THEME TOGGLE (STAMP SWITCHER) */}
            <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', pointerEvents: 'none' }}>
                <div style={{ pointerEvents: 'auto', background: 'var(--bg)', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--card-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)' }}>
                    <button
                        id="theme-switcher-btn"
                        onClick={() => {
                            const modes = ['paper', 'saloon', 'outlaw'];
                            const current = document.documentElement.getAttribute('data-theme') || 'paper';
                            const next = modes[(modes.indexOf(current) + 1) % modes.length];
                            document.documentElement.setAttribute('data-theme', next);
                            localStorage.setItem('theme-west', next);
                        }}
                        className="title-font"
                        style={{
                            background: 'transparent',
                            border: '3px double var(--accent-red)',
                            color: 'var(--accent-red)',
                            padding: '4px 12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '2px 2px 0px var(--card-border)',
                            transform: 'rotate(-1deg)',
                            transition: 'all 0.1s active'
                        }}
                    >
                        <ShieldAlert size={16} />
                        <VisualEditor id="theme-switcher-text" contentPath="ui.theme_switcher">
                            <span>STAMP SWITCHER</span>
                        </VisualEditor>
                    </button>
                </div>
            </div>

            {/* WESTERN HANGING SIGN NAVIGATION (DESKTOP) */}
            <div className="western-nav-container">
                <div className="nav-rope"></div>
                {[
                    { id: 'personnel-file', label: 'PERSONNEL', visibilityKey: 'about' },
                    { id: 'mission-files', label: 'MISSIONS', visibilityKey: 'projects' },
                    { id: 'trail-record', label: 'RECORD', visibilityKey: 'experience' }
                ].filter(item => (visibility as any)[item.visibilityKey] !== false).map((item, i) => (
                    <div
                        key={i}
                        data-section={item.id}
                        className={`wooden-sign ${activeSection === item.id ? 'active' : ''}`}
                        onClick={() => {
                            const el = document.getElementById(item.id);
                            if (el) {
                                const y = el.getBoundingClientRect().top + window.scrollY - 40;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                                setActiveSection(item.id);
                            }
                        }}
                    >
                        <svg className="sheriff-star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l2.45 7.54h7.93l-6.41 4.66 2.45 7.54-6.42-4.66-6.42 4.66 2.45-7.54-6.41-4.66h7.93z" />
                            <circle cx="12" cy="13" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                        <VisualEditor id={`nav-sign-${item.id}`} contentPath={`nav.labels.${item.id}`}>
                            <span>{item.label}</span>
                        </VisualEditor>
                    </div>
                ))}
            </div>

            {/* MOBILE HEADER (Only visible when sidebar is hidden) */}
            <header className="mobile-header" style={{ display: 'none', padding: '1rem 0', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--card-border)', marginBottom: '3rem', position: 'relative' }}>
                <style>{`@media (max-width: 1024px) { .mobile-header { display: flex !important; } }`}</style>
                <div>
                    <VisualEditor id="mobile-header-title" contentPath="global.archive_title">
                        <div className="title-font" style={{ fontSize: '1.5rem', color: "var(--fg)" }}>T.M.O. ARCHIVES</div>
                    </VisualEditor>
                    <VisualEditor id="mobile-header-warrant" contentPath="global.warrant_label">
                        <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.2rem' }}>WARRANT: {fileNumber}</div>
                    </VisualEditor>
                </div>
            </header>

            <main className="dossier-grid" style={{ paddingBottom: '4rem' }}>
                {(order || []).map((sectionId) => {
                    switch (sectionId) {
                        case 'hero':
                            return visibility.hero !== false && (
                                <div key="hero" id="personnel-file" className="dossier-card fade-in" style={{
                                    gridColumn: 'span 12',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight: '400px',
                                    background: 'var(--paper-bg)',
                                    color: 'var(--paper-fg)',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='var(--hero-noise)'/%3E%3C/svg%3E")`,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: 'var(--border-width, 2px) solid var(--paper-fg)'
                                }}>
                                    <div style={{ background: 'var(--paper-fg)', color: 'var(--paper-bg)', padding: '0.6rem 1.5rem', margin: '-2.5rem -2.5rem 2.5rem -2.5rem', borderBottom: 'var(--border-width, 3px) solid var(--paper-fg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <VisualEditor id="global-dossier-title" contentPath="global.dossier_title">
                                            <h2 className="title-font" style={{ margin: 0, fontSize: '1.6rem', letterSpacing: '0.1em' }}>WANTED DOSSIER</h2>
                                        </VisualEditor>
                                        <VisualEditor id="global-eyes-only" contentPath="global.eyes_only">
                                            <span className="mono" style={{ fontSize: '0.8rem', opacity: 0.8 }}>EYES ONLY</span>
                                        </VisualEditor>
                                    </div>
                                    <div className="watermark watermark-red" style={{ fontSize: '10rem', opacity: 0.15, color: 'var(--accent-red)', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-25deg)', zIndex: 0 }}>WANTED</div>
                                    <div className="hero-content">
                                        {data.image?.[0] && (
                                            <div className="hero-image-col" style={{ flexShrink: 0, position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', width: 45, height: 18, background: 'var(--fg-muted)', opacity: 0.3, zIndex: 2, transformOrigin: 'center', rotate: '-3deg', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}></div>
                                                <VisualEditor id="hero-photo-editor" contentPath="hero.photo" type="image">
                                                    <img src={data.image[0]} alt="Subject" style={{ width: '220px', height: '280px', objectFit: 'cover', filter: 'grayscale(100%) contrast(150%)', border: 'var(--border-width, 6px) solid var(--paper-fg)', padding: '4px', background: 'var(--paper-bg)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
                                                </VisualEditor>
                                                <div style={{ position: 'absolute', bottom: -20, right: -25, zIndex: 2 }}>
                                                    <VisualEditor id="global-status-stamp" contentPath="global.status_stamp">
                                                        <div className="stamp" style={{ background: 'var(--paper-bg)' }}>STATUS: ACTIVE</div>
                                                    </VisualEditor>
                                                </div>
                                            </div>
                                        )}
                                        <div className="hero-details-col" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div className="hero-stats-grid">
                                                <VisualEditor id="hero-label-alias" contentPath="labels.known_alias">
                                                    <span className="typewriter" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--paper-fg)' }}>KNOWN ALIAS:</span>
                                                </VisualEditor>
                                                <VisualEditor id="hero-name-editor" contentPath="hero.name">
                                                    <div className="typewriter" style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: 'var(--paper-fg)', textTransform: 'uppercase', borderBottom: 'var(--border-width, 1px) dotted var(--paper-fg)', lineHeight: 1 }}>{typedName}</div>
                                                </VisualEditor>
                                                <VisualEditor id="hero-label-warrant" contentPath="labels.warrant_type">
                                                    <span className="typewriter" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--paper-fg)' }}>WARRANT TYPE:</span>
                                                </VisualEditor>
                                                <VisualEditor id="hero-warrant-value" contentPath="hero.warrant_status">
                                                    <div className="typewriter" style={{ fontSize: '1.3rem', color: 'var(--accent-red)', fontWeight: 'bold', borderBottom: 'var(--border-width, 1px) dotted var(--paper-fg)' }}>DEAD OR ALIVE</div>
                                                </VisualEditor>
                                                <VisualEditor id="hero-label-last-seen" contentPath="labels.last_seen">
                                                    <span className="typewriter" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--paper-fg)' }}>LAST SEEN:</span>
                                                </VisualEditor>
                                                <VisualEditor id="hero-location-value" contentPath="hero.location">
                                                    <div className="typewriter" style={{ fontSize: '1.3rem', color: 'var(--paper-fg)', borderBottom: 'var(--border-width, 1px) dotted var(--paper-fg)' }}>{personalInfo.location || 'UNKNOWN TERRITORY'}</div>
                                                </VisualEditor>
                                                <VisualEditor id="hero-label-contact" contentPath="labels.contact_wire">
                                                    <span className="typewriter" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--paper-fg)' }}>CONTACT WIRE:</span>
                                                </VisualEditor>
                                                <VisualEditor id="hero-email-value" contentPath="hero.email">
                                                    <div className="typewriter" style={{ fontSize: '1.3rem', color: 'var(--paper-fg)', borderBottom: 'var(--border-width, 1px) dotted var(--paper-fg)' }}>{personalInfo.email}</div>
                                                </VisualEditor>
                                                <VisualEditor id="hero-label-profession" contentPath="labels.profession">
                                                    <span className="typewriter" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--paper-fg)' }}>PROFESSION:</span>
                                                </VisualEditor>
                                                <VisualEditor id="hero-title-editor" contentPath="hero.title">
                                                    <div className="typewriter" style={{ fontSize: '1.3rem', color: 'var(--paper-fg)', borderBottom: 'var(--border-width, 1px) dotted var(--paper-fg)' }}>{typedTitle || 'UNKNOWN'}</div>
                                                </VisualEditor>
                                            </div>
                                            <div>
                                                <VisualEditor id="hero-label-profile" contentPath="labels.behavioral_profile">
                                                    <span className="typewriter" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--paper-fg)', display: 'block', marginBottom: '0.5rem' }}>SUBJECT SUMMARY / BEHAVIORAL PROFILE:</span>
                                                </VisualEditor>
                                                <div className="typewriter" style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--paper-fg)' }}>
                                                    {"> "}
                                                    <VisualEditor id="hero-summary-editor" contentPath="hero.summary">
                                                        <span>{data.professionalSummary || userData.professionalSummary}</span>
                                                    </VisualEditor>
                                                </div>
                                            </div>
                                            <div className="hero-buttons">
                                                <button onClick={handleExportHTML} disabled={isExporting} className="typewriter" style={{ background: 'var(--paper-fg)', border: 'var(--border-width, 2px) solid var(--paper-fg)', color: 'var(--paper-bg)', padding: '0.6rem 1.2rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.2s', fontSize: '1rem' }}>{isExporting ? 'DOWNLOADING COPY...' : '[ DOWNLOAD DOSSIER ]'}</button>
                                                <VisualEditor id="hero-btn-intel" contentPath="buttons.view_intel">
                                                    <button onClick={() => document.getElementById('mission-files')?.scrollIntoView({ behavior: 'smooth' })} className="typewriter" style={{ background: 'transparent', border: 'var(--border-width, 2px) solid var(--paper-fg)', color: 'var(--paper-fg)', padding: '0.6rem 1.2rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.2s', fontSize: '1rem' }}>VIEW INTEL LOGS</button>
                                                </VisualEditor>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        case 'about':
                            return visibility.about !== false && (
                                <React.Fragment key="about">
                                    <div style={{ gridColumn: 'span 12' }} className="fade-in">
                                        <VisualEditor id="about-title-editor" contentPath="about.title">
                                            <h2 className="title-font" style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', color: 'var(--fg)', borderBottom: 'var(--border-width, 2px) solid var(--accent-red)', paddingBottom: '0.5rem' }}>BOUNTY DETAILS</h2>
                                        </VisualEditor>
                                    </div>
                                    <div ref={statsRef} className="dossier-card fade-in bounty-details" style={{ gridColumn: 'span 12', border: 'var(--border-width, 2px) solid var(--card-border)' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <VisualEditor id="stat-label-years" contentPath="stats.years_label">
                                                <div className="stat-label">YEARS ON THE RUN</div>
                                            </VisualEditor>
                                            <div className="stat-num" data-counter-value={experience.length + 3}>0{expCount}</div>
                                        </div>
                                        <div className="bounty-divider"><div className="bounty-hr" /></div>
                                        <div style={{ textAlign: 'center' }}>
                                            <VisualEditor id="stat-label-heists" contentPath="stats.heists_label">
                                                <div className="stat-label">HEISTS PULLED</div>
                                            </VisualEditor>
                                            <div className="stat-num" data-counter-value={projects.length}>{projCount < 10 ? `0${projCount}` : projCount}</div>
                                        </div>
                                        <div className="bounty-divider"><div className="bounty-hr" /></div>
                                        <div style={{ textAlign: 'center' }}>
                                            <VisualEditor id="stat-label-weapons" contentPath="stats.weapons_label">
                                                <div className="stat-label">WEAPONS OF CHOICE</div>
                                            </VisualEditor>
                                            <div className="stat-num" style={{ color: 'var(--accent-red)' }} data-counter-value={technicalSkills.length}>{techCount}</div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        case 'skills':
                            return visibility.skills !== false && (
                                <React.Fragment key="skills">
                                    <div className="dossier-card fade-in" style={{ gridColumn: 'span 12', overflow: 'hidden', padding: '1rem 0', background: 'var(--marquee-bg)', borderTop: 'var(--border-width, 2px) solid var(--marquee-border)', borderBottom: 'var(--border-width, 2px) solid var(--marquee-border)', clipPath: 'none' }}>
                                        <div className="marquee-track">
                                            {marqueeSkills.map((skill: string, i: number) => {
                                                const icons = [<Crosshair size={14} />, <Fingerprint size={14} />, <ShieldAlert size={14} />, <Laptop size={14} />, <Globe size={14} />];
                                                const icon = icons[i % icons.length];
                                                return (
                                                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 2rem' }}>
                                                        <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--fg)', border: 'var(--border-width, 1px) solid var(--marquee-border)', padding: '4px 12px', background: 'var(--marquee-item-bg)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '2px 2px 0 var(--card-shadow)' }}>
                                                            <span style={{ color: 'var(--accent-red)', opacity: 0.7 }}>{icon}</span>
                                                            {skill.toUpperCase()}
                                                        </span>
                                                        <span style={{ color: 'var(--accent-red)', fontSize: '1rem', opacity: 0.3 }}>★</span>
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="dossier-card fade-in" style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', border: 'var(--border-width, 2px) solid var(--card-border)' }}>
                                        <VisualEditor id="skills-title-editor" contentPath="skills.title">
                                            <h2 className="title-font" style={{ fontSize: '1.5rem', borderBottom: 'var(--border-width, 1px) solid var(--timeline-line)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>LINGUISTIC CAPABILITIES</h2>
                                        </VisualEditor>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {(skills?.languages || []).map((lang: any, i: number) => (
                                                <li key={i} className="mono" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'var(--border-width, 1px) dotted var(--timeline-line)', padding: '0.5rem 0', color: 'var(--fg)' }}>
                                                    <VisualEditor id={`lang-name-${i}`} contentPath={`skills.languages[${i}].name`}>
                                                        <span>{typeof lang === 'string' ? lang : lang?.name}</span>
                                                    </VisualEditor>
                                                    <VisualEditor id={`lang-level-${i}`} contentPath={`skills.languages[${i}].level`}>
                                                        <span style={{ color: 'var(--fg-muted)' }}>{typeof lang === 'string' ? 'VERIFIED' : lang?.level}</span>
                                                    </VisualEditor>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </React.Fragment>
                            );
                        case 'experience':
                            return visibility.experience !== false && (
                                <div key="experience" id="trail-record" className="dossier-card fade-in" style={{ gridColumn: 'span 12' }}>
                                    <div className="watermark" style={{ fontSize: '5rem', top: '20%', left: '60%' }}>NOTORIOUS</div>
                                    <VisualEditor id="exp-title-editor" contentPath="experience.title">
                                        <h2 className="title-font" style={{ fontSize: '1.8rem', borderBottom: 'var(--border-width, 1px) solid var(--timeline-line)', paddingBottom: '0.5rem', marginBottom: '2rem' }}>TRAIL RECORD</h2>
                                    </VisualEditor>
                                    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                                        <div className="timeline-draw-line" style={{ position: 'absolute', top: 0, bottom: 0, left: '7px', width: 'var(--border-width, 2px)', background: 'var(--timeline-line)' }} />
                                        {experience.map((exp: any, idx: number) => (
                                            <div key={idx} className="timeline-item-group" style={{ position: 'relative', marginBottom: idx < experience.length - 1 ? '3rem' : 0, transitionDelay: `${(idx * 0.4) + 0.3}s` }}>
                                                <div className="bullet-notch" style={{ position: 'absolute', left: '-2rem', top: '6px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--bg)', border: 'var(--border-width, 2px) solid var(--accent-red)', zIndex: 1, animationDelay: `${(idx * 0.4) + 0.3}s` }} />
                                                <VisualEditor id={`exp-date-${idx}`} contentPath={`experience[${idx}].date`}>
                                                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-red)', marginBottom: '0.4rem' }}>[ {exp.startDate} - {exp.endDate || 'AT LARGE'} ]</div>
                                                </VisualEditor>
                                                <VisualEditor id={`exp-title-${idx}`} contentPath={`experience[${idx}].title`}>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--fg)', fontFamily: "'Courier Prime', monospace" }}>{exp.title}</div>
                                                </VisualEditor>
                                                <VisualEditor id={`exp-company-${idx}`} contentPath={`experience[${idx}].company`}>
                                                    <div className="mono" style={{ fontSize: '0.9rem', color: 'var(--fg-muted)', marginBottom: '0.5rem' }}>GANG / POSSE: {exp.company}</div>
                                                </VisualEditor>
                                                {exp.responsibilities?.[0] && (
                                                    <VisualEditor id={`exp-resp-${idx}`} contentPath={`experience[${idx}].responsibilities[0]`}>
                                                        <p className="timeline-content-box typewriter" style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.6, background: 'var(--resp-bg)', padding: '1rem', borderLeft: 'var(--border-width, 2px) solid var(--resp-border)' }}>
                                                            {exp.responsibilities[0]}
                                                        </p>
                                                    </VisualEditor>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        case 'education':
                            return visibility.education !== false && (
                                <div key="education" className="dossier-card fade-in" style={{ gridColumn: 'span 12', border: 'var(--border-width, 2px) solid var(--card-border)' }}>
                                    <VisualEditor id="edu-main-title" contentPath="education.main_title">
                                        <h2 className="title-font" style={{ fontSize: '1.5rem', borderBottom: 'var(--border-width, 1px) solid var(--timeline-line)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>TRAINING & SKILLS</h2>
                                    </VisualEditor>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {(data.education || userData.education || []).map((edu: any, i: number) => (
                                            <div key={i}>
                                                <VisualEditor id={`edu-label-skillset-${i}`} contentPath="labels.skillset">
                                                    <div className="field-label">SKILLSET</div>
                                                </VisualEditor>
                                                <VisualEditor id={`edu-degree-${i}`} contentPath={`education[${i}].degree`}>
                                                    <div className="field-value" style={{ margin: 0, border: 'none' }}>{edu.degree}</div>
                                                </VisualEditor>
                                                <VisualEditor id={`edu-inst-${i}`} contentPath={`education[${i}].institution`}>
                                                    <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>LEARNED AT: {edu.institution}</div>
                                                </VisualEditor>
                                                <VisualEditor id={`edu-year-${i}`} contentPath={`education[${i}].year`}>
                                                    <div className="mono" style={{ fontSize: '0.75rem', color: '#555' }}>YEAR: {edu.graduationYear}</div>
                                                </VisualEditor>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        case 'projects':
                            return visibility.projects !== false && (
                                <div key="projects" id="mission-files" style={{ gridColumn: 'span 12', paddingTop: '2rem' }} className="fade-in">
                                    <div style={{ borderBottom: 'var(--border-width, 2px) solid var(--accent-red)', paddingBottom: '0.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <VisualEditor id="projects-title-editor" contentPath="projects.title">
                                            <h2 className="title-font" style={{ fontSize: '2.5rem', margin: 0, color: 'var(--fg)' }}>CASE FILES</h2>
                                        </VisualEditor>
                                        <VisualEditor id="label-bounty-board" contentPath="labels.bounty_board">
                                            <span className="mono" style={{ color: 'var(--accent-red)', fontSize: '0.8rem' }}>REF: BOUNTY BOARD</span>
                                        </VisualEditor>
                                    </div>
                                    <div className="case-files-grid">
                                        {projects.map((p: any, idx: number) => {
                                            const pImages = p.images || (p.image ? [p.image] : []);
                                            const techArr = p.technologiesUsed || p.technologies || [];
                                            return (
                                                <div key={idx} className="project-card folder-card" onClick={() => { if (pImages.length > 0) setExamineData({ images: pImages, index: 0, title: p.title, description: p.description, tech: techArr }) }} style={{ cursor: pImages.length > 0 ? 'pointer' : 'default' }}>
                                                    <div className="folder-tab">FILE_{String(idx + 1).padStart(3, '0')}</div>
                                                    <div className="paper-clip" /><div className="staple" />
                                                    <VisualEditor id={`project-stamp-closed-${idx}`} contentPath="stamps.case_closed">
                                                        <div className="folder-hover-stamp">CASE CLOSED</div>
                                                    </VisualEditor>
                                                    {pImages.length > 0 && (
                                                        <div className="project-stack-container">
                                                            {pImages.length > 1 && (
                                                                <div className="project-indicator-list">
                                                                    {pImages.slice(1, 4).map((img: string, i: number) => (
                                                                        <div key={i} className="project-mini-dot" style={{ transitionDelay: `${i * 0.1}s` }}><img src={img} alt="preview" /></div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {pImages.slice(0, 3).map((img: string, i: number) => (
                                                                <img key={i} src={img} alt="evidence" className="project-stacked-img" style={{ zIndex: 10 - i }} />
                                                            ))}
                                                            {pImages.length > 1 && <div className="stack-indicator">+{pImages.length - 1} MEDIA</div>}
                                                        </div>
                                                    )}
                                                    <div style={{ padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflow: 'hidden' }}>
                                                        <VisualEditor id={`project-title-${idx}`} contentPath={`projects[${idx}].title`}>
                                                            <h3 className="typewriter clamp-1" style={{ fontSize: '1.2rem', color: 'var(--accent-red)', margin: 0 }}>{p.title}</h3>
                                                        </VisualEditor>
                                                        <VisualEditor id={`project-desc-${idx}`} contentPath={`projects[${idx}].description`}>
                                                            <p className="mono clamp-2" style={{ fontSize: '0.8rem', color: 'var(--fg)', lineHeight: 1.4, margin: '0.3rem 0', opacity: 0.8 }}>{p.description || "Historical records of this operation are limited."}</p>
                                                        </VisualEditor>
                                                        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '0.4rem' }}>
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                                                {techArr.map((t: string, ti: number) => (
                                                                    <span key={ti} className="mono" style={{ fontSize: '0.55rem', background: 'var(--marquee-item-bg)', padding: '2px 5px', color: 'var(--fg-muted)', border: '1px solid rgba(0,0,0,0.1)', whiteSpace: 'nowrap' }}>{t}</span>
                                                                ))}
                                                            </div>
                                                            {pImages.length > 0 && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <VisualEditor id={`project-btn-inspect-${idx}`} contentPath="buttons.inspect">
                                                                    <button className="read-more-btn" style={{ margin: 0, padding: '4px 10px', fontSize: '0.65rem', borderRadius: '0' }}>[ INSPECT ]</button>
                                                                </VisualEditor>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        case 'additional':
                            return visibility.additional !== false && (data.certifications?.length > 0 || data.awards?.length > 0 || data.publications?.length > 0 || data.volunteerExperience?.length > 0 || data.hobbies?.length > 0) && (
                                <div key="additional" style={{ gridColumn: 'span 12', marginTop: '3rem' }}>
                                    <div style={{ borderBottom: 'var(--border-width, 2px) solid var(--accent-red)', paddingBottom: '0.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <VisualEditor id="additional-title-editor" contentPath="additional.title">
                                            <h2 className="title-font" style={{ fontSize: '2.5rem', margin: 0, color: 'var(--fg)' }}>ADDITIONAL INTEL</h2>
                                        </VisualEditor>
                                        <VisualEditor id="additional-label-field-assets" contentPath="labels.field_assets">
                                            <span className="mono" style={{ color: 'var(--accent-red)', fontSize: '0.8rem' }}>REF: FIELD ASSETS</span>
                                        </VisualEditor>
                                    </div>
                                    <div className="intel-grid">
                                        {data.certifications?.length > 0 && (
                                            <div className="dossier-card fade-in intel-card">
                                                <h3 className="title-font" style={{ fontSize: '1.4rem', borderBottom: 'var(--border-width, 1px) solid var(--timeline-line)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <VisualEditor id="additional-clearances-title" contentPath="additional.clearances_title">
                                                        <span>CLEARANCES</span>
                                                    </VisualEditor>
                                                    <VisualEditor id="stamps-verified" contentPath="stamps.verified">
                                                        <div className="stamp" style={{ fontSize: '0.5rem', transform: 'rotate(10deg)', padding: '2px 4px' }}>VERIFIED</div>
                                                    </VisualEditor>
                                                </h3>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                                    {data.certifications.map((c: any, i: number) => (
                                                        <div key={i} style={{ borderBottom: 'var(--border-width, 1px) dotted var(--timeline-line)', paddingBottom: '0.8rem' }}>
                                                            <div className="typewriter" style={{ color: 'var(--fg)', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent-red)' }}>[+]</span>{typeof c === 'string' ? c : c.name}</div>
                                                            <VisualEditor id={`additional-label-issuer-${i}`} contentPath="labels.issuer">
                                                                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.4rem', marginLeft: '1.5rem' }}>ISSUER: {c.issuer || "INDEPENDENT_AUTH"}</div>
                                                            </VisualEditor>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {data.awards?.length > 0 && (
                                            <div className="dossier-card fade-in intel-card">
                                                <h3 className="title-font" style={{ fontSize: '1.4rem', borderBottom: 'var(--border-width, 1px) solid var(--timeline-line)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <VisualEditor id="additional-commendations-title" contentPath="additional.commendations_title">
                                                        <span>COMMENDATIONS</span>
                                                    </VisualEditor>
                                                    <VisualEditor id="stamps-distinction" contentPath="stamps.distinction">
                                                        <div className="stamp" style={{ fontSize: '0.5rem', color: '#b8860b', borderColor: '#b8860b', transform: 'rotate(-5deg)', padding: '2px 4px' }}>DISTINCTION</div>
                                                    </VisualEditor>
                                                </h3>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                                    {data.awards.map((a: any, i: number) => (
                                                        <div key={i} style={{ borderBottom: 'var(--border-width, 1px) dotted var(--timeline-line)', paddingBottom: '0.8rem' }}>
                                                            <div className="typewriter" style={{ color: 'var(--fg)', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', gap: '0.5rem' }}><span style={{ color: '#b8860b' }}>★</span>{typeof a === 'string' ? a : a.title}</div>
                                                            <VisualEditor id={`additional-label-date-${i}`} contentPath="labels.date_recorded">
                                                                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.4rem', marginLeft: '1.5rem' }}>DATE RECORDED: {a.date || 'CLASSIFIED'}</div>
                                                            </VisualEditor>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {data.publications?.length > 0 && (
                                            <div className="dossier-card fade-in intel-card">
                                                <VisualEditor id="additional-protocols-title" contentPath="additional.protocols_title">
                                                    <h3 className="title-font" style={{ fontSize: '1.4rem', borderBottom: 'var(--border-width, 1px) solid var(--timeline-line)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>PROTOCOLS</h3>
                                                </VisualEditor>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                                    {data.publications.map((p: any, i: number) => (
                                                        <div key={i} style={{ borderBottom: 'var(--border-width, 1px) dotted var(--timeline-line)', paddingBottom: '0.8rem' }}>
                                                            <div className="typewriter" style={{ color: 'var(--fg)', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent-red)' }}>»</span>{typeof p === 'string' ? p : p.title}</div>
                                                            <VisualEditor id={`additional-label-source-${i}`} contentPath="labels.source">
                                                                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.4rem', marginLeft: '1.5rem' }}>SOURCE: {p.publisher || "INTEL_NET"}</div>
                                                            </VisualEditor>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {data.hobbies?.length > 0 && (
                                            <div className="dossier-card fade-in intel-card">
                                                <VisualEditor id="additional-habits-title" contentPath="additional.habits_title">
                                                    <h3 className="title-font" style={{ fontSize: '1.4rem', borderBottom: 'var(--border-width, 1px) solid var(--timeline-line)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>KNOWN HABITS</h3>
                                                </VisualEditor>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                                    {data.hobbies.map((h: string, i: number) => (
                                                        <span key={i} className="mono" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', border: '1px dashed var(--timeline-line)', color: 'var(--fg)' }}>{h.toUpperCase()}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        case 'contact':
                            return visibility.contact !== false && (
                                <div key="contact" className="fade-in" style={{ gridColumn: 'span 12', textAlign: 'center', marginTop: '4rem', padding: '2rem', borderTop: 'var(--border-width, 2px) solid var(--card-border)' }}>
                                    <VisualEditor id="footer-end-file" contentPath="footer.end_file">
                                        <div className="mono" style={{ color: 'var(--accent-red)', fontSize: '1.2rem', marginBottom: '1rem' }}>*** END OF FILE ***</div>
                                    </VisualEditor>
                                    <VisualEditor id="footer-disclaimer" contentPath="footer.disclaimer">
                                        <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--fg-muted)' }}>
                                            ANY MAN HARBORING THIS OUTLAW WILL BE PROSECUTED TO THE FULLEST EXTENT OF THE LAW.<br />
                                            © {new Date().getFullYear()} TERRITORIAL MARSHAL'S OFFICE
                                        </div>
                                    </VisualEditor>
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
            </main>

            {/* --- CUSTOM WILD WEST LIGHTBOX (EXAMINE VIEW) --- */}
            {/* --- CUSTOM WILD WEST LIGHTBOX (EXAMINE VIEW) --- */}
            <div id="west-lightbox" className={`examine-overlay ${examineData ? 'active opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setExamineData(null)}>
                <div id="west-lightbox-content" className={`examine-content ${(!examineData || examineData.images.length === 0) ? 'no-images' : ''}`} onClick={e => e.stopPropagation()}>
                    <button id="west-lightbox-close" className="close-examine" onClick={() => setExamineData(null)}><X size={20} /></button>

                    <div id="west-lightbox-photos-col" className="examine-photos" style={{ display: examineData?.images?.length ? 'flex' : 'none' }}>
                        <VisualEditor id="modal-watermark-confiscated" contentPath="global.modal_watermark">
                            <div className="watermark" style={{ color: 'rgba(255,255,255,0.05)', fontSize: '5rem' }}>CONFISCATED</div>
                        </VisualEditor>
                        <img
                            id="west-lightbox-img"
                            src={examineData?.images?.[examineData?.index || 0] || '#'}
                            alt="Evidence"
                            style={{ maxWidth: '90%', maxHeight: '80%', objectFit: 'contain', border: '1px solid #333' }}
                        />

                        <button
                            id="west-lightbox-prev"
                            className="nav-btn nav-prev"
                            onClick={() => setExamineData(d => d ? { ...d, index: (d.index - 1 + d.images.length) % d.images.length } : null)}
                            style={{ display: (examineData?.images?.length || 0) > 1 ? 'flex' : 'none' }}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            id="west-lightbox-next"
                            className="nav-btn nav-next"
                            onClick={() => setExamineData(d => d ? { ...d, index: (d.index + 1) % d.images.length } : null)}
                            style={{ display: (examineData?.images?.length || 0) > 1 ? 'flex' : 'none' }}
                        >
                            <ChevronRight size={24} />
                        </button>

                        <div style={{ position: 'absolute', bottom: '1.5rem', left: '0', right: '0', textAlign: 'center' }}>
                            <VisualEditor id="modal-photo-counter" contentPath="global.modal_counter">
                                <span id="west-lightbox-counter" className="mono" style={{ color: '#444', fontSize: '0.7rem' }}>SHOT {(examineData?.index || 0) + 1} OF {examineData?.images?.length || 0}</span>
                            </VisualEditor>
                        </div>
                    </div>

                    <div className="examine-report">
                        <div style={{ borderBottom: 'var(--border-width, 3px) solid var(--paper-fg)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                            <VisualEditor id="modal-label-incident" contentPath="labels.incident_report">
                                <div className="stamp" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>INCIDENT REPORT</div>
                            </VisualEditor>
                            <h2 id="west-lightbox-title" className="title-font" style={{ fontSize: '2rem', margin: 0, textTransform: 'uppercase' }}>{examineData?.title || 'CLASSIFIED'}</h2>
                            <VisualEditor id="modal-label-case-ref" contentPath="labels.case_ref">
                                <div id="west-lightbox-ref" className="mono" style={{ fontSize: '0.7rem', opacity: 0.6 }}>CASE REF: EX-{(examineData?.title || "CLASSIFIED").substring(0, 3).toUpperCase()}-{Math.floor(Math.random() * 900 + 100)}</div>
                            </VisualEditor>
                        </div>

                        <VisualEditor id="modal-project-desc" contentPath={`projects.modal_description`}>
                            <div id="west-lightbox-desc" className="typewriter" style={{ lineHeight: 1.8, fontSize: '1rem', color: 'var(--paper-fg)' }}>
                                {examineData?.description || 'NO_RECORD_FOUND'}
                            </div>
                        </VisualEditor>

                        <div id="west-lightbox-tech-wrapper" style={{ marginTop: '3rem', borderLeft: 'var(--border-width, 4px) solid var(--accent-red)', paddingLeft: '1.5rem', display: (examineData?.tech?.length) ? 'block' : 'none' }}>
                            <VisualEditor id="modal-label-assets" contentPath="labels.assets_recovered">
                                <div className="field-label" style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>ASSETS RECOVERED</div>
                            </VisualEditor>
                            <div id="west-lightbox-tech" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.8rem' }}>
                                {(examineData?.tech || []).map((t, i) => (
                                    <span key={i} className="mono" style={{ fontSize: '0.7rem', background: 'rgba(0,0,0,0.05)', padding: '2px 8px', border: '1px solid rgba(0,0,0,0.1)' }}>[{t}]</span>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '3rem', fontSize: '0.7rem', opacity: 0.5 }} className="mono">
                            <VisualEditor id="modal-disclaimer-sealed" contentPath="global.modal_sealed">
                                <span>THIS FILE HAS BEEN SEALED BY THE TERRITORIAL MARSHAL'S OFFICE.</span>
                            </VisualEditor>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <ReadContextProvider>
            <CustomizationProvider
                disableThemeMode={true}
                initialLightVars={{
                    '--bg': '#e6d3a8',
                    '--fg': '#3b2b1a',
                    '--fg-muted': '#6b5035',
                    '--accent-red': '#8b3a2b',
                    '--card-bg': '#d9c49a',
                    '--card-border': '#8b5a2b',
                    '--stamp-red': 'rgba(139, 58, 43, 0.7)',
                    '--hero-noise': '0.2',
                    '--paper-bg': '#e1cda0',
                    '--paper-fg': '#2c1a0c',
                    '--redacted-bg': '#3b2b1a',
                    '--marquee-bg': '#d4b886',
                    '--marquee-item-bg': '#c9ad7d',
                    '--marquee-border': '#8b5a2b',
                    '--timeline-line': '#5c3e21',
                    '--resp-bg': '#ecd9b3',
                    '--resp-border': '#8b5a2b',
                    '--card-shadow': 'rgba(0,0,0,0.2)',
                    '--font-main': "'Rye', serif",
                    '--radius': '0px',
                    '--border-width': '2px',
                    '--font-size-base': '1rem',
                    '--letter-spacing': '0px'
                }}
            >
                <BentoPortfolio />
                <PortfolioCustomizer />
            </CustomizationProvider>
        </ReadContextProvider>
    );
}