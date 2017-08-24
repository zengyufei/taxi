import { extend } from 'ModelUtils'

const moduleName = '角色'
const prefix = 'sysRole'
const queryPageUrl = `${prefix}/queryPage`
const addUrl = `${prefix}/insert`
const updateUrl = `${prefix}/update`
const deleteByIdUrl = `${prefix}/deleteById`

export default extend({
  namespace: `${prefix}Store`,
  state: {
    defaultExpandAllRows: false,
    visible: {
      add: false,
      update: false,
    },
    page: {},
    [prefix]: {
      resourceList: [],
    },
  },
  effects: {

    * init({}, { tableBindType, sessionCache }) {
      yield tableBindType({
        sysMemberId: id => {
          const cache = sessionCache.getIds('sysMemberIds', id)
          return cache && cache.account
        },
      })
    },

    * queryPage(payload, { get, getMessage, update, _, sessionCache }) {
      const { result } = yield getMessage(queryPageUrl, payload, `${moduleName}列表`)

      if (result) {
        const sysMemberIds = yield _.map(result.dataList, 'sysMemberId')
        const existsIds = sessionCache.existsIds('sysMemberIds', sysMemberIds)
        if (!existsIds) {
          const sysMemberList = yield get('/sysMember/queryByIds.htm', { ids: sysMemberIds.join(',') })
          sessionCache.setIds('sysMemberIds', sysMemberList.result, 'id')
        }
      }

      yield update({ page: result })
    },

    /**
     * 不提示刷新分页，增删改操作使用
     */
    * reload(payload, { get, update }) {
      const { result } = yield get(queryPageUrl, payload)
      yield update({ page: result })
    },

    * add(payload, { postConfirmLoading, put, select }) {
      const { page: { pageNo, pageSize }, sysRole } = yield select(({ sysRoleStore }) => sysRoleStore)
      const { code, msg } = yield postConfirmLoading(addUrl, { ...payload, resourceList: sysRole.resourceList })
      if (code === 200) {
        ZMsg.success(msg)
        yield [
          put('reload', { pageNo, pageSize }), // 刷新列表
          put('hideVisible', { key: 'add' }), // 控制弹窗
        ]
      }
    },

    * update(payload, { postConfirmLoading, put, diff, select }) {
      const { sysRole, page: { pageNo, pageSize } } = yield select(({ sysRoleStore }) => sysRoleStore)
      const newSysMember = { ...sysRole, ...payload }
      if (diff(sysRole, newSysMember)) {
        const { code, msg } = yield postConfirmLoading(updateUrl, newSysMember)
        if (code === 200) {
          ZMsg.success(msg)
          yield [
            put('reload', { pageNo, pageSize }), // 刷新列表
            put('hideVisible', { key: 'update' }), // 控制弹窗
          ]
        }
      }
    },

    * deleteById({ id }, { getMessage, put, select }) {
      const { pageNo, pageSize } = yield select(({ sysRoleStore }) => sysRoleStore.page)
      yield getMessage(deleteByIdUrl, { id: +id }, { successMsg: `删除${moduleName}成功`, errorMsg: `删除${moduleName}失败` })
      yield put('reload', { pageNo, pageSize }) // 刷新列表
    },

  },
  reducers: {
    updatePermission(state, { resourceList }) {
      let { sysRole } = state
      sysRole.resourceList = resourceList.join(',')
      return { ...state, sysRole }
    },
  },
  subscriptions: {
  },
})

