"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonSchema = exports.createLessonSchema = void 0;
var zod_1 = require("zod");
exports.createLessonSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        contentType: zod_1.z.enum(["video", "text"]),
        videoUrl: zod_1.z.string().optional(),
        textContent: zod_1.z.string().optional(),
        orderIndex: zod_1.z.number().min(0),
    }),
    params: zod_1.z.object({
        sectionId: zod_1.z.string(),
    }),
});
exports.updateLessonSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).optional(),
        contentType: zod_1.z.enum(["video", "text"]).optional(),
        videoUrl: zod_1.z.string().optional(),
        textContent: zod_1.z.string().optional(),
        orderIndex: zod_1.z.number().min(0).optional(),
    }),
    params: zod_1.z.object({
        lessonId: zod_1.z.string(),
    }),
});
//# sourceMappingURL=lessonSchemas.js.map