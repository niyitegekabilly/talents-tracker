
import { z } from 'zod';
import { talentSchema, eventSchema, achievementSchema, successStorySchema, competitionSchema } from '@/lib/schema';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      talents: {
        Row: {
          id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: 'Male' | 'Female' | 'Other'
          discipline: 'Football' | 'Athletics' | 'Basketball' | 'Karate' | 'Modern Dance' | 'Traditional Dance' | 'Orchestra' | 'Swimming'
          team: 'Academy' | 'U18' | 'Senior'
          current_stage: 'Beginner' | 'Developing' | 'Advanced' | 'Elite' | 'Professional'
          contact_phone: string | null
          contact_email: string
          bio: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['talents']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['talents']['Insert']>
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          start_date: string
          end_date: string
          location: string
          disciplines: string[]
          teams: string[]
          status: 'Upcoming' | 'In Progress' | 'Completed'
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['events']['Insert']>
      }
      achievements: {
        Row: {
          id: string
          talent_id: string
          title: string
          description: string
          category: 'Competition' | 'Recognition' | 'Record' | 'Progression'
          discipline: string
          awarded_at: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>
      }
      success_stories: {
        Row: {
          id: string
          talent_id: string
          title: string
          content: string
          publish_date: string
          tags: string[]
          discipline: string
          featured_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['success_stories']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['success_stories']['Insert']>
      }
      competitions: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          location: string
          disciplines: string[]
          status: 'Upcoming' | 'In Progress' | 'Completed'
          results: Json | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['competitions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['competitions']['Insert']>
      }
      competition_participants: {
        Row: {
          competition_id: string
          talent_id: string
          registration_date: string
        }
        Insert: Omit<Database['public']['Tables']['competition_participants']['Row'], 'registration_date'>
        Update: Partial<Database['public']['Tables']['competition_participants']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gender_type: 'Male' | 'Female' | 'Other'
      team_type: 'Academy' | 'U18' | 'Senior'
      stage_type: 'Beginner' | 'Developing' | 'Advanced' | 'Elite' | 'Professional'
      discipline_type: 'Football' | 'Athletics' | 'Basketball' | 'Karate' | 'Modern Dance' | 'Traditional Dance' | 'Orchestra' | 'Swimming'
      achievement_category_type: 'Competition' | 'Recognition' | 'Record' | 'Progression'
      status_type: 'Upcoming' | 'In Progress' | 'Completed'
    }
  }
}

export type TalentRow = {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  discipline: string;
  team: string;
  current_stage: string;
  contact_email: string;
  contact_phone: string;
  bio: string;
  created_at: string;
  updated_at: string;
};

export type TalentInsert = Omit<TalentRow, 'id' | 'created_at' | 'updated_at'>;
export type TalentUpdate = Partial<TalentInsert>;

export type EventRow = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  disciplines: string[];
  teams: string[];
  status: string;
  created_at: string;
  updated_at: string;
};

export type EventInsert = Omit<EventRow, 'id' | 'created_at' | 'updated_at'>;
export type EventUpdate = Partial<EventInsert>;

export type AchievementRow = {
  id: string;
  talent_id: string;
  title: string;
  description: string;
  category: string;
  discipline: string;
  awarded_date: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type AchievementInsert = Omit<AchievementRow, 'id' | 'created_at' | 'updated_at'>;
export type AchievementUpdate = Partial<AchievementInsert>;

export type SuccessStoryRow = {
  id: string;
  talent_id: string;
  title: string;
  content: string;
  publish_date: string;
  tags: string[];
  discipline: string;
  featured_image: string | null;
  created_at: string;
  updated_at: string;
};

export type SuccessStoryInsert = Omit<SuccessStoryRow, 'id' | 'created_at' | 'updated_at'>;
export type SuccessStoryUpdate = Partial<SuccessStoryInsert>;

export type CompetitionRow = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  disciplines: string[];
  status: string;
  results: Record<string, any> | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type CompetitionInsert = Omit<CompetitionRow, 'id' | 'created_at' | 'updated_at'>;
export type CompetitionUpdate = Partial<CompetitionInsert>;

export type CompetitionParticipantRow = {
  id: string;
  competition_id: string;
  talent_id: string;
  created_at: string;
  updated_at: string;
};

export type CompetitionParticipantInsert = Omit<CompetitionParticipantRow, 'id' | 'created_at' | 'updated_at'>;
export type CompetitionParticipantUpdate = Partial<CompetitionParticipantInsert>;
