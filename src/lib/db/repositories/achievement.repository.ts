import { Achievement } from '@/lib/schema';
import { BaseRepository } from './base.repository';
import { pool } from '../config';

export class AchievementRepository extends BaseRepository<Achievement> {
  constructor() {
    super('achievements');
  }

  async findByTalent(talentId: string): Promise<Achievement[]> {
    const query = `
      SELECT * FROM achievements WHERE talent_id = $1 ORDER BY awarded_date DESC
    `;
    const result = await pool.query(query, [talentId]);
    return result.rows;
  }

  async findByDiscipline(discipline: string): Promise<Achievement[]> {
    const query = `
      SELECT * FROM achievements WHERE discipline = $1 ORDER BY awarded_date DESC
    `;
    const result = await pool.query(query, [discipline]);
    return result.rows;
  }

  async findByCategory(category: string): Promise<Achievement[]> {
    const query = `
      SELECT * FROM achievements WHERE category = $1 ORDER BY awarded_date DESC
    `;
    const result = await pool.query(query, [category]);
    return result.rows;
  }
} 