import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import RotatingText from "../components/RotatingText.jsx"; 
import { FaReact, FaNodeJs, FaPython, FaAws, FaGitAlt } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiJavascript } from "react-icons/si";
import { SiPostgresql } from "react-icons/si"; // Added another icon for variety

// Ensure this is defined at the top of Home.jsx
const timelineVariants = {
  hidden: { opacity: 0.01, y: 10 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.5 } 
  },
};
// Define key icons for the quick-bar
const quickSkills = [
  { icon: FaReact, color: "text-cyan-400", name: "React" },
  { icon: FaNodeJs, color: "text-green-500", name: "Node.js" },
  { icon: SiMongodb, color: "text-green-400", name: "MongoDB" },
  { icon: SiTailwindcss, color: "text-sky-400", name: "Tailwind" },
  { icon: FaAws, color: "text-orange-400", name: "AWS" },
];

// Define core skills for the Jiggle block (in the About section)
const coreSkills = [
    { Icon: FaReact, name: 'React', color: 'text-sky-400' },
    { Icon: FaNodeJs, name: 'Node.js', color: 'text-green-500' },
    { Icon: SiJavascript, name: 'JS', color: 'text-yellow-400' },
    { Icon: FaPython, name: 'Python', color: 'text-blue-400' },
    { Icon: SiPostgresql, name: 'SQL', color: 'text-blue-500' },
];


export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
  useEffect(() => {
    // You can remove this global listener, but keeping it as a placeholder for completeness
    const handleMouseMove = (event) => {};
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); 

  // Define a style object for the interactive glow
  const gradientStyle = {
    background: 'radial-gradient(400px at var(--x) var(--y), rgba(124, 58, 237, 0.4), transparent 80%)',
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* ------------------------------------------------------------------ */}
      {/* GLOBAL BACKGROUND ELEMENTS (Video and Overlay - for the Hero section) */}
      {/* ------------------------------------------------------------------ */}
      <video
        autoPlay
        loop
        muted
        playsInline
        // These classes ensure the video only covers the viewport, effectively becoming the Hero BG
        className="fixed inset-0 w-full h-full object-cover -z-10" 
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay over the video (fixed, for the Hero section) */}
      <div className="fixed inset-0 bg-black/70 -z-10"></div>

      {/* Navbar (Kept as is) */}
      <Navbar />

      {/* ------------------------------------------------------------------ */}
      {/* Hero Section (Uses the fixed video background) */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="home"
        className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4"
      >
        {/* ... (Hero Content) ... */}
        <motion.p
          className="text-lg text-gray-300 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Ansh Mishra
          </span>
        </motion.h1>

        <RotatingText />

        <motion.p
          className="text-md sm:text-lg md:text-xl text-gray-400 max-w-2xl mt-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          I transform ideas into elegant digital solutions, blending creativity
          with technical excellence to create experiences that inspire and
          engage.
        </motion.p>

        <motion.div
          className="flex space-x-6 mb-10 text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {quickSkills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.2, color: skill.color, transition: { type: "spring", stiffness: 300 } }}
            >
              <skill.icon className={`text-2xl ${skill.color}`} title={skill.name} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex gap-4">
          <motion.a
            href="#projects"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work →
          </motion.a>
          
          <motion.a
            href="#contact"
            className="px-6 py-3 rounded-full border border-gray-300 text-white font-semibold hover:bg-gray-800 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 w-full flex justify-center z-20">
        <div className="flex flex-col items-center text-white opacity-70">
          <span className="text-xs mb-2">SCROLL</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-1 animate-bounce"></div>
          </div>
        </div>
      </div>
      
      {/* ------------------------------------------------------------------ */}
      {/* ABOUT SECTION - NEW GRADIENT BACKGROUND */}
      {/* ------------------------------------------------------------------ */}
      <section 
        id="about" 
        className="relative z-10 py-20 
                   bg-black/90 
                   bg-[radial-gradient(ellipse_at_top,_#1f2937_0%,_#000000_100%)]"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Profile Image (Column 1) - WITH HOVER EFFECT */}
           <div className="flex justify-center">
  <motion.div
    whileHover={{ 
      scale: 1.05, 
      rotate: [0, 1, -1, 0], 
      boxShadow: "0 10px 25px rgba(124, 58, 237, 0.4)" 
    }}
    transition={{ 
      type: "spring", 
      stiffness: 300, 
      damping: 10 
    }}
    className="relative rounded-2xl p-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl"
  >
    <picture>
      <source srcSet="/profile.webp" type="image/webp" />
      <img
        src="/profile.jpg" 
        alt="Ansh Mishra - Full Stack Developer"
        // --- CHANGED SIZE HERE ---
        className="w-80 h-80 md:w-96 md:h-96 rounded-[14px] object-cover" 
        loading="lazy"
      />
    </picture>
  </motion.div>
   </div>

          {/* About Text (Column 2) - WITH INTERACTIVE GLOW LISTENER */}
          <div 
            className="relative p-4 md:p-0"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
          >
            
            {/* INTERACTIVE GLOW ELEMENT */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none rounded-lg"
              style={{
                ...gradientStyle, 
                '--x': `${mousePosition.x}px`,
                '--y': `${mousePosition.y}px`,
              }}
            />
            
            {/* ALL CONTENT WRAPPER */}
            <div className="relative z-10">
              
              <h2 className="text-4xl font-bold text-white mb-6">
                About <span className="text-indigo-400">Me</span> 
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-100 mb-4">
                Hello! I'm Ansh Mishra, a passionate <span className="text-purple-400">Full Stack Developer</span> focused on performance and user experience.
              </h3>
              
              <p className="text-gray-300 mb-6">
                I’m passionate about building scalable web applications and
                learning new technologies. Here’s a quick overview of my
                educational journey:
              </p>
              
              {/* --- ANIMATED SKILL ICONS BLOCK --- */}
              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Core Skills Showcase</h3>
                <div className="flex flex-wrap gap-8 justify-start">
                    {coreSkills.map(({ Icon, name, color }, index) => (
                        <div key={name} className="flex flex-col items-center group">
                            <motion.div
                                animate={{ y: [0, -3, 0], rotate: [0, 1, 0] }}
                                transition={{ 
                                    duration: 3, 
                                    ease: "easeInOut", 
                                    repeat: Infinity, 
                                    delay: index * 0.5 + 0.5 
                                }}
                                whileHover={{ scale: 1.15 }}
                            >
                                <Icon className={`${color} text-5xl`} />
                            </motion.div>
                            <span className="text-xs text-gray-400 mt-2 transition-colors duration-200 group-hover:text-indigo-400">
                                {name}
                            </span>
                        </div>
                    ))}
                </div>
              {/* --- END ANIMATED SKILL ICONS BLOCK --- */}
              
              {/* --- START OF ANIMATED QUOTE BLOCK --- */}
              <motion.div
                className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-lg border border-indigo-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: [1, 1.01, 1], 
                  boxShadow: ["0 4px 10px rgba(0,0,0,0.5)", "0 6px 15px rgba(124,58,237,0.3)", "0 4px 10px rgba(0,0,0,0.5)"]
                }}
                transition={{ 
                  duration: 1, 
                  ease: "easeInOut", 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  delay: 0.5 
                }}
              >
                <p className="text-lg italic text-gray-200 mb-4">
                  "The only way to do great work is to love what you do."
                </p>
                <p className="text-sm font-semibold text-indigo-400 text-right">
                  – Steve Jobs, the co-founder of Apple Inc.
                </p>
              </motion.div>
              {/* --- END OF ANIMATED QUOTE BLOCK --- */}
              
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
{/* EDUCATION SECTION - FLOWCHART/TIMELINE BACKGROUND (Concise & Fixed) */}
{/* ------------------------------------------------------------------ */}
<section 
  id="education" 
  className="py-20 bg-gray-950 
             bg-[linear-gradient(to_bottom,_#0f172a_0%,_#000000_100%)]"
>
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-white mb-16">
      🎓 My Educational <span className="text-indigo-400">Journey</span>
    </h2>
    
    {/* Timeline Container */}
    <div className="relative">
      
      {/* Vertical Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-purple-600 h-full"></div>

      {/* Timeline Items Wrapper */}
      <div className="space-y-12">
          
        {/* Item 1: B.Tech in CSE - College/University */}
        <motion.div
          className="relative flex justify-start md:justify-end"
          variants={timelineVariants}
          initial="hidden"
          animate="visible" 
          viewport={{ once: true }} 
        >
          {/* Dot/Marker */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded-full z-10 border-4 border-gray-950"></div>
          
          {/* Content Card (Right Side) - PADDING REDUCED TO p-4 */}
          <div className="w-full md:w-5/12 bg-gray-900 p-4 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:scale-[1.02] transition-transform duration-300 md:mr-16">
            
            <div className="flex items-center space-x-3 mb-1">
                <img 
                    src="education2.png" 
                    alt="University Logo" 
                    className="w-8 h-8 object-contain rounded-full bg-white p-1" // LOGO SIZE REDUCED
                />
                <h3 className="text-xl font-semibold text-indigo-400">B.Tech in CSE</h3> {/* TITLE SIZE REDUCED */}
            </div>
            
            <p className="text-gray-300 text-sm mt-1">S.B. JAIN INSTITUTE OF TECHNOLOGY MANAGEMENT & RESEARCH (2022 - Present)</p>
            
            {/* PERCENTAGE/CGPA SIZE REDUCED AND CONSOLIDATED */}
            <p className="text-base font-bold text-purple-400 mt-1 mb-2">
                Current CGPA: <span className="text-white">8.0/10</span> 
            </p>
            
            <p className="text-gray-400 text-sm">
              Focus on full-stack development, algorithms, and cloud computing fundamentals.
            </p>
          </div>
        </motion.div>

        {/* Item 2: Higher Secondary - School */}
        <motion.div
          className="relative flex justify-end md:justify-start"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Dot/Marker */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded-full z-10 border-4 border-gray-950"></div>
          
          {/* Content Card (Left Side) - PADDING REDUCED TO p-4 */}
          <div className="w-full md:w-5/12 bg-gray-900 p-4 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:scale-[1.02] transition-transform duration-300 md:ml-16">
            
            <div className="flex items-center space-x-3 mb-1">
                <img 
                    src="education1.png" 
                    alt="Higher Secondary School Logo" 
                    className="w-8 h-8 object-contain rounded-full bg-white p-1" // LOGO SIZE REDUCED
                />
                <h3 className="text-xl font-semibold text-indigo-400">Higher Secondary (11th & 12th)</h3> {/* TITLE SIZE REDUCED */}
            </div>
            
            <p className="text-gray-300 text-sm mt-1">Kendriya Vidyalaya Ambajhari Nagpur (2020 - 2022)</p>

            {/* PERCENTAGE/CGPA SIZE REDUCED AND CONSOLIDATED */}
            <p className="text-base font-bold text-purple-400 mt-1 mb-2">
                Percentage: <span className="text-white">63.8%</span> 
            </p>

            {/* FIX: Removed the incorrect nested <p> tag here */}
            <p className="text-gray-400 text-sm">
              Key subjects: Physics, Chemistry, and Mathematics (PCM). Achieved strong foundation in logic.
            </p>
          </div>
        </motion.div>

        {/* Item 3: Secondary School - School */}
        <motion.div
          className="relative flex justify-start md:justify-end"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Dot/Marker */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded-full z-10 border-4 border-gray-950"></div>
          
          {/* Content Card (Right Side) - PADDING REDUCED TO p-4 */}
          <div className="w-full md:w-5/12 bg-gray-900 p-4 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:scale-[1.02] transition-transform duration-300 md:mr-16">
            
            <div className="flex items-center space-x-3 mb-1">
                <img 
                    src="education1.png" 
                    alt="Secondary School Logo" 
                    className="w-8 h-8 object-contain rounded-full bg-white p-1" // LOGO SIZE REDUCED
                />
                <h3 className="text-xl font-semibold text-indigo-400">Secondary School (10th)</h3> {/* TITLE SIZE REDUCED */}
            </div>
            
            <p className="text-gray-300 text-sm mt-1">Kendriya Vidyalaya Ambajhari Nagpur (2018 - 2020)</p>

            {/* PERCENTAGE/CGPA SIZE REDUCED AND CONSOLIDATED */}
            <p className="text-base font-bold text-purple-400 mt-1 mb-2">
                Percentage: <span className="text-white">77.2%</span> 
            </p>

            <p className="text-gray-400 text-sm">
              Developed strong foundational knowledge across all subjects.
            </p>
          </div>
        </motion.div>
        
      </div>
    </div>
  </div>
</section>
      {/* ------------------------------------------------------------------ */}
      {/* EXPERIENCE SECTION - NEW BACKGROUND (Slightly lighter gradient) */}
      {/* ------------------------------------------------------------------ */}
      <section 
        id="experience" 
        className="py-20 bg-black/70 
                   bg-[radial-gradient(ellipse_at_bottom_right,_#1f2937_0%,_#000000_100%)]"
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            💼 Experience
          </h2>
          <div className="space-y-8">
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-purple-500 shadow-md">
              <h3 className="text-xl font-semibold text-indigo-400">Web Developer Intern</h3>
              <p className="text-gray-300">ABC Company (2023 - Present)</p>
              <p className="text-gray-400 mt-2">
                Worked on frontend development with React, TailwindCSS, and API
                integration.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-purple-500 shadow-md">
              <h3 className="text-xl font-semibold text-indigo-400">Freelance Developer</h3>
              <p className="text-gray-300">Self-employed (2022 - Present)</p>
              <p className="text-gray-400 mt-2">
                Built multiple client projects including portfolios and web
                apps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SKILLS SECTION - NEW BACKGROUND (Deep blue radial) */}
      {/* ------------------------------------------------------------------ */}
      <section 
        id="skills" 
        className="py-20 bg-black 
                   bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#000000_100%)]"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">⚡ Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {/* React */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
              <FaReact className="text-5xl text-cyan-400 mb-3" />
              <p className="text-white font-semibold">React.js</p>
            </div>
            {/* Node.js */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
              <FaNodeJs className="text-5xl text-green-500 mb-3" />
              <p className="text-white font-semibold">Node.js</p>
            </div>
            {/* MongoDB */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
              <SiMongodb className="text-5xl text-green-400 mb-3" />
              <p className="text-white font-semibold">MongoDB</p>
            </div>
            {/* TailwindCSS */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
              <SiTailwindcss className="text-5xl text-sky-400 mb-3" />
              <p className="text-white font-semibold">TailwindCSS</p>
            </div>
            {/* JavaScript */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
              <SiJavascript className="text-5xl text-yellow-400 mb-3" />
              <p className="text-white font-semibold">JavaScript</p>
            </div>
            {/* Python */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
              <FaPython className="text-5xl text-blue-400 mb-3" />
              <p className="text-white font-semibold">Python</p>
            </div>
            {/* AWS */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
              <FaAws className="text-5xl text-orange-400 mb-3" />
              <p className="text-white font-semibold">AWS</p>
            </div>
            {/* Git */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
              <FaGitAlt className="text-5xl text-red-500 mb-3" />
              <p className="text-white font-semibold">Git</p>
            </div>
          </div>
        </div>
      </section>


      {/* ------------------------------------------------------------------ */}
      {/* PROJECTS SECTION - NEW BACKGROUND (Darker radial) */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="projects"
        className="min-h-screen text-white flex flex-col items-center justify-center px-6 py-20 
                   bg-[radial-gradient(ellipse_at_top,_#000000_0%,_#1f2937_100%)]"
      >
        <h2 className="text-4xl font-bold mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {/* Example Project Card */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Portfolio Website</h3>
            <p className="text-gray-400 text-sm">
              A personal portfolio built with React, Tailwind, and Framer Motion.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">E-commerce App</h3>
            <p className="text-gray-400 text-sm">
              A full-stack MERN app with product listings, cart, and authentication.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Chat Application</h3>
            <p className="text-gray-400 text-sm">
              A real-time chat app using Socket.io and Node.js for messaging.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CONTACT SECTION - NEW BACKGROUND (Finishing linear gradient) */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="contact"
        className="min-h-screen text-white flex flex-col items-center justify-center px-6 py-20 
                   bg-[linear-gradient(to_bottom,_#000000_0%,_#1f2937_100%)]"
      >
        <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
        <p className="text-lg text-gray-400 mb-8 text-center max-w-xl">
          Whether you have a question, want to collaborate, or just want to say hi — 
          feel free to reach out!
        </p>
        <form className="w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}