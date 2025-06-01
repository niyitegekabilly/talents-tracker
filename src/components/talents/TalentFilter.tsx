
import { useState } from "react";
import { DisciplineCategory, TeamCategory, JourneyStage } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TalentFilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  search: string;
  discipline: string;
  team: string;
  stage: string;
}

export function TalentFilter({ onFilterChange }: TalentFilterProps) {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    discipline: "",
    team: "",
    stage: "",
  });

  const disciplines: DisciplineCategory[] = [
    'Football', 'Athletics', 'Basketball', 'Karate', 'Modern Dance', 'Traditional Dance', 'Orchestra', 'Swimming'
  ];

  const teams: TeamCategory[] = ['Academy', 'U18', 'Senior'];
  
  const stages: JourneyStage[] = ['Beginner', 'Developing', 'Advanced', 'Elite', 'Professional'];

  const handleChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      discipline: "",
      team: "",
      stage: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="search" className="mb-1 block">Search</Label>
            <Input
              id="search"
              placeholder="Search talents..."
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="discipline" className="mb-1 block">Discipline</Label>
            <Select
              value={filters.discipline}
              onValueChange={(value) => handleChange("discipline", value)}
            >
              <SelectTrigger id="discipline">
                <SelectValue placeholder="All disciplines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_disciplines">All disciplines</SelectItem>
                {disciplines.map((discipline) => (
                  <SelectItem key={discipline} value={discipline}>
                    {discipline}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="team" className="mb-1 block">Team</Label>
            <Select
              value={filters.team}
              onValueChange={(value) => handleChange("team", value)}
            >
              <SelectTrigger id="team">
                <SelectValue placeholder="All teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_teams">All teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="stage" className="mb-1 block">Stage</Label>
            <Select
              value={filters.stage}
              onValueChange={(value) => handleChange("stage", value)}
            >
              <SelectTrigger id="stage">
                <SelectValue placeholder="All stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_stages">All stages</SelectItem>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
