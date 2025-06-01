
import { settingsSchema, type Settings } from '@/lib/schema';
import { supabase } from '@/integrations/supabase/client';

export class SettingsService {
  protected transformFromDb(data: any): Settings {
    return data?.settings || this.getDefaultSettings();
  }

  async getUserSettings(): Promise<Settings> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('settings')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No settings found, return default settings
          return this.getDefaultSettings();
        }
        throw error;
      }

      return this.transformFromDb(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Return default settings if there's an error
      return this.getDefaultSettings();
    }
  }

  async updateUserSettings(settings: Settings): Promise<Settings> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Use an update object that matches the profiles table structure
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          settings: settings 
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return this.transformFromDb(data);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  getDefaultSettings(): Settings {
    return {
      notifications: {
        email: true,
        push: true,
        achievements: true,
        events: true,
        competitions: true,
      },
      display: {
        darkMode: false,
        compactView: false,
        showImages: true,
      },
      email: {
        email: '',
        frequency: 'daily',
      },
    };
  }
}
