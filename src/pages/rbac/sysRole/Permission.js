import { connect } from 'dva'
import { Table, Checkbox } from 'antd'
import _ from 'lodash'

import { getColumns } from 'TableUtils'

const CheckboxGroup = Checkbox.Group

class PermissionComponet extends React.Component {
  static propTypes = {
    resourceList: PropTypes.array,
    rbacStore: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
  }

  state = {
    key: new Date(),
    expandedRowKeys: [],
    roleResIdList: this.props.resourceList && typeof this.props.resourceList === 'string' ? this.props.resourceList.split(',') : (this.props.resourceList || []),
    resources: this.props.rbacStore.resources,
    resourceMapByParentResNo: this.props.rbacStore.resourceMapByParentResNo,
  }

  onExpandedRowsChange(expandedRowKeys) {
    this.setState({ expandedRowKeys })
  }
  onChangePower(checkedValues, item) {
    const { updateState } = this.props
    let { resources, roleResIdList, resourceMapByParentResNo } = this.state
    const selectedIds = _.map(_.map(_.filter(resources, e => _.includes(checkedValues, e.resNo)), 'id'), e => `${e}`)
    if (+item.hierarchy === 1) {
      if (selectedIds.length) {
        roleResIdList = _.concat(roleResIdList, selectedIds)
      } else {
        _.remove(roleResIdList, e => e === `${item.id}`)
      }
    } else {
      const deleteArray = _.map(_.map(resourceMapByParentResNo[item.resNo], 'id'), e => `${e}`)
      _.remove(roleResIdList, e => _.includes(deleteArray, e))
      roleResIdList = _.concat(roleResIdList, selectedIds)
      if (selectedIds.length === item.childrenResNo.length) {
        roleResIdList = _.concat(roleResIdList, `${item.id}`)
      } else if (selectedIds.length === 0) {
        _.remove(roleResIdList, e => e === `${item.id}`)
      }
    }
    this.setState({ roleResIdList, key: `${item.id}${roleResIdList.length}` })
    updateState(roleResIdList)
  }

  render() {
    let { resources, roleResIdList, resourceMapByParentResNo } = this.state
    const { rbacStore, updateState } = this.props
    const { resourceSecondTree = [] } = rbacStore

    const operatorColumn = [{
      key: 'operator',
      name: '操作',
      // 扩展字段的render支持自定义渲染
      render: (text, record) => {
        let options
        let values = []
        if (record.hierarchy === 1) {
          options = [{ label: '查看', value: record.resNo }]
          record.childrenResNo = [record.resNo]
          if (_.includes(roleResIdList, `${record.id}`)) {
            values = record.childrenResNo
          }
        } else if (record.hierarchy === 2) {
          options = _.transform(resourceMapByParentResNo[record.resNo], (result, resource) => {
            result.push({
              label: resource.resName,
              value: resource.resNo,
            })
          }, [])
          record.childrenResNo = _.transform(resourceMapByParentResNo[record.resNo], (result, resource) => {
            result.push(resource.resNo)
          }, [])
          const idsArray = _.map(_.map(resourceMapByParentResNo[record.resNo], 'id'), e => `${e}`)
          if (_.intersection(roleResIdList, idsArray).length === idsArray.length) {
            values = record.childrenResNo
            values.push(record.resNo)
          } else {
            values = _.transform(resourceMapByParentResNo[record.resNo], (result, resource) => {
              if (_.includes(roleResIdList, `${resource.id}`)) {
                result.push(resource.resNo)
              }
            }, [])
            if (!values.length) {
              _.remove(roleResIdList, e => e === `${record.id}`)
            }
          }
        }
        return (
          <CheckboxGroup options={options} value={values} onChange={checkedValues => this.onChangePower(checkedValues, record)} />
        )
      },
    }]
    const tableColumns = getColumns(resourceFields).enhance(operatorColumn).values()

    const rowSelection = {
      onSelect: (record, selected) => {
        if (selected) {
          if (record.hierarchy === 1) {
            _.remove(roleResIdList, e => e === `${record.id}`)
            roleResIdList = _.concat(roleResIdList, `${record.id}`)
          } else if (record.hierarchy === 2) {
            const deleteArray = _.transform(resourceMapByParentResNo[record.resNo], (result, resource) => {
              result.push(`${resource.id}`)
            }, [])
            _.remove(roleResIdList, e => _.includes(deleteArray, e))
            roleResIdList = _.concat(roleResIdList, `${record.id}`, _.transform(resourceMapByParentResNo[record.resNo], (result, resource) => {
              result.push(`${resource.id}`)
            }, []))
          }
        } else if (record.hierarchy === 1) {
          _.remove(roleResIdList, e => e === `${record.id}`)
        } else if (record.hierarchy === 2) {
          const deleteArray = _.transform(resourceMapByParentResNo[record.resNo], (result, resource) => {
            result.push(`${resource.id}`)
          }, [])
          _.remove(roleResIdList, e => _.includes(deleteArray, e))
        }
        this.setState({ roleResIdList })
        updateState(roleResIdList)
      },
      onSelectAll: selected => {
        if (selected) {
          const allIds = _.map(_.map(resources, 'id'), e => `${e}`)
          this.setState({ roleResIdList: allIds })
          updateState(allIds)
        } else {
          this.setState({ roleResIdList: [] })
          updateState([])
        }
      },
      getCheckboxProps: record => ({
        defaultChecked: _.includes(roleResIdList, `${record.id}`),
      }),
    }

    const tableProp = {
      key: this.state.key,
      rowKey: record => record.resNo,
      columns: tableColumns,
      dataSource: resourceSecondTree,
      bordered: true,
      pagination: false,
      defaultExpandAllRows: false,
      rowSelection,
      expandedRowKeys: this.state.expandedRowKeys,
      onExpandedRowsChange: this.onExpandedRowsChange.bind(this),
    }

    return (
      <Table {...tableProp} />
    )
  }
}

/**
 * 订阅 model
 */
function mapStateToProps({ loading, rbacStore }) {
  return {
    loading: loading.models.rbacStore,
    rbacStore,
  }
}


/**
 * @param dispatch 从 connect 获得
 * @param form 从上层建筑获得
 */
function mapDispatchToProps(dispatch) {
  return {

    updateState(resourceList) {
      dispatch({
        type: 'sysRoleStore/updatePermission',
        resourceList,
      })
    },

  }
}


const resourceFields = [
  {
    key: 'resName',
    name: '资源名称',
    width: '20%',
  },
  {
    key: 'permission',
    name: '权限标识',
    width: '20%',
  },
]

export default connect(mapStateToProps, mapDispatchToProps)(PermissionComponet)
