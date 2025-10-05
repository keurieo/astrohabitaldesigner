import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PlanetSelector from "@/components/habitat/PlanetSelector";
import CrewManager, { CrewMember } from "@/components/habitat/CrewManager";
import ModulePalette from "@/components/habitat/ModulePalette";
import DesignCanvas from "@/components/habitat/DesignCanvas";
import ResourceMonitor from "@/components/habitat/ResourceMonitor";
import Habitat3DView from "@/components/habitat/Habitat3DView";
import SimulationPanel from "@/components/habitat/SimulationPanel";
import { Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PlacedModule {
  id: string;
  type: string;
  name: string;
  icon: string;
  size: { width: number; height: number };
  color: string;
  resources: { power: number; maintenance: number };
  position: { x: number; y: number };
  placedId: string;
}

const HabitatDesigner = () => {
  const [selectedPlanet, setSelectedPlanet] = useState("mars");
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [placedModules, setPlacedModules] = useState<PlacedModule[]>([]);

  const totalCrew = crew.reduce((sum, member) => sum + member.count, 0);

  // Calculate resources
  const calculateResources = () => {
    const powerUsed = placedModules.reduce((sum, m) => sum + m.resources.power, 0);
    const powerMax = 100;

    const waterUsed = totalCrew * 3;
    const waterMax = 50;

    const oxygenUsed = totalCrew * 0.8;
    const oxygenMax = 30;

    return {
      power: { current: powerUsed, max: powerMax, unit: "kW" },
      water: { current: waterUsed, max: waterMax, unit: "L/day" },
      oxygen: { current: oxygenUsed, max: oxygenMax, unit: "kg/day" },
      temperature: { current: 21, optimal: 22, unit: "°C" }
    };
  };

  // Generate warnings
  const generateWarnings = () => {
    const warnings: string[] = [];
    const resources = calculateResources();

    if (resources.power.current > resources.power.max * 0.8) {
      warnings.push("⚠️ Power consumption exceeds 80% capacity");
    }
    if (resources.water.current > resources.water.max * 0.8) {
      warnings.push("⚠️ Water usage exceeds 80% capacity");
    }
    if (resources.oxygen.current > resources.oxygen.max * 0.8) {
      warnings.push("⚠️ Oxygen production below required levels");
    }
    if (totalCrew > 0 && placedModules.length === 0) {
      warnings.push("⚠️ No habitat modules placed - crew has no living space");
    }

    return warnings;
  };

  const handlePlaceModule = (module: PlacedModule) => {
    setPlacedModules([...placedModules, module]);
    toast.success(`${module.name} added to habitat`);
  };

  const handleRemoveModule = (placedId: string) => {
    setPlacedModules(placedModules.filter(m => m.placedId !== placedId));
    toast.info("Module removed");
  };

  const handleSaveDesign = () => {
    toast.success("Habitat design saved!", {
      description: `${placedModules.length} modules, ${totalCrew} crew members`
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
                <Rocket className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground">Interactive Design Platform</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-glow">
                AstroHabitat
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  Designer
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Design, simulate, and visualize your ideal space habitat with real-time 3D rendering and AI-powered optimization
              </p>
            </div>

            {/* Planet Selection */}
            <div className="mb-8">
              <PlanetSelector 
                selectedPlanet={selectedPlanet}
                onSelectPlanet={setSelectedPlanet}
              />
            </div>

            {/* Main Design Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Left Column - Tools */}
              <div className="space-y-6">
                <ModulePalette />
                <ResourceMonitor 
                  resources={calculateResources()}
                  warnings={generateWarnings()}
                />
              </div>

              {/* Middle Column - Canvas */}
              <div className="lg:col-span-2 space-y-6">
                <DesignCanvas
                  placedModules={placedModules}
                  onPlaceModule={handlePlaceModule}
                  onRemoveModule={handleRemoveModule}
                />
                
                <Habitat3DView 
                  planet={selectedPlanet}
                  moduleCount={placedModules.length}
                />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CrewManager crew={crew} onUpdateCrew={setCrew} />
              <SimulationPanel crewCount={totalCrew} moduleCount={placedModules.length} />
            </div>

            {/* Save Button */}
            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={handleSaveDesign}
                disabled={placedModules.length === 0}
              >
                <Sparkles className="w-5 h-5" />
                Save Habitat Design
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </DndProvider>
  );
};

export default HabitatDesigner;
