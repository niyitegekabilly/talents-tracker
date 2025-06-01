
import { useState, useCallback, useEffect } from 'react';
import { SettingsService } from '@/lib/api/settings.service';
import { toast } from 'sonner';
import { Settings as SettingsType } from '@/lib/schema';

export type Settings = SettingsType;

// Define default settings
const defaultSettings: Settings = {
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

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new SettingsService();

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getUserSettings();
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch settings'));
      toast.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<Settings>) => {
    try {
      setLoading(true);
      setError(null);
      
      // Create a complete settings object
      const updatedSettings: Settings = {
        notifications: {
          email: newSettings.notifications?.email ?? settings.notifications.email,
          push: newSettings.notifications?.push ?? settings.notifications.push,
          achievements: newSettings.notifications?.achievements ?? settings.notifications.achievements,
          events: newSettings.notifications?.events ?? settings.notifications.events,
          competitions: newSettings.notifications?.competitions ?? settings.notifications.competitions
        },
        display: {
          darkMode: newSettings.display?.darkMode ?? settings.display.darkMode,
          compactView: newSettings.display?.compactView ?? settings.display.compactView,
          showImages: newSettings.display?.showImages ?? settings.display.showImages
        },
        email: {
          email: newSettings.email?.email ?? settings.email.email,
          frequency: newSettings.email?.frequency ?? settings.email.frequency
        }
      };
      
      const data = await service.updateUserSettings(updatedSettings);
      setSettings(data);
      toast.success('Settings updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update settings'));
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  }, [settings, service]);

  const updateNotificationSettings = useCallback(async (key: keyof Settings['notifications'], value: boolean) => {
    try {
      setLoading(true);
      setError(null);
      
      // Create a complete settings object with just one notification setting updated
      const updatedSettings: Settings = {
        ...settings,
        notifications: {
          ...settings.notifications,
          [key]: value
        }
      };
      
      const data = await service.updateUserSettings(updatedSettings);
      setSettings(data);
      toast.success('Notification settings updated');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update notification settings'));
      toast.error('Failed to update notification settings');
    } finally {
      setLoading(false);
    }
  }, [settings, service]);

  const updateDisplaySettings = useCallback(async (key: keyof Settings['display'], value: boolean) => {
    try {
      setLoading(true);
      setError(null);
      
      // Create a complete settings object with just one display setting updated
      const updatedSettings: Settings = {
        ...settings,
        display: {
          ...settings.display,
          [key]: value
        }
      };
      
      const data = await service.updateUserSettings(updatedSettings);
      setSettings(data);
      toast.success('Display settings updated');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update display settings'));
      toast.error('Failed to update display settings');
    } finally {
      setLoading(false);
    }
  }, [settings, service]);

  const updateEmailSettings = useCallback(async (email: string, frequency: 'daily' | 'weekly' | 'monthly') => {
    try {
      setLoading(true);
      setError(null);
      
      // Create a complete settings object with updated email settings
      const updatedSettings: Settings = {
        ...settings,
        email: {
          email,
          frequency
        }
      };
      
      const data = await service.updateUserSettings(updatedSettings);
      setSettings(data);
      toast.success('Email settings updated');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update email settings'));
      toast.error('Failed to update email settings');
    } finally {
      setLoading(false);
    }
  }, [settings, service]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    updateSettings,
    updateNotificationSettings,
    updateDisplaySettings,
    updateEmailSettings,
  };
}
