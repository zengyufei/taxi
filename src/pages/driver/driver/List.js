import { connect } from 'dva'
import { Form, Button, Popconfirm, Table, Upload, Modal } from 'antd'
import qs from 'qs'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'

import Add from './Add'
import Update from './Update'
import Detail from './Detail'

const { tokenSessionKey } = constant

let index = option => {
  const { loading, page, methods, form, res, register } = option
  const { onSearch, toDetail, toAdd, toEdit, toExport, onShowSizeChange, onChange, handlerUpload, accidentring, accident, license, licensering, labourring, labour, managering, manage } = methods


  /**
   * 上传文件

   */
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/driver/driver/import.htm?token=${session.get(tokenSessionKey)}`,
    onChange: handlerUpload,
  }

  const btns = (
    <div style={{ marginTop: '-30px' }}>
      <div style={{ marginBottom: '3px' }}>
        <Button type="primary" icon="clock-circle-o" onClick={labourring}>劳动合同即将到期</Button>&nbsp;
        <Button type="primary" icon="close-circle-o" onClick={labour}>劳动合同已到期</Button>&nbsp;
        <Button type="primary" icon="clock-circle-o" onClick={managering}>经营合同即将到期</Button>&nbsp;
        <Button type="primary" icon="close-circle-o" onClick={manage}>经营合同已到期</Button>&nbsp;
      </div>
      <div style={{ marginBottom: '3px' }}>
        <ZButton permission="driver:driver:insert">
          <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
        </ZButton>
        <ZButton permission="driver:driver:export">
          <Popconfirm title="是否确定要导出" onConfirm={toExport} >
            <Button type="primary" icon="export" >导出</Button>&nbsp;
          </Popconfirm>
        </ZButton>
        <ZButton permission="driver:driver:import">
          <Upload {...importCar}>
            <Button type="primary" icon="download" >导入</Button>
          </Upload>
        </ZButton>
        <Button type="primary" icon="clock-circle-o" onClick={accidentring}>保险即将到期</Button>&nbsp;
        <Button type="primary" icon="close-circle-o" onClick={accident}>保险已到期</Button>&nbsp;
        <Button type="primary" icon="clock-circle-o" onClick={licensering}>驾驶证即将到期</Button>&nbsp;
        <Button type="primary" icon="close-circle-o" onClick={license}>驾驶证已到期</Button>&nbsp;
      </div>
    </div>
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'driver_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber', 'userName', 'qualificationNo', 'identity', 'job', 'driverStatus', 'sex', 'politics', 'insurance', 'entryDate', 'leaveDate']).values(),
    fields: getFields(fields, local.get('driver_condin') || ['carNo', 'plateNumber']).values(),
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
          <ZButton permission="driver:driver:update">
            <Button type="primary" onClick={() => toEdit(record)}>编辑</Button>&nbsp;
          </ZButton>
        </span>
      )
    },
  }]
  const tableColumns = getColumns(fields).enhance(operatorColumn).values()


  let a
  if (res === 'add') {
    a = <Add key="add" />
  } else if (res === 'update') {
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

const mapStateToProps = ({ loading, driverStore, driverCommonStore }) => {
  return {
    loading: loading.models.driverStore,
    register: driverStore.register,
    res: driverStore.res,
    page: driverStore.page,
    areacodes: driverCommonStore.areacodes,
  }
}


const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      onSearch(values) {
        if (values) {
          if (values.entryDate) {
            values.entryStartDate = moment(new Date(values.entryDate)).format('YYYY-MM-DD')
            values.entryEndDate = moment(new Date(values.entryDate)).format('YYYY-MM-DD')
          }
          if (values.leaveDate) {
            values.leaveStartDate = moment(new Date(values.leaveDate)).format('YYYY-MM-DD')
            values.leaveEndDate = moment(new Date(values.leaveDate)).format('YYYY-MM-DD')
          }
        }
        dispatch({
          type: 'driverStore/queryPage',
          ...values,
        })
      },

      /* 详情 */
      toDetail(driver) {
        dispatch({
          type: 'driverStore/toEdit',
          res: 'detail',
          driver,
        })
      },
      /* 添加 */
      toAdd() {
        dispatch({
          type: 'driverStore/toInsert',
          res: 'add',
          insuranceState: true,
        })
      },
      /* 编辑 */
      toEdit(driver) {
        dispatch({
          type: 'driverStore/toEdit',
          res: 'update',
          driver,
        })
      },


      /* 导出 */
      toExport() {
        const carNo = form.getFieldValue('carNo')
        const plateNumber = form.getFieldValue('plateNumber')
        const job = form.getFieldValue('job')
        const insurance = form.getFieldValue('insurance')
        const params = {
          carNo,
          plateNumber,
          job,
          insurance,
        }
        // 删除空值、undefind
        Object.keys(params).map(v => params[v] || delete params[v])
        const paramsForGet = (params && qs.stringify(params)) || ''
        window.location.href = `${BASE_URL}/driver/driver/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      /** 即将到期和已到期 */
      accidentring () {
        dispatch({
          type: 'driverStore/warnList',
          warningEnum: 'accidentInsuranceEndDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      accident () {
        dispatch({
          type: 'driverStore/warnList',
          warningEnum: 'accidentInsuranceEndDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },
      licensering () {
        dispatch({
          type: 'driverStore/warnList',
          warningEnum: 'licenseEndDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      license () {
        dispatch({
          type: 'driverStore/warnList',
          warningEnum: 'licenseEndDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },
      labourring () {
        dispatch({
          type: 'driverStore/warnList',
          warningEnum: 'labourContractEndDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      labour () {
        dispatch({
          type: 'driverStore/warnList',
          warningEnum: 'labourContractEndDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },
      managering () {
        dispatch({
          type: 'driverStore/warnList',
          warningEnum: 'manageContractEndDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      manage () {
        dispatch({
          type: 'driverStore/warnList',
          warningEnum: 'manageContractEndDate',
          endDate: moment().format('YYYY-MM-DD'),
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


      handlerUpload(info) {
        if (info.file.status !== 'uploading') {
          console.log('uploading')
        }
        if (info.file.status === 'done') {
          // console.log(`${info.file.name} file uploaded successfully`);
          console.log(info)
          Modal.info({
            name: '导入结果',
            content: (
              info.file.response.msg
            ),
            onOk() {
              dispatch({
                type: 'driverStore/queryPage',
              })
            },
          })
        } else if (info.file.status === 'error') {
          console.log('error')
        }
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
  name: '性别',
  key: 'sex',
  enums: {
    male: '男',
    female: '女',
  },
}, {
  name: '状态',
  key: 'driverStatus',
  enums: {
    WORKING: '在职',
    DIMISSION: '离职',
  },
}, {
  name: '岗位',
  key: 'job',
  enums: {
    MASTER_CLASS: '主班',
    DEPUTY_CLASS: '副班',
    FLEXIBLE_CLASS: '机动班',
  },
}, {
  name: '资格证',
  key: 'qualificationNo',
}, {
  name: '电话',
  key: 'mobile',
}, {
  name: '身份证',
  key: 'identity',
}, {
  name: '年龄',
  key: 'age',
}, {
  name: '入职日期',
  key: 'entryDate',
  type: 'date',
}, {
  name: '离职日期',
  key: 'leaveDate',
  type: 'date',
}, {
  name: '保险到期日期',
  key: 'accidentInsuranceEndDate',
}, {
  name: '驾驶证到期日期',
  key: 'licenseEndDate',
}, {
  name: '劳动合同到期日期',
  key: 'labourContractEndDate',
}, {
  name: '经营合同到期日期',
  key: 'manageContractEndDate',
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
