import { extend } from 'ModelUtils'
import { Modal } from 'antd'

const prefix = 'annualVerification'
const storeName = `${prefix}Store`

export default extend({

  namespace: storeName,

  state: {
    page: {},

    // 是否跳转页面
    pageState: false,
    // 跳转哪种页面(新增，修改，详情，分页  默认分页)
    res: prefix,
    synthesizeFileList: [],
    drivingLicenseFileList: [],
    taximeterFileList: [],
  },

  reducers: {
    // 异步跳转页面
    toEdit(state, action) {
      let plateList = []
      if (action[prefix].plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action[prefix].plateImage, status: 'done' }]
      }
      let synthesizeList = []
      if (action[prefix].synthesizeFile) {
        synthesizeList = [{ uid: 0, url: UPLOAD_URL + action[prefix].synthesizeFile, status: 'done' }]
      }
      let drivingLicenseList = []
      if (action[prefix].drivingLicenseFile) {
        drivingLicenseList = [{ uid: 0, url: UPLOAD_URL + action[prefix].drivingLicenseFile, status: 'done' }]
      }
      let taximeterList = []
      if (action[prefix].taximeterFile) {
        taximeterList = [{ uid: 0, url: UPLOAD_URL + action[prefix].taximeterFile, status: 'done' }]
      }

      return { ...state,
        pageState: true,
        res: action.res,
        [prefix]: action[prefix],
        plateList,
        synthesizeFileList: synthesizeList,
        synthesizeFile: '',
        drivingLicenseFileList: drivingLicenseList,
        drivingLicenseFile: '',
        taximeterFileList: taximeterList,
        taximeterFile: '' }
    },
    toInfo(state, action) {
      let plateList = []
      if (action[prefix].plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action[prefix].plateImage, status: 'done' }]
      }
      let synthesizeList = []
      if (action[prefix].synthesizeFile) {
        synthesizeList = [{ uid: 0, url: UPLOAD_URL + action[prefix].synthesizeFile, status: 'done' }]
      }
      let drivingLicenseList = []
      if (action[prefix].drivingLicenseFile) {
        drivingLicenseList = [{ uid: 0, url: UPLOAD_URL + action[prefix].drivingLicenseFile, status: 'done' }]
      }
      let taximeterList = []
      if (action[prefix].taximeterFile) {
        taximeterList = [{ uid: 0, url: UPLOAD_URL + action[prefix].taximeterFile, status: 'done' }]
      }
      return { ...state,
        pageState: true,
        res: action.res,
        [prefix]: action[prefix],
        plateList,
        synthesizeFileList: synthesizeList,
        drivingLicenseFileList: drivingLicenseList,
        taximeterFileList: taximeterList }
    },
    toPage(state) {
      return { ...state, pageState: false }
    },

    synthesizeFileChange(state, { synthesizeFileList }) {
      return { ...state, synthesizeFileList, synthesizeFile: synthesizeFileList.length >= 1 ? synthesizeFileList[0].response : '' }
    },
    drivingLicenseFileChange(state, { drivingLicenseFileList }) {
      return { ...state, drivingLicenseFileList, drivingLicenseFile: drivingLicenseFileList.length >= 1 ? drivingLicenseFileList[0].response : '' }
    },
    taximeterFileChange(state, { taximeterFileList }) {
      return { ...state, taximeterFileList, taximeterFile: taximeterFileList.length >= 1 ? taximeterFileList[0].response : '' }
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

    * queryPage(playload, { get, update }) {
      const response = yield get(`${prefix}/queryPage`, playload)
      yield update({ page: response.result, pageState: false })
    },

    // 提醒 查询
    * warnList(playload, { get, update }) {
      const response = yield get(`${prefix}/warnList`, playload)
      yield update({ page: response.result, register: false })
    },

    * insert(playload, { post, put, select }) {
      const response = yield post(`${prefix}/insert`, playload)
      if (response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state[storeName].page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    * updateNotNull(playload, { post, put, select }) {
      const response = yield post(`${prefix}/update`, playload)
      if (response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state[storeName].page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    // 删除车辆信息
    * deleteById({ id }, { get, put, select }) {
      const response = yield get(`${prefix}/deleteById`, { id })
      ZMsg.info(response.msg)
      if (response.code === 200) {
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
