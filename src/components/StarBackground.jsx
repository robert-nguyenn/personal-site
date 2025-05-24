import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    generateStars();
    
    // Initial delay before first meteor
    const initialTimeout = setTimeout(() => {
      generateMeteors();
    }, 2000);
    
    const meteorInterval = setInterval(() => {
      generateMeteors();
    }, 10000);

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(meteorInterval);
      clearTimeout(initialTimeout);
    }
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 5000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random(),
        animationDuration: Math.random() * 4 + 2,
        blur: Math.random() < 0.2 ? `blur-${Math.ceil(Math.random() * 2)}` : '',
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    // 70% chance of 1 meteor, 30% chance of 2 meteors
    const numberOfMeteors = Math.random() < 0.7 ? 1 : 2;

    const newMeteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      // Generate random position for each meteor
      const startX = Math.random() * 40 + 30; // Keep away from extreme edges
      const startY = Math.random() * 20; // Start from top portion of screen
      
      const animationDuration = 2 + Math.random() * 3;
      const delay = Math.random() * 1.5;
      
      newMeteors.push({
        id: `meteor-${Date.now()}-${i}`,
        x: startX,
        y: startY,
        size: Math.random() * 1 + 0.8, 
        tailLength: Math.random() * 120 + 80,
        delay,
        animationDuration,
      });
    }

    setMeteors(prev => [...prev, ...newMeteors]);
    
    // After animation fully completes (duration + delay), remove meteors
    setTimeout(() => {
      setMeteors(prev => prev.filter(m => 
        !newMeteors.some(nm => nm.id === m.id)
      ));
    }, 15000); // Longer timeout to ensure full animation completion
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star animate-pulse-subtle ${star.blur}`}
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="animate-meteor"
          style={{
            width: `${meteor.tailLength}px`,
            height: `${meteor.size}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            boxShadow: '0 0 10px 0 rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            position: 'absolute',
            zIndex: 1,
          }}
        />
      ))}
      
      {/* Gradient overlay at bottom for depth effect - especially nice in dark mode */}
      <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-background/50 to-transparent pointer-events-none"></div>
    </div>
  );
};