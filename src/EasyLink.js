const axios = require('axios')

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
      if (typeof payload[item] === 'object' || typeof payload[item] === 'array') {
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

      return typeof res.data.Data === 'array' ? res.data.Data : []
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
}

module.exports = EasyLink
