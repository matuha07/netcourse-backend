"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var progressController_1 = require("../controllers/progressController");
var validate_1 = require("../middleware/validate");
var progressSchemas_1 = require("../validators/progressSchemas");
var router = (0, express_1.Router)({ mergeParams: true });
router.get("/", progressController_1.getLessonProgress);
router.put("/", (0, validate_1.validate)(progressSchemas_1.updateProgressSchema), progressController_1.updateProgress);
exports.default = router;
//# sourceMappingURL=progress.js.map