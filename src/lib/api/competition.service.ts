import { BaseService } from './base.service';
import { z } from 'zod';
import { competitionSchema } from '@/lib/schema';
import type { CompetitionRow, CompetitionInsert, CompetitionUpdate } from '@/lib/supabase/database.types';
import { supabase } from '@/lib/supabase/client';

export class CompetitionService extends BaseService<'competitions'> {
  constructor() {
    super('competitions');
  }

  protected transformToDb(data: z.infer<typeof competitionSchema>): CompetitionInsert {
    return {
      title: data.title,
      description: data.description,
      date: data.date.toISOString(),
      location: data.location,
      disciplines: data.disciplines,
      status: data.status,
      results: data.results,
      image_url: data.imageUrl,
    };
  }

  protected transformFromDb(data: CompetitionRow): z.infer<typeof competitionSchema> {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      location: data.location,
      disciplines: data.disciplines as z.infer<typeof competitionSchema>['disciplines'],
      participants: [], // This will be populated by getCompetitionsByParticipant
      status: data.status,
      results: data.results as z.infer<typeof competitionSchema>['results'],
      imageUrl: data.image_url,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async getUpcomingCompetitions() {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getCompetitionsByStatus(status: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('status', status)
      .order('date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getCompetitionsByDiscipline(discipline: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .contains('disciplines', [discipline])
      .order('date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getCompetitionsByParticipant(talentId: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select(`
        *,
        competition_participants!inner (
          talent_id
        )
      `)
      .eq('competition_participants.talent_id', talentId)
      .order('date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async search(query: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
      .order('date', { ascending: true });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async createCompetition(data: z.infer<typeof competitionSchema>) {
    const validatedData = competitionSchema.parse(data);
    const dbData = this.transformToDb(validatedData);
    const result = await this.create(dbData);
    return this.transformFromDb(result);
  }

  async updateCompetition(id: string, data: Partial<z.infer<typeof competitionSchema>>) {
    const validatedData = competitionSchema.partial().parse(data);
    const dbData = this.transformToDb(validatedData as z.infer<typeof competitionSchema>);
    const result = await this.update(id, dbData);
    return this.transformFromDb(result);
  }

  async addParticipant(competitionId: string, talentId: string) {
    const { data, error } = await supabase
      .from('competition_participants')
      .insert({ competition_id: competitionId, talent_id: talentId });

    if (error) throw error;
    return data;
  }

  async removeParticipant(competitionId: string, talentId: string) {
    const { error } = await supabase
      .from('competition_participants')
      .delete()
      .match({ competition_id: competitionId, talent_id: talentId });

    if (error) throw error;
  }

  async updateResults(competitionId: string, results: z.infer<typeof competitionSchema>['results']) {
    const { data, error } = await supabase
      .from(this.table)
      .update({ results })
      .eq('id', competitionId)
      .select()
      .single();

    if (error) throw error;
    return this.transformFromDb(data);
  }
} 