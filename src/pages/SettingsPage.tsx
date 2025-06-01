import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { SettingsPage as SettingsPageComponent } from "@/components/settings/settings-page";
import { Navigate, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const SettingsPage = () => {
  const { isAdmin, isLoading, user } = useAuth();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Only show access denied if user is authenticated but not admin and not currently loading
  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      // Add a small delay to allow role updates to propagate
      const timer = setTimeout(() => {
        toast({
          variant: "destructive",
          title: "Access denied",
          description: "This area is restricted to administrators only."
        });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, user, isAdmin, toast]);

  const createOrUpdateAdminRole = async (userId: string) => {
    try {
      // First, try to get the current user's profile
      const { data: existingProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "not found"
        console.log("Error fetching profile:", profileError);
      }

      // Update or insert the profile with admin role
      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          email: email,
          full_name: "Administrator",
          role: "admin"
        });

      if (upsertError) {
        console.log("Profile upsert error:", upsertError);
      }

      // Also try to add to user_roles table if it exists
      const { error: roleError } = await supabase
        .from("user_roles")
        .upsert({
          user_id: userId,
          role: "admin"
        });

      if (roleError) {
        console.log("User roles upsert error (this might be normal if table doesn't exist):", roleError);
      }

      return true;
    } catch (error) {
      console.error("Error setting admin role:", error);
      return false;
    }
  };

  const createAdminUser = async () => {
    try {
      console.log("Creating admin user...");
      
      // First try to sign up the admin user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: "admin@example.com",
        password: "admin123",
        options: {
          data: {
            full_name: "Administrator"
          }
        }
      });

      if (signUpError && !signUpError.message.includes("already registered")) {
        throw signUpError;
      }

      console.log("Admin user creation result:", signUpData);
      
      // If user was created or already exists, try to update their role
      const { data: usersData } = await supabase.auth.admin.listUsers();
      const adminUser = usersData?.users?.find((u: any) => u.email === "admin@example.com");
      
      if (adminUser) {
        await createOrUpdateAdminRole(adminUser.id);
      }

      toast({
        title: "Admin user ready",
        description: "You can now login with admin@example.com / admin123"
      });

    } catch (error: any) {
      console.error("Error creating admin user:", error);
      toast({
        variant: "destructive",
        title: "Setup needed",
        description: "Please create an admin user in Supabase console first."
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAttempted) return; // Prevent multiple rapid attempts
    
    setLoginLoading(true);
    setLoginAttempted(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          // Try to create admin user if login fails
          await createAdminUser();
          return;
        }
        throw error;
      }

      // Set admin role for the logged-in user
      const roleSet = await createOrUpdateAdminRole(data.user.id);
      
      if (!roleSet) {
        toast({
          variant: "destructive",
          title: "Role setup failed",
          description: "Could not set admin role. Please check your database permissions.",
        });
        await supabase.auth.signOut();
        return;
      }

      // Check if user has admin role after setting it
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profileData) {
        toast({
          variant: "destructive",
          title: "Profile not found",
          description: "Admin profile needs to be set up in Supabase.",
        });
        await supabase.auth.signOut();
        return;
      }

      if (profileData.role !== "admin") {
        await supabase.auth.signOut();
        toast({
          variant: "destructive",
          title: "Access denied",
          description: "This area is restricted to administrators only.",
        });
      } else {
        toast({
          title: "Login successful",
          description: "Welcome to the admin settings panel.",
        });
        // Redirect to dashboard after successful login
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Something went wrong. Please try again.",
      });
      console.error("Login error:", error);
    } finally {
      setLoginLoading(false);
      // Reset login attempt flag after a delay
      setTimeout(() => setLoginAttempted(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <MainLayout title="Settings">
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-64 w-full" />
        </div>
      </MainLayout>
    );
  }

  // If already authenticated but not admin, redirect to dashboard
  if (user && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If already authenticated as admin, show settings
  if (user && isAdmin) {
    return (
      <MainLayout title="Settings">
        <SettingsPageComponent />
      </MainLayout>
    );
  }

  // Show login form for non-authenticated users
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin settings
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
            <Button type="submit" disabled={loginLoading || loginAttempted} className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              {loginLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Default credentials:</p>
            <p><strong>Email:</strong> admin@example.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPage;
