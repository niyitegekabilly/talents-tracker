import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Award, 
  Calendar, 
  Filter, 
  MapPin, 
  Plus, 
  Search, 
  Users 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample competitions data
const competitions = [
  {
    id: "comp001",
    title: "Regional Football Championship",
    description: "Annual tournament for junior football teams across the region",
    date: "2025-06-15",
    location: "VJN Main Stadium",
    disciplines: ["Football"],
    participants: ["t001", "t005", "t008", "t011"],
    status: "Upcoming",
    imageUrl: "/images/placeholder-achievement.png"
  },
  {
    id: "comp002",
    title: "National Dance Contest",
    description: "Premier competition for traditional and modern dance",
    date: "2025-05-20",
    location: "National Cultural Center",
    disciplines: ["Modern Dance", "Traditional Dance"],
    participants: ["t002", "t007", "t012"],
    status: "Upcoming",
    imageUrl: "/images/placeholder-achievement.png"
  },
  {
    id: "comp003",
    title: "Inter-Academy Basketball Tournament",
    description: "Basketball competition between top youth academies",
    date: "2025-04-10",
    location: "Community Sports Center",
    disciplines: ["Basketball"],
    participants: ["t004", "t009"],
    status: "Completed",
    results: [
      { teamName: "VJN Academy", rank: 1, score: 76 },
      { teamName: "Central Youth", rank: 2, score: 68 },
      { teamName: "Eastern Stars", rank: 3, score: 65 }
    ],
    imageUrl: "/images/placeholder-achievement.png"
  },
  {
    id: "comp004",
    title: "Swimming Invitational Meet",
    description: "Elite swimming competition for youth athletes",
    date: "2025-03-05",
    location: "National Aquatic Center",
    disciplines: ["Swimming"],
    participants: ["t003", "t010"],
    status: "Completed",
    results: [
      { teamName: "VJN Sharks", rank: 2, score: 125 },
      { teamName: "Capital Swimmers", rank: 1, score: 130 },
      { teamName: "Western Waves", rank: 3, score: 110 }
    ],
    imageUrl: "/images/placeholder-achievement.png"
  }
];

export default function CompetitionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [disciplineFilter, setDisciplineFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredCompetitions = competitions.filter(competition => {
    // Search filter
    if (searchQuery && 
        !competition.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !competition.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Discipline filter
    if (disciplineFilter !== "all" && !competition.disciplines.includes(disciplineFilter)) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== "all" && competition.status !== statusFilter) {
      return false;
    }
    
    // Tab filter
    if (activeTab === "upcoming" && competition.status !== "Upcoming") {
      return false;
    } else if (activeTab === "completed" && competition.status !== "Completed") {
      return false;
    }
    
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <MainLayout title="Competitions">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Competitions & Tournaments</h2>
        <Button onClick={() => navigate('/competitions/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Competition
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full md:w-fit">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="flex-1 md:w-60 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search competitions..."
                className="pl-8"
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
        
        {filteredCompetitions.length === 0 ? (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Award className="h-12 w-12 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">No competitions found</h3>
              <p className="text-gray-500 text-center mt-1">
                No competitions match your current filters. Try adjusting your search criteria.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCompetitions.map((competition) => (
              <Card key={competition.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/5 h-48 md:h-auto">
                    <img
                      src={competition.imageUrl}
                      alt={competition.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge>{competition.status}</Badge>
                        <div className="flex flex-wrap gap-2">
                          {competition.disciplines.map(discipline => (
                            <Badge key={discipline} variant="outline">{discipline}</Badge>
                          ))}
                        </div>
                      </div>
                      <CardTitle className="mt-2">{competition.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{competition.description}</p>
                      
                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(competition.date)}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          {competition.location}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          {competition.participants.length} Participants
                        </div>
                      </div>
                      
                      {competition.status === "Completed" && competition.results && (
                        <div className="border-t pt-3 mb-3">
                          <h4 className="text-sm font-medium mb-2">Results:</h4>
                          <div className="space-y-1">
                            {competition.results.map((result, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <div>
                                  {result.rank}. {result.teamName}
                                </div>
                                <div className="font-medium">
                                  {result.score} pts
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button variant="outline" className="w-full mt-2" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // TODO: Implement view details functionality
                        console.log('View details clicked for competition:', competition.id);
                      }}>View Details</Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
