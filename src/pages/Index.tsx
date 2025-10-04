import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PlanetsSection from "@/components/PlanetsSection";
import SpaceDataSection from "@/components/SpaceDataSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <PlanetsSection />
      <SpaceDataSection />
      <Footer />
    </div>
  );
};

export default Index;
