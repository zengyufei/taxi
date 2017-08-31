import { extend } from 'ModelUtils'
import { Modal } from 'antd'

const prefix = 'carOperateLog'

export default extend({

  namespace: `${prefix}Store`,

  state: {

    page: {
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      dataList: [],
    },

    dataSource: [],
    // 是否跳转页面
    pageState: false,
    // 跳转哪种页面(新增，修改，详情，分页  默认分页)
    res: 'carOperateLog',
  },

  reducers: {
    queryPageSuccess(state, { page = {
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      dataList: [],
    } }) {
      return { ...state, page, pageState: false }
    },
    // 异步跳转页面
    toAdd(state, action) {
      return { ...state, pageState: true, res: action.res }
    },
    toEdit(state, action) {
      let plateList = []
      if (action.carOperateLog.plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.carOperateLog.plateImage, status: 'done' }]
      }
      return { ...state, pageState: true, res: action.res, carOperateLog: action.carOperateLog, plateList }
    },
    toInfo(state, action) {
      let plateList = []
      if (action.carOperateLog.plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.carOperateLog.plateImage, status: 'done' }]
      }
      return { ...state, pageState: true, res: action.res, carOperateLog: action.carOperateLog, plateList }
    },
    toPage(state) {
      return { ...state, pageState: false }
    },

    lookPreview(state, { previewImage, previewVisible }) {
      return { ...state, previewImage, previewVisible }
    },
    unlookPreview(state) {
      return { ...state, previewVisible: false }
    },

  },

  effects: {

    * init({}, { tableBindType, formBindType }) {
      yield tableBindType({
      })

      yield formBindType({
      })
    },

    * queryPage(playload, { get, put }) {
      const response = yield get(`${prefix}/queryPage`, playload)
      yield put({ type: 'queryPageSuccess', page: response.result, pageState: false })
    },

    * insert(playload, { post, put, select }) {
      const response = yield post(`${prefix}/insert`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.carOperateLogStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },

    * updateNotNull(playload, { post, put, select }) {
      const response = yield post(`${prefix}/update`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.carOperateLogStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    * deleteById({ id }, { get, put, select }) {
      const response = yield get(`${prefix}/deleteById`, { id })
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.carOperateLogStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },

  },

  subscriptions: {
    setup({ dispatch, listen }) {
      listen(`/${prefix}`, () => {
        dispatch({
          type: 'queryPage',
          pageNo: 1,
          pageSize: 10,
        })
      })
    },

  },

})
