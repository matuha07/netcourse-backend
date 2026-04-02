CREATE TABLE IF NOT EXISTS "forum_tags" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "forum_post_tags" (
  "id" serial PRIMARY KEY NOT NULL,
  "post_id" integer NOT NULL,
  "tag_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "forum_reply_tags" (
  "id" serial PRIMARY KEY NOT NULL,
  "reply_id" integer NOT NULL,
  "tag_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "forum_post_likes" (
  "id" serial PRIMARY KEY NOT NULL,
  "post_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "forum_reply_likes" (
  "id" serial PRIMARY KEY NOT NULL,
  "reply_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "forum_post_tags" ADD CONSTRAINT "ForumPostTags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."forum_posts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forum_post_tags" ADD CONSTRAINT "ForumPostTags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."forum_tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forum_reply_tags" ADD CONSTRAINT "ForumReplyTags_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "public"."forum_replies"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forum_reply_tags" ADD CONSTRAINT "ForumReplyTags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."forum_tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forum_post_likes" ADD CONSTRAINT "ForumPostLikes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."forum_posts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forum_post_likes" ADD CONSTRAINT "ForumPostLikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forum_reply_likes" ADD CONSTRAINT "ForumReplyLikes_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "public"."forum_replies"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forum_reply_likes" ADD CONSTRAINT "ForumReplyLikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "forum_tags_name_key" ON "forum_tags" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "forum_post_tags_post_id_tag_id_key" ON "forum_post_tags" ("post_id", "tag_id");
CREATE UNIQUE INDEX IF NOT EXISTS "forum_reply_tags_reply_id_tag_id_key" ON "forum_reply_tags" ("reply_id", "tag_id");
CREATE UNIQUE INDEX IF NOT EXISTS "forum_post_likes_post_id_user_id_key" ON "forum_post_likes" ("post_id", "user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "forum_reply_likes_reply_id_user_id_key" ON "forum_reply_likes" ("reply_id", "user_id");
CREATE INDEX IF NOT EXISTS "forum_post_tags_post_id_idx" ON "forum_post_tags" ("post_id");
CREATE INDEX IF NOT EXISTS "forum_reply_tags_reply_id_idx" ON "forum_reply_tags" ("reply_id");
CREATE INDEX IF NOT EXISTS "forum_post_likes_post_id_idx" ON "forum_post_likes" ("post_id");
CREATE INDEX IF NOT EXISTS "forum_reply_likes_reply_id_idx" ON "forum_reply_likes" ("reply_id");
