"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var answerController_1 = require("../controllers/answerController");
var answerSchemas_1 = require("../validators/answerSchemas");
var validate_1 = require("../middleware/validate");
var router = (0, express_1.Router)({ mergeParams: true });
router.post("/", (0, validate_1.validate)(answerSchemas_1.createAnswerSchema), answerController_1.createAnswer);
router.get("/", answerController_1.getAllAnswers);
router.get("/:id", answerController_1.getAnswerById);
router.put("/:id", (0, validate_1.validate)(answerSchemas_1.updateAnswerSchema), answerController_1.updateAnswer);
router.delete("/:id", answerController_1.deleteAnswer);
exports.default = router;
//# sourceMappingURL=answers.js.map