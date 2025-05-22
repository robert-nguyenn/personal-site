import React, { useState, useEffect } from "react";
import { Code, Database, Wrench, Filter } from "lucide-react";
import { cn } from "../lib/utils";

// Define the skills data with icon imports
const skills = [
  // Frontend skills
  { name: "React", level: 95, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", level: 92, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", level: 88, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "HTML/CSS", level: 90, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "Next.js", level: 85, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", level: 92, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Redux", level: 86, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Vue.js", level: 75, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  
  // Backend skills
  { name: "Node.js", level: 88, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", level: 85, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", level: 82, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "SQL", level: 78, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "GraphQL", level: 76, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Firebase", level: 80, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  
  // DevOps & Tools
  { name: "Git", level: 90, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", level: 75, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", level: 72, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Jest", level: 80, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
  { name: "CI/CD", level: 78, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "Webpack", level: 76, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" }
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleSkills, setVisibleSkills] = useState(skills);
  const [hasAnimated, setHasAnimated] = useState({});
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Add missing filter logic
  useEffect(() => {
    // Handle intersection observer for animating skills on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const skillName = entry.target.dataset.skill;
            if (skillName) {
              setHasAnimated(prev => ({ ...prev, [skillName]: true }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
      observer.observe(card);
    });

    return () => {
      document.querySelectorAll('.skill-card').forEach(card => {
        observer.unobserve(card);
      });
    };
  }, [visibleSkills]);

  // Filter skills by category
  useEffect(() => {
    if (activeCategory === "all") {
      setVisibleSkills(skills);
    } else {
      setVisibleSkills(skills.filter(skill => skill.category === activeCategory));
    }
  }, [activeCategory]);

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
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
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
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300",
                activeCategory === "all"
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "bg-card hover:bg-card/80 border border-border"
              )}
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                All Skills
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("frontend")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300",
                activeCategory === "frontend"
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "bg-card hover:bg-card/80 border border-border"
              )}
            >
              <span className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Frontend
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("backend")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300",
                activeCategory === "backend"
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "bg-card hover:bg-card/80 border border-border"
              )}
            >
              <span className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Backend
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("tools")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300",
                activeCategory === "tools"
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "bg-card hover:bg-card/80 border border-border"
              )}
            >
              <span className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                DevOps & Tools
              </span>
            </button>
          </div>

          {/* Enhanced Skills Grid with improved visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleSkills.map((skill) => (
              <div 
                key={skill.name}
                data-skill={skill.name}
                className={cn(
                  "skill-card p-6 rounded-lg transition-all duration-500 relative overflow-hidden",
                  "border border-primary/20 shadow-lg",
                  "bg-dark/90 dark:bg-gray-900/95 backdrop-blur-lg", // Fixed background for better visibility
                  "hover:transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20",
                  "dark:hover:shadow-primary/30",
                  hasAnimated[skill.name] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* 3D lighting effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 dark:from-white/10 dark:to-black/20 pointer-events-none"></div>
                
                {/* Animated glow when hovered */}
                {hoveredSkill === skill.name && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/10 rounded-full filter blur-xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-subtle"></div>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                    {/* Technology Icon */}
                    <div className="p-1.5 bg-white dark:bg-gray-800/80 rounded-lg shadow-sm flex items-center justify-center">
                      <img 
                        src={skill.icon} 
                        alt={`${skill.name} icon`} 
                        className="w-5 h-5 object-contain" 
                      />
                    </div>
                    {skill.name}
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 bg-primary/20 text-primary rounded-full shadow-sm">
                    {getExpertiseLevel(skill.level)}
                  </span>
                </div>
                
                <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 overflow-hidden shadow-inner">
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
                  
                  {/* Enhanced glow effect */}
                  <div 
                    className="absolute top-0 h-full w-5 bg-white/50 rounded-full"
                    style={{ 
                      left: `${skill.level - 5}%`, 
                      opacity: hasAnimated[skill.name] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out, transform 0.5s ease-in-out',
                      transform: hasAnimated[skill.name] ? 'translateX(0)' : 'translateX(-20px)',
                      transitionDelay: '1s',
                      boxShadow: '0 0 10px 3px rgba(255, 255, 255, 0.5)'
                    }}
                  ></div>
                </div>
                
                {/* Level indicator with improved contrast */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary font-medium">
                    {skill.category === "frontend" ? "Frontend" : 
                     skill.category === "backend" ? "Backend" : "DevOps & Tools"}
                  </span>
                  <span className="font-bold text-foreground">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Skills summary stats with enhanced design */}
          <div className="mt-16 bg-dark/80 dark:bg-gray-900/90 p-8 rounded-xl backdrop-blur-lg border border-primary/20 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-5 relative bg-gradient-to-b from-transparent to-primary/5 rounded-lg">
                <div className="absolute inset-0 bg-primary/5 rounded-lg filter blur-md"></div>
                <div className="relative">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{skills.filter(s => s.category === "frontend").length}</h3>
                  <p className="text-foreground">Frontend Skills</p>
                </div>
              </div>
              <div className="p-5 relative bg-gradient-to-b from-transparent to-primary/5 rounded-lg">
                <div className="absolute inset-0 bg-primary/5 rounded-lg filter blur-md"></div>
                <div className="relative">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{skills.filter(s => s.category === "backend").length}</h3>
                  <p className="text-foreground">Backend & Database Skills</p>
                </div>
              </div>
              <div className="p-5 relative bg-gradient-to-b from-transparent to-primary/5 rounded-lg">
                <div className="absolute inset-0 bg-primary/5 rounded-lg filter blur-md"></div>
                <div className="relative">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{skills.filter(s => s.category === "tools").length}</h3>
                  <p className="text-foreground">DevOps & Tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}