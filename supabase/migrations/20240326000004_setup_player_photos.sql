-- Add photo_url column to players table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'players' 
        AND column_name = 'photo_url'
    ) THEN
        ALTER TABLE players ADD COLUMN photo_url TEXT;
    END IF;
END $$;

-- Create or replace function to update player photo
CREATE OR REPLACE FUNCTION update_player_photo(p_id uuid, p_url text)
RETURNS void AS $$
BEGIN
    UPDATE players
    SET photo_url = p_url,
        updated_at = NOW()
    WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT ALL ON TABLE players TO authenticated;
GRANT ALL ON TABLE players TO service_role;
GRANT EXECUTE ON FUNCTION update_player_photo TO authenticated;
GRANT EXECUTE ON FUNCTION update_player_photo TO service_role; 