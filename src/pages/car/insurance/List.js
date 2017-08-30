/*
 * @Author: zengyufei
 * @Date: 2017-08-23 15:40:58
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 14:05:38
 */
import { connect } from 'dva'
import { Form, Button, Table, Popconfirm, Upload, Modal } from 'antd'
import qs from 'qs'
import moment from 'moment'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'
import { local } from 'utils/storage'

import Add from './Add.js'
import Update from './Update.js'
import Info from './Info.js'

const { tokenSessionKey } = constant

let List = option => {
  const { loading, form, page, methods, res, pageState } = option
  const { toAdd, toEdit, toInfo, exportInsurance, onShowSizeChange, onChange, handlerUpload, onSearch
    , insuranceBusinessing, insuranceBusiness, insuranceForceing, insuranceForce } = methods

  /**
   * 导入文件
   */
  const importInsurance = {
    name: 'file',
    action: `${BASE_URL}/insurance/import.htm?token=${session.get(tokenSessionKey)}`,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log('uploading')
      }
      if (info.file.status === 'done') {
        // console.log(`${info.file.name} file uploaded successfully`);
        console.log(info)
        Modal.info({
          title: '导入结果',
          content: (
            info.file.response.msg
          ),
          onOk: handlerUpload,
        })
      } else if (info.file.status === 'error') {
        console.log('error')
      }
    },
  }

  const btns = (
    <div>
      <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={insuranceForceing}>交强险即将过期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={insuranceForce}>交强险已过期</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={insuranceBusinessing}>商业险即将过期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={insuranceBusiness}>商业险已过期</Button>&nbsp;
      <Popconfirm title="是否确定要导出" onConfirm={exportInsurance} >
        <Button type="primary" icon="export" >导出</Button>&nbsp;
      </Popconfirm>
      <Upload {...importInsurance}>
        <Button type="primary" icon="download" >导入</Button>
      </Upload>
    </div>
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'insurance_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber', 'insuranceType', 'insuranceCompany', 'policyNo']).values(),
    fields: getFields(fields, local.get('insurance_condin') || ['carNo', 'plateNumber', 'insuranceType', 'insuranceCompany', 'policyNo']).values(),
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
          <Button type="primary" onClick={() => toInfo(record)} >详情</Button>&nbsp;
          <Button type="primary" onClick={() => toEdit(record)} >编辑</Button>&nbsp;
        </span>
      )
    },
  }]
  const tableColumns = getColumns(fields).enhance(operatorColumn).values()

  let pageSwitch
  if (res === 'Add') {
    pageSwitch = <Add key="Add" />
  } else if (res === 'Update') {
    pageSwitch = <Update key="Update" />
  } else if (res === 'Info') {
    pageSwitch = <Info key="Info" />
  }

  return (
    <div>
      {
        pageState ? pageSwitch : <div>
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

function mapStateToProps({ loading, insuranceStore }) {
  return {
    loading: loading.models.insuranceStore,
    UPLOAD_URL: insuranceStore.UPLOAD_URL,
    page: insuranceStore.page,
    pageState: insuranceStore.pageState,
    res: insuranceStore.res,
  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      queryPage() {
        dispatch({
          type: 'insuranceStore/queryPage',
          carNo: form.getFieldValue('carNo'),
          plateNumber: form.getFieldValue('plateNumber'),
          insuranceType: form.getFieldValue('insuranceType'),
          insuranceCompany: form.getFieldValue('insuranceCompany'),
          insuranceName: form.getFieldValue('insuranceName'),
          policyNo: form.getFieldValue('policyNo'),
        })
      },
      /** 即将到期和已到期 */
      insuranceForceing() {
        dispatch({
          type: 'insuranceStore/warnList',
          warningEnum: 'insuranceForceDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      insuranceForce() {
        dispatch({
          type: 'insuranceStore/warnList',
          warningEnum: 'insuranceForceDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },
      insuranceBusinessing() {
        dispatch({
          type: 'insuranceStore/warnList',
          warningEnum: 'insuranceBusinessDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      insuranceBusiness() {
        dispatch({
          type: 'insuranceStore/warnList',
          warningEnum: 'insuranceBusinessDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },

      toAdd() {
        dispatch({
          type: 'carStore/setCarNull',
        })
        dispatch({
          type: 'insuranceStore/toAdd',
          res: 'Add',
        })
      },

      toEdit(insurance) {
        dispatch({
          insurance,
          UPLOAD_URL,
          type: 'insuranceStore/toEdit',
          res: 'Update',
        })
      },

      toInfo(insurance) {
        dispatch({
          insurance,
          UPLOAD_URL,
          type: 'insuranceStore/toInfo',
          res: 'Info',
        })
      },

      exportInsurance() {
        const params = {
          carNo: form.getFieldValue('carNo'),
          plateNumber: form.getFieldValue('plateNumber'),
          insuranceType: form.getFieldValue('insuranceType'),
          insuranceCompany: form.getFieldValue('insuranceCompany'),
          insuranceName: form.getFieldValue('insuranceName'),
          policyNo: form.getFieldValue('policyNo'),
        }
        // 删除空值、undefind
        Object.keys(params).map(v => params[v] || delete params[v])
        const paramsForGet = (params && qs.stringify(params)) || ''
        window.location.href = `${BASE_URL}/insurance/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onSearch(values) {
        dispatch({
          type: 'insuranceStore/queryPage',
          ...values,
          pageNo: 1,
          pageSize: 10,
        })
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'insuranceStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },
      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'insuranceStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      handlerUpload() {
        dispatch({
          type: 'insuranceStore/queryPage',
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
  name: '保险类型',
  key: 'insuranceType',
  enums: {
    TRAFFIC: '交通强制险',
    BUSINESS: '商业保险',
  },
}, {
  name: '保险公司',
  key: 'insuranceCompany',
}, {
  name: '保险单号',
  key: 'policyNo',
}, {
  name: '保险金额',
  key: 'insuranceMoney',
}, {
  name: '保险生效时间',
  key: 'insuranceBuyDate',
}, {
  name: '保险到期时间',
  key: 'insuranceExpireDate',
}]


export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(List))
