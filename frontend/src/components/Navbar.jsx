import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-2xl font-bold flex items-center gap-2">
            🚀 <span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-white font-medium">
            <a href="#home" className="hover:text-pink-400">Home</a>
            <a href="#about" className="hover:text-pink-400">About</a>
            <a href="#projects" className="hover:text-pink-400">Projects</a>
            <a href="#contact" className="hover:text-pink-400">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
