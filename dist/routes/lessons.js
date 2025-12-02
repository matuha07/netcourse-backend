"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var lessonController_1 = require("../controllers/lessonController");
var validate_1 = require("../middleware/validate");
var lessonSchemas_1 = require("../validators/lessonSchemas");
var router = (0, express_1.Router)({ mergeParams: true });
router.post("/", (0, validate_1.validate)(lessonSchemas_1.createLessonSchema), lessonController_1.createLesson);
router.get("/", lessonController_1.getAllLessons);
router.get("/:id", lessonController_1.getLessonById);
router.put("/:id", lessonController_1.updateLesson);
router.delete("/:id", lessonController_1.deleteLesson);
exports.default = router;
//# sourceMappingURL=lessons.js.map