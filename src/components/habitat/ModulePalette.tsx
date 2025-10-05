import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDrag } from "react-dnd";

export interface HabitatModule {
  id: string;
  type: string;
  name: string;
  icon: string;
  size: { width: number; height: number };
  color: string;
  resources: {
    power: number;
    maintenance: number;
  };
}

export const availableModules: HabitatModule[] = [
  {
    id: "living",
    type: "living",
    name: "Living Quarters",
    icon: "🛏️",
    size: { width: 2, height: 2 },
    color: "bg-blue-500/20 border-blue-500/50",
    resources: { power: 5, maintenance: 2 }
  },
  {
    id: "lab",
    type: "lab",
    name: "Laboratory",
    icon: "🔬",
    size: { width: 2, height: 2 },
    color: "bg-purple-500/20 border-purple-500/50",
    resources: { power: 15, maintenance: 5 }
  },
  {
    id: "hydroponics",
    type: "hydroponics",
    name: "Hydroponics Bay",
    icon: "🌱",
    size: { width: 3, height: 2 },
    color: "bg-green-500/20 border-green-500/50",
    resources: { power: 20, maintenance: 8 }
  },
  {
    id: "control",
    type: "control",
    name: "Control Room",
    icon: "🎛️",
    size: { width: 2, height: 1 },
    color: "bg-yellow-500/20 border-yellow-500/50",
    resources: { power: 10, maintenance: 3 }
  },
  {
    id: "recreation",
    type: "recreation",
    name: "Recreation",
    icon: "🎮",
    size: { width: 2, height: 2 },
    color: "bg-pink-500/20 border-pink-500/50",
    resources: { power: 8, maintenance: 2 }
  },
  {
    id: "storage",
    type: "storage",
    name: "Storage",
    icon: "📦",
    size: { width: 1, height: 1 },
    color: "bg-gray-500/20 border-gray-500/50",
    resources: { power: 1, maintenance: 1 }
  },
  {
    id: "medical",
    type: "medical",
    name: "Medical Bay",
    icon: "⚕️",
    size: { width: 2, height: 2 },
    color: "bg-red-500/20 border-red-500/50",
    resources: { power: 12, maintenance: 4 }
  },
  {
    id: "gym",
    type: "gym",
    name: "Exercise Area",
    icon: "💪",
    size: { width: 2, height: 1 },
    color: "bg-orange-500/20 border-orange-500/50",
    resources: { power: 5, maintenance: 2 }
  },
  {
    id: "airlock",
    type: "airlock",
    name: "Airlock",
    icon: "🚪",
    size: { width: 1, height: 1 },
    color: "bg-cyan-500/20 border-cyan-500/50",
    resources: { power: 3, maintenance: 5 }
  }
];

interface ModulePaletteProps {
  onModuleSelect?: (module: HabitatModule) => void;
}

const DraggableModule = ({ module }: { module: HabitatModule }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "module",
    item: module,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [module]);

  return (
    <div
      ref={drag}
      className={`${module.color} border-2 rounded-lg p-3 cursor-move transition-all hover:scale-105 active:scale-95 ${
        isDragging ? "opacity-50 scale-110" : "opacity-100"
      }`}
      style={{ touchAction: "none" }}
    >
      <div className="text-center space-y-1">
        <div className="text-2xl">{module.icon}</div>
        <div className="text-xs font-semibold">{module.name}</div>
        <div className="flex gap-1 justify-center text-xs">
          <Badge variant="outline" className="text-[10px] px-1">
            ⚡{module.resources.power}
          </Badge>
          <Badge variant="outline" className="text-[10px] px-1">
            {module.size.width}x{module.size.height}
          </Badge>
        </div>
      </div>
    </div>
  );
};

const ModulePalette = ({ onModuleSelect }: ModulePaletteProps) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Module Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {availableModules.map((module) => (
            <DraggableModule key={module.id} module={module} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulePalette;
