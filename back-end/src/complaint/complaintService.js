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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComp = exports.deleteComplaint = exports.getComplaintByUserIdAndCompId = exports.getComplaintByUserId = exports.createComplaint = void 0;
var jwt = require('jsonwebtoken');
var complaintModel = require('./complaintModel');
var complaintError = require('./complaintError');
var categoryService_1 = require("../category/categoryService");
// const complaintFinderBytitle = async (cTitle) => {
//     return await complaintModel.findOne({ title: cTitle });
// }
var categoryChecker = function (categories) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, categories_1, element;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, categories_1 = categories;
                _a.label = 1;
            case 1:
                if (!(_i < categories_1.length)) return [3 /*break*/, 4];
                element = categories_1[_i];
                return [4 /*yield*/, (0, categoryService_1.findCategByName)(element)];
            case 2:
                if (!(_a.sent())) {
                    return [2 /*return*/, false];
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var createComplaint = function (userId, title, body, categories) { return __awaiter(void 0, void 0, void 0, function () {
    var error, categChecker, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!title || !body || !categories || categories.length === 0) {
                    error = new Error(complaintError.invalidComplaint.message);
                    error.statusCode = complaintError.invalidComplaint.statusCode;
                    throw error;
                }
                return [4 /*yield*/, categoryChecker(categories)];
            case 1:
                categChecker = _a.sent();
                if (!categChecker) return [3 /*break*/, 3];
                return [4 /*yield*/, new complaintModel({
                        userId: userId,
                        title: title,
                        body: body,
                        categories: categories,
                        creationDate: new Date()
                    }).save()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error = new Error(complaintError.categNotFound.message);
                error.statusCode = complaintError.categNotFound.statusCode;
                throw error;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createComplaint = createComplaint;
var getComplaintByUserId = function (userId, pageNum, itemsPerPage) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, complaintModel.find({ userId: userId }).skip((pageNum - 1) * itemsPerPage).limit(itemsPerPage)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getComplaintByUserId = getComplaintByUserId;
var getComplaintByUserIdAndCompId = function (userId, complaintid) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, complaintModel.findOne({ _id: complaintid, userId: userId })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getComplaintByUserIdAndCompId = getComplaintByUserIdAndCompId;
var deleteComplaint = function (userId, complaintId) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, complaintModel.deleteOne({
                    _id: complaintId,
                    userId: userId
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.deletedCount > 0];
        }
    });
}); };
exports.deleteComplaint = deleteComplaint;
var updateComp = function (complaintId, complaintStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, complaintModel.findByIdAndUpdate(complaintId, {
                    status: complaintStatus,
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.updateComp = updateComp;
