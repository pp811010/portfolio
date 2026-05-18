import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import TopBar from '../compoments/TopBar';
import MagazineProjects from '../compoments/MagazineProjects';

const skillsData = [
  {
    category: "AI / Machine Learning",
    bgStyle: "bg-white/20 border-blue-200",
    skills: [
      { name: "RAG", icon: "openai", color: "10A37F" },
      { name: "Agentic RAG", icon: "googlegemini", color: "1A73E8" },
      { name: "Agno Framework", icon: "probot", color: "000000" }
    ]
  },
  {
    category: "Frontend Development",
    bgStyle: "bg-white/200 border-blue-200",
    skills: [
      { name: "React.js", icon: "react", color: "61DAFB" },
      { name: "Next.js", icon: "nextdotjs", color: "000000" },
      { name: "HTML5", icon: "html5", color: "E34F26" },
      { name: "CSS3", icon: "css3", color: "1572B6" },
      { name: "JavaScript", icon: "javascript", color: "F7DF1E" },
      { name: "shadcn/ui", icon: "shadcnui", color: "000000" },
      { name: "TailwindCSS", icon: "tailwindcss", color: "06B6D4" },
      { name: "Bootstrap", icon: "bootstrap", color: "7952B3" }
    ]
  },
  {
    category: "Backend Development",
    bgStyle: "bg-white/20 border-blue-200",
    skills: [
      { name: "Golang (gin, fiber)", icon: "go", color: "00ADD8" },
      { name: "FastAPI", icon: "fastapi", color: "009688" },
      { name: "Django", icon: "django", color: "092E20" },
      { name: "PHP", icon: "php", color: "777BB4" }
    ]
  },
  {
    category: "Mobile Development",
    bgStyle: "bg-white/20 border-blue-200",
    skills: [
      { name: "Flutter", icon: "flutter", color: "02569B" },
      { name: "Dart", icon: "dart", color: "0175C2" }
    ]
  },
  {
    category: "Database",
    bgStyle: "bg-white/20 border-blue-200",
    skills: [
      { name: "MySQL", icon: "mysql", color: "4479A1" },
      { name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
      { name: "SQLite", icon: "sqlite", color: "003B57" }
    ]
  },
  {
    category: "Programming Languages",
    bgStyle: "bg-white/20 border-blue-200",
    skills: [
      { name: "Python", icon: "python", color: "3776AB" },
      { name: "Java", icon: "openjdk", color: "EA2D2E" },
      { name: "C", icon: "c", color: "A8B9CC" },
      { name: "C++", icon: "cplusplus", color: "00599C" }
    ]
  },
  {
    category: "Tools",
    bgStyle: "bg-white/20 border-blue-200",
    skills: [
      { name: "GitHub", icon: "github", color: "18181B" },
      { name: "Postman", icon: "postman", color: "FF6C37" },
      { name: "Swagger", icon: "swagger", color: "85EA2D" }
    ]
  }
];

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = selectedSkill ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedSkill]);

  const getFilteredProjects = () => {
    if (!selectedSkill) return [];
    const skillNameLower = selectedSkill.name.toLowerCase();
    return projectsData.filter(project => {
      const matchInTags = project.tags?.some(t => t.toLowerCase().includes(skillNameLower));
      const matchInTools = project.tools?.some(t => t.toLowerCase().includes(skillNameLower));
      const matchInDesc = project.shortDesc?.toLowerCase().includes(skillNameLower) || project.title?.toLowerCase().includes(skillNameLower);
      return matchInTags || matchInTools || matchInDesc;
    });
  };

  const filteredProjects = getFilteredProjects();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F] font-sans selection:bg-gray-200 selection:text-black overflow-x-hidden">

      <TopBar sidebarOpen={!!selectedSkill} />

      <div className="flex w-full min-h-screen transition-all duration-500">

        <div className={`w-full transition-all duration-500 ${selectedSkill ? 'lg:w-[70%] border-r border-gray-200/80 bg-[#FAFAFA]' : 'w-full'}`}>

          {/* Hero */}
          <section className="pt-40 pb-20 max-w-7xl mx-auto px-6 flex flex-col items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full text-center">
              {/* <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Software Engineer & <br className="hidden md:block" /> Full-Stack Developer.
              </h1> */}
               <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Serapat <br className="hidden md:block" /> Ratanapachai's
              </h1>
              {/* <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed mx-auto mb-20">
                เชี่ยวชาญการพัฒนาและออกแบบระบบ Full-Stack ด้วย Go (Gin), Next.js และสถาปัตยกรรม AI (Agentic RAG)
                เน้นการสร้างซอฟต์แวร์ที่ตอบโจทย์ธุรกิจและมีประสิทธิภาพ
              </p> */}
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed mx-auto mb-20 mt-10 font-medium">
                PORTFOLIO <br/> <span className='text-lg font-normal'>Crafting Intelligent Systems, Agentic RAG, and Efficient Full-Stack Solutions.</span>
              </p>


              {/* Technical Skills */}
              <div className="text-left w-full border-t border-gray-200/60 pt-16">
                <div className="text-center mb-12 flex flex-col items-center gap-2.5">
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Technical Expertise</h2>
                  <div className="h-7 overflow-hidden relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {!selectedSkill ? (
                        <motion.div
                          key="hint-click"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#590B0B] rounded-full text-[11px] font-medium text-[#d6d6d6]"
                        >
                          <span className="flex h-1.5 w-1.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eed453] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#f87642]"></span>
                          </span>
                           คลิกที่ไอคอนเพื่อดูโปรเจกต์ที่เกี่ยวข้อง
                        </motion.div>
                      ) : (
                        <motion.div
                          key="hint-active"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-semibold text-blue-600 animate-pulse"
                        >
                          ⚡ กำลังแสดงโปรเจกต์ที่ใช้ {selectedSkill.name} (เปิดแถบด้านขวา)
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 ${selectedSkill ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6 max-w-7xl mx-auto transition-all duration-300`}>
                  {skillsData.map((group, idx) => (
                    <div key={idx} className={`p-6 rounded-[2rem] border backdrop-blur-sm shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start transition-all duration-300 ${group.bgStyle}`}>
                      <div className="mb-6">
                        <h3 className="text-sm font-bold text-gray-900 tracking-wide flex items-center gap-2">
                          <span className="w-1.5 h-3 bg-[#BF2C38] rounded-full" />
                          {group.category}
                        </h3>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {group.skills.map((skill, sIdx) => {
                          const isCurrentActive = selectedSkill?.name === skill.name;
                          return (
                            <div
                              key={sIdx}
                              onClick={() => setSelectedSkill(isCurrentActive ? null : skill)}
                              className={`flex flex-col items-center group cursor-pointer p-2 rounded-2xl transition-all duration-300 ${isCurrentActive ? 'bg-white shadow-[0_10px_25px_rgba(0,0,0,0.05)] scale-105 border border-black/5' : 'hover:bg-white/40'}`}
                            >
                              <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                                <img
                                  src={`https://img.shields.io/badge/-${skill.color}?style=flat-square&logo=${skill.icon}&logoColor=white`}
                                  alt={skill.name}
                                  className="w-full h-full object-contain scale-[2.2]"
                                  onError={(e) => { e.target.src = "https://img.shields.io/badge/-gray?style=flat-square&logo=cpu&logoColor=white"; }}
                                />
                              </div>
                              <span className="text-[11px] font-semibold text-gray-800 mt-2 tracking-tight group-hover:text-black">
                                {skill.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* ✅ Magazine Projects */}
          <MagazineProjects />

          <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-200/50">
            © 2026 Serapat Ratanapachai. Information Technology Graduate.
          </footer>
        </div>

        {/* RIGHT SIDEBAR */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 35 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[400px] lg:w-[30%] bg-white border-l border-gray-200/80 shadow-2xl z-50 flex flex-col justify-between"
            >
              <div className="flex-grow overflow-y-auto scrollbar-none p-8 pb-4">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
                      <Code className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recommended with</h3>
                      <p className="text-lg font-bold text-gray-900">{selectedSkill.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedSkill(null)} className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => navigate(`/project/${project.slug}`)}
                        className="group p-4 bg-[#FAFAFA] hover:bg-blue-50/40 rounded-2xl border border-gray-100/80 cursor-pointer transition-all duration-300 flex flex-col gap-3"
                      >
                        <div className="aspect-[21/9] w-full rounded-xl overflow-hidden bg-gray-100">
                          <img src={project.mockupImage} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center justify-between text-sm">
                            {project.title}
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all" />
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{project.shortDesc}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl bg-gray-50/30">
                      <p className="text-sm text-gray-400 font-medium">ยังไม่มีโปรเจกต์ที่ผูกกับสกิลนี้</p>
                      <p className="text-xs text-gray-400 mt-1">สามารถเข้าไปเพิ่ม Tag ในโครงสร้างข้อมูลได้</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 text-center bg-white shrink-0">
                <button onClick={() => setSelectedSkill(null)} className="text-xs text-gray-400 hover:text-gray-900 font-semibold transition-colors">
                  Close Sidebar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}