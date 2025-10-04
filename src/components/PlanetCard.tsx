import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlanetCardProps {
  name: string;
  image: string;
  distance: string;
  type: string;
  description: string;
}

const PlanetCard = ({ name, image, distance, type, description }: PlanetCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            {type}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
        <div className="flex items-center gap-2 text-xs text-accent">
          <span className="font-mono">{distance}</span>
          <span className="text-muted-foreground">from Sun</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanetCard;
