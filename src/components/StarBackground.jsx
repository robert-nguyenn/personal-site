import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    generateStars();
    
    const handleResize = () => {
      generateStars();
    }
    
    window.addEventListener("resize", handleResize);
    
    // Set up interval to regenerate meteors
    const meteorInterval = setInterval(() => {
      generateMeteors();
    }, 8000); // Generate new meteors every 8 seconds
    
    // Initial meteor generation with a delay
    const initialTimeout = setTimeout(() => {
      generateMeteors();
    }, 2000);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(meteorInterval);
      clearTimeout(initialTimeout);
    }
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(window.innerHeight * window.innerWidth / 10000);

    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    setStars(newStars);
  }

  const generateMeteors = () => {
    const numberOfMeteors = Math.floor(Math.random() * 2) + 5; // Random number of meteors (1-2)

    const newMeteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      // Generate random position for each meteor
      const startX = Math.random() * 70 + 15; // Keep away from extreme edges
      const startY = Math.random() * 20; // Start from top portion of screen
      
      // Random angle between 30 and 60 degrees
      const angle = 45 + (Math.random() * 30 - 15);
      const distance = 100 + Math.random() * 200;
      const animationDuration = 0.8 + Math.random() * 1.2;
      const delay = Math.random() * 0.5;
      
      newMeteors.push({
        id: `meteor-${Date.now()}-${i}`,
        x: startX,
        y: startY,
        angle,
        distance,
        size: Math.random() * 1 + 0.5, // Thinner
        tailLength: Math.random() * 50 + 30, // Shorter tail
        delay,
        animationDuration,
        // Will be automatically removed when animation ends
      });
    }

    setMeteors(prev => [...newMeteors]);
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
        }}/>
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor"
          style={{
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            width: `${meteor.tailLength}px`,
            height: `${meteor.size}px`,
            opacity: 0, // Start invisible
            background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            boxShadow: '0 0 10px 0 rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            '--angle': `${meteor.angle}deg`,
            '--distance': `${meteor.distance}px`,
            animation: `meteor ${meteor.animationDuration}s linear ${meteor.delay}s forwards`,
            animationFillMode: 'forwards',
            transformOrigin: 'center',
            position: 'absolute',
            zIndex: 1,
          }}
          onAnimationEnd={() => {
            // Remove this meteor after animation is done
            setMeteors(prev => prev.filter(m => m.id !== meteor.id));
          }}
        />
      ))}
    </div>
  );
}