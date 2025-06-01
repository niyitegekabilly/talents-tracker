
import { BaseService } from './base.service';
import { z } from 'zod';
import { successStorySchema } from '@/lib/schema';
import type { SuccessStoryRow, SuccessStoryInsert, SuccessStoryUpdate } from '@/lib/supabase/database.types';
import { supabase } from '@/lib/supabase/client';

export class SuccessStoryService extends BaseService<'success_stories'> {
  constructor() {
    super('success_stories');
  }

  protected transformToDb(data: z.infer<typeof successStorySchema>): SuccessStoryInsert {
    return {
      talent_id: data.talentId,
      title: data.title,
      content: data.content,
      publish_date: data.publishDate.toISOString(),
      tags: data.tags,
      discipline: data.discipline as SuccessStoryInsert['discipline'],
      featured_image: data.featuredImage,
    };
  }

  protected transformFromDb(data: SuccessStoryRow): z.infer<typeof successStorySchema> {
    return {
      id: data.id,
      talentId: data.talent_id,
      title: data.title,
      content: data.content,
      publishDate: new Date(data.publish_date),
      tags: data.tags,
      discipline: data.discipline as z.infer<typeof successStorySchema>['discipline'],
      featuredImage: data.featured_image,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async getSuccessStoriesByTalent(talentId: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('talent_id', talentId)
      .order('publish_date', { ascending: false });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getSuccessStoriesByDiscipline(discipline: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('discipline', discipline)
      .order('publish_date', { ascending: false });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getSuccessStoriesByTag(tag: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .contains('tags', [tag])
      .order('publish_date', { ascending: false });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async search(query: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('publish_date', { ascending: false });

    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async createSuccessStory(data: z.infer<typeof successStorySchema>) {
    const validatedData = successStorySchema.parse(data);
    const dbData = this.transformToDb(validatedData);
    const result = await this.create(dbData);
    return this.transformFromDb(result);
  }

  async updateSuccessStory(id: string, data: Partial<z.infer<typeof successStorySchema>>) {
    const validatedData = successStorySchema.partial().parse(data);
    const dbData = this.transformToDb(validatedData as z.infer<typeof successStorySchema>);
    const result = await this.update(id, dbData);
    return this.transformFromDb(result);
  }
}
