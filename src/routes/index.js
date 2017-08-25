import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from 'pages/app'
import { auth } from 'utils'

/* const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
} */

const Routers = function({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          cb(null, { component: require('pages/home') })
        }, 'home')
      },
      /* onEnter() {
        require.ensure([], require => {
          registerModel(app, require('models/commonStore'))
        }, 'root')
      }, */
      childRoutes: [
        ...require('./rbac')(app, auth),
        ...require('./car')(app, auth),
        ...require('./driver')(app, auth),
        ...require('./finance')(app, auth),
      ],
    },
    require('./login')(app),
    require('./404'),
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
