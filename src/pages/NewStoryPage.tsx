import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Sample talents data - in a real app, this would come from an API
const talents = [
  { id: "t001", name: "Emmanuel Addo", discipline: "Football" },
  { id: "t002", name: "Fatima Diallo", discipline: "Traditional Dance" },
  { id: "t003", name: "Omar Mensah", discipline: "Swimming" },
  { id: "t004", name: "Sophia Okafor", discipline: "Orchestra" }
];

export default function NewStoryPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    talentId: "",
    title: "",
    content: "",
    publishDate: new Date().toISOString().split('T')[0],
    tags: [] as string[],
    discipline: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the story
    console.log("Form submitted:", formData);
    // For now, just navigate back to the stories list
    navigate("/success-stories");
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTalentChange = (talentId: string) => {
    const selectedTalent = talents.find(t => t.id === talentId);
    setFormData(prev => ({
      ...prev,
      talentId,
      discipline: selectedTalent?.discipline || ""
    }));
  };

  return (
    <MainLayout title="Create Success Story">
      <Card>
        <CardHeader>
          <CardTitle>Create New Success Story</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="talent">Talent</Label>
                <Select
                  value={formData.talentId}
                  onValueChange={handleTalentChange}
                >
                  <SelectTrigger id="talent">
                    <SelectValue placeholder="Select talent" />
                  </SelectTrigger>
                  <SelectContent>
                    {talents.map((talent) => (
                      <SelectItem key={talent.id} value={talent.id}>
                        {talent.name} ({talent.discipline})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishDate">Publish Date</Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleChange("publishDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Story Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Story Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags.join(", ")}
                onChange={(e) => handleChange("tags", e.target.value.split(",").map(tag => tag.trim()))}
                placeholder="e.g., Football, Professional, National Team"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/success-stories")}
              >
                Cancel
              </Button>
              <Button type="submit">Create Story</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MainLayout>
  );
} 