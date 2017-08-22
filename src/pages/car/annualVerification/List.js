/*
 * @Author: zengyufei 
 * @Date: 2017-08-22 17:50:34 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-22 18:05:36
 */
import { connect } from 'dva'
import { Button, Table, Popconfirm, Input, Form, Upload, Modal } from 'antd'
import qs from 'qs'

import styles from './index.css'
import AnnualVerificationAdd from './Add.js'
import AnnualVerificationUpdate from './Update.js'
import AnnualVerificationInfo from './Info.js'

const FormItem = Form.Item
const { tokenSessionKey } = constant

let AnnualVerification = option => {
  const columns = [{
    title: '自编号',
    dataIndex: 'carNo',
    key: 'carNo',
  }, {
    title: '车牌号',
    dataIndex: 'plateNumber',
    key: 'plateNumber',
  }, {
    title: '综合审有效期截止时间',
    dataIndex: 'synthesizeDate',
    key: 'synthesizeDate',
  }, {
    title: '行驶证有效期截止时间',
    dataIndex: 'drivingLicenseDate',
    key: 'drivingLicenseDate',
  }, {
    title: '计价器年审有效期截止时间',
    dataIndex: 'taximeterDate',
    key: 'taximeterDate',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <Button type="primary" onClick={() => toInfo(record)} >详情</Button>&nbsp;
        <Button type="primary" onClick={() => toEdit(record)} >编辑</Button>&nbsp;
      </span>
    ),
  }]

  const { form, page, dispatch, res, pageState, UPLOADPATH } = option
  const { getFieldDecorator } = form

  function queryPage(e) {
    dispatch({
      type: 'annualVerificationStore/queryPage',
      carNo: form.getFieldValue('carNo'),
      plateNumber: form.getFieldValue('plateNumber'),
    })
  }

  function toAdd(e) {
    dispatch({
      type: 'carStore/setCarNull',
    })
    dispatch({
      type: 'annualVerificationStore/toAdd',
      res: 'annualVerificationAdd',
    })
  }

  function toEdit(annualVerification) {
    dispatch({
      annualVerification,
      type: 'annualVerificationStore/toEdit',
      res: 'annualVerificationUpdate',
      UPLOADPATH,
    })
  }

  function toInfo(annualVerification) {
    dispatch({
      UPLOADPATH,
      annualVerification,
      type: 'annualVerificationStore/toInfo',
      res: 'annualVerificationInfo',
    })
  }

  const token = session.get(tokenSessionKey)
  function exportAnnualVerification() {
    const carNo = form.getFieldValue('carNo')
    const plateNumber = form.getFieldValue('plateNumber')
    const params = {
      carNo,
      plateNumber,
    }
    // 删除空值、undefind
    Object.keys(params).map(v => params[v] || delete params[v])
    const paramsForGet = (params && qs.stringify(params)) || ''
    window.location.href = `${BASE_URL}/annualVerification/export.htm?token=${token}&${paramsForGet}`
  }
  /**
   * 导入文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importAnnualVerification = {

    name: 'file',
    action: `${BASE_URL}/annualVerification/import.htm?token=${token}`,
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
              type: 'annualVerificationStore/queryPage',
            })
          },
        })
      } else if (info.file.status === 'error') {
        console.log('error')
      }
    },
  }

  function expired() {
    dispatch({
      type: 'annualVerificationStore/expired',
      carNo: form.getFieldValue('carNo'),
      plateNumber: form.getFieldValue('plateNumber'),
    })
  }
  function expireing() {
    dispatch({
      type: 'annualVerificationStore/expireing',
      carNo: form.getFieldValue('carNo'),
      plateNumber: form.getFieldValue('plateNumber'),
    })
  }

  let pageSwitch
  if (res == 'annualVerificationAdd') {
    pageSwitch = <AnnualVerificationAdd key="annualVerificationAdd" />
  } else if (res == 'annualVerificationUpdate') {
    pageSwitch = <AnnualVerificationUpdate key="annualVerificationUpdate" />
  } else if (res == 'annualVerificationInfo') {
    pageSwitch = <AnnualVerificationInfo key="annualVerificationInfo" />
  }

  return (
    <div>
      {
        pageState ? pageSwitch : <div>
          <div>
            <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
            <Button type="primary" icon="clock-circle-o" onClick={expireing}>审核即将过期</Button>&nbsp;
            <Button type="primary" icon="close-circle-o" onClick={expired}>审核过期</Button>&nbsp;
            <Popconfirm title="是否确定要导出" onConfirm={exportAnnualVerification} >
              <Button type="primary" icon="export" >导出</Button>&nbsp;
            </Popconfirm>
            <Upload {...importAnnualVerification} style={{ display: 'inline-block' }}>
              <Button type="primary" icon="download" >导入</Button>
            </Upload>
          </div>
          <div className={styles.query}>
            <Form layout="inline" >
              <FormItem label="自编号：">
                {getFieldDecorator('carNo')(
                  <Input placeholder="自编号" />,
                )}
              </FormItem>
              <FormItem label="车牌号：">
                {getFieldDecorator('plateNumber')(
                  <Input placeholder="车牌号" />,
                )}
              </FormItem>
              <Button type="primary" onClick={queryPage} htmlType="submit" >查询</Button>
            </Form>
          </div>

          <Table
            rowKey="id"
            dataSource={(page && page.dataList) || []}
            columns={columns}
            bordered
            pagination={{ // 分页
              total: (page && +page.totalCount) || 0, // 总数量
              pageSize: (page && +page.pageSize) || 10, // 显示几条一页
              defaultPageSize: 10, // 默认显示几条一页
              showSizeChanger: true, // 是否显示可以设置几条一页的选项
              onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                dispatch({
                  type: 'annualVerificationStore/queryPage',
                  pageNo: current,
                  pageSize,
                })
              },
              onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
                dispatch({
                  type: 'annualVerificationStore/queryPage',
                  pageNo: current,
                  pageSize,
                })
              },
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

function mapStateToProps({ annualVerificationStore }) {
  return {
    UPLOADPATH: annualVerificationStore.UPLOADPATH,
    page: annualVerificationStore.page,
    pageState: annualVerificationStore.pageState,
    res: annualVerificationStore.res,
  }
}

export default connect(mapStateToProps)(AnnualVerification)
