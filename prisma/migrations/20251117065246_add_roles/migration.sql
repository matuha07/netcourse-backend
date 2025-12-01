-- prisma/migrations/20251117065246_add_roles/steps.sql
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'STUDENT');

ALTER TABLE "users"
ADD COLUMN "role" "Role" NOT NULL DEFAULT 'USER';
