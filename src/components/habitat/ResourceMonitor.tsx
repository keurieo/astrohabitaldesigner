import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Battery, Droplets, Leaf, ThermometerSun } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResourceData {
  power: { current: number; max: number; unit: string };
  water: { current: number; max: number; unit: string };
  oxygen: { current: number; max: number; unit: string };
  temperature: { current: number; optimal: number; unit: string };
}

interface ResourceMonitorProps {
  resources: ResourceData;
  warnings?: string[];
}

const ResourceMonitor = ({ resources, warnings = [] }: ResourceMonitorProps) => {
  const getStatusColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage > 80) return "text-destructive";
    if (percentage > 60) return "text-yellow-500";
    return "text-green-500";
  };

  const getProgressColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage > 80) return "bg-destructive";
    if (percentage > 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Battery className="w-5 h-5 text-accent" />
          Resource Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Power */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">Power Consumption</span>
            </div>
            <Badge variant="outline" className={getStatusColor(resources.power.current, resources.power.max)}>
              {resources.power.current}/{resources.power.max} {resources.power.unit}
            </Badge>
          </div>
          <Progress 
            value={(resources.power.current / resources.power.max) * 100}
            className="h-2"
          />
        </div>

        {/* Water */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="font-semibold">Water Usage</span>
            </div>
            <Badge variant="outline" className={getStatusColor(resources.water.current, resources.water.max)}>
              {resources.water.current}/{resources.water.max} {resources.water.unit}
            </Badge>
          </div>
          <Progress 
            value={(resources.water.current / resources.water.max) * 100}
            className="h-2"
          />
        </div>

        {/* Oxygen */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-500" />
              <span className="font-semibold">Oxygen Production</span>
            </div>
            <Badge variant="outline" className={getStatusColor(resources.oxygen.current, resources.oxygen.max)}>
              {resources.oxygen.current}/{resources.oxygen.max} {resources.oxygen.unit}
            </Badge>
          </div>
          <Progress 
            value={(resources.oxygen.current / resources.oxygen.max) * 100}
            className="h-2"
          />
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThermometerSun className="w-4 h-4 text-orange-500" />
              <span className="font-semibold">Temperature</span>
            </div>
            <Badge variant="outline">
              {resources.temperature.current}{resources.temperature.unit} (Optimal: {resources.temperature.optimal}{resources.temperature.unit})
            </Badge>
          </div>
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="space-y-2">
            {warnings.map((warning, index) => (
              <Alert key={index} variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{warning}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {warnings.length === 0 && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
            <span className="text-green-500 font-semibold">✓ All Systems Nominal</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceMonitor;
