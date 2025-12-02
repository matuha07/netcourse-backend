"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuizSchema = exports.createQuizSchema = void 0;
var zod_1 = require("zod");
exports.createQuizSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3),
    }),
    params: zod_1.z.object({
        lessonId: zod_1.z.string()
    })
});
exports.updateQuizSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
    }),
});
//# sourceMappingURL=quizSchemas.js.map