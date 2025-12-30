'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, FileText, Globe, Languages, Search, Upload, Wand2, CheckCircle, Users, Award, Clock, BriefcaseBusiness, Target } from 'lucide-react';
import ParticlesBackground from '@/components/particles-background';
import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const [featuresRef, featuresInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [stepsRef, stepsInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: <FileText className="h-8 w-8" />, title: 'CV Analysis', description: 'Upload your CV in PDF format for instant AI-powered analysis and feedback.' },
    { icon: <Wand2 className="h-8 w-8" />, title: 'Smart Optimization', description: 'Automatically improve your CV to match job requirements and industry standards.' },
    { icon: <Search className="h-8 w-8" />, title: 'Job Matching', description: 'Find relevant job opportunities based on your CV content and skills.' },
    { icon: <Languages className="h-8 w-8" />, title: 'Multi-language Support', description: 'Generate professional CVs in multiple languages automatically.' },
    { icon: <BriefcaseBusiness className="h-8 w-8" />, title: 'Industry Insights', description: 'Get industry-specific recommendations to tailor your CV for target roles.' },
    { icon: <Target className="h-8 w-8" />, title: 'ATS Optimization', description: 'Ensure your CV passes through Applicant Tracking Systems with our smart optimization.' },
    { icon: <CheckCircle className="h-8 w-8" />, title: 'Keyword Analysis', description: 'Identify and incorporate high-impact keywords that will grab recruiters\' attention.' },
    { icon: <Award className="h-8 w-8" />, title: 'Achievement Highlighting', description: 'Automatically highlight your key achievements to stand out from other candidates.' },
  ];

  const steps = [
    { number: '1', title: 'Upload CV', description: 'Upload your existing CV in PDF format to begin the analysis process', icon: <Upload className="h-6 w-6" /> },
    { number: '2', title: 'Analyze', description: 'Our AI analyzes your CV content, structure, and identifies improvement areas', icon: <FileText className="h-6 w-6" /> },
    { number: '3', title: 'Improve & Apply', description: 'Get optimization suggestions, implement changes, and apply to matching jobs', icon: <Wand2 className="h-6 w-6" /> },
  ];

  const stats = [
    { value: '87%', label: 'Success rate in interviews' },
    { value: '3x', label: 'More likely to get shortlisted' },
    { value: '45%', label: 'Faster job placement' },
    { value: '10k+', label: 'CVs improved daily' },
  ];

  const testimonials = [
    {
      content: "Smart CV Analyzer transformed my resume from average to outstanding. Within two weeks of using the optimized version, I received three interview calls from top companies I'd been trying to get into for months.",
      author: "Sarah Johnson",
      role: "Marketing Manager",
      company: "Global Brands Inc."
    },
    {
      content: "As someone switching careers, I was struggling to highlight my transferable skills. This tool not only identified them but also presented them in a way that made sense for my target industry. Landed my dream job in fintech!",
      author: "Michael Chen",
      role: "Data Analyst",
      company: "FinTech Solutions"
    },
    {
      content: "The keyword optimization feature is a game-changer. My applications started getting responses almost immediately after I implemented the suggestions. The job matching feature also introduced me to roles I hadn't considered before.",
      author: "Priya Sharma",
      role: "Project Manager",
      company: "Tech Innovations Ltd"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticlesBackground />
      {/* Hero Section with improved visibility and clearer CTA */}
      <section ref={heroRef} className="relative overflow-hidden px-4 py-16 sm:py-28 lg:px-8 min-h-[90vh] flex items-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40h40v-40h-40z" fill="none" />
                <path d="M0 10h40M10 0v40" stroke="currentColor" strokeOpacity="0.05" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>
        <div className="mx-auto max-w-2xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }} 
            className="mb-4">
            <motion.h1 
              initial={{ y: 50 }} 
              animate={{ y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl relative">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="absolute -inset-1 rounded-lg bg-primary/10 blur-xl" />
              Smart CV Analyzer
            </motion.h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-4 text-lg leading-8 text-muted-foreground">
            <AnimatePresence>
              {["Land your dream job faster", "with AI-powered CV analysis", "and intelligent optimization"].map((text, index) => (
                <motion.span key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.6 + index * 0.2 }} className="block">
                  {text}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }} className="mt-8 flex items-center justify-center gap-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="relative group bg-primary overflow-hidden">
                <motion.span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-primary/80 to-primary group-hover:translate-x-full transition-transform duration-300" />
                <span className="relative z-10 flex items-center">
                  Try it Free
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: [0, 2, 0, -2, 0], transition: { rotate: { repeat: Infinity, duration: 0.5 } } }} whileTap={{ scale: 0.95 }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)}>
              <Button variant="outline" size="lg" className="relative overflow-hidden group">
                <motion.span initial={{ y: -100 }} whileHover={{ y: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-primary/10" />
                <span className="relative z-10 flex items-center">
                  Upload CV
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                    <Upload className="ml-2 h-4 w-4" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div key={i} className="absolute w-4 h-4 rounded-full bg-primary/20" initial={{ x: Math.random() * 100 - 50 + "%", y: Math.random() * 100 + "%", opacity: 0 }} animate={{ y: [Math.random() * 100 + "%", Math.random() * 100 + "%"], opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 5 + Math.random() * 10, delay: i * 0.5 }} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5 relative" ref={statsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={statsInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-card/50 backdrop-blur-sm rounded-lg shadow-sm border border-border/30"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={statsInView ? { scale: 1, opacity: 1 } : {}} 
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-bold text-primary"
                >
                  {stat.value}
                </motion.div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section with compact grid layout */}
      <section className="relative py-16" ref={featuresRef}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={featuresInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mx-auto max-w-2xl text-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={featuresInView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.5 }} className="relative inline-block">
              <motion.span animate={{ rotate: featuresInView ? 360 : 0 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-10 rounded-full border border-primary/20 opacity-70" />
              <motion.span animate={{ rotate: featuresInView ? -360 : 0 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -inset-16 rounded-full border border-primary/20 opacity-50" />
              <motion.span animate={{ rotate: featuresInView ? 360 : 0 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -inset-24 rounded-full border border-primary/20 opacity-30" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl relative">Powerful Features</h2>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={featuresInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="mt-4 text-lg leading-7 text-muted-foreground">
              Everything you need to create the perfect CV and land your dream job
            </motion.p>
          </motion.div>
          <div className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 md:mt-20 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-4 text-base leading-7 text-muted-foreground sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 50 }} animate={featuresInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.02, rotate: 0 }} className="relative pl-9 rounded-xl p-5 bg-card/30 backdrop-blur-sm border border-border/50 shadow-md group h-full">
                  <motion.div whileHover={{ rotate: [0, 5, -5, 5, 0], scale: 1.2 }} transition={{ duration: 0.5 }} className="inline-block text-primary absolute top-5 left-5">
                    {feature.icon}
                  </motion.div>
                  <motion.div initial={{ width: "0%" }} whileHover={{ width: "100%" }} transition={{ duration: 0.3 }} className="absolute bottom-0 left-0 h-1 bg-primary/50 rounded-full" />
                  <dt className="mt-3 pt-6 font-semibold text-foreground">{feature.title}</dt>
                  <dd className="mt-1 text-sm">{feature.description}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How It Works Section with smaller spacing */}
      <section className="bg-card/30 backdrop-blur-sm py-16 sm:py-24 relative overflow-hidden" ref={stepsRef}>
        <motion.div className="absolute inset-0 -z-10 opacity-30 pointer-events-none" animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }} style={{ backgroundImage: 'radial-gradient(circle at center, rgba(var(--primary) / 0.15) 0%, transparent 50%)', backgroundSize: '100% 100%' }} />
        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={stepsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <motion.span animate={stepsInView ? { color: ['hsl(var(--foreground))', 'hsl(var(--primary))', 'hsl(var(--foreground))'] } : {}} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                How It Works
              </motion.span>
            </h2>
            <motion.p initial={{ opacity: 0 }} animate={stepsInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="mt-4 text-lg leading-7 text-muted-foreground">
              Three simple steps to improve your CV and boost your career
            </motion.p>
          </motion.div>
          <div className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 md:mt-20 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 text-base leading-7 text-muted-foreground sm:grid-cols-3 lg:mx-0 lg:max-w-none">
              {steps.map((step, index) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 50, rotateY: 90 }} animate={stepsInView ? { opacity: 1, y: 0, rotateY: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.2, type: "spring", stiffness: 100 }} whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }} className="relative rounded-2xl bg-card/70 p-6 shadow-lg ring-1 ring-border overflow-hidden group">
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary relative overflow-hidden">
                    <motion.div className="absolute inset-0 bg-primary" whileHover={{ y: ["0%", "100%"] }} transition={{ duration: 0.5 }} />
                    <span className="text-lg font-semibold text-primary-foreground relative z-10">{step.number}</span>
                  </div>
                  <div className="mt-4 flex items-center">
                    <motion.span whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="text-primary">
                      {step.icon}
                    </motion.span>
                    <h3 className="ml-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm">{step.description}</p>
                  <motion.div className="absolute bottom-0 left-0 h-1 bg-primary/50" initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.3 }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 relative" ref={testimonialsRef}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.8 }} 
            className="mx-auto max-w-2xl text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 text-lg leading-7 text-muted-foreground">
              Real success stories from professionals who boosted their careers
            </p>
          </motion.div>
          
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="relative rounded-2xl bg-card/50 p-6 shadow-md border border-border/30"
              >
                <motion.div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -z-10" />
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={testimonialsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                      className="inline-block text-yellow-400"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-sm italic mb-4 text-muted-foreground">{testimonial.content}</p>
                <div className="flex items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={testimonialsInView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 200, delay: index * 0.3 }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mr-3"
                  >
                    <Users size={16} />
                  </motion.div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-primary/5" ref={ctaRef}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={ctaInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute inset-0 overflow-hidden -z-10"
        >
          <motion.div 
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-2xl"
          />
        </motion.div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={ctaInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl rounded-2xl bg-card p-8 shadow-lg border border-border/50 text-center"
          >
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Ready to transform your job search?
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Start using Smart CV Analyzer today and increase your chances of landing interviews.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="w-full sm:w-auto bg-primary">
                  <span className="flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <span className="flex items-center">
                    View Demo
                    <Clock className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 0.8 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-4 text-xs text-muted-foreground"
            >
              No credit card required. Free plan includes 3 CV analyses per month.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <footer className="bg-card/30 backdrop-blur-sm relative overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8 relative z-10">
          <div className="flex justify-center space-x-6 md:order-2">
            <motion.a whileHover={{ scale: 1.2, rotate: 360 }} transition={{ type: "spring", stiffness: 300, damping: 10 }} href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.158-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <motion.p className="text-center text-xs leading-5 text-muted-foreground" whileHover={{ scale: 1.05 }}>
              &copy; 2024 Smart CV Analyzer. All rights reserved.
            </motion.p>
          </div>
        </motion.div>
        <motion.div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/5 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
      </footer>
    </div>
  );
}