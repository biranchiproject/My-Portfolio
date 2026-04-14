import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "About Us", href: "#about" },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/settings/profile", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/biranchi-narayan-sahoo-98b695390/", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/biranchi._.sahoo?igsh=MWE4aWM0NWt4ZmRmbg==", label: "Instagram" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:sahoobiranchi8249@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold font-tech">
                <span className="text-foreground">Biranchi</span>
                <span className="text-neon-green">.</span>
              </span>
            </div>
            <p className="text-gray-text leading-relaxed max-w-md">
              Creative Designer & Developer based in Cuttack, Odisha.
              Building digital experiences that inspire and drive success.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-text hover:text-neon-green transition-colors duration-300 p-2 rounded-lg hover:bg-neon-green/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-text hover:text-neon-green transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-text text-sm mb-4">
              Get notified about new projects and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-dark-surface border border-dark-border rounded-lg sm:rounded-r-none text-foreground text-sm focus:outline-none focus:border-neon-green"
              />
              <button className="px-4 py-2 bg-neon-green text-dark-bg rounded-lg sm:rounded-l-none hover:shadow-neon transition-all duration-300 text-sm font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-gray-text text-sm">
            ©{currentYear} Biranchi Creativity | ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;