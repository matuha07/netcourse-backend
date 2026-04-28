ALTER TABLE "courses"
  ADD COLUMN IF NOT EXISTS "require_quiz_completion" boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "min_quiz_score" integer NOT NULL DEFAULT 65;

CREATE TABLE IF NOT EXISTS "quiz_attempts" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL,
  "quiz_id" integer NOT NULL,
  "score" integer NOT NULL,
  "passed" boolean NOT NULL DEFAULT false,
  "completed_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DO $$ BEGIN
 ALTER TABLE "quiz_attempts" ADD CONSTRAINT "QuizAttempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "quiz_attempts" ADD CONSTRAINT "QuizAttempts_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
