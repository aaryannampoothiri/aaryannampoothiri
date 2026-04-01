import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'about'>('home');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const timerRef = useRef<number | null>(null);

  const quotes = [
    { text: "DREAM IS NOT THAT WHICH YOU SEE WHILE SLEEPING, IT IS SOMETHING THAT ", highlight: "DOES NOT LET YOU SLEEP.", author: "APJ ABDUL KALAM" },
    { text: "THE BEST WAY TO PREDICT THE FUTURE IS TO ", highlight: "INVENT IT.", author: "ALAN KAY" },
    { text: "FIRST, SOLVE THE PROBLEM. THEN, ", highlight: "WRITE THE CODE.", author: "JOHN JOHNSON" },
    { text: "THE ONLY WAY TO GO FAST, IS TO ", highlight: "GO WELL.", author: "ROBERT C. MARTIN" },
    { text: "SIMPLICITY IS THE SOUL OF ", highlight: "EFFICIENCY.", author: "AUSTIN FREEMAN" }
  ];

  // We add clones to the front and back for seamless infinite slider logic
  const displayQuotes = [
    quotes[quotes.length - 1],
    ...quotes,
    quotes[0]
  ];

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      handleNext();
    }, 5000);
  };

  const handleNext = () => {
    if (!transitionEnabled) return;
    setCurrentQuoteIndex((prev) => {
      if (prev >= displayQuotes.length - 1) return prev;
      return prev + 1;
    });
    resetTimer();
  };

  const handlePrev = () => {
    if (!transitionEnabled) return;
    setCurrentQuoteIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
    resetTimer();
  };

  const handleTransitionEnd = () => {
    if (currentQuoteIndex === displayQuotes.length - 1) {
      setTransitionEnabled(false);
      setCurrentQuoteIndex(1);
      setTimeout(() => setTransitionEnabled(true), 20);
    } else if (currentQuoteIndex === 0) {
      setTransitionEnabled(false);
      setCurrentQuoteIndex(displayQuotes.length - 2);
      setTimeout(() => setTransitionEnabled(true), 20);
    }
  };

  useEffect(() => {
    if (currentView === 'home') {
      resetTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentView]);

  const handleNavigate = (view: 'home' | 'projects' | 'about', anchor?: string) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    
    if (anchor) {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const projects = [
    {
      id: "omnicure",
      name: "OmniCure",
      fields: ["Cybersecurity", "IoT", "ECC", "Bilinear Pairing"],
      description: "A robust IoMT Security framework engineered for the safe and secure transfer of medical data. It leverages Elliptic Curve Cryptography (ECC) and Bilinear Pairing to enforce mutual authentication and data integrity, especially critical during remote healthcare scenarios like pandemics.",
      links: {
        github: "https://github.com/aaryannampoothiri/omnicure",
        live: "https://omnicure-one.vercel.app/"
      },
      thumbnail: "/omnicure.png",
      techStack: {
        frontend: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Recharts"],
        backend: ["Node.js", "Custom ECC Protocol", "Bilinear Pairing", "Flat-file JSON"]
      }
    },
    {
      id: "ghostbit",
      name: "GhostBit",
      fields: ["Cybersecurity", "Steganography"],
      description: "An advanced image steganography tool designed for undetectable data concealment. Utilizing a high-entropy algorithm, GhostBit allows users to encode and decode secret messages within images with zero visual degradation.",
      links: {
        github: "https://github.com/aaryannampoothiri/ghostbit",
        live: "https://ghostbit.vercel.app/"
      },
      thumbnail: "/ghostbit.png",
      techStack: {
        frontend: ["Next.js 14", "React", "Tailwind CSS", "Framer Motion"],
        backend: ["FastAPI", "Python", "OpenCV", "Pillow"]
      }
    },
    {
      id: "aetheris",
      name: "Aetheris",
      fields: ["Full Stack", "Workspace"],
      description: "A comprehensive personalized workspace that integrates essential productivity and healthcare management tools. From deadline tracking to personal health records, Aetheris provides a unified environment for daily life management.",
      links: {
        github: "https://github.com/aaryannampoothiri/AI-Aetheris",
        live: "https://aetheris-nine.vercel.app/"
      },
      thumbnail: "/aetheris.png",
      techStack: {
        frontend: ["Next.js", "React", "Geist Font", "Tailwind CSS"],
        backend: ["Supabase", "PostgreSQL", "Edge Functions"]
      }
    },
    {
      id: "rover",
      name: "IoT Rover",
      fields: ["IoT", "Arduino"],
      description: "A bluetooth controlled obstacle avoiding rover which uses an ultrasonic sensor mounted on 180 degree servo motor to detect objects in its way and change course of direction accordingly, controlled by a mobile device through a bluetooth sensor mounted on the model. Won prize at 2 different high school level science fests.",
      links: {
        github: "#",
        live: "#"
      },
      thumbnail: "/rover.png",
      techStack: {
        frontend: ["Arduino IDE"],
        backend: ["C++ (Embedded)", "Bluetooth HC-05"]
      }
    }
  ];

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.remove('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-on-scroll-left, .reveal-on-scroll-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="font-body selection:bg-tertiary selection:text-on-tertiary">
      <div className="grain-overlay fixed inset-0 z-[100]"></div>
      
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5">
        <nav className="flex justify-between items-center px-8 py-3 max-w-full mx-auto relative">
          {/* Top Left Logo */}
          <div className="text-xs md:text-sm font-black tracking-widest text-[#e7e5e4] font-inter uppercase leading-tight">
            AARYAN<br/>NAMPOOTHIRI
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => handleNavigate('home')}
              className={`font-inter tracking-tight font-bold uppercase transition-all duration-300 ${currentView === 'home' ? 'text-[#ff7346] border-b-2 border-[#ff7346] pb-1' : 'text-[#e7e5e4]/60 hover:text-[#e7e5e4]'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate('projects')}
              className={`font-inter tracking-tight font-bold uppercase transition-all duration-300 ${currentView === 'projects' ? 'text-[#ff7346] border-b-2 border-[#ff7346] pb-1' : 'text-[#e7e5e4]/60 hover:text-[#e7e5e4]'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavigate('about')}
              className="font-inter tracking-tight font-bold uppercase text-[#e7e5e4]/60 hover:text-[#e7e5e4] transition-colors duration-300"
            >
              About
            </button>
          </div>

          {/* Top Right Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-6">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="material-symbols-outlined text-[#e7e5e4] hover:text-[#ff7346] transition-all duration-300 text-3xl focus:outline-none" 
              data-icon="menu">
              {isMenuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0e0e0e]/95 backdrop-blur-3xl border-b border-white/10 flex flex-col items-center py-10 space-y-8 shadow-2xl animate-fade-up">
            <button 
              onClick={() => handleNavigate('home')}
              className={`font-inter tracking-widest font-black uppercase transition-all duration-300 ${currentView === 'home' ? 'text-[#ff7346] border-b-2 border-[#ff7346] pb-1' : 'text-[#e7e5e4]/80'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate('projects')}
              className={`font-inter tracking-widest font-black uppercase transition-all duration-300 ${currentView === 'projects' ? 'text-[#ff7346] border-b-2 border-[#ff7346] pb-1' : 'text-[#e7e5e4]/80'}`}
            >
              Projects
            </button>
            <button onClick={() => handleNavigate('about')} className="font-inter tracking-widest font-black uppercase text-[#e7e5e4]/80 hover:text-[#e7e5e4] transition-colors duration-300">About</button>
          </div>
        )}
      </header>

      {/* SideNavBar (Socials) */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-12 items-center bg-transparent hidden xl:flex">
        <div className="rotate-90 origin-left flex flex-col space-y-12 items-center">
          <a className="font-manrope text-[10px] tracking-[0.2em] uppercase text-[#e7e5e4]/30 hover:text-[#ff7346] hover:scale-125 transition-transform duration-500" href="https://www.instagram.com/aaryan_nampoothiri/" target="_blank" rel="noreferrer">Instagram</a>
          <a className="font-manrope text-[10px] tracking-[0.2em] uppercase text-[#e7e5e4]/30 hover:text-[#ff7346] hover:scale-125 transition-transform duration-500" href="https://www.linkedin.com/in/aaryannampoothiri" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="font-manrope text-[10px] tracking-[0.2em] uppercase text-[#e7e5e4]/30 hover:text-[#ff7346] hover:scale-125 transition-transform duration-500" href="https://github.com/aaryannampoothiri" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </aside>

      <main className="mesh-gradient">
        {/* View Selection Logic */}
        {/* Dynamic View Selection */}
        {currentView === 'home' ? (
          <HomeView 
            handleNavigate={handleNavigate} 
            projects={projects.slice(0, 3)}
            setSelectedProject={setSelectedProject}
            currentQuoteIndex={currentQuoteIndex}
            transitionEnabled={transitionEnabled}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleTransitionEnd={handleTransitionEnd}
            displayQuotes={displayQuotes}
          />
        ) : currentView === 'projects' ? (
          <ProjectsView 
            projects={projects} 
            setSelectedProject={setSelectedProject} 
          />
        ) : (
          <AboutView />
        )}

        {/* Professional Footer Redesign */}
        <footer id="contact" className="w-full bg-[#0e0e0e] pt-40 pb-16 px-8 border-t border-white/5">
          <div className="container mx-auto">
            {/* High-Impact CTA */}
            <div className="mb-40 group cursor-default">
              <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black font-headline tracking-tighter uppercase leading-[0.8]">
                <span className="block text-on-surface mb-2">READY TO</span>
                <span className="block text-stroke-faint hover:text-on-surface transition-all duration-700 pr-4 w-fit">BUILD THE</span>
                <span className="block text-stroke-faint hover:text-[#ff7346] transition-all duration-700 pr-4 w-fit">FUTURE?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 pt-20 border-t border-white/10">
              {/* Identity & Current City */}
              <div className="md:col-span-4 space-y-12">
                <div className="space-y-2">
                  <div className="text-xl font-black font-headline tracking-tighter uppercase text-on-surface">AARYAN NAMPOOTHIRI</div>
                  <div className="text-[10px] tracking-[0.4em] font-black uppercase text-tertiary">Developer & Researcher</div>
                </div>
                <div className="space-y-1 text-on-surface/40">
                  <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
                    KERALA, INDIA
                  </div>
                  <div className="text-[10px] tracking-[0.2em] font-medium uppercase">Available for high-stakes projects</div>
                </div>
              </div>

              {/* Sitemap & Nav */}
              <div className="md:col-span-4 space-y-10">
                <div className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20">SITEMAP</div>
                <div className="flex flex-col gap-6">
                  {['home', 'projects', 'about'].map((item) => (
                    <button 
                      key={item}
                      onClick={() => handleNavigate(item === 'projects' ? 'projects' : 'home', item === 'home' ? undefined : item)}
                      className="text-xs font-black tracking-widest uppercase text-tertiary hover:text-on-surface text-left transition-colors"
                    >
                      {item === 'home' ? 'Home' : item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Channels */}
              <div className="md:col-span-4 space-y-10">
                <div className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20">SOCIAL CHANNELS</div>
                <div className="flex flex-col gap-6">
                  {[
                    { name: 'Instagram', url: 'https://www.instagram.com/aaryan_nampoothiri/' },
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aaryannampoothiri' },
                    { name: 'GitHub', url: 'https://github.com/aaryannampoothiri' },
                    { name: 'Email', url: 'mailto:aaryannamboothiri@gmail.com' }
                  ].map((social) => (
                    <a 
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-black tracking-widest uppercase text-tertiary hover:text-[#ff7346] transition-colors"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-40 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black tracking-[0.6em] text-white/10 uppercase">
              <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</div>
              <div>ENGINEERED BY AARYAN</div>
            </div>
          </div>
        </footer>
      </main>

      {/* Project Pop-out Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div 
            className="absolute inset-0 bg-[#0e0e0e]/80 backdrop-blur-3xl"
            onClick={() => setSelectedProject(null)}
          ></div>
          <div className="glass-card relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row animate-pop-out">
            {/* Modal Image Area */}
            <div className="w-full md:w-5/12 h-56 md:h-auto relative overflow-hidden bg-black">
              <img 
                src={selectedProject.thumbnail} 
                alt={selectedProject.name} 
                className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent md:bg-gradient-to-r"></div>
            </div>

            {/* Modal Content Area */}
            <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col space-y-6 relative">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-30 group p-1"
              >
                <span className="material-symbols-outlined text-[#e7e5e4]/30 group-hover:text-[#ff7346] group-hover:rotate-90 transition-all duration-500 text-2xl" data-icon="close">
                  close
                </span>
              </button>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.fields.map((field: string) => (
                    <span key={field} className="text-[9px] tracking-[0.2em] uppercase font-bold text-tertiary">
                      {field}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tighter text-on-surface leading-tight">
                  {selectedProject.name}
                </h2>
                <p className="text-on-surface-variant text-base font-body leading-relaxed max-w-md">
                  {selectedProject.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-white/5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ff7346] text-lg" data-icon="terminal">terminal</span>
                    <h4 className="text-[9px] tracking-[0.3em] uppercase font-bold text-tertiary">Frontend</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.frontend.map((tech: string) => (
                      <span key={tech} className="text-[11px] text-on-surface-variant font-medium px-2 py-0.5 bg-white/5 rounded border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ff7346] text-lg" data-icon="database">database</span>
                    <h4 className="text-[9px] tracking-[0.3em] uppercase font-bold text-tertiary">Backend</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.backend.map((tech: string) => (
                      <span key={tech} className="text-[11px] text-on-surface-variant font-medium px-2 py-0.5 bg-white/5 rounded border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {selectedProject.id !== 'rover' && (
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a 
                    href={selectedProject.links.live} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 bg-[#ff7346] px-6 py-3.5 rounded-lg text-[#0e0e0e] font-black tracking-widest uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  >
                    Launch Live <span className="material-symbols-outlined text-sm" data-icon="arrow_outward">arrow_outward</span>
                  </a>
                  <a 
                    href={selectedProject.links.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-6 py-3.5 rounded-lg text-[#e7e5e4] font-black tracking-widest uppercase text-xs hover:bg-white/10 active:scale-95 transition-all duration-300"
                  >
                    Source <span className="material-symbols-outlined text-sm" data-icon="code">code</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Cursor Effect */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" id="cursor"></div>
    </div>
  );
}

function HomeView({ 
  handleNavigate, 
  projects, 
  setSelectedProject,
  currentQuoteIndex,
  transitionEnabled,
  handleNext,
  handlePrev,
  handleTransitionEnd,
  displayQuotes
}: { 
  handleNavigate: any, 
  projects: any[], 
  setSelectedProject: any,
  currentQuoteIndex: number,
  transitionEnabled: boolean,
  handleNext: () => void,
  handlePrev: () => void,
  handleTransitionEnd: () => void,
  displayQuotes: any[]
}) {
  return (
    <div className="animate-fade-in">
      <section className="relative min-h-[90vh] flex items-center justify-center px-8 pt-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,115,70,0.05),transparent_70%)]"></div>
        </div>
        <div className="container mx-auto relative z-10 flex flex-col items-center">
          <div className="relative w-full text-center z-0 mt-12 md:mt-20">
            <h1 className="flex flex-col items-center justify-center text-[7.5vw] md:text-[6.5vw] font-syne font-black leading-[0.85] tracking-tighter uppercase select-none w-full whitespace-nowrap overflow-hidden">
              <span className="text-on-surface reveal-on-scroll reveal-delay-100 -z-10">AARYAN</span>
              <span className="text-stroke reveal-on-scroll reveal-delay-200 -z-10">NAMPOOTHIRI</span>
            </h1>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none reveal-on-scroll pt-20 md:pt-16">
            <div className="relative w-full max-w-lg h-[50vh] md:max-w-3xl md:h-[75vh] portrait-mask translate-x-12 md:translate-x-24">
              <img alt="Aaryan's professional portrait" className="w-full h-full object-cover object-top grayscale pointer-events-auto scale-x-[-1]" src="/potrait.png"/>
            </div>
          </div>
          <div className="relative z-20 mt-24 md:mt-56 w-full flex flex-col md:flex-row items-center justify-between gap-12 px-8 max-w-7xl mx-auto">
            <div className="flex-1 flex justify-start -ml-8 md:-ml-20">
              <p className="text-left text-[#ff7346] text-base md:text-lg font-body leading-relaxed font-bold md:bg-background/20 md:backdrop-blur-sm px-6 py-4 rounded-lg reveal-on-scroll reveal-delay-300 max-w-sm border-l-2 border-[#ff7346]/30">
                Translating complex logic into tactile digital space. Where clean architecture meets fluid motion.
              </p>
            </div>
            <div className="flex-1 flex justify-center md:justify-center translate-x-[15%] overflow-visible">
              <button 
                onClick={() => handleNavigate('projects')}
                className="rounded-full bg-transparent border border-[#ff7346] px-8 py-3 text-xs md:text-sm text-[#ff7346] font-black tracking-[0.2em] uppercase hover:bg-[#ff7346] hover:text-[#0e0e0e] hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(255,115,70,0.1)] hover:shadow-[0_0_50px_rgba(255,115,70,0.5)] shrink-0"
              >
                EXPLORE WORK
              </button>
            </div>
            <div className="hidden md:block flex-1"></div>
          </div>
        </div>
      </section>

      <section id="introduction" className="py-24 px-8 relative z-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-tertiary mb-8 block">INTRODUCTION</span>
            <h2 className="text-2xl md:text-4xl font-body leading-relaxed text-on-surface-variant font-medium md:text-center flex flex-col gap-4 md:gap-8">
              <span>Hey there, I am <span className="text-on-surface font-black">Aaryan Nampoothiri A</span>.</span>
              <span>
                Specialized in building secure, high-performance applications with a focus on <span className="text-on-surface font-black">Java and Python</span>. Dedicated to engineering resilient digital architectures and high-stakes technical solutions.
              </span>
            </h2>
          </div>
        </div>
      </section>

      <section id="toolbox" className="py-32 px-8 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col mb-16 reveal-on-scroll">
            <span className="font-label text-[10px] tracking-[0.5em] uppercase text-tertiary mb-4 block">THE STACK</span>
            <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase whitespace-pre-line leading-none">CORE<br/>ARCHITECTURE</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ToolboxCard title="Languages" icon="terminal" skills={["Java", "Python", "TypeScript", "SQL", "C/C++"]} />
            <ToolboxCard title="Frontend" icon="web" skills={["Next.js 15", "React 19", "Tailwind CSS v4", "Framer Motion"]} />
            <ToolboxCard title="Backend" icon="database" skills={["Node.js", "FastAPI", "PostgreSQL", "Supabase", "Edge Functions"]} />
          </div>
        </div>
      </section>

      {/* Selected Works Gallery */}
      <section className="py-24 px-8 bg-surface-container-low/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal-on-scroll">
            <div>
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-tertiary mb-4 block">SELECTED ARCHIVE</span>
              <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase">WORKS</h2>
            </div>
            <button 
              onClick={() => handleNavigate('projects')}
              className="group flex items-center gap-4 text-xs font-black tracking-widest uppercase text-tertiary"
            >
              View All Projects <span className="material-symbols-outlined transition-transform group-hover:translate-x-2" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`glass-card group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 flex flex-col p-8 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] cursor-pointer reveal-on-scroll ${index === 1 ? 'md:mt-24' : ''}`}
              >
                <div className="absolute inset-0 z-0">
                  <img className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0" alt={project.name} src={project.thumbnail}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="relative z-10 mt-auto space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.fields.slice(0, 2).map((f: string) => <span key={f} className="text-[9px] tracking-[0.2em] text-tertiary/60 uppercase font-black px-3 py-1.5 rounded-full border border-tertiary/10 bg-tertiary/5 backdrop-blur-md">{f}</span>)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-[0.4em] text-[#ff7346] uppercase font-black block animate-pulse">0{index + 1}</span>
                    <h3 className="text-4xl font-bold font-headline tracking-tighter leading-none group-hover:text-[#ff7346] transition-colors duration-300">{project.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Slider */}
      <section className="py-48 relative overflow-hidden border-t border-white/5 bg-[#0e0e0e]">
        <div className="container mx-auto px-8 relative flex items-center justify-center">
          <div className="absolute left-8 lg:left-24 z-30 flex flex-col gap-8">
            <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ff7346] hover:border-[#ff7346] hover:text-[#0e0e0e] transition-all duration-300 group"><span className="material-symbols-outlined text-sm font-black group-hover:scale-125 transition-transform" data-icon="arrow_upward">arrow_upward</span></button>
            <button onClick={handleNext} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ff7346] hover:border-[#ff7346] hover:text-[#0e0e0e] transition-all duration-300 group"><span className="material-symbols-outlined text-sm font-black group-hover:scale-125 transition-transform" data-icon="arrow_downward">arrow_downward</span></button>
          </div>
          <div className="max-w-5xl mx-auto text-center h-[600px] overflow-hidden relative">
            <div className={`flex flex-col ${transitionEnabled ? 'quote-track' : ''}`} style={{ transform: `translateY(-${currentQuoteIndex * 600}px)` }} onTransitionEnd={handleTransitionEnd}>
              {displayQuotes.map((quote, index) => (
                <div key={index} className="h-[600px] flex flex-col items-center justify-center space-y-12 shrink-0">
                  <span className="material-symbols-outlined text-[#ff7346] text-6xl opacity-20" data-icon="format_quote">format_quote</span>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-headline tracking-tighter uppercase leading-[1.1] max-w-4xl px-4">{quote.text}<span className="text-[#ff7346]">{quote.highlight}</span></h2>
                  <div className="flex items-center justify-center gap-8 pt-4"><span className="h-px w-16 bg-white/10"></span><span className="text-sm font-black tracking-[0.5em] uppercase text-tertiary">{quote.author}</span><span className="h-px w-16 bg-white/10"></span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutView() {
  return (
    <div className="animate-fade-in pt-40 md:pt-60 pb-32">
      <div className="container mx-auto px-8">
        <div className="mb-32">
          <span className="font-label text-[10px] tracking-[0.5em] uppercase text-tertiary mb-6 block reveal-on-scroll">THE MANIFESTO</span>
          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black font-headline tracking-tighter uppercase leading-[0.8] mb-12 reveal-on-scroll">
            ARCHITECTURE<br/>
            <span className="text-stroke-faint hover:text-[#ff7346] hover:[-webkit-text-stroke-color:#ff7346] transition-all duration-700 cursor-default">
              FOR STABILITY
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-40 border-t border-white/5 pt-20">
          <div className="space-y-12 reveal-on-scroll">
            <div className="space-y-6">
              <h2 className="text-[10px] tracking-[0.3em] font-black uppercase text-tertiary">Background</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                Translating complex logic into tactile digital space where clean architecture meets fluid motion. Specializing in high-performance application engineering, my work lives at the intersection of immersive UI design and rigorous technical research.
              </p>
            </div>
            
            <div className="space-y-6 pt-12 border-t border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary text-lg" data-icon="translate">translate</span>
                <h2 className="text-[10px] tracking-[0.3em] font-black uppercase text-tertiary">Languages Known</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["English", "Hindi", "Malayalam", "Tamil"].map((lang) => (
                  <span key={lang} className="text-[10px] tracking-widest text-on-surface-variant uppercase font-black px-4 py-2 rounded-full border border-white/5 bg-white/[0.02]">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-12 reveal-on-scroll reveal-delay-200">
            <div className="space-y-6">
              <h2 className="text-[10px] tracking-[0.3em] font-black uppercase text-tertiary">Research Focus</h2>
              <ul className="space-y-8">
                <ResearchItem title="IoT security" desc="Engineering mutual authentication frameworks for the medical internet using ECC and Bilinear Pairing protocols." />
                <ResearchItem title="Image steganography" desc="Developing high-entropy algorithms to conceal sensitive data within visual matrices without detectable degradation." />
                <ResearchItem title="deepfake detection" desc="Researching ML-driven solutions to authenticate visual truth and defend against adversarial media." />
              </ul>
            </div>
          </div>
        </div>

        {/* New Contact Section */}
        <section className="pt-20 border-t border-white/5 reveal-on-scroll">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="space-y-6 max-w-xl">
              <span className="font-label text-[10px] tracking-[0.5em] uppercase text-tertiary block">GET IN TOUCH</span>
              <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase leading-none">
                LET'S DISCUSS<br/>THE NEXT FRONT
              </h2>
              <p className="text-on-surface-variant text-lg font-body leading-relaxed">
                Currently open to collaborative research and high-stakes engineering opportunities. Reach out to start the conversation.
              </p>
            </div>
            
            <div className="flex flex-col gap-5 w-full md:w-auto">
              <a 
                href="/Aaryan_Nampoothiri_CV.pdf" 
                download
                className="group relative flex items-center justify-center gap-4 bg-transparent border border-[#ff7346] px-10 py-5 rounded-full text-[#ff7346] font-black tracking-widest uppercase text-sm hover:bg-[#ff7346] hover:text-[#0e0e0e] transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">Download CV</span>
                <span className="material-symbols-outlined relative z-10 group-hover:animate-bounce" data-icon="download">download</span>
              </a>

              <a 
                href="https://wa.me/918078404468" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-4 bg-[#25D366]/10 border border-[#25D366]/20 px-10 py-4 rounded-full text-[#25D366] font-black tracking-widest uppercase text-[10px] hover:bg-[#25D366] hover:text-[#0e0e0e] transition-all duration-500"
              >
                WhatsApp Message <span className="material-symbols-outlined text-sm" data-icon="chat">chat</span>
              </a>

              <div className="flex flex-col items-center md:items-end gap-3 pr-4">
                <a 
                  href="mailto:aaryannamboothiri@gmail.com" 
                  className="flex items-center justify-center gap-4 text-[10px] font-black tracking-widest uppercase text-white/30 hover:text-[#ff7346] transition-colors"
                >
                  aaryannamboothiri@gmail.com <span className="material-symbols-outlined text-sm" data-icon="mail">mail</span>
                </a>
                <a 
                  href="tel:+918078404468" 
                  className="flex items-center justify-center gap-4 text-[10px] font-black tracking-widest uppercase text-white/30 hover:text-[#ff7346] transition-colors"
                >
                  +91 8078404468 <span className="material-symbols-outlined text-sm" data-icon="call">call</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ProjectsView({ projects, setSelectedProject }: { projects: any[], setSelectedProject: any }) {
  return (
    <div className="animate-fade-in pt-40 md:pt-60 pb-32">
      <div className="container mx-auto px-8">
        <div className="mb-24 reveal-on-scroll">
          <span className="font-label text-[10px] tracking-[0.5em] uppercase text-tertiary mb-4 block">PROJECT ARCHIVE</span>
          <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter uppercase leading-[0.8]">DEDICATED<br/>COLLECTION</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass-card group relative h-[500px] rounded-[3rem] overflow-hidden border border-white/10 p-12 flex flex-col justify-end transition-all duration-700 hover:-translate-y-4 cursor-pointer reveal-on-scroll"
            >
              <div className="absolute inset-0 z-0">
                <img className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000" alt={project.name} src={project.thumbnail}/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.fields.map((f: string) => <span key={f} className="text-[10px] tracking-widest text-[#ff7346] uppercase font-black px-3 py-1 rounded bg-[#ff7346]/5 border border-[#ff7346]/20">{f}</span>)}
                </div>
                <h3 className="text-4xl md:text-6xl font-black font-headline tracking-tighter group-hover:text-[#ff7346] transition-colors">{project.name}</h3>
                <div className="flex items-center gap-4 pt-4"><span className="h-px w-12 bg-[#ff7346]/30"></span><span className="text-[10px] font-black tracking-widest uppercase text-[#ff7346]">Exploration Details</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function ToolboxCard({ title, icon, skills }: { title: string, icon: string, skills: string[] }) {
  return (
    <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 space-y-8 reveal-on-scroll hover:border-[#ff7346]/20 transition-colors group">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-[#ff7346] text-3xl group-hover:scale-110 transition-transform" data-icon={icon}>{icon}</span>
        <h3 className="text-xl font-bold font-headline tracking-widest uppercase">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">
        {skills.map(s => (
          <div key={s} className="flex items-center justify-between group/item">
            <span className="text-on-surface-variant font-medium text-base group-hover/item:text-on-surface transition-colors">{s}</span>
            <span className="h-px flex-1 mx-4 bg-white/5 group-hover/item:bg-[#ff7346]/10"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="group">
      <div className="text-lg font-bold font-headline uppercase tracking-widest text-on-surface mb-2 group-hover:text-tertiary transition-colors">{title}</div>
      <div className="text-on-surface-variant/70 text-sm leading-relaxed">{desc}</div>
    </li>
  );
}

export default App;

