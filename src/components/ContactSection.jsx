import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [shake, setShake] = useState(false);
  const formRef = useRef(null);
  const cardRef = useRef(null);

  // Handle 3D tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovering) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate tilt values based on mouse position relative to card center
    // Limiting the tilt effect to be subtle (max 10 degrees)
    const x = ((e.clientY - centerY) / (rect.height / 2)) * 5;
    const y = ((centerX - e.clientX) / (rect.width / 2)) * 5;
    
    setTiltValues({ x, y });
  };
  
  const resetTilt = () => {
    setTiltValues({ x: 0, y: 0 });
    setIsHovering(false);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus({
        type: "error",
        message: "Please fill out all fields."
      });
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({
        type: "success",
        message: "Thank you! I'll get back to you soon."
      });
      
      // Reset form fields after successful submission
      setFormState({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Something went wrong. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Scroll animation for form fields
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll(".animate-item");
      formElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll(".animate-item");
        formElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl transform translate-x-1/3"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl transform -translate-x-1/3"></div>
        
        {/* 3D Grid Effect */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Get In <span className="text-primary relative inline-block">
              Touch
              <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, opportunities and collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="relative h-full">
              {/* Floating Elements */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/5 rounded-full filter blur-xl animate-float"></div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/5 rounded-full filter blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
              
              {/* Contact Card */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={resetTilt}
                style={{
                  transform: `perspective(1000px) rotateX(${tiltValues.x}deg) rotateY(${tiltValues.y}deg) scale3d(1, 1, 1)`,
                  transition: isHovering ? "none" : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
                }}
                className="p-8 rounded-2xl bg-background border border-primary/20 shadow-xl shadow-primary/5 backdrop-blur-sm relative overflow-hidden z-10"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 z-0"></div>
                
                {/* Glass shine effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent z-0"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-gradient">Connect With Me</h3>
                  
                  <div className="space-y-5">
                    <a
                      href="mailto:hello@example.com"
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-primary/5 group relative overflow-hidden"
                    >
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium group-hover:text-primary transition-colors">hello@example.com</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-auto text-primary" />
                    </a>
                    
                    <a
                      href="tel:+1234567890"
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-primary/5 group relative overflow-hidden"
                    >
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium group-hover:text-primary transition-colors">+1 (234) 567-890</p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-auto text-primary" />
                    </a>
                    
                    <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-primary/5 group">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium group-hover:text-primary transition-colors">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="mt-8 pt-6 border-t border-primary/10">
                    <h4 className="text-lg font-medium mb-4">Follow me on</h4>
                    <div className="flex gap-4 justify-center">
                      <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors hover:scale-110 transform duration-300"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5 text-primary" />
                      </a>
                      <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors hover:scale-110 transform duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 text-primary" />
                      </a>
                      <a
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors hover:scale-110 transform duration-300"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-5 w-5 text-primary" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className={cn(
              "relative gradient-border p-8 rounded-2xl backdrop-blur-sm transition-all",
              shake ? "animate-shake" : ""
            )}>
              <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 rounded-2xl z-0"></div>
              
              {/* Floating message icon */}
              <div className="absolute -top-8 -right-8 w-16 h-16 flex items-center justify-center bg-primary rounded-2xl shadow-lg shadow-primary/30 rotate-12 animate-float">
                <Send className="h-6 w-6 text-white transform -rotate-12" />
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold mb-6 text-gradient">Send a Message</h3>
                
                <div className="animate-item opacity-0 translate-y-4 transition-all duration-500 delay-100">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={cn(
                        "w-full p-3 bg-primary/5 border border-primary/20 rounded-xl",
                        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40",
                        "transition-all duration-300 backdrop-blur-sm",
                        "placeholder:text-foreground/50"
                      )}
                      placeholder="John Doe"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-500"></div>
                  </div>
                </div>
                
                <div className="animate-item opacity-0 translate-y-4 transition-all duration-500 delay-200">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={cn(
                        "w-full p-3 bg-primary/5 border border-primary/20 rounded-xl",
                        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40",
                        "transition-all duration-300 backdrop-blur-sm",
                        "placeholder:text-foreground/50"
                      )}
                      placeholder="email@example.com"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-500"></div>
                  </div>
                </div>
                
                <div className="animate-item opacity-0 translate-y-4 transition-all duration-500 delay-300">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="5"
                      className={cn(
                        "w-full p-3 bg-primary/5 border border-primary/20 rounded-xl",
                        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40",
                        "transition-all duration-300 backdrop-blur-sm resize-none",
                        "placeholder:text-foreground/50"
                      )}
                      placeholder="Hello, I'd like to discuss..."
                    ></textarea>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-500"></div>
                  </div>
                </div>
                
                {/* Form status message */}
                {formStatus && (
                  <div className={cn(
                    "p-3 rounded-lg animate-fade-in",
                    formStatus.type === "success" ? "bg-green-500/10 text-green-500 border border-green-500/30" : "bg-red-500/10 text-red-500 border border-red-500/30"
                  )}>
                    {formStatus.message}
                  </div>
                )}
                
                <div className="animate-item opacity-0 translate-y-4 transition-all duration-500 delay-400">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "cosmic-button w-full py-3 group",
                      "relative overflow-hidden", 
                      isSubmitting ? "opacity-90" : ""
                    )}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/50 to-purple-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};