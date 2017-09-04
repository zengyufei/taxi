/*
 * @Author: zengyufei
 * @Date: 2017-08-22 17:50:34
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-09-04 14:10:18
 */
import { Button, Table, Popconfirm, Upload, Modal } from 'antd'

import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'

import Add from './Add'
import Update from './Update'
import Info from './Info'

import { tokenSessionKey, prefix, name, storeName,
  searchCacheKey, defaultSearchFields, allSearchFields, importAction, exportFileParam, exportFileAction, // 搜索条
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

  const { onSearch, onReset, toAdd, toEdit, toInfo, exportFile, exportExample, onShowSizeChange, onChange } = methods

  const { handlerUpload, synthesizeing, synthesize, drivingLicenseing, drivingLicense, taximetering, taximeter } = methods

  /**
   * 搜索条
   */
  const uploadProps = {
    name: 'file',
    action: importAction,
    headers: {
      token: session.get(tokenSessionKey),
    },
    onChange: handlerUpload,
  }


  const btns = (
    <div style={{ marginTop: '-30px' }}>
      <div style={{ marginBottom: '3px' }}>
        <Button type="primary" icon="clock-circle-o" onClick={synthesizeing}>营运证年审即将过期</Button>&nbsp;
        <Button type="primary" icon="close-circle-o" onClick={synthesize}>营运证年审已过期</Button>&nbsp;
        <Button type="primary" icon="clock-circle-o" onClick={drivingLicenseing}>行驶证即将过期</Button>&nbsp;
        <Button type="primary" icon="close-circle-o" onClick={drivingLicense}>行驶证已过期</Button>&nbsp;
      </div>
      <div style={{ marginBottom: '3px' }}>
        <ZButton permission="car:annualVerification:insert">
          <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增{name}</Button>&nbsp;
        </ZButton>
        <ZButton permission="car:annualVerification:export">
          <Popconfirm title="是否确定要导出" onConfirm={exportFile} >
            <Button type="primary" icon="export" >导出</Button>&nbsp;
          </Popconfirm>
        </ZButton>
        <ZButton permission="car:annualVerification:import">
          <Upload {...uploadProps} style={{ display: 'inline-block' }}>
            <Button type="primary" icon="download" >导入</Button>
          </Upload>
          <Button type="primary" icon="export" onClick={exportExample}>下载导入模板</Button>&nbsp;
        </ZButton>
        <Button type="primary" icon="clock-circle-o" onClick={taximetering}>计价器即将过期</Button>&nbsp;
        <Button type="primary" icon="close-circle-o" onClick={taximeter}>计价器已过期</Button>&nbsp;
      </div>
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

    onSearch(values) {
      dispatch({
        type: `${storeName}/queryPage`,
        ...values,
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
    synthesizeing() {
      dispatch({
        type: `${storeName}/warnList`,
        warningEnum: 'synthesizeDate',
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
      })
    },
    synthesize() {
      dispatch({
        type: `${storeName}/warnList`,
        warningEnum: 'synthesizeDate',
        endDate: moment().format('YYYY-MM-DD'),
      })
    },
    drivingLicenseing() {
      dispatch({
        type: `${storeName}/warnList`,
        warningEnum: 'drivingLicenseDate',
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
      })
    },
    drivingLicense() {
      dispatch({
        type: `${storeName}/warnList`,
        warningEnum: 'drivingLicenseDate',
        endDate: moment().format('YYYY-MM-DD'),
      })
    },
    taximetering() {
      dispatch({
        type: `${storeName}/warnList`,
        warningEnum: 'taximeterDate',
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
      })
    },
    taximeter() {
      dispatch({
        type: `${storeName}/warnList`,
        warningEnum: 'taximeterDate',
        endDate: moment().format('YYYY-MM-DD'),
      })
    },

    toAdd() {
      dispatch({
        type: 'carStore/updateState',
        car: {},
        plateList: [],
      })
      dispatch({
        type: `${storeName}/updateState`,
        res: 'Add',
        pageState: true,
        synthesizeFileList: [],
        synthesizeFile: '',
        drivingLicenseFileList: [],
        drivingLicenseFile: '',
        taximeterFileList: [],
        taximeterFile: '',
      })
    },

    toEdit(annualVerification) {
      dispatch({
        annualVerification,
        type: `${storeName}/toEdit`,
        res: 'Update',
      })
    },

    toInfo(annualVerification) {
      dispatch({
        annualVerification,
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
      window.location.href = `${exportFileAction}?token=${token}&${paramsForGet}`
    },

    exportExample() {
      window.location.href = `${exportFileAction}?token=${session.get(tokenSessionKey)}&carNo=-1`
    },

    onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
      let values = form.getFieldsValue()
      dispatch({
        type: `${storeName}/queryPage`,
        pageNo: current,
        pageSize,
        ...values,
      })
    },

    onChange(current, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
      let values = form.getFieldsValue()
      dispatch({
        type: `${storeName}/queryPage`,
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


  }
}


export default PageUtils.extend({ prefix, mapStateToProps, mapDispatchToProps, formOptions: true })(List)
