
#  easylink-js
JavaScript library for communicating with Fingerspot EasyLink SDK.  

#  Installation
Install it with your preferred package manager:

`npm i easylink-js`

`yarn add easylink-js`

# Usage

Initialize the class:
```js
const easyLink = new EasyLink({
  host: 'http://localhost:7005',
  serialNumber: '123456789'
});
```
## Methods
Get Device Info:
```js
const deviceInfo = await easyLink.getDeviceInfo();
```
Init Device:
```js
await easyLink.init();
```
Sync Date/Time:
```js
await easyLink.syncDateTime();
```
Delete Device Logs:
```js
await easyLink.deleteDeviceLogs();
```
Get All Users:
```js
await easyLink.getAllUsers();
```
Upload a User:
```js
const payload  =  {
  pin: '123456',
  nama: 'Adhyaksa Jaya',
  pwd: 0,
  rfid: 0,
  priv: 0,
  tmp: [
    {
      idx: '0',
      alg_ver:39,
      template: '1E:14:0B:17:13:12 ...'
    }
  ]
};

await easyLink.uploadUser(payload);
```
Delete All Users:
```js
await easyLink.deleteAllUsers();
```
Delete a User:
```js
const pin = '123456';
await easyLink.deleteUser(pin);
```
Get All Scan Logs:
```js
await easyLink.getAllScanLogs();
```
Get New Scan Logs:
```js
await easyLink.getNewScanLogs();
```
Delete All Scan Logs:
```js
await easyLink.deleteAllScanLogs();
```