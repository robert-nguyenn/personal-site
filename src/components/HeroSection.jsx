import { ArrowDown } from "lucide-react";

export const HeroSection = () => {  
  return ( 
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center px-4"> 
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container max-w-4xl mx-auto text-center z-10">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in-delay-1"> Hi, I'm</span>
              <span className="text-primary opacity-0 animate-fade-in-delay-2 relative">
                <span className="relative z-10"> Robert</span>
                <span className="absolute inset-0 bg-primary/10 rounded-lg filter blur-xl -z-10 scale-150"></span>
              </span>
              <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-3"> Nguyen</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-4 leading-relaxed">
              Big fan of engineering and tackling challenges. Enjoy getting into team brainstorms, diving deep into research, and making projects happen. Always up for learning new things!
            </p>

            <div className="pt-6 opacity-0 animate-fade-in-delay-4 flex flex-wrap justify-center gap-4">
              <a href="#project" className="cosmic-button group relative overflow-hidden">
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-muted-foreground mb-2 opacity-75">Scroll Down</span>
          <ArrowDown className="h-6 w-6 text-primary" /> 
        </div>
    </section> 
  );
}