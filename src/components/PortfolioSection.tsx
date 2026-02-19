import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import project2 from "@/assets/project-2.png";
import { useNavigate } from "react-router-dom";

const PortfolioSection = () => {
  const navigate = useNavigate();
  const projects = [
    {
      id: 1,
      title: "Sona Store",
      description: "A dynamic app store platform featuring a vast library of applications, seamless downloads, and an intuitive, modern interface similar to the Play Store.",
      image: project2,
      tags: ["App Store", "React", "Web App"],
      liveUrl: "https://sona-store.pages.dev/",
      githubUrl: "#"
    }
  ];

  return (
    <section id="portfolio" className="py-12 md:py-20 bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            📂 My <span className="text-neon-green">Work</span>
          </h2>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            A collection of projects built with love, strategy, and creative impact.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="w-full max-w-sm lg:max-w-md group bg-gradient-card border border-dark-border rounded-2xl overflow-hidden hover:shadow-neon transition-all duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-neon-green transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-text mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-semibold text-neon-green bg-neon-green/10 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-neon-green text-dark-bg hover:shadow-neon font-semibold transition-all duration-300"
                    onClick={() => window.open(project.liveUrl, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live
                  </Button>
                  <Button
                    variant="outline"
                    className="border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/projects")}
            variant="outline"
            className="border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg font-semibold px-8 py-3 text-lg transition-all duration-300"
          >
            View More Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;