import { BaseService } from './base.service';
import { z } from 'zod';
import { eventSchema } from '@/lib/schema';
import type { EventRow, EventInsert, EventUpdate } from '@/lib/supabase/database.types';
import { supabase } from '@/lib/supabase/client';

export class EventService extends BaseService<'events'> {
  constructor() {
    super('events');
  }

  protected transformToDb(data: z.infer<typeof eventSchema>): EventInsert {
    return {
      title: data.title,
      description: data.description,
      start_date: data.startDate.toISOString(),
      end_date: data.endDate.toISOString(),
      location: data.location,
      disciplines: data.disciplines,
      teams: data.teams,
      status: data.status,
      image_url: data.imageUrl,
    };
  }

  protected transformFromDb(data: EventRow): z.infer<typeof eventSchema> {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
      location: data.location,
      disciplines: data.disciplines as z.infer<typeof eventSchema>['disciplines'],
      teams: data.teams as z.infer<typeof eventSchema>['teams'],
      status: data.status,
      imageUrl: data.image_url,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async getUpcomingEvents() {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getEventsByStatus(status: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('status', status)
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getEventsByDiscipline(discipline: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .contains('disciplines', [discipline])
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getEventsByTeam(team: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .contains('teams', [team])
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async search(query: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async createEvent(data: z.infer<typeof eventSchema>) {
    const validatedData = eventSchema.parse(data);
    const dbData = this.transformToDb(validatedData);
    const result = await this.create(dbData);
    return this.transformFromDb(result);
  }

  async updateEvent(id: string, data: Partial<z.infer<typeof eventSchema>>) {
    const validatedData = eventSchema.partial().parse(data);
    const dbData = this.transformToDb(validatedData as z.infer<typeof eventSchema>);
    const result = await this.update(id, dbData);
    return this.transformFromDb(result);
  }
} 