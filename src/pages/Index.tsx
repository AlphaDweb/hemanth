import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

const Index = () => {
  useEffect(() => {
    // Add smooth scroll behavior for in-page navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Update active nav item on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    const handleScroll = () => {
      let current = '';
      
      sections.forEach(section => {
        // Use getBoundingClientRect() instead of offsetTop
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('text-neon-purple', 'text-glow');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('text-neon-purple', 'text-glow');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
