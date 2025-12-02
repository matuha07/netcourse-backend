"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var urlController_1 = require("../controllers/urlController");
var router = (0, express_1.Router)();
router.post("/", urlController_1.urlShort);
router.get("/:short", urlController_1.urlRedirect);
exports.default = router;
//# sourceMappingURL=shorten.js.map