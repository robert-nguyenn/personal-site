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

              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
            </div>
          </div>

          <div>

          </div>
        </div>
      </div>
    </section>
  );
}