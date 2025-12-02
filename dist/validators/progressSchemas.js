"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgressSchema = void 0;
var zod_1 = require("zod");
exports.updateProgressSchema = zod_1.z.object({
    body: zod_1.z.object({
        lessonId: zod_1.z.string(),
        userId: zod_1.z.string(),
        completed: zod_1.z.boolean(),
    }),
});
//# sourceMappingURL=progressSchemas.js.map