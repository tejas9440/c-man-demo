-- migrate:up
ALTER TABLE products
  ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE,
  ADD COLUMN deleted_at TIMESTAMP;

-- migrate:down
ALTER TABLE products
  DROP COLUMN IF EXISTS is_deleted,
  DROP COLUMN IF EXISTS
