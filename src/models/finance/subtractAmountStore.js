import { extend } from 'ModelUtils'

const prefix = 'subtractAmount'


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

    // 运载的核减金额明细信息
    subtractAmount: {},
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
    // 添加
    insertSuccess(state) {
      return { ...state }
    },
    // 修改页面
    toEdit(state, action) {
      return { ...state, register: true, res: action.res, subtractAmount: action.subtractAmount }
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
      const response = yield get(`${prefix}/queryPage`, playload)
      yield put({ type: 'queryPageSuccess', page: response.result, register: false })
    },
    // 新增核减金额明细
    * insert(playload, { post, put }) {
      const response = yield post(`${prefix}/insert`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        yield put({ type: 'insertSuccess' })
        yield put({ type: 'queryPage' })
      } else { ZMsg.error(response.msg) }
    },
    // 修改 核减金额明细 页面
    * update(playload, { post, put, select }) {
      const response = yield post(`${prefix}/update`, playload)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.securityDepositStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      }
    },

    // 删除核减金额明细
    * deleteById({ id }, { get, put, select }) {
      const response = yield get(`${prefix}/deleteById`, id)
      if (+response.code === 200) {
        ZMsg.success(response.msg)
        const page = yield select(state => state.securityDepositStore.page)
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize })
      } else { ZMsg.error(response.msg) }
    },

  },


  /**
   * 订阅：如果需要一进页面就进行数据查询，在这里完成
   * 如果想监听用户键盘操作，也在这里完成
   */
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

