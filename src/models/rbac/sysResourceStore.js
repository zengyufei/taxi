import { extend } from 'ModelUtils'

const moduleName = '资源'
const prefix = 'sysResource'
const addUrl = `${prefix}/insert`
const updateUrl = `${prefix}/update`
const deleteByIdUrl = `${prefix}/deleteById`

export default extend({
  namespace: `${prefix}Store`,
  state: {
    visible: {
      add: false,
      update: false,
    },
    [prefix]: {},
  },
  effects: {

    /**
     * 不提示刷新分页，增删改操作使用
     */
    * reload(payload, { put, localCache }) {
      yield [
        localCache.remove('resources'),
        put('rbacStore/updateState', { resource: [] }),
        put('rbacStore/queryResources'),
      ]
    },

    * add(payload, { postConfirmLoading, put }) {
      const { code, msg } = yield postConfirmLoading(addUrl, payload)
      if (code === 200) {
        ZMsg.success(msg)
        yield [
          put('reload'), // 刷新列表
          put('hideVisible', { key: 'add' }), // 控制弹窗
        ]
      }
    },

    * update(payload, { postConfirmLoading, put, diff, select }) {
      const sysResource = yield select(({ sysResourceStore }) => sysResourceStore[prefix])
      const newSysResource = { ...sysResource, ...payload }
      if (diff(sysResource, newSysResource)) {
        const { code, msg } = yield postConfirmLoading(updateUrl, newSysResource)
        if (code === 200) {
          ZMsg.success(msg)
          yield [
            put('reload'), // 刷新列表
            put('hideVisible', { key: 'update' }), // 控制弹窗
          ]
        }
      }
    },

    * deleteById({ id }, { getMessage, put }) {
      yield getMessage(deleteByIdUrl, { id: +id }, { successMsg: `删除${moduleName}成功`, errorMsg: `删除${moduleName}失败` })
      yield put('reload') // 刷新列表
    },

  },
  reducers: {},
  subscriptions: {
  },
})

