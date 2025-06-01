import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { talents } from "@/lib/data";

export default function NewAchievementPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    talentId: "",
    title: "",
    description: "",
    category: "",
    discipline: "",
    awardedAt: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the achievement
    console.log("Form submitted:", formData);
    // For now, just navigate back to the achievements list
    navigate("/achievements");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout title="Record Achievement">
      <Card>
        <CardHeader>
          <CardTitle>Record New Achievement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="talentId">Talent</Label>
                <Select
                  value={formData.talentId}
                  onValueChange={(value) => handleChange("talentId", value)}
                >
                  <SelectTrigger id="talentId">
                    <SelectValue placeholder="Select talent" />
                  </SelectTrigger>
                  <SelectContent>
                    {talents.map((talent) => (
                      <SelectItem key={talent.id} value={talent.id}>
                        {talent.firstName} {talent.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Achievement Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Recognition">Recognition</SelectItem>
                    <SelectItem value="Record">Record</SelectItem>
                    <SelectItem value="Progression">Progression</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discipline">Discipline</Label>
                <Select
                  value={formData.discipline}
                  onValueChange={(value) => handleChange("discipline", value)}
                >
                  <SelectTrigger id="discipline">
                    <SelectValue placeholder="Select discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Football', 'Athletics', 'Basketball', 'Karate', 'Modern Dance', 'Traditional Dance', 'Orchestra', 'Swimming'].map((discipline) => (
                      <SelectItem key={discipline} value={discipline}>
                        {discipline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="awardedAt">Date Awarded</Label>
                <Input
                  id="awardedAt"
                  type="date"
                  value={formData.awardedAt}
                  onChange={(e) => handleChange("awardedAt", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/achievements")}
              >
                Cancel
              </Button>
              <Button type="submit">Save Achievement</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MainLayout>
  );
} 