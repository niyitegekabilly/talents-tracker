import { Event } from '@/lib/schema';
import { BaseRepository } from './base.repository';
import { pool } from '../config';

export class EventRepository extends BaseRepository<Event> {
  constructor() {
    super('events');
  }

  async findUpcoming(): Promise<Event[]> {
    const query = `
      SELECT *
      FROM events
      WHERE start_date > NOW()
      ORDER BY start_date ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async findByDiscipline(discipline: string): Promise<Event[]> {
    const query = `
      SELECT *
      FROM events
      WHERE $1 = ANY(disciplines)
      ORDER BY start_date DESC
    `;
    const result = await pool.query(query, [discipline]);
    return result.rows;
  }

  async findByTeam(team: string): Promise<Event[]> {
    const query = `
      SELECT *
      FROM events
      WHERE $1 = ANY(teams)
      ORDER BY start_date DESC
    `;
    const result = await pool.query(query, [team]);
    return result.rows;
  }

  async findByStatus(status: string): Promise<Event[]> {
    const query = `
      SELECT *
      FROM events
      WHERE status = $1
      ORDER BY start_date DESC
    `;
    const result = await pool.query(query, [status]);
    return result.rows;
  }

  async getEventWithParticipants(id: string): Promise<Event | null> {
    const query = `
      WITH event_participants AS (
        SELECT 
          e.*,
          json_agg(
            json_build_object(
              'id', t.id,
              'firstName', t.first_name,
              'lastName', t.last_name,
              'discipline', t.discipline,
              'team', t.team
            )
          ) as participants
        FROM events e
        LEFT JOIN event_participants ep ON e.id = ep.event_id
        LEFT JOIN talents t ON ep.talent_id = t.id
        WHERE e.id = $1
        GROUP BY e.id
      )
      SELECT * FROM event_participants
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async addParticipant(eventId: string, talentId: string): Promise<boolean> {
    const query = `
      INSERT INTO event_participants (event_id, talent_id)
      VALUES ($1, $2)
      ON CONFLICT (event_id, talent_id) DO NOTHING
      RETURNING true
    `;
    const result = await pool.query(query, [eventId, talentId]);
    return result.rows[0]?.bool || false;
  }

  async removeParticipant(eventId: string, talentId: string): Promise<boolean> {
    const query = `
      DELETE FROM event_participants
      WHERE event_id = $1 AND talent_id = $2
      RETURNING true
    `;
    const result = await pool.query(query, [eventId, talentId]);
    return result.rows[0]?.bool || false;
  }
} 