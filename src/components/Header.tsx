import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCv = async () => {
      try {
        console.log("Fetching CV from backend...");
        const response = await fetch("http://127.0.0.1:8000/cv");
        if (response.ok) {
          const data = await response.json();
          console.log("CV Data received:", data);
          setCvUrl(data.file_url);
        } else {
          console.error("Failed to fetch CV, status:", response.status);
        }
      } catch (error) {
        console.error("Fetch CV error:", error);
      }
    };
    fetchCv();
  }, []);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Cybersecurity", href: "#cybersecurity" },
    { name: "Education", href: "#education" },
    { name: "My Work", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact Me", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold font-tech">
              <span className="text-foreground">Biranchi</span>
              <span className="text-neon-green">.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-text hover:text-neon-green transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-neon-green text-dark-bg hover:shadow-neon-strong font-semibold transition-all duration-300"
            >
              Contact Me
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-text hover:text-neon-green transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-surface/95 backdrop-blur-md rounded-lg mt-2 border border-dark-border">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block px-3 py-2 text-gray-text hover:text-neon-green transition-colors duration-300 font-medium w-full text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Button
                  onClick={() => scrollToSection("#contact")}
                  className="w-full bg-neon-green text-dark-bg hover:shadow-neon-strong font-semibold transition-all duration-300"
                >
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;