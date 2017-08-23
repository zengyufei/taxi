const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

module.exports = (app, auth) => {
  return [


    {
      path: 'commonPraise',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:common:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/commonPraiseStore'))
            cb(null, require('pages/driver/commonPraise/Page'))
          }
        }, 'commonPraise')
      },
    },


    {
      path: 'driver',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:common:*')) {
            registerModel(app, require('models/car/carStore'))
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/driverStore'))
            cb(null, require('pages/driver/driver/Page'))
          }
        }, 'driver')
      },
    },

    {
      path: 'complain',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:common:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/complainStore'))
            cb(null, require('pages/driver/complain/Page'))
          }
        }, 'complain')
      },
    },


  ]
}
