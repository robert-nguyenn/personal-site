import { Github, Linkedin, Twitter, Heart, ArrowUp, Coffee, Code } from "lucide-react";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Control back to top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-primary/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Bottom section with copyright */}
        <div className="border-t border-blue-300 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Robert Nguyen.
          </p>
          
          <p className="flex items-center text-sm gap-2 mt-2 md:mt-0 text-muted-foreground">
            <span>Powered by</span>  
            <Heart className="h-4 w-4 text-red-500 inline-block animate-pulse" fill="currentColor" /> 
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 left-5 p-3 rounded-full bg-blue-300 text-black shadow-lg transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
        } hover:scale-110 focus:outline-none z-50`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};