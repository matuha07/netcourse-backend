import { Router } from "express";
import courseRoutes from "./courses";
import sectionRoutes from "./sections";
import lessonRoutes from "./lessons";
import quizRoutes from "./quizzes";
import questionRoutes from "./questions";
import answerRoutes from "./answers";
import userRoutes from "./users";
import progressRoutes from "./progress";
import authRoutes from "./auth";
import badgesRoutes from "./badges";
import certificationsRoutes from "./certifications";


const router = Router();

// auth
router.use("/auth", authRoutes);

// courses
router.use("/courses", courseRoutes);

// course's sections
router.use("/courses/:courseId/sections", sectionRoutes);

// progress
router.use("/courses/:courseId/progress", progressRoutes);

// section's lessons
router.use("/courses/:courseId/sections/:sectionId/lessons", lessonRoutes);

// user's
router.use("/users", userRoutes);

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

// badges
router.use("/badges", badgesRoutes);

// certifications
router.use("/certifications", certificationsRoutes);

export default router;