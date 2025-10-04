import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HabitatForm from "@/components/habitat/HabitatForm";
import HabitatVisualization from "@/components/habitat/HabitatVisualization";
import HabitatResults from "@/components/habitat/HabitatResults";
import { Rocket } from "lucide-react";

export interface HabitatDesign {
  volumeRequired: string;
  recommendedModules: string[];
  layout: {
    description: string;
    zones: string[];
  };
  criticalSystems: string[];
  missingSystems: string[];
  specialConsiderations: string[];
  costEstimate: string;
  constructionTime: string;
  rawResponse?: string;
}

export interface HabitatInputs {
  planet: string;
  residents: number;
  size: string;
  shape: string;
  purpose: string;
  lifestyle: string;
  systems: string[];
  notes: string;
}

const HabitatDesigner = () => {
  const [design, setDesign] = useState<HabitatDesign | null>(null);
  const [inputs, setInputs] = useState<HabitatInputs | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDesignGenerated = (designData: HabitatDesign, inputData: HabitatInputs) => {
    setDesign(designData);
    setInputs(inputData);
  };

  const handleReset = () => {
    setDesign(null);
    setInputs(null);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
              <Rocket className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">AI-Powered Design</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-glow">
              Space Habitat
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Designer
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Design your ideal space habitat with AI-powered recommendations
              tailored to your needs and environment
            </p>
          </div>

          {!design ? (
            <HabitatForm 
              onDesignGenerated={handleDesignGenerated} 
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <div className="space-y-8">
              <HabitatVisualization inputs={inputs!} design={design} />
              <HabitatResults design={design} inputs={inputs!} onReset={handleReset} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HabitatDesigner;
