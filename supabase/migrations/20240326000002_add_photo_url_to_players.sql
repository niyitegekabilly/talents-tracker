-- Add photo_url column to players table
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Grant access to authenticated users
GRANT ALL ON TABLE public.players TO authenticated;
GRANT ALL ON TABLE public.players TO service_role; 