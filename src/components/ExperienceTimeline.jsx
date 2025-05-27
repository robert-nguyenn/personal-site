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
  const sortedExperiences = [...experiences].sort((a, b) => b.id - a.id);
  
  // References and state
  const [activeExperienceId, setActiveExperienceId] = useState(1); // Start with the most recent position
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  
  // Calculate what percentage of timeline is showing based on active experience
  const getTimelinePercentage = (id) => {
    const index = sortedExperiences.findIndex(exp => exp.id === id);
    return (index / (sortedExperiences.length - 1)) * 100;
  };
  
  // Handle timeline scroll to change active experience
  const handleScroll = (direction) => {
    const currentIndex = sortedExperiences.findIndex(exp => exp.id === activeExperienceId);
    let newIndex;
    
    if (direction === 'next' && currentIndex < sortedExperiences.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
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
    
    // Map position percentage to experience index
    const experienceIndex = Math.round((positionPercentage / 100) * (sortedExperiences.length - 1));
    setActiveExperienceId(sortedExperiences[experienceIndex].id);
  };
  
  // Drag handling for timeline interaction
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartY(e.pageY - timelineRef.current.offsetTop);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const y = e.pageY - timelineRef.current.offsetTop;
    const walk = (y - dragStartY) * 2;
    
    const timelineHeight = timelineRef.current.scrollHeight - timelineRef.current.clientHeight;
    const scrollPercentage = walk / timelineHeight;
    
    const currentIndex = sortedExperiences.findIndex(exp => exp.id === activeExperienceId);
    const targetIndex = currentIndex + Math.round(scrollPercentage * sortedExperiences.length);
    
    const clampedIndex = Math.max(0, Math.min(sortedExperiences.length - 1, targetIndex));
    setActiveExperienceId(sortedExperiences[clampedIndex].id);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Handle wheel events to prevent page scroll when interacting with timeline
  useEffect(() => {
    const timelineElement = timelineRef.current;
    const containerElement = containerRef.current;
    
    const preventScroll = (e) => {
      if (containerElement.contains(e.target)) {
        e.preventDefault();
        
        // Use wheelDelta to determine direction
        const direction = e.deltaY > 0 ? 'next' : 'prev';
        handleScroll(direction);
      }
    };
    
    // Add the event listener to prevent scroll
    window.addEventListener('wheel', preventScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', preventScroll);
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
      className="relative py-12 select-none flex" 
      onMouseLeave={handleMouseUp}
    >
      {/* Vertical timeline on the left */}
      <div className="relative flex flex-col items-center mr-8">
        {/* Timeline navigation controls */}
        <button
          onClick={() => handleScroll('prev')}
          disabled={activeExperienceId === sortedExperiences[0].id}
          className={cn(
            "p-2 rounded-full transition-all mb-4",
            activeExperienceId === sortedExperiences[0].id 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-primary/10 text-primary"
          )}
          aria-label="Previous experience"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        
        {/* Vertical Timeline UI */}
        <div 
          ref={timelineRef}
          className="relative w-3 bg-gray-200 rounded-full h-[300px] cursor-pointer"
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
            const position = (index / (sortedExperiences.length - 1)) * 100;
            
            return (
              <div 
                key={exp.id}
                onClick={() => setActiveExperienceId(exp.id)}
                className={cn(
                  "absolute -left-1.5 w-6 h-6 rounded-full -mt-3 transition-all duration-300 border-2 border-white shadow-md",
                  isActive 
                    ? "bg-primary scale-110 shadow-primary/50" 
                    : "bg-gray-300 hover:bg-primary/60"
                )}
                style={{ top: `${position}%` }}
              />
            );
          })}
          
          {/* Current date indicator */}
          <div className="absolute -left-36 w-32 text-right">
            {sortedExperiences.map((exp, index) => {
              const isActive = exp.id === activeExperienceId;
              const position = (index / (sortedExperiences.length - 1)) * 100;
              
              return isActive ? (
                <div 
                  key={`date-${exp.id}`}
                  className="absolute transform -translate-y-1/2 text-sm font-medium text-primary transition-all duration-300"
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
          disabled={activeExperienceId === sortedExperiences[sortedExperiences.length - 1].id}
          className={cn(
            "p-2 rounded-full transition-all mt-4",
            activeExperienceId === sortedExperiences[sortedExperiences.length - 1].id 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-primary/10 text-primary"
          )}
          aria-label="Next experience"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
      
      {/* Experience card on the right */}
      <div className="flex-1">
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
              <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-xl flex flex-col">
                <div className="flex flex-col mb-4 border-b border-primary/10 pb-4">
                  <h3 className="text-2xl font-bold text-foreground">{experience.company}</h3>
                  <div className="flex items-center mt-1 text-lg text-primary font-medium">
                    {experience.position}
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{experience.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{experience.location}</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-primary/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Building2 className="h-4 w-4" />
                      <span className="font-medium">{experience.company}</span>
                    </div>
                    
                    <span className="text-sm text-muted-foreground">
                      {`${sortedExperiences.findIndex(exp => exp.id === experience.id) + 1} of ${sortedExperiences.length}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};