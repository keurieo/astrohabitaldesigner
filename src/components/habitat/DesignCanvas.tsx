import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDrop } from "react-dnd";
import { HabitatModule } from "./ModulePalette";
import { Trash2, Grid3x3 } from "lucide-react";

interface PlacedModule extends HabitatModule {
  position: { x: number; y: number };
  placedId: string;
}

interface DesignCanvasProps {
  placedModules: PlacedModule[];
  onPlaceModule: (module: PlacedModule) => void;
  onRemoveModule: (placedId: string) => void;
}

const GRID_SIZE = 12;
const CELL_SIZE = 60;

const DesignCanvas = ({ placedModules, onPlaceModule, onRemoveModule }: DesignCanvasProps) => {
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "module",
    drop: (item: HabitatModule, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && dropRef.current) {
        const rect = dropRef.current.getBoundingClientRect();
        const x = Math.floor((offset.x - rect.left) / CELL_SIZE);
        const y = Math.floor((offset.y - rect.top) / CELL_SIZE);

        if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
          const placedModule: PlacedModule = {
            ...item,
            position: { x, y },
            placedId: `${item.id}-${Date.now()}`
          };
          onPlaceModule(placedModule);
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropRef = drop as any;

  const isOccupied = (x: number, y: number) => {
    return placedModules.some(module => {
      const { x: mx, y: my } = module.position;
      const { width, height } = module.size;
      return x >= mx && x < mx + width && y >= my && y < my + height;
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3x3 className="w-5 h-5 text-accent" />
          Habitat Design Canvas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            ref={dropRef}
            className={`relative border-2 ${isOver ? "border-primary" : "border-border"} rounded-lg overflow-hidden`}
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
            }}
          >
            {/* Render placed modules */}
            {placedModules.map((module) => (
              <div
                key={module.placedId}
                className={`absolute ${module.color} border-2 rounded flex items-center justify-center group`}
                style={{
                  left: module.position.x * CELL_SIZE,
                  top: module.position.y * CELL_SIZE,
                  width: module.size.width * CELL_SIZE,
                  height: module.size.height * CELL_SIZE
                }}
              >
                <div className="text-center">
                  <div className="text-3xl">{module.icon}</div>
                  <div className="text-xs font-semibold mt-1">{module.name}</div>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  onClick={() => onRemoveModule(module.placedId)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}

            {/* Hover indicator */}
            {hoveredCell && !isOccupied(hoveredCell.x, hoveredCell.y) && (
              <div
                className="absolute bg-primary/20 border-2 border-primary pointer-events-none"
                style={{
                  left: hoveredCell.x * CELL_SIZE,
                  top: hoveredCell.y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE
                }}
              />
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Drag modules from the palette onto the grid to design your habitat layout
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignCanvas;
