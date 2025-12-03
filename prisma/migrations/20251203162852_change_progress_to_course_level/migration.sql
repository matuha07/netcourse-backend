/*
  Warnings:

  - You are about to drop the column `lesson_id` on the `progress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,course_id]` on the table `progress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `course_id` to the `progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "progress" DROP CONSTRAINT "Progress_lesson_id_fkey";

-- DropIndex
DROP INDEX "Progress_user_id_lesson_id_key";

-- AlterTable
ALTER TABLE "progress" DROP COLUMN "lesson_id",
ADD COLUMN     "course_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "progress_user_id_course_id_key" ON "progress"("user_id", "course_id");

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
