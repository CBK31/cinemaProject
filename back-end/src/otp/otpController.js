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
exports.resendOTP = exports.verifyOTP = void 0;
var otpServices_1 = require("../otp/otpServices");
var otpError = require('./otpError');
var userService_1 = require("../user/userService");
var userError = require('../user/userError');
var verifyOTP = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, otp, userFinder, otpFinder, currentTime, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 13, , 14]);
                _a = req.body, email = _a.email, otp = _a.otp;
                return [4 /*yield*/, (0, userService_1.findUserByEmail)(email)];
            case 1:
                userFinder = _b.sent();
                if (!userFinder) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, otpServices_1.otpFinderByUserId)(userFinder._id)];
            case 2:
                otpFinder = _b.sent();
                if (!otpFinder) return [3 /*break*/, 9];
                currentTime = new Date();
                if (!(otpFinder.otpCode === otp && otpFinder.expirationTime > currentTime && otpFinder.life > 0)) return [3 /*break*/, 6];
                if (!(otpFinder.isUsed == false)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, otpServices_1.updateIsUsedToTrue)(otpFinder._id)];
            case 3:
                _b.sent();
                res.status(200).json({ message: 'OTP match' });
                return [3 /*break*/, 5];
            case 4:
                res.status(otpError.otpAlreadyused.statusCode).json({ message: otpError.otpAlreadyused.message });
                _b.label = 5;
            case 5: return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, (0, otpServices_1.decrementLife)(otpFinder._id, (otpFinder.life - 1))];
            case 7:
                _b.sent();
                res.status(otpError.notMatched.statusCode).json({ message: otpError.notMatched.message });
                _b.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                res.status(otpError.otpNotFound.statusCode).json({ message: otpError.otpNotFound.message });
                _b.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
                _b.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                error_1 = _b.sent();
                res.status(400).json({ message: error_1.message });
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.verifyOTP = verifyOTP;
var resendOTP = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, userFinder, otpFinder, currentTime, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                email = req.body.email;
                return [4 /*yield*/, (0, userService_1.findUserByEmail)(email)];
            case 1:
                userFinder = _a.sent();
                if (!userFinder) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, otpServices_1.otpFinderByUserId)(userFinder._id)];
            case 2:
                otpFinder = _a.sent();
                if (!otpFinder) return [3 /*break*/, 9];
                currentTime = new Date();
                if (!(otpFinder.life > 0 && otpFinder.expirationTime > currentTime)) return [3 /*break*/, 7];
                if (!(otpFinder.isUsed == false)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, otpServices_1.sendOTP)(email, otpFinder.otpCode)];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, otpServices_1.decrementLife)(otpFinder._id, (otpFinder.life - 1))];
            case 4:
                _a.sent();
                res.status(200).json({ message: 'OTP sent successfully' });
                return [3 /*break*/, 6];
            case 5:
                res.status(otpError.otpAlreadyused.statusCode).json({ message: otpError.otpAlreadyused.message });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                res.status(otpError.exriredOrlifeEnded.statusCode).json({ message: otpError.exriredOrlifeEnded.message });
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                res.status(otpError.otpNotFound.statusCode).json({ message: otpError.otpNotFound.message });
                _a.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
                _a.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                error_2 = _a.sent();
                res.status(400).json({ message: error_2.message });
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.resendOTP = resendOTP;
