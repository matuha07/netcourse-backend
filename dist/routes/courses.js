"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var courseController_1 = require("../controllers/courseController");
var validate_1 = require("../middleware/validate");
var courseSchemas_1 = require("../validators/courseSchemas");
var router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(courseSchemas_1.createCourseSchema), courseController_1.createCourse);
router.get("/", courseController_1.getAllCourses);
router.get("/:id", courseController_1.getCourseById);
router.put("/:id", courseController_1.updateCourse);
router.delete("/:id", courseController_1.deleteCourse);
exports.default = router;
//# sourceMappingURL=courses.js.map