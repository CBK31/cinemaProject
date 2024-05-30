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
exports.deleteCateg = exports.updateCateg = exports.getOnecategory = exports.getcategories = exports.addCateg = void 0;
var categoryService_1 = require("./categoryService");
// import { findUserFromToken } from '../user/userService';
var addCateg = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, categoryName, categoryDescription, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, categoryName = _a.categoryName, categoryDescription = _a.categoryDescription;
                return [4 /*yield*/, (0, categoryService_1.addCategory)(categoryName, categoryDescription)];
            case 1:
                _b.sent();
                res.status(200).json({ message: 'category added successfully' });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(error_1.statusCode).json({ message: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addCateg = addCateg;
var getcategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestedPage, itempPerPage, categoriesFinder, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                requestedPage = parseInt(req.query.page, 10);
                itempPerPage = 3;
                return [4 /*yield*/, (0, categoryService_1.getcategoriesPaginated)(requestedPage, itempPerPage)];
            case 1:
                categoriesFinder = _a.sent();
                res.status(200).json({ categoriesFinder: categoriesFinder });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).json({ message: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getcategories = getcategories;
var getOnecategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, finder, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                categoryId = req.body.categoryId;
                return [4 /*yield*/, (0, categoryService_1.getOneCategoryById)(categoryId)];
            case 1:
                finder = _a.sent();
                if (finder) {
                    res.status(200).json({ finder: finder });
                }
                else {
                    res.status(400).json({ message: 'category not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).json({ message: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOnecategory = getOnecategory;
var updateCateg = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, categoryId, categName, categDesc, finder, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, categoryId = _a.categoryId, categName = _a.categName, categDesc = _a.categDesc;
                return [4 /*yield*/, (0, categoryService_1.updateCategory)(categoryId, categName, categDesc)];
            case 1:
                finder = _b.sent();
                if (finder) {
                    res.status(200).json({ message: 'category updated successfully' });
                }
                else {
                    res.status(400).json({ message: 'category not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                res.status(400).json({ message: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateCateg = updateCateg;
var deleteCateg = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                categoryId = req.body.categoryId;
                return [4 /*yield*/, (0, categoryService_1.deleteCategoryById)(categoryId)];
            case 1:
                result = _a.sent();
                if (result) {
                    res.status(200).json({ message: 'categoty deleted successfully' });
                }
                else {
                    res.status(400).json({ message: 'category not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(400).json({ message: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteCateg = deleteCateg;
