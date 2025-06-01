
import { BaseRepository } from './base.repository';
import { Talent } from '@/lib/schema';
import { pool } from '@/lib/db/config';

export class TalentRepository extends BaseRepository<Talent> {
  constructor() {
    super('talents');
  }

  async findByDiscipline(discipline: string): Promise<Talent[]> {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE discipline = $1`, [discipline]);
    return result.rows as Talent[];
  }

  async findByTeam(team: string): Promise<Talent[]> {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE team = $1`, [team]);
    return result.rows as Talent[];
  }

  async findByStage(stage: string): Promise<Talent[]> {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE current_stage = $1`, [stage]);
    return result.rows as Talent[];
  }

  async search(query: string): Promise<Talent[]> {
    const searchQuery = `
      SELECT * FROM ${this.table}
      WHERE 
        first_name ILIKE $1 OR
        last_name ILIKE $1 OR
        contact_email ILIKE $1 OR
        bio ILIKE $1
    `;
    const result = await pool.query(searchQuery, [`%${query}%`]);
    return result.rows;
  }

  async getTalentWithAchievements(id: string): Promise<Talent & { achievements: any[] } | null> {
    const query = `
      SELECT t.*, 
        json_agg(json_build_object(
          'id', a.id,
          'title', a.title,
          'description', a.description,
          'category', a.category,
          'awarded_at', a.awarded_at
        )) as achievements
      FROM ${this.table} t
      LEFT JOIN achievements a ON t.id = a.talent_id
      WHERE t.id = $1
      GROUP BY t.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async getTalentWithSuccessStories(id: string): Promise<Talent & { success_stories: any[] } | null> {
    const query = `
      SELECT t.*, 
        json_agg(json_build_object(
          'id', s.id,
          'title', s.title,
          'content', s.content,
          'publish_date', s.publish_date,
          'tags', s.tags
        )) as success_stories
      FROM ${this.table} t
      LEFT JOIN success_stories s ON t.id = s.talent_id
      WHERE t.id = $1
      GROUP BY t.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async getTalentWithCompetitions(id: string): Promise<Talent & { competitions: any[] } | null> {
    const query = `
      SELECT t.*, 
        json_agg(json_build_object(
          'id', c.id,
          'title', c.title,
          'date', c.date,
          'status', c.status
        )) as competitions
      FROM ${this.table} t
      LEFT JOIN competition_participants cp ON t.id = cp.talent_id
      LEFT JOIN competitions c ON cp.competition_id = c.id
      WHERE t.id = $1
      GROUP BY t.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async getTalentWithAllDetails(id: string): Promise<Talent & {
    achievements: any[];
    success_stories: any[];
    competitions: any[];
  } | null> {
    const query = `
      WITH talent_achievements AS (
        SELECT 
          talent_id,
          json_agg(json_build_object(
            'id', id,
            'title', title,
            'description', description,
            'category', category,
            'awarded_at', awarded_at
          )) as achievements
        FROM achievements
        WHERE talent_id = $1
        GROUP BY talent_id
      ),
      talent_stories AS (
        SELECT 
          talent_id,
          json_agg(json_build_object(
            'id', id,
            'title', title,
            'content', content,
            'publish_date', publish_date,
            'tags', tags
          )) as success_stories
        FROM success_stories
        WHERE talent_id = $1
        GROUP BY talent_id
      ),
      talent_competitions AS (
        SELECT 
          cp.talent_id,
          json_agg(json_build_object(
            'id', c.id,
            'title', c.title,
            'date', c.date,
            'status', c.status
          )) as competitions
        FROM competition_participants cp
        JOIN competitions c ON cp.competition_id = c.id
        WHERE cp.talent_id = $1
        GROUP BY cp.talent_id
      )
      SELECT 
        t.*,
        COALESCE(ta.achievements, '[]'::json) as achievements,
        COALESCE(ts.success_stories, '[]'::json) as success_stories,
        COALESCE(tc.competitions, '[]'::json) as competitions
      FROM ${this.table} t
      LEFT JOIN talent_achievements ta ON t.id = ta.talent_id
      LEFT JOIN talent_stories ts ON t.id = ts.talent_id
      LEFT JOIN talent_competitions tc ON t.id = tc.talent_id
      WHERE t.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}
