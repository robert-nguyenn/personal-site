import { useState, useRef, useEffect } from 'react';
import { Briefcase, Calendar, ChevronUp, ChevronDown, Code2, Award, BookOpen } from 'lucide-react';
import { cn } from "../lib/utils";

export const ExperienceTimeline = () => {
  // Professional experience data with added logo paths and skills
  const experiences = [
    {
      id: 1,
      company: "Theta Zero Consulting, LLC",
      position: "Software Engineer Intern",
      period: "Dec 2024 - May 2025",
      logo: "/logos/theta-zeta.png",
      skills: ["React", "Node.js", "AWS", "Django", "PostgreSQL", "RESTful APIs", "Docker", "Terraform", "Git", "GitHub", "GitLab", "CI/CD", "Agile Methodologies", "Playwright", "Scrum", "Tailwind CSS"] 
    },
    {
      id: 2,
      company: "Novatek Technology, JSC",
      position: "Software Developer Intern",
      period: "May 2024 - Nov 2024",
      logo: "/logos/noretek.png",
      skills: ["Angular", "TypeScript", "Docker", "Tainwind CSS", "MySQL", "AWS", "DynamoDB", "AWS Lambda", "AWS API Gateway"]
    },
    {
      id: 3,
      company: "Centre - Computer Science Department",
      position: "Research Assistant",
      period: "Jan 2024 - May 2024", 
      logo: "/logos/centre-college.png",
      skills: ["Python", "Pandas", "Numpy", "Regex", "Matplotlib", "Seaborn", "Ploty", "Google Colab", "Machine Learning", "Data Analysis"]
    }
  ];
  
  // Get the appropriate icon for each experience type
  const getExperienceIcon = (company) => {
    if (company.includes("College") || company.includes("Department")) {
      return <BookOpen className="h-5 w-5 text-red-400" />;
    } else if (company.includes("Consulting")) {
      return <Briefcase className="h-5 w-5 text-emerald-400" />;
    } else {
      return <Award className="h-5 w-5 text-blue-400" />;
    }
  };
  
  // Rest of your component code remains unchanged
  const sortedExperiences = [...experiences].sort((a, b) => a.id - b.id);
  
  // References and state
  const [activeExperienceId, setActiveExperienceId] = useState(3); // Start with the oldest position
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [isAtBoundary, setIsAtBoundary] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [logoTransitioning, setLogoTransitioning] = useState(false);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const previousLogoRef = useRef(null);
  
  // Calculate what percentage of timeline is showing based on active experience
  const getTimelinePercentage = (id) => {
    const index = sortedExperiences.findIndex(exp => exp.id === id);
    const percentage = ((sortedExperiences.length - 1 - index) / (sortedExperiences.length - 1)) * 100;
    return percentage;
  };
  
  // Check if we're at a scroll boundary (first or last experience)
  useEffect(() => {
    const isFirstExperience = activeExperienceId === sortedExperiences[0].id;
    const isLastExperience = activeExperienceId === sortedExperiences[sortedExperiences.length - 1].id;
    setIsAtBoundary(isFirstExperience || isLastExperience);
  }, [activeExperienceId, sortedExperiences]);
  
  // Handle logo transitions when active experience changes
  useEffect(() => {
    // Store the previous logo for transition
    previousLogoRef.current = sortedExperiences.find(exp => exp.id === activeExperienceId)?.logo;
    
    // Trigger logo transition animation
    setLogoTransitioning(true);
    const timer = setTimeout(() => {
      setLogoTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeExperienceId]);
  
  // Handle timeline scroll to change active experience
  const handleScroll = (direction) => {
    const currentIndex = sortedExperiences.findIndex(exp => exp.id === activeExperienceId);
    let newIndex;
    
    if (direction === 'next' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'prev' && currentIndex < sortedExperiences.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      // We're at a boundary, allow page scrolling to continue
      return false; // Return false to indicate we didn't handle the scroll
    }
    
    setActiveExperienceId(sortedExperiences[newIndex].id);
    return true; // Return true to indicate we handled the scroll
  };
  
  // Handle timeline click to navigate directly
  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const positionPercentage = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Map position percentage to experience index (inverted since oldest is at the top)
    const experienceIndex = Math.round((1 - positionPercentage / 100) * (sortedExperiences.length - 1));
    const clampedIndex = Math.max(0, Math.min(sortedExperiences.length - 1, experienceIndex));
    setActiveExperienceId(sortedExperiences[clampedIndex].id);
  };
  
  // Drag handling for timeline interaction with improved sensitivity
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartY(e.pageY);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaY = e.pageY - dragStartY;
    // Use scaled sensitivity for smoother control
    const scrollSensitivity = 0.008;
    const moveAmount = deltaY * scrollSensitivity;
    
    const currentIndex = sortedExperiences.findIndex(exp => exp.id === activeExperienceId);
    
    // Calculate potential new index
    let targetIndex = currentIndex - Math.sign(deltaY) * Math.min(1, Math.abs(moveAmount));
    
    // Clamp the index within bounds
    targetIndex = Math.max(0, Math.min(sortedExperiences.length - 1, targetIndex));
    
    if (targetIndex !== currentIndex) {
      setActiveExperienceId(sortedExperiences[targetIndex].id);
      // Reset drag start point to prevent continuous scrolling on small movements
      setDragStartY(e.pageY);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Debounce scroll events to prevent rapid firing
  const debounceScroll = (callback, delay = 100) => {
    return (...args) => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      
      scrollTimeoutRef.current = setTimeout(() => {
        callback(...args);
        setIsScrolling(false);
      }, delay);
    };
  };
  
  // Handle wheel events with improved boundary detection
  useEffect(() => {
    // Track wheel direction and accumulated delta for smooth snapping
    let accumulatedDelta = 0;
    let lastScrollTime = 0;
    const scrollThreshold = 50; // Adjust for sensitivity
    const scrollCooldown = 200; // ms between scroll events to reset accumulation
    
    const handleWheel = (e) => {
      // Check if we're at a boundary and scrolling in the direction to exit
      const isScrollingDown = e.deltaY > 0;
      const isFirstExperience = activeExperienceId === sortedExperiences[0].id;
      const isLastExperience = activeExperienceId === sortedExperiences[sortedExperiences.length - 1].id;
      
      // If at boundary and trying to scroll beyond it, don't prevent default
      if ((isFirstExperience && isScrollingDown) || (isLastExperience && !isScrollingDown)) {
        // Let the default scroll behavior happen
        return;
      }
      
      // Otherwise, handle the timeline scroll
      if (containerRef.current && containerRef.current.contains(e.target)) {
        e.preventDefault();
        
        // Reset accumulated delta if it's been a while
        const now = Date.now();
        if (now - lastScrollTime > scrollCooldown) {
          accumulatedDelta = 0;
        }
        lastScrollTime = now;
        
        // Accumulate scroll delta for smoother control
        accumulatedDelta += e.deltaY;
        
        // Only trigger scroll when we've accumulated enough movement
        if (Math.abs(accumulatedDelta) > scrollThreshold) {
          const direction = accumulatedDelta > 0 ? 'next' : 'prev';
          const handled = handleScroll(direction);
          if (handled) {
            accumulatedDelta = 0; // Reset after handling
          }
        }
      }
    };
    
    // Add the event listener
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeExperienceId]);
  
  // Cleanup events
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);
  
  // Get current active experience
  const activeExperience = sortedExperiences.find(exp => exp.id === activeExperienceId);
  
  return (
    <div 
      ref={containerRef} 
      className="relative py-12 select-none w-full"
      onMouseLeave={handleMouseUp}
    >
      {/* Center content with grid layout - TWO COLUMN LAYOUT */}
      <div className="max-w-6xl mx-auto">
        {/* Two column grid layout with REDUCED GAP */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Left column - Timeline and cards (50% width on desktop) */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="flex gap-6 w-full max-w-md">
              {/* Vertical timeline */}
              <div className="relative flex flex-col items-center">
                {/* Timeline navigation controls */}
                <button
                  onClick={() => handleScroll('prev')}
                  disabled={activeExperienceId === sortedExperiences[sortedExperiences.length - 1].id}
                  className={cn(
                    "p-1.5 rounded-full transition-all mb-2",
                    activeExperienceId === sortedExperiences[sortedExperiences.length - 1].id 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:bg-primary/10 text-primary"
                  )}
                  aria-label="Previous experience"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                
                {/* Vertical Timeline UI */}
                <div 
                  ref={timelineRef}
                  className={cn(
                    "relative w-2 bg-gray-200 rounded-full h-[280px] cursor-pointer transition-all",
                    isDragging && "cursor-grabbing",
                    isScrolling && "after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-8 after:h-8 after:bg-primary/10 after:rounded-full after:animate-ping after:animation-duration-300"
                  )}
                  onClick={handleTimelineClick}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  <div 
                    className="absolute top-0 left-0 w-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ height: `${getTimelinePercentage(activeExperienceId)}%` }}
                  />
                  
                  {sortedExperiences.map((exp, index) => {
                    const isActive = exp.id === activeExperienceId;
                    const position = ((sortedExperiences.length - 1 - index) / (sortedExperiences.length - 1)) * 100;
                    
                    return (
                      <div 
                        key={exp.id}
                        onClick={() => setActiveExperienceId(exp.id)}
                        className={cn(
                          "absolute -left-1 w-4 h-4 rounded-full -mt-2 transition-all duration-300 border border-white shadow-md",
                          isActive 
                            ? "bg-primary scale-125 shadow-primary/50" 
                            : "bg-gray-300 hover:bg-primary/60"
                        )}
                        style={{ top: `${position}%` }}
                      />
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handleScroll('next')}
                  disabled={activeExperienceId === sortedExperiences[0].id}
                  className={cn(
                    "p-1.5 rounded-full transition-all mt-2",
                    activeExperienceId === sortedExperiences[0].id 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:bg-primary/10 text-primary"
                  )}
                  aria-label="Next experience"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Scroll indicator - appears when at boundaries */}
                {isAtBoundary && (
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground animate-bounce">
                    <ChevronDown className="h-4 w-4" />
                    <span className="sr-only">Continue scrolling</span>
                  </div>
                )}
              </div>
              
              {/* Experience card */}
              <div className="relative flex-1 min-h-[210px]">
                {sortedExperiences.map((experience) => {
                  const isActive = experience.id === activeExperienceId;
                  
                  return (
                    <div
                      key={experience.id}
                      className={cn(
                        "transition-all duration-500 ease-out absolute w-full",
                        isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
                      )}
                    >
                      <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl p-3 shadow-md flex flex-col">
                        {/* Header with company name and dynamic icon */}
                        <div className="flex flex-col mb-2 border-b border-primary/10 pb-2">
                          <div className="flex items-center gap-1.5">
                            {getExperienceIcon(experience.company)}
                            <h3 className="text-base font-bold text-foreground">{experience.company}</h3>
                          </div>
                          <div className="flex items-center mt-0.5 text-sm text-primary font-medium">
                            {experience.position}
                          </div>
                        </div>
                        
                        {/* Skills section with improved icon */}
                        <div className="mb-2">
                          <div className="flex items-center gap-1.5 mb-1.5 text-xs text-muted-foreground">
                            <Code2 className="h-3.5 w-3.5 text-violet-400" />
                            <span className="font-medium">Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {experience.skills.map((skill, index) => (
                              <span 
                                key={index} 
                                className="text-xs bg-primary/20 text-blue-400 px-2 py-0.5 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Date information with improved calendar icon */}
                        <div className="flex items-center text-xs mt-auto">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-amber-400" />
                            <span>{experience.period}</span>
                          </div>
                        </div>
                        
                        {/* Footer - just showing card number */}
                        <div className="mt-2 pt-2 border-t border-primary/10">
                          <div className="flex items-center justify-end">
                            <span className="text-[10px] text-muted-foreground">
                              {`${sortedExperiences.length - sortedExperiences.findIndex(exp => exp.id === experience.id)} of ${sortedExperiences.length}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Right column - Logo display (60% width on desktop) - INCREASED SIZE */}
          <div className="md:col-span-3 flex justify-center items-center h-full">
            <div className="relative w-full h-80 flex items-center justify-center">
              {/* Logo container with transition effect - LARGER CONTAINER */}
              <div className="relative w-full h-full flex items-center justify-center rounded-xl bg-card/50 backdrop-blur-sm p-8 border border-primary/10 shadow-md overflow-hidden">
                {/* Current logo with fade-in animation - LARGER IMAGE */}
                <div 
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-300 p-6",
                    logoTransitioning ? "opacity-0" : "opacity-100"
                  )}
                >
                  {activeExperience?.logo ? (
                    <img 
                      src={activeExperience.logo} 
                      alt={`${activeExperience.company} logo`} 
                      className="max-w-full max-h-full object-contain transition-all duration-300"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center">
                      <Briefcase className="h-24 w-24 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Company name under the logo */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-sm font-medium bg-card/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    {activeExperience?.company}
                  </span>
                </div>
              </div>
              
              {/* Logo shadow effect */}
              <div 
                className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent opacity-50" 
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width interaction overlay */}
      <div 
        className={cn(
          "absolute inset-0 w-full z-0",
          isAtBoundary ? "cursor-default" : "cursor-ns-resize"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};