import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface Habitat3DViewProps {
  planet: string;
  moduleCount: number;
}

const HabitatModel = ({ moduleCount }: { moduleCount: number }) => {
  return (
    <>
      {/* Central habitat core */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 3, 32]} />
        <meshStandardMaterial color="#7D5FFF" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Module connections */}
      {Array.from({ length: Math.min(moduleCount, 8) }).map((_, i) => {
        const angle = (i / Math.min(moduleCount, 8)) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={i}>
            {/* Connection tube */}
            <mesh position={[x / 2, 0, z / 2]} rotation={[0, -angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.3, 0.3, radius - 1.5, 16]} />
              <meshStandardMaterial color="#00CFFF" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Module pod */}
            <mesh position={[x, 0, z]}>
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshStandardMaterial color="#FFD93D" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        );
      })}

      {/* Solar panels */}
      <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 6, 0, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
    </>
  );
};

const PlanetSurface = ({ planet }: { planet: string }) => {
  const planetColors: Record<string, string> = {
    mars: "#cd5c5c",
    moon: "#808080",
    europa: "#4a90e2",
    titan: "#daa520",
    orbit: "#000000"
  };

  if (planet === "orbit") return null;

  return (
    <mesh position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color={planetColors[planet] || "#808080"} roughness={0.9} />
    </mesh>
  );
};

const Habitat3DView = ({ planet, moduleCount }: Habitat3DViewProps) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-accent" />
          3D Habitat View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-b from-background to-muted/20">
          <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            <HabitatModel moduleCount={moduleCount} />
            <PlanetSurface planet={planet} />
            
            <OrbitControls 
              enableZoom={true} 
              enablePan={true} 
              enableRotate={true}
              minDistance={5}
              maxDistance={20}
            />
          </Canvas>
        </div>
        <div className="text-sm text-muted-foreground text-center mt-4">
          Click and drag to rotate • Scroll to zoom
        </div>
      </CardContent>
    </Card>
  );
};

export default Habitat3DView;
