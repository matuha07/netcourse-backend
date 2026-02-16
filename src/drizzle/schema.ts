import { pgTable, uniqueIndex, serial, text, timestamp, foreignKey, integer, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const ContentType = pgEnum("ContentType", ['video', 'text', 'quiz'])
export const ProgressStatus = pgEnum("ProgressStatus", ['not_started', 'in_progress', 'completed'])
export const QuestionType = pgEnum("QuestionType", ['single', 'multiple', 'text'])
export const Role = pgEnum("Role", ['ADMIN', 'USER', 'STUDENT'])

// Users table
export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	username: text(),
	avatarUrl: text("avatar_url"),
	createdAt: timestamp("created_at", { precision: 3, mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	role: Role().default('USER').notNull(),
}, (table) => [
	uniqueIndex("users_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
])

// Courses table
export const courses = pgTable("courses", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	category: text(),
})

// Sections table
export const sections = pgTable("sections", {
	id: serial().primaryKey().notNull(),
	courseId: integer("course_id").notNull(),
	title: text().notNull(),
	orderIndex: integer("order_index").default(0).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "Section_course_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
])

// Lessons table
export const lessons = pgTable("lessons", {
	id: serial().primaryKey().notNull(),
	sectionId: integer("section_id").notNull(),
	title: text().notNull(),
	contentType: ContentType("content_type"),
	videoUrl: text("video_url"),
	textContent: text("text_content"),
	orderIndex: integer("order_index").default(0).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.sectionId],
			foreignColumns: [sections.id],
			name: "Lesson_section_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
])

// Quizzes table
export const quizzes = pgTable("quizzes", {
	id: serial().primaryKey().notNull(),
	lessonId: integer("lesson_id").notNull(),
	title: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.lessonId],
			foreignColumns: [lessons.id],
			name: "Quiz_lesson_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
])

// Questions table
export const questions = pgTable("questions", {
	id: serial().primaryKey().notNull(),
	quizId: integer("quiz_id").notNull(),
	questionText: text("question_text").notNull(),
	questionType: QuestionType("question_type"),
}, (table) => [
	foreignKey({
			columns: [table.quizId],
			foreignColumns: [quizzes.id],
			name: "Question_quiz_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
])

// Answers table
export const answers = pgTable("answers", {
	id: serial().primaryKey().notNull(),
	questionId: integer("question_id"),
	answerText: text("answer_text").notNull(),
	isCorrect: boolean("is_correct").default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.questionId],
			foreignColumns: [questions.id],
			name: "Answer_question_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
])

// Enrollments table
export const enrollments = pgTable("enrollments", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	courseId: integer("course_id").notNull(),
	enrolledAt: timestamp("enrolled_at", { precision: 3, mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("Enrollment_user_id_course_id_key").using("btree", table.userId.asc().nullsLast().op("int4_ops"), table.courseId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "Enrollment_course_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "Enrollment_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
])

// Progress table
export const progress = pgTable("progress", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	courseId: integer("course_id").notNull(),
	status: ProgressStatus().default('not_started').notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("progress_user_id_course_id_key").using("btree", table.userId.asc().nullsLast().op("int4_ops"), table.courseId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "progress_course_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "Progress_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
])