
import React, { useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  useEffect(() => {
    const animateText = () => {
      const elements = document.querySelectorAll('.animate-on-load');
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('opacity-100');
          element.classList.add('translate-y-0');
        }, 300 * index);
      });
    };

    animateText();
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-neon-purple/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-neon-blue/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-16">
        <div className="flex flex-col items-start justify-center max-w-3xl mx-auto">
          <div className="flex flex-col gap-4 text-center sm:text-left w-full">
            <span className="text-neon-purple text-lg opacity-0 -translate-y-4 animate-on-load transition-all duration-500 ease-out">
              Hello, I'm
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white opacity-0 -translate-y-4 animate-on-load transition-all duration-500 ease-out delay-300">
              Hemanth
            </h1>
            
            <h2 className="text-xl md:text-3xl text-white/80 opacity-0 -translate-y-4 animate-on-load transition-all duration-500 ease-out delay-600">
              AI & Machine Learning <span className="text-neon-blue text-glow-blue">Specialist</span>
            </h2>
            
            <p className="text-white/60 mt-4 text-sm md:text-base opacity-0 -translate-y-4 animate-on-load transition-all duration-500 ease-out delay-900">
              Computer Science Engineering student with a passion for artificial intelligence, machine learning, 
              and deep learning. Creating intelligent solutions that solve real-world problems.
            </p>

            <div className="flex gap-4 mt-8 opacity-0 -translate-y-4 animate-on-load transition-all duration-500 ease-out delay-1200 mx-auto sm:mx-0">
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  "px-6 py-3 bg-neon-purple text-white rounded-full",
                  "hover:bg-neon-purple/80 transition-all duration-300 neon-glow"
                )}
              >
                Explore My Work
              </a>
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  "px-6 py-3 bg-transparent text-white border border-white/20 rounded-full",
                  "hover:border-neon-purple hover:text-neon-purple transition-all duration-300"
                )}
              >
                Get In Touch
              </a>
            </div>

            <div className="flex gap-6 mt-12 opacity-0 -translate-y-4 animate-on-load transition-all duration-500 ease-out delay-1500 mx-auto sm:mx-0">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-neon-purple transition-all duration-300">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-neon-blue transition-all duration-300">
                <Linkedin size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-neon-magenta transition-all duration-300">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <a 
        href="#about" 
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-neon-purple transition-all duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default HeroSection;
