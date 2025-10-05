import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SimulationPanelProps {
  crewCount: number;
  moduleCount: number;
}

const SimulationPanel = ({ crewCount, moduleCount }: SimulationPanelProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [simTime, setSimTime] = useState(0); // in days
  const [metrics, setMetrics] = useState({
    sustainability: 85,
    crewMorale: 90,
    systemHealth: 95,
    resourceEfficiency: 88
  });

  const startSimulation = () => {
    setIsRunning(true);
    // Simulate time passing - faster animation
    const interval = setInterval(() => {
      setSimTime(prev => {
        if (prev >= 365) {
          clearInterval(interval);
          setIsRunning(false);
          return 365;
        }
        return prev + 2; // Faster progression
      });

      // Simulate metric changes
      setMetrics(prev => ({
        sustainability: Math.max(60, prev.sustainability - Math.random() * 0.3),
        crewMorale: Math.max(70, prev.crewMorale - Math.random() * 0.2),
        systemHealth: Math.max(80, prev.systemHealth - Math.random() * 0.15),
        resourceEfficiency: Math.max(75, prev.resourceEfficiency - Math.random() * 0.25)
      }));
    }, 30); // Faster update rate
  };

  const pauseSimulation = () => {
    setIsRunning(false);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setSimTime(0);
    setMetrics({
      sustainability: 85,
      crewMorale: 90,
      systemHealth: 95,
      resourceEfficiency: 88
    });
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return "text-green-500";
    if (value >= 60) return "text-yellow-500";
    return "text-destructive";
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          Habitat Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Display */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
          <div className="text-sm text-muted-foreground mb-2">Simulation Time</div>
          <div className="text-3xl font-bold text-primary">
            Day {Math.floor(simTime)} / 365
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            ({(simTime / 365 * 12).toFixed(1)} months)
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!isRunning ? (
            <Button onClick={startSimulation} className="flex-1" disabled={crewCount === 0 || moduleCount === 0}>
              <Play className="w-4 h-4 mr-2" />
              Start Simulation
            </Button>
          ) : (
            <Button onClick={pauseSimulation} className="flex-1" variant="secondary">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={resetSimulation} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {crewCount === 0 && (
          <div className="text-sm text-muted-foreground text-center">
            Add crew members to run simulation
          </div>
        )}

        {moduleCount === 0 && crewCount > 0 && (
          <div className="text-sm text-muted-foreground text-center">
            Place modules on canvas to run simulation
          </div>
        )}

        {/* Metrics */}
        {crewCount > 0 && moduleCount > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Performance Metrics</h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sustainability Score</span>
                  <Badge className={getMetricColor(metrics.sustainability)}>
                    {metrics.sustainability.toFixed(0)}%
                  </Badge>
                </div>
                <Progress value={metrics.sustainability} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Crew Morale</span>
                  <Badge className={getMetricColor(metrics.crewMorale)}>
                    {metrics.crewMorale.toFixed(0)}%
                  </Badge>
                </div>
                <Progress value={metrics.crewMorale} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>System Health</span>
                  <Badge className={getMetricColor(metrics.systemHealth)}>
                    {metrics.systemHealth.toFixed(0)}%
                  </Badge>
                </div>
                <Progress value={metrics.systemHealth} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Resource Efficiency</span>
                  <Badge className={getMetricColor(metrics.resourceEfficiency)}>
                    {metrics.resourceEfficiency.toFixed(0)}%
                  </Badge>
                </div>
                <Progress value={metrics.resourceEfficiency} className="h-2" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimulationPanel;
