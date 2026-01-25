const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-neon-green">Me</span>
            </h2>
            
            <p className="text-xl text-neon-green mb-8 font-semibold">
              Creative Designer & Developer
            </p>
            
            <p className="text-lg md:text-xl text-gray-text leading-relaxed max-w-3xl mx-auto">
              I'm a passionate digital designer & front-end developer based in Bhubaneswar, Odisha. 
              I specialize in creating visually stunning, performance-driven web experiences 
              that solve real problems and inspire action. With a keen eye for design and 
              a deep understanding of modern web technologies, I bridge the gap between 
              beautiful aesthetics and functional excellence.
            </p>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green mb-2">5+</div>
                <div className="text-gray-text">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green mb-2">50+</div>
                <div className="text-gray-text">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green mb-2">100%</div>
                <div className="text-gray-text">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;