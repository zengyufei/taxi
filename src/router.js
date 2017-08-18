import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './pages/app'

const Routers = function({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          cb(null, { component: require('./pages/home') })
        }, 'home')
      },
      onEnter(e){
        // console.log('enter', e)
      },
      childRoutes: [
        ...require('./routes/rbac')(app),
      ],
    },
    require('./routes/login')(app),
    require('./routes/404'),
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
