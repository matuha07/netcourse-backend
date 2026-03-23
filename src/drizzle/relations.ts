import { relations } from "drizzle-orm/relations";
import {
	sections, lessons, quizzes, questions, answers,
	courses, enrollments, users, progress,
	userSocialLinks, badges, userBadges, certifications,
	forumPosts, forumReplies
} from "./schema";

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
	badges: many(badges),
	certifications: many(certifications),
}));

export const usersRelations = relations(users, ({many}) => ({
	enrollments: many(enrollments),
	progresses: many(progress),
	socialLinks: many(userSocialLinks),
	badges: many(userBadges),
	certifications: many(certifications),
	forumPosts: many(forumPosts),
	forumReplies: many(forumReplies),
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

export const userSocialLinksRelations = relations(userSocialLinks, ({one}) => ({
	user: one(users, {
		fields: [userSocialLinks.userId],
		references: [users.id]
	}),
}));

export const badgesRelations = relations(badges, ({one, many}) => ({
	course: one(courses, {
		fields: [badges.courseId],
		references: [courses.id]
	}),
	userBadges: many(userBadges),
}));

export const userBadgesRelations = relations(userBadges, ({one}) => ({
	user: one(users, {
		fields: [userBadges.userId],
		references: [users.id]
	}),
	badge: one(badges, {
		fields: [userBadges.badgeId],
		references: [badges.id]
	}),
}));

export const certificationsRelations = relations(certifications, ({one}) => ({
	user: one(users, {
		fields: [certifications.userId],
		references: [users.id]
	}),
	course: one(courses, {
		fields: [certifications.courseId],
		references: [courses.id]
	}),
}));

export const forumPostsRelations = relations(forumPosts, ({one, many}) => ({
	user: one(users, {
		fields: [forumPosts.userId],
		references: [users.id]
	}),
	replies: many(forumReplies),
}));

export const forumRepliesRelations = relations(forumReplies, ({one}) => ({
	post: one(forumPosts, {
		fields: [forumReplies.postId],
		references: [forumPosts.id]
	}),
	user: one(users, {
		fields: [forumReplies.userId],
		references: [users.id]
	}),
}));
