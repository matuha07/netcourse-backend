import { relations } from "drizzle-orm/relations";
import { sections, lessons, quizzes, questions, answers, courses, enrollments, users, progress } from "./schema";

export const lessonsRelations = relations(lessons, ({one, many}) => ({
	section: one(sections, {
		fields: [lessons.sectionId],
		references: [sections.id]
	}),
	quizzes: many(quizzes),
}));

export const sectionsRelations = relations(sections, ({one, many}) => ({
	lessons: many(lessons),
	course: one(courses, {
		fields: [sections.courseId],
		references: [courses.id]
	}),
}));

export const questionsRelations = relations(questions, ({one, many}) => ({
	quiz: one(quizzes, {
		fields: [questions.quizId],
		references: [quizzes.id]
	}),
	answers: many(answers),
}));

export const quizzesRelations = relations(quizzes, ({one, many}) => ({
	questions: many(questions),
	lesson: one(lessons, {
		fields: [quizzes.lessonId],
		references: [lessons.id]
	}),
}));

export const answersRelations = relations(answers, ({one}) => ({
	question: one(questions, {
		fields: [answers.questionId],
		references: [questions.id]
	}),
}));

export const enrollmentsRelations = relations(enrollments, ({one}) => ({
	course: one(courses, {
		fields: [enrollments.courseId],
		references: [courses.id]
	}),
	user: one(users, {
		fields: [enrollments.userId],
		references: [users.id]
	}),
}));

export const coursesRelations = relations(courses, ({many}) => ({
	enrollments: many(enrollments),
	progresses: many(progress),
	sections: many(sections),
}));

export const usersRelations = relations(users, ({many}) => ({
	enrollments: many(enrollments),
	progresses: many(progress),
}));

export const progressRelations = relations(progress, ({one}) => ({
	course: one(courses, {
		fields: [progress.courseId],
		references: [courses.id]
	}),
	user: one(users, {
		fields: [progress.userId],
		references: [users.id]
	}),
}));