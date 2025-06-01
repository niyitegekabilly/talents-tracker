
export interface Report {
  id: string;
  title: string;
  type: string;
  generated_date: string;
  author: string;
  disciplines: string[];
  teams: string[];
  period_start: string;
  period_end: string;
  file_url?: string;
  group_id?: string;
}

export interface ReportCreate {
  title: string;
  type: string;
  generated_date: string;
  author: string;
  disciplines: string[];
  teams: string[];
  period_start: string;
  period_end: string;
  file_url?: string;
  group_id?: string;
}
