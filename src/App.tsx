import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import TalentsPage from "./pages/TalentsPage";
import TalentDetail from "./pages/TalentDetail";
import NewTalentPage from "./pages/NewTalentPage";
import EventsPage from "./pages/EventsPage";
import AchievementsPage from "./pages/AchievementsPage";
import NewAchievementPage from "./pages/NewAchievementPage";
import ReportsPage from "./pages/ReportsPage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import NotFound from "./pages/NotFound";
import NewEventPage from "./pages/NewEventPage";
import NewStoryPage from "./pages/NewStoryPage";
import NewCompetitionPage from "./pages/NewCompetitionPage";
import SettingsPage from "./pages/SettingsPage";
import TeamsPage from '@/pages/TeamsPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/talents" element={<TalentsPage />} />
            <Route path="/talents/new" element={<NewTalentPage />} />
            <Route path="/talents/:id" element={<TalentDetail />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/new" element={<NewEventPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/achievements/new" element={<NewAchievementPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/success-stories/new" element={<NewStoryPage />} />
            <Route path="/competitions" element={<CompetitionsPage />} />
            <Route path="/competitions/new" element={<NewCompetitionPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
