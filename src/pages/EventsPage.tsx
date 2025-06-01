import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

// Sample events data
const events = [
  {
    id: "evt001",
    title: "Annual Football Tournament",
    description: "Annual tournament for all football teams",
    startDate: "2025-06-15T10:00:00",
    endDate: "2025-06-17T18:00:00",
    location: "VJN Main Stadium",
    disciplines: ["Football"],
    teams: ["Academy", "U18", "Senior"],
    status: "Upcoming"
  },
  {
    id: "evt002",
    title: "Basketball Showcase",
    description: "Exhibition matches for basketball talents",
    startDate: "2025-05-20T14:00:00",
    endDate: "2025-05-20T18:00:00",
    location: "Community Court",
    disciplines: ["Basketball"],
    teams: ["U18"],
    status: "Upcoming"
  },
  {
    id: "evt003",
    title: "Dance Performance",
    description: "Showcase of traditional and modern dance talents",
    startDate: "2025-05-12T19:00:00",
    endDate: "2025-05-12T21:00:00",
    location: "Cultural Center",
    disciplines: ["Modern Dance", "Traditional Dance"],
    teams: ["Academy"],
    status: "Upcoming"
  },
  {
    id: "evt004",
    title: "Talent Evaluation Day",
    description: "Performance assessment for all talents",
    startDate: "2025-04-25T09:00:00",
    endDate: "2025-04-25T17:00:00",
    location: "VJN Training Center",
    disciplines: ["Football", "Basketball", "Karate", "Modern Dance", "Traditional Dance", "Orchestra", "Swimming"],
    teams: ["Academy", "U18", "Senior"],
    status: "Completed"
  }
];

export default function EventsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [disciplineFilter, setDisciplineFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Search filter
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Discipline filter
      if (disciplineFilter && disciplineFilter !== "all" && !event.disciplines.includes(disciplineFilter)) {
        return false;
      }
      
      // Status filter (upcoming, completed)
      if (statusFilter && statusFilter !== "all" && event.status !== statusFilter) {
        return false;
      }
      
      // Tab filter (all, today, week, month)
      if (activeTab !== "all") {
        const eventDate = new Date(event.startDate);
        const today = new Date();
        
        if (activeTab === "today" && 
            !(eventDate.getDate() === today.getDate() && 
              eventDate.getMonth() === today.getMonth() && 
              eventDate.getFullYear() === today.getFullYear())) {
          return false;
        }
        
        if (activeTab === "week") {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(today);
          weekEnd.setDate(weekStart.getDate() + 7);
          
          if (!(eventDate >= weekStart && eventDate < weekEnd)) {
            return false;
          }
        }
        
        if (activeTab === "month") {
          if (!(eventDate.getMonth() === today.getMonth() && 
                eventDate.getFullYear() === today.getFullYear())) {
            return false;
          }
        }
      }
      
      return true;
    });
  }, [searchQuery, disciplineFilter, statusFilter, activeTab]);

  const formatEventDate = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    
    if (!endDate) return start.toLocaleDateString('en-US', options);
    
    const end = new Date(endDate);
    
    // Same day
    if (start.getDate() === end.getDate() && 
        start.getMonth() === end.getMonth() && 
        start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} · ${start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Different days
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  return (
    <MainLayout title="Events">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Events Calendar</h2>
        <Button onClick={() => navigate('/events/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="grid grid-cols-4 w-full md:w-80">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="flex-1 md:w-60">
              <Input 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-40">
              <Select value={disciplineFilter} onValueChange={setDisciplineFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Discipline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Disciplines</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Athletics">Athletics</SelectItem>
                  <SelectItem value="Karate">Karate</SelectItem>
                  <SelectItem value="Modern Dance">Modern Dance</SelectItem>
                  <SelectItem value="Traditional Dance">Traditional Dance</SelectItem>
                  <SelectItem value="Orchestra">Orchestra</SelectItem>
                  <SelectItem value="Swimming">Swimming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Calendar className="h-12 w-12 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-gray-500 text-center mt-1">
                No events match your current filters. Try adjusting your search criteria.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery("");
                setDisciplineFilter("all");
                setStatusFilter("all");
                setActiveTab("all");
              }}>
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="h-32 bg-blue-50 flex items-center justify-center">
                  <img 
                    src="/images/placeholder-event.png" 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge variant={event.status === "Completed" ? "outline" : "default"}>
                      {event.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatEventDate(event.startDate, event.endDate)}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {event.disciplines.map(discipline => (
                      <Badge key={discipline} variant="secondary">
                        {discipline}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
