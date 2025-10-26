import { Router } from "express";
import userRoutes from "./users";
import courseRoutes from "./courses";
import sectionRoutes from "./sections";
import lessonRoutes from "./lessons";
import quizRoutes from "./quizzes";
import questionRoutes from "./questions";
import answerRoutes from "./answers";
import enrollmentRoutes from "./enrollments";
import progressRoutes from "./progress";

const router = Router();

// users
router.use("/users", userRoutes);
// courses
router.use("/courses", courseRoutes);

//course's enrollments
router.use("/courses/:courseId/enrollments", enrollmentRoutes);

//course's sections
router.use("/courses/:courseId/sections", sectionRoutes);

//section's lessons
router.use("/courses/:courseId/sections/:sectionId/lessons", lessonRoutes);

//lesson's progress
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/progress",
  progressRoutes,
);

//lesson's quiz
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes",
  quizRoutes,
);

//quiz questions
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions",
  questionRoutes,
);

//quiz answers
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers",
  answerRoutes,
);

export default router;
