import { Sparkles } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";

const Services = () => {
  return (
    <PageLayout
      eyebrow="What I Do"
      eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={
        <>
          My <span className="text-neon-green">Specialized</span> Services
        </>
      }
      description="High-impact security solutions and next-gen AI agent development — built to be secure, scalable and delivered error-free."
    >
      <ServicesSection showHeading={false} />
      <SkillsSection />
    </PageLayout>
  );
};

export default Services;
