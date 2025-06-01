import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Function to normalize player name from filename
function normalizePlayerName(filename) {
  // Remove file extension
  const nameWithoutExt = filename.split('.')[0];
  
  // Remove suffixes like -re, -r
  const nameWithoutSuffix = nameWithoutExt.replace(/-r(e)?$/, '');
  
  // Replace underscores and hyphens with spaces
  const nameWithSpaces = nameWithoutSuffix.replace(/[_-]/g, ' ');
  
  // Convert to lowercase for comparison
  return nameWithSpaces.toLowerCase().trim();
}

// Function to get player name parts
function getNameParts(normalizedName) {
  const parts = normalizedName.split(' ').filter(part => part.length > 0);
  return {
    firstName: parts[0],
    familyName: parts[parts.length - 1]
  };
}

async function uploadPlayerPhotos() {
  try {
    const photosDir = path.resolve(__dirname, '../public/images/football');
    const files = fs.readdirSync(photosDir);

    console.log(`Found ${files.length} photos to process`);

    for (const file of files) {
      try {
        const filePath = path.join(photosDir, file);
        const fileContent = fs.readFileSync(filePath);
        const fileExt = path.extname(file);
        
        // Normalize the player name from filename
        const normalizedName = normalizePlayerName(file);
        const { firstName, familyName } = getNameParts(normalizedName);
        
        console.log(`Processing ${file} (${normalizedName})`);
        
        // Find the player in the database using a more flexible search
        let { data: matchedPlayers, error: queryError } = await supabase
          .from('players')
          .select('*')
          .or(`first_name.ilike.${firstName}%,family_name.ilike.${familyName}%`)
          .limit(1);

        if (queryError) {
          console.error(`Error finding player for ${file}:`, queryError);
          continue;
        }

        if (!matchedPlayers || matchedPlayers.length === 0) {
          // Try a more lenient search
          const { data: lenientPlayers, error: lenientError } = await supabase
            .from('players')
            .select('*')
            .or(`first_name.ilike.%${firstName}%,family_name.ilike.%${familyName}%`)
            .limit(1);

          if (lenientError || !lenientPlayers || lenientPlayers.length === 0) {
            console.warn(`No player found for ${file} (${firstName}, ${familyName})`);
            continue;
          }
          matchedPlayers = lenientPlayers;
        }

        const player = matchedPlayers[0];
        const photoPath = `player-photos/${player.ma_id}${fileExt}`;

        console.log(`Uploading photo for ${player.first_name} ${player.family_name}`);

        // Upload the photo to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from('vjn-talents')
          .upload(photoPath, fileContent, {
            contentType: `image/${fileExt.slice(1)}`,
            upsert: true
          });

        if (uploadError) {
          console.error(`Error uploading photo for ${file}:`, uploadError);
          continue;
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('vjn-talents')
          .getPublicUrl(photoPath);

        // Update the player record with the photo URL
        const { error: updateError } = await supabase
          .from('players')
          .update({
            photo_url: publicUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', player.id);

        if (updateError) {
          console.error(`Error updating player record for ${file}:`, updateError);
          continue;
        }

        console.log(`Successfully processed ${file} for player ${player.first_name} ${player.family_name}`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  } catch (error) {
    console.error('Error during photo upload process:', error);
  }
}

uploadPlayerPhotos().catch(console.error); 