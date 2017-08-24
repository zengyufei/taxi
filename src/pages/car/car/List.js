/**
 * 依赖的摆放顺序是：
 * 1. 非按需加载在最上面
 * 2. 按需加载的在下面
 * 3. 按长度从短到长
 * 4. 从对象再获取对象点出来的在按需加载下面
 * 5. 本系统业务对象在最下面，且路径不应该为相对路径，应为别名路径，别名查看 webpack.config.js
 */
import { connect } from 'dva'
import { Button, Table, Popconfirm, Upload, Modal } from 'antd'
import qs from 'qs'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'

import CarAdd from './Add.js'
import CarUpdate from './Update.js'
import CarInfo from './Info.js'

const { tokenSessionKey } = constant

let Car = options => {
  const { loading, form, methods, page, res, pageState } = options
  const { toInfo, toEdit, exportCar, toAdd, onSearch, onShowSizeChange, onChange, upload } = methods

  /**
   * 上传文件
   */
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/car/import.htm?token=${session.get(tokenSessionKey)}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange: upload,
  }
  const btns = (
    <div>
      <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
      <Popconfirm title="是否确定要导出" onConfirm={exportCar} >
        <Button type="primary" icon="export">导出</Button>&nbsp;
      </Popconfirm>
      <Upload {...importCar}>
        <Button type="primary" icon="download">导入</Button>
      </Upload>
    </div>
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'car_condin',
    searchFields: getSearchFields(searchFields).values(),
    fields: getFields(searchFields, local.get('car_condin') || ['carNo', 'plateNumber', 'carType']).values(),
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
          <span>
            <Button type="primary" onClick={() => toInfo(record)} >详情</Button>&nbsp;
            <Button type="primary" onClick={() => toEdit(record)} >编辑</Button>&nbsp;
          </span>
        </span>
      )
    },
  }]
  const tableColumns = getColumns(fields).enhance(operatorColumn).values()


  let pageSwitch
  if (res === 'carAdd') {
    pageSwitch = <CarAdd key="carAdd" />
  } else if (res === 'carUpdate') {
    pageSwitch = <CarUpdate key="carUpdate" />
  } else if (res === 'carInfo') {
    pageSwitch = <CarInfo key="carInfo" />
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

function mapStateToProps({ loading, carStore }) {
  return {
    loading: loading.models.carStore,
    page: carStore.page,
    pageState: carStore.pageState,
    res: carStore.res,
    car: carStore.car,
  }
}


const mapDispatchToProps = (dispatch, { form }) => {
  return {
    methods: {
      queryPage() {
        dispatch({
          type: 'carStore/queryPage',
          carNo: form.getFieldValue('carNo'),
          carType: form.getFieldValue('carType'),
          plateNumber: form.getFieldValue('plateNumber'),
        })
      },

      onSearch(values) {
        if (values) {
          if (values.ownershipDate) {
            values.ownershipBeginDate = values.ownershipDate[0].format('YYYY-MM-DD')
            values.ownershipEndDate = values.ownershipDate[1].format('YYYY-MM-DD')
            delete values.ownershipDate
          }
          if (values.roadTransportDate) {
            values.roadTransportBeginDate = values.roadTransportDate[0].format('YYYY-MM-DD')
            values.roadTransportEndDate = values.roadTransportDate[1].format('YYYY-MM-DD')
            delete values.roadTransportDate
          }
          if (values.drivingLicenseDate) {
            values.drivingLicenseDate = moment(new Date(parseInt(values.drivingLicenseDate, 10))).format('YYYY-MM-DD')
          }
        }
        dispatch({
          type: 'carStore/queryPage',
          ...values,
        })
      },

      toAdd() {
        dispatch({
          type: 'carStore/toAdd',
          res: 'carAdd',
        })
      },

      toEdit(car) {
        dispatch({
          car,
          type: 'carStore/toEdit',
          res: 'carUpdate',
        })
      },

      toInfo(car) {
        dispatch({
          car,
          type: 'carStore/toInfo',
          res: 'carInfo',
        })
      },


      exportCar() {
        const token = session.get(tokenSessionKey)
        const carNo = form.getFieldValue('carNo')
        const plateNumber = form.getFieldValue('plateNumber')
        const params = {
          carNo,
          plateNumber,
        }
        // 删除空值、undefind
        Object.keys(params).map(v => params[v] || delete params[v])
        const paramsForGet = (params && qs.stringify(params)) || ''
        window.location.href = `${BASE_URL}/car/export.htm?token=${token}&${paramsForGet}`
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'carStore/queryPage',
          pageNo: current,
          pageSize,
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'carStore/queryPage',
          pageNo: current,
          pageSize,
        })
      },


      upload(info) {
        if (info.file.status !== 'uploading') {
          console.log('uploading')
        }
        if (info.file.status === 'done') {
          // console.log(`${info.file.name} file uploaded successfully`);
          console.log(info)
          Modal.info({
            title: '导入结果',
            content: (
              info.file.response.msg
            ),
            onOk() {
              dispatch({
                type: 'carStore/queryPage',
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

const fields = [
  {
    name: '自编号',
    key: 'carNo',
  }, {
    name: '车牌号',
    key: 'plateNumber',
  }, {
    name: '车辆类型',
    key: 'carTypeName',
  }, {
    name: '车架号',
    key: 'carFrame',
  }, {
    name: '产权证号',
    key: 'ownershipNo',
  }, {
    name: '产权证日期',
    key: 'ownershipBeginDate',
  }, {
    name: '产权证结束日期',
    key: 'ownershipEndDate',
  }, {
    name: '发动机号',
    key: 'engineNumber',
  }, {
    name: '行驶证注册日期',
    key: 'drivingLicenseDate',
  }, {
    name: '道路运输证起止日期',
    key: 'roadTransportBeginDate',
  }, {
    name: '道路运输证截止日期',
    key: 'roadTransportEndDate',
  }, {
    name: '车身颜色',
    key: 'carColorName',
  }, {
    name: '车辆营运状态',
    key: 'carStatusName',
  }, {
    name: '机动车登记证号',
    key: 'certificateNo',
  }]


const searchFields = [
  {
    name: '自编号',
    key: 'carNo',
  }, {
    name: '车牌号',
    key: 'plateNumber',
  }, {
    name: '车辆类型',
    key: 'carType',
    type: 'carType',
  }, {
    name: '车架号',
    key: 'carFrame',
  }, {
    name: '产权证号',
    key: 'ownershipNo',
  }, /* {
    name: '产权证日期',
    key: 'ownershipDate',
    type: 'dateRange',
  },  */{
    name: '发动机号',
    key: 'engineNumber',
  }, /*  {
    name: '行驶证注册日期',
    key: 'drivingLicenseDate',
    type: 'date',
  }, {
    name: '道路运输证日期',
    key: 'roadTransportDate',
    type: 'dateRange',
  },  */{
    name: '车身颜色',
    key: 'carColor',
    type: 'carColor',
  }, {
    name: '车辆营运状态',
    key: 'carStatus',
    type: 'carStatus',
  }, {
    name: '机动车登记证号',
    key: 'certificateNo',
  }]

export default connect(mapStateToProps, mapDispatchToProps)(Car)
