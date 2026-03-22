"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const projects = [
    { id: "01", name: "Void", stack: "Three.js, GLSL, GSAP", description: "An interactive WebGL art installation exploring dark matter.", color: "rgba(0, 50, 200, 0.08)" },
    { id: "02", name: "Pulse", stack: "Web Audio API, R3F, Shaders", description: "Real-time generative music visualizer reacting to audio input.", color: "rgba(255, 60, 0, 0.08)" },
    { id: "03", name: "Drift", stack: "Next.js, R3F, Lenis", description: "A meditative endless 3D scroll experience.", color: "rgba(255, 255, 255, 0.08)" }
];

export default function Overlay() {
    const [currentSection, setCurrentSection] = useState(0);
    const isAnimating = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsCount = 5;

    const updateBlob = (index: number) => {
        const event = new CustomEvent("portfolio-section-change", { detail: { index } });
        window.dispatchEvent(event);
    };

    const goToSection = (index: number) => {
        if (isAnimating.current || index === currentSection || index < 0 || index >= sectionsCount) return;

        isAnimating.current = true;

        // Safety Force Reset
        const timer = setTimeout(() => { isAnimating.current = false; }, 2000);

        const sections = containerRef.current?.querySelectorAll('section');
        if (!sections) return;

        const leaving = sections[currentSection] as HTMLElement;
        const entering = sections[index] as HTMLElement;
        const direction = index > currentSection ? 1 : -1;

        // cinematic light cut
        gsap.to('#flash', { opacity: 0.15, duration: 0.05, yoyo: true, repeat: 1 });

        // exit
        gsap.to(leaving.querySelectorAll('.cinematic-text'), {
            opacity: 0,
            x: direction * 100,
            stagger: 0.02,
            duration: 0.4,
            ease: 'power2.in'
        });

        gsap.to(leaving, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                leaving.style.display = 'none';
                leaving.style.pointerEvents = 'none';
            }
        });

        // enter
        gsap.fromTo(entering,
            { opacity: 0, x: direction * -100 },
            {
                opacity: 1, x: 0,
                display: 'flex',
                duration: 0.8,
                ease: 'expo.out',
                delay: 0.2,
                onStart: () => {
                    entering.style.display = 'flex';
                    entering.style.pointerEvents = 'auto';

                    gsap.fromTo(entering.querySelectorAll('.cinematic-wipe-target'),
                        { clipPath: 'inset(0 100% 0 0)' },
                        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'expo.inOut' }
                    );

                    gsap.fromTo(entering.querySelectorAll('.cinematic-text'),
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
                    );
                },
                onComplete: () => {
                    clearTimeout(timer);
                    setCurrentSection(index);
                    isAnimating.current = false;
                    updateBlob(index);
                }
            }
        );
    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isAnimating.current) return;
            if (Math.abs(e.deltaY) < 10) return;
            if (e.deltaY > 0) goToSection(currentSection + 1);
            else goToSection(currentSection - 1);
        };

        const handleKey = (e: KeyboardEvent) => {
            if (isAnimating.current) return;
            if (e.key === "ArrowDown" || e.key === "ArrowRight") goToSection(currentSection + 1);
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") goToSection(currentSection - 1);
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKey);
        };
    }, [currentSection]);

    useEffect(() => {
        updateBlob(0);
        // Initial Reveal
        gsap.fromTo('#hero .cinematic-wipe-target',
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'expo.inOut', delay: 0.5 }
        );
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full text-white overflow-hidden pointer-events-none">
            <div id="project-wash" className="fixed inset-0 transition-opacity duration-1000 z-[-1] opacity-0" />

            {/* 01: HERO */}
            <section id="hero" className="absolute inset-0 flex items-center justify-center p-20 z-10" style={{ position: 'fixed', display: 'flex', pointerEvents: 'auto' }}>
                <div className="absolute left-10 text-[25vw] font-bold text-white/[0.04] pointer-events-none uppercase -z-10 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>01</div>
                <div className="w-full relative flex flex-col items-center">
                    <div className="w-full flex justify-between items-end mb-10 translate-y-[-100px] cinematic-text">
                        <div className="text-left font-mono">
                            <span className="text-[0.6rem] uppercase tracking-[0.4em] text-[#ff3c00] block mb-2">Portfolio // 2026</span>
                            <p className="text-[0.7rem] max-w-[340px] text-white/40">Cinematic digital engineering and high-end motion design.</p>
                        </div>
                        <div className="text-right font-mono">
                            <span className="text-[0.7rem] text-white/40">Alex Nova _</span>
                        </div>
                    </div>
                    <h1 className="text-[clamp(4.5rem,15vw,20rem)] font-extrabold uppercase leading-[0.85] tracking-tighter cinematic-wipe-target" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        CREATIVE <br /> <span className="text-outline">ENGINEER</span>
                    </h1>
                </div>
            </section>

            {/* 02: BIO */}
            <section className="absolute inset-0 flex items-center px-32 opacity-0" style={{ position: 'fixed', display: 'none', pointerEvents: 'none' }}>
                <div className="absolute right-10 text-[25vw] font-bold text-white/[0.04] pointer-events-none uppercase -z-10 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>01</div>
                <div className="max-w-2xl ml-auto text-right">
                    <span className="text-[0.5rem] uppercase tracking-[0.5em] text-[#ff3c00] font-mono block mb-6 cinematic-text">Origin.Process</span>
                    <h2 className="text-[12vw] font-extrabold leading-[0.85] uppercase mb-10 cinematic-wipe-target" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        MERGING ART <br /> <span className="text-outline">WITH LOGIC</span>
                    </h2>
                    <p className="font-mono text-[0.7rem] max-w-[400px] text-white/40 ml-auto leading-relaxed cinematic-text">
                        Specializing in performance-driven WebGL and fluid motion systems for the modern web.
                    </p>
                </div>
            </section>

            {/* 03: MATRIX */}
            <section className="absolute inset-0 flex items-center px-32 opacity-0" style={{ position: 'fixed', display: 'none', pointerEvents: 'none' }}>
                <div className="w-full relative px-20">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 text-[25vw] font-bold text-white/[0.04] pointer-events-none uppercase -z-10 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>02</div>
                    <span className="text-[0.5rem] uppercase tracking-[0.5em] text-[#ff3c00] font-mono block mb-6 cinematic-text">Tech.Expertise</span>
                    <h2 className="text-[12vw] font-extrabold leading-[0.85] uppercase mb-16 cinematic-wipe-target" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        CORE <span className="text-outline">MATRIX</span>
                    </h2>
                    <div className="grid grid-cols-3 gap-20 cinematic-text">
                        {[
                            { l: "CORE", i: "Three.js // WebGL // GLSL // Shaders" },
                            { l: "ARCH", i: "React // Next // TS // GSAP" },
                            { l: "MOTION", i: "Lenis // Frame // Web Audio" }
                        ].map((s, i) => (
                            <div key={i} className="border-l border-white/5 pl-8">
                                <span className="text-[0.5rem] uppercase tracking-[0.4em] text-white/20 font-mono block mb-6">{s.l}</span>
                                <p className="font-mono text-[0.65rem] text-white/40 uppercase tracking-[0.2em] leading-loose">{s.i}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 04: MISSIONS */}
            <section className="absolute inset-0 flex items-center justify-center p-24 opacity-0" style={{ position: 'fixed', display: 'none', pointerEvents: 'none' }}>
                <div className="w-full max-w-7xl">
                    <span className="text-[0.5rem] uppercase tracking-[0.5em] text-[#ff3c00] font-mono block mb-8 cinematic-text">Active.Logs</span>
                    <h2 className="text-[10vw] font-extrabold leading-[0.85] uppercase mb-16 cinematic-wipe-target" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>MISSIONS</h2>
                    <div className="grid grid-cols-3 gap-8 cinematic-text">
                        {projects.map((p, i) => (
                            <div
                                key={i}
                                className="group border border-white/5 p-10 h-[380px] flex flex-col justify-between hover:border-[#ff3c00]/40 transition-all duration-700 bg-black/10 backdrop-blur-sm"
                                onMouseEnter={() => {
                                    const wash = document.getElementById('project-wash');
                                    if (wash) { wash.style.backgroundColor = p.color; wash.style.opacity = '1'; }
                                }}
                                onMouseLeave={() => {
                                    const wash = document.getElementById('project-wash');
                                    if (wash) wash.style.opacity = '0';
                                }}
                            >
                                <span className="text-3xl font-bold text-[#ff3c00]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{p.id}</span>
                                <div>
                                    <h3 className="text-4xl font-extrabold uppercase mb-2 leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>{p.name}</h3>
                                    <p className="font-mono text-[0.5rem] text-white/30 uppercase tracking-[0.3em]">{p.stack}</p>
                                </div>
                                <button className="text-[0.5rem] uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors text-left flex items-center gap-2">Initiate Access ↗</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 05: CONTACT */}
            <section className="absolute inset-0 flex flex-col items-center justify-center opacity-0" style={{ position: 'fixed', display: 'none', pointerEvents: 'none' }}>
                <div className="text-center">
                    <span className="text-[0.5rem] uppercase tracking-[0.5em] text-[#ff3c00] font-mono block mb-10 cinematic-text">Link.Initiated</span>
                    <h2 className="text-[10vw] font-extrabold leading-[0.85] uppercase mb-16 cinematic-text" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        THE <span className="text-outline">FUTURE</span>
                    </h2>
                    <button className="px-16 py-7 border border-white/5 text-[0.6rem] uppercase tracking-[0.6em] font-mono group hover:border-[#ff3c00] hover:text-[#ff3c00] transition-all duration-700 cinematic-text">
                        Establish Protocol
                    </button>
                    <p className="font-mono text-[0.5rem] text-white/10 uppercase tracking-[0.4em] mt-24 cinematic-text">Currently based in Berlin // Global Availability</p>
                </div>
            </section>

            {/* Reel Progress Nav */}
            <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-6 pointer-events-auto">
                <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] rotate-90 translate-y-[-60px] origin-right whitespace-nowrap">Scene 0{currentSection + 1} / 05</div>
                <div className="flex flex-col gap-4">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            onClick={() => goToSection(i)}
                            className="group flex flex-col items-end gap-1 cursor-pointer"
                        >
                            <div className={`w-1 rounded-full transition-all duration-700 ${i === currentSection ? 'h-8 bg-[#ff3c00] shadow-[0_0_10px_#ff3c00]' : 'h-1.5 bg-white/10 group-hover:bg-white/40'}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
