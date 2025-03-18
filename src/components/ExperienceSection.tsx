
import React from 'react';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Machine Learning Intern",
      company: "Tech Innovations Lab",
      period: "Jun 2023 - Aug 2023",
      description: "Worked on implementing machine learning algorithms for predictive analytics. Developed and optimized models using Python and TensorFlow. Collaborated with data scientists to improve model accuracy.",
      skills: ["Python", "TensorFlow", "Data Analysis"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      title: "Research Assistant",
      company: "University AI Research Lab",
      period: "Jan 2023 - May 2023",
      description: "Assisted in research on neural network architectures. Conducted literature reviews and implemented experimental models. Contributed to a paper on efficient training methods.",
      skills: ["PyTorch", "Research", "Neural Networks"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      title: "Web Development Intern",
      company: "WebSolutions Inc.",
      period: "May 2022 - Jul 2022",
      description: "Developed responsive web applications using React. Implemented RESTful APIs and integrated with backend services. Worked in an agile development team.",
      skills: ["React", "JavaScript", "RESTful APIs"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    }
  ];

  return (
    <section id="experience" className="section-padding bg-[#151515]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Work <span className="text-neon-magenta text-glow-magenta">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-neon-magenta rounded-full mb-6"></div>
            <p className="text-white/60">
              My professional journey so far
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-magenta/50 to-neon-purple/50 transform md:-translate-x-1/2"></div>

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-neon-magenta transform -translate-x-1/2 neon-glow"></div>

                  <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Date for mobile (always on top) */}
                    <div className="md:hidden mb-4 pl-6 text-neon-magenta flex items-center text-sm">
                      <Calendar size={14} className="mr-2" />
                      {exp.period}
                    </div>

                    {/* Timeline content */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                      <div className="bg-[#1A1F2C] p-6 rounded-lg border border-white/5 hover:neon-border-magenta transition-all duration-300">
                        {/* Image */}
                        <div className="h-40 rounded-md overflow-hidden mb-4">
                          <img 
                            src={exp.image} 
                            alt={exp.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Title and company */}
                        <div className="flex flex-col mb-3">
                          <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                          <div className="flex items-center text-neon-purple mt-1">
                            <Briefcase size={14} className="mr-2" />
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        {/* Date (desktop only) */}
                        <div className="hidden md:flex items-center text-white/60 text-sm mb-4">
                          <Calendar size={14} className="mr-2" />
                          {exp.period}
                        </div>

                        {/* Description */}
                        <p className="text-white/70 mb-4">{exp.description}</p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex} 
                              className="px-3 py-1 bg-[#252A38] text-white/80 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Empty space for the other side */}
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom flourish */}
            <div className="flex justify-center mt-12">
              <a 
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-white/60 hover:text-neon-purple transition-all duration-300"
              >
                View My Projects
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
