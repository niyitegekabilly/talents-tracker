
import { z } from 'zod';
import { pool } from '@/lib/db/config';

export abstract class BaseRepository<T> {
  constructor(protected table: string) {}

  async findAll(): Promise<T[]> {
    const result = await pool.query(`SELECT * FROM ${this.table}`);
    return result.rows as T[];
  }

  async findById(id: string): Promise<T | null> {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
    return result.rows.length ? (result.rows[0] as T) : null;
  }

  async create(data: any): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    
    const query = `
      INSERT INTO ${this.table} (${keys.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    return result.rows[0] as T;
  }

  async update(id: string, data: any): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    
    const query = `
      UPDATE ${this.table}
      SET ${setClause}
      WHERE id = $${values.length + 1}
      RETURNING *
    `;
    
    const result = await pool.query(query, [...values, id]);
    return result.rows[0] as T;
  }

  async delete(id: string): Promise<boolean> {
    const result = await pool.query(`DELETE FROM ${this.table} WHERE id = $1 RETURNING id`, [id]);
    return !!result.rows.length;
  }
}
