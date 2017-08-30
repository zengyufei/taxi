import { extend } from 'ModelUtils'
import { Modal, Select } from 'antd'

const prefix = 'car'

export default extend({

  namespace: `${prefix}Store`,

  state: {

    page: {
      pn: 0,
      ps: 10,
      totalCount: 0,
      dataList: [],
    },

    dataSource: [],
    // 是否跳转页面
    pageState: false,
    // 跳转哪种页面(新增，修改，详情，分页  默认分页)
    res: 'car',

    plateList: [],
    ownershipList: [],
    roadTransportList: [],
    certificateList: [],
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
    queryByCarNoSuccess(state, { car }) {
      let plateList = []
      if (car !== null) {
        plateList = [{ uid: 0, url: UPLOAD_URL + car.plateImage, status: 'done' }]
      }
      return { ...state, car, plateList }
    },
    setCarNull(state) {
      return { ...state, car: null, plateList: [] }
    },
    // 异步跳转页面
    toAdd(state, action) {
      return { ...state,
        pageState: true,
        res: action.res,
        plateList: [],
        plateImage: '',
        ownershipList: [],
        ownershipImage: '',
        roadTransportList: [],
        roadTransportImage: '',
        certificateList: [],
        certificateImage: '' }
    },
    toInfo(state, action) {
      let plateList = []
      if (action.car.plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.car.plateImage, status: 'done' }]
      }
      let ownershipList = []
      if (action.car.ownershipImage) {
        ownershipList = [{ uid: 0, url: UPLOAD_URL + action.car.ownershipImage, status: 'done' }]
      }
      let roadTransportList = []
      if (action.car.roadTransportImage) {
        roadTransportList = [{ uid: 0, url: UPLOAD_URL + action.car.roadTransportImage, status: 'done' }]
      }
      let certificateList = []
      if (action.car.certificateImage) {
        certificateList = [{ uid: 0, url: UPLOAD_URL + action.car.certificateImage, status: 'done' }]
      }

      return { ...state,
        pageState: true,
        res: action.res,
        car: action.car,
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
      if (action.car.plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.car.plateImage, status: 'done' }]
      }
      let ownershipList = []
      if (action.car.ownershipImage) {
        ownershipList = [{ uid: 0, url: UPLOAD_URL + action.car.ownershipImage, status: 'done' }]
      }
      let roadTransportList = []
      if (action.car.roadTransportImage) {
        roadTransportList = [{ uid: 0, url: UPLOAD_URL + action.car.roadTransportImage, status: 'done' }]
      }
      let certificateList = []
      if (action.car.certificateImage) {
        certificateList = [{ uid: 0, url: UPLOAD_URL + action.car.certificateImage, status: 'done' }]
      }
      return { ...state,
        pageState: true,
        res: action.res,
        car: action.car,
        plateList,
        plateImage: '',
        ownershipList,
        ownershipImage: '',
        roadTransportList,
        roadTransportImage: '',
        certificateList,
        certificateImage: '' }
    },
    toPage(state, { dataSource }) {
      return { ...state, dataSource, pageState: false }
    },

    plateChange(state, { plateList }) {
      return { ...state, plateList, plateImage: plateList.length >= 1 ? plateList[0].response : '' }
    },
    ownershipChange(state, { ownershipList }) {
      return { ...state, ownershipList, ownershipImage: ownershipList.length >= 1 ? ownershipList[0].response : '' }
    },
    roadTransportChange(state, { roadTransportList }) {
      return { ...state, roadTransportList, roadTransportImage: roadTransportList.length >= 1 ? roadTransportList[0].response : '' }
    },
    certificateChange(state, { certificateList }) {
      return { ...state, certificateList, certificateImage: certificateList.length >= 1 ? certificateList[0].response : '' }
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

    * reload(playload, { get, put, select }) {
      const page = yield select(state => state[`${prefix}Store`].page)
      const response = yield get(`${prefix}/queryPage`, { pageNo: page.pageNo, pageSize: page.pageSize })
      yield put({ type: 'queryPageSuccess', page: response.result, pageState: false })
    },

    /**
     * 获取用户列表分页
     * @param playload 包含 pn ps account mobile roleId
     */
    * queryPage(playload, { get, put }) {
      const response = yield get(`${prefix}/queryPage`, playload)
      yield put({ type: 'queryPageSuccess', page: response.result, pageState: false })
    },
    // 提醒 查询
    * warnList(playload, { get, put }) {
      const response = yield get(`${prefix}/warnList`, playload)
      yield put({ type: 'queryPageSuccess', page: response.result, register: false })
    },

    * queryByCarNo({ carNo }, { get, put }) {
      const response = yield get(`${prefix}/queryByCarNo`, { carNo })
      if (+response.code === 200) {
        yield put({ type: 'queryByCarNoSuccess', car: response.result })
      } else {
        yield put({ type: 'setCarNull' })
      }
    },

    // 新增
    * insert(playload, { post, put, select }) {
      const response = yield post(`${prefix}/insert`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.carStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    // 修改
    * updateNotNull(playload, { get, put, select }) {
      const response = yield get(`${prefix}/update`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.carStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    // 删除
    * deleteById({ id }, { get, put, select }) {
      const response = yield get(`${prefix}/deleteById`, { id })
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.carStore.page)
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
