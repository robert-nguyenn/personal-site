import React, { useState, useEffect } from "react";
import { 
  LayoutGrid, 
  FileCode, 
  ServerCog,
  Database, 
  Cpu,
  ChevronDown,
  Wrench,
  Zap
} from "lucide-react";
import { cn } from "../lib/utils";

// Define the skills data with icon imports
const skills = [
  // Frontend skills
  { name: "React", level: 91, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", level: 92, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", level: 92, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "HTML/CSS", level: 93, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "Next.js", level: 85, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", level: 89, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Redux", level: 70, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Vue.js", level: 75, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  
  // Backend skills
  { name: "Node.js", level: 85, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", level: 85, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Django", level: 84, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Python", level: 90, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C/C++", level: 79, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "RESTful APIs", level: 86, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "GraphQL", level: 77, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Prisma", level: 82, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
  { name: "Pandas", level: 82, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "NumPy", level: 84, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  
  // Database skills
  { name: "MongoDB", level: 87, category: "database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", level: 88, category: "database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "SQL", level: 90, category: "database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Redis", level: 80, category: "database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Firebase", level: 85, category: "database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  
  // DevOps & Tools
  { name: "Git", level: 90, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", level: 88, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", level: 85, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Terraform", level: 78, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "CI/CD", level: 81, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "GitLab", level: 83, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "Jest", level: 80, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
  { name: "JUnit", level: 75, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Postman", level: 87, category: "devops", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  { name: "Linux", level: 85, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Webpack", level: 76, category: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" }
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleSkills, setVisibleSkills] = useState(skills.slice(0, 9)); // Display 9 skills initially
  const [hasAnimated, setHasAnimated] = useState({});
  const [visibleCount, setVisibleCount] = useState(9); // Display 9 skills initially
  
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


  // Filter skills by category and apply pagination for "all" category
  useEffect(() => {
    if (activeCategory === "all") {
      setVisibleSkills(skills.slice(0, visibleCount));
    } else {
      setVisibleSkills(skills.filter(skill => skill.category === activeCategory));
      // Reset visible count when switching categories
      setVisibleCount(9);
    }
  }, [activeCategory, visibleCount]);

  // Function to load more skills
  const loadMoreSkills = () => {
    setVisibleCount(prev => Math.min(prev + 6, skills.length)); // Load 6 more skills
  };

  // Get expertise level description with more personality
  const getExpertiseLevel = (level) => {
    if (level >= 90) return "Wizard";
    if (level >= 80) return "Ninja";
    if (level >= 70) return "Pro";
    if (level >= 60) return "Solid";
    return "Learning";
  };

  // Get color class based on level
  const getLevelColorClass = (level) => {
    if (level >= 90) return "bg-gradient-to-r from-violet-600 to-primary";
    if (level >= 80) return "bg-gradient-to-r from-blue-500 to-primary";
    if (level >= 70) return "bg-gradient-to-r from-cyan-500 to-primary";
    if (level >= 60) return "bg-gradient-to-r from-green-500 to-primary";
    return "bg-gradient-to-r from-yellow-500 to-primary";
  };
  
  // Get category label with more personality
  const getCategoryLabel = (category) => {
    const labels = {
      frontend: "Pixel Pusher",
      backend: "Server Whisperer",
      database: "Data Wrangler",
      devops: "Pipeline Plumber"
    };
    return labels[category] || category;
  };

  // Check if there are more skills to load
  const hasMoreSkills = activeCategory === "all" && visibleCount < skills.length;

  return (
    <section 
      id="skills"
      className="py-24 px-4 relative">
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              Tech <span className="text-blue-500 relative inline-block">
                Arsenal
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-3xl mx-auto font-bold">
              My collection of digital superpowers acquired during suspicious amounts of "free time"
            </p>
          </div>

          {/* Category Filters with more personality */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-100 hover:scale-105",
                activeCategory === "all"
                  ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                  : "bg-card hover:bg-card/80 border-2 border-border font-bold"
              )}
            >
              <span className="flex items-center gap-1">
                <div className="flex items-center justify-center w-5 h-5">
                  <LayoutGrid className="w-4 h-4 text-purple-400" strokeWidth={2} />
                </div>
                The Entire Toolbox
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("frontend")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-100 hover:scale-105",
                activeCategory === "frontend"
                  ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                  : "bg-card hover:bg-card/80 border-2 border-border font-bold"
              )}
            >
              <span className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5">
                  <FileCode className="w-4 h-4 text-blue-400" strokeWidth={2} />
                </div>
                Pixel Crafting
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("backend")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-100 hover:scale-105",
                activeCategory === "backend"
                  ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                  : "bg-card hover:bg-card/80 border-2 border-border font-bold"
              )}
            >
              <span className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5">
                  <ServerCog className="w-4 h-4 text-green-400" strokeWidth={2} />
                </div>
                Server Magic
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("database")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-100 hover:scale-105",
                activeCategory === "database"
                  ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                  : "bg-card hover:bg-card/80 border-2 border-border font-bold"
              )}
            >
              <span className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5">
                  <Database className="w-4 h-4 text-orange-400" strokeWidth={2} />
                </div>
                Data Hoarding
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("devops")}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-100 hover:scale-105",
                activeCategory === "devops"
                  ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                  : "bg-card hover:bg-card/80 border-2 border-border font-bold"
              )}
            >
              <span className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5">
                  <Cpu className="w-4 h-4 text-red-400" strokeWidth={2} />
                </div>
                Cloud Wrangling
              </span>
            </button>
          </div>

          {/* Intro text for each category */}
          <div className="mb-10 p-5 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/20">
            {activeCategory === "all" && (
              <p className="text-center italic text-muted-foreground">
                "I've never met a framework I didn't want to learn or a language I wouldn't try at 2 AM"
              </p>
            )}
            {activeCategory === "frontend" && (
              <p className="text-center italic text-muted-foreground">
                "Making interfaces so intuitive that users think they designed them themselves"
              </p>
            )}
            {activeCategory === "backend" && (
              <p className="text-center italic text-muted-foreground">
                "Where I build the invisible parts that everyone notices when they break"
              </p>
            )}
            {activeCategory === "database" && (
              <p className="text-center italic text-muted-foreground">
                "I speak fluent SQL and have strong opinions about database normalization"
              </p>
            )}
            {activeCategory === "devops" && (
              <p className="text-center italic text-muted-foreground">
                "Automating myself out of a job, one pipeline at a time"
              </p>
            )}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleSkills.map((skill) => (
              <div 
                key={skill.name}
                data-skill={skill.name}
                className={cn(
                  "skill-card p-4 rounded-lg transition-all duration-300 relative overflow-hidden",
                  "border-3 border-primary/20 shadow-lg",
                  "bg-dark/10 dark:bg-gray-900/95 backdrop-blur-sm",
                  "hover:transform hover:scale-105",
                  hasAnimated[skill.name] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                    {/* Technology Icon */}
                    <div className="p-1.25 bg-white rounded-lg shadow-sm flex items-center justify-center">
                      <img 
                        src={skill.icon} 
                        alt={`${skill.name} icon`} 
                        className="w-5 h-5" 
                      />
                    </div>
                    {skill.name}
                  </h3>
                  <span className="text-md font-bold px-1 py-1 text-primary rounded-full">
                    {getExpertiseLevel(skill.level)}
                  </span>
                </div>
                
                <div className="relative w-full bg-gray-100 rounded-full mb-2 overflow-hidden shadow-inner">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all duration-600 ease-out",
                      getLevelColorClass(skill.level)
                    )}
                    style={{ 
                      width: hasAnimated[skill.name] ? `${skill.level}%` : '0%',
                      transitionDelay: '0.2s'
                    }}
                  ></div>
                </div>
                
                {/* Level indicator with improved contrast */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary font-bold">
                    {getCategoryLabel(skill.category)}
                  </span>
                  <span className="font-bold text-foreground">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreSkills && (
            <div className="flex justify-center mt-10">
              <button 
                onClick={loadMoreSkills}
                className="cosmic-button group px-8 py-3 relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-white font-medium transition-all hover:border-primary/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Show Me More Weapons</span>
                  <Zap className="h-4 w-4 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/50 to-purple-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </button>
            </div>
          )}
        </div>
    </section>
  );
}