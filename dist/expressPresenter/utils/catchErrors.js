"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var rulr_1 = require("rulr");
var uuid_1 = require("uuid");
var BaseError_1 = require("../../errors/BaseError");
var InvalidAuth_1 = require("../../errors/InvalidAuth");
var NoModel_1 = require("../../errors/NoModel");
var Unauthorised_1 = require("../../errors/Unauthorised");
var sendMessage_1 = require("../utils/sendMessage");
var sendWarnings_1 = require("../utils/sendWarnings");
exports.default = function (config, handler) {
    var translator = config.translator;
    return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, handler(req, res).catch(function (err) {
                    var errorId = uuid_1.v4();
                    config.logger.error(errorId, err);
                    if (lodash_1.isNull(err) || lodash_1.isUndefined(null)) {
                        var code = 500;
                        var message = translator.serverError();
                        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
                    }
                    switch (err.constructor) {
                        case InvalidAuth_1.default: {
                            var code = 400;
                            var message = translator.invalidAuth(err);
                            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
                        }
                        case rulr_1.Warnings: {
                            var code = 400;
                            var warnings = err.warnings;
                            return sendWarnings_1.default({ res: res, code: code, errorId: errorId, warnings: warnings, translator: translator });
                        }
                        case NoModel_1.default: {
                            var code = 404;
                            var message = translator.noModel(err);
                            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
                        }
                        case Unauthorised_1.default: {
                            var code = 401;
                            var message = translator.unauthorised(err);
                            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
                        }
                        case Error:
                        case BaseError_1.default:
                        default: {
                            var code = 500;
                            var message = translator.serverError();
                            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
                        }
                    }
                })];
        });
    }); };
};
//# sourceMappingURL=catchErrors.js.map