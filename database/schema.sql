BEGIN;

CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Existing case-insensitive duplicates must be reviewed before applying this index.
CREATE UNIQUE INDEX IF NOT EXISTS subscribers_email_lower_unique
  ON subscribers (LOWER(email));

COMMIT;
