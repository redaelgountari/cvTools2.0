"use client";

import React, { useContext, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { ReadContext } from "@/app/GenComponents/ReadContext";
import ReadContextProvider from "@/app/GenComponents/ReadContextProvider";
import { 
    Send, Github, Linkedin, ExternalLink, 
    Book, Coffee, PenTool, Lightbulb 
} from 'lucide-react';
import styles from './page.module.css';

// --- HAND DRAWN BUBBLE COMPONENT ---
const HandDrawnBubble = ({ children, x, y, delay = 0 }: { children: React.ReactNode, x: string, y: string, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <motion.div 
            ref={ref}
            className={styles.skillBubble}
            style={{ left: x, top: y }}
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, delay }}
        >
            <svg viewBox="0 0 120 60" style={{ position: 'absolute', zIndex: -1, width: '140%', height: '140%', top: '-20%', left: '-20%' }}>
                <motion.path 
                    d="M15,30 C15,12 40,8 60,8 C85,8 105,15 105,30 C105,45 80,52 60,52 C35,52 15,42 15,30 M18,28 C18,15 45,12 65,12"
                    fill="none"
                    stroke="#7a7a7a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: delay + 0.2 }}
                />
            </svg>
            <span style={{ position: 'relative' }}>{children}</span>
        </motion.div>
    );
};

// --- HAND DRAWN DOODLE COMPONENT ---
const DoodleAccent = ({ type, x, y, delay = 0, rotate = 0, size = 40 }: { type: 'arrow' | 'star' | 'circle' | 'squiggle', x: string, y: string, delay?: number, rotate?: number, size?: number }) => {
    let path = "";
    if (type === 'arrow') path = "M5,20 Q15,10 35,20 M25,10 L35,20 L25,30";
    else if (type === 'star') path = "M20,5 L25,15 L35,15 L27,22 L30,35 L20,27 L10,35 L13,22 L5,15 L15,15 Z M19,4 L24,14 L34,16 L26,23 L29,36 L20,28 L11,36 L14,23 L6,16 L16,14 Z";
    else if (type === 'circle') path = "M20,5 C5,5 5,35 20,35 C35,35 35,5 20,5 M18,3 C3,8 8,38 22,33 C33,28 32,8 18,3";
    else if (type === 'squiggle') path = "M5,20 Q10,5 20,20 T35,20 T50,20";

    return (
        <div style={{ position: 'absolute', left: x, top: y, width: size, height: size, zIndex: 0, opacity: 0.6, transform: `rotate(${rotate}deg)`, pointerEvents: 'none' }}>
            <svg viewBox="0 0 40 40" width="100%" height="100%" style={{ overflow: 'visible' }}>
                <motion.path 
                    d={path} 
                    fill="none" 
                    stroke="var(--pencil-gray)" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ strokeDasharray: 200, strokeDashoffset: 200 }} 
                    whileInView={{ strokeDashoffset: 0 }} 
                    transition={{ duration: 1.2, delay, ease: "easeInOut" }} 
                    viewport={{ once: true }}
                />
            </svg>
        </div>
    );
};

const SketchbookPortfolioContent = () => {
    const { AnlysedCV, isLoading } = useContext(ReadContext);
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    
    // Scroll progress for the entire page
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 40 });

    // Fallback Mock Data
    const mockData = {
        personalInfo: { fullName: "Alex Sketcher", title: "Full-Stack Craftsman", bio: "Designing with ink, building with code. I turn messy sketches into clean digital products." },
        skills: { technical: ["React", "CSS Modules", "SVG Math", "Framer Motion", "Next.js", "Node", "PostgreSQL", "Design Systems"] },
        projects: [
            { title: "Inkflow App", description: "Digital journaling with real-time ink simulation.", link: "#" },
            { title: "Nostalgia CSS", description: "A library of 90s-inspired hand-drawn UI components.", link: "#" },
            { title: "Draft Board", description: "Collaborative sketching for remote product teams.", link: "#" }
        ],
        experience: [
            { title: "Lead Interactive Dev", company: "Draft Studio", year: "2021 - Present", description: "Pioneering hand-drawn aesthetic web experiences." },
            { title: "Frontend Artisan", company: "Sketch & Co", year: "2019 - 2021", description: "Bridging the gap between fine art and web engineering." }
        ]
    };

    const data = AnlysedCV || mockData;
    const personal = data.personalInfo || mockData.personalInfo;
    const skills = data.skills?.technical?.slice(0, 8) || mockData.skills.technical;
    const projects = data.projects?.slice(0, 3) || mockData.projects;
    const experience = (data.experience || mockData.experience).slice(0, 4);

    const [typedName, setTypedName] = useState('');
    useEffect(() => {
        if (isLoading) return;
        const name = personal.fullName?.toUpperCase() || "CREATIVE MIND";
        let i = 0;
        const interval = setInterval(() => {
            if (i <= name.length) {
                setTypedName(name.substring(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 120);
        return () => clearInterval(interval);
    }, [isLoading, personal.fullName]);

    return (
        <div ref={containerRef} className={styles.notebookContainer}>
            <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Patrick+Hand&display=swap" rel="stylesheet" />
            
            <div className={styles.paper}>
                {isLoading ? (
                    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', fontFamily: 'Patrick Hand', fontSize: '1.5rem', opacity: 0.5 }}>
                        Drawing the lines...
                    </div>
                ) : (
                    <>
                        {/* HERO SECTION */}
                        <section className={styles.section} id="hero">
                            <div className={styles.heroName}>
                                {typedName}
                                <motion.span 
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className={styles.cursor}
                                />
                            </div>
                            <div style={{ fontSize: '1.4rem', color: '#ff4d4d', marginTop: '10px', fontFamily: 'Caveat' }}>
                                {"~ "}{personal.title || "Interactive Arts & Code"}
                            </div>
                            <p className={styles.bio}>
                                {data.professionalSummary || personal.bio}
                            </p>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, type: "spring" }}
                                className={styles.doodle}
                            >
                                <Coffee size={100} strokeWidth={1} color="#5d4037" />
                                <div style={{ fontSize: '0.7rem', textAlign: 'center', opacity: 0.6, fontFamily: 'Patrick Hand' }}>* caffeinating *</div>
                            </motion.div>
                        </section>

                        {/* SKILLS SECTION (Mind Map) */}
                        <section className={styles.section} id="skills">
                            <h2 style={{ textDecoration: 'underline wavy #7a7a7a', margin: '40px 0', position: 'relative', zIndex: 10 }}>The Mind Map</h2>
                            
                            <DoodleAccent type="arrow" x="30%" y="-20px" rotate={45} delay={0.5} />
                            <DoodleAccent type="star" x="80%" y="20px" rotate={-10} delay={0.7} />
                            
                            <div className={styles.skillsMap}>
                                {/* Connecting Lines SVG */}
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                                    <motion.path 
                                        d="M400,200 Q280,120 150,50 M390,190 Q520,80 700,50 M380,210 Q280,280 150,350 M410,210 Q580,280 700,350 M400,180 Q380,110 400,40 M400,220 Q420,290 400,370 M380,190 Q220,180 50,200 M420,200 Q620,220 800,200"
                                        className={styles.svgPath}
                                        whileInView={{ strokeDashoffset: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 2.5, ease: "easeInOut" }}
                                    />
                                </svg>

                                <HandDrawnBubble x="40%" y="45%" delay={0}>CENTRAL</HandDrawnBubble>
                                {skills.map((skill: string, i: number) => {
                                    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
                                    const radius = 170;
                                    const angle = angles[i] * (Math.PI / 180);
                                    const x = `calc(40% + ${Math.cos(angle) * (radius + (i%2*30))}px)`;
                                    const y = `calc(45% + ${Math.sin(angle) * radius}px)`;
                                    return (
                                        <HandDrawnBubble key={i} x={x} y={y} delay={0.3 + i * 0.15}>
                                            {skill}
                                        </HandDrawnBubble>
                                    );
                                })}
                            </div>
                        </section>

                        {/* PROJECTS SECTION */}
                        <section className={styles.section} id="projects">
                            <h2 style={{ textDecoration: 'underline' }}>Pinned Ideas</h2>
                            <DoodleAccent type="circle" x="150px" y="0px" rotate={0} delay={0.2} />
                            <DoodleAccent type="squiggle" x="80%" y="-10px" rotate={15} delay={0.4} />

                            <div className={styles.projectsGrid}>
                                {projects.map((proj: any, i: number) => (
                                    <motion.div 
                                        key={i}
                                        className={styles.stickyNote}
                                        initial={{ y: -500, rotate: 20, opacity: 0 }}
                                        whileInView={{ y: 0, rotate: i % 2 === 0 ? -3 : 3, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", bounce: 0.4, delay: i * 0.2 }}
                                    >
                                        <h3>{proj.title}</h3>
                                        <p style={{ fontSize: '1rem' }}>{proj.description}</p>
                                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                                            <ExternalLink size={18} opacity={0.5} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* EXPERIENCE SECTION */}
                        <section className={styles.section} id="experience" style={{ paddingLeft: '40px' }}>
                            <h2 style={{ textDecoration: 'underline' }}>The Timeline</h2>
                            <DoodleAccent type="arrow" x="-10px" y="0px" rotate={90} delay={0.3} size={30} />
                            
                            <div style={{ position: 'relative', minHeight: '400px' }}>
                                <motion.div 
                                    className={styles.timelineLine}
                                    style={{ scaleY, left: '-20px', width: '2px', backgroundColor: '#7a7a7a' }}
                                />
                                {experience.map((exp: any, i: number) => (
                                    <motion.div 
                                        key={i}
                                        className={styles.experienceItem}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                    >
                                        <div style={{ fontSize: '0.9rem', color: '#ff4d4d' }}>{exp.year || exp.startDate}</div>
                                        <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{exp.title}</div>
                                        <div style={{ fontSize: '1rem', opacity: 0.7 }}>@ {exp.company}</div>
                                        <p style={{ fontSize: '1rem', marginTop: '10px' }}>{exp.description || (exp.responsibilities && exp.responsibilities[0])}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* CONTACT SECTION */}
                        <section className={styles.section} id="contact">
                            <DoodleAccent type="star" x="-30px" y="50px" rotate={-20} delay={0.4} size={35} />
                            <DoodleAccent type="circle" x="90%" y="150px" rotate={45} delay={0.6} />

                            <div className={styles.tornPage}>
                                <h2 style={{ margin: 0, fontFamily: 'Caveat' }}>Drop a note!</h2>
                                <div style={{ marginTop: '20px' }}>
                                    <div className={styles.formGroup}>
                                        <label>Your Name</label>
                                        <input type="text" placeholder="..." />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Your Email</label>
                                        <input type="email" placeholder="..." />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>The message</label>
                                        <textarea rows={4} placeholder="..." />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                                        <motion.button 
                                            className={styles.submitBtn}
                                            whileTap={{ scale: 0.95, rotate: -2 }}
                                        >
                                            STAMP & SEND <Send size={16} />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '40px', display: 'flex', gap: '20px', opacity: 0.6 }}>
                                <Github size={24} />
                                <Linkedin size={24} />
                                <PenTool size={24} />
                            </div>
                        </section>

                        <div style={{ textAlign: 'center', marginTop: '100px', opacity: 0.3, fontSize: '0.8rem' }}>
                            * end of notebook *
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default function SketchbookPortfolio() {
    return (
        <ReadContextProvider>
            <SketchbookPortfolioContent />
        </ReadContextProvider>
    );
}
