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
            Professional <span className="text-blue-500 relative inline-block">
              Experience
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-bold">
            Scroll through my professional journey
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Experience timeline component */}
          <ExperienceTimeline />
        </div>
    
      </div>
    </section>
  );
};