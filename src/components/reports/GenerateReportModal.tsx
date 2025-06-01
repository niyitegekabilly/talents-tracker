
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { createReport } from "@/services/reports.service";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ReportCreate } from "@/types/report.types";

interface GenerateReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function GenerateReportModal({ 
  open, 
  onOpenChange,
  onSuccess
}: GenerateReportModalProps) {
  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState("Performance");
  const [author, setAuthor] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [discipline, setDiscipline] = useState("");
  const [team, setTeam] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setReportType("Performance");
    setAuthor("");
    setStartDate(new Date());
    setEndDate(new Date());
    setDisciplines([]);
    setTeams([]);
    setDiscipline("");
    setTeam("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reportType || !author || !startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields."
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const reportData: ReportCreate = {
        title,
        type: reportType,
        author,
        generated_date: new Date().toISOString(),
        disciplines,
        teams,
        period_start: startDate.toISOString(),
        period_end: endDate.toISOString()
      };
      
      await createReport(reportData);
      
      toast({
        variant: "default",
        title: "Success!",
        description: "Your report has been generated successfully."
      });
      
      resetForm();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error generating your report. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addDiscipline = () => {
    if (discipline && !disciplines.includes(discipline)) {
      setDisciplines([...disciplines, discipline]);
      setDiscipline("");
    }
  };

  const removeDiscipline = (index: number) => {
    setDisciplines(disciplines.filter((_, i) => i !== index));
  };

  const addTeam = () => {
    if (team && !teams.includes(team)) {
      setTeams([...teams, team]);
      setTeam("");
    }
  };

  const removeTeam = (index: number) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate New Report</DialogTitle>
          <DialogDescription>
            Create a new report by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Report Title</Label>
              <Input 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter report title"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Progress">Progress</SelectItem>
                  <SelectItem value="Attendance">Attendance</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input 
                id="author" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Disciplines</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {disciplines.map((d, index) => (
                  <Badge key={index} className="flex items-center gap-1">
                    {d}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeDiscipline(index);
                      }}
                      className="h-4 w-4 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={discipline} onValueChange={setDiscipline}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select discipline" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Button 
                  type="button" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addDiscipline();
                  }} 
                  variant="secondary"
                >
                  Add
                </Button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Teams</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {teams.map((t, index) => (
                  <Badge key={index} className="flex items-center gap-1">
                    {t}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeTeam(index);
                      }}
                      className="h-4 w-4 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={team} onValueChange={setTeam}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academy">Academy</SelectItem>
                    <SelectItem value="U18">U18</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addTeam();
                  }} 
                  variant="secondary"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {isSubmitting ? "Generating..." : "Generate Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
