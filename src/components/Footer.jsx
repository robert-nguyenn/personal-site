import React, { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Heart, ChevronUp } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  
  // Show back to top button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
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
  
  return (
    <footer className="relative overflow-hidden">
      {/* Decorative wave background */}
      <div className="absolute w-full h-56 overflow-hidden -top-20 left-0 pointer-events-none">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
          <path 
            d="M0.00,49.98 C195.31,202.48 271.49,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
            className="fill-primary/5"
          ></path>
        </svg>
      </div>
      
      <div className="relative z-10 pt-16 pb-12 px-4 border-t border-primary/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Column 1: Logo & Description */}
            <div className="md:col-span-5 space-y-4">
              <a 
                className="text-2xl font-bold flex items-center group" 
                href="#hero"
              >
                <div className="relative overflow-hidden pr-2">
                  <span className="text-glow text-foreground relative z-10 transition-transform duration-300 group-hover:scale-110"> 
                    Robert
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </div>
                <span className="text-primary relative overflow-hidden">
                  <span className="relative z-10">Portfolio</span>
                  <span className="absolute inset-0 bg-primary/10 rounded-lg filter blur-md -z-10 scale-0 group-hover:scale-100 transition-all duration-300"></span>
                </span>
              </a>
              <p className="text-muted-foreground">
                A passionate software engineer dedicated to crafting exceptional digital experiences with modern technologies and creative solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4 pt-2">
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors transform hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/yourusername" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="md:col-span-3">
              <h3 className="font-bold mb-5 text-lg relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary/50 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "#hero" },
                  { name: "About", href: "#about" },
                  { name: "Skills", href: "#skills" },
                  { name: "Projects", href: "#projects" },
                  { name: "Contact", href: "#contact" },
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                    >
                      <span className="relative overflow-hidden">
                        <span className="group-hover:translate-x-1 transition-transform inline-block">
                          {item.name}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/50 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3: Contact */}
            <div className="md:col-span-4">
              <h3 className="font-bold mb-5 text-lg relative inline-block">
                Contact
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary/50 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 group">
                  <span className="text-primary group-hover:scale-110 transition-transform">Email:</span>
                  <a 
                    href="mailto:robert@example.com"
                    className="text-muted-foreground hover:text-primary transition-colors relative overflow-hidden"
                  >
                    <span className="relative">
                      robert@example.com
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/50 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-2 group">
                  <span className="text-primary group-hover:scale-110 transition-transform">Phone:</span>
                  <a 
                    href="tel:+10000000000"
                    className="text-muted-foreground hover:text-primary transition-colors relative overflow-hidden"
                  >
                    <span className="relative">
                      +1 (000) 000-0000
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/50 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">Location:</span>
                  <span className="text-muted-foreground">San Francisco, CA</span>
                </li>
              </ul>
              
              {/* Newsletter subscription */}
              <div className="mt-6 pt-6 border-t border-primary/10">
                <h4 className="font-medium mb-3">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-primary/20 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <button className="px-4 py-2 bg-primary text-white font-medium rounded-r-lg hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-primary/10 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              &copy; {currentYear} Robert Nguyen. All rights reserved. Made with 
              <Heart className="h-4 w-4 text-red-500 inline fill-current animate-pulse-subtle" />
              and modern web technologies.
            </p>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all duration-300 z-40 transform hover:scale-110 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </footer>
  );
};