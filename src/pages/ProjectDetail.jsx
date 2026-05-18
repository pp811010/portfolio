import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ใช้ Hooks ของ react-router-dom
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Cpu } from 'lucide-react';
import { projectsData } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // ค้นหาข้อมูลผลงานตามชื่อ slug
  const project = projectsData.find(p => p.slug === slug);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-400 font-sans">
        Project Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-sans pb-32">
      
      {/* Topbar Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{project.title}</span>
        </div>
        <motion.div className="h-[2px] bg-blue-600 origin-left" style={{ scaleX }} />
      </nav>

      {/* Project Content Box */}
      <div className="pt-24 max-w-4xl mx-auto px-6">
        
        {/* Main Banner Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full aspect-video rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 mb-12 shadow-sm"
        >
          <img src={project.mockupImage} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Core Layout Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Main Context Left Side */}
          <div className="md:col-span-2">
            <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">{project.category}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{project.title}</h1>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Overview</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{project.fullDesc}</p>
            </div>

            {/* Application Mockup Display Area */}
            <div className="mt-12 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Application Screens</h3>
              <div className="aspect-video bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                <img src={project.mockupImage} alt="Dashboard view" className="w-full h-full object-cover opacity-70" />
              </div>
            </div>
          </div>

          {/* Infrastructure Specs Right Side */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-fit">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-white border border-gray-200/60 rounded-xl text-xs font-semibold text-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}