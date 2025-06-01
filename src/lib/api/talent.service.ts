import { BaseService } from './base.service';
import { z } from 'zod';
import { talentSchema } from '@/lib/schema';
import type { TalentRow, TalentInsert, TalentUpdate } from '@/lib/supabase/database.types';
import { supabase } from '@/lib/supabase/client';

export class TalentService extends BaseService<'talents'> {
  constructor() {
    super('talents');
  }

  protected transformToDb(data: z.infer<typeof talentSchema>): TalentInsert {
    return {
      first_name: data.firstName,
      last_name: data.lastName,
      date_of_birth: data.dateOfBirth.toISOString(),
      gender: data.gender,
      discipline: data.discipline,
      team: data.team,
      current_stage: data.currentStage,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone,
      bio: data.bio,
      image_url: data.imageUrl,
    };
  }

  protected transformFromDb(data: TalentRow): z.infer<typeof talentSchema> {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      dateOfBirth: new Date(data.date_of_birth),
      gender: data.gender,
      discipline: data.discipline,
      team: data.team,
      currentStage: data.current_stage,
      contactEmail: data.contact_email,
      contactPhone: data.contact_phone,
      bio: data.bio,
      imageUrl: data.image_url,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async findByDiscipline(discipline: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('discipline', discipline);

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async findByTeam(team: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('team', team);

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async findByStage(stage: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('current_stage', stage);

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async search(query: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,contact_email.ilike.%${query}%,bio.ilike.%${query}%`);

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getTalentWithAchievements(id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select(`
        *,
        achievements (
          id,
          title,
          description,
          category,
          discipline,
          awarded_at,
          image_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return {
      ...this.transformFromDb(data),
      achievements: data.achievements,
    };
  }

  async getTalentWithSuccessStories(id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select(`
        *,
        success_stories (
          id,
          title,
          content,
          publish_date,
          tags,
          discipline,
          featured_image
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return {
      ...this.transformFromDb(data),
      successStories: data.success_stories,
    };
  }

  async getTalentWithCompetitions(id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select(`
        *,
        competition_participants (
          competition_id,
          competitions (
            id,
            title,
            description,
            date,
            location,
            disciplines,
            status,
            results,
            image_url
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return {
      ...this.transformFromDb(data),
      competitions: data.competition_participants.map((p: any) => p.competitions),
    };
  }

  async getTalentWithAllDetails(id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select(`
        *,
        achievements (
          id,
          title,
          description,
          category,
          discipline,
          awarded_at,
          image_url
        ),
        success_stories (
          id,
          title,
          content,
          publish_date,
          tags,
          discipline,
          featured_image
        ),
        competition_participants (
          competition_id,
          competitions (
            id,
            title,
            description,
            date,
            location,
            disciplines,
            status,
            results,
            image_url
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return {
      ...this.transformFromDb(data),
      achievements: data.achievements,
      successStories: data.success_stories,
      competitions: data.competition_participants.map((p: any) => p.competitions),
    };
  }
} 