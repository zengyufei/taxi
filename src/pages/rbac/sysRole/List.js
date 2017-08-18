import { connect } from 'dva'
import { Button, Popconfirm, Table } from 'antd'
import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields } from 'FormUtils'

const List = option => {
  const { loading, methods, sysRoleStore } = option
  const { openAddPage, openUpdatePage, onSearch, onShowSizeChange, onChange, handlerDelete } = methods
  const { page: { pageNo = 1, pageSize = 10, dataList = [], totalCount = 0 } } = sysRoleStore

  const btns = (
    <div style={{ marginBottom: '16px', width: '100%' }}>
      <Button type="primary" icon="plus-circle-o" style={{ marginLeft: '10px' }} onClick={openAddPage}>新增角色</Button>
    </div>
  )

  const searchBarProps = {
    showLabel: true,
    showReset: true,
    btns,
    fields: getFields(fields, ['roleName']).values(),
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

const mapStateToProps = ({ loading, sysRoleStore }) => {
  return {
    loading: loading.models.sysRoleStore,
    sysRoleStore,
  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    methods: {
      openAddPage() {
        dispatch({
          type: 'sysRoleStore/updateState',
          visible: {
            add: true,
          },
        })
        dispatch({
          type: 'selectStore/queryRoles',
        })
      },

      openUpdatePage(record) {
        dispatch({
          type: 'sysRoleStore/updateState',
          sysRole: record,
          visible: {
            update: true,
          },
        })
      },

      handlerDelete(id) {
        dispatch({
          type: 'sysRoleStore/deleteById',
          id,
        })
      },

      onSearch(values) {
        dispatch({
          type: 'sysRoleStore/queryPage',
          ...values,
          pageNo: 1,
          pageSize: 10,
        })
      },

      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'sysRoleStore/queryPage',
          ...form.getFieldsValue(),
          pageNo: current,
          pageSize,
        })
      },
      onChange(page, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'sysRoleStore/queryPage',
          ...form.getFieldsValue(),
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
    name: '组织机构',
    type: 'orgNo',
  }, {
    key: 'roleName',
    name: '角色名称',
  }, {
    key: 'description',
    name: '描述',
    type: 'textarea',
  }, {
    key: 'sysMemberId',
    name: '创建者',
    type: 'sysMemberId',
  }, {
    key: 'relyRoleId',
    name: '创建者角色',
    type: 'roleId',
  }, {
    key: 'createTime',
    name: '创建时间',
  }, {
    key: 'updateTime',
    name: '修改时间',
  },
]

export default connect(mapStateToProps, mapDispatchToProps)(List)
