import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, ShieldCheck, PackageCheck, Handshake, ArrowRight } from "lucide-react";

type Highlight = {
  icon: JSX.Element;
  title: string;
  description: string;
  /** Optional internal route the card links to. */
  to?: string;
};

const AboutSection = () => {
  const highlights: Highlight[] = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Freelancing with StudentLancer",
      description:
        "I take on client projects through StudentLancer and own them from the first call to the final handover.",
      to: "/student-lancer"
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Security-First Development",
      description:
        "Hands-on with web application security, network analysis and ethical hacking fundamentals — security is built in, not bolted on."
    },
    {
      icon: <PackageCheck className="w-5 h-5" />,
      title: "Error-Free Project Delivery",
      description:
        "I test every build until it runs clean — no broken flows, no console errors — before it ever reaches the client."
    },
    {
      icon: <Handshake className="w-5 h-5" />,
      title: "Complete Client Handover",
      description:
        "Source code, hosting, admin access and a full walkthrough, plus post-launch support so the client owns the product entirely."
    }
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-neon-green">Me</span>
            </h2>

            <p className="text-xl text-neon-green mb-8 font-semibold">
              Freelance Developer at StudentLancer · Cybersecurity Enthusiast &amp; AI Developer
            </p>

            <div className="space-y-6 text-lg md:text-xl text-gray-text leading-relaxed max-w-3xl mx-auto">
              <p>
                I work as a <span className="text-neon-green">freelance developer</span> with{" "}
                <a
                  href="https://www.studentlancer.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green underline underline-offset-4 hover:text-foreground transition-colors duration-300"
                >
                  StudentLancer
                </a>
                , a digital studio that designs and ships websites, products and brands for startups and growing
                businesses. Every project I take there I handle personally — client discovery, design, engineering,
                testing and delivery.
              </p>
              <p>
                <span className="text-neon-green">Cybersecurity</span> enthusiast with a strong focus on securing
                systems, identifying <span className="text-neon-green">vulnerabilities</span>, and implementing modern{" "}
                <span className="text-neon-green">security</span> practices. I have hands-on experience in web
                application security, network analysis, and ethical hacking fundamentals.
              </p>
              <p>
                I build security-first applications and actively work on identifying real-world{" "}
                <span className="text-neon-green">vulnerabilities</span> through testing and research. Alongside{" "}
                <span className="text-neon-green">cybersecurity</span>, I develop intelligent{" "}
                <span className="text-neon-green">AI</span>-powered systems and automation tools, combining{" "}
                <span className="text-neon-green">security</span> with modern technologies.
              </p>
              <p>
                Beyond the code, my real hands-on experience is in{" "}
                <span className="text-neon-green">working directly with clients</span> — understanding what a business
                actually needs, keeping them updated at every milestone, and handing over a{" "}
                <span className="text-neon-green">completely error-free</span>, fully tested and documented product they
                can own and run on their own. Delivering on time, with post-launch support, is part of how I work.
              </p>
              <p>
                Passionate about continuous learning, I stay updated with evolving threats, tools, and defense
                strategies to build secure, scalable, and future-ready systems.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-16">
          {highlights.map((item, index) => {
            const content = (
              <>
                <div className="w-11 h-11 rounded-xl bg-neon-green/10 border border-neon-green/20 text-neon-green flex items-center justify-center flex-shrink-0 group-hover:bg-neon-green group-hover:text-dark-bg transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-neon-green transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-text leading-relaxed">{item.description}</p>
                  {item.to && (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-neon-green mt-4">
                      See the full story
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  )}
                </div>
              </>
            );

            const cardClasses =
              "group flex items-start gap-4 bg-gradient-card border border-dark-border rounded-2xl p-6 text-left hover:border-neon-green/40 hover:shadow-neon transition-all duration-500";

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="h-full"
              >
                {item.to ? (
                  <Link to={item.to} className={`${cardClasses} h-full`}>
                    {content}
                  </Link>
                ) : (
                  <div className={`${cardClasses} h-full`}>{content}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
