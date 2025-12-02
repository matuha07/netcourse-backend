"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var validate_1 = require("../middleware/validate");
var userSchemas_1 = require("../validators/userSchemas");
var authSchemas_1 = require("../validators/authSchemas");
var router = (0, express_1.Router)();
router.post("/register", (0, validate_1.validate)(userSchemas_1.createUserSchema), authController_1.register);
router.post("/login", (0, validate_1.validate)(authSchemas_1.loginSchema), authController_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map