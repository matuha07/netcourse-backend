"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSectionSchema = exports.createSectionSchema = void 0;
var zod_1 = require("zod");
exports.createSectionSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        orderIndex: zod_1.z.number().min(0),
    }),
    params: zod_1.z.object({
        courseId: zod_1.z.string(),
    }),
});
exports.updateSectionSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        orderIndex: zod_1.z.number().min(0),
    }),
    params: zod_1.z.object({
        sectionId: zod_1.z.string(),
    }),
});
//# sourceMappingURL=sectionSchemas.js.map