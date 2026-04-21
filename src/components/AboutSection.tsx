const AboutSection = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-neon-green">Me</span>
            </h2>

            <p className="text-xl text-neon-green mb-8 font-semibold">
              Cybersecurity Enthusiast & AI Developer
            </p>
 
            <div className="space-y-6 text-lg md:text-xl text-gray-text leading-relaxed max-w-3xl mx-auto">
              <p>
                <span className="text-neon-green">Cybersecurity</span> enthusiast with a strong focus on securing systems, identifying <span className="text-neon-green">vulnerabilities</span>, and implementing modern <span className="text-neon-green">security</span> practices. I have hands-on experience in web application security, network analysis, and ethical hacking fundamentals.
              </p>
              <p>
                I build security-first applications and actively work on identifying real-world <span className="text-neon-green">vulnerabilities</span> through testing and research. Alongside <span className="text-neon-green">cybersecurity</span>, I develop intelligent <span className="text-neon-green">AI</span>-powered systems and automation tools, combining <span className="text-neon-green">security</span> with modern technologies.
              </p>
              <p>
                Passionate about continuous learning, I stay updated with evolving threats, tools, and defense strategies to build secure, scalable, and future-ready systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;