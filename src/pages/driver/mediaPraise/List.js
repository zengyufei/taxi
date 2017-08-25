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
  const { loading, methods, form, res, register, page } = option
  const { onSearch, toDetail, toAdd, toEdit, toExport, onShowSizeChange, onChange, handlerUpload } = methods

  /**
   * 上传文件
   
   */
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/driver/mediaPraise/import.htm?token=${session.get(tokenSessionKey)}`,
    onChange: handlerUpload,
  }

  const btns = (
    <div>
      <ZButton permission="driver:media:insert">
        <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
      </ZButton>
      <ZButton permission="driver:media:export">
        <Popconfirm title="是否确定要导出" onConfirm={toExport} >
          <Button type="primary" icon="export" >导出</Button>&nbsp;
        </Popconfirm>
      </ZButton>
      <ZButton permission="driver:media:import">
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
    searchCacheKey: 'media_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber', 'userName', 'qualificationNo']).values(),
    fields: getFields(fields, local.get('media_condin') || ['carNo', 'plateNumber', 'userName', 'qualificationNo']).values(),
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
          <ZButton permission="driver:media:query">
            <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
          </ZButton>
          <ZButton permission="driver:media:update">
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

const mapStateToProps = ({ loading, mediaPraiseStore }) => {
  return {
    loading: loading.models.mediaPraiseStore,
    register: mediaPraiseStore.register,
    res: mediaPraiseStore.res,
    page: mediaPraiseStore.page,
  }
}


const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      onSearch(values) {
        dispatch({
          type: 'mediaPraiseStore/queryPage',
          ...values,
        })
      },

      /* 详情 */
      toDetail(mediaPraise) {
        dispatch({
          type: 'mediaPraiseStore/toEdit',
          res: 'detail',
          mediaPraise,
        })
      },
      /* 添加 */
      toAdd() {
        dispatch({
          type: 'mediaPraiseStore/toRegister',
          res: 'add',
        })
      },
      /* 编辑 */
      toEdit(mediaPraise) {
        dispatch({
          type: 'mediaPraiseStore/toEdit',
          res: 'update',
          mediaPraise,
        })
      },

      /* 删除 */
      confirm(id) {
        dispatch({
          type: 'mediaPraiseStore/deleteById',
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
        window.location.href = `${BASE_URL}/driver/mediaPraise/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'mediaPraiseStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'mediaPraiseStore/queryPage',
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
                type: 'mediaPraiseStore/queryPage',
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
  name: '报道名称',
  key: 'praiseFileName',
}, {
  name: '媒体协会',
  key: 'mediaOrg',
}, {
  name: '表彰时间',
  key: 'creditDate',
}, {
  name: '等级',
  key: 'praiseGrade',
  enums: {
    COUNTRY: '国家级',
    PROVINCE: '省级',
    CITY: '市级',
    DISTRICT: '区级',
  },
}, {
  name: '网址链接',
  key: 'newsUrl',
  type: 'href',
}]

export default connect(mapStateToProps, mapDispatchToProps)(index)
