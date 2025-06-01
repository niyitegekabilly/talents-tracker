import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

// Sample achievements data
const achievements = [
  {
    id: "ach001",
    talentId: "t001",
    talentName: "David Kamara",
    talentImage: "/images/placeholder-avatar.png",
    title: "Regional Football Championship",
    description: "Won first place in the regional football championship",
    awardedAt: "2025-04-15",
    category: "Competition",
    discipline: "Football"
  },
  {
    id: "ach002",
    talentId: "t002",
    talentName: "Aisha Mensah",
    talentImage: "/images/placeholder-avatar.png",
    title: "Dance Excellence Award",
    description: "Recognized for exceptional performance in modern dance",
    awardedAt: "2025-03-20",
    category: "Recognition",
    discipline: "Modern Dance"
  },
  {
    id: "ach003",
    talentId: "t003",
    talentName: "Michael Osei",
    talentImage: "/images/placeholder-avatar.png",
    title: "Swimming Record",
    description: "Set new academy record for 100m freestyle",
    awardedAt: "2025-02-10",
    category: "Record",
    discipline: "Swimming"
  },
  {
    id: "ach004",
    talentId: "t004",
    talentName: "Fatima Ibrahim",
    talentImage: "/images/placeholder-avatar.png",
    title: "Advanced to Elite Stage",
    description: "Progressed from Advanced to Elite stage in record time",
    awardedAt: "2025-01-05",
    category: "Progression",
    discipline: "Basketball"
  }
];

export default function AchievementsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [disciplineFilter, setDisciplineFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredAchievements = useMemo(() => {
    return achievements.filter(achievement => {
      // Search filter
      if (searchQuery && 
          !achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !achievement.talentName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Discipline filter
      if (disciplineFilter !== "all" && achievement.discipline !== disciplineFilter) {
        return false;
      }
      
      // Category filter
      if (categoryFilter !== "all" && achievement.category !== categoryFilter) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, disciplineFilter, categoryFilter]);

  return (
    <MainLayout title="Achievements">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Talent Achievements</h2>
        <Button onClick={() => navigate('/achievements/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Record Achievement
        </Button>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by title or talent name..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <Select value={disciplineFilter} onValueChange={setDisciplineFilter}>
                  <SelectTrigger id="discipline">
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
              
              <div className="w-full md:w-48">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Recognition">Recognition</SelectItem>
                    <SelectItem value="Record">Record</SelectItem>
                    <SelectItem value="Progression">Progression</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {filteredAchievements.length === 0 ? (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Award className="h-12 w-12 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium">No achievements found</h3>
            <p className="text-gray-500 text-center mt-1">
              No achievements match your current filters. Try adjusting your search criteria.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchQuery("");
              setDisciplineFilter("all");
              setCategoryFilter("all");
            }}>
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge>{achievement.category}</Badge>
                  <Badge variant="outline">{achievement.discipline}</Badge>
                </div>
                <CardTitle className="mt-2">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600">{achievement.description}</p>
                <div className="mt-3 text-sm text-gray-500">
                  Awarded on {new Date(achievement.awardedAt).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={achievement.talentImage} alt={achievement.talentName} />
                    <AvatarFallback>{achievement.talentName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">{achievement.talentName}</span>
                </div>
                <div className="ml-auto">
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
