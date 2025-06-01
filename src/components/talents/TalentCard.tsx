
import { Talent } from "@/lib/types";
import { stageColors } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TalentCardProps {
  talent: Talent;
}

export function TalentCard({ talent }: TalentCardProps) {
  const stageColor = stageColors[talent.currentStage];
  
  return (
    <Link to={`/talents/${talent.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <div 
            className="aspect-[3/2] bg-gray-200 dark:bg-gray-800 bg-center bg-cover"
            style={{ backgroundImage: `url(${talent.photoUrl})` }}
          />
          <Badge 
            className={cn(
              "absolute top-2 right-2",
              talent.currentStage === 'Beginner' ? 'bg-green-100 text-green-800' :
              talent.currentStage === 'Developing' ? 'bg-blue-100 text-blue-800' :
              talent.currentStage === 'Advanced' ? 'bg-yellow-100 text-yellow-800' :
              talent.currentStage === 'Elite' ? 'bg-purple-100 text-purple-800' :
              'bg-red-100 text-red-800'
            )}
          >
            {talent.currentStage}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">
            {talent.firstName} {talent.lastName}
          </h3>
          
          <div className="flex justify-between mt-1 text-sm text-gray-500 dark:text-gray-400">
            <span>{talent.discipline}</span>
            {talent.team && <span>{talent.team}</span>}
          </div>
          
          {talent.bio && (
            <p className="text-sm mt-2 line-clamp-2">{talent.bio}</p>
          )}
          
          <div 
            className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-3"
            title={`Stage: ${talent.currentStage}`}
          >
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: talent.currentStage === 'Beginner' ? '20%' :
                       talent.currentStage === 'Developing' ? '40%' :
                       talent.currentStage === 'Advanced' ? '60%' :
                       talent.currentStage === 'Elite' ? '80%' : '100%',
                backgroundColor: stageColor
              }}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
