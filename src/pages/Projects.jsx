import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import TopBar from '../compoments/TopBar';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }
  })
};

export default function Projects() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F] font-sans selection:bg-gray-200 selection:text-black">
      
      <TopBar />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-24">

        {/* Header */}
        <div className="mb-16">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 font-medium transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 " />
            Back To Home
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
              Projects ({projectsData.length})
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              System Development &<br className="hidden md:block" />
              Software Architecture
            </h1>
            <p className="mt-4 text-gray-500 text-base max-w-xl leading-relaxed">
              A collection of projects I have designed and developed, ranging from Full-Stack systems to advanced AI Architecture.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200/80 mb-14" />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projectsData.map((project, i) => (
            <motion.article
              key={project.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100/80 shadow-[0_4px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-all duration-500 flex flex-col"
            >
              {/* Image */}
              <div className="bg-[#F0F0F2] aspect-[16/10] overflow-hidden relative">
                <motion.img
                  src={project.mockupImage}
                  alt={project.title}
                  animate={{ scale: hoveredId === project.id ? 1.04 : 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex-grow">
                  <span className="inline-block text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
                    {project.category}
                  </span>
                  
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
                    {project.title}
                  </h2>
                  
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {project.shortDesc}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[11px] font-medium text-gray-400 px-2.5 py-1">
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {project.year || ''}
                  </span>
                  
                  <button
                    onClick={() => navigate(`/project/${project.slug}`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] transform hover:scale-[1.03] cursor-pointer"
                  >
                    View Project
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {projectsData.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium">ยังไม่มีโปรเจกต์</p>
          </div>
        )}

      </main>

      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-200/50">
        © 2026 Serapat Ratanapachai. Information Technology Graduate.
      </footer>
    </div>
  );
}