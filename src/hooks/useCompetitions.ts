import { useState, useCallback } from 'react';
import { CompetitionService } from '@/lib/api/competition.service';
import { z } from 'zod';
import { competitionSchema, type Competition } from '@/lib/schema';
import type { CompetitionInsert, CompetitionUpdate } from '@/lib/supabase/database.types';
import { toast } from 'sonner';

export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new CompetitionService();

  const fetchCompetitions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAll();
      setCompetitions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch competitions'));
      toast.error('Failed to fetch competitions');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCompetitionById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getById(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch competition'));
      toast.error('Failed to fetch competition');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCompetition = useCallback(async (data: CompetitionInsert) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.create(data);
      setCompetitions(prev => [...prev, result]);
      toast.success('Competition created successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create competition'));
      toast.error('Failed to create competition');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCompetition = useCallback(async (id: string, data: CompetitionUpdate) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.update(id, data);
      setCompetitions(prev => prev.map(c => c.id === id ? result : c));
      toast.success('Competition updated successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update competition'));
      toast.error('Failed to update competition');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCompetition = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await service.delete(id);
      setCompetitions(prev => prev.filter(c => c.id !== id));
      toast.success('Competition deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete competition'));
      toast.error('Failed to delete competition');
    } finally {
      setLoading(false);
    }
  }, []);

  const getUpcomingCompetitions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getUpcomingCompetitions();
      setCompetitions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch upcoming competitions'));
      toast.error('Failed to fetch upcoming competitions');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCompetitionsByStatus = useCallback(async (status: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getCompetitionsByStatus(status);
      setCompetitions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch competitions by status'));
      toast.error('Failed to fetch competitions by status');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCompetitionsByDiscipline = useCallback(async (discipline: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getCompetitionsByDiscipline(discipline);
      setCompetitions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch competitions by discipline'));
      toast.error('Failed to fetch competitions by discipline');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCompetitionsByParticipant = useCallback(async (talentId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getCompetitionsByParticipant(talentId);
      setCompetitions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch competitions by participant'));
      toast.error('Failed to fetch competitions by participant');
    } finally {
      setLoading(false);
    }
  }, []);

  const addParticipant = useCallback(async (competitionId: string, talentId: string) => {
    try {
      setLoading(true);
      setError(null);
      await service.addParticipant(competitionId, talentId);
      toast.success('Participant added successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add participant'));
      toast.error('Failed to add participant');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeParticipant = useCallback(async (competitionId: string, talentId: string) => {
    try {
      setLoading(true);
      setError(null);
      await service.removeParticipant(competitionId, talentId);
      toast.success('Participant removed successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove participant'));
      toast.error('Failed to remove participant');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateResults = useCallback(async (competitionId: string, results: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.updateResults(competitionId, results);
      setCompetitions(prev => prev.map(c => c.id === competitionId ? result : c));
      toast.success('Results updated successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update results'));
      toast.error('Failed to update results');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCompetitions = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.search(query);
      setCompetitions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search competitions'));
      toast.error('Failed to search competitions');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    competitions,
    loading,
    error,
    fetchCompetitions,
    getCompetitionById,
    createCompetition,
    updateCompetition,
    deleteCompetition,
    getUpcomingCompetitions,
    getCompetitionsByStatus,
    getCompetitionsByDiscipline,
    getCompetitionsByParticipant,
    addParticipant,
    removeParticipant,
    updateResults,
    searchCompetitions,
  };
} 