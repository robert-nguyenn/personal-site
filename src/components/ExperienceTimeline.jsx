import { useState, useRef, useEffect } from 'react';
import { Building2, Calendar, MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from "../lib/utils";

export const ExperienceTimeline = () => {
  // Professional experience data
  const experiences = [
    {
      id: 1,
      company: "Theta Zeta Consulting, LLC",
      position: "Software Engineer Intern",
      period: "Dec 2023 - Present",
      location: "Lexington, KY",
    },
    {
      id: 2,
      company: "Noretek Technology, JSC",
      position: "Software Developer",
      period: "May 2023 - Nov 2023",
      location: "Hanoi, Vietnam",
    },
    {
      id: 3,
      company: "Centre College - Computer Science Department",
      position: "Research Assistant",
      period: "Jan 2023 - May 2023", 
      location: "Danville, KY",
    }
  ];
  
  // Sort experiences chronologically with newest first
  const sortedExperiences = [...experiences].sort((a, b) => a.id - b.id);
  
  // References and state
  const [activeExperienceId, setActiveExperienceId] = useState(3); // Start with the oldest position
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [isAtBoundary, setIsAtBoundary] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  
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
      <div className="max-w-5xl mx-auto flex">
        {/* Vertical timeline on the left */}
        <div className="relative flex flex-col items-center mr-8">
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
            
            {/* Current date indicator - FIXED DATE ALIGNMENT */}
            <div className="absolute -left-28 w-24 text-right">
              {sortedExperiences.map((exp, index) => {
                const isActive = exp.id === activeExperienceId;
                const position = ((sortedExperiences.length - 1 - index) / (sortedExperiences.length - 1)) * 100;
                
                // Extract dates to properly format them
                const periodParts = exp.period.split(" - ");
                
                return isActive ? (
                  <div 
                    key={`date-${exp.id}`}
                    className="absolute transform -translate-y-1/2 text-xs font-medium text-primary transition-all duration-300 whitespace-nowrap"
                    style={{ top: `${position}%` }}
                  >
                    {periodParts[0]}
                    <br />
                    {periodParts[1] || ""}
                  </div>
                ) : null;
              })}
            </div>
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
        
        {/* Experience card on the right */}
        <div className="flex-1 relative min-h-[280px]">
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
                <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-5 shadow-xl flex flex-col">
                  {/* Header with company name and building icon */}
                  <div className="flex flex-col mb-4 border-b border-primary/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">{experience.company}</h3>
                    </div>
                    <div className="flex items-center mt-1 text-primary font-medium">
                      {experience.position}
                    </div>
                  </div>
                  
                  {/* Details section - date and location */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  
                  {/* Footer - just showing card number */}
                  <div className="mt-auto pt-4 border-t border-primary/10">
                    <div className="flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">
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
      
      {/* Full-width interaction overlay - invisible but captures mouse events across the entire width */}
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