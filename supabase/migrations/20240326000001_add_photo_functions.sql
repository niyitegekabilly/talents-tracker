-- Function to add photo_url column if it doesn't exist
CREATE OR REPLACE FUNCTION add_photo_url_column()
RETURNS void AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'players'
        AND column_name = 'photo_url'
    ) THEN
        ALTER TABLE players ADD COLUMN photo_url TEXT;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to update player's photo URL
CREATE OR REPLACE FUNCTION update_player_photo(player_id uuid, photo_url text)
RETURNS void AS $$
BEGIN
    UPDATE players
    SET photo_url = $2,
        updated_at = NOW()
    WHERE id = $1;
END;
$$ LANGUAGE plpgsql; 