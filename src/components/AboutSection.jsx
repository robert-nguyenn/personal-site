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
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            The human behind the keyboard who voluntarily debugs for fun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center justify-center">
              <span className="p-2 rounded-lg bg-primary/10 mr-3">
                <Server className="h-5 w-5 text-blue-400"/>
              </span>
              <span>Code Wrangler & Bug Whisperer</span>
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              I'm that rare engineer who debugs production issues with a smile ☕ + 💻. When others see endless error logs 📜, I see an exciting murder mystery 🔍 where the victim is our CPU and I'm the detective. After all, I didn't choose the debugging life; the debugging life chose me.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I've survived React dependency hell 🔥, tamed AWS Lambda functions gone wild 🐑, and once explained to a CEO why "just adding blockchain 🔗" wouldn't actually solve his data problem. My GitHub commits ✔️ are more consistent than my coffee brewing technique, and yes, I do judge your code indentation.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10">
              <div className="flex items-center mb-2">
                <Coffee className="h-5 w-5 text-amber-400 mr-2" />
                <span className="font-medium text-sm">CAFFEINE-TO-CODE CONVERTER</span>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "I once fixed a critical bug at 3 AM with such elegance that I framed a printout of the git diff. It now hangs in my personal hall of fame, right next to my diploma."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
              <a href="#contact" className="cosmic-button group relative overflow-hidden px-6 py-2.5 rounded-full bg-primary text-white hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                <span className="relative z-10">Let's Talk Code 💬</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>

              <a 
                href="/resume.pdf" 
                download 
                className="px-6 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                <span>Resume.pdf (No Bugs 🐞)</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-y-1 transition-transform">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Emoji-fied Cards */}
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover backdrop-blur-sm group hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-white transition-colors group-hover:from-blue-200 group-hover:to-white">
                  <Zap className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Web Wizardry 🧙‍♂️</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I turn ☕ into code and business requirements into working apps 📲. My websites don't just look pretty—they're so fast ⚡ users think their internet got an upgrade.
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
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">UX Therapist 🛋️</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I craft interfaces so intuitive your grandma 👵 could use them. Secret? I actually talk to users 💬 instead of assuming everyone thinks like a developer.
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
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Battle-Tested Experience ⚔️</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I've survived impossible deadlines ⏰, scope creep 🐛, and meetings that could've been emails 📧—yet still love talking tech at 2 AM 🌙.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-2">
              <span className="text-xs text-muted-foreground italic">
                * Actual skills may vary after 5PM when caffeine levels drop
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground italic">
            "In a parallel universe, I'm probably still trying to center a div with CSS."
          </p>
        </div>
      </div>
    </section>
  );
};