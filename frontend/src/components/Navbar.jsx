export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-white">🚀 MyPortfolio</div>

        {/* Links */}
        <ul className="flex space-x-10 text-white font-medium">
          <li className="cursor-pointer hover:text-indigo-400">Home</li>
          <li className="cursor-pointer hover:text-indigo-400">About</li>
          <li className="cursor-pointer hover:text-indigo-400">Projects</li>
          <li className="cursor-pointer hover:text-indigo-400">Contact</li>
        </ul>
      </div>
    </nav>
  );
}
