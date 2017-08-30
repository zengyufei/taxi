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
  const { onSearch, toDetail, toAdd, toEdit, toExport, onShowSizeChange, onChange, handlerUpload, requestSave, auditSave, requestEdit, auditEdit } = methods


  /**
   * 上传文件
   */
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/reserveMoney/import.htm?token=${session.get(tokenSessionKey)}`,
    onChange: handlerUpload,
  }

  const btns = (
    <div>
      <ZButton permission="finance:reserveMoney:insert">
        <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
      </ZButton>
      <ZButton permission="finance:reserveMoney:export">
        <Popconfirm title="是否确定要导出" onConfirm={toExport} >
          <Button type="primary" icon="export" >导出</Button>&nbsp;
        </Popconfirm>
      </ZButton>
      <ZButton permission="finance:reserveMoney:import">
        <Upload {...importCar}>
          <Button type="primary" icon="download" >导入</Button>
        </Upload>
      </ZButton>
    </div>
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'sreserveMoney_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber', 'createTime']).values(),
    fields: getFields(fields, local.get('sreserveMoney_condin') || ['carNo', 'plateNumber', 'createTime']).values(),
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
      let EDIT = false
      let AUDIT_SAVE = false
      let AUDIT_EDIT = false
      let READ_ONLY = false
      if (record.auditStatus === 'EDIT') {
        EDIT = true
      } else if (record.auditStatus === 'AUDIT_SAVE') {
        AUDIT_SAVE = true
      } else if (record.auditStatus === 'AUDIT_EDIT') {
        AUDIT_EDIT = true
      } else if (record.auditStatus === 'READ_ONLY') {
        READ_ONLY = true
      }

      return (
        <span>
          <ZButton permission="finance:reserveMoney:query">
            <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
          </ZButton>
          {
            EDIT ? <div>
              <ZButton permission="finance:reserveMoney:update">
                <Button type="primary" onClick={() => toEdit(record)}>编辑</Button>&nbsp;
              </ZButton>
              <ZButton permission="finance:reserveMoney:requestSave">
                <Button type="primary" onClick={() => requestSave(record.id)}>申请保存</Button>&nbsp;
              </ZButton>
            </div> : ''
          }
          {
            AUDIT_SAVE ?
              <div>
                <ZButton permission="finance:reserveMoney:auditSave">
                  <Button type="primary" onClick={() => auditSave(record.id, true)}>保存同意</Button>&nbsp;
                  <Button type="primary" onClick={() => auditSave(record.id, false)}>保存不同意</Button>&nbsp;
                </ZButton>
              </div>
              : ''
          }

          {
            READ_ONLY ? <div>
              <ZButton permission="finance:reserveMoney:requestEdit">
                <Button type="primary" onClick={() => requestEdit(record.id)}>申请修改</Button>&nbsp;
              </ZButton>
            </div> : ''
          }
          {
            AUDIT_EDIT ?
              <div>
                <ZButton permission="finance:reserveMoney:auditEdit">
                  <Button type="primary" onClick={() => auditEdit(record.id, true)}>修改同意</Button>&nbsp;
                  <Button type="primary" onClick={() => auditEdit(record.id, false)}>修改不同意</Button>&nbsp;
                </ZButton>
              </div>
              : ''
          }
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

const mapStateToProps = ({ loading, reserveMoneyStore }) => {
  return {
    loading: loading.models.reserveMoneyStore,
    register: reserveMoneyStore.register,
    res: reserveMoneyStore.res,
    page: reserveMoneyStore.page,
  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      onSearch(values) {
        if (values) {
          if (values.createTime) {
            values.submitDateStart = moment(new Date(values.createTime)).format('YYYY-MM-DD')
            values.submitDateEnd = moment(new Date(values.createTime)).format('YYYY-MM-DD')
            delete values.createTime
          }
        }
        dispatch({
          type: 'reserveMoneyStore/queryPage',
          ...values,
        })
      },

      /* 申请保存 */
      requestSave(id) {
        dispatch({
          type: 'reserveMoneyStore/requestSave',
          id,
        })
      },
      /* 保存确认 */
      auditSave(id, confirm) {
        dispatch({
          type: 'reserveMoneyStore/auditSave',
          id,
          confirm,
        })
      },
      /* 申请修改 */
      requestEdit(id) {
        dispatch({
          type: 'reserveMoneyStore/requestEdit',
          id,
        })
      },
      /* 申请确认 */
      auditEdit(id, confirm) {
        dispatch({
          type: 'reserveMoneyStore/auditEdit',
          id,
          confirm,
        })
      },


      /* 详情 */
      toDetail(reserveMoney) {
        dispatch({
          type: 'reserveMoneyStore/toEdit',
          res: 'detail',
          reserveMoney,
        })
      },
      /* 添加 */
      toAdd() {
        dispatch({
          type: 'reserveMoneyStore/toRegister',
          res: 'add',
        })
      },
      /* 编辑 */
      toEdit(reserveMoney) {
        dispatch({
          type: 'reserveMoneyStore/toEdit',
          res: 'update',
          reserveMoney,
        })
      },

      /* 导出 */
      toExport() {
        const carNo = form.getFieldValue('carNo')
        const plateNumber = form.getFieldValue('plateNumber')
        const params = {
          carNo,
          plateNumber,
        }
        // 删除空值、undefind
        Object.keys(params).map(v => params[v] || delete params[v])
        const paramsForGet = (params && qs.stringify(params)) || ''
        window.location.href = `${BASE_URL}/reserveMoney/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        let values = form.getFieldsValue()
        if (values) {
          if (values.createTime) {
            values.submitDateStart = moment(new Date(values.createTime)).format('YYYY-MM-DD')
            values.submitDateEnd = moment(new Date(values.createTime)).format('YYYY-MM-DD')
            delete values.createTime
          }
        }
        dispatch({
          type: 'reserveMoneyStore/queryPage',
          pageNo: current,
          pageSize,
          ...values,
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        let values = form.getFieldsValue()
        if (values) {
          if (values.createTime) {
            values.submitDateStart = moment(new Date(values.createTime)).format('YYYY-MM-DD')
            values.submitDateEnd = moment(new Date(values.createTime)).format('YYYY-MM-DD')
            delete values.createTime
          }
        }
        dispatch({
          type: 'reserveMoneyStore/queryPage',
          pageNo: current,
          pageSize,
          ...values,
        })
      },


      handlerUpload(info) {
        if (info.file.status !== 'uploading') {
          console.log('uploading')
        }
        if (info.file.status === 'done') {
          Modal.info({
            name: '导入结果',
            content: (
              info.file.response.msg
            ),
            onOk() {
              dispatch({
                type: 'reserveMoneyStore/queryPage',
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
  name: '资格证',
  key: 'qualificationNo',
}, {
  name: '预留金金额',
  key: 'totalAmount',
}, {
  name: '交通事故扣减金额',
  key: 'accidentSubAmount',
}, {
  name: '交通违法扣减金额',
  key: 'violationSubAmount',
}, {
  name: '充电费用扣减金额',
  key: 'chargingSubAmount',
}, {
  name: '其它项扣减金额',
  key: 'otherSubAmount',
}, {
  name: '退款金额',
  key: 'refundAmount',
}, {
  name: '扣减日期',
  key: 'payDate',
}, {
  name: '缴纳日期',
  key: 'createTime',
  type: 'date',
}, {
  name: '离职日期',
  key: 'leaveDate',
}]


export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(index))
