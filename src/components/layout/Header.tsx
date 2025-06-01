
import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";
import { NotificationBell } from "@/components/notifications/NotificationBell";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden mr-2"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <NotificationBell />
      </div>
    </header>
  );
}
