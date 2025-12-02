"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var validate = function (schema) {
    return function (req, res, next) {
        var result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        if (!result.success) {
            return res.status(400).json({
                error: "validation_error",
                issues: result.error.issues,
            });
        }
        req.validated = result.data;
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map