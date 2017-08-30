import { extend } from 'ModelUtils'
import { Select } from 'antd'

const Option = Select.Option
const moduleName = '用户'
const prefix = 'sysMember'
const queryPageUrl = `${prefix}/queryPage`
const addUrl = `${prefix}/insert`
const updateUrl = `${prefix}/updateNotNull`
const deleteByIdUrl = `${prefix}/deleteById`

export default extend({
  namespace: `${prefix}Store`,
  state: {
    visible: {
      add: false,
      update: false,
    },
    page: {},
    [prefix]: {},
  },
  effects: {

    * init({}, { tableBindType, formBindType }) {
      yield tableBindType({
      })
      yield formBindType({
      })
    },

    * queryPage(payload, { getMessage, update }) {
      const { result } = yield getMessage(queryPageUrl, payload)
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
      const { pageNo, pageSize } = yield select(({ sysMemberStore }) => sysMemberStore.page)
      const { code = 0, msg = '' } = yield postConfirmLoading(addUrl, payload)
      if (code === 200) {
        ZMsg.success(msg)
        yield [
          put('reload', { pageNo, pageSize }), // 刷新列表
          put('hideVisible', { key: 'add' }), // 控制弹窗
        ]
      }
    },

    * update(payload, { postConfirmLoading, put, diff, select }) {
      const { sysMember, page: { pageNo, pageSize } } = yield select(({ sysMemberStore }) => sysMemberStore)
      let newSysMember = { ...sysMember, ...payload }
      if (diff(sysMember, newSysMember)) {
        delete newSysMember.password
        delete newSysMember.lastLoginTime
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

    * deleteById({ id }, { getMessage, put }) {
      yield getMessage(deleteByIdUrl, { id: +id }, { successMsg: `删除${moduleName}成功`, errorMsg: `删除${moduleName}失败` })
      yield put('reload') // 刷新列表
    },

  },
  reducers: {},
  subscriptions: {
    setup({ dispatch, listen }) {
      listen(`/${prefix}`, () => {
        dispatch({
          type: 'queryPage',
        })
      })
    },
  },
})

