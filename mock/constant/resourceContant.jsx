const permissions = {
  系统管理: 'rbac:*',
  组织机构管理: 'rbac:sysOrg:*',
  用户管理: 'rbac:sysMember:*',
  新增用户: 'rbac:sysMember:add',
  角色管理: 'rbac:sysRole:*',
  资源管理: 'rbac:sysResource:*',

  车辆管理: 'car:*',
  车辆信息: 'car:car:*',
  新增车辆: 'car:car:add',
  修改车辆: 'car:car:update',
  车辆年审管理: 'car:annualVerification:*',
  新增车辆年审: 'car:annualVerification:add',
  车辆二级维护管理: 'car:maintain:*',
  车辆保险管理: 'car:insurance:*',
  车辆营运数据管理: 'car:carOperateLog:*',

  驾驶员管理: 'driver:*',
  基础信息: 'driver:driver:*',
  管理档案管理: 'driver:archives:*',
  交通事故管理: 'driver:common:*',
  政府表扬管理: 'driver:govt:*',
  媒体报道管理: 'driver:media:*',
  服务投诉管理: 'driver:complain:*',
  营运违章管理: 'driver:punish:*',
  交通违法记录管理: 'driver:violation:*',
  交通事故管理: 'driver:accident:*',

  财务管理: 'finance:*',
  月缴定额管理: 'finance:monthQuota:*',
  营业外收入管理: 'finance:nonBusinessIncome:*',
  预留金管理: 'finance:reserveMoney:*',
  安全保证金管理: 'finance:securityDeposit:*',
}

// 资源
const firstResources = {
  系统管理: '001',
  车辆管理: '002',
  驾驶员管理: '003',
  财务管理: '004',
}

const secondResources = {
  组织机构管理: '001-001',
  用户管理: '001-002',
  角色管理: '001-003',
  资源管理: '001-004',

  车辆信息: '002-001',
  车辆年审管理: '002-002',
  车辆二级维护管理: '002-003',
  车辆保险管理: '002-004',
  车辆营运数据管理: '002-005',

  基础信息: '003-001',
  管理档案管理: '003-002',
  交通事故管理: '003-003',
  政府表扬管理: '003-004',
  媒体报道管理: '003-005',
  服务投诉管理: '003-006',
  营运违章管理: '003-007',
  交通违法记录管理: '003-008',
  交通事故管理: '003-009',

  月缴定额管理: '004-001',
  营业外收入管理: '004-002',
  预留金管理: '004-003',
  安全保证金管理: '004-004',
}

const threeResources = {
  新增用户: '001-002-001',

  新增车辆: '002-001-001',
  修改车辆: '002-001-002',

  新增车辆年审: '002-002-001',
}

module.exports = {
	permissions,
	firstResources,
	secondResources,
	threeResources,
}
