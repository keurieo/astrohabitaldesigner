import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Clock, DollarSign, Lightbulb } from "lucide-react";
import { HabitatDesign, HabitatInputs } from "@/pages/HabitatDesigner";

interface HabitatResultsProps {
  design: HabitatDesign;
  inputs: HabitatInputs;
  onReset: () => void;
}

const HabitatResults = ({ design, inputs, onReset }: HabitatResultsProps) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Construction Time</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{design.constructionTime}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{design.costEstimate}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <Lightbulb className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{design.volumeRequired}</div>
          </CardContent>
        </Card>
      </div>

      {/* Layout Description */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Layout & Design</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{design.layout.description}</p>
        </CardContent>
      </Card>

      {/* Critical Systems */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Critical Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {design.criticalSystems.map((system, index) => (
              <div
                key={index}
                className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm"
              >
                {system}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Missing Systems Warning */}
      {design.missingSystems.length > 0 && (
        <Card className="bg-destructive/5 border-destructive/30">
          <CardHeader>
            <CardTitle className="text-xl text-destructive flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Missing Critical Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {design.missingSystems.map((system, index) => (
                <Badge key={index} variant="destructive" className="mr-2">
                  {system}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Special Considerations */}
      {design.specialConsiderations.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Special Considerations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {design.specialConsiderations.map((consideration, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>{consideration}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommended Modules */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Recommended Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {design.recommendedModules.map((module, index) => (
              <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                {module}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={onReset} variant="outline" size="lg">
          Design Another Habitat
        </Button>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Export Design Plans
        </Button>
      </div>
    </div>
  );
};

export default HabitatResults;
