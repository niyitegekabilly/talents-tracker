import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Users } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function MainLayout({ children, title }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={handleMenuClick} title={title} />
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
