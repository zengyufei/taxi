const _ = require('lodash')
/*
 *  本地存储封装，项目中其他地方不要直接使用localStorage和sessionStorage，统一使用封装。
 *  简化接口，字符串json转换。
 *  页签级别，新开页签和关闭游览器自动清空
 * */
const SALT = 'taxt_'

export default {
  get(key) {
    let strValue = sessionStorage.getItem(SALT + key)
    return JSON.parse(strValue)
  },
  set(key, jsonValue) {
    let strValue = JSON.stringify(jsonValue)
    sessionStorage.setItem(SALT + key, strValue)
  },

  setIds(key, array, filterKey) {
    array.forEach(e => {
      let strValue = JSON.stringify(e)
      sessionStorage.setItem(`${SALT}_${key}_${e[filterKey]}`, strValue)
    })
  },

  getIds(key, id) {
    let strValue = sessionStorage.getItem(`${SALT}_${key}_${id}`)
    return JSON.parse(strValue)
  },

  existsIds(key, array) {
    if (!array) return false
    let exists = true
    array.forEach(e => {
      if (!sessionStorage.getItem(`${SALT}_${key}_${e}`)) { exists = false }
    })
    return exists
  },

  remove(key) {
    sessionStorage.removeItem(SALT + key)
  },
  removeAll() {
    sessionStorage.clear()
  },
}
