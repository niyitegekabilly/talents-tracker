import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Home, 
  Users, 
  Calendar, 
  Award, 
  BarChart, 
  Settings,
  FileText,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  expanded: boolean;
  active?: boolean;
};

const NavItem = ({ icon: Icon, label, to, expanded, active }: NavItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal",
          expanded ? "px-4" : "px-2",
          active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        {expanded && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = window.location.pathname;

  return (
    <div 
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {expanded ? (
          <div className="text-sidebar-foreground font-semibold text-xl">
            VJN Talents
          </div>
        ) : (
          <div className="text-sidebar-foreground font-bold text-xl mx-auto">
            VJN
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", !expanded && "rotate-180")} />
        </Button>
      </div>
      
      <div className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        <NavItem icon={Home} label="Dashboard" to="/" expanded={expanded} active={pathname === "/"} />
        <NavItem icon={Users} label="Talents" to="/talents" expanded={expanded} active={pathname.startsWith("/talents")} />
        <NavItem icon={Calendar} label="Events" to="/events" expanded={expanded} active={pathname.startsWith("/events")} />
        <NavItem icon={Award} label="Achievements" to="/achievements" expanded={expanded} active={pathname.startsWith("/achievements")} />
        <NavItem icon={Star} label="Success Stories" to="/success-stories" expanded={expanded} active={pathname.startsWith("/success-stories")} />
        <NavItem icon={FileText} label="Competitions" to="/competitions" expanded={expanded} active={pathname.startsWith("/competitions")} />
        <NavItem icon={Users} label="Teams" to="/teams" expanded={expanded} active={pathname.startsWith("/teams")} />
        <NavItem icon={BarChart} label="Reports" to="/reports" expanded={expanded} active={pathname.startsWith("/reports")} />
      </div>

      <div className="p-2 border-t border-sidebar-border">
        <NavItem icon={Settings} label="Settings" to="/settings" expanded={expanded} active={pathname.startsWith("/settings")} />
      </div>
    </div>
  );
}
