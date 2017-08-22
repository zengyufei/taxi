import { queryPage, insert, update, updateNotNull, deleteById } from 'services/car/maintainService';
import { Modal } from 'antd';

export default {

  namespace: 'maintainStore',

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
    res: 'maintain',

    maintainList: [],
  },

  reducers: {
    queryPageSuccess(state, { page = {
      pageNo: 0,
      pageSize: 10,
      totalCount: 0,
      dataList: [],
    } }) {
      return { ...state, page, pageState: false };
    },

    // 异步跳转页面
    toAdd(state, action) {
      return { ...state, pageState: true, res: action.res, maintainList: [], maintainImage: '' };
    },
    toInfo(state, action) {
      let maintainList = [];
      if (action.maintain.maintainImage != null) {
        maintainList = [{ uid: 0, url: UPLOADPATH + action.maintain.maintainImage, status: 'done' }];
      }
      let plateList = [];
      if (action.maintain.plateImage != null) {
        plateList = [{ uid: 0, url: UPLOADPATH + action.maintain.plateImage, status: 'done' }];
      }
      return { ...state, pageState: true, res: action.res, maintain: action.maintain, maintainList, plateList };
    },
    toUpdate(state, action) {
      let maintainList = [];
      if (action.maintain.maintainImage != null) {
        maintainList = [{ uid: 0, url: UPLOADPATH + action.maintain.maintainImage, status: 'done' }];
      }
      let plateList = [];
      if (action.maintain.plateImage != null) {
        plateList = [{ uid: 0, url: UPLOADPATH + action.maintain.plateImage, status: 'done' }];
      }
      return { ...state, pageState: true, res: action.res, maintain: action.maintain, maintainList, maintainImage: '', plateList };
    },
    toPage(state, { dataSource }) {
      return { ...state, dataSource, pageState: false };
    },

    maintainChange(state, { maintainList }) {
      return { ...state, maintainList, maintainImage: maintainList.length >= 1 ? maintainList[0].response : '' };
    },
    lookPreview(state, { previewImage, previewVisible }) {
      return { ...state, previewImage, previewVisible };
    },
    unlookPreview(state) {
      return { ...state, previewVisible: false };
    },

  },

  effects: {
    /**
     * 获取用户列表分页
     * @param playload 包含 pageNo pageSize account mobile roleId
     */
    *queryPage(playload, {call, put}) {  // eslint-disable-line
      const response = yield call(queryPage, { ...playload });
      yield put({ type: 'queryPageSuccess', page: response.result, pageState: false });
    },
    *exportMaintain({ playload }, { call, put }) {
      const response = yield call(exportMaintain, { ...playload });
    },

    // 新增
    *insert(playload, { call, put, select }) {
      const response = yield call(insert, { ...playload });
      if (+response.code === 200) {
        ZMsg.success(response.msg);
        const page = yield select(state => state.maintainStore.page);
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize });
      } else {
        Modal.info({
          title: '温馨提示',
          content: (
            response.msg
          ),
        });
      }
    },
    // 修改
    *updateNotNull(playload, { call, put, select }) {
      const response = yield call(updateNotNull, { ...playload });
      if (+response.code === 200) {
        ZMsg.success(response.msg);
        const page = yield select(state => state.maintainStore.page);
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize });
      } else {
        Modal.info({
          title: '温馨提示',
          content: (
            response.msg
          ),
        });
      }
    },
    // 删除
    *deleteById({ id }, { call, put, select }) {
      const response = yield call(deleteById, id);
      if (+response.code == 200) {
        ZMsg.success(response.msg);
        const page = yield select(state => state.maintainStore.page);
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize });
      } else { ZMsg.error(response.msg); }
    },

  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/maintain') {
          dispatch({
            type: 'queryPage',
            pageNo: 1,
            pageSize: 10,
          });
        }
      });
    },
  },


};
