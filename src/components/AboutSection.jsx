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
            I overthink simple problems until they become interesting ones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center justify-center">
              <span className="p-2 rounded-lg bg-primary/10 mr-3">
                <Server className="h-5 w-5 text-blue-400"/>
              </span>
              <span>Professional Googler with Coding Abilities</span>
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              I'm that peculiar developer who considers 3 AM debugging sessions "quality me time" ☕ + 💻. Where normal people see error messages, I see murder mysteries waiting to be solved. The detective? Me. The murder weapon? Usually a semicolon. The motive? Still investigating.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I've negotiated peace treaties with angry npm packages 📦, created React components so clean they make Marie Kondo emotional 🧹, and can explain technical concepts so clearly that even venture capitalists briefly understand what they're investing in. My commit history is more consistent than my sleep schedule, and I write documentation for fun—clearly something went wrong in my development.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10">
              <div className="flex items-center mb-2">
                <Coffee className="h-5 w-5 text-amber-400 mr-2" />
                <span className="font-medium text-sm">PROFESSIONAL QUIRKS</span>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "I maintain a special folder of elegant code solutions I've written while half-asleep. It contains either pure genius or complete nonsense—I'm still not qualified to tell which."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
              <a href="#contact" className="cosmic-button group relative overflow-hidden px-6 py-2.5 rounded-full bg-primary text-white hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                <span className="relative z-10">Discuss My Questionable Career Choices 💬</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>

              <a 
                href="/resume.pdf" 
                download 
                className="px-6 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                <span>Resume.pdf (Mostly Non-Fiction 📜)</span>
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
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Digital Alchemist 🧪</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I transform vague client requests like "make it pop" into functional web applications 🔮. My code is so clean you could eat off it, though I strongly advise against it for both digestive and security reasons.
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
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Error Whisperer 🔍</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I speak fluent Stack Overflow and can interpret cryptic error messages with uncanny accuracy 🧙‍♂️. My debugging process involves equal parts logical analysis, educated guessing, and ritual sacrifices to the compiler gods.
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
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Corporate Translator ⚖️</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I convert executive buzzwords into actual technical specifications ✨. My superpower is explaining why we can't "just add AI" to the project two days before launch while maintaining a professional facial expression.
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