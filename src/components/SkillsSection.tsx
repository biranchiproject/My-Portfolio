import { Brain, Server, Layers, Rocket, Figma, Code2, Palette, Users, Smartphone, Database, ShieldCheck } from "lucide-react";

const SkillsSection = () => {
  const skills = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Cybersecurity & Ethical Hacking",
      description: "Securing web applications, identifying vulnerabilities, and performing penetration testing using tools like Nmap, Wireshark, and Burp Suite. Focused on protecting systems against XSS, SQL Injection, and modern cyber threats."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Basics of Python",
      description: "Knowledge of basic Python programming, used for scripting, automated workflows, and problem-solving. Exploring AI integration and security scripting through Python."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI & LLM Development",
      description: "Building intelligent applications using Retrieval-Augmented Generation (RAG), LLM integrations (local and API-based), prompt engineering, and document-grounded AI systems."
    },


    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Deployment & DevOps",
      description: "Managing production deployments, server configuration, environment setup, and performance optimization for reliable and scalable applications."
    },


    {
      icon: <Figma className="w-8 h-8" />,
      title: "Figma",
      description: "UI/UX design with precision and empathy, creating user-centered digital experiences."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Art Lead",
      description: "Creative direction for digital teams, ensuring cohesive brand experiences across all touchpoints."
    },

  ];

  return (
    <section id="skills" className="py-12 md:py-20 bg-gradient-dark relative overflow-hidden">
      {/* Animated ribbon text - Background */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden pointer-events-none opacity-20">
        <div className="whitespace-nowrap text-6xl md:text-8xl font-bold text-neon-green/10 animate-scroll-horizontal" style={{ animationDuration: "30s" }}>
          Skills Skills Skills Skills Skills Skills Skills Skills Skills Skills
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🧩 My <span className="text-neon-green">Skills</span>
          </h2>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            Tools I use to design, develop, and deliver results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group bg-gradient-card border border-dark-border rounded-2xl p-8 hover:shadow-neon transition-all duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="text-neon-green group-hover:animate-glow transition-all duration-300">
                  {skill.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-foreground">
                      {skill.title}
                    </h3>
                  </div>
                  <p className="text-gray-text leading-relaxed">
                    {skill.description}
                  </p>
                  {skill.points && (
                    <ul className="mt-4 space-y-2">
                      {skill.points.map((point, i) => (
                        <li key={i} className="flex items-center text-gray-text text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-green mr-2 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none"></div>
    </section>
  );
};

export default SkillsSection;