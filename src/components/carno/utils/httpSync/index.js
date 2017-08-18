const syncRequest = require('sync-request')
const qs = require('qs')

const { setHeader } = require('../http')


module.exports = {
  syncGet(url, params) {
    const res = syncRequest('GET', `${url}?${qs.stringify(params)}`, {
      headers: setHeader({}),
    })
    if (res.statusCode === 200) {
      return JSON.parse(res.getBody())
    }
    return res.getBody()
  },
  syncPost(url, params) {
    const res = syncRequest('POST', url, {
      json: params,
      headers: setHeader({}),
    })
    if (res.statusCode === 200) {
      return JSON.parse(res.getBody('utf8'))
    }
    return res.getBody('utf8')
  },
}
