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
        {/* Main footer content */}
        <div className="flex flex-col items-center mb-8">
          <div className="gradient-border p-4 rounded-xl inline-flex items-center bg-card/30 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 group">
            <Code className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">Trust me, I've tested this site in production</span>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Robert Nguyen. No bugs were harmed in the making of this site.
          </p>
          
          <p className="flex items-center text-sm gap-2 mt-2 md:mt-0 text-muted-foreground">
            <span>Powered by</span>  
            <Coffee className="h-4 w-4 text-primary" /> 
            <span>+</span> 
            <Heart className="h-4 w-4 text-red-500 inline-block animate-pulse" fill="currentColor" /> 
            <span>+ React</span>
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 left-5 p-3 rounded-full bg-blue-400 text-white shadow-lg transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
        } hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary z-50`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};