
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/data";

export function UpcomingEvents() {
  // Get only future events and sort them by start date
  const upcomingEvents = events
    .filter(event => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3); // Take only the next 3 events

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 hover:border-vjn-purple transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{event.title}</h3>
                <div className="bg-vjn-blue/10 text-vjn-blue px-2 py-1 rounded text-xs font-medium">
                  {event.disciplines.join(', ')}
                </div>
              </div>
              
              <div className="mt-2 space-y-1 text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    {formatDate(event.startDate)}
                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                  </span>
                </div>
                
                {event.location && (
                  <div className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
