import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const PortfolioSection = () => {
  const projects = [
    {
      id: 1,
      title: "Photon Collective",
      description: "A modern tech startup website with dark theme and neon accents. Built with Webflow, featuring responsive design and smooth animations.",
      image: project1,
      tags: ["Webflow", "UI/UX", "Responsive"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Fashion E-commerce",
      description: "Minimalist e-commerce platform for a fashion brand. Clean design with focus on product photography and user experience.",
      image: project2,
      tags: ["E-commerce", "React", "Design"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "SaaS dashboard with complex data visualization. Modern interface design with intuitive user experience and real-time updates.",
      image: project3,
      tags: ["Dashboard", "Data Viz", "SaaS"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            📂 My <span className="text-neon-green">Work</span>
          </h2>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            A collection of projects built with love, strategy, and creative impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-gradient-card border border-dark-border rounded-2xl overflow-hidden hover:shadow-neon transition-all duration-500 hover:scale-105 animate-fade-in"
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
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
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