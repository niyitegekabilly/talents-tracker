import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Function to parse date in various formats
function parseDate(dateStr) {
  if (!dateStr) return null;
  
  try {
    // Handle datetime format (e.g., "18/03/2025 19:21")
    if (dateStr.includes(' ')) {
      dateStr = dateStr.split(' ')[0];
    }

    // Try DD/MM/YYYY format
    let [day, month, year] = dateStr.split('/');
    if (day && month && year) {
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
    }

    // Try YYYY-MM-DD format
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime())) {
      return isoDate.toISOString();
    }

    return null;
  } catch (error) {
    console.error(`Error parsing date: ${dateStr}`, error);
    return null;
  }
}

// Function to calculate age level based on birth date
function calculateAgeLevel(birthDate) {
  if (!birthDate) return 'Senior';
  
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  
  if (age <= 12) return 'U12';
  if (age <= 14) return 'U14';
  if (age <= 16) return 'U16';
  if (age <= 18) return 'U18';
  if (age <= 20) return 'U20';
  return 'Senior';
}

async function updatePlayerInfo() {
  try {
    // Read the CSV file
    const csvFilePath = path.join(process.cwd(), 'FULL DETAILS PLAYERS 2024-25.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
    // Parse CSV
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    // Process each record
    for (const record of records) {
      const licenseNumber = record['License Number']?.trim();
      if (!licenseNumber) continue;

      const firstName = record['First Name']?.trim();
      const lastName = record['Last Name']?.trim();
      const birthDate = parseDate(record['Birth Date']);
      const ageLevel = calculateAgeLevel(birthDate);

      try {
        // First try to update existing player
        const { data: existingPlayer } = await supabase
          .from('players')
          .select('id')
          .eq('license_number', licenseNumber)
          .single();

        if (existingPlayer) {
          const { error: updateError } = await supabase
            .from('players')
            .update({
              first_name: firstName,
              last_name: lastName,
              birth_date: birthDate,
              level: 'Senior',
              age_level: ageLevel,
              registration_period: record['Registration Period']?.trim() || 'Regular',
              registration_date: parseDate(record['Registration Date']),
              approval_date: parseDate(record['Approval Date']),
              phone: record['Phone']?.trim(),
              id_number: record['ID Number']?.trim(),
              nationality: record['Nationality']?.trim() || 'Rwanda',
              birth_city: record['Birth City']?.trim(),
              birth_country: record['Birth Country']?.trim() || 'Rwanda',
              gender: record['Gender']?.trim() || 'Male',
              valid_from: parseDate(record['Valid From']),
              valid_until: parseDate(record['Valid Until'])
            })
            .eq('id', existingPlayer.id);

          if (updateError) {
            throw updateError;
          }
          console.log(`Successfully updated player ${firstName} ${lastName} (${licenseNumber})`);
        } else {
          // If player doesn't exist, insert new record
          const { error: insertError } = await supabase
            .from('players')
            .insert({
              license_number: licenseNumber,
              first_name: firstName,
              last_name: lastName,
              birth_date: birthDate,
              level: 'Senior',
              age_level: ageLevel,
              registration_period: record['Registration Period']?.trim() || 'Regular',
              registration_date: parseDate(record['Registration Date']),
              approval_date: parseDate(record['Approval Date']),
              phone: record['Phone']?.trim(),
              id_number: record['ID Number']?.trim(),
              nationality: record['Nationality']?.trim() || 'Rwanda',
              birth_city: record['Birth City']?.trim(),
              birth_country: record['Birth Country']?.trim() || 'Rwanda',
              gender: record['Gender']?.trim() || 'Male',
              valid_from: parseDate(record['Valid From']),
              valid_until: parseDate(record['Valid Until'])
            });

          if (insertError) {
            throw insertError;
          }
          console.log(`Successfully inserted player ${firstName} ${lastName} (${licenseNumber})`);
        }
      } catch (error) {
        console.error(`Error inserting player ${licenseNumber}:`, error);
      }
    }
  } catch (error) {
    console.error('Error processing CSV file:', error);
  }
}

updatePlayerInfo(); 