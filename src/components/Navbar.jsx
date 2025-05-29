import { cn } from "../lib/utils";
import { useState, useEffect } from "react"; 
import { Menu, X, ExternalLink } from "lucide-react";

// Updated navItems with more professional section names
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Problem Solving", href: "#coding-stats" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
      
      // Check if page is scrolled
      setIsScrolled(currentScrollY > 10);
      
      // Track active section for highlight effect
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = currentScrollY + 100;
      
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
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return ( 
    <nav className={cn(
      "fixed w-full z-40 transition-all duration-500", 
      isScrolled 
        ? "bg-background/85 backdrop-blur-xl shadow-md py-3 border-b border-primary/10" 
        : "py-5",
      scrollDirection === "down" && isScrolled && !isMenuOpen
        ? "-translate-y-full" // Hide navbar when scrolling down
        : "translate-y-0"
    )}>
      <div className="container flex items-center justify-between">
        <a 
          className="text-xl font-bold flex items-center group" 
          href="#hero"
        >
          <div className="relative overflow-hidden pr-2">
            <span className="text-foreground relative z-10 transition-transform duration-300 group-hover:scale-105"> 
              Robert
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></div>
          </div>
          <span className="text-primary relative overflow-hidden">
            <span className="relative z-10">Nguyen</span>
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
          <a 
            href="https://drive.google.com/file/d/1P6FNfNhxp4qqM73yFI68GHuRmk7u24Zz/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-1.5 text-sm"
          >
            Resume <ExternalLink className="h-3.5 w-3.5" />
          </a>
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

        {/* mobile nav menu - improved design */}
        <div 
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center",
            "transition-all duration-500 md:hidden",
            isMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none translate-y-[-8px]"
          )}
        >
          <div className="flex flex-col space-y-5 text-lg w-4/5 max-w-xs">
            {navItems.map((item, key) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a 
                  key={key} 
                  href={item.href} 
                  className={cn(
                    "relative px-6 py-3 rounded-lg transition-all duration-300",
                    "border border-transparent",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium border-primary/20" 
                      : "text-foreground/90 hover:bg-primary/5 hover:text-primary hover:border-primary/10"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                  )}
                </a>
              );
            })}
            
            {/* Add resume button to mobile menu */}
            <div className="pt-4 mt-4 border-t border-primary/10 text-center">
              <a 
                href="https://drive.google.com/file/d/1P6FNfNhxp4qqM73yFI68GHuRmk7u24Zz/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-300 inline-flex items-center justify-center gap-2 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                View Resume <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav> 
  );
}