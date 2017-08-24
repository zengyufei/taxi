/*
 * @Author: zengyufei 
 * @Date: 2017-08-23 15:40:58 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-23 15:40:58 
 */
import { connect } from 'dva'
import { Button, Table, Popconfirm, Input, Select, Form, Upload, Modal } from 'antd'
import qs from 'qs'

import styles from './Insurance.css'
import InsuranceAdd from './InsuranceAdd.js'
import InsuranceUpdate from './InsuranceUpdate.js'
import InsuranceInfo from './InsuranceInfo.js'

const FormItem = Form.Item
const Option = Select.Option
const { tokenSessionKey } = constant

let Insurance = option => {
  const columns = [{
    title: '自编号',
    dataIndex: 'carNo',
    key: 'carNo',
  }, {
    title: '车牌号',
    dataIndex: 'plateNumber',
    key: 'plateNumber',
  }, {
    title: '保险类型',
    dataIndex: 'insuranceTypeName',
    key: 'insuranceTypeName',
  }, {
    title: '保险名称',
    dataIndex: 'insuranceName',
    key: 'insuranceName',
  }, {
    title: '保险公司',
    dataIndex: 'insuranceCompany',
    key: 'insuranceCompany',
  }, {
    title: '保险单号',
    dataIndex: 'policyNo',
    key: 'policyNo',
  }, {
    title: '保险金额',
    dataIndex: 'insuranceMoney',
    key: 'insuranceMoney',
  }, {
    title: '保险生效时间',
    dataIndex: 'insuranceBuyDate',
    key: 'insuranceBuyDate',
  }, {
    title: '保险到期时间',
    dataIndex: 'insuranceExpireDate',
    key: 'insuranceExpireDate',
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
  }]

  const { loading, form, page, dispatch, res, pageState, UPLOAD_URL } = option
  const { getFieldDecorator } = form

  function queryPage(e) {
    dispatch({
      type: 'insuranceStore/queryPage',
      carNo: form.getFieldValue('carNo'),
      plateNumber: form.getFieldValue('plateNumber'),
      insuranceType: form.getFieldValue('insuranceType'),
      insuranceCompany: form.getFieldValue('insuranceCompany'),
      insuranceName: form.getFieldValue('insuranceName'),
      policyNo: form.getFieldValue('policyNo'),
    })
  }

  function toAdd(e) {
    dispatch({
      type: 'carStore/setCarNull',
    })
    dispatch({
      type: 'insuranceStore/toAdd',
      res: 'insuranceAdd',
    })
  }

  function toEdit(insurance) {
    dispatch({
      insurance,
      UPLOAD_URL,
      type: 'insuranceStore/toEdit',
      res: 'insuranceUpdate',
    })
  }

  function toInfo(insurance) {
    dispatch({
      insurance,
      UPLOAD_URL,
      type: 'insuranceStore/toInfo',
      res: 'insuranceInfo',
    })
  }

  function deleteById(id) {
    dispatch({
      id,
      type: 'insuranceStore/deleteById',
    })
  }

  const token = session.get(tokenSessionKey)
  function exportInsurance() {
    const carNo = form.getFieldValue('carNo')
    const plateNumber = form.getFieldValue('plateNumber')
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
    window.location.href = `/insurance/export.htm?token=${token}&${paramsForGet}`
  }
  /**
   * 导入文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importInsurance = {
    name: 'file',
    action: `${BASE_URL}/insurance/import.htm?token=${token}`,
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
              type: 'insuranceStore/queryPage',
            })
          },
        })
      } else if (info.file.status === 'error') {
        console.log('error')
      }
    },
  }

  let pageSwitch
  if (res == 'insuranceAdd') {
    pageSwitch = <InsuranceAdd key="insuranceAdd" />
  } else if (res == 'insuranceUpdate') {
    pageSwitch = <InsuranceUpdate key="insuranceUpdate" />
  } else if (res == 'insuranceInfo') {
    pageSwitch = <InsuranceInfo key="insuranceInfo" />
  }

  return (
    <div>
      {
        pageState ? pageSwitch          :        <div>
            <div>
              <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
              <Popconfirm title="是否确定要导出" onConfirm={exportInsurance} >
                <Button type="primary" icon="export" >导出</Button>&nbsp;
              </Popconfirm>
              <Upload {...importInsurance}>
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
                <FormItem label="保险类型：">
                  {getFieldDecorator('insuranceType')(
                    <Select style={{ width: 120 }}>
                      <Option value="">请选择</Option>
                      <Option value="TRAFFIC">交通强制险</Option>
                      <Option value="BUSINESS">商业保险</Option>
                    </Select>,
                  )}
                </FormItem>
                <FormItem label="保险公司：">
                  {getFieldDecorator('insuranceCompany')(
                    <Input placeholder="保险公司" />,
                  )}
                </FormItem>
                <FormItem label="保险单：">
                  {getFieldDecorator('policyNo')(
                    <Input placeholder="保险单" />,
                  )}
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
                    type: 'insuranceStore/queryPage',
                    pageNo: current,
                    pageSize,
                  })
                },
                onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
                  dispatch({
                    type: 'insuranceStore/queryPage',
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

function mapStateToProps({ loading, insuranceStore }) {
  return {
    loading: loading.models.insuranceStore,
    UPLOAD_URL: insuranceStore.UPLOAD_URL,
    page: insuranceStore.page,
    pageState: insuranceStore.pageState,
    res: insuranceStore.res,
  }
}

Insurance = Form.create()(Insurance)
export default connect(mapStateToProps)(Insurance)
