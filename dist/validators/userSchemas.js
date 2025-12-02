"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
var zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email(),
        password: zod_1.z.string().min(6),
        role: zod_1.z.string().optional(),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    body: zod_1.z.object({
        email: zod_1.z.email().optional(),
        role: zod_1.z.string().optional(),
    }),
});
//# sourceMappingURL=userSchemas.js.map