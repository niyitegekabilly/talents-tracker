import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function createBucket() {
  try {
    const { data, error } = await supabase.storage.createBucket('vjn-talents', {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      fileSizeLimit: 5242880, // 5MB
    });

    if (error) {
      throw error;
    }

    console.log('Successfully created storage bucket:', data);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('Bucket already exists, proceeding...');
      return;
    }
    console.error('Error creating bucket:', error);
  }
}

createBucket().catch(console.error); 