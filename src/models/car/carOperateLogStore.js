import { queryPage, insert, update, deleteById, updateNotNull } from 'services/car/carOperateLogService';
import { Modal } from 'antd';

export default {

  namespace: 'carOperateLogStore',

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
    res: 'carOperateLog',
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
      return { ...state, pageState: true, res: action.res };
    },
    toEdit(state, action) {
      let plateList = [];
      if (action.carOperateLog.plateImage != null) {
        plateList = [{ uid: 0, url: UPLOADPATH + action.carOperateLog.plateImage, status: 'done' }];
      }
      return { ...state, pageState: true, res: action.res, carOperateLog: action.carOperateLog, plateList };
    },
    toInfo(state, action) {
      let plateList = [];
      if (action.carOperateLog.plateImage != null) {
        plateList = [{ uid: 0, url: UPLOADPATH + action.carOperateLog.plateImage, status: 'done' }];
      }
      return { ...state, pageState: true, res: action.res, carOperateLog: action.carOperateLog, plateList };
    },

    lookPreview(state, { previewImage, previewVisible }) {
      return { ...state, previewImage, previewVisible };
    },
    unlookPreview(state) {
      return { ...state, previewVisible: false };
    },

  },

  effects: {
    *queryPage(playload, {call, put}) {  // eslint-disable-line
      const response = yield call(queryPage, { ...playload });
      yield put({ type: 'queryPageSuccess', page: response.result, pageState: false });
    },
    *exportCarOperateLog(playload, { call, put }) {
      const response = yield call(exportCarOperateLog, { ...playload });
      yield put({ type: 'exportCarOperateLogSuccess' });
    },
    *importCarOperateLog(playload, { call, put }) {
      const response = yield call(importCarOperateLog, { ...playload });
      yield put({ type: 'importCarOperateLogSuccess' });
    },
    *insert(playload, { call, put, select }) {
      const response = yield call(insert, { ...playload });
      if (+response.code === 200) {
        ZMsg.success(response.msg);
        const page = yield select(state => state.carOperateLogStore.page);
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
    *updateNotNull(playload, { call, put, select }) {
      const response = yield call(updateNotNull, { ...playload });
      if (+response.code === 200) {
        ZMsg.success(response.msg);
        const page = yield select(state => state.carOperateLogStore.page);
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
    *deleteById({ id }, { call, put, select }) {
      const response = yield call(deleteById, id);
      if (+response.code === 200) {
        ZMsg.success(response.msg);
        const page = yield select(state => state.carOperateLogStore.page);
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize });
      } else {
        ZMsg.success(response.msg);
      }
    },

  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/carOperateLog') {
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
