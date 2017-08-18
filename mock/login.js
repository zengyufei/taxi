const R = require('ramda')

/**
 * 用户登录接口
 */
const qs = require('qs')

const admin = { account: 'admin', password: 'admin' }
const test = { account: 'test', password: 'test' }

const adminMember = { account: 'admin', realName: '管理员', roleId: 1 }
const testMember = { account: 'test', realName: '测试', roleId: 2 }

const adminRole = {
  description: '系统管理员',
  id: 1,
  roleName: '管理员',
  parentId: 0,
  resourceList: R.range(1, 100).join(','),
}
const testRole = { description: '下属管理员', id: 2, roleName: '二级管理员', parentId: 1, resourceList: R.range(1, 4).join(',') }

/**
 * 判断是否是 admin
 */
function checkAdmin(account, password) {
  return R.equals(admin, { account, password })
}

/**
 * 判断是否是 test
 */
function checkTest(account, password) {
  return R.equals(test, { account, password })
}

const adminMsg = { code: 200, msg: '登录成功', result: 'io4gF054lvFwswe234fHg' }
const testMsg = { code: 200, msg: '登录成功', result: 't48jk234k90dF3w1' }


module.exports = {

  /**
   * 登录
   */
  'POST /login.htm': function(req, res) {
    const item = qs.parse(req.body)
    console.log('', item)
    const result = checkAdmin(item.account, item.password)
    if (result) {
      res.json(adminMsg)
    } else if (checkTest(item.account, item.password)) {
      res.json(testMsg)
    } else {
      res.json({ code: 400, msg: '登录失败' })
    }
  },

  /**
   * 获取当前登录用户信息
   */
  'GET /sysMember/getMember.htm': (req, res) => {
    const token = req.headers.token

    let result
    if (adminMsg.token === token) {
      result = adminMember
    } else if (testMsg.token === token) {
      result = testMember
    } else {
      setTimeout(() => {
        res.json({
          code: 400,
          msg: '查询失败, token 过时',
        })
      }, 50)
      return
    }

    setTimeout(() => {
      res.json({
        code: 200,
        msg: '查询成功',
        result,
      })
    }, 50)
  },

  /**
   * 获取当前登录用户角色信息
   */
  'GET /sysRole/getRole.htm': (req, res) => {
    const token = req.headers.token

    let result
    if (adminMsg.result === token) {
      result = adminRole
    } else if (testMsg.result === token) {
      result = testRole
    } else {
      setTimeout(() => {
        res.json({
          code: 400,
          msg: '查询失败, token 过时',
        })
      }, 50)
      return
    }

    setTimeout(() => {
      res.json({
        code: 200,
        msg: '查询成功',
        result,
      })
    }, 50)
  },

  /**
   * 获取当前登录用户资源信息
   */
  'GET /sysResource/getResource.htm': (req, res) => {
    const token = req.headers.token

    let result
    if (adminMsg.result === token) {
      result = 'rbac:*,rbac:sysOrg:*,rbac:sysMember:*,rbac:sysMember:add,rbac:sysRole:*, rbac:sysResource:*, car:*,car:car:*,car:car:add,car:annualVerification:*,car:annualVerification:add,car:maintain:*,car:insurance:*,car:carOperateLog:*' +
        ',driver:*,driver:driver:*,driver:archives:*,driver:common:*,driver:govt:*,driver:media:*,driver:complain:*,driver:punish:*,driver:violation:*,driver:accident:*' +
        ',finance:*,finance:monthQuota:*,finance:nonBusinessIncome:*,finance:reserveMoney:*,finance:securityDeposit:*'
    } else if (testMsg.result === token) {
      result = 'rbac:*,rbac:sysMember:*,rbac:sysMember:add'
    } else {
      setTimeout(() => {
        res.json({
          code: 400,
          msg: '查询失败, token 过时',
        })
      }, 50)
      return
    }

    setTimeout(() => {
      res.json({
        code: 200,
        msg: '查询成功',
        result,
      })
    }, 50)
  },

  /**
   * 403
   */
  'GET /403.htm': (req, res) => {
    res.status(403).end()
  },

  /**
   * 404
   */
  'GET /404.htm': (req, res) => {
    res.status(404).end()
  },

  /**
   * 500
   */
  'GET /500.htm': (req, res) => {
    res.status(500).end()
  },
}
