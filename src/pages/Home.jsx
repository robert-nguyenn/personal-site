import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { CodingStatsSection } from "../components/CodingStatsSection";
import { ExperienceSection } from "../components/ExperienceSection"; // Import the new section

export const Home = () => {
  return (
    <main className="relative">
      <StarBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection /> {/* Add the new Experience section here */}
      <SkillsSection />
      <ProjectsSection />
      <CodingStatsSection />
      <ContactSection />   
      <Footer />
      <ThemeToggle />
    </main>
  )
}