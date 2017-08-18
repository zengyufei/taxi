const temp = require('cooldb')
const _ = require('lodash')
const R = require('ramda')

const coolDB = temp()

const privateDb = {
  queryByNamespaces(namespaces) {
    const result = coolDB.first({ key: 'namespaces', value: namespaces })
    if (result && result.item) {
      const data = result.item.data
      if (data) { return data }
    }
    return undefined
  },

  insert(namespaces, params) {
    coolDB.add({
      item: {
        namespaces,
        data: Array.isArray(params) ? params : [params],
      },
    })
  },

  update(namespaces, data) {
    coolDB.update({
      key: 'namespaces',
      value: namespaces,
      item: {
        namespaces,
        data,
      },
    })
  },

  del(key, value, data) {
    let hasBrownHair = R.propEq(key, value)
    const index = R.findIndex(hasBrownHair)(data)
    const removeAfterData = R.remove(index, 1, data)
    return removeAfterData
  },

  converNumber(value) {
    if (/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/.test(value)) {
      return value
    } else if (/^(\-|\+)?\d+(\.\d+)?$/.test(value)) {
      return +value
    } else if (/^\+?[1-9][0-9]*$/.test(value)) {
      return +value
    } else if (/^true|false$/.test(value)) {
      if (/^true$/.test(value)) {
        return true
      }
      return false
    }
    return value
  },
}

const mockUtils = {

  /**
   * 拷贝
   */
  clone(old) {
    return Array.isArray(old) ? _.cloneDeep(old) : new Error('数据不是数组')
  },

  /**
   * 比对
   */
  eq(source, target) {
    return R.equals(source, target)
  },

  /**
   * 查询单个
   */
  queryById(namespaces, key, value) {
    if (namespaces && key && value) {
      const data = privateDb.queryByNamespaces(namespaces)
      if (data) {
        const queryResult = R.filter(R.propEq(key, privateDb.converNumber(value)), data)
        return queryResult.length === 1 ? queryResult[0] : new Error('进行单个查询，结果查询出多个，请检查数据')
      }
      return []
    }
    return new Error('请输入正确的参数')
  },

  /**
   * 查询多个
   */
  queryByIds(namespaces, key, ids) {
    if (namespaces && key && ids) {
      const data = privateDb.queryByNamespaces(namespaces)
      if (data) {
        let findIds = []
        if (typeof ids === 'string') {
          findIds = ids.split(',').map(e => privateDb.converNumber(e))
        } else if (typeof ids === 'object') {
          findIds = ids.map(e => privateDb.converNumber(e))
        }
        const queryResult = R.innerJoin(
          (record, findId) => record[key] === findId,
          data,
          findIds
        )
        return queryResult
      }
      return []
    }
    return new Error('请输入正确的参数')
  },

  /**
   * 查询列表
   */
  queryList(namespaces, key, value) {
    if (namespaces) {
      const data = privateDb.queryByNamespaces(namespaces)
      if (data) {
        if (key && value) {
          return R.filter(R.propEq(key, value), data)
        }
        return data
      }
      return []
    }
    return new Error('请输入正确的参数')
  },

  /**
   * 查询分页
   */
  queryPage(namespaces, pageNo, pageSize, queryPageOption, urlParam) {
    if (namespaces) {
      const data = privateDb.queryByNamespaces(namespaces)
      if (data) {
        let len = data.length
        const queryParam = R.pick(queryPageOption, urlParam)
        if (queryParam) {
          let queryData = data
          R.keys(queryParam).forEach(keyName => {
            const value = R.trim(queryParam[keyName])
            if (value) {
              queryData = R.filter(R.propEq(keyName, privateDb.converNumber(value)), queryData)
              len = queryData.length
            }
          })
          const dataList = R.slice((pageNo - 1) * pageSize, pageNo * pageSize, queryData)
          return { pageNo, pageSize, dataList, totalCount: len }
        }
        const dataList = R.slice((pageNo - 1) * pageSize, pageNo * pageSize, data)
        return { pageNo, pageSize, dataList, totalCount: len }
      }
    }
    return new Error('请输入正确的参数')
  },

  /**
   * 只新增一次
   */
  init(namespaces, ...params) {
    const data = privateDb.queryByNamespaces(namespaces)
    if (!data) {
      if (params && Array.isArray(params) && params[0]) {
        if (Array.isArray(params[0])) { params = params[0] }
      }
      privateDb.insert(namespaces, params)
    }
  },

  /**
   * 刷新数据
   */
  reload(namespaces, ...params) {
    if (params && Array.isArray(params) && params[0]) {
      if (Array.isArray(params[0])) { params = params[0] }
    }

    const data = privateDb.queryByNamespaces(namespaces)
    if (data) {
      privateDb.update(namespaces, params)
    } else {
      privateDb.insert(namespaces, params)
    }
  },

  /**
   * 新增
   */
  add(namespaces, ...params) {
    if (params && Array.isArray(params) && params[0]) {
      if (Array.isArray(params[0])) { params = params[0] }
    }

    const data = privateDb.queryByNamespaces(namespaces)
    if (data) {
      const newData = R.concat(data, params)
      privateDb.update(namespaces, newData)
    } else {
      privateDb.insert(namespaces, params)
    }
  },

  /**
   * 修改
   */
  update(namespaces, key, value, params) {
    const data = privateDb.queryByNamespaces(namespaces)
    if (data) {
      let hasBrownHair = R.propEq(key, privateDb.converNumber(value))
      const oldData = R.find(hasBrownHair, data)
      const afterData = _.assign(oldData, params)
      const newData = R.update(R.findIndex(hasBrownHair)(data), afterData, data)
      privateDb.update(namespaces, newData)
    }
  },

  /**
   * 删除
   */
  del(namespaces, key, value) {
    const data = privateDb.queryByNamespaces(namespaces)
    if (data) {
      const newData = privateDb.del(key, privateDb.converNumber(value), data)
      privateDb.update(namespaces, newData)
    }
  },


}

module.exports = mockUtils
