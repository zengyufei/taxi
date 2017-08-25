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
    action: `${BASE_URL}/driver/trafficAccident/import.htm?token=${session.get(tokenSessionKey)}`,
    onChange: handlerUpload,
  }

  const btns = (
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
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'accident_condin',
    searchFields: getSearchFields(fields, ['carNo', 'plateNumber', 'userName', 'qualificationNo', 'documentNo', 'accidentModel', 'accidentNature', 'dutyType', 'accidentTime']).values(),
    fields: getFields(fields, local.get('accident_condin') || ['carNo', 'plateNumber']).values(),
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
          <ZButton permission="driver:accident:query">
            <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
          </ZButton>
          <ZButton permission="driver:accident:update">
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

const mapStateToProps = ({ loading, trafficAccidentStore, driverCommonStore }) => {
  return {
    loading: loading.models.trafficAccidentStore,
    register: trafficAccidentStore.register,
    res: trafficAccidentStore.res,
    page: trafficAccidentStore.page,
    areacodes: driverCommonStore.areacodes,
  }
}


const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {

      onSearch(values) {
        if (values) {
          if (values.accidentTime) {
            values.startAccidentTime = form.getFieldValue('accidentTime')[0].format('YYYY-MM-DD 00:00:00')
            values.endAccidentTime = form.getFieldValue('accidentTime')[1].format('YYYY-MM-DD 00:00:00')
            delete values.accidentTime
          }
        }
        dispatch({
          type: 'trafficAccidentStore/queryPage',
          ...values,
        })
      },

      /* 详情 */
      toDetail(trafficAccident) {
        dispatch({
          type: 'trafficAccidentStore/toEdit',
          res: 'detail',
          trafficAccident,
        })
      },
      /* 添加 */
      toAdd() {
        dispatch({
          type: 'trafficAccidentStore/toRegister',
          res: 'add',
        })
      },
      /* 编辑 */
      toEdit(trafficAccident) {
        dispatch({
          type: 'trafficAccidentStore/toEdit',
          res: 'update',
          trafficAccident,
        })
      },

      /* 删除 */
      confirm(id) {
        dispatch({
          type: 'trafficAccidentStore/deleteById',
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
        window.location.href = `${BASE_URL}/driver/trafficAccident/export.htm?token=${session.get(tokenSessionKey)}&${paramsForGet}`
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'trafficAccidentStore/queryPage',
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'trafficAccidentStore/queryPage',
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
                type: 'trafficAccidentStore/queryPage',
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
  name: '档案编号',
  key: 'documentNo',
}, {
  name: '肇事时间',
  key: 'accidentTime',
  type: 'dateRange',
}, {
  name: '车量类型',
  key: 'canDriverCar',
}, {
  name: '出事地点类型',
  key: 'accidentPlace',
}, {
  name: '事发区域',
  key: 'areaDesc',
}, {
  name: '事故性质',
  key: 'accidentNature',
  enums: {
    PROPERTY_LOSS: '财产损失事故',
    INJURED: '伤人事故',
    DEATH: '死亡事故',
  },
}, {
  name: '具体路段',
  key: 'accidentAddress',
}, {
  name: '事故形态',
  key: 'accidentModel',
  enums: {
    model_one: '同向侧面碰刮',
    model_two: '追尾相撞',
    model_three: '倒车相撞',
    model_four: '左转弯相撞',
    model_five: '右转弯相撞',
    model_six: '正面相撞',
    model_seven: '运行伤害人体',
    model_eight: '与其他物体相撞',
    model_nine: '其他',
  },
}, {
  name: '责任',
  key: 'dutyType',
  enums: {
    FULL_DUTY: '全责',
    MAIN_DUTY: '主责',
    SAME_DUTY: '同责',
    LESS_DUTY: '次责',
    NO_DUTY: '无责',
  },
}]

export default connect(mapStateToProps, mapDispatchToProps)(index)
