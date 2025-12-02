"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET = process.env.JWT_SECRET || "secret_key";
var authenticate = function (req, res, next) {
    var header = req.headers.authorization;
    if (!(header === null || header === void 0 ? void 0 : header.startsWith("Bearer "))) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    var token = header.split(" ")[1];
    try {
        var decoded = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = decoded;
        next();
    }
    catch (_a) {
        res.status(401).json({ error: "Invalid token" });
    }
};
exports.authenticate = authenticate;
var requireRole = function (roles) {
    return function (req, res, next) {
        var user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=authMiddleware.js.map