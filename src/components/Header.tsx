import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

type NavItem = {
  name: string;
  /** Route this item belongs to. */
  to: string;
  /** Optional section on that route ("#about"), scrolled to after navigation. */
  hash?: string;
};

const navigation: NavItem[] = [
  { name: "Home", to: "/" },
  { name: "About", to: "/", hash: "#about" },
  { name: "Student Lancer", to: "/student-lancer" },
  { name: "Services", to: "/services" },
  { name: "Cybersecurity", to: "/cybersecurity" },
  { name: "Education", to: "/education" },
  { name: "My Work", to: "/projects" },
  { name: "Contact", to: "/", hash: "#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (item: NavItem) => !item.hash && pathname === item.to;

  const handleNavigate = (item: NavItem) => {
    setIsMenuOpen(false);

    if (!item.hash) {
      navigate(item.to);
      return;
    }

    // Already on the page that owns the section — just scroll to it.
    if (pathname === item.to) {
      document.querySelector(item.hash)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Otherwise go to the page first; ScrollToTop handles the scroll on arrival.
    navigate(`${item.to}${item.hash}`);
  };

  const goToContact = () => {
    setIsMenuOpen(false);

    if (pathname === "/") {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/#contact");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-bold font-tech">
              <span className="text-foreground">Biranchi</span>
              <span className="text-neon-green">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item)}
                className={`transition-colors duration-300 font-medium ${
                  isActive(item) ? "text-neon-green" : "text-gray-text hover:text-neon-green"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={goToContact}
              className="bg-neon-green text-dark-bg hover:shadow-neon-strong font-semibold transition-all duration-300"
            >
              Contact Me
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-gray-text hover:text-neon-green transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-surface/95 backdrop-blur-md rounded-lg mt-2 border border-dark-border">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item)}
                  className={`block px-3 py-2 transition-colors duration-300 font-medium w-full text-left ${
                    isActive(item) ? "text-neon-green" : "text-gray-text hover:text-neon-green"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Button
                  onClick={goToContact}
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
