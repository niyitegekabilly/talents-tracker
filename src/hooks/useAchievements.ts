import { useState, useCallback } from 'react';
import { AchievementService } from '@/lib/api/achievement.service';
import { z } from 'zod';
import { achievementSchema, type Achievement } from '@/lib/schema';
import type { AchievementInsert, AchievementUpdate } from '@/lib/supabase/database.types';
import { toast } from 'sonner';

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new AchievementService();

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAll();
      setAchievements(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch achievements'));
      toast.error('Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAchievementById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getById(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch achievement'));
      toast.error('Failed to fetch achievement');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAchievement = useCallback(async (data: AchievementInsert) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.create(data);
      setAchievements(prev => [...prev, result]);
      toast.success('Achievement created successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create achievement'));
      toast.error('Failed to create achievement');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAchievement = useCallback(async (id: string, data: AchievementUpdate) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.update(id, data);
      setAchievements(prev => prev.map(a => a.id === id ? result : a));
      toast.success('Achievement updated successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update achievement'));
      toast.error('Failed to update achievement');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAchievement = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await service.delete(id);
      setAchievements(prev => prev.filter(a => a.id !== id));
      toast.success('Achievement deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete achievement'));
      toast.error('Failed to delete achievement');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAchievementsByTalent = useCallback(async (talentId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAchievementsByTalent(talentId);
      setAchievements(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch achievements by talent'));
      toast.error('Failed to fetch achievements by talent');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAchievementsByCategory = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAchievementsByCategory(category);
      setAchievements(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch achievements by category'));
      toast.error('Failed to fetch achievements by category');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAchievementsByDiscipline = useCallback(async (discipline: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAchievementsByDiscipline(discipline);
      setAchievements(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch achievements by discipline'));
      toast.error('Failed to fetch achievements by discipline');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchAchievements = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.search(query);
      setAchievements(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search achievements'));
      toast.error('Failed to search achievements');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    achievements,
    loading,
    error,
    fetchAchievements,
    getAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement,
    getAchievementsByTalent,
    getAchievementsByCategory,
    getAchievementsByDiscipline,
    searchAchievements,
  };
} 