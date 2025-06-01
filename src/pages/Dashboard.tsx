
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DisciplineDistribution } from "@/components/dashboard/DisciplineDistribution";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Calendar, Users, Award, Medal } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <MainLayout title="Dashboard">
        <div className="grid gap-4 md:gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard 
              title="Total Talents"
              value={248} // Changed from string to number
              trend={12} // Changed from string to number
              description="vs. previous month"
              icon={<Users className="h-5 w-5" />} // Wrapped in fragment to make it ReactNode
              className="text-blue-500"
            />
            <StatCard 
              title="Events This Month"
              value={8} // Changed from string to number
              trend={2} // Changed from string to number
              description="vs. previous month"
              icon={<Calendar className="h-5 w-5" />} // Wrapped in fragment to make it ReactNode
              className="text-purple-500"
            />
            <StatCard 
              title="Achievements"
              value={32} // Changed from string to number
              trend={0} // Changed from string to number
              description="vs. previous month"
              icon={<Award className="h-5 w-5" />} // Wrapped in fragment to make it ReactNode
              className="text-amber-500"
            />
            <StatCard 
              title="Competitions Won"
              value={6} // Changed from string to number
              trend={3} // Changed from string to number
              description="vs. previous month"
              icon={<Medal className="h-5 w-5" />} // Wrapped in fragment to make it ReactNode
              className="text-emerald-500"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <DisciplineDistribution />
            <RecentActivity />
          </div>
          
          <div>
            <UpcomingEvents />
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
