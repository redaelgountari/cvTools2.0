"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useExportHTML } from "../../hooks/useExportHTML";

export default function LuxuryPortfolio() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { handleExportHTML, isExporting } = useExportHTML("ALEX_NOVA");

    useEffect(() => {
        // 1. Custom Cursor Functionality
        const cursorDot = document.getElementById("cursor-dot");
        const cursorRing = document.getElementById("cursor-ring");
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let isHovering = false;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .hover-trigger, .project-row')) {
                isHovering = true;
                if (cursorDot) cursorDot.style.opacity = '0';
                if (cursorRing) {
                    cursorRing.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
                    cursorRing.style.backgroundColor = 'var(--gold-dim)';
                }
            } else {
                isHovering = false;
                if (cursorDot) cursorDot.style.opacity = '1';
                if (cursorRing) {
                    cursorRing.style.backgroundColor = 'transparent';
                }
            }
        };

        const animateCursor = () => {
            // Smooth follow for the ring
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            if (cursorDot && !isHovering) {
                cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
            if (cursorRing && !isHovering) {
                cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) scale(1)`;
            }

            requestAnimationFrame(animateCursor);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        const animFrame = requestAnimationFrame(animateCursor);

        // 2. Navigation Scroll Effect
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        // 3. Intersection Observer for Reveal Animations & Active Section
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.id) {
                        setActiveSection(entry.target.id);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal, section[id]').forEach((el) => {
            revealObserver.observe(el);
        });

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animFrame);
            revealObserver.disconnect();
        };
    }, []);

    const scrollTo = (id: string, e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="luxury-portfolio min-h-screen relative selection:bg-[var(--gold)] selection:text-[var(--navy)]">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&family=EB+Garamond:ital@0;1&display=swap');

                .luxury-portfolio {
                    /* Color Palette */
                    --navy: #080d1a;
                    --navy-mid: #0e1628;
                    --navy-light: #162040;
                    --gold: #c9a84c;
                    --gold-light: #e8c97a;
                    --gold-dim: rgba(201,168,76,0.15);
                    --fg: #f0ece4;
                    --fg-muted: rgba(240,236,228,0.45);
                    --border: rgba(201,168,76,0.12);
                    --border-hover: rgba(201,168,76,0.35);

                    background: var(--navy);
                    color: var(--fg);
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 300;
                    overflow-x: hidden;
                    cursor: none !important;
                }

                .luxury-portfolio * {
                    cursor: none !important;
                }

                /* Background Texture */
                .luxury-bg {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: 
                        radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.03) 0%, transparent 60%), 
                        radial-gradient(ellipse at 80% 20%, rgba(14,22,40,0.8) 0%, transparent 50%);
                    pointer-events: none;
                    z-index: 0;
                }

                /* Typography Classes */
                .font-cg { font-family: 'Cormorant Garamond', serif; }
                .font-eb { font-family: 'EB Garamond', serif; }
                .font-mont { font-family: 'Montserrat', sans-serif; }

                /* Custom Cursor */
                #cursor-dot {
                    position: fixed;
                    top: 0; left: 0;
                    width: 8px; height: 8px;
                    background-color: var(--gold);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    margin: -4px 0 0 -4px;
                    transition: opacity 0.2s ease;
                }
                #cursor-ring {
                    position: fixed;
                    top: 0; left: 0;
                    width: 28px; height: 28px;
                    border: 1px solid var(--gold-light);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    margin: -14px 0 0 -14px;
                    transition: transform 0.1s ease-out, background-color 0.3s ease;
                    will-change: transform;
                }

                /* Animations */
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes pulseArrow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(4px); }
                }
                @keyframes pulseDot {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.4); }
                    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(201, 168, 76, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(201, 168, 76, 0); }
                }
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }

                /* Hero Animation Classes */
                .hero-left  { animation: fadeUp 1.2s ease forwards; opacity: 0; }
                .hero-divider { animation: fadeIn 1.8s ease forwards 0.4s; opacity: 0; }
                .hero-right { animation: fadeUp 1.2s ease forwards 0.3s; opacity: 0; }
                .arrow-bounce { animation: pulseArrow 2s infinite ease-in-out; }
                .status-dot { animation: pulseDot 2s infinite ease-in-out; }
                .marquee { white-space: nowrap; animation: marquee 30s linear infinite; }

                /* Scroll Reveal */
                .reveal {
                    opacity: 0;
                    transform: translateY(32px);
                    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .reveal.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Navigation */
                .nav-glass {
                    background: transparent;
                    transition: background 0.5s ease, backdrop-filter 0.5s ease;
                }
                .nav-glass.scrolled {
                    background: rgba(8,13,26,0.92);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }
                .nav-link {
                    position: relative;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0%;
                    height: 1px;
                    background-color: var(--gold);
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after, .nav-link.active::after {
                    width: 100%;
                }

                /* Project Rows */
                .project-row {
                    position: relative;
                    transition: all 0.4s ease;
                    border-bottom: 1px solid var(--border);
                }
                .project-row:hover {
                    background: var(--gold-dim);
                    padding-left: 24px;
                    border-left: 1px solid var(--gold);
                }
                .project-name {
                    transition: color 0.4s ease;
                }
                .project-row:hover .project-name {
                    color: var(--gold-light);
                }
                .project-desc {
                    max-height: 0;
                    opacity: 0;
                    overflow: hidden;
                    transition: max-height 0.4s ease, opacity 0.4s ease, margin-top 0.4s ease;
                }
                .project-row:hover .project-desc {
                    max-height: 80px;
                    opacity: 1;
                    margin-top: 12px;
                }

                /* Buttons */
                .luxury-btn {
                    border: 1px solid var(--border);
                    padding: 14px 52px;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 300;
                    font-size: 0.7rem;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                    color: var(--fg);
                    background: transparent;
                    transition: all 0.4s ease;
                }
                .luxury-btn:hover {
                    border-color: var(--gold);
                    color: var(--gold);
                    background: var(--gold-dim);
                }

                /* Side Navigation Dots */
                .nav-dot {
                    background: rgba(240,236,228,0.2);
                    width: 2px;
                    height: 6px;
                    border-radius: 2px;
                    transition: all 0.4s ease;
                }
                .nav-dot.active {
                    background: var(--gold);
                    height: 24px;
                }
            `}} />

            {/* Top Pinned Rule */}
            <div className="fixed top-0 left-0 w-full h-[1px] bg-[var(--border)] z-50"></div>

            <div className="luxury-bg"></div>

            {/* Custom Cursor Elements */}
            <div id="cursor-dot"></div>
            <div id="cursor-ring"></div>

            {/* Header / Navigation */}
            <header className={`fixed top-0 left-0 w-full z-40 nav-glass border-b border-[var(--border)] px-8 md:px-16 flex items-center justify-between h-20 ${isScrolled ? 'scrolled' : ''}`}>
                <a href="#hero" onClick={(e) => scrollTo('hero', e)} className="font-cg font-light text-[1.4rem] tracking-[0.3em] text-[var(--gold)] uppercase hover:text-[var(--gold-light)] transition-colors">
                    ALEX NOVA
                </a>
                <nav className="flex items-center gap-8">
                    {['about', 'work', 'contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={(e) => scrollTo(item, e)}
                            className={`hidden md:block nav-link text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${activeSection === item ? 'text-[var(--gold)] active' : 'text-[var(--fg-muted)] hover:text-[var(--gold)]'}`}
                        >
                            {item}
                        </a>
                    ))}
                    <div className="hidden md:block w-[1px] h-[12px] bg-[var(--border)] ml-4 mr-0"></div>
                    <button
                        data-export-button
                        onClick={handleExportHTML}
                        className="font-mont text-[0.6rem] uppercase tracking-[0.2em] text-[var(--gold)] border border-[var(--gold)]/30 px-4 py-2 hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-all cursor-none"
                    >
                        {isExporting ? 'EXPORTING...' : 'EXPORT HTML'}
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="relative z-10 w-full flex flex-col items-center">

                {/* HERO SECTION */}
                <section id="hero" className="w-full min-h-screen flex items-center justify-center relative px-8">
                    {/* Top Right Availability */}
                    <div className="absolute top-32 right-8 md:right-16 flex items-center gap-3 text-[0.65rem] tracking-[0.2em] font-light text-[var(--fg-muted)] uppercase">
                        Available for collaboration
                        <div className="w-2 h-2 rounded-full bg-[var(--gold)] status-dot"></div>
                    </div>

                    <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 mt-20">

                        {/* Left Side */}
                        <div className="hero-left text-center md:text-left flex-1 flex flex-col items-center md:items-end md:pr-16 lg:pr-32">
                            <h1 className="font-cg text-[clamp(4rem,10vw,6rem)] leading-[0.9] tracking-[0.15em] uppercase font-light">
                                ALEX<br />NOVA
                            </h1>
                            <div className="mt-8 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--fg-muted)] text-center md:text-right flex flex-col gap-1">
                                <span>Berlin, DE</span>
                                <span>Est. 2018</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hero-divider hidden md:block w-[1px] h-[30vh] min-h-[200px] bg-[var(--gold)] opacity-40"></div>

                        {/* Right Side */}
                        <div className="hero-right text-center md:text-left flex-1 flex flex-col items-center md:items-start md:pl-16 lg:pl-32">
                            <h2 className="font-cg italic text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] font-light text-[var(--gold-light)]">
                                Creative<br />Developer<br /><span className="text-[var(--fg)]">& Digital Artist</span>
                            </h2>
                            <div className="mt-8 font-eb italic text-[1.1rem] md:text-[1.3rem] text-[var(--fg-muted)] max-w-[280px]">
                                "I craft digital experiences that feel inevitable"
                            </div>
                        </div>
                    </div>

                    {/* Bottom Explore */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[0.6rem] uppercase tracking-[0.3em] font-light text-[var(--gold)] opacity-60">
                        <div className="arrow-bounce">↓</div>
                        <button onClick={(e) => scrollTo('about', e)} className="hover:text-[var(--gold-light)] transition-colors">Explore</button>
                    </div>
                </section>

                {/* ABOUT SECTION */}
                <section id="about" className="w-full py-32 md:py-48 px-8 flex justify-center">
                    <div className="w-full max-w-[1100px] reveal">
                        <div className="text-[0.65rem] uppercase tracking-[0.35em] text-[var(--gold)] mb-4">
                            / ABOUT /
                        </div>
                        <div className="w-[40px] h-[1px] bg-[var(--gold)] mb-12 opacity-50"></div>

                        <h2 className="font-cg font-semibold text-[clamp(3rem,8vw,4.5rem)] leading-[1.05] text-white max-w-[800px] mb-12">
                            I build things that feel <span className="italic text-[var(--gold)] font-light">alive</span>
                        </h2>

                        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8">
                            <div className="flex-1 max-w-[560px]">
                                <p className="text-[0.9rem] text-[var(--fg-muted)] leading-[1.9] font-light">
                                    Specializing in the intersection of design and engineering, I create immersive digital environments that prioritize aesthetics, precision, and emotional resonance. My work spans high-end portfolio platforms, interactive WebGL installations, and editorial e-commerce experiences.
                                </p>
                            </div>

                            <div className="flex items-center gap-12 lg:gap-20">
                                <div className="flex flex-col">
                                    <span className="font-cg text-[5rem] font-light text-[var(--gold)] leading-none">6+</span>
                                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--fg-muted)] mt-2">Years of Craft</span>
                                </div>
                                <div className="w-[1px] h-[80px] bg-[var(--gold)] opacity-20"></div>
                                <div className="flex flex-col">
                                    <span className="font-cg text-[5rem] font-light text-[var(--gold)] leading-none">40+</span>
                                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--fg-muted)] mt-2">Projects Delivered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SKILLS SECTION */}
                <section id="work" className="w-full pt-32 pb-16 flex flex-col items-center">
                    {/* Marquee */}
                    <div className="w-full overflow-hidden border-y border-[var(--border)] py-8 mb-32 flex whitespace-nowrap bg-[var(--gold)]/5">
                        <div className="marquee font-cg italic text-[2.5rem] text-[var(--gold)] opacity-50 tracking-wide">
                            THREE.JS · WEBGL · REACT · NEXT.JS · GSAP · BLENDER · MOTION · GLSL · CREATIVE DIRECTION ·
                            THREE.JS · WEBGL · REACT · NEXT.JS · GSAP · BLENDER · MOTION · GLSL · CREATIVE DIRECTION ·
                        </div>
                    </div>

                    <div className="w-full max-w-[1100px] px-8 grid grid-cols-1 md:grid-cols-3 gap-16 reveal">
                        {[
                            { title: "ENGINEERING", items: ["Creative Coding", "WebGL / Three.js", "React & Next.js", "Performance Tech"] },
                            { title: "DESIGN", items: ["Art Direction", "UI / UX Design", "Motion Graphics", "3D Modeling"] },
                            { title: "APPROACH", items: ["Concept First", "Pixel Perfection", "Fluid Interactivity", "Relentless Polish"] }
                        ].map((category, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="font-mont text-[0.65rem] uppercase text-[var(--gold)] tracking-[0.3em] mb-4">{category.title}</span>
                                <div className="w-[32px] h-[1px] bg-[var(--gold)] opacity-50 mb-8"></div>
                                <div className="flex flex-col gap-4">
                                    {category.items.map((item, j) => (
                                        <div key={j} className="font-cg font-light text-[1.1rem] text-[var(--fg-muted)] hover:text-[var(--gold)] transition-colors duration-300 cursor-none">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section className="w-full py-24 flex justify-center px-8 border-b border-[var(--border)]">
                    <div className="w-full max-w-[1100px] flex flex-col reveal">
                        <div className="flex justify-between items-baseline mb-8">
                            <h2 className="font-cg italic text-[1rem] text-[var(--gold)]">Selected Work</h2>
                            <span className="font-mont text-[0.6rem] text-[var(--fg-muted)] tracking-[0.2em]">2024 — 2025</span>
                        </div>
                        <div className="w-full h-[1px] bg-[var(--border)] mb-4"></div>

                        {/* Project List */}
                        <div className="flex flex-col">
                            {[
                                { id: "01", title: "VOID", desc: "An interactive WebGL art installation exploring the concept of emptiness through fluid particle simulations and reactive audio landscapes.", tags: "THREE.JS · GLSL · GSAP", year: "2024" },
                                { id: "02", title: "AETHER", desc: "A luxury e-commerce concept for high-end digital fashion, featuring real-time 3D garment rendering and fluid navigation.", tags: "NEXT.JS · WEBGL · TAILWIND", year: "2024" },
                                { id: "03", title: "NEXUS", desc: "A creative agency portfolio platform built with performance in mind, utilizing advanced routing transitions and custom shaders.", tags: "REACT · FRAMER MOTION · SCSS", year: "2025" }
                            ].map((project, i) => (
                                <div key={i} className="project-row flex justify-between py-12 items-start md:items-center cursor-none group">
                                    <div className="flex gap-12 w-full pr-12">
                                        <span className="font-cg font-light text-[1rem] text-[var(--gold)] opacity-40 shrink-0 mt-2">{project.id}</span>
                                        <div className="flex flex-col">
                                            <h3 className="project-name font-cg font-semibold text-[2.8rem] leading-none text-white tracking-widest uppercase">
                                                {project.title}
                                            </h3>
                                            <p className="project-desc font-mont font-light text-[0.75rem] text-[var(--fg-muted)] leading-relaxed max-w-[600px] mb-2">
                                                {project.desc}
                                            </p>
                                            <div className="font-mont text-[0.6rem] tracking-[0.2em] text-[var(--fg-muted)] uppercase opacity-60 mt-1">
                                                {project.tags}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center shrink-0">
                                        <span className="font-mont text-[0.7rem] text-[var(--fg-muted)] opacity-60">{project.year}</span>
                                        <span className="text-[var(--gold)] font-light -mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section id="contact" className="w-full py-40 flex justify-center px-8 text-center bg-gradient-to-t from-[#04060d] to-transparent">
                    <div className="w-full max-w-[800px] flex flex-col items-center reveal">
                        <div className="text-[0.65rem] uppercase tracking-[0.35em] text-[var(--gold)] mb-12">
                            / GET IN TOUCH /
                        </div>

                        <h2 className="font-cg font-light text-[clamp(3.5rem,8vw,8rem)] leading-[1] text-white tracking-[0.05em] mb-12">
                            Let's create<br />something<br />
                            <span className="italic text-[var(--gold)]">extraordinary</span>
                        </h2>

                        <p className="font-mont font-light text-[0.9rem] text-[var(--fg-muted)] max-w-[400px] mb-16">
                            Currently accepting new projects and collaborations for 2026. Available worldwide.
                        </p>

                        <button className="luxury-btn">
                            Initiate Dialogue
                        </button>

                        <div className="flex items-center gap-6 mt-32 font-mont text-[0.65rem] uppercase tracking-[0.2em] text-[var(--fg-muted)] opacity-60">
                            <a href="#" className="hover:text-[var(--gold)] hover:opacity-100 transition-colors">Instagram</a>
                            <div className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-30"></div>
                            <a href="#" className="hover:text-[var(--gold)] hover:opacity-100 transition-colors">Twitter</a>
                            <div className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-30"></div>
                            <a href="#" className="hover:text-[var(--gold)] hover:opacity-100 transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="w-full py-8 px-8 border-t border-[var(--border)] flex justify-between items-center text-[0.65rem] uppercase tracking-[0.2em] bg-[#04060d]">
                    <span className="text-[var(--gold)] opacity-80 font-mont">ALEX NOVA</span>
                    <span className="font-cg italic text-[0.9rem] text-[var(--fg-muted)] tracking-wider lowercase opacity-60">Crafted with intention</span>
                    <span className="text-[var(--fg-muted)] opacity-60 font-mont">Berlin, Germany</span>
                </footer>

                {/* RIGHT SIDE INDICATOR */}
                <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-40 hidden md:flex mix-blend-difference">
                    {['hero', 'about', 'work', 'contact'].map((item) => (
                        <div key={item} className="group relative flex items-center justify-center">
                            <div className={`nav-dot ${activeSection === item ? 'active' : ''}`}></div>
                            <div className={`absolute right-6 font-mont text-[0.55rem] uppercase tracking-[0.2em] text-[var(--fg)] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap ${activeSection === item ? '!opacity-100 !translate-x-0' : ''}`}>
                                {item === 'hero' ? 'Start' : item}
                            </div>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
