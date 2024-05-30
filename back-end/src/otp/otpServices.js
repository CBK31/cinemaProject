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
exports.decrementLife = exports.updateIsUsedToTrue = exports.otpFinderByUserId = exports.OTPsaver = exports.sendOTP = void 0;
var otpError = require('./otpError');
var otpModel = require('./otpModel');
var axios = require('axios');
var userService_1 = require("../user/userService");
var otpFinderByUserId = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, otpModel.findOne({ userId: userId })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.otpFinderByUserId = otpFinderByUserId;
var updateIsUsedToTrue = function (otpId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, otpModel.findOneAndUpdate({ _id: otpId }, { $set: { isUsed: true } })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateIsUsedToTrue = updateIsUsedToTrue;
var decrementLife = function (otpId, lifeNum) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, otpModel.findOneAndUpdate({ _id: otpId }, { $set: { life: lifeNum } })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.decrementLife = decrementLife;
var saveOTP = function (myOTP, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var currentTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentTime = new Date();
                return [4 /*yield*/, otpModel({
                        userId: userId,
                        otpCode: myOTP,
                        expirationTime: new Date(currentTime.getTime() + 5 * 60000),
                        life: 5,
                        isUsed: false
                    }).save()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var sendOTP = function (email, myOTP) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = new URLSearchParams({
                    'apikey': '4D248F86759751CE0D227B29BA732E077E0978E80184E9385E83650C93E8AAC51987988B56062CCED504B757AEBB9185',
                    'subject': 'your OTP code',
                    'from': 'charbelak311@gmail.com',
                    'to': email,
                    'bodyHtml': "your OTP code is :  ".concat(myOTP),
                    'isTransactional': 'true'
                });
                return [4 /*yield*/, axios.post('https://api.elasticemail.com/v2/email/send', data)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.sendOTP = sendOTP;
var OTPsaver = function (myOTP, email) { return __awaiter(void 0, void 0, void 0, function () {
    var userFinder, currentTime, otpFinder, error, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, userService_1.findUserByEmail)(email)];
            case 1:
                userFinder = _a.sent();
                if (!userFinder) return [3 /*break*/, 10];
                currentTime = new Date();
                return [4 /*yield*/, otpFinderByUserId(userFinder._id)];
            case 2:
                otpFinder = _a.sent();
                if (!otpFinder) return [3 /*break*/, 7];
                if (!(otpFinder.expirationTime > currentTime && !otpFinder.isUsed && otpFinder.life > 0)) return [3 /*break*/, 3];
                error = new Error(otpError.otpAlreadyExist.message);
                error.statusCode = otpError.otpAlreadyExist.statusCode;
                throw error;
            case 3: return [4 /*yield*/, otpModel.deleteOne({ _id: otpFinder._id })];
            case 4:
                _a.sent();
                return [4 /*yield*/, saveOTP(myOTP, userFinder._id)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, saveOTP(myOTP, userFinder._id)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error = new Error(otpError.userNotFound.message);
                error.statusCode = otpError.userNotFound.statusCode;
                throw error;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.OTPsaver = OTPsaver;
