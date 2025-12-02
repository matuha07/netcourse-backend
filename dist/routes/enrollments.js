"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var enrollmentController_1 = require("../controllers/enrollmentController");
var validate_1 = require("../middleware/validate");
var enrollmentSchemas_1 = require("../validators/enrollmentSchemas");
var router = (0, express_1.Router)({ mergeParams: true });
router.post("/", (0, validate_1.validate)(enrollmentSchemas_1.enrollSchema), enrollmentController_1.createEnrollment);
router.get("/", enrollmentController_1.getEnrollments);
router.delete("/:enrollmentId", enrollmentController_1.deleteEnrollment);
exports.default = router;
//# sourceMappingURL=enrollments.js.map