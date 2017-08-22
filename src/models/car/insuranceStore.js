import { queryPage, insert, update, updateNotNull, deleteById } from 'services/car/insuranceService';
import { Modal } from 'antd';

export default {

  namespace: 'insuranceStore',

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
      return { ...state, page, pageState: false };
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
      };
    },
    toEdit(state, action) {
      let insuranceList = [];
      if (action.insurance.insuranceFile != null) {
        insuranceList = [{ uid: 0, url: UPLOADPATH + action.insurance.insuranceFile, status: 'done' }];
      }
      let plateList = [];
      if (action.insurance.plateImage != null) {
        plateList = [{ uid: 0, url: UPLOADPATH + action.insurance.plateImage, status: 'done' }];
      }
      return { ...state,
        pageState: true,
        res: action.res,
        insurance: action.insurance,
        insuranceList,
        insuranceFile: '',
        plateList };
    },
    toInfo(state, action) {
      let insuranceList = [];
      if (action.insurance.insuranceFile != null) {
        insuranceList = [{ uid: 0, url: UPLOADPATH + action.insurance.insuranceFile, status: 'done' }];
      }
      let plateList = [];
      if (action.insurance.plateImage != null) {
        plateList = [{ uid: 0, url: UPLOADPATH + action.insurance.plateImage, status: 'done' }];
      }
      return { ...state,
        pageState: true,
        res: action.res,
        insurance: action.insurance,
        insuranceList,
        plateList };
    },
    traffic(state, actioin) {
      return { ...state, trafficState: actioin.trafficState };
    },
    business(state, actioin) {
      return { ...state, businessState: actioin.businessState };
    },

    insuranceChange(state, { insuranceList }) {
      return { ...state, insuranceList, insuranceFile: insuranceList.length >= 1 ? insuranceList[0].response : '' };
    },
    businessInsuranceChange(state, { businessInsuranceList }) {
      return { ...state, businessInsuranceList, businessInsuranceFile: businessInsuranceList.length >= 1 ? businessInsuranceList[0].response : '' };
    },
    trafficInsuranceChange(state, { trafficInsuranceList }) {
      return { ...state, trafficInsuranceList, trafficInsuranceFile: trafficInsuranceList.length >= 1 ? trafficInsuranceList[0].response : '' };
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
    *exportInsurance(playload, { call, put }) {
      const response = yield call(exportInsurance, { ...playload });
      yield put({ type: 'exportInsuranceSuccess' });
    },
    *importInsurance(playload, { call, put }) {
      const response = yield call(importInsurance, { ...playload });
      yield put({ type: 'importInsuranceSuccess' });
    },
    // 新增
    *insert(playload, { call, put, select }) {
      const insurances = { ...playload };
      let insertState = true;
      if (insurances.trafficBoolean) {
        const insurance = {
          plateImage: insurances.plateImage,
          carNo: insurances.carNo,
          plateNumber: insurances.plateNumber,
          carId: insurances.carId,
          insuranceType: 'TRAFFIC',
          insuranceName: insurances.trafficInsuranceName,
          insuranceCompany: insurances.trafficInsuranceCompany,
          policyNo: insurances.trafficPolicyNo,
          insuranceMoney: insurances.trafficInsuranceMoney,
          insuranceBuyDate: insurances.trafficInsuranceBuyDate,
          insuranceExpireDate: insurances.trafficInsuranceExpireDate,
          insuranceFile: insurances.trafficInsuranceFile,
        };
        const response = yield call(insert, insurance);
        if (+response.code !== 200) {
          insertState = false;
          Modal.info({
            title: '温馨提示',
            content: (
              `交强险：${response.msg}`
            ),
          });
          return;
        }
        ZMsg.info(`交强险：${response.msg}`);
      }
      if (insurances.businessBoolean) {
        const insurance = {
          plateImage: insurances.plateImage,
          carNo: insurances.carNo,
          plateNumber: insurances.plateNumber,
          carId: insurances.carId,
          insuranceType: 'BUSINESS',
          insuranceName: insurances.businessInsuranceName,
          insuranceCompany: insurances.businessInsuranceCompany,
          policyNo: insurances.businessPolicyNo,
          insuranceMoney: insurances.businessInsuranceMoney,
          insuranceBuyDate: insurances.businessInsuranceBuyDate,
          insuranceExpireDate: insurances.businessInsuranceExpireDate,
          insuranceFile: insurances.businessInsuranceFile,
        };
        const response = yield call(insert, insurance);
        if (+response.code !== 200) {
          insertState = false;
          Modal.info({
            title: '温馨提示',
            content: (
              `商业险：${response.msg}`
            ),
          });
          return;
        }
        ZMsg.info(`商业险：${response.msg}`);
      }
      if (insertState) {
        const page = yield select(state => state.insuranceStore.page);
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize });
      }
    },
    // 修改
    *updateNotNull(playload, { call, put, select }) {
      const response = yield call(updateNotNull, { ...playload });
      if (+response.code === 200) {
        ZMsg.success(response.msg);
        const page = yield select(state => state.insuranceStore.page);
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
        const page = yield select(state => state.insuranceStore.page);
        yield put({ type: 'queryPage', pageNo: page.pageNo, pageSize: page.pageSize });
      } else { ZMsg.error(response.msg); }
    },

  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/insurance') {
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
