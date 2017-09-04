import { extend } from 'ModelUtils'
import { Modal } from 'antd'

const prefix = 'insurance'

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
    res: 'insurance',
    businessInsuranceList: [],
    trafficInsuranceList: [],

    oneInsurance: false,
    twoInsurance: false,
    threeInsurance: false,
    fourInsurance: false,
    fiveInsurance: false,
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
      return { ...state,
        pageState: true,
        res: action.res,
        businessState: true,
        trafficState: true,
        businessInsuranceList: [],
        businessInsuranceFile: '',
        trafficInsuranceList: [],
        trafficInsuranceFile: '',

        oneInsurance: false,
        twoInsurance: false,
        threeInsurance: false,
        fourInsurance: false,
        fiveInsurance: false,
      }
    },
    toEdit(state, action) {
      let insuranceList = []
      if (action.insurance.insuranceFile) {
        insuranceList = [{ uid: 0, url: UPLOAD_URL + action.insurance.insuranceFile, status: 'done' }]
      }
      let plateList = []
      if (action.insurance.plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.insurance.plateImage, status: 'done' }]
      }
      let oneInsurance = false
      let twoInsurance = false
      let threeInsurance = false
      let fourInsurance = false
      let fiveInsurance = false
      if (action.insurance.bizInsuranceStr) {
        action.insurance.bizInsuranceStr.split(',').forEach(value => {
          if (value.split('_').includes('车损险赔偿金额')) {
            oneInsurance = true
          }
          if (value.split('_').includes('第三者责任险最高赔偿金额')) {
            twoInsurance = true
          }
          if (value.split('_').includes('不计免赔险最高赔偿金额')) {
            threeInsurance = true
          }
          if (value.split('_').includes('自燃险赔偿金额')) {
            fourInsurance = true
          }
          if (value.split('_').includes('承运人责任险最高赔偿金额（每座）')) {
            fiveInsurance = true
          }
        })
      }

      return { ...state,
        pageState: true,
        res: action.res,
        insurance: action.insurance,
        insuranceList,
        insuranceFile: '',
        oneInsurance,
        twoInsurance,
        threeInsurance,
        fourInsurance,
        fiveInsurance,
        plateList }
    },
    toInfo(state, action) {
      let insuranceList = []
      if (action.insurance.insuranceFile) {
        insuranceList = [{ uid: 0, url: UPLOAD_URL + action.insurance.insuranceFile, status: 'done' }]
      }
      let plateList = []
      if (action.insurance.plateImage) {
        plateList = [{ uid: 0, url: UPLOAD_URL + action.insurance.plateImage, status: 'done' }]
      }
      return { ...state,
        pageState: true,
        res: action.res,
        insurance: action.insurance,
        insuranceList,
        plateList }
    },
    toPage(state) {
      return { ...state, pageState: false }
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
    inInsuranceSuccess(state, action) {
      return { ...state,
        oneInsurance: action.oneInsurance,
        twoInsurance: action.twoInsurance,
        threeInsurance: action.threeInsurance,
        fourInsurance: action.fourInsurance,
        fiveInsurance: action.fiveInsurance,
      }
    },

  },

  effects: {

    * init({}, { tableBindType, formBindType }) {
      yield tableBindType({
      })

      yield formBindType({
      })
    },

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
          Modal.error({
            title: '温馨提示',
            content: (
              `交强险：${response.msg}`
            ),
          })
          return
        }
        ZMsg.success(`交强险：${response.msg}`)
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
          bizInsuranceStr: playload.bizInsuranceStr,
        }
        const response = yield post(`${prefix}/insert`, insurance)
        if (+response.code !== 200) {
          insertState = false
          Modal.error({
            title: '温馨提示',
            content: (
              `商业险：${response.msg}`
            ),
          })
          return
        }
        ZMsg.success(`商业险：${response.msg}`)
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
      }
    },
    // 删除
    * deleteById({ id }, { get, put, select }) {
      const response = yield get(`${prefix}/deleteById`, { id })
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.insuranceStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    // 保险种类
    * inInsurance({ oneInsurance, twoInsurance, threeInsurance, fourInsurance, fiveInsurance }, { put }) {
      yield put({
        type: 'inInsuranceSuccess',
        oneInsurance,
        twoInsurance,
        threeInsurance,
        fourInsurance,
        fiveInsurance,
      })
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
