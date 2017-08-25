import { connect } from 'dva'
import { Form, Input, Button, Icon, Popconfirm, Alert, Table, Upload, Modal, Select, DatePicker } from 'antd'
import styles from './Page.css'
import Add from './Add'
import Update from './Update'
import Detail from './Detail'
import qs from 'qs'

const FormItem = Form.Item
const { TOKEN_KEY } = constant
const Option = Select.Option
const { RangePicker } = DatePicker

let index = option => {
  const { loading, dispatch, form, res, register, page } = option
  const { getFieldDecorator } = form

  /* 详情 */
  function toDetail(trafficAccident) {
    dispatch({
      type: 'trafficAccidentStore/toEdit',
      res: 'detail',
      trafficAccident,
    })
  }
  /* 添加 */
  function toAdd(e) {
    dispatch({
      type: 'trafficAccidentStore/toRegister',
      res: 'add',
    })
  }
  /* 编辑 */
  function toEdit(trafficAccident) {
    dispatch({
      type: 'trafficAccidentStore/toEdit',
      res: 'update',
      trafficAccident,
    })
  }

  /* 删除 */
  function confirm(id) {
    dispatch({
      type: 'trafficAccidentStore/deleteById',
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
    window.location.href = `/driver/trafficAccident/export.htm?token=${token}&${paramsForGet}`
  }
  /**
   * 上传文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importCar = {
    name: 'file',
    action: `/driver/trafficAccident/import.htm?token=${token}`,
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
              type: 'trafficAccidentStore/queryPage',
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
        type: 'trafficAccidentStore/queryPage',
        ...values,
        startAccidentTime: form.getFieldValue('accidentTime') != undefined ? form.getFieldValue('accidentTime')[0].format('YYYY-MM-DD 00:00:00') : undefined,
        endAccidentTime: form.getFieldValue('accidentTime') != undefined ? form.getFieldValue('accidentTime')[1].format('YYYY-MM-DD 23:59:59') : undefined,
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
    title: '档案编号',
    dataIndex: 'documentNo',
    key: 'documentNo',
  }, {
    title: '肇事时间',
    dataIndex: 'accidentTime',
    key: 'accidentTime',
  }, {
    title: '车量类型',
    dataIndex: 'canDriverCar',
    key: 'canDriverCar',
  }, {
    title: '出事地点类型',
    dataIndex: 'accidentPlace',
    key: 'accidentPlace',
  }, {
    title: '事发区域',
    dataIndex: 'areaDesc',
    key: 'areaDesc',
  }, {
    title: '具体路段',
    dataIndex: 'accidentAddress',
    key: 'accidentAddress',
  }, {
    title: '事故形态',
    dataIndex: 'accidentModel',
    key: 'accidentModel',
    render: text => {
      switch (text) {
        case 'model_one':
          return '同向侧面碰刮'
          break
        case 'model_two':
          return '追尾相撞'
          break
        case 'model_three':
          return '倒车相撞'
          break
        case 'model_four':
          return '左转弯相撞'
          break
        case 'model_five':
          return '右转弯相撞'
          break
        case 'model_six':
          return '正面相撞'
          break
        case 'model_seven':
          return '运行伤害人体'
          break
        case 'model_eight':
          return '与其他物体相撞'
          break
        case 'model_nine':
          return '其他'
          break
      }
    },
  }, {
    title: '责任',
    dataIndex: 'dutyType',
    key: 'dutyType',
    render: text => {
      switch (text) {
        case 'FULL_DUTY':
          return '全责'
          break
        case 'MAIN_DUTY':
          return '主责'
          break
        case 'SAME_DUTY':
          return '同责'
          break
        case 'LESS_DUTY':
          return '次责'
          break
        case 'NO_DUTY':
          return '无责'
          break
      }
    },
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <ZButton permission="driver:accident:query">
          <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
        </ZButton>
        <ZButton permission="driver:accident:update">
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
            <ZButton permission="driver:accident:insert">
              <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
            </ZButton>
            <ZButton permission="driver:accident:export">
              <Popconfirm title="是否确定要导出" onConfirm={toExport} >
                <Button type="primary" icon="export" >导出</Button>&nbsp;
              </Popconfirm>
            </ZButton>
            <ZButton permission="driver:accident:import">
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
              <FormItem label={(<span>档案编号&nbsp;</span>)}>
                {getFieldDecorator('documentNo')(<Input />)}
              </FormItem>
              <FormItem label={(<span>事故形态&nbsp;</span>)}>
                {getFieldDecorator('accidentModel')(
                  <Select style={{ width: 150 }}>
                    <Option value="">请选择</Option>
                    <Option value="model_one">同向侧面碰刮</Option>
                    <Option value="model_two">追尾相撞</Option>
                    <Option value="model_three">倒车相撞</Option>
                    <Option value="model_four">左转弯相撞</Option>
                    <Option value="model_five">右转弯相撞</Option>
                    <Option value="model_six">正面相撞</Option>
                    <Option value="model_seven">运行伤害人体</Option>
                    <Option value="model_eight">与其他物体相撞</Option>
                    <Option value="model_nine">其他</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label={(<span>事故性质&nbsp;</span>)}>
                {getFieldDecorator('accidentNature')(
                  <Select style={{ width: 100 }}>
                    <Option value="">请选择</Option>
                    <Option value="PROPERTY_LOSS">财产损失事故</Option>
                    <Option value="INJURED">伤人事故</Option>
                    <Option value="DEATH">死亡事故</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label={(<span>责任类型&nbsp;</span>)}>
                {getFieldDecorator('dutyType')(
                  <Select style={{ width: 80 }}>
                    <Option value="">请选择</Option>
                    <Option value="FULL_DUTY">全责</Option>
                    <Option value="MAIN_DUTY">主责</Option>
                    <Option value="SAME_DUTY">同责</Option>
                    <Option value="LESS_DUTY">次责</Option>
                    <Option value="NO_DUTY">无责</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label={(<span>肇事时间&nbsp;</span>)}>
                {getFieldDecorator('accidentTime')(<RangePicker />)}
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
                    type: 'trafficAccidentStore/queryPage',
                    pageNo: current,
                    pageSize,
                    ...values,
                  })
                })
              },
              onChange(page, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
                form.validateFields((err, values) => {
                  dispatch({
                    type: 'trafficAccidentStore/queryPage',
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

function mapStateToProps({ loading, trafficAccidentStore, driverCommonStore }) {
  return {
    loading: loading.models.trafficAccidentStore,
    register: trafficAccidentStore.register,
    res: trafficAccidentStore.res,
    page: trafficAccidentStore.page,
    areacodes: driverCommonStore.areacodes,
  }
}

index = Form.create()(index)
export default connect(mapStateToProps)(index)
