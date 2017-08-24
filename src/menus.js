import _ from 'lodash'

const config = {

  // 菜单按钮
  menus: [

    /**
     * 系统管理
     * @module 用户管理
     * @module 角色管理
     */
    {
      id: _.uniqueId(),
      name: '系统管理',
      icon: 'mail',
      permission: 'rbac:*',
      children: [
        {
          id: _.uniqueId(),
          name: '组织机构管理',
          url: '/sysOrg',
          permission: 'rbac:sysOrg:*',
        },
        {
          id: _.uniqueId(),
          name: '用户管理',
          url: '/sysMember',
          permission: 'rbac:sysMember:*',
        },
        {
          id: _.uniqueId(),
          name: '角色管理',
          url: '/sysRole',
          permission: 'rbac:sysRole:*',
        },
        {
          id: _.uniqueId(),
          name: '资源管理',
          url: '/sysResource',
          permission: 'rbac:sysResource:*',
        },
      ],
    },

    /**
   * 车辆管理
   * @module 车辆管理
   * @module 车辆年审
   * @module 二级维护
   * @module 车辆保险
   * @module 营运数据
   *
   */
    {
      id: _.uniqueId(),
      name: '车辆管理',
      icon: 'car',
      permission: 'car:*',
      children: [
        {
          id: _.uniqueId(),
          name: '车辆信息',
          url: '/car',
          permission: 'car:car:*',
        },
        {
          id: _.uniqueId(),
          name: '车辆年审',
          url: '/annualVerification',
          permission: 'car:annualVerification:*',
        },

        {
          id: _.uniqueId(),
          name: '二级维护',
          url: '/maintain',
          permission: 'car:maintain:*',
        },

        {
          id: _.uniqueId(),
          name: '车辆保险',
          url: '/insurance',
          permission: 'car:insurance:*',
        },

        {
          id: _.uniqueId(),
          name: '车辆运营',
          url: '/carOperateLog',
          permission: 'car:carOperateLog:*',
        },


      ],
    },

    /**
   * 驾驶员管理
   */
    {
      id: _.uniqueId(),
      name: '驾驶员管理',
      icon: 'user',
      permission: 'driver:*',
      children: [
        {
          id: _.uniqueId(),
          name: '基础信息',
          url: '/driver',
          permission: 'driver:driver:*',
        },
        {
          id: _.uniqueId(),
          name: '管理档案',
          url: '/archives',
          permission: 'driver:archives:*',
        },
        {
          id: _.uniqueId(),
          name: '普通表扬',
          url: '/commonPraise',
          permission: 'driver:common:*',
        },
        {
          id: _.uniqueId(),
          name: '政府表扬',
          url: '/govtPraise',
          permission: 'driver:govt:*',
        },
        {
          id: _.uniqueId(),
          name: '媒体报道',
          url: '/mediaPraise',
          permission: 'driver:media:*',
        },
        {
          id: _.uniqueId(),
          name: '服务投诉',
          url: '/complain',
          permission: 'driver:complain:*',
        },
        {
          id: _.uniqueId(),
          name: '违章详情',
          url: '/punishInfo',
          permission: 'driver:punishInfo:*',
        },
        {
          id: _.uniqueId(),
          name: '营运违章',
          url: '/punish',
          permission: 'driver:punish:*',
        },
        {
          id: _.uniqueId(),
          name: '交通违法',
          url: '/trafficViolation',
          permission: 'driver:violation:*',
        },
        {
          id: _.uniqueId(),
          name: '交通事故',
          url: '/trafficAccident',
          permission: 'driver:accident:*',
        },
        {
          id: _.uniqueId(),
          name: '失物认领',
          url: '/lostAndFound',
          permission: 'driver:lostAndFound:*',
        },
        {
          id: _.uniqueId(),
          name: '过户信息',
          url: '/transfer',
          permission: 'driver:transfer:*',
        },
      ],
    },
    /**
    * 财务
    */
    {
      id: _.uniqueId(),
      name: '财务管理',
      icon: 'pay-circle-o',
      permission: 'finance:*',
      children: [
        {
          id: _.uniqueId(),
          name: '月缴定额',
          url: '/monthQuota',
          permission: 'finance:monthQuota:*',
        },
        {
          id: _.uniqueId(),
          name: '营业外收入',
          url: '/nonBusinessIncome',
          permission: 'finance:nonBusinessIncome:*',
        },
        {
          id: _.uniqueId(),
          name: '预留金',
          url: '/reserveMoney',
          permission: 'finance:reserveMoney:*',
        },
        {
          id: _.uniqueId(),
          name: '安全保证金',
          url: '/securityDeposit',
          permission: 'finance:securityDeposit:*',
        },
        {
          id: _.uniqueId(),
          name: '核减金额明细',
          url: '/subtractAmount',
          permission: 'finance:subtractAmount:*',
        },
      ],
    },


  ],

}
export default config
