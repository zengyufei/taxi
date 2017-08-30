const qs = require('qs')
const sysResource = require('../before/sysResource')
const { mock } = require('mockjs')
const R = require('ramda')
const _ = require('lodash')
const { randomUtils, mockUtils: { init, add, update, del, queryById, queryByIds, reload, queryList, queryPage } } = require('../utils/index.jsx')
const { roles, orgContant: { firstOrgs, secondOrgs, threeOrgs } } = require('../constant/index.jsx')

const orgNos = _.assign(R.values(firstOrgs), R.values(secondOrgs), R.values(threeOrgs))

const prefix = 'sysRole'
const queryPageOption = ['orgNo', 'roleName', 'sysmemberId', 'relyRoleId', 'createTime']
const timeOut = 1000

const queryAllUrl = `GET /${prefix}/queryAll.htm`
const queryPageUrl = `GET /${prefix}/queryPage.htm`
const queryByIdUrl = `GET /${prefix}/queryById.htm`
const queryByIdsUrl = `GET /${prefix}/queryByIds.htm`
const insertUrl = `POST /${prefix}/insert.htm`
const deleteByIdUrl = `GET /${prefix}/deleteById.htm`
const updateUrl = `POST /${prefix}/update.htm`
const updateNotNullUrl = `POST /${prefix}/updateNotNull.htm`
const reloadUrl = `GET /${prefix}/reload.htm`

const primaryKey = 'id'
const defaultPageNo = 1
const defaultPageSize = 10

sysResource.reloadData()

const sysResources = queryList('sysResource')
// 共有多少权限
const resLen = sysResources.length
// 根据角色数位，需要几套权限标识组合
const roleResourceIds = []
const roleLen = roles.length
for (let r = 0; r < roleLen; r++) {
  // 每次用完重置
  let tempResourceIds = ''
  // 获取随机数，决定组合几个权限
  const buildNumber = randomUtils.get(0, 5)
  for (let i = 0; i < buildNumber; i++) {
    // 获取随机数，决定哪个权限
    const index = randomUtils.get(0, resLen - 1)
    tempResourceIds += `${sysResources[index].id},`
  }
  if (r === 0) {
    roleResourceIds[r] = sysResources.map(item => {
      return item.id
    }).join(',')
  } else {
    roleResourceIds[r] = tempResourceIds
  }
}


const roleAndResourceIds = []
for (let j = 0; j < roleLen; j++) {
  roleAndResourceIds[roles[j]] = roleResourceIds[j]
}

const mockOption = {
  [`result|${roleLen}`]: [{
    'id|+1': 1,
    'roleName|+1': roles,
    resourceList() {
      return roleAndResourceIds[this.roleName]
    },
    'orgNo|1': orgNos,
    description: '@word(6,25)',
    'sysmemberId|1-100': 1,
    'relyRoleId|+1': 1,
    createTime: '@datetime',
    updateTime: '@datetime',
  }],
}

// 数据持久
init(prefix, mock(mockOption).result)

module.exports = {
  /**
   * 查询所有
   */
  [queryAllUrl]: (req, res) => {
    const list = queryList(prefix)
    res.json({
      result: list,
    })
  },

  /**
   * 查询
   */
  [queryPageUrl]: (req, res) => {
    const urlParam = qs.parse(req.query)
    const { pageNo = defaultPageNo, pageSize = defaultPageSize } = urlParam
    const pageList = queryPage(prefix, +pageNo, +pageSize, queryPageOption, urlParam)
    setTimeout(() => {
      res.json({
        result: pageList,
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
   * 查询多个
   */
  [queryByIdsUrl]: (req, res) => {
    const urlParam = qs.parse(req.query)
    const primarykeyValue = urlParam.ids
    const many = queryByIds(prefix, primaryKey, primarykeyValue)
    const isQuery = !!many

    res.json({
      code: isQuery ? 200 : 400,
      msg: isQuery ? '查询成功' : '用户不存在',
      result: many,
    })
  },


  /**
   * 新增
   */
  [insertUrl]: (req, res) => {
    let body = qs.parse(req.body)
    const list = queryList(prefix)
    body.sysmemberId = 1
    body.relyRoleId = 1
    body.createTime = '2017-08-16 08:00:01'
    body.updateTime = '2017-08-16 08:00:01'
    body.id = list.length + 1
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
