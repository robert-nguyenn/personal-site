import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        // Changed the positioning from top-right to bottom-right
        "fixed z-50 right-5 bottom-5 sm:right-8 sm:bottom-8 p-2.5",
        "rounded-full backdrop-blur-md transition-all duration-500",
        "hover:scale-110 active:scale-95 hover:ring-5",
        "focus:outline-none ",
        // Improved contrast and visual feedback
        isDarkMode 
          ? "bg-primary/45 hover:bg-primary/25 text-yellow-300 hover:ring-yellow-500" 
          : "bg-white hover:ring-blue-500"
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative">
        {isDarkMode ? (
          <Sun className="h-5 w-5 transition-all fill-current duration-300" />
        ) : (
          <Moon className="h-5 w-5 text-blue-900 transition-all duration-300" />
        )}
        <span className={cn(
          "absolute inset-0 rounded-full bg-white mix-blend-difference opacity-0",
          "transition-opacity duration-300",
          isDarkMode ? "opacity-0" : "opacity-0"
        )}></span>
      </div>
    </button>
  );
};