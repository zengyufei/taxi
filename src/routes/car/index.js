const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

module.exports = (app, auth) => {
  return [
    {
      path: 'car',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('car:car:*')) {
            registerModel(app, require('models/car/carStore'))
            cb(null, require('pages/car/car'))
          }
        }, 'car')
      },
    },
    {
      path: 'annualVerification',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('car:annualVerification:*')) {
            registerModel(app, require('models/car/annualVerificationStore'))
            cb(null, require('pages/car/annualVerification'))
          }
        }, 'annualVerification')
      },
    },
  ]
}
