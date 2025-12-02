"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var validate_1 = require("../middleware/validate");
var userSchemas_1 = require("../validators/userSchemas");
var router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(userSchemas_1.createUserSchema), userController_1.createUser);
router.get("/", userController_1.getAllUsers);
router.delete("/:id", userController_1.deleteUser);
router.put("/:id", (0, validate_1.validate)(userSchemas_1.updateUserSchema), userController_1.updateUser);
router.get("/:id", userController_1.getUserById);
exports.default = router;
//# sourceMappingURL=users.js.map