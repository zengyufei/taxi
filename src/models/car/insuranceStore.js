import { extend } from 'ModelUtils'
import { Modal } from 'antd'

const prefix = 'insurance'

export default extend({

  namespace: `${prefix}Store`,

  state: {

    page: {
      pageNo: 0,
      pageSize: 10,
      totalCount: 0,
      dataList: [],
    },

    dataSource: [],
    // 是否跳转页面
    pageState: false,
    // 跳转哪种页面(新增，修改，详情，分页  默认分页)
    res: 'insurance',
    businessInsuranceList: [],
    trafficInsuranceList: [],
  },

  reducers: {
    queryPageSuccess(state, { page = {
      pageNo: 0,
      pageSize: 10,
      totalCount: 0,
      dataList: [],
    } }) {
      return { ...state, page, pageState: false }
    },
    // 异步跳转页面
    toAdd(state, action) {
      return { ...state,
        pageState: true,
        res: action.res,
        businessState: true,
        trafficState: true,
        businessInsuranceList: [],
        businessInsuranceFile: '',
        trafficInsuranceList: [],
        trafficInsuranceFile: '',
      }
    },
    toEdit(state, action) {
      let insuranceList = []
      if (action.insurance.insuranceFile != null) {
        insuranceList = [{ uid: 0, url: UPLOAD_URL + action.insurance.insuranceFile, status: 'done' }]
      }
      let plateList = []
      if (action.insurance.plateImage != null) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.insurance.plateImage, status: 'done' }]
      }
      return { ...state,
        pageState: true,
        res: action.res,
        insurance: action.insurance,
        insuranceList,
        insuranceFile: '',
        plateList }
    },
    toInfo(state, action) {
      let insuranceList = []
      if (action.insurance.insuranceFile != null) {
        insuranceList = [{ uid: 0, url: UPLOAD_URL + action.insurance.insuranceFile, status: 'done' }]
      }
      let plateList = []
      if (action.insurance.plateImage != null) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.insurance.plateImage, status: 'done' }]
      }
      return { ...state,
        pageState: true,
        res: action.res,
        insurance: action.insurance,
        insuranceList,
        plateList }
    },
    traffic(state, actioin) {
      return { ...state, trafficState: actioin.trafficState }
    },
    business(state, actioin) {
      return { ...state, businessState: actioin.businessState }
    },

    insuranceChange(state, { insuranceList }) {
      return { ...state, insuranceList, insuranceFile: insuranceList.length >= 1 ? insuranceList[0].response : '' }
    },
    businessInsuranceChange(state, { businessInsuranceList }) {
      return { ...state, businessInsuranceList, businessInsuranceFile: businessInsuranceList.length >= 1 ? businessInsuranceList[0].response : '' }
    },
    trafficInsuranceChange(state, { trafficInsuranceList }) {
      return { ...state, trafficInsuranceList, trafficInsuranceFile: trafficInsuranceList.length >= 1 ? trafficInsuranceList[0].response : '' }
    },
    lookPreview(state, { previewImage, previewVisible }) {
      return { ...state, previewImage, previewVisible }
    },
    unlookPreview(state) {
      return { ...state, previewVisible: false }
    },

  },

  effects: {

    * init({}, { update, tableBindType, formBindType, select }) {
      const { init } = yield select(({ insuranceStore }) => insuranceStore)
      if (!init) {
        yield tableBindType({
        })

        yield formBindType({
        })
        yield update({ init: true })
      }
    },

    *queryPage(playload, {get, put}) {  // eslint-disable-line
      const response = yield get(`${prefix}/queryPage`, playload)
      yield put({ type: 'queryPageSuccess', page: response.result, pageState: false })
    },

    // 新增
    * insert(playload, { post, put, select }) {
      let insertState = true
      if (playload.trafficBoolean) {
        const insurance = {
          plateImage: playload.plateImage,
          carNo: playload.carNo,
          plateNumber: playload.plateNumber,
          carId: playload.carId,
          insuranceType: 'TRAFFIC',
          insuranceName: playload.trafficInsuranceName,
          insuranceCompany: playload.trafficInsuranceCompany,
          policyNo: playload.trafficPolicyNo,
          insuranceMoney: playload.trafficInsuranceMoney,
          insuranceBuyDate: playload.trafficInsuranceBuyDate,
          insuranceExpireDate: playload.trafficInsuranceExpireDate,
          insuranceFile: playload.trafficInsuranceFile,
        }
        const response = yield post(`${prefix}/insert`, insurance)
        if (+response.code !== 200) {
          insertState = false
          Modal.info({
            title: '温馨提示',
            content: (
              `交强险：${response.msg}`
            ),
          })
          return
        }
        ZMsg.info(`交强险：${response.msg}`)
      }
      if (playload.businessBoolean) {
        const insurance = {
          plateImage: playload.plateImage,
          carNo: playload.carNo,
          plateNumber: playload.plateNumber,
          carId: playload.carId,
          insuranceType: 'BUSINESS',
          insuranceName: playload.businessInsuranceName,
          insuranceCompany: playload.businessInsuranceCompany,
          policyNo: playload.businessPolicyNo,
          insuranceMoney: playload.businessInsuranceMoney,
          insuranceBuyDate: playload.businessInsuranceBuyDate,
          insuranceExpireDate: playload.businessInsuranceExpireDate,
          insuranceFile: playload.businessInsuranceFile,
        }
        const response = yield post(`${prefix}/insert`, insurance)
        if (+response.code !== 200) {
          insertState = false
          Modal.info({
            title: '温馨提示',
            content: (
              `商业险：${response.msg}`
            ),
          })
          return
        }
        ZMsg.info(`商业险：${response.msg}`)
      }
      if (insertState) {
        const page = yield select(state => state.insuranceStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    // 修改
    * updateNotNull(playload, { post, put, select }) {
      const response = yield post(`${prefix}/update`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.insuranceStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      } else {
        Modal.info({
          title: '温馨提示',
          content: (
            response.msg
          ),
        })
      }
    },
    // 删除
    * deleteById({ id }, { get, put, select }) {
      const response = yield get(`${prefix}/deleteById`, { id })
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.insuranceStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      } else { ZMsg.error(response.msg) }
    },

  },

  subscriptions: {
    setup({ dispatch, listen }) {
      listen(`/${prefix}`, () => {
        dispatch({
          type: 'init',
        })
        dispatch({
          type: 'queryPage',
          pageNo: 1,
          pageSize: 10,
        })
      })
    },

  },
})
