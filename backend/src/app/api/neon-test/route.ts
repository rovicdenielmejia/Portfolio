import pool from '@app/lib/neon';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query('SELECT NOW()');
    return NextResponse.json({ time: result.rows[0].now });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
