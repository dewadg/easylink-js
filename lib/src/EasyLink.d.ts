import { AxiosInstance } from 'axios';
import { InitialData, UserData } from './interfaces';
declare class EasyLink {
    host: string;
    serialNumber: string;
    axios: AxiosInstance;
    constructor({host, serialNumber}: InitialData);
    generatePayload(payload: any): string;
    getDeviceInfo(): Promise<any>;
    getAllUsers(): Promise<any>;
    uploadUser(data: UserData): Promise<void>;
    deleteAllUsers(): Promise<void>;
    deleteUser(pin: string): Promise<void>;
    getAllScanLogs(): Promise<any>;
    getNewScanLogs(): Promise<any>;
    deleteAllScanLogs(): Promise<void>;
    syncDateTime(): Promise<void>;
    deleteDeviceLogs(): Promise<void>;
    init(): Promise<void>;
}
export { EasyLink };
