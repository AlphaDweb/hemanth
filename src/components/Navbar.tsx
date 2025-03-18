
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Experience', path: '#experience' },
    { name: 'Projects', path: '#projects' },
    { name: 'Certifications', path: '#certifications' },
    { name: 'Contact', path: '#contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#121212]/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white text-glow">
          Hemanth<span className="text-neon-purple">.</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white hover:text-neon-purple transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.path);
              }}
              className="text-white/80 hover:text-neon-purple hover:text-glow transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 bg-neon-purple text-white px-4 py-2 rounded-full hover:bg-neon-purple/80 transition-all duration-300 neon-glow"
          >
            <FileDown size={16} />
            Resume
          </a>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-[#121212]/95 backdrop-blur-lg z-40 transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.path);
                }}
                className="text-xl text-white/80 hover:text-neon-purple hover:text-glow transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 bg-neon-purple text-white px-6 py-3 rounded-full hover:bg-neon-purple/80 transition-all duration-300 mt-4 neon-glow"
            >
              <FileDown size={18} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
