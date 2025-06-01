import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, FileText, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { fetchReports, FetchReportsOptions } from "@/services/reports.service";
import { Report } from "@/types/report.types";
import { ReportCard } from "@/components/reports/ReportCard";
import { GenerateReportModal } from "@/components/reports/GenerateReportModal";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ReportsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [disciplineFilter, setDisciplineFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReports, setTotalReports] = useState(0);
  const [pageSize] = useState(10);
  
  const getReports = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const options: FetchReportsOptions = {
        page: currentPage,
        pageSize,
        type: typeFilter,
        discipline: disciplineFilter,
        searchQuery,
        timeFrame: activeTab
      };
      
      const result = await fetchReports(options);
      setReports(result.data);
      setTotalReports(result.count);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load reports. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load reports. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getReports();
  }, [currentPage, typeFilter, disciplineFilter, activeTab]);
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      getReports();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const refreshReports = () => {
    getReports();
  };
  
  const totalPages = Math.ceil(totalReports / pageSize);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const paginationItems = [];
    const maxVisiblePages = 5;
    
    // Previous button
    paginationItems.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible pages
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      paginationItems.push(
        <PaginationItem key={1}>
          <PaginationLink 
            isActive={currentPage === 1} 
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Show ellipsis if needed
      if (currentPage > 3) {
        paginationItems.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        if (i === 1 || i === totalPages) continue;
        
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        paginationItems.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      // Show last page
      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Next button
    paginationItems.push(
      <PaginationItem key="next">
        <PaginationNext 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (currentPage < totalPages) {
              handlePageChange(currentPage + 1);
            }
          }}
          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );
    
    return (
      <Pagination className="mt-8">
        <PaginationContent>{paginationItems}</PaginationContent>
      </Pagination>
    );
  };

  return (
    <MainLayout title="Reports">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Analytics & Reports</h2>
        <Button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsGenerateModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full md:w-fit">
                <TabsTrigger value="all">All Reports</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 md:w-56"
            />
            
            <div className="w-40">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Progress">Progress</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Attendance">Attendance</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-40">
              <Select value={disciplineFilter} onValueChange={setDisciplineFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Discipline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Disciplines</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Athletics">Athletics</SelectItem>
                  <SelectItem value="Karate">Karate</SelectItem>
                  <SelectItem value="Modern Dance">Modern Dance</SelectItem>
                  <SelectItem value="Traditional Dance">Traditional Dance</SelectItem>
                  <SelectItem value="Orchestra">Orchestra</SelectItem>
                  <SelectItem value="Swimming">Swimming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="grid gap-4">
            {Array(3).fill(0).map((_, index) => (
              <Card key={index} className="h-[200px] animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">Error loading reports</h3>
              <p className="text-gray-500 text-center mt-1">
                {error}
              </p>
              <Button variant="outline" className="mt-4" onClick={refreshReports}>
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : reports.length === 0 ? (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">No reports found</h3>
              <p className="text-gray-500 text-center mt-1">
                No reports match your current filters. Try adjusting your search criteria.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery("");
                setTypeFilter("all");
                setDisciplineFilter("all");
                setActiveTab("all");
              }}>
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4">
              {reports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
            {renderPagination()}
          </>
        )}
      </div>
      
      <GenerateReportModal 
        open={isGenerateModalOpen}
        onOpenChange={setIsGenerateModalOpen}
        onSuccess={refreshReports}
      />
    </MainLayout>
  );
}
