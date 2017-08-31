import { extend } from 'ModelUtils'

const prefix = 'driver'
const urlPrefix = '/driver/driver'

export default extend({

  /**
   * 全局别名
   */
  namespace: `${prefix}Store`,

  /**
   * state 的每一个属性都应该有注释
   */
  state: {
    // 是否跳转页面
    register: false,
    // 跳转哪种页面(新增，修改，详情，分页  默认分页)
    res: 'page',

    // 分页查询结果, 是一个分页对象 Page
    page: {
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      dataList: [],
    },

    // 条件查询 -- carNo and plateNumber
    carNo: [],
    plateNumber: [],

    // 运载的驾驶员信息
    driver: {},
    // 运载的新驾驶员信息
    newDriver: {},
    // 是否选择保险
    insuranceState: true,

    // 上传图片
    previewVisible: false,
    /** 入职登记表 图片 */
    registerFileList: [],
    /** 体检报告 图片 */
    checkFileList: [],
    /** 无犯罪记录证明 图片 */
    noCriminalFileList: [],
    /** 优质服务承诺书 图片 */
    serviceFileList: [],
    /** 意外险自愿购买承诺书 图片 */
    insuranceFileList: [],
    /** 身份证复印件 图片 */
    IDCardImgFileList: [],
    /** 安全责任书 图片 */
    safetyResponsibilityFileList: [],

  },

  /**
   * 这里的方法都是用来改变 state 属性
   * 只要 state 属性有注释，则很容易明白这些方法是干什么的
   */
  reducers: {
    // 页面跳转行为
    toRegister(state, action) {
      return { ...state, register: true, res: action.res }
    },
    toPage(state) {
      return { ...state, register: false }
    },
    // 分页查询
    queryPageSuccess(state, { page = {
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      dataList: [],
    } }) {
      return { ...state, page, register: false }
    },
    // 根据 资格证 查询
    queryByQualificationNoSuccess(state, { driver }) {
      return { ...state, driver }
    },
    // 根据 新用户资格证 查询
    queryNewByQualificationNoSuccess(state, { newDriver }) {
      return { ...state, newDriver }
    },
    // 添加
    insertSuccess(state) {
      return { ...state }
    },
    // 添加页面
    toInsert(state, action) {
      return { ...state, register: true, res: action.res, insuranceState: action.insuranceState }
    },
    // 修改页面
    toEdit(state, action) {
      let registerFileList = []
      if (action.driver.registerRecord) {
        registerFileList = [{ uid: 0, url: UPLOAD_URL + action.driver.registerRecord + '?t=' + (new Date()).valueOf(), status: 'done' }]
      }
      let checkFileList = []
      if (action.driver.checkReport) {
        checkFileList = [{ uid: 0, url: UPLOAD_URL + action.driver.checkReport + '?t=' + (new Date()).valueOf(), status: 'done' }]
      }
      let noCriminalFileList = []
      if (action.driver.noCriminalRecord) {
        noCriminalFileList = [{ uid: 0, url: UPLOAD_URL + action.driver.noCriminalRecord + '?t=' + (new Date()).valueOf(), status: 'done' }]
      }
      let serviceFileList = []
      if (action.driver.serviceCommitment) {
        serviceFileList = [{ uid: 0, url: UPLOAD_URL + action.driver.serviceCommitment + '?t=' + (new Date()).valueOf(), status: 'done' }]
      }
      let insuranceFileList = []
      if (action.driver.insuranceCommitment) {
        insuranceFileList = [{ uid: 0, url: UPLOAD_URL + action.driver.insuranceCommitment + '?t=' + (new Date()).valueOf(), status: 'done' }]
      }
      let IDCardImgFileList = []
      if (action.driver.iDCardImg) {
        IDCardImgFileList = [{ uid: 0, url: UPLOAD_URL + action.driver.iDCardImg + '?t=' + (new Date()).valueOf(), status: 'done' }]
      }
      let safetyResponsibilityFileList = []
      if (action.driver.safetyResponsibility) {
        safetyResponsibilityFileList = [{ uid: 0, url: UPLOAD_URL + action.driver.safetyResponsibility + '?t=' + (new Date()).valueOf(), status: 'done' }]
      }

      return {
        ...state,
        register: true,
        res: action.res,
        driver: action.driver,
        insuranceState: action.driver.insurance,
        registerFileList,
        checkFileList,
        noCriminalFileList,
        serviceFileList,
        insuranceFileList,
        IDCardImgFileList,
        safetyResponsibilityFileList,
      }
    },
    // 选择保险
    insurance(state, action) {
      return { ...state, insuranceState: action.insuranceState }
    },
    cleanImage(state) {
      return { ...state,
        registerPreviewImage: '',
        checkPreviewImage: '',
        noCriminalPreviewImage: '',
        servicePreviewImage: '',
        insurancePreviewImage: '',
        IDCardImgPreviewImage: '',
        safetyResponsibilityPreviewImage: '' }
    },
    /* 入职登记表 上传图片 */
    registerChange(state, { registerFileList }) {
      return { ...state, registerFileList, registerPreviewImage: registerFileList.length ? registerFileList[0].response : '' }
    },
    /* 体检报告 上传图片 */
    checkChange(state, { checkFileList }) {
      return { ...state, checkFileList, checkPreviewImage: checkFileList.length ? checkFileList[0].response : '' }
    },
    /* 无犯罪记录证明 上传图片 */
    noCriminalChange(state, { noCriminalFileList }) {
      return { ...state, noCriminalFileList, noCriminalPreviewImage: noCriminalFileList.length ? noCriminalFileList[0].response : '' }
    },
    /* 优质服务承诺书 上传图片 */
    serviceChange(state, { serviceFileList }) {
      return { ...state, serviceFileList, servicePreviewImage: serviceFileList.length ? serviceFileList[0].response : '' }
    },
    /* 意外险自愿购买承诺书 上传图片 */
    insuranceChange(state, { insuranceFileList }) {
      return { ...state, insuranceFileList, insurancePreviewImage: insuranceFileList.length ? insuranceFileList[0].response : '' }
    },
    /* 身份证复印件 上传图片 */
    IDCardImgChange(state, { IDCardImgFileList }) {
      return { ...state, IDCardImgFileList, IDCardImgPreviewImage: IDCardImgFileList.length ? IDCardImgFileList[0].response : '' }
    },
    /* 安全责任书 上传图片 */
    safetyResponsibilityChange(state, { safetyResponsibilityFileList }) {
      return { ...state, safetyResponsibilityFileList, safetyResponsibilityPreviewImage: safetyResponsibilityFileList.length ? safetyResponsibilityFileList[0].response : '' }
    },
    // 预览图片
    lookPreview(state, { previewImage, previewVisible }) {
      return { ...state, previewImage, previewVisible }
    },
    // 删除图片
    unlookPreview(state) {
      return { ...state, previewVisible: false }
    },

  },

  /**
   * 异步方法，可以做如下东西：
   * loading,
   * 弹窗、提示
   * 请求服务器（可以连续请求不同方法）
   * 调用 reducers 里的方法
   * 操作 session storage、local storage 等等
   */
  effects: {

    * init({}, { tableBindType, formBindType }) {
      yield tableBindType({
      })

      yield formBindType({
      })
    },

    // 分页 查询
    * queryPage(playload, { get, put }) {
      const response = yield get(`${urlPrefix}/queryPage`, playload)
      yield put({ type: 'queryPageSuccess', page: response.result, register: false })
    },
    // 提醒 查询
    * warnList(playload, { get, put }) {
      const response = yield get(`${urlPrefix}/warnList`, playload)
      yield put({ type: 'queryPageSuccess', page: response.result, register: false })
    },
    // 资格证查询驾驶员信息
    * queryByQualificationNo({ qualificationNo }, { get, put }) {
      const response = yield get(`${urlPrefix}/queryByQualificationNo`, { qualificationNo })
      if (+response.code === 200) {
        yield put({ type: 'queryByQualificationNoSuccess', driver: response.result })
      }
    },
    // 资格证查询新驾驶员信息
    * queryNewByQualificationNo({ qualificationNo }, { get, put }) {
      const response = yield get(`${urlPrefix}/queryByQualificationNo`, { qualificationNo })
      if (+response.code === 200) {
        yield put({ type: 'queryNewByQualificationNoSuccess', newDriver: response.result })
      }
    },
    // 新增驾驶员
    * insert(playload, { post, put, select }) {
      if (!playload.insurance) {
        playload.insuranceCompany = ''
        playload.policyNo = ''
        playload.accidentInsuranceBeginDate = ''
        playload.accidentInsuranceEndDate = ''
      }
      if(playload.driverStatus === 'DIMISSION' && !playload.leaveDate) {
        ZMsg.error('离职状态请填写离职时间');
        return;
      }
      if(playload.driverStatus === 'WORKING' && playload.leaveDate) {
        ZMsg.error('在职状态不能填写离职时间');
        return;
      }
      const response = yield post(`${urlPrefix}/insert`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.driverStore.page)
        yield put({ type: 'insertSuccess' })
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    // 修改 驾驶员
    * update(playload, { post, put, select }) {
      if (!playload.insurance) {
        playload.insuranceCompany = ''
        playload.policyNo = ''
        playload.accidentInsuranceBeginDate = ''
        playload.accidentInsuranceEndDate = ''
      }
      if(playload.driverStatus === 'DIMISSION' && !playload.leaveDate) {
        ZMsg.error('离职状态请填写离职时间');
        return;
      }
      if(playload.driverStatus === 'WORKING' && playload.leaveDate) {
        ZMsg.error('在职状态不能填写离职时间');
        return;
      }
      const response = yield post(`${urlPrefix}/update`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.driverStore.page)
        yield put({ type: 'insertSuccess' })
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },
    // 修改 驾驶员图片
    * updateImg(playload, { post, put, select }) {
      const response = yield post(`${urlPrefix}/updateImg`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.driverStore.page)
        yield put({ type: 'cleanImage' })
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },

    // 删除驾驶员
    * deleteById({ id }, { get, put, select }) {
      const response = yield get(`${urlPrefix}/deleteById`, id)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.driverStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },

  },


  /**
   * 订阅：如果需要一进页面就进行数据查询，在这里完成
   * 如果想监听用户键盘操作，也在这里完成
   */
  subscriptions: {
    setup({ dispatch, listen }) {
      listen({
        [`/${prefix}`]: () => {
          dispatch({
            type: 'queryPage',
            pageNo: 1,
            pageSize: 10,
          })
        },
        '/archives': ({ query }) => {
          let option = { type: 'queryPage' }
          dispatch({ ...option, ...query })
        },
      })
    },
  },

})

