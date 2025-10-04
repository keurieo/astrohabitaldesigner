import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { HabitatDesign, HabitatInputs } from "@/pages/HabitatDesigner";

interface HabitatFormProps {
  onDesignGenerated: (design: HabitatDesign, inputs: HabitatInputs) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const HabitatForm = ({ onDesignGenerated, isLoading, setIsLoading }: HabitatFormProps) => {
  const [planet, setPlanet] = useState("mars");
  const [residents, setResidents] = useState(4);
  const [size, setSize] = useState("medium");
  const [shape, setShape] = useState("modular");
  const [purpose, setPurpose] = useState("research");
  const [lifestyle, setLifestyle] = useState("balanced");
  const [systems, setSystems] = useState<string[]>(["life-support", "waste-management"]);
  const [notes, setNotes] = useState("");

  const availableSystems = [
    "life-support",
    "waste-management",
    "exercise-area",
    "laboratory",
    "kitchen",
    "storage",
    "recreation",
    "greenhouse",
    "workshop",
    "medical-bay"
  ];

  const toggleSystem = (system: string) => {
    setSystems(prev =>
      prev.includes(system)
        ? prev.filter(s => s !== system)
        : [...prev, system]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("habitat-designer", {
        body: {
          planet,
          residents,
          size,
          shape,
          purpose,
          lifestyle,
          systems,
          notes,
        },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.success && data.design) {
        toast.success("Habitat design generated successfully!");
        onDesignGenerated(data.design, data.inputParameters);
      }
    } catch (error) {
      console.error("Error generating habitat design:", error);
      toast.error("Failed to generate habitat design. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-4xl mx-auto bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Design Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Planet Selection */}
          <div className="space-y-2">
            <Label htmlFor="planet">Planet / Environment</Label>
            <Select value={planet} onValueChange={setPlanet}>
              <SelectTrigger id="planet">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mars">Mars</SelectItem>
                <SelectItem value="moon">Moon</SelectItem>
                <SelectItem value="titan">Titan</SelectItem>
                <SelectItem value="iss-orbit">ISS Orbit</SelectItem>
                <SelectItem value="europa">Europa</SelectItem>
                <SelectItem value="custom">Custom Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Residents */}
          <div className="space-y-2">
            <Label htmlFor="residents">Number of Residents</Label>
            <Input
              id="residents"
              type="number"
              min="1"
              max="1000"
              value={residents}
              onChange={(e) => setResidents(parseInt(e.target.value) || 1)}
              className="bg-background"
            />
          </div>

          {/* Size and Shape */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Habitat Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger id="size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (Compact)</SelectItem>
                  <SelectItem value="medium">Medium (Standard)</SelectItem>
                  <SelectItem value="large">Large (Spacious)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shape">Habitat Shape</Label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger id="shape">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cylindrical">Cylindrical</SelectItem>
                  <SelectItem value="dome">Dome</SelectItem>
                  <SelectItem value="modular">Modular</SelectItem>
                  <SelectItem value="inflatable">Inflatable</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Purpose and Lifestyle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Primary Purpose</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger id="purpose">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="mining">Mining</SelectItem>
                  <SelectItem value="farming">Farming</SelectItem>
                  <SelectItem value="leisure">Leisure</SelectItem>
                  <SelectItem value="mixed">Mixed-Use</SelectItem>
                  <SelectItem value="colonization">Colonization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lifestyle">Lifestyle</Label>
              <Select value={lifestyle} onValueChange={setLifestyle}>
                <SelectTrigger id="lifestyle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="high-activity">High Activity</SelectItem>
                  <SelectItem value="sustainable">Sustainability-Focused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Critical Systems */}
          <div className="space-y-3">
            <Label>Critical Systems & Features</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSystems.map((system) => (
                <div key={system} className="flex items-center space-x-2">
                  <Checkbox
                    id={system}
                    checked={systems.includes(system)}
                    onCheckedChange={() => toggleSystem(system)}
                  />
                  <Label
                    htmlFor={system}
                    className="text-sm capitalize cursor-pointer"
                  >
                    {system.replace("-", " ")}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Requirements</Label>
            <Textarea
              id="notes"
              placeholder="Any specific requirements or preferences for your habitat..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-background min-h-24"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Designing Your Habitat...
              </>
            ) : (
              "Generate Habitat Design"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default HabitatForm;
