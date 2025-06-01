
-- Create the talents table
CREATE TABLE talents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  nationality VARCHAR(100),
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  discipline VARCHAR(50) NOT NULL,
  team VARCHAR(20),
  current_stage VARCHAR(20) NOT NULL,
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'Active',
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create skills table for tracking talent skills
CREATE TABLE talent_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  level SMALLINT NOT NULL CHECK (level BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  awarded_at DATE NOT NULL,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Linking table between talents and achievements
CREATE TABLE talent_achievements (
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  PRIMARY KEY (talent_id, achievement_id)
);

-- Create evaluations table for performance records
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  evaluator_name VARCHAR(200) NOT NULL,
  evaluation_date DATE NOT NULL,
  overall_rating SMALLINT NOT NULL CHECK (overall_rating BETWEEN 1 AND 10),
  comments TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create table for specific evaluation scores
CREATE TABLE evaluation_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  score SMALLINT NOT NULL,
  max_score SMALLINT NOT NULL DEFAULT 10,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Upcoming',
  image_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Linking table for disciplines associated with events
CREATE TABLE event_disciplines (
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  discipline VARCHAR(50) NOT NULL,
  PRIMARY KEY (event_id, discipline)
);

-- Linking table for teams associated with events
CREATE TABLE event_teams (
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  team VARCHAR(20) NOT NULL,
  PRIMARY KEY (event_id, team)
);

-- Linking table for participants in events
CREATE TABLE event_participants (
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  attendance_status VARCHAR(20) DEFAULT 'Registered',
  notes TEXT,
  PRIMARY KEY (event_id, talent_id)
);

-- Create competitions table
CREATE TABLE competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  competition_date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'Upcoming',
  image_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Linking table for disciplines associated with competitions
CREATE TABLE competition_disciplines (
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  discipline VARCHAR(50) NOT NULL,
  PRIMARY KEY (competition_id, discipline)
);

-- Create competition results table
CREATE TABLE competition_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  rank INTEGER NOT NULL,
  score NUMERIC,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create success stories table
CREATE TABLE success_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  publish_date DATE NOT NULL,
  featured_image TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create story tags table
CREATE TABLE story_tags (
  story_id UUID NOT NULL REFERENCES success_stories(id) ON DELETE CASCADE,
  tag VARCHAR(50) NOT NULL,
  PRIMARY KEY (story_id, tag)
);

-- Create reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  generated_date DATE NOT NULL,
  author VARCHAR(200) NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  content TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Linking table for disciplines associated with reports
CREATE TABLE report_disciplines (
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  discipline VARCHAR(50) NOT NULL,
  PRIMARY KEY (report_id, discipline)
);

-- Linking table for teams associated with reports
CREATE TABLE report_teams (
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  team VARCHAR(20) NOT NULL,
  PRIMARY KEY (report_id, team)
);

-- Create report metrics table
CREATE TABLE report_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  value NUMERIC NOT NULL,
  change NUMERIC,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create audit log for tracking changes to talents
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name VARCHAR(50) NOT NULL,
  record_id UUID NOT NULL,
  action VARCHAR(20) NOT NULL,
  changed_by VARCHAR(255) NOT NULL,
  changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  old_values JSONB,
  new_values JSONB
);

-- Create indexes for better query performance
CREATE INDEX idx_talents_discipline ON talents(discipline);
CREATE INDEX idx_talents_team ON talents(team);
CREATE INDEX idx_talents_current_stage ON talents(current_stage);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_competitions_date ON competitions(competition_date);
CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_date ON reports(generated_date);
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_record ON audit_logs(record_id);

-- Create triggers for automatic updated_at timestamp updates
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_talents_timestamp
BEFORE UPDATE ON talents
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_achievements_timestamp
BEFORE UPDATE ON achievements
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_events_timestamp
BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_competitions_timestamp
BEFORE UPDATE ON competitions
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_success_stories_timestamp
BEFORE UPDATE ON success_stories
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_reports_timestamp
BEFORE UPDATE ON reports
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
