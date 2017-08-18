/*
 *  本地存储封装，项目中其他地方不要直接使用localStorage和sessionStorage，统一使用封装。
 *  简化接口，字符串json转换。
 *  就算游览器关闭，依然存在
 * */
const SALT = 'taxt_'

export default {
  /*
  * 就算游览器关闭，依然存在
  */
  get(key) {
    let data = JSON.parse(localStorage.getItem(SALT + key.toString()))
    if (data !== null) {
      if (data.expires_at) {
        if (data.expires_at < new Date().getTime()) {
          localStorage.removeItem(SALT + key.toString())
          return null
        }
        return data.value
      }
      return data
    }
    return null
  },
  set(key, jsonValue, ttlSecond) {
    let strValue
    if (typeof ttlSecond === 'number') {
      let data = { value: jsonValue, expires_at: new Date().getTime() + (ttlSecond * 1000) }
      strValue = JSON.stringify(data)
    } else {
      strValue = JSON.stringify(jsonValue)
    }
    localStorage.setItem(SALT + key.toString(), strValue)
  },

  remove(key) {
    localStorage.removeItem(SALT + key)
  },
  removeAll() {
    localStorage.clear()
  },
}
