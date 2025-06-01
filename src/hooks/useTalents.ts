import { useState, useCallback } from 'react';
import { TalentService } from '@/lib/api/talent.service';
import { z } from 'zod';
import { talentSchema, type Talent } from '@/lib/schema';
import type { TalentInsert, TalentUpdate } from '@/lib/supabase/database.types';
import { toast } from 'sonner';

export function useTalents() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new TalentService();

  const fetchTalents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAll();
      setTalents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch talents'));
      toast.error('Failed to fetch talents');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTalentById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getById(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch talent'));
      toast.error('Failed to fetch talent');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTalentWithDetails = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getTalentWithAllDetails(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch talent details'));
      toast.error('Failed to fetch talent details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTalent = useCallback(async (data: TalentInsert) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.create(data);
      setTalents(prev => [...prev, result]);
      toast.success('Talent created successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create talent'));
      toast.error('Failed to create talent');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTalent = useCallback(async (id: string, data: TalentUpdate) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.update(id, data);
      setTalents(prev => prev.map(t => t.id === id ? result : t));
      toast.success('Talent updated successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update talent'));
      toast.error('Failed to update talent');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTalent = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await service.delete(id);
      setTalents(prev => prev.filter(t => t.id !== id));
      toast.success('Talent deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete talent'));
      toast.error('Failed to delete talent');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchTalents = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.search(query);
      setTalents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search talents'));
      toast.error('Failed to search talents');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTalentsByDiscipline = useCallback(async (discipline: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.findByDiscipline(discipline);
      setTalents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch talents by discipline'));
      toast.error('Failed to fetch talents by discipline');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTalentsByTeam = useCallback(async (team: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.findByTeam(team);
      setTalents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch talents by team'));
      toast.error('Failed to fetch talents by team');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTalentsByStage = useCallback(async (stage: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.findByStage(stage);
      setTalents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch talents by stage'));
      toast.error('Failed to fetch talents by stage');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    talents,
    loading,
    error,
    fetchTalents,
    getTalentById,
    getTalentWithDetails,
    createTalent,
    updateTalent,
    deleteTalent,
    searchTalents,
    getTalentsByDiscipline,
    getTalentsByTeam,
    getTalentsByStage,
  };
} 