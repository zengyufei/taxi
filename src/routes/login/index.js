const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

module.exports = app => {
  return {
    path: 'login',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        registerModel(app, require('models/loginStore'))
        cb(null, require('pages/login'))
      }, 'login')
    },
  }
}
