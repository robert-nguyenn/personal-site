import { Briefcase } from "lucide-react";
import { ExperienceTimeline } from "./ExperienceTimeline";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl transform -translate-x-1/2"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Professional <span className="text-primary relative inline-block">
              Experience
              <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Scroll through my professional journey
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Experience timeline component */}
          <ExperienceTimeline />
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="/resume.pdf" 
            download 
            className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md hover:shadow-primary/20 inline-flex items-center justify-center gap-2 group"
          >
            <Briefcase className="h-4 w-4" />
            <span>Download Full Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};