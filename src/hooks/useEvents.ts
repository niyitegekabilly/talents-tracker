import { useState, useCallback } from 'react';
import { EventService } from '@/lib/api/event.service';
import { z } from 'zod';
import { eventSchema, type Event } from '@/lib/schema';
import type { EventInsert, EventUpdate } from '@/lib/supabase/database.types';
import { toast } from 'sonner';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new EventService();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAll();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch events'));
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  const getEventById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getById(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch event'));
      toast.error('Failed to fetch event');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (data: EventInsert) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.create(data);
      setEvents(prev => [...prev, result]);
      toast.success('Event created successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create event'));
      toast.error('Failed to create event');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id: string, data: EventUpdate) => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.update(id, data);
      setEvents(prev => prev.map(e => e.id === id ? result : e));
      toast.success('Event updated successfully');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update event'));
      toast.error('Failed to update event');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await service.delete(id);
      setEvents(prev => prev.filter(e => e.id !== id));
      toast.success('Event deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete event'));
      toast.error('Failed to delete event');
    } finally {
      setLoading(false);
    }
  }, []);

  const getUpcomingEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getUpcomingEvents();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch upcoming events'));
      toast.error('Failed to fetch upcoming events');
    } finally {
      setLoading(false);
    }
  }, []);

  const getEventsByStatus = useCallback(async (status: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getEventsByStatus(status);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch events by status'));
      toast.error('Failed to fetch events by status');
    } finally {
      setLoading(false);
    }
  }, []);

  const getEventsByDiscipline = useCallback(async (discipline: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getEventsByDiscipline(discipline);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch events by discipline'));
      toast.error('Failed to fetch events by discipline');
    } finally {
      setLoading(false);
    }
  }, []);

  const getEventsByTeam = useCallback(async (team: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getEventsByTeam(team);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch events by team'));
      toast.error('Failed to fetch events by team');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchEvents = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.search(query);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search events'));
      toast.error('Failed to search events');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    events,
    loading,
    error,
    fetchEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
    getEventsByStatus,
    getEventsByDiscipline,
    getEventsByTeam,
    searchEvents,
  };
} 