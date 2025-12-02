"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnswerSchema = exports.createAnswerSchema = void 0;
var zod_1 = require("zod");
exports.createAnswerSchema = zod_1.z.object({
    body: zod_1.z.object({
        answerText: zod_1.z.string().min(1),
        isCorrect: zod_1.z.boolean(),
    }),
    params: zod_1.z.object({
        questionId: zod_1.z.string(),
    })
});
exports.updateAnswerSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    body: zod_1.z.object({
        text: zod_1.z.string().optional(),
        isCorrect: zod_1.z.boolean().optional(),
    }),
});
//# sourceMappingURL=answerSchemas.js.map