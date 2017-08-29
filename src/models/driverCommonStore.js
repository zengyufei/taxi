import { extend } from 'ModelUtils'

const prefix = 'driverCommon'

export default extend({
  namespace: `${prefix}Store`,
  state: {
    // 运载的 从业资格证编号 信息
    qualificationNos: [],
    // 运载的 车辆自编号 信息
    carNos: [],
    // 运载的 人员 信息
    driver: [],
    drivers: [],
    visible: false,
    // datepicker 控件 开始结束时间
    startValue: null,
    endValue: null,
  },
  effects: {
    // 模糊查询 从业资格证编号
    * queryLikeQualificationNo({ str }, { post, put }) {
      const response = yield post('/common/queryLikeQualificationNo', {str: str})
      yield put({ type: 'queryLikeQualificationNoSuccess', qualificationNos: response })
    },
    // 模糊查询 车辆自编号
    * queryLikeCarNo({ str }, { post, put }) {
      const response = yield post('/common/queryLikeCarNo', {str: str})
      yield put({ type: 'queryLikeCarNoSuccess', carNos: response })
    },
    // 根据车辆自编号 查询 在职人员
    * queryDriverListByOption({ carNo }, { post, put }) {
      const response = yield post('/common/queryDriverListByOption', {carNo: carNo})
      if (response.length === 0) {
        ZMsg.success('该车辆没有在职人员使用')
      } else {
        yield put({ type: 'queryDriverListByOptionSuccess', drivers: response })
      }
    },
    // 人员选择 弹出
    * onCancel({ visible, drivers }, { put }) {
      yield put({ type: 'onCancelSuccess', visible, drivers })
    },
    // 获取driver
    * queryDriver({ drivers, driver, index }, { put }) {
      driver = drivers[index]
      yield put({ type: 'queryDriverSuccess', driver })
    },
  },
  reducers: {
    // 模糊查询 从业资格证编号
    queryLikeQualificationNoSuccess(state, { qualificationNos }) {
      return { ...state, qualificationNos }
    },
    // 模糊查询 车辆自编号
    queryLikeCarNoSuccess(state, { carNos }) {
      return { ...state, carNos }
    },
    // 自编号 查询 在职人员
    queryDriverListByOptionSuccess(state, { drivers }) {
      return { ...state, drivers }
    },
    onCancelSuccess(state, { visible, drivers }) {
      return { ...state, visible, drivers }
    },
    queryDriverSuccess(state, { driver }) {
      return { ...state, driver }
    },
    /** 自定义日期范围选择  start */
    onStartChange(state, action) {
      return { ...state, startValue: action.startValue }
    },
    onEndChange(state, action) {
      return { ...state, endValue: action.endValue }
    },
    /** 自定义日期范围选择  end */
  },
  subscriptions: {
  },
})

