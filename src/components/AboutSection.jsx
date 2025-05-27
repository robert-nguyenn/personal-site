import { Briefcase, Code, User, Monitor, Server } from "lucide-react";

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-3">
                <Server className="h-5 w-5 text-primary"/>
              </span>
              <span>Passionate Software Engineer</span>
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              With a strong foundation in software engineering, I am passionate about creating innovative solutions that solve real-world problems. My experience spans various domains, including web development, mobile applications, and cloud computing.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I'm passionate about software development and always eager to learn new technologies. I enjoy working in a team environment and believe that collaboration is key to success. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
              <a href="#contact" className="cosmic-button group relative overflow-hidden">
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>

              <a 
                href="/resume.pdf" 
                download 
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 group"
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

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover backdrop-blur-sm group">
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Code className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Web Development</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I specialize in building responsive and user-friendly web applications using modern frameworks and technologies.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="gradient-border p-6 card-hover backdrop-blur-sm group">
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <User className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">User Experience</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I focus on creating intuitive and engaging user experiences that enhance usability and satisfaction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="gradient-border p-6 card-hover backdrop-blur-sm group">
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Professional Experience</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I have worked on various projects, collaborating with cross-functional teams to deliver high-quality software solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}