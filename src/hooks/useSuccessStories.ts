
import { useState, useCallback } from 'react';
import { SuccessStoryService } from '@/lib/api/success-story.service';
import { SuccessStory } from '@/lib/schema';
import { toast } from 'sonner';

export function useSuccessStories() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new SuccessStoryService();

  const fetchSuccessStories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAll();
      setStories(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch success stories'));
      toast.error('Failed to fetch success stories');
    } finally {
      setLoading(false);
    }
  }, []);

  const getStoryById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getById(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch success story'));
      toast.error('Failed to fetch success story');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSuccessStoriesByTalent = useCallback(async (talentId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getSuccessStoriesByTalent(talentId);
      setStories(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch success stories by talent'));
      toast.error('Failed to fetch success stories by talent');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getSuccessStoriesByDiscipline = useCallback(async (discipline: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getSuccessStoriesByDiscipline(discipline);
      setStories(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch success stories by discipline'));
      toast.error('Failed to fetch success stories by discipline');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getSuccessStoriesByTag = useCallback(async (tag: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getSuccessStoriesByTag(tag);
      setStories(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch success stories by tag'));
      toast.error('Failed to fetch success stories by tag');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecentSuccessStories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAll();
      // Sort by publish date descending and take the most recent ones
      const sortedData = data.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      ).slice(0, 5);
      setStories(sortedData);
      return sortedData;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch recent success stories'));
      toast.error('Failed to fetch recent success stories');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const searchSuccessStories = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.search(query);
      setStories(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search success stories'));
      toast.error('Failed to search success stories');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createSuccessStory = useCallback(async (data: SuccessStory) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.createSuccessStory(data);
      setStories(prev => [...prev, result]);
      toast.success('Success story created successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create success story'));
      toast.error('Failed to create success story');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSuccessStory = useCallback(async (id: string, data: Partial<SuccessStory>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.updateSuccessStory(id, data);
      setStories(prev => prev.map(story => story.id === id ? result : story));
      toast.success('Success story updated successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update success story'));
      toast.error('Failed to update success story');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSuccessStory = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await service.delete(id);
      setStories(prev => prev.filter(story => story.id !== id));
      toast.success('Success story deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete success story'));
      toast.error('Failed to delete success story');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stories,
    loading,
    error,
    fetchSuccessStories,
    getStoryById,
    getSuccessStoriesByTalent,
    getSuccessStoriesByDiscipline,
    getSuccessStoriesByTag,
    getRecentSuccessStories,
    searchSuccessStories,
    createSuccessStory,
    updateSuccessStory,
    deleteSuccessStory,
  };
}
