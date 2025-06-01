
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: number;
  description?: string;
  className?: string;
  color?: string;
}

export function StatCard({ title, value, icon, trend, description, className }: StatCardProps) {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="text-gray-400 dark:text-gray-500">{icon}</div>
      </div>
      
      <div className="flex flex-col">
        <div className="text-2xl font-bold mb-1">{value}</div>
        
        {(trend !== undefined || description) && (
          <div className="flex items-center text-sm">
            {trend !== undefined && (
              <span 
                className={cn(
                  "flex items-center font-medium",
                  trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : "text-gray-500"
                )}
              >
                {trend > 0 ? (
                  <span className="mr-1">↑</span>
                ) : trend < 0 ? (
                  <span className="mr-1">↓</span>
                ) : null}
                {Math.abs(trend)}%
              </span>
            )}
            
            {description && (
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                {trend !== undefined ? ' ' : ''}{description}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
