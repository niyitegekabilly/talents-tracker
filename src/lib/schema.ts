import { z } from "zod";

// Base schemas for common fields
const baseSchema = {
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

// Settings schema
export const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    achievements: z.boolean(),
    events: z.boolean(),
    competitions: z.boolean(),
  }),
  display: z.object({
    darkMode: z.boolean(),
    compactView: z.boolean(),
    showImages: z.boolean(),
  }),
  email: z.object({
    email: z.string().email(),
    frequency: z.enum(['daily', 'weekly', 'monthly']),
  }),
});

// Talent schema
export const talentSchema = z.object({
  ...baseSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  discipline: z.enum([
    "Football",
    "Athletics",
    "Basketball",
    "Karate",
    "Modern Dance",
    "Traditional Dance",
    "Orchestra",
    "Swimming"
  ]),
  team: z.enum(["Academy", "U18", "Senior"]),
  currentStage: z.enum(["Beginner", "Developing", "Advanced", "Elite", "Professional"]),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email(),
  bio: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

// Event schema
export const eventSchema = z.object({
  ...baseSchema,
  title: z.string().min(1),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string(),
  disciplines: z.array(z.enum([
    "Football",
    "Athletics",
    "Basketball",
    "Karate",
    "Modern Dance",
    "Traditional Dance",
    "Orchestra",
    "Swimming"
  ])),
  teams: z.array(z.enum(["Academy", "U18", "Senior"])),
  status: z.enum(["Upcoming", "In Progress", "Completed"]),
  imageUrl: z.string().url().optional(),
});

// Achievement schema
export const achievementSchema = z.object({
  ...baseSchema,
  talentId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  category: z.enum(["Competition", "Recognition", "Record", "Progression"]),
  discipline: z.enum([
    "Football",
    "Athletics",
    "Basketball",
    "Karate",
    "Modern Dance",
    "Traditional Dance",
    "Orchestra",
    "Swimming"
  ]),
  awardedAt: z.date(),
  imageUrl: z.string().url().optional(),
});

// Success Story schema
export const successStorySchema = z.object({
  ...baseSchema,
  talentId: z.string().uuid(),
  title: z.string().min(1),
  content: z.string(),
  publishDate: z.date(),
  tags: z.array(z.string()),
  discipline: z.enum([
    "Football",
    "Athletics",
    "Basketball",
    "Karate",
    "Modern Dance",
    "Traditional Dance",
    "Orchestra",
    "Swimming"
  ]),
  featuredImage: z.string().url().optional(),
});

// Competition schema
export const competitionSchema = z.object({
  ...baseSchema,
  title: z.string().min(1),
  description: z.string(),
  date: z.date(),
  location: z.string(),
  disciplines: z.array(z.enum([
    "Football",
    "Athletics",
    "Basketball",
    "Karate",
    "Modern Dance",
    "Traditional Dance",
    "Orchestra",
    "Swimming"
  ])),
  participants: z.array(z.string().uuid()), // Array of talent IDs
  status: z.enum(["Upcoming", "In Progress", "Completed"]),
  results: z.array(z.object({
    teamName: z.string(),
    rank: z.number(),
    score: z.number(),
  })).optional(),
  imageUrl: z.string().url().optional(),
});

// Type exports
export type Talent = z.infer<typeof talentSchema>;
export type Event = z.infer<typeof eventSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type SuccessStory = z.infer<typeof successStorySchema>;
export type Competition = z.infer<typeof competitionSchema>;
export type Settings = z.infer<typeof settingsSchema>;

// Database schema (for reference)
/*
CREATE TABLE talents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(50) NOT NULL,
  discipline VARCHAR(100) NOT NULL,
  team VARCHAR(50) NOT NULL,
  current_stage VARCHAR(50) NOT NULL,
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255) NOT NULL,
  bio TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(255) NOT NULL,
  disciplines VARCHAR(100)[] NOT NULL,
  teams VARCHAR(50)[] NOT NULL,
  status VARCHAR(50) NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  talent_id UUID NOT NULL REFERENCES talents(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  discipline VARCHAR(100) NOT NULL,
  awarded_at DATE NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  talent_id UUID NOT NULL REFERENCES talents(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  publish_date DATE NOT NULL,
  tags VARCHAR(100)[] NOT NULL,
  discipline VARCHAR(100) NOT NULL,
  featured_image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  disciplines VARCHAR(100)[] NOT NULL,
  participants UUID[] NOT NULL,
  status VARCHAR(50) NOT NULL,
  results JSONB,
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for competition participants
CREATE TABLE competition_participants (
  competition_id UUID REFERENCES competitions(id),
  talent_id UUID REFERENCES talents(id),
  PRIMARY KEY (competition_id, talent_id)
);

CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  settings JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
*/

export type Sport = 'football' | 'handball' | 'swimming';

export interface Player {
  id: string;
  ma_id: string;
  fifa_id: string;
  first_name: string;
  family_name: string;
  date_of_birth: string;
  age_level: string;
  registration_period: string;
  date_registration_added: string;
  date_registration_approved: string | null;
  nature_of_registration: string;
  source_club: string | null;
  home_phone: string | null;
  identification_number: string;
  profile_picture_url: string | null;
  sport: Sport;
  position?: string; // For football players
  jersey_number?: number; // For football and handball players
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  name: string;
  sport: Sport;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
} 