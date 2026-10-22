import { Pool } from "pg"

let pool: Pool | undefined

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not configured")
    }
    // Configure TLS using the connection URL; retain certificate verification.
    pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 5000 })
  }
  return pool
}

export async function saveEmail(email: string) {
  // Pool.query releases its connection automatically, including on failure.
  // The unique index also protects against concurrent duplicate submissions.
  await getPool().query(
    `INSERT INTO subscribers (email, created_at) VALUES ($1, NOW())
     ON CONFLICT (LOWER(email)) DO NOTHING`,
    [email],
  )
  return { success: true }
}
