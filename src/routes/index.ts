import { Router } from "express";
import userRoutes from "./users";
import courseRoutes from "./courses";
import sectionRoutes from "./sections";
import lessonRoutes from "./lessons";
import quizRoutes from "./quizzes";
import questionRoutes from "./questions";
import answerRoutes from "./answers";

const router = Router();

router.use("/users", userRoutes);

// курсы
router.use("/courses", courseRoutes);

// секции внутри курсов
router.use("/courses/:courseId/sections", sectionRoutes);

// уроки внутри секций
router.use("/courses/:courseId/sections/:sectionId/lessons", lessonRoutes);

// квизы внутри уроков
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes",
  quizRoutes,
);

// вопросы внутри тестов
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions",
  questionRoutes,
);

// ответы внутри вопросов
router.use(
  "/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers",
  answerRoutes,
);

export default router;
