
import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
  };
};

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const projects: Project[] = [
    {
      title: "Neural Network Visualizer",
      category: "machine-learning",
      description: "An interactive tool to visualize neural network architectures and training processes. Helps in understanding how deep learning models work.",
      image: "https://place-hold.it/600x400/1A1F2C/FFFFFF&text=Neural%20Network%20Visualizer&fontsize=20",
      technologies: ["Python", "TensorFlow", "D3.js", "Flask"],
      links: {
        demo: "https://example.com/demo1",
        github: "https://github.com/example/neural-viz"
      }
    },
    {
      title: "Sentiment Analysis Platform",
      category: "nlp",
      description: "A web application that analyzes sentiment in text using natural language processing techniques. Can process reviews, social media posts, and other text content.",
      image: "https://place-hold.it/600x400/1A1F2C/FFFFFF&text=Sentiment%20Analysis%20Platform&fontsize=20",
      technologies: ["Python", "NLTK", "SpaCy", "ReactJS", "Django"],
      links: {
        demo: "https://example.com/demo2",
        github: "https://github.com/example/sentiment-analyzer"
      }
    },
    {
      title: "Object Detection System",
      category: "computer-vision",
      description: "Real-time object detection system using computer vision. Can identify and track multiple objects in video streams with high accuracy.",
      image: "https://place-hold.it/600x400/1A1F2C/FFFFFF&text=Object%20Detection%20System&fontsize=20",
      technologies: ["Python", "OpenCV", "YOLO", "TensorFlow"],
      links: {
        github: "https://github.com/example/object-detector"
      }
    },
    {
      title: "Predictive Analytics Dashboard",
      category: "data-science",
      description: "A comprehensive dashboard for data visualization and predictive analytics. Uses machine learning to forecast trends and identify patterns.",
      image: "https://place-hold.it/600x400/1A1F2C/FFFFFF&text=Predictive%20Analytics%20Dashboard&fontsize=20",
      technologies: ["Python", "Scikit-Learn", "D3.js", "React", "Flask"],
      links: {
        demo: "https://example.com/demo4",
        github: "https://github.com/example/predictive-dashboard"
      }
    },
    {
      title: "Smart Study Assistant",
      category: "application",
      description: "An AI-powered study assistant that helps students organize materials, create study plans, and generate quiz questions for effective learning.",
      image: "https://place-hold.it/600x400/1A1F2C/FFFFFF&text=Smart%20Study%20Assistant&fontsize=20",
      technologies: ["Python", "NLP", "React Native", "MongoDB"],
      links: {
        demo: "https://example.com/demo5",
        github: "https://github.com/example/study-assistant"
      }
    },
    {
      title: "Healthcare Prediction Model",
      category: "machine-learning",
      description: "A machine learning model for predicting patient outcomes based on clinical data. Helps healthcare providers make informed decisions.",
      image: "https://place-hold.it/600x400/1A1F2C/FFFFFF&text=Healthcare%20Prediction%20Model&fontsize=20",
      technologies: ["Python", "Scikit-Learn", "XGBoost", "Pandas"],
      links: {
        github: "https://github.com/example/healthcare-ml"
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'machine-learning', name: 'Machine Learning' },
    { id: 'nlp', name: 'NLP' },
    { id: 'computer-vision', name: 'Computer Vision' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'application', name: 'Applications' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="section-padding bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              My <span className="text-neon-blue text-glow-blue">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-neon-blue rounded-full mb-6"></div>
            <p className="text-white/60">
              Showcasing my work in AI and machine learning
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-neon-blue text-white neon-glow'
                    : 'bg-[#1A1F2C] text-white/60 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={index} 
                className="group bg-[#1A1F2C] rounded-lg overflow-hidden border border-white/5 hover:neon-border-blue transition-all duration-500"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent opacity-60"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-2 py-1 bg-[#252A38] text-white/70 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.links.github && (
                      <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/60 hover:text-neon-purple transition-colors duration-300 text-sm"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                    
                    {project.links.demo && (
                      <a 
                        href={project.links.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/60 hover:text-neon-blue transition-colors duration-300 text-sm"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View more link */}
          <div className="flex justify-center mt-12">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-neon-blue transition-all duration-300"
            >
              View More Projects on GitHub
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
