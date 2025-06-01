import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample success stories data
const successStories = [
  {
    id: "story001",
    talentId: "t001",
    talentName: "Emmanuel Addo",
    talentImage: "/images/placeholder-avatar.png",
    title: "From Academy to National Team",
    content: "Emmanuel's journey from joining the VJN football academy at age 12 to becoming a national team player at 18 is an inspiring story of dedication, hard work, and perseverance. Under the guidance of our coaches, Emmanuel developed exceptional skills and discipline that caught the attention of national team scouts.",
    publishDate: "2025-04-10",
    featuredImage: "/images/placeholder-achievement.png",
    tags: ["Football", "Professional", "National Team"],
    discipline: "Football"
  },
  {
    id: "story002",
    talentId: "t002",
    talentName: "Fatima Diallo",
    talentImage: "/images/placeholder-avatar.png",
    title: "International Dance Scholarship Recipient",
    content: "Fatima joined VJN's traditional dance program with raw talent but limited formal training. Through dedicated practice and mentorship from our dance instructors, she developed into an exceptional performer. Her journey culminated in receiving a prestigious international scholarship to further her studies abroad.",
    publishDate: "2025-03-15",
    featuredImage: "/images/placeholder-achievement.png",
    tags: ["Traditional Dance", "Scholarship", "International"],
    discipline: "Traditional Dance"
  },
  {
    id: "story003",
    talentId: "t003",
    talentName: "Omar Mensah",
    talentImage: "/images/placeholder-avatar.png",
    title: "Swimming Champion Against All Odds",
    content: "Omar's story is one of overcoming significant challenges. Coming from a community with limited access to swimming facilities, Omar joined VJN with determination to excel. Despite starting later than many peers, his dedication led him to becoming a national swimming champion within just three years.",
    publishDate: "2025-02-20",
    featuredImage: "/images/placeholder-achievement.png",
    tags: ["Swimming", "Champion", "Perseverance"],
    discipline: "Swimming"
  },
  {
    id: "story004",
    talentId: "t004",
    talentName: "Sophia Okafor",
    talentImage: "/images/placeholder-avatar.png",
    title: "Orchestra Prodigy's Rise to Fame",
    content: "Sophia discovered her passion for music through VJN's community outreach program. Starting with no formal training, her natural talent for the violin was nurtured by our instructors. Today, she performs with renowned orchestras and has become an ambassador for youth music education.",
    publishDate: "2025-01-25",
    featuredImage: "/images/placeholder-achievement.png",
    tags: ["Orchestra", "Music", "Performance"],
    discipline: "Orchestra"
  }
];

export default function SuccessStoriesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = successStories.filter(story => {
    // Search filter
    if (searchQuery && 
        !story.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !story.talentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !story.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
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
    <MainLayout title="Success Stories">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Talent Success Stories</h2>
        <Button onClick={() => navigate('/success-stories/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Story
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search success stories..."
              className="pl-9"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {filteredStories.length === 0 ? (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium">No success stories found</h3>
            <p className="text-gray-500 text-center mt-1">
              No stories match your search query. Try a different search term.
            </p>
            {searchQuery && (
              <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredStories.map((story) => (
            <Card key={story.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={story.featuredImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge>{story.discipline}</Badge>
                        <CardTitle className="mt-2 text-xl">{story.title}</CardTitle>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(story.publishDate)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-3">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={story.talentImage} alt={story.talentName} />
                        <AvatarFallback>{story.talentName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{story.talentName}</span>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-3">{story.content}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {story.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline">Read Full Story</Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
