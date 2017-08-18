const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

module.exports = app => {
  return [
    {
      path: 'sysOrg',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('models/rbacStore'))
          registerModel(app, require('models/rbac/sysOrgStore'))
          cb(null, require('pages/rbac/sysOrg'))
        }, 'sysOrg')
      },
    },
    {
      path: 'sysMember',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('models/rbacStore'))
          registerModel(app, require('models/rbac/sysMemberStore'))
          cb(null, require('pages/rbac/sysMember'))
        }, 'sysMember')
      },
    },
    {
      path: 'sysRole',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('models/rbacStore'))
          registerModel(app, require('models/rbac/sysRoleStore'))
          cb(null, require('pages/rbac/sysRole'))
        }, 'sysRole')
      },
    },
    {
      path: 'sysResource',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('models/rbacStore'))
          registerModel(app, require('models/rbac/sysResourceStore'))
          cb(null, require('pages/rbac/sysResource'))
        }, 'sysResource')
      },
    },
  ]
}
