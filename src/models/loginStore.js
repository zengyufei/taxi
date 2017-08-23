import { extend } from 'ModelUtils'

const prefix = 'login'
const tokenNameKey = 'token'

const loginUrl = '/login'

export default extend({
  namespace: `${prefix}Store`,
  state: {},
  subscriptions: {},
  effects: {
    * login(payload, { postMessage, put, sessionCache }) {
      const { code = 0, result = {} } = yield postMessage(loginUrl, payload)
      if (+code === 200) {
        sessionCache.set(tokenNameKey, result)
        yield put('appStore/loadRole')
      }
    },

  },
  reducers: {},
})
