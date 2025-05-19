import { useEffect, useState } from "react";

// id, size, x, y, opacity, animationDuration
// id, size, x, y, delay, animationDuration

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = Math.floor(Math.random() * 2) + 1; // Slightly fewer meteors
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      // Generate random position for each meteor
      const startX = Math.random() * 40; 
      const startY = Math.random() * 20; // Start from top portion of screen
      
      const animationDuration = 2 + Math.random() * 3; // Animation duration between 2-5 seconds
      const delay = Math.random() * 0.5;
      
      newMeteors.push({
        id: `meteor-${Date.now()}-${i}`,
        x: startX,
        y: startY,
        size: Math.random() * 1 + 1.5, // Thickness
        tailLength: Math.random() * 120 + 80, // Length (80-200px)
        delay,
        animationDuration,
      });
    }

    setMeteors(prev => [...newMeteors]);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
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
          className="meteor"
          style={{
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            width: `${meteor.tailLength}px`,
            height: `${meteor.size}px`,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            boxShadow: '0 0 10px 0 rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            transform: 'rotate(215deg)', // Fixed rotation instead of dynamic
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
};