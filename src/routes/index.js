import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from 'pages/app'
import { authenticated, isLoginAndRedirectLoginPage } from 'utils/auth'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          if (isLoginAndRedirectLoginPage()) {
            registerModel(app, require('models/homeStore'))
            cb(null, { component: require('pages/home') })
          }
        }, 'home')
      },
      /* onEnter() {
        require.ensure([], require => {
          registerModel(app, require('models/commonStore'))
        }, 'root')
      }, */
      /* childRoutes: (r => {
        return r.keys().map(key => r(key));
    })(require.context('./', true, /^\.\/modules\/((?!\/)[\s\S])+\/route\.js$/)) */
      childRoutes: [
        ...require('./rbac')(app, authenticated),
        ...require('./car')(app, authenticated),
        ...require('./driver')(app, authenticated),
        ...require('./finance')(app, authenticated),
      ],
    },
    require('./login')(app),
    require('./403'),
    require('./404'),
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
