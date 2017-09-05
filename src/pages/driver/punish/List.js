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

let index = options => {
  const { loading, methods, form, res, register, page } = options
  const { onSearch, toDetail, toAdd, toEdit, toExport, onShowSizeChange, onChange, handlerUpload } = methods

  /**
   * 上传文件
   */
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/driver/punish/import.htm?token=${session.get(tokenSessionKey)}`,
    onChange: handlerUpload,
  }

  const btns = (
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
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'punish_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber', 'userName', 'qualificationNo', 'punishType', 'creditTime']).values(),
    fields: getFields(fields, local.get('punish_condin') || ['carNo', 'plateNumber']).values(),
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
          <ZButton permission="driver:punish:query">
            <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
          </ZButton>
          <ZButton permission="driver:punish:update">
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

const mapStateToProps = ({ loading, punishStore }) => {
  return {
    loading: loading.models.punishStore,
    register: punishStore.register,
    res: punishStore.res,
    page: punishStore.page,
  }
}


const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      onSearch(values) {
        if (values) {
          if (values.creditTime) {
            values.startTime = moment(new Date(values.creditTime)).format('YYYY-MM-DD')
            values.endTime = moment(new Date(values.creditTime)).format('YYYY-MM-DD')
            delete values.creditTime
          }
        }
        dispatch({
          type: 'punishStore/queryPage',
          ...values,
        })
      },

      /* 详情 */
      toDetail(punish) {
        dispatch({
          type: 'punishStore/toEdit',
          res: 'detail',
          punish,
        })
      },
      /* 添加 */
      toAdd() {
        dispatch({
          type: 'punishStore/toRegister',
          res: 'add',
        })
      },
      /* 编辑 */
      toEdit(punish) {
        dispatch({
          type: 'punishStore/toEdit',
          res: 'update',
          punish,
        })
      },

      /* 删除 */
      confirm(id) {
        dispatch({
          type: 'punishStore/deleteById',
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
        window.location.href = `${BASE_URL}/driver/punish/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        let values = form.getFieldsValue();
        if (values) {
          if (values.creditTime) {
            values.startTime = moment(new Date(values.creditTime)).format('YYYY-MM-DD')
            values.endTime = moment(new Date(values.creditTime)).format('YYYY-MM-DD')
            delete values.creditTime
          }
        }
        dispatch({
          type: 'punishStore/queryPage',
          pageNo: current,
          pageSize,
          ...values,
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        let values = form.getFieldsValue();
        if (values) {
          if (values.creditTime) {
            values.startTime = moment(new Date(values.creditTime)).format('YYYY-MM-DD')
            values.endTime = moment(new Date(values.creditTime)).format('YYYY-MM-DD')
            delete values.creditTime
          }
        }
        dispatch({
          type: 'punishStore/queryPage',
          pageNo: current,
          pageSize,
          ...values,
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
                type: 'punishStore/queryPage',
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
  name: '违章类型',
  key: 'punishType',
  enums: {
    punish_one: '私调计价器、视频监控',
    punish_two: '在车站、码头、机场、口岸区域及市区主干道两侧街道专用候客站不遵守有关规定，妨碍营运秩序',
    punish_three: '无驾驶准许证或使用无效驾驶准许证从事出租营运',
    punish_four: '拒绝载客',
    punish_five: '未在出租车内外规定位置印制、张贴或者悬挂车主名称、驾驶准许证、价目表、本车车牌号、市运政管理机关的投诉电话号码',
    punish_six: '未在车辆内外规定位置印制、张贴经营企业名称、驾驶准许证、价目表、本车车牌号、服务承诺的主要内容、市主管部门的投诉电话号码和市主管部门认为有必要让乘客知道的内容',
    punish_seven: '营运载客时不使用或不当使用计价表',
    punish_eight: '在车站、码头、机场、口岸区域及市内主干道专用候车站不按顺序候客',
    punish_nine: '不按照规定停车上下客',
    punish_ten: '营运载客时不使用计价表',
    punish_eleven: '未使用标准座套',
    punish_twelve: '车厢不整洁',
    punish_thirteen: '车内吸烟',
    punish_fourteen: '不按规定穿着工服或佩戴工作证',
    punish_fifteen: '其它',
  },
  formItemLayout: {
    labelCol: {
      span: 2,
    },
    itemCol: {
      span: 24,
    },
    wrapperCol: {
      span: 22,
    },
  },
}, {
  name: '具体地址',
  key: 'detailAddress',
}, {
  name: '发生时间',
  key: 'creditTime',
  type: 'date',
}, {
  name: '发生经过',
  key: 'creditDesc',
}, {
  name: '处理结果',
  key: 'punishResult',
}]

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(index))
