import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

function parseDate(dateStr) {
  if (!dateStr) return null;
  
  // Handle different date formats
  const formats = [
    'DD/MM/YYYY',
    'DD/MM/YYYY HH:mm',
    'YYYY/YYYY'
  ];

  for (const format of formats) {
    const parts = dateStr.split(/[/\s:]/);
    
    if (format === 'DD/MM/YYYY' && parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    if (format === 'DD/MM/YYYY HH:mm' && parts.length >= 5) {
      const [day, month, year, hour, minute] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00Z`;
    }
    
    if (format === 'YYYY/YYYY' && parts.length === 2) {
      return `${parts[0]}-01-01`;
    }
  }

  console.warn(`Could not parse date: ${dateStr}`);
  return null;
}

let successCount = 0;
let errorCount = 0;

async function importPlayers() {
  const csvFilePath = path.resolve(process.cwd(), 'FULL DETAILS PLAYERS 2024-25.csv');
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }, async (error, records) => {
    if (error) {
      console.error('Error parsing CSV:', error);
      return;
    }

    console.log(`Found ${records.length} players to import`);

    for (const record of records) {
      try {
        const playerData = {
          ma_id: record['MA ID Number'] || null,
          fifa_id: record['FIFA ID'] || null,
          first_name: record['Prénom'],
          family_name: record['Nom de famille'],
          date_of_birth: parseDate(record['Date de naissance']),
          level: record['Niveau'] || 'amateur',
          age_level: record["Niveau d'âge"] || 'Adulte',
          registration_period: record["Période de l'enregistrement"],
          date_registration_added: parseDate(record["Date d'enregistrement ajoutée"]),
          date_registration_approved: parseDate(record["Date d'inscription approuvée"]),
          home_phone: record['Téléphone à la maison'] || null,
          identification_number: record["Numéro d'identification"],
          nationality: record['Nationalité principale'] || 'Rwanda',
          birth_city: record['Ville de naissance'],
          birth_country: record['Pays de naissance'] || 'Rwanda',
          gender: record['Sexe'] || 'Homme',
          valid_from: parseDate(record['Date depuis']),
          valid_until: parseDate(record["Date jusqu'à"]),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          nature_of_registration: 'New Registration'
        };

        // Skip if required fields are missing
        if (!playerData.first_name || !playerData.family_name || !playerData.date_of_birth) {
          console.warn('Skipping player due to missing required fields:', record['MA ID Number']);
          errorCount++;
          continue;
        }

        const { error: playerError } = await supabase
          .from('players')
          .upsert(playerData, {
            onConflict: 'ma_id',
            ignoreDuplicates: false,
          });

        if (playerError) {
          console.error('Error importing player:', record['Prénom'], record['Nom de famille'], playerError);
          errorCount++;
          continue;
        }

        console.log('Successfully imported player:', record['Prénom'], record['Nom de famille']);
        successCount++;
      } catch (error) {
        console.error('Error processing player:', record['Prénom'], record['Nom de famille'], error);
        errorCount++;
      }
    }

    console.log(`Import completed. Successfully imported ${successCount} players. Failed to import ${errorCount} players.`);
  });
}

importPlayers().catch(console.error); 