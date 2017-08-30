import { connect } from 'dva'
import { Form, Button, Table, Popconfirm, Upload, Modal } from 'antd'
import qs from 'qs'
import moment from 'moment'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'
import { local } from 'utils/storage'

import Add from './Add.js'
import Update from './Update.js'
import Info from './Info.js'

const { tokenSessionKey } = constant

let List = options => {
  const { loading, form, page, res, pageState, methods } = options
  const { onSearch, toAdd, toEdit, toInfo, exportMaintain, onShowSizeChange, onChange, handlerUpload, planFinish, planFinishing } = methods

  /**
   * 导入文件
   */
  const importMaintain = {
    name: 'file',
    action: `${BASE_URL}/maintain/import.htm?token=${session.get(tokenSessionKey)}`,
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
      <Button type="primary" icon="clock-circle-o" onClick={planFinishing}>计划完成即将过期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={planFinish}>计划完成已过期</Button>&nbsp;
      <Popconfirm title="是否确定要导出?" onConfirm={exportMaintain} >
        <Button type="primary" icon="export" >导出</Button>&nbsp;
      </Popconfirm>
      <Upload {...importMaintain}>
        <Button type="primary" icon="download" >导入</Button>
      </Upload>
    </div>
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'maintain_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber']).values(),
    fields: getFields(fields, local.get('maintain_condin') || ['carNo', 'plateNumber']).values(),
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
              current: (page && +page.pageNo),
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

function mapStateToProps({ loading, maintainStore }) {
  return {
    loading: loading.models.maintainStore,
    page: maintainStore.page,
    pageState: maintainStore.pageState,
    res: maintainStore.res,
  }
}

const fields = [{
  name: '自编号',
  key: 'carNo',
}, {
  name: '车牌号',
  key: 'plateNumber',
}, {
  name: '二级维护计划完成日期',
  key: 'planFinishDate',
}, {
  name: '二级维护实际完成日期',
  key: 'planRealityDate',
}]

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {
      queryPage() {
        dispatch({
          type: 'maintainStore/queryPage',
          carNo: form.getFieldValue('carNo'),
          plateNumber: form.getFieldValue('plateNumber'),
        })
      },
      /** 即将到期和已到期 */
      planFinishing() {
        dispatch({
          type: 'maintainStore/warnList',
          warningEnum: 'planFinishDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      planFinish() {
        dispatch({
          type: 'maintainStore/warnList',
          warningEnum: 'planFinishDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },

      toAdd() {
        dispatch({
          type: 'carStore/setCarNull',
        })
        dispatch({
          type: 'maintainStore/toAdd',
          res: 'Add',
        })
      },

      toEdit(maintain) {
        dispatch({
          maintain,
          type: 'maintainStore/toUpdate',
          res: 'Update',
        })
      },

      toInfo(maintain) {
        dispatch({
          maintain,
          type: 'maintainStore/toInfo',
          res: 'Info',
        })
      },

      exportMaintain() {
        const carNo = form.getFieldValue('carNo')
        const plateNumber = form.getFieldValue('plateNumber')
        const params = {
          carNo,
          plateNumber,
        }
        // 删除空值、undefind
        Object.keys(params).map(v => params[v] || delete params[v])
        const paramsForGet = (params && qs.stringify(params)) || ''
        window.location.href = `${BASE_URL}/maintain/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onSearch(values) {
        dispatch({
          type: 'maintainStore/queryPage',
          ...values,
          pageNo: 1,
          pageSize: 10,
        })
      },

      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'maintainStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },
      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'maintainStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      handlerUpload() { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'maintainStore/queryPage',
        })
      },


    },
  }
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(List))
