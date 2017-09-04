import { extend } from 'ModelUtils'

const prefix = 'car'
const storeName = `${prefix}Store`

export default extend({

  namespace: storeName,

  state: {

    page: {},

    // 是否跳转页面
    pageState: false,
    // 跳转哪种页面(新增，修改，详情，分页  默认分页)
    res: prefix,

    plateList: [],
    ownershipList: [],
    roadTransportList: [],
    certificateList: [],
  },

  reducers: {
    // 异步跳转页面
    toInfo(state, action) {
      let plateList = []
      if (action[prefix].plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action[prefix].plateImage, status: 'done' }]
      }
      let ownershipList = []
      if (action[prefix].ownershipImage) {
        ownershipList = [{ uid: 0, url: UPLOAD_URL + action[prefix].ownershipImage, status: 'done' }]
      }
      let roadTransportList = []
      if (action[prefix].roadTransportImage) {
        roadTransportList = [{ uid: 0, url: UPLOAD_URL + action[prefix].roadTransportImage, status: 'done' }]
      }
      let certificateList = []
      if (action[prefix].certificateImage) {
        certificateList = [{ uid: 0, url: UPLOAD_URL + action[prefix].certificateImage, status: 'done' }]
      }

      return { ...state,
        pageState: true,
        res: action.res,
        [prefix]: action[prefix],
        plateList,
        plateImage: '',
        ownershipList,
        ownershipImage: '',
        roadTransportList,
        roadTransportImage: '',
        certificateList,
        certificateImage: '' }
    },
    toEdit(state, action) {
      let plateList = []
      if (action[prefix].plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action[prefix].plateImage, status: 'done' }]
      }
      let ownershipList = []
      if (action[prefix].ownershipImage) {
        ownershipList = [{ uid: 0, url: UPLOAD_URL + action[prefix].ownershipImage, status: 'done' }]
      }
      let roadTransportList = []
      if (action[prefix].roadTransportImage) {
        roadTransportList = [{ uid: 0, url: UPLOAD_URL + action[prefix].roadTransportImage, status: 'done' }]
      }
      let certificateList = []
      if (action[prefix].certificateImage) {
        certificateList = [{ uid: 0, url: UPLOAD_URL + action[prefix].certificateImage, status: 'done' }]
      }
      return { ...state,
        pageState: true,
        res: action.res,
        [prefix]: action[prefix],
        plateList,
        plateImage: '',
        ownershipList,
        ownershipImage: '',
        roadTransportList,
        roadTransportImage: '',
        certificateList,
        certificateImage: '' }
    },

  },

  effects: {

    * init({}, { tableBindType, formBindType }) {
      yield tableBindType({
      })

      yield formBindType({
      })
    },

    * queryPage(playload, { get, update }) {
      const response = yield get(`${prefix}/queryPage`, playload)
      yield update({ page: response.result, pageState: false })
    },

    // 提醒 查询
    * warnList(playload, { get, update }) {
      const response = yield get(`${prefix}/warnList`, playload)
      yield update({ page: response.result, register: false })
    },

    * queryByCarNo({ carNo }, { get, update }) {
      const response = yield get(`${prefix}/queryByCarNo`, { carNo })
      if (+response.code === 200) {
        let plateList = []
        if (response.result) {
          plateList = [{ uid: 0, url: UPLOAD_URL + response.result.plateImage, status: 'done' }]
        }
        yield update({ [prefix]: response.result, plateList })
      } else {
        yield update({ [prefix]: {}, plateList: [] })
      }
    },

    * insert(playload, { post, put, select }) {
      const response = yield post(`${prefix}/insert`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state[storeName].page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },

    * update(playload, { post, put, select }) {
      const response = yield post(`${prefix}/update`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state[storeName].page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },

    * deleteById({ id }, { get, put, select }) {
      const response = yield get(`${prefix}/deleteById`, { id })
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state[storeName].page)
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
