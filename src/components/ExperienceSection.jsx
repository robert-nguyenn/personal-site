import { Briefcase, Calendar, Clock } from "lucide-react";
import { ExperienceTimeline } from "./ExperienceTimeline";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative overflow-x-hidden w-full">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl transform -translate-x-1/2"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Professional <span className="text-blue-500 relative inline-block">
              Experience
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto font-bold">
            Building expertise through meaningful contributions and growth
          </p>
        </div>

        {/* Timeline intro box with personality */}
        <div className="mb-12 mx-auto max-w-2xl p-5 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/20 text-center">
          <p className="flex items-center justify-center text-sm italic text-muted-foreground">
            "Every role has shaped my approach to development. The most valuable lessons 
            often came from navigating complex challenges with thoughtful teams."
            <Clock className="h-5 w-5 ml-2 text-blue-400" />
          </p>
        </div>

        {/* Full-width timeline container with consistent centering */}
        <div className="w-full relative">
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  );
};