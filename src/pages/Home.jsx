import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";

export const Home = () => {
  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    {/*Theme Toggle*/}
    <ThemeToggle />
    {/* Background Effects */}
    <StarBackground />
    {/* Navbar */}
    <Navbar />
    {/* Main Content */}
    <main>
      <HeroSection /> 
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </main>
  </div>;
}