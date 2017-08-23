import { connect } from 'dva'
import { Button, Popconfirm, Table } from 'antd'
import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'
import { local } from 'utils/storage'

const List = option => {
  const { loading, form, methods, sysOrgStore } = option
  const { openAddPage, openUpdatePage, onSearch, onShowSizeChange, onChange, handlerDelete } = methods
  const { page: { pageNo = 1, pageSize = 10, dataList = [], totalCount = 0 } } = sysOrgStore

  const btns = (
    <Button type="primary" icon="plus-circle-o" onClick={openAddPage}>新增组织机构</Button>
  )

  const searchFields = [...fields, {
    key: 'provinceAndCity',
    name: '省市',
    type: 'provinceAndCity',
  }]
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'sysOrg_condin',
    searchFields: getSearchFields(searchFields, ['orgNo', 'parentOrgNo', 'orgName', 'available', 'provinceAndCity']).values(),
    fields: getFields(searchFields, local.get('sysOrg_condin') || ['orgNo', 'orgName']).values(),
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
          <Button type="primary" onClick={() => openUpdatePage(record)} style={{ marginRight: '20px' }}>编辑</Button>
          <Popconfirm title="是否确定要删除?" onConfirm={() => handlerDelete(record.id)}>
            <Button type="primary">删除</Button>
          </Popconfirm>
        </span>
      )
    },
  }]

  const tableColumns = getColumns(fields).enhance(operatorColumn).values()

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <ZSearch {...searchBarProps} />
      </div>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={dataList}
        bordered
        loading={loading}
        pagination={{ // 分页
          total: +totalCount, // 总数量
          current: +pageNo,
          defaultCurrent: +pageNo,
          pageSize: +pageSize, // 显示几条一页
          defaultPageSize: +pageSize, // 默认显示几条一页
          showSizeChanger: true, // 是否显示可以设置几条一页的选项
          onShowSizeChange,
          onChange,
          showTotal() { // 设置显示一共几条数据
            return `共 ${totalCount} 条数据`
          },
        }}
      />
    </div>
  )
}

const mapStateToProps = ({ loading, sysOrgStore }) => {
  return {
    loading: loading.models.sysOrgStore,
    sysOrgStore,
  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {
      openAddPage() {
        dispatch({
          type: 'sysOrgStore/updateState',
          visible: {
            add: true,
          },
        })
        dispatch({
          type: 'selectStore/queryOrgs',
        })
      },

      openUpdatePage(record) {
        dispatch({
          type: 'sysOrgStore/updateState',
          sysOrg: record,
          visible: {
            update: true,
          },
        })
      },

      handlerDelete(id) {
        dispatch({
          type: 'sysOrgStore/deleteById',
          id,
        })
      },

      onSearch(values) {
        if (values && values.provinceAndCity && values.provinceAndCity.length) {
          values.province = values.provinceAndCity[0]
          values.city = values.provinceAndCity[1]
        }
        dispatch({
          type: 'sysOrgStore/queryPage',
          ...values,
          pageNo: 1,
          pageSize: 10,
        })
      },

      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        let fieldsValue = form.getFieldsValue()
        if (fieldsValue && fieldsValue.provinceAndCity && fieldsValue.provinceAndCity.length) {
          fieldsValue.province = fieldsValue.provinceAndCity[0]
          fieldsValue.city = fieldsValue.provinceAndCity[1]
        }
        dispatch({
          type: 'sysOrgStore/queryPage',
          ...fieldsValue,
          pageNo: current,
          pageSize,
        })
      },
      onChange(page, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        let fieldsValue = form.getFieldsValue()
        if (fieldsValue && fieldsValue.provinceAndCity && fieldsValue.provinceAndCity.length) {
          fieldsValue.province = fieldsValue.provinceAndCity[0]
          fieldsValue.city = fieldsValue.provinceAndCity[1]
        }
        dispatch({
          type: 'sysOrgStore/queryPage',
          ...fieldsValue,
          pageNo: page,
          pageSize,
        })
      },
    },
  }
}


const fields = [
  {
    key: 'orgNo',
    name: '组织编号',
  }, {
    key: 'parentOrgNo',
    name: '上级组织',
    type: 'parentOrgNo',
  }, {
    key: 'orgName',
    name: '组织名称',
    required: false,
  }, {
    key: 'priority',
    name: '排序',
    type: 'number',
  }, {
    key: 'available',
    name: '是否无效',
    type: 'invalid',
    hasFeedback: false,
  }, {
    key: 'description',
    name: '描述',
    type: 'textarea',
  }, {
    key: 'province',
    name: '省份',
    type: 'province',
  }, {
    key: 'city',
    name: '城市',
    type: 'city',
  }, {
    key: 'address',
    name: '地址',
  },
]

export default connect(mapStateToProps, mapDispatchToProps)(List)
