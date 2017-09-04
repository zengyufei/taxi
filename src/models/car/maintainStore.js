import { extend } from 'ModelUtils'
import { Modal } from 'antd'

const prefix = 'maintain'

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
    res: 'maintain',

    maintainList: [],
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
      return { ...state, pageState: true, res: action.res, maintainList: [], maintainImage: '' }
    },
    toInfo(state, action) {
      let maintainList = []
      if (action.maintain.maintainImage) {
        maintainList = [{ uid: 0, url: UPLOAD_URL + action.maintain.maintainImage, status: 'done' }]
      }
      let plateList = []
      if (action.maintain.plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.maintain.plateImage, status: 'done' }]
      }
      return { ...state, pageState: true, res: action.res, maintain: action.maintain, maintainList, plateList }
    },
    toUpdate(state, action) {
      let maintainList = []
      if (action.maintain.maintainImage) {
        maintainList = [{ uid: 0, url: UPLOAD_URL + action.maintain.maintainImage, status: 'done' }]
      }
      let plateList = []
      if (action.maintain.plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.maintain.plateImage, status: 'done' }]
      }
      return { ...state, pageState: true, res: action.res, maintain: action.maintain, maintainList, maintainImage: '', plateList }
    },
    toPage(state) {
      return { ...state, pageState: false }
    },

    maintainChange(state, { maintainList }) {
      return { ...state, maintainList, maintainImage: maintainList.length >= 1 ? maintainList[0].response : '' }
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

    /**
     * 获取用户列表分页
     * @param playload 包含 pageNo pageSize account mobile roleId
     */
    *queryPage(playload, {get, put}) {  
      const response = yield get(`${prefix}/queryPage`, playload)
      yield put({ type: 'queryPageSuccess', page: response.result, pageState: false })
    },
    // 提醒 查询
    * warnList(playload, { get, put }) {
      const response = yield get(`${prefix}/warnList`, playload)
      yield put({ type: 'queryPageSuccess', page: response.result, register: false })
    },

    // 新增
    * insert(playload, { post, put, select }) {
      const response = yield post(`${prefix}/insert`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.maintainStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    // 修改
    * updateNotNull(playload, { post, put, select }) {
      const response = yield post(`${prefix}/update`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.maintainStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    // 删除
    * deleteById({ id }, { get, put, select }) {
      const response = yield get(`${prefix}/deleteById`, { id })
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.maintainStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },

  },

  subscriptions: {
    setup({ dispatch, listen }) {
      listen(`/${prefix}`, ({ query }) => {
        const option = Object.keys(query).length ? { type: 'warnList' } : { type: 'queryPage' }
        dispatch({ ...option, ...query })
      })
    },


  },


})
