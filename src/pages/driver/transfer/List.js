import { connect } from 'dva'
import { Button, Popconfirm, Table, Upload, Modal } from 'antd'
import qs from 'qs'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'

import Add from './Add'
import Update from './Update'
import Detail from './Detail'

const { tokenSessionKey } = constant

let index = option => {
  const { loading, page, methods, form, res, register } = option
  const { onSearch, toDetail, toAdd, toEdit, toExport, onShowSizeChange, onChange, handlerUpload } = methods

  /**
   * 上传文件
   */
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/driver/transfer/import.htm?token=${session.get(tokenSessionKey)}`,
    onChange: handlerUpload,
  }

  const btns = (
    <div>
      <ZButton permission="driver:transfer:insert">
        <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
      </ZButton>
      <ZButton permission="driver:transfer:export">
        <Popconfirm title="是否确定要导出" onConfirm={toExport} >
          <Button type="primary" icon="export" >导出</Button>&nbsp;
        </Popconfirm>
      </ZButton>
      <ZButton permission="driver:transfer:import">
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
    searchCacheKey: 'transfer_condin',
    searchFields: getSearchFields(seachFields).values(),
    fields: getFields(seachFields, local.get('transfer_condin') || ['carNo', 'plateNumber', 'opratorUser', 'startDate']).values(),
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
          <ZButton permission="driver:transfer:query">
            <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
          </ZButton>
          <ZButton permission="driver:transfer:update">
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

const mapStateToProps = ({ loading, transferStore }) => {
  return {
    loading: loading.models.transferStore,
    register: transferStore.register,
    res: transferStore.res,
    page: transferStore.page,
  }
}


const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      onSearch(values) {
        if (values) {
          if (values.startDate) {
            values.startDate = moment(values.startDate).format('YYYY-MM-DD')
          }
        }
        dispatch({
          type: 'transferStore/queryPage',
          ...values,
        })
      },

      /* 详情 */
      toDetail(transfer) {
        dispatch({
          type: 'transferStore/toEdit',
          res: 'detail',
          transfer,
        })
      },
      /* 添加 */
      toAdd() {
        dispatch({
          type: 'transferStore/toRegister',
          res: 'add',
        })
      },
      /* 编辑 */
      toEdit(transfer) {
        dispatch({
          type: 'transferStore/toEdit',
          res: 'update',
          transfer,
        })
      },

      /* 删除 */
      confirm(id) {
        dispatch({
          type: 'transferStore/deleteById',
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
        window.location.href = `${BASE_URL}/driver/transfer/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'transferStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'transferStore/queryPage',
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
                type: 'transferStore/queryPage',
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
  name: '旧车主姓名',
  key: 'oldUserName',
}, {
  name: '旧车主资格证',
  key: 'oldQualificationNo',
}, {
  name: '新车主姓名',
  key: 'newUserName',
}, {
  name: '新车主从业资格证',
  key: 'newQualificationNo',
}, {
  name: '过户时间',
  key: 'transferDate',
}]

const seachFields = [{
  name: '自编号',
  key: 'carNo',
}, {
  name: '车牌号',
  key: 'plateNumber',
}, {
  name: '经办人',
  key: 'opratorUser',
}, {
  name: '过户日期',
  key: 'startDate',
  type: 'date',
}]


export default connect(mapStateToProps, mapDispatchToProps)(index)
