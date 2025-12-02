"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestionSchema = exports.createQuestionSchema = void 0;
var zod_1 = require("zod");
exports.createQuestionSchema = zod_1.z.object({
    body: zod_1.z.object({
        questionType: zod_1.z.string(),
        questionText: zod_1.z.string().min(3),
    }),
    params: zod_1.z.object({
        quizId: zod_1.z.string(),
    })
});
exports.updateQuestionSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    body: zod_1.z.object({
        questionText: zod_1.z.string().optional(),
    }),
});
//# sourceMappingURL=questionSchemas.js.map