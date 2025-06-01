import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, Download, FileText } from "lucide-react";
import { Report } from "@/types/report.types";

interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case "Performance":
        return <BarChart3 className="h-4 w-4" />;
      case "Financial":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between">
          <Badge variant={report.type === "Financial" ? "destructive" : "default"}>
            {getReportTypeIcon(report.type)}
            <span className="ml-1">{report.type}</span>
          </Badge>
          <span className="text-sm text-gray-500">
            {formatDate(report.generated_date)}
          </span>
        </div>
        <CardTitle className="text-lg mt-2">{report.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-gray-500">Period:</span>{" "}
              {formatDate(report.period_start)} - {formatDate(report.period_end)}
            </div>
            <div className="text-gray-500">By {report.author}</div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {report.disciplines.length > 3 ? (
              <>
                {report.disciplines.slice(0, 2).map(discipline => (
                  <Badge key={discipline} variant="outline">
                    {discipline}
                  </Badge>
                ))}
                <Badge variant="outline">
                  +{report.disciplines.length - 2} more
                </Badge>
              </>
            ) : (
              report.disciplines.map(discipline => (
                <Badge key={discipline} variant="outline">
                  {discipline}
                </Badge>
              ))
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: Implement view report functionality
                console.log('View report clicked:', report.id);
              }}
            >
              View Report
            </Button>
            {report.file_url && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // TODO: Implement download functionality
                  console.log('Download report clicked:', report.id);
                  window.open(report.file_url, '_blank');
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
