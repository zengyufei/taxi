/*
 * @Author: zengyufei 
 * @Date: 2017-08-23 15:40:50 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-24 16:55:08
 */
import { connect } from 'dva'
import { Button, Table, Popconfirm, Upload, Modal } from 'antd'
import qs from 'qs'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'
import { local } from 'utils/storage'

import Add from './Add.js'
import Update from './Update.js'
import Info from './Info.js'

const { tokenSessionKey } = constant

let CarOperateLog = option => {
  const { loading, form, page, methods, res, pageState } = option
  const { toAdd, toEdit, toInfo, exportCarOperateLog, onShowSizeChange, onChange, handlerUpload, onSearch } = methods


  /**
   * 导入文件
   */
  const importCarOperateLog = {
    name: 'file',
    action: `carOperateLog/import.htm?token=${session.get(tokenSessionKey)}`,
    headers: {
      authorization: 'authorization-text',
    },
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
      <Popconfirm title="是否确定要导出" onConfirm={exportCarOperateLog} >
        <Button type="primary" icon="export" >导出</Button>&nbsp;
      </Popconfirm>
      <Upload {...importCarOperateLog}>
        <Button type="primary" icon="download" >导入</Button>
      </Upload>
    </div>
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'carOperateLog_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber', 'yearMonth']).values(),
    fields: getFields(fields, local.get('carOperateLog_condin') || ['carNo', 'plateNumber', 'yearMonth']).values(),
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

function mapStateToProps({ loading, carOperateLogStore }) {
  return {
    loading: loading.models.carOperateLogStore,
    UPLOAD_URL: carOperateLogStore.UPLOAD_URL,
    page: carOperateLogStore.page,
    pageState: carOperateLogStore.pageState,
    res: carOperateLogStore.res,
  }
}


const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      toAdd() {
        dispatch({
          type: 'carStore/setCarNull',
        })
        dispatch({
          type: 'carOperateLogStore/toAdd',
          res: 'Add',
        })
      },

      toEdit(carOperateLog) {
        dispatch({
          UPLOAD_URL,
          carOperateLog,
          type: 'carOperateLogStore/toEdit',
          res: 'Update',
        })
      },

      toInfo(carOperateLog) {
        dispatch({
          UPLOAD_URL,
          carOperateLog,
          type: 'carOperateLogStore/toInfo',
          res: 'Info',
        })
      },

      exportCarOperateLog() {
        const carNo = form.getFieldValue('carNo')
        const plateNumber = form.getFieldValue('plateNumber')
        const params = {
          carNo,
          plateNumber,
        }
        // 删除空值、undefind
        Object.keys(params).map(v => params[v] || delete params[v])
        const paramsForGet = (params && qs.stringify(params)) || ''
        window.location.href = `${BASE_URL}/carOperateLog/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onSearch(values) {
        if (values) {
          if (values.yearMonth) {
            values.yearMonth = moment(new Date(values.yearMonth)).format('YYYYMM')
          }
        }
        console.log(values)
        dispatch({
          type: 'carOperateLogStore/queryPage',
          ...values,
          pageNo: 1,
          pageSize: 10,
        })
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'carOperateLogStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },
      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'carOperateLogStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      handlerUpload() {
        dispatch({
          type: 'carOperateLogStore/queryPage',
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
  name: '年月份',
  key: 'yearMonth',
  type: 'yearMonth',
  parse: 'YYYYMM',
}, {
  name: '车辆月度行驶里程(公里)',
  key: 'travelMileage',
}, {
  name: '车辆月度营运里程(公里)',
  key: 'operateMileage',
}, {
  name: '车辆月度营业收入(元)',
  key: 'incomeAmount',
}, {
  name: '车辆月度载客次数(人次)',
  key: 'passengerTimes',
}, {
  name: '车辆月度客运量(人次)',
  key: 'passengerCapacity',
}, {
  name: '车辆月度耗电量(度)',
  key: 'powerConsume',
}]

export default connect(mapStateToProps, mapDispatchToProps)(CarOperateLog)
