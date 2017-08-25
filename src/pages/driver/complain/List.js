import { connect } from 'dva'
import { Form, Button, Popconfirm, Table, Upload, Modal } from 'antd'
import qs from 'qs'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'

import Add from './Add'
import Update from './Update'
import Detail from './Detail'

const { tokenSessionKey } = constant

const index = options => {
  const { loading, methods, form, res, register, page } = options
  const { onSearch, toDetail, toAdd, toEdit, toExport, onShowSizeChange, onChange, handlerUpload } = methods

  /**
   * 上传文件
   */
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/driver/complain/import.htm?token=${session.get(tokenSessionKey)}`,
    onChange: handlerUpload,
  }

  const btns = (
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
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'complain_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber', 'userName', 'qualificationNo', 'complainType', 'inFault', 'punish']).values(),
    fields: getFields(fields, local.get('complain_condin') || ['carNo', 'plateNumber', 'userName', 'qualificationNo', 'complainType', 'inFault', 'punish']).values(),
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
          <ZButton permission="driver:complain:query">
            <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
          </ZButton>
          <ZButton permission="driver:complain:update">
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

  return (
    <div>
      {
        register ? a : <div>
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

const mapStateToProps = ({ loading, complainStore }) => {
  return {
    loading: loading.models.complainStore,
    register: complainStore.register,
    res: complainStore.res,
    page: complainStore.page,
  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      onSearch(values) {
        dispatch({
          type: 'complainStore/queryPage',
          ...values,
        })
      },

      /* 详情 */
      toDetail(complain) {
        dispatch({
          type: 'complainStore/toEdit',
          res: 'detail',
          complain,
        })
      },
      /* 添加 */
      toAdd() {
        dispatch({
          type: 'complainStore/toRegister',
          res: 'add',
        })
      },
      /* 编辑 */
      toEdit(complain) {
        dispatch({
          type: 'complainStore/toEdit',
          res: 'update',
          complain,
        })
      },

      /* 删除 */
      confirm(id) {
        dispatch({
          type: 'complainStore/deleteById',
          id,
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
        window.location.href = `${BASE_URL}/driver/complain/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'complainStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'complainStore/queryPage',
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
                type: 'complainStore/queryPage',
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
  name: '来电者姓名',
  key: 'callName',
}, {
  name: '来电者联系方式',
  key: 'callMobile',
}, {
  name: '投诉类型',
  key: 'complainType',
  enums: {
    complain_one: '不打表营运',
    complain_two: '不提供有效车票',
    complain_three: '多收费',
    complain_four: '服务态度差',
    complain_five: '拒载',
    complain_six: '咪表有问题',
    complain_seven: '拼客',
    complain_eight: '绕路',
    complain_nine: '危险驾驶',
    complain_ten: '误导乘客',
    complain_eleven: '议价',
    complain_twelve: '中途甩客',
    complain_thirteen: '其它类',
  },
}, {
  name: '来电时间',
  key: 'callTime',
}, {
  name: '事情发生时间',
  key: 'creditTime',
}, {
  name: '回复乘客时间',
  key: 'replyTime',
}, {
  name: '驾驶员是否有责',
  key: 'inFault',
  enums: {
    true: '是',
    false: '否',
  },
}, {
  name: '是否考核',
  key: 'punish',
  enums: {
    true: '是',
    false: '否',
  },
}]

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(index))
