import { connect } from 'dva'
import { Form, Input, Button, Icon, Popconfirm, Alert, Table, Upload, Modal, Select } from 'antd'
import styles from './Page.css'
import Add from './Add'
import Update from './Update'
import Detail from './Detail'
import qs from 'qs'

const FormItem = Form.Item
const { tokenSessionKey } = constant
const Option = Select.Option


let Index = option => {
  const { loading, dispatch, form, res, register, page } = option
  const { getFieldDecorator } = form

  /* 详情 */
  function toDetail(punish) {
    dispatch({
      type: 'punishStore/toEdit',
      res: 'detail',
      punish,
    })
  }
  /* 添加 */
  function toAdd(e) {
    dispatch({
      type: 'punishStore/toRegister',
      res: 'add',
    })
  }
  /* 编辑 */
  function toEdit(punish) {
    dispatch({
      type: 'punishStore/toEdit',
      res: 'update',
      punish,
    })
  }

  /* 删除 */
  function confirm(id) {
    dispatch({
      type: 'punishStore/deleteById',
      id,
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
    window.location.href = `/driver/punish/export.htm?token=${token}&${paramsForGet}`
  }
  /**
   * 上传文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importCar = {
    name: 'file',
    action: `/driver/punish/import.htm?token=${token}`,
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
              type: 'punishStore/queryPage',
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
        type: 'punishStore/queryPage',
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
    title: '违章类型',
    dataIndex: 'punishType',
    key: 'punishType',
    render: text => {
      switch (text) {
        case 'punish_one':
          return '私调计价表'
          break;
        case 'punish_two':
          return '在车站、码头、机场、口岸区域及市区主干道两侧街道专用候客站不遵守有关规定，妨碍营运秩序'
          break;
        case 'punish_three':
          return '无驾驶准许证或使用无效驾驶准许证从事出租营运'
          break;
        case 'punish_four':
          return '拒绝载客'
          break;
        case 'punish_five':
          return '未在出租车内外规定位置印制、张贴或者悬挂车主名称、驾驶准许证、价目表、本车车牌号、市运政管理机关的投诉电话号码'
          break;
        case 'punish_six':
          return '未在车辆内外规定位置印制、张贴经营企业名称、驾驶准许证、价目表、本车车牌号、服务承诺的主要内容、市主管部门的投诉电话号码和市主管部门认为有必要让乘客知道的内容'
          break;
        case 'punish_seven':
          return '无驾驶准许证或者使用无效驾驶准许证从事出租营运'
          break;
        case 'punish_eight':
          return '营运载客时不使用或不当使用计价表的'
          break;
        case 'punish_nine':
          return '在车站、码头、机场、口岸区域及市内主干道专用候车站不按顺序候客'
          break;
        case 'punish_ten':
          return '不按照规定停车上下客'
          break;
        case 'punish_eleven':
          return '营运载客时不使用计价表'
          break;
        case 'punish_twelve':
          return '其它'
          break;
      }
    },
  }, {
    title: '具体地址',
    dataIndex: 'detailAddress',
    key: 'detailAddress',
  }, {
    title: '发生时间',
    dataIndex: 'creditTime',
    key: 'creditTime',
  }, {
    title: '发生经过',
    dataIndex: 'creditDesc',
    key: 'creditDesc',
  }, {
    title: '处理结果',
    dataIndex: 'punishResult',
    key: 'punishResult',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <ZButton permission="driver:punish:query">
          <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
        </ZButton>
        <ZButton permission="driver:punish:update">
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
            <ZButton permission="driver:punish:insert">
              <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
            </ZButton>
            <ZButton permission="driver:punish:export">
              <Popconfirm title="是否确定要导出" onConfirm={toExport} >
                <Button type="primary" icon="export" >导出</Button>&nbsp;
              </Popconfirm>
            </ZButton>
            <ZButton permission="driver:punish:import">
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
              <FormItem label={(<span>违章类型&nbsp;</span>)}>
                {getFieldDecorator('punishType')(
                  <Select style={{ width: 400 }}>
                    <Option value="">请选择</Option>
                    <Option value="punish_one">私调计价器、视频监控</Option>
                    <Option value="punish_two">在车站、码头、机场、口岸区域及市区主干道两侧街道专用候客站不遵守有关规定，妨碍营运秩序</Option>
                    <Option value="punish_three">无驾驶准许证或使用无效驾驶准许证从事出租营运</Option>
                    <Option value="punish_four">拒绝载客</Option>
                    <Option value="punish_five">未在出租车内外规定位置印制、张贴或者悬挂车主名称、驾驶准许证、价目表、本车车牌号、市运政管理机关的投诉电话号码</Option>
                    <Option value="punish_six">未在车辆内外规定位置印制、张贴经营企业名称、驾驶准许证、价目表、本车车牌号、服务承诺的主要内容、市主管部门的投诉电话号码和市主管部门认为有必要让乘客知道的内容</Option>
                    <Option value="punish_seven">营运载客时不使用或不当使用计价表</Option>
                    <Option value="punish_eight">在车站、码头、机场、口岸区域及市内主干道专用候车站不按顺序候客</Option>
                    <Option value="punish_nine">不按照规定停车上下客</Option>
                    <Option value="punish_ten">营运载客时不使用计价表</Option>
                    <Option value="punish_eleven">未使用标准座套</Option>
                    <Option value="punish_twelve">车厢不整洁</Option>
                    <Option value="punish_thirteen">车内吸烟</Option>
                    <Option value="punish_fourteen">不按规定穿着工服或佩戴工作证</Option>
                    <Option value="punish_fifteen">其它</Option>
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
                    type: 'punishStore/queryPage',
                    pageNo: current,
                    pageSize,
                    ...values,
                  })
                })
              },
              onChange(page, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
                form.validateFields((err, values) => {
                  dispatch({
                    type: 'punishStore/queryPage',
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

function mapStateToProps({ loading, punishStore }) {
  return {
    loading: loading.models.punishStore,
    register: punishStore.register,
    res: punishStore.res,
    page: punishStore.page,
  }
}

Index = Form.create()(Index)
export default connect(mapStateToProps)(Index)
