import React, { useState, useEffect, useRef } from "react";
import { Github, ExternalLink, Code, Database, Layout, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

// Rest of your code remains the same

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
    },
    category: "fullstack"
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
    },
    category: "frontend"
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
    },
    category: "backend"
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
    },
    category: "fullstack"
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
    },
    category: "frontend"
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
    },
    category: "backend"
  }
];

const categoryIcons = {
  all: <Layout className="h-5 w-5" />,
  frontend: <Code className="h-5 w-5" />,
  backend: <Database className="h-5 w-5" />,
  fullstack: <></>, // Using a custom for fullstack
};

export const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);
  const totalProjects = projects.length;

  const nextProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-rotation for carousel (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      nextProject();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Generate indicator dots
  const renderDots = () => {
    return projects.map((_, index) => (
      <button
        key={index}
        onClick={() => {
          if (isAnimating) return;
          setIsAnimating(true);
          setCurrentIndex(index);
          setTimeout(() => setIsAnimating(false), 500);
        }}
        className={cn(
          "w-3 h-3 rounded-full transition-all duration-300",
          currentIndex === index 
            ? "bg-primary scale-125 shadow-lg shadow-primary/30" 
            : "bg-primary/30 hover:bg-primary/50"
        )}
        aria-label={`Go to project ${index + 1}`}
      />
    ));
  };

  // Calculate indexes for visible projects
  const getVisibleIndexes = () => {
    const prevIndex = currentIndex === 0 ? totalProjects - 1 : currentIndex - 1;
    const nextIndex = currentIndex === totalProjects - 1 ? 0 : currentIndex + 1;
    return { prevIndex, currentIndex, nextIndex };
  };

  const { prevIndex, nextIndex } = getVisibleIndexes();

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background accents remain */}
      
      <div className="container mx-auto max-w-6xl relative z-10">
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

        {/* 3D Carousel for Projects */}
        <div className="relative h-[600px] md:h-[500px] mb-10">
          <div 
            ref={carouselRef}
            className="relative w-full h-full perspective-1000"
          >
            {/* Main (Current) Project */}
            <div 
              className={cn(
                "absolute inset-0 flex transition-all duration-500 ease-out",
                "transform-preserve-3d backface-visibility-hidden"
              )}
            >
              <div className="w-full md:w-4/5 lg:w-3/4 mx-auto">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-primary/20 h-full transition-transform duration-500 transform hover:scale-[1.02]">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Project Image */}
                    <div className="md:w-1/2 h-[250px] md:h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10"></div>
                      <img 
                        src={projects[currentIndex].image} 
                        alt={projects[currentIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-1 px-2 rounded text-xs font-medium text-primary">
                        {projects[currentIndex].category.toUpperCase()}
                      </div>
                    </div>
                    
                    {/* Project Details */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-3">{projects[currentIndex].title}</h3>
                        <p className="text-muted-foreground mb-5">{projects[currentIndex].description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {projects[currentIndex].tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="inline-block px-2 py-1 text-xs font-medium bg-primary/15 text-primary rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Links */}
                      <div className="flex gap-3 mt-auto">
                        <a 
                          href={projects[currentIndex].links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors flex items-center gap-2 font-medium"
                        >
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </a>
                        <a 
                          href={projects[currentIndex].links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side Projects (Preview) */}
            <div 
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-1/3 h-4/5 opacity-50 transition-all duration-500 hidden lg:block"
              style={{ transform: `translateY(-50%) translateX(-30%) rotateY(45deg)` }}
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl h-full border border-primary/10">
                <img 
                  src={projects[prevIndex].image} 
                  alt={projects[prevIndex].title}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
            
            <div 
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-1/3 h-4/5 opacity-50 transition-all duration-500 hidden lg:block"
              style={{ transform: `translateY(-50%) translateX(30%) rotateY(-45deg)` }}
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl h-full border border-primary/10">
                <img 
                  src={projects[nextIndex].image} 
                  alt={projects[nextIndex].title}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevProject}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/20"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextProject}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/20"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-6">
          {renderDots()}
        </div>

        {/* All Projects Button */}
        <div className="mt-12 text-center">
          <a 
            href="https://github.com/yourusername" 
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button group"
          >
            <span className="relative z-10">View All Projects</span>
            <span className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </a>
        </div>
      </div>
    </section>
  );
};