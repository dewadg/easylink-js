"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var EasyLink = (function () {
    function EasyLink(_a) {
        var host = _a.host, serialNumber = _a.serialNumber;
        this.host = host;
        this.serialNumber = serialNumber;
        this.axios = axios_1.default.create({
            baseURL: host,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    }
    EasyLink.prototype.generatePayload = function (payload) {
        var payloadKeys = Object.keys(payload);
        var payloadString = '?';
        payloadKeys.forEach(function (item, index) {
            if (typeof payload[item] === 'object' || Array.isArray(payload[item])) {
                payloadString += item + "=" + JSON.stringify(payload[item]);
            }
            else {
                payloadString += item + "=" + payload[item];
            }
            if (index < payloadKeys.length - 1)
                payloadString += '&';
        });
        return payloadString;
    };
    EasyLink.prototype.getDeviceInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber });
                        url = "/dev/info" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result) {
                            throw new Error('Get device info request failed');
                        }
                        return [2, res.data.DEVINFO];
                    case 2:
                        err_1 = _a.sent();
                        throw err_1;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber });
                        url = "/user/all" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result && typeof res.data.message !== 'string') {
                            throw new Error('Get all users request failed');
                        }
                        return [2, Array.isArray(res.data.Data) ? res.data.Data : []];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.uploadUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload(__assign({ sn: this.serialNumber }, data));
                        url = "/user/set" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result) {
                            throw new Error('Upload user request failed');
                        }
                        return [3, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.deleteAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber });
                        url = "/user/delall" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result) {
                            throw new Error('Delete all users request failed');
                        }
                        return [3, 3];
                    case 2:
                        err_4 = _a.sent();
                        throw err_4;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.deleteUser = function (pin) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber, pin: pin });
                        url = "/user/del" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result) {
                            throw new Error('Delete a user request failed');
                        }
                        return [3, 3];
                    case 2:
                        err_5 = _a.sent();
                        throw err_5;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.getAllScanLogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber });
                        url = "/scanlog/all" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result && typeof res.data.message !== 'string') {
                            throw new Error('Get all scanlogs request failed');
                        }
                        return [2, Array.isArray(res.data.Data) ? res.data.Data : []];
                    case 2:
                        err_6 = _a.sent();
                        throw err_6;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.getNewScanLogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber });
                        url = "/scanlog/new" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result && typeof res.data.message !== 'string') {
                            throw new Error('Get all scanlogs request failed');
                        }
                        return [2, Array.isArray(res.data.Data) ? res.data.Data : []];
                    case 2:
                        err_7 = _a.sent();
                        throw err_7;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.deleteAllScanLogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber });
                        url = "/scanlog/del" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result) {
                            throw new Error('Delete all scan logs request failed');
                        }
                        return [3, 3];
                    case 2:
                        err_8 = _a.sent();
                        throw err_8;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.syncDateTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber });
                        url = "/dev/settime" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result) {
                            throw new Error('Date/time sync request failed');
                        }
                        return [3, 3];
                    case 2:
                        err_9 = _a.sent();
                        throw err_9;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.deleteDeviceLogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber });
                        url = "/log/del" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result) {
                            throw new Error('Delete device logs request failed');
                        }
                        return [3, 3];
                    case 2:
                        err_10 = _a.sent();
                        throw err_10;
                    case 3: return [2];
                }
            });
        });
    };
    EasyLink.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, url, res, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = this.generatePayload({ sn: this.serialNumber });
                        url = "/dev/init" + payload;
                        return [4, this.axios.post(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.data.Result) {
                            throw new Error('Init device request failed');
                        }
                        return [3, 3];
                    case 2:
                        err_11 = _a.sent();
                        throw err_11;
                    case 3: return [2];
                }
            });
        });
    };
    return EasyLink;
}());
exports.EasyLink = EasyLink;
//# sourceMappingURL=EasyLink.js.map