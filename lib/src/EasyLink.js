"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class EasyLink {
    constructor({ host, serialNumber }) {
        this.host = host;
        this.serialNumber = serialNumber;
        this.axios = axios_1.default.create({
            baseURL: host,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    }
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
    async getDeviceInfo() {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber });
            const url = `/dev/info${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result) {
                throw new Error('Get device info request failed');
            }
            return res.data.DEVINFO;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllUsers() {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber });
            const url = `/user/all${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result && typeof res.data.message !== 'string') {
                throw new Error('Get all users request failed');
            }
            return Array.isArray(res.data.Data) ? res.data.Data : [];
        }
        catch (err) {
            throw err;
        }
    }
    async uploadUser(data) {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber, ...data });
            const url = `/user/set${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result) {
                throw new Error('Upload user request failed');
            }
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAllUsers() {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber });
            const url = `/user/delall${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result) {
                throw new Error('Delete all users request failed');
            }
        }
        catch (err) {
            throw err;
        }
    }
    async deleteUser(pin) {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber, pin });
            const url = `/user/del${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result) {
                throw new Error('Delete a user request failed');
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getAllScanLogs() {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber });
            const url = `/scanlog/all${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result && typeof res.data.message !== 'string') {
                throw new Error('Get all scanlogs request failed');
            }
            return Array.isArray(res.data.Data) ? res.data.Data : [];
        }
        catch (err) {
            throw err;
        }
    }
    async getNewScanLogs() {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber });
            const url = `/scanlog/new${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result && typeof res.data.message !== 'string') {
                throw new Error('Get all scanlogs request failed');
            }
            return Array.isArray(res.data.Data) ? res.data.Data : [];
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAllScanLogs() {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber });
            const url = `/scanlog/del${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result) {
                throw new Error('Delete all scan logs request failed');
            }
        }
        catch (err) {
            throw err;
        }
    }
    async syncDateTime() {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber });
            const url = `/dev/settime${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result) {
                throw new Error('Date/time sync request failed');
            }
        }
        catch (err) {
            throw err;
        }
    }
    async deleteDeviceLogs() {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber });
            const url = `/log/del${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result) {
                throw new Error('Delete device logs request failed');
            }
        }
        catch (err) {
            throw err;
        }
    }
    async init() {
        try {
            const payload = this.generatePayload({ sn: this.serialNumber });
            const url = `/dev/init${payload}`;
            const res = await this.axios.post(url);
            if (!res.data.Result) {
                throw new Error('Init device request failed');
            }
        }
        catch (err) {
            throw err;
        }
    }
}
exports.EasyLink = EasyLink;
//# sourceMappingURL=EasyLink.js.map