-- Add new columns to players table
ALTER TABLE players
ADD COLUMN IF NOT EXISTS level text DEFAULT 'Senior',
ADD COLUMN IF NOT EXISTS age_level text DEFAULT 'Senior',
ADD COLUMN IF NOT EXISTS registration_period text DEFAULT 'Regular',
ADD COLUMN IF NOT EXISTS registration_date timestamptz,
ADD COLUMN IF NOT EXISTS approval_date timestamptz,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS id_number text,
ADD COLUMN IF NOT EXISTS nationality text DEFAULT 'Rwanda',
ADD COLUMN IF NOT EXISTS birth_city text,
ADD COLUMN IF NOT EXISTS birth_country text DEFAULT 'Rwanda',
ADD COLUMN IF NOT EXISTS gender text DEFAULT 'Male',
ADD COLUMN IF NOT EXISTS valid_from timestamptz,
ADD COLUMN IF NOT EXISTS valid_until timestamptz;

-- Grant necessary permissions
GRANT ALL ON TABLE players TO authenticated;
GRANT ALL ON TABLE players TO service_role; 