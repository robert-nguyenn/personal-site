import React, { useState, useEffect, useRef } from "react";
import { Github, ExternalLink, Code, Database, Layout, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "../lib/utils";

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "AI-Powered Task Manager",
    description: "A task management application with AI features for task prioritization, smart categorization, and deadline predictions.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop",
    tags: ["React", "Node.js", "OpenAI", "MongoDB"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/yourusername/project"
    }
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for e-commerce store owners with analytics, inventory management, and customer insights.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1470&auto=format&fit=crop",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/yourusername/project"
    }
  },
  {
    id: 3,
    title: "Cloud File Storage",
    description: "A secure cloud storage solution with client-side encryption, file sharing capabilities, and version control.",
    image: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?q=80&w=1470&auto=format&fit=crop",
    tags: ["AWS S3", "Express", "React", "Redis"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/yourusername/project"
    }
  },
  {
    id: 4,
    title: "Real-time Collaboration Tool",
    description: "A platform for teams to collaborate on documents, code, and design files in real-time with chat and video.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1470&auto=format&fit=crop",
    tags: ["Socket.io", "React", "Node.js", "MongoDB"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/yourusername/project"
    }
  },
  {
    id: 5,
    title: "Personal Finance Tracker",
    description: "An application to help users manage expenses, set budgets, and visualize spending patterns with detailed reports.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b962c9?q=80&w=1470&auto=format&fit=crop",
    tags: ["React", "Chart.js", "Firebase", "Redux"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/yourusername/project"
    }
  },
  {
    id: 6,
    title: "API Gateway Service",
    description: "A microservice gateway that handles routing, load balancing, authentication, and rate limiting for a distributed system.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1470&auto=format&fit=crop",
    tags: ["Node.js", "Docker", "Kubernetes", "Redis"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/yourusername/project"
    }
  }
];

export const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalProjects = projects.length;

  // Get visible projects with proper indexing
  const getVisibleProjects = () => {
    const visibleProjects = [];
    for (let i = -1; i <= 3; i++) {
      const index = (activeIndex + i + totalProjects) % totalProjects;
      visibleProjects.push({
        ...projects[index],
        position: i
      });
    }
    return visibleProjects;
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % totalProjects);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-rotation for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < totalProjects; i++) {
      dots.push(
        <button
          key={i}
          onClick={() => {
            if (isAnimating) return;
            setIsAnimating(true);
            setActiveIndex(i);
            setTimeout(() => setIsAnimating(false), 600);
          }}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            activeIndex === i
              ? "bg-primary scale-125 shadow-lg shadow-primary/30" 
              : "bg-primary/30 hover:bg-primary/50"
          )}
          aria-label={`Go to project ${i + 1}`}
        />
      );
    }
    return dots;
  };

  const visibleProjects = getVisibleProjects();

  const getCardStyle = (position) => {
    // Improved transition curve for smoother movement
    const baseTransition = "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)";
    
    switch (position) {
      case -1:
        // Left card with enhanced styling  
        return {
          transform: "translateX(-80%) rotateY(25deg) scale(0.85)",
          opacity: 0.85,
          zIndex: 2,
          filter: "brightness(0.85) contrast(0.95)",
          transition: baseTransition,
          boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)"
        };
      case 0:
        // Center card with enhanced styling
        return {
          transform: "translateX(0) rotateY(0) scale(1.05)",
          opacity: 1,
          zIndex: 10,
          filter: "brightness(1) contrast(1.05)",
          boxShadow: "0 30px 60px -15px rgba(94, 53, 177, 0.4), 0 0 30px rgba(255, 255, 255, 0.1)",
          transition: baseTransition
        };
      case 1:
        // Right card with enhanced styling
        return {
          transform: "translateX(80%) rotateY(-25deg) scale(0.85)",
          opacity: 0.85,
          zIndex: 2,
          filter: "brightness(0.85) contrast(0.95)",
          transition: baseTransition,
          boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)"
        };
      default:
        // Hidden cards
        return {
          transform: position < -1 ? "translateX(-150%) scale(0.5)" : "translateX(150%) scale(0.5)",
          opacity: 0,
          zIndex: 1,
          pointerEvents: "none",
          transition: baseTransition
        };
    }
  };

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured <span className="text-primary relative inline-block">
              Projects
              <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that demonstrate my skills and experience in different areas of software development.
          </p>
        </div>

        {/* Enhanced 3D Project Carousel */}
        <div className="relative h-[600px] mb-10 perspective-[1200px] overflow-visible">
          <div className="relative w-full h-full flex justify-center items-center">
            {visibleProjects.map((project, index) => {
              const isClickable = project.position === -1 || project.position === 1;
              // Determine the category for styling
              const category = project.tags[0] || "other";
              const categoryColor = getCategoryColor(category);

              return (
                <div 
                  key={`${project.id}-${activeIndex}`} 
                  className={cn(
                    "absolute w-full md:w-[420px] h-[520px]",
                    isClickable ? "cursor-pointer" : ""
                  )}
                  style={getCardStyle(project.position)}
                  onClick={() => {
                    if (project.position === -1) handlePrev();
                    if (project.position === 1) handleNext();
                  }}
                >
                  {/* Modern, glossy card styling */}
                  <div className="relative group rounded-2xl overflow-hidden h-full transform transition-all">
                    {/* Card background with gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 dark:from-gray-900/98 dark:to-gray-800/98 backdrop-blur-sm z-0"></div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 z-0"></div>
                    
                    {/* Card content container */}
                    <div className="relative z-10 h-full flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01] backdrop-blur-sm">
                      {/* Project Image with improved styling */}
                      <div className="h-[240px] relative overflow-hidden">
                        {/* Gradient overlay with animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shine-effect z-20"></div>
                        
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Title overlay with improved styling */}
                        <div className="absolute bottom-0 left-0 w-full p-5 z-20">
                          <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Project Details with improved styling */}
                      <div className="p-6 flex-1 flex flex-col text-white">
                        <p className="text-gray-300 text-sm mb-5 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Tags with improved styling */}
                        <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                          {project.tags.slice(0, 4).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="inline-block px-2.5 py-1 text-xs font-medium bg-white/10 border border-white/5 text-gray-200 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="inline-block px-2.5 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-md">
                              +{project.tags.length - 4}
                            </span>
                          )}
                        </div>
                        
                        {/* Links - only on center card with improved styling */}
                        {project.position === 0 && (
                          <div className="flex gap-3 mt-2">
                            <a 
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 flex-1 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium text-sm backdrop-blur-sm"
                            >
                              <Github className="h-4 w-4" />
                              <span>GitHub</span>
                            </a>
                            <a 
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 flex-1 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-sm font-medium"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Live Demo</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Improved navigation controls */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 group"
            aria-label="Previous project"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 group"
            aria-label="Next project"
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        {/* Improved dot indicators */}
        <div className="flex justify-center gap-3 mt-6">
          {renderDots()}
        </div>

        {/* Improved All Projects Button */}
        <div className="mt-12 text-center">
          <a 
            href="https://github.com/yourusername" 
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button group px-8 py-3 relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-white font-medium transition-all hover:border-primary/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>View All Projects</span>
              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/50 to-purple-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

// Helper function to get color based on category tag
function getCategoryColor(category) {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('react') || lowerCategory.includes('vue')) return 'blue';
  if (lowerCategory.includes('node') || lowerCategory.includes('express')) return 'green';
  if (lowerCategory.includes('aws') || lowerCategory.includes('cloud')) return 'orange';
  if (lowerCategory.includes('mongo') || lowerCategory.includes('sql')) return 'yellow';
  if (lowerCategory.includes('next') || lowerCategory.includes('typescript')) return 'indigo';
  return 'primary';
}