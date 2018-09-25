import { AxiosInstance } from 'axios';
import { InitialData, UserData } from './interfaces';
declare class EasyLink {
    /**
     * Stores EasyLink SDK host address.
     */
    host: string;
    /**
     * Stores device's serial number.
     */
    serialNumber: string;
    /**
     * Stores the Axios instance.
     */
    axios: AxiosInstance;
    /**
     * Fcking constructor.
     *
     * @param param0
     */
    constructor({host, serialNumber}: InitialData);
    /**
     * Generate payload string from object.
     *
     * @param payload - Payload object
     */
    generatePayload(payload: any): string;
    /**
     * Get device info.
     */
    getDeviceInfo(): Promise<any>;
    /**
     * Get all users.
     */
    getAllUsers(): Promise<any>;
    /**
     * Upload a user to the device.
     *
     * @param data - User data
     */
    uploadUser(data: UserData): Promise<void>;
    /**
     * Delete all users on the device.
     */
    deleteAllUsers(): Promise<void>;
    /**
     * Delete a user.
     *
     * @param pin - User PIN
     */
    deleteUser(pin: string): Promise<void>;
    /**
     * Get all scan logs.
     */
    getAllScanLogs(): Promise<any>;
    /**
     * Get new scan logs.
     */
    getNewScanLogs(): Promise<any>;
    /**
     * Delete all scan logs.
     */
    deleteAllScanLogs(): Promise<void>;
    /**
     * Sync date/time.
     */
    syncDateTime(): Promise<void>;
    /**
     * Delete device logs.
     */
    deleteDeviceLogs(): Promise<void>;
    /**
     * Initialize the device.
     */
    init(): Promise<void>;
}
export { EasyLink };
