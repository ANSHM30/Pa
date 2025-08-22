import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hi, I'm John Doe 👋
      </motion.h1>
      <motion.p
        className="text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Full Stack Developer | MERN Enthusiast 🚀
      </motion.p>
      <motion.button
        className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg"
        whileHover={{ scale: 1.1 }}
      >
        View My Work
      </motion.button>
    </div>
  );
}
