const qs = require('qs')
const { mock } = require('mockjs')
const R = require('ramda')
const _ = require('lodash')
const { jsonUtils, mockUtils: { init, add, update, del, queryById, reload, queryList } } = require('../utils/index.jsx')
const { resourceContant } = require('../constant/index.jsx')

const { permissions, firstResources, secondResources, threeResources } = resourceContant
const map = jsonUtils.objToStrMap(permissions)
const resNames = Object.keys(permissions)

const finalResources = _.assign(firstResources, secondResources, threeResources)

const prefix = 'sysResource'
const timeOut = 1000

const queryAllUrl = `GET /${prefix}/queryAll.htm`
const queryByIdUrl = `GET /${prefix}/queryById.htm`
const insertUrl = `POST /${prefix}/insert.htm`
const deleteByIdUrl = `GET /${prefix}/deleteById.htm`
const updateUrl = `POST /${prefix}/update.htm`
const updateNotNullUrl = `POST /${prefix}/updateNotNull.htm`
const reloadUrl = `GET /${prefix}/reload.htm`

const primaryKey = 'id'

const mockOption = {
  [`result|${map.size}`]: [{
    'id|+1': 1,
    'parentId|1-100': 1,
    'resName|+1': resNames,
    hierarchy() {
      return firstResources[this.resName] ? 'one' : secondResources[this.resName] ? 'two' : 'three'
    },
    resNo() {
      return finalResources[this.resName]
    },
    parentResNo() {
      const resName = finalResources[this.resName]
      return resName ? resName.substring(0, resName.lastIndexOf('-')) : '-1'
    },
    permission() {
      return map.get(this.resName)
    },

    createTime: '@datetime',
    updateTime: '@datetime',
  }],
}


// 数据持久
init(prefix, mock(mockOption).result)
// role 调用
function reloadData() {
  init(prefix, mock(mockOption).result)
}

module.exports = {

  reloadData, // role 调用

  /**
   * 查询所有
   */
  [queryAllUrl]: (req, res) => {
    const list = queryList(prefix)
    setTimeout(() => {
      res.json({
        result: list,
      })
    }, timeOut)
  },


  /**
   * 查询单个
   */
  [queryByIdUrl]: (req, res) => {
    const urlParam = qs.parse(req.query)
    const primarykeyValue = urlParam[primaryKey]
    const single = queryById(prefix, primaryKey, primarykeyValue)
    const isQuery = !!single

    res.json({
      code: isQuery ? 200 : 400,
      msg: isQuery ? '查询成功' : '用户不存在',
      result: single,
    })
  },


  /**
   * 新增
   */
  [insertUrl]: (req, res) => {
    let body = qs.parse(req.body)
    const list = queryList(prefix)
    body.id = list.length + 1

    /* const dataList = queryList(prefix, 'parentResNo', body.parentResNo)
    const dataLen = (dataList && dataList.length) || 0
    const resNo = dataLen > 100 ? dataLen : dataLen > 10 ? `0${dataLen}` : `00${dataLen}`
    if (body.parentResNo) {
      body.resNo = `${body.parentResNo}-${resNo}`
      const len = body.parentResNo.split('-').length
      switch (len) {
        case 1:
          body.hierarchy = 2
          break
        default:
          body.hierarchy = 3
          break
      }
    } else {
      const len = firstResources.length + 1
      body.resNo = len > 100 ? `${len}` : len > 10 ? `0${len}` : `00${len}`
      body.parentResNo = ''
      body.hierarchy = 1
    }
    body.parentResNo || (body.parentResNo = '') */
    add(prefix, body)
    setTimeout(() => {
      res.json({
        code: 200,
        msg: '新增成功',
      })
    }, timeOut)
  },

  /**
   * 删除
   */
  [deleteByIdUrl]: (req, res) => {
    const { id } = qs.parse(req.query)
    del(prefix, primaryKey, id)
    res.json({
      code: 200,
      msg: '删除成功',
    })
  },

  /**
   * 修改
   */
  [updateUrl] (req, res) {
    const body = qs.parse(req.body)
    update(prefix, primaryKey, body[primaryKey], body)
    setTimeout(() => {
      res.json({
        code: 200,
        msg: '修改成功',
      })
    }, timeOut)
  },

  /**
   * 修改不为空的字段
   */
  [updateNotNullUrl] (req, res) {
    const body = qs.parse(req.body)
    update(prefix, primaryKey, body[primaryKey], body)
    res.json({
      code: 200,
      msg: '修改成功',
    })
  },


  /**
   * 重新造数据
   */
  [reloadUrl]: (req, res) => {
    reload(prefix, mock(mockOption).result)
    res.json({
      code: 200,
      msg: '重刷数据完毕',
    })
  },
}
