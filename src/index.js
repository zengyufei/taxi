/*
 * @Author: zengyufei
 * @Date: 2017-08-04 14:20:07
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-24 16:21:06
 */
import dva from 'dva'
import createLoading from 'dva-loading'

import { createHashHistory } from 'history'
import { useRouterHistory } from 'dva/router'
import { message } from 'antd'
import 'babel-polyfill'
import moment from 'moment'

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }), // 解决 url /#/? 问题
  onError (error) {
    message.error(error.message)
  },
  onEffect(effect, { put, select }, model) {
    return function* (...args) {
      const { init } = yield select(e => e[`${model.namespace}`])
      if (init) {
        yield effect(...args)
      } else if (model.effects[`${model.namespace}/init`]) {
        yield [
          effect(...args),
          put({ type: `${model.namespace}/init` }),
          put({ type: `${model.namespace}/updateState`, init: true }),
        ]
      } else if (model.effects[`${model.namespace}/once`]) {
        yield [
          effect(...args),
          put({ type: `${model.namespace}/once` }),
          put({ type: `${model.namespace}/updateState`, init: true }),
        ]
      } else {
        yield effect(...args)
      }
    }
  },
})
app.use(createLoading({ effects: true }))

// 2. Model
app.model(require('./models/appStore'))
app.model(require('./models/commonStore'))

// 3. Router
app.router(require('./routes'))

// 4. Start
app.start('#root')
