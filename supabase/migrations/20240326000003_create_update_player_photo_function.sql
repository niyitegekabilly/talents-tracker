-- Create function to update player photo URL
CREATE OR REPLACE FUNCTION update_player_photo(p_id uuid, p_url text)
RETURNS void AS $$
BEGIN
    UPDATE players
    SET photo_url = p_url,
        updated_at = NOW()
    WHERE id = p_id;
END;
$$ LANGUAGE plpgsql; 