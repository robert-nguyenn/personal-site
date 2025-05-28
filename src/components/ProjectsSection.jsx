import React, { useState, useEffect, useRef } from "react";
import { Github, ExternalLink, ChevronLeft, ChevronRight, Code, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";

// Sample project data with more realistic, professional descriptions
const projects = [
  {
    id: 1,
    title: "AI-Powered Task Manager",
    description: "A productivity application that leverages machine learning to intelligently prioritize tasks based on deadlines, dependencies, and user work patterns. Features customizable workflows and detailed analytics.",
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
    description: "A comprehensive analytics platform for online retailers that visualizes sales data, inventory management, and customer behavior patterns. Helps store owners make data-driven decisions with minimal technical knowledge.",
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
    description: "A secure document management system with end-to-end encryption, granular access controls, and version history. Designed with privacy-first architecture and compliance with GDPR and HIPAA requirements.",
    image: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?q=80&w=1470&auto=format&fit=crop",
    tags: ["AWS S3", "Express", "React", "Redis"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/yourusername/project"
    }
  },
  {
    id: 4,
    title: "Real-time Chat Application",
    description: "A collaboration platform supporting text, voice, and video communication with persistent message history and search functionality. Features low-latency messaging and cross-platform synchronization.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1470&auto=format&fit=crop",
    tags: ["Socket.io", "React", "Node.js", "MongoDB"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/yourusername/project"
    }
  },
  {
    id: 5,
    title: "Machine Learning Platform",
    description: "A platform that simplifies ML model development with automated data preprocessing, feature selection, and hyperparameter tuning. Provides intuitive visualization tools and deployment options for non-specialists.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    tags: ["Python", "TensorFlow", "Docker", "Kubernetes"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/yourusername/project"
    }
  }
];

export const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(null); // 'next' or 'prev'
  const totalProjects = projects.length;
  const timeoutRef = useRef(null);

  // Get visible projects with smooth positioning
  const getVisibleProjects = () => {
    const visibleProjects = [];
    
    // Show 5 cards: 2 on left, center, 2 on right
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + totalProjects) % totalProjects;
      visibleProjects.push({
        ...projects[index],
        position: i,
        key: `${index}-${activeIndex}` // Unique key for smooth transitions
      });
    }
    return visibleProjects;
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    setDirection('next');
    setIsTransitioning(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Update active index immediately for smooth transition
    setActiveIndex((prev) => (prev + 1) % totalProjects);
    
    // Reset transition state after animation completes
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setDirection(null);
    }, 700); // Match CSS transition duration
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    
    setDirection('prev');
    setIsTransitioning(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Update active index immediately for smooth transition
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    
    // Reset transition state after animation completes
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setDirection(null);
    }, 700); // Match CSS transition duration
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === activeIndex) return;
    
    // Determine direction based on shortest path
    const diff = index - activeIndex;
    const shortestPath = diff > totalProjects / 2 ? diff - totalProjects : 
                        diff < -totalProjects / 2 ? diff + totalProjects : diff;
    
    setDirection(shortestPath > 0 ? 'next' : 'prev');
    setIsTransitioning(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setActiveIndex(index);
    
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setDirection(null);
    }, 700);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getCardStyle = (position) => {
    // Enhanced easing function for ultra-smooth transitions
    const baseTransition = "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    
    // Define transform and styling based on position
    const styles = {
      '-2': {
        transform: "translateX(-85%) rotateY(35deg) scale(0.6)",
        opacity: 0.4,
        zIndex: 1,
        filter: "brightness(2) blur(5px)",
        pointerEvents: "none"
      },
      '-1': {
        transform: "translateX(-55%) rotateY(25deg) scale(0.8)",
        opacity: 0.6,
        zIndex: 3,
        filter: "brightness(2) blur(1px)",
        cursor: "pointer"
      },
      '0': {
        transform: "translateX(0%) rotateY(0deg) scale(1.05)",
        opacity: 1,
        zIndex: 10,
        filter: "brightness(1) contrast(1.25)",
      },
      '1': {
        transform: "translateX(55%) rotateY(-25deg) scale(0.80)",
        opacity: 0.6,
        zIndex: 3,
        filter: "brightness(2) blur(1px)",
        cursor: "pointer"
      },
      '2': {
        transform: "translateX(85%) rotateY(-35deg) scale(0.6)",
        opacity: 0.4,
        zIndex: 1,
        filter: "brightness(2) blur(5px)",
        pointerEvents: "none"
      }
    };

    const style = styles[position.toString()] || {
      transform: "translateX(200%) scale(0.5)",
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none"
    };

    return {
      ...style,
      transition: baseTransition,
      transformOrigin: "50% 20%",
    };
  };  

  const visibleProjects = getVisibleProjects();

  const renderDots = () => {
    return projects.map((_, index) => (
      <button
        key={index}
        onClick={() => handleDotClick(index)}
        disabled={isTransitioning}
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-300 transform",
          activeIndex === index
            ? "bg-primary scale-125 shadow-lg shadow-primary/40" 
            : "bg-primary/60 hover:bg-primary/90 hover:scale-110",
          isTransitioning && "cursor-not-allowed"
        )}
        aria-label={`Go to project ${index + 1}`}
      />
    ));
  };

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured <span className="text-blue-500 relative inline-block">
              Projects
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto font-bold">
            Solving real-world challenges through innovative development
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[600px] mb-5 overflow-visible">
          {/* Perspective container for 3D effect */}
          <div 
            className="relative w-full h-full"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {visibleProjects.map((project) => {
              const isClickable = project.position === -1 || project.position === 1;
              
              return (
                <div
                  key={project.key}
                  className={cn(
                    "absolute left-1/2 top-1/2 w-full md:w-[420px] h-[520px] rounded-2xl",
                    "-translate-x-1/2 -translate-y-1/2",
                    isClickable && "cursor-pointer hover:brightness-110"
                  )}
                  style={getCardStyle(project.position)}
                  onClick={() => {
                    if (project.position === -1) handlePrev();
                    if (project.position === 1) handleNext();
                  }}
                >
                  {/* Project Card */}
                  <div className="relative group rounded-2xl overflow-hidden h-full shadow-2xl">
                    {/* Card background with conditional styling */}
                    <div className={cn(
                      "absolute inset-0 backdrop-blur-sm z-0 rounded-2xl",
                      project.position === 0 
                        ? "bg-gradient-to-br from-gray-900/95 to-gray-800/90" 
                        : "bg-gradient-to-br from-gray-900/80 to-gray-800/70"
                    )}></div>
                    
                    {/* Glow effect for center card */}
                    {project.position === 0 && (
                      <div className="absolute inset-0 bg-primary/40 rounded-2xl blur-sm opacity-60"></div>
                    )}
                    
                    {/* Card content */}
                    <div className="relative z-10 h-full flex flex-col border-2 border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                      {/* Project Image */}
                      <div className="h-[240px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10"></div>
                        <img  
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        
                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-5 z-20">
                          <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Project Details */}
                      <div className="p-6 flex-1 flex flex-col text-white">
                        <p className="text-gray-300 text-sm mb-5 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                          {project.tags.slice(0, 4).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="inline-block px-2.5 py-1 text-xs font-medium bg-white/10 border border-white/20 text-gray-200 rounded-md backdrop-blur-sm"
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
                        
                        {/* Links - only show on center card */}
                        {project.position === 0 && (
                          <div className="flex gap-3 mt-2">
                            <a 
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 flex-1 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium text-sm backdrop-blur-sm hover:border-white/50"
                            >
                              <Github className="h-4 w-4" />
                              <span>View Source</span>
                            </a>
                            <a 
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 flex-1 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 text-sm font-medium hover:shadow-primary/40"
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
          
        </div>
        
        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-5">
          {renderDots()}
        </div>

        {/* All Projects Button */}
        <div className="mt-12 text-center">
          <a 
            href="https://github.com/yourusername" 
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-3 relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-black/30 backdrop-blur-md border border-white/20 text-white font-medium transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
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