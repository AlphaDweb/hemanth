
import React from 'react';
import { ExternalLink } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera - Stanford University",
      date: "March 2023",
      description: "Comprehensive training in machine learning algorithms and their applications.",
      link: "https://coursera.org"
    },
    {
      title: "Deep Learning Specialization",
      issuer: "Coursera - deeplearning.ai",
      date: "January 2023",
      description: "In-depth study of neural networks and deep learning architectures.",
      link: "https://coursera.org"
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "November 2022",
      description: "Professional certification for building TensorFlow models.",
      link: "https://tensorflow.org"
    },
    {
      title: "Natural Language Processing",
      issuer: "edX - Microsoft",
      date: "August 2022",
      description: "Advanced techniques for processing and analyzing text data.",
      link: "https://edx.org"
    },
    {
      title: "Python for Data Science",
      issuer: "DataCamp",
      date: "May 2022",
      description: "Practical Python programming for data analysis and visualization.",
      link: "https://datacamp.com"
    },
    {
      title: "AWS Machine Learning Foundations",
      issuer: "Amazon Web Services",
      date: "April 2022",
      description: "Fundamentals of deploying machine learning solutions on AWS.",
      link: "https://aws.amazon.com"
    }
  ];

  return (
    <section id="certifications" className="section-padding bg-[#151515]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-neon-purple text-glow">Certifications</span> & Courses
            </h2>
            <div className="w-20 h-1 bg-neon-purple rounded-full mb-6"></div>
            <p className="text-white/60">
              Professional certifications and specialized training
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="group bg-[#1A1F2C] p-6 rounded-lg border border-white/5 hover:neon-border transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-bold text-white group-hover:text-neon-purple transition-colors duration-300">
                    {cert.title}
                  </h3>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-neon-blue text-sm">{cert.issuer}</p>
                    <span className="text-white/50 text-xs">{cert.date}</span>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-6 flex-grow">
                    {cert.description}
                  </p>
                  
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-neon-purple transition-all duration-300 text-sm mt-auto"
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
