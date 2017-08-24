import { connect } from 'dva'
import { Form, Input, Button, Icon, Popconfirm, Alert, Table, Upload, Modal } from 'antd'
import styles from './Page.css'
import Add from './Add'
import Update from './Update'
import Detail from './Detail'
import qs from 'qs'

const FormItem = Form.Item
const { tokenSessionKey, resourceSessionKey } = constant

let Index = option => {
  const { loading, page, dispatch, form, res, register } = option
  const { getFieldDecorator } = form

  /* 详情 */
  function toDetail(reserveMoney) {
    dispatch({
      type: 'reserveMoneyStore/toEdit',
      res: 'detail',
      reserveMoney,
    })
  }
  /* 添加 */
  function toAdd(e) {
    dispatch({
      type: 'reserveMoneyStore/toRegister',
      res: 'add',
    })
  }
  /* 编辑 */
  function toEdit(reserveMoney) {
    dispatch({
      type: 'reserveMoneyStore/toEdit',
      res: 'update',
      reserveMoney,
    })
  }

  const token = session.get(tokenSessionKey)
  /* 导出 */
  function toExport(e) {
    const carNo = form.getFieldValue('carNo')
    const plateNumber = form.getFieldValue('plateNumber')
    const params = {
      carNo,
      plateNumber,
    }
    // 删除空值、undefind
    Object.keys(params).map(v => params[v] || delete params[v])
    const paramsForGet = (params && qs.stringify(params)) || ''
    window.location.href = `/reserveMoney/export.htm?token=${token}&${paramsForGet}`
  }
  /**
   * 上传文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importCar = {
    name: 'file',
    action: `/reserveMoney/import.htm?token=${token}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log('uploading')
      }
      if (info.file.status === 'done') {
        Modal.info({
          title: '导入结果',
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
  }

  /**
   * 条件查询
   */
  const query = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      dispatch({
        type: 'reserveMoneyStore/queryPage',
        ...values,
      })
    })
  };

  let a
  if (res == 'add') {
    a = <Add key="add" />
  } else if (res == 'update') {
    a = <Update key="update" />
  } else if (res == 'detail') {
    a = <Detail key="detail" />
  }

  const columns = [{
    title: '自编号',
    dataIndex: 'carNo',
    key: 'carNo',
  }, {
    title: '车牌号',
    dataIndex: 'plateNumber',
    key: 'plateNumber',
  }, {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    title: '资格证',
    dataIndex: 'qualificationNo',
    key: 'qualificationNo',
  }, {
    title: '预留金金额',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
  }, {
    title: '交通事故扣减金额',
    dataIndex: 'accidentSubAmount',
    key: 'accidentSubAmount',
  }, {
    title: '交通违法扣减金额',
    dataIndex: 'violationSubAmount',
    key: 'violationSubAmount',
  }, {
    title: '充电费用扣减金额',
    dataIndex: 'chargingSubAmount',
    key: 'chargingSubAmount',
  }, {
    title: '其它项扣减金额',
    dataIndex: 'otherSubAmount',
    key: 'otherSubAmount',
  }, {
    title: '退款金额',
    dataIndex: 'refundAmount',
    key: 'refundAmount',
  }, {
    title: '扣减日期',
    dataIndex: 'payDate',
    key: 'payDate',
  }, {
    title: '缴纳日期',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '离职日期',
    dataIndex: 'leaveDate',
    key: 'leaveDate',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <ZButton permission="finance:reserveMoney:query">
          <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
        </ZButton>
        <ZButton permission="finance:reserveMoney:update">
          <Button type="primary" onClick={() => toEdit(record)}>编辑</Button>&nbsp;
        </ZButton>
      </span>
    ),
  }]

  return (
    <div>
      {
        register ? a : <div>
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
          <div className={styles.query}>
            <Form layout="inline" onSubmit={query}>
              <FormItem
                label={(<span>自编号&nbsp;</span>)}
              >
                {getFieldDecorator('carNo')(<Input />)}
              </FormItem>
              <FormItem
                label={(<span>车牌号&nbsp;</span>)}
              >
                {getFieldDecorator('plateNumber')(<Input />)}
              </FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
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
                form.validateFields((err, values) => {
                  dispatch({
                    type: 'reserveMoneyStore/queryPage',
                    pageNo: current,
                    pageSize,
                    ...values,
                  })
                })
              },
              onChange(page, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
                form.validateFields((err, values) => {
                  dispatch({
                    type: 'reserveMoneyStore/queryPage',
                    pageNo: page,
                    pageSize,
                    ...values,
                  })
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
};

function mapStateToProps({ loading, reserveMoneyStore }) {
  return {
    loading: loading.models.reserveMoneyStore,
    register: reserveMoneyStore.register,
    res: reserveMoneyStore.res,
    page: reserveMoneyStore.page,
  }
}

Index = Form.create()(Index)
export default connect(mapStateToProps)(Index)
