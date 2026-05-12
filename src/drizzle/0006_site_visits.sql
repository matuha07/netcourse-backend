CREATE TABLE IF NOT EXISTS "site_visits" (
  "id" integer PRIMARY KEY NOT NULL,
  "count" integer NOT NULL DEFAULT 0,
  "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "site_visits" ("id", "count")
VALUES (1, 0)
ON CONFLICT ("id") DO NOTHING;
