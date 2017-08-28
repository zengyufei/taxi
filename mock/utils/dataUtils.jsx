const mockjs = require('mockjs')

const dataUtils = {
  /**
   * 拷贝数据成一个新数组
   * @param old: Array 数据集合
   */
  copyToNew(old) {
    return Array.isArray(old) ? old.concat() : new Error('数据不是数组')
  },

  /**
   * 获取分页
   * @param result: Array 数据集合
   * @param pageNo: int 当前第几页
   * @param pageSize: int 每页显示数
   */
  getDefaultPage(result, pageNo, pageSize) {
    if (Array.isArray(result)) {
      if (!result) {
        return {
          pageNo,
          pageSize,
          totalCount: 0,
          dataList: [],
        }
      }
      const list = result.slice((pageNo - 1) * pageSize, pageNo * pageSize)
      return {
        pageNo,
        pageSize,
        totalCount: result.length,
        dataList: list,
      }
    }
    return new Error('数据不是数组')
  },

  /**
   * 条件查询
   * 多个条件输入多个
   * @param result: Array 数据集合
   * @param pageNo: int 当前第几页
   * @param pageSize: int 每页显示数
   * @param conditions: Object 查询字段和值，可空，本方法自带判断
   */
  getPage(result, pageNo, pageSize, conditions) {
    if (result instanceof Array) {
      const newData = conditions && dataUtils.copyToNew(result)
      let d = newData
      d && Object.keys(conditions).map(key => {
        const val = conditions[key]
        if (val) {
          if (Number.isInteger(val)) {
            d = val && d.filter(item => +item[key] === +val)
          } else {
            d = val && d.filter(item => item[key].indexOf(val) > -1)
          }
        }
      })
      return dataUtils.getDefaultPage(d, pageNo, pageSize)
    }
    return new Error('数据不是数组')
  },

  /**
   * 过滤，返回相同的值
   * @param result: Array 数据集合
   * @param conditions: Object 查询字段和值，可空，本方法自带判断
   * @return Array?? 返回可空集合
   */
  filter(result, conditions) {
    let newData = dataUtils.copyToNew(result)
    Object.keys(conditions).map(key => {
      const val = conditions[key]
      if (val) {
        if (Number.isInteger(val)) {
          newData = newData.filter(item => +item[key] === +val)
        } else {
          newData = newData.filter(item => item[key].indexOf(val) > -1)
        }
      } else {
        return newData
      }
    })
    return newData[0]
  },


  /**
   * 过滤，返回相同的值
   * @param result: Array 数据集合
   * @param conditions: Object 查询字段和值，可空，本方法自带判断
   * @return Array?? 返回可空集合
   */
  filterByIds(result, conditions) {
    const newData = dataUtils.copyToNew(result)
    const temp = []
    Object.keys(conditions).map(key => {
      const vals = conditions[key]
      if (vals) {
        const ids = vals.split(',')
        for (const index in newData) {
          const item = newData[index]
          const findId = ids.find(e => {
            return +e === +item.id
          })
          findId && temp.push(item)
        }
      } else {
        return newData
      }
    })
    return temp
  },


  /**
   * 删除
   * @param result: Array 数据集合
   * @param conditions: Object 查询字段和值，可空，本方法自带判断
   * @returns 原来的data 处理后
   */
  delete(result, conditions) {
    let newData = dataUtils.copyToNew(result)
    Object.keys(conditions).map(key => {
      const val = conditions[key]
      if (val) {
        if (Number.isInteger(val)) {
          newData = newData.filter(item => (+item[key] !== +val))
        } else {
          newData = newData.filter(item => item[key].indexOf(val) == -1)
        }
      } else {
        return newData
      }
    })
    return newData
  },

  /**
   * 新增方法
   * @param result: Array 数据集合
   * @param params: Object 新增的对象
   * @returns 新的 result
   */
  insert(result, params) {
    const newData = dataUtils.copyToNew(result)
    /**
     * 新增数据 id 号处理
     */
    params.id = newData.length + 101
    /**
     * 新增数据到最前面
     */
    newData.unshift(params)
    return newData
  },

  /**
   * 修改方法
   * @param result: Array 数据集合
   * @param params: Object 修改的对象
   * @returns 新的 result
   */
  update(result, params) {
    let newData = dataUtils.copyToNew(result)
    /**
     * 遍历返回，如果遍历到 id 相同，则替换返回
     */
    newData = newData.map(item => {
      if (+item.id === +params.id) {
        return params
      }
      return item
    })
    return newData
  },

  /**
   * 修改不为空方法
   * @param result: Array 数据集合
   * @param params: Object 修改的对象
   * @returns 新的 result
   */
  updateNotNull(result, params) {
    let newData = dataUtils.copyToNew(result)
    /**
     * 遍历返回，如果遍历到 id 相同，则替换返回
     */
    newData = newData.map(item => {
      if (+item.id === +params.id) {
        const keys = Object.keys(params)
        for (const index in keys) {
          const key = keys[index]
          const val = params[key]
          if (Number.isInteger(val)) {
            val === 0 ? (delete params[key]) : item[key] = val
          } else if (val !== null && val !== '') {
            item[key] = val
          } else {
            delete params[key]
          }
        }
        return item
      }
      return item
    })
    return newData
  },

  mock(option) {
    return mockjs.mock(option)
  },

}

module.exports = dataUtils
