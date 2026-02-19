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
              Creative Designer & Developer
            </p>

            <div className="space-y-6 text-lg md:text-xl text-gray-text leading-relaxed max-w-3xl mx-auto">
              <p>
                I am a versatile Full-Stack Developer and Creative Designer based in Bhubaneswar, Odisha.
                My expertise lies in building intelligent applications through <span className="text-neon-green">AI & LLM integration</span>,
                robust backend systems, and native <span className="text-neon-green">Android development</span>.
              </p>
              <p>
                I don't just write code; I design experiences. With advanced proficiency in <span className="text-neon-green">Figma</span> and <span className="text-neon-green">Webflow</span>,
                I craft compelling brand identities and intuitive user interfaces. I bridge the gap between
                complex engineering and elegant design, delivering scalable digital solutions that leave a lasting impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;