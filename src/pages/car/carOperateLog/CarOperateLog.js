/*
 * @Author: zengyufei 
 * @Date: 2017-08-23 15:40:50 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-23 15:40:50 
 */
import { connect } from 'dva'
import { Button, Table, DatePicker, Popconfirm, Input, Form, Upload, Modal } from 'antd'
import qs from 'qs'

import styles from './CarOperateLog.css'
import CarOperateLogAdd from './CarOperateLogAdd.js'
import CarOperateLogUpdate from './CarOperateLogUpdate.js'
import CarOperateLogInfo from './CarOperateLogInfo.js'

const FormItem = Form.Item
const { MonthPicker } = DatePicker
const { tokenSessionKey } = constant

let CarOperateLog = option => {
  const columns = [
    {
      title: '自编号',
      dataIndex: 'carNo',
      key: 'carNo',
    }, {
      title: '车牌号',
      dataIndex: 'plateNumber',
      key: 'plateNumber',
    }, {
      title: '年月份',
      dataIndex: 'yearMonth',
      key: 'yearMonth',
    }, {
      title: '车辆月度行驶里程(公里)',
      dataIndex: 'travelMileage',
      key: 'travelMileage',
    }, {
      title: '车辆月度营运里程(公里)',
      dataIndex: 'operateMileage',
      key: 'operateMileage',
    }, {
      title: '车辆月度营业收入(元)',
      dataIndex: 'incomeAmount',
      key: 'incomeAmount',
    }, {
      title: '车辆月度载客次数(人次)',
      dataIndex: 'passengerTimes',
      key: 'passengerTimes',
    },, {
      title: '车辆月度客运量(人次)',
      dataIndex: 'passengerCapacity',
      key: 'passengerCapacity',
    }, {
      title: '车辆月度耗电量(度)',
      dataIndex: 'powerConsume',
      key: 'powerConsume',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => toInfo(record)} >详情</Button>&nbsp;
          <Button type="primary" onClick={() => toEdit(record)} >编辑</Button>&nbsp;
          {/*
        <Popconfirm title="是否确定要删除?" onConfirm={()=>deleteById(record.id)} >
          <Button type="primary"  >删除</Button>&nbsp;
        </Popconfirm>
        */}
        </span>
      ),
    },
  ]

  const { loading, form, page, dispatch, res, pageState, UPLOAD_URL } = option
  const { getFieldDecorator } = form

  function queryPage() {
    dispatch({
      type: 'carOperateLogStore/queryPage',
      carNo: form.getFieldValue('carNo'),
      plateNumber: form.getFieldValue('plateNumber'),
      yearMonth: form.getFieldValue('yearMonth') ? form.getFieldValue('yearMonth').format('YYYYMM') : 0,
    })
  }

  function toAdd() {
    dispatch({
      type: 'carStore/setCarNull',
    })
    dispatch({
      type: 'carOperateLogStore/toAdd',
      res: 'carOperateLogAdd',
    })
  }

  function toEdit(carOperateLog) {
    dispatch({
      UPLOAD_URL,
      carOperateLog,
      type: 'carOperateLogStore/toEdit',
      res: 'carOperateLogUpdate',
    })
  }

  function toInfo(carOperateLog) {
    dispatch({
      UPLOAD_URL,
      carOperateLog,
      type: 'carOperateLogStore/toInfo',
      res: 'carOperateLogInfo',
    })
  }

  const token = session.get(tokenSessionKey)
  function exportCarOperateLog() {
    const carNo = form.getFieldValue('carNo')
    const plateNumber = form.getFieldValue('plateNumber')
    const params = {
      carNo,
      plateNumber,
    }
    // 删除空值、undefind
    Object.keys(params).map(v => params[v] || delete params[v])
    const paramsForGet = (params && qs.stringify(params)) || ''
    window.location.href = `/carOperateLog/export.htm?token=${token}&${paramsForGet}`
  }
  /**
   * 导入文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importCarOperateLog = {
    name: 'file',
    action: `carOperateLog/import.htm?token=${token}`,
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
          onOk() {
            dispatch({
              type: 'carOperateLogStore/queryPage',
            })
          },
        })
      } else if (info.file.status === 'error') {
        console.log('error')
      }
    },
  }

  let pageSwitch
  if (res === 'carOperateLogAdd') {
    pageSwitch = <CarOperateLogAdd key="carOperateLogAdd" />
  } else if (res === 'carOperateLogUpdate') {
    pageSwitch = <CarOperateLogUpdate key="carOperateLogUpdate" />
  } else if (res === 'carOperateLogInfo') {
    pageSwitch = <CarOperateLogInfo key="carOperateLogInfo" />
  }

  return (
    <div>
      {
        pageState ? pageSwitch : <div>
          <div>
            <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
            <Popconfirm title="是否确定要导出" onConfirm={exportCarOperateLog} >
              <Button type="primary" icon="export" >导出</Button>&nbsp;
            </Popconfirm>
            <Upload {...importCarOperateLog}>
              <Button type="primary" icon="download" >导入</Button>
            </Upload>
          </div>
          <div className={styles.query}>
            <Form layout="inline" >
              <FormItem label="自编号：">
                {getFieldDecorator('carNo')(
                  <Input placeholder="自编号" />
                )}
              </FormItem>
              <FormItem label="车牌号：">
                {getFieldDecorator('plateNumber')(
                  <Input placeholder="车牌号" />
                )}
              </FormItem>
              <FormItem label="年月份：">
                {getFieldDecorator('yearMonth')(<MonthPicker style={{ width: '148px', marginRight: '20px' }} format={'YYYY-MM'} />)
                }
              </FormItem>
              <Button type="primary" onClick={queryPage} htmlType="submit" >查询</Button>
            </Form>
          </div>

          <Table
            rowKey="id"
            dataSource={(page && page.dataList) || []}
            columns={columns}
            loading={loading}
            bordered
            pagination={{ // 分页
              total: (page && +page.totalCount) || 0, // 总数量
              pageSize: (page && +page.pageSize) || 10, // 显示几条一页
              defaultPageSize: 10, // 默认显示几条一页
              showSizeChanger: true, // 是否显示可以设置几条一页的选项
              onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                dispatch({
                  type: 'carOperateLogStore/queryPage',
                  pageNo: current,
                  pageSize,
                })
              },
              onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
                dispatch({
                  type: 'carOperateLogStore/queryPage',
                  pageNo: current,
                  pageSize,
                })
              },
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

CarOperateLog = Form.create()(CarOperateLog)
export default connect(mapStateToProps)(CarOperateLog)
