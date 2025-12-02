"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollSchema = void 0;
var zod_1 = require("zod");
exports.enrollSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string(),
        userId: zod_1.z.string(),
    }),
});
//# sourceMappingURL=enrollmentSchemas.js.map