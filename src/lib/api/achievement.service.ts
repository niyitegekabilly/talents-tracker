import { BaseService } from './base.service';
import { z } from 'zod';
import { achievementSchema } from '@/lib/schema';
import type { AchievementRow, AchievementInsert, AchievementUpdate } from '@/lib/supabase/database.types';
import { supabase } from '@/lib/supabase/client';

export class AchievementService extends BaseService<'achievements'> {
  constructor() {
    super('achievements');
  }

  protected transformToDb(data: z.infer<typeof achievementSchema>): AchievementInsert {
    return {
      talent_id: data.talentId,
      title: data.title,
      description: data.description,
      category: data.category,
      discipline: data.discipline,
      awarded_at: data.awardedAt.toISOString(),
      image_url: data.imageUrl,
    };
  }

  protected transformFromDb(data: AchievementRow): z.infer<typeof achievementSchema> {
    return {
      id: data.id,
      talentId: data.talent_id,
      title: data.title,
      description: data.description,
      category: data.category,
      discipline: data.discipline as z.infer<typeof achievementSchema>['discipline'],
      awardedAt: new Date(data.awarded_at),
      imageUrl: data.image_url,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async getAchievementsByTalent(talentId: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('talent_id', talentId)
      .order('awarded_at', { ascending: false });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getAchievementsByCategory(category: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('category', category)
      .order('awarded_at', { ascending: false });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getAchievementsByDiscipline(discipline: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('discipline', discipline)
      .order('awarded_at', { ascending: false });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async search(query: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('awarded_at', { ascending: false });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async createAchievement(data: z.infer<typeof achievementSchema>) {
    const validatedData = achievementSchema.parse(data);
    const dbData = this.transformToDb(validatedData);
    const result = await this.create(dbData);
    return this.transformFromDb(result);
  }

  async updateAchievement(id: string, data: Partial<z.infer<typeof achievementSchema>>) {
    const validatedData = achievementSchema.partial().parse(data);
    const dbData = this.transformToDb(validatedData as z.infer<typeof achievementSchema>);
    const result = await this.update(id, dbData);
    return this.transformFromDb(result);
  }
} 