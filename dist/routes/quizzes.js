"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var quizController_1 = require("../controllers/quizController");
var validate_1 = require("../middleware/validate");
var quizSchemas_1 = require("../validators/quizSchemas");
var router = (0, express_1.Router)({ mergeParams: true });
router.post("/", (0, validate_1.validate)(quizSchemas_1.createQuizSchema), quizController_1.createQuiz);
router.get("/", quizController_1.getAllQuizzes);
router.get("/:id", quizController_1.getQuizById);
router.put("/:id", (0, validate_1.validate)(quizSchemas_1.updateQuizSchema), quizController_1.updateQuiz);
router.delete("/:id", quizController_1.deleteQuiz);
exports.default = router;
//# sourceMappingURL=quizzes.js.map