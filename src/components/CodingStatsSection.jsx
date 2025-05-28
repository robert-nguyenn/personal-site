import { LeetCodeStats } from "./LeetCodeStats";
import { Code, BrainCircuit, Coffee, Lightbulb } from "lucide-react";

export const CodingStatsSection = () => {
  return (
    <section id="coding-stats" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl transform -translate-x-1/2"></div>
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl transform translate-x-1/2"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Algorithm <span className="text-blue-500 relative inline-block">
              Therapy
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-bold">
            Where I voluntarily solve problems that nobody asked for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LeetCode Stats Card */}
          <div className="order-2 md:order-1">
            <LeetCodeStats />
          </div>
          
          {/* Text content */}
          <div className="space-y-6 order-1 md:order-2">
            <div className="gradient-border p-5 card-hover backdrop-blur-sm group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/90 group-hover:bg-primary/20 transition-colors">
                  <BrainCircuit className="h-5 w-5 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">My Algorithm Obsession</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I tackle LeetCode problems while others binge Netflix. Why? Because nothing says "fun Friday night" like optimizing a recursive solution until 3 AM and celebrating with a victory dance when I beat 98% of submissions.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-5 card-hover backdrop-blur-sm group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/90 group-hover:bg-primary/20 transition-colors">
                  <Coffee className="h-5 w-5 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">The Method to My Madness</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    My approach? First, stare blankly at the problem. Second, overthink it. Third, remember that elegant O(n) solution exists. Finally, have that "Aha!" moment after my second espresso. Works 60% of the time, every time.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-5 border border-primary/20">
              <p className="italic text-sm">
                "The difference between a senior and junior engineer isn't that seniors never make mistakes. 
                It's that seniors have a deeper catalog of mistakes to avoid repeating."
              </p>
              <p className="text-right font-medium text-sm mt-2">— My debugging mantra</p>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">Binary Search & Chill</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">Graph Theory Enthusiast</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">DP or Not DP?</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">Hash Map Hoarder</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">O(n) Optimizer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};