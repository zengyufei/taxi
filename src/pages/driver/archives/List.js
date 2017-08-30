import { connect } from 'dva'
import { Form, Button, Table } from 'antd'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'

import Update from './Update'
import Detail from './Detail'

let index = option => {
  const { loading, page, methods, form, res, register } = option
  const { onSearch, toDetail, toEdit, onShowSizeChange, onChange,
    accidentring, accident, licensering, license,
    labourring, labour, managering, manage } = methods


  const btns = (
    <div>
      <Button type="primary" icon="clock-circle-o" onClick={accidentring}>保险即将到期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={accident}>保险已到期</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={licensering}>驾驶证即将到期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={license}>驾驶证已到期</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={labourring}>劳动合同即将到期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={labour}>劳动合同已到期</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={managering}>经营合同即将到期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={manage}>经营合同已到期</Button>&nbsp;
    </div>
  )
  const searchFieldPick = ['carNo', 'plateNumber', 'userName', 'qualificationNo', 'identity', 'job', 'driverStatus', 'sex', 'politics', 'insurance']
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'archives_condin',
    searchFields: getSearchFields(fields, searchFieldPick).values(),
    fields: getFields(fields, local.get('archives_condin') || ['carNo', 'plateNumber', 'userName', 'qualificationNo', 'identity', 'job']).values(),
    item: {
    },
    onSearch,
    onReset: onSearch,
  }

  const operatorColumn = [{
    key: 'operator',
    name: '操作',
    // 扩展字段的render支持自定义渲染
    render: (text, record) => {
      return (
        <span>
          <ZButton permission="driver:driver:query">
            <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
          </ZButton>
          <ZButton permission="driver:archives:update">
            <Button type="primary" onClick={() => toEdit(record)}>编辑</Button>&nbsp;
          </ZButton>
        </span>
      )
    },
  }]
  const tableColumns = getColumns(fields, ['carNo', 'plateNumber', 'userName', 'qualificationNo', 'job']).enhance(operatorColumn).values()

  let a
  if (res === 'update') {
    a = <Update key="update" />
  } else if (res === 'detail') {
    a = <Detail key="detail" />
  }

  return (
    <div>
      {
        register ? a : <div>
          <div style={{ padding: '20px' }}>
            <ZSearch {...searchBarProps} />
          </div>

          <Table
            rowKey="id"
            dataSource={(page && page.dataList) || []}
            columns={tableColumns}
            loading={loading}
            bordered
            pagination={{ // 分页
              current: (page && +page.pageNo),
              total: (page && +page.totalCount) || 0, // 总数量
              pageSize: (page && +page.pageSize) || 10, // 显示几条一页
              defaultPageSize: 10, // 默认显示几条一页
              showSizeChanger: true, // 是否显示可以设置几条一页的选项
              onShowSizeChange,
              onChange,
              showTotal() { // 设置显示一共几条数据
                return `共 ${(page && page.totalCount) || 0} 条数据`
              },
            }}
          />
        </div>
      }
    </div>
  )
}

const mapStateToProps = ({ loading, driverStore }) => {
  return {
    loading: loading.models.driverStore,
    register: driverStore.register,
    res: driverStore.res,
    page: driverStore.page,
  }
}


const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      onSearch(values) {
        dispatch({
          type: 'driverStore/queryPage',
          ...values,
        })
      },

      /* 详情 */
      toDetail(commonPraise) {
        dispatch({
          type: 'driverStore/toEdit',
          res: 'detail',
          driver: commonPraise,
        })
      },
      /* 编辑 */
      toEdit(commonPraise) {
        dispatch({
          type: 'driverStore/toEdit',
          res: 'update',
          driver: commonPraise,
        })
      },

      /**
       * 条件查询
       */
      query(e) {
        e.preventDefault()
        form.validateFields((err, values) => {
          dispatch({
            type: 'driverStore/queryPage',
            ...values,
          })
        })
      },
      /** 即将到期和已到期 */
      accidentring () {
        dispatch({
          type: 'driverStore/queryPage',
          insurance: '1',
          accidentInsuranceEndDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      accident() {
        dispatch({
          type: 'driverStore/queryPage',
          insurance: '1',
          accidentInsuranceEndDate: moment().format('YYYY-MM-DD'),
        })
      },
      licensering() {
        dispatch({
          type: 'driverStore/queryPage',
          licenseEndDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      license() {
        dispatch({
          type: 'driverStore/queryPage',
          licenseEndDate: moment().format('YYYY-MM-DD'),
        })
      },
      labourring() {
        dispatch({
          type: 'driverStore/queryPage',
          labourContractEndDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      labour() {
        dispatch({
          type: 'driverStore/queryPage',
          labourContractEndDate: moment().format('YYYY-MM-DD'),
        })
      },
      managering () {
        dispatch({
          type: 'driverStore/queryPage',
          manageContractEndDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      manage () {
        dispatch({
          type: 'driverStore/queryPage',
          manageContractEndDate: moment().format('YYYY-MM-DD'),
        })
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'driverStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'driverStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

    },
  }
}


const fields = [{
  name: '自编号',
  key: 'carNo',
}, {
  name: '车牌号',
  key: 'plateNumber',
}, {
  name: '姓名',
  key: 'userName',
}, {
  name: '资格证',
  key: 'qualificationNo',
}, {
  name: '身份证',
  key: 'identity',
}, {
  name: '岗位',
  key: 'job',
  enums: {
    MASTER_CLASS: '主班',
    DEPUTY_CLASS: '副班',
    FLEXIBLE_CLASS: '机动班',
  },
}, {
  name: '状态',
  key: 'driverStatus',
  enums: {
    WORKING: '在职',
    DIMISSION: '离职',
  },
}, {
  name: '性别',
  key: 'sex',
  enums: {
    male: '男',
    female: '女',
  },
}, {
  name: '政治面貌',
  key: 'politics',
  enums: {
    MASSES: '群众',
    LEAGUE: '团员',
    PARTY: '党员',
  },
}, {
  name: '保险',
  key: 'insurance',
  enums: {
    true: '是',
    false: '否',
  },
}]

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(index))
