const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

module.exports = (app, auth) => {
  return [


    {
      path: 'monthQuota',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:driver:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/finance/monthQuotaStore'))
            cb(null, require('pages/finance/monthQuota/Page'))
          }
        }, 'monthQuota')
      },
    },

    {
      path: 'nonBusinessIncome',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:driver:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/finance/nonBusinessIncomeStore'))
            cb(null, require('pages/finance/nonBusinessIncome/Page'))
          }
        }, 'nonBusinessIncome')
      },
    },

    {
      path: 'reserveMoney',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:driver:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/finance/reserveMoneyStore'))
            cb(null, require('pages/finance/reserveMoney/Page'))
          }
        }, 'reserveMoney')
      },
    },

    {
      path: 'securityDeposit',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:driver:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/finance/securityDepositStore'))
            cb(null, require('pages/finance/securityDeposit/Page'))
          }
        }, 'securityDeposit')
      },
    },

    {
      path: 'subtractAmount',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:driver:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/finance/subtractAmountStore'))
            cb(null, require('pages/finance/subtractAmount/Page'))
          }
        }, 'subtractAmount')
      },
    },


  ]
}
