import pathToRegexp from 'path-to-regexp'
import { message as Message } from 'antd'
import same from 'just-compare'
import transform from 'tree-transform'
import flatten from 'tree-flatten'
import R from 'ramda'
import _ from 'lodash'

import { get, post } from '../http'
import { syncGet, syncPost } from '../httpSync'
import { local, session } from '../storage'
import { tableBindType } from '../table'
import { formBindType } from '../form'

const createNestedValueRecuder = (parentKey, value) => (state, { key }) => {
  let parentState = state[parentKey]

  if (key) {
    parentState = typeof parentState === 'boolean' ? {} : parentState
    parentState = { ...parentState, [key]: value }
  } else {
    // 兼容旧版本，如果type不存在，则直接对parent赋值
    parentState = value
  }

  return {
    ...state,
    [parentKey]: parentState,
  }
}

const createNestedRecuder = parentKey => (state, { payload }) => {
  let parentState = state[parentKey]
  parentState = typeof parentState === 'boolean' ? {} : parentState

  return {
    ...state,
    [parentKey]: {
      ...parentState,
      payload,
    },
  }
}

const getDefaultModel = () => {
  return {
    // 为了兼容旧版本，初始值依旧为false.如果应用中需要多个控制状态，则在model中覆盖初始属性
    state: {
      init: false,
      initValues: {},
      visible: false,
      spinning: false,
      loading: false,
      confirmLoading: false,
    },
    subscriptions: {},
    effects: {},
    reducers: {
      showVisible: createNestedValueRecuder('visible', true),
      hideVisible: createNestedValueRecuder('visible', false),
      showLoading: createNestedValueRecuder('loading', true),
      hideLoading: createNestedValueRecuder('loading', false),
      showConfirmLoading: createNestedValueRecuder('confirmLoading', true),
      hideConfirmLoading: createNestedValueRecuder('confirmLoading', false),
      showSpinning: createNestedValueRecuder('spinning', true),
      hideSpinning: createNestedValueRecuder('spinning', false),
      updateLoading: createNestedRecuder('loading'),
      updateSpinner: createNestedRecuder('spinning'),
      updateConfirmLoading: createNestedRecuder('confirmLoading'),
      updateState(state, payload) {
        return {
          ...state,
          ...payload,
        }
      },
      updateInitValues(state, { initValues }) {
        return {
          ...state,
          ..._.assign(state.initValues, initValues),
        }
      },
    },
  }
}

/**
 * 扩展subscription函数的参数,支持listen方法，方便监听path改变
 *
 * listen函数参数如下:
 * pathReg 需要监听的pathname
 * action 匹配path后的回调函数，action即可以是redux的action,也可以是回调函数
 * listen函数同时也支持对多个path的监听，参数为{ pathReg: action, ...} 格式的对象
 *
 * 示例:
 * subscription({ dispath, history, listen }) {
 *  listen('/user/list', { type: 'fetchUsers'});
 *  listen('/user/query', ({ query, params }) => {
 *    dispatch({
 *      type: 'fetchUsers',
 *      payload: params
 *    })
 *  });
 *  listen({
 *    '/user/list': ({ query, params }) => {},
 *    '/user/query': ({ query, params }) => {},
 *  });
 * }
 */
const enhanceSubscriptions = (subscriptions = {}) => {
  return Object
    .keys(subscriptions)
    .reduce((wrappedSubscriptions, key) => {
      wrappedSubscriptions[key] = createWrappedSubscriber(subscriptions[key])
      return wrappedSubscriptions
    }, {})

  function createWrappedSubscriber(subscriber) {
    return props => {
      const { dispatch, history } = props

      const listen = (pathReg, action) => {
        let listeners = {}
        if (typeof pathReg === 'object') {
          listeners = pathReg
        } else {
          listeners[pathReg] = action
        }

        history.listen(location => {
          const { pathname } = location
          Object.keys(listeners).forEach(key => {
            const _pathReg = key
            const _action = listeners[key]
            const match = pathToRegexp(_pathReg).exec(pathname)
            if (match) {
              if (typeof _action === 'object') {
                dispatch(_action)
              } else if (typeof _action === 'function') {
                _action({ ...location, params: match.slice(1) })
              }
              dispatch({ type: 'updateState', initValues: {} })
            }
          })
        })
      }

      subscriber({ ...props, listen })
    }
  }
}

/**
 * 扩展effect函数中的sagaEffects参数
 * 支持:
 *  put 扩展put方法，支持双参数模式: put(type, payload)
 *  update 扩展自put方法，方便直接更新state数据，update({ item: item});
 *  get 请求 get 方法
 *  getLoading 请求 get 方法，控制 Loading
 *  getConfirmLoading 请求 get 方法，控制 confirmLoading
 *  getSpinning 请求 get 方法，控制 spinning
 *  getMessage 请求 get 方法
 *  post 请求 post 方法
 *  postLoading 请求 post 方法，控制 Loading
 *  postConfirmLoading 请求 post 方法，控制 confirmLoading
 *  postSpinning 请求 post 方法，控制 spinning
 *  postMessage 请求 post 方法
 *  callLoading,
 *  callConfirmLoading,
 *  callSpinning,
 *  callMessage,
 *  callExtra
 *  以上函数都支持第三个参数,message = { successMsg, errorMsg }
 */
const enhanceEffects = (effects = {}) => {
  const wrappedEffects = {}
  Object
    .keys(effects)
    .forEach(key => {
      wrappedEffects[key] = function* (action, sagaEffects) {
        const extraSagaEffects = {
          ...sagaEffects,
          R: require('ramda'),
          _: require('lodash'),
          tableBindType: createTableBindType(sagaEffects),
          formBindType: createFormBindType(sagaEffects),
          put: createPutEffect(sagaEffects),
          update: createUpdateEffect(sagaEffects),
          localCache: local,
          sessionCache: session,
          arrayToTree: createArrayToTreeEffect(sagaEffects),
          treeToArray: createTreeToArrayEffect(sagaEffects),
          arrayToMap: createArrayToMapEffect(sagaEffects),
          diff: createDiffEffect(sagaEffects),
          same: createSameEffect(sagaEffects),
          syncGet: createSyncGetEffect(),
          syncPost: createSyncPostEffect(),
          get: createGetEffect(sagaEffects),
          getLoading: createGetEffect(sagaEffects, { loading: true }),
          getConfirmLoading: createGetEffect(sagaEffects, { confirmLoading: true }),
          getSpinning: createGetEffect(sagaEffects, { spinning: true }),
          getMessage: createGetEffect(sagaEffects),
          post: createPostEffect(sagaEffects),
          postLoading: createPostEffect(sagaEffects, { loading: true }),
          postConfirmLoading: createPostEffect(sagaEffects, { confirmLoading: true }),
          postSpinning: createPostEffect(sagaEffects, { spinning: true }),
          postMessage: createPostEffect(sagaEffects),
          callLoading: createExtraCall(sagaEffects, { loading: true }),
          callConfirmLoading: createExtraCall(sagaEffects, { confirmLoading: true }),
          callSpinning: createExtraCall(sagaEffects, { spinning: true }),
          callMessage: createExtraCall(sagaEffects),
          callExtra: (serviceFn, args, config) => { createExtraCall(sagaEffects, config)(serviceFn, args, config) },
        }

        yield effects[key](action, extraSagaEffects)
      }
    })

  return wrappedEffects

  function createTableBindType(sagaEffects) {
    const { call } = sagaEffects
    return function* tableBindTypeEffect(payload) {
      /* Object.keys(payload).forEach(key => {
        if (isBindTableType(key)) {
          delete payload[key]
        }
      }) */
      !R.equals(payload, {}) && (yield call(tableBindType, payload))
    }
  }

  function createFormBindType(sagaEffects) {
    const { call } = sagaEffects
    return function* formBindTypeEffect(payload) {
      /* Object.keys(payload).forEach(key => {
        if (isBindFormType(key)) {
          delete payload[key]
        }
      }) */
      !R.equals(payload, {}) && (yield call(formBindType, payload))
    }
  }

  function createPutEffect(sagaEffects) {
    const { put } = sagaEffects
    return function* putEffect(type, payload) {
      let action = { type, ...payload }
      if (arguments.length === 1 && typeof type === 'object') {
        action = arguments[0]
      }
      yield put(action)
    }
  }

  function createUpdateEffect(sagaEffects) {
    const { put } = sagaEffects
    return function* updateEffect(payload) {
      yield put({ type: 'updateState', ...payload })
    }
  }

  function createArrayToTreeEffect(sagaEffects) {
    const { call } = sagaEffects
    return function* arrayToTreeEffect(array, config = {
      id: 'id',
      parent: 'parentId',
      children: 'children',
    }) {
      return yield call(transform, R.clone(array), config)
    }
  }

  function createArrayToMapEffect(sagaEffects) {
    const { call } = sagaEffects
    return function* arrayToMapEffect(array, fn) {
      return yield call(_.mapKeys, R.clone(array), fn)
    }
  }

  function createTreeToArrayEffect(sagaEffects) {
    const { call } = sagaEffects
    return function* treeToArrayEffect(tree) {
      return yield call(flatten, R.clone(tree), 'children')
    }
  }

  function createDiffEffect(sagaEffects) {
    const { call } = sagaEffects
    return function* diffEffect(first, second) {
      return !(yield call(same, first, second))
    }
  }

  function createSameEffect(sagaEffects) {
    const { call } = sagaEffects
    return function* sameEffect(first, second) {
      return yield call(same, first, second)
    }
  }

  function createSyncGetEffect() {
    return function syncGetEffect(url, params) {
      let result = syncGet(url, params)
      return (!result || !Object.keys(result).length) ? { code: 0, result: {} } : result
    }
  }

  function createSyncPostEffect() {
    return function syncPostEffect(url, params) {
      let result = syncPost(url, params)
      return (!result || !Object.keys(result).length) ? { code: 0, result: {} } : result
    }
  }

  function createGetEffect(sagaEffects, config = {}) {
    const { call, put } = sagaEffects
    return function* getEffect(url, params, message = {}) {
      let result
      const { loading, confirmLoading, spinning } = config
      let { successMsg, errorMsg, key } = message
      if (typeof message === 'string') {
        successMsg = `加载${message}成功`
        errorMsg = `加载${message}失败`
      }

      if (loading) {
        yield put({ type: 'showLoading', payload: { key } })
      }
      if (confirmLoading) {
        yield put({ type: 'showConfirmLoading', payload: { key } })
      }
      if (spinning) {
        yield put({ type: 'showSpinning', payload: { key } })
      }

      try {
        result = yield call(
          async () => get(url, params || {})
        )
        successMsg && Message.success(successMsg)
      } catch (e) {
        errorMsg && Message.error(errorMsg)
      } finally {
        if (loading) {
          yield put({ type: 'hideLoading', payload: { key } })
        }
        if (confirmLoading) {
          yield put({ type: 'hideConfirmLoading' })
        }
        if (spinning) {
          yield put({ type: 'hideSpinning', payload: { key } })
        }
      }

      return (!result || !Object.keys(result).length) ? { code: 0, result: {} } : result
    }
  }
  function createPostEffect(sagaEffects, config = {}) {
    const { call, put } = sagaEffects
    return function* postEffect(url, data, message = {}) {
      let result
      const { loading, confirmLoading, spinning } = config
      let { successMsg, errorMsg, key } = message
      if (typeof message === 'string') {
        successMsg = `加载${message}成功`
        errorMsg = `加载${message}失败`
      }

      if (loading) {
        yield put({ type: 'showLoading', payload: { key } })
      }
      if (confirmLoading) {
        yield put({ type: 'showConfirmLoading', payload: { key } })
      }
      if (spinning) {
        yield put({ type: 'showSpinning', payload: { key } })
      }

      try {
        result = yield call(
          async () => post(url, data || {})
        )
        successMsg && Message.success(successMsg)
      } catch (e) {
        errorMsg && Message.error(errorMsg)
      } finally {
        if (loading) {
          yield put({ type: 'hideLoading', payload: { key } })
        }
        if (confirmLoading) {
          yield put({ type: 'hideConfirmLoading' })
        }
        if (spinning) {
          yield put({ type: 'hideSpinning', payload: { key } })
        }
      }

      return (!result || !Object.keys(result).length) ? { code: 0, result: {} } : result
    }
  }

  function createExtraCall(sagaEffects, config = {}) {
    const { put, call } = sagaEffects
    return function* extraCallEffect(serviceFn, args, message = {}) {
      let result
      const { loading, confirmLoading, spinning } = config
      let { successMsg, errorMsg, key } = message
      if (typeof message === 'string') {
        successMsg = `加载${message}成功`
        errorMsg = `加载${message}失败`
      }

      if (loading) {
        yield put({ type: 'showLoading', payload: { key } })
      }
      if (confirmLoading) {
        yield put({ type: 'showConfirmLoading', payload: { key } })
      }
      if (spinning) {
        yield put({ type: 'showSpinning', payload: { key } })
      }

      try {
        result = yield call(serviceFn, args)
        successMsg && Message.success(successMsg)
      } catch (e) {
        errorMsg && Message.error(errorMsg)
      } finally {
        if (loading) {
          yield put({ type: 'hideLoading', payload: { key } })
        }
        if (confirmLoading) {
          yield put({ type: 'hideConfirmLoading' })
        }
        if (spinning) {
          yield put({ type: 'hideSpinning', payload: { key } })
        }
      }

      return (!result || !Object.keys(result).length) ? { code: 0, result: {} } : result
    }
  }
}

/**
 * 模型继承方法
 *
 * 如果参数只有一个，则继承默认model
 * @param defaults
 * @param properties
 */
function extend(defaults, properties) {
  if (!properties) {
    properties = defaults
    defaults = null
  }

  const model = defaults || getDefaultModel()
  const modelAssignKeys = ['state', 'subscriptions', 'effects', 'reducers']
  const { namespace } = properties

  modelAssignKeys.forEach(key => {
    if (key === 'subscriptions') {
      properties[key] = enhanceSubscriptions(properties[key])
    }
    if (key === 'effects') {
      properties[key] = enhanceEffects(properties[key])
    }
    Object.assign(model[key], properties[key])
  })

  const initialState = {
    ...model.state,
  }

  Object.assign(model.reducers, {
    resetState() {
      return {
        ...initialState,
      }
    },
  })

  return Object.assign(model, { namespace })
}

export default {
  extend,
}
