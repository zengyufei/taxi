import { routerRedux } from 'dva/router'
import { extend } from 'ModelUtils'
import { session } from 'utils/storage'

const prefix = 'app'
const currentRoleKey = 'currentRole'
const currentPermissionKey = 'currentPermission'

const getRoleUrl = '/sysRole/getRole'
const getResourceUrl = '/sysResource/getResource'

export default extend({
  namespace: `${prefix}Store`,
  state: {
    sysMember: {},
    sysRole: session.get(currentRoleKey) || {},
    currentPermission: session.get(currentPermissionKey) || {},
    sysResource: {},
  },
  subscriptions: {},
  effects: {

    * loadRole({}, { getMessage, put, update, sessionCache }) {
      let currentRole = session.get(currentRoleKey)
      if (!currentRole) {
        const { result } = yield getMessage(getRoleUrl)
        if (result) {
          sessionCache.set(currentRoleKey, currentRole = result)
        }
      }
      yield [
        update({ sysRole: currentRole }),
        put('loadResource'),
      ]
    },

    * loadResource({}, { getMessage, put, update, sessionCache }) {
      let currentPermission = session.get(currentPermissionKey)
      if (!currentPermission) {
        const { result } = yield getMessage(getResourceUrl)
        if (result) {
          sessionCache.set(currentPermissionKey, currentPermission = result)
        }
      }
      yield update({ currentPermission })
      yield put(routerRedux.push('/'))
    },

    * logout({}, { put, sessionCache }) {
      sessionCache.removeAll()
      yield put(routerRedux.push('/login'))
    },
  },
  reducers: {
  },
})
