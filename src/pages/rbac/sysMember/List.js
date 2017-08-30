import { connect } from 'dva'
import { Form, Button, Popconfirm, Table } from 'antd'
import ZSearch from 'ZSearch'
import { getColumns } from 'TableUtils'
import { getFields, getSearchFields } from 'FormUtils'
import { local } from 'utils/storage'

const List = option => {
  const { loading, form, methods, sysMemberStore } = option
  const { openAddPage, openUpdatePage, onSearch, onShowSizeChange, onChange, handlerDelete } = methods
  const { page: { pageNo = 1, pageSize = 10, dataList = [], totalCount = 0 } } = sysMemberStore

  const btns = (
    <ZButton permission="rbac:sysMember:insert">
      <Button type="primary" icon="plus-circle-o" onClick={openAddPage}>新增用户</Button>
    </ZButton>
  )
  const searchBarProps = {
    form,
    showLabel: true,
    showReset: true,
    btns,
    searchCacheKey: 'sysMember_condin',
    searchFields: getSearchFields(fields).values(),
    fields: getFields(fields, local.get('sysMember_condin') || ['account', 'mobile', 'roleId']).values(),
    item: {
      roleId: '',
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
          <ZButton permission="rbac:sysMember:update">
            <Button type="primary" onClick={() => openUpdatePage(record)} style={{ marginRight: '20px' }}>编辑</Button>
          </ZButton>
          <ZButton permission="rbac:sysMember:delete">
            <Popconfirm title="是否确定要删除?" onConfirm={() => handlerDelete(record.id)}>
              <Button type="primary">删除</Button>
            </Popconfirm>
          </ZButton>
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

const mapStateToProps = ({ loading, sysMemberStore }) => {
  return {
    loading: loading.models.sysMemberStore,
    sysMemberStore,
  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    form,
    methods: {
      openAddPage() {
        dispatch({
          type: 'sysMemberStore/updateState',
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
          type: 'sysMemberStore/updateState',
          sysMember: record,
          visible: {
            update: true,
          },
        })
      },

      handlerDelete(id) {
        dispatch({
          type: 'sysMemberStore/deleteById',
          id,
        })
      },

      onSearch(values) {
        dispatch({
          type: 'sysMemberStore/queryPage',
          ...values,
          pageNo: 1,
          pageSize: 10,
        })
      },

      onShowSizeChange(current, pageSize) { // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        dispatch({
          type: 'sysMemberStore/queryPage',
          ...form.getFieldsValue(),
          pageNo: current,
          pageSize,
        })
      },
      onChange(page, pageSize) { // 点击改变页数的选项时调用函数，current:将要跳转的页数
        dispatch({
          type: 'sysMemberStore/queryPage',
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
    key: 'account',
    name: '账号',
  },
  {
    key: 'mobile',
    name: '手机',
  },
  {
    key: 'roleId',
    name: '角色',
    type: 'roleId',
  },
  {
    key: 'locked',
    name: '是否锁定',
    enums: {
      false: '正常',
      true: '锁定',
    },
  },
  {
    key: 'initPwd',
    name: '是否初始化',
    enums: {
      false: '正常',
      true: '未初始化',
    },
  },

  {
    key: 'available',
    name: '是否有效',
    enums: {
      true: '有效',
      false: '无效',
    },
  },
  {
    key: 'realName',
    name: '真实姓名',
  },
  {
    key: 'orgNo',
    name: '机构',
    type: 'parentOrgNo',
  },
]

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(List))
