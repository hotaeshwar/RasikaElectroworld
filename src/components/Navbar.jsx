import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Blog', href: '#blog' },
    { name: 'Shop', href: '#shop' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo - Much Bigger */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Rasika Electroworld Logo" 
              className={`transition-all duration-300 object-contain ${
                scrolled 
                  ? 'h-16 w-16 sm:h-18 sm:w-18' 
                  : 'h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28'
              }`}
            />
          </div>

          {/* Desktop Navigation - Better visibility */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-bold transition-all duration-300 relative group rounded-lg ${
                    scrolled 
                      ? 'text-gray-800 hover:text-blue-600 hover:bg-blue-50' 
                      : 'text-white hover:text-blue-300 hover:bg-black/30 shadow-lg border border-white/20 backdrop-blur-sm'
                  }`}
                  style={!scrolled ? {
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.9)'
                  } : {}}
                >
                  {link.name}
                  <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-8 ${
                    scrolled ? 'bg-blue-600' : 'bg-white shadow-sm'
                  }`}></span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button - Better visibility */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white hover:text-blue-300 hover:bg-black/30 shadow-lg border border-white/20 backdrop-blur-sm'
              }`}
              style={!scrolled ? {
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              } : {}}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Better visibility */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className={`px-2 pt-2 pb-4 space-y-1 ${
            scrolled 
              ? 'bg-white/95 backdrop-blur-md border-t border-gray-200' 
              : 'bg-black/80 backdrop-blur-md border-t border-white/20'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 text-sm font-bold transition-all duration-300 rounded-lg ${
                  scrolled 
                    ? 'text-gray-800 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-blue-300 hover:bg-black/40 border border-transparent hover:border-white/20'
                }`}
                style={!scrolled ? {
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                } : {}}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;