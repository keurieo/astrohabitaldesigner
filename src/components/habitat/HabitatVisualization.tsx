import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HabitatDesign, HabitatInputs } from "@/pages/HabitatDesigner";

interface HabitatVisualizationProps {
  inputs: HabitatInputs;
  design: HabitatDesign;
}

const HabitatVisualization = ({ inputs, design }: HabitatVisualizationProps) => {
  const getShapeStyle = (shape: string) => {
    switch (shape) {
      case "cylindrical":
        return "rounded-lg";
      case "dome":
        return "rounded-t-full";
      case "inflatable":
        return "rounded-3xl";
      default:
        return "rounded-xl";
    }
  };

  const getModuleColor = (index: number) => {
    const colors = [
      "bg-primary/20 border-primary/40",
      "bg-secondary/20 border-secondary/40",
      "bg-accent/20 border-accent/40",
      "bg-primary/30 border-primary/50",
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Habitat Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Habitat Structure */}
          <div className="relative bg-gradient-to-b from-background to-muted/20 rounded-xl p-8 min-h-[400px] flex items-center justify-center border border-border">
            {/* Habitat Shape Representation */}
            <div
              className={`relative ${getShapeStyle(inputs.shape)} border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 p-8`}
              style={{
                width: inputs.size === "small" ? "200px" : inputs.size === "large" ? "400px" : "300px",
                height: inputs.size === "small" ? "200px" : inputs.size === "large" ? "400px" : "300px",
              }}
            >
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent/30 border-2 border-accent/50 flex items-center justify-center">
                <span className="text-xs text-accent font-semibold">Core</span>
              </div>

              {/* Module Indicators */}
              {design.recommendedModules.slice(0, 8).map((module, index) => {
                const angle = (index * 45 * Math.PI) / 180;
                const radius = inputs.size === "small" ? 60 : inputs.size === "large" ? 120 : 90;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={index}
                    className={`absolute w-12 h-12 rounded-lg ${getModuleColor(index)} border-2 flex items-center justify-center text-[8px] text-center p-1 font-medium`}
                    style={{
                      left: `calc(50% + ${x}px - 24px)`,
                      top: `calc(50% + ${y}px - 24px)`,
                    }}
                    title={module}
                  >
                    <span className="line-clamp-3">{module.split(" ")[0]}</span>
                  </div>
                );
              })}
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 space-y-1">
              <div className="text-sm font-semibold text-primary">
                {inputs.planet.charAt(0).toUpperCase() + inputs.planet.slice(1)} Base
              </div>
              <div className="text-xs text-muted-foreground">
                {inputs.residents} Residents • {inputs.shape} Design
              </div>
            </div>

            {/* Volume Indicator */}
            <div className="absolute bottom-4 right-4 bg-primary/10 border border-primary/30 rounded-lg px-3 py-2">
              <div className="text-xs text-muted-foreground">Volume</div>
              <div className="text-sm font-bold text-primary">{design.volumeRequired}</div>
            </div>
          </div>

          {/* Module Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {design.recommendedModules.slice(0, 8).map((module, index) => (
              <div
                key={index}
                className={`${getModuleColor(index)} border-2 rounded-lg p-3 text-center`}
              >
                <div className="text-xs font-medium line-clamp-2">{module}</div>
              </div>
            ))}
          </div>

          {/* Zone Layout */}
          {design.layout.zones.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Recommended Zones:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {design.layout.zones.map((zone, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 border border-border rounded-lg p-3 text-sm"
                  >
                    {zone}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitatVisualization;
