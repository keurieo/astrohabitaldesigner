import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Gauge, Zap, Globe } from "lucide-react";

const stats = [
  {
    icon: Activity,
    title: "Active Missions",
    value: "47",
    change: "+12%",
    description: "Spacecraft exploring space",
  },
  {
    icon: Gauge,
    title: "Light Speed",
    value: "299,792",
    unit: "km/s",
    description: "Universal speed limit",
  },
  {
    icon: Zap,
    title: "Solar Activity",
    value: "Moderate",
    change: "Stable",
    description: "Current sun conditions",
  },
  {
    icon: Globe,
    title: "Known Exoplanets",
    value: "5,500+",
    change: "+250/yr",
    description: "Confirmed discoveries",
  },
];

const SpaceDataSection = () => {
  return (
    <section id="data" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-glow">
            Real-Time
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              Space Statistics
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Live data from space agencies and astronomical observatories around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    {stat.unit && (
                      <span className="text-sm text-muted-foreground">{stat.unit}</span>
                    )}
                  </div>
                  {stat.change && (
                    <div className="text-xs text-accent font-medium">{stat.change}</div>
                  )}
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Upcoming Launch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-foreground font-semibold">SpaceX Starship Test Flight</p>
              <p className="text-sm text-muted-foreground">
                Next-generation spacecraft designed for missions to the Moon and Mars
              </p>
              <div className="text-xs text-accent font-mono">T-minus 72 hours</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/30">
            <CardHeader>
              <CardTitle className="text-secondary">Astronomical Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-foreground font-semibold">Perseid Meteor Shower</p>
              <p className="text-sm text-muted-foreground">
                Annual meteor shower offering spectacular views of shooting stars
              </p>
              <div className="text-xs text-accent font-mono">Peak viewing: August 12-13</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SpaceDataSection;
