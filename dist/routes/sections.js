"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sectionController_1 = require("../controllers/sectionController");
var validate_1 = require("../middleware/validate");
var sectionSchemas_1 = require("../validators/sectionSchemas");
var router = (0, express_1.Router)({ mergeParams: true });
router.post("/", (0, validate_1.validate)(sectionSchemas_1.createSectionSchema), sectionController_1.createSection);
router.get("/", sectionController_1.getAllSections);
router.get("/:sectionId", sectionController_1.getSectionById);
router.put("/:sectionId", (0, validate_1.validate)(sectionSchemas_1.updateSectionSchema), sectionController_1.updateSection);
router.delete("/:sectionId", sectionController_1.deleteSection);
exports.default = router;
//# sourceMappingURL=sections.js.map