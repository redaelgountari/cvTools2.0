"use client";

import React, { useEffect, useState, useRef, useContext } from 'react';
import { ReadContext } from "@/app/GenComponents/ReadContext";
import ReadContextProvider from "@/app/GenComponents/ReadContextProvider";
import { useExportHTML } from '@/hooks/useExportHTML';
import { CustomizationProvider, useCustomization } from '@/components/portfolio/CustomizationContext';
import { PortfolioCustomizer } from '@/components/portfolio/PortfolioCustomizer';

const GradientFolio = () => {
    const { AnlysedCV, isLoading: loading } = useContext(ReadContext);
    const customizer = useCustomization();
    const { isDarkMode, dynamicStyles, visibility, order, themeVars } = customizer || {
        isDarkMode: false,
        dynamicStyles: '',
        visibility: {} as any,
        order: [] as any[],
        themeVars: {} as any
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [lightbox, setLightbox] = useState<{
        isOpen: boolean,
        images: string[],
        index: number,
        title?: string,
        description?: string,
        github?: string,
        live?: string
    }>({ isOpen: false, images: [], index: 0 });

    const openLightbox = (images: string[], index: number, title?: string, description?: string, github?: string, live?: string) => {
        setLightbox({ isOpen: true, images, index, title, description, github, live });
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightbox({ ...lightbox, isOpen: false });
        document.body.style.overflow = '';
    };



    const { handleExportHTML, isExporting } = useExportHTML(AnlysedCV?.personalInfo?.fullName || "Portfolio", "gradient-folio");

    useEffect(() => {
        if (!loading) {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 500);
                const sections = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'];
                let current = 'home';
                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element && window.getComputedStyle(element).display !== 'none') {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= 250) {
                            current = section;
                        }
                    }
                }
                setActiveSection(current);
            };

            window.addEventListener('scroll', handleScroll);



            const timer = setTimeout(() => {
                initCustomCursor();
            }, 100);

            return () => {
                window.removeEventListener('scroll', handleScroll);
                clearTimeout(timer);
            };
        }
    }, [loading]);



    const initCustomCursor = () => {
        const cursor = document.querySelector('.custom-cursor');



        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.neo-reveal').forEach(el => observer.observe(el));

        let currentScrollY = window.scrollY;
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        if (cursor && window.innerWidth > 768) document.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            if (cursor && window.innerWidth > 768) {
                cursorX += (mouseX - cursorX) * 0.8;
                cursorY += (mouseY - cursorY) * 0.8;
                (cursor as HTMLElement).style.left = cursorX + 'px';
                (cursor as HTMLElement).style.top = cursorY + 'px';
            }



            currentScrollY += (window.scrollY - currentScrollY) * 0.1;
            document.querySelectorAll('.parallax').forEach(el => {
                const speed = parseFloat((el as HTMLElement).getAttribute('data-speed') || '0.2');
                const baseTransform = (el as HTMLElement).getAttribute('data-base') || '';
                (el as HTMLElement).style.transform = `${baseTransform} translateY(${currentScrollY * speed}px)`;
            });
            document.querySelectorAll('.scroll-marquee').forEach(el => {
                const speed = parseFloat((el as HTMLElement).getAttribute('data-speed') || '0.5');
                const baseTransform = (el as HTMLElement).getAttribute('data-base') || '';
                (el as HTMLElement).style.transform = `${baseTransform} translateX(${-currentScrollY * speed}px)`;
            });

            requestAnimationFrame(animate);
        };
        animate();

        if (cursor && window.innerWidth > 768) {
            const hoverables = 'a, button, input, select, .project-card, .skill-tag, .job-tag';
            const addHover = () => cursor.classList.add('hover');
            const removeHover = () => cursor.classList.remove('hover');

            document.querySelectorAll(hoverables).forEach(el => {
                el.addEventListener('mouseenter', addHover);
                el.addEventListener('mouseleave', removeHover);
            });
        }



        document.querySelectorAll('[data-project-cluster]').forEach((container: any) => {
            const images = container.querySelectorAll('[data-anim="project-image"]');
            if (images.length <= 1) return;

            const resetPositions = () => {
                images.forEach((img: any, idx: number) => {
                    if (idx === 0) {
                        img.style.transform = 'none';
                        img.style.opacity = '1';
                    } else {
                        img.style.transform = `translate(${idx * 15}px, ${idx * -15}px) rotate(${idx * 2}deg)`;
                        img.style.opacity = '0.4';
                    }
                });
            };

            container.addEventListener('mouseenter', () => {
                images.forEach((img: any, idx: number) => {
                    const x = idx * 30;
                    const y = idx * -30;
                    const r = idx * 5;
                    img.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(1.05)`;
                    img.style.opacity = '1';
                });
            });

            container.addEventListener('mouseleave', resetPositions);
            resetPositions();
        });
    };



    const userData = {
        personalInfo: { fullName: "ALEX NOVA", email: "hello@nova.design", location: "Global" },
        jobSearchTitle: "DIGITAL ARCHITECT",
        professionalSummary: "Designing digital experiences that harmonize architectural precision with raw creative expression.",
        experience: [{ title: "Lead Developer", company: "Noir Studio", startDate: "2024", endDate: "Present", responsibilities: ["Building high-performance design systems."] }],
        education: [{ degree: "M.Sc. Computer Science", institution: "Tech University", graduationYear: "2020", location: "New York" }],
        skills: { technical: ["React", "Next.js", "TypeScript"], soft: ["Leadership"], languages: ["English"] },
        projects: [{
            title: "Cyber Suite",
            description: "Advanced dashboard UI with real-time analytics and architectural design principles.",
            technologiesUsed: ["React", "GSAP", "Three.js"],
            github: "https://github.com",
            link: "https://example.com",
            images: [
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
                "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"
            ]
        }],
        tools: ["Figma", "VS Code"],
        image: []
    };

    const data = AnlysedCV || userData;
    const personalInfo = data.personalInfo || userData.personalInfo;
    const experience = (data.experience || userData.experience) as any[];
    const education = (data.education || userData.education) as any[];
    const skills = data.skills || userData.skills;
    const projects = (data.projects || userData.projects) as any[];
    const jobSearchTitle = data.jobSearchTitle || userData.jobSearchTitle;
    const professionalSummary = data.professionalSummary || userData.professionalSummary;
    const initials = (personalInfo.fullName || "PF").split(' ').map((n: string) => n[0]).join('');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const scrollTo = (id: string, e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    if (loading) return <div className="fixed inset-0 bg-white flex items-center justify-center font-mono uppercase tracking-widest z-[99999]">Loading Terminal...</div>;

    return (
        <div className="portfolio-gradient-container">

            <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />


            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Archivo+Black&family=JetBrains+Mono:wght@400;700&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

                :root {
                    --bg: #FFFFFF; --bg-rgb: 255, 255, 255; --primary: #000000; --primary-rgb: 0, 0, 0; --accent: #FF3366; --secondary: #0066FF;
                    --text: #1a1a1a; --text-secondary: #666666; --border: #000000; --highlight: #FFFF00;
                    --shadow: rgba(0, 0, 0, 0.1); --card-bg: #FFFFFF; --nav-bg: rgba(255, 255, 255, 0.85);
                    --radius: var(--radius, 0px); --shadow-depth: 10px; --border-width: var(--border-width, 3px); --font-size-base: 16px;
                    --letter-spacing: -1.5px; --blur: 12px; --grid-opacity: 0.1; --font-main: var(--font-main, 'Space Grotesk', sans-serif);
                }

                body.dark-mode {
                    --bg: #0a0a0a; --bg-rgb: 10, 10, 10; --primary: #FFFFFF; --primary-rgb: 255, 255, 255; --accent: #00FF9F; --secondary: #FF0066;
                    --text: #f5f5f5; --text-secondary: #b3b3b3; --border: #FFFFFF; --highlight: #00FFFF;
                    --shadow: rgba(255, 255, 255, 0.1); --card-bg: #1a1a1a; --nav-bg: rgba(10, 10, 10, 0.85);
                }

                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; scroll-padding-top: 100px; font-size: var(--font-size-base); }
                body {
                    font-family: var(--font-main); background-color: var(--bg); color: var(--text);
                    line-height: 1.6; overflow-x: hidden; transition: background-color 0.3s ease, color 0.3s ease;
                    cursor: none; position: relative;
                }
                body::before {
                    content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background-image: linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px);
                    background-size: 50px 50px; opacity: var(--grid-opacity); z-index: -1; pointer-events: none;
                }
                .custom-cursor {
                    width: 20px; height: 20px; border: var(--border-width, 2px) solid var(--accent); border-radius: 50%;
                    position: fixed; pointer-events: none; z-index: 30000;
                    transition: transform 0.15s ease, border-color 0.2s ease; mix-blend-mode: difference;
                    transform: translate(-50%, -50%);
                }
                .custom-cursor.hover { transform: translate(-50%, -50%) scale(1.5); border-color: var(--secondary); }
                .navbar {
                    position: fixed; top: 0; left: 0; right: 0; padding: 25px 35px; z-index: 1000;
                    display: flex; justify-content: space-between; align-items: center;
                    background: var(--nav-bg); backdrop-filter: blur(var(--blur));
                    border-bottom: var(--border-width) solid var(--primary);
                }
                .nav-logo { font-family: 'Archivo Black', sans-serif; font-size: 24px; color: var(--primary); letter-spacing: 2px; }
                .nav-actions { display: flex; align-items: center; gap: 15px; }
                .theme-toggle, .hamburger {
                    width: 50px; height: 50px; border: 3px solid var(--primary); background: transparent;
                    color: var(--primary); cursor: none; display: flex; align-items: center; justify-content: center; transition: 0.3s;
                }
                .hamburger { flex-direction: column; gap: 6px; }
                .theme-toggle:hover, .hamburger:hover { background: var(--accent); border-color: var(--accent); color: var(--bg); }
                .hamburger span { width: 25px; height: 3px; background: var(--primary); transition: 0.3s; }
                .hamburger:hover span { background: var(--bg); }
                .hamburger.active span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
                .hamburger.active span:nth-child(2) { opacity: 0; }
                .hamburger.active span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
                .navbar a { text-decoration: none; color: inherit; }
                .nav-menu {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: var(--primary);
                    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px;
                    opacity: 0; pointer-events: none; transition: 0.4s; z-index: 999;
                }
                .container {
                    width: 100%;
                    padding: 0 35px;
                    margin: 0 auto;
                }
                .nav-menu.active { opacity: 1; pointer-events: all; }
                .nav-link { font-family: 'Archivo Black', sans-serif; font-size: clamp(2rem, 5vw, 4rem); color: var(--bg); opacity: 0; transform: translateY(30px); transition: 0.3s; }
                .nav-menu.active .nav-link { opacity: 1; transform: translateY(0); }
                .nav-link:hover { color: var(--accent); }
                
                @media (min-width: 1025px) {
                    .hamburger { display: none; }
                    .nav-menu { 
                        position: fixed; top: 0; left: auto; right: 100px; width: auto; height: 102px;
                        background: transparent; flex-direction: row; opacity: 1; pointer-events: all; 
                        gap: 15px; z-index: 1001; transform: none; 
                    }
                    .nav-link { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; font-weight: 700; color: var(--primary); opacity: 1; transform: none; padding: 10px 12px; border: 1px solid transparent; transition: 0.2s; letter-spacing: 0.5px; }
                    .nav-link:hover { background: var(--primary); color: var(--bg); box-shadow: 4px 4px 0 var(--accent); transform: translateY(-2px); }
                }

                .progress-indicator { position: fixed; right: 15px; top: 50%; transform: translateY(-50%); z-index: 998; display: flex; flex-direction: column; gap: 15px; }
                .progress-dot { width: 10px; height: 10px; border: 2px solid var(--primary); transition: 0.3s; cursor: none; }
                .progress-dot.active { background: var(--accent); border-color: var(--accent); transform: scale(1.5); }
                
                section { min-height: 100vh; padding: 100px 0 60px; position: relative; }
                .hero-section { display: flex; align-items: center; justify-content: center; overflow: hidden; padding-top: 140px; }
                .hero-content { display: grid; grid-template-columns: 400px 1fr; gap: 80px; align-items: center; z-index: 2; }
                .hero-image-wrapper { width: 100%; height: 500px; overflow: hidden; border: var(--border-width) solid var(--primary); box-shadow: var(--shadow-depth) var(--shadow-depth) 0 var(--accent); border-radius: var(--radius); position: relative; }
                .hero-image { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: 0.3s; }
                .hero-image:hover { filter: grayscale(0%); }
                .hero-name { font-family: 'Archivo Black', sans-serif; font-size: clamp(3rem, 8vw, 7rem); line-height: 1.1; margin-bottom: 30px; letter-spacing: var(--letter-spacing); }
                .hero-stripe { position: absolute; top: 50%; left: -10%; right: -10%; height: 50%; background: var(--accent); transform: translateY(-50%) rotate(-2deg); z-index: -1; opacity: 0.2; }
                .hero-title { font-size: clamp(1.2rem, 2.5vw, 1.8rem); font-weight: 700; margin-bottom: 25px; color: var(--accent); text-transform: uppercase; letter-spacing: 2px; }
                .hero-summary { font-size: clamp(1rem, 1.3vw, 1.1rem); margin-bottom: 40px; }
                .hero-buttons { display: flex; gap: 20px; margin-bottom: 60px; }
                .btn { padding: 18px 40px; font-size: 16px; font-weight: 700; text-transform: uppercase; border: 3px solid var(--primary); background: transparent; color: var(--primary); position: relative; overflow: hidden; transition: color 0.3s; cursor: none; }
                .btn::before { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 0%; background: var(--primary); transition: height 0.3s ease; z-index: -1; }
                .btn:hover::before { height: 100%; }
                .btn:hover { color: var(--bg); }
                .btn.primary { background: var(--accent); color: var(--bg); border-color: var(--accent); }
                .social-links { display: flex; gap: 25px; }
                .social-link { width: 60px; height: 60px; border: 3px solid var(--primary); display: flex; align-items: center; justify-content: center; font-size: 24px; transition: 0.3s; text-decoration: none; color: inherit; }
                .social-link:hover { background: var(--accent); border-color: var(--accent); color: var(--bg); transform: translate(-3px, -3px); box-shadow: 3px 3px 0 var(--primary); }

                .scroll-indicator { 
                    position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
                    display: flex; flex-direction: column; align-items: center; gap: 10px;
                    font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 3px; color: var(--text-secondary);
                    animation: bounce-scroll 2s infinite;
                }
                .scroll-indicator i { font-size: 14px; }
                @keyframes bounce-scroll { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }

                .section-number { font-family: 'Archivo Black', sans-serif; font-size: clamp(8rem, 15vw, 15rem); color: var(--accent); opacity: 0.1; position: absolute; top: 20px; left: -80px; line-height: 1; z-index: 0; }
                .section-title { font-family: 'Archivo Black', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); margin-bottom: 60px; position: relative; display: inline-block; }
                .section-title::after { content: ''; position: absolute; bottom: -15px; left: 0; width: 60%; height: 5px; background: var(--accent); }

                .about-description { font-size: clamp(1rem, 1.5vw, 1.25rem); line-height: 1.8; margin-bottom: 60px; max-width: 900px; }
                .about-stats { display: flex; gap: 60px; margin-top: 60px; flex-wrap: wrap; }
                .stat-number { font-family: 'Archivo Black', sans-serif; font-size: clamp(3rem, 6vw, 5rem); color: var(--accent); line-height: 1; margin-bottom: 10px; }
                .stat-label { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-secondary); font-weight: 500; }

                .skills-section { background: var(--bg); color: var(--primary); }
                .skills-section .section-title, .skills-section .section-number { color: var(--primary); }
                .skills-watermark { position: absolute; bottom: 0; right: 0; font-family: 'Archivo Black', sans-serif; font-size: clamp(5rem, 15vw, 15rem); color: var(--accent); opacity: 0.03; pointer-events: none; white-space: nowrap; overflow: hidden; }
                .skills-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; position: relative; z-index: 1; margin-top: 50px; }
                .skill-category { 
                    border: 1px solid var(--border); background: var(--card-bg); position: relative; transition: 0.3s;
                    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
                }
                .skill-category:hover { transform: translate(5px, -5px); border-color: var(--accent); }
                .category-title { 
                    font-family: 'Archivo Black', sans-serif; padding: 20px; background: var(--bg); color: var(--primary); 
                    display: flex; align-items: center; gap: 15px; text-transform: uppercase; border-bottom: 2px solid var(--accent); 
                    font-size: 1.1rem; letter-spacing: 1px;
                }
                .category-label { position: absolute; top: -10px; right: 10px; font-family: 'JetBrains Mono', monospace; font-size: 8px; color: var(--accent); background: var(--bg); padding: 2px 8px; border: 1px solid var(--accent); }
                .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; padding: 25px; }
                .skill-tag { 
                    padding: 8px 16px; border: 1px solid var(--border); font-family: 'JetBrains Mono', monospace; 
                    font-size: 0.75rem; transition: 0.3s; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;
                    clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
                    background: rgba(var(--primary-rgb), 0.02);
                }
                .skill-tag:hover { background: var(--accent); color: var(--bg); border-color: var(--accent); transform: scale(1.1); }

                .timeline-horizontal { display: flex; gap: 30px; overflow-x: auto; padding: 40px 0; scroll-snap-type: x mandatory; scrollbar-width: none; }
                .timeline-item { 
                    min-width: 400px; scroll-snap-align: start; background: var(--card-bg); border: 1px solid var(--border); 
                    padding: 35px; transition: 0.3s; position: relative;
                    clip-path: polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px);
                }
                .timeline-item::before { content: ''; position: absolute; top: 0; left: 0; width: 30px; height: 30px; border-left: 3px solid var(--accent); border-top: 3px solid var(--accent); opacity: 0.5; }
                .timeline-item:hover { border-color: var(--accent); transform: translateY(-10px); }
                .timeline-title { font-family: 'Archivo Black', sans-serif; font-size: 1.25rem; color: var(--primary); margin-bottom: 5px; text-transform: uppercase; }
                .timeline-company { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: var(--accent); margin-bottom: 15px; font-weight: 700; letter-spacing: 1px; }
                .timeline-date { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--text-secondary); margin-bottom: 25px; display: inline-block; padding: 4px 10px; border: 1px solid var(--border); }
                .timeline-responsibilities { list-style: none; }
                .timeline-responsibilities li { padding-left: 25px; margin-bottom: 12px; position: relative; font-size: 15px; }
                .timeline-responsibilities li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }

                .education-card { 
                    padding: 40px; border: 1px solid var(--border); display: flex; justify-content: space-between; 
                    align-items: center; transition: 0.3s; cursor: none; background: var(--card-bg);
                    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%);
                    margin-bottom: 20px;
                }
                .education-card:hover { border-color: var(--accent); transform: translateX(10px); }
                .education-degree { font-family: 'Archivo Black', sans-serif; font-size: 1.5rem; color: var(--primary); text-transform: uppercase; }
                .education-institution { font-size: 1.2rem; color: var(--accent); font-weight: 500; }
                .education-icon { width: 60px; height: 60px; border: 3px solid var(--primary); display: flex; align-items: center; justify-content: center; font-size: 24px; }



                .projects-section { background: var(--bg); color: var(--primary); position: relative; padding: 150px 0; overflow: hidden; }
                .projects-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0); background-size: 40px 40px; opacity: 0.05; }
                
                .projects-section .section-title { font-family: 'Archivo Black', sans-serif; font-size: clamp(3rem, 8vw, 6rem); color: var(--primary); letter-spacing: -2px; line-height: 0.9; }
                .projects-section .section-number { color: var(--accent); opacity: 0.2; left: -20px; }
                
                .projects-grid { 
                    display: grid; 
                    grid-template-columns: repeat(3, minmax(0, 1fr)); 
                    gap: 30px; 
                    padding: 40px 0;
                    align-items: stretch;
                }
                @media (max-width: 1200px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr; } }


                .project-card { 
                    position: relative; width: 100%; height: 600px; background: var(--card-bg); overflow: hidden;
                    border: 1px solid var(--border);
                    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
                    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); 
                    display: flex; flex-direction: column; justify-content: flex-end; cursor: none;
                }
                


                .project-card::before {
                    content: ''; position: absolute; top: 0; left: 0; width: 30px; height: 30px;
                    border-left: 4px solid var(--accent); border-top: 4px solid var(--accent);
                    z-index: 20; opacity: 0.3; transition: 0.3s;
                }
                .project-card:hover::before { opacity: 1; border-color: var(--accent); }
                


                .project-card::after {
                    content: ''; position: absolute; top: 0; left: -150%; width: 100%; height: 100%;
                    background: linear-gradient(
                        90deg, 
                        transparent, 
                        rgba(255, 255, 255, 0.05), 
                        rgba(255, 255, 255, 0.15), 
                        rgba(255, 255, 255, 0.05), 
                        transparent
                    );
                    transform: skewX(-25deg);
                    z-index: 15; transition: 0s;
                }
                .project-card:hover::after {
                    left: 150%;
                    transition: 1.2s cubic-bezier(0.19, 1, 0.22, 1);
                }

                .project-image { 
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                    object-fit: cover; opacity: 0.2; filter: grayscale(100%); 
                    transition: 0.7s cubic-bezier(0.19, 1, 0.22, 1);
                    z-index: 1;
                }
                .project-card:hover .project-image { opacity: 0.6; filter: grayscale(0%); transform: scale(1.05); }

                .project-placeholder {
                    position: absolute; inset: 0; 
                    background-color: var(--bg);
                    background-image: 
                        linear-gradient(45deg, var(--accent) 25%, transparent 25%), 
                        linear-gradient(-45deg, var(--accent) 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, var(--accent) 75%), 
                        linear-gradient(-45deg, transparent 75%, var(--accent) 75%);
                    background-size: 4px 4px;
                    background-position: 0 0, 0 2px, 2px 2px, 2px 0;
                    opacity: 0.05; z-index: 1;
                }
                .project-placeholder-content {
                    position: absolute; inset: 0; z-index: 2;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    gap: 15px; color: var(--accent); opacity: 0.3; transition: 0.3s;
                }
                .project-card:hover .project-placeholder-content { opacity: 0.8; transform: scale(1.1); }
                .placeholder-icon { font-size: 4rem; filter: drop-shadow(0 0 10px var(--accent)); }
                .placeholder-tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }

                .project-content { 
                    position: relative; z-index: 20; padding: 40px; 
                    background: linear-gradient(to top, var(--bg) 70%, transparent 100%); 
                    transition: 0.4s;
                }
                
                .project-title { 
                    font-family: 'Archivo Black', sans-serif; font-size: 1.5rem; text-transform: uppercase; 
                    color: var(--primary); margin-bottom: 12px; letter-spacing: 1px;
                    position: relative;
                }
                
                .project-title::before, .project-title::after {
                    content: attr(data-text);
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background: transparent; opacity: 0; pointer-events: none;
                }

                .project-card:hover .project-title::before {
                    animation: glitch-slice 0.5s linear forwards;
                    color: var(--accent); z-index: -1; opacity: 1;
                }
                .project-card:hover .project-title::after {
                    animation: glitch-slice 0.5s linear reverse forwards;
                    color: var(--secondary); z-index: -2; opacity: 1;
                }

                @keyframes glitch-slice {
                    0% { clip-path: inset(80% 0 0 0); transform: translate(-5px, -2px); }
                    10% { clip-path: inset(10% 0 80% 0); transform: translate(5px, 2px); }
                    20% { clip-path: inset(40% 0 40% 0); transform: translate(-10px, -5px); }
                    30% { clip-path: inset(70% 0 10% 0); transform: translate(10px, 5px); }
                    40% { clip-path: inset(10% 0 60% 0); transform: translate(-5px, -2px); }
                    50% { clip-path: inset(20% 0 20% 0); transform: translate(0, 0); opacity: 1; }
                    100% { clip-path: inset(60% 0 15% 0); transform: translate(2px, 0); opacity: 0.8; }
                }

                .project-description { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 25px; font-family: var(--font-main, 'JetBrains Mono', monospace); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; height: 3.8em; }
                
                .project-tech { display: flex; flex-wrap: wrap; gap: 8px; }
                .tech-tag { 
                    font-family: var(--font-main, 'JetBrains Mono', monospace); font-size: 10px; font-weight: 700;
                    padding: 5px 12px; border: var(--border-width, 1px) solid var(--border); color: var(--text-secondary); 
                    text-transform: uppercase; background: var(--bg);
                    transition: 0.3s;
                }
                .project-card:hover .tech-tag { border-color: var(--accent); color: var(--accent); }
                
                .project-links { display: flex; align-items: center; gap: 15px; margin-top: 30px; }
                .project-link-btn { 
                    width: 42px; height: 42px; border: var(--border-width, 1px) solid var(--border); display: flex; 
                    align-items: center; justify-content: center; color: var(--primary); 
                    transition: 0.3s; background: var(--bg); cursor: none;
                    clip-path: polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%);
                }
                .project-link-btn:hover { background: var(--accent); border-color: var(--accent); color: var(--bg); scale: 1.1; }

                .project-show-more {
                    background: transparent; border: none; color: var(--accent); font-family: var(--font-main, 'JetBrains Mono', monospace);
                    font-size: 10px; text-transform: uppercase; cursor: none; margin-top: -15px; margin-bottom: 20px;
                    display: flex; align-items: center; gap: 5px; opacity: 0.7; transition: 0.3s;
                }
                .project-show-more:hover { opacity: 1; letter-spacing: 1px; }

                .lightbox-info {
                    width: 100%; height: 100%;
                    background: rgba(var(--bg-rgb), 0.98); 
                    border-left: 2px solid var(--accent); padding: 50px 40px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .lightbox-info::before { 
                    content: 'STATUS // DECRYPTED_DATA_SCAN'; position: absolute; top: 15px; left: 40px; 
                    background: var(--accent); color: var(--bg); padding: 2px 10px; 
                    font-size: 9px; font-family: var(--font-main, 'JetBrains Mono', monospace); font-weight: 900;
                    letter-spacing: 2px;
                }
                .lightbox-info::after {
                    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
                    background: var(--accent); opacity: 0.3;
                    animation: scanning-line 3s linear infinite;
                }
                @keyframes scanning-line {
                    0% { top: 0; }
                    100% { top: 100%; }
                }

                .lightbox-title-area { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 30px; border-bottom: 4px double var(--accent); padding-bottom: 20px; flex-shrink: 0; }
                .lightbox-badge { background: var(--secondary); color: var(--bg); font-family: var(--font-main, 'JetBrains Mono', monospace); padding: 4px 10px; font-size: 10px; font-weight: 800; animation: pulse-red 1.5s infinite; }
                @keyframes pulse-red { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
                
                .lightbox-title { font-family: var(--font-main, 'Archivo Black', sans-serif); font-size: 1.75rem; text-transform: uppercase; color: var(--accent); line-height: 0.9; }
                .lightbox-description { 
                    font-family: var(--font-main, 'JetBrains Mono', monospace); font-size: 0.9rem; line-height: 1.8; color: var(--primary); 
                    overflow-y: auto; padding-right: 20px; flex-grow: 1;
                    scrollbar-width: thin; scrollbar-color: var(--accent) transparent;
                }
                .lightbox-description::-webkit-scrollbar { width: 4px; }
                .lightbox-description::-webkit-scrollbar-thumb { background: var(--accent); }

                
                .project-indicator-list { position: absolute; top: 30px; left: 30px; z-index: 10; display: flex; flex-direction: column; gap: 10px; }
                .project-mini-dot { width: 45px; height: 45px; border: var(--border-width, 1px) solid var(--border); background: var(--bg); overflow: hidden; transition: 0.4s; transform: translateX(-20px); opacity: 0; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                .project-card:hover .project-mini-dot { transform: translateX(0); opacity: 1; border-color: var(--accent); }
                .project-mini-dot img { width: 100%; height: 100%; object-fit: cover; opacity: 0.4; }
                
                .project-shot-badge { 
                    position: absolute; top: 30px; right: 30px; z-index: 10;
                    background: var(--accent); color: var(--bg);
                    padding: 8px 16px; font-family: 'Archivo Black', sans-serif;
                    font-size: 10px; letter-spacing: 2px; display: flex; align-items: center; gap: 8px;
                    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
                }
                .tactical-label { position: absolute; top: 0; left: 0; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--accent); padding: 5px; opacity: 0.5; text-transform: uppercase; }
                .badge-pulse { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 10px var(--accent); animation: pulse 1.5s infinite; }
                @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

                .additional-card { border: var(--border-width) solid var(--primary); padding: 50px; background: var(--card-bg); transition: 0.3s; position: relative; overflow: hidden; }
                .additional-card::before { content: 'FOLDER_ID // ' attr(data-id); position: absolute; bottom: 10px; right: 20px; font-family: 'JetBrains Mono', monospace; font-size: 8px; opacity: 0.3; }
                .additional-card:hover { transform: translate(-8px, -8px); box-shadow: 8px 8px 0 var(--accent); }
                .additional-card h3 { font-family: 'Archivo Black', sans-serif; font-size: 1.5rem; color: var(--accent); margin-bottom: 35px; text-transform: uppercase; letter-spacing: 2px; border-left: 5px solid var(--accent); padding-left: 15px; }
                
                .additional-item { padding: 20px 0; border-bottom: 1px solid rgba(var(--primary-rgb), 0.1); position: relative; transition: 0.3s; display: flex; align-items: flex-start; gap: 20px; }
                .additional-item:hover { padding-left: 15px; border-bottom-color: var(--accent); }
                .additional-item::before { content: ''; position: absolute; left: 0; top: 0; width: 3px; height: 100%; background: var(--accent); transform: scaleY(0); transition: 0.3s; }
                .additional-item:hover::before { transform: scaleY(1); }
                
                .additional-item-icon { width: 40px; height: 40px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--accent); background: var(--bg); flex-shrink: 0; clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 100%, 0 80%); }
                .additional-item-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--primary); font-size: 1.1rem; line-height: 1.2; }
                .additional-item-meta { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--text-secondary); margin-top: 5px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 10px; }
                .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 5px var(--accent); animation: pulse 2s infinite; }
                
                .asset-tag { display: inline-block; padding: 2px 6px; border: 1px solid var(--accent); color: var(--accent); font-size: 8px; font-weight: 900; margin-left: 10px; }

                .contact-heading { font-family: 'Archivo Black', sans-serif; font-size: clamp(3rem, 8vw, 8rem); text-align: center; margin-bottom: 80px; }
                .contact-methods { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-bottom: 80px; }
                .contact-method { padding: 40px; border: 3px solid var(--primary); background: var(--card-bg); transition: 0.3s; display: flex; flex-direction: column; align-items: center; gap: 20px; text-decoration: none; color: inherit; }
                .contact-method:hover { background: var(--accent); color: var(--bg); transform: translate(-5px, -5px); box-shadow: 5px 5px 0 var(--primary); }
                .contact-icon { font-size: 48px; }

                .footer { background: var(--primary); color: var(--bg); padding: 60px 0; border-top: 5px solid var(--accent); }
                .footer-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 40px; }
                .back-to-top { position: fixed; bottom: 30px; left: 30px; width: 60px; height: 60px; background: var(--accent); border: 3px solid var(--primary); border-radius: 50%; opacity: 0; pointer-events: none; transition: 0.3s; z-index: 999; display: flex; items-center justify-center; color: var(--bg); font-size: 24px; }
                .back-to-top.visible { opacity: 1; pointer-events: all; }

                .customizer-toggle { position: fixed; left: 0; top: 50%; transform: translateY(-50%); z-index: 10002; width: 60px; height: 60px; background: #ff3366; color: white; border: 3px solid #000; border-radius: 0 10px 10px 0; display: flex; align-items: center; justify-content: center; font-size: 24px; transition: 0.3s; box-shadow: 4px 0 15px rgba(0,0,0,0.3); }
                .customizer-panel { position: fixed; top: 20px; right: -350px; width: 320px; background: var(--card-bg); border: 4px solid var(--primary); box-shadow: 12px 12px 0 var(--accent); transition: 0.5s; padding: 30px; z-index: 20000; max-height: 90vh; overflow-y: auto; }
                .customizer-panel.active { right: 20px; }

                @media (max-width: 1024px) {
                    .hero-content { grid-template-columns: 1fr; text-align: center; }
                    .hero-image-wrapper { height: 400px; order: -1; }
                    .hero-buttons, .social-links { justify-content: center; }
                    .progress-indicator { display: none; }
                    .timeline-horizontal { flex-direction: column; }
                    .timeline-item { min-width: 100%; }
                }



                .neo-reveal { opacity: 0; transform: translateY(80px) rotate(-4deg) scale(0.9); transition: all 0.7s cubic-bezier(0.2, 1.2, 0.3, 1); }
                .neo-reveal.is-visible { opacity: 1; transform: translateY(0) rotate(0) scale(1); }
                .neo-reveal-delay-1 { transition-delay: 0.1s; }
                .neo-reveal-delay-2 { transition-delay: 0.2s; }
                .neo-reveal-delay-3 { transition-delay: 0.3s; }




                @media (max-width: 768px) {
                    /* Core Layout */
                    .container { padding: 0 20px; }
                    section { padding: 80px 0 40px; min-height: auto; }
                    body { cursor: auto; }
                    .custom-cursor { display: none !important; }
                    * { cursor: auto !important; }

                    /* Navigation */
                    .navbar { padding: 15px 20px; }
                    .nav-logo { font-size: 18px; letter-spacing: 1px; }
                    .theme-toggle, .hamburger { width: 42px; height: 42px; border-width: 2px; }
                    .nav-actions { gap: 10px; }
                    .nav-link { font-size: clamp(1.8rem, 6vw, 2.5rem); }

                    /* Hero */
                    .hero-section { padding-top: 100px; min-height: auto; }
                    .hero-content { grid-template-columns: 1fr; gap: 30px; text-align: left; }
                    .hero-image-wrapper { height: 280px; order: -1; box-shadow: 5px 5px 0 var(--accent); }
                    .hero-name { font-size: clamp(2.2rem, 10vw, 3.5rem); margin-bottom: 15px; letter-spacing: -1px; }
                    .hero-title { font-size: clamp(0.8rem, 3vw, 1rem); margin-bottom: 15px; letter-spacing: 1px; }
                    .hero-summary { font-size: 0.9rem; margin-bottom: 25px; }
                    .hero-buttons { flex-direction: column; gap: 12px; margin-bottom: 30px; }
                    .btn { padding: 14px 30px; font-size: 14px; text-align: center; width: 100%; }
                    .social-links { gap: 15px; justify-content: flex-start; }
                    .social-link { width: 48px; height: 48px; font-size: 20px; border-width: 2px; }
                    .scroll-indicator { display: none; }

                    /* Section Titles */
                    .section-title { font-size: clamp(2rem, 8vw, 3rem); margin-bottom: 30px; }
                    .section-number { font-size: clamp(5rem, 20vw, 8rem); left: -20px; top: 10px; }

                    /* About */
                    .about-description { font-size: 0.95rem; line-height: 1.7; margin-bottom: 30px; }
                    .about-stats { gap: 30px; }
                    .stat-number { font-size: clamp(2rem, 8vw, 3rem); }
                    .stat-label { font-size: 11px; letter-spacing: 1.5px; }

                    /* Skills */
                    .skills-container { grid-template-columns: 1fr; gap: 20px; margin-top: 20px; }
                    .skill-category { clip-path: none; }
                    .category-title { font-size: 0.95rem; padding: 15px; }
                    .skills-grid { padding: 15px; gap: 8px; }
                    .skill-tag { font-size: 0.65rem; padding: 6px 12px; clip-path: none; }

                    /* Experience */
                    .timeline-horizontal { flex-direction: column; padding: 20px 0; }
                    .timeline-item { min-width: 100%; padding: 25px; clip-path: none; }
                    .timeline-title { font-size: 1.05rem; }
                    .timeline-company { font-size: 0.8rem; }
                    .timeline-responsibilities li { font-size: 13px; padding-left: 20px; margin-bottom: 8px; }

                    /* Education */
                    .education-card { padding: 25px; flex-direction: column; gap: 15px; align-items: flex-start; clip-path: none; }
                    .education-degree { font-size: 1.1rem; }
                    .education-institution { font-size: 1rem; }
                    .education-icon { width: 45px; height: 45px; font-size: 18px; border-width: 2px; }

                    /* Projects */
                    .projects-section { padding: 80px 0; overflow-x: hidden; }
                    .projects-section .section-title { font-size: clamp(2rem, 8vw, 3rem); }
                    .projects-section .section-number { left: -10px; font-size: clamp(4rem, 15vw, 6rem); }
                    .projects-grid { grid-template-columns: 1fr; gap: 20px; padding: 20px 0; max-width: 100%; overflow: hidden; }
                    .project-card { height: 420px; border-width: 1px; clip-path: none; border-radius: 4px; max-width: 100%; }
                    .project-content { padding: 20px; }
                    .project-title { font-size: 1.1rem !important; margin-bottom: 8px; }
                    .project-description { font-size: 0.75rem; height: 3.2em; }
                    .project-show-more { font-size: 9px; margin-top: -10px; }
                    .tech-tag { font-size: 8px; padding: 4px 8px; }
                    .project-link-btn { width: 36px; height: 36px; border-width: 1px; clip-path: none; }
                    .project-links { margin-top: 15px; gap: 10px; }
                    .project-indicator-list { top: 15px; left: 15px; gap: 6px; }
                    .project-mini-dot { width: 32px; height: 32px; }
                    .project-shot-badge { top: 15px; right: 15px; padding: 5px 10px; font-size: 8px; }
                    .tactical-label { font-size: 8px; }

                    /* Contact */
                    .contact-heading { font-size: clamp(2rem, 8vw, 3rem); margin-bottom: 40px; }
                    .contact-methods { grid-template-columns: 1fr; gap: 15px; margin-bottom: 40px; }
                    .contact-method { padding: 25px; border-width: 2px; }
                    .contact-icon { font-size: 32px; }

                    /* Footer */
                    .footer { padding: 35px 0; }
                    .footer-content { flex-direction: column; text-align: center; gap: 20px; }
                    .back-to-top { width: 48px; height: 48px; bottom: 20px; left: 20px; font-size: 18px; border-width: 2px; }

                    /* Customizer */
                    .customizer-toggle { width: 45px; height: 45px; font-size: 18px; border-width: 2px; }
                    .customizer-panel { width: 280px; padding: 20px; border-width: 3px; box-shadow: 6px 6px 0 var(--accent); }
                    .customizer-panel.active { right: 10px; }

                    /* Additional */
                    .additional-card { padding: 25px; border-width: 2px; }
                    .additional-card h3 { font-size: 1rem; }



                    #lightbox-container {
                        flex-direction: column !important;
                    }



                    #lightbox-container > div:first-child {
                        width: 100% !important; flex: none !important;
                        height: 55vh; padding: 15px; padding-top: 60px;
                    }



                    #lightbox-container > div:first-child > button:first-child {
                        top: 15px; left: 15px; font-size: 1rem; gap: 6px;
                    }
                    #lightbox-container > div:first-child > button:first-child .fa-times + span,
                    #lightbox-container > div:first-child > button:first-child::after { display: none; }



                    #lightbox-image { max-height: 40vh !important; border-width: 1px !important; }



                    #lightbox-prev, #lightbox-next { width: 40px !important; height: 40px !important; font-size: 16px !important; }



                    #lightbox-thumbnails {
                        bottom: 5px !important; gap: 6px !important; padding: 6px !important;
                        max-width: 90% !important;
                    }
                    #lightbox-thumbnails > div { width: 36px !important; height: 36px !important; border-width: 1px !important; }



                    #lightbox-info {
                        width: 100% !important;
                        max-height: 45vh;
                        overflow-y: auto;
                        transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1) !important;
                        transform: translateY(0) !important;
                        translate: none !important;
                        border-top: 3px solid var(--accent);
                        border-left: none !important;
                        position: relative;
                    }



                    #lightbox-info::before {
                        content: '';
                        display: block;
                        width: 40px; height: 4px;
                        background: var(--accent); opacity: 0.5;
                        border-radius: 2px;
                        margin: 0 auto 10px;
                        position: sticky; top: 0; z-index: 10;
                    }

                    .lightbox-info {
                        padding: 20px 20px 30px !important;
                        border-left: none !important;
                        height: auto !important;
                    }
                    .lightbox-info::before { top: 8px !important; left: 20px !important; font-size: 7px !important; letter-spacing: 1px !important; }
                    .lightbox-title-area { margin-bottom: 15px !important; padding-bottom: 12px !important; gap: 10px !important; border-bottom-width: 2px !important; flex-wrap: wrap; }
                    .lightbox-badge { font-size: 8px !important; padding: 3px 8px !important; }
                    .lightbox-title { font-size: 1.1rem !important; line-height: 1.1 !important; }
                    .lightbox-description { font-size: 0.75rem !important; line-height: 1.6 !important; padding-right: 5px !important; }

                    /* Project Connect buttons - full width on mobile */
                    .lightbox-description a { padding: 12px !important; }
                    .lightbox-description a span { font-size: 9px !important; }
                }



                @media (min-width: 769px) and (max-width: 1024px) {
                    .container { padding: 0 30px; }
                    .hero-content { grid-template-columns: 300px 1fr; gap: 40px; }
                    .hero-image-wrapper { height: 400px; }
                    .hero-name { font-size: clamp(2.5rem, 6vw, 4rem); }
                    .projects-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .project-card { height: 500px; }
                    .skills-container { grid-template-columns: repeat(2, 1fr); }
                    .timeline-item { min-width: 350px; }
                    .contact-methods { grid-template-columns: repeat(2, 1fr); }



                    #lightbox-container > div:first-child { padding: 30px; }
                    .lightbox-title { font-size: 1.4rem !important; }
                    .lightbox-description { font-size: 0.85rem !important; }
                }
            `}} />

            <div className="custom-cursor"></div>

            <div className="progress-indicator">
                {(order || []).map(id => (
                    <div key={id} className={`progress-dot ${activeSection === (id === 'hero' ? 'home' : id) ? 'active' : ''}`} onClick={() => scrollTo(id === 'hero' ? 'home' : id)} data-section={id === 'hero' ? 'home' : id}></div>
                ))}
            </div>

            <nav className="navbar">
                <div className="nav-logo">{initials}.</div>
                <div className="nav-actions">
                    <button className="theme-toggle" onClick={() => customizer?.setThemeMode(customizer.isDarkMode ? 'light' : 'dark')}>
                        <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i>
                    </button>
                    <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </nav>

            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                {(order || []).map(id => (
                    <a key={id} href={`#${id === 'hero' ? 'home' : id}`} className="nav-link" onClick={(e) => scrollTo(id === 'hero' ? 'home' : id, e)}>{(id === 'hero' ? 'home' : id).toUpperCase()}</a>
                ))}
            </div>

            <main style={{
                fontSize: themeVars['--font-size-base'] || '1rem',
                letterSpacing: themeVars['--letter-spacing'] || '0px'
            }}>


                {(order || []).map((sectionId) => {
                    switch (sectionId) {
                        case 'hero':
                            return visibility.hero !== false && (
                                <section key="hero" id="home" className="hero-section">
                                    <div className="container">
                                        <div className="hero-content">
                                            <div className="hero-image-wrapper neo-reveal">
                                                {data.image?.[0] ? <img src={data.image[0]} alt="Profile" className="hero-image" /> : <div className="w-full h-full bg-black/5" />}
                                            </div>
                                            <div className="hero-text-content">
                                                <div className="hero-stripe"></div>
                                                <h1 className="hero-name neo-reveal neo-reveal-delay-1">{personalInfo.fullName?.toUpperCase()}</h1>
                                                <h2 className="hero-title neo-reveal neo-reveal-delay-2">{jobSearchTitle}</h2>
                                                <p className="hero-summary neo-reveal neo-reveal-delay-3">{professionalSummary}</p>
                                                <div className="hero-buttons neo-reveal neo-reveal-delay-3">
                                                    <a href="#contact" className="btn primary" onClick={(e) => scrollTo('contact', e)}>GET IN TOUCH</a>
                                                    <a href="#experience" className="btn" onClick={(e) => scrollTo('experience', e)}>VIEW EXPERIENCE</a>
                                                </div>
                                                <div className="social-links neo-reveal neo-reveal-delay-3">
                                                    {personalInfo.github && <a href={personalInfo.github} className="social-link"><i className="fab fa-github"></i></a>}
                                                    {personalInfo.linkedin && <a href={personalInfo.linkedin} className="social-link"><i className="fab fa-linkedin"></i></a>}
                                                    {data.personalInfo?.website && <a href={data.personalInfo.website} className="social-link"><i className="fas fa-globe"></i></a>}
                                                    {data.onlinePresence?.twitter && <a href={data.onlinePresence.twitter} className="social-link"><i className="fab fa-twitter"></i></a>}
                                                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="social-link"><i className="fas fa-envelope"></i></a>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="scroll-indicator">
                                        <span>SCROLL</span>
                                        <i className="fas fa-arrow-down"></i>
                                    </div>
                                </section>
                            );
                        case 'about':
                            return visibility.about !== false && (
                                <section key="about" id="about">
                                    <div className="container">
                                        <div className="section-number parallax" data-speed="0.15">01</div>
                                        <h2 className="section-title neo-reveal">ABOUT</h2>
                                        <div className="about-content neo-reveal neo-reveal-delay-1">
                                            <div className="about-description">{professionalSummary}</div>
                                            {data.jobSearchSuggestions && (data.jobSearchSuggestions as string[]).length > 0 && (
                                                <div className="mt-10 p-8 border-2 border-black/10 bg-black/5">
                                                    <h3 className="font-mono text-[10px] uppercase font-bold tracking-widest mb-4 opacity-60">Strategic Targets</h3>
                                                    <div className="flex flex-wrap gap-3">
                                                        {(data.jobSearchSuggestions as string[]).map((job: string) => (
                                                            <span key={job} className="px-4 py-2 border-2 border-black font-archivo text-xs hover:bg-[#FF3366] hover:text-white transition-colors">{job.toUpperCase()}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="about-stats">
                                                <div className="stat-item">
                                                    <div className="stat-number">{experience.length}</div>
                                                    <div className="stat-label">Years Exp</div>
                                                </div>
                                                <div className="stat-item">
                                                    <div className="stat-number">{projects.length}</div>
                                                    <div className="stat-label">Projects</div>
                                                </div>
                                                <div className="stat-item">
                                                    <div className="stat-number">{skills.technical?.length || 0}</div>
                                                    <div className="stat-label">Hard Skills</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        case 'skills':
                            return visibility.skills !== false && (
                                <section key="skills" id="skills" className="skills-section">
                                    <div className="container">
                                        <div className="section-number parallax" data-speed="0.15">02</div>
                                        <div className="skills-watermark scroll-marquee" data-speed="0.8" data-base="translate(-50%, -50%)">SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS</div>
                                        <h2 className="section-title neo-reveal">SKILLS</h2>
                                        <div className="skills-container neo-reveal neo-reveal-delay-1">                            {skills.technical?.length > 0 && (
                                            <div className="skill-category">
                                                <div className="category-label">REC_01</div>
                                                <h3 className="category-title"><i className="fas fa-code"></i> TECHNICAL</h3>
                                                <div className="skills-grid">
                                                    {skills.technical.map((s: string) => <span key={s} className="skill-tag">{s}</span>)}
                                                </div>
                                            </div>
                                        )}

                                            {data.tools?.length > 0 && (
                                                <div className="skill-category">
                                                    <div className="category-label">REC_02</div>
                                                    <h3 className="category-title"><i className="fas fa-tools"></i> TOOLS</h3>
                                                    <div className="skills-grid">
                                                        {data.tools.map((s: string) => <span key={s} className="skill-tag">{s}</span>)}
                                                    </div>
                                                </div>
                                            )}
                                            {skills.soft?.length > 0 && (
                                                <div className="skill-category">
                                                    <div className="category-label">REC_03</div>
                                                    <h3 className="category-title"><i className="fas fa-users"></i> STRENGTHS</h3>
                                                    <div className="skills-grid">
                                                        {skills.soft.map((s: string) => <span key={s} className="skill-tag">{s}</span>)}
                                                    </div>
                                                </div>
                                            )}
                                            {skills.languages?.length > 0 && (
                                                <div className="skill-category">
                                                    <div className="category-label">REC_04</div>
                                                    <h3 className="category-title"><i className="fas fa-language"></i> LANGUAGES</h3>
                                                    <div className="skills-grid">
                                                        {skills.languages.map((s: string) => <span key={s} className="skill-tag">{s}</span>)}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            );
                        case 'experience':
                            return visibility.experience !== false && (
                                <section key="experience" id="experience">
                                    <div className="container">
                                        <div className="section-number parallax" data-speed="0.15">03</div>
                                        <h2 className="section-title neo-reveal">EXPERIENCE</h2>
                                        <div className="timeline-horizontal">
                                            {experience.map((exp, i) => (
                                                <div key={i} className="neo-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                                                    <div className="timeline-item">
                                                        <h3 className="timeline-title">{exp.title}</h3>
                                                        <div className="timeline-company">{exp.company}</div>
                                                        <div className="timeline-date"><i className="fas fa-calendar"></i> {exp.startDate} - {exp.endDate}</div>
                                                        <ul className="timeline-responsibilities">
                                                            {exp.responsibilities?.map((r: string, j: number) => <li key={j}>{r}</li>)}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            );
                        case 'education':
                            return visibility.education !== false && (
                                <section key="education" id="education">
                                    <div className="container">
                                        <div className="section-number parallax" data-speed="0.15">04</div>
                                        <h2 className="section-title neo-reveal">EDUCATION</h2>
                                        <div className="space-y-4">
                                            {education.map((edu, i) => (
                                                <div key={i} className="neo-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                                                    <div className="education-card">
                                                        <div>
                                                            <h3 className="education-degree">{edu.degree}</h3>
                                                            <div className="education-institution">{edu.institution}</div>
                                                            <div className="font-mono text-[10px] opacity-40 mt-2 uppercase tracking-widest">{edu.graduationYear} • {edu.location}</div>
                                                        </div>
                                                        <div className="education-icon"><i className="fas fa-graduation-cap"></i></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            );
                        case 'projects':
                            return visibility.projects !== false && (
                                <section key="projects" id="projects" className="projects-section">
                                    <div className="container">
                                        <div className="section-number parallax" data-speed="0.15">05</div>
                                        <h2 className="section-title neo-reveal">PROJECTS</h2>
                                        <div className="projects-grid">
                                            {projects.map((p, i) => {
                                                const projectImages = p.images || (p.image ? [p.image] : []);
                                                return (
                                                    <div key={i} className="project-card-wrapper neo-reveal" style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
                                                        <div
                                                            className="project-card"
                                                            onClick={() => openLightbox(projectImages, 0, p.title, p.description, (p.github || p.githubUrl), (p.link || p.url))}
                                                            data-project-cluster
                                                            data-images={JSON.stringify(projectImages)}
                                                            data-title={p.title}
                                                            data-description={p.description}
                                                            data-github={(p.github || p.githubUrl) || ""}
                                                            data-live={(p.link || p.url) || ""}
                                                        >
                                                            <div className="tactical-label">PRJ.ID // {i < 9 ? `0${i + 1}` : i + 1}</div>
                                                            {projectImages.length > 0 ? (
                                                                projectImages.map((img: string, idx: number) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={img}
                                                                        alt={p.title}
                                                                        className="project-image"
                                                                        data-anim="project-image"
                                                                        data-index={idx}
                                                                        data-total={projectImages.length}
                                                                        style={{
                                                                            zIndex: idx === 0 ? 1 : 0,
                                                                            opacity: idx === 0 ? 1 : 0
                                                                        }}
                                                                    />
                                                                ))
                                                            ) : (
                                                                <>
                                                                    <div className="project-placeholder"></div>
                                                                    <div className="project-placeholder-content">
                                                                        <i className="fas fa-lock placeholder-icon"></i>
                                                                        <div className="placeholder-tag">DATA_RESTRICTED // 0xAF</div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {projectImages.length > 1 && (
                                                                <>
                                                                    <div className="project-indicator-list">
                                                                        {projectImages.slice(1, 4).map((img: string, idx: number) => (
                                                                            <div key={idx} className="project-mini-dot" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                                                                <img src={img} alt="preview" />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="project-shot-badge">
                                                                        <div className="badge-pulse"></div>
                                                                        <span>GALLERY // {projectImages.length} SHOTS</span>
                                                                    </div>
                                                                </>
                                                            )}

                                                            <div className="project-content">
                                                                <h3 className="project-title" data-text={p.title}>{p.title}</h3>
                                                                <p className="project-description">{p.description}</p>
                                                                {p.description && p.description.length > 100 && (
                                                                    <button
                                                                        className="project-show-more"
                                                                        onClick={(e) => { e.stopPropagation(); openLightbox(projectImages, 0, p.title, p.description, (p.github || p.githubUrl), (p.link || p.url)); }}
                                                                    >
                                                                        READ_FILE <i className="fas fa-chevron-right"></i>
                                                                    </button>
                                                                )}
                                                                <div className="project-tech">
                                                                    {(p.technologiesUsed || p.technologies || []).map((t: string) => <span key={t} className="tech-tag">{t}</span>)}
                                                                </div>
                                                                <div className="project-links">
                                                                    {(p.github || p.githubUrl) && (
                                                                        <a href={p.github || p.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn" onClick={(e) => e.stopPropagation()}>
                                                                            <i className="fab fa-github"></i>
                                                                        </a>
                                                                    )}
                                                                    {(p.link || p.url) && (
                                                                        <a href={p.link || p.url} target="_blank" rel="noopener noreferrer" className="project-link-btn" onClick={(e) => e.stopPropagation()}>
                                                                            <i className="fas fa-external-link-alt"></i>
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </section>
                            );
                        case 'additional':
                            return visibility.additional !== false && (data.certifications?.length > 0 || data.awards?.length > 0 || data.publications?.length > 0 || data.volunteerExperience?.length > 0 || data.hobbies?.length > 0) && (
                                <section key="additional" id="additional" className="bg-black/5">
                                    <div className="container">
                                        <div className="section-number parallax" data-speed="0.15">06</div>
                                        <h2 className="section-title neo-reveal">ASSETS // RECORDS</h2>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                            {data.certifications?.length > 0 && (
                                                <div className="neo-reveal" style={{ transitionDelay: '0.1s' }}>
                                                    <div className="additional-card" data-id="CERT_VER_01">
                                                        <h3><i className="fas fa-certificate"></i> CLEARANCES</h3>
                                                        <div className="space-y-4">
                                                            {data.certifications.map((c: any, i: number) => (
                                                                <div key={i} className="additional-item">
                                                                    <div className="additional-item-icon"><i className="fas fa-shield-alt"></i></div>
                                                                    <div className="flex-1">
                                                                        <div className="additional-item-title">{typeof c === 'string' ? c : c.name} <span className="asset-tag">VERIFIED</span></div>
                                                                        <div className="additional-item-meta">
                                                                            <div className="status-dot"></div>
                                                                            <span>{c.issuer || "INDEPENDENT_AUTH"} // REF_{i + 10}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {data.awards?.length > 0 && (
                                                <div className="neo-reveal" style={{ transitionDelay: '0.2s' }}>
                                                    <div className="additional-card" data-id="AWRD_REC_02">
                                                        <h3><i className="fas fa-trophy"></i> COMMENDATIONS</h3>
                                                        <div className="space-y-4">
                                                            {data.awards.map((a: any, i: number) => (
                                                                <div key={i} className="additional-item">
                                                                    <div className="additional-item-icon"><i className="fas fa-medal"></i></div>
                                                                    <div className="flex-1">
                                                                        <div className="additional-item-title">{typeof a === 'string' ? a : a.title}</div>
                                                                        <div className="additional-item-meta">
                                                                            <div className="status-dot" style={{ background: '#FFD700', boxShadow: '0 0 5px #FFD700' }}></div>
                                                                            <span>{a.issuer || "GLOBAL_RANK"} // DISTINCTION // {a.date || '2024'}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {data.publications?.length > 0 && (
                                                <div className="neo-reveal" style={{ transitionDelay: '0.3s' }}>
                                                    <div className="additional-card" data-id="PUB_ARCH_03">
                                                        <h3><i className="fas fa-book"></i> PROTOCOLS</h3>
                                                        <div className="space-y-4">
                                                            {data.publications.map((p: any, i: number) => (
                                                                <div key={i} className="additional-item">
                                                                    <div className="additional-item-icon"><i className="fas fa-file-alt"></i></div>
                                                                    <div className="flex-1">
                                                                        <div className="additional-item-title">{typeof p === 'string' ? p : p.title}</div>
                                                                        <div className="additional-item-meta">
                                                                            <i className="fas fa-link"></i>
                                                                            <span>{p.publisher || "INTEL_NET"} // ARCHIVE_SCAN</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {data.volunteerExperience?.length > 0 && (
                                                <div className="neo-reveal" style={{ transitionDelay: '0.4s' }}>
                                                    <div className="additional-card" data-id="VOL_SERV_04">
                                                        <h3><i className="fas fa-hands-helping"></i> FIELD_OPS</h3>
                                                        <div className="space-y-4">
                                                            {data.volunteerExperience.map((v: any, i: number) => (
                                                                <div key={i} className="additional-item">
                                                                    <div className="additional-item-icon"><i className="fas fa-user-shield"></i></div>
                                                                    <div className="flex-1">
                                                                        <div className="additional-item-title">{typeof v === 'string' ? v : (v.role || v.title)}</div>
                                                                        <div className="additional-item-meta">
                                                                            <span>{v.organization || "OPERATIONS"} // {v.startDate || 'MISSION'}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {data.hobbies?.length > 0 && (
                                                <div className="neo-reveal" style={{ transitionDelay: '0.5s' }}>
                                                    <div className="additional-card" data-id="INTEL_INT_05">
                                                        <h3><i className="fas fa-fingerprint"></i> INTERESTS</h3>
                                                        <div className="flex flex-wrap gap-3 mt-4">
                                                            {data.hobbies.map((h: string) => <span key={h} className="skill-tag" style={{ clipPath: 'none', borderWeight: '1px' }}>{h.toUpperCase()}</span>)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            );
                        case 'contact':
                            return visibility.contact !== false && (
                                <section key="contact" id="contact">
                                    <div className="container">
                                        <div className="section-number parallax" data-speed="0.15">07</div>
                                        <h2 className="contact-heading neo-reveal">LET'S TALK</h2>
                                        <div className="contact-methods">
                                            {personalInfo.email && (
                                                <div className="neo-reveal" style={{ transitionDelay: '0.1s' }}>
                                                    <a href={`mailto:${personalInfo.email}`} className="contact-method">
                                                        <i className="fas fa-envelope contact-icon"></i>
                                                        <div className="contact-label">Email</div>
                                                        <div className="contact-value">{personalInfo.email}</div>
                                                    </a>
                                                </div>
                                            )}
                                            {personalInfo.linkedin && (
                                                <div className="neo-reveal" style={{ transitionDelay: '0.2s' }}>
                                                    <a href={personalInfo.linkedin} className="contact-method">
                                                        <i className="fab fa-linkedin contact-icon"></i>
                                                        <div className="contact-label">LinkedIn</div>
                                                        <div className="contact-value">Connect Prof.</div>
                                                    </a>
                                                </div>
                                            )}
                                            {personalInfo.phone && (
                                                <div className="neo-reveal" style={{ transitionDelay: '0.3s' }}>
                                                    <a href={`tel:${personalInfo.phone}`} className="contact-method">
                                                        <i className="fas fa-phone contact-icon"></i>
                                                        <div className="contact-label">Phone</div>
                                                        <div className="contact-value">{personalInfo.phone}</div>
                                                    </a>
                                                </div>
                                            )}
                                            {personalInfo.location && (
                                                <div className="neo-reveal" style={{ transitionDelay: '0.4s' }}>
                                                    <div className="contact-method">
                                                        <i className="fas fa-map-marker-alt contact-icon"></i>
                                                        <div className="contact-label">Location</div>
                                                        <div className="contact-value">{personalInfo.location}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            );
                        default:
                            return null;
                    }
                })}
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <p className="footer-text">© 2026 {personalInfo.fullName?.toUpperCase()}</p>
                        <div className="flex gap-4">
                            {['GITHUB', 'LINKEDIN', 'EMAIL'].map(s => <span key={s} className="text-[10px] font-bold tracking-widest opacity-40">{s}</span>)}
                        </div>
                    </div>
                </div>
            </footer>

            <button className={`flex justify-center items-center back-to-top ${isScrolled ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <i className="fas fa-arrow-up"></i>
            </button>

            <div
                id="lightbox-container"
                className={`fixed inset-0 z-[40000] bg-black flex flex-col lg:flex-row items-stretch transition-all duration-500 ${lightbox.isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={closeLightbox}
                style={{ cursor: 'auto' }}
            >


                <div className="flex-grow lg:w-[70%] flex flex-col items-center justify-center p-10 relative overflow-hidden bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000_100%)]">
                    <button className="absolute top-10 left-10 text-white text-2xl hover:scale-110 transition-transform z-50 flex items-center gap-3 uppercase font-['JetBrains_Mono'] tracking-widest opacity-50" onClick={closeLightbox}>
                        <i className="fas fa-times"></i> <span className="hidden lg:inline">Close_Session</span>
                    </button>

                    <div id="lightbox-image-placeholder" className={`w-full max-w-4xl h-[60vh] flex flex-col items-center justify-center bg-white/5 border-2 border-white/10 text-white/20 p-20 text-center gap-6 ${lightbox.images.length === 0 ? 'flex' : 'hidden'}`}>
                        <div className="project-placeholder" style={{ opacity: 0.05 }}></div>
                        <i className="fas fa-database text-9xl opacity-10"></i>
                        <div className="font-['Archivo_Black'] text-4xl uppercase tracking-tighter opacity-10">ENCRYPTED_RECORD</div>
                    </div>

                    <img
                        id="lightbox-image"
                        src={lightbox.images[lightbox.index] || ""}
                        className={`max-w-full max-h-[70vh] object-contain border-2 border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.8)] z-10 transition-all duration-300 ${lightbox.images.length > 0 ? 'block' : 'hidden'}`}
                        onClick={(e) => e.stopPropagation()}
                    />



                    {lightbox.images.length > 1 && (
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-10 pointer-events-none z-20">
                            <button
                                id="lightbox-prev"
                                className="w-16 h-16 bg-white/5 border border-white/10 text-white text-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all pointer-events-auto"
                                onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length }); }}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button
                                id="lightbox-next"
                                className="w-16 h-16 bg-white/5 border border-white/10 text-white text-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all pointer-events-auto"
                                onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length }); }}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    )}



                    <div
                        id="lightbox-thumbnails"
                        className="absolute bottom-10 flex gap-3 overflow-x-auto p-4 max-w-[80%] z-20"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {lightbox.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`w-16 h-16 flex-shrink-0 border-2 cursor-pointer transition-all ${idx === lightbox.index ? 'border-accent scale-110' : 'border-white/20 opacity-30 hover:opacity-100 hover:border-white'}`}
                                onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: idx }); }}
                            >
                                <img src={img} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>


                <div
                    id="lightbox-info"
                    className={`lg:w-[35%] w-full flex-shrink-0 transition-transform duration-700 delay-300 ${lightbox.isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="lightbox-info h-full">
                        <div className="lightbox-title-area">
                            <div className="flex-1">
                                <span className="lightbox-badge">DATA_STREAM</span>
                                <h2 className="lightbox-title mt-2">{lightbox.title || "UNTITLED_ENTRY"}</h2>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-[8px] opacity-40">ENTRY_REF // 0xAF</div>
                                <div className="font-mono text-[8px] opacity-40">TIMESTAMP // {new Date().getFullYear()}</div>
                            </div>
                        </div>

                        <div className="lightbox-description">
                            {lightbox.description || "NO_DESCRIPTION_PROVIDED_BY_SOURCE"}

                            {(lightbox.github || lightbox.live) && (
                                <div className="mt-12 pt-10 border-t border-accent/20">
                                    <div className="font-mono text-[10px] text-accent font-bold mb-6 tracking-widest uppercase opacity-60 flex items-center gap-2">
                                        <div className="w-1 h-1 bg-accent animate-pulse"></div>
                                        PROJECT_CONNECT
                                    </div>
                                    <div className="space-y-4">
                                        {lightbox.github && (
                                            <a href={lightbox.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-white/5 bg-white/5 hover:border-accent hover:bg-accent/10 group transition-all">
                                                <div className="flex items-center gap-4">
                                                    <i className="fab fa-github text-xl opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all"></i>
                                                    <span className="font-mono text-xs uppercase tracking-tighter opacity-70 group-hover:opacity-100">GITHUB REPOSITORY</span>
                                                </div>
                                                <i className="fas fa-external-link-alt text-[10px] opacity-20 group-hover:opacity-100"></i>
                                            </a>
                                        )}
                                        {lightbox.live && (
                                            <a href={lightbox.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-white/5 bg-white/5 hover:border-accent hover:bg-accent/10 group transition-all">
                                                <div className="flex items-center gap-4">
                                                    <i className="fas fa-globe text-xl opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all"></i>
                                                    <span className="font-mono text-xs uppercase tracking-tighter opacity-70 group-hover:opacity-100">LIVE DEPLOYMENT</span>
                                                </div>
                                                <i className="fas fa-external-link-alt text-[10px] opacity-20 group-hover:opacity-100"></i>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <ReadContextProvider>
            <CustomizationProvider
                initialLightVars={{
                    '--bg': '#FFFFFF',
                    '--primary': '#000000',
                    '--accent': '#FF3366',
                    '--secondary': '#0066FF',
                    '--text': '#1a1a1a',
                    '--text-secondary': '#666666',
                    '--border': '#000000',
                    '--highlight': '#FFFF00',
                    '--shadow': 'rgba(0, 0, 0, 0.1)',
                    '--card-bg': '#FFFFFF',
                    '--nav-bg': 'rgba(255, 255, 255, 0.85)',
                    '--radius': '0px',
                    '--shadow-depth': '10px',
                    '--border-width': '3px',
                    '--font-size-base': '16px',
                    '--letter-spacing': '-1.5px',
                    '--blur': '12px',
                    '--grid-opacity': '0.1',
                    '--font-main': "'Space Grotesk', sans-serif"
                }}
                initialDarkVars={{
                    '--bg': '#0a0a0a',
                    '--primary': '#FFFFFF',
                    '--accent': '#00FF9F',
                    '--secondary': '#FF0066',
                    '--text': '#f5f5f5',
                    '--text-secondary': '#b3b3b3',
                    '--border': '#FFFFFF',
                    '--highlight': '#00FFFF',
                    '--shadow': 'rgba(255, 255, 255, 0.1)',
                    '--card-bg': '#1a1a1a',
                    '--nav-bg': 'rgba(10, 10, 10, 0.85)',
                    '--radius': '0px',
                    '--shadow-depth': '10px',
                    '--border-width': '3px',
                    '--font-size-base': '16px',
                    '--letter-spacing': '-1.5px',
                    '--blur': '12px',
                    '--grid-opacity': '0.1',
                    '--font-main': "'Space Grotesk', sans-serif"
                }}
            >
                <GradientFolio />
                <PortfolioCustomizer />
            </CustomizationProvider>
        </ReadContextProvider>
    );
};

export default Page;
