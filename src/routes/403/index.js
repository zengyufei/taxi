module.exports = {
  path: '403',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require('pages/403'))
    }, '403')
  },
}
