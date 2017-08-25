import { connect } from 'dva'
import { Form, Input, Button, Icon, Popconfirm, Alert, Table, Upload, Modal, Select } from 'antd'
import styles from './Page.css'
import Add from './Add'
import Update from './Update'
import Detail from './Detail'
import qs from 'qs'

const FormItem = Form.Item
const { TOKEN_KEY } = constant
const Option = Select.Option

let index = option => {
  const { loading, dispatch, form, res, register, page } = option
  const { getFieldDecorator } = form

  /* 详情 */
  function toDetail(complain) {
    dispatch({
      type: 'complainStore/toEdit',
      res: 'detail',
      complain,
    })
  }
  /* 添加 */
  function toAdd(e) {
    dispatch({
      type: 'complainStore/toRegister',
      res: 'add',
    })
  }
  /* 编辑 */
  function toEdit(complain) {
    dispatch({
      type: 'complainStore/toEdit',
      res: 'update',
      complain,
    })
  }

  /* 删除 */
  function confirm(id) {
    dispatch({
      type: 'complainStore/deleteById',
      id,
    })
  }

  const token = session.get(TOKEN_KEY)
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
    window.location.href = `/driver/complain/export.htm?token=${token}&${paramsForGet}`
  }
  /**
   * 上传文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importCar = {
    name: 'file',
    action: `/driver/complain/import.htm?token=${token}`,
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
              type: 'complainStore/queryPage',
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
        type: 'complainStore/queryPage',
        ...values,
      })
    })
  }

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
    title: '来电者姓名',
    dataIndex: 'callName',
    key: 'callName',
  }, {
    title: '来电者联系方式',
    dataIndex: 'callMobile',
    key: 'callMobile',
  }, {
    title: '投诉类型',
    dataIndex: 'complainType',
    key: 'complainType',
    render: text => {
      switch (text) {
        case 'complain_one':
          return '不打表营运'
          break
        case 'complain_two':
          return '不提供有效车票'
          break
        case 'complain_three':
          return '多收费'
          break
        case 'complain_four':
          return '服务态度差'
          break
        case 'complain_five':
          return '拒载'
          break
        case 'complain_six':
          return '咪表有问题'
          break
        case 'complain_seven':
          return '拼客'
          break
        case 'complain_eight':
          return '绕路'
          break
        case 'complain_nine':
          return '危险驾驶'
          break
        case 'complain_ten':
          return '误导乘客'
          break
        case 'complain_eleven':
          return '议价'
          break
        case 'complain_twelve':
          return '中途甩客'
          break
        case 'complain_thirteen':
          return '其它类'
          break
      }
    },
  }, {
    title: '来电时间',
    dataIndex: 'callTime',
    key: 'callTime',
  }, {
    title: '事情发生时间',
    dataIndex: 'creditTime',
    key: 'creditTime',
  }, {
    title: '回复乘客时间',
    dataIndex: 'replyTime',
    key: 'replyTime',
  }, {
    title: '驾驶员是否有责',
    dataIndex: 'inFault',
    key: 'inFault',
    render: text => (text ? '是' : '否'),
  }, {
    title: '是否考核',
    dataIndex: 'punish',
    key: 'punish',
    render: text => (text ? '是' : '否'),
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <ZButton permission="driver:complain:query">
          <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
        </ZButton>
        <ZButton permission="driver:complain:update">
          <Button type="primary" onClick={() => toEdit(record)}>编辑</Button>&nbsp;
        </ZButton>
        {/* <Popconfirm title="是否确定要删除?" onConfirm={() => confirm(record.id)} onCancel={cancel}>
         <Button type="primary">删除</Button>&nbsp;
         </Popconfirm> */}
      </span>
    ),
  }]

  return (
    <div>
      {
        register ? a : <div>
          <div>
            <ZButton permission="driver:complain:insert">
              <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
            </ZButton>
            <ZButton permission="driver:complain:export">
              <Popconfirm title="是否确定要导出" onConfirm={toExport} >
                <Button type="primary" icon="export" >导出</Button>&nbsp;
              </Popconfirm>
            </ZButton>
            <ZButton permission="driver:complain:import">
              <Upload {...importCar}>
                <Button type="primary" icon="download" >导入</Button>
              </Upload>
            </ZButton>
          </div>
          <div className={styles.query}>
            <Form layout="inline" onSubmit={query}>
              <FormItem label={(<span>自编号&nbsp;</span>)}>
                {getFieldDecorator('carNo')(<Input />)}
              </FormItem>
              <FormItem label={(<span>车牌号&nbsp;</span>)}>
                {getFieldDecorator('plateNumber')(<Input />)}
              </FormItem>
              <FormItem label={(<span>姓名&nbsp;</span>)}>
                {getFieldDecorator('userName')(<Input />)}
              </FormItem>
              <FormItem label={(<span>资格证&nbsp;</span>)}>
                {getFieldDecorator('qualificationNo')(<Input />)}
              </FormItem>
              <FormItem label={(<span>投诉类型&nbsp;</span>)}>
                {getFieldDecorator('complainType')(
                  <Select style={{ width: 150 }}>
                    <Option value="">请选择</Option>
                    <Option value="complain_one">不打表营运</Option>
                    <Option value="complain_two">不提供有效车票</Option>
                    <Option value="complain_three">多收费</Option>
                    <Option value="complain_four">服务态度差</Option>
                    <Option value="complain_five">拒载</Option>
                    <Option value="complain_six">咪表有问题</Option>
                    <Option value="complain_seven">拼客</Option>
                    <Option value="complain_eight">绕路</Option>
                    <Option value="complain_nine">危险驾驶</Option>
                    <Option value="complain_ten">误导乘客</Option>
                    <Option value="complain_eleven">议价</Option>
                    <Option value="complain_twelve">中途甩客</Option>
                    <Option value="complain_thirteen">其它类</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label={(<span>是否有责&nbsp;</span>)}>
                {getFieldDecorator('inFault')(
                  <Select style={{ width: 80 }}>
                    <Option value="">请选择</Option>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label={(<span>是否考核&nbsp;</span>)}>
                {getFieldDecorator('punish')(
                  <Select style={{ width: 80 }}>
                    <Option value="">请选择</Option>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                  </Select>
                )}
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
                    type: 'complainStore/queryPage',
                    pageNo: current,
                    pageSize,
                    ...values,
                  })
                })
              },
              onChange(page, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
                form.validateFields((err, values) => {
                  dispatch({
                    type: 'complainStore/queryPage',
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
}

function mapStateToProps({ loading, complainStore }) {
  return {
    loading: loading.models.complainStore,
    register: complainStore.register,
    res: complainStore.res,
    page: complainStore.page,
  }
}

index = Form.create()(index)
export default connect(mapStateToProps)(index)
