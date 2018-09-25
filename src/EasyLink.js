import axios from 'axios'

class EasyLink {
  /**
   * Fcking constructor.
   *
   * @param {string} host
   * @param {string} serialNumber
   */
  constructor ({ host, serialNumber }) {
    this.host = host
    this.serialNumber = serialNumber
    this.axios = axios.create({
      baseURL: host,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  /**
   * Generate payload string.
   *
   * @param {object} payload
   */
  generatePayload (payload) {
    const payloadKeys = Object.keys(payload)
    let payloadString = '?'

    payloadKeys.forEach((item, index) => {
      if (typeof payload[item] === 'object' || Array.isArray(payload[item])) {
        payloadString += `${item}=${JSON.stringify(payload[item])}`
      } else {
        payloadString += `${item}=${payload[item]}`
      }

      if (index < payloadKeys.length - 1) payloadString += '&'
    })

    return payloadString
  }

  /**
   * Get device info.
   *
   * @return {object}
   */
  async getDeviceInfo () {
    try {
      const payload = this.generatePayload({ sn: this.serialNumber })
      const url = `/dev/info${payload}`
      const res = await this.axios.post(url)

      if (!res.data.Result) {
        throw new Error('Get device info request failed')
      }

      return res.data.DEVINFO
    } catch (err) {
      throw err
    }
  }

  /**
   * Get all users.
   *
   * @return {array}
   */
  async getAllUsers () {
    try {
      const payload = this.generatePayload({ sn: this.serialNumber })
      const url = `/user/all${payload}`
      const res = await this.axios.post(url)

      if (!res.Result && typeof res.data.message !== 'string') {
        throw new Error('Get all users request failed')
      }

      return Array.isArray(res.data.Data) ? res.data.Data : []
    } catch (err) {
      throw err
    }
  }

  /**
   * Upload a user.
   *
   * @param {object} data
   */
  async uploadUser (data) {
    try {
      const payload = this.generatePayload({
        sn: this.serialNumber,
        ...data
      })
      const url = `/user/set${payload}`
      const res = await this.axios.post(url)

      if (!res.data.Result) {
        throw new Error('Upload user request failed')
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete all users.
   */
  async deleteAllUsers () {
    try {
      const payload = this.generatePayload({ sn: this.serialNumber })
      const url = `/user/delall${payload}`
      const res = await this.axios.post(url)

      if (!res.data.Result) {
        throw new Error('Delete all users request failed')
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete user by PIN.
   * 
   * @param {string} pin
   */
  async deleteUser (pin) {
    try {
      const payload = this.generatePayload({
        sn: this.serialNumber,
        pin
      })
      const url = `/user/del${payload}`
      const res = await this.axios.post(url)

      if (!res.data.Result) {
        throw new Error('Delete a user request failed')
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Get all scan logs.
   *
   * @return {array}
   */
  async getAllScanLogs () {
    try {
      const payload = this.generatePayload({ sn: this.serialNumber })
      const url = `/scanlog/all${payload}`
      const res = await this.axios.post(url)

      if (!res.Result && typeof res.data.message !== 'string') {
        throw new Error('Get all scanlogs request failed')
      }

      return Array.isArray(res.data.Data) ? res.data.Data : []
    } catch (err) {
      throw err
    }
  }

  /**
   * Get new scan logs.
   *
   * @return {array}
   */
  async getNewScanLogs() {
    try {
      const payload = this.generatePayload({ sn: this.serialNumber })
      const url = `/scanlog/new${payload}`
      const res = await this.axios.post(url)

      if (!res.Result && typeof res.data.message !== 'string') {
        throw new Error('Get all scanlogs request failed')
      }

      return Array.isArray(res.data.Data) ? res.data.Data : []
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete all scan logs.
   */
  async deleteAllScanLogs () {
    try {
      const payload = this.generatePayload({ sn: this.serialNumber })
      const url = `/scanlog/del${payload}`
      const res = await this.axios.post(url)

      if (!res.data.Result) {
        throw new Error('Delete all scan logs request failed')
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Sync date time.
   */
  async syncDateTime () {
    try {
      const payload = this.generatePayload({ sn: this.serialNumber })
      const url = `/dev/settime${payload}`
      const res = await this.axios.post(url)

      if (!res.data.Result) {
        throw new Error('Date/time sync request failed')
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete device logs.
   */
  async deleteDeviceLogs () {
    try {
      const payload = this.generatePayload({ sn: this.serialNumber })
      const url = `/log/del${payload}`
      const res = await this.axios.post(url)

      if (!res.data.Result) {
        throw new Error('Delete device logs request failed')
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Initialize the device.
   */
  async init () {
    try {
      const payload = this.generatePayload({ sn: this.serialNumber })
      const url = `/dev/init${payload}`
      const res = await this.axios.post(url)

      if (!res.data.Result) {
        throw new Error('Init device request failed')
      }
    } catch (err) {
      throw err
    }
  }
}

export default EasyLink
