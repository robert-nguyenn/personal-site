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
            Problem <span className="text-blue-500 relative inline-block">
              Solving
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-bold">
            Honing skills through algorithmic challenges and practical solutions
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
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Algorithmic Approach</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I regularly practice algorithm challenges to sharpen my problem-solving skills. There's something uniquely satisfying about optimizing a solution after working through multiple approaches—it's the engineering mindset applied to code.
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
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Problem-Solving Process</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    My approach involves careful problem analysis, breaking complex issues into manageable parts, and considering edge cases. I find that stepping away momentarily often leads to those "aha" moments that unlock elegant solutions—sometimes the subconscious mind needs time to process.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-5 border border-primary/20">
              <p className="italic text-sm">
                "The difference between a senior and junior engineer isn't that seniors never make mistakes. 
                It's that seniors have a better mental model of systems and a deeper catalog of solutions to draw from."
              </p>
              <p className="text-right font-medium text-sm mt-2">— Engineering principle I live by</p>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">Binary Search</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">Graph Algorithms</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">Dynamic Programming</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">Hash Tables</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};