import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container max-w-5xl mx-auto ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12"> 
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Passion Software Engineer</h3>

            <p className="text-muted-foreground">
              With a strong foundation in software engineering, I am passionate about creating innovative solutions that solve real-world problems. My experience spans various domains, including web development, mobile applications, and cloud computing.
            </p>

            <p className="text-muted-foreground">
              I'm passionate about software development and always eager to learn new technologies. I enjoy working in a team environment and believe that collaboration is key to success. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a href="/resume.pdf" download className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                Download Resume
              </a>

            </div>
          </div>

          <div className="grid gird-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Web Development</h4>
                  <p className="text-muted-foreground">
                    I specialize in building responsive and user-friendly web applications using modern frameworks and technologies.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">User Experience</h4>
                  <p className="text-muted-foreground">
                    I focus on creating intuitive and engaging user experiences that enhance usability and satisfaction.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Professional Experience</h4>
                  <p className="text-muted-foreground">
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