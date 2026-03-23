import { Router } from "express";
import authRoutes from "./auth";
import courseRoutes from "./courses";
import sectionRoutes from "./sections";
import lessonRoutes from "./lessons";
import quizRoutes from "./quizzes";
import questionRoutes from "./questions";
import answerRoutes from "./answers";
import enrollmentRoutes from "./enrollments";
import progressRoutes from "./progress";
import userRoutes from "./users";
import socialLinksRoutes from "./sociallinks";
import badgesRoutes from "./badges";
import certificationsRoutes from "./certifications";
import forumPostsRoutes from "./forumPosts";
import forumRepliesRoutes from "./forumReplies";

const router = Router();

// auth
router.use("/auth", authRoutes);


// users
router.use("/users", userRoutes);

// courses
router.use("/courses", courseRoutes);

// course's enrollments
router.use("/courses/:courseId/enrollments", enrollmentRoutes);

// course's sections
router.use("/courses/:courseId/sections", sectionRoutes);

// section's lessons
router.use("/courses/:courseId/sections/:sectionId/lessons", lessonRoutes);

// progress
router.use("/courses/:courseId/progress", progressRoutes);

// lesson's quizzes
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes",
  quizRoutes,
);

// quiz questions
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions",
  questionRoutes,
);

// quiz answers
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers",
  answerRoutes,
);

// social links
router.use("/social-links", socialLinksRoutes);

// badges
router.use("/badges", badgesRoutes);

// certifications
router.use("/certifications", certificationsRoutes);

// forum posts
router.use("/forum/posts", forumPostsRoutes);

// forum replies
router.use("/forum/posts/:postId/replies", forumRepliesRoutes);

export default router;
