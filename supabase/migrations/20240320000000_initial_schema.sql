-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE team_type AS ENUM ('Academy', 'U18', 'Senior');
CREATE TYPE stage_type AS ENUM ('Beginner', 'Developing', 'Advanced', 'Elite', 'Professional');
CREATE TYPE discipline_type AS ENUM (
  'Football',
  'Athletics',
  'Basketball',
  'Karate',
  'Modern Dance',
  'Traditional Dance',
  'Orchestra',
  'Swimming'
);
CREATE TYPE achievement_category_type AS ENUM ('Competition', 'Recognition', 'Record', 'Progression');
CREATE TYPE status_type AS ENUM ('Upcoming', 'In Progress', 'Completed');

-- Create tables
CREATE TABLE talents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender gender_type NOT NULL,
  discipline discipline_type NOT NULL,
  team team_type NOT NULL,
  current_stage stage_type NOT NULL,
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255) NOT NULL,
  bio TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_contact_email UNIQUE (contact_email)
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(255) NOT NULL,
  disciplines discipline_type[] NOT NULL,
  teams team_type[] NOT NULL,
  status status_type NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_event_dates CHECK (end_date > start_date)
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category achievement_category_type NOT NULL,
  discipline discipline_type NOT NULL,
  awarded_at DATE NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  publish_date DATE NOT NULL,
  tags VARCHAR(100)[] NOT NULL,
  discipline discipline_type NOT NULL,
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
  disciplines discipline_type[] NOT NULL,
  status status_type NOT NULL,
  results JSONB,
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competition_participants (
  competition_id UUID REFERENCES competitions(id) ON DELETE CASCADE,
  talent_id UUID REFERENCES talents(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (competition_id, talent_id)
);

-- Create indexes
CREATE INDEX idx_talents_discipline ON talents(discipline);
CREATE INDEX idx_talents_team ON talents(team);
CREATE INDEX idx_talents_current_stage ON talents(current_stage);
CREATE INDEX idx_events_dates ON events(start_date, end_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_achievements_talent ON achievements(talent_id);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_success_stories_talent ON success_stories(talent_id);
CREATE INDEX idx_success_stories_publish_date ON success_stories(publish_date);
CREATE INDEX idx_competitions_date ON competitions(date);
CREATE INDEX idx_competitions_status ON competitions(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_talents_updated_at
    BEFORE UPDATE ON talents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_achievements_updated_at
    BEFORE UPDATE ON achievements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_success_stories_updated_at
    BEFORE UPDATE ON success_stories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitions_updated_at
    BEFORE UPDATE ON competitions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 