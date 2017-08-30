import { extend } from 'ModelUtils'
import { TreeSelect, Select } from 'antd'
import { local } from 'utils/storage'

const TreeNode = TreeSelect.TreeNode
const Option = Select.Option

const prefix = 'rbac'

// 组织机构
const queryOrgsUrl = '/sysOrg/queryAll'
const orgKey = 'orgs'
const orgTreeKey = 'orgTree'
const orgMapKey = 'orgMap'

// 角色
const queryRolesUrl = '/sysRole/queryAll'
const roleKey = 'roles'
const roleMapKey = 'roleMap'

// 资源
const queryResourcesUrl = '/sysResource/queryAll'
const resourceKey = 'resources'
const resourceTreeKey = 'resourceTree'
const resourceSecondTreeKey = 'resourceSecondTree'
const resourceMapKey = 'resourceMap'
const resourceMapByParentResNoKey = 'resourceMapByParentResNo'

export default extend({
  namespace: `${prefix}Store`,
  state: {
    [orgKey]: local.get(orgKey) || [],
    [orgTreeKey]: local.get(orgTreeKey) || [],

    [roleKey]: local.get(roleKey) || [],
    [roleMapKey]: local.get(roleMapKey) || [],

    [resourceKey]: local.get(resourceKey) || [],
    [resourceTreeKey]: local.get(resourceTreeKey) || [],
    [resourceSecondTreeKey]: local.get(resourceSecondTreeKey) || [],
    [resourceMapKey]: local.get(resourceMapKey) || [],
    [resourceMapByParentResNoKey]: local.get(resourceMapByParentResNoKey) || [],

  },
  effects: {

    * queryOrgs({}, { get, update, localCache, arrayToTree, arrayToMap, tableBindType, formBindType }) {
      let orgCache = localCache.get(orgKey)
      let orgMap = localCache.get(orgMapKey)
      let orgTree = localCache.get(orgTreeKey)

      if (!orgCache) {
        const { result } = yield get(queryOrgsUrl)
        orgMap = yield arrayToMap(result, value => value.orgNo)
        orgTree = yield arrayToTree(result, {
          id: 'orgNo',
          parent: 'parentOrgNo',
          children: 'children',
        })
        yield update({ [orgKey]: result, [orgTreeKey]: orgTree })
        localCache.set(orgTreeKey, orgTree, 120)
        localCache.set(orgMapKey, orgMap, 120)
        localCache.set(orgKey, orgCache = result, 120)
      }

      yield tableBindType({
        parentOrgNo: value => {
          if (value) { return orgMap[value] && orgMap[value].orgName }
          return '顶级组织'
        },
      })

      yield formBindType({
        // 参数：初始值,meta(字段meta数据，例如: rows,min,max 等), field字段定义对象
        parentOrgNo: ({ initialValue, field }) => {
          const loop = treeList => treeList.map(treeNode => {
            if (treeNode.children) {
              return (
                <TreeNode key={treeNode.orgNo} value={treeNode.orgNo} title={treeNode.orgName} item={treeNode}>
                  {loop(treeNode.children)}
                </TreeNode>
              )
            }
            return <TreeNode key={treeNode.orgNo} value={treeNode.orgNo} title={treeNode.orgName} item={treeNode} />
          })
          let result = {
            input: (
              <TreeSelect
                key="parentOrgNoSelectForm"
                allowClear
                placeholder={field.placeholder || '顶级组织机构'}
                searchPlaceholder="搜索..."
                showSearch
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeDefaultExpandAll
              >
                {loop(orgTree)}
              </TreeSelect>
            ),
          }
          initialValue && (result.initialValue = initialValue)
          return result
        },
      })
    },

    * queryRoles({}, { get, update, localCache, arrayToMap, tableBindType, formBindType }) {
      let roleCache = localCache.get(roleKey)
      let roleMap = localCache.get(roleMapKey)

      if (!roleCache) {
        const { result } = yield get(queryRolesUrl)
        roleMap = yield arrayToMap(result, value => value.id)
        yield update({ [roleKey]: result })
        localCache.set(roleMapKey, roleMap, 120)
        localCache.set(roleKey, roleCache = result, 120)
      }

      yield tableBindType({
        roleId: value => {
          if (value === 1) return '管理员'
          if (value) { return roleMap[value] && roleMap[value].roleName }
          return ''
        },
      })

      yield formBindType({
        // 参数：初始值,meta(字段meta数据，例如: rows,min,max 等), field字段定义对象
        roleId: ({ initialValue, meta, showPlaceholder, field }) => {
          const placeholder = (meta && meta.placeholder) || (showPlaceholder ? `${field.name}` : '')
          const options = roleCache.map(role => {
            return { key: `${role.id}`, value: role.roleName }
          })

          let result = {
            input: (
              <Select key="roleIdSelectForm" allowClear placeholder={placeholder || '请选择角色'}>
                {
                  options.map(item => <Option key={`roleId${item.key}`} value={item.key}>{item.value}</Option>)
                }
              </Select>
            ),
          }
          initialValue && (result.initialValue = `${initialValue}`)
          return result
        },
      })
    },

    * queryResources({}, { get, update, arrayToTree, localCache, select, formBindType, _ }) {
      let { resource, resourceTree, resourceSecondTree, resourceMap, resourceMapByParentResNo } = yield select(({ rbacStore }) => rbacStore)

      if (!resource || resource.length === 0) {
        resource = localCache.get(resourceKey)
        resourceTree = localCache.get(resourceTreeKey)
        resourceSecondTree = localCache.get(resourceSecondTreeKey)
        resourceMapByParentResNo = localCache.get(resourceMapByParentResNoKey)
        resourceMap = localCache.get(resourceMapKey)
        if (!resource) {
          const { result } = yield get(queryResourcesUrl)
          const resourceSecondArray = []
          resourceMapByParentResNo = {}
          resourceMap = {}
          _.cloneDeep(result).forEach(e => {
            if (e.hierarchy === 'one' || e.hierarchy === 'two') {
              resourceSecondArray.push(e)
            }
            resourceMap[e.resNo] = e

            if (resourceMapByParentResNo[e.parentResNo]) {
              resourceMapByParentResNo[e.parentResNo].push(e)
            } else {
              resourceMapByParentResNo[e.parentResNo] = [e]
            }
          })
          resourceSecondTree = yield arrayToTree(resourceSecondArray, {
            id: 'resNo',
            parent: 'parentResNo',
            children: 'children',
          })
          resourceTree = yield arrayToTree(result, {
            id: 'resNo',
            parent: 'parentResNo',
            children: 'children',
          })

          yield update({ [resourceKey]: result, resourceTree, resourceSecondTree, resourceMap, resourceMapByParentResNo })
          localCache.set(resourceKey, resource = result, 120)
          localCache.set(resourceTreeKey, resourceTree, 120)
          localCache.set(resourceSecondTreeKey, resourceSecondTree, 120)
          localCache.set(resourceMapKey, resourceMap, 120)
          localCache.set(resourceMapByParentResNoKey, resourceMapByParentResNo, 120)
        }

        yield formBindType({
          parentResNo({ initialValue, field }) {
            const loop = treeList => treeList.map(treeNode => {
              if (treeNode.children) {
                return (
                  <TreeNode key={treeNode.resNo} value={treeNode.resNo} title={treeNode.resName} item={treeNode}>
                    {loop(treeNode.children)}
                  </TreeNode>
                )
              }
              return <TreeNode key={treeNode.resNo} value={treeNode.resNo} title={treeNode.resName} item={treeNode} />
            })
            let result = {
              input: (
                <TreeSelect
                  key="parentResNoSelectForm"
                  allowClear
                  placeholder={field.placeholder || '顶级菜单'}
                  searchPlaceholder="搜索..."
                  showSearch
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeDefaultExpandAll
                >
                  {loop(resourceSecondTree)}
                </TreeSelect>
              ),
            }
            initialValue && (result.initialValue = initialValue)
            return result
          },
        })
      }
      yield update({ resource, resourceTree })
    },

  },
  reducers: {},
  subscriptions: {
    setup({ dispatch, listen }) {
      // 支持对多个path的监听
      listen({
        '/sysOrg': () => {
          dispatch({
            type: 'queryOrgs',
          })
        },
        '/sysMember': () => {
          dispatch({
            type: 'queryOrgs',
          })
          dispatch({
            type: 'queryRoles',
          })
        },
        '/sysRole': () => {
          dispatch({
            type: 'queryOrgs',
          })
          dispatch({
            type: 'queryRoles',
          })
          dispatch({
            type: 'queryResources',
          })
        },
        '/sysResource': () => {
          dispatch({
            type: 'queryResources',
          })
        },
      })
    },
  },
})

