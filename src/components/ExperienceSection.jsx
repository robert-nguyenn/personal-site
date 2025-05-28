import { Briefcase, Coffee, Rocket } from "lucide-react";
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
              Adventures
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto font-bold">
            Places where I turned caffeine into code and meetings into milestones
          </p>
        </div>

        {/* Timeline intro box with personality */}
        <div className="mb-12 mx-auto max-w-2xl p-5 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/20 text-center">
          <p className="flex items-center justify-center text-sm italic text-muted-foreground">
            "Drag the timeline to explore my journey from 'what's a function?' to 'I can debug that in my sleep.' 
            Scrolling also works, but dragging feels more dramatic."
            <Rocket className="h-6 w-6 text-blue-400" />
          </p>
        </div>

        {/* Full-width timeline container with consistent centering */}
        <div className="w-full relative">
          <ExperienceTimeline />
        </div>
        
        {/* Bottom quote */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground italic">
            "Each job taught me something valuable. Some taught me technical skills, 
            others taught me patience during never-ending meetings."
          </p>
        </div>
      </div>
    </section>
  );
};