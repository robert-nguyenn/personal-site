import React, { useState, useEffect } from "react";
import { AtSign, MessageSquare, Send, Github, Linkedin, Twitter, Phone } from "lucide-react";
import { cn } from "../lib/utils";

export const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isInView, setIsInView] = useState(false);

  // Animation trigger on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with timeout
    setTimeout(() => {
      // This would normally be your API call to send the email
      console.log("Form submitted:", formState);
      setSubmitStatus("success");
      setIsSubmitting(false);
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        message: ""
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Enhanced 3D background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl transform -translate-x-1/2 animate-float"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl transform translate-x-1/3 animate-float" style={{ animationDelay: "-3s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/5 rounded-full filter blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-subtle"></div>
        
        {/* Additional decorative elements */}
        <div className="hidden md:block absolute top-20 left-[20%] w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
        <div className="hidden md:block absolute bottom-40 right-[15%] w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
        <div className="hidden md:block absolute top-40 right-[20%] w-1.5 h-1.5 bg-primary/80 rounded-full shadow-md shadow-primary/40"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div 
          className={cn(
            "text-center mb-16 transition-all duration-1000 transform",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Get In <span className="text-primary relative inline-block">
              Touch
              <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration? 
            I'm always open to new opportunities and challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info - Now with 3D cards and animations */}
          <div 
            className={cn(
              "lg:col-span-2 space-y-6 transition-all duration-700 transform",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl border border-primary/20 hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary"/>
                  </span>
                  <span>Contact Information</span>
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-center gap-4 group/item">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                      <AtSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a 
                        href="mailto:robert@example.com" 
                        className="font-medium hover:text-primary transition-colors"
                      >
                        robert@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group/item">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="font-medium">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group/item">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a 
                        href="tel:+10000000000" 
                        className="font-medium hover:text-primary transition-colors"
                      >
                        +1 (000) 000-0000
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-medium mb-4">Connect with me</h4>
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/yourusername" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-card hover:bg-primary/10 border border-border hover:border-primary/50 transition-colors transform hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://linkedin.com/in/yourusername" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-card hover:bg-primary/10 border border-border hover:border-primary/50 transition-colors transform hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://twitter.com/yourusername" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-card hover:bg-primary/10 border border-border hover:border-primary/50 transition-colors transform hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Decorative bottom gradient */}
              <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-primary to-purple-500"></div>
            </div>
            
            {/* Additional message with 3D effect */}
            <div 
              className="relative p-6 rounded-xl bg-primary/5 backdrop-blur-sm overflow-hidden group hover:bg-primary/10 transition-all duration-300 shadow-lg border border-primary/10"
            >
              {/* 3D lighting effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none"></div>
              
              <p className="text-foreground relative z-10">
                Looking for a developer to bring your ideas to life? 
                Whether it's a website, web application, or a consultation, 
                I'd love to hear from you and create something amazing together!
              </p>
              
              {/* Animated corner accent */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary/20 rounded-tl-2xl transform rotate-45 group-hover:bg-primary/30 transition-colors"></div>
            </div>
          </div>
          
          {/* Contact Form with 3D effect and animations */}
          <div 
            className={cn(
              "lg:col-span-3 transition-all duration-700 transform",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl border border-primary/20 relative">
              {/* Top decorative gradient */}
              <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-primary to-blue-500"></div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="bg-primary/10 p-2 rounded-lg mr-3">
                    <Send className="h-5 w-5 text-primary" />
                  </span>
                  <span>Send a Message</span>
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/60 dark:bg-gray-900/60 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none transition-all"
                      placeholder="I'd like to discuss a project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full cosmic-button group relative overflow-hidden mt-2",
                      "shadow-lg hover:shadow-primary/30",
                      isSubmitting && "opacity-80 cursor-not-allowed"
                    )}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 py-1">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </button>
                  
                  {/* Form submission status */}
                  {submitStatus === "success" && (
                    <div className="mt-4 p-4 bg-green-500/20 text-green-700 dark:text-green-300 rounded-lg text-center animate-fade-in flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Your message has been sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="mt-4 p-4 bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg text-center animate-fade-in flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      There was an error sending your message. Please try again later.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};