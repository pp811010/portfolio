import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';

// annotation positions สำหรับ 4 มุม
// pos: 'top-left' | 'top-right' | 'bot-left' | 'bot-right'
// anchor: [x%, y%] คือตำแหน่งปลายเส้นบนรูป
const annotationConfigs = [
  { pos: 'top-left',  anchor: [0.22, 0.22], labelKey: 'category',   valueKey: 'stackLabel'  },
  { pos: 'top-right', anchor: [0.76, 0.28], labelKey: 'techLabel',   valueKey: 'techValue'   },
  { pos: 'bot-left',  anchor: [0.20, 0.72], labelKey: 'typeLabel',   valueKey: 'typeValue'   },
  { pos: 'bot-right', anchor: [0.74, 0.68], labelKey: 'dbLabel',     valueKey: 'dbValue'     },
];

// map projectsData เติม annotation fields
function buildAnnotations(project) {
  const tags = project.tags || [];
  const tools = project.tools || [];

  return [
    { label: 'Category',   value: project.category || '—',   pos: 'top-left',  anchor: [0.22, 0.22] },
    { label: 'Tech Stack', value: tools.slice(0, 2).join(', ') || tags.slice(0, 2).join(', ') || '—', pos: 'top-right', anchor: [0.76, 0.28] },
    { label: 'Type',       value: tags[0] || '—',            pos: 'bot-left',  anchor: [0.20, 0.72] },
    { label: 'Database',   value: tools.find(t => ['MySQL','PostgreSQL','SQLite','MongoDB','Firebase'].some(db => t.toLowerCase().includes(db.toLowerCase()))) || tools[tools.length - 1] || '—', pos: 'bot-right', anchor: [0.74, 0.68] },
  ];
}

// SVG annotation overlay
function AnnotationSVG({ annotations, width = 680, height = 425 }) {
  const labelPositions = {
    'top-left':  { lx: 40,  ly: 52  },
    'top-right': { lx: 640, ly: 52  },
    'bot-left':  { lx: 40,  ly: 375 },
    'bot-right': { lx: 640, ly: 375 },
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      style={{ zIndex: 10 }}
    >
      {annotations.map((ann, i) => {
        const lp = labelPositions[ann.pos];
        const ax = ann.anchor[0] * width;
        const ay = ann.anchor[1] * height;
        const isRight = lp.lx > width / 2;

        // จุดหักมุม
        const cornerX = isRight ? lp.lx - 56 : lp.lx + 56;
        const cornerY = lp.ly;

        return (
          <g key={i}>
            {/* dot บนรูป */}
            <circle cx={ax} cy={ay} r={3} fill="currentColor" opacity={0.45} className="text-gray-900" />
            {/* เส้น polyline */}
            <polyline
              points={`${ax},${ay} ${cornerX},${cornerY} ${lp.lx},${cornerY}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity={0.28}
              className="text-gray-900"
            />
            {/* label */}
            <text
              x={isRight ? lp.lx : lp.lx}
              y={lp.ly - 10}
              textAnchor={isRight ? 'end' : 'start'}
              fontSize="8.5"
              fontWeight="600"
              letterSpacing="0.12em"
              opacity={0.5}
              fill="currentColor"
              className="text-gray-600"
              style={{ textTransform: 'uppercase', fontFamily: 'inherit' }}
            >
              {ann.label.toUpperCase()}
            </text>
            {/* value */}
            <text
              x={isRight ? lp.lx : lp.lx}
              y={lp.ly + 5}
              textAnchor={isRight ? 'end' : 'start'}
              fontSize="12.5"
              fontWeight="400"
              fill="currentColor"
              className="text-gray-900"
              style={{ fontFamily: 'inherit' }}
            >
              {ann.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function MagazineProjects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const project = projectsData[current];
  const annotations = buildAnnotations(project);

  const goTo = (dir) => {
    setDirection(dir);
    setCurrent(prev => (prev + dir + projectsData.length) % projectsData.length);
  };

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.3 } }),
  };

  return (
    <section id="projects" className="py-24 w-full border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Selected Projects</h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              ผลงานการพัฒนาระบบและสถาปัตยกรรมซอฟต์แวร์
            </p>
          </div>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 hover:border-gray-900 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full transition-all duration-300 shrink-0"
          >
            ดูทั้งหมด <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Magazine Stage */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Image + Annotations */}
            <div
              className="relative w-full rounded-[2rem] overflow-hidden cursor-pointer"
              style={{ aspectRatio: '16/9' }}
              onClick={() => navigate(`/project/${project.slug}`)}
            >
             <div className='flex items-center justify-center absolute inset-0 z-20 bg-black/0  transition-colors duration-300'>
                 <img
                src={project.mockupImage}
                alt={project.title}
                className="w-[500px] h-[700px] object-cover"
              />
             </div>
              {/* overlay เบาๆ */}
              <div className="absolute  rounded-[2rem]" />
              <AnnotationSVG annotations={annotations} />
            </div>

            {/* Project info ด้านล่าง */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full tracking-wider uppercase">
                  {project.category}
                </span>
                <h3 className="mt-3 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-xl line-clamp-2">
                  {project.shortDesc}
                </p>
              </div>

              <button
                onClick={() => navigate(`/project/${project.slug}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-all duration-300 shrink-0"
              >
                ดูโปรเจ็ค <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-5 mt-12">
          <button
            onClick={() => goTo(-1)}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {projectsData.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 h-2 bg-gray-900'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(1)}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 rounded-full transition-all duration-300"
          >
            ถัดไป <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* counter */}
        <p className="text-center text-xs text-gray-400 mt-4 tracking-widest">
          {String(current + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
        </p>

      </div>
    </section>
  );
}