import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti"; // Import ไลบรารีทำพลุ
import TopBar from "../compoments/TopBar";

// แยกตัวอักษรเป็น Array เพื่อให้แสดงผลขึ้นมาทีละตัวได้
const textArray = ["💐", "L", "U", "K", "N", "A", "M", "🐱"];

// ฟังก์ชันจัดคลาสให้แต่ละตัวอักษร
const getCharClass = (char) => {
  const isEmoji = char === "💐" || char === "🐱";
  if (isEmoji) {
    return "text-5xl md:text-7xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mx-4 md:mx-6";
  }
  return "text-6xl md:text-8xl font-mono font-black mx-1 md:mx-2";
};

// ฟังก์ชันใส่แสงนีออนให้ตัวอักษร (ยกเว้นอิโมจิ)
const getCharStyle = (char) => {
  if (char === "💐" || char === "🐱") return {};
  return {
    color: "#fff",
    textShadow:
      "0 0 5px #ff2a85, 0 0 10px #ff2a85, 0 0 20px #ff2a85, 0 0 40px #ff2a85, 0 0 80px #ff2a85",
  };
};

// Component ป้ายไฟ 1 ชุด
const LedTextGroup = ({ isTyping = false, onComplete = null, visible = true }) => {
  if (!isTyping) {
    return (
      <div
        className="flex items-center px-6 transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0 }} 
      >
        {textArray.map((char, i) => (
          <span key={i} className={getCharClass(char)} style={getCharStyle(char)}>
            {char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="flex items-center px-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.25 }, 
        },
      }}
      onAnimationComplete={onComplete} 
    >
      {textArray.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className={getCharClass(char)}
          style={getCharStyle(char)}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

function IsLuknam() {
  const navigate = useNavigate();
  const [startMarquee, setStartMarquee] = useState(false);

  // --- เอฟเฟกต์พลุยิงจากด้านล่างเมื่อเข้ามาหน้าแรก ---
  useEffect(() => {
    const duration = 3 * 1000; // ระยะเวลายิงพลุ (3 วินาที)
    const end = Date.now() + duration;

    const frame = () => {
      // พลุยิงจากมุมซ้ายล่าง
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 1 },
        colors: ["#ebde34", "#ffffff", "#38eb8e"], // สีพลุให้เข้ากับป้าย LED
        zIndex: 100, // ให้อยู่ด้านหน้าสุด
      });
      // พลุยิงจากมุมขวาล่าง
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 1 },
        colors: ["#ebde34", "#ffffff", "#38eb8e"],
        zIndex: 100,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // เริ่มยิงพลุ
    frame();
  }, []); // [] หมายถึงให้รันแค่ครั้งเดียวตอนโหลด Component

  const handleTypingComplete = () => {
    setTimeout(() => {
      setStartMarquee(true);
    }, 800); 
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F] font-sans selection:bg-gray-200 selection:text-black overflow-x-hidden">
      <TopBar />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-24 relative z-10">
        {/* Header Section */}
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
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              你好 &<br className="hidden md:block" />
              去中国学习要开心哦，记得想哥哥
            </h1>
            <p className="mt-4 text-gray-500 text-base max-w-xl leading-relaxed">
              By Popo Durden
            </p>
          </motion.div>
        </div>

        <div className="border-t border-gray-200/80 mb-14" />

        {/* --- PIXEL LED BOARD SECTION --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full relative bg-[#0a0a0a] rounded-[2rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[10px] border-[#1f1f1f] overflow-hidden flex flex-col justify-center min-h-[350px]"
        >
          {/* LED Dot Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 z-10"
            style={{
              backgroundImage: "radial-gradient(#444 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />
          <div className="absolute inset-4 border-2 border-[#ff2a85]/20 rounded-2xl z-20 pointer-events-none" />

          {/* Container สำหรับแอนิเมชัน */}
          <div className="w-full overflow-hidden flex relative z-0 py-10">
            <motion.div
              className="flex whitespace-nowrap items-center w-max"
              animate={startMarquee ? { x: ["0%", "-50%"] } : { x: "0%" }}
              transition={
                startMarquee
                  ? { repeat: Infinity, ease: "linear", duration: 12 }
                  : {}
              }
            >
              {/* --- ครึ่งแรก (แสดงผลตอนแรก) --- */}
              <div className="flex items-center pr-4">
                <LedTextGroup isTyping={true} onComplete={handleTypingComplete} />
                <LedTextGroup isTyping={false} visible={startMarquee} />
                <LedTextGroup isTyping={false} visible={startMarquee} />
              </div>

              {/* --- ครึ่งหลัง (สำหรับวนลูปไร้รอยต่อ) --- */}
              <div className="flex items-center pr-4">
                <LedTextGroup isTyping={false} visible={startMarquee} />
                <LedTextGroup isTyping={false} visible={startMarquee} />
                <LedTextGroup isTyping={false} visible={startMarquee} />
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* --------------------------------- */}
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-200/50 relative z-10">
        © 2026 Serapat Ratanapachai. Information Technology Graduate.
      </footer>
    </div>
  );
}

export default IsLuknam;