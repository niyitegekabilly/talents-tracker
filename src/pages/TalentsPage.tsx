
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { TalentTable } from "@/components/talents/TalentTable";

const TalentsPage = () => {
  return (
    <ProtectedRoute>
      <MainLayout title="Talents">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manage Talents</h2>
          <Button asChild>
            <Link to="/talents/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Talent
            </Link>
          </Button>
        </div>
        <TalentTable />
      </MainLayout>
    </ProtectedRoute>
  );
};

export default TalentsPage;
