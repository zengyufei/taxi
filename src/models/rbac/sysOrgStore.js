import { Select } from 'antd'
import { extend } from 'ModelUtils'

const Option = Select.Option
const moduleName = '组织机构'
const prefix = 'sysOrg'
const queryPageUrl = `${prefix}/queryPage`
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
    page: {},
    [prefix]: {},
  },
  effects: {

    * init({}, { update, tableBindType, formBindType, select }) {
      const { init } = yield select(({ sysOrgStore }) => sysOrgStore)
      if (!init) {
        yield tableBindType({
          initPwd: text => {
            return +text === 0 ? '正常' : '未初始化'
          },
        })
        yield formBindType({
          invalid: ({ showPlaceholder }) => {
            return {
              input: (
                <Select key="invalid" allowClear placeholder={showPlaceholder || '请选择'}>
                  <Option key="invalid0" value="true">有效</Option>
                  <Option key="invalid1" value="false">无效</Option>
                </Select>
              ),
            }
          },
        })
        yield update({ init: true })
      }
    },

    * queryPage(payload, { getMessage, update }) {
      const { result = {} } = yield getMessage(queryPageUrl, payload, `${moduleName}列表`)
      yield update({ page: result })
    },

    /**
     * 不提示刷新分页，增删改操作使用
     */
    * reload(payload, { get, update }) {
      const { result = {} } = yield get(queryPageUrl, payload)
      yield update({ page: result })
    },

    * add(payload, { postConfirmLoading, put, select }) {
      const { pageNo, pageSize } = yield select(({ sysOrgStore }) => sysOrgStore.page)
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
      const { sysOrg = {}, page: { pageNo, pageSize } } = yield select(({ sysOrgStore }) => sysOrgStore)
      const newSysMember = { ...sysOrg, ...payload }
      if (diff(sysOrg, newSysMember)) {
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
      const { pageNo, pageSize } = yield select(({ sysOrgStore }) => sysOrgStore.page)
      yield getMessage(deleteByIdUrl, { id: +id }, { successMsg: `删除${moduleName}成功`, errorMsg: `删除${moduleName}失败` })
      yield put('reload', { pageNo, pageSize }) // 刷新列表
    },

  },
  reducers: {},
  subscriptions: {
    setup({ dispatch, listen }) {
      listen(`/${prefix}`, () => {
        dispatch({
          type: 'init',
        })
        dispatch({
          type: 'queryPage',
        })
      })
    },
  },
})

