const qs = require('qs')
const { mock } = require('mockjs')
const R = require('ramda')
const { mockUtils: { init, add, update, del, queryById, queryPage, reload, queryList } } = require('../utils/index.jsx')
const { areaContant: { areas }, orgContant: { firstOrgs, secondOrgs, threeOrgs } } = require('../constant/index.jsx')

const newData = R.partition(e => e.parentCode === 0, areas)
const provinceDatas = newData[0]
const cityDatas = newData[1]
const provinces = R.pluck('code')(provinceDatas)
const citys = R.pluck('code')(cityDatas)

const prefix = 'sysOrg'
const queryPageOption = ['orgNo', 'parentOrgNo', 'orgName', 'available', 'province', 'city', 'address']
const timeOut = 1000

const queryAllUrl = `GET /${prefix}/queryAll.htm`
const queryPageUrl = `GET /${prefix}/queryPage.htm`
const queryByIdUrl = `GET /${prefix}/queryById.htm`
const insertUrl = `POST /${prefix}/insert.htm`
const deleteByIdUrl = `GET /${prefix}/deleteById.htm`
const updateUrl = `POST /${prefix}/update.htm`
const updateNotNullUrl = `POST /${prefix}/updateNotNull.htm`
const reloadUrl = `GET /${prefix}/reload.htm`

const primaryKey = 'id'
const defaultPageNo = 1
const defaultPageSize = 10

const firstOrgNameKeys = Object.keys(firstOrgs)
const secondOrgNameKeys = Object.keys(secondOrgs)
const threeOrgNameKeys = Object.keys(threeOrgs)

const orgNameKeys = [...firstOrgNameKeys, ...secondOrgNameKeys, ...threeOrgNameKeys]

const values = new Map()
Object.keys(firstOrgs).forEach(key => {
  values.set(key, firstOrgs[key])
})
Object.keys(secondOrgs).forEach(key => {
  values.set(key, secondOrgs[key])
})
Object.keys(threeOrgs).forEach(key => {
  values.set(key, threeOrgs[key])
})

const mockOption = {
  'result|301': [{
    'id|+1': 1,
    'orgName|+1': orgNameKeys,
    orgNo() {
      return values.get(this.orgName)
    },
    parentOrgNo() {
      const orgName = values.get(this.orgName)
      const lastIndexOf = orgName.lastIndexOf('-')
      return orgName.lastIndexOf('-', lastIndexOf - 1) > -1 ? orgName.substring(0, lastIndexOf) : ''
    },
    'priority|1-100': 1,
    'available|1-2': true,
    description: '@cparagraph(1, 2)',
    provinceName: '@province',
    cityName: '@city',
    'province|1': provinces,
    'city|1': citys,
    address: '@county(true)',
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
   * 新增
   */
  [insertUrl]: (req, res) => {
    let body = qs.parse(req.body)
    const list = queryList(prefix)
    body.id = list.length + 1
    body.orgNo = `${list.length + 1}`
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
