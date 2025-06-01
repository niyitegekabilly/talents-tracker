
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Talent {
  id: string;
  firstName: string;
  lastName: string;
  discipline: string;
  team: string;
  currentStage: string;
}

// Sample data - this would normally come from a database or API
const sampleTalents: Talent[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    discipline: "Football",
    team: "U18",
    currentStage: "Advanced"
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    discipline: "Traditional Dance",
    team: "Senior",
    currentStage: "Elite"
  },
  {
    id: "3",
    firstName: "Alex",
    lastName: "Johnson",
    discipline: "Karate",
    team: "Academy",
    currentStage: "Developing"
  },
  {
    id: "4",
    firstName: "Maria",
    lastName: "Garcia",
    discipline: "Orchestra",
    team: "Senior",
    currentStage: "Professional"
  },
  {
    id: "5",
    firstName: "Daniel",
    lastName: "Lee",
    discipline: "Basketball",
    team: "U18",
    currentStage: "Advanced"
  }
];

// Helper function to determine badge color based on talent stage
const getStageBadgeColor = (stage: string) => {
  switch(stage) {
    case "Beginner": return "bg-gray-500";
    case "Developing": return "bg-blue-500";
    case "Advanced": return "bg-purple-500";
    case "Elite": return "bg-amber-500";
    case "Professional": return "bg-emerald-500";
    default: return "bg-gray-500";
  }
};

export function TalentTable() {
  const [talents] = useState<Talent[]>(sampleTalents);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Discipline</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {talents.map((talent) => (
            <TableRow key={talent.id}>
              <TableCell className="font-medium">
                {talent.firstName} {talent.lastName}
              </TableCell>
              <TableCell>{talent.discipline}</TableCell>
              <TableCell>{talent.team}</TableCell>
              <TableCell>
                <Badge className={getStageBadgeColor(talent.currentStage)}>
                  {talent.currentStage}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/talents/${talent.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/talents/${talent.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
