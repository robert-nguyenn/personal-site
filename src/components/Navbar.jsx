import { cn } from "../lib/utils";
import { useState, useEffect } from "react"; 
import { Menu, X } from "lucide-react";

// Update the navItems array to include Experience
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Leetcode", href: "#coding-stats" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Track active section for highlight effect
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return ( 
    <nav className={cn(
      "fixed w-full z-40 transition-all duration-500", 
      isScrolled 
        ? "bg-background/80 backdrop-blur-xl shadow-md py-3 border-b border-primary/10" 
        : "py-5"
    )}>
      <div className="container flex items-center justify-between">
        <a 
          className="text-xl font-bold flex items-center group" 
          href="#hero"
        >
          <div className="relative overflow-hidden pr-2">
            <span className="text-glow text-foreground relative z-10 transition-transform duration-300 group-hover:scale-110"> 
              Robert
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></div>
          </div>
          <span className="text-primary relative overflow-hidden">
            <span className="relative z-10">Portfolio</span>
            <span className="absolute inset-0 bg-primary/10 rounded-lg filter blur-md -z-10 scale-0 group-hover:scale-100 transition-all duration-300"></span>
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, key) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a 
                key={key} 
                href={item.href} 
                className={cn(
                  "px-4 py-2 rounded-full relative font-medium",
                  "transition-all duration-300 hover:text-primary",
                  isActive 
                    ? "text-primary" 
                    : "text-foreground/80"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                )}
              </a>
            );
          })}
        </div>

        {/* mobile nav button */}
        <button 
          onClick={() => setIsMenuOpen((prev) => !prev)} 
          className={cn(
            "md:hidden p-2 z-50 rounded-full",
            "transition-colors duration-300",
            isMenuOpen ? "text-primary bg-background/10" : "text-foreground hover:text-primary"
          )}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        > 
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />} 
        </button>

        {/* mobile nav menu */}
        <div 
          className={cn(
            "fixed inset-0 bg-background/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-6 text-xl">
            {navItems.map((item, key) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a 
                  key={key} 
                  href={item.href} 
                  className={cn(
                    "relative px-8 py-2 rounded-lg transition-all duration-300",
                    "hover:bg-primary/10 hover:text-primary",
                    isActive 
                      ? "text-primary font-medium" 
                      : "text-foreground/90"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav> 
  );
}