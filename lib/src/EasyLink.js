"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class EasyLink {
    /**
     * Fcking constructor.
     *
     * @param param0
     */
    constructor({ host, serialNumber }) {
        this.host = host;
        this.serialNumber = serialNumber;
        this.axios = axios_1.default.create({
            baseURL: host,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    }
    /**
     * Generate payload string from object.
     *
     * @param payload - Payload object
     */
    generatePayload(payload) {
        const payloadKeys = Object.keys(payload);
        let payloadString = '?';
        payloadKeys.forEach((item, index) => {
            if (typeof payload[item] === 'object' || Array.isArray(payload[item])) {
                payloadString += `${item}=${JSON.stringify(payload[item])}`;
            }
            else {
                payloadString += `${item}=${payload[item]}`;
            }
            if (index < payloadKeys.length - 1)
                payloadString += '&';
        });
        return payloadString;
    }
    /**
     * Get device info.
     */
    getDeviceInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber });
                const url = `/dev/info${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result) {
                    throw new Error('Get device info request failed');
                }
                return res.data.DEVINFO;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Get all users.
     */
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber });
                const url = `/user/all${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result && typeof res.data.message !== 'string') {
                    throw new Error('Get all users request failed');
                }
                return Array.isArray(res.data.Data) ? res.data.Data : [];
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Upload a user to the device.
     *
     * @param data - User data
     */
    uploadUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload(Object.assign({ sn: this.serialNumber }, data));
                const url = `/user/set${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result) {
                    throw new Error('Upload user request failed');
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Delete all users on the device.
     */
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber });
                const url = `/user/delall${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result) {
                    throw new Error('Delete all users request failed');
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Delete a user.
     *
     * @param pin - User PIN
     */
    deleteUser(pin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber, pin });
                const url = `/user/del${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result) {
                    throw new Error('Delete a user request failed');
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Get all scan logs.
     */
    getAllScanLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber });
                const url = `/scanlog/all${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result && typeof res.data.message !== 'string') {
                    throw new Error('Get all scanlogs request failed');
                }
                return Array.isArray(res.data.Data) ? res.data.Data : [];
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Get new scan logs.
     */
    getNewScanLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber });
                const url = `/scanlog/new${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result && typeof res.data.message !== 'string') {
                    throw new Error('Get all scanlogs request failed');
                }
                return Array.isArray(res.data.Data) ? res.data.Data : [];
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Delete all scan logs.
     */
    deleteAllScanLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber });
                const url = `/scanlog/del${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result) {
                    throw new Error('Delete all scan logs request failed');
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Sync date/time.
     */
    syncDateTime() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber });
                const url = `/dev/settime${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result) {
                    throw new Error('Date/time sync request failed');
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Delete device logs.
     */
    deleteDeviceLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber });
                const url = `/log/del${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result) {
                    throw new Error('Delete device logs request failed');
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Initialize the device.
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = this.generatePayload({ sn: this.serialNumber });
                const url = `/dev/init${payload}`;
                const res = yield this.axios.post(url);
                if (!res.data.Result) {
                    throw new Error('Init device request failed');
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.EasyLink = EasyLink;
//# sourceMappingURL=EasyLink.js.map