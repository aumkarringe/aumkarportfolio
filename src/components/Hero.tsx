import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      const progress = Math.min(Math.max(1 - (rect.bottom / windowHeight), 0), 1);
      setScrollProgress(progress);
      
      // Apply video effects based on scroll
      if (videoRef.current) {
        const scale = 1 + progress * 0.5;
        const blur = progress * 10;
        const opacity = Math.max(0.3, 1 - progress * 0.7);
        
        videoRef.current.style.transform = `scale(${scale})`;
        videoRef.current.style.filter = `blur(${blur}px) brightness(${0.5 + progress * 0.3})`;
        videoRef.current.style.opacity = `${opacity}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-out mix-blend-overlay dark:mix-blend-screen"
          style={{
            transformOrigin: 'center center',
          }}
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Theme-aware overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background dark:from-background/90 dark:via-background/70 dark:to-background" />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"
            style={{
              opacity: 0.4 - scrollProgress * 0.3,
              transform: `scale(${1 + scrollProgress * 0.5})`
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: '0.7s',
              opacity: 0.4 - scrollProgress * 0.3,
              transform: `scale(${1 + scrollProgress * 0.5})`
            }}
          />
        </div>
      </div>

      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-up">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              Hi, I'm <span className="text-gradient">Aumkar</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              Frontend Developer | AI/ML Enthusiast | Full Stack Engineer
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Creating unique digital experiences where art meets code
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/50 hover:border-primary hover:bg-primary/10 text-lg px-8"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-primary" />
        </div>
      </div>
    </section>
  );
};
