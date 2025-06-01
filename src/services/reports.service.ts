
import { supabase } from "@/integrations/supabase/client";
import { Report, ReportCreate } from "@/types/report.types";

export interface FetchReportsOptions {
  page?: number;
  pageSize?: number;
  type?: string;
  discipline?: string;
  searchQuery?: string;
  timeFrame?: string;
}

export const fetchReports = async ({ 
  page = 1, 
  pageSize = 10, 
  type = 'all',
  discipline = 'all',
  searchQuery = '',
  timeFrame = 'all'
}: FetchReportsOptions = {}) => {
  try {
    // Start building the query
    let query = supabase
      .from('media')
      .select('*')
      .eq('type', 'report');

    // Apply filters
    if (type !== 'all') {
      query = query.ilike('description->type', `%${type}%`);
    }

    if (discipline !== 'all') {
      query = query.ilike('description->disciplines', `%${discipline}%`);
    }

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,description->author.ilike.%${searchQuery}%`);
    }

    if (timeFrame === 'recent') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      query = query.gte('date', threeMonthsAgo.toISOString());
    } else if (timeFrame === 'financial') {
      query = query.ilike('description->type', '%Financial%');
    } else if (timeFrame === 'performance') {
      query = query.ilike('description->type', '%Performance%');
    }

    // Get total count for pagination
    const { count, error: countError } = await supabase
      .from('media')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'report');

    if (countError) {
      throw countError;
    }

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    query = query.range(from, to).order('date', { ascending: false });

    // Execute query
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Transform data to match our Report interface
    const reports = data.map(item => {
      // Parse the description field which is stored as a JSON string in the database
      const description = typeof item.description === 'string' 
        ? JSON.parse(item.description) 
        : item.description || {};
        
      return {
        id: item.id,
        title: item.title,
        type: description.type || 'Other',
        generated_date: item.date,
        author: description.author || 'Unknown',
        disciplines: description.disciplines || [],
        teams: description.teams || [],
        period_start: description.period?.start || item.date,
        period_end: description.period?.end || item.date,
        file_url: item.url
      };
    });

    return {
      data: reports,
      count: count || 0,
      page,
      pageSize
    };
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

export const createReport = async (report: ReportCreate) => {
  try {
    // Create a properly structured metadata object to be stored in the description field
    const reportMetadata = {
      type: report.type,
      author: report.author,
      disciplines: report.disciplines,
      teams: report.teams,
      period: {
        start: report.period_start,
        end: report.period_end
      }
    };

    // Convert the metadata to a string for storage in the description field
    const descriptionString = JSON.stringify(reportMetadata);

    // Insert the data into the media table
    const { data, error } = await supabase
      .from('media')
      .insert({
        title: report.title,
        description: descriptionString,
        type: 'report',
        date: report.generated_date,
        url: report.file_url || '',
        created_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};
