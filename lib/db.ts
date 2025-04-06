import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function saveEmail(email: string) {
  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO subscribers (email, created_at) VALUES ($1, NOW())',
      [email]
    );
    return { success: true };
  } catch (error) {
    console.error('Error saving email:', error);
    return { 
      success: false, 
      message: 'Une erreur est survenue lors de la sauvegarde de l\'email' 
    };
  } finally {
    client.release();
  }
} 