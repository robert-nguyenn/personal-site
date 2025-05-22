import React, { useState, useEffect } from "react";
import { Code, Database, Wrench, Filter } from "lucide-react";
import { cn } from "../lib/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 90, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Shadcn/UI", level: 75, category: "frontend" },
  { name: "Recharts", level: 75, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "Django", level: 85, category: "backend" },
  { name: "Prisma ORM", level: 80, category: "backend" },
  { name: "Spring Boot", level: 60, category: "backend" },

  // Databases
  { name: "PostgreSQL", level: 80, category: "backend" },
  { name: "MongoDB", level: 75, category: "backend" },
  { name: "DynamoDB", level: 70, category: "backend" },
  { name: "MySQL", level: 70, category: "backend" },
  { name: "Redis", level: 75, category: "backend" },
  { name: "GraphQL", level: 60, category: "backend" },
  { name: "Firebase", level: 70, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 80, category: "tools" },
  { name: "AWS", level: 85, category: "tools" },
  { name: "Google Cloud", level: 75, category: "tools" },
  { name: "Terraform", level: 75, category: "tools" },
  { name: "Postman", level: 80, category: "tools" },
  { name: "Linux", level: 75, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" }
];

const categoryIcons = {
  all: <Filter className="h-5 w-5" />,
  frontend: <Code className="h-5 w-5" />,
  backend: <Database className="h-5 w-5" />,
  tools: <Wrench className="h-5 w-5" />
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleSkills, setVisibleSkills] = useState(skills);
  const [hasAnimated, setHasAnimated] = useState({});
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Filter skills when category changes
  useEffect(() => {
    const filtered = activeCategory === "all" 
      ? skills 
      : skills.filter(skill => skill.category === activeCategory);
    
    setVisibleSkills(filtered);
  }, [activeCategory]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillName = entry.target.getAttribute('data-skill');
          setHasAnimated(prev => ({ ...prev, [skillName]: true }));
        }
      });
    }, { threshold: 0.1 });

    // Observe all skill elements
    document.querySelectorAll('.skill-card').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleSkills]);

  // Get expertise level description
  const getExpertiseLevel = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 60) return "Intermediate";
    return "Beginner";
  };

  // Get color class based on level
  const getLevelColorClass = (level) => {
    if (level >= 90) return "bg-gradient-to-r from-violet-600 to-primary";
    if (level >= 80) return "bg-gradient-to-r from-blue-500 to-primary";
    if (level >= 70) return "bg-gradient-to-r from-cyan-500 to-primary";
    if (level >= 60) return "bg-gradient-to-r from-green-500 to-primary";
    return "bg-gradient-to-r from-yellow-500 to-primary";
  };

  return (
    <section 
      id="skills"
      className="py-24 px-4 relative">
        {/* Background accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl transform -translate-x-1/2"></div>
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl transform translate-x-1/3"></div>
          
          {/* Enhanced background elements */}
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/3 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              My <span className="text-primary relative inline-block">
                Skills
                <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A collection of technologies I've mastered through years of practice and professional work.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {['all', 'frontend', 'backend', 'tools'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all duration-300",
                  "flex items-center gap-2 border",
                  activeCategory === category 
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                    : "bg-card border-border hover:border-primary/50 hover:bg-primary/10"
                )}
              >
                <span className="flex items-center justify-center">
                  {categoryIcons[category]}
                </span>
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </div>

          {/* Skills Grid with Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleSkills.map((skill) => (
              <div 
                key={skill.name}
                data-skill={skill.name}
                className={cn(
                  "skill-card gradient-border p-6 bg-card rounded-lg card-hover",
                  "transition-all duration-500 backdrop-blur-sm relative overflow-hidden",
                  hasAnimated[skill.name] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Skill decorative corner accent */}
                <div className="absolute -top-1 -right-1 w-12 h-12 bg-primary/10 rounded-bl-3xl"></div>
                
                {/* Animated particle effect when hovered */}
                {hoveredSkill === skill.name && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary/5 rounded-full filter blur-xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-subtle"></div>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold mb-1 flex items-center">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {getExpertiseLevel(skill.level)}
                  </span>
                </div>
                
                <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full mb-1 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000 ease-out",
                      getLevelColorClass(skill.level)
                    )}
                    style={{ 
                      width: hasAnimated[skill.name] ? `${skill.level}%` : '0%',
                      transitionDelay: '0.2s'
                    }}
                  ></div>
                  
                  {/* Animated glow effect */}
                  <div 
                    className="absolute top-0 h-full w-5 bg-white/30 rounded-full animate-pulse-subtle"
                    style={{ 
                      left: `${skill.level - 5}%`, 
                      opacity: hasAnimated[skill.name] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out',
                      transitionDelay: '1s'
                    }}
                  ></div>
                </div>
                
                {/* Level indicator */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary/80 font-medium">
                    {skill.category === "frontend" ? "Frontend" : 
                     skill.category === "backend" ? "Backend" : "DevOps & Tools"}
                  </span>
                  <span className="font-semibold">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Skills summary stats - new section */}
          <div className="mt-16 bg-card p-8 rounded-xl gradient-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{skills.filter(s => s.category === "frontend").length}</h3>
                <p className="text-muted-foreground">Frontend Skills</p>
              </div>
              <div className="p-4">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{skills.filter(s => s.category === "backend").length}</h3>
                <p className="text-muted-foreground">Backend & Database Skills</p>
              </div>
              <div className="p-4">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{skills.filter(s => s.category === "tools").length}</h3>
                <p className="text-muted-foreground">DevOps & Tools</p>
              </div>
            </div>
          </div>

          {/* Additional note section */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These skills represent my technical expertise gathered through years of 
              professional experience and continuous learning. I'm always expanding my knowledge 
              to stay at the forefront of technology.
            </p>
          </div>
        </div>
    </section>
  );
}