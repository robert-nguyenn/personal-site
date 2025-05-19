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
    const numberOfMeteors = Math.floor(Math.random() * 2) + 1; // Random number of meteors (1-2)

    const newMeteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      // Generate random position for each meteor
      const startX = Math.random() * 40; // Keep away from extreme edges
      const startY = Math.random() * 20; // Start from top portion of screen
      
      // Random angle between 30 and 60 degrees
      const angle = 45 + (Math.random() * 30 - 15);
      const distance = 100 + Math.random() * 200;
      const animationDuration = 2 + Math.random() * 2;
      const delay = Math.random() * 0.5;
      
      newMeteors.push({
        id: `meteor-${Date.now()}-${i}`,
        x: startX,
        y: startY,
        angle,
        distance,
        size: Math.random() * 1 + 0.9, // Thinner
        tailLength: Math.random() * 100 + 70, // Shorter tail
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
          className="meteor animate-meteor"
          style={{
            width: `${meteor.tailLength}px`,
            height: `${meteor.size}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: meteor.delay,
            animationDuration: meteor.animationDuration + "s",
            background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            boxShadow: '0 0 10px 0 rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            position: 'absolute',
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};