import React from 'react';
import { Laptop, Brain, Code, BookOpen } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-[#151515]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About <span className="text-neon-purple text-glow">Me</span>
            </h2>
            <div className="w-20 h-1 bg-neon-purple rounded-full mb-6"></div>
            <p className="text-white/60">
              A passionate engineer on a journey to create intelligent systems
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* About image - takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="h-full rounded-lg overflow-hidden border border-white/5 hover:neon-border transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                  alt="Hemanth working on AI models" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* About text content - takes 3 columns on large screens */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="flex flex-col h-full bg-[#1A1F2C] p-6 rounded-lg border border-white/5 hover:neon-border transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">My Story</h3>
                <p className="text-white/60 mb-4">
                  I'm Hemanth, a Computer Science Engineering student in my 6th semester, specializing in 
                  AI and Machine Learning. My journey began with a curiosity about how computers could be 
                  trained to think and learn like humans.
                </p>
                <p className="text-white/60 mb-4">
                  This fascination led me to explore the realms of artificial intelligence, machine learning algorithms, 
                  and neural networks. I've been developing my skills through academic projects, online courses, 
                  and practical applications of AI in solving real-world problems.
                </p>
                <p className="text-white/60 mt-auto">
                  I believe in the power of AI to transform industries and improve lives, and I'm excited to 
                  be part of this technological revolution.
                </p>
              </div>
              
              <div className="flex flex-col h-full bg-[#1A1F2C] p-6 rounded-lg border border-white/5 hover:neon-border transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">Education & Interests</h3>
                
                <div className="mb-6">
                  <h4 className="text-lg text-neon-blue text-glow-blue mb-2">Education</h4>
                  <div className="flex items-start gap-3 mb-4">
                    <BookOpen size={20} className="text-white/60 mt-1" />
                    <div>
                      <p className="text-white font-medium">B.Tech in Computer Science Engineering</p>
                      <p className="text-white/60 text-sm">Currently in 6th Semester</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg text-neon-blue text-glow-blue mb-2">Areas of Interest</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Brain size={20} className="text-white/60 mt-1" />
                      <div>
                        <p className="text-white font-medium">Artificial Intelligence</p>
                        <p className="text-white/60 text-sm">Neural networks & deep learning</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Laptop size={20} className="text-white/60 mt-1" />
                      <div>
                        <p className="text-white font-medium">Machine Learning</p>
                        <p className="text-white/60 text-sm">Algorithms & predictive modeling</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Code size={20} className="text-white/60 mt-1" />
                      <div>
                        <p className="text-white font-medium">Software Development</p>
                        <p className="text-white/60 text-sm">Building intelligent applications</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
