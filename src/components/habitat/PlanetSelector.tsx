import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PlanetData {
  id: string;
  name: string;
  gravity: string;
  atmosphere: string;
  temperature: string;
  radiation: string;
  color: string;
  gradient: string;
}

const planets: PlanetData[] = [
  {
    id: "mars",
    name: "Mars",
    gravity: "0.38g",
    atmosphere: "Thin CO₂",
    temperature: "-63°C avg",
    radiation: "Moderate",
    color: "from-orange-500 to-red-600",
    gradient: "bg-gradient-to-br from-orange-500/20 to-red-600/20"
  },
  {
    id: "moon",
    name: "Moon",
    gravity: "0.16g",
    atmosphere: "None",
    temperature: "-23°C avg",
    radiation: "High",
    color: "from-gray-400 to-gray-600",
    gradient: "bg-gradient-to-br from-gray-400/20 to-gray-600/20"
  },
  {
    id: "europa",
    name: "Europa",
    gravity: "0.13g",
    atmosphere: "Trace O₂",
    temperature: "-160°C avg",
    radiation: "Extreme",
    color: "from-blue-300 to-blue-600",
    gradient: "bg-gradient-to-br from-blue-300/20 to-blue-600/20"
  },
  {
    id: "titan",
    name: "Titan",
    gravity: "0.14g",
    atmosphere: "Dense N₂",
    temperature: "-179°C avg",
    radiation: "Low",
    color: "from-amber-600 to-orange-800",
    gradient: "bg-gradient-to-br from-amber-600/20 to-orange-800/20"
  },
  {
    id: "orbit",
    name: "Free Space Orbit",
    gravity: "0g",
    atmosphere: "Vacuum",
    temperature: "Variable",
    radiation: "High",
    color: "from-purple-500 to-blue-500",
    gradient: "bg-gradient-to-br from-purple-500/20 to-blue-500/20"
  }
];

interface PlanetSelectorProps {
  selectedPlanet: string;
  onSelectPlanet: (planetId: string) => void;
}

const PlanetSelector = ({ selectedPlanet, onSelectPlanet }: PlanetSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold text-glow">Select Environment</h2>
        <Badge variant="outline" className="border-primary/40">🌍🪐</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {planets.map((planet) => (
          <Card
            key={planet.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
              selectedPlanet === planet.id
                ? "border-primary shadow-[0_0_20px_rgba(125,95,255,0.5)]"
                : "border-border hover:border-primary/50"
            } ${planet.gradient}`}
            onClick={() => onSelectPlanet(planet.id)}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold bg-gradient-to-r ${planet.color} bg-clip-text text-transparent`}>
                  {planet.name}
                </h3>
                {selectedPlanet === planet.id && (
                  <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gravity:</span>
                  <span className="font-semibold">{planet.gravity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Atmosphere:</span>
                  <span className="font-semibold">{planet.atmosphere}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span className="font-semibold">{planet.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Radiation:</span>
                  <Badge variant={planet.radiation === "Extreme" || planet.radiation === "High" ? "destructive" : "secondary"}>
                    {planet.radiation}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanetSelector;
