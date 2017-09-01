import { Button, Table, Popconfirm, Upload, Modal } from 'antd'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'

import Add from './Add'
import Update from './Update'
import Info from './Info'

import { tokenSessionKey, prefix, storeName,
  searchCacheKey, defaultSearchFields, allSearchFields, uploadAction, exportFileParam, // 搜索条
  defaultTableFields, // 表格
} from './constant'

import fields from './fields'

const changeComponent = {
  Add: <Add key="Add" />,
  Update: <Update key="Update" />,
  Info: <Info key="Info" />,
}

const List = options => {
  const { loading, form, methods } = options
  const { initValues, page: { pageNo, pageSize, dataList, totalCount }, pageState, res } = options[storeName]
  const { toInfo, toEdit, exportFile, exportExample, toAdd, onSearch, onReset, onShowSizeChange, onChange, handlerUpload, roadTransporting, roadTransport, ownershiping, ownership } = methods

  /**
   * 搜索条
   */
  const uploadProps = {
    name: 'file',
    action: uploadAction,
    headers: {
      token: session.get(tokenSessionKey),
    },
    onChange: handlerUpload,
  }
  const btns = (
    <div>
      <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={roadTransporting}>道路运输证即将过期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={roadTransport}>道路运输证已过期</Button>&nbsp;
      <Button type="primary" icon="clock-circle-o" onClick={ownershiping}>产权证即将过期</Button>&nbsp;
      <Button type="primary" icon="close-circle-o" onClick={ownership}>产权证已过期</Button>&nbsp;
      <Popconfirm title="是否确定要导出" onConfirm={exportFile} >
        <Button type="primary" icon="export">导出</Button>&nbsp;
      </Popconfirm>
      <Upload {...uploadProps}>
        <Button type="primary" icon="download">导入</Button>
      </Upload>
      <Button type="primary" icon="export" onClick={exportExample}>下载导入模板</Button>&nbsp;
    </div>
  )
  const searchBarProps = {
    form,
    showReset: !!Object.keys(initValues).length,
    btns,
    searchCacheKey,
    searchFields: getSearchFields(fields, allSearchFields).values(),
    fields: getFields(fields, local.get(searchCacheKey) || defaultSearchFields).values(),
    item: {
      ...initValues, // 搜索框查询后 回显
    },
    onSearch,
    onReset,
  }

  /**
   * 表格
   */
  const operatorColumn = [{
    key: 'operator',
    name: '操作',
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
  const tableColumns = getColumns(fields, defaultTableFields).enhance(operatorColumn).values()

  return (
    <div>
      {
        pageState ? changeComponent[res] : <div>
          <div style={{ padding: '20px' }}>
            <ZSearch {...searchBarProps} />
          </div>

          <Table
            rowKey="id"
            dataSource={dataList}
            columns={tableColumns}
            loading={loading}
            bordered
            pagination={{ // 分页
              current: pageNo,
              total: totalCount, // 总数量
              pageSize, // 显示几条一页
              defaultPageSize: 10, // 默认显示几条一页
              showSizeChanger: true, // 是否显示可以设置几条一页的选项
              onShowSizeChange,
              onChange,
              showTotal() { // 设置显示一共几条数据
                return `共 ${totalCount} 条数据`
              },
            }}
          />
        </div>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    [storeName]: state[storeName],
  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    methods: {

      onSearch(values) {
        dispatch({
          type: `${storeName}/queryPage`,
          ...values,
        })
        dispatch({
          type: `${storeName}/updateState`,
          initValues: values,
        })
      },

      onReset() {
        dispatch({
          type: `${storeName}/queryPage`,
        })
        dispatch({
          type: `${storeName}/updateState`,
          initValues: {},
        })
      },
      /** 即将到期和已到期 */
      roadTransporting() {
        dispatch({
          type: `${storeName}/warnList`,
          warningEnum: 'roadTransportEndDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      roadTransport() {
        dispatch({
          type: `${storeName}/warnList`,
          warningEnum: 'roadTransportEndDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },
      ownershiping() {
        dispatch({
          type: `${storeName}/warnList`,
          warningEnum: 'ownershipEndDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
      },
      ownership() {
        dispatch({
          type: `${storeName}/warnList`,
          warningEnum: 'ownershipEndDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
      },

      toAdd() {
        dispatch({
          type: `${storeName}/updateState`,
          res: 'Add',
          pageState: true,
          plateList: [],
          plateImage: '',
          ownershipList: [],
          ownershipImage: '',
          roadTransportList: [],
          roadTransportImage: '',
          certificateList: [],
          certificateImage: '',
        })
      },

      toEdit(car) {
        dispatch({
          car,
          type: `${storeName}/toEdit`,
          res: 'Update',
        })
      },

      toInfo(car) {
        dispatch({
          car,
          type: `${storeName}/toInfo`,
          res: 'Info',
        })
      },


      exportFile() {
        const token = session.get(tokenSessionKey)
        const params = form.getFieldsValue(exportFileParam)
        // 删除空值、undefind
        Object.keys(params).map(v => params[v] || delete params[v])
        const paramsForGet = (params && qs.stringify(params)) || ''
        window.location.href = `${BASE_URL}/car/export.htm?token=${token}&${paramsForGet}`
      },

      exportExample() {
        window.location.href = `${BASE_URL}/car/export.htm?token=${session.get(tokenSessionKey)}&carNo=-1`
      },


      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: `${storeName}/queryPage`,
          pageNo: current,
          pageSize,
          ...form.getFieldsValue(),
        })
      },

      onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: `${storeName}/queryPage`,
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
          Modal.info({
            title: '导入结果',
            content: (
              info.file.response.msg
            ),
            onOk() {
              dispatch({
                type: `${storeName}/queryPage`,
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

export default PageUtils.extend(prefix, { mapStateToProps, mapDispatchToProps, formOptions: true })(List)
