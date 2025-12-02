"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var questionController_1 = require("../controllers/questionController");
var validate_1 = require("../middleware/validate");
var questionSchemas_1 = require("../validators/questionSchemas");
var router = (0, express_1.Router)({ mergeParams: true });
router.post("/", (0, validate_1.validate)(questionSchemas_1.createQuestionSchema), questionController_1.createQuestion);
router.get("/", questionController_1.getAllQuestions);
router.get("/:id", questionController_1.getQuestionById);
router.put("/:id", (0, validate_1.validate)(questionSchemas_1.updateQuestionSchema), questionController_1.updateQuestion);
router.delete("/:id", questionController_1.deleteQuestion);
exports.default = router;
//# sourceMappingURL=questions.js.map