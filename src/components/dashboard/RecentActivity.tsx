
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string;
  description: string;
  timestamp: string;
  category: "evaluation" | "achievement" | "event" | "registration";
}

const recentActivities: Activity[] = [
  {
    id: "1",
    description: "New talent Sophie Martin registered for Modern Dance",
    timestamp: "2023-05-12T09:30:00",
    category: "registration"
  },
  {
    id: "2",
    description: "Coach Pierre completed evaluation for Jean Baptiste",
    timestamp: "2023-05-11T15:45:00",
    category: "evaluation"
  },
  {
    id: "3",
    description: "Marie Jolie achieved National Junior Championship gold medal",
    timestamp: "2023-05-10T12:20:00",
    category: "achievement"
  },
  {
    id: "4",
    description: "Regional Football Tournament scheduled for June 15-20",
    timestamp: "2023-05-09T10:15:00",
    category: "event"
  },
  {
    id: "5",
    description: "Thomas Dubois signed professional contract with BC Lions",
    timestamp: "2023-05-08T16:30:00",
    category: "achievement"
  }
];

export function RecentActivity() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className={`rounded-full p-2 
                  ${activity.category === "registration" ? "bg-blue-100 text-blue-600" :
                    activity.category === "evaluation" ? "bg-purple-100 text-purple-600" :
                    activity.category === "achievement" ? "bg-green-100 text-green-600" :
                    "bg-orange-100 text-orange-600"}`
                }>
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <div className="h-full w-px bg-gray-200 dark:bg-gray-800"></div>
              </div>
              <div className="pb-8">
                <p className="text-sm font-medium">{activity.description}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(activity.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
