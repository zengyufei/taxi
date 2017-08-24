const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

module.exports = (app, auth) => {
  return [


    {
      path: 'driver',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:driver:*')) {
            registerModel(app, require('models/car/carStore'))
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/driverStore'))
            cb(null, require('pages/driver/driver/Page'))
          }
        }, 'driver')
      },
    },

    {
      path: 'archives',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:archives:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/driverStore'))
            cb(null, require('pages/driver/archives/Page'))
          }
        }, 'archives')
      },
    },

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
      path: 'govtPraise',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:govt:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/govtPraiseStore'))
            cb(null, require('pages/driver/govtPraise/Page'))
          }
        }, 'govtPraise')
      },
    },

    {
      path: 'mediaPraise',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:media:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/mediaPraiseStore'))
            cb(null, require('pages/driver/mediaPraise/Page'))
          }
        }, 'mediaPraise')
      },
    },

    {
      path: 'complain',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:complain:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/complainStore'))
            cb(null, require('pages/driver/complain/Page'))
          }
        }, 'complain')
      },
    },

    {
      path: 'punishInfo',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:punishInfo:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/punishInfoStore'))
            cb(null, require('pages/driver/punishInfo/Page'))
          }
        }, 'punishInfo')
      },
    },

    {
      path: 'punish',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:punish:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/punishStore'))
            cb(null, require('pages/driver/punish/Page'))
          }
        }, 'punish')
      },
    },

    {
      path: 'trafficViolation',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:violation:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/trafficViolationStore'))
            cb(null, require('pages/driver/trafficViolation/Page'))
          }
        }, 'trafficViolation')
      },
    },

    {
      path: 'trafficAccident',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:accident:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/trafficAccidentStore'))
            cb(null, require('pages/driver/trafficAccident/Page'))
          }
        }, 'trafficAccident')
      },
    },

    {
      path: 'lostAndFound',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:lostAndFound:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/lostAndFoundStore'))
            cb(null, require('pages/driver/lostAndFound/Page'))
          }
        }, 'lostAndFound')
      },
    },

    {
      path: 'transfer',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          if (auth('driver:transfer:*')) {
            registerModel(app, require('models/driverCommonStore'))
            registerModel(app, require('models/driver/transferStore'))
            cb(null, require('pages/driver/transfer/Page'))
          }
        }, 'transfer')
      },
    },


  ]
}
