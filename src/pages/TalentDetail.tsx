
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react"; 
import { talents } from "@/lib/data";

export default function TalentDetail() {
  const { id } = useParams<{ id: string }>();
  
  // Find the talent with the matching ID
  const talent = talents.find(t => t.id === id);
  
  // If talent not found, show error state
  if (!talent) {
    return (
      <MainLayout title="Talent Not Found">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">Talent Not Found</h1>
          <p className="text-gray-500 mt-2">The talent you are looking for does not exist.</p>
          <Button className="mt-4" asChild>
            <Link to="/talents">Back to Talents</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title={`${talent.firstName} ${talent.lastName}`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile section */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={talent.profileImage || "/images/placeholder-avatar.png"} alt={`${talent.firstName} ${talent.lastName}`} />
                  <AvatarFallback>{talent.firstName[0]}{talent.lastName[0]}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold">{talent.firstName} {talent.lastName}</h2>
                <p className="text-gray-500">{talent.role || talent.discipline}</p>
                
                <div className="flex gap-2 mt-4">
                  <Badge>{talent.discipline}</Badge>
                  <Badge variant="outline">{talent.team}</Badge>
                </div>
                
                <div className="mt-6 w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Stage</span>
                    <span className="font-medium">{talent.currentStage}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Age</span>
                    <span className="font-medium">{talent.age || "N/A"}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Start Date</span>
                    <span className="font-medium">{talent.startDate ? new Date(talent.startDate).toLocaleDateString() : new Date(talent.joinedAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium">{talent.status || "Active"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content section */}
        <div className="flex-1">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Talent Information</h3>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Personal Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Full Name</span>
                          <span>{talent.firstName} {talent.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Date of Birth</span>
                          <span>{talent.birthDate ? new Date(talent.birthDate).toLocaleDateString() : new Date(talent.dateOfBirth).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Nationality</span>
                          <span>{talent.nationality || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Gender</span>
                          <span>{talent.gender}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email</span>
                          <span>{talent.email || talent.contactEmail || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Phone</span>
                          <span>{talent.phone || talent.contactPhone || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Address</span>
                          <span>{talent.address || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Skills & Abilities</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {(talent.skills || []).map((skill, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-gray-500">{skill.level}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(skill.level / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                      {!talent.skills?.length && (
                        <p className="text-gray-500">No skills recorded yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Journey Progress</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Update
                      </Button>
                    </div>
                    
                    <div className="relative">
                      <div className="flex justify-between mb-2">
                        <span>Beginner</span>
                        <span>Developing</span>
                        <span>Advanced</span>
                        <span>Elite</span>
                        <span>Professional</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: (() => {
                              const stages = ["Beginner", "Developing", "Advanced", "Elite", "Professional"];
                              const currentIndex = stages.indexOf(talent.currentStage);
                              return `${((currentIndex + 1) / stages.length) * 100}%`;
                            })()
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="performance">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <p className="text-gray-500">Performance data will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Journey Timeline</h3>
                  <p className="text-gray-500">Timeline data will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Coach Notes</h3>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                  
                  <p className="text-gray-500">Coach notes will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
