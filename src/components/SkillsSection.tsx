import { Figma, Code2, Palette, Users } from "lucide-react";

const SkillsSection = () => {
  const skills = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Webflow",
      description: "I build fast, scalable, responsive sites with Webflow's powerful visual development platform.",
      level: "Expert"
    },
    {
      icon: <Figma className="w-8 h-8" />,
      title: "Figma",
      description: "UI/UX design with precision and empathy, creating user-centered digital experiences.",
      level: "Advanced"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Art Lead",
      description: "Creative direction for digital teams, ensuring cohesive brand experiences across all touchpoints.",
      level: "Expert"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Design",
      description: "Crafting memorable brand identities that resonate with target audiences and drive business growth.",
      level: "Advanced"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🧩 My <span className="text-neon-green">Skills</span>
          </h2>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            Tools I use to design, develop, and deliver results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                    <span className="text-xs font-semibold text-neon-green bg-neon-green/10 px-3 py-1 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-gray-text leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;