import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {  
  const [scrollOpacity, setScrollOpacity] = useState(1);
  
  useEffect(() => {
    const handleScroll = () => {
      const opacity = 1 - Math.min(window.scrollY / 200, 1);
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return ( 
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center px-4"> 
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in-delay-1">👋 Hi, I’m</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-2 relative ml-2">
              <span className="relative z-10">Robert</span>
              <span className="absolute inset-0 bg-primary/10 rounded-lg filter blur-xl -z-10 scale-150"></span>
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-3">Nguyen</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-4 leading-relaxed font-bold">
            Big fan of engineering and tackling challenges. Love diving into team brainstorms, sinking into research, and getting projects across the finish line. Always up for learning new things! 🌟
          </p>
        </div>
      </div>

      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce transition-opacity duration-500"
        style={{ opacity: scrollOpacity }}
      >
        <span className="text-sm text-muted-foreground mb-2 opacity-75">Scroll Down</span>
        <ArrowDown className="h-6 w-6 text-blue-400" /> 
      </div>
    </section> 
  );
};
