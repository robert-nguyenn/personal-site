import { ArrowDown } from "lucide-react";

export const HeroSection = () => {  
  return ( 
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center px-4"> 
        <div className="container max-w-4xl mx-auto text-center z-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in-delay-1"> Hi, I'm</span>
              <span className="text-primary opacity-0 animate-fade-in-delay-2"> Robert</span>
              <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-3"> Nguyen</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-4">
              Big fan of engineering and tackling challenges. Enjoy getting into team brainstorms, diving deep into research, and making projects happen. Always up for learning new things!
            </p>

            <div className="pt-4 opacity-0 animate-fade-in-delay-4">
              <a href="#project" className="cosmic-button">
                View My Work
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <ArrowDown className="h-6 w-6 text-primary" /> 
        </div>
    </section> 
  );
}