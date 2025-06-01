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

export type TalentRow = Database['public']['Tables']['talents']['Row'];
export type TalentInsert = Database['public']['Tables']['talents']['Insert'];
export type TalentUpdate = Database['public']['Tables']['talents']['Update'];

export type EventRow = Database['public']['Tables']['events']['Row'];
export type EventInsert = Database['public']['Tables']['events']['Insert'];
export type EventUpdate = Database['public']['Tables']['events']['Update'];

export type AchievementRow = Database['public']['Tables']['achievements']['Row'];
export type AchievementInsert = Database['public']['Tables']['achievements']['Insert'];
export type AchievementUpdate = Database['public']['Tables']['achievements']['Update'];

export type SuccessStoryRow = Database['public']['Tables']['success_stories']['Row'];
export type SuccessStoryInsert = Database['public']['Tables']['success_stories']['Insert'];
export type SuccessStoryUpdate = Database['public']['Tables']['success_stories']['Update'];

export type CompetitionRow = Database['public']['Tables']['competitions']['Row'];
export type CompetitionInsert = Database['public']['Tables']['competitions']['Insert'];
export type CompetitionUpdate = Database['public']['Tables']['competitions']['Update'];

export type CompetitionParticipantRow = Database['public']['Tables']['competition_participants']['Row'];
export type CompetitionParticipantInsert = Database['public']['Tables']['competition_participants']['Insert'];
export type CompetitionParticipantUpdate = Database['public']['Tables']['competition_participants']['Update']; 