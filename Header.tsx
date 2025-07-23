'use client';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <i className="ri-eye-line text-white text-lg"></i>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SteganoVault
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              Features
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}