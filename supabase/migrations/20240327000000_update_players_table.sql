-- Create players table if it doesn't exist
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ma_id VARCHAR(255),
    fifa_id VARCHAR(255),
    first_name VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    level VARCHAR(50) DEFAULT 'amateur',
    age_level VARCHAR(50) DEFAULT 'Adulte',
    registration_period VARCHAR(50),
    date_registration_added TIMESTAMP WITH TIME ZONE,
    date_registration_approved TIMESTAMP WITH TIME ZONE,
    home_phone VARCHAR(50),
    identification_number VARCHAR(255),
    nationality VARCHAR(100) DEFAULT 'Rwanda',
    birth_city VARCHAR(100),
    birth_country VARCHAR(100) DEFAULT 'Rwanda',
    gender VARCHAR(20) DEFAULT 'Homme',
    valid_from TIMESTAMP WITH TIME ZONE,
    valid_until TIMESTAMP WITH TIME ZONE,
    nature_of_registration VARCHAR(50) DEFAULT 'New Registration',
    club_name VARCHAR(255),
    club_id VARCHAR(255),
    team_name VARCHAR(255),
    team_id VARCHAR(255),
    sport VARCHAR(50) DEFAULT 'Football',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    photo_url VARCHAR(255),
    FOREIGN KEY (club_id) REFERENCES clubs(id),
    FOREIGN KEY (team_id) REFERENCES teams(id),
    UNIQUE(ma_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_ma_id ON players(ma_id);
CREATE INDEX IF NOT EXISTS idx_players_fifa_id ON players(fifa_id);
CREATE INDEX IF NOT EXISTS idx_players_registration_period ON players(registration_period);

-- Grant necessary permissions
GRANT ALL ON TABLE players TO authenticated;
GRANT ALL ON TABLE players TO service_role; 