import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Users } from "lucide-react";

export interface CrewMember {
  id: string;
  role: string;
  count: number;
}

const defaultRoles = [
  { role: "Scientists", icon: "🔬", needs: { oxygen: 0.8, water: 3, food: 2.5 } },
  { role: "Engineers", icon: "⚙️", needs: { oxygen: 0.8, water: 3, food: 2.5 } },
  { role: "Medical", icon: "⚕️", needs: { oxygen: 0.8, water: 3, food: 2.5 } },
  { role: "Pilots", icon: "✈️", needs: { oxygen: 0.8, water: 3, food: 2.5 } },
  { role: "Botanists", icon: "🌱", needs: { oxygen: 0.8, water: 3, food: 2.5 } },
  { role: "Support", icon: "👥", needs: { oxygen: 0.8, water: 3, food: 2.5 } }
];

interface CrewManagerProps {
  crew: CrewMember[];
  onUpdateCrew: (crew: CrewMember[]) => void;
}

const CrewManager = ({ crew, onUpdateCrew }: CrewManagerProps) => {
  const totalCrew = crew.reduce((sum, member) => sum + member.count, 0);

  const updateCrewCount = (role: string, change: number) => {
    const existingMember = crew.find(m => m.role === role);
    let newCrew: CrewMember[];

    if (existingMember) {
      const newCount = Math.max(0, existingMember.count + change);
      if (newCount === 0) {
        newCrew = crew.filter(m => m.role !== role);
      } else {
        newCrew = crew.map(m => 
          m.role === role ? { ...m, count: newCount } : m
        );
      }
    } else if (change > 0) {
      newCrew = [...crew, { id: role, role, count: 1 }];
    } else {
      return;
    }

    onUpdateCrew(newCrew);
  };

  const getCrewCount = (role: string) => {
    return crew.find(m => m.role === role)?.count || 0;
  };

  const calculateTotalNeeds = () => {
    const totals = { oxygen: 0, water: 0, food: 0 };
    crew.forEach(member => {
      const roleData = defaultRoles.find(r => r.role === member.role);
      if (roleData) {
        totals.oxygen += roleData.needs.oxygen * member.count;
        totals.water += roleData.needs.water * member.count;
        totals.food += roleData.needs.food * member.count;
      }
    });
    return totals;
  };

  const needs = calculateTotalNeeds();

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          Crew & Residents
          <Badge className="ml-auto bg-primary">{totalCrew} Total</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {defaultRoles.map(({ role, icon, needs }) => (
            <div
              key={role}
              className="bg-muted/50 border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{icon}</span>
                  <span className="font-semibold">{role}</span>
                </div>
                <Badge variant="outline">{getCrewCount(role)}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateCrewCount(role, -1)}
                  disabled={getCrewCount(role) === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="flex-1 text-center font-bold text-lg">
                  {getCrewCount(role)}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateCrewCount(role, 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {totalCrew > 0 && (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-primary mb-3">Daily Resource Requirements</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground">Oxygen</div>
                <div className="text-xl font-bold text-accent">{needs.oxygen.toFixed(1)} kg/day</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Water</div>
                <div className="text-xl font-bold text-secondary">{needs.water.toFixed(1)} L/day</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Food</div>
                <div className="text-xl font-bold text-primary">{needs.food.toFixed(1)} kg/day</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CrewManager;
