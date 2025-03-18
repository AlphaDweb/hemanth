
import React from 'react';

const SkillsSection = () => {
  const skills = [
    {
      category: "Programming Languages",
      items: ["Python", "Java", "JavaScript", "C++", "SQL"],
      color: "neon-purple"
    },
    {
      category: "AI & Machine Learning",
      items: ["TensorFlow", "PyTorch", "Scikit-Learn", "Keras", "OpenCV", "NLP"],
      color: "neon-blue"
    },
    {
      category: "Web Development",
      items: ["React", "Node.js", "HTML/CSS", "RESTful APIs", "Django"],
      color: "neon-magenta"
    },
    {
      category: "Tools & Technologies",
      items: ["Git", "Docker", "AWS", "Jupyter Notebook", "Linux", "MongoDB"],
      color: "neon-purple"
    }
  ];

  return (
    <section id="skills" className="section-padding bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technical <span className="text-neon-blue text-glow-blue">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-neon-blue rounded-full mb-6"></div>
            <p className="text-white/60">
              The tools and technologies I work with
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillGroup, index) => (
              <div 
                key={index} 
                className="bg-[#1A1F2C] p-6 rounded-lg border border-white/5 hover:neon-border transition-all duration-300"
              >
                <h3 className={`text-xl font-bold text-${skillGroup.color} mb-6 text-glow`}>
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className={`px-4 py-2 rounded-full bg-[#252A38] text-white border border-${skillGroup.color}/30 hover:border-${skillGroup.color} transition-all duration-300`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#1A1F2C] p-6 rounded-lg border border-white/5 hover:neon-border-magenta transition-all duration-300">
            <h3 className="text-xl font-bold text-neon-magenta text-glow-magenta mb-6">
              Learning Progress
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Machine Learning</span>
                  <span className="text-white/60">85%</span>
                </div>
                <div className="w-full bg-[#252A38] rounded-full h-2.5">
                  <div className="bg-neon-purple h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Deep Learning</span>
                  <span className="text-white/60">75%</span>
                </div>
                <div className="w-full bg-[#252A38] rounded-full h-2.5">
                  <div className="bg-neon-blue h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Natural Language Processing</span>
                  <span className="text-white/60">70%</span>
                </div>
                <div className="w-full bg-[#252A38] rounded-full h-2.5">
                  <div className="bg-neon-magenta h-2.5 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Computer Vision</span>
                  <span className="text-white/60">65%</span>
                </div>
                <div className="w-full bg-[#252A38] rounded-full h-2.5">
                  <div className="bg-neon-purple h-2.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
