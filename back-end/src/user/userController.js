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
exports.changePassword = exports.resetpassword = exports.forgetpassword = exports.login = exports.signUp = void 0;
var userService_1 = require("./userService");
require("express-session");
var otpServices_1 = require("../otp/otpServices");
var jwt = require('jsonwebtoken');
var userError = require('./userError');
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, firstName, lastName, password, isVIP, isAdmin, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, password = _a.password, isVIP = _a.isVIP, isAdmin = _a.isAdmin;
                return [4 /*yield*/, (0, userService_1.createUser)(email, firstName, lastName, password, isVIP, isAdmin)];
            case 1:
                _b.sent();
                res.status(200).json({ message: 'user added successfully' });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(400).json({ message: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userFinder, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, userService_1.logInService)(email, password)];
            case 1:
                userFinder = _b.sent();
                if (userFinder) {
                    req.session.isLoggedIn = true;
                    req.session.userId = userFinder._id;
                    token = jwt.sign({ email: email }, 'a_secret_key');
                    res.status(200).json({ token: token });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.status(error_2.statusCode).json({ message: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var forgetpassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, myOTP, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                email = req.body.email;
                return [4 /*yield*/, (0, userService_1.findUserByEmail)(email)];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 4];
                myOTP = Math.floor(100000 + Math.random() * 900000).toString();
                return [4 /*yield*/, (0, otpServices_1.OTPsaver)(myOTP, email)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, otpServices_1.sendOTP)(email, myOTP)];
            case 3:
                _a.sent();
                res.status(200).json({ message: 'OTP sent successfully' });
                return [3 /*break*/, 5];
            case 4:
                res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                res.status(400).json({ message: error_3.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.forgetpassword = forgetpassword;
var resetpassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, newPassword, userFinder, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, newPassword = _a.newPassword;
                return [4 /*yield*/, (0, userService_1.findUserByEmail)(email)];
            case 1:
                userFinder = _b.sent();
                if (!userFinder) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, userService_1.updatePassword)(userFinder._id, newPassword)];
            case 2:
                _b.sent();
                res.status(200).json({ message: 'password updated successfully' });
                return [3 /*break*/, 4];
            case 3:
                res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _b.sent();
                res.status(400).json({ message: error_4.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.resetpassword = resetpassword;
var changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPassword, userFinder, userF, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                newPassword = req.body.newPassword;
                return [4 /*yield*/, (0, userService_1.findUserFromToken)(req)];
            case 1:
                userFinder = _a.sent();
                return [4 /*yield*/, (0, userService_1.findUserById)(userFinder._id)];
            case 2:
                userF = _a.sent();
                if (!userF) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, userService_1.updatePassword)(userF._id, newPassword)];
            case 3:
                _a.sent();
                res.status(200).json({ message: 'password updated successfully' });
                return [3 /*break*/, 5];
            case 4:
                res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_5 = _a.sent();
                res.status(400).json({ message: error_5.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = changePassword;
