import { supabase } from '@/lib/supabase/client';
import { Database } from '../supabase/types';

export type TableName = 
  | 'talents'
  | 'events'
  | 'achievements'
  | 'success_stories'
  | 'competitions'
  | 'competition_participants'
  | 'user_settings';

export abstract class BaseService<T extends TableName> {
  protected table: T;

  constructor(table: T) {
    this.table = table;
  }

  protected abstract transformToDb(data: any): any;
  protected abstract transformFromDb(data: any): any;

  async getAll() {
    const { data, error } = await supabase
      .from(this.table)
      .select('*');
    
    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async getById(id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return this.transformFromDb(data);
  }

  async create(data: any) {
    const transformedData = this.transformToDb(data);
    const { data: result, error } = await supabase
      .from(this.table)
      .insert(transformedData)
      .select()
      .single();
    
    if (error) throw error;
    return this.transformFromDb(result);
  }

  async update(id: string, data: any) {
    const transformedData = this.transformToDb(data);
    const { data: result, error } = await supabase
      .from(this.table)
      .update(transformedData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return this.transformFromDb(result);
  }

  async delete(id: string) {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  async findByField(field: string, value: any) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq(field, value);
    
    if (error) throw error;
    return data.map(this.transformFromDb);
  }

  async findOneByField(field: string, value: any) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq(field, value)
      .single();
    
    if (error) throw error;
    return this.transformFromDb(data);
  }
} 