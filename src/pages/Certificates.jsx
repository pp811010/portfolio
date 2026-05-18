import React, { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft,X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { certificateData } from "../data/certificates";
import TopBar from "../compoments/TopBar";
import { useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
};

const FullscreenImageViewer = ({ imgUrl, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // เพิ่ม exit animation สำหรับ AnimatePresence
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10 cursor-pointer" // cursor-pointer เพื่อบอกว่าคลิกพื้นหลังเพื่อปิดได้
      onClick={onClose} // คลิกที่พื้นหลังสีดำเพื่อปิด
    >
      <div className="relative max-w-7xl max-h-full flex items-center justify-center p-4">
        {/* รูปภาพเต้มจอ */}
        <motion.img
          src={imgUrl}
          alt="Fullscreen Certificate"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" // ปรับขนาดรูปไม่ให้เกินหน้าจอ
          onClick={(e) => e.stopPropagation()} // ป้องกันไม่ให้คลิกที่ตัวรูปแล้วไปปิด viewer (เพราะเรา onClick พื้นหลังไปแล้ว)
        />

        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          className="absolute top-8 right-4 md:top-2 md:right-6 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-300 z-[101] cursor-pointer" // ยกเลิก z-index ให้สูงกว่ารูป
        >
          <X className="w-4 h-4 text-black " />
        </button>
      </div>
    </motion.div>
  );
};

function Certificates() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const [selectedImgUrl, setSelectedImgUrl] = useState(null);

  useEffect(() => {
    console.log("Certificate data loaded:", certificateData);
  }, []);
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F] font-sans selection:bg-gray-200 selection:text-black">
      <TopBar />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="mb-16">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 font-medium transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back To Home
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
              Certificates ({certificateData.length})
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Professional Certifications &<br className="hidden md:block" />
              Continuous Learning
            </h1>
            <p className="mt-4 text-gray-500 text-base max-w-xl leading-relaxed">
              Showcasing verified credentials and a dedication to staying at the
              forefront of software development and AI technologies.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200/80 mb-14" />

        {/* Projects Grid */}
        <div className="flex flex-col gap-5">
          {certificateData.map((cert, i) => (
            <motion.article
              key={cert.credentialId}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              onMouseEnter={() => setHoveredId(cert.credentialId)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100/80 shadow-[0_4px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-all duration-500 flex flex-col"
            >
              <div className="grid grid-cols-2">
                {/* Image */}
                <div
                  className="bg-[#F0F0F2] aspect-[16/10] overflow-hidden relative cursor-pointer" // เพิ่ม cursor-pointer เพื่อบอกว่าคลิกได้
                  onClick={() => setSelectedImgUrl(cert.img)} // เมื่อคลิก ให้นำ URL รูปไปใส่ใน state
                >
                  <motion.img
                    src={cert.img}
                    alt={cert.title}
                 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <span className="inline-block text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
                      {cert.issuer}
                    </span>

                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
                      {cert.title}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>

                    {/* Tags */}
                    {cert.tags && cert.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5">
                        {cert.tags.slice(0, 4).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                        {cert.tags.length > 4 && (
                          <span className="text-[11px] font-medium text-gray-400 px-2.5 py-1">
                            +{cert.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                 
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {certificateData.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium">ยังไม่มีใบรับรอง</p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedImgUrl && (
          <FullscreenImageViewer
            imgUrl={selectedImgUrl}
            onClose={() => setSelectedImgUrl(null)} // เมื่อกดปิด ให้เซ็ต state เป็น null เพื่อซ่อน viewer
          />
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-200/50">
        © 2026 Serapat Ratanapachai. Information Technology Graduate.
      </footer>
    </div>
  );
}
export default Certificates;
