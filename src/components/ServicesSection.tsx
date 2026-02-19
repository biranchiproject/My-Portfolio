import { useState } from "react";
import { ChevronDown, Code, Palette, Target, Users, Smartphone, Brain, Server, Layers, Rocket } from "lucide-react";

const ServicesSection = () => {
  const [openService, setOpenService] = useState<number | null>(0);

  const services = [
    {
      id: 0,
      icon: <Code className="w-6 h-6" />,
      title: "Website Development",
      description: "Building fast, scalable, and responsive websites",
      details: [
        "Webflow Development",
        "CMS Implementation",
        "Responsive Design",
        "Web Performance Optimization",
        "Basic E-commerce Solutions"
      ]
    },
    {
      id: 1,
      icon: <Smartphone className="w-6 h-6" />,
      title: "Basic Android Development",
      description: "Building functional and user-friendly Android applications",
      details: [
        "Basic Java & Kotlin",
        "Basic API Integration",
        "Basic App Maintenance"
      ]
    },
    {
      id: 2,
      icon: <Brain className="w-6 h-6" />,
      title: "AI & LLM Development",
      description: "Building intelligent applications using latest AI technologies",
      details: [
        "RAG Implementation",
        "LLM Integration (GPT, Claude, Llama)",
        "Prompt Engineering",
        "AI Agents & Chatbots",
        "Document Intelligence"
      ]
    },
    {
      id: 3,
      icon: <Server className="w-6 h-6" />,
      title: "Basic Backend Development",
      description: "Designing scalable and secure server-side architectures",
      details: [
        "RESTful API Design",
        "Database Management (SQL/NoSQL)",
        "Authentication & Security",
        "Microservices",
        "Serverless Functions"
      ]
    },
    {
      id: 4,
      icon: <Layers className="w-6 h-6" />,
      title: "Full-Stack Engineering",
      description: "End-to-end web application development",
      details: [
        "React/Next.js Frontend",
        "Node.js/Python Backend",
        "State Management",
        "API Integration",
        "Performance Tuning"
      ]
    },
    {
      id: 5,
      icon: <Rocket className="w-6 h-6" />,
      title: "Basic Deployment & DevOps",
      description: "Streamlining development and production workflows",
      details: [
        "CI/CD Pipelines",
        "Docker Containerization",
        "Cloud Hosting (AWS/GCP/Azure)",
        "Server Configuration",
        "Monitoring & Logging"
      ]
    },
    {
      id: 6,
      icon: <Palette className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user experiences",
      details: [
        "User Interface Design",
        "User Experience Research",
        "Wireframing & Prototyping",
        "Design Systems",
        "Usability Testing"
      ]
    },
    {
      id: 7,
      icon: <Target className="w-6 h-6" />,
      title: "Brand Design",
      description: "Developing cohesive brand identities that resonate",
      details: [
        "Logo Design",
        "Brand Guidelines",
        "Visual Identity Systems",
        "Marketing Materials",
        "Brand Strategy"
      ]
    },
    {
      id: 8,
      icon: <Users className="w-6 h-6" />,
      title: "Art Lead",
      description: "Leading creative teams to deliver exceptional results",
      details: [
        "Creative Direction",
        "Team Leadership",
        "Project Management",
        "Quality Assurance",
        "Client Communication"
      ]
    }
  ];

  const toggleService = (id: number) => {
    setOpenService(openService === id ? null : id);
  };

  return (
    <section id="services" className="py-12 md:py-20 bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🚀 My <span className="text-neon-green">Services</span>
          </h2>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            I help brands and individuals elevate their digital presence through strategy, design, and development.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gradient-card border border-dark-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-neon"
            >
              <button
                onClick={() => toggleService(service.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-dark-surface/50 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-neon-green">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {service.title}
                    </h3>
                    <p className="text-gray-text">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-neon-green transition-transform duration-300 ${openService === service.id ? "transform rotate-180" : ""
                    }`}
                />
              </button>

              {openService === service.id && (
                <div className="px-6 pb-6 border-t border-dark-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {service.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-gray-text"
                      >
                        <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;