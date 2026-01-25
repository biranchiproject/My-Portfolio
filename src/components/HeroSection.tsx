import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden">
      {/* Animated ribbon text */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden">
        <div className="whitespace-nowrap text-6xl md:text-8xl font-bold text-neon-green/10 animate-scroll-horizontal">
          Portfolio Portfolio Portfolio Portfolio Portfolio Portfolio
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          {/* Greeting */}
          <p className="text-gray-text text-lg mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Hi! I'm Biranchi | Based in Bhubaneswar, Odisha
          </p>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <span className="text-neon-green">Creative</span>{" "}
            <span className="text-foreground">Designer &</span>
            <br />
            <span className="text-foreground">Developer</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-text max-w-3xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            I build designs that solve problems, inspire action, and drive success.
          </p>

          {/* Profile Photo */}
          <div className="flex justify-center mb-12 animate-scale-in" style={{ animationDelay: "0.8s" }}>
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-neon-green shadow-neon-strong animate-float">
                <img
                  src={profilePhoto}
                  alt="Biranchi - Creative Designer & Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-neon-green animate-glow"></div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: "1s" }}>
            <Button
              onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-neon-green text-dark-bg hover:shadow-neon-strong font-semibold px-8 py-3 text-lg transition-all duration-300"
            >
              View My Work
            </Button>
            <Button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              className="border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg font-semibold px-8 py-3 text-lg transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>

          {/* Scroll Down Indicator */}
          <button
            onClick={scrollToAbout}
            className="inline-flex flex-col items-center text-gray-text hover:text-neon-green transition-colors duration-300 animate-bounce"
            style={{ animationDelay: "1.2s" }}
          >
            <span className="text-sm mb-2">Scroll Down to Explore More</span>
            <ChevronDown size={24} />
          </button>
        </div>
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;