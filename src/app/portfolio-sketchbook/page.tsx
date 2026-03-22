"use client"

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { ArrowRight, Check, MapPin, Mail, Linkedin, Instagram, Facebook, ChevronRight, Menu, X, GraduationCap, Sparkles, Compass, Target } from "lucide-react";

const NAV_LINKS = ["Services", "À propos", "Témoignages", "Contact"];

const STATS = [
  { num: "2000", sup: "+", label: "Candidats accompagnés" },
  { num: "85", sup: "%", label: "Taux de réussite" },
  { num: "150", sup: "+", label: "Entreprises partenaires" },
  { num: "5", sup: "+", label: "Ans d'expertise" },
];

const SERVICES = [
  { id: "01", title: "Formation & Compétences", color: "#C8281E", items: ["Formation digitale moderne", "Soft skills & Leadership", "Certifications métier", "Ateliers pratiques"] },
  { id: "02", title: "Personal Branding", color: "#1A6B3A", items: ["Optimisation CV & LinkedIn", "Lettres stratégiques", "Image professionnelle", "Personal Pitching"] },
  { id: "03", title: "Career Coaching", color: "#8B5E3C", items: ["Accompagnement 1-on-1", "Bilan de compétences", "Plan de carrière", "Suivi de performance"] },
  { id: "04", title: "Préparation Entretiens", color: "#2563EB", items: ["Simulations réalistes", "Négociation salariale", "Gestion du stress", "Pitch de présentation"] },
  { id: "05", title: "Mobilité Internationale", color: "#A21CAF", items: ["Opportunités à l'étranger", "Visas & Procédures", "Adaptation culturelle", "Réseau global"] },
  { id: "06", title: "Réseautage Stratégique", color: "#0D9488", items: ["Accès aux décideurs", "Clubs exclusifs", "Événements networking", "Partenariats clés"] },
];

const VALUES = [
  { title: "Excellence", desc: "Le plus haut standard dans chaque service.", color: "#C8281E" },
  { title: "Intégrité", desc: "Transparence et éthique irréprochables.", color: "#1A6B3A" },
  { title: "Proximité", desc: "Une connaissance intime du marché local.", color: "#8B5E3C" },
  { title: "Engagement", desc: "Dédouement total pour chaque candidat.", color: "#2563EB" },
];

const ECOSYSTEM = [
  { name: "Oasis Hope", focus: "Préservation environnementale & éducation oasienne", loc: "Sud du Maroc", contact: "info.oasishopeassociation@gmail.com" },
  { name: "Hope Marrakech", focus: "Bien-être & réussite des jeunes (14-18 ans)", loc: "Marrakech", contact: "i.dehhab@gmail.com" },
  { name: "Village of Hope", focus: "Accueil & scolarité des enfants abandonnés", loc: "Ain Leuh", contact: "Humanitaire" },
  { name: "Project HOPE", focus: "Santé mondiale & aide humanitaire d'urgence", loc: "National", contact: "Séisme 2023" },
];

const TESTIMONIALS = [
  { initials: "SA", name: "Salma Alaoui", role: "Chef de projet · Casablanca", quote: "Grâce à Hope Morocco, j'ai décroché mon CDI en 3 mois. Un accompagnement exceptionnel.", color: "#1A6B3A" },
  { initials: "YB", name: "Youssef Benali", role: "Développeur Web · Rabat", quote: "Les formations digitales ont transformé mon profil. Je suis passé chercheur d'emploi à freelance reconnu.", color: "#C8281E" },
  { initials: "NM", name: "Nadia Moussaoui", role: "RH Manager · Marrakech", quote: "Le coaching carrière m'a aidée à négocier une promotion que je n'osais pas envisager avant.", color: "#8B5E3C" },
  { initials: "KE", name: "Karim El Fassi", role: "Ingénieur Financier · Casablanca", quote: "Les simulations d'entretien étaient tellement réalistes que le vrai entretien m'a semblé facile.", color: "#2563EB" },
];

const P1 = [
  { url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&q=80", h: 240 },
  { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80", h: 130 },
  { url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80", h: 175 },
  { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80", h: 240 },
  { url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", h: 175 },
  { url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80", h: 130 },
];
const P2 = [
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", h: 175 },
  { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", h: 240 },
  { url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80", h: 130 },
  { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80", h: 240 },
  { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80", h: 130 },
  { url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80", h: 175 },
];

function FadeIn({ children, delay = 0, y = 30, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({ src, alt, speed = 0.1, className = "" }: { src: string; alt: string; speed?: number; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.2 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function StatBox({ num, sup, label, delay = 0 }: { num: string; sup: string; label: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const end = parseInt(num);
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / end));
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, Math.max(stepTime, 16));
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref} className="text-center py-8 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        className="font-editorial lg:text-[3.5rem] md:text-[3.5vw] text-[2.5rem] font-bold text-white leading-none mb-2"
      >
        {count.toLocaleString()}<span className="text-[#C8281E] text-[1.5rem] ml-1">{sup}</span>
      </motion.div>
      <div className="text-[0.7rem] tracking-widest uppercase text-white/45 font-medium">{label}</div>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "2rem" }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
        className="h-[1px] bg-gradient-to-r from-[#C8281E] to-transparent mx-auto mt-4"
      />
    </div>
  );
}


function FloatingShapes() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#F9F6F0]">
      <motion.div
        style={{ y: y1, rotate }}
        animate={{
          x: [0, 100, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#C8281E]/[0.03] rounded-full blur-[150px]"
      />
      <motion.div
        style={{ y: y2, rotate: useTransform(rotate, (v) => -v) }}
        animate={{
          x: [0, -150, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] bg-[#1A6B3A]/[0.04] rounded-full blur-[180px]"
      />
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Added ref for local horizontal scroll tracking
  const impactRef = useRef(null);
  const { scrollYProgress: impactScroll } = useScroll({
    target: impactRef,
    offset: ["start start", "end end"]
  });
  const horizontalX = useTransform(impactScroll, [0, 1], ["0%", "-60%"]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroScrollY = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <>
      <FloatingShapes />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@200;300;400;500;700&display=swap');
        
        :root {
          --primary: #C8281E;
          --secondary: #1A6B3A;
          --accent: #8B5E3C;
          --bg: #F9F6F0;
          --text: #111;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .font-editorial { font-family: 'Cormorant Garamond', serif; }
        .font-display { font-family: 'Bebas Neue', sans-serif; }

        @keyframes gridPan { 0% { background-position: 0 0 } 100% { background-position: 60px 60px } }
        @keyframes scrollUp  {0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
        @keyframes scrollDown{0%{transform:translateY(-50%)}100%{transform:translateY(0)}}
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        
        .glass {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glass-dark {
          background: rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .grain {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
          opacity: 0.03;
          pointer-events: none;
          z-index: 9999;
        }

        .zellige-mask {
          clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .zellige-mask:hover {
          clip-path: polygon(50% 5%, 90% 28%, 90% 72%, 50% 95%, 10% 72%, 10% 28%);
        }

        .text-balanced { text-wrap: balance; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
      `}</style>

      <div className="grain" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C8281E] via-[#1A6B3A] to-[#C8281E] z-[300] origin-left"
        style={{ scaleX }}
      />

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-[200] flex items-center justify-between px-8 md:px-16 bg-[#F9F6F0]/80 backdrop-blur-xl border-b border-black/5 h-20">
        <a href="#" className="font-display text-[1.6rem] tracking-[0.15em] text-[#111] group">
          HOPE <span className="text-[#C8281E] group-hover:text-[#111] transition-colors duration-300">MOROCCO</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "")}`} className="text-[#111]/60 hover:text-[#C8281E] text-[0.75rem] font-bold tracking-[0.1em] uppercase transition-colors duration-300">
              {l}
            </a>
          ))}
          <a href="#contact" className="relative overflow-hidden group bg-[#111] text-white py-3 px-8 rounded-full text-[0.75rem] font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#C8281E]">
            <span className="relative z-10">Rejoindre</span>
          </a>
        </div>

        <button className="md:hidden text-[#111]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[190] bg-[#F9F6F0] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "")}`} className="font-editorial text-3xl text-[#111]" onClick={() => setIsMobileMenuOpen(false)}>
                {l}
              </a>
            ))}
            <a href="#contact" className="bg-[#C8281E] text-white py-4 px-12 rounded-full font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>
              Rejoindre
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F9F6F0]">
        <motion.div
          style={{ y: heroScrollY, opacity: heroOpacity }}
          className="container mx-auto px-8 md:px-16 grid lg:grid-cols-2 gap-16 items-center relative z-10 pt-20"
        >
          {/* LEFT CONTENT */}
          <div>
            <FadeIn y={20}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[#C8281E]" />
                <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#7A7165] font-bold">L'excellence au service du Maroc</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} y={30}>
              <h1 className="font-editorial text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] font-bold leading-[0.95] tracking-tight text-[#111] mb-8 text-balanced">
                Chaque talent<br />
                <span className="italic text-[#C8281E] relative">
                  marocain
                  <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full" viewBox="0 0 300 20" fill="none"><motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }} d="M5 15Q150 5 295 15" stroke="#C8281E" strokeWidth="4" strokeLinecap="round" /></svg>
                </span>
                <br />mérite un avenir.
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-[1.1rem] md:text-[1.25rem] leading-relaxed text-[#7A7165] font-light max-w-[520px] mb-12">
                Nous bâtissons des ponts entre votre <strong className="text-[#111] font-medium italic">ambition</strong> et les meilleures opportunités du marché, avec un accompagnement <strong className="text-[#C8281E] font-medium">100% gratuit</strong>.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a href="#contact" className="group flex items-center justify-center gap-3 bg-[#C8281E] text-white py-5 px-10 rounded-full text-[0.8rem] font-bold tracking-widest uppercase shadow-2xl hover:bg-[#111] transition-all duration-500 hover:-translate-y-1 w-full sm:w-auto">
                  Lancer mon projet
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#services" className="group flex items-center gap-3 text-[#111] font-bold text-[0.8rem] tracking-widest uppercase py-4 border-b border-black/10 hover:border-[#C8281E] transition-all duration-300">
                  Explorer nos services
                  <ChevronRight className="w-4 h-4 text-[#C8281E] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeIn>

            <div className="mt-16 pt-8 border-t border-black/5 grid grid-cols-3 gap-8">
              {STATS.slice(0, 3).map((s, i) => (
                <div key={i}>
                  <div className="font-editorial text-3xl font-bold text-[#111]">{s.num}<span className="text-[#C8281E] text-sm ml-0.5">{s.sup}</span></div>
                  <div className="text-[0.6rem] uppercase tracking-widest text-[#7A7165] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL - RESTORED SCROLLING COLUMNS */}
          <FadeIn delay={0.4} className="hidden lg:block relative h-[75vh] w-full overflow-hidden rounded-[3rem] glass">
            {/* Inner Shadow / Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />

            <motion.div
              style={{ scale: useTransform(useScroll().scrollYProgress, [0, 0.2], [1, 1.1]) }}
              className="grid grid-cols-2 gap-4 h-full p-4 overflow-hidden"
            >
              {/* Column 1 - Scrolling Up */}
              <div className="flex flex-col gap-4 animate-[scrollUp_40s_linear_infinite] will-change-transform">
                {[...P1, ...P1].map((p, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden shrink-0 relative group">
                    <img src={p.url} alt="" className="w-full object-cover transition-all duration-700" style={{ height: p.h }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>

              {/* Column 2 - Scrolling Down */}
              <div className="flex flex-col gap-4 animate-[scrollDown_40s_linear_infinite] will-change-transform">
                {[...P2, ...P2].map((p, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden shrink-0 relative group">
                    <img src={p.url} alt="" className="w-full object-cover transition-all duration-700" style={{ height: p.h }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Gradient Masking for smooth edges - REDUCED INTENSITY */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F9F6F0] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F9F6F0] to-transparent z-10" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#1A6B3A] rounded-full flex flex-col items-center justify-center text-white shadow-2xl z-30 border-4 border-[#F9F6F0]">
              <div className="font-display text-3xl">100%</div>
              <div className="text-[0.5rem] font-bold tracking-widest uppercase">Gratuit</div>
            </div>
          </FadeIn>
        </motion.div>

        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#EDE8DF] -z-10 rounded-l-[5rem]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:52px_52px] -z-10 animate-[gridPan_30s_linear_infinite]" />
      </section>

      {/* ── SCROLLABLE PAGE ── */}
      <main className="relative z-10 bg-[#F9F6F0]">

        <section id="services" className="py-40 px-8 md:px-16 overflow-hidden relative">
          {/* Background Marquee - Multi-layered Parallax */}
          <div className="absolute top-1/4 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none -rotate-3 z-0 flex flex-col gap-4">
            <motion.div
              style={{ x: useTransform(useScroll().scrollYProgress, [0, 1], ["0%", "-30%"]) }}
              className="whitespace-nowrap font-display text-[20rem] leading-none text-[#111]"
            >
              EXPERTISE • INNOVATION • SUCCESS • EMPOWERMENT • COMMUNITY • IMPACT • FUTURE • GROWTH •
            </motion.div>
            <motion.div
              style={{ x: useTransform(useScroll().scrollYProgress, [0, 1], ["-30%", "0%"]) }}
              className="whitespace-nowrap font-display text-[20rem] leading-none text-[#111] italic"
            >
              SCULPTING LEADERS • MOROCCAN EXCELLENCE • STRATEGIC GROWTH •
            </motion.div>
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32">
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-[2px] bg-[#C8281E]" />
                  <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#7A7165] font-bold">L'Art de l'Accompagnement</span>
                </div>
                <h2 className="font-editorial text-[4rem] md:text-[6.5rem] lg:text-[7.5rem] font-bold text-[#111] leading-[0.8] tracking-tight">
                  Design de<br /><span className="italic text-[#C8281E]">Carrières</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2} className="max-w-md lg:mb-6">
                <p className="text-xl leading-relaxed text-[#7A7165] font-light italic">
                  "Nous ne formons pas seulement des candidats, nous sculptons les leaders de l'économie marocaine de demain."
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((s, i) => {
                const Icon = [
                  (props: any) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  ),
                  (props: any) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <path d="M6 3h12l4 6-10 12L2 9z" />
                      <path d="M11 3l-4 6 5 11 5-11-4-6" />
                      <path d="M2 9h20" />
                    </svg>
                  ),
                  (props: any) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </svg>
                  ),
                  (props: any) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  ),
                  (props: any) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                  (props: any) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M9 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    </svg>
                  )
                ][i];

                return (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div 
                      className="group relative p-10 bg-white border border-black/[0.05] rounded-[2.5rem] transition-all duration-500 h-full flex flex-col hover:-translate-y-2 hover:border-[var(--accent-color)] hover:shadow-xl"
                      style={{ "--accent-color": s.color } as any}
                    >
                      {/* Illustration - Static */}
                      <div className="mb-10 w-12 h-12 flex items-center justify-center" style={{ color: s.color }}>
                        <Icon className="w-full h-full" />
                      </div>

                      {/* Number */}
                      <div className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#111]/30 mb-4">
                        Service 0{i + 1}
                      </div>

                      {/* Title */}
                      <h3 className="font-editorial text-2xl lg:text-3xl font-bold text-[#111] mb-6 leading-tight">
                        {s.title}
                      </h3>

                      {/* List Items - Simple */}
                      <div className="space-y-4 mt-auto">
                        {s.items.map((it, j) => (
                          <div key={j} className="text-[0.85rem] text-[#7A7165] font-light leading-relaxed flex items-center gap-3">
                            <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: s.color + '40' }} />
                            {it}
                          </div>
                        ))}
                      </div>

                      {/* Simple Accent Underline */}
                      <div className="absolute bottom-10 right-10 opacity-10 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="py-40 px-8 md:px-16 bg-[#111] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(200,40,30,0.1),transparent_50%)]" />

          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center mb-32">
              <FadeIn>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-[#C8281E]" />
                  <span className="text-[0.65rem] tracking-[0.3em] uppercase text-white/40 font-bold">Le Processus</span>
                  <div className="w-12 h-[1px] bg-[#C8281E]" />
                </div>
                <h2 className="font-editorial text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-bold leading-tight">
                  Trajectoire vers <br /><span className="italic text-[#C8281E]">l'emploi</span>
                </h2>
              </FadeIn>
            </div>

            <div className="grid md:grid-cols-3 gap-16 md:gap-24">
              {[
                { n: "01", t: "Diagnostic", img: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&q=80", d: "Bilan approfondi de vos compétences et définition de vos objectifs professionnels." },
                { n: "02", t: "Transition", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80", d: "Formations intensives hard & soft skills adaptées au marché marocain." },
                { n: "03", t: "Placement", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80", d: "Mise en relation directe avec les recruteurs et suivi post-embauche." }
              ].map((step, i) => (
                <FadeIn key={i} delay={i * 0.2}>
                  <div className="relative group">
                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-10 transition-transform duration-700 group-hover:-translate-y-4">
                      <img src={step.img} alt="" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-8 right-8 font-display text-7xl text-[#C8281E]/30 leading-none group-hover:text-[#C8281E]/60 transition-colors">{step.n}</div>
                    </div>
                    <h3 className="font-editorial text-3xl font-bold mb-4 group-hover:text-[#C8281E] transition-colors">{step.t}</h3>
                    <p className="text-white/40 leading-relaxed font-light">{step.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS / STATS */}
        <section className="py-24 bg-[#111] border-y border-white/5 relative">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
              {STATS.map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <StatBox num={s.num} sup={s.sup} label={s.label} delay={i * 0.1} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT - EXPERIMENTAL PINNED LAYOUT */}
        <section id="àpropos" className="py-60 px-8 md:px-16 overflow-hidden bg-[#F9F6F0]">
          <div className="max-w-[1400px] mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-32 items-start">

              {/* Left Side: Pinned Text */}
              <div className="lg:sticky lg:top-40 lg:h-[60vh] flex flex-col justify-center">
                <FadeIn>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-[2px] bg-[#C8281E]" />
                    <span className="text-[0.8rem] tracking-[0.4em] uppercase text-[#7A7165] font-bold">L'Héritage d'Espoir</span>
                  </div>
                  <h2 className="font-editorial text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] font-bold text-[#111] leading-[0.8] tracking-tighter mb-16">
                    L'âme d'une<br />
                    <span className="italic relative inline-block">
                      nation
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "110%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute bottom-4 left-[-5%] h-4 bg-[#1A6B3A]/10 -z-10"
                      />
                    </span><br />
                    en <span className="text-[#C8281E]">mouvement</span>
                  </h2>
                </FadeIn>

                <div className="max-w-md space-y-10">
                  <FadeIn delay={0.2}>
                    <p className="text-2xl font-light text-[#111] leading-relaxed">
                      Plus qu'une association, nous sommes un <span className="font-bold underline decoration-[#C8281E]/30 decoration-4 underline-offset-8">laboratoire de réussite</span> au cœur du Maroc.
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.3}>
                    <p className="text-[#7A7165] text-lg leading-relaxed font-light">
                      Depuis 2019, Hope Morocco tisse des liens entre les ambitions des jeunes talents et les réalités du marché. Notre mission est de transformer le potentiel en excellence opérationnelle.
                    </p>
                  </FadeIn>

                  {/* Mission & Vision Mini-Grid */}
                  <FadeIn delay={0.4} className="grid grid-cols-2 gap-8 py-8 border-y border-black/5">
                    <div>
                      <h4 className="text-[0.6rem] uppercase tracking-widest font-bold text-[#C8281E] mb-3">Ma Mission</h4>
                      <p className="text-sm text-[#111] leading-relaxed">Accompagner chaque talent vers la réussite professionnelle durable au Maroc.</p>
                    </div>
                    <div>
                      <h4 className="text-[0.6rem] uppercase tracking-widest font-bold text-[#1A6B3A] mb-3">Ma Vision</h4>
                      <p className="text-sm text-[#111] leading-relaxed">Être le catalyseur de croissance et le pont unique entre talent et opportunités.</p>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.5}>
                    <div className="flex items-center gap-12">
                      <div className="group">
                        <div className="font-editorial text-7xl font-bold text-[#C8281E] leading-none mb-2 transition-transform group-hover:scale-110">85%</div>
                        <div className="text-[0.65rem] uppercase tracking-[0.3em] text-[#7A7165] font-bold">Insertion</div>
                      </div>
                      <div className="w-[1px] h-16 bg-black/5" />
                      <div className="group">
                        <div className="font-editorial text-7xl font-bold text-[#1A6B3A] leading-none mb-2 transition-transform group-hover:scale-110">2K+</div>
                        <div className="text-[0.65rem] uppercase tracking-[0.3em] text-[#7A7165] font-bold">Lauréats</div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>

              {/* Right Side: Visual Wall & Values */}
              <div className="relative pt-20 lg:pt-0">
                <div className="grid grid-cols-2 gap-8">
                  {/* Values Integration */}
                  <div className="space-y-8">
                    {VALUES.map((val, idx) => (
                      <FadeIn key={idx} delay={idx * 0.1}>
                        <div className="group p-8 rounded-[2.5rem] bg-white border border-black/[0.03] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                          <div style={{ backgroundColor: val.color }} className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center text-white font-display text-xl">
                            {val.title.charAt(0)}
                          </div>
                          <h4 className="font-editorial text-2xl font-bold text-[#111] mb-2">{val.title}</h4>
                          <p className="text-sm text-[#7A7165] font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {val.desc}
                          </p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>

                  <div className="space-y-8 mt-20">
                    <FadeIn delay={0.2}>
                      <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative group">
                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" alt="" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-[#C8281E]/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                      <div className="rounded-[4rem] aspect-square bg-[#111] p-12 text-white flex flex-col justify-end group transition-transform duration-700 hover:rotate-3">
                        <div className="text-5xl font-editorial italic mb-6 leading-none text-[#C8281E]">"</div>
                        <p className="font-editorial text-2xl italic mb-6 leading-relaxed">Le pont entre votre ambition et le marché marocain.</p>
                      </div>
                    </FadeIn>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-[10%] left-[-10%] w-32 h-32 bg-[#1A6B3A]/20 blur-3xl z-[-1]" />
                <div className="absolute bottom-[20%] right-[-10%] w-48 h-48 bg-[#C8281E]/10 blur-[80px] z-[-1]" />
              </div>
            </div>
          </div>
        </section>

        {/* NATIONAL IMPACT / ECOSYSTEM - HORIZONTAL SCROLL ON DESKTOP */}
        <section className="bg-[#EDE8DF]/50">
          {/* Mobile version stays as is for better UX */}
          <div className="lg:hidden py-40 px-8 md:px-16 space-y-20">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[#C8281E]" />
                <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#7A7165] font-bold">Rayonnement</span>
              </div>
              <h2 className="font-editorial text-[3.5rem] md:text-[5rem] font-bold leading-[0.9] text-[#111] mb-12">
                L'Impact<br /><span className="italic text-[#1A6B3A]">National</span>
              </h2>
            </FadeIn>
            <div className="grid gap-8">
              {ECOSYSTEM.map((org, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group p-10 bg-white rounded-[3rem] border border-black/[0.03] shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-10">
                        <span className="text-[0.6rem] uppercase tracking-widest font-bold text-[#C8281E] px-4 py-2 bg-[#C8281E]/5 rounded-full">{org.loc}</span>
                        <span className="font-display text-4xl text-black/5">0{i + 1}</span>
                      </div>
                      <h3 className="font-editorial text-3xl font-bold text-[#111] mb-6">{org.name}</h3>
                      <p className="text-[#7A7165] font-light leading-relaxed mb-8">{org.focus}</p>
                    </div>
                    <div className="pt-8 border-t border-black/[0.05] flex items-center justify-between">
                      <span className="text-[0.65rem] font-bold text-[#111]/40 uppercase tracking-widest">{org.contact}</span>
                      <ArrowRight className="w-5 h-5 text-[#C8281E]" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Desktop version with horizontal scroll */}
          <div className="hidden lg:block">
            <div ref={impactRef} className="h-[300vh] relative" id="national-impact-container">
              <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                <motion.div
                  style={{ x: horizontalX }}
                  className="flex gap-12 px-[10vw] items-center"
                >
                  <div className="w-[30vw] shrink-0">
                    <FadeIn>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-[#C8281E]" />
                        <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#7A7165] font-bold">Rayonnement</span>
                      </div>
                      <h2 className="font-editorial text-[7rem] font-bold leading-[0.8] text-[#111]">
                        L'Impact<br /><span className="italic text-[#1A6B3A]">National</span>
                      </h2>
                    </FadeIn>
                  </div>

                  {ECOSYSTEM.map((org, i) => (
                    <div key={i} className="w-[450px] h-[550px] shrink-0">
                      <div className="group p-10 bg-white rounded-[3rem] border border-black/[0.03] shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 h-full flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A6B3A]/5 rounded-bl-[5rem] group-hover:w-full group-hover:h-full group-hover:rounded-none transition-all duration-700 -z-1" />
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-12">
                            <span className="text-[0.6rem] uppercase tracking-widest font-bold text-[#C8281E] px-4 py-2 bg-[#C8281E]/5 rounded-full">{org.loc}</span>
                            <span className="font-display text-5xl text-black/5 group-hover:text-white/20 transition-colors">0{i + 1}</span>
                          </div>
                          <h3 className="font-editorial text-4xl font-bold text-[#111] group-hover:text-[#1A6B3A] transition-colors mb-6">{org.name}</h3>
                          <p className="text-lg text-[#7A7165] group-hover:text-[#111] transition-colors font-light leading-relaxed mb-8">{org.focus}</p>
                        </div>
                        <div className="relative z-10 pt-8 border-t border-black/[0.05] flex items-center justify-between">
                          <span className="text-[0.7rem] font-bold text-[#111]/40 group-hover:text-[#111]/60 uppercase tracking-widest">{org.contact}</span>
                          <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#C8281E] group-hover:border-[#C8281E] transition-all duration-500">
                            <ArrowRight className="w-6 h-6 text-[#111] group-hover:text-white transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="témoignages" className="py-40 px-8 md:px-16 bg-[#111] text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(26,107,58,0.1),transparent_50%)]" />

          <div className="max-w-[1300px] mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center uppercase">
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-[#C8281E]" />
                  <span className="text-[0.65rem] tracking-[0.3em] uppercase text-white/40 font-bold">Témoignages</span>
                </div>
                <h2 className="font-editorial text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[0.9] mb-12">
                  Des voix qui<br /><span className="italic text-[#C8281E]">inspirent</span>
                </h2>
                <p className="text-xl text-white/50 font-light max-w-md mb-12 normal-case">
                  Chaque témoignage est une victoire collective. Découvrez comment l'accompagnement Hope Morocco transforme des ambitions en réalités professionnelles.
                </p>
                <div className="flex gap-4">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${active === i ? "w-12 bg-[#C8281E]" : "w-4 bg-white/20"}`}
                    />
                  ))}
                </div>
              </FadeIn>

              <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="text-8xl font-editorial opacity-10 mb-8">“</div>
                    <blockquote className="font-editorial text-3xl md:text-4xl italic leading-relaxed mb-12 normal-case">
                      {TESTIMONIALS[active].quote}
                    </blockquote>
                    <div className="flex items-center gap-6 normal-case">
                      <div className="w-20 h-20 rounded-full bg-[#C8281E] flex items-center justify-center text-2xl font-bold shadow-2xl">
                        {TESTIMONIALS[active].initials}
                      </div>
                      <div>
                        <div className="text-xl font-bold">{TESTIMONIALS[active].name}</div>
                        <div className="text-white/40 tracking-wider text-sm">{TESTIMONIALS[active].role}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-40 px-8 md:px-16 bg-[#EDE8DF] relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto relative z-10 grid lg:grid-cols-2 gap-24 items-start">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[#C8281E]" />
                <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#7A7165] font-bold">Contact</span>
              </div>
              <h2 className="font-editorial text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[0.95] text-[#111] mb-12">
                Prêt pour votre<br /><span className="italic text-[#C8281E]">futur ?</span>
              </h2>
              <p className="text-xl text-[#7A7165] font-light max-w-md mb-16">
                Que vous soyez un candidat motivé ou une entreprise, notre équipe est là pour vous guider.
              </p>

              <div className="space-y-10">
                {[
                  { icon: <MapPin className="w-6 h-6" />, l: "Adresse", v: "Angle Bd Anfa & Rue El Mouatamid, Casablanca" },
                  { icon: <Mail className="w-6 h-6" />, l: "Email", v: "contact@hopemorocco.org" },
                  { icon: <div className="flex gap-4"><Linkedin className="w-5 h-5" /><Instagram className="w-5 h-5" /><Facebook className="w-5 h-5" /></div>, l: "Social", v: "Suivez notre impact" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="text-[#C8281E] mt-1">{item.icon}</div>
                    <div>
                      <div className="text-[0.6rem] uppercase tracking-widest font-bold text-[#7A7165] mb-1">{item.l}</div>
                      <div className="text-lg font-medium text-[#111]">{item.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-12 md:p-16 bg-white rounded-[3rem] shadow-2xl border border-black/[0.03]">
                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                    <div className="w-24 h-24 bg-[#1A6B3A]/10 text-[#1A6B3A] rounded-full flex items-center justify-center mx-auto mb-8">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="font-editorial text-3xl font-bold mb-4">Message envoyé</h3>
                    <p className="text-[#7A7165]">Un consultant vous contactera sous 24h.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-8">
                    <div>
                      <label className="text-[0.6rem] uppercase tracking-widest font-bold text-[#7A7165] ml-1">Nom Complet</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#C8281E] transition-colors text-lg"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[0.6rem] uppercase tracking-widest font-bold text-[#7A7165] ml-1">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#C8281E] transition-colors text-lg"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[0.6rem] uppercase tracking-widest font-bold text-[#7A7165] ml-1">Message</label>
                      <textarea
                        rows={4}
                        required
                        className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#C8281E] transition-colors text-lg resize-none"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="group w-full bg-[#111] text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#C8281E] transition-all duration-500 flex items-center justify-center gap-4">
                      Envoyer
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 px-8 md:px-16 bg-[#0a0a0a] text-white">
          <div className="max-w-[1300px] mx-auto grid md:grid-cols-4 gap-16 items-start">
            <div className="md:col-span-2">
              <div className="font-display text-3xl tracking-[0.2em] mb-8">
                HOPE <span className="text-[#C8281E]">MOROCCO</span>
              </div>
              <p className="text-white/30 text-sm max-w-sm leading-relaxed mb-8">
                Association à but non lucratif œuvrant pour l'insertion professionnelle des jeunes talents marocains depuis 2019.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-1 bg-[#C8281E]" />
                <div className="w-6 h-1 bg-white/20" />
                <div className="w-12 h-1 bg-[#1A6B3A]" />
              </div>
            </div>
            <div>
              <div className="text-[0.65rem] uppercase tracking-widest font-bold mb-8 opacity-50">Navigation</div>
              <ul className="space-y-4">
                {NAV_LINKS.map(l => (
                  <li key={l}><a href={`#${l.toLowerCase().replace(" ", "")}`} className="text-sm text-white/50 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[0.65rem] uppercase tracking-widest font-bold mb-8 opacity-50">Legal</div>
              <ul className="space-y-4 text-sm text-white/50">
                <li>Mentions Légales</li>
                <li>Confidentialité</li>
                <li>© 2024 Hope Morocco</li>
              </ul>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-[4px] z-[300] flex">
        <div className="flex-1 bg-[#C8281E]" />
        <div className="flex-1 bg-[#1A6B3A]" />
      </div>
    </>
  );
}
