"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnswer = exports.updateAnswer = exports.getAnswerById = exports.getAllAnswers = exports.createAnswer = void 0;
var prisma_1 = __importDefault(require("../prisma"));
var createAnswer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var questionId, _a, answerText, isCorrect, answer, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                questionId = req.params.questionId;
                _a = req.validated.body, answerText = _a.answerText, isCorrect = _a.isCorrect;
                return [4 /*yield*/, prisma_1.default.answer.create({
                        data: { questionId: Number(questionId), answerText: answerText, isCorrect: isCorrect },
                    })];
            case 1:
                answer = _c.sent();
                res.status(201).json(answer);
                return [3 /*break*/, 3];
            case 2:
                _b = _c.sent();
                res.status(500).json({ error: "Failed to create answer" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createAnswer = createAnswer;
var getAllAnswers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answers, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.default.answer.findMany({
                        include: { question: true },
                    })];
            case 1:
                answers = _b.sent();
                res.json(answers);
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(500).json({ error: "Failed to fetch answers" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllAnswers = getAllAnswers;
var getAnswerById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, answer, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma_1.default.answer.findUnique({
                        where: { id: Number(id) },
                        include: { question: true },
                    })];
            case 1:
                answer = _b.sent();
                if (!answer)
                    return [2 /*return*/, res.status(404).json({ error: "Answer not found" })];
                res.json(answer);
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(500).json({ error: "Failed to fetch answer" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAnswerById = getAnswerById;
var updateAnswer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, answerText, isCorrect, updated, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.validated.body, answerText = _a.answerText, isCorrect = _a.isCorrect;
                return [4 /*yield*/, prisma_1.default.answer.update({
                        where: { id: Number(id) },
                        data: { answerText: answerText, isCorrect: isCorrect },
                    })];
            case 1:
                updated = _c.sent();
                res.json(updated);
                return [3 /*break*/, 3];
            case 2:
                _b = _c.sent();
                res.status(500).json({ error: "Failed to update answer" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateAnswer = updateAnswer;
var deleteAnswer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma_1.default.answer.delete({ where: { id: Number(id) } })];
            case 1:
                _b.sent();
                res.status(204).send();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(500).json({ error: "Failed to delete answer" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteAnswer = deleteAnswer;
//# sourceMappingURL=answerController.js.map