import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, ArrowRight, Loader2, Coffee, Zap } from "lucide-react";

// Simple cn utility function
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

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
    
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus({
        type: "error",
        message: "Please fill out all required fields to continue."
      });
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      // Create form data for Web3Forms
      const formData = new FormData();
      formData.append('access_key', 'db8469d2-02f8-41fd-a060-97db96774f34');
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);
      formData.append('subject', 'New Contact Form Submission from Portfolio');
      // Optional: add replyto to make replies easier
      formData.append('replyto', formState.email);
      
      // Send the form data to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus({
          type: "success",
          message: "Thank you for your message. I'll get back to you as soon as possible."
        });
        
        setFormState({
          name: "",
          email: "",
          message: ""
        });
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        type: "error",
        message: "There was an issue sending your message. Please try again or contact me directly via email."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
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
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl transform -translate-x-1/3"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Let's <span className="text-blue-500 relative inline-block">
              Connect
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-bold">
            Interested in working together or discussing potential opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="relative h-full">
              {/* Contact Card */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={resetTilt}
                style={{
                  transform: `perspective(1000px) rotateX(${tiltValues.x}deg) rotateY(${tiltValues.y}deg)`,
                  transition: isHovering ? "none" : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
                }}
                className="p-8 rounded-2xl bg-card border border-primary/20 shadow-xl backdrop-blur-sm relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-5">
                    <a
                      href="mailto:robert@nguyenn.com"
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-primary/5 group"
                    >
                      <div className="p-3 rounded-full bg-white/90 group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium group-hover:text-primary transition-colors text-foreground">
                          robert.nguyenanh@gmail.com
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-auto text-primary" />
                    </a>
                    
                    <a
                      href="tel:+14155557890"
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-primary/5 group"
                    >
                      <div className="p-3 rounded-full bg-white/90 group-hover:bg-primary/20 transition-colors">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium group-hover:text-primary transition-colors text-foreground">
                          +1 (859) 691-8194
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-auto text-primary" />
                    </a>
                    
                    <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-primary/5 group">
                      <div className="p-3 rounded-full bg-white/90 group-hover:bg-primary/20 transition-colors">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium group-hover:text-primary transition-colors text-foreground">
                          Danville, KY
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-primary/5 group">
                      <div className="p-3 rounded-full bg-white/90 group-hover:bg-primary/20 transition-colors">
                        <Coffee className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Response Time</p>
                        <p className="font-medium group-hover:text-primary transition-colors text-foreground">
                          Within 24-48 hours
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="mt-8 pt-6 border-t border-primary/10">
                    <h4 className="text-lg font-medium mb-4 text-foreground">Professional Networks</h4>
                    <div className="flex gap-4 justify-center">
                      <a
                        href="https://github.com/robert-nguyenn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors hover:scale-110 transform duration-300"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5 text-blue-400" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/robert-nguyenn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors hover:scale-110 transform duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 text-blue-400" />
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
              "relative p-8 rounded-2xl backdrop-blur-sm transition-all bg-card/80 border border-primary/20 shadow-xl",
              shake ? "animate-shake" : ""
            )}>
              {/* Floating message icon */}
              <div className="absolute -top-8 -right-8 w-16 h-16 flex items-center justify-center bg-blue-400 rounded-2xl shadow-lg rotate-12 transform hover:rotate-0 transition-transform duration-300 group">
                <Zap className="h-6 w-6 text-white transform -rotate-12 group-hover:rotate-0 transition-transform" />
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Get in Touch
                </h3>
                <p className="text-muted-foreground mb-6">Feel free to reach out about projects, opportunities, or technical discussions.</p>
                
                <div className="animate-item opacity-0 translate-y-4 transition-all duration-500" style={{transitionDelay: '100ms'}}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 ml-1 text-muted-foreground">
                    Your Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full p-4 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 backdrop-blur-sm placeholder:text-muted-foreground text-foreground"
                      placeholder="John Smith"
                    />
                  </div>
                </div>
                
                <div className="animate-item opacity-0 translate-y-4 transition-all duration-500" style={{transitionDelay: '200ms'}}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 ml-1 text-muted-foreground">
                    Your Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full p-4 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 backdrop-blur-sm placeholder:text-muted-foreground text-foreground"
                      placeholder="john.smith@example.com"
                    />
                  </div>
                </div>
                
                <div className="animate-item opacity-0 translate-y-4 transition-all duration-500" style={{transitionDelay: '300ms'}}>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 ml-1 text-muted-foreground">
                    Message
                  </label>
                  <div className="relative group">
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full p-4 bg-primary/5 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 backdrop-blur-sm resize-none placeholder:text-muted-foreground text-foreground"
                      placeholder="I'm reaching out regarding a potential project opportunity..."
                    ></textarea>
                  </div>
                </div>
                
                {/* Form status message */}
                {formStatus && (
                  <div className={cn(
                    "p-3 rounded-lg",
                    formStatus.type === "success" 
                      ? "bg-green-500/10 text-green-600 border border-green-500/30" 
                      : "bg-red-500/10 text-red-600 border border-red-500/30"
                  )}>
                    {formStatus.message}
                  </div>
                )}
                
                <div className="animate-item opacity-0 translate-y-4 transition-all duration-500" style={{transitionDelay: '400ms'}}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-4 font-medium text-base relative overflow-hidden rounded-xl",
                      "bg-gradient-to-r from-primary to-purple-600 text-primary-foreground",
                      "shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] group",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span className="tracking-wide">Sending message...</span>
                        </>
                      ) : (
                        <>
                          <span className="tracking-wide">Send Message</span>
                          <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}