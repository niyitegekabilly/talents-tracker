
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = "https://urndwiimolxscwebrefs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybmR3aWltb2x4c2N3ZWJyZWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NTgzODYsImV4cCI6MjA2MTMzNDM4Nn0._aXNOuAI0Eb2V1iYeGt167tRlOkpcGgsLaaFfVK68SE";

// Create a singleton instance to prevent multiple GoTrueClient instances
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  throw new Error(error.message || 'An error occurred while interacting with the database');
}; 
