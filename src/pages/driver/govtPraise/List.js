import { connect } from 'dva'
import { Form, Input, Button, Icon, Popconfirm, Alert, Table, message, Upload, Modal } from 'antd'
import styles from './Page.css'
import Add from './Add'
import Update from './Update'
import Detail from './Detail'
import qs from 'qs'

const FormItem = Form.Item
const { tokenSessionKey, resourceSessionKey } = constant

let index = option => {
  const { loading, methods, form, res, register, page } = option
  const { onSearch, toDetail, toAdd, toEdit, toExport, onShowSizeChange, onChange, handlerUpload } = methods

  /* 跳转网址页面 */
  open(text) {
    window.open(text)
  }

  /* 详情 */
  toDetail(govtPraise) {
    dispatch({
      type: 'govtPraiseStore/toEdit',
      res: 'detail',
      govtPraise,
    })
  }
  /* 添加 */
  toAdd() {
    dispatch({
      type: 'govtPraiseStore/toRegister',
      res: 'add',
    })
  }
  /* 编辑 */
  toEdit(govtPraise) {
    dispatch({
      type: 'govtPraiseStore/toEdit',
      res: 'update',
      govtPraise,
    })
  }

  /* 删除 */
  confirm(id) {
    dispatch({
      type: 'govtPraiseStore/deleteById',
      id,
    })
  }

  
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
    window.location.href = `${BASE_URL}/driver/govtPraise/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
  }

  /**
   * 上传文件
   
   */
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/driver/govtPraise/import.htm?token=${session.get(tokenSessionKey)}`,
    onChange: handlerUpload,
  }

  const btns = (
    <div>
      <ZButton permission="driver:govt:insert">
        <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
      </ZButton>
      <ZButton permission="driver:govt:export">
        <Popconfirm title="是否确定要导出" onConfirm={toExport} >
          <Button type="primary" icon="export" >导出</Button>&nbsp;
        </Popconfirm>
      </ZButton>
      <ZButton permission="driver:govt:import">
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
    searchCacheKey: 'govtPraise_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber']).values(),
    fields: getFields(fields, local.get('govtPraise_condin') || ['carNo', 'plateNumber']).values(),
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
          <ZButton permission="driver:govt:query">
            <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
          </ZButton>
          <ZButton permission="driver:govt:update">
            <Button type="primary" onClick={() => toEdit(record)}>编辑</Button>&nbsp;
          </ZButton>
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
    name: '文件名称',
    
    key: 'praiseFileName',
  }, {
    name: '政府部门',
    
    key: 'govtOrg',
  }, {
    name: '表彰时间',
    
    key: 'creditDate',
  }, {
    name: '等级',
    
    key: 'praiseGrade',
    render: text => {
      if (text == 'COUNTRY') {
        return '国家级'
      } else if (text == 'PROVINCE') {
        return '省级'
      } else if (text == 'CITY') {
        return '市级'
      } else {
        return '区级'
      }
    },
  }, {
    name: '网址链接',
    
    key: 'newsUrl',
    render: text => {
      return <a onClick={() => open(text)}>{text}</a>
    },
  }, {
    name: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <ZButton permission="driver:govt:query">
          <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
        </ZButton>
        <ZButton permission="driver:govt:update">
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
            <ZButton permission="driver:govt:insert">
              <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
            </ZButton>
            <ZButton permission="driver:govt:export">
              <Popconfirm title="是否确定要导出" onConfirm={toExport} >
                <Button type="primary" icon="export" >导出</Button>&nbsp;
              </Popconfirm>
            </ZButton>
            <ZButton permission="driver:govt:import">
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
              <Button type="primary" htmlType="submit">查询</Button>
            </Form>
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
              onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                form.validateFields((err, values) => {
                  dispatch({
                    type: 'govtPraiseStore/queryPage',
                    pageNo: current,
                    pageSize,
                    ...values,
                  })
                })
              },
              onChange(page, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
                form.validateFields((err, values) => {
                  dispatch({
                    type: 'govtPraiseStore/queryPage',
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

const mapStateToProps = ({ loading, govtPraiseStore }) => {
  return {
    loading: loading.models.govtPraiseStore,
    register: govtPraiseStore.register,
    res: govtPraiseStore.res,
    page: govtPraiseStore.page,
  }
}


const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      onSearch(values) {
        dispatch({
          type: 'govtPraiseStore/queryPage',
          ...values,
        })
      },

      /* 详情 */
      toDetail(govtPraise) {
        dispatch({
          type: 'govtPraiseStore/toEdit',
          res: 'detail',
          govtPraise,
        })
      },
      /* 添加 */
      toAdd() {
        dispatch({
          type: 'govtPraiseStore/toRegister',
          res: 'add',
        })
      },
      /* 编辑 */
      toEdit(govtPraise) {
        dispatch({
          type: 'govtPraiseStore/toEdit',
          res: 'update',
          govtPraise,
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
        window.location.href = `${BASE_URL}/govtPraise/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'govtPraiseStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'govtPraiseStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },


      handlerUpload(info) {
        if (info.file.status !== 'uploading') {
          console.log('uploading')
        }
        if (info.file.status === 'done') {
          // console.log(`${info.file.name} file uploaded successfully`);
          console.log(info)
          Modal.info({
            name: '导入结果',
            content: (
              info.file.response.msg
            ),
            onOk() {
              dispatch({
                type: 'govtPraiseStore/queryPage',
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
export default connect(mapStateToProps, mapDispatchToProps)(index)
