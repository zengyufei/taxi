/*
 * @Author: zengyufei
 * @Date: 2017-08-22 17:50:34
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-31 15:52:52
 */
import { connect } from 'dva'
import { Form, Button, Table, Popconfirm, Upload, Modal } from 'antd'
import qs from 'qs'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'

import Add from './Add.js'
import Update from './Update.js'
import Info from './Info.js'

const { tokenSessionKey } = constant

const List = options => {
  const { loading, form, page, methods, res, pageState } = options
  const { onSearch, toAdd, toEdit, toInfo, exportAnnualVerification, onShowSizeChange, onChange, handlerUpload
    , synthesizeing, synthesize, drivingLicenseing, drivingLicense, taximetering, taximeter } = methods

  /**
   * 导入文件
   */
  const importAnnualVerification = {
    name: 'file',
    action: `${BASE_URL}/annualVerification/import.htm?token=${session.get(tokenSessionKey)}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log('uploading')
      }
      if (info.file.status === 'done') {
        // console.log(`${info.file.name} file uploaded successfully`);
        Modal.info({
          title: '导入结果',
          content: (
            info.file.response.msg
          ),
          onOk: handlerUpload,
        })
      } else if (info.file.status === 'error') {
        Modal.error({
          title: '上传失败',
          content: (
            info.file.response.msg
          ),
        })
      }
    },
  }


  const btns = (
    <div>
      <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={synthesizeing}>营运证年审即将过期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={synthesize}>营运证年审已过期</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={drivingLicenseing}>行驶证即将过期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={drivingLicense}>行驶证已过期</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={taximetering}>计价器即将过期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={taximeter}>计价器已过期</Button>&nbsp;
      <Popconfirm title="是否确定要导出" onConfirm={exportAnnualVerification} >
        <Button type="primary" icon="export" >导出</Button>&nbsp;
      </Popconfirm>
      <Upload {...importAnnualVerification} style={{ display: 'inline-block' }}>
        <Button type="primary" icon="download" >导入</Button>
      </Upload>
    </div>
  )

  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'annualVerification_condin',
    searchFields: getSearchFields(searchFields).values(),
    fields: getFields(searchFields, local.get('annualVerification_condin') || ['carNo', 'plateNumber']).values(),
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
          <span>
            <Button type="primary" onClick={() => toInfo(record)} >详情</Button>&nbsp;
            <Button type="primary" onClick={() => toEdit(record)} >编辑</Button>&nbsp;
          </span>
        </span>
      )
    },
  }]
  const tableColumns = getColumns(fields).enhance(operatorColumn).values()


  let pageSwitch
  if (res === 'annualVerificationAdd') {
    pageSwitch = <Add key="annualVerificationAdd" />
  } else if (res === 'annualVerificationUpdate') {
    pageSwitch = <Update key="annualVerificationUpdate" />
  } else if (res === 'annualVerificationInfo') {
    pageSwitch = <Info key="annualVerificationInfo" />
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
                return `共${(page && page.totalCount) || 0}  条数据`
              },
            }}
          />
        </div>
      }
    </div>
  )
}

function mapStateToProps({ loading, annualVerificationStore }) {
  return {
    loading: loading.models.annualVerificationStore,
    page: annualVerificationStore.page,
    pageState: annualVerificationStore.pageState,
    res: annualVerificationStore.res,
  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    methods: {

      onSearch(values) {
        dispatch({
          type: 'annualVerificationStore/queryPage',
          ...values,
        })
      },

      /** 即将到期和已到期 */
      synthesizeing() {
        dispatch({
          type: 'annualVerificationStore/warnList',
          warningEnum: 'synthesizeDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      synthesize() {
        dispatch({
          type: 'annualVerificationStore/warnList',
          warningEnum: 'synthesizeDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },
      drivingLicenseing() {
        dispatch({
          type: 'annualVerificationStore/warnList',
          warningEnum: 'drivingLicenseDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      drivingLicense() {
        dispatch({
          type: 'annualVerificationStore/warnList',
          warningEnum: 'drivingLicenseDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },
      taximetering() {
        dispatch({
          type: 'annualVerificationStore/warnList',
          warningEnum: 'taximeterDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      taximeter() {
        dispatch({
          type: 'annualVerificationStore/warnList',
          warningEnum: 'taximeterDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },

      toAdd() {
        dispatch({
          type: 'carStore/setCarNull',
        })
        dispatch({
          type: 'annualVerificationStore/toAdd',
          res: 'annualVerificationAdd',
        })
      },

      toEdit(annualVerification) {
        dispatch({
          annualVerification,
          type: 'annualVerificationStore/toEdit',
          res: 'annualVerificationUpdate',
        })
      },

      toInfo(annualVerification) {
        dispatch({
          annualVerification,
          type: 'annualVerificationStore/toInfo',
          res: 'annualVerificationInfo',
        })
      },

      exportAnnualVerification() {
        const carNo = form.getFieldValue('carNo')
        const plateNumber = form.getFieldValue('plateNumber')
        const params = {
          carNo,
          plateNumber,
        }
        // 删除空值、undefind
        Object.keys(params).map(v => params[v] || delete params[v])
        const paramsForGet = (params && qs.stringify(params)) || ''
        window.location.href = `${BASE_URL}/annualVerification/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },

      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        let values = form.getFieldsValue()
        dispatch({
          type: 'annualVerificationStore/queryPage',
          pageNo: current,
          pageSize,
          ...values,
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        let values = form.getFieldsValue()
        dispatch({
          type: 'annualVerificationStore/queryPage',
          pageNo: current,
          pageSize,
          ...values,
        })
      },

      handlerUpload() {
        dispatch({
          type: 'annualVerificationStore/queryPage',
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
  name: '营运证年审有效期截止时间',
  key: 'synthesizeDate',
}, {
  name: '行驶证有效期截止时间',
  key: 'drivingLicenseDate',
}, {
  name: '计价器年审有效期截止时间',
  key: 'taximeterDate',
}]

const searchFields = [{
  name: '自编号',
  key: 'carNo',
}, {
  name: '车牌号',
  key: 'plateNumber',
}]

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(List))
