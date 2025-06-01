'use client';

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut, Save } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Use our settings hook
  const { 
    settings, 
    loading: settingsLoading, 
    updateSettings, 
    updateNotificationSettings,
    updateDisplaySettings,
    updateEmailSettings 
  } = useSettings();

  // System content settings
  const [siteTitle, setSiteTitle] = useState("VJN Talent Track - Sports, Culture & Arts");
  const [siteDescription, setSiteDescription] = useState("Empowering youth through sports, preserving culture, and nurturing artistic expression since 2002");
  const [showLovableBadge, setShowLovableBadge] = useState(true);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Login successful",
        description: "You've been logged in successfully.",
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast({
        title: "Logged out successfully",
        description: "You've been logged out of your account.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your system content settings have been updated.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">System Settings</h1>
      
      <Tabs defaultValue="content">
        <TabsList className="mb-8">
          <TabsTrigger value="content">System Content</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="user-settings">User Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>
                Update the main content displayed throughout the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input 
                  id="siteTitle" 
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input 
                  id="siteDescription"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox 
                  id="showBadge" 
                  checked={showLovableBadge}
                  onCheckedChange={(checked) => setShowLovableBadge(checked as boolean)}
                />
                <Label htmlFor="showBadge">Show Lovable Badge</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="authentication">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Authentication</CardTitle>
                <CardDescription>
                  Sign in as an administrator to manage the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>
                  Manage your current admin session.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout} 
                  disabled={isLoading}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="user-settings">
          {settingsLoading ? (
            <div>Loading settings...</div>
          ) : settings ? (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how you want to receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="emailNotif" 
                      checked={settings.notifications?.email}
                      onCheckedChange={(checked) => 
                        updateNotificationSettings('email', checked as boolean)
                      }
                    />
                    <Label htmlFor="emailNotif">Email notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pushNotif" 
                      checked={settings.notifications?.push}
                      onCheckedChange={(checked) => 
                        updateNotificationSettings('push', checked as boolean)
                      }
                    />
                    <Label htmlFor="pushNotif">Push notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="achievementsNotif" 
                      checked={settings.notifications?.achievements}
                      onCheckedChange={(checked) => 
                        updateNotificationSettings('achievements', checked as boolean)
                      }
                    />
                    <Label htmlFor="achievementsNotif">Achievement notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="eventsNotif" 
                      checked={settings.notifications?.events}
                      onCheckedChange={(checked) => 
                        updateNotificationSettings('events', checked as boolean)
                      }
                    />
                    <Label htmlFor="eventsNotif">Event notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="competitionsNotif" 
                      checked={settings.notifications?.competitions}
                      onCheckedChange={(checked) => 
                        updateNotificationSettings('competitions', checked as boolean)
                      }
                    />
                    <Label htmlFor="competitionsNotif">Competition notifications</Label>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Display Settings</CardTitle>
                  <CardDescription>
                    Configure how the application appears.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="darkMode" 
                      checked={settings.display?.darkMode}
                      onCheckedChange={(checked) => 
                        updateDisplaySettings('darkMode', checked as boolean)
                      }
                    />
                    <Label htmlFor="darkMode">Dark mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="compactView" 
                      checked={settings.display?.compactView}
                      onCheckedChange={(checked) => 
                        updateDisplaySettings('compactView', checked as boolean)
                      }
                    />
                    <Label htmlFor="compactView">Compact view</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="showImages" 
                      checked={settings.display?.showImages}
                      onCheckedChange={(checked) => 
                        updateDisplaySettings('showImages', checked as boolean)
                      }
                    />
                    <Label htmlFor="showImages">Show images</Label>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Email Settings</CardTitle>
                  <CardDescription>
                    Configure your email preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email address</Label>
                    <Input 
                      id="userEmail" 
                      type="email"
                      value={settings.email?.email || ''}
                      onChange={(e) => 
                        updateEmailSettings(e.target.value, settings.email?.frequency || 'daily')
                      }
                      placeholder="your@email.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailFrequency">Email Frequency</Label>
                    <Select 
                      value={settings.email?.frequency || 'daily'} 
                      onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                        updateEmailSettings(settings.email?.email || '', value)
                      }
                    >
                      <SelectTrigger id="emailFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>Error loading settings. Please try again.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
