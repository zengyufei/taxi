/*
 * @Author: zengyufei 
 * @Date: 2017-08-04 14:20:07 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-11 11:03:10
 */
import dva from 'dva'
import createLoading from 'dva-loading'

import { createHashHistory } from 'history'
import { useRouterHistory } from 'dva/router'
import { message } from 'antd'
import 'babel-polyfill'


// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }), // 解决 url /#/? 问题
  onError (error) {
    message.error(error.message)
  },
})
app.use(createLoading(/* {effects: true,} */))

// 2. Model
app.model(require('./models/appStore'))
app.model(require('./models/commonStore'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
