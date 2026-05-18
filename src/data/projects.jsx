export const projectsData = [
  {
    id: 1,
    slug: "chatdio",
    title: "Chatdio",
    category: "AI Chatbot Platform",
    shortDesc: "แพลตฟอร์ม AI Chatbot พร้อม Agentic RAG ที่รองรับการสร้างแชทบอทแบบ No-code",
    fullDesc: "ระบบ AI Chatbot ที่ขับเคลื่อนด้วย Agentic RAG รองรับการดึงข้อมูลจากหลายแหล่ง (OCR, PostgreSQL, REST APIs) พัฒนาทั้งระบบ Backend และ Web Application ช่วยให้ผู้ใช้สร้างแชทบอท ปรับแต่ง LLM และลักษณะนิสัยได้โดยไม่ต้องเขียนโค้ด ปัจจุบันถูกนำไปใช้งานจริงบนเซิร์ฟเวอร์ของมหาวิทยาลัย (chatdio.it.kmitl.ac.th)",
    techStack: ["Agno Framework", "FastAPI", "Next.js", "PostgreSQL", "PGVector", "AWS S3"],
    mockupImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    slug: "mumood",
    title: "MuMood",
    category: "Music Discovery App",
    shortDesc: "แอปพลิเคชันค้นหาและรีวิวเพลงตามอารมณ์ รองรับ iOS และ Android",
    fullDesc: "แอปพลิเคชันมือถือแบบ Cross-platform ที่ให้ผู้ใช้รีวิวเพลงผ่านมิติต่างๆ เช่น จังหวะ (Beat), เนื้อร้อง (Lyric) และอารมณ์ (Mood) ผ่านตัวเลือกอารมณ์แบบใช้สี มีการเชื่อมต่อ Spotify API สำหรับข้อมูลเพลง และ Deezer API สำหรับเล่นตัวอย่างเสียง 30 วินาที พร้อมระบบ Backend จัดการประวัติการรีวิว",
    techStack: ["Flutter", "FastAPI", "PostgreSQL", "Spotify API", "Deezer API", "OAuth 2.0"],
    mockupImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    slug: "bitx",
    title: "BitX",
    category: "Cryptocurrency Paper Trading",
    shortDesc: "แพลตฟอร์มจำลองการเทรดคริปโตเคอร์เรนซีด้วยพอร์ตจำลอง 100,000 บาท",
    fullDesc: "เว็บแอปพลิเคชันสำหรับการฝึกเทรดคริปโตฯ แบบไร้ความเสี่ยง ผู้ใช้จะได้รับเงินจำลองเริ่มต้น 100,000 บาท ระบบเชื่อมต่อกับ CoinGecko API เพื่อดึงข้อมูลราคาแบบ Real-time และใช้ Stripe API สำหรับจำลองการเติมเงิน พร้อมระบบติดตามพอร์ตโฟลิโอ",
    techStack: ["Next.js", "Prisma", "Supabase", "Clerk", "Tailwind CSS"],
    mockupImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    slug: "sport-booking",
    title: "Sport Activity Booking",
    category: "University Web System",
    shortDesc: "ระบบจองสิ่งอำนวยความสะดวกด้านกีฬาและจัดการตารางกิจกรรม",
    fullDesc: "ระบบจองสำหรับมหาวิทยาลัยที่รองรับผู้ใช้งานหลายระดับ (Role-based access) จัดการระบบสิทธิ์ การจอง และการรายงานปัญหาผ่าน Django backend พร้อมระบบแอดมินสำหรับการยืนยันการจองและการส่งการแจ้งเตือนอัตโนมัติผ่าน Gmail",
    techStack: ["Django", "PostgreSQL", "JavaScript", "Tailwind CSS", "HTML"],
    mockupImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000"
  }
];