"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./auth"));
var users_1 = __importDefault(require("./users"));
var courses_1 = __importDefault(require("./courses"));
var sections_1 = __importDefault(require("./sections"));
var lessons_1 = __importDefault(require("./lessons"));
var quizzes_1 = __importDefault(require("./quizzes"));
var questions_1 = __importDefault(require("./questions"));
var answers_1 = __importDefault(require("./answers"));
var enrollments_1 = __importDefault(require("./enrollments"));
var progress_1 = __importDefault(require("./progress"));
var shorten_1 = __importDefault(require("./shorten"));
var urlController_1 = require("../controllers/urlController");
var router = (0, express_1.Router)();
// auth
router.use("/auth", auth_1.default);
// bitch ass url shortener
router.use("/shorten", shorten_1.default);
// url redirect
router.use("/shorten/:short", urlController_1.urlRedirect);
// users
router.use("/users", users_1.default);
// courses
router.use("/courses", courses_1.default);
// course's enrollments
router.use("/courses/:courseId/enrollments", enrollments_1.default);
// course's sections
router.use("/courses/:courseId/sections", sections_1.default);
// section's lessons
router.use("/courses/:courseId/sections/:sectionId/lessons", lessons_1.default);
// lesson's progress
router.use("/courses/:courseId/sections/:sectionId/lessons/:lessonId/progress", progress_1.default);
// lesson's quizzes
router.use("/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes", quizzes_1.default);
// quiz questions
router.use("/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions", questions_1.default);
// quiz answers
router.use("/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers", answers_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map