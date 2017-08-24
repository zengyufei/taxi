import { connect } from 'dva'
import { Button, Table, Popconfirm, Input, Form, Upload, Modal } from 'antd'
import qs from 'qs'

import styles from './Maintain.css'
import MaintainAdd from './MaintainAdd.js'
import MaintainUpdate from './MaintainUpdate.js'
import MaintainInfo from './MaintainInfo.js'

const FormItem = Form.Item
const { tokenSessionKey } = constant

let Maintain = option => {
  const columns = [{
    title: '自编号',
    dataIndex: 'carNo',
    key: 'carNo',
  }, {
    title: '车牌号',
    dataIndex: 'plateNumber',
    key: 'plateNumber',
  }, {
    title: '二级维护计划完成日期',
    dataIndex: 'planFinishDate',
    key: 'planFinishDate',
  }, {
    title: '二级维护实际完成日期',
    dataIndex: 'planRealityDate',
    key: 'planRealityDate',
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

  const { loading, form, page, dispatch, res, pageState } = option
  const { getFieldDecorator } = form

  function queryPage() {
    dispatch({
      type: 'maintainStore/queryPage',
      carNo: form.getFieldValue('carNo'),
      plateNumber: form.getFieldValue('plateNumber'),
    })
  }

  function toAdd() {
    dispatch({
      type: 'carStore/setCarNull',
    })
    dispatch({
      type: 'maintainStore/toAdd',
      res: 'maintainAdd',
    })
  }

  function toEdit(maintain) {
    dispatch({
      maintain,
      type: 'maintainStore/toUpdate',
      res: 'maintainUpdate',
    })
  }

  function toInfo(maintain) {
    dispatch({
      maintain,
      type: 'maintainStore/toInfo',
      res: 'maintainInfo',
    })
  }

  let pageSwitch
  if (res === 'maintainAdd') {
    pageSwitch = <MaintainAdd key="maintainAdd" />
  } else if (res === 'maintainUpdate') {
    pageSwitch = <MaintainUpdate key="maintainUpdate" />
  } else if (res === 'maintainInfo') {
    pageSwitch = <MaintainInfo key="maintainInfo" />
  }

  const token = session.get(tokenSessionKey)
  function exportMaintain() {
    const carNo = form.getFieldValue('carNo')
    const plateNumber = form.getFieldValue('plateNumber')
    const params = {
      carNo,
      plateNumber,
    }
    // 删除空值、undefind
    Object.keys(params).map(v => params[v] || delete params[v])
    const paramsForGet = (params && qs.stringify(params)) || ''
    window.location.href = `/maintain/export.htm?token=${token}&${paramsForGet}`
  }

  /**
   * 导入文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importMaintain = {
    name: 'file',
    action: `${BASE_URL}/maintain/import.htm?token=${token}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log('uploading')
      }
      if (info.file.status === 'done') {
        console.log('done')
        // console.log(`${info.file.name} file uploaded successfully`);
        console.log(info)

        Modal.info({
          title: '导入结果',
          content: (
            info.file.response.msg
          ),
          onOk() {
            dispatch({
              type: 'maintainStore/queryPage',
            })
          },
        })
      } else if (info.file.status === 'error') {
        console.log('error')
      }
    },
  }

  return (
    <div>
      {
        pageState ? pageSwitch : <div>
          <div>
            <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
            <Popconfirm title="是否确定要导出?" onConfirm={exportMaintain} >
              <Button type="primary" icon="export" >导出</Button>&nbsp;
            </Popconfirm>
            <Upload {...importMaintain}>
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
            loading={loading}
            bordered
            pagination={{ // 分页
              total: (page && +page.totalCount) || 0, // 总数量
              pageSize: (page && +page.pageSize) || 10, // 显示几条一页
              defaultPageSize: 10, // 默认显示几条一页
              showSizeChanger: true, // 是否显示可以设置几条一页的选项
              onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                dispatch({
                  type: 'maintainStore/queryPage',
                  pageNo: current,
                  pageSize,
                })
              },
              onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
                dispatch({
                  type: 'maintainStore/queryPage',
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

function mapStateToProps({ loading, maintainStore }) {
  return {
    loading: loading.models.maintainStore,
    page: maintainStore.page,
    pageState: maintainStore.pageState,
    res: maintainStore.res,
  }
}

Maintain = Form.create()(Maintain)
export default connect(mapStateToProps)(Maintain)
