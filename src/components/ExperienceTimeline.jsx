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
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Calculate what percentage of timeline is showing based on active experience
  const getTimelinePercentage = (id) => {
    const index = sortedExperiences.findIndex(exp => exp.id === id);
    const percentage = ((sortedExperiences.length - 1 - index) / (sortedExperiences.length - 1)) * 100;
    return percentage;
  };
  
  // Handle timeline scroll to change active experience
  const handleScroll = (direction) => {
    const currentIndex = sortedExperiences.findIndex(exp => exp.id === activeExperienceId);
    let newIndex;
    
    if (direction === 'next' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'prev' && currentIndex < sortedExperiences.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return; // Don't go beyond bounds
    }
    
    setActiveExperienceId(sortedExperiences[newIndex].id);
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
    // Increase sensitivity by adjusting the scaling factor (0.01 is more sensitive)
    const scrollSensitivity = 0.01;
    const moveAmount = deltaY * scrollSensitivity;
    
    const currentIndex = sortedExperiences.findIndex(exp => exp.id === activeExperienceId);
    
    // Calculate new index with improved sensitivity
    // Moving down (positive deltaY) decreases index (moves to newer jobs)
    // Moving up (negative deltaY) increases index (moves to older jobs)
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
  
  // Handle wheel events to prevent page scroll when interacting with timeline
  useEffect(() => {
    const handleWheel = (e) => {
      // Only prevent default if we're within the entire experience section
      // This allows page scrolling once fully scrolled through experiences
      if (containerRef.current && containerRef.current.contains(e.target)) {
        e.preventDefault();
        
        // Use smaller deltaY values for more granular control
        const direction = e.deltaY > 0 ? 'next' : 'prev';
        handleScroll(direction);
      }
    };
    
    // Make the entire window listen for wheel events
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
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
        {/* Vertical timeline on the left - MADE SLIMMER */}
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
          
          {/* Vertical Timeline UI - MADE SLIMMER */}
          <div 
            ref={timelineRef}
            className="relative w-2 bg-gray-200 rounded-full h-[280px] cursor-pointer"
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
            
            {/* Current date indicator - MADE SLIMMER */}
            <div className="absolute -left-28 w-24 text-right">
              {sortedExperiences.map((exp, index) => {
                const isActive = exp.id === activeExperienceId;
                const position = ((sortedExperiences.length - 1 - index) / (sortedExperiences.length - 1)) * 100;
                
                return isActive ? (
                  <div 
                    key={`date-${exp.id}`}
                    className="absolute transform -translate-y-1/2 text-xs font-medium text-primary transition-all duration-300"
                    style={{ top: `${position}%` }}
                  >
                    {exp.period}
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
                  <div className="flex flex-col mb-4 border-b border-primary/10 pb-4">
                    <h3 className="text-xl font-bold text-foreground">{experience.company}</h3>
                    <div className="flex items-center mt-1 text-primary font-medium">
                      {experience.position}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-primary/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Building2 className="h-3.5 w-3.5" />
                        <span className="font-medium">{experience.company}</span>
                      </div>
                      
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
        className="absolute inset-0 w-full z-0 cursor-ns-resize"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};