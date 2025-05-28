import { Briefcase, Code, User, Monitor, Server, Coffee, Zap, Brain } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-28 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl transform -translate-x-1/3"></div>
      </div>
      
      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold"> 
            About <span className="text-blue-500 relative inline-block">
              Me
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto font-bold">
            Turning complexity into clarity, one line of code at a time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center justify-center">
              <span className="p-2 rounded-lg bg-primary/10 mr-3">
                <Server className="h-5 w-5 text-blue-400"/>
              </span>
              <span>Problem Solver & Technology Enthusiast</span>
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              I'm the developer who finds genuine joy in solving problems others might run from. There's something satisfying about that moment when everything finally clicks after hours of focused work. My colleagues know me as the person who always has an extra cup of coffee and a fresh perspective ready.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Throughout my career, I've learned that good code tells a story. I strive to create solutions that not only work effectively but remain maintainable for whoever inherits them next. And yes, I'm that person who actually enjoys writing documentation—not because I'm strange, but because I've been on the receiving end of projects without it.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10">
              <div className="flex items-center mb-2">
                <Coffee className="h-5 w-5 text-amber-400 mr-2" />
                <span className="font-medium text-sm">PERSONAL PHILOSOPHY</span>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "The best solutions often come from understanding the problem deeply rather than rushing to code. Sometimes stepping away from the screen brings more clarity than another hour of debugging."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
              <a href="#contact" className="cosmic-button group relative overflow-hidden px-6 py-2.5 rounded-full bg-primary text-white hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                <span className="relative z-10">Let's Connect</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>

              <a 
                href="/resume.pdf" 
                download 
                className="px-6 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                <span>Download Resume</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-y-1 transition-transform">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Cards */}
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover backdrop-blur-sm group hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-white transition-colors group-hover:from-blue-200 group-hover:to-white">
                  <Zap className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Creative Developer</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I enjoy translating abstract requirements into concrete solutions. My approach combines technical expertise with genuine curiosity—sometimes the best insights come from asking "what if?" when everyone else has settled for "good enough."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="gradient-border p-6 card-hover backdrop-blur-sm group hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-white transition-colors group-hover:from-blue-200 group-hover:to-white">
                  <Brain className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Thoughtful Problem-Solver</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Debugging is like detective work, and I've developed a knack for tracking down elusive issues. There's a certain satisfaction in fixing that bug that's had everyone stumped—even if it means occasionally dreaming in code.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="gradient-border p-6 card-hover backdrop-blur-sm group hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-white transition-colors group-hover:from-blue-200 group-hover:to-white">
                  <Briefcase className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Effective Communicator</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I believe technical expertise is only valuable when it can be clearly communicated. I pride myself on bridging the gap between technical concepts and practical business needs—explaining complex ideas without unnecessary jargon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};