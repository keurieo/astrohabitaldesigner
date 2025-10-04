import PlanetCard from "./PlanetCard";
import { Telescope } from "lucide-react";
import marsImage from "@/assets/planet-mars.jpg";
import jupiterImage from "@/assets/planet-jupiter.jpg";
import saturnImage from "@/assets/planet-saturn.jpg";
import earthImage from "@/assets/planet-earth.jpg";

const planets = [
  {
    name: "Earth",
    image: earthImage,
    distance: "149.6M km",
    type: "Terrestrial",
    description: "Our home planet, the only known world with liquid water on its surface and abundant life.",
  },
  {
    name: "Mars",
    image: marsImage,
    distance: "227.9M km",
    type: "Terrestrial",
    description: "The Red Planet, known for its iron oxide-rich soil and potential for future human colonization.",
  },
  {
    name: "Jupiter",
    image: jupiterImage,
    distance: "778.5M km",
    type: "Gas Giant",
    description: "The largest planet in our solar system, featuring the iconic Great Red Spot storm.",
  },
  {
    name: "Saturn",
    image: saturnImage,
    distance: "1.4B km",
    type: "Gas Giant",
    description: "Famous for its spectacular ring system made of ice and rock particles.",
  },
];

const PlanetsSection = () => {
  return (
    <section id="planets" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Telescope className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground">Planetary System</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-glow">
            Explore Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Solar System
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the wonders of our celestial neighborhood and learn about each unique world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planets.map((planet) => (
            <PlanetCard key={planet.name} {...planet} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanetsSection;
