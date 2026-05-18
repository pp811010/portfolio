import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function TopBar({ sidebarOpen = false }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // ถ้าอยู่ที่ /projects ให้ highlight เมนู projects
    if (location.pathname === '/education' || location.pathname.startsWith('/education/')) {
      setActiveSection('education');
      return;
    }

    if (location.pathname === '/projects' || location.pathname.startsWith('/project/')) {
      setActiveSection('projects');
      return;
    }

    if (location.pathname === '/certificates' || location.pathname.startsWith('/certificate/')) {
      setActiveSection('certificates');
      return;
    }

    if (location.pathname === '/work-experience' || location.pathname.startsWith('/work-experience/')) {
      setActiveSection('work-experience');
      return;
    }

    if (location.pathname === '/contact' || location.pathname.startsWith('/contact/')) {
      setActiveSection('contact');
      return;
    }

    if (location.pathname === '/isluknam' || location.pathname.startsWith('/isluknam/')) {
      setActiveSection('isluknam');
      return;
    }

    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    // Scroll Spy เฉพาะ Home page (ไม่รวม projects เพราะกดแล้วออกไป /projects)
    const sections = ['home', 'education', 'certificates'];
    const observers = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-35% 0px -45% 0px' }
      );

      observer.observe(element);
      observers.push({ observer, element });
    });

    return () => {
      observers.forEach(({ observer, element }) => observer.unobserve(element));
    };
  }, [location.pathname]);

  const handleScrollNav = (id) => {
    // ✅ กด Projects → navigate ไป /projects โดยตรง
    if (id === 'education') {
      navigate('/education');
      return;
    }

    if (id === 'projects') {
      navigate('/projects');
      return;
    }

     if (id === 'certificates') {
      navigate('/certificates');
      return;
    }

    if (id === 'isluknam') {
      navigate('/isluknam');
      return;
    }

    if (id === 'work-experience') {
      navigate('/work-experience');
      return;
    }

    if (id === 'contact') {
      navigate('/contact');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/', { state: { targetId: id } });
    } else {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'work-experience', label: 'Work Experience' },
    { id: 'contact', label: 'Contact' },
    { id: 'isluknam', label: 'LukNam' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 2 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  return (
    <motion.nav
      animate={{ paddingRight: sidebarOpen ? '30%' : '0%' }}
      transition={{ type: 'spring', stiffness: 380, damping: 35 }}
      className="fixed top-0 w-full z-40 py-4 px-6 flex justify-center items-center pointer-events-none"
    >
      
      <motion.div 
        initial={{ 
          width: "60px",
          backgroundColor: "#030712",
          border: "1px solid #1f2937"
        }}
        animate={{ 
          width: "auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 140, 
          damping: 22,
          delay: 0.2
        }}
        className="pointer-events-auto p-1.5 rounded-full flex items-center justify-center gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)] relative overflow-hidden h-[54px]"
      >
        
        {/* Wave effects */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-full">
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 0.4, 0.4, 0] }}
            transition={{
              duration: 2.5,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 5,
              delay: 1.2
            }}
            className="absolute inset-y-0 left-0 flex items-center"
            style={{ width: '200%' }}
          >
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-[120%] text-[#D9414E] fill-current filter blur-[0.5px]">
              <path d="M0,10 C20,3 40,17 60,10 C80,3 90,14 100,8 L100,20 L0,20 Z" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 0.6, 0.6, 0] }}
            transition={{
              duration: 2.0,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 5.5,
              delay: 1.4
            }}
            className="absolute inset-y-0 left-0 flex items-center"
            style={{ width: '200%' }}
          >
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full text-[#F24444] fill-current filter blur-[0.5px]">
              <path d="M0,8 C30,18 50,2 75,13 C90,19 95,7 100,10 L100,20 L0,20 Z" />
            </svg>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex items-center gap-6 px-2 w-full"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isName = item.id === 'home';

            return (
              <motion.button
                variants={itemVariants}
                key={item.id}
                onClick={() => handleScrollNav(item.id)}
                className={`relative px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full cursor-pointer transition-colors duration-300 select-none shrink-0 z-10
                  ${isName ? 'tracking-normal font-black normal-case text-[13px] px-6' : ''}
                  ${isActive ? 'text-white' : isName ? 'text-gray-900' : 'text-gray-700 hover:text-black'}
                `}
              >
                <span className="relative z-20">{item.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="islandGlow"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 bg-gray-950 rounded-full z-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div 
          className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-red-500 rounded-full opacity-80 origin-left" 
          style={{ scaleX }} 
        />
      </motion.div>
    </motion.nav>
  );
}