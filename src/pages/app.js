/*
 * @Author: zengyufei
 * @Date: 2017-08-04 14:16:53
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-09-05 17:52:07
 */
import { connect } from 'dva'
import { Sider, Header, Footer, Bread, styles } from 'components/layout'
import { Helmet } from 'react-helmet'
import classnames from 'classnames'
import '../themes/index.less'
import './app.less'

const App = option => {
  const { location, children, methods, appStore } = option
  const { siderFold, isNavbar, menuPopoverVisible, openKeys } = appStore
  const { changeOpenKeys, logout, switchMenuPopover, switchSider } = methods

  const headerProps = {
    siderFold,
    openKeys,
    isNavbar,
    menuPopoverVisible,
    logout,
    switchMenuPopover,
    switchSider,
    changeOpenKeys,
  }

  const siderProps = {
    siderFold,
    location,
    openKeys,
    changeOpenKeys,
  }

  const breadProps = {
    location,
  }

  return (
    <div>
      <Helmet>
        <title>{projectConfig.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={projectConfig.logo} type="image/x-icon" />
      </Helmet>
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {
          !isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: true })}>
            <Sider {...siderProps} />
          </aside> : ''
        }
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread {...breadProps} />
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ appStore }) => ({
  appStore,
})

const mapDispatchToProps = dispatch => {
  return {
    methods: {

      changeOpenKeys(openKeys) {
        local.set(`openKeys`, openKeys)
        dispatch({
          type: 'appStore/changeOpenKeys',
          openKeys,
        })
      },

      logout () {
        dispatch({ type: 'appStore/logout' })
      },

      switchMenuPopover () {
        dispatch({ type: 'appStore/switchMenuPopver' })
      },
      switchSider () {
        dispatch({ type: 'appStore/switchSider' })
      },


    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
